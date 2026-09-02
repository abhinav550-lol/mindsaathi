import { useEffect, useMemo, useState } from 'react'
import { levels } from './levels'
import { calculateResult, createSequence, getHintIndexes } from './gameLogic'
import SequenceTile from './SequenceTile'
import './SequenceRecall.css'

const DEFAULT_LEVEL = 1
const COUNTDOWN_STEP_MS = 800
const HINT_DISPLAY_MS = 1800

function SequenceRecall({ initialLevel = DEFAULT_LEVEL, onGameComplete }) {
  const [difficulty, setDifficulty] = useState(initialLevel)
  const [round, setRound] = useState(1)
  const [sequence, setSequence] = useState(() => createSequence(initialLevel, 1))
  const [selectedNumbers, setSelectedNumbers] = useState([])
  const [stage, setStage] = useState('ready')
  const [countdown, setCountdown] = useState(3)
  const [highlightIndex, setHighlightIndex] = useState(0)
  const [highlightedNumber, setHighlightedNumber] = useState(null)
  const [hintIndexes, setHintIndexes] = useState([])
  const [roundIncorrectAttempts, setRoundIncorrectAttempts] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState(0)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [sequenceReplays, setSequenceReplays] = useState(0)
  const [timeLeft, setTimeLeft] = useState((levels[initialLevel] ?? levels[DEFAULT_LEVEL]).timeLimit)
  const [result, setResult] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [startedAt, setStartedAt] = useState(null)

  const levelConfig = useMemo(() => levels[difficulty] ?? levels[DEFAULT_LEVEL], [difficulty])
  const isInteractionDisabled = stage !== 'input'
  const nextExpectedNumber = sequence[selectedNumbers.length]

  const finishGame = (status, completedRounds, completionTime = levelConfig.timeLimit) => {
    const finalResult = calculateResult({
      difficulty,
      status,
      roundsCompleted: completedRounds,
      totalRounds: levelConfig.rounds,
      incorrectAnswers,
      hintsUsed,
      sequenceReplays,
      completionTime,
      timeLimit: levelConfig.timeLimit,
      startedAt,
      completedAt: Date.now(),
      metadata: {
        lastSequence: sequence,
        lastRound: round,
      },
    })

    setResult(finalResult)
    setStage('completed')
    setHighlightedNumber(null)
    setHintIndexes([])
    if (onGameComplete) {
      onGameComplete({
        score: finalResult.score,
        completed: status === 'WIN',
        accuracy: status === 'WIN' ? 100 : Math.round((completedRounds / levelConfig.rounds) * 100),
        completionTime,
        level: difficulty
      })
    }
  }

  const prepareRound = (nextRound, level = difficulty) => {
    const nextConfig = levels[level] ?? levels[DEFAULT_LEVEL]
    setRound(nextRound)
    setSequence(createSequence(level, nextRound))
    setSelectedNumbers([])
    setCountdown(3)
    setHighlightIndex(0)
    setHighlightedNumber(null)
    setHintIndexes([])
    setRoundIncorrectAttempts(0)
    setFeedback('')
    setStage('countdown')
    setTimeLeft((currentTime) => (nextRound === 1 ? nextConfig.timeLimit : currentTime))
  }

  const resetGame = (level = difficulty) => {
    const nextConfig = levels[level] ?? levels[DEFAULT_LEVEL]

    setDifficulty(level)
    setRound(1)
    setSequence(createSequence(level, 1))
    setSelectedNumbers([])
    setStage('ready')
    setCountdown(3)
    setHighlightIndex(0)
    setHighlightedNumber(null)
    setHintIndexes([])
    setRoundIncorrectAttempts(0)
    setIncorrectAnswers(0)
    setHintsUsed(0)
    setSequenceReplays(0)
    setTimeLeft(nextConfig.timeLimit)
    setResult(null)
    setFeedback('')
    setStartedAt(null)
  }

  const handleChooseDifficulty = (level) => {
    if (stage !== 'ready' && stage !== 'completed') return
    resetGame(level)
  }

  const handleStart = () => {
    setStartedAt(Date.now())
    setResult(null)
    setIncorrectAnswers(0)
    setHintsUsed(0)
    setSequenceReplays(0)
    setTimeLeft(levelConfig.timeLimit)
    setRound(1)
    setSequence(createSequence(difficulty, 1))
    setSelectedNumbers([])
    setRoundIncorrectAttempts(0)
    setHighlightIndex(0)
    setHintIndexes([])
    setFeedback('')
    setCountdown(3)
    setStage('countdown')
  }

  useEffect(() => {
    if (stage !== 'countdown') return undefined

    const timeoutId = window.setTimeout(() => {
      if (countdown <= 1) {
        setHighlightedNumber(null)
        setStage('showing')
        return
      }

      setCountdown((currentCountdown) => currentCountdown - 1)
    }, COUNTDOWN_STEP_MS)

    return () => window.clearTimeout(timeoutId)
  }, [countdown, stage])

  useEffect(() => {
    if (stage !== 'showing') return undefined

    const currentIndex = highlightIndex
    const nextIndex = currentIndex + 1
    const isSlowReplay = hintIndexes.length === 0 && roundIncorrectAttempts >= 3
    const displayDuration = isSlowReplay ? levelConfig.displaySpeed * 1.35 : levelConfig.displaySpeed

    setHighlightedNumber(sequence[currentIndex])

    const timeoutId = window.setTimeout(() => {
      if (nextIndex >= sequence.length) {
        setHighlightedNumber(null)
        setHintIndexes([])
        setFeedback('')
        setStage('input')
        return
      }

      setHighlightIndex(nextIndex)
    }, displayDuration)

    return () => window.clearTimeout(timeoutId)
  }, [stage, sequence, highlightIndex, hintIndexes, roundIncorrectAttempts, levelConfig.displaySpeed])

  useEffect(() => {
    if (stage !== 'hint') return undefined

    const timeoutId = window.setTimeout(() => {
      if (roundIncorrectAttempts >= 3) {
        setHintIndexes([])
        setStage('showing')
        return
      }

      setHintIndexes([])
      setFeedback('')
      setStage('input')
    }, HINT_DISPLAY_MS)

    return () => window.clearTimeout(timeoutId)
  }, [stage, roundIncorrectAttempts])

  useEffect(() => {
    if (stage === 'ready' || stage === 'completed') return undefined

    const timerId = window.setInterval(() => {
      setTimeLeft((currentTime) => {
        if (currentTime <= 1) {
          window.clearInterval(timerId)
          finishGame('TIMEOUT', round - 1)
          return 0
        }

        return currentTime - 1
      })
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [
    stage,
    round,
    difficulty,
    levelConfig,
    incorrectAnswers,
    hintsUsed,
    sequenceReplays,
    sequence,
    startedAt,
  ])

  const handleMistake = () => {
    const nextIncorrectAttempts = roundIncorrectAttempts + 1
    const nextHintIndexes = getHintIndexes(sequence.length, nextIncorrectAttempts)

    setRoundIncorrectAttempts(nextIncorrectAttempts)
    setIncorrectAnswers((currentCount) => currentCount + 1)
    setHintsUsed((currentCount) => currentCount + 1)
    setSelectedNumbers([])
    setHighlightIndex(0)
    setHintIndexes(nextHintIndexes)
    setHighlightedNumber(null)

    if (nextIncorrectAttempts >= 3) {
      setSequenceReplays((currentCount) => currentCount + 1)
      setFeedback('Let’s watch the sequence once more, slowly.')
    } else if (nextIncorrectAttempts === 2) {
      setFeedback('Here is a hint: the first half is highlighted.')
    } else {
      setFeedback('Here is a hint: watch the first tile.')
    }

    setStage('hint')
  }

  const handleTileClick = (number) => {
    if (stage !== 'input') return

    if (number !== nextExpectedNumber) {
      handleMistake()
      return
    }

    const nextSelectedNumbers = [...selectedNumbers, number]
    setSelectedNumbers(nextSelectedNumbers)
    setFeedback('')

    if (nextSelectedNumbers.length < sequence.length) return

    const completedRounds = round
    if (completedRounds >= levelConfig.rounds) {
      finishGame('CORRECT', completedRounds, levelConfig.timeLimit - timeLeft)
      return
    }

    window.setTimeout(() => prepareRound(completedRounds + 1), 650)
  }

  const tileNumbers = Array.from({ length: levelConfig.tileCount }, (_, index) => index + 1)
  const hintDescription =
    roundIncorrectAttempts >= 3
      ? 'Replay the sequence slowly.'
      : roundIncorrectAttempts === 2
        ? 'The first half of the sequence is highlighted.'
        : 'The first tile is highlighted.'

  return (
    <div className="sequence-recall-shell">
      <aside className="sequence-recall-panel">
        <p className="sequence-recall-eyebrow">Cognitive Activity</p>
        <h1>Sequence Recall</h1>

        <div className="sequence-recall-difficulty" aria-label="Select difficulty">
          {Object.entries(levels).map(([levelNumber, config]) => (
            <button
              key={levelNumber}
              type="button"
              className={`sequence-recall-difficulty-button ${
                Number(levelNumber) === difficulty ? 'is-selected' : ''
              }`}
              onClick={() => handleChooseDifficulty(Number(levelNumber))}
            >
              Level {levelNumber}
              <span>{config.tileCount} tiles</span>
            </button>
          ))}
        </div>

        <div className="sequence-recall-instructions">
          <h2>How to play</h2>
          <ul>
            <li>Watch the tiles light up, one at a time.</li>
            <li>Tap the tiles in the same order.</li>
            <li>Each round adds one more step.</li>
            <li>If you make a mistake, a helpful hint appears.</li>
          </ul>
        </div>
      </aside>

      <main className="sequence-recall-board">
        <div className="sequence-recall-header">
          <div className="sequence-recall-stat">
            <p className="sequence-recall-stat-label">Timer</p>
            <strong>{timeLeft}s</strong>
          </div>
          <div className="sequence-recall-stat">
            <p className="sequence-recall-stat-label">Round</p>
            <strong>
              {Math.min(round, levelConfig.rounds)}/{levelConfig.rounds}
            </strong>
          </div>
          <div className="sequence-recall-stat">
            <p className="sequence-recall-stat-label">Hints</p>
            <strong>{hintsUsed}</strong>
          </div>
        </div>

        {stage === 'ready' && (
          <div className="sequence-recall-stage">
            <h2>Ready to remember?</h2>
            <p>Press Start when you are comfortable. A short countdown comes first.</p>
            <button type="button" className="sequence-recall-start-button" onClick={handleStart}>
              Start
            </button>
          </div>
        )}

        {stage === 'countdown' && (
          <div className="sequence-recall-stage" aria-live="polite">
            <h2>Get ready</h2>
            <div className="sequence-recall-countdown">{countdown}</div>
            <p className="sequence-recall-countdown-caption">Watch carefully.</p>
          </div>
        )}

        {(stage === 'showing' || stage === 'hint' || stage === 'input') && (
          <div className="sequence-recall-stage">
            <h2>
              {stage === 'input'
                ? 'Repeat the sequence'
                : stage === 'hint'
                  ? 'Helpful hint'
                  : 'Watch the sequence'}
            </h2>
            <p>
              {stage === 'input'
                ? `Tap ${sequence.length - selectedNumbers.length} more ${
                    sequence.length - selectedNumbers.length === 1 ? 'tile' : 'tiles'
                  }.`
                : stage === 'hint'
                  ? hintDescription
                  : 'The tiles will light up from left to right in order.'}
            </p>

            <div
              className="sequence-recall-tiles"
              style={{ gridTemplateColumns: `repeat(${Math.min(3, levelConfig.tileCount)}, minmax(0, 1fr))` }}
            >
              {tileNumbers.map((number) => {
                const selectedOrder = selectedNumbers.lastIndexOf(number)
                const isHintHighlighted =
                  stage === 'hint' && hintIndexes.some((index) => sequence[index] === number)

                return (
                  <SequenceTile
                    key={number}
                    number={number}
                    isHighlighted={highlightedNumber === number || isHintHighlighted}
                    isSelected={selectedOrder !== -1}
                    selectedOrder={selectedOrder + 1}
                    disabled={isInteractionDisabled}
                    onClick={() => handleTileClick(number)}
                  />
                )
              })}
            </div>

            <p className="sequence-recall-feedback" aria-live="polite">
              {feedback}
            </p>
          </div>
        )}

        {stage === 'completed' && result && (
          <div className="sequence-recall-stage sequence-recall-result">
            <h2>{result.status === 'CORRECT' ? 'Well done!' : "Time's up"}</h2>
            <div className="sequence-recall-result-stats">
              <span>
                Score <strong>{result.score}</strong>
              </span>
              <span>
                Rounds <strong>{result.roundsCompleted}/{result.totalRounds}</strong>
              </span>
              <span>
                Hints <strong>{result.hintsUsed}</strong>
              </span>
              <span>
                Time <strong>{result.completionTime}s</strong>
              </span>
            </div>
            <p>
              {result.status === 'CORRECT'
                ? 'You remembered every sequence.'
                : `You completed ${result.roundsCompleted} of ${result.totalRounds} rounds. Try again when you are ready.`}
            </p>
            <button type="button" className="sequence-recall-play-again" onClick={() => resetGame(difficulty)}>
              Play again
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default SequenceRecall
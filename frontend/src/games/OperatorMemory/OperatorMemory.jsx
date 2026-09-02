import { useEffect, useMemo, useState } from 'react'
import { levels } from './levels'
import { calculateResult, generateExpression, revealNextOperator } from './gameLogic'
import './OperatorMemory.css'

const DEFAULT_LEVEL = 1
const REVEAL_DURATION_MS = 3000

const OPERATOR_SYMBOLS = {
  '+': '+',
  '-': '\u2212',
  '*': '\u00d7',
  '/': '\u00f7',
}

function formatOperator(operator) {
  return OPERATOR_SYMBOLS[operator] ?? operator
}

function buildMetadata(expression, revealedIndexes) {
  return {
    numbers: expression.numbers,
    originalOperators: expression.operators,
    revealedOperators: revealedIndexes,
    expectedAnswer: expression.answer,
  }
}

function OperatorMemory({ initialLevel = DEFAULT_LEVEL, onGameComplete }) {
  const [difficulty, setDifficulty] = useState(initialLevel)
  const [expression, setExpression] = useState(() => generateExpression(levels[initialLevel] ?? levels[DEFAULT_LEVEL]))
  const [stage, setStage] = useState('ready')
  const [revealedIndexes, setRevealedIndexes] = useState([])
  const [incorrectAnswers, setIncorrectAnswers] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [feedback, setFeedback] = useState('')
  const [timeLeft, setTimeLeft] = useState((levels[initialLevel] ?? levels[DEFAULT_LEVEL]).timeLimit)
  const [result, setResult] = useState(null)
  const [startedAt, setStartedAt] = useState(null)

  const levelConfig = useMemo(() => levels[difficulty] ?? levels[DEFAULT_LEVEL], [difficulty])

  const resetRound = (level = difficulty) => {
    const nextLevel = levels[level] ?? levels[DEFAULT_LEVEL]
    const nextExpression = generateExpression(nextLevel)

    setDifficulty(level)
    setExpression(nextExpression)
    setStage('ready')
    setRevealedIndexes([])
    setIncorrectAnswers(0)
    setInputValue('')
    setFeedback('')
    setTimeLeft(nextLevel.timeLimit)
    setResult(null)
    setStartedAt(null)
  }

  const handleChooseDifficulty = (level) => {
    if (stage === 'playing' || stage === 'reveal') return
    resetRound(level)
  }

  const handleStart = () => {
    setStage('reveal')
  }

  // Show the full expression for a fixed 3 seconds after Start is
  // pressed, then hide the operators and begin gameplay.
  useEffect(() => {
    if (stage !== 'reveal') return undefined

    const timeoutId = window.setTimeout(() => {
      setStage('playing')
      setStartedAt(Date.now())
    }, REVEAL_DURATION_MS)

    return () => window.clearTimeout(timeoutId)
  }, [stage])

  // Gameplay timer. Only runs while actively playing, matching the
  // interval-based timer pattern used by CardMatching.
  useEffect(() => {
    if (stage !== 'playing') return undefined

    const timerId = window.setInterval(() => {
      setTimeLeft((currentTime) => {
        if (currentTime <= 1) {
          window.clearInterval(timerId)

          setResult(
            calculateResult({
              difficulty,
              status: 'TIMEOUT',
              correctAnswers: 0,
              incorrectAnswers,
              hintsUsed: revealedIndexes.length,
              completionTime: levelConfig.timeLimit,
              timeLimit: levelConfig.timeLimit,
              startedAt,
              completedAt: Date.now(),
              metadata: buildMetadata(expression, revealedIndexes),
            }),
          )

          setStage('completed')
          return 0
        }

        return currentTime - 1
      })
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [stage, difficulty, levelConfig, incorrectAnswers, revealedIndexes, startedAt, expression])

  useEffect(() => {
    if (stage === 'completed' && result && onGameComplete) {
      onGameComplete({
        score: result.score,
        completed: result.status === 'CORRECT',
        accuracy: result.status === 'CORRECT' ? 100 : 0,
        completionTime: result.completionTime,
        level: difficulty
      })
    }
  }, [stage, result, difficulty, onGameComplete])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (stage !== 'playing') return

    const trimmed = inputValue.trim()
    const numericAnswer = Number(trimmed)

    if (trimmed === '' || Number.isNaN(numericAnswer)) {
      setFeedback('Please type a number, then press Submit Answer.')
      return
    }

    if (numericAnswer === expression.answer) {
      const completionTime = levelConfig.timeLimit - timeLeft

      setResult(
        calculateResult({
          difficulty,
          status: 'CORRECT',
          correctAnswers: 1,
          incorrectAnswers,
          hintsUsed: revealedIndexes.length,
          completionTime,
          timeLimit: levelConfig.timeLimit,
          startedAt,
          completedAt: Date.now(),
          metadata: buildMetadata(expression, revealedIndexes),
        }),
      )
      setStage('completed')
      return
    }

    setIncorrectAnswers((count) => count + 1)
    setRevealedIndexes((current) => revealNextOperator(expression.operators, current))
    setInputValue('')
    setFeedback("Not quite. Here's a hint.")
  }

  const displayOperator = (index) =>
    revealedIndexes.includes(index) ? formatOperator(expression.operators[index]) : '_'

  return (
    <div className="op-memory-shell">
      <aside className="op-memory-panel">
        <p className="op-memory-eyebrow">Cognitive Activity</p>
        <h1>Operator Memory</h1>

        <div className="op-memory-difficulty" aria-label="Select difficulty">
          {Object.entries(levels).map(([levelNumber, config]) => (
            <button
              key={levelNumber}
              type="button"
              className={`op-memory-difficulty-button ${
                Number(levelNumber) === difficulty ? 'is-selected' : ''
              }`}
              onClick={() => handleChooseDifficulty(Number(levelNumber))}
            >
              Level {levelNumber}
              <span>{config.numberCount} numbers</span>
            </button>
          ))}
        </div>

        <div className="op-memory-instructions">
          <h2>How to play</h2>
          <ul>
            <li>Look carefully at the numbers and operators.</li>
            <li>Press Start when you are ready.</li>
            <li>The operators will hide. Work out the answer in your head.</li>
            <li>Type only the final number and press Submit Answer.</li>
          </ul>
        </div>
      </aside>

      <main className="op-memory-board">
        {stage === 'ready' && (
          <div className="op-memory-stage-card">
            <h2>Get ready to remember</h2>
            <p className="op-memory-hint-text">
              Press Start. The equation will appear for 3 seconds, then the operators will hide.
            </p>
            <button type="button" className="op-memory-start-button" onClick={handleStart}>
              Start
            </button>
          </div>
        )}

        {stage === 'reveal' && (
          <div className="op-memory-stage-card">
            <h2>Remember the operators</h2>
            <div className="op-memory-expression">
              {expression.numbers.map((number, index) => (
                <span key={`reveal-num-${index}`} className="op-memory-token">
                  <span className="op-memory-number">{number}</span>
                  {index < expression.operators.length && (
                    <span className="op-memory-operator">{formatOperator(expression.operators[index])}</span>
                  )}
                </span>
              ))}
              <span className="op-memory-equals">= ?</span>
            </div>
          </div>
        )}

        {stage === 'playing' && (
          <div className="op-memory-stage-card">
            <div className="op-memory-board-header">
              <div>
                <p className="op-memory-board-label">Timer</p>
                <strong>{timeLeft}s</strong>
              </div>
              <div>
                <p className="op-memory-board-label">Hints used</p>
                <strong>{revealedIndexes.length}</strong>
              </div>
              <div>
                <p className="op-memory-board-label">Difficulty</p>
                <strong>Level {difficulty}</strong>
              </div>
            </div>

            <h2>What is the answer?</h2>
            <div className="op-memory-expression">
              {expression.numbers.map((number, index) => (
                <span key={`play-num-${index}`} className="op-memory-token">
                  <span className="op-memory-number">{number}</span>
                  {index < expression.operators.length && (
                    <span className="op-memory-operator">{displayOperator(index)}</span>
                  )}
                </span>
              ))}
              <span className="op-memory-equals">= ?</span>
            </div>

            {feedback && <p className="op-memory-feedback">{feedback}</p>}

            <form className="op-memory-answer-form" onSubmit={handleSubmit}>
              <label htmlFor="op-memory-answer-input" className="op-memory-answer-label">
                Your answer
              </label>
              <input
                id="op-memory-answer-input"
                className="op-memory-answer-input"
                type="number"
                inputMode="numeric"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                autoFocus
              />
              <button type="submit" className="op-memory-submit-button">
                Submit Answer
              </button>
            </form>
          </div>
        )}

        {stage === 'completed' && result && (
          <div className="op-memory-stage-card op-memory-result-card">
            <h2>{result.status === 'CORRECT' ? 'Well done!' : "Time's up"}</h2>
            <div className="op-memory-result-stats">
              <span>
                Score <strong>{result.score}</strong>
              </span>
              <span>
                Hints used <strong>{result.hintsUsed}</strong>
              </span>
              <span>
                Time <strong>{result.completionTime}s</strong>
              </span>
            </div>
            <p>
              {result.status === 'CORRECT'
                ? 'You worked out the answer correctly.'
                : `The correct answer was ${result.metadata.expectedAnswer}. Let's try another round.`}
            </p>
            <button type="button" className="op-memory-start-button" onClick={() => resetRound(difficulty)}>
              Play again
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default OperatorMemory

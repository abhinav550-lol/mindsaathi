import { useEffect, useMemo, useState } from 'react'
import { levels } from './levels'
import { calculateResult, createDeck } from './gameLogic'
import Card from './Card'
import './CardMatching.css'

const DEFAULT_LEVEL = 1

function CardMatching({ initialLevel = DEFAULT_LEVEL, onGameComplete }) {
  const [difficulty, setDifficulty] = useState(initialLevel)
  const [cards, setCards] = useState(() => createDeck(initialLevel))
  const [selectedIds, setSelectedIds] = useState([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [status, setStatus] = useState('ready')
  const [timeLeft, setTimeLeft] = useState(levels[initialLevel]?.timeLimit || 45)
  const [result, setResult] = useState(null)

  const levelConfig = useMemo(() => levels[difficulty], [difficulty])

  const beginGame = (level = difficulty) => {
    const nextLevel = levels[level] ?? levels[DEFAULT_LEVEL]

    setDifficulty(level)
    setCards(createDeck(level))
    setSelectedIds([])
    setMatchedPairs(0)
    setTimeLeft(nextLevel.timeLimit)
    setResult(null)
    setStatus('playing')
  }

  useEffect(() => {
    beginGame(initialLevel)
  }, [initialLevel])

  useEffect(() => {
    if (status !== 'playing') return undefined

    const timerId = window.setInterval(() => {
      setTimeLeft((currentTime) => {
        if (currentTime <= 1) {
          window.clearInterval(timerId)

          const timeoutRes = calculateResult({
            difficulty,
            matches: matchedPairs,
            totalPairs: levelConfig.pairs,
            completionTime: levelConfig.timeLimit,
            completed: false,
          })
          setResult(timeoutRes)
          setStatus('completed')
          if (onGameComplete) {
            onGameComplete({
              score: timeoutRes.score,
              completed: false,
              accuracy: Math.round((matchedPairs / levelConfig.pairs) * 100),
              completionTime: levelConfig.timeLimit,
              level: difficulty
            })
          }
          return 0
        }

        return currentTime - 1
      })
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [difficulty, levelConfig, matchedPairs, status, onGameComplete])

  useEffect(() => {
    if (selectedIds.length !== 2 || status !== 'playing') return undefined

    const [firstId, secondId] = selectedIds
    const firstCard = cards.find((card) => card.id === firstId)
    const secondCard = cards.find((card) => card.id === secondId)

    if (!firstCard || !secondCard) return undefined

    if (firstCard.value === secondCard.value) {
      setCards((currentCards) =>
        currentCards.map((card) =>
          card.id === firstId || card.id === secondId ? { ...card, matched: true } : card,
        ),
      )
      setMatchedPairs((currentPairs) => currentPairs + 1)
      setSelectedIds([])
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setSelectedIds([])
    }, 700)

    return () => window.clearTimeout(timeoutId)
  }, [cards, selectedIds, status])

  useEffect(() => {
    if (status !== 'playing' || matchedPairs !== levelConfig.pairs) return

    const finalResult = calculateResult({
      difficulty,
      matches: matchedPairs,
      totalPairs: levelConfig.pairs,
      completionTime: levelConfig.timeLimit - timeLeft,
      completed: true,
    })

    setResult(finalResult)
    setStatus('completed')
    if (onGameComplete) {
      onGameComplete({
        score: finalResult.score,
        completed: true,
        accuracy: Math.round((matchedPairs / levelConfig.pairs) * 100),
        completionTime: levelConfig.timeLimit - timeLeft,
        level: difficulty
      })
    }
  }, [difficulty, levelConfig, matchedPairs, status, timeLeft, onGameComplete])

  const handleCardClick = (cardId) => {
    if (status !== 'playing') return
    if (selectedIds.includes(cardId)) return
    if (cards.some((card) => card.id === cardId && card.matched)) return
    if (selectedIds.length === 2) return

    setSelectedIds((currentSelection) => [...currentSelection, cardId])
  }

  return (
    <div className="card-game-shell">
      <aside className="game-panel">
        <p className="eyebrow">Reference Activity</p>
        <h1>Card Matching</h1>

        <div className="difficulty-selector" aria-label="Select difficulty">
          {Object.entries(levels).map(([levelNumber, config]) => (
            <button
              key={levelNumber}
              type="button"
              className={`difficulty-button ${Number(levelNumber) === difficulty ? 'is-selected' : ''}`}
              onClick={() => setDifficulty(Number(levelNumber))}
            >
              Level {levelNumber}
              <span>{config.pairs} pairs</span>
            </button>
          ))}
        </div>

        <div className="instruction-card">
          <h2>How to play</h2>
          <ul>
            <li>Flip two cards at a time.</li>
            <li>Match each pair to clear the board.</li>
            <li>Finish before the timer ends.</li>
          </ul>
        </div>

        <button type="button" className="start-button" onClick={() => beginGame(difficulty)}>
          {status === 'completed' ? 'Play again' : 'Start game'}
        </button>
      </aside>

      <main className="game-board-panel">
        <div className="board-header">
          <div>
            <p className="board-label">Timer</p>
            <strong>{timeLeft}s</strong>
          </div>
          <div>
            <p className="board-label">Matches</p>
            <strong>
              {matchedPairs}/{levelConfig.pairs}
            </strong>
          </div>
          <div>
            <p className="board-label">Difficulty</p>
            <strong>Level {difficulty}</strong>
          </div>
        </div>

        {status !== 'playing' && status !== 'completed' ? (
          <div className="waiting-state">
            <h2>Ready to begin</h2>
            <p>Choose a level or press start below to begin the matching round.</p>
            <button
              type="button"
              className="start-button"
              style={{ marginTop: '16px', maxWidth: '240px', margin: '16px auto 0' }}
              onClick={() => beginGame(difficulty)}
            >
              Start Game Now ▶
            </button>
          </div>
        ) : (
          <div
            className="memory-grid"
            style={{ gridTemplateColumns: `repeat(${levelConfig.columns}, minmax(0, 1fr))` }}
          >
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                isFaceUp={selectedIds.includes(card.id) || card.matched}
                disabled={status !== 'playing'}
                onClick={() => handleCardClick(card.id)}
              />
            ))}
          </div>
        )}

        {status === 'completed' && result ? (
          <div className="result-card">
            <h2>Round complete</h2>
            <div className="result-stats">
              <span>
                Score <strong>{result.score}</strong>
              </span>
              <span>
                Correct <strong>{result.correctAnswers}</strong>
              </span>
              <span>
                Time <strong>{result.completionTime}s</strong>
              </span>
            </div>
            <p>{result.completed ? 'Great job. You matched every pair.' : 'Time ran out. Try another round.'}</p>
          </div>
        ) : null}
      </main>
    </div>
  )
}

export default CardMatching

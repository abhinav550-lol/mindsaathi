import { useState } from 'react'
import './App.css'
import { gameRegistry } from './games/gameRegistry'

const DEFAULT_GAME_ID = 'card-matching'

function App() {
  const [activeGameId, setActiveGameId] = useState(DEFAULT_GAME_ID)
  const activeGame = gameRegistry[activeGameId]
  const ActiveGameComponent = activeGame?.component

  return (
    <main className="app-shell">
      <div className="app-content">
        <nav className="game-switcher" aria-label="Choose a game">
          {Object.entries(gameRegistry).map(([gameId, game]) => (
            <button
              key={gameId}
              type="button"
              className={`game-switcher-button ${gameId === activeGameId ? 'is-active' : ''}`}
              onClick={() => setActiveGameId(gameId)}
            >
              {game.name}
            </button>
          ))}
        </nav>

        {ActiveGameComponent ? <ActiveGameComponent /> : null}
      </div>
    </main>
  )
}

export default App

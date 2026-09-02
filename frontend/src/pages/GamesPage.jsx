import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAIAdaptive } from '../context/AIAdaptiveContext';
import { gameRegistry } from '../games/gameRegistry';

export default function GamesPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { gameMode, setGameMode, gameLevels, recordGameResult } = useAIAdaptive();
  const [activeGameId, setActiveGameId] = useState(null);
  const [completionModal, setCompletionModal] = useState(null);

  const activeGame = activeGameId ? gameRegistry[activeGameId] : null;
  const ActiveGameComponent = activeGame?.component;

  const handleGameComplete = (resultData) => {
    if (!activeGameId || !activeGame) return;

    const insightMessage = recordGameResult({
      gameId: activeGameId,
      gameName: activeGame.name,
      score: resultData.score,
      completed: resultData.completed,
      completionTime: resultData.completionTime,
      accuracy: resultData.accuracy || (resultData.completed ? 100 : 50),
    });

    setCompletionModal({
      gameName: activeGame.name,
      score: resultData.score,
      level: resultData.level,
      message: insightMessage,
    });
  };

  const handleContinueToDashboard = () => {
    setCompletionModal(null);
    setActiveGameId(null);
    navigate('/patient');
  };

  const gameEntries = Object.entries(gameRegistry);

  return (
    <div className="editorial-section" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* ── Hero Header ── */}
        <div className="reveal-up">
          <span className="eyebrow-label block mb-3" style={{ color: 'var(--accent)' }}>{t('gameTitle')}</span>
          <h1 className="editorial-headline mb-6">
            PLAY.<br />
            REMEMBER.<br />
            <span style={{ color: 'var(--accent)' }}>GROW.</span>
          </h1>
          <p className="text-lg max-w-xl leading-relaxed" style={{ color: 'var(--muted)' }}>
            {t('gameSubtitle')}
          </p>
        </div>

        {/* ── Mode Switcher ── */}
        <div className="reveal-up-delay-1">
          <div
            className="inline-flex items-center gap-1 p-1.5 rounded-full"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <button
              onClick={() => setGameMode('auto')}
              className="px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200"
              style={{
                background: gameMode === 'auto' ? 'var(--foreground)' : 'transparent',
                color: gameMode === 'auto' ? 'var(--white)' : 'var(--muted)',
              }}
            >
              🤖 {t('autoMode')}
            </button>
            <button
              onClick={() => setGameMode('manual')}
              className="px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200"
              style={{
                background: gameMode === 'manual' ? 'var(--foreground)' : 'transparent',
                color: gameMode === 'manual' ? 'var(--white)' : 'var(--muted)',
              }}
            >
              🖐️ {t('manualMode')}
            </button>
          </div>
        </div>

        {/* ── Game Tiles — Unique editorial layout ── */}
        <div className="space-y-8">
          {gameEntries.map(([id, game], idx) => {
            const currentLevel = gameLevels[id] || 1;
            const num = String(idx + 1).padStart(2, '0');
            const isEven = idx % 2 === 0;

            return (
              <div
                key={id}
                className={`editorial-card overflow-hidden reveal-up-delay-${idx + 1}`}
              >
                <div className={`grid md:grid-cols-2 ${isEven ? '' : 'direction-rtl'}`}>

                  {/* Content side */}
                  <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between" style={{ direction: 'ltr' }}>
                    <div>
                      <span
                        className="text-6xl sm:text-7xl font-extrabold block mb-4"
                        style={{ color: 'var(--surface-dark)', letterSpacing: '-0.04em' }}
                      >
                        {num}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold mb-2" style={{ letterSpacing: '-0.02em' }}>
                        {game.name.toUpperCase()}
                      </h3>
                      <p className="eyebrow-label mb-4" style={{ color: 'var(--accent)' }}>
                        {game.ability}
                      </p>
                      <p className="text-base leading-relaxed mb-2" style={{ color: 'var(--muted)' }}>
                        {game.description}
                      </p>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full inline-block mt-2" style={{ background: 'var(--surface)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
                        Level {currentLevel}
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveGameId(id)}
                      className="accent-btn mt-8 w-full sm:w-auto text-lg"
                    >
                      ▶ {t('playNow')}
                    </button>
                  </div>

                  {/* Visual side */}
                  <div
                    className="hidden md:flex items-center justify-center p-12"
                    style={{
                      direction: 'ltr',
                      background: idx === 0 ? 'var(--foreground)' : idx === 1 ? 'var(--accent)' : 'var(--surface)',
                    }}
                  >
                    <span style={{ fontSize: '6rem', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))' }}>
                      {game.icon}
                    </span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ── Fullscreen Game Modal ── */}
      {ActiveGameComponent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto modal-overlay" style={{ animation: 'revealUp 0.3s ease forwards' }}>
          <div
            className="w-full max-w-5xl rounded-2xl p-6 sm:p-8 relative"
            style={{
              background: 'var(--white)',
              border: '1px solid var(--border)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.1)',
            }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-5 mb-8" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="flex items-center gap-4">
                <span className="text-3xl p-2.5 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  {activeGame.icon}
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">{activeGame.name}</h2>
                  <p className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>
                    AI Difficulty: Level {gameLevels[activeGameId] || 1}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveGameId(null)}
                className="secondary-btn text-sm py-2"
              >
                Close ✕
              </button>
            </div>

            {/* Game */}
            <div className="w-full overflow-x-auto min-h-[460px] flex items-center justify-center">
              <ActiveGameComponent
                initialLevel={gameLevels[activeGameId] || 1}
                onGameComplete={handleGameComplete}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Completion Modal ── */}
      {completionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay" style={{ animation: 'revealUp 0.3s ease forwards' }}>
          <div
            className="w-full max-w-lg rounded-2xl p-6 sm:p-10 text-center"
            style={{
              background: 'var(--white)',
              border: '1px solid var(--border)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.1)',
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl"
              style={{ background: 'var(--accent)', color: 'var(--white)' }}
            >
              ✦
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Game Complete!</h2>
            <p className="text-base font-semibold mb-6" style={{ color: 'var(--muted)' }}>
              {completionModal.gameName} (Level {completionModal.level})
            </p>

            <div
              className="rounded-xl p-6 mb-8"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <div className="metric-large mb-2" style={{ color: 'var(--accent)' }}>
                {completionModal.score}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                {completionModal.message}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleContinueToDashboard}
                className="accent-btn flex-1 text-base"
              >
                Continue to Dashboard →
              </button>
              <button
                onClick={() => setCompletionModal(null)}
                className="secondary-btn text-base"
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

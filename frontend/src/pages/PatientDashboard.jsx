import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAIAdaptive } from '../context/AIAdaptiveContext';

export default function PatientDashboard() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const {
    patientStats,
    currentMood,
    setCurrentMood,
    reminders,
    toggleReminder,
    waterCups,
    addWaterCup,
    lastAiInsight,
  } = useAIAdaptive();

  const nextMedication = reminders.find((r) => r.type === 'medication' && !r.completed) || reminders[0];
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <div className="editorial-section" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* ── Welcome Header ── */}
        <div className="reveal-up">
          <span className="eyebrow-label block mb-2" style={{ color: 'var(--accent)' }}>{t('dashboard')}</span>
          <h1 className="editorial-headline mb-3">
            GOOD<br />MORNING,<br /><span style={{ color: 'var(--accent)' }}>MAYA.</span>
          </h1>
          <p className="text-lg" style={{ color: 'var(--muted)' }}>
            {dayName} · {dateStr} · Guwahati, Assam
          </p>
        </div>

        {/* ── Central Metric + CTA ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Big Metric */}
          <div className="lg:col-span-5 reveal-up-delay-1">
            <div className="relative">
              {/* Orange ring behind */}
              <div
                className="absolute -top-6 -left-6 w-44 h-44 rounded-full"
                style={{
                  border: '4px solid var(--accent)',
                  opacity: 0.15,
                }}
              />
              <div className="metric-huge">{patientStats.cognitiveScore}</div>
              <div className="eyebrow-label mt-2" style={{ fontSize: '0.9rem', letterSpacing: '0.15em' }}>
                COGNITIVE SCORE
              </div>
              <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--muted)' }}>
                {t('greetingDesc')}
              </p>
              <Link to="/progress" className="inline-block mt-4 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                View memory breakdown →
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-4 space-y-6 reveal-up-delay-2">
            {/* Play games CTA */}
            <button
              onClick={() => navigate('/games')}
              className="accent-btn w-full text-lg py-5 justify-center"
            >
              🎮 {t('startGamesCTA')}
            </button>

            {/* Next medication */}
            {nextMedication && (
              <div className="editorial-card p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="eyebrow-label">{t('nextReminder')}</span>
                  <span style={{ fontSize: '1.5rem' }}>💊</span>
                </div>
                <h4 className="text-lg font-bold mb-1">{nextMedication.title}</h4>
                <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'var(--surface)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
                  ⏰ {nextMedication.time}
                </span>
                <button
                  onClick={() => toggleReminder(nextMedication.id)}
                  className={`mt-4 w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                    nextMedication.completed
                      ? ''
                      : ''
                  }`}
                  style={{
                    background: nextMedication.completed ? 'var(--surface)' : 'var(--accent)',
                    color: nextMedication.completed ? 'var(--muted)' : 'var(--black)',
                    border: nextMedication.completed ? '1px solid var(--border)' : 'none',
                  }}
                >
                  {nextMedication.completed ? '✓ Dose Taken' : 'Mark Dose Taken'}
                </button>
              </div>
            )}
          </div>

          {/* Hydration */}
          <div className="lg:col-span-3 reveal-up-delay-3">
            <div className="editorial-card p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="eyebrow-label">{t('waterTracker')}</span>
                <span style={{ fontSize: '1.5rem' }}>💧</span>
              </div>
              <div className="metric-large">{waterCups}<span className="text-lg font-medium" style={{ color: 'var(--muted)' }}>/8</span></div>
              <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>cups today</p>
              <div className="progress-bar-track mt-4">
                <div className="progress-bar-fill" style={{ width: `${(waterCups / 8) * 100}%` }} />
              </div>
              <button
                onClick={addWaterCup}
                className="secondary-btn w-full mt-4 text-sm py-2.5"
              >
                {t('addCup')}
              </button>
            </div>
          </div>

        </div>

        {/* ── AI Insight (if available) ── */}
        {lastAiInsight && (
          <div
            className="rounded-xl p-6 sm:p-8 reveal-up"
            style={{ background: 'var(--white)', border: '1px solid var(--accent)', borderLeft: '4px solid var(--accent)' }}
          >
            <div className="flex items-start gap-4">
              <span style={{ fontSize: '1.5rem', color: 'var(--accent)' }}>✦</span>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-lg font-bold">Latest AI Adaptive Insight</h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'var(--surface)', color: 'var(--muted)' }}>
                    ⏰ {lastAiInsight.timestamp}
                  </span>
                </div>
                <p className="text-base mt-2 leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {lastAiInsight.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Mood Checker ── */}
        <div className="reveal-up">
          <h2 className="editorial-headline-sm mb-8">{t('moodCheckTitle')}</h2>
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {[
              { key: 'Great', emoji: '😊', label: t('moodGreat') },
              { key: 'Okay', emoji: '🙂', label: t('moodOkay') },
              { key: 'Support', emoji: '😟', label: t('moodSupport') },
            ].map((mood) => (
              <button
                key={mood.key}
                onClick={() => setCurrentMood(mood.key)}
                className="p-5 sm:p-8 rounded-xl text-center transition-all duration-300 flex flex-col items-center gap-3"
                style={{
                  background: currentMood === mood.key ? 'var(--accent)' : 'var(--white)',
                  color: currentMood === mood.key ? 'var(--black)' : 'var(--foreground)',
                  border: `1px solid ${currentMood === mood.key ? 'var(--accent)' : 'var(--border)'}`,
                  transform: currentMood === mood.key ? 'scale(1.03)' : 'scale(1)',
                  boxShadow: currentMood === mood.key ? '0 8px 24px rgba(255,101,0,0.2)' : 'none',
                }}
              >
                <span className="text-4xl sm:text-5xl">{mood.emoji}</span>
                <span className="text-base sm:text-lg font-semibold">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Daily Schedule Timeline ── */}
        <div className="reveal-up">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-bold">TODAY</h2>
            <Link to="/reminders" className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
              See all activities →
            </Link>
          </div>
          <div className="space-y-0">
            {reminders.slice(0, 4).map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center gap-6 py-5 transition-all"
                style={{ borderBottom: idx < 3 ? '1px solid var(--border)' : 'none' }}
              >
                <span className="text-sm font-mono font-semibold w-16 shrink-0" style={{ color: 'var(--muted)' }}>
                  {item.time.split(' ')[0]}
                </span>
                <span className="flex-1 text-base font-medium" style={{ color: item.completed ? 'var(--muted)' : 'var(--foreground)', textDecoration: item.completed ? 'line-through' : 'none' }}>
                  {item.title}
                </span>
                <button
                  onClick={() => toggleReminder(item.id)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all"
                  style={{
                    background: item.completed ? 'var(--accent)' : 'var(--surface)',
                    color: item.completed ? 'var(--white)' : 'var(--muted)',
                    border: item.completed ? 'none' : '1px solid var(--border)',
                  }}
                  aria-label={item.completed ? 'Completed' : 'Mark done'}
                >
                  {item.completed ? '✓' : '○'}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

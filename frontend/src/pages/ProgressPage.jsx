import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAIAdaptive } from '../context/AIAdaptiveContext';

export default function ProgressPage() {
  const { t } = useLanguage();
  const { patientStats, sessionHistory } = useAIAdaptive();

  const chartPoints = [
    { day: 'Mon', score: 78 },
    { day: 'Tue', score: 82 },
    { day: 'Wed', score: 80 },
    { day: 'Thu', score: 85 },
    { day: 'Fri', score: 84 },
    { day: 'Sat', score: 88 },
    { day: 'Sun', score: patientStats.cognitiveScore },
  ];

  const domains = [
    { label: 'MEMORY', score: patientStats.memoryScore, key: 'memoryScore' },
    { label: 'ATTENTION', score: patientStats.attentionScore, key: 'attentionScore' },
    { label: 'LANGUAGE', score: 87, key: 'language' },
    { label: 'CALCULATION', score: patientStats.calcScore, key: 'calcScore' },
  ];

  return (
    <div className="editorial-section" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* ── Headline ── */}
        <div className="reveal-up">
          <span className="eyebrow-label block mb-3" style={{ color: 'var(--accent)' }}>{t('progressTitle')}</span>
          <h1 className="editorial-headline mb-4">
            SMALL STEPS.<br />
            VISIBLE<br />
            <span style={{ color: 'var(--accent)' }}>PROGRESS.</span>
          </h1>
        </div>

        {/* ── Top Metrics ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal-up-delay-1">

          {/* Primary metric — featured */}
          <div
            className="rounded-xl p-8 sm:col-span-2 lg:col-span-1"
            style={{ background: 'var(--foreground)', color: 'var(--white)' }}
          >
            <p className="eyebrow-label mb-3" style={{ color: 'var(--accent)' }}>{t('overallScore')}</p>
            <div className="metric-large" style={{ color: 'var(--white)' }}>
              {patientStats.cognitiveScore}<span className="text-xl font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>/100</span>
            </div>
            <p className="text-sm mt-3 font-semibold" style={{ color: 'var(--accent)' }}>
              ↑ 8% increase from last week
            </p>
          </div>

          <div className="editorial-card p-6">
            <p className="eyebrow-label mb-3">{t('memoryScore')}</p>
            <div className="text-3xl sm:text-4xl font-extrabold">{patientStats.memoryScore}%</div>
            <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>Card Matching accuracy</p>
          </div>

          <div className="editorial-card p-6">
            <p className="eyebrow-label mb-3">{t('attentionScore')}</p>
            <div className="text-3xl sm:text-4xl font-extrabold">{patientStats.attentionScore}%</div>
            <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>Sequence pattern stability</p>
          </div>

          <div className="editorial-card p-6">
            <p className="eyebrow-label mb-3">{t('calcScore')}</p>
            <div className="text-3xl sm:text-4xl font-extrabold">{patientStats.calcScore}%</div>
            <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>Operator calculation recall</p>
          </div>

        </div>

        {/* ── Cognitive Domains — Horizontal Bars ── */}
        <div className="reveal-up">
          <h2 className="text-xl font-bold mb-8">Cognitive Domains</h2>
          <div className="space-y-6">
            {domains.map((d) => (
              <div key={d.label} className="flex items-center gap-6">
                <span className="text-xs font-bold uppercase tracking-wider w-28 shrink-0" style={{ color: 'var(--muted)' }}>
                  {d.label}
                </span>
                <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: 'var(--surface-dark)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${d.score}%`,
                      background: 'var(--accent)',
                    }}
                  />
                </div>
                <span className="text-sm font-bold w-8 text-right">{d.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Weekly Trend Bar Chart ── */}
        <div className="reveal-up">
          <h2 className="text-xl font-bold mb-8">{t('weeklyTrend')}</h2>
          <div
            className="editorial-card p-6 sm:p-10"
          >
            <div className="h-64 w-full flex items-end justify-between gap-3 sm:gap-6 pt-8 pb-4 px-2" style={{ borderBottom: '1px solid var(--border)' }}>
              {chartPoints.map((pt, idx) => {
                const heightPct = Math.max(20, ((pt.score - 50) / 50) * 100);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-3 h-full justify-end group">
                    <span className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent)' }}>
                      {pt.score}
                    </span>
                    <div
                      className="w-full max-w-[48px] rounded-t-lg transition-all duration-500 group-hover:opacity-80"
                      style={{
                        height: `${heightPct}%`,
                        background: idx === chartPoints.length - 1 ? 'var(--accent)' : 'var(--foreground)',
                      }}
                    />
                    <span className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>{pt.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Session History ── */}
        <div className="reveal-up">
          <h2 className="text-xl font-bold mb-8">Recent Game Sessions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th className="py-4 px-4 eyebrow-label">Game</th>
                  <th className="py-4 px-4 eyebrow-label">When</th>
                  <th className="py-4 px-4 eyebrow-label">Score</th>
                  <th className="py-4 px-4 eyebrow-label">Level</th>
                  <th className="py-4 px-4 eyebrow-label">AI Action</th>
                </tr>
              </thead>
              <tbody>
                {sessionHistory.map((s) => (
                  <tr key={s.id} className="transition-all" style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="py-4 px-4 font-bold">{s.gameName}</td>
                    <td className="py-4 px-4 text-sm" style={{ color: 'var(--muted)' }}>{s.date}</td>
                    <td className="py-4 px-4 font-bold text-lg" style={{ color: 'var(--accent)' }}>{s.score}/100</td>
                    <td className="py-4 px-4 font-medium">Level {s.level}</td>
                    <td className="py-4 px-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background: 'var(--surface)', color: 'var(--muted)', border: '1px solid var(--border)' }}
                      >
                        {s.aiAdjustment}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

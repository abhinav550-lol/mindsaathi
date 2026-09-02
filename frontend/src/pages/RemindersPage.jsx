import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAIAdaptive } from '../context/AIAdaptiveContext';

export default function RemindersPage() {
  const { t } = useLanguage();
  const { reminders, toggleReminder, waterCups, addWaterCup } = useAIAdaptive();
  const [activeTab, setActiveTab] = useState('all');

  const filteredReminders = reminders.filter((r) => {
    if (activeTab === 'all') return true;
    return r.type === activeTab;
  });

  const completedCount = reminders.filter((r) => r.completed).length;
  const progressPct = Math.round((completedCount / reminders.length) * 100);

  return (
    <div className="editorial-section" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* ── Headline ── */}
        <div className="grid lg:grid-cols-12 gap-8 items-end reveal-up">
          <div className="lg:col-span-8">
            <span className="eyebrow-label block mb-3" style={{ color: 'var(--accent)' }}>{t('reminders')}</span>
            <h1 className="editorial-headline">
              TODAY,<br />
              TAKEN<br />
              <span style={{ color: 'var(--accent)' }}>CARE OF.</span>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <div className="editorial-card p-5">
              <div className="flex justify-between items-center text-sm font-semibold mb-3">
                <span style={{ color: 'var(--muted)' }}>Today's Goal</span>
                <span style={{ color: 'var(--accent)' }}>{completedCount}/{reminders.length}</span>
              </div>
              <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Filter Pills ── */}
        <div className="flex flex-wrap gap-2 reveal-up-delay-1">
          {['all', 'medication', 'hydration', 'activity', 'appointment'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2.5 rounded-full font-semibold text-sm capitalize transition-all duration-200"
              style={{
                background: activeTab === tab ? 'var(--foreground)' : 'var(--white)',
                color: activeTab === tab ? 'var(--white)' : 'var(--muted)',
                border: `1px solid ${activeTab === tab ? 'var(--foreground)' : 'var(--border)'}`,
              }}
            >
              {tab === 'all' ? 'All' : tab}
            </button>
          ))}
        </div>

        {/* ── Hydration Inline ── */}
        <div
          className="rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 reveal-up"
          style={{ background: 'var(--white)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-5">
            <span style={{ fontSize: '2.5rem' }}>💧</span>
            <div>
              <h3 className="text-lg font-bold">Daily Hydration</h3>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                {waterCups} of 8 glasses logged today
              </p>
            </div>
          </div>
          <button onClick={addWaterCup} className="accent-btn text-sm py-2.5 px-6 shrink-0">
            {t('addCup')}
          </button>
        </div>

        {/* ── Timeline ── */}
        <div className="reveal-up">
          <div className="space-y-0">
            {filteredReminders.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center gap-4 sm:gap-8 py-6 transition-all"
                style={{ borderBottom: idx < filteredReminders.length - 1 ? '1px solid var(--border)' : 'none' }}
              >
                {/* Time */}
                <div className="w-16 sm:w-20 shrink-0 text-right">
                  <span className="text-sm font-mono font-semibold" style={{ color: 'var(--muted)' }}>
                    {item.time.split(' ')[0]}
                  </span>
                </div>

                {/* Timeline dot */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: item.completed ? 'var(--accent)' : 'var(--surface-dark)',
                      boxShadow: item.completed ? '0 0 0 4px rgba(255,101,0,0.15)' : 'none',
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                    <h4
                      className="text-base sm:text-lg font-semibold"
                      style={{
                        color: item.completed ? 'var(--muted)' : 'var(--foreground)',
                        textDecoration: item.completed ? 'line-through' : 'none',
                      }}
                    >
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{item.note}</p>
                </div>

                {/* Action */}
                <button
                  onClick={() => toggleReminder(item.id)}
                  className="px-4 sm:px-6 py-2.5 rounded-full font-semibold text-sm shrink-0 transition-all"
                  style={{
                    background: item.completed ? 'var(--surface)' : 'var(--accent)',
                    color: item.completed ? 'var(--muted)' : 'var(--black)',
                    border: item.completed ? '1px solid var(--border)' : 'none',
                  }}
                >
                  {item.completed ? '✓ ' + t('completed') : t('markDone')}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

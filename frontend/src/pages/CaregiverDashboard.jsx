import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAIAdaptive } from '../context/AIAdaptiveContext';

export default function CaregiverDashboard() {
  const { t } = useLanguage();
  const { patientStats, reminders, sessionHistory, gameLevels } = useAIAdaptive();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContext, setNewContext] = useState('');
  const [newHint, setNewHint] = useState('');

  // Family photo memories list
  const [familyMemories, setFamilyMemories] = useState([
    {
      id: 'm1',
      title: 'Family Gathering in Shillong (2018)',
      photo: '📸',
      context: 'Annual family reunion at Shillong Botanical Garden with grandson Rahul and daughter Sunita.',
      hint: 'Remember the yellow sweater Rahul was wearing?'
    },
    {
      id: 'm2',
      title: 'Bihu Festival Celebration',
      photo: '🌺',
      context: 'Pitha and Laroo preparation at home with sister Kalyani.',
      hint: 'You made your famous coconut pitha.'
    }
  ]);

  const handleAddMemory = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEntry = {
      id: `m-${Date.now()}`,
      title: newTitle,
      photo: '📷',
      context: newContext || 'Family uploaded memory for reminiscence therapy.',
      hint: newHint || 'Recall the special day spent together.'
    };

    setFamilyMemories([newEntry, ...familyMemories]);
    setNewTitle('');
    setNewContext('');
    setNewHint('');
    setUploadModalOpen(false);
  };

  return (
    <div className="editorial-section" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* ── Hero Headline ── */}
        <div className="reveal-up">
          <span className="eyebrow-label block mb-3" style={{ color: 'var(--accent)' }}>{t('caregiverTitle')}</span>
          <h1 className="editorial-headline mb-4">
            MAYA IS<br />
            DOING<br />
            <span style={{ color: 'var(--accent)' }}>WELL.</span>
          </h1>
          <p className="text-lg" style={{ color: 'var(--muted)' }}>
            Primary Neurologist: Dr. B. N. Hazarika (Guwahati)
          </p>
        </div>

        {/* ── Patient Profile — Editorial Typography Metrics ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 reveal-up-delay-1">

          {/* Profile */}
          <div className="editorial-card p-6 sm:p-8 flex items-center gap-5">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shrink-0"
              style={{ background: 'var(--accent)', color: 'var(--white)' }}
            >
              👵
            </div>
            <div>
              <h3 className="text-xl font-bold">Maya Devi</h3>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>72 years · Female</p>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block" style={{ background: 'var(--surface)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
                Guwahati, Assam (NER)
              </span>
            </div>
          </div>

          {/* Age/Diagnosis */}
          <div className="editorial-card p-6 sm:p-8">
            <p className="eyebrow-label mb-2">Diagnosis Stage</p>
            <p className="text-lg font-bold" style={{ color: 'var(--accent)' }}>Early Stage Dementia (MCI)</p>
            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Monitored since Oct 2025</p>
          </div>

          {/* Medication Compliance */}
          <div
            className="rounded-xl p-6 sm:p-8"
            style={{ background: 'var(--foreground)', color: 'var(--white)' }}
          >
            <p className="eyebrow-label mb-2" style={{ color: 'var(--accent)' }}>Medication Compliance</p>
            <div className="metric-large" style={{ color: 'var(--white)' }}>92%</div>
            <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>11/12 doses confirmed this week</p>
          </div>

          {/* AI Levels */}
          <div className="editorial-card p-6 sm:p-8">
            <p className="eyebrow-label mb-3">Assigned AI Levels</p>
            <div className="space-y-2 text-sm font-medium">
              <div className="flex justify-between">
                <span>Card Match</span>
                <span className="font-bold" style={{ color: 'var(--accent)' }}>Level {gameLevels['card-matching'] || 1}</span>
              </div>
              <div className="flex justify-between">
                <span>Operator</span>
                <span className="font-bold" style={{ color: 'var(--accent)' }}>Level {gameLevels['operator-memory'] || 1}</span>
              </div>
              <div className="flex justify-between">
                <span>Sequence</span>
                <span className="font-bold" style={{ color: 'var(--accent)' }}>Level {gameLevels['sequence-recall'] || 1}</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── AI Insights & Clinical Alerts ── */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">

          {/* AI Insights */}
          <div className="reveal-up">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span style={{ color: 'var(--accent)' }}>✦</span> {t('aiInsights')}
            </h2>
            <div className="space-y-4">
              <div
                className="rounded-xl p-5"
                style={{ background: 'var(--white)', border: '1px solid var(--border)', borderLeft: '3px solid var(--accent)' }}
              >
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider mb-2">
                  <span style={{ color: 'var(--accent)' }}>Visual Memory Index</span>
                  <span style={{ color: 'var(--muted)' }}>High Stability</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  Patient completes 4-pair visual matching games within 42 seconds consistently. Visual recognition pathways remain robust.
                </p>
              </div>

              <div
                className="rounded-xl p-5"
                style={{ background: 'var(--white)', border: '1px solid var(--border)', borderLeft: '3px solid var(--surface-dark)' }}
              >
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider mb-2">
                  <span style={{ color: 'var(--muted)' }}>Working Calculation Note</span>
                  <span style={{ color: 'var(--accent)' }}>Needs Support</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  Calculations involving 3 operators experienced slight delay. AI difficulty was safely lowered to Level 1 to prevent frustration.
                </p>
              </div>
            </div>
          </div>

          {/* Clinical Alerts */}
          <div className="reveal-up-delay-1">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              ⚡ {t('clinicalAlerts')}
            </h2>
            <div className="space-y-4">
              <div
                className="rounded-xl p-5 flex items-start gap-4"
                style={{ background: 'var(--white)', border: '1px solid var(--border)' }}
              >
                <span className="text-xl shrink-0">🟢</span>
                <div>
                  <h4 className="font-bold text-sm">Morning Dose Confirmed</h4>
                  <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Donepezil 5mg marked taken at 08:14 AM today.</p>
                </div>
              </div>

              <div
                className="rounded-xl p-5 flex items-start gap-4"
                style={{ background: 'var(--white)', border: '1px solid var(--border)', borderLeft: '3px solid var(--accent)' }}
              >
                <span className="text-xl shrink-0">⚠️</span>
                <div>
                  <h4 className="font-bold text-sm" style={{ color: 'var(--accent)' }}>Hydration Progress Alert</h4>
                  <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Hydration level is currently at 4/8 cups. Gentle reminder triggered.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ══════════════════════════════════
            FAMILY MEMORY BANK — Masonry Gallery
            ══════════════════════════════════ */}
        <div className="reveal-up">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <span className="eyebrow-label block mb-2" style={{ color: 'var(--accent)' }}>REMINISCENCE THERAPY</span>
              <h2 className="editorial-headline-sm">
                MEMORIES<br />
                WORTH <span style={{ color: 'var(--accent)' }}>KEEPING.</span>
              </h2>
            </div>
            <button
              onClick={() => setUploadModalOpen(true)}
              className="accent-btn text-sm shrink-0"
            >
              + Upload Memory
            </button>
          </div>

          {/* Asymmetric Masonry Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {familyMemories.map((mem, idx) => (
              <div
                key={mem.id}
                className={`editorial-card overflow-hidden ${idx === 0 ? 'sm:row-span-2' : ''}`}
              >
                {/* Photo area */}
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: idx === 0 ? '200px' : '140px',
                    background: idx % 2 === 0 ? 'var(--surface)' : 'var(--foreground)',
                  }}
                >
                  <span style={{ fontSize: idx === 0 ? '4rem' : '3rem' }}>{mem.photo}</span>
                </div>
                {/* Content */}
                <div className="p-6">
                  <h4 className="text-lg font-bold mb-2">{mem.title}</h4>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
                    {mem.context}
                  </p>
                  <div
                    className="px-4 py-2.5 rounded-lg text-xs font-semibold"
                    style={{ background: 'var(--surface)', color: 'var(--accent)', border: '1px solid var(--border)' }}
                  >
                    ✦ AI Hint: "{mem.hint}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Upload Modal ── */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay" style={{ animation: 'revealUp 0.3s ease forwards' }}>
          <div
            className="w-full max-w-lg rounded-2xl p-6 sm:p-8"
            style={{
              background: 'var(--white)',
              border: '1px solid var(--border)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.1)',
            }}
          >
            <h3 className="text-xl font-bold mb-6">Add Personal Memory</h3>
            <form onSubmit={handleAddMemory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1" style={{ color: 'var(--muted)' }}>Memory Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vacation in Kaziranga"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl font-medium focus:outline-none transition"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--foreground)',
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1" style={{ color: 'var(--muted)' }}>Context & Description</label>
                <textarea
                  placeholder="Who is in the picture and what happened?"
                  value={newContext}
                  onChange={(e) => setNewContext(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl font-medium focus:outline-none transition"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--foreground)',
                    minHeight: '48px',
                  }}
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1" style={{ color: 'var(--muted)' }}>AI Prompt Hint</label>
                <input
                  type="text"
                  placeholder="Hint to help memory recall"
                  value={newHint}
                  onChange={(e) => setNewHint(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl font-medium focus:outline-none transition"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--foreground)',
                  }}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="accent-btn flex-1">
                  Save Memory
                </button>
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="secondary-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

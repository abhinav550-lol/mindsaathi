import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

/* ── Floating decorative object ── */
function FloatingIcon({ children, className = '', style = {} }) {
  return (
    <div
      className={`absolute select-none pointer-events-none ${className}`}
      style={{
        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.08))',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function LandingPage() {
  const { t } = useLanguage();

  return (
    <div style={{ background: 'var(--background)', color: 'var(--foreground)' }}>

      {/* ═══════════════════════════════════════
          HERO SECTION — Asymmetric Editorial
          ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden editorial-section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>

        {/* Oversized Background Typography */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          style={{ zIndex: 0 }}
        >
          <span
            className="bg-text"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              whiteSpace: 'nowrap',
              opacity: 0.6,
            }}
          >
            REMEMBER
          </span>
        </div>

        {/* Floating Decorative Objects */}
        <FloatingIcon className="float-object" style={{ top: '12%', left: '8%' }}>📷</FloatingIcon>
        <FloatingIcon className="float-object-2" style={{ top: '20%', right: '12%' }}>💊</FloatingIcon>
        <FloatingIcon className="float-object-3" style={{ bottom: '25%', left: '5%' }}>💧</FloatingIcon>
        <FloatingIcon className="float-object" style={{ bottom: '15%', right: '8%' }}>🧩</FloatingIcon>
        <FloatingIcon className="float-object-2" style={{ top: '35%', left: '15%' }}>❤️</FloatingIcon>
        <FloatingIcon className="float-object-3" style={{ top: '60%', right: '15%' }}>📅</FloatingIcon>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center" style={{ minHeight: '70vh' }}>

            {/* Left — Editorial Headline */}
            <div className="lg:col-span-5 reveal-up">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <span className="eyebrow-label" style={{ color: 'var(--accent)' }}>01/08</span>
                <span className="eyebrow-label">PERSON-CENTERED DEMENTIA CARE</span>
              </div>

              <h1 className="editorial-headline mb-8">
                CARE<br />
                THAT<br />
                STAYS<br />
                <span style={{ color: 'var(--accent)' }}>WITH YOU.</span>
              </h1>

              <p className="text-lg sm:text-xl leading-relaxed mb-10 max-w-md" style={{ color: 'var(--muted)' }}>
                A gentle digital companion designed to support memory, routines and everyday wellbeing for elderly individuals.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/patient" className="accent-btn text-lg px-8 py-4">
                  Get Started
                </Link>
                <Link to="/games" className="secondary-btn text-lg px-8 py-4">
                  Explore Care
                </Link>
              </div>
            </div>

            {/* Center — Memory Care Device Illustration */}
            <div className="lg:col-span-4 flex items-center justify-center relative reveal-up-delay-2">
              <div className="relative" style={{ width: 'clamp(240px, 28vw, 360px)', height: 'clamp(300px, 35vw, 440px)' }}>
                {/* Device body */}
                <div
                  className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center gap-3 overflow-hidden"
                  style={{
                    background: 'var(--accent)',
                    boxShadow: '0 32px 80px rgba(255,101,0,0.2), 0 8px 24px rgba(255,101,0,0.1)',
                  }}
                >
                  {/* Screen */}
                  <div
                    className="rounded-2xl flex flex-col items-center justify-center gap-2 p-4"
                    style={{
                      width: '80%',
                      height: '55%',
                      background: 'var(--white)',
                      boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.06)',
                    }}
                  >
                    <span style={{ fontSize: '3rem' }}>🧠</span>
                    <span className="text-sm font-bold" style={{ color: 'var(--foreground)', letterSpacing: '0.05em' }}>MINDCARE</span>
                    <div className="flex gap-2 mt-1">
                      <span style={{ fontSize: '1.2rem' }}>💊</span>
                      <span style={{ fontSize: '1.2rem' }}>💧</span>
                      <span style={{ fontSize: '1.2rem' }}>📅</span>
                      <span style={{ fontSize: '1.2rem' }}>📷</span>
                    </div>
                  </div>
                  {/* Device bottom */}
                  <div className="flex gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.5)' }}></div>
                    <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.3)' }}></div>
                    <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.3)' }}></div>
                  </div>
                </div>

                {/* Floating cards around device */}
                <div
                  className="absolute float-object-2 rounded-xl p-3 flex items-center gap-2"
                  style={{
                    top: '-8%',
                    right: '-20%',
                    background: 'var(--white)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  <span>💊</span> Medication
                </div>

                <div
                  className="absolute float-object-3 rounded-xl p-3 flex items-center gap-2"
                  style={{
                    bottom: '5%',
                    left: '-25%',
                    background: 'var(--white)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  <span>🧩</span> Cognitive
                </div>

                <div
                  className="absolute float-object rounded-xl p-3 flex items-center gap-2"
                  style={{
                    top: '30%',
                    left: '-30%',
                    background: 'var(--white)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  <span>❤️</span> Family
                </div>
              </div>
            </div>

            {/* Right — Large Statistic */}
            <div className="lg:col-span-3 flex flex-col justify-center reveal-up-delay-3">
              <div className="metric-huge" style={{ color: 'var(--foreground)' }}>86</div>
              <div className="eyebrow-label mt-3" style={{ fontSize: '0.85rem', letterSpacing: '0.15em' }}>
                COGNITIVE<br />SCORE
              </div>
              <p className="text-sm mt-4 leading-relaxed" style={{ color: 'var(--muted)' }}>
                Maya's daily cognitive activities are being completed consistently with measurable improvement.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 01 — The Problem
          ═══════════════════════════════════════ */}
      <section className="editorial-section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-16 reveal-up">
            <span className="eyebrow-label mb-4 block" style={{ color: 'var(--accent)' }}>THE CHALLENGE</span>
            <h2 className="editorial-headline-sm max-w-3xl">
              MEMORY CARE<br />
              SHOULDN'T FEEL<br />
              <span style={{ color: 'var(--accent)' }}>COMPLICATED.</span>
            </h2>
            <p className="text-lg mt-6 max-w-2xl leading-relaxed" style={{ color: 'var(--muted)' }}>
              Limited specialized centers, language barriers, and caregiver burnout create gaps in dementia care across India's North Eastern Region.
            </p>
          </div>

          {/* Three Asymmetric Blocks */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">

            {/* Block 1 — Large */}
            <div
              className="editorial-card p-8 sm:p-10 reveal-up-delay-1"
              style={{ background: 'var(--foreground)', color: 'var(--white)', border: 'none' }}
            >
              <span className="text-4xl mb-6 block">🔄</span>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3" style={{ letterSpacing: '-0.02em' }}>ROUTINES</h3>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Remember what matters. Automated medication tracking, daily schedules, and gentle reminders that adapt to each patient.
              </p>
              <Link to="/reminders" className="inline-block mt-6 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                View Schedules →
              </Link>
            </div>

            {/* Block 2 — Accent */}
            <div
              className="editorial-card p-8 sm:p-10 reveal-up-delay-2"
              style={{ background: 'var(--accent)', color: 'var(--black)', border: 'none' }}
            >
              <span className="text-4xl mb-6 block">🧠</span>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3" style={{ letterSpacing: '-0.02em' }}>COGNITION</h3>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(0,0,0,0.7)' }}>
                Keep the mind active. AI-adaptive cognitive games that adjust difficulty in real-time based on patient performance.
              </p>
              <Link to="/games" className="inline-block mt-6 text-sm font-semibold" style={{ color: 'var(--black)' }}>
                Explore Games →
              </Link>
            </div>

            {/* Block 3 — Light */}
            <div className="editorial-card p-8 sm:p-10 reveal-up-delay-3">
              <span className="text-4xl mb-6 block">👨‍👩‍👧</span>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3" style={{ letterSpacing: '-0.02em' }}>CONNECTION</h3>
              <p className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
                Keep families close. Photo memory bank, caregiver dashboards, and clinical insights bridge the distance.
              </p>
              <Link to="/caregiver" className="inline-block mt-6 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                Caregiver Portal →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 02 — Platform Capabilities
          ═══════════════════════════════════════ */}
      <section className="editorial-section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16 reveal-up">
            <span className="eyebrow-label mb-4 block" style={{ color: 'var(--accent)' }}>PLATFORM</span>
            <h2 className="editorial-headline-sm mx-auto">
              {t('keyFeatures')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">

            {/* Feature 1 */}
            <div className="editorial-card p-8 sm:p-10 flex flex-col justify-between reveal-up-delay-1">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="eyebrow-label" style={{ color: 'var(--accent)' }}>01</span>
                  <span style={{ fontSize: '2.5rem' }}>🧠</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">Cognitive Games</h3>
                <p className="leading-relaxed" style={{ color: 'var(--muted)' }}>
                  Card Matching, Operator Memory, and Sequence Recall with AI difficulty adjustment. Multilingual support across English, Hindi, and Assamese.
                </p>
              </div>
              <Link to="/games" className="mt-8 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                Explore Games →
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="editorial-card p-8 sm:p-10 flex flex-col justify-between reveal-up-delay-2">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="eyebrow-label" style={{ color: 'var(--accent)' }}>02</span>
                  <span style={{ fontSize: '2.5rem' }}>🔔</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">Smart Reminders</h3>
                <p className="leading-relaxed" style={{ color: 'var(--muted)' }}>
                  Medication, hydration, and daily routine alerts with one-tap completion. Designed for elderly accessibility.
                </p>
              </div>
              <Link to="/reminders" className="mt-8 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                View Schedules →
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="editorial-card p-8 sm:p-10 flex flex-col justify-between reveal-up-delay-3">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="eyebrow-label" style={{ color: 'var(--accent)' }}>03</span>
                  <span style={{ fontSize: '2.5rem' }}>📊</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">Progress Analytics</h3>
                <p className="leading-relaxed" style={{ color: 'var(--muted)' }}>
                  Weekly memory index tracking, completion times, and clinical cognitive trends with visual charts.
                </p>
              </div>
              <Link to="/progress" className="mt-8 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                View Progress →
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="editorial-card p-8 sm:p-10 flex flex-col justify-between reveal-up-delay-4">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="eyebrow-label" style={{ color: 'var(--accent)' }}>04</span>
                  <span style={{ fontSize: '2.5rem' }}>🩺</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">Caregiver Portal</h3>
                <p className="leading-relaxed" style={{ color: 'var(--muted)' }}>
                  Real-time clinical alerts, AI diagnostic insights, and family photo memory bank for reminiscence therapy.
                </p>
              </div>
              <Link to="/caregiver" className="mt-8 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                Caregiver Portal →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 03 — Regional Context
          ═══════════════════════════════════════ */}
      <section className="editorial-section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Challenge */}
            <div className="reveal-up">
              <span className="eyebrow-label mb-4 block" style={{ color: 'var(--muted)' }}>THE REGIONAL CHALLENGE</span>
              <h2 className="editorial-headline-sm mb-8">
                Dementia Care Gap in the North Eastern Region
              </h2>
              <div className="space-y-5">
                {[
                  'Limited specialized geriatric neurological centers in remote hilly terrains.',
                  'Language barriers preventing usage of generic English-only cognitive tools.',
                  'Caregiver burnout without automated medication tracking or performance alerts.',
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="text-lg mt-0.5" style={{ color: 'var(--accent)' }}>✕</span>
                    <p className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution */}
            <div
              className="rounded-2xl p-8 sm:p-10 reveal-up-delay-2"
              style={{
                background: 'var(--foreground)',
                color: 'var(--white)',
              }}
            >
              <span className="eyebrow-label mb-4 block" style={{ color: 'var(--accent)' }}>OUR SOLUTION</span>
              <h3 className="text-2xl sm:text-3xl font-bold mb-6" style={{ letterSpacing: '-0.02em' }}>
                MindSaathi: Compassionate AI Companion
              </h3>
              <div className="space-y-5">
                {[
                  'Adaptive AI difficulty scaling to match patient memory pace.',
                  'Multilingual support (English, Hindi, Assamese) with Voice Command.',
                  'Full Offline PWA simulation for low-connectivity terrain.',
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="text-lg mt-0.5" style={{ color: 'var(--accent)' }}>✓</span>
                    <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════ */}
      <footer className="py-10 text-center" style={{ borderTop: '1px solid var(--border)' }}>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          © 2026 MindSaathi — Smart India Hackathon Prototype for North Eastern Region Elderly Dementia Care
        </p>
      </footer>

    </div>
  );
}

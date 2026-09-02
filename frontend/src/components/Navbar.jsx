import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAIAdaptive } from '../context/AIAdaptiveContext';
import VoiceAssistantModal from './VoiceAssistantModal';

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const { isOffline, toggleOffline } = useAIAdaptive();
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = 0;
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      lastY = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: t('home') },
    { path: '/patient', label: t('dashboard') },
    { path: '/games', label: t('games') },
    { path: '/progress', label: t('progress') },
    { path: '/reminders', label: t('reminders') },
  ];

  return (
    <>
      <header
        className="sticky top-0 z-40 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(238,238,236,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">

            {/* Logo — Geometric text mark */}
            <Link to="/" className="flex items-center gap-2.5 group" aria-label="MindSaathi Home">
              <span className="text-2xl" style={{ color: 'var(--accent)' }}>✦</span>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight" style={{ color: 'var(--foreground)', letterSpacing: '-0.03em' }}>
                MindSaathi
              </span>
            </Link>

            {/* Center Navigation — Light gray pill */}
            <nav
              className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-full"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              aria-label="Main navigation"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                      isActive
                        ? 'font-bold'
                        : 'hover:opacity-80'
                    }`
                  }
                  style={({ isActive }) => ({
                    color: isActive ? 'var(--white)' : 'var(--muted)',
                    background: isActive ? 'var(--foreground)' : 'transparent',
                  })}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">

              {/* Offline indicator — subtle dot */}
              <button
                onClick={toggleOffline}
                title="Toggle Offline Mode"
                className="px-3 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all duration-200"
                style={{
                  background: isOffline ? '#fff3e0' : 'var(--surface)',
                  color: isOffline ? 'var(--accent-dark)' : 'var(--muted)',
                  border: `1px solid ${isOffline ? 'var(--accent)' : 'var(--border)'}`,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: isOffline ? 'var(--accent)' : '#22c55e',
                  }}
                />
                <span className="hidden sm:inline">{isOffline ? t('offline') : t('online')}</span>
              </button>

              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-sm font-semibold rounded-full px-3 py-2 cursor-pointer focus:outline-none transition"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--foreground)',
                }}
                aria-label="Select language"
              >
                <option value="en">EN</option>
                <option value="hi">HI</option>
                <option value="as">AS</option>
              </select>

              {/* Voice Assistant — minimal */}
              <button
                onClick={() => setIsVoiceOpen(true)}
                className="px-3 sm:px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 transition-all duration-200"
                style={{
                  background: 'var(--accent)',
                  color: 'var(--black)',
                }}
                aria-label="Open voice assistant"
              >
                <span className="text-base">🎤</span>
                <span className="hidden sm:inline">{t('voiceAssistant')}</span>
              </button>

              {/* Caregiver link */}
              <NavLink
                to="/caregiver"
                className="hidden md:flex px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200"
                style={({ isActive }) => ({
                  background: isActive ? 'var(--foreground)' : 'var(--surface)',
                  color: isActive ? 'var(--white)' : 'var(--foreground)',
                  border: `1px solid ${isActive ? 'var(--foreground)' : 'var(--border)'}`,
                })}
              >
                {t('caregiver')}
              </NavLink>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-full transition"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <span className="text-xl">{mobileMenuOpen ? '✕' : '☰'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden px-4 py-4 space-y-1"
            style={{
              background: 'var(--background)',
              borderTop: '1px solid var(--border)',
            }}
          >
            {[...navItems, { path: '/caregiver', label: t('caregiver') }].map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3.5 rounded-xl font-semibold text-lg transition-all"
                style={({ isActive }) => ({
                  background: isActive ? 'var(--foreground)' : 'transparent',
                  color: isActive ? 'var(--white)' : 'var(--foreground)',
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      <VoiceAssistantModal isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
    </>
  );
}

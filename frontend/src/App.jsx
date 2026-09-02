import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AIAdaptiveProvider } from './context/AIAdaptiveContext';
import Navbar from './components/Navbar';

import LandingPage from './pages/LandingPage';
import PatientDashboard from './pages/PatientDashboard';
import GamesPage from './pages/GamesPage';
import ProgressPage from './pages/ProgressPage';
import RemindersPage from './pages/RemindersPage';
import CaregiverDashboard from './pages/CaregiverDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AIAdaptiveProvider>
          <div className="min-h-screen flex flex-col" style={{ background: 'var(--background)', color: 'var(--foreground)', fontFamily: "'Inter', sans-serif" }}>
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/patient" element={<PatientDashboard />} />
                <Route path="/games" element={<GamesPage />} />
                <Route path="/progress" element={<ProgressPage />} />
                <Route path="/reminders" element={<RemindersPage />} />
                <Route path="/caregiver" element={<CaregiverDashboard />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </AIAdaptiveProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
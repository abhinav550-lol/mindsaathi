import React, { createContext, useContext, useState, useEffect } from 'react';

const INITIAL_REMINDERS = [
  { id: 'rem-1', type: 'medication', title: 'Donepezil (Aricept) 5mg', time: '08:00 AM', completed: true, icon: '💊', note: 'Take 1 tablet after breakfast' },
  { id: 'rem-2', type: 'hydration', title: 'Hydration Goal (4/8 cups)', time: '11:00 AM', completed: false, icon: '💧', note: 'Drink 1 full glass of water' },
  { id: 'rem-3', type: 'medication', title: 'Memantine HCL 10mg', time: '02:00 PM', completed: false, icon: '💊', note: 'Take 1 tablet after lunch' },
  { id: 'rem-4', type: 'activity', title: 'Gentle Morning Garden Walk', time: '05:00 PM', completed: false, icon: '🌱', note: '15 minutes fresh air walk' },
  { id: 'rem-5', type: 'appointment', title: 'Dr. Barua (Neurology Visit)', time: 'Tomorrow 10:00 AM', completed: false, icon: '🩺', note: 'Guwahati Neurological Clinic' },
];

const INITIAL_SESSIONS = [
  { id: 's-1', gameId: 'card-matching', gameName: 'Card Matching', date: 'Yesterday', score: 85, level: 1, completed: true, aiAdjustment: 'Stayed Level 1' },
  { id: 's-2', gameId: 'operator-memory', gameName: 'Operator Memory', date: 'Yesterday', score: 92, level: 1, completed: true, aiAdjustment: 'Promoted to Level 2' },
  { id: 's-3', gameId: 'sequence-recall', gameName: 'Sequence Recall', date: 'Today, 10:30 AM', score: 78, level: 2, completed: true, aiAdjustment: 'Optimized Level 2' },
];

const AIAdaptiveContext = createContext();

export const AIAdaptiveProvider = ({ children }) => {
  // Mode: 'auto' | 'manual'
  const [gameMode, setGameMode] = useState('auto');
  
  // Offline simulation state
  const [isOffline, setIsOffline] = useState(() => {
    return localStorage.getItem('mindsaathi_offline') === 'true';
  });

  // Game levels state
  const [gameLevels, setGameLevels] = useState(() => {
    const saved = localStorage.getItem('mindsaathi_levels');
    return saved ? JSON.parse(saved) : {
      'card-matching': 1,
      'operator-memory': 1,
      'sequence-recall': 1
    };
  });

  // Patient performance stats
  const [patientStats, setPatientStats] = useState({
    cognitiveScore: 86,
    memoryScore: 88,
    attentionScore: 83,
    calcScore: 85,
    gamesPlayed: 14,
    streakDays: 5
  });

  // Mood state
  const [currentMood, setCurrentMood] = useState('Great');

  // Reminders list state
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('mindsaathi_reminders');
    return saved ? JSON.parse(saved) : INITIAL_REMINDERS;
  });

  // Hydration count
  const [waterCups, setWaterCups] = useState(4);

  // Session history
  const [sessionHistory, setSessionHistory] = useState(() => {
    const saved = localStorage.getItem('mindsaathi_sessions');
    return saved ? JSON.parse(saved) : INITIAL_SESSIONS;
  });

  // Last AI Insight message
  const [lastAiInsight, setLastAiInsight] = useState(null);

  // Save changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('mindsaathi_offline', isOffline);
  }, [isOffline]);

  useEffect(() => {
    localStorage.setItem('mindsaathi_levels', JSON.stringify(gameLevels));
  }, [gameLevels]);

  useEffect(() => {
    localStorage.setItem('mindsaathi_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('mindsaathi_sessions', JSON.stringify(sessionHistory));
  }, [sessionHistory]);

  const toggleOffline = () => {
    setIsOffline((prev) => !prev);
  };

  const toggleReminder = (id) => {
    setReminders((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const addWaterCup = () => {
    setWaterCups((prev) => Math.min(prev + 1, 8));
  };

  // Adaptive Difficulty Rule Engine
  const recordGameResult = ({ gameId, gameName, score, completed, completionTime, accuracy }) => {
    const currentLevel = gameLevels[gameId] || 1;
    let nextLevel = currentLevel;
    let adjustmentMsg = '';

    // Logic: If completed successfully with high score (>= 80) -> increase level (max 5)
    // If failed or low score (< 50) -> decrease level (min 1)
    if (completed && (score >= 80 || accuracy >= 80)) {
      nextLevel = Math.min(5, currentLevel + 1);
      if (nextLevel > currentLevel) {
        adjustmentMsg = `AI Insight: Great accuracy! Speed & recall improved. Next session difficulty increased to Level ${nextLevel}.`;
      } else {
        adjustmentMsg = `AI Insight: Excellent work at Level 5! Maximum cognitive challenge maintained.`;
      }
    } else if (!completed || score < 50) {
      nextLevel = Math.max(1, currentLevel - 1);
      if (nextLevel < currentLevel) {
        adjustmentMsg = `AI Insight: Game pace was challenging. AI adjusted difficulty down to Level ${nextLevel} for comfortable play.`;
      } else {
        adjustmentMsg = `AI Insight: Good effort! Difficulty kept at Level 1 to build foundational recall.`;
      }
    } else {
      adjustmentMsg = `AI Insight: Steady performance! Recommended keeping Level ${currentLevel} to solidify neural pathways.`;
    }

    // Update level state if auto mode enabled or requested
    if (gameMode === 'auto') {
      setGameLevels((prev) => ({
        ...prev,
        [gameId]: nextLevel
      }));
    }

    setLastAiInsight({
      gameId,
      gameName,
      previousLevel: currentLevel,
      newLevel: nextLevel,
      score,
      message: adjustmentMsg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Update Session History
    const newSession = {
      id: `s-${Date.now()}`,
      gameId,
      gameName,
      date: 'Just now',
      score: Math.round(score),
      level: currentLevel,
      completed,
      aiAdjustment: nextLevel > currentLevel ? `Up to L${nextLevel}` : nextLevel < currentLevel ? `Down to L${nextLevel}` : `Stayed L${currentLevel}`
    };

    setSessionHistory((prev) => [newSession, ...prev]);

    // Recalculate patient stats
    setPatientStats((prev) => ({
      ...prev,
      cognitiveScore: Math.min(100, Math.round(prev.cognitiveScore * 0.9 + score * 0.1)),
      gamesPlayed: prev.gamesPlayed + 1
    }));

    return adjustmentMsg;
  };

  return (
    <AIAdaptiveContext.Provider
      value={{
        gameMode,
        setGameMode,
        isOffline,
        toggleOffline,
        gameLevels,
        setGameLevels,
        patientStats,
        currentMood,
        setCurrentMood,
        reminders,
        toggleReminder,
        waterCups,
        addWaterCup,
        sessionHistory,
        lastAiInsight,
        recordGameResult,
      }}
    >
      {children}
    </AIAdaptiveContext.Provider>
  );
};

export const useAIAdaptive = () => useContext(AIAdaptiveContext);

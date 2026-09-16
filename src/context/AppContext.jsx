import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_STUDENT,
  INITIAL_SUBJECTS,
  INITIAL_CONCEPTS_DS,
  INITIAL_NOTES,
  INITIAL_ACHIEVEMENTS
} from '../data/initialData';

const AppContext = createContext();

const STORAGE_KEYS = {
  USER: 'concepta_user_v2',
  CONCEPTS: 'concepta_concepts_v2',
  SUBJECTS: 'concepta_subjects_v2',
  NOTES: 'concepta_notes_v2',
  ACHIEVEMENTS: 'concepta_achievements_v2',
  QUIZ_HISTORY: 'concepta_quiz_history_v2',
  CURRENT_VIEW: 'concepta_current_view_v2',
  REASSESSMENT_DONE: 'concepta_reassessment_done_v2'
};

export function AppProvider({ children }) {
  // 1. Initialize State with LocalStorage fallbacks
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    return saved ? JSON.parse(saved) : INITIAL_STUDENT;
  });

  const [concepts, setConcepts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONCEPTS);
    return saved ? JSON.parse(saved) : INITIAL_CONCEPTS_DS;
  });

  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
    return saved ? JSON.parse(saved) : INITIAL_SUBJECTS;
  });

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTES);
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });

  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
  });

  const [quizHistory, setQuizHistory] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);
    return saved ? JSON.parse(saved) : [
      {
        id: 'q-init',
        title: 'Data Structures Diagnostic',
        date: 'Today, 10:30 AM',
        overallScore: 61.8,
        primaryGap: 'Sliding Window',
        type: 'Diagnostic'
      }
    ];
  });

  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_VIEW) || 'dashboard';
  });

  const [reassessmentDone, setReassessmentDone] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.REASSESSMENT_DONE) === 'true';
  });

  const [selectedSubjectId, setSelectedSubjectId] = useState('ds');

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONCEPTS, JSON.stringify(concepts));
  }, [concepts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(quizHistory));
  }, [quizHistory]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_VIEW, currentView);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REASSESSMENT_DONE, String(reassessmentDone));
  }, [reassessmentDone]);

  // Navigation
  const navigate = (viewName) => {
    setCurrentView(viewName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Activity Recording Engine (Updates streak only on real learning action!)
  const recordActivity = (activityType) => {
    const today = new Date().toISOString().split('T')[0];

    setUser(prev => {
      const isNewDay = prev.lastActivityDate !== today;
      const newStreak = isNewDay ? prev.masteryStreak + 1 : prev.masteryStreak;
      
      // Bonus coins every 10 continuous streak days
      const streakBonusCoin = (newStreak % 10 === 0 && isNewDay) ? 1 : 0;

      // Increment daily concepts completed if activity is learning or reassessment
      const isConceptComplete = activityType === 'learning' || activityType === 'reassessment';
      const newConceptsCompleted = isConceptComplete
        ? Math.min(prev.dailyConceptsTarget, prev.dailyConceptsCompleted + 1)
        : prev.dailyConceptsCompleted;

      // Daily goal completion bonus coins
      const hitDailyGoal = newConceptsCompleted >= prev.dailyConceptsTarget && prev.dailyConceptsCompleted < prev.dailyConceptsTarget;
      const goalBonusCoins = hitDailyGoal ? 40 : 0;

      return {
        ...prev,
        masteryStreak: newStreak,
        lastActivityDate: today,
        dailyConceptsCompleted: newConceptsCompleted,
        conceptCoins: prev.conceptCoins + streakBonusCoin + goalBonusCoins
      };
    });

    checkAchievementTriggers();
  };

  // Check & Unlock Achievement Triggers
  const checkAchievementTriggers = (customEvents = {}) => {
    setAchievements(prev => prev.map(ach => {
      let shouldUnlock = ach.unlocked;

      if (ach.id === 'first_mastered') {
        shouldUnlock = concepts.some(c => c.mastery >= 80);
      } else if (ach.id === 'streak_7') {
        shouldUnlock = user.masteryStreak >= 7;
      } else if (ach.id === 'streak_10') {
        shouldUnlock = user.masteryStreak >= 10;
      } else if (ach.id === 'gap_crusher') {
        shouldUnlock = customEvents.gapCrushed || reassessmentDone;
      } else if (ach.id === 'learning_explorer') {
        shouldUnlock = notes.filter(n => n.completed).length >= 1;
      }

      if (shouldUnlock && !ach.unlocked) {
        // Award coins on unlock
        setUser(u => ({ ...u, conceptCoins: u.conceptCoins + ach.rewardCoins }));
        return {
          ...ach,
          unlocked: true,
          unlockedAt: new Date().toISOString().split('T')[0],
          progress: 100
        };
      }

      return ach;
    }));
  };

  // Buy Streak Freeze Shop Action (100 coins = 1 freeze)
  const buyStreakFreeze = () => {
    if (user.conceptCoins >= 100) {
      setUser(prev => ({
        ...prev,
        conceptCoins: prev.conceptCoins - 100,
        streakFreezes: (prev.streakFreezes || 0) + 1
      }));
      return true;
    }
    return false;
  };

  // Smart Study Timer Session Complete Action
  const completeTimerSession = (minutesEarned, coinsEarned) => {
    setUser(prev => ({
      ...prev,
      dailyTargetCompletedMinutes: prev.dailyTargetCompletedMinutes + minutesEarned,
      conceptCoins: prev.conceptCoins + coinsEarned
    }));
    recordActivity('timer');
  };

  // Student Profile / Registration
  const registerUser = (email, password) => {
    setUser(prev => ({
      ...prev,
      email,
      isRegistered: true,
      isOnboarded: false
    }));
    navigate('onboarding');
  };

  const completeOnboarding = (onboardingData) => {
    setUser(prev => ({
      ...prev,
      ...onboardingData,
      isOnboarded: true
    }));
    navigate('dashboard');
  };

  const updateUserProfile = (updatedFields) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
  };

  const markNoteComplete = (noteId) => {
    setNotes(prev => prev.map(n => n.id === noteId ? { ...n, completed: !n.completed } : n));
    recordActivity('note');
  };

  // Diagnostic Quiz Submission Engine
  const submitDiagnosticQuiz = (calculatedScores) => {
    const updatedConcepts = concepts.map(c => {
      const score = calculatedScores[c.name] !== undefined ? calculatedScores[c.name] : c.mastery;
      let status = 'Needs Attention';
      if (score >= 80) status = 'Mastered';
      else if (score >= 50) status = 'Developing';

      return {
        ...c,
        mastery: score,
        status,
        isPrimaryGap: false
      };
    });

    let lowestScore = 100;
    let gapId = 'c-sliding-window';
    updatedConcepts.forEach(c => {
      if (c.mastery < lowestScore) {
        lowestScore = c.mastery;
        gapId = c.id;
      }
    });

    const finalConcepts = updatedConcepts.map(c => ({
      ...c,
      isPrimaryGap: c.id === gapId
    }));

    setConcepts(finalConcepts);

    const avg = Math.round(finalConcepts.reduce((acc, curr) => acc + curr.mastery, 0) / finalConcepts.length);
    setSubjects(prev => prev.map(s => s.id === 'ds' ? { ...s, averageMastery: avg, status: 'In Progress' } : s));

    setUser(prev => ({ ...prev, conceptCoins: prev.conceptCoins + 20 }));
    setQuizHistory(prev => [
      {
        id: `q-${Date.now()}`,
        title: 'Data Structures Diagnostic',
        date: 'Just now',
        overallScore: avg,
        primaryGap: finalConcepts.find(c => c.isPrimaryGap)?.name || 'Sliding Window',
        type: 'Diagnostic'
      },
      ...prev
    ]);

    recordActivity('quiz');
    navigate('analysis');
  };

  // Reassessment Completion (Sliding Window: 28% -> 81%)
  const submitReassessmentQuiz = (newScore = 81) => {
    const updatedConcepts = concepts.map(c => {
      if (c.name === 'Sliding Window' || c.id === 'c-sliding-window') {
        return {
          ...c,
          mastery: newScore,
          status: newScore >= 80 ? 'Mastered' : newScore >= 50 ? 'Developing' : 'Needs Attention',
          isPrimaryGap: false
        };
      }
      return c;
    });

    let lowestScore = 100;
    let gapId = null;
    updatedConcepts.forEach(c => {
      if (c.mastery < lowestScore && c.mastery < 80) {
        lowestScore = c.mastery;
        gapId = c.id;
      }
    });

    const finalConcepts = updatedConcepts.map(c => ({
      ...c,
      isPrimaryGap: c.id === gapId
    }));

    setConcepts(finalConcepts);

    const avg = Math.round(finalConcepts.reduce((acc, curr) => acc + curr.mastery, 0) / finalConcepts.length);
    setSubjects(prev => prev.map(s => s.id === 'ds' ? { ...s, averageMastery: avg, status: 'In Progress' } : s));

    setUser(prev => ({
      ...prev,
      conceptCoins: prev.conceptCoins + 50,
      dailyTargetCompletedMinutes: Math.min(prev.dailyTargetMinutes, prev.dailyTargetCompletedMinutes + 15)
    }));

    setReassessmentDone(true);
    setQuizHistory(prev => [
      {
        id: `q-${Date.now()}`,
        title: 'Sliding Window Reassessment',
        date: 'Just now',
        overallScore: newScore,
        primaryGap: 'Resolved',
        type: 'Reassessment'
      },
      ...prev
    ]);

    recordActivity('reassessment');
    checkAchievementTriggers({ gapCrushed: true });
    navigate('reassessment');
  };

  // Reset Demo State
  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.CONCEPTS);
    localStorage.removeItem(STORAGE_KEYS.SUBJECTS);
    localStorage.removeItem(STORAGE_KEYS.NOTES);
    localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
    localStorage.removeItem(STORAGE_KEYS.QUIZ_HISTORY);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_VIEW);
    localStorage.removeItem(STORAGE_KEYS.REASSESSMENT_DONE);

    setUser(INITIAL_STUDENT);
    setConcepts(INITIAL_CONCEPTS_DS);
    setSubjects(INITIAL_SUBJECTS);
    setNotes(INITIAL_NOTES);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setQuizHistory([
      {
        id: 'q-init',
        title: 'Data Structures Diagnostic',
        date: 'Today, 10:30 AM',
        overallScore: 61.8,
        primaryGap: 'Sliding Window',
        type: 'Diagnostic'
      }
    ]);
    setReassessmentDone(false);
    setCurrentView('dashboard');
  };

  const primaryGapConcept = concepts.find(c => c.isPrimaryGap) || concepts.reduce((prev, curr) => (prev.mastery < curr.mastery ? prev : curr), concepts[0]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        concepts,
        subjects,
        notes,
        achievements,
        quizHistory,
        currentView,
        reassessmentDone,
        selectedSubjectId,
        setSelectedSubjectId,
        primaryGapConcept,
        navigate,
        recordActivity,
        buyStreakFreeze,
        completeTimerSession,
        registerUser,
        completeOnboarding,
        updateUserProfile,
        markNoteComplete,
        submitDiagnosticQuiz,
        submitReassessmentQuiz,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

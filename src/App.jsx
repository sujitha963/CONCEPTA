import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import SubjectsPage from './pages/SubjectsPage';
import DiagnosticQuizPage from './pages/DiagnosticQuizPage';
import AnalysisPage from './pages/AnalysisPage';
import KnowledgeMapPage from './pages/KnowledgeMapPage';
import GapResultPage from './pages/GapResultPage';
import RecommendedLearningPage from './pages/RecommendedLearningPage';
import NotesPage from './pages/NotesPage';
import PracticeQuizPage from './pages/PracticeQuizPage';
import ReassessmentPage from './pages/ReassessmentPage';
import ProgressPage from './pages/ProgressPage';
import ProfilePage from './pages/ProfilePage';
import HelpPage from './pages/HelpPage';

function MainLayout() {
  const { currentView } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Full-screen views without header/sidebar
  if (currentView === 'landing') return <LandingPage />;
  if (currentView === 'register') return <RegisterPage />;
  if (currentView === 'onboarding') return <OnboardingPage />;

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardPage />;
      case 'subjects':
        return <SubjectsPage />;
      case 'diagnostic-quiz':
        return <DiagnosticQuizPage />;
      case 'analysis':
        return <AnalysisPage />;
      case 'knowledge-map':
        return <KnowledgeMapPage />;
      case 'gap-result':
        return <GapResultPage />;
      case 'recommended-learning':
        return <RecommendedLearningPage />;
      case 'notes':
        return <NotesPage />;
      case 'practice-quiz':
        return <PracticeQuizPage />;
      case 'reassessment':
        return <ReassessmentPage />;
      case 'progress':
        return <ProgressPage />;
      case 'profile':
        return <ProfilePage />;
      case 'help':
        return <HelpPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="lg:pl-64 flex flex-col flex-1">
        <Header toggleMobileSidebar={() => setMobileOpen(!mobileOpen)} />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

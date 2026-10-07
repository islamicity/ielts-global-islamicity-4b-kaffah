import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { LearningModules } from './components/modules/LearningModules';
import { IeltsTestSimulator } from './components/ielts/IeltsTestSimulator';
import { WritingEvaluator } from './components/writing/WritingEvaluator';
import { SpeakingLab } from './components/speaking/SpeakingLab';
import { CommunityForum } from './components/forum/CommunityForum';
import { VocabFlashcards } from './components/flashcards/VocabFlashcards';
import { SecurityModal } from './components/security/SecurityModal';
import { SyncCenter } from './components/offline/SyncCenter';

function MainApp() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-body">
      {/* Top Bar Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'dashboard' && <DashboardOverview onNavigate={setActiveTab} />}
        {activeTab === 'modules' && <LearningModules />}
        {activeTab === 'vocab' && <VocabFlashcards />}
        {activeTab === 'tests' && <IeltsTestSimulator />}
        {activeTab === 'writing' && <WritingEvaluator />}
        {activeTab === 'speaking' && <SpeakingLab />}
        {activeTab === 'forum' && <CommunityForum />}
      </main>

      {/* Institutional Footer */}
      <Footer />

      {/* Floating Overlays / Modals */}
      <SecurityModal />
      <SyncCenter />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

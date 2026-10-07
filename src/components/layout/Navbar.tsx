import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Wifi, WifiOff, RefreshCw } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { 
    language, 
    setLanguage, 
    offlineMode, 
    setOfflineMode, 
    isSyncing, 
    triggerSmartSync,
    setSecurityModalOpen,
    setSyncModalOpen,
    syncQueue
  } = useApp();

  const pendingCount = syncQueue.filter(i => i.status === 'pending_sync').length;

  const navItems = [
    { id: 'dashboard', labelEn: 'Overview', labelId: 'Ringkasan' },
    { id: 'modules', labelEn: '4B Modules', labelId: 'Modul 4B' },
    { id: 'vocab', labelEn: 'Vocab SRS', labelId: 'Flashcard SRS' },
    { id: 'tests', labelEn: 'IELTS Tests', labelId: 'Tes IELTS' },
    { id: 'writing', labelEn: 'Writing Lab', labelId: 'Lab Menulis' },
    { id: 'speaking', labelEn: 'Speaking Lab', labelId: 'Lab Berbicara' },
    { id: 'forum', labelEn: 'Global Forum', labelId: 'Forum Global' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900 border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <button 
          onClick={() => setActiveTab('dashboard')} 
          className="text-left group cursor-pointer focus-visible:outline-none"
        >
          <span className="font-display text-lg tracking-wider font-bold text-amber-300 group-hover:text-amber-200 transition-colors whitespace-nowrap">
            ISLAMICITY 4B KAFFAH
          </span>
        </button>

        {/* Zone 2: Navigation Links (clean single-line text links with subtle hover) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-300">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`transition-colors whitespace-nowrap cursor-pointer py-1 ${
                  isActive
                    ? 'text-amber-300 font-semibold border-b-2 border-amber-400'
                    : 'hover:text-stone-100 text-stone-300'
                }`}
              >
                {language === 'en' ? item.labelEn : item.labelId}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Offline/Sync, Security MFA, Language) */}
        <div className="flex items-center gap-3">
          {/* Offline / Cloud Sync Control */}
          <button
            onClick={() => setSyncModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md bg-stone-800 border border-stone-700 hover:bg-stone-750 text-stone-200 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            title="Smart Cloud Sync & Offline State"
          >
            {offlineMode ? (
              <WifiOff className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            ) : (
              <Wifi className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            )}
            <span className="hidden sm:inline font-mono">
              {offlineMode ? 'Offline' : 'Cloud Synced'}
            </span>
            {pendingCount > 0 && (
              <span className="px-1 text-[10px] font-mono rounded bg-amber-900/60 text-amber-300 border border-amber-600/40">
                {pendingCount}
              </span>
            )}
            {isSyncing && (
              <RefreshCw className="w-3 h-3 text-amber-400 animate-spin" />
            )}
          </button>

          {/* Security & MFA */}
          <button
            onClick={() => setSecurityModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md bg-stone-800 border border-stone-700 hover:bg-stone-750 text-stone-200 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            title="End-to-End Encryption & Security Verification"
          >
            <Shield className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span className="hidden md:inline">E2EE / MFA</span>
          </button>

          {/* Bilingual Language Switcher */}
          <div className="flex items-center bg-stone-800 rounded-md p-0.5 border border-stone-700 text-xs">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer whitespace-nowrap font-medium ${
                language === 'en'
                  ? 'bg-amber-400 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('id')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer whitespace-nowrap font-medium ${
                language === 'id'
                  ? 'bg-amber-400 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              ID
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Secondary Navigation Row */}
      <div className="lg:hidden border-t border-stone-800 bg-stone-900/95 overflow-x-auto px-4 py-2 flex items-center gap-4 text-xs font-medium scrollbar-none">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`whitespace-nowrap transition-colors py-0.5 ${
              activeTab === item.id
                ? 'text-amber-300 font-semibold border-b border-amber-400'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            {language === 'en' ? item.labelEn : item.labelId}
          </button>
        ))}
      </div>
    </header>
  );
};

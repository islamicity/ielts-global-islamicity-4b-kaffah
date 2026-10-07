import React from 'react';
import { useApp } from '../../context/AppContext';
import { IMAGES } from '../../assets/images';
import { PILLARS_DATA } from '../../data/islamicityData';
import { GuidedStudyRoadmap } from './GuidedStudyRoadmap';
import { PracticeTrendsChart } from './PracticeTrendsChart';
import { 
  Award, 
  Flame, 
  Zap, 
  TrendingUp, 
  BookOpen, 
  Headphones, 
  PenTool, 
  Mic, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface DashboardOverviewProps {
  onNavigate: (tab: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigate }) => {
  const { 
    language, 
    testType, 
    setTestType, 
    deliveryMode, 
    setDeliveryMode, 
    userProfile, 
    updateTargetBand,
    completedLessons,
    setSecurityModalOpen
  } = useApp();

  return (
    <div className="space-y-10">
      
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 text-white shadow-xl">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.hero} 
            alt="International Academic Islamic Institute"
            className="w-full h-full object-cover object-center opacity-30 brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/85 to-stone-950/40" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 tracking-wider uppercase mb-3">
            <span>Global Islamicity Platform</span>
            <span aria-hidden="true">·</span>
            <span>4B Kaffah in IELTS Synergy</span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
            {language === 'en' 
              ? 'Empowering Global Scholars through 4B Kaffah & Band 9 Rigor' 
              : 'Menempa Cendekiawan Global melalui 4B Kaffah & Standar IELTS Band 9'}
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
            {language === 'en'
              ? 'Engage in Da\'wah, uphold Sharia, practice communal unity, and conduct ethical muamalah—seamlessly integrated with world-class IELTS Academic and General Training testing competencies.'
              : 'Berdakwah, Bersyariah, Berjamaah, dan Bermuamalah secara menyeluruh—diperkuat dengan penguasaan kecakapan bahasa Inggris internasional tingkat tinggi.'}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('modules')}
              className="px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>{language === 'en' ? 'Explore 4B Modules' : 'Mulai Modul 4B'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('tests')}
              className="px-5 py-2.5 rounded-lg bg-stone-800/90 hover:bg-stone-750 text-stone-200 border border-stone-700 font-medium text-sm transition-colors cursor-pointer"
            >
              {language === 'en' ? 'Take IELTS Mock Test' : 'Ikuti Tes Simulasi IELTS'}
            </button>
            <button
              onClick={() => onNavigate('vocab')}
              className="px-4 py-2.5 rounded-lg bg-stone-850 hover:bg-stone-800 text-amber-300 border border-stone-700 font-medium text-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>{language === 'en' ? 'Vocab SRS Deck' : 'Flashcard SRS'}</span>
            </button>
          </div>
        </div>

        {/* Banner Trust markers / verified badges */}
        <div className="relative z-10 border-t border-stone-800/80 bg-stone-950/60 px-6 sm:px-10 py-3 flex flex-wrap items-center justify-between text-xs text-stone-400 gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-stone-300 font-medium">{userProfile.verificationBadge}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-stone-300">
              <Lock className="w-3.5 h-3.5 text-teal-400" />
              <span>E2EE Active</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>Cross-Platform Cloud Sync</span>
          </div>
        </div>
      </div>

      {/* IELTS Test Configuration Bar */}
      <div className="p-4 sm:p-5 bg-white rounded-xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 block mb-1">
            {language === 'en' ? 'Target Examination Track' : 'Jalur Ujian Target'}
          </span>
          <div className="flex flex-wrap items-center gap-1 p-1 bg-stone-100 rounded-lg">
            <button
              onClick={() => setTestType('academic')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                testType === 'academic' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              IELTS Academic
            </button>
            <button
              onClick={() => setTestType('general')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                testType === 'general' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              IELTS General Training
            </button>
            <button
              onClick={() => setTestType('ukvi')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                testType === 'ukvi' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              IELTS UKVI
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 block mb-1">
              {language === 'en' ? 'Delivery Mode' : 'Metode Ujian'}
            </span>
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg">
              <button
                onClick={() => setDeliveryMode('computer')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  deliveryMode === 'computer' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Computer-delivered
              </button>
              <button
                onClick={() => setDeliveryMode('paper')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  deliveryMode === 'paper' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Paper-based
              </button>
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 block mb-1">
              {language === 'en' ? 'Target Band' : 'Target Skor Band'}
            </span>
            <div className="flex items-center gap-1.5">
              {[7.5, 8.0, 8.5, 9.0].map((b) => (
                <button
                  key={b}
                  onClick={() => updateTargetBand(b)}
                  className={`w-9 h-8 rounded-md text-xs font-semibold font-mono transition-colors cursor-pointer ${
                    userProfile.targetBand === b
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {b.toFixed(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Analytics & Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Band Projection */}
        <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span>Overall Projected Band</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-stone-900">
              {userProfile.currentProjectedBand.toFixed(1)}
            </span>
            <span className="text-xs text-stone-500 font-mono">
              / Target {userProfile.targetBand.toFixed(1)}
            </span>
          </div>
          <div className="mt-3 w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
              style={{ width: `${(userProfile.currentProjectedBand / 9.0) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-[11px] text-stone-500 flex justify-between">
            <span>Competent (6.5)</span>
            <span>Expert (9.0)</span>
          </div>
        </div>

        {/* Daily Streak */}
        <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span>Daily Study Streak</span>
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-orange-600">
              {userProfile.dailyStreak}
            </span>
            <span className="text-xs text-stone-500">consecutive days</span>
          </div>
          <p className="mt-3 text-xs text-stone-600">
            {language === 'en' ? 'Keep momentum for +100 bonus daily XP.' : 'Pertahankan konsistensi untuk bonus XP.'}
          </p>
        </div>

        {/* Knowledge XP & Level */}
        <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span>Knowledge XP & Level</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-stone-900">
              {userProfile.xpPoints.toLocaleString()}
            </span>
            <span className="text-xs text-stone-500">XP</span>
          </div>
          <p className="mt-3 text-xs font-semibold text-amber-700 truncate">
            {userProfile.levelTitle}
          </p>
        </div>

        {/* Modules Completed */}
        <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span>Curriculum Progress</span>
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-stone-900">
              {completedLessons.length}
            </span>
            <span className="text-xs text-stone-500">/ 4 Core Modules</span>
          </div>
          <div className="mt-3 w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-teal-600 h-full rounded-full transition-all duration-500" 
              style={{ width: `${(completedLessons.length / 4) * 100}%` }}
            />
          </div>
        </div>

      </div>

      {/* Guided Study Roadmap (Daily 4B Kaffah & IELTS Tailored Curriculum) */}
      <GuidedStudyRoadmap onNavigate={onNavigate} />

      {/* Practice Hours vs. IELTS Band Improvement Trend Visualization */}
      <PracticeTrendsChart />

      {/* IELTS 4 Skills Breakdown */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-stone-100">
          <div>
            <h2 className="font-display text-lg font-bold text-stone-900">
              {language === 'en' ? 'IELTS 4 Skills Diagnostic Breakdown' : 'Diagnostik 4 Keterampilan IELTS'}
            </h2>
            <p className="text-xs text-stone-500">
              {language === 'en' ? 'Performance based on rigorous scoring rubrics and authentic tests' : 'Hasil evaluasi berdasarkan rubrik skor resmi dan tes autentik'}
            </p>
          </div>
          <button 
            onClick={() => onNavigate('tests')}
            className="text-xs text-amber-700 font-semibold hover:text-amber-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>{language === 'en' ? 'Take Full Diagnostic Test' : 'Ikuti Tes Diagnostik Penuh'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div 
            onClick={() => onNavigate('tests')}
            className="p-4 rounded-lg border border-stone-200 bg-stone-50/60 hover:bg-white hover:border-amber-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-md bg-emerald-100/70 text-emerald-800">
                <Headphones className="w-4 h-4" />
              </div>
              <span className="font-mono text-lg font-bold text-stone-900">
                Band {userProfile.skillScores.listening.toFixed(1)}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-stone-900 mb-1 group-hover:text-emerald-800 transition-colors">
              Listening (30 mins)
            </h3>
            <p className="text-xs text-stone-500">
              40 questions across academic lectures & conversations.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('tests')}
            className="p-4 rounded-lg border border-stone-200 bg-stone-50/60 hover:bg-white hover:border-amber-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-md bg-teal-100/70 text-teal-800">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-mono text-lg font-bold text-stone-900">
                Band {userProfile.skillScores.reading.toFixed(1)}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-stone-900 mb-1 group-hover:text-teal-800 transition-colors">
              Reading (60 mins)
            </h3>
            <p className="text-xs text-stone-500">
              3 long academic passages with complex heading matching.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('writing')}
            className="p-4 rounded-lg border border-stone-200 bg-stone-50/60 hover:bg-white hover:border-amber-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-md bg-amber-100/70 text-amber-800">
                <PenTool className="w-4 h-4" />
              </div>
              <span className="font-mono text-lg font-bold text-stone-900">
                Band {userProfile.skillScores.writing.toFixed(1)}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-stone-900 mb-1 group-hover:text-amber-800 transition-colors">
              Writing (60 mins)
            </h3>
            <p className="text-xs text-stone-500">
              Task 1 (Data report / letter) & Task 2 (Discursive essay).
            </p>
          </div>

          <div 
            onClick={() => onNavigate('speaking')}
            className="p-4 rounded-lg border border-stone-200 bg-stone-50/60 hover:bg-white hover:border-amber-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-md bg-indigo-100/70 text-indigo-800">
                <Mic className="w-4 h-4" />
              </div>
              <span className="font-mono text-lg font-bold text-stone-900">
                Band {userProfile.skillScores.speaking.toFixed(1)}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-stone-900 mb-1 group-hover:text-indigo-800 transition-colors">
              Speaking (11-14 mins)
            </h3>
            <p className="text-xs text-stone-500">
              3-part live interview simulation with examiner audio.
            </p>
          </div>

        </div>
      </div>

      {/* The 4B Kaffah Core Pillars Matrix */}
      <div>
        <div className="mb-4">
          <h2 className="font-display text-xl font-bold text-stone-900">
            {language === 'en' ? 'The 4B Kaffah Educational Dimensions' : 'Dimensi Edukasi 4B Kaffah'}
          </h2>
          <p className="text-xs text-stone-500">
            {language === 'en'
              ? 'Comprehensive synthesis of Islamic values with academic inquiry and international rhetoric'
              : 'Sintesis komprehensif nilai-nilai Islam dengan pendekatan akademis dan retorika global'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PILLARS_DATA.map((pillar) => {
            const progress = userProfile.pillarProgress[pillar.id] || 0;
            return (
              <div 
                key={pillar.id}
                className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs hover:border-amber-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                      {language === 'en' ? pillar.titleEn : pillar.titleId}
                    </span>
                    <span className="text-xs font-mono font-medium text-stone-500">
                      {progress}% Mastered
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-stone-900 mb-2">
                    {language === 'en' ? pillar.subtitleEn : pillar.subtitleId}
                  </h3>

                  <p className="text-stone-600 text-xs leading-relaxed mb-4">
                    {language === 'en' ? pillar.descriptionEn : pillar.descriptionId}
                  </p>

                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-100 text-xs text-stone-700 mb-4">
                    <strong className="text-stone-900 block mb-1">
                      {language === 'en' ? 'IELTS Integration:' : 'Integrasi IELTS:'}
                    </strong>
                    <span>{pillar.ieltsCorrelation}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="w-1/2 bg-stone-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-600 h-full rounded-full" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <button
                    onClick={() => onNavigate('modules')}
                    className="text-xs font-semibold text-stone-900 hover:text-amber-700 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>{language === 'en' ? 'Open Module' : 'Buka Modul'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gamification Achievements Showcase */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700">
              <Award className="w-4 h-4 text-amber-600" />
              <span>{language === 'en' ? 'Gamified Mastery Vault' : 'Brankas Prestasi Gamifikasi'}</span>
            </div>
            <h3 className="font-display text-base font-bold text-stone-900 mt-0.5">
              {language === 'en' ? '4B Kaffah & IELTS Milestone Badges' : 'Lencana Pencapaian 4B Kaffah & Band IELTS'}
            </h3>
            <p className="text-xs text-stone-500">
              {language === 'en' ? 'Mastery tokens awarded for verified Islamic jurisprudence and IELTS Band progression' : 'Penghargaan atas penguasaan nilai-nilai Islam dan akselerasi skor Band IELTS'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md">
              {userProfile.achievements.filter(a => a.earned).length} / {userProfile.achievements.length} Unlocked
            </span>
            <button
              onClick={() => setSecurityModalOpen(true)}
              className="text-xs font-semibold text-amber-800 hover:text-amber-900 underline cursor-pointer"
            >
              {language === 'en' ? 'View All Badges in Profile →' : 'Lihat Semua di Profil →'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {userProfile.achievements.slice(0, 8).map((ach) => (
            <div 
              key={ach.id}
              onClick={() => setSecurityModalOpen(true)}
              className={`p-3.5 rounded-lg border text-xs transition-all cursor-pointer hover:border-amber-400 ${
                ach.earned 
                  ? 'bg-amber-50/40 border-amber-200 text-stone-900' 
                  : 'bg-stone-50 border-stone-200 text-stone-400 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 font-bold truncate">
                  <Award className={`w-4 h-4 shrink-0 ${ach.earned ? 'text-amber-600' : 'text-stone-400'}`} />
                  <span className="truncate">{language === 'en' ? ach.titleEn : ach.titleId}</span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white border border-stone-200 text-stone-600 shrink-0">
                  {ach.tier}
                </span>
              </div>
              <p className="text-[11px] text-stone-600 line-clamp-2 leading-snug">
                {language === 'en' ? ach.descriptionEn : ach.descriptionId}
              </p>
              <div className="mt-2 pt-1.5 border-t border-stone-200/60 flex items-center justify-between text-[10px]">
                <span className="text-amber-800 font-mono font-bold">+{ach.xpBonus} XP</span>
                {ach.earned ? (
                  <span className="text-emerald-700 font-semibold font-mono">Earned {ach.earnedDate}</span>
                ) : (
                  <span className="text-stone-400 italic">Locked</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

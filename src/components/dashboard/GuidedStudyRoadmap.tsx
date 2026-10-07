import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ROADMAP_TASKS } from '../../data/roadmapData';
import { RoadmapTask } from '../../types';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Zap, 
  ArrowRight, 
  Target, 
  Compass, 
  Scale, 
  Users, 
  Coins, 
  Sparkles,
  BookOpen,
  ChevronRight,
  Flame
} from 'lucide-react';

interface GuidedStudyRoadmapProps {
  onNavigate: (tab: string) => void;
}

export const GuidedStudyRoadmap: React.FC<GuidedStudyRoadmapProps> = ({ onNavigate }) => {
  const { 
    language, 
    testType, 
    userProfile, 
    markLessonComplete 
  } = useApp();

  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([
    'rm-day1-acad-high',
    'rm-day2-acad'
  ]);
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(3); // Default to current recommended day

  // Filter tasks tailored to test track
  const tailoredTasks = ROADMAP_TASKS.filter((task) => {
    if (task.testTrack === 'all') return true;
    if (testType === 'general') {
      return task.testTrack === 'general';
    }
    // academic or ukvi
    return task.testTrack === 'academic';
  });

  // Group by day number (1-7)
  const days = [1, 2, 3, 4, 5, 6, 7];

  // Get active day task
  const activeTask = tailoredTasks.find(t => t.dayNumber === selectedDayNumber) || tailoredTasks[0];

  const handleToggleComplete = (taskId: string, xp: number) => {
    if (completedTaskIds.includes(taskId)) {
      setCompletedTaskIds(prev => prev.filter(id => id !== taskId));
    } else {
      setCompletedTaskIds(prev => [...prev, taskId]);
      markLessonComplete(`roadmap-${taskId}`, xp);
    }
  };

  const getPillarIcon = (pillar: string) => {
    switch (pillar) {
      case 'berdakwah': return <Compass className="w-4 h-4 text-emerald-600" />;
      case 'bersyariah': return <Scale className="w-4 h-4 text-teal-600" />;
      case 'berjamaah': return <Users className="w-4 h-4 text-indigo-600" />;
      case 'bermuamalah': return <Coins className="w-4 h-4 text-amber-600" />;
      default: return <Compass className="w-4 h-4 text-emerald-600" />;
    }
  };

  const getTargetBandAdvice = () => {
    if (userProfile.targetBand >= 8.5) {
      return {
        level: 'Band 8.5 – 9.0 (Expert Scholar)',
        adviceEn: 'Focus on teleological philosophical precision (Maqasid), nuanced concession phrasing, and effortless idiomatic collocations.',
        adviceId: 'Fokus pada ketepatan filosofis maqasid, frase konsesi dialektis, dan kolokasi idiomatis alami tingkat tinggi.'
      };
    } else if (userProfile.targetBand >= 8.0) {
      return {
        level: 'Band 8.0 (Very Good User)',
        adviceEn: 'Emphasize structured paragraph progression, varied complex sentence structures, and academic trend comparisons.',
        adviceId: 'Perkuat progresi paragraf terstruktur, variasi kalimat kompleks, dan perbandingan tren data analitis.'
      };
    } else {
      return {
        level: 'Band 7.0 – 7.5 (Good User)',
        adviceEn: 'Eliminate minor coherence lapses, master overview paragraphs in Task 1, and expand academic vocabulary.',
        adviceId: 'Hilangkan inkonsistensi kohesi, kuasai paragraf overview Task 1, dan perluas kosakata akademis.'
      };
    }
  };

  const advice = getTargetBandAdvice();
  const completedCount = completedTaskIds.length;
  const progressPercent = Math.min(100, Math.round((completedCount / tailoredTasks.length) * 100));

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
      
      {/* Roadmap Header & Track Badge */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
            <Target className="w-4 h-4 text-amber-600" />
            <span>{language === 'en' ? 'Personalized Learning Engine' : 'Mesin Pembelajaran Terarah'}</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
            {language === 'en' ? 'Guided 4B Kaffah Study Roadmap' : 'Peta Jalan Belajar Terarah 4B Kaffah'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            {language === 'en'
              ? `Daily structured syllabus dynamically configured for your target ${userProfile.targetBand.toFixed(1)} band in IELTS ${testType.toUpperCase()}.`
              : `Silabus harian terstruktur yang dikonfigurasi dinamis untuk target skor Band ${userProfile.targetBand.toFixed(1)} pada jalur ${testType.toUpperCase()}.`}
          </p>
        </div>

        {/* Dynamic Track Badge */}
        <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1.5 self-start lg:self-auto">
          <div className="flex items-center justify-between gap-4">
            <span className="text-stone-500 font-medium">Track:</span>
            <span className="font-bold text-stone-900 font-mono uppercase bg-white px-2 py-0.5 rounded border border-stone-200">
              {testType}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-stone-500 font-medium">Target Score:</span>
            <span className="font-bold text-amber-700 font-mono bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Band {userProfile.targetBand.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Target Band Pedagogical Tip */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50/60 to-stone-50 border border-amber-200/80 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs space-y-0.5">
          <span className="font-bold text-stone-900 block">
            {advice.level} · {language === 'en' ? 'Pedagogical Directive' : 'Arah Pedagogis'}:
          </span>
          <p className="text-stone-700 leading-relaxed">
            {language === 'en' ? advice.adviceEn : advice.adviceId}
          </p>
        </div>
      </div>

      {/* 7-Day Interactive Stepper */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span className="font-semibold uppercase tracking-wider">
            {language === 'en' ? '7-Day Curriculum Timeline' : 'Linimasa Kurikulum 7 Hari'}
          </span>
          <span className="font-mono font-medium">
            {completedCount} / {tailoredTasks.length} {language === 'en' ? 'Milestones Completed' : 'Pencapaian Selesai'} ({progressPercent}%)
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-emerald-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Day Pills / Buttons */}
        <div className="grid grid-cols-7 gap-2 pt-2">
          {days.map((d) => {
            const dayTask = tailoredTasks.find(t => t.dayNumber === d);
            const isCompleted = dayTask ? completedTaskIds.includes(dayTask.id) : false;
            const isSelected = selectedDayNumber === d;

            return (
              <button
                key={d}
                onClick={() => setSelectedDayNumber(d)}
                className={`py-2 px-1 text-center rounded-lg border transition-all cursor-pointer flex flex-col items-center gap-1 ${
                  isSelected
                    ? 'border-amber-400 bg-amber-50/80 shadow-xs ring-1 ring-amber-300'
                    : isCompleted
                    ? 'border-emerald-200 bg-emerald-50/40 text-emerald-900'
                    : 'border-stone-200 bg-stone-50/60 hover:bg-stone-100 text-stone-700'
                }`}
              >
                <span className="text-[10px] font-mono font-semibold uppercase">
                  {language === 'en' ? `Day ${d}` : `Hari ${d}`}
                </span>
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-stone-300" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Task Detail Card */}
      {activeTask && (
        <div className="p-5 sm:p-6 rounded-xl border border-stone-200 bg-stone-50/50 space-y-5">
          
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200/80 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white rounded-lg border border-stone-200 shadow-2xs">
                {getPillarIcon(activeTask.pillar)}
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  {language === 'en' ? activeTask.dayTitleEn : activeTask.dayTitleId}
                </span>
                <h3 className="font-display text-base font-bold text-stone-900">
                  {language === 'en' ? activeTask.titleEn : activeTask.titleId}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 text-stone-500 font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>{activeTask.estimatedMinutes}m</span>
              </div>
              <div className="flex items-center gap-1 text-amber-700 font-mono font-bold">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>+{activeTask.xpReward} XP</span>
              </div>
            </div>
          </div>

          {/* Authentic Source Quote Ribbon */}
          <div className="p-3.5 bg-white rounded-lg border border-stone-200 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-stone-500">
              <span className="font-semibold uppercase tracking-wider text-emerald-900">
                Authentic Source Anchor: {activeTask.sourceReference}
              </span>
              <span className="font-mono text-stone-400">4B Pillar: {activeTask.pillar.toUpperCase()}</span>
            </div>
            <p className="font-arabic text-base sm:text-lg text-emerald-950 text-right leading-relaxed">
              {activeTask.sourceArabic}
            </p>
          </div>

          {/* Key Pedagogical Focus & Instructions */}
          <div className="space-y-3">
            <div className="p-3 bg-stone-100/70 rounded-lg text-xs space-y-1">
              <strong className="text-stone-900 block font-semibold">
                {language === 'en' ? 'IELTS Band Competency Focus:' : 'Fokus Kompetensi Skor Band:'}
              </strong>
              <p className="text-stone-700">
                {language === 'en' ? activeTask.focusEn : activeTask.focusId}
              </p>
            </div>

            <div className="text-xs text-stone-700 leading-relaxed font-serif">
              <strong className="text-stone-900 block mb-1 font-sans">
                {language === 'en' ? 'Exercise Instructions:' : 'Petunjuk Latihan:'}
              </strong>
              <p>
                {language === 'en' ? activeTask.instructionsEn : activeTask.instructionsId}
              </p>
            </div>
          </div>

          {/* Actions & Completion Handler */}
          <div className="pt-3 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => handleToggleComplete(activeTask.id, activeTask.xpReward)}
              className="flex items-center gap-2 text-xs font-semibold text-stone-800 hover:text-stone-950 cursor-pointer"
            >
              {completedTaskIds.includes(activeTask.id) ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-800">Completed (+{activeTask.xpReward} XP Earned)</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 text-stone-400" />
                  <span>Mark Day {activeTask.dayNumber} Exercise as Completed</span>
                </>
              )}
            </button>

            <button
              onClick={() => onNavigate(activeTask.actionTab)}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-300 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
            >
              <span>
                {language === 'en'
                  ? `Launch Exercise in ${activeTask.actionTab.toUpperCase()}`
                  : `Buka Latihan di ${activeTask.actionTab.toUpperCase()}`}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

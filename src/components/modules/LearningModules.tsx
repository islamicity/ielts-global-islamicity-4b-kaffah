import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LEARNING_MODULES, PILLARS_DATA } from '../../data/islamicityData';
import { IMAGES } from '../../assets/images';
import { PillarId, LearningModule } from '../../types';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Globe2, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Award
} from 'lucide-react';

export const LearningModules: React.FC = () => {
  const { language, completedLessons, markLessonComplete } = useApp();
  const [selectedPillar, setSelectedPillar] = useState<PillarId | 'all'>('all');
  const [activeModule, setActiveModule] = useState<LearningModule>(LEARNING_MODULES[0]);
  const [showVocabDetails, setShowVocabDetails] = useState<boolean>(true);
  const [translationLanguage, setTranslationLanguage] = useState<'dual' | 'en' | 'id'>('dual');

  const filteredModules = selectedPillar === 'all'
    ? LEARNING_MODULES
    : LEARNING_MODULES.filter(m => m.pillar === selectedPillar);

  const isCompleted = completedLessons.includes(activeModule.id);

  return (
    <div className="space-y-8">
      
      {/* Header and Filter */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 block mb-1">
            {language === 'en' ? 'Interactive Curriculum' : 'Kurikulum Interaktif'}
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
            {language === 'en' ? '4B Kaffah & IELTS Learning Modules' : 'Modul Pembelajaran 4B Kaffah & IELTS'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            {language === 'en'
              ? 'Master rigorous Academic English through authentic Quranic, Hadith, and scholarly texts contextualized for IELTS Band 8.0+.'
              : 'Kuasai bahasa Inggris akademis tingkat tinggi melalui sumber autentik Al-Qur\'an, Hadis, dan teks ilmiah untuk target Band 8.0+.'}
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg overflow-x-auto">
          <button
            onClick={() => setSelectedPillar('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              selectedPillar === 'all' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Pillars
          </button>
          {PILLARS_DATA.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPillar(p.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                selectedPillar === p.id ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {p.id.charAt(0).toUpperCase() + p.id.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Module Cards List (4 columns) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
            {language === 'en' ? 'Available Modules' : 'Daftar Modul'}
          </span>

          {filteredModules.map((mod) => {
            const isSelected = activeModule.id === mod.id;
            const completed = completedLessons.includes(mod.id);

            return (
              <div
                key={mod.id}
                onClick={() => setActiveModule(mod)}
                className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'border-amber-400 bg-amber-50/50 shadow-xs'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <span className="font-semibold uppercase tracking-wider text-amber-800">
                    {mod.pillar}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3 h-3 text-stone-400" />
                    <span>{mod.estimatedMinutes}m</span>
                  </div>
                </div>

                <h3 className="font-semibold text-stone-900 text-sm mb-1.5 leading-snug">
                  {language === 'en' ? mod.titleEn : mod.titleId}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-2 mb-3">
                  {language === 'en' ? mod.summaryEn : mod.summaryId}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                  <span className="font-mono text-stone-500">{mod.level}</span>
                  {completed ? (
                    <span className="flex items-center gap-1 text-emerald-600 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completed</span>
                    </span>
                  ) : (
                    <span className="text-amber-700 font-medium flex items-center gap-0.5">
                      <span>Study</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Module Banner Card */}
          <div className="rounded-xl overflow-hidden border border-stone-200 bg-stone-900 text-white p-4 relative shadow-xs">
            <img 
              src={IMAGES.manuscript} 
              alt="Archival Islamic Manuscript"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10">
              <span className="text-[11px] text-amber-300 uppercase tracking-wider font-semibold block mb-1">
                Authentic Source Archives
              </span>
              <p className="text-xs text-stone-300 leading-relaxed mb-3">
                All texts undergo rigorous peer-verification by our Council of Islamic Scholars and certified IELTS Examiners.
              </p>
              <div className="text-[11px] text-stone-400 flex items-center gap-2">
                <Globe2 className="w-3.5 h-3.5 text-teal-400" />
                <span>Multilingual Cross-Cultural Corpus</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Active Module Detailed View (8 columns) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-stone-200 p-6 sm:p-8 space-y-8 shadow-xs">
          
          {/* Active Module Header */}
          <div className="space-y-3 pb-6 border-b border-stone-100">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-stone-500">
                <span className="font-semibold uppercase tracking-wider text-amber-800">
                  Pillar: {activeModule.pillar}
                </span>
                <span aria-hidden="true">·</span>
                <span>Focus: {activeModule.ieltsSkill.toUpperCase()}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{activeModule.level}</span>
              </div>

              {/* Translation Mode Selector */}
              <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-md text-xs">
                <button
                  onClick={() => setTranslationLanguage('dual')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    translationLanguage === 'dual' ? 'bg-white font-medium text-stone-900 shadow-xs' : 'text-stone-500'
                  }`}
                >
                  Dual View
                </button>
                <button
                  onClick={() => setTranslationLanguage('en')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    translationLanguage === 'en' ? 'bg-white font-medium text-stone-900 shadow-xs' : 'text-stone-500'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setTranslationLanguage('id')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    translationLanguage === 'id' ? 'bg-white font-medium text-stone-900 shadow-xs' : 'text-stone-500'
                  }`}
                >
                  Bahasa
                </button>
              </div>
            </div>

            <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
              {language === 'en' ? activeModule.titleEn : activeModule.titleId}
            </h2>

            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              {language === 'en' ? activeModule.summaryEn : activeModule.summaryId}
            </p>
          </div>

          {/* Authentic Classical / Quranic Source Reference Box */}
          {activeModule.authenticSources.map((source) => (
            <div 
              key={source.id} 
              className="p-5 rounded-xl border border-emerald-900/10 bg-emerald-50/40 space-y-4"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-900 tracking-wider uppercase">
                  Primary Islamic Source: {source.reference}
                </span>
                <span className="text-emerald-700 font-mono text-[11px]">
                  {source.type.toUpperCase().replace('_', ' ')}
                </span>
              </div>

              {/* Arabic Calligraphy Typography */}
              <p className="font-arabic text-xl sm:text-2xl text-emerald-950 text-right leading-loose pt-2">
                {source.arabicText}
              </p>

              {/* Translations */}
              {(translationLanguage === 'dual' || translationLanguage === 'en') && (
                <div className="pt-2 border-t border-emerald-900/10 text-xs sm:text-sm text-stone-800 italic">
                  <strong>English Academic Translation:</strong> {source.englishTranslation}
                </div>
              )}

              {(translationLanguage === 'dual' || translationLanguage === 'id') && (
                <div className="text-xs sm:text-sm text-stone-700">
                  <strong className="text-emerald-900">Terjemahan Kontekstual Indonesia:</strong> {source.indonesianTranslation}
                </div>
              )}

              <div className="p-3 bg-white/80 rounded-lg border border-emerald-900/10 text-xs text-stone-700">
                <strong className="text-emerald-950 block mb-1">
                  Sociological & Linguistic Analysis:
                </strong>
                <span>{source.academicContext}</span>
              </div>
            </div>
          ))}

          {/* Academic Reading / Core Text */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-bold text-stone-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>Academic Passage & Discursive Analysis</span>
            </h3>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 text-sm leading-relaxed whitespace-pre-line font-serif">
              {activeModule.passageTextEn}
            </div>
          </div>

          {/* Vocabulary Builder */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Band 8.0+ Lexical Resource & Collocations</span>
              </h3>
              <button
                onClick={() => setShowVocabDetails(!showVocabDetails)}
                className="text-xs text-amber-700 font-medium hover:underline cursor-pointer"
              >
                {showVocabDetails ? 'Collapse' : 'Expand'}
              </button>
            </div>

            {showVocabDetails && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeModule.vocabulary.map((vocab, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-lg border border-stone-200 bg-white space-y-1.5"
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="font-bold text-stone-900 text-sm">{vocab.term}</span>
                      <span className="font-mono text-[11px] text-stone-500">{vocab.partOfSpeech}</span>
                    </div>
                    <div className="text-[11px] font-mono text-stone-400">{vocab.phonetic}</div>
                    <p className="text-xs text-stone-600 leading-snug">{vocab.definition}</p>
                    <div className="pt-1.5 text-[11px] text-amber-800 italic border-t border-stone-100">
                      “{vocab.example}”
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Practice Task & Model Band 9 Answer */}
          <div className="p-5 rounded-xl border border-stone-200 bg-stone-50/70 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                {activeModule.practiceTask.taskType}
              </span>
              <span className="text-xs font-mono font-semibold text-emerald-700">
                Model Band 9.0 Standard
              </span>
            </div>

            <div className="p-3.5 bg-white rounded-lg border border-stone-200 text-xs sm:text-sm font-medium text-stone-900">
              <strong className="block text-stone-500 text-xs uppercase mb-1">Examination Prompt:</strong>
              {activeModule.practiceTask.prompt}
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-900">
                Exemplary Model Response:
              </span>
              <div className="p-4 bg-white rounded-lg border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed font-serif whitespace-pre-line max-h-64 overflow-y-auto">
                {activeModule.practiceTask.modelBand9Sample}
              </div>
            </div>

            <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/80 text-xs text-amber-950 space-y-1">
              <strong className="font-semibold block mb-1">Examiner Grading Insights:</strong>
              {activeModule.practiceTask.scoringRubricTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-600 font-bold">·</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Completion Action */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-500">
              {isCompleted ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Module completed and synced to your scholar profile.</span>
                </span>
              ) : (
                <span>Complete this module to earn <strong>+150 Knowledge XP</strong>.</span>
              )}
            </div>

            <button
              onClick={() => markLessonComplete(activeModule.id, 150)}
              disabled={isCompleted}
              className={`px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                isCompleted
                  ? 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200'
                  : 'bg-emerald-700 hover:bg-emerald-600 text-white shadow-xs'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{isCompleted ? 'Completed' : 'Mark Module Completed (+150 XP)'}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

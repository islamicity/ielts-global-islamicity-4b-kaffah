import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_FLASHCARDS } from '../../data/flashcardsData';
import { FlashcardItem, SrsRating, PillarId } from '../../types';
import { 
  RotateCw, 
  Volume2, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Layers, 
  Award, 
  Flame, 
  ArrowRight, 
  ArrowLeft, 
  HelpCircle,
  Clock,
  Compass,
  Scale,
  Users,
  Coins,
  ChevronRight,
  Filter
} from 'lucide-react';

export const VocabFlashcards: React.FC = () => {
  const { language, markLessonComplete } = useApp();

  const [cards, setCards] = useState<FlashcardItem[]>(INITIAL_FLASHCARDS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [selectedPillar, setSelectedPillar] = useState<PillarId | 'all'>('all');
  const [studyFilter, setStudyFilter] = useState<'all' | 'due' | 'mastered'>('all');
  const [viewMode, setViewMode] = useState<'study' | 'browse'>('study');
  const [sessionReviewedCount, setSessionReviewedCount] = useState<number>(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  // Filtered cards
  const filteredCards = cards.filter((card) => {
    const matchesPillar = selectedPillar === 'all' || card.pillar === selectedPillar;
    const matchesStatus = 
      studyFilter === 'all' ? true :
      studyFilter === 'due' ? card.nextReviewDate === 'Today' || card.box <= 2 :
      card.status === 'mastered' || card.box === 5;
    return matchesPillar && matchesStatus;
  });

  const activeCard = filteredCards[currentIndex] || filteredCards[0];

  // Flip card
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Next / Previous
  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  // Spaced-Repetition SM-2/Leitner logic handler
  const handleRateCard = (rating: SrsRating) => {
    if (!activeCard) return;

    let newBox = activeCard.box;
    let newInterval = activeCard.intervalDays;
    let newEase = activeCard.easeFactor;
    let newRepCount = activeCard.repetitionCount + 1;
    let newStatus = activeCard.status;
    let nextReviewText = 'Today';

    if (rating === 'again') {
      newBox = 1;
      newInterval = 1;
      newEase = Math.max(1.3, +(newEase - 0.2).toFixed(2));
      newStatus = 'learning';
      nextReviewText = 'Tomorrow';
    } else if (rating === 'hard') {
      newInterval = Math.max(1, Math.round(newInterval * 1.2));
      newEase = Math.max(1.3, +(newEase - 0.15).toFixed(2));
      newStatus = 'learning';
      nextReviewText = `In ${newInterval} days`;
    } else if (rating === 'good') {
      newBox = Math.min(5, newBox + 1);
      newInterval = Math.max(2, Math.round(newInterval * newEase));
      newStatus = newBox >= 4 ? 'review' : 'learning';
      nextReviewText = `In ${newInterval} days`;
    } else if (rating === 'easy') {
      newBox = Math.min(5, newBox + 1);
      newInterval = Math.max(4, Math.round(newInterval * newEase * 1.3));
      newEase = +(newEase + 0.15).toFixed(2);
      newStatus = newBox >= 5 ? 'mastered' : 'review';
      nextReviewText = `In ${newInterval} days`;
    }

    const updatedCard: FlashcardItem = {
      ...activeCard,
      box: newBox,
      intervalDays: newInterval,
      repetitionCount: newRepCount,
      easeFactor: newEase,
      status: newStatus,
      nextReviewDate: nextReviewText,
      lastReviewedDate: 'Just now'
    };

    setCards(prev => prev.map(c => c.id === activeCard.id ? updatedCard : c));
    setSessionReviewedCount(prev => prev + 1);

    // Reward XP
    const xpReward = rating === 'easy' ? 30 : 15;
    markLessonComplete(`srs-${activeCard.id}`, xpReward);

    // Advance to next card
    handleNext();
  };

  // Text-to-speech for English & Arabic
  const playSpeech = (text: string, lang: 'en-GB' | 'ar-SA') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = lang === 'ar-SA' ? 0.85 : 0.95;
      utterance.onstart = () => setIsAudioPlaying(true);
      utterance.onend = () => setIsAudioPlaying(false);
      utterance.onerror = () => setIsAudioPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Box counters
  const boxCounts = [1, 2, 3, 4, 5].map(b => cards.filter(c => c.box === b).length);
  const masteredCount = cards.filter(c => c.box === 5).length;

  const getPillarColor = (pillar: PillarId) => {
    switch (pillar) {
      case 'berdakwah': return 'emerald';
      case 'bersyariah': return 'teal';
      case 'berjamaah': return 'indigo';
      case 'bermuamalah': return 'amber';
      default: return 'stone';
    }
  };

  const getPillarIcon = (pillar: PillarId) => {
    switch (pillar) {
      case 'berdakwah': return <Compass className="w-3.5 h-3.5 text-emerald-600" />;
      case 'bersyariah': return <Scale className="w-3.5 h-3.5 text-teal-600" />;
      case 'berjamaah': return <Users className="w-3.5 h-3.5 text-indigo-600" />;
      case 'bermuamalah': return <Coins className="w-3.5 h-3.5 text-amber-600" />;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
            <Layers className="w-4 h-4 text-amber-600" />
            <span>{language === 'en' ? 'Long-Term Retention System' : 'Sistem Retensi Jangka Panjang'}</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
            {language === 'en' ? '4B Kaffah & IELTS Spaced-Repetition Deck' : 'Flashcard Cerdas 4B Kaffah & IELTS (SRS)'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
            {language === 'en'
              ? 'Algorithmic spaced repetition merging Band 8.5+ academic collocations with authentic Islamic civilizational terminology.'
              : 'Repetisi berjarak algoritmis menggabungkan kolokasi akademis IELTS Band 8.5+ dengan terminologi luhur 4B Kaffah.'}
          </p>
        </div>

        {/* View mode switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg">
          <button
            onClick={() => setViewMode('study')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              viewMode === 'study' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Study Deck Mode
          </button>
          <button
            onClick={() => setViewMode('browse')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              viewMode === 'browse' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Browse All ({cards.length})
          </button>
        </div>
      </div>

      {/* Leitner 5-Box Mastery Visualizer */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              {language === 'en' ? 'Spaced-Repetition Leitner Boxes' : 'Kotak Pengulangan Berjarak (Leitner SRS)'}
            </span>
            <p className="text-xs text-stone-500 mt-0.5">
              Cards advance to higher boxes with successful recall and return to Box 1 upon lapses.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-stone-500">Session Reviewed:</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {sessionReviewedCount} cards
            </span>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {[
            { box: 1, labelEn: 'Box 1: Daily', interval: '1 day', count: boxCounts[0], color: 'border-red-200 bg-red-50/40 text-red-900' },
            { box: 2, labelEn: 'Box 2: Novice', interval: '3 days', count: boxCounts[1], color: 'border-amber-200 bg-amber-50/40 text-amber-900' },
            { box: 3, labelEn: 'Box 3: Familiar', interval: '1 week', count: boxCounts[2], color: 'border-blue-200 bg-blue-50/40 text-blue-900' },
            { box: 4, labelEn: 'Box 4: Advanced', interval: '2 weeks', count: boxCounts[3], color: 'border-teal-200 bg-teal-50/40 text-teal-900' },
            { box: 5, labelEn: 'Box 5: Mastered', interval: '1 month', count: boxCounts[4], color: 'border-emerald-200 bg-emerald-50/40 text-emerald-900 font-bold' }
          ].map((b) => (
            <div 
              key={b.box}
              className={`p-2.5 sm:p-3 rounded-lg border text-center transition-all ${b.color}`}
            >
              <div className="text-[10px] sm:text-xs font-mono font-semibold uppercase truncate">
                {b.labelEn}
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono my-1">
                {b.count}
              </div>
              <div className="text-[10px] opacity-75 font-mono">
                {b.interval}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 bg-stone-100 rounded-xl">
        {/* Pillar filter */}
        <div className="flex items-center gap-1 overflow-x-auto">
          <span className="text-xs font-semibold text-stone-500 mr-1 hidden sm:inline">Pillar:</span>
          <button
            onClick={() => { setSelectedPillar('all'); setCurrentIndex(0); }}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              selectedPillar === 'all' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Pillars
          </button>
          {(['berdakwah', 'bersyariah', 'berjamaah', 'bermuamalah'] as PillarId[]).map((p) => (
            <button
              key={p}
              onClick={() => { setSelectedPillar(p); setCurrentIndex(0); }}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap capitalize ${
                selectedPillar === p ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Due / Mastered filter */}
        <div className="flex items-center gap-1 self-start md:self-auto">
          <button
            onClick={() => { setStudyFilter('all'); setCurrentIndex(0); }}
            className={`px-2.5 py-1 text-xs rounded-md cursor-pointer ${
              studyFilter === 'all' ? 'bg-amber-400 text-stone-950 font-bold' : 'bg-stone-200 text-stone-700'
            }`}
          >
            All Cards
          </button>
          <button
            onClick={() => { setStudyFilter('due'); setCurrentIndex(0); }}
            className={`px-2.5 py-1 text-xs rounded-md cursor-pointer ${
              studyFilter === 'due' ? 'bg-amber-400 text-stone-950 font-bold' : 'bg-stone-200 text-stone-700'
            }`}
          >
            Due for Review
          </button>
          <button
            onClick={() => { setStudyFilter('mastered'); setCurrentIndex(0); }}
            className={`px-2.5 py-1 text-xs rounded-md cursor-pointer ${
              studyFilter === 'mastered' ? 'bg-amber-400 text-stone-950 font-bold' : 'bg-stone-200 text-stone-700'
            }`}
          >
            Mastered ({masteredCount})
          </button>
        </div>
      </div>

      {/* STUDY MODE (INTERACTIVE FLASHCARD) */}
      {viewMode === 'study' && activeCard && (
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Card Meta & Navigation Bar */}
          <div className="flex items-center justify-between text-xs text-stone-500">
            <button
              onClick={handlePrev}
              disabled={filteredCards.length <= 1}
              className="flex items-center gap-1 text-stone-600 hover:text-stone-900 font-medium cursor-pointer disabled:opacity-30"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="font-mono font-medium">
              Card {currentIndex + 1} of {filteredCards.length}
            </div>

            <button
              onClick={handleNext}
              disabled={filteredCards.length <= 1}
              className="flex items-center gap-1 text-stone-600 hover:text-stone-900 font-medium cursor-pointer disabled:opacity-30"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Flashcard Frame (with flip mechanism) */}
          <div 
            onClick={handleFlip}
            className="w-full min-h-[380px] sm:min-h-[420px] rounded-2xl border-2 border-stone-200 hover:border-amber-400 bg-white shadow-md p-6 sm:p-8 cursor-pointer transition-all flex flex-col justify-between relative group select-none"
          >
            
            {/* Top Badge Strip */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-md bg-stone-100">
                  {getPillarIcon(activeCard.pillar)}
                </span>
                <span className="font-semibold text-xs uppercase tracking-wider text-amber-800">
                  {activeCard.pillar}
                </span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="text-xs font-mono text-stone-500 uppercase">{activeCard.ieltsSkillTarget}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-stone-100 text-stone-700">
                  {activeCard.bandLevel}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  Box {activeCard.box}/5
                </span>
              </div>
            </div>

            {/* CARD FRONT (When NOT Flipped) */}
            {!isFlipped ? (
              <div className="py-8 space-y-6 text-center my-auto">
                <div className="space-y-2">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                    {activeCard.term}
                  </h2>
                  <div className="flex items-center justify-center gap-3 text-stone-500 text-xs font-mono">
                    <span>{activeCard.phonetic}</span>
                    <span aria-hidden="true">·</span>
                    <span className="italic">{activeCard.partOfSpeech}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); playSpeech(activeCard.term, 'en-GB'); }}
                      className="p-1 rounded-full hover:bg-stone-100 text-amber-700 cursor-pointer"
                      title="Pronounce English term"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Authentic Arabic Term & Transliteration */}
                <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-900/10 space-y-1 max-w-md mx-auto">
                  <div className="font-arabic text-2xl sm:text-3xl text-emerald-950 leading-relaxed flex items-center justify-center gap-2">
                    <span>{activeCard.arabicTerm}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); playSpeech(activeCard.arabicTerm, 'ar-SA'); }}
                      className="p-1 rounded-full hover:bg-emerald-100 text-emerald-800 cursor-pointer"
                      title="Pronounce Arabic term"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-xs font-mono text-emerald-800">
                    {activeCard.arabicTransliteration}
                  </div>
                </div>

                <div className="text-xs text-stone-400 flex items-center justify-center gap-1 pt-2">
                  <RotateCw className="w-3.5 h-3.5 animate-spin-reverse" />
                  <span>Click card to reveal definition, IELTS exam collocations & ethical context</span>
                </div>
              </div>
            ) : (
              /* CARD BACK (When Flipped) */
              <div className="py-4 space-y-4 text-left my-auto">
                
                {/* Definition */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                    {language === 'en' ? 'Academic Definition:' : 'Definisi Akademis:'}
                  </span>
                  <p className="text-sm text-stone-900 font-serif leading-relaxed">
                    {language === 'en' ? activeCard.definitionEn : activeCard.definitionId}
                  </p>
                </div>

                {/* 4B Kaffah Ethical Context */}
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs space-y-1">
                  <span className="font-bold text-amber-900 block">
                    {language === 'en' ? '4B Kaffah Theological & Civilizational Context:' : 'Konteks Etika 4B Kaffah:'}
                  </span>
                  <p className="text-stone-700 leading-snug">
                    {language === 'en' ? activeCard.islamicEthicalContextEn : activeCard.islamicEthicalContextId}
                  </p>
                  <div className="text-[10px] text-stone-400 font-mono pt-1">
                    Ref: {activeCard.sourceReference}
                  </div>
                </div>

                {/* IELTS Collocation & Exam Sentence */}
                <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/80 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-950 uppercase text-[11px]">
                      Band 8.5+ IELTS Collocation:
                    </span>
                    <span className="font-mono text-amber-800 font-semibold bg-white px-2 py-0.5 rounded border border-amber-200">
                      {activeCard.collocation}
                    </span>
                  </div>
                  <div className="text-stone-800 font-serif italic text-xs leading-relaxed pt-1 border-t border-amber-200/60">
                    “{activeCard.ieltsExamSentence}”
                  </div>
                </div>

                <div className="text-xs text-stone-400 text-center flex items-center justify-center gap-1 pt-1">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Click to flip back</span>
                </div>
              </div>
            )}

            {/* Bottom Status Ribbon */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
              <span className="font-mono">Repetitions: {activeCard.repetitionCount}</span>
              <span className="font-mono">Interval: {activeCard.intervalDays}d</span>
              <span className="font-mono text-emerald-700 font-semibold">Next: {activeCard.nextReviewDate}</span>
            </div>
          </div>

          {/* SRS Rating Control Deck */}
          <div className="bg-stone-900 text-white p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
              <span>How easily did you recall this term?</span>
              <span className="text-amber-400 font-mono">Select interval to schedule:</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => handleRateCard('again')}
                className="py-2.5 px-2 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-700/60 text-red-200 text-xs font-semibold flex flex-col items-center gap-0.5 cursor-pointer transition-colors"
              >
                <span>Again</span>
                <span className="text-[10px] font-mono opacity-80">&lt; 1 day</span>
              </button>

              <button
                onClick={() => handleRateCard('hard')}
                className="py-2.5 px-2 rounded-lg bg-amber-950/80 hover:bg-amber-900 border border-amber-700/60 text-amber-200 text-xs font-semibold flex flex-col items-center gap-0.5 cursor-pointer transition-colors"
              >
                <span>Hard</span>
                <span className="text-[10px] font-mono opacity-80">{Math.max(1, Math.round(activeCard.intervalDays * 1.2))}d</span>
              </button>

              <button
                onClick={() => handleRateCard('good')}
                className="py-2.5 px-2 rounded-lg bg-teal-950/80 hover:bg-teal-900 border border-teal-700/60 text-teal-200 text-xs font-semibold flex flex-col items-center gap-0.5 cursor-pointer transition-colors"
              >
                <span>Good</span>
                <span className="text-[10px] font-mono opacity-80">{Math.max(2, Math.round(activeCard.intervalDays * activeCard.easeFactor))}d</span>
              </button>

              <button
                onClick={() => handleRateCard('easy')}
                className="py-2.5 px-2 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-200 text-xs font-semibold flex flex-col items-center gap-0.5 cursor-pointer transition-colors"
              >
                <span>Easy (+30 XP)</span>
                <span className="text-[10px] font-mono opacity-80">{Math.max(4, Math.round(activeCard.intervalDays * activeCard.easeFactor * 1.3))}d</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* BROWSE ALL CARDS TABLE / GRID */}
      {viewMode === 'browse' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="font-display font-bold text-stone-900 text-base">
              Vocabulary Deck Roster ({filteredCards.length} Cards)
            </h3>
            <span className="text-xs text-stone-500 font-mono">
              Click any card to start studying
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCards.map((card, idx) => (
              <div 
                key={card.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setViewMode('study');
                  setIsFlipped(false);
                }}
                className="p-4 rounded-xl border border-stone-200 hover:border-amber-300 hover:bg-stone-50/50 transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-amber-800 uppercase">
                    {getPillarIcon(card.pillar)}
                    <span>{card.pillar}</span>
                  </div>
                  <span className="font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded text-[11px]">
                    Box {card.box} · {card.bandLevel}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-stone-900 text-base">{card.term}</h4>
                  <div className="font-arabic text-emerald-900 text-sm mt-0.5">{card.arabicTerm} ({card.arabicTransliteration})</div>
                </div>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {card.definitionEn}
                </p>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-amber-800 font-mono text-[11px] font-medium">{card.collocation}</span>
                  <span className="text-stone-400 font-mono text-[11px]">Next: {card.nextReviewDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

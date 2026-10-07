import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { READING_PASSAGES, LISTENING_AUDIO_SIMULATIONS } from '../../data/ieltsTestData';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  CheckCircle, 
  HelpCircle, 
  Volume2, 
  FileText, 
  AlertCircle,
  Award
} from 'lucide-react';

export const IeltsTestSimulator: React.FC = () => {
  const { 
    language, 
    testType, 
    deliveryMode, 
    setReadingScore, 
    readingScore,
    setListeningScore,
    listeningScore
  } = useApp();

  const [activeTab, setActiveTab] = useState<'reading' | 'listening'>('reading');

  // Reading state
  const passage = READING_PASSAGES[0];
  const [readingAnswers, setReadingAnswers] = useState<Record<string, string>>({});
  const [readingSubmitted, setReadingSubmitted] = useState<boolean>(false);
  const [readingTimeRemaining, setReadingTimeRemaining] = useState<number>(3600); // 60 mins in seconds
  const [isReadingTimerRunning, setIsReadingTimerRunning] = useState<boolean>(false);

  // Listening state
  const listeningItem = LISTENING_AUDIO_SIMULATIONS[0];
  const [listeningAnswers, setListeningAnswers] = useState<Record<string, string>>({});
  const [listeningSubmitted, setListeningSubmitted] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioPlaybackPosition, setAudioPlaybackPosition] = useState<number>(0);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);

  // Timer tick for Reading
  useEffect(() => {
    let interval: any = null;
    if (isReadingTimerRunning && readingTimeRemaining > 0) {
      interval = setInterval(() => {
        setReadingTimeRemaining((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isReadingTimerRunning, readingTimeRemaining]);

  // Audio simulation timer
  useEffect(() => {
    let interval: any = null;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioPlaybackPosition((prev) => {
          if (prev >= listeningItem.durationSeconds) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / audioSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio, audioSpeed, listeningItem.durationSeconds]);

  // Format MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Submit Reading Test
  const handleSubmitReading = () => {
    let correctCount = 0;
    passage.questions.forEach((q) => {
      if (readingAnswers[q.id]?.trim().toUpperCase() === q.correctAnswer.trim().toUpperCase()) {
        correctCount++;
      }
    });

    // Simple IELTS Academic reading conversion for sample 5 questions
    const band = correctCount === 5 ? 9.0 : correctCount === 4 ? 8.0 : correctCount === 3 ? 7.0 : correctCount === 2 ? 6.0 : 5.0;

    setReadingScore({ score: correctCount, total: passage.questions.length, band });
    setReadingSubmitted(true);
    setIsReadingTimerRunning(false);
  };

  // Submit Listening Test
  const handleSubmitListening = () => {
    let correctCount = 0;
    listeningItem.questions.forEach((q) => {
      if (listeningAnswers[q.id]?.trim().toUpperCase() === q.correctAnswer.trim().toUpperCase()) {
        correctCount++;
      }
    });

    const band = correctCount === 3 ? 9.0 : correctCount === 2 ? 7.5 : correctCount === 1 ? 6.0 : 5.0;

    setListeningScore({ score: correctCount, total: listeningItem.questions.length, band });
    setListeningSubmitted(true);
  };

  const resetReading = () => {
    setReadingAnswers({});
    setReadingSubmitted(false);
    setReadingTimeRemaining(3600);
    setIsReadingTimerRunning(false);
  };

  const resetListening = () => {
    setListeningAnswers({});
    setListeningSubmitted(false);
    setIsPlayingAudio(false);
    setAudioPlaybackPosition(0);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 block mb-1">
            {language === 'en' ? 'Official Test Standard' : 'Standar Simulasi Resmi'}
          </span>
          <h1 className="font-display text-2xl font-bold text-stone-900">
            {language === 'en' ? 'IELTS Practice & Diagnostic Simulator' : 'Simulator Ujian IELTS Akademik'}
          </h1>
          <p className="text-xs text-stone-600 mt-0.5">
            Format: {testType.toUpperCase()} · Mode: {deliveryMode === 'computer' ? 'Computer-delivered UI' : 'Paper Booklet Style'}
          </p>
        </div>

        {/* Section switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg">
          <button
            onClick={() => setActiveTab('reading')}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'reading' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Academic Reading (Passage 1)
          </button>
          <button
            onClick={() => setActiveTab('listening')}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'listening' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Academic Listening (Section 4)
          </button>
        </div>
      </div>

      {/* READING TAB */}
      {activeTab === 'reading' && (
        <div className="space-y-6">
          
          {/* Top Bar for Test Controls */}
          <div className="p-4 rounded-xl bg-stone-900 text-stone-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 font-mono text-base font-bold bg-stone-800 px-3 py-1.5 rounded-lg border border-stone-700">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{formatTime(readingTimeRemaining)}</span>
              </div>
              <button
                onClick={() => setIsReadingTimerRunning(!isReadingTimerRunning)}
                className="text-xs font-medium px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-750 border border-stone-700 cursor-pointer"
              >
                {isReadingTimerRunning ? 'Pause Timer' : 'Start Timer'}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-stone-400">
                Answered: {Object.keys(readingAnswers).length} / {passage.questions.length}
              </span>
              <button
                onClick={resetReading}
                className="p-1.5 text-stone-400 hover:text-stone-200 cursor-pointer"
                title="Reset answers"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleSubmitReading}
                disabled={readingSubmitted}
                className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                {readingSubmitted ? 'Submitted' : 'Submit & Grade'}
              </button>
            </div>
          </div>

          {/* Result Banner if submitted */}
          {readingSubmitted && readingScore && (
            <div className="p-5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Assessment Completed
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold font-mono">
                    Score: {readingScore.score} / {readingScore.total}
                  </span>
                  <span className="text-emerald-700 font-mono font-semibold">
                    (Estimated Band {readingScore.band.toFixed(1)})
                  </span>
                </div>
                <p className="text-xs text-emerald-800 mt-1">
                  Review the answer rationales highlighted below for each question.
                </p>
              </div>
              <div className="p-3 bg-white/80 rounded-lg border border-emerald-200 text-xs font-mono font-bold text-emerald-900">
                BAND {readingScore.band.toFixed(1)} PROFICIENCY
              </div>
            </div>
          )}

          {/* Split Screen Simulator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Reading Passage (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-stone-200 p-6 sm:p-8 space-y-5 h-[680px] overflow-y-auto">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  Reading Passage 1 · {passage.wordCount} words
                </span>
                <h2 className="font-display text-xl font-bold text-stone-900">
                  {passage.title}
                </h2>
              </div>

              <div className="text-stone-800 text-sm leading-relaxed space-y-4 font-serif">
                {passage.content.map((para, idx) => (
                  <p key={idx} className="p-2.5 rounded hover:bg-stone-50 transition-colors">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Right: Question Sheet (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-stone-200 p-6 space-y-6 h-[680px] overflow-y-auto">
              <div className="border-b border-stone-100 pb-3">
                <h3 className="font-display text-base font-bold text-stone-900">
                  Questions 1 – {passage.questions.length}
                </h3>
                <p className="text-xs text-stone-500">
                  Select or type the best answer according to the passage.
                </p>
              </div>

              <div className="space-y-6">
                {passage.questions.map((q) => {
                  const userAnswer = readingAnswers[q.id] || '';
                  const isCorrect = userAnswer.trim().toUpperCase() === q.correctAnswer.trim().toUpperCase();

                  return (
                    <div 
                      key={q.id}
                      className={`p-4 rounded-lg border transition-all ${
                        readingSubmitted
                          ? isCorrect 
                            ? 'border-emerald-300 bg-emerald-50/40' 
                            : 'border-red-300 bg-red-50/40'
                          : 'border-stone-200 bg-stone-50/50'
                      }`}
                    >
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="font-mono text-xs font-bold text-stone-900">
                          Question {q.questionNumber}
                        </span>
                        <span className="text-[11px] font-mono text-stone-500 uppercase">
                          {q.type.replace(/_/g, ' ')}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm font-medium text-stone-800 mb-3">
                        {q.prompt}
                      </p>

                      {/* Multiple choice / Options list */}
                      {q.options && (
                        <div className="space-y-1.5">
                          {q.options.map((opt, i) => (
                            <label
                              key={i}
                              className={`flex items-start gap-2 p-2 rounded text-xs cursor-pointer border ${
                                userAnswer === opt
                                  ? 'border-amber-400 bg-amber-50/60 font-semibold'
                                  : 'border-transparent hover:bg-stone-100 text-stone-700'
                              }`}
                            >
                              <input
                                type="radio"
                                name={`q-${q.id}`}
                                value={opt}
                                checked={userAnswer === opt}
                                onChange={(e) => setReadingAnswers({ ...readingAnswers, [q.id]: e.target.value })}
                                disabled={readingSubmitted}
                                className="mt-0.5"
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      )}

                      {/* Explanation box after submission */}
                      {readingSubmitted && (
                        <div className="mt-3 pt-2.5 border-t border-stone-200/80 text-xs space-y-1">
                          <div className="flex items-center gap-1 font-semibold text-stone-800">
                            {isCorrect ? (
                              <span className="text-emerald-700 flex items-center gap-1">
                                <CheckCircle className="w-3.5 h-3.5" /> Correct
                              </span>
                            ) : (
                              <span className="text-red-700 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" /> Incorrect (Correct: {q.correctAnswer})
                              </span>
                            )}
                          </div>
                          <p className="text-stone-600 leading-snug">
                            {q.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

        </div>
      )}

      {/* LISTENING TAB */}
      {activeTab === 'listening' && (
        <div className="space-y-6">
          
          {/* Audio Console Simulator */}
          <div className="p-6 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs uppercase font-semibold text-amber-300 tracking-wider block">
                  IELTS Listening Part {listeningItem.part} Audio Simulator
                </span>
                <h3 className="font-display text-lg font-bold text-white">
                  {listeningItem.title}
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  {listeningItem.context}
                </p>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlayingAudio ? 'Pause Audio' : 'Play Recording'}</span>
                </button>

                <button
                  onClick={resetListening}
                  className="p-2 text-stone-400 hover:text-white cursor-pointer"
                  title="Rewind"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Audio Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-400 h-full transition-all duration-300"
                  style={{ width: `${(audioPlaybackPosition / listeningItem.durationSeconds) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-mono text-stone-400">
                <span>{formatTime(audioPlaybackPosition)}</span>
                <span>{formatTime(listeningItem.durationSeconds)}</span>
              </div>
            </div>

            {/* Speed & Transcript buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-stone-400">Speed:</span>
                {[0.8, 1.0, 1.25].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setAudioSpeed(spd)}
                    className={`px-2 py-0.5 rounded font-mono cursor-pointer ${
                      audioSpeed === spd ? 'bg-amber-400 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="text-stone-300 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{showTranscript ? 'Hide Transcript' : 'Show Full Transcript'}</span>
              </button>
            </div>

            {/* Simulated Live Audio Transcript */}
            {showTranscript && (
              <div className="p-4 bg-stone-950 rounded-lg border border-stone-800 text-stone-300 text-xs leading-relaxed max-h-48 overflow-y-auto whitespace-pre-line font-serif">
                <strong className="text-amber-300 block mb-1 font-mono text-[11px]">SPEAKER TRANSCRIPT:</strong>
                {listeningItem.audioSimulationText}
              </div>
            )}
          </div>

          {/* Listening Questions Sheet */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-display text-base font-bold text-stone-900">
                  Questions 1 – {listeningItem.questions.length}
                </h3>
                <p className="text-xs text-stone-500">
                  Answer questions based on the recorded university lecture above.
                </p>
              </div>

              <button
                onClick={handleSubmitListening}
                disabled={listeningSubmitted}
                className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs cursor-pointer disabled:opacity-50"
              >
                {listeningSubmitted ? 'Submitted' : 'Submit & Check Band'}
              </button>
            </div>

            {/* Result display */}
            {listeningSubmitted && listeningScore && (
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs uppercase text-emerald-800">Listening Score Result:</span>
                  <div className="text-xl font-bold font-mono">
                    {listeningScore.score} / {listeningScore.total} Correct (Estimated Band {listeningScore.band.toFixed(1)})
                  </div>
                </div>
                <Award className="w-8 h-8 text-emerald-600" />
              </div>
            )}

            <div className="space-y-5">
              {listeningItem.questions.map((q) => {
                const userAnswer = listeningAnswers[q.id] || '';
                const isCorrect = userAnswer === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-lg border transition-all ${
                      listeningSubmitted
                        ? isCorrect
                          ? 'border-emerald-300 bg-emerald-50/40'
                          : 'border-red-300 bg-red-50/40'
                        : 'border-stone-200 bg-stone-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-stone-900">
                        Question {q.questionNumber}
                      </span>
                      <span className="text-[11px] font-mono text-stone-400">Multiple Choice</span>
                    </div>

                    <p className="text-xs sm:text-sm font-medium text-stone-800 mb-3">
                      {q.prompt}
                    </p>

                    <div className="space-y-1.5">
                      {q.options?.map((opt, i) => (
                        <label
                          key={i}
                          className={`flex items-start gap-2 p-2 rounded text-xs cursor-pointer border ${
                            userAnswer === opt
                              ? 'border-amber-400 bg-amber-50/60 font-semibold'
                              : 'border-transparent hover:bg-stone-100 text-stone-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`lq-${q.id}`}
                            value={opt}
                            checked={userAnswer === opt}
                            onChange={(e) => setListeningAnswers({ ...listeningAnswers, [q.id]: e.target.value })}
                            disabled={listeningSubmitted}
                            className="mt-0.5"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>

                    {listeningSubmitted && (
                      <div className="mt-3 pt-2 text-xs border-t border-stone-200 text-stone-600">
                        <strong>Rationale:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

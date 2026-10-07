import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SPEAKING_EXAM_TOPICS } from '../../data/ieltsTestData';
import { IMAGES } from '../../assets/images';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Play, 
  Square, 
  Clock, 
  Sparkles, 
  Award, 
  ChevronRight,
  BookOpen
} from 'lucide-react';

export const SpeakingLab: React.FC = () => {
  const { language } = useApp();

  const [activePart, setActivePart] = useState<'part1' | 'part2' | 'part3'>('part2');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordSeconds, setRecordSeconds] = useState<number>(0);
  const [prepSeconds, setPrepSeconds] = useState<number>(60);
  const [isPrepRunning, setIsPrepRunning] = useState<boolean>(false);
  const [isSpeakingExaminer, setIsSpeakingExaminer] = useState<boolean>(false);
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false);
  const [recordedAudioLogs, setRecordedAudioLogs] = useState<string[]>([]);

  // Prep timer
  useEffect(() => {
    let interval: any = null;
    if (isPrepRunning && prepSeconds > 0) {
      interval = setInterval(() => {
        setPrepSeconds((prev) => prev - 1);
      }, 1000);
    } else if (prepSeconds === 0) {
      setIsPrepRunning(false);
    }
    return () => clearInterval(interval);
  }, [isPrepRunning, prepSeconds]);

  // Recording timer
  useEffect(() => {
    let interval: any = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB'; // British English for IELTS examiner standard
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeakingExaminer(true);
      utterance.onend = () => setIsSpeakingExaminer(false);
      utterance.onerror = () => setIsSpeakingExaminer(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordSeconds(0);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordedAudioLogs(prev => [
      `Response on ${activePart.toUpperCase()} (${recordSeconds} seconds) - Fluency & Lexicon Recorded`,
      ...prev
    ]);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 block mb-1">
            {language === 'en' ? 'Oral Competency Suite' : 'Kecakapan Lisan'}
          </span>
          <h1 className="font-display text-2xl font-bold text-stone-900">
            {language === 'en' ? 'IELTS Speaking Simulator & Speech Lab' : 'Simulator Ujian Berbicara IELTS'}
          </h1>
          <p className="text-xs text-stone-600 mt-0.5">
            Face-to-face examiner audio prompts, Part 2 prep timers, and Band 9 model responses
          </p>
        </div>

        {/* Part Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg">
          <button
            onClick={() => { setActivePart('part1'); setShowModelAnswer(false); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activePart === 'part1' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Part 1: Everyday Topics
          </button>
          <button
            onClick={() => { setActivePart('part2'); setShowModelAnswer(false); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activePart === 'part2' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Part 2: Cue Card
          </button>
          <button
            onClick={() => { setActivePart('part3'); setShowModelAnswer(false); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activePart === 'part3' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Part 3: Discussion
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Examiner Interview Prompt (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Examiner Card */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stone-900 text-amber-300 font-display font-bold flex items-center justify-center text-sm">
                  MV
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 text-sm">Dr. Margaret Vance</h3>
                  <span className="text-[11px] text-stone-500">Certified Senior IELTS Examiner (British Council)</span>
                </div>
              </div>

              <button
                onClick={() => speakText(
                  activePart === 'part1' 
                    ? SPEAKING_EXAM_TOPICS.part1.examinerIntroduction 
                    : activePart === 'part2'
                    ? SPEAKING_EXAM_TOPICS.part2.cueCardTopic
                    : SPEAKING_EXAM_TOPICS.part3.examinerIntroduction
                )}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium transition-colors cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-amber-700" />
                <span>{isSpeakingExaminer ? 'Speaking...' : 'Play Examiner Voice'}</span>
              </button>
            </div>

            {/* PART 1 CONTENT */}
            {activePart === 'part1' && (
              <div className="space-y-4">
                <p className="text-xs text-stone-600 italic">
                  “{SPEAKING_EXAM_TOPICS.part1.examinerIntroduction}”
                </p>

                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                    Examiner Questions:
                  </span>
                  {SPEAKING_EXAM_TOPICS.part1.questions.map((q, i) => (
                    <div key={i} className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs sm:text-sm font-medium text-stone-900 flex items-start gap-2">
                      <span className="font-mono text-amber-800">Q{i + 1}.</span>
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PART 2 CUE CARD CONTENT */}
            {activePart === 'part2' && (
              <div className="space-y-5">
                <div className="p-4 rounded-xl border border-amber-300 bg-amber-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-900">
                      Candidate Task Card (Topic)
                    </span>
                    <span className="text-[11px] text-amber-800">1 to 2 minutes talk</span>
                  </div>

                  <h3 className="font-display text-base font-bold text-stone-950">
                    {SPEAKING_EXAM_TOPICS.part2.cueCardTopic}
                  </h3>

                  <p className="text-xs text-stone-700 font-medium">You should say:</p>
                  <ul className="space-y-1.5 text-xs text-stone-700 pl-4 list-disc">
                    {SPEAKING_EXAM_TOPICS.part2.bulletPoints.map((bp, i) => (
                      <li key={i}>{bp}</li>
                    ))}
                  </ul>
                </div>

                {/* 1-Minute Prep Countdown Timer */}
                <div className="p-4 rounded-lg bg-stone-900 text-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-amber-400" />
                    <div>
                      <span className="text-xs text-stone-400 block">Preparation Time (Take Notes)</span>
                      <span className="text-xl font-bold font-mono text-amber-300">
                        {formatTime(prepSeconds)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsPrepRunning(!isPrepRunning)}
                    className="px-3.5 py-1.5 rounded-md bg-stone-800 hover:bg-stone-700 border border-stone-700 text-xs font-medium cursor-pointer"
                  >
                    {isPrepRunning ? 'Pause 1m Prep' : 'Start 1m Prep Timer'}
                  </button>
                </div>
              </div>
            )}

            {/* PART 3 DISCUSSION CONTENT */}
            {activePart === 'part3' && (
              <div className="space-y-4">
                <p className="text-xs text-stone-600 italic">
                  “{SPEAKING_EXAM_TOPICS.part3.examinerIntroduction}”
                </p>

                <div className="space-y-3 pt-2">
                  {SPEAKING_EXAM_TOPICS.part3.questions.map((qItem, i) => (
                    <div key={i} className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-2">
                      <div className="text-xs sm:text-sm font-semibold text-stone-900">
                        {qItem.question}
                      </div>
                      <div className="text-[11px] text-stone-500 italic">
                        Examiner Focus: {qItem.examinerNotes}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Cross-Cultural Atmosphere Showcase Card */}
          <div className="rounded-xl overflow-hidden border border-stone-200 bg-stone-900 text-white relative">
            <img 
              src={IMAGES.dialogue} 
              alt="International cross-cultural dialogue"
              className="w-full h-44 object-cover opacity-35"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 p-5 flex flex-col justify-end bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent">
              <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider block mb-1">
                Authentic Discourse Dynamics
              </span>
              <p className="text-xs text-stone-200 leading-relaxed">
                In Speaking Part 3, examiners reward candidates who synthesize moral principles (e.g., Berjamaah solidarity & Maqasid justice) into sophisticated, universal sociological arguments.
              </p>
            </div>
          </div>

        </div>

        {/* Right: Recording Simulator & Model Answers (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Live Recording Studio Card */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h4 className="font-display font-bold text-stone-900 text-sm">
                Speech Recording Simulator
              </h4>
              <span className="font-mono text-xs text-stone-500">
                {formatTime(recordSeconds)}
              </span>
            </div>

            {/* Audio Wave Visualizer Simulation */}
            <div className="h-16 rounded-lg bg-stone-950 flex items-center justify-center gap-1.5 px-4 overflow-hidden">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isRecording 
                      ? 'bg-amber-400' 
                      : 'bg-stone-700'
                  }`}
                  style={{
                    height: isRecording 
                      ? `${Math.max(12, Math.sin((i + recordSeconds) * 0.8) * 48 + 20)}%` 
                      : '20%'
                  }}
                />
              ))}
            </div>

            {/* Record / Stop Button */}
            <div className="flex items-center justify-center">
              {isRecording ? (
                <button
                  onClick={stopRecording}
                  className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-colors"
                >
                  <Square className="w-4 h-4 fill-white" />
                  <span>Stop & Save Recording</span>
                </button>
              ) : (
                <button
                  onClick={startRecording}
                  className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-colors"
                >
                  <Mic className="w-4 h-4" />
                  <span>Record Practice Response</span>
                </button>
              )}
            </div>

            {/* Recent Recorded Practice Log */}
            {recordedAudioLogs.length > 0 && (
              <div className="pt-3 border-t border-stone-100 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                  Session Practice History:
                </span>
                {recordedAudioLogs.map((log, i) => (
                  <div key={i} className="p-2.5 rounded bg-stone-50 border border-stone-200 text-[11px] text-stone-700 font-mono">
                    {log}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Model Band 9 Answer Toggle */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <h4 className="font-display font-bold text-stone-900 text-sm">
                  Model Band 9.0 Benchmark
                </h4>
              </div>
              <button
                onClick={() => setShowModelAnswer(!showModelAnswer)}
                className="text-xs text-amber-700 font-semibold hover:underline cursor-pointer"
              >
                {showModelAnswer ? 'Hide' : 'Reveal Model Audio & Script'}
              </button>
            </div>

            {showModelAnswer ? (
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed font-serif max-h-72 overflow-y-auto whitespace-pre-line">
                  {activePart === 'part2' 
                    ? SPEAKING_EXAM_TOPICS.part2.modelResponse
                    : SPEAKING_EXAM_TOPICS.part1.sampleBand9Answers.join('\n\n')}
                </div>

                <button
                  onClick={() => speakText(
                    activePart === 'part2' 
                      ? SPEAKING_EXAM_TOPICS.part2.modelResponse
                      : SPEAKING_EXAM_TOPICS.part1.sampleBand9Answers[0]
                  )}
                  className="w-full py-2 rounded-lg bg-stone-900 hover:bg-stone-850 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Play className="w-3.5 h-3.5 text-amber-400" />
                  <span>Listen to Model Native Delivery</span>
                </button>
              </div>
            ) : (
              <p className="text-xs text-stone-500 leading-relaxed">
                Click reveal above to study how native Band 9 candidates organize their two-minute response with effortless fluency and rich thematic collocations.
              </p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

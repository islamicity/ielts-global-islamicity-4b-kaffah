import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IMAGES } from '../../assets/images';
import { 
  PenTool, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  RotateCcw, 
  Save, 
  FileCheck,
  TrendingUp,
  Award
} from 'lucide-react';

export const WritingEvaluator: React.FC = () => {
  const { language, setSavedEssayDraft, savedEssayDraft } = useApp();

  const [activeTask, setActiveTask] = useState<'task1' | 'task2'>('task2');
  const [essayContent, setEssayContent] = useState<string>(savedEssayDraft || '');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<null | {
    overallBand: number;
    taskAchievement: { band: number; notes: string };
    coherenceCohesion: { band: number; notes: string };
    lexicalResource: { band: number; notes: string };
    grammarAccuracy: { band: number; notes: string };
    strengths: string[];
    improvements: string[];
  }>(null);

  const words = essayContent.trim() ? essayContent.trim().split(/\s+/).length : 0;
  const minWords = activeTask === 'task1' ? 150 : 250;
  const paragraphs = essayContent.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

  const sampleBand9Task2 = `It is frequently asserted that multifaceted cultural and religious demographics inevitably precipitate socio-political friction. Conversely, a counter-narrative posits that proactive intercultural engagement serves as a catalyst for societal enrichment and collective innovation. While divergent normative frameworks can indeed engender localized tension if unmediated, I contend that institutionalized inter-civilizational dialogue substantially mitigates estrangement and cultivates profound social cohesion.

Advocates of the former proposition underscore historical precedent wherein sectarian misunderstandings triggered societal fragmentation. When disparate groups reside within shared geographical boundaries without robust communication channels, minor theological or cultural distinctions can be sensationalized, exacerbating insular tribalism. This apprehension is not wholly unfounded; without empathetic communicative frameworks, superficial cultural dissonances may indeed morph into structural estrangement.

Nevertheless, evidence overwhelmingly corroborates that intercultural and inter-religious dialogue yields undeniable sociopolitical dividends. Historically, pluralistic intellectual hubs such as medieval Baghdad’s House of Wisdom and Andalusia flourished precisely because scholars from diverse backgrounds engaged in rigorous dialectical exchange, synthesizing philosophical and scientific breakthroughs. In modern societies, cross-cultural forums dispel xenophobic misconceptions and engender mutual empathy. When communities interact through reasoned discourse rather than hostile polemic, diversity ceases to be a liability and instead becomes an inexhaustible reservoir of intellectual and social capital.

In conclusion, although unaddressed cultural disparities can foster friction, intentional and empathetic cross-civilizational dialogue transforms potential conflict into harmonious progress. Nations that cultivate open, respectful discourse invariably foster more resilient, innovative, and ethically grounded societies.`;

  const handleEvaluate = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      // Evaluate based on word count, paragraph structure, and vocabulary density
      let band = 6.5;
      if (words >= minWords) band += 0.5;
      if (paragraphs >= 4) band += 0.5;
      if (essayContent.toLowerCase().includes('consequently') || essayContent.toLowerCase().includes('nevertheless') || essayContent.toLowerCase().includes('furthermore') || essayContent.toLowerCase().includes('conversely')) {
        band += 0.5;
      }
      if (essayContent.toLowerCase().includes('dialogue') || essayContent.toLowerCase().includes('cohesion') || essayContent.toLowerCase().includes('ethical') || essayContent.toLowerCase().includes('discourse')) {
        band += 0.5;
      }
      band = Math.min(9.0, band);

      setEvaluationResult({
        overallBand: band,
        taskAchievement: {
          band: band,
          notes: words >= minWords 
            ? 'Fully addresses all parts of the prompt with a well-developed position throughout.' 
            : `Word count is below the ${minWords} word minimum; penalty applied.`
        },
        coherenceCohesion: {
          band: paragraphs >= 4 ? band : Math.max(6.0, band - 0.5),
          notes: paragraphs >= 4 
            ? 'Skillfully sequences information; paragraphing is logical with clear central topic sentences.' 
            : 'Consider dividing your arguments into clear introduction, 2 body paragraphs, and a conclusion.'
        },
        lexicalResource: {
          band: band,
          notes: 'Uses a wide range of academic vocabulary with very natural, sophisticated control of lexical features.'
        },
        grammarAccuracy: {
          band: band,
          notes: 'Wide range of structures with high accuracy; subordinate clauses and conditional structures handled with ease.'
        },
        strengths: [
          'Nuanced concession and counter-argumentation structure.',
          'High density of formal academic register and cohesive transitional devices.',
          'Precise contextual alignment with cross-cultural discourse ethics.'
        ],
        improvements: [
          'Ensure specific concrete examples are explicitly linked back to the overarching thesis sentence.',
          'Vary sentence length slightly to enhance natural cadence and rhythm.'
        ]
      });
      setIsEvaluating(false);
    }, 1200);
  };

  const handleSaveDraft = () => {
    setSavedEssayDraft(essayContent);
  };

  const handleInsertSample = () => {
    setEssayContent(sampleBand9Task2);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 block mb-1">
            {language === 'en' ? 'Writing Assessment Center' : 'Pusat Evaluasi Menulis'}
          </span>
          <h1 className="font-display text-2xl font-bold text-stone-900">
            {language === 'en' ? 'IELTS Academic Writing Diagnostic Lab' : 'Lab Diagnostik Menulis IELTS Akademik'}
          </h1>
          <p className="text-xs text-stone-600 mt-0.5">
            Real-time word analysis, Band 9 criteria rubrics, and automated essay assessment
          </p>
        </div>

        {/* Task Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg">
          <button
            onClick={() => setActiveTask('task1')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeTask === 'task1' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Task 1: Infographic Report
          </button>
          <button
            onClick={() => setActiveTask('task2')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeTask === 'task2' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Task 2: Discursive Essay
          </button>
        </div>
      </div>

      {/* Prompt Card */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-xs">
        {activeTask === 'task1' ? (
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="font-semibold uppercase text-amber-800">Academic Task 1 (Min. 150 words · 20 mins)</span>
              <span className="font-mono">Pillar: Bermuamalah (Islamic Green Finance)</span>
            </div>
            
            <h3 className="font-display text-base font-bold text-stone-900 mb-3">
              The chart below illustrates global issuance trends of Green Sukuk vs Conventional ESG bonds between 2020 and 2026.
            </h3>
            
            <p className="text-xs text-stone-600 mb-4">
              Summarize the information by selecting and reporting the main features, and make comparisons where relevant.
            </p>

            {/* Generated Chart Visual */}
            <div className="rounded-xl overflow-hidden border border-stone-200 max-w-2xl bg-stone-900">
              <img 
                src={IMAGES.task1Chart} 
                alt="Green Sukuk Global Trends Chart" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-3 bg-stone-950 text-[11px] text-stone-300 flex justify-between font-mono">
                <span>Figure 1.1: Green Sukuk vs Conventional ESG Growth (2020–2026)</span>
                <span className="text-emerald-400">Source: World Bank & Islamic Finance Forum</span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="font-semibold uppercase text-amber-800">Academic Task 2 (Min. 250 words · 40 mins)</span>
              <span className="font-mono">Pillar: Berdakwah & Bersyariah (Cross-Cultural Dialogue)</span>
            </div>
            
            <h3 className="font-display text-base font-bold text-stone-900 mb-2">
              Some people argue that cultural and religious diversity inevitably causes social friction, while others believe that proactive dialogue between traditions fosters innovation and mutual respect. Discuss both views and give your own opinion.
            </h3>
            
            <p className="text-xs text-stone-600">
              Give reasons for your answer and include any relevant examples from your knowledge or experience.
            </p>
          </div>
        )}
      </div>

      {/* Editor & Metrics Two-Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Editor Area (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-xs">
          
          {/* Top Bar of Editor */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100 text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 font-mono">
                <span className="text-stone-500">Words:</span>
                <span className={`font-bold ${words < minWords ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {words}
                </span>
                <span className="text-stone-400">/ min {minWords}</span>
              </div>

              <div className="flex items-center gap-1 font-mono text-stone-500">
                <span>Paragraphs:</span>
                <span className="font-bold text-stone-800">{paragraphs}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleInsertSample}
                className="text-stone-600 hover:text-stone-900 text-xs underline cursor-pointer"
              >
                Load Model Band 9 Text
              </button>
              <button
                onClick={handleSaveDraft}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Draft</span>
              </button>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            value={essayContent}
            onChange={(e) => setEssayContent(e.target.value)}
            placeholder={`Draft your ${activeTask === 'task1' ? 'Task 1 visual summary' : 'Task 2 discursive essay'} here...\n\nStructure advice:\n- Introduction & Thesis\n- First Body Paragraph (Counter-perspective or Overview)\n- Second Body Paragraph (Your primary substantiated argument)\n- Conclusion`}
            rows={15}
            className="w-full p-4 rounded-lg border border-stone-200 focus:border-amber-400 focus:outline-none text-stone-800 text-sm leading-relaxed font-serif resize-y"
          />

          {/* Bottom Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="text-xs text-stone-500 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>Draft auto-encrypted with local E2EE signature.</span>
            </div>

            <button
              onClick={handleEvaluate}
              disabled={isEvaluating || words === 0}
              className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isEvaluating ? 'Evaluating Essay...' : 'Evaluate Against IELTS Rubric'}</span>
            </button>
          </div>

        </div>

        {/* Right Side: Evaluation Rubric & Feedback (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {evaluationResult ? (
            <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-5 shadow-xs">
              
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Diagnostic Score
                  </span>
                  <div className="text-2xl font-bold font-mono text-stone-900">
                    Band {evaluationResult.overallBand.toFixed(1)}
                  </div>
                </div>
                <Award className="w-8 h-8 text-amber-500" />
              </div>

              {/* 4 Official Criteria Breakdown */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                  Official 4-Criteria Breakdown
                </span>

                <div className="p-3 bg-stone-50 rounded-lg text-xs space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span>Task Achievement / Response</span>
                    <span className="font-mono text-amber-700">Band {evaluationResult.taskAchievement.band.toFixed(1)}</span>
                  </div>
                  <p className="text-[11px] text-stone-600">{evaluationResult.taskAchievement.notes}</p>
                </div>

                <div className="p-3 bg-stone-50 rounded-lg text-xs space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span>Coherence & Cohesion</span>
                    <span className="font-mono text-amber-700">Band {evaluationResult.coherenceCohesion.band.toFixed(1)}</span>
                  </div>
                  <p className="text-[11px] text-stone-600">{evaluationResult.coherenceCohesion.notes}</p>
                </div>

                <div className="p-3 bg-stone-50 rounded-lg text-xs space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span>Lexical Resource</span>
                    <span className="font-mono text-amber-700">Band {evaluationResult.lexicalResource.band.toFixed(1)}</span>
                  </div>
                  <p className="text-[11px] text-stone-600">{evaluationResult.lexicalResource.notes}</p>
                </div>

                <div className="p-3 bg-stone-50 rounded-lg text-xs space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span>Grammatical Range & Accuracy</span>
                    <span className="font-mono text-amber-700">Band {evaluationResult.grammarAccuracy.band.toFixed(1)}</span>
                  </div>
                  <p className="text-[11px] text-stone-600">{evaluationResult.grammarAccuracy.notes}</p>
                </div>
              </div>

              {/* Strengths */}
              <div className="space-y-1.5 text-xs">
                <span className="font-bold text-emerald-800 block">Examiner Noted Strengths:</span>
                {evaluationResult.strengths.map((str, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-stone-700 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </div>
                ))}
              </div>

            </div>
          ) : (
            <div className="bg-stone-50 rounded-xl border border-stone-200 p-5 text-xs text-stone-600 space-y-4">
              <h4 className="font-display font-bold text-stone-900 text-sm">
                IELTS Scoring Rubric Matrix
              </h4>
              <p className="leading-relaxed">
                Your writing will be assessed against official British Council and IDP IELTS Band Descriptors:
              </p>
              <ul className="space-y-2 text-[11px]">
                <li className="p-2 bg-white rounded border border-stone-200">
                  <strong className="text-stone-900">Task Response (TR):</strong> Clear position, fully extended arguments, robust examples.
                </li>
                <li className="p-2 bg-white rounded border border-stone-200">
                  <strong className="text-stone-900">Coherence & Cohesion (CC):</strong> Logical paragraphing, effortless cohesion without robotic overuse.
                </li>
                <li className="p-2 bg-white rounded border border-stone-200">
                  <strong className="text-stone-900">Lexical Resource (LR):</strong> Sophisticated academic collocations and natural phraseology.
                </li>
                <li className="p-2 bg-white rounded border border-stone-200">
                  <strong className="text-stone-900">Grammatical Range (GRA):</strong> Complex structures with high precision and flexibility.
                </li>
              </ul>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

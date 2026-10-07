import React from 'react';
import { useApp } from '../../context/AppContext';
import { Globe, BookOpen, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language } = useApp();

  return (
    <footer className="border-t border-stone-200 bg-stone-100/70 text-stone-600 text-xs py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-stone-900 text-sm tracking-wide">
              GLOBAL ISLAMICITY 4B KAFFAH
            </h4>
            <p className="text-stone-500 leading-relaxed">
              {language === 'en'
                ? 'An integrated platform synthesizing the 4B Kaffah pillars with high-stakes IELTS Academic & General Training competencies for global scholars.'
                : 'Platform komprehensif mengintegrasikan pilar 4B Kaffah dengan kompetensi ujian internasional IELTS Academic & General Training.'}
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-stone-900 mb-3 text-xs uppercase tracking-wider">
              {language === 'en' ? 'The 4B Pillars' : 'Pilar 4B Kaffah'}
            </h5>
            <ul className="space-y-2 text-stone-500">
              <li>01. Berdakwah · Engaging in Da'wah & Dialogue</li>
              <li>02. Bersyariah · Upholding Sharia & Maqasid</li>
              <li>03. Berjamaah · Communal Solidarity & Unity</li>
              <li>04. Bermuamalah · Ethical Economics & Halal Trade</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-stone-900 mb-3 text-xs uppercase tracking-wider">
              {language === 'en' ? 'IELTS Dimensions' : 'Dimensi Ujian IELTS'}
            </h5>
            <ul className="space-y-2 text-stone-500">
              <li>IELTS Academic (Higher Ed & Research)</li>
              <li>IELTS General Training (Migration & Work)</li>
              <li>IELTS UKVI Approved Alignment</li>
              <li>Computer-Delivered & Paper Practice</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-stone-900 mb-3 text-xs uppercase tracking-wider">
              {language === 'en' ? 'Integrity & Security' : 'Integritas & Keamanan'}
            </h5>
            <div className="space-y-2 text-stone-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Simulated End-to-End Encryption (E2EE)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Cross-Cultural Dual Translation Protocol</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Authentic Quran, Hadith & Academic Corpus</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between text-stone-500 gap-4">
          <p>© 2026 Global Islamicity 4B Kaffah in IELTS. All rights reserved.</p>
          <div className="flex items-center gap-4 text-stone-500">
            <span>Academic Rigor</span>
            <span>·</span>
            <span>Zero-Knowledge Discourse</span>
            <span>·</span>
            <span>Band 9 Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AchievementBadge, PillarId } from '../../types';
import { 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  CheckCircle, 
  X, 
  Copy, 
  UserCheck,
  Award,
  Flame,
  Zap,
  Target,
  TrendingUp,
  Compass,
  Scale,
  Users,
  Coins,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const SecurityModal: React.FC = () => {
  const { 
    language, 
    userProfile, 
    securityModalOpen, 
    setSecurityModalOpen,
    mfaEnabled,
    setMfaEnabled,
    e2eeEnabled,
    setE2eeEnabled
  } = useApp();

  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'mfa' | 'e2ee'>('profile');
  const [badgeFilter, setBadgeFilter] = useState<'all' | '4b_kaffah' | 'ielts_band' | 'unlocked'>('all');

  if (!securityModalOpen) return null;

  const keyFingerprint = 'SHA256:4bKaffah79aB291f00cd32E8c901a117b9b4f2c8';

  const copyFingerprint = () => {
    navigator.clipboard.writeText(keyFingerprint);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const achievements = userProfile.achievements || [];
  const earnedCount = achievements.filter(a => a.earned).length;
  const totalBonusXp = achievements.filter(a => a.earned).reduce((sum, a) => sum + (a.xpBonus || 0), 0);

  const filteredAchievements = achievements.filter((ach) => {
    if (badgeFilter === 'all') return true;
    if (badgeFilter === 'unlocked') return ach.earned;
    if (badgeFilter === '4b_kaffah') return ach.category === '4b_kaffah' || ach.category === 'holistic_kaffah';
    if (badgeFilter === 'ielts_band') return ach.category === 'ielts_band';
    return true;
  });

  const getTierStyles = (tier: string, earned: boolean) => {
    if (!earned) {
      return {
        badgeBg: 'bg-stone-100 text-stone-400 border-stone-200',
        cardBorder: 'border-stone-200 bg-stone-50/50 opacity-75',
        iconColor: 'text-stone-400'
      };
    }
    switch (tier) {
      case 'Diamond':
        return {
          badgeBg: 'bg-cyan-100 text-cyan-800 border-cyan-300 font-bold',
          cardBorder: 'border-cyan-300 bg-gradient-to-br from-cyan-50/70 to-white shadow-xs',
          iconColor: 'text-cyan-600'
        };
      case 'Platinum':
        return {
          badgeBg: 'bg-purple-100 text-purple-800 border-purple-300 font-bold',
          cardBorder: 'border-purple-300 bg-gradient-to-br from-purple-50/60 to-white shadow-xs',
          iconColor: 'text-purple-600'
        };
      case 'Gold':
        return {
          badgeBg: 'bg-amber-100 text-amber-800 border-amber-300 font-bold',
          cardBorder: 'border-amber-300 bg-gradient-to-br from-amber-50/60 to-white shadow-xs',
          iconColor: 'text-amber-600'
        };
      case 'Silver':
        return {
          badgeBg: 'bg-slate-200 text-slate-800 border-slate-300 font-bold',
          cardBorder: 'border-slate-300 bg-gradient-to-br from-slate-50 to-white shadow-xs',
          iconColor: 'text-slate-600'
        };
      case 'Bronze':
      default:
        return {
          badgeBg: 'bg-orange-100 text-orange-800 border-orange-300 font-bold',
          cardBorder: 'border-orange-200 bg-orange-50/40 shadow-xs',
          iconColor: 'text-orange-600'
        };
    }
  };

  const getBadgeIcon = (iconName: string, earned: boolean, pillar?: PillarId) => {
    if (pillar === 'berdakwah') return <Compass className="w-4 h-4 text-emerald-600" />;
    if (pillar === 'bersyariah') return <Scale className="w-4 h-4 text-teal-600" />;
    if (pillar === 'berjamaah') return <Users className="w-4 h-4 text-indigo-600" />;
    if (pillar === 'bermuamalah') return <Coins className="w-4 h-4 text-amber-600" />;

    switch (iconName) {
      case 'TrendingUp': return <TrendingUp className="w-4 h-4 text-blue-600" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-amber-600" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      default: return <Award className={`w-4 h-4 ${earned ? 'text-amber-600' : 'text-stone-400'}`} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/75 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-stone-200 max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={() => setSecurityModalOpen(false)}
          className="absolute top-5 right-5 p-1.5 text-stone-400 hover:text-stone-700 cursor-pointer rounded-lg hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>{language === 'en' ? 'Scholar Credentials & Milestones' : 'Kredensial Cendekiawan & Pencapaian'}</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
            {language === 'en' ? 'User Profile & Gamified Achievement Vault' : 'Profil Pengguna & Brankas Prestasi'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {language === 'en'
              ? 'Track verified status, 4B Kaffah mastery tokens, and IELTS band progression milestones.'
              : 'Pantau status verifikasi, lencana penguasaan 4B Kaffah, dan kemajuan skor Band IELTS Anda.'}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 text-center font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'profile' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {language === 'en' ? 'Profile & Achievements' : 'Profil & Lencana Prestasi'}
          </button>
          <button
            onClick={() => setActiveTab('mfa')}
            className={`flex-1 py-2 text-center font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'mfa' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {language === 'en' ? 'Multi-Factor MFA' : 'Keamanan MFA'}
          </button>
          <button
            onClick={() => setActiveTab('e2ee')}
            className={`flex-1 py-2 text-center font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'e2ee' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {language === 'en' ? 'E2EE Encryption' : 'Enkripsi E2EE'}
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-6">

          {/* TAB 1: PROFILE & GAMIFIED ACHIEVEMENTS */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              
              {/* Profile Card Header */}
              <div className="p-5 rounded-xl border border-stone-200 bg-stone-50/70 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-full bg-stone-900 text-amber-300 font-bold flex items-center justify-center font-display text-lg shadow-sm border-2 border-amber-300/40">
                      ZF
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-stone-900 text-base">{userProfile.name}</h3>
                        <span className="p-0.5 rounded-full bg-emerald-100 text-emerald-700" title="Verified Scholar">
                          <CheckCircle className="w-4 h-4" />
                        </span>
                      </div>
                      <div className="text-xs text-stone-500 font-mono">{userProfile.email}</div>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-800 font-semibold">
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>{userProfile.verificationBadge}</span>
                      </div>
                    </div>
                  </div>

                  {/* Level & Rank Badge */}
                  <div className="p-3 bg-white rounded-lg border border-stone-200 text-right self-start sm:self-auto space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                      Scholar Rank
                    </span>
                    <span className="font-display text-sm font-bold text-stone-900 block">
                      {userProfile.levelTitle}
                    </span>
                    <span className="text-[11px] font-mono text-stone-500">
                      Tier II Scholar
                    </span>
                  </div>
                </div>

                {/* Key Metrics Quick Ribbon */}
                <div className="pt-3 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 bg-white rounded-lg border border-stone-200/80">
                    <span className="text-stone-500 text-[10px] uppercase font-medium flex items-center gap-1 mb-0.5">
                      <Target className="w-3 h-3 text-amber-600" /> Target Band
                    </span>
                    <span className="text-base font-bold font-mono text-stone-900">
                      Band {userProfile.targetBand.toFixed(1)}
                    </span>
                  </div>

                  <div className="p-2.5 bg-white rounded-lg border border-stone-200/80">
                    <span className="text-stone-500 text-[10px] uppercase font-medium flex items-center gap-1 mb-0.5">
                      <TrendingUp className="w-3 h-3 text-emerald-600" /> Projected Band
                    </span>
                    <span className="text-base font-bold font-mono text-emerald-800">
                      Band {userProfile.currentProjectedBand.toFixed(1)}
                    </span>
                  </div>

                  <div className="p-2.5 bg-white rounded-lg border border-stone-200/80">
                    <span className="text-stone-500 text-[10px] uppercase font-medium flex items-center gap-1 mb-0.5">
                      <Flame className="w-3 h-3 text-orange-500" /> Daily Streak
                    </span>
                    <span className="text-base font-bold font-mono text-orange-600">
                      {userProfile.dailyStreak} days
                    </span>
                  </div>

                  <div className="p-2.5 bg-white rounded-lg border border-stone-200/80">
                    <span className="text-stone-500 text-[10px] uppercase font-medium flex items-center gap-1 mb-0.5">
                      <Zap className="w-3 h-3 text-amber-500" /> Knowledge XP
                    </span>
                    <span className="text-base font-bold font-mono text-stone-900">
                      {userProfile.xpPoints.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Achievements Overview & Stats Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gradient-to-r from-amber-50/80 to-stone-50 rounded-xl border border-amber-200/80">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-amber-500 text-stone-950 shadow-xs">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-stone-900 text-sm">
                      {language === 'en' ? 'Gamified Mastery Progression' : 'Progresivitas Prestasi Gamifikasi'}
                    </h4>
                    <p className="text-xs text-stone-600">
                      {earnedCount} of {achievements.length} badges earned · <strong className="text-amber-800">+{totalBonusXp} Bonus XP</strong> accrued
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto font-mono text-xs font-bold text-amber-950 bg-white px-3 py-1.5 rounded-lg border border-amber-200">
                  <span>{Math.round((earnedCount / achievements.length) * 100)}% UNLOCKED</span>
                </div>
              </div>

              {/* Filter Tabs for Badges */}
              <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg text-xs overflow-x-auto">
                <button
                  onClick={() => setBadgeFilter('all')}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap font-medium ${
                    badgeFilter === 'all' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  All Milestones ({achievements.length})
                </button>
                <button
                  onClick={() => setBadgeFilter('4b_kaffah')}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap font-medium ${
                    badgeFilter === '4b_kaffah' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  4B Kaffah Mastery
                </button>
                <button
                  onClick={() => setBadgeFilter('ielts_band')}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap font-medium ${
                    badgeFilter === 'ielts_band' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  IELTS Band Progression
                </button>
                <button
                  onClick={() => setBadgeFilter('unlocked')}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap font-medium ${
                    badgeFilter === 'unlocked' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Unlocked ({earnedCount})
                </button>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAchievements.map((badge) => {
                  const style = getTierStyles(badge.tier, badge.earned);

                  return (
                    <div
                      key={badge.id}
                      className={`p-4 rounded-xl border transition-all space-y-3 ${style.cardBorder}`}
                    >
                      {/* Badge Top Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-white border border-stone-200/80 shadow-2xs">
                            {getBadgeIcon(badge.iconName, badge.earned, badge.pillar)}
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase font-semibold text-stone-400 block">
                              {badge.category === '4b_kaffah' ? '4B Kaffah Mastery' : badge.category === 'holistic_kaffah' ? 'Holistic Synthesis' : 'IELTS Band Milestone'}
                            </span>
                            <h4 className="font-bold text-stone-900 text-sm leading-snug">
                              {language === 'en' ? badge.titleEn : badge.titleId}
                            </h4>
                          </div>
                        </div>

                        {/* Tier Label */}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${style.badgeBg}`}>
                          {badge.tier}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {language === 'en' ? badge.descriptionEn : badge.descriptionId}
                      </p>

                      {/* Criteria & Progress */}
                      <div className="p-2.5 bg-stone-100/70 rounded-lg text-[11px] space-y-1.5">
                        <div className="flex items-center justify-between text-stone-700">
                          <strong className="font-semibold">Unlock Requirement:</strong>
                          <span className="font-mono text-stone-500 font-medium">
                            {badge.currentValue} / {badge.targetValue}
                          </span>
                        </div>
                        <p className="text-stone-600 text-[10px]">
                          {language === 'en' ? badge.criteriaEn : badge.criteriaId}
                        </p>
                      </div>

                      {/* Footer: Earned Date or XP Bonus */}
                      <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 font-mono font-bold text-amber-700 text-[11px]">
                          <Zap className="w-3.5 h-3.5 text-amber-500" />
                          <span>+{badge.xpBonus} XP Bonus</span>
                        </div>

                        {badge.earned ? (
                          <div className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Earned {badge.earnedDate}</span>
                          </div>
                        ) : (
                          <span className="text-[11px] text-stone-400 font-medium italic">
                            In Progress
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 2: MULTI-FACTOR AUTHENTICATION (MFA) */}
          {activeTab === 'mfa' && (
            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-stone-200 bg-stone-50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-emerald-600" />
                    <div>
                      <span className="font-bold text-stone-900 text-sm block">Authenticator App (TOTP)</span>
                      <span className="text-xs text-stone-500">Google Authenticator, Authy, or 1Password</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setMfaEnabled(!mfaEnabled)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      mfaEnabled ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-stone-200 hover:bg-stone-300 text-stone-700'
                    }`}
                  >
                    {mfaEnabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed pt-1">
                  Protects your academic submissions, official essay evaluations, and verified scholar status with 6-digit cryptographic verification codes.
                </p>

                {mfaEnabled && (
                  <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-mono text-[11px]">Next code rotation in 24s</span>
                    <span className="font-mono font-bold text-emerald-800 tracking-widest text-sm bg-white px-3 py-1 rounded border border-stone-200">
                      684 920
                    </span>
                  </div>
                )}
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Multi-Factor Authentication is actively safeguarding your examination credentials and peer review identity.</span>
              </div>
            </div>
          )}

          {/* TAB 3: END-TO-END ENCRYPTION (E2EE) */}
          {activeTab === 'e2ee' && (
            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-stone-200 bg-stone-50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-teal-600" />
                    <div>
                      <span className="font-bold text-stone-900 text-sm block">End-to-End Discourse Encryption</span>
                      <span className="text-xs text-stone-500">Zero-Knowledge Theological & Essay Privacy</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setE2eeEnabled(!e2eeEnabled)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      e2eeEnabled ? 'bg-teal-700 hover:bg-teal-600 text-white' : 'bg-stone-200 hover:bg-stone-300 text-stone-700'
                    }`}
                  >
                    {e2eeEnabled ? 'Active' : 'Bypassed'}
                  </button>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed pt-1">
                  Client-side cryptographic hash signing guarantees that all cross-cultural theological discussions and peer-review essay exchanges remain protected against unauthorized intermediary observation.
                </p>

                <div className="space-y-1.5 pt-3 border-t border-stone-200/80">
                  <span className="text-[11px] font-bold text-stone-500 block uppercase">
                    Your Cryptographic Public Fingerprint:
                  </span>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-stone-200 font-mono text-[11px] text-stone-700">
                    <span className="truncate">{keyFingerprint}</span>
                    <button
                      onClick={copyFingerprint}
                      className="ml-2 text-stone-500 hover:text-stone-900 cursor-pointer p-1 rounded hover:bg-stone-100"
                      title="Copy Fingerprint"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {copiedKey && <span className="text-[10px] text-emerald-700 font-semibold">Fingerprint copied to clipboard!</span>}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Actions */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
          <div className="text-stone-400 font-mono text-[11px]">
            User ID: 4b-scholar-fpycksg7w66
          </div>
          <button
            onClick={() => setSecurityModalOpen(false)}
            className="px-5 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs cursor-pointer transition-colors shadow-xs"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};

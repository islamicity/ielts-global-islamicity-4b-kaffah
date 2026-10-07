export type PillarId = 'berdakwah' | 'bersyariah' | 'berjamaah' | 'bermuamalah';

export type IeltsSkill = 'listening' | 'reading' | 'writing' | 'speaking';

export type TestType = 'academic' | 'general' | 'ukvi';

export type DeliveryMode = 'computer' | 'paper';

export type Language = 'en' | 'id';

export interface PillarInfo {
  id: PillarId;
  titleEn: string;
  titleId: string;
  subtitleEn: string;
  subtitleId: string;
  descriptionEn: string;
  descriptionId: string;
  keyThemes: string[];
  ieltsCorrelation: string;
  iconName: string;
  color: string;
}

export interface AuthenticSource {
  id: string;
  pillar: PillarId;
  type: 'quran' | 'hadith' | 'classical_text' | 'contemporary_academic';
  reference: string;
  arabicText: string;
  englishTranslation: string;
  indonesianTranslation: string;
  academicContext: string;
  ieltsKeywords: { word: string; pos: string; definition: string; collocation: string }[];
}

export interface LearningModule {
  id: string;
  pillar: PillarId;
  titleEn: string;
  titleId: string;
  ieltsSkill: IeltsSkill;
  estimatedMinutes: number;
  level: string; // e.g. 'Band 6.5 - 7.5' or 'Band 7.5 - 8.5+'
  summaryEn: string;
  summaryId: string;
  passageTextEn: string;
  passageTextId?: string;
  vocabulary: { term: string; phonetic: string; partOfSpeech: string; definition: string; example: string }[];
  authenticSources: AuthenticSource[];
  practiceTask: {
    prompt: string;
    taskType: string;
    modelBand9Sample: string;
    scoringRubricTips: string[];
  };
}

export interface TestQuestion {
  id: string;
  section: number;
  questionNumber: number;
  type: 'multiple_choice' | 'true_false_not_given' | 'matching_headings' | 'summary_completion' | 'short_answer';
  prompt: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ReadingTestPassage {
  id: string;
  pillar: PillarId;
  title: string;
  testType: TestType;
  wordCount: number;
  content: string[];
  questions: TestQuestion[];
}

export interface ListeningAudioItem {
  id: string;
  pillar: PillarId;
  part: number;
  title: string;
  context: string;
  durationSeconds: number;
  audioSimulationText: string;
  questions: TestQuestion[];
}

export interface ForumComment {
  id: string;
  author: string;
  role: string;
  badgeColor: string;
  text: string;
  timestamp: string;
  verifiedScholarSeal?: boolean;
  isOfficialMentorAnswer?: boolean;
  upvotes: number;
  upvotedByMe?: boolean;
  parentId?: string;
}

export interface VerifiedMentor {
  id: string;
  name: string;
  titleEn: string;
  titleId: string;
  specialty: 'Islamic Jurisprudence (Fiqh)' | 'IELTS Examination Strategies' | 'Islamic Economics (Muamalah)' | 'Bioethics & Law';
  institution: string;
  avatar: string;
  badgeColor: string;
  answeredCount: number;
  rating: number;
  available: boolean;
}

export interface ForumPost {
  id: string;
  authorName: string;
  authorRole: 'Verified Scholar' | 'IELTS Master Trainer (Band 9.0)' | 'Student Scholar' | 'Candidate';
  authorBadgeColor: string;
  authorAvatar: string;
  title: string;
  content: string;
  timestamp: string;
  pillar: PillarId | 'general';
  tags: string[];
  likes: number;
  likedByMe?: boolean;
  repliesCount: number;
  isEncrypted: boolean;
  e2eeHash: string;
  isPeerReview?: boolean;
  peerReviewTarget?: string;
  isExpertQuestion?: boolean;
  expertCategory?: 'fiqh' | 'ielts_strategy';
  targetMentorName?: string;
  isResolved?: boolean;
  comments: ForumComment[];
}

export interface AchievementBadge {
  id: string;
  category: '4b_kaffah' | 'ielts_band' | 'holistic_kaffah';
  pillar?: PillarId;
  titleEn: string;
  titleId: string;
  descriptionEn: string;
  descriptionId: string;
  criteriaEn: string;
  criteriaId: string;
  targetValue: number;
  currentValue: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  earned: boolean;
  earnedDate?: string;
  iconName: string;
  xpBonus: number;
}

export interface UserProfile {
  name: string;
  email: string;
  targetBand: number;
  currentProjectedBand: number;
  testType: TestType;
  preferredMode: DeliveryMode;
  isVerified: boolean;
  verificationBadge: string;
  mfaEnabled: boolean;
  e2eeActive: boolean;
  dailyStreak: number;
  xpPoints: number;
  levelTitle: string;
  skillScores: {
    listening: number;
    reading: number;
    writing: number;
    speaking: number;
  };
  pillarProgress: {
    berdakwah: number; // 0 - 100
    bersyariah: number;
    berjamaah: number;
    bermuamalah: number;
  };
  achievements: AchievementBadge[];
}

export interface SyncQueueItem {
  id: string;
  type: 'draft_essay' | 'test_submission' | 'forum_post' | 'note' | 'progress_update';
  title: string;
  timestamp: string;
  status: 'synced' | 'pending_sync' | 'conflict_resolved';
  payloadSummary: string;
}

export interface RoadmapTask {
  id: string;
  dayNumber: number;
  dayTitleEn: string;
  dayTitleId: string;
  pillar: PillarId;
  skill: IeltsSkill;
  titleEn: string;
  titleId: string;
  focusEn: string;
  focusId: string;
  instructionsEn: string;
  instructionsId: string;
  actionTab: 'modules' | 'tests' | 'writing' | 'speaking' | 'forum';
  targetBandLevel: string; // e.g. "Band 7.5 - 8.0" or "Band 8.5 - 9.0"
  testTrack: 'academic' | 'general' | 'all';
  estimatedMinutes: number;
  xpReward: number;
  sourceReference: string;
  sourceArabic: string;
}

export type SrsRating = 'again' | 'hard' | 'good' | 'easy';

export interface FlashcardItem {
  id: string;
  term: string;
  arabicTerm: string;
  arabicTransliteration: string;
  pillar: PillarId;
  ieltsSkillTarget: IeltsSkill;
  bandLevel: string;
  phonetic: string;
  partOfSpeech: string;
  definitionEn: string;
  definitionId: string;
  islamicEthicalContextEn: string;
  islamicEthicalContextId: string;
  collocation: string;
  ieltsExamSentence: string;
  sourceReference: string;
  // Spaced-repetition parameters
  box: number; // 1 (New/Struggling) to 5 (Mastered)
  intervalDays: number;
  repetitionCount: number;
  easeFactor: number;
  nextReviewDate: string;
  lastReviewedDate?: string;
  status: 'new' | 'learning' | 'review' | 'mastered';
}

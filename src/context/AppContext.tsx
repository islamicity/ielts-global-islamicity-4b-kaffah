import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  TestType, 
  DeliveryMode, 
  Language, 
  SyncQueueItem, 
  ForumPost,
  PillarId
} from '../types';
import { INITIAL_FORUM_POSTS } from '../data/forumData';
import { INITIAL_ACHIEVEMENTS } from '../data/achievementsData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  testType: TestType;
  setTestType: (type: TestType) => void;
  deliveryMode: DeliveryMode;
  setDeliveryMode: (mode: DeliveryMode) => void;
  offlineMode: boolean;
  setOfflineMode: (offline: boolean) => void;
  syncQueue: SyncQueueItem[];
  triggerSmartSync: () => void;
  isSyncing: boolean;
  e2eeEnabled: boolean;
  setE2eeEnabled: (enabled: boolean) => void;
  mfaEnabled: boolean;
  setMfaEnabled: (enabled: boolean) => void;
  userProfile: UserProfile;
  updateTargetBand: (band: number) => void;
  forumPosts: ForumPost[];
  addForumPost: (post: { 
    title: string; 
    content: string; 
    pillar: PillarId | 'general'; 
    tags: string[]; 
    isPeerReview?: boolean;
    isExpertQuestion?: boolean;
    expertCategory?: 'fiqh' | 'ielts_strategy';
    targetMentorName?: string;
  }) => void;
  addCommentToPost: (postId: string, text: string, parentId?: string) => void;
  upvoteComment: (postId: string, commentId: string) => void;
  likePost: (postId: string) => void;
  completedLessons: string[];
  markLessonComplete: (lessonId: string, xpGain: number) => void;
  readingScore: { score: number; total: number; band: number } | null;
  setReadingScore: (score: { score: number; total: number; band: number }) => void;
  listeningScore: { score: number; total: number; band: number } | null;
  setListeningScore: (score: { score: number; total: number; band: number }) => void;
  savedEssayDraft: string;
  setSavedEssayDraft: (essay: string) => void;
  securityModalOpen: boolean;
  setSecurityModalOpen: (open: boolean) => void;
  syncModalOpen: boolean;
  setSyncModalOpen: (open: boolean) => void;
}

const INITIAL_PROFILE: UserProfile = {
  name: "Dr. Zaid Al-Faruqi",
  email: "tamankuliner.islamicity@gmail.com",
  targetBand: 8.5,
  currentProjectedBand: 7.5,
  testType: "academic",
  preferredMode: "computer",
  isVerified: true,
  verificationBadge: "Verified Student Scholar (Kaffah Tier II)",
  mfaEnabled: true,
  e2eeActive: true,
  dailyStreak: 12,
  xpPoints: 3450,
  levelTitle: "Al-Mutamayyiz (Advanced Scholar)",
  skillScores: {
    listening: 8.0,
    reading: 8.5,
    writing: 7.0,
    speaking: 7.5
  },
  pillarProgress: {
    berdakwah: 85,
    bersyariah: 90,
    berjamaah: 75,
    bermuamalah: 80
  },
  achievements: INITIAL_ACHIEVEMENTS
};

const INITIAL_SYNC_QUEUE: SyncQueueItem[] = [
  {
    id: 'sq-1',
    type: 'draft_essay',
    title: 'Task 2: Civilizational Coexistence Draft v2',
    timestamp: '10 mins ago',
    status: 'synced',
    payloadSummary: '348 words auto-saved and encrypted'
  },
  {
    id: 'sq-2',
    type: 'progress_update',
    title: 'Reading Module: Waqf & Civil Law Assessment',
    timestamp: '1 hour ago',
    status: 'synced',
    payloadSummary: 'Completed 5/5 questions (Band 8.5)'
  }
];

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [testType, setTestType] = useState<TestType>('academic');
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('computer');
  const [offlineMode, setOfflineMode] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncQueue, setSyncQueue] = useState<SyncQueueItem[]>(INITIAL_SYNC_QUEUE);
  const [e2eeEnabled, setE2eeEnabled] = useState<boolean>(true);
  const [mfaEnabled, setMfaEnabled] = useState<boolean>(true);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(INITIAL_FORUM_POSTS);
  const [completedLessons, setCompletedLessons] = useState<string[]>(['mod-1', 'mod-2']);
  const [readingScore, setReadingScore] = useState<{ score: number; total: number; band: number } | null>(null);
  const [listeningScore, setListeningScore] = useState<{ score: number; total: number; band: number } | null>(null);
  const [savedEssayDraft, setSavedEssayDraft] = useState<string>('');
  const [securityModalOpen, setSecurityModalOpen] = useState<boolean>(false);
  const [syncModalOpen, setSyncModalOpen] = useState<boolean>(false);

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => {
      setOfflineMode(false);
      triggerSmartSync();
    };
    const handleOffline = () => {
      setOfflineMode(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const triggerSmartSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setSyncQueue(prev =>
        prev.map(item => ({
          ...item,
          status: 'synced',
          timestamp: 'Just now'
        }))
      );
      setIsSyncing(false);
    }, 1200);
  };

  const updateTargetBand = (band: number) => {
    setUserProfile(prev => ({ ...prev, targetBand: band }));
  };

  const markLessonComplete = (lessonId: string, xpGain: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
      setUserProfile(prev => ({
        ...prev,
        xpPoints: prev.xpPoints + xpGain,
        currentProjectedBand: Math.min(9.0, +(prev.currentProjectedBand + 0.1).toFixed(1))
      }));

      // Add to sync queue
      const newItem: SyncQueueItem = {
        id: `sq-${Date.now()}`,
        type: 'progress_update',
        title: `Completed Module: ${lessonId}`,
        timestamp: 'Just now',
        status: offlineMode ? 'pending_sync' : 'synced',
        payloadSummary: `Earned +${xpGain} XP`
      };
      setSyncQueue(prev => [newItem, ...prev]);
    }
  };

  const addForumPost = (post: { 
    title: string; 
    content: string; 
    pillar: PillarId | 'general'; 
    tags: string[]; 
    isPeerReview?: boolean;
    isExpertQuestion?: boolean;
    expertCategory?: 'fiqh' | 'ielts_strategy';
    targetMentorName?: string;
  }) => {
    const randomHash = '0x' + Math.random().toString(16).substring(2, 8) + '...' + Math.random().toString(16).substring(2, 6) + ' (E2EE Signed)';
    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      authorName: userProfile.name,
      authorRole: 'Student Scholar',
      authorBadgeColor: 'emerald',
      authorAvatar: 'ZA',
      title: post.title,
      content: post.content,
      timestamp: 'Just now',
      pillar: post.pillar,
      tags: post.tags,
      likes: 1,
      likedByMe: true,
      repliesCount: 0,
      isEncrypted: e2eeEnabled,
      e2eeHash: randomHash,
      isPeerReview: post.isPeerReview,
      isExpertQuestion: post.isExpertQuestion,
      expertCategory: post.expertCategory,
      targetMentorName: post.targetMentorName,
      isResolved: false,
      comments: []
    };

    setForumPosts(prev => [newPost, ...prev]);

    // Add to sync queue
    const syncItem: SyncQueueItem = {
      id: `sq-${Date.now()}`,
      type: 'forum_post',
      title: `${post.isExpertQuestion ? 'Expert Question' : 'Forum'}: ${post.title.substring(0, 30)}...`,
      timestamp: 'Just now',
      status: offlineMode ? 'pending_sync' : 'synced',
      payloadSummary: e2eeEnabled ? 'End-to-End Encrypted Payload' : 'Plaintext Post'
    };
    setSyncQueue(prev => [syncItem, ...prev]);
  };

  const addCommentToPost = (postId: string, text: string, parentId?: string) => {
    setForumPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const newComment = {
            id: `c-${Date.now()}`,
            author: userProfile.name,
            role: 'Student Scholar',
            badgeColor: 'emerald',
            text,
            timestamp: 'Just now',
            upvotes: 0,
            parentId
          };
          return {
            ...p,
            repliesCount: p.repliesCount + 1,
            comments: [...p.comments, newComment]
          };
        }
        return p;
      })
    );
  };

  const upvoteComment = (postId: string, commentId: string) => {
    setForumPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            comments: p.comments.map(c => {
              if (c.id === commentId) {
                const upvoted = c.upvotedByMe;
                return {
                  ...c,
                  upvotes: upvoted ? Math.max(0, c.upvotes - 1) : c.upvotes + 1,
                  upvotedByMe: !upvoted
                };
              }
              return c;
            })
          };
        }
        return p;
      })
    );
  };

  const likePost = (postId: string) => {
    setForumPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const liked = p.likedByMe;
          return {
            ...p,
            likes: liked ? p.likes - 1 : p.likes + 1,
            likedByMe: !liked
          };
        }
        return p;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        testType,
        setTestType,
        deliveryMode,
        setDeliveryMode,
        offlineMode,
        setOfflineMode,
        syncQueue,
        triggerSmartSync,
        isSyncing,
        e2eeEnabled,
        setE2eeEnabled,
        mfaEnabled,
        setMfaEnabled,
        userProfile,
        updateTargetBand,
        forumPosts,
        addForumPost,
        addCommentToPost,
        upvoteComment,
        likePost,
        completedLessons,
        markLessonComplete,
        readingScore,
        setReadingScore,
        listeningScore,
        setListeningScore,
        savedEssayDraft,
        setSavedEssayDraft,
        securityModalOpen,
        setSecurityModalOpen,
        syncModalOpen,
        setSyncModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

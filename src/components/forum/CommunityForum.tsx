import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PillarId, VerifiedMentor, ForumComment, ForumPost } from '../../types';
import { VERIFIED_MENTORS } from '../../data/forumData';
import { 
  ShieldCheck, 
  Lock, 
  MessageSquare, 
  Heart, 
  Plus, 
  Send, 
  Award, 
  CheckCircle, 
  HelpCircle,
  ThumbsUp,
  UserCheck,
  Sparkles,
  ArrowRight,
  CornerDownRight,
  Scale,
  Compass,
  Users,
  Coins,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const CommunityForum: React.FC = () => {
  const { 
    language, 
    forumPosts, 
    addForumPost, 
    addCommentToPost, 
    upvoteComment,
    likePost,
    e2eeEnabled
  } = useApp();

  // Navigation & Filter state
  const [activeSection, setActiveSection] = useState<'expert' | 'all' | 'peer_review'>('expert');
  const [expertCategoryFilter, setExpertCategoryFilter] = useState<'all' | 'fiqh' | 'ielts_strategy'>('all');
  const [selectedPillar, setSelectedPillar] = useState<PillarId | 'all'>('all');

  // Composer Modal state
  const [isComposerOpen, setIsComposerOpen] = useState<boolean>(false);
  const [isExpertSubmission, setIsExpertSubmission] = useState<boolean>(true);
  const [newCategory, setNewCategory] = useState<'fiqh' | 'ielts_strategy'>('fiqh');
  const [newTargetMentor, setNewTargetMentor] = useState<string>('Dr. Tariq Al-Hashimi');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [newPillar, setNewPillar] = useState<PillarId>('bersyariah');
  const [newTags, setNewTags] = useState<string>('Fiqh al-Muamalat, Academic Writing');
  const [isPeerReviewSubmission, setIsPeerReviewSubmission] = useState<boolean>(false);

  // Threaded reply inputs
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [activeReplyToParentId, setActiveReplyToParentId] = useState<Record<string, string | null>>({});

  // Filtered posts logic
  const filteredPosts = forumPosts.filter((post) => {
    if (activeSection === 'expert') {
      if (!post.isExpertQuestion) return false;
      if (expertCategoryFilter !== 'all' && post.expertCategory !== expertCategoryFilter) return false;
      return true;
    }
    if (activeSection === 'peer_review') {
      return post.isPeerReview;
    }
    // 'all' section
    if (selectedPillar !== 'all' && post.pillar !== selectedPillar) return false;
    return true;
  });

  const handleOpenComposerWithMentor = (mentor: VerifiedMentor) => {
    setIsComposerOpen(true);
    setIsExpertSubmission(true);
    setNewTargetMentor(mentor.name);
    if (mentor.specialty.includes('Fiqh') || mentor.specialty.includes('Bioethics')) {
      setNewCategory('fiqh');
      setNewPillar('bersyariah');
    } else {
      setNewCategory('ielts_strategy');
      setNewPillar('berdakwah');
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    addForumPost({
      title: newTitle,
      content: newContent,
      pillar: newPillar,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
      isPeerReview: isPeerReviewSubmission,
      isExpertQuestion: isExpertSubmission,
      expertCategory: isExpertSubmission ? newCategory : undefined,
      targetMentorName: isExpertSubmission ? newTargetMentor : undefined
    });

    setNewTitle('');
    setNewContent('');
    setIsComposerOpen(false);
  };

  const handleAddComment = (postId: string, parentId?: string) => {
    const inputKey = parentId ? `${postId}-${parentId}` : postId;
    const text = commentInputs[inputKey];
    if (!text || !text.trim()) return;

    addCommentToPost(postId, text, parentId);
    setCommentInputs(prev => ({ ...prev, [inputKey]: '' }));
    if (parentId) {
      setActiveReplyToParentId(prev => ({ ...prev, [postId]: null }));
    }
  };

  const getPillarIcon = (pillar: string) => {
    switch (pillar) {
      case 'berdakwah': return <Compass className="w-3.5 h-3.5 text-emerald-600" />;
      case 'bersyariah': return <Scale className="w-3.5 h-3.5 text-teal-600" />;
      case 'berjamaah': return <Users className="w-3.5 h-3.5 text-indigo-600" />;
      case 'bermuamalah': return <Coins className="w-3.5 h-3.5 text-amber-600" />;
      default: return <HelpCircle className="w-3.5 h-3.5 text-stone-500" />;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
            <UserCheck className="w-4 h-4 text-amber-600" />
            <span>{language === 'en' ? 'Verified Scholarly Exchange' : 'Ruang Konsultasi Ilmiah Terverifikasi'}</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
            {language === 'en' ? 'Scholars Forum & "Ask an Expert"' : 'Forum Cendekiawan & "Tanya Pakar"'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
            {language === 'en'
              ? 'Submit inquiries on Islamic jurisprudence (Fiqh) and IELTS band strategies directly to verified mentors.'
              : 'Ajukan pertanyaan fikih muamalah kontemporer dan strategi ujian IELTS langsung kepada mentor terverifikasi.'}
          </p>
        </div>

        <button
          onClick={() => {
            setIsComposerOpen(true);
            setIsExpertSubmission(activeSection === 'expert');
          }}
          className="px-4 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-300 font-semibold text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>
            {language === 'en' 
              ? (activeSection === 'expert' ? 'Ask an Expert a Question' : 'Initiate Discussion')
              : (activeSection === 'expert' ? 'Tanya Pertanyaan ke Pakar' : 'Mulai Diskusi Baru')}
          </span>
        </button>
      </div>

      {/* Main Section Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-2">
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg text-xs">
          <button
            onClick={() => setActiveSection('expert')}
            className={`px-4 py-2 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-2 ${
              activeSection === 'expert'
                ? 'bg-white text-stone-900 shadow-xs font-bold text-amber-900'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>{language === 'en' ? 'Ask an Expert (Fiqh & IELTS)' : 'Tanya Pakar (Fikih & IELTS)'}</span>
          </button>

          <button
            onClick={() => setActiveSection('all')}
            className={`px-4 py-2 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-2 ${
              activeSection === 'all'
                ? 'bg-white text-stone-900 shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-teal-600" />
            <span>{language === 'en' ? 'All Community Discussions' : 'Semua Diskusi Komunitas'}</span>
          </button>

          <button
            onClick={() => setActiveSection('peer_review')}
            className={`px-4 py-2 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-2 ${
              activeSection === 'peer_review'
                ? 'bg-white text-stone-900 shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Award className="w-4 h-4 text-emerald-600" />
            <span>{language === 'en' ? 'Essay Peer Review' : 'Ulasan Sejawat Esai'}</span>
          </button>
        </div>

        {/* Sub-Filters */}
        {activeSection === 'expert' && (
          <div className="flex items-center gap-1 text-xs">
            <span className="text-stone-500 mr-1 hidden sm:inline">Category:</span>
            <button
              onClick={() => setExpertCategoryFilter('all')}
              className={`px-2.5 py-1 rounded cursor-pointer font-medium ${
                expertCategoryFilter === 'all' ? 'bg-amber-400 text-stone-950 font-bold' : 'bg-stone-100 text-stone-700'
              }`}
            >
              All Inquiries
            </button>
            <button
              onClick={() => setExpertCategoryFilter('fiqh')}
              className={`px-2.5 py-1 rounded cursor-pointer font-medium ${
                expertCategoryFilter === 'fiqh' ? 'bg-amber-400 text-stone-950 font-bold' : 'bg-stone-100 text-stone-700'
              }`}
            >
              Islamic Jurisprudence (Fiqh)
            </button>
            <button
              onClick={() => setExpertCategoryFilter('ielts_strategy')}
              className={`px-2.5 py-1 rounded cursor-pointer font-medium ${
                expertCategoryFilter === 'ielts_strategy' ? 'bg-amber-400 text-stone-950 font-bold' : 'bg-stone-100 text-stone-700'
              }`}
            >
              IELTS Strategies
            </button>
          </div>
        )}
      </div>

      {/* VERIFIED MENTORS ROSTER BANNER */}
      {activeSection === 'expert' && (
        <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-300 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Mentor Directorate</span>
              </div>
              <h3 className="font-display text-lg font-bold text-white mt-0.5">
                {language === 'en' ? 'Distinguished Scholars & IELTS Master Trainers' : 'Dewan Pakar & Penguji Senior Terverifikasi'}
              </h3>
            </div>
            <span className="text-xs text-stone-400 font-mono">
              Average Response Time: &lt; 4 hours · 100% Peer Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
            {VERIFIED_MENTORS.map((mentor) => (
              <div 
                key={mentor.id}
                className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 hover:border-amber-400/70 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="w-10 h-10 rounded-full bg-stone-800 text-amber-300 font-display font-bold flex items-center justify-center text-xs border border-stone-700">
                      {mentor.avatar}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                      ★ {mentor.rating.toFixed(1)} ({mentor.answeredCount})
                    </span>
                  </div>

                  <h4 className="font-bold text-stone-100 text-xs sm:text-sm group-hover:text-amber-300 transition-colors">
                    {mentor.name}
                  </h4>
                  <div className="text-[11px] text-amber-400 font-medium font-mono mt-0.5">
                    {mentor.specialty}
                  </div>
                  <p className="text-[11px] text-stone-400 leading-snug mt-1">
                    {mentor.institution}
                  </p>
                </div>

                <button
                  onClick={() => handleOpenComposerWithMentor(mentor)}
                  className="w-full py-1.5 px-3 rounded-lg bg-stone-800 hover:bg-amber-400 hover:text-stone-950 text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>Ask Direct Question</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QUESTION / THREAD COMPOSER MODAL */}
      {isComposerOpen && (
        <form onSubmit={handleCreatePost} className="p-6 bg-white rounded-2xl border-2 border-amber-300 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                {isExpertSubmission ? 'Ask an Expert Submission' : 'Scholarly Discourse Composer'}
              </span>
              <h3 className="font-display text-lg font-bold text-stone-900">
                {isExpertSubmission 
                  ? 'Submit Inquiries to Verified Scholars & Examiners' 
                  : 'Start a General Discussion'}
              </h3>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-mono">
                <Lock className="w-3.5 h-3.5" />
                <span>E2EE Active</span>
              </div>
              <button
                type="button"
                onClick={() => setIsComposerOpen(false)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer p-1"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Expert Category & Mentor Selectors */}
          {isExpertSubmission && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-amber-50/50 border border-amber-200/80">
              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1.5">
                  Question Domain:
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => { setNewCategory('fiqh'); setNewPillar('bersyariah'); }}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
                      newCategory === 'fiqh'
                        ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200'
                    }`}
                  >
                    Islamic Jurisprudence (Fiqh)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setNewCategory('ielts_strategy'); setNewPillar('berdakwah'); }}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
                      newCategory === 'ielts_strategy'
                        ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200'
                    }`}
                  >
                    IELTS Examination Strategies
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1.5">
                  Designated Mentor:
                </label>
                <select
                  value={newTargetMentor}
                  onChange={(e) => setNewTargetMentor(e.target.value)}
                  className="w-full p-2 rounded-lg border border-stone-200 bg-white text-xs text-stone-900 font-medium focus:border-amber-400 focus:outline-none"
                >
                  {VERIFIED_MENTORS.map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name} ({m.specialty})
                    </option>
                  ))}
                  <option value="Any Available Expert">Any Available Mentor</option>
                </select>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                4B Pillar Alignment:
              </label>
              <select
                value={newPillar}
                onChange={(e) => setNewPillar(e.target.value as PillarId)}
                className="w-full p-2.5 rounded-lg border border-stone-200 text-xs bg-white text-stone-800 focus:outline-none focus:border-amber-400"
              >
                <option value="berdakwah">Berdakwah (Communication & Wisdom)</option>
                <option value="bersyariah">Bersyariah (Jurisprudence & Ethics)</option>
                <option value="berjamaah">Berjamaah (Community & Solidarity)</option>
                <option value="bermuamalah">Bermuamalah (Economics & Halal Trade)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Tags (comma-separated):
              </label>
              <input
                type="text"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                placeholder="e.g. Fiqh al-Muamalat, Task 2 Argumentation"
                className="w-full p-2.5 rounded-lg border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Inquiry Title or Central Proposition:
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Fiqh Question: Legality of fractional green sukuk ownership without possession"
              className="w-full p-2.5 rounded-lg border border-stone-200 text-xs text-stone-800 font-medium focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Detailed Context / Evidence / Questions:
            </label>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={5}
              placeholder="Provide background context, relevant classical textual references, or your specific IELTS practice conundrum..."
              className="w-full p-3.5 rounded-lg border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-amber-400 leading-relaxed font-serif"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isPeerReviewSubmission}
                onChange={(e) => setIsPeerReviewSubmission(e.target.checked)}
                className="rounded text-amber-500"
              />
              <span>Tag as IELTS Essay Draft for Peer Review</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsComposerOpen(false)}
                className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-850 text-amber-300 font-bold text-xs cursor-pointer transition-colors shadow-xs"
              >
                {isExpertSubmission ? 'Submit Question to Verified Mentors' : 'Post Discussion'}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* FEED: POSTS & QUESTIONS */}
      <div className="space-y-6">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-stone-200 space-y-3">
            <HelpCircle className="w-8 h-8 text-stone-400 mx-auto" />
            <h4 className="font-bold text-stone-800 text-sm">No inquiries found in this view</h4>
            <p className="text-xs text-stone-500">
              Be the first to ask an expert or initiate a discussion on 4B Kaffah & IELTS competencies!
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const rootComments = post.comments.filter(c => !c.parentId);
            const childCommentsMap = post.comments.reduce((acc, curr) => {
              if (curr.parentId) {
                if (!acc[curr.parentId]) acc[curr.parentId] = [];
                acc[curr.parentId].push(curr);
              }
              return acc;
            }, {} as Record<string, ForumComment[]>);

            return (
              <div
                key={post.id}
                className="p-6 sm:p-7 bg-white rounded-2xl border border-stone-200 space-y-5 shadow-xs hover:border-amber-200 transition-colors"
              >
                {/* Post Top Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-900 text-amber-300 font-bold text-xs flex items-center justify-center font-display border border-stone-700">
                      {post.authorAvatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-sm">{post.authorName}</span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200 flex items-center gap-1">
                          <UserCheck className="w-3 h-3 text-emerald-600" />
                          <span>{post.authorRole}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-stone-400">
                        <span>{post.timestamp}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-stone-500">{post.e2eeHash}</span>
                      </div>
                    </div>
                  </div>

                  {/* Badges / Routing */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {post.isExpertQuestion && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 font-bold text-[11px] flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>
                          {post.expertCategory === 'fiqh' ? 'Fiqh Inquiry' : 'IELTS Strategy Inquiry'}
                        </span>
                      </span>
                    )}

                    {post.targetMentorName && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-stone-100 text-stone-700 border border-stone-200">
                        To: {post.targetMentorName}
                      </span>
                    )}

                    <span className="font-semibold uppercase tracking-wider text-amber-800 text-[11px] flex items-center gap-1">
                      {getPillarIcon(post.pillar)}
                      <span>{post.pillar}</span>
                    </span>
                  </div>
                </div>

                {/* Question Title & Content */}
                <div className="space-y-2.5">
                  <h3 className="font-display text-lg font-bold text-stone-900 leading-snug">
                    {post.title}
                  </h3>
                  <div className="text-stone-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-serif bg-stone-50/60 p-4 rounded-xl border border-stone-100">
                    {post.content}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {post.tags.map((t, idx) => (
                    <span key={idx} className="text-[11px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded border border-stone-200/60">
                      #{t}
                    </span>
                  ))}
                </div>

                {/* Question Interaction Bar (Upvote Question & Replies Count) */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs text-stone-600">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => likePost(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                        post.likedByMe
                          ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold'
                          : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${post.likedByMe ? 'fill-amber-600 text-amber-600' : ''}`} />
                      <span>{post.likes} Upvotes</span>
                    </button>

                    <div className="flex items-center gap-1.5 text-stone-500">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments.length} Threaded Replies</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-emerald-800">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Cryptographically Authenticated</span>
                  </div>
                </div>

                {/* THREADED REPLIES & OFFICIAL MENTOR ANSWERS */}
                {post.comments.length > 0 && (
                  <div className="space-y-4 pt-3 border-t border-stone-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                      Expert Guidance & Community Deliberation:
                    </span>

                    {rootComments.map((comment) => {
                      const childReplies = childCommentsMap[comment.id] || [];
                      const isReplyingToThis = activeReplyToParentId[post.id] === comment.id;

                      return (
                        <div
                          key={comment.id}
                          className={`p-4 rounded-xl space-y-3 transition-all ${
                            comment.isOfficialMentorAnswer
                              ? 'bg-gradient-to-r from-amber-50/70 via-stone-50 to-white border-2 border-amber-300 shadow-xs'
                              : 'bg-stone-50 border border-stone-200'
                          }`}
                        >
                          {/* Comment Header */}
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-stone-900 text-xs sm:text-sm">
                                {comment.author}
                              </span>

                              {comment.isOfficialMentorAnswer && (
                                <span className="text-[10px] bg-amber-500 text-stone-950 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                                  <Award className="w-3 h-3" />
                                  <span>Official Mentor Answer</span>
                                </span>
                              )}

                              {comment.verifiedScholarSeal && !comment.isOfficialMentorAnswer && (
                                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-mono">
                                  Verified Seal
                                </span>
                              )}

                              <span className="text-stone-400 text-[11px]">· {comment.role}</span>
                            </div>

                            <span className="text-[10px] text-stone-400 font-mono">
                              {comment.timestamp}
                            </span>
                          </div>

                          {/* Comment Text */}
                          <div className="text-stone-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-serif pl-1">
                            {comment.text}
                          </div>

                          {/* Action Strip (Upvote answer & Threaded reply button) */}
                          <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => upvoteComment(post.id, comment.id)}
                                className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer border ${
                                  comment.upvotedByMe
                                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                                    : 'bg-white hover:bg-stone-100 border-stone-200 text-stone-700'
                                }`}
                              >
                                <ThumbsUp className="w-3 h-3" />
                                <span>{comment.upvotes || 0} Helpful</span>
                              </button>

                              <button
                                onClick={() => {
                                  setActiveReplyToParentId(prev => ({
                                    ...prev,
                                    [post.id]: isReplyingToThis ? null : comment.id
                                  }));
                                }}
                                className="text-stone-600 hover:text-stone-900 font-medium text-[11px] cursor-pointer flex items-center gap-1"
                              >
                                <CornerDownRight className="w-3 h-3" />
                                <span>{isReplyingToThis ? 'Cancel Reply' : 'Thread Reply'}</span>
                              </button>
                            </div>

                            {childReplies.length > 0 && (
                              <span className="text-[11px] font-mono text-stone-500">
                                {childReplies.length} follow-up {childReplies.length === 1 ? 'reply' : 'replies'}
                              </span>
                            )}
                          </div>

                          {/* NESTED THREADED REPLIES */}
                          {childReplies.length > 0 && (
                            <div className="pl-4 sm:pl-6 pt-2 border-l-2 border-stone-300 space-y-2.5 my-2">
                              {childReplies.map((reply) => (
                                <div key={reply.id} className="p-3 bg-white rounded-lg border border-stone-200 text-xs space-y-1">
                                  <div className="flex items-center justify-between text-[11px]">
                                    <div className="flex items-center gap-1.5 font-semibold text-stone-900">
                                      <span>{reply.author}</span>
                                      <span className="text-stone-400 font-normal">· {reply.role}</span>
                                    </div>
                                    <span className="text-stone-400 text-[10px]">{reply.timestamp}</span>
                                  </div>
                                  <p className="text-stone-700 font-serif leading-relaxed">
                                    {reply.text}
                                  </p>
                                  <div className="pt-1 flex items-center gap-2">
                                    <button
                                      onClick={() => upvoteComment(post.id, reply.id)}
                                      className={`text-[10px] font-mono flex items-center gap-1 px-1.5 py-0.5 rounded cursor-pointer ${
                                        reply.upvotedByMe ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-stone-500 hover:text-stone-800'
                                      }`}
                                    >
                                      <ThumbsUp className="w-2.5 h-2.5" />
                                      <span>{reply.upvotes || 0}</span>
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* INLINE SUB-REPLY COMPOSER */}
                          {isReplyingToThis && (
                            <div className="pt-2 pl-4 sm:pl-6 border-l-2 border-amber-400 flex items-center gap-2">
                              <input
                                type="text"
                                value={commentInputs[`${post.id}-${comment.id}`] || ''}
                                onChange={(e) => setCommentInputs({
                                  ...commentInputs,
                                  [`${post.id}-${comment.id}`]: e.target.value
                                })}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleAddComment(post.id, comment.id);
                                }}
                                placeholder={`Write a follow-up inquiry to ${comment.author}...`}
                                className="flex-1 p-2 rounded-lg border border-stone-300 text-xs bg-white text-stone-900 focus:outline-none focus:border-amber-400"
                              />
                              <button
                                onClick={() => handleAddComment(post.id, comment.id)}
                                className="px-3 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-300 font-semibold text-xs cursor-pointer transition-colors"
                              >
                                Reply
                              </button>
                            </div>
                          )}

                        </div>
                      );
                    })}
                  </div>
                )}

                {/* BOTTOM PRIMARY REPLY COMPOSER FOR ROOT THREAD */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={commentInputs[post.id] || ''}
                    onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(post.id); }}
                    placeholder="Contribute a scholarly reflection or peer answer..."
                    className="flex-1 p-2.5 rounded-lg border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="px-4 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-300 cursor-pointer transition-colors font-medium text-xs flex items-center gap-1.5"
                    title="Send response"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Respond</span>
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

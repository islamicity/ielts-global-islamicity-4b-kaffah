import { ForumPost, VerifiedMentor } from '../types';

export const VERIFIED_MENTORS: VerifiedMentor[] = [
  {
    id: 'mentor-1',
    name: 'Dr. Tariq Al-Hashimi',
    titleEn: 'Senior Sharia Jurist & Waqf Research Fellow',
    titleId: 'Pakar Fikih Senior & Peneliti Wakaf Internasional',
    specialty: 'Islamic Jurisprudence (Fiqh)',
    institution: 'Al-Azhar University & INCEIF Islamic Capital Markets',
    avatar: 'TA',
    badgeColor: 'emerald',
    answeredCount: 142,
    rating: 4.9,
    available: true
  },
  {
    id: 'mentor-2',
    name: 'Prof. Sarah Jenkins',
    titleEn: 'Ex-Senior IELTS Examiner & Master Trainer (Band 9.0)',
    titleId: 'Mantan Penguji Senior IELTS & Pelatih Master Band 9.0',
    specialty: 'IELTS Examination Strategies',
    institution: 'British Council Consultant & Cambridge English Assessor',
    avatar: 'SJ',
    badgeColor: 'amber',
    answeredCount: 188,
    rating: 5.0,
    available: true
  },
  {
    id: 'mentor-3',
    name: 'Ustaz Ahmad Faris, Ph.D.',
    titleEn: 'Islamic Social Finance & Muamalah Economist',
    titleId: 'Pakar Ekonomi Syariah & Muamalah Kontemporer',
    specialty: 'Islamic Economics (Muamalah)',
    institution: 'International Islamic University & Halal Governance Forum',
    avatar: 'AF',
    badgeColor: 'teal',
    answeredCount: 96,
    rating: 4.8,
    available: true
  },
  {
    id: 'mentor-4',
    name: 'Dr. Maryam Al-Sabah',
    titleEn: 'Comparative Bioethics & Maqasid Law Specialist',
    titleId: 'Spesialis Bioetika Komparatif & Maqasid Syariah',
    specialty: 'Bioethics & Law',
    institution: 'Oxford Centre for Islamic Studies & World Bioethics Council',
    avatar: 'MA',
    badgeColor: 'indigo',
    answeredCount: 84,
    rating: 4.9,
    available: true
  }
];

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  // ASK AN EXPERT: FIQH JURISPRUDENCE QUESTION
  {
    id: 'post-expert-1',
    authorName: 'Ibrahim Al-Qasimi',
    authorRole: 'Student Scholar',
    authorBadgeColor: 'blue',
    authorAvatar: 'IQ',
    title: 'Fiqh Inquiry: Jurisprudential Validity of Carbon Credits via Istisna\'a and Salam Contracts',
    content: `Assalamu\'alaikum respected Dr. Tariq Al-Hashimi.

In our current research on ESG sukuk and environmental economics (Bermuamalah), we are analyzing whether sovereign voluntary carbon offsets comply with the classical elimination of ambiguity (Nafy al-Gharar). 

Specifically: Can future carbon sequestration rights be legitimately traded under Salam (forward sale with upfront payment) or Istisna\'a (manufacturing contract), or does the atmospheric contingency create impermissible speculative uncertainty? How should this be articulated in formal Academic English for our upcoming dissertation?`,
    timestamp: '3 hours ago',
    pillar: 'bersyariah',
    tags: ['Fiqh al-Muamalat', 'Carbon Credits', 'Gharar Doctrine', 'Academic Terminology'],
    likes: 34,
    likedByMe: true,
    repliesCount: 3,
    isEncrypted: true,
    e2eeHash: '0x7e12c...d99a (E2EE Verified)',
    isExpertQuestion: true,
    expertCategory: 'fiqh',
    targetMentorName: 'Dr. Tariq Al-Hashimi',
    isResolved: true,
    comments: [
      {
        id: 'c-exp-1',
        author: 'Dr. Tariq Al-Hashimi',
        role: 'Verified Scholar',
        badgeColor: 'emerald',
        text: `Wa alaikum assalam wa rahmatullah, Brother Ibrahim.

A brilliant and timely jurisprudential inquiry. The consensus among the International Islamic Fiqh Academy (IIFA Resolution 220) and AAOIFI Shariah Standard No. 62 is as follows:

1. Tangible Usufruct vs Gharar: Carbon credits are not mere speculative certificates; when rigorously verified by independent registries, they represent a legally recognized right (Haqq Ma\'nawi) associated with verifiable atmospheric carbon abatement.
2. Contractual Structuring: A Salam structure is permissible provided the underlying mitigation unit (metric ton of CO2 equivalent) is precisely quantifiable and standardized, thereby dispelling Gharar.
3. Academic Phrasing for IELTS: In your writing, avoid translating this colloquially as "buying air". Instead, employ high-register academic collocations such as: "intangible proprietary usufruct", "mitigating probabilistic counterparty volatility", and "contingent environmental deliverables".`,
        timestamp: '2 hours ago',
        verifiedScholarSeal: true,
        isOfficialMentorAnswer: true,
        upvotes: 28,
        upvotedByMe: true
      },
      {
        id: 'c-exp-2',
        author: 'Ibrahim Al-Qasimi',
        role: 'Student Scholar',
        badgeColor: 'blue',
        text: 'Jazakallahu khairan, Dr. Tariq! The distinction regarding "Haqq Ma\'nawi" as an intangible proprietary right provides the exact jurisprudential foundation we needed. We will incorporate this terminology into our thesis.',
        timestamp: '1 hour ago',
        parentId: 'c-exp-1',
        upvotes: 6
      }
    ]
  },

  // ASK AN EXPERT: IELTS STRATEGY QUESTION
  {
    id: 'post-expert-2',
    authorName: 'Amina Nurul Huda',
    authorRole: 'Candidate',
    authorBadgeColor: 'stone',
    authorAvatar: 'AN',
    title: 'IELTS Strategy: Eliminating Lexical Redundancy between Introduction Paraphrase & Conclusion in Task 2',
    content: `Dear Prof. Sarah Jenkins,

I frequently find myself struggling with paragraph symmetry in IELTS Academic Writing Task 2. When paraphrasing the question in the introduction and then summarizing my position in the conclusion, I tend to recycle the same synonyms (e.g. "cultural diversity", "social cohesion", "mutual respect"). 

How do Band 9 candidates maintain lexical variety across the beginning and end of the essay without altering the precise propositional meaning of the thesis? Could you provide a concrete exemplar structure?`,
    timestamp: '5 hours ago',
    pillar: 'berdakwah',
    tags: ['Task 2 Strategy', 'Lexical Resource', 'Paraphrasing Mastery', 'Band 9 Score'],
    likes: 47,
    likedByMe: false,
    repliesCount: 2,
    isEncrypted: true,
    e2eeHash: '0x4f88b...e112 (E2EE Verified)',
    isExpertQuestion: true,
    expertCategory: 'ielts_strategy',
    targetMentorName: 'Prof. Sarah Jenkins',
    isResolved: true,
    comments: [
      {
        id: 'c-exp-3',
        author: 'Prof. Sarah Jenkins',
        role: 'IELTS Master Trainer (Band 9.0)',
        badgeColor: 'amber',
        text: `Hello Amina, an insightful and critical dilemma that separates Band 7.0 from Band 8.5+ writers!

Examiners penalize "mechanical synonym substitution" (e.g., swapping words blindly with a thesaurus). The secret to Band 9 symmetry is shifting grammatical form rather than relying purely on single-word synonyms:

1. Nominalization Shift in Intro:
"The accelerated integration of multicultural populations often precipitates sociopolitical friction..." (Noun phrase focus).

2. Deductive Synthesis in Conclusion:
"In conclusion, while disparate normative frameworks may initially engender localized estrangement, proactive intercultural dialogue decisively transforms diversity into enduring social capital." (Concession clause + dynamic verb predicate).

Notice that we did not just swap words; we elevated the conceptual resolution. The conclusion provides a sense of finality and consequence!`,
        timestamp: '3 hours ago',
        verifiedScholarSeal: true,
        isOfficialMentorAnswer: true,
        upvotes: 35,
        upvotedByMe: true
      },
      {
        id: 'c-exp-4',
        author: 'Amina Nurul Huda',
        role: 'Candidate',
        badgeColor: 'stone',
        text: 'The nominalization shift strategy is a game-changer! Shifting from adjective-noun to verbal clauses resolves the repetition immediately.',
        timestamp: '2 hours ago',
        parentId: 'c-exp-3',
        upvotes: 8
      }
    ]
  },

  // GENERAL DISCUSSIONS
  {
    id: 'post-1',
    authorName: 'Dr. Tariq Al-Hashimi',
    authorRole: 'Verified Scholar',
    authorBadgeColor: 'emerald',
    authorAvatar: 'TA',
    title: 'The Epistemology of "Jidal bi al-Lati Hiya Ahsan" in IELTS Academic Task 2 Argumentation',
    content: `When candidates write IELTS Academic Task 2 discursive essays, examiners frequently penalize one-sided polemics or emotionally loaded assertions. In the Quranic pedagogical directive (Surah An-Nahl 16:125), we are instructed to debate "bi al-lati hiya ahsan"—in the most gracious, intellectually sound manner. 

In IELTS criteria, this directly equates to:
1. Balanced acknowledgment of counter-arguments (e.g., using concede-and-rebut structures such as "While proponents of X legitimately point to Y, empirical data substantiates that...").
2. Nuanced academic hedging (avoiding sweeping dogmatism like "obviously" or "everyone knows", replacing them with "evidence suggests", "it is plausible that").
3. Elevating lexical precision over inflammatory adjectives.

Feel free to post your introduction or thesis statements below for scholarly peer critique!`,
    timestamp: 'Yesterday',
    pillar: 'berdakwah',
    tags: ['Academic Writing', 'Task 2 Rubric', 'Dialectical Argumentation', 'Scholarly Discourse'],
    likes: 48,
    repliesCount: 2,
    isEncrypted: true,
    e2eeHash: '0x8f2d9...e41b (E2EE Verified)',
    comments: [
      {
        id: 'c-1',
        author: 'Prof. Sarah Jenkins',
        role: 'IELTS Master Trainer (Band 9.0)',
        badgeColor: 'amber',
        text: 'Brilliant articulation, Dr. Tariq! As an ex-examiner, I can affirm that candidates who master balanced hedging and nuanced concession invariably score Band 8.5+ in Task Response and Cohesion.',
        timestamp: '18 hours ago',
        verifiedScholarSeal: true,
        upvotes: 14
      },
      {
        id: 'c-2',
        author: 'Zayd Al-Mansoor',
        role: 'Student Scholar',
        badgeColor: 'blue',
        text: 'This completely reframed my perspective on essay structure. I used to think arguing passionately meant writing forcefully, but measured restraint is far more persuasive.',
        timestamp: '17 hours ago',
        upvotes: 5
      }
    ]
  },
  {
    id: 'post-2',
    authorName: 'Prof. Sarah Jenkins',
    authorRole: 'IELTS Master Trainer (Band 9.0)',
    authorBadgeColor: 'amber',
    authorAvatar: 'SJ',
    title: 'Deconstructing IELTS Academic Task 1: Describing Green Sukuk & Ethical Finance Infographics',
    content: `When reporting on financial and environmental datasets (such as our Green Sukuk & ESG trends module), remember the three cardinal rules:
1. Overview First: Always supply a high-level summary paragraph highlighting the macro trend before drilling into specific regional figures.
2. Comparative Lexicon: Contrast the steep gradient of Green Sukuk acceleration against conventional debt curves using terms like "exponential trajectory", "outpaced", "stabilized at a plateau".
3. Accuracy: Never hallucinate external justifications in Task 1 unless they are explicitly annotated on the infographic.

Let us review sample candidate submissions below!`,
    timestamp: '2 days ago',
    pillar: 'bermuamalah',
    tags: ['Task 1 Report', 'Green Sukuk', 'Data Synthesis', 'Band 9 Vocabulary'],
    likes: 62,
    repliesCount: 2,
    isEncrypted: true,
    e2eeHash: '0x3c71a...99fd (E2EE Verified)',
    isPeerReview: true,
    peerReviewTarget: 'IELTS Academic Task 1 Visual Report',
    comments: [
      {
        id: 'c-3',
        author: 'Fatimah Az-Zahra',
        role: 'Student Scholar',
        badgeColor: 'blue',
        text: 'Here is my overview paragraph: "Overall, the six-year metric demonstrates a decisive shift toward asset-backed green issuances, with Islamic Sukuk experiencing a compound growth rate that steadily narrowed the historical disparity with conventional ESG bonds."',
        timestamp: '1 day ago',
        upvotes: 12
      },
      {
        id: 'c-4',
        author: 'Prof. Sarah Jenkins',
        role: 'IELTS Master Trainer (Band 9.0)',
        badgeColor: 'amber',
        text: 'Outstanding, Fatimah! That is clean Band 8.5+ phrasing—concise overview without listing individual data points prematurely.',
        timestamp: '1 day ago',
        verifiedScholarSeal: true,
        upvotes: 9
      }
    ]
  }
];

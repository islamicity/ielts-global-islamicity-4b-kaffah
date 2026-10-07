import { ReadingTestPassage, ListeningAudioItem } from '../types';

export const READING_PASSAGES: ReadingTestPassage[] = [
  {
    id: 'reading-passage-1',
    pillar: 'bersyariah',
    title: 'The Institutional Evolution of Waqf and Its Enduring Legacy in Global Civil Law',
    testType: 'academic',
    wordCount: 840,
    content: [
      `Section A: The origin of the modern endowment and charitable trust has long fascinated legal historians. While contemporary legal textbooks frequently attribute the inception of the equitable trust to medieval English common law—specifically the Statute of Uses of 1535—a growing consortium of comparative legal scholars has identified a much earlier institutional antecedent: the Islamic Waqf. Established during the formative centuries of Islamic civilization, the Waqf is an irrevocable legal mechanism whereby a property owner dedicates the usufruct (benefits or revenues) of an asset in perpetuity to a designated charitable or public purpose, while divesting themselves of proprietary ownership.`,
      `Section B: The structural parallels between the classical Waqf and the English trust are striking. Under both legal doctrines, the dedicated assets are permanently shielded from expropriation, confiscation, and familial inheritance disputes. In both systems, a fiduciary manager (termed a Mutawalli in Islamic jurisprudence, and a trustee in Anglo-American law) is legally mandated to steward the principal corpus of the property in strict accordance with the founder’s deed. Notably, Oxford legal historian Monica Gaudiosi demonstrated that during the Crusades and Franciscan monastic missions to the Levant in the 12th and 13th centuries, English jurists were directly exposed to the operational mechanics of the Waqf, subsequently transplanting these equitable principles into Oxford and Cambridge collegiate endowments.`,
      `Section C: Beyond its jurisprudential ingenuity, the socioeconomic footprint of the Waqf was monumental. Throughout the Ottoman, Mamluk, and Abbasid eras, the Waqf served as the primary decentralised mechanism for public infrastructure. Hospitals (Bimaristan), universities, public aqueducts, roadside caravanserais, and astronomical observatories were financed entirely without recourse to state taxation or sovereign debt. In Istanbul during the 18th century, archival registers indicate that nearly one-third of all municipal land was held under benevolent Waqf governance, providing complimentary healthcare and education to citizens regardless of religious creed.`,
      `Section D: In the twenty-first century, the principles underlying the Waqf are experiencing a profound renaissance, particularly within the domain of sustainability and sovereign wealth funds. Contemporary Islamic economists, operating in conjunction with the United Nations Development Programme (UNDP), have pioneered "Cash Waqf Linked Sukuk" and digital micro-endowments. These modern instruments harness blockchain technology and smart contracts to ensure transparent disbursement directly to solar energy cooperatives and educational scholarships for underprivileged scholars. By democratizing philanthropy and institutionalizing intergenerational equity, the ancient doctrine of Waqf presents an enduring paradigm for addressing systemic inequality in our contemporary financial architecture.`
    ],
    questions: [
      {
        id: 'rq-1',
        section: 1,
        questionNumber: 1,
        type: 'matching_headings',
        prompt: 'Which section discusses the historical cross-pollination between Middle Eastern endowments and medieval English universities?',
        options: ['Section A', 'Section B', 'Section C', 'Section D'],
        correctAnswer: 'Section B',
        explanation: 'Section B explicitly details how English jurists in the 12th/13th centuries were exposed to Waqf mechanics in the Levant and transplanted them into Oxford and Cambridge collegiate endowments.'
      },
      {
        id: 'rq-2',
        section: 1,
        questionNumber: 2,
        type: 'true_false_not_given',
        prompt: 'In classical Waqf institutions, the founder retained the right to reclaim proprietary ownership of the property at any time.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: 'FALSE',
        explanation: 'Section A states that the Waqf is an "irrevocable legal mechanism" where the owner dedicates usufruct in perpetuity while "divesting themselves of proprietary ownership". Thus, they cannot reclaim it.'
      },
      {
        id: 'rq-3',
        section: 1,
        questionNumber: 3,
        type: 'true_false_not_given',
        prompt: 'In 18th-century Istanbul, public hospitals operated under Waqf foundations were exclusively accessible to Muslim citizens.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: 'FALSE',
        explanation: 'Section C specifies that the Waqf system provided "complimentary healthcare and education to citizens regardless of religious creed".'
      },
      {
        id: 'rq-4',
        section: 1,
        questionNumber: 4,
        type: 'multiple_choice',
        prompt: 'According to Section D, modern implementations of Waqf frequently utilize blockchain technology to:',
        options: [
          'Replace municipal government taxation bodies entirely',
          'Facilitate speculative financial trading across global exchanges',
          'Guarantee transparent disbursement toward clean energy and educational micro-endowments',
          'Circumvent international regulatory reporting standards'
        ],
        correctAnswer: 'Guarantee transparent disbursement toward clean energy and educational micro-endowments',
        explanation: 'Section D emphasizes that modern digital endowments harness blockchain and smart contracts for transparent direct disbursement to solar cooperatives and scholarships.'
      },
      {
        id: 'rq-5',
        section: 1,
        questionNumber: 5,
        type: 'summary_completion',
        prompt: 'Complete the summary: A fiduciary manager who administers the assets according to the founder’s stipulations is known as a ________.',
        options: ['Usufructuary', 'Mutawalli', 'Bimaristan', 'Sukuk'],
        correctAnswer: 'Mutawalli',
        explanation: 'Section B explicitly names the fiduciary manager "termed a Mutawalli in Islamic jurisprudence".'
      }
    ]
  }
];

export const LISTENING_AUDIO_SIMULATIONS: ListeningAudioItem[] = [
  {
    id: 'listen-item-1',
    pillar: 'bermuamalah',
    part: 4,
    title: 'Academic Lecture: Ethical Finance, Green Sukuk & Sustainable Development',
    context: 'A university guest lecture delivered by Dr. Tariq Al-Hashimi at the International Centre for Education in Islamic Finance (INCEIF).',
    durationSeconds: 165,
    audioSimulationText: `Good morning, everyone. In today's lecture on comparative financial architectures, we are examining the rapid integration between Islamic capital markets and global Environmental, Social, and Governance—or ESG—standards. 

To understand why this synergy is occurring, we must first examine the foundational principle of Bermuamalah. Unlike conventional debt markets, where financial contracts can be decoupled from physical economic reality through exotic derivatives, Islamic finance is fundamentally anchored to tangible underlying assets. The primary instrument spearheading this transformation is the 'Green Sukuk'. 

Now, please take note: between 2020 and 2026, global issuance of Green Sukuk experienced an unprecedented upward trajectory, expanding from 4.2 billion dollars to over 32 billion dollars. Why? Because institutional investors recognized that the prohibition of excessive ambiguity—termed 'Gharar' in Arabic jurisprudence—combined with the mandatory risk-sharing mandate, creates an intrinsic safeguard against systemic debt crises. 

Furthermore, sixty-five percent of proceeds from recent issuances across Southeast Asia and the Gulf Cooperation Council were directed specifically towards two sectors: utility-scale solar installations and metropolitan water desalination plants. In summary, ethical Islamic finance is no longer a peripheral niche; it has become a central catalyst in mobilizing private capital toward the United Nations Sustainable Development Goals.`,
    questions: [
      {
        id: 'lq-1',
        section: 4,
        questionNumber: 1,
        type: 'multiple_choice',
        prompt: 'According to the lecturer, what distinguishes Islamic finance from conventional debt markets?',
        options: [
          'It relies exclusively on government subsidies for liquidity',
          'It is fundamentally anchored to tangible underlying assets rather than decoupled derivatives',
          'It eliminates all forms of commercial partnerships',
          'It is restricted strictly to domestic sovereign borrowers'
        ],
        correctAnswer: 'It is fundamentally anchored to tangible underlying assets rather than decoupled derivatives',
        explanation: 'The speaker states that Islamic finance is "fundamentally anchored to tangible underlying assets" unlike conventional debt markets decoupled via exotic derivatives.'
      },
      {
        id: 'lq-2',
        section: 4,
        questionNumber: 2,
        type: 'multiple_choice',
        prompt: 'The Arabic term cited by the speaker denoting "excessive ambiguity or speculation" is:',
        options: ['Riba', 'Gharar', 'Mudarabah', 'Zakat'],
        correctAnswer: 'Gharar',
        explanation: 'The lecture defines Gharar as "the prohibition of excessive ambiguity".'
      },
      {
        id: 'lq-3',
        section: 4,
        questionNumber: 3,
        type: 'multiple_choice',
        prompt: 'What percentage of proceeds from recent regional Green Sukuk issuances were earmarked for clean energy and desalination?',
        options: ['32 percent', '50 percent', '65 percent', '80 percent'],
        correctAnswer: '65 percent',
        explanation: 'The speaker notes: "sixty-five percent of proceeds from recent issuances... were directed specifically towards two sectors: utility-scale solar installations and metropolitan water desalination plants."'
      }
    ]
  }
];

export const SPEAKING_EXAM_TOPICS = {
  part1: {
    title: 'Part 1: Introduction & Everyday Lifestyle (4-5 minutes)',
    examinerIntroduction: 'Good afternoon. My name is Dr. Margaret Vance, your IELTS Speaking Examiner. Could you please tell me your full name and where you are currently living?',
    questions: [
      'Do you frequently participate in community or group volunteer activities in your neighborhood?',
      'How important is ethical financial decision-making or mindful spending in your daily life?',
      'Do you prefer discussing cultural traditions face-to-face or via digital platforms?'
    ],
    sampleBand9Answers: [
      '“Certainly. In my hometown, I regularly take part in weekend food bank distributions and youth mentorship programs. I find that engaging in communal initiatives—what in my cultural tradition is termed Berjamaah—not only strengthens neighborhood solidarity but also broadens my communicative perspective.”',
      '“Ethical financial prudence is paramount for me. I strive to avoid speculative consumption and instead allocate savings toward sustainable, transparent enterprises. Supporting ethical commerce—or Bermuamalah—ensures that my economic footprint aligns with principles of social equity.”'
    ]
  },
  part2: {
    title: 'Part 2: Individual Long Turn / Cue Card (3-4 minutes)',
    prepTimeSeconds: 60,
    speakTimeSeconds: 120,
    cueCardTopic: 'Describe an intercultural or interfaith discussion you had that gave you a new understanding of another perspective.',
    bulletPoints: [
      'When and where this discussion took place',
      'Who you were speaking with',
      'What specific topics or values were explored',
      'And explain what you learned from this dialogue about building global mutual respect.'
    ],
    modelResponse: `I would like to recount an illuminating dialogue that occurred two years ago during an international post-graduate seminar at the Oxford Inter-Faith Institute. I was conversing with a senior doctoral researcher from Sweden who was investigating comparative moral philosophies.

Our discussion began with an examination of how different ethical traditions address socioeconomic inequality. I elaborated on the Islamic principles of 4B Kaffah—particularly how communal unity (Berjamaah) and equitable economic stewardship (Bermuamalah) are operationalized through institutional endowments such as Waqf and mandatory wealth equalization through Zakat. In turn, my colleague articulated the Scandinavian social-democratic model of universal welfare and collective labor pacts.

What made this conversation truly transformative was discovering the remarkable convergence between our divergent conceptual vocabularies. Despite originating from distinct historical lineages, both paradigms shared a profound commitment to human dignity, the eradication of poverty, and intergenerational equity. That discussion underscored for me that authentic cross-cultural diplomacy does not require erasing our distinct identities; rather, through reasoned, empathetic dialogue—which classical scholars termed 'Hikmah'—we discover that universal human aspirations transcend geographical and ideological boundaries.`
  },
  part3: {
    title: 'Part 3: Two-Way Analytical Discussion (4-5 minutes)',
    examinerIntroduction: 'We have been speaking about intercultural understanding. Now I’d like to discuss a few more general questions related to this theme.',
    questions: [
      {
        question: 'To what extent do global media platforms bridge cultural divisions rather than deepen polarization?',
        examinerNotes: 'Assess candidate’s ability to weigh opposing sociological arguments and use nuanced hedging (e.g. "While on the surface...", "It would be an oversimplification to assume...").'
      },
      {
        question: 'Should international institutions place greater emphasis on cultural diplomacy over economic sanctions when resolving global disputes?',
        examinerNotes: 'Assess lexical range relating to international relations, diplomacy, multilateralism, and moral persuasion.'
      }
    ]
  }
};

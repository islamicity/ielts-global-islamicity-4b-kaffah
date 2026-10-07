import { PillarInfo, AuthenticSource, LearningModule } from '../types';

export const PILLARS_DATA: PillarInfo[] = [
  {
    id: 'berdakwah',
    titleEn: "Berdakwah (Engaging in Da'wah)",
    titleId: "Berdakwah (Komunikasi & Diplomasi Dakwah)",
    subtitleEn: "Wisdom, Rhetoric & Cross-Cultural Dialogue",
    subtitleId: "Hikmah, Komunikasi Santun & Dialog Lintas Budaya",
    descriptionEn: "Disseminating noble universal values through intellectual wisdom (Hikmah), reasoned discourse (Jidal bi al-Lati Hiya Ahsan), and global cross-cultural communication in Academic English.",
    descriptionId: "Menyampaikan nilai-nilai luhur Islam secara komprehensif melalui hikmah intelektual, argumentasi santun yang bernas, dan komunikasi lintas budaya internasional.",
    keyThemes: ["Cultural Diplomacy", "Interfaith Dialogue", "Ethical Rhetoric", "Academic Persuasion", "Civilizational Discourse"],
    ieltsCorrelation: "IELTS Speaking Part 3 & Writing Task 2 (Discursive essays, persuasive cohesion, counter-argumentation, formal academic register)",
    iconName: "Compass",
    color: "emerald"
  },
  {
    id: 'bersyariah',
    titleEn: "Bersyariah (Upholding Sharia)",
    titleId: "Bersyariah (Etika & Tata Kelola Syariah)",
    subtitleEn: "Justice, Maqasid al-Shariah & Ethical Governance",
    subtitleId: "Keadilan, Maqasid Asy-Syari'ah & Tata Kelola Etis",
    descriptionEn: "Comprehending the higher objectives of Islamic law (Maqasid: Preservation of Faith, Human Life, Intellect, Lineage, and Wealth) within contemporary legal and socio-political frameworks.",
    descriptionId: "Memahami tujuan hakiki syariat Islam (Maqasid: penjagaan agama, jiwa, akal, keturunan, dan harta) dalam kerangka peradaban modern, keadilan hukum, dan tata kelola etis.",
    keyThemes: ["Maqasid al-Shariah", "Human Dignity & Rights", "Ethical Jurisprudence", "Rule of Law", "Bioethics & Tech Ethics"],
    ieltsCorrelation: "IELTS Reading Academic Texts & Analytical Writing Task 2 (Complex legal/ethical propositions, thesis generation, cohesive devices)",
    iconName: "Scale",
    color: "teal"
  },
  {
    id: 'berjamaah',
    titleEn: "Berjamaah (Practicing Communal Unity)",
    titleId: "Berjamaah (Persatuan & Solidaritas Komunal)",
    subtitleEn: "Community Solidarity, Civic Engagement & Inclusivity",
    subtitleId: "Solidaritas Komunitas, Kohesi Sosial & Kebersamaan Global",
    descriptionEn: "Fostering social cohesion, collaborative civic institutions, grassroots philanthropy, and global solidarity that transcends ethnic and national boundaries.",
    descriptionId: "Mewujudkan kebersamaan, persatuan umat, solidaritas kemanusiaan global, dan kelembagaan musyawarah yang inklusif tanpa membedakan latar belakang ras maupun bangsa.",
    keyThemes: ["Social Cohesion", "Civic Leadership (Shura)", "Grassroots Philanthropy", "Global Ummah Solidarity", "Egalitarianism"],
    ieltsCorrelation: "IELTS General Training Letter Writing & Academic Speaking Part 1 & 2 (Community narrative, collaborative discourse, idiomatic fluency)",
    iconName: "Users",
    color: "indigo"
  },
  {
    id: 'bermuamalah',
    titleEn: "Bermuamalah (Social & Economic Interactions)",
    titleId: "Bermuamalah (Interaksi Ekonomi & Sosial Etis)",
    subtitleEn: "Islamic Economics, Green Sukuk & Halal Commerce",
    subtitleId: "Ekonomi Syariah, Sukuk Hijau & Perdagangan Halal",
    descriptionEn: "Executing ethical socioeconomic transactions, asset-backed equitable finance, fair labor standards, elimination of usury (Riba) and excessive ambiguity (Gharar), and modern ESG impact investing.",
    descriptionId: "Menjalankan interaksi ekonomi yang berkeadilan, transaksi bebas riba dan penipuan, perbankan syariah berkeadilan, serta instrumen sosial seperti zakat, wakaf, dan investasi hijau berkelanjutan.",
    keyThemes: ["Equitable Finance", "Prohibition of Exploitation", "Green Sukuk & ESG", "Waqf & Microfinance", "Contractual Integrity"],
    ieltsCorrelation: "IELTS Academic Writing Task 1 (Data synthesis, trend reporting, economics terminology) & Task 2 (Economic impact evaluations)",
    iconName: "Coins",
    color: "amber"
  }
];

export const AUTHENTIC_SOURCES: AuthenticSource[] = [
  {
    id: 'source-1',
    pillar: 'berdakwah',
    type: 'quran',
    reference: 'Surah An-Nahl (16:125)',
    arabicText: 'ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ ۖ وَجَادِلْهُم بِالَّتِي هِيَ أَحْسَنُ',
    englishTranslation: '“Invite to the way of your Lord with wisdom and good instruction, and argue with them in a way that is best.”',
    indonesianTranslation: '“Serulah (manusia) kepada jalan Tuhanmu dengan hikmah dan pengajaran yang baik, dan berdebatlah dengan mereka dengan cara yang paling baik.”',
    academicContext: 'In contemporary rhetorical linguistics, this verse establishes a tripartite communicative paradigm: philosophical deduction (Hikmah), empathetic narrative pedagogy (Maw’izhah), and dialectical civil argumentation (Jidal Ahsan).',
    ieltsKeywords: [
      { word: 'rhetorical', pos: 'adj', definition: 'relating to the art of effective or persuasive speaking or writing', collocation: 'rhetorical dexterity' },
      { word: 'dialectical', pos: 'adj', definition: 'relating to the logical discussion of ideas and opinions', collocation: 'dialectical discourse' },
      { word: 'empathetic', pos: 'adj', definition: 'showing an ability to understand and share the feelings of another', collocation: 'empathetic pedagogy' }
    ]
  },
  {
    id: 'source-2',
    pillar: 'bersyariah',
    type: 'classical_text',
    reference: 'Al-Shatibi, Al-Muwafaqat fi Usul al-Shariah (Vol. 2)',
    arabicText: 'وَضْعُ الشَّرَائِعِ إِنَّمَا هُوَ لِمَصَالِحِ الْعِبَادِ فِي الْعَاجِلِ وَالآجِلِ مَعًا',
    englishTranslation: '“The establishment of legal codes and divine legislation is exclusively intended to secure human welfare (maslahah) in both this transient life and the hereafter.”',
    indonesianTranslation: '“Penetapan syariat dan hukum sesungguhnya semata-mata demi kemaslahatan dan kesejahteraan para hamba di dunia maupun di akhirat.”',
    academicContext: 'Al-Shatibi pioneered teleological jurisprudence (Maqasid), anticipating modern legal philosophies which emphasize jurisprudence as an instrument of utilitarian equity and social preservation.',
    ieltsKeywords: [
      { word: 'teleological', pos: 'adj', definition: 'explaining phenomena by their purpose or final design', collocation: 'teleological jurisprudence' },
      { word: 'utilitarian', pos: 'adj', definition: 'designed to be useful or practical rather than attractive; promoting overall welfare', collocation: 'utilitarian equity' },
      { word: 'jurisprudence', pos: 'noun', definition: 'the theory or philosophy of law', collocation: 'modern jurisprudence' }
    ]
  },
  {
    id: 'source-3',
    pillar: 'berjamaah',
    type: 'hadith',
    reference: 'Sahih al-Bukhari 6011 & Sahih Muslim 2586',
    arabicText: 'مَثَلُ الْمُؤْمِنِينَ فِي تَوَادِّهِمْ وَتَرَاحُمِهِمْ وَتَعَاطُفِهِمْ مَثَلُ الْجَسَدِ إِذَا اشْتَكَىٰ مِنْهُ عُضْوٌ تَدَاعَىٰ لَهُ سَائِرُ الْجَسَدِ بِالسَّهَرِ وَالْحُمَّى',
    englishTranslation: '“The similitude of believers in their mutual affection, mercy, and compassion is that of a single organic body: when one limb suffers, the entire body responds with sleeplessness and fever.”',
    indonesianTranslation: '“Perumpamaan orang-orang yang beriman dalam hal saling mencintai, menyayangi, dan berlemah lembut adalah seperti satu tubuh; jika satu anggota tubuh mengeluh sakit, seluruh tubuh ikut merasakan demam dan tidak bisa tidur.”',
    academicContext: 'A profound biological metaphor for collective organic solidarity, frequently cited in socio-anthropological studies on community resilience, communal empathy, and civic cohesion.',
    ieltsKeywords: [
      { word: 'organic solidarity', pos: 'noun phrase', definition: 'social unity based on division of labor and mutual interdependence', collocation: 'reinforce organic solidarity' },
      { word: 'resilience', pos: 'noun', definition: 'the capacity to recover quickly from difficulties', collocation: 'communal resilience' },
      { word: 'similitude', pos: 'noun', definition: 'the quality or state of being similar to something', collocation: 'poetic similitude' }
    ]
  },
  {
    id: 'source-4',
    pillar: 'bermuamalah',
    type: 'contemporary_academic',
    reference: 'Dr. M. Nejatullah Siddiqi & World Bank Islamic Finance Report',
    arabicText: 'تَحْرِيمُ الرِّبَا وَتَمْكِينُ الْمُشَارَكَةِ فِي الْمَخَاطِرِ يُحَقِّقُ اسْتِقْرَارَ النِّظَامِ الْمَالِيِّ',
    englishTranslation: '“The structural prohibition of interest-bearing debt coupled with equity risk-sharing mechanisms engenders greater macroeconomic stability and curbs speculative asset bubbles.”',
    indonesianTranslation: '“Pelarangan bunga pinjaman disertai prinsip bagi hasil risiko menghasilkan stabilitas makroekonomi yang lebih kokoh dan mencegah gelembung spekulatif.”',
    academicContext: 'Modern macroeconomics has validated Islamic risk-sharing finance (Mudarabah & Musharakah) as a sustainable hedge against the volatile financialization of debt in international capital markets.',
    ieltsKeywords: [
      { word: 'speculative', pos: 'adj', definition: 'involving high risk with the hope of large gains', collocation: 'speculative bubble' },
      { word: 'macroeconomic', pos: 'adj', definition: 'relating to the large-scale or general economic factors of an economy', collocation: 'macroeconomic volatility' },
      { word: 'equity-based', pos: 'adj', definition: 'based on shared ownership or direct stake rather than debt', collocation: 'equity-based financing' }
    ]
  }
];

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'mod-1',
    pillar: 'berdakwah',
    titleEn: 'Cross-Cultural Rhetoric & Inter-Civilizational Dialogue',
    titleId: 'Retorika Lintas Budaya & Dialog Antar-Peradaban',
    ieltsSkill: 'writing',
    estimatedMinutes: 25,
    level: 'Band 7.5 - 8.5',
    summaryEn: 'Master the architectural nuances of IELTS Academic Task 2 discursive essays on civilizational coexistence, diplomacy, and countering prejudice through structured counter-argumentation.',
    summaryId: 'Kuasai arsitektur esai akademis IELTS Task 2 bertema koeksistensi peradaban, diplomasi budaya, dan argumentasi tandingan ilmiah.',
    passageTextEn: `In an era characterized by accelerated globalization alongside polarizing sociopolitical narratives, the imperative for nuanced cross-cultural dialogue has never been more pressing. Classical Islamic scholars categorized inter-faith discourse not as a zero-sum polemic, but as a reciprocal dialectic rooted in wisdom (Hikmah) and gracious articulation (Maw’izhah Hasanah). When translated into contemporary international discourse, this philosophy mirrors the highest registers of formal argumentation: avoiding ad hominem fallacies, acknowledging legitimate counter-perspectives, and grounding claims in demonstrable empirical and ethical foundations. In IELTS Academic Task 2 writing, examiners seek precisely this sophisticated tenor: candidates must balance opposing paradigms with measured cohesion, robust topic sentences, and precise lexical qualification.`,
    vocabulary: [
      { term: 'zero-sum polemic', phonetic: '/ˈzɪəroʊ sʌm pəˈlɛmɪk/', partOfSpeech: 'noun phrase', definition: 'a contentious debate where one side only wins if the other completely loses', example: 'Constructive dialogue must eschew zero-sum polemics in favor of collaborative synthesis.' },
      { term: 'dialectical reciprocity', phonetic: '/ˌdaɪəˈlɛktɪkəl ˌrɛsɪˈprɒsɪti/', partOfSpeech: 'noun phrase', definition: 'mutual exchange of logical perspectives to discover shared truth', example: 'Cross-cultural harmony depends upon genuine dialectical reciprocity between diverse traditions.' },
      { term: 'eschew', phonetic: '/ɪsˈtʃuː/', partOfSpeech: 'verb', definition: 'deliberately avoid using; abstain from', example: 'Scholars must eschew inflammatory rhetoric during televised international symposiums.' },
      { term: 'ad hominem', phonetic: '/ˌæd ˈhɒmɪnɛm/', partOfSpeech: 'adj/adverb', definition: 'directed against a person rather than the position they are maintaining', example: 'IELTS examiners penalize candidates whose arguments devolve into emotional ad hominem assertions.' }
    ],
    authenticSources: [AUTHENTIC_SOURCES[0]],
    practiceTask: {
      taskType: 'IELTS Academic Writing Task 2 (Discursive Essay)',
      prompt: 'Some people argue that cultural and religious diversity inevitably causes social friction, while others believe that proactive dialogue between traditions fosters innovation and mutual respect. Discuss both views and give your own opinion.',
      modelBand9Sample: `It is frequently asserted that multifaceted cultural and religious demographics inevitably precipitate socio-political friction. Conversely, a counter-narrative posits that proactive intercultural engagement serves as a catalyst for societal enrichment and collective innovation. While divergent normative frameworks can indeed engender localized tension if unmediated, I contend that institutionalized inter-civilizational dialogue substantially mitigates estrangement and cultivates profound social cohesion.

Advocates of the former proposition underscore historical precedent wherein sectarian misunderstandings triggered societal fragmentation. When disparate groups reside within shared geographical boundaries without robust communication channels, minor theological or cultural distinctions can be sensationalized, exacerbating insular tribalism. This apprehension is not wholly unfounded; without empathetic communicative frameworks, superficial cultural dissonances may indeed morph into structural estrangement.

Nevertheless, evidence overwhelmingly corroborates that intercultural and inter-religious dialogue yields undeniable sociopolitical dividends. Historically, pluralistic intellectual hubs such as medieval Baghdad’s House of Wisdom and Andalusia flourished precisely because scholars from diverse backgrounds engaged in rigorous dialectical exchange, synthesizing philosophical and scientific breakthroughs. In modern societies, cross-cultural forums dispel xenophobic misconceptions and engender mutual empathy. When communities interact through reasoned discourse rather than hostile polemic, diversity ceases to be a liability and instead becomes an inexhaustible reservoir of intellectual and social capital.

In conclusion, although unaddressed cultural disparities can foster friction, intentional and empathetic cross-civilizational dialogue transforms potential conflict into harmonious progress. Nations that cultivate open, respectful discourse invariably foster more resilient, innovative, and ethically grounded societies.`,
      scoringRubricTips: [
        'Task Response: Address both perspectives thoroughly before delivering a lucid, substantiated personal thesis in the introduction and conclusion.',
        'Coherence & Cohesion: Employ nuanced cohesive devices (Conversely, Nevertheless, Historically, In conclusion) without mechanical over-repetition.',
        'Lexical Resource: Integrate precise vocabulary (e.g. societal fragmentation, dialectical exchange, pluralistic intellectual hubs, insular tribalism).',
        'Grammatical Range: Demonstrate mastery of complex subordinate clauses, conditional inversions, and passive constructions.'
      ]
    }
  },
  {
    id: 'mod-2',
    pillar: 'bersyariah',
    titleEn: 'Maqasid al-Shariah: Jurisprudential Ethics & Bioethics',
    titleId: 'Maqasid Syariah: Etika Hukum & Bioetika Global',
    ieltsSkill: 'reading',
    estimatedMinutes: 30,
    level: 'Band 8.0 - 9.0',
    summaryEn: 'Deconstruct high-level academic texts concerning teleological jurisprudence, the five universal necessities (Al-Daruriyyat Al-Khamsah), and their intersection with global bioethical dilemmas.',
    summaryId: 'Pahami teks akademis tingkat tinggi tentang maqasid syariah, lima kebutuhan universal, dan kaitannya dengan bioetika modern.',
    passageTextEn: `The conceptual architecture of Islamic jurisprudence is frequently misconstrued as an inflexible anthology of archaic literalisms. In reality, classical legal theoreticians such as Abu Hamid Al-Ghazali and Al-Shatibi pioneered a teleological doctrine known as Maqasid al-Shariah—the overarching moral objectives of Islamic law. Central to this legal philosophy is the safeguarding of five indispensable universal goods (Al-Daruriyyat Al-Khamsah): faith (din), human life (nafs), intellect (aql), lineage (nasl), and property (mal).

In contemporary academic discourse, bioethicists and international jurists increasingly examine the Maqasid framework to resolve cutting-edge ethical quandaries. When evaluating genomic editing, organ transplantation, or algorithmic autonomy, Western utilitarian and deontological frameworks often grapple with irreconcilable tensions between individual liberty and collective harm. The Maqasid doctrine supplies an integrated middle path: technology is neither categorically canonized nor preemptively condemned; rather, its validity hinges on whether it protects human dignity and preserves universal welfare (Maslahah Mursalah) while minimizing harm (Daf' al-Mafasid).`,
    vocabulary: [
      { term: 'teleological doctrine', phonetic: '/ˌtiːliəˈlɒdʒɪkəl ˈdɒktrɪn/', partOfSpeech: 'noun phrase', definition: 'a principle oriented around the ultimate end, goal, or purpose of actions', example: 'Maqasid represents a teleological doctrine that evaluates legal edicts by their societal outcomes.' },
      { term: 'deontological', phonetic: '/diːˌɒntəˈlɒdʒɪkəl/', partOfSpeech: 'adj', definition: 'relating to moral duty and rules rather than consequences', example: 'Kantian ethics exemplifies a deontological system in contrast to utilitarian models.' },
      { term: 'quandary', phonetic: '/ˈkwɒndəri/', partOfSpeech: 'noun', definition: 'a state of perplexity or uncertainty over what to do in a difficult situation', example: 'Gene therapies pose a profound ethical quandary regarding genetic equity.' },
      { term: 'indispensable', phonetic: '/ˌɪndɪˈspɛnsəbəl/', partOfSpeech: 'adj', definition: 'absolutely necessary, essential, or requisite', example: 'Protection of individual intellect is deemed an indispensable pillar of social development.' }
    ],
    authenticSources: [AUTHENTIC_SOURCES[1]],
    practiceTask: {
      taskType: 'IELTS Academic Reading Comprehension',
      prompt: 'Analyze text arguments and evaluate True/False/Not Given assertions regarding legal teleology and modern bioethics.',
      modelBand9Sample: 'Sample Band 9 Reading Analysis: Demonstrates pinpointing textual evidence, contextual paraphrasing, and identifying implied authorial stance across complex epistemological vocabulary.',
      scoringRubricTips: [
        'Pay close attention to restrictive adverbs such as "exclusively", "frequently", "neither... nor".',
        'Distinguish clearly between False (the text explicitly contradicts the statement) and Not Given (the text neither confirms nor denies it).'
      ]
    }
  },
  {
    id: 'mod-3',
    pillar: 'berjamaah',
    titleEn: 'Social Capital, Collective Leadership & Global Community',
    titleId: 'Modal Sosial, Musyawarah & Komunitas Global',
    ieltsSkill: 'speaking',
    estimatedMinutes: 20,
    level: 'Band 7.0 - 8.5',
    summaryEn: 'Cultivate spontaneous academic fluency, idiomatic accuracy, and structured discourse for IELTS Speaking Parts 1, 2, and 3 focusing on community solidarity and civic leadership.',
    summaryId: 'Tingkatkan kefasihan berbicara spontan berbobot akademis pada IELTS Speaking Bagian 1, 2, dan 3 dengan topik persatuan dan kepemimpinan komunitas.',
    passageTextEn: `The concept of Berjamaah—communal unity and institutional solidarity—extends far beyond mere ceremonial assembly. In sociological terms, it constitutes a resilient nexus of social capital, mutual assistance, and egalitarian governance through Shura (collaborative consultation). Sociologists observe that communities with high religious and civic volunteerism display significantly lower indices of social alienation and higher crisis recovery rates. For IELTS Speaking candidates, articulating these social dynamics with natural coherence, varied discourse markers, and sophisticated vocabulary demonstrates Band 8+ communicative competence.`,
    vocabulary: [
      { term: 'egalitarian governance', phonetic: '/ɪˌɡælɪˈteəriən ˈɡʌvərnəns/', partOfSpeech: 'noun phrase', definition: 'a leadership model emphasizing equality of all participants', example: 'The consultative Shura process reflects an early historical prototype of egalitarian governance.' },
      { term: 'civic volunteerism', phonetic: '/ˈsɪvɪk ˌvɒlənˈtɪərɪzəm/', partOfSpeech: 'noun phrase', definition: 'active contribution to social welfare and community initiatives without monetary coercion', example: 'Grassroots civic volunteerism mitigated the adverse economic shocks experienced during the downturn.' },
      { term: 'alienation', phonetic: '/ˌeɪliəˈneɪʃən/', partOfSpeech: 'noun', definition: 'the state or experience of being isolated from a group or an activity to which one should belong', example: 'Urbanization without communal spaces frequently exacerbates psychological alienation.' }
    ],
    authenticSources: [AUTHENTIC_SOURCES[2]],
    practiceTask: {
      taskType: 'IELTS Speaking Part 2 (Cue Card) & Part 3 (Discussion)',
      prompt: 'Describe a community initiative or group activity you participated in that made a positive social impact. You should say: what the initiative was, who was involved, what you achieved, and explain why it was meaningful to you.',
      modelBand9Sample: `I would like to speak about an inter-neighborhood social solidarity initiative called the "Baitul Maal Community Seed Bank", which I co-organized alongside local university volunteers and community elders during the recent inflation surge. 

The primary objective was to operationalize the Islamic principle of communal mutual aid—or Berjamaah—by establishing a revolving, interest-free food security and micro-grant fund. Rather than relying on top-down municipal interventions, our committee convened weekly deliberative meetings, akin to the classical consultative Shura method, ensuring that elderly residents and daily wage earners had an equal voice in resource distribution.

Over the course of six months, we mobilized approximately forty volunteer families, successfully distributing nutritional food hampers to over three hundred vulnerable households and financing twelve micro-entrepreneurial ventures, such as home bakeries and urban hydroponic gardens. What made this endeavor profoundly meaningful was not merely the quantitative metrics of aid disbursed, but the revitalization of our neighborhood's social fabric. In an age where hyper-individualism often fosters urban alienation, experiencing collective solidarity firsthand reaffirmed my conviction that community cohesion is the bedrock of societal resilience.`,
      scoringRubricTips: [
        'Fluency and Coherence: Deliver a structured two-minute response without unnatural pauses, linking thoughts with sophisticated sequencing phrases.',
        'Lexical Resource: Use topic-specific vocabulary naturally (e.g. revolving fund, deliberative meetings, social fabric, hyper-individualism).',
        'Grammatical Range: Use varied sentence structures, including cleft sentences ("What made this endeavor meaningful was...") and complex participial clauses.'
      ]
    }
  },
  {
    id: 'mod-4',
    pillar: 'bermuamalah',
    titleEn: 'Equitable Economics: Green Sukuk & ESG Financial Synthesis',
    titleId: 'Ekonomi Berkeadilan: Sukuk Hijau & Sintesis ESG',
    ieltsSkill: 'listening',
    estimatedMinutes: 25,
    level: 'Band 7.5 - 9.0',
    summaryEn: 'Simulate high-stakes IELTS Listening and Academic Task 1 data analysis on Islamic sustainable finance, green bonds, asset-backed equity, and global trade corridors.',
    summaryId: 'Simulasi mendengarkan IELTS audio akademis dan analisis visual Task 1 tentang keuangan hijau syariah, sukuk, dan perdagangan etis.',
    passageTextEn: `Global financial markets are undergoing a seismic transition toward sustainable finance, marked by the convergence of Environmental, Social, and Governance (ESG) criteria with classical Islamic economic jurisprudence (Bermuamalah). Traditional debt markets are susceptible to systemic volatility caused by excessive leverage and speculative derivatives. In contrast, Islamic finance mandates asset-backing, risk-sharing, and the strict prohibition of exploitative interest (Riba). This synergy has propelled the unprecedented rise of Green Sukuk—sharia-compliant bonds whose proceeds are earmarked specifically for renewable energy, water conservation, and low-carbon infrastructure. For academic candidates, deciphering statistical trends and analytical presentations on this topic is pivotal for both Listening Part 4 lectures and Academic Writing Task 1 visual reports.`,
    vocabulary: [
      { term: 'asset-backed security', phonetic: '/ˈæsɛt bækt sɪˈkjʊərɪti/', partOfSpeech: 'noun phrase', definition: 'a financial instrument supported by tangible underlying assets rather than pure debt', example: 'Islamic Green Sukuk operate as asset-backed securities that directly finance solar farms.' },
      { term: 'leverage', phonetic: '/ˈliːvərɪdʒ/', partOfSpeech: 'noun', definition: 'the use of borrowed capital or debt to amplify investment returns', example: 'Excessive leverage in derivative markets precipitated the 2008 global banking collapse.' },
      { term: 'unprecedented trajectory', phonetic: '/ʌnˈprɛsɪdɛntɪd trəˈdʒɛktəri/', partOfSpeech: 'noun phrase', definition: 'a path of rapid growth or development never previously witnessed', example: 'The issuance of ethical bonds has maintained an unprecedented trajectory across Southeast Asia and the Middle East.' }
    ],
    authenticSources: [AUTHENTIC_SOURCES[3]],
    practiceTask: {
      taskType: 'IELTS Academic Writing Task 1 (Data Synthesis) & Listening Part 4',
      prompt: 'The chart illustrates the global issuance volume of Green Sukuk and Conventional ESG bonds across key regions between 2020 and 2026. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
      modelBand9Sample: `The infographic illustrates trends in the global issuance volume of Green Sukuk alongside conventional ESG bonds across Southeast Asia, the GCC, and European markets over a six-year timeframe from 2020 to 2026.

Overall, it is immediately apparent that total issuance across all three markets followed an upward trajectory, with Green Sukuk exhibiting the most exponential rate of acceleration. Furthermore, while conventional ESG bonds constituted the predominant share of funding in early periods, Green Sukuk steadily narrowed the margin, establishing a formidable presence in renewable infrastructure financing.

In 2020, Green Sukuk issuance stood modestly at approximately $4.2 billion, compared to $28.5 billion for conventional green bonds. Over the subsequent four years, however, Islamic ethical bonds experienced a fourfold surge, surpassing $18.9 billion by 2024. This growth was spearheaded primarily by clean energy and desalination initiatives across Malaysia and Saudi Arabia.

By 2026, the volume of Green Sukuk had reached a peak of nearly $32.4 billion, reflecting an aggregate increase of over 670% from the baseline year. Although conventional ESG instruments still retained a higher gross total at $46.1 billion, the compound annual growth rate of asset-backed Green Sukuk markedly outperformed traditional debt vehicles throughout the examined period.`,
      scoringRubricTips: [
        'Task Achievement: Provide an insightful overview statement in paragraph two identifying primary overarching trends before detailing specific data points.',
        'Data Accuracy: Group data logically by geography or asset class; do not speculate on unproven outside causes.',
        'Lexical Resource: Use varied mathematical and trend descriptors (fourfold surge, upward trajectory, exponential acceleration, baseline year).'
      ]
    }
  }
];

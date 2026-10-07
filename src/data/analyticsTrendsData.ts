export interface PracticeTrendPoint {
  day: string;
  date: string;
  berdakwahHours: number;
  bersyariahHours: number;
  berjamaahHours: number;
  bermuamalahHours: number;
  totalHours: number;
  bandScore: number;
  primaryPillarFocus: string;
  milestone?: string;
}

export const FOURTEEN_DAYS_TREND: PracticeTrendPoint[] = [
  {
    day: 'Day 1',
    date: 'Sep 24',
    berdakwahHours: 0.8,
    bersyariahHours: 0.6,
    berjamaahHours: 0.5,
    bermuamalahHours: 0.5,
    totalHours: 2.4,
    bandScore: 6.5,
    primaryPillarFocus: 'Berdakwah (Diagnostic Rhetoric)',
    milestone: 'Initial Baseline Diagnostic'
  },
  {
    day: 'Day 2',
    date: 'Sep 25',
    berdakwahHours: 0.9,
    bersyariahHours: 0.8,
    berjamaahHours: 0.4,
    bermuamalahHours: 0.7,
    totalHours: 2.8,
    bandScore: 6.6,
    primaryPillarFocus: 'Bersyariah (Waqf Reading Intro)'
  },
  {
    day: 'Day 3',
    date: 'Sep 26',
    berdakwahHours: 1.0,
    bersyariahHours: 0.7,
    berjamaahHours: 0.8,
    bermuamalahHours: 0.6,
    totalHours: 3.1,
    bandScore: 6.7,
    primaryPillarFocus: 'Berjamaah (Speaking Part 2 Prep)'
  },
  {
    day: 'Day 4',
    date: 'Sep 27',
    berdakwahHours: 0.7,
    bersyariahHours: 0.9,
    berjamaahHours: 0.6,
    bermuamalahHours: 1.2,
    totalHours: 3.4,
    bandScore: 6.8,
    primaryPillarFocus: 'Bermuamalah (Sukuk Data Interpretation)'
  },
  {
    day: 'Day 5',
    date: 'Sep 28',
    berdakwahHours: 1.1,
    bersyariahHours: 0.8,
    berjamaahHours: 0.5,
    bermuamalahHours: 0.8,
    totalHours: 3.2,
    bandScore: 7.0,
    primaryPillarFocus: 'Berdakwah (Task 2 Discursive Thesis)',
    milestone: 'Band 7.0 Threshold Reached'
  },
  {
    day: 'Day 6',
    date: 'Sep 29',
    berdakwahHours: 0.6,
    bersyariahHours: 1.2,
    berjamaahHours: 0.7,
    bermuamalahHours: 0.9,
    totalHours: 3.4,
    bandScore: 7.0,
    primaryPillarFocus: 'Bersyariah (Bioethics Teleology)'
  },
  {
    day: 'Day 7',
    date: 'Sep 30',
    berdakwahHours: 1.0,
    bersyariahHours: 0.9,
    berjamaahHours: 0.9,
    bermuamalahHours: 0.8,
    totalHours: 3.6,
    bandScore: 7.1,
    primaryPillarFocus: 'Weekly Milestone Synthesis'
  },
  {
    day: 'Day 8',
    date: 'Oct 01',
    berdakwahHours: 0.9,
    bersyariahHours: 1.1,
    berjamaahHours: 0.6,
    bermuamalahHours: 1.1,
    totalHours: 3.7,
    bandScore: 7.2,
    primaryPillarFocus: 'Bermuamalah (Listening Part 4 INCEIF)'
  },
  {
    day: 'Day 9',
    date: 'Oct 02',
    berdakwahHours: 1.2,
    bersyariahHours: 0.8,
    berjamaahHours: 0.7,
    bermuamalahHours: 0.8,
    totalHours: 3.5,
    bandScore: 7.3,
    primaryPillarFocus: 'Berdakwah (Speaking Part 3 Intercultural)'
  },
  {
    day: 'Day 10',
    date: 'Oct 03',
    berdakwahHours: 0.8,
    bersyariahHours: 1.3,
    berjamaahHours: 0.6,
    bermuamalahHours: 1.0,
    totalHours: 3.7,
    bandScore: 7.4,
    primaryPillarFocus: 'Bersyariah (Jurisprudence Reading Test)'
  },
  {
    day: 'Day 11',
    date: 'Oct 04',
    berdakwahHours: 1.1,
    bersyariahHours: 0.9,
    berjamaahHours: 1.1,
    bermuamalahHours: 0.9,
    totalHours: 4.0,
    bandScore: 7.5,
    primaryPillarFocus: 'Berjamaah (Solidarity & Shura Essay)',
    milestone: 'Band 7.5 Mastery Milestone'
  },
  {
    day: 'Day 12',
    date: 'Oct 05',
    berdakwahHours: 1.0,
    bersyariahHours: 1.0,
    berjamaahHours: 0.7,
    bermuamalahHours: 1.3,
    totalHours: 4.0,
    bandScore: 7.6,
    primaryPillarFocus: 'Bermuamalah (Task 1 Report Optimization)'
  },
  {
    day: 'Day 13',
    date: 'Oct 06',
    berdakwahHours: 1.3,
    bersyariahHours: 1.1,
    berjamaahHours: 0.8,
    bermuamalahHours: 1.0,
    totalHours: 4.2,
    bandScore: 7.7,
    primaryPillarFocus: 'Berdakwah (E2EE Peer Review Lab)'
  },
  {
    day: 'Day 14',
    date: 'Oct 07',
    berdakwahHours: 1.2,
    bersyariahHours: 1.2,
    berjamaahHours: 0.9,
    bermuamalahHours: 1.1,
    totalHours: 4.4,
    bandScore: 7.8,
    primaryPillarFocus: 'Full Mock Test & SRS Vocabulary Consolidation',
    milestone: 'Current Status: Projecting to Band 8.5'
  }
];

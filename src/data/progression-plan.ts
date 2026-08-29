export interface ProgressionPhase {
  phase: string;
  weeks: string;
  focus: string;
  guidelines: string[];
  progressionTriggers: string[];
  criteriaToProgress: string[];
}

export const PROGRESSION_PLAN: ProgressionPhase[] = [
  {
    phase: 'Foundation',
    weeks: 'Weeks 1–2',
    focus: 'Consistency, clean movement, breathing, and technique',
    guidelines: [
      'Nail consistency before chasing depth.',
      'Run prescribed doses exactly as written.',
      'Maintain 4–6/10 effort range and nasal breathing.',
      'Never force joint end-ranges or brace against pain.',
    ],
    progressionTriggers: [],
    criteriaToProgress: [
      'Completing 7+ consecutive days of prescribed sessions.',
      'Zero compensatory movements (no heel lifts, spinal rounding, or shoulder shrugging).',
      'Breathing stays calm and nasal throughout holds.',
    ],
  },
  {
    phase: 'Progression',
    weeks: 'Weeks 3–4',
    focus: 'Expanding hold ceilings, active control, and light load integration',
    guidelines: [
      'Passive holds: add 5–10 sec per stretch, up to ~45–60 sec ceiling.',
      'Active mobility: add 2 reps or slow tempo (3-1-3 count) for control under load.',
      'Add light external load where appropriate (light band on 90/90, light plate in deep squat).',
      'Shift static work toward end-range isometrics (pause-and-hold at end of ASLR).',
    ],
    progressionTriggers: [
      'Full prescribed rep/time hit with zero compensation.',
      'Passive hold stops producing stretch sensation well before time is up.',
      'Zero residual joint or muscle soreness post-session.',
    ],
    criteriaToProgress: [
      'Able to hold end-range positions with active isometric contraction for 5+ seconds.',
      'Noticeable improvement in knee-to-wall or deep squat depth.',
    ],
  },
  {
    phase: 'Integration',
    weeks: 'Weeks 5–6',
    focus: 'Transfer into explosive court movement quality and symmetry',
    guidelines: [
      'Verify new joint range transfers into jumping, landing, and arm-swing mechanics.',
      'Perform self-assessment battery every 1–2 weeks to verify symmetry.',
      'If a region plateaus across 2 consecutive tests, drop dose to maintenance (half volume, same frequency) and redirect focus.',
    ],
    progressionTriggers: [
      'Self-assessment tests show symmetrical left/right range.',
      'Landing depth feels effortless with stable knees.',
    ],
    criteriaToProgress: [
      'Sustained movement quality during high-volume practice matches.',
    ],
  },
];

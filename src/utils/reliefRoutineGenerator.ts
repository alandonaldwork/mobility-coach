import { DailySession, Exercise, SessionExercise } from '../types';
import { UNIFIED_LIBRARY } from '../data/exercise-catalog';
import { Hotspot } from '../data/body-hotspots';
import { formatSecondsToMMSS } from './formatUtils';

export type ReliefIntent = 'balanced' | 'gentle' | 'active';

export interface GenerateReliefParams {
  hotspot: Hotspot;
  durationMinutes: 3 | 5 | 10;
  intent: ReliefIntent;
}

export function generateReliefRoutine({
  hotspot,
  durationMinutes,
  intent,
}: GenerateReliefParams): DailySession {
  // 1. Gather candidate exercises for this region
  let candidates: Exercise[] = UNIFIED_LIBRARY.filter(
    (ex) => ex.region === hotspot.region
  );

  // If there are few exercises, include full-body options
  if (candidates.length < 3) {
    const fullBody = UNIFIED_LIBRARY.filter((ex) => ex.region === 'full-body');
    candidates = [...candidates, ...fullBody];
  }

  // 2. Score & sort candidates based on intent
  const scored = candidates.map((ex) => {
    let score = 0;
    const isStatic = ex.type === 'Static' || ex.type === 'Passive' || ex.type === 'Breathing';
    const isActive = ex.type === 'Active' || ex.type === 'Dynamic' || ex.type === 'Activation' || ex.type === 'PNF';

    if (intent === 'gentle') {
      if (isStatic) score += 5;
      if (isActive) score += 1;
    } else if (intent === 'active') {
      if (isActive) score += 5;
      if (isStatic) score += 1;
    } else {
      // Balanced
      score += 3;
    }

    // Keyword relevance to hotspot title or subtitle
    const lowerName = ex.name.toLowerCase();
    const lowerTarget = (ex.target || '').toLowerCase();
    const keywords = hotspot.label.toLowerCase().split(/[ &,/]+/);
    for (const kw of keywords) {
      if (kw.length > 2 && (lowerName.includes(kw) || lowerTarget.includes(kw))) {
        score += 4;
      }
    }

    return { exercise: ex, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const selectedExercises = scored.map((s) => s.exercise);

  // 3. Determine number of exercises and duration allocation
  let exerciseCount = 3;
  if (durationMinutes === 3) exerciseCount = 2;
  if (durationMinutes === 10) exerciseCount = Math.min(5, selectedExercises.length);

  const picked = selectedExercises.slice(0, exerciseCount);

  // Calculate target seconds per exercise
  const totalTargetSeconds = durationMinutes * 60;
  const baseDuration = Math.floor(totalTargetSeconds / picked.length);

  let currentElapsed = 0;
  const sessionExercises: SessionExercise[] = picked.map((ex, index) => {
    // For last exercise, adjust to match exact target duration
    const isLast = index === picked.length - 1;
    const duration = isLast ? totalTargetSeconds - currentElapsed : baseDuration;
    const startTimeStr = formatSecondsToMMSS(currentElapsed);

    currentElapsed += duration;

    return {
      exerciseId: ex.id,
      startTime: startTimeStr,
      durationSeconds: duration,
      dose: ex.defaultDose || `${duration} sec hold`,
      type: ex.type,
      notes: `${hotspot.label} targeted relief`,
    };
  });

  return {
    dayId: 1,
    name: `${hotspot.label} • ${durationMinutes}M Relief`,
    focus: hotspot.subtitle,
    emphasis: `${intent.charAt(0).toUpperCase() + intent.slice(1)} Targeted Relief`,
    plannedDurationMinutes: durationMinutes,
    deskResetMinutes: 0,
    mainSessionMinutes: durationMinutes,
    exercises: sessionExercises,
  };
}

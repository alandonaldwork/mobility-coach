import { DailySession, SessionExercise, TrainingContext } from '../types';
import { getExerciseById } from '../data/exercise-catalog';
import { TRAINING_CONTEXT_RULES } from '../data/training-context-modifications';

export interface ExerciseStatus {
  isModified: boolean;
  tag?: string;
  originalDose?: string;
  reason?: string;
}

export interface ModifiedSessionResult {
  modifiedSession: DailySession;
  modificationNote: string;
  removedCount: number;
  originalDurationMinutes: number;
  modifiedDurationMinutes: number;
  exerciseStatusMap: Record<number, ExerciseStatus>;
}

export function modifySessionForContext(
  session: DailySession,
  context: TrainingContext
): ModifiedSessionResult {
  const rule = TRAINING_CONTEXT_RULES[context] || TRAINING_CONTEXT_RULES.normal;
  const originalExercises = session.exercises;

  const originalSecs = originalExercises.reduce((acc, ex) => acc + (ex.durationSeconds || 30), 0);
  const originalDurationMinutes = Math.max(session.plannedDurationMinutes, Math.round(originalSecs / 60));

  if (context === 'normal') {
    return {
      modifiedSession: session,
      modificationNote: rule.description,
      removedCount: 0,
      originalDurationMinutes,
      modifiedDurationMinutes: originalDurationMinutes,
      exerciseStatusMap: {},
    };
  }

  const modifiedExercises: SessionExercise[] = [];
  let removedCount = 0;
  const exerciseStatusMap: Record<number, ExerciseStatus> = {};

  for (const se of originalExercises) {
    const fullEx = getExerciseById(se.exerciseId);
    if (!fullEx) {
      modifiedExercises.push(se);
      continue;
    }

    const exName = fullEx.name.toLowerCase();
    const exType = fullEx.type;
    const region = fullEx.region;

    let shouldExclude = false;
    let excludeReason = '';
    let durationAdjustment = 0;
    let customTag: string | undefined = undefined;
    let customDose: string | undefined = undefined;

    // Restricted general exercise types for pre-activity contexts
    if (rule.restrictedTypes && rule.restrictedTypes.includes(exType)) {
      shouldExclude = true;
      excludeReason = `Restricted type '${exType}' for ${rule.label}`;
    }

    // Specific domain rules per context
    if (!shouldExclude) {
      if (context === 'jump_plyos') {
        if (exName.includes('calf') || exName.includes('soleus') || exName.includes('gastrocnemius')) {
          if (exType === 'Passive' || exType === 'Static') {
            shouldExclude = true;
            excludeReason = 'Static calf stretch excluded to preserve tendon stiffness for jumping';
          }
        }
      } else if (context === 'heavy_lower_strength') {
        if ((region === 'hip' || exName.includes('couch') || exName.includes('hamstring')) && (exType === 'Passive' || exType === 'Static')) {
          shouldExclude = true;
          excludeReason = 'Passive hip/hamstring stretch excluded pre-heavy lower strength session';
        }
      } else if (context === 'heavy_upper_strength') {
        if ((region === 'shoulder' || region === 'neck' || exName.includes('doorway') || exName.includes('sleeper')) && (exType === 'Passive' || exType === 'Static')) {
          shouldExclude = true;
          excludeReason = 'Passive shoulder/chest hold excluded pre-heavy upper strength session';
        }
      } else if (context === 'match_day') {
        if (se.durationSeconds > 30) {
          durationAdjustment = 30;
          customTag = 'Match Day Activation (30s max)';
          customDose = `${se.dose} (Fast Activation)`;
        }
      } else if (context === 'sport_training') {
        if (se.durationSeconds > 40) {
          durationAdjustment = 40;
          customTag = 'Pre-Court Trimmed';
        }
      } else if (context === 'recovery_rest') {
        if (exType === 'Passive' || exType === 'Static' || exType === 'SMR' || exType === 'Breathing') {
          durationAdjustment = (se.durationSeconds || 30) + 15;
          customTag = 'Extended Recovery Hold (+15s)';
          customDose = `${se.dose} (Deep Nasal Breathing)`;
        }
      }
    }

    if (shouldExclude) {
      removedCount++;
      exerciseStatusMap[se.exerciseId] = {
        isModified: true,
        tag: 'Excluded',
        reason: excludeReason,
      };
    } else {
      const finalDuration = durationAdjustment > 0 ? durationAdjustment : se.durationSeconds;
      const isModified = finalDuration !== se.durationSeconds || !!customTag || !!customDose;

      if (isModified) {
        exerciseStatusMap[se.exerciseId] = {
          isModified: true,
          tag: customTag,
          originalDose: se.dose,
          reason: customTag || 'Adjusted duration for training context',
        };
      }

      modifiedExercises.push({
        ...se,
        durationSeconds: finalDuration,
        dose: customDose || se.dose,
      });
    }
  }

  let modifiedSecs = modifiedExercises.reduce((acc, ex) => acc + (ex.durationSeconds || 30), 0);
  let modifiedDurationMinutes = Math.max(5, Math.round(modifiedSecs / 60));

  if (rule.trimmedDurationMinutes && modifiedDurationMinutes > rule.trimmedDurationMinutes) {
    modifiedDurationMinutes = rule.trimmedDurationMinutes;
  }

  const modifiedSession: DailySession = {
    ...session,
    plannedDurationMinutes: modifiedDurationMinutes,
    mainSessionMinutes: Math.max(0, modifiedDurationMinutes - session.deskResetMinutes),
    exercises: modifiedExercises,
  };

  let modificationNote = rule.description;
  if (removedCount > 0) {
    modificationNote += ` (${removedCount} passive/static stretch${removedCount > 1 ? 'es' : ''} filtered out for pre-activity readiness).`;
  } else if (context === 'recovery_rest') {
    modificationNote += ' (Passive holds extended by +15s for deep recovery).';
  } else if (context === 'match_day') {
    modificationNote += ' (Express active activation protocol applied).';
  }

  return {
    modifiedSession,
    modificationNote,
    removedCount,
    originalDurationMinutes,
    modifiedDurationMinutes,
    exerciseStatusMap,
  };
}

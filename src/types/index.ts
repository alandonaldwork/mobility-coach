export type BodyRegion = 'ankle' | 'hip' | 'thoracic' | 'shoulder' | 'neck' | 'wrist' | 'full-body';

export type ExerciseType = 
  | 'Active' 
  | 'Dynamic' 
  | 'Activation' 
  | 'Passive' 
  | 'Active/Passive' 
  | 'SMR' 
  | 'Breathing';

export interface Exercise {
  id: number;
  name: string;
  region: BodyRegion;
  target: string;
  whyItMatters: string;
  type: ExerciseType;
  defaultDose: string;
  durationSeconds?: number;
  reps?: number;
  isBilateral?: boolean;
  intensity: string;
  breathingCues: string;
  cues: string[];
  commonMistakes: string[];
  bestTime: string[];
  equipment: string[];
  safetyNotes?: string;
  passiveRestriction?: string;
}

export interface SessionExercise {
  exerciseId: number;
  startTime: string; // e.g. "00:00"
  durationSeconds: number;
  dose: string;
  type: ExerciseType;
  notes?: string;
}

export interface DailySession {
  dayId: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  name: string;
  focus: string;
  emphasis: string;
  plannedDurationMinutes: number;
  deskResetMinutes: number;
  mainSessionMinutes: number;
  exercises: SessionExercise[];
}

export type TrainingContext = 
  | 'volleyball_training'
  | 'match_day'
  | 'heavy_lower_strength'
  | 'heavy_upper_strength'
  | 'jump_plyos'
  | 'recovery_rest'
  | 'normal';

export interface ContextModificationRule {
  id: TrainingContext;
  label: string;
  description: string;
  beforeGuidance: string;
  afterGuidance: string;
  restrictedTypes: ExerciseType[];
  trimmedDurationMinutes?: number;
}

export interface AssessmentDefinition {
  id: string;
  name: string;
  targetRegion: BodyRegion;
  description: string;
  instructions: string[];
  metricType: 'distance' | 'qualitative' | 'degrees' | 'symmetry';
}

export interface AssessmentRecord {
  id: string;
  assessmentId: string;
  date: string; // ISO YYYY-MM-DD
  leftValue?: string;
  rightValue?: string;
  notes?: string;
}

export interface UserProgressState {
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string | null;
  dailyMinutes: Record<string, number>; // "YYYY-MM-DD" -> minutes
  completedSessions: Array<{
    id: string;
    date: string;
    dayId: number;
    completedDurationMinutes: number;
    exercisesCompletedCount: number;
    totalExercisesCount: number;
    trainingContext: TrainingContext;
    isBonus?: boolean;
  }>;
  assessmentRecords: AssessmentRecord[];
  trainingContext: TrainingContext;
}

export interface EquipmentPreferences {
  hasBand: boolean;
  hasRoller: boolean;
  hasWall: boolean;
  hasMat: boolean;
}

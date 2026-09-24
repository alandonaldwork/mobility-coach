import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgressState, TrainingContext, AssessmentRecord, EquipmentPreferences, ProgramGoal, CustomRoutine } from '../types';
import { monthGoalKey } from '../data/schedules';

export interface AudioPreferences {
  audioEnabled: boolean;
  voiceEnabled: boolean;
  speechRate: number;
  speechVolume: number;
  selectedVoiceName: string | null;
}

interface UserStoreActions {
  setTrainingContext: (context: TrainingContext) => void;
  setMonthlyGoal: (year: number, monthIndex: number, goal: ProgramGoal) => void;
  getGoalForMonth: (year: number, monthIndex: number) => ProgramGoal;
  recordCompletedSession: (session: {
    dayId: number;
    completedDurationMinutes: number;
    exercisesCompletedCount: number;
    totalExercisesCount: number;
    trainingContext: TrainingContext;
    isBonus?: boolean;
  }) => void;
  addBonusMinutes: (minutes: number) => void;
  addAssessmentRecord: (record: Omit<AssessmentRecord, 'id'>) => void;
  updateEquipmentPreferences: (prefs: Partial<EquipmentPreferences>) => void;
  updateAudioPreferences: (prefs: Partial<AudioPreferences>) => void;
  toggleFavorite: (exerciseId: number) => void;
  saveCustomRoutine: (routine: Omit<CustomRoutine, 'id' | 'createdAt'>) => string;
  deleteCustomRoutine: (id: string) => void;
  resetAllProgress: () => void;
}

export interface UserStore extends UserProgressState {
  equipmentPreferences: EquipmentPreferences;
  audioPreferences: AudioPreferences;
  monthlyGoals: Record<string, ProgramGoal>;
  favoriteExerciseIds: number[];
  customRoutines: CustomRoutine[];
  actions: UserStoreActions;
}

const getTodayISO = (): string => {
  const d = new Date();
  return d.toISOString().split('T')[0];
};

const defaultAudioPreferences: AudioPreferences = {
  audioEnabled: true,
  voiceEnabled: true,
  speechRate: 1,
  speechVolume: 1,
  selectedVoiceName: null,
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      currentStreak: 0,
      longestStreak: 0,
      lastCompletedDate: null,
      dailyMinutes: {},
      completedSessions: [],
      assessmentRecords: [],
      trainingContext: 'normal',
      monthlyGoals: {},
      equipmentPreferences: {
        hasBand: true,
        hasRoller: true,
        hasWall: true,
        hasMat: true,
      },
      audioPreferences: defaultAudioPreferences,
      favoriteExerciseIds: [],
      customRoutines: [],
      actions: {
        setTrainingContext: (context) => set({ trainingContext: context }),

        setMonthlyGoal: (year, monthIndex, goal) => {
          const key = monthGoalKey(year, monthIndex);
          set((state) => ({
            monthlyGoals: {
              ...state.monthlyGoals,
              [key]: goal,
            },
          }));
        },

        getGoalForMonth: (year, monthIndex) => {
          const key = monthGoalKey(year, monthIndex);
          return get().monthlyGoals[key] ?? 'combined';
        },

        recordCompletedSession: (session) => {
          const today = getTodayISO();
          const state = get();

          const prevDailyMins = state.dailyMinutes[today] || 0;
          const newDailyMins = prevDailyMins + session.completedDurationMinutes;

          const updatedDailyMinutes = {
            ...state.dailyMinutes,
            [today]: newDailyMins,
          };

          const newCompletedSession = {
            id: `session_${Date.now()}`,
            date: today,
            ...session,
          };

          // Re-evaluate streak
          let newCurrentStreak = state.currentStreak;
          const wasGoalReachedBefore = prevDailyMins >= 30;
          const isGoalReachedNow = newDailyMins >= 30;

          if (!wasGoalReachedBefore && isGoalReachedNow) {
            // Check if yesterday was qualified or if streak starts today
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayISO = yesterday.toISOString().split('T')[0];

            if (state.lastCompletedDate === yesterdayISO || state.currentStreak === 0) {
              newCurrentStreak = state.currentStreak + 1;
            } else if (state.lastCompletedDate === today) {
              // Already qualified today earlier
              newCurrentStreak = state.currentStreak;
            } else {
              // Missed days, reset streak to 1 for today
              newCurrentStreak = 1;
            }
          }

          const newLongestStreak = Math.max(state.longestStreak, newCurrentStreak);

          set({
            dailyMinutes: updatedDailyMinutes,
            completedSessions: [newCompletedSession, ...state.completedSessions],
            currentStreak: newCurrentStreak,
            longestStreak: newLongestStreak,
            lastCompletedDate: isGoalReachedNow ? today : state.lastCompletedDate,
          });
        },

        addBonusMinutes: (minutes) => {
          const today = getTodayISO();
          const state = get();

          const prevDailyMins = state.dailyMinutes[today] || 0;
          const newDailyMins = prevDailyMins + minutes;

          const updatedDailyMinutes = {
            ...state.dailyMinutes,
            [today]: newDailyMins,
          };

          let newCurrentStreak = state.currentStreak;
          const wasGoalReachedBefore = prevDailyMins >= 30;
          const isGoalReachedNow = newDailyMins >= 30;

          if (!wasGoalReachedBefore && isGoalReachedNow) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayISO = yesterday.toISOString().split('T')[0];

            if (state.lastCompletedDate === yesterdayISO || state.currentStreak === 0) {
              newCurrentStreak = state.currentStreak + 1;
            } else {
              newCurrentStreak = 1;
            }
          }

          const newLongestStreak = Math.max(state.longestStreak, newCurrentStreak);

          set({
            dailyMinutes: updatedDailyMinutes,
            currentStreak: newCurrentStreak,
            longestStreak: newLongestStreak,
            lastCompletedDate: isGoalReachedNow ? today : state.lastCompletedDate,
          });
        },

        addAssessmentRecord: (record) => {
          const newRecord: AssessmentRecord = {
            id: `assess_${Date.now()}`,
            ...record,
          };
          set((state) => ({
            assessmentRecords: [newRecord, ...state.assessmentRecords],
          }));
        },

        updateEquipmentPreferences: (prefs) => {
          set((state) => ({
            equipmentPreferences: {
              ...state.equipmentPreferences,
              ...prefs,
            },
          }));
        },

        updateAudioPreferences: (prefs) => {
          set((state) => ({
            audioPreferences: {
              ...state.audioPreferences,
              ...prefs,
            },
          }));
        },

        toggleFavorite: (exerciseId) => {
          set((state) => {
            const ids = state.favoriteExerciseIds;
            const isFav = ids.includes(exerciseId);
            return {
              favoriteExerciseIds: isFav
                ? ids.filter((id) => id !== exerciseId)
                : [...ids, exerciseId],
            };
          });
        },

        saveCustomRoutine: (routine) => {
          const id = `routine_${Date.now()}`;
          const newRoutine: CustomRoutine = {
            id,
            createdAt: new Date().toISOString(),
            ...routine,
          };
          set((state) => ({
            customRoutines: [newRoutine, ...state.customRoutines],
          }));
          return id;
        },

        deleteCustomRoutine: (id) => {
          set((state) => ({
            customRoutines: state.customRoutines.filter((r) => r.id !== id),
          }));
        },

        resetAllProgress: () => {
          set({
            currentStreak: 0,
            longestStreak: 0,
            lastCompletedDate: null,
            dailyMinutes: {},
            completedSessions: [],
            assessmentRecords: [],
          });
        },
      },
    }),
    {
      name: 'elite-sport-user-store',
      partialize: (state) => ({
        currentStreak: state.currentStreak,
        longestStreak: state.longestStreak,
        lastCompletedDate: state.lastCompletedDate,
        dailyMinutes: state.dailyMinutes,
        completedSessions: state.completedSessions,
        assessmentRecords: state.assessmentRecords,
        trainingContext: state.trainingContext,
        equipmentPreferences: state.equipmentPreferences,
        monthlyGoals: state.monthlyGoals,
        audioPreferences: state.audioPreferences,
        favoriteExerciseIds: state.favoriteExerciseIds,
        customRoutines: state.customRoutines,
      }),
    }
  )
);

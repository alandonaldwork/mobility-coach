import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgressState, TrainingContext, AssessmentRecord, EquipmentPreferences } from '../types';

interface UserStoreActions {
  setTrainingContext: (context: TrainingContext) => void;
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
  resetAllProgress: () => void;
}

export interface UserStore extends UserProgressState {
  equipmentPreferences: EquipmentPreferences;
  actions: UserStoreActions;
}

const getTodayISO = (): string => {
  const d = new Date();
  return d.toISOString().split('T')[0];
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
      equipmentPreferences: {
        hasBand: true,
        hasRoller: true,
        hasWall: true,
        hasMat: true,
      },
      actions: {
        setTrainingContext: (context) => set({ trainingContext: context }),

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
      }),
    }
  )
);

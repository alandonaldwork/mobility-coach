import { create } from "zustand";
import {
  DailySession,
  ProgramGoal,
  SessionExercise,
  TrainingContext,
} from "../types";
import { getWeeklySchedule } from "../data/schedules";
import { getExerciseById } from "../data/exercise-catalog";
import { modifySessionForContext } from "../utils/contextUtils";
import { useUserStore } from "./useUserStore";

export type PlayerState =
  | "idle"
  | "briefing"
  | "exercise"
  | "transition"
  | "complete"
  | "bonus";

export interface WorkoutSessionStore {
  playerState: PlayerState;
  activeSession: DailySession | null;
  filteredExercises: SessionExercise[];
  currentExerciseIndex: number;
  isPaused: boolean;
  exerciseTimerSeconds: number;
  sessionElapsedSeconds: number;
  completedExerciseIds: number[];
  transitionCountdown: number; // 3, 2, 1

  // Actions
  startWorkout: (
    dayId: number,
    context: TrainingContext,
    goal?: ProgramGoal,
  ) => void;
  startDeskResetStandalone: () => void;
  startMEDStandalone: () => void;
  startCustomReliefSession: (session: DailySession) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  tickTimer: () => void;
  nextExercise: () => void;
  previousExercise: () => void;
  skipExercise: () => void;
  restartCurrentExercise: () => void;
  markCurrentExerciseComplete: () => void;
  finishSessionEarly: () => void;
  closePlayer: () => void;

  //audio settings
  audioEnabled?: boolean;
  voiceEnabled?: boolean;
  metronomeEnabled?: boolean;

  speechRate?: number;
  speechVolume?: number;

  setAudioEnabled?: (enabled: boolean) => void;
  setVoiceEnabled?: (enabled: boolean) => void;
  setMetronomeEnabled?: (enabled: boolean) => void;
}

export const useWorkoutStore = create<WorkoutSessionStore>((set, get) => ({
  playerState: "idle",
  activeSession: null,
  filteredExercises: [],
  currentExerciseIndex: 0,
  isPaused: false,
  exerciseTimerSeconds: 0,
  sessionElapsedSeconds: 0,
  completedExerciseIds: [],
  transitionCountdown: 3,

  startWorkout: (dayId, context, goal) => {
    const now = new Date();
    const resolvedGoal =
      goal ??
      useUserStore
        .getState()
        .actions.getGoalForMonth(now.getFullYear(), now.getMonth());
    const schedule = getWeeklySchedule(resolvedGoal);
    const rawSession = schedule.find((s) => s.dayId === dayId) || schedule[0];

    const { modifiedSession } = modifySessionForContext(rawSession, context);
    const exercises = modifiedSession.exercises;

    const firstExercise = exercises[0];
    const initialDuration = firstExercise ? firstExercise.durationSeconds : 30;

    set({
      playerState: "briefing",
      activeSession: modifiedSession,
      filteredExercises: exercises,
      currentExerciseIndex: 0,
      isPaused: false,
      exerciseTimerSeconds: initialDuration,
      sessionElapsedSeconds: 0,
      completedExerciseIds: [],
      transitionCountdown: 3,
    });
  },

  startDeskResetStandalone: () => {
    // Custom 5-min desk reset routine mapped to DailySession structure
    const deskSession: DailySession = {
      dayId: 7,
      name: "5-Minute Standalone Desk Reset",
      focus: "Workday Desk Counter & Circulation",
      emphasis: "Postural Reset & Mobility Break",
      plannedDurationMinutes: 5,
      deskResetMinutes: 5,
      mainSessionMinutes: 0,
      exercises: [
        {
          exerciseId: 21,
          startTime: "00:00",
          durationSeconds: 30,
          dose: "8 circles/dir/side",
          type: "Active",
        },
        {
          exerciseId: 3,
          startTime: "00:30",
          durationSeconds: 45,
          dose: "20 sec/side",
          type: "Static",
        },
        {
          exerciseId: 5,
          startTime: "01:15",
          durationSeconds: 30,
          dose: "20 sec/side",
          type: "Static",
        },
        {
          exerciseId: 14,
          startTime: "01:45",
          durationSeconds: 30,
          dose: "20 sec/side",
          type: "Static",
        },
        {
          exerciseId: 28,
          startTime: "02:15",
          durationSeconds: 40,
          dose: "8 slow reps",
          type: "Active",
        },
        {
          exerciseId: 36,
          startTime: "02:55",
          durationSeconds: 30,
          dose: "10 reps, 2 sec hold",
          type: "Activation",
        },
        {
          exerciseId: 26,
          startTime: "03:25",
          durationSeconds: 90,
          dose: "10 squats + march in place",
          type: "Active",
        },
      ],
    };

    set({
      playerState: "exercise",
      activeSession: deskSession,
      filteredExercises: deskSession.exercises,
      currentExerciseIndex: 0,
      isPaused: false,
      exerciseTimerSeconds: 30,
      sessionElapsedSeconds: 0,
      completedExerciseIds: [],
      transitionCountdown: 3,
    });
  },

  startMEDStandalone: () => {
    const medSession: DailySession = {
      dayId: 6,
      name: "Minimum Effective Dose (8–9 min)",
      focus: "Busy Day Express Mobility",
      emphasis: "7-Region Active Express Maintenance",
      plannedDurationMinutes: 8,
      deskResetMinutes: 0,
      mainSessionMinutes: 8,
      exercises: [
        {
          exerciseId: 21,
          startTime: "00:00",
          durationSeconds: 60,
          dose: "1 min combined ankle CARs + dorsiflexion",
          type: "Active",
        },
        {
          exerciseId: 26,
          startTime: "01:00",
          durationSeconds: 60,
          dose: "1 min active squat rock",
          type: "Active",
        },
        {
          exerciseId: 23,
          startTime: "02:00",
          durationSeconds: 60,
          dose: "1 min smooth switches",
          type: "Active",
        },
        {
          exerciseId: 24,
          startTime: "03:00",
          durationSeconds: 90,
          dose: "1.5 min dynamic flow (3-4 reps/side)",
          type: "Dynamic",
        },
        {
          exerciseId: 28,
          startTime: "04:30",
          durationSeconds: 60,
          dose: "1 min open book (5 reps/side)",
          type: "Active",
        },
        {
          exerciseId: 31,
          startTime: "05:30",
          durationSeconds: 90,
          dose: "1.5 min slides + pull-aparts",
          type: "Activation",
        },
        {
          exerciseId: 36,
          startTime: "07:00",
          durationSeconds: 60,
          dose: "1 min chin tucks + neck rotation",
          type: "Activation",
        },
        {
          exerciseId: 38,
          startTime: "08:00",
          durationSeconds: 30,
          dose: "30 sec wrist circles",
          type: "Active",
        },
      ],
    };

    set({
      playerState: "exercise",
      activeSession: medSession,
      filteredExercises: medSession.exercises,
      currentExerciseIndex: 0,
      isPaused: false,
      exerciseTimerSeconds: 60,
      sessionElapsedSeconds: 0,
      completedExerciseIds: [],
      transitionCountdown: 3,
    });
  },

  startCustomReliefSession: (session: DailySession) => {
    const firstExercise = session.exercises[0];
    const initialDuration = firstExercise ? firstExercise.durationSeconds : 30;

    set({
      playerState: "exercise",
      activeSession: session,
      filteredExercises: session.exercises,
      currentExerciseIndex: 0,
      isPaused: false,
      exerciseTimerSeconds: initialDuration,
      sessionElapsedSeconds: 0,
      completedExerciseIds: [],
      transitionCountdown: 3,
    });
  },

  pauseTimer: () => set({ isPaused: true }),
  resumeTimer: () => set({ isPaused: false }),

  tickTimer: () => {
    const {
      playerState,
      isPaused,
      exerciseTimerSeconds,
      transitionCountdown,
      sessionElapsedSeconds,
      currentExerciseIndex,
      filteredExercises,
      completedExerciseIds,
    } = get();

    if (isPaused) return;

    if (playerState === "exercise") {
      set({ sessionElapsedSeconds: sessionElapsedSeconds + 1 });

      if (exerciseTimerSeconds > 1) {
        set({ exerciseTimerSeconds: exerciseTimerSeconds - 1 });
      } else {
        // Exercise timer finished! Add to completed and move to transition or complete state
        const currentEx = filteredExercises[currentExerciseIndex];
        const newCompleted = currentEx
          ? [...completedExerciseIds, currentEx.exerciseId]
          : completedExerciseIds;

        if (currentExerciseIndex < filteredExercises.length - 1) {
          set({
            playerState: "transition",
            transitionCountdown: 3,
            completedExerciseIds: newCompleted,
          });
        } else {
          // Session complete!
          set({
            playerState: "complete",
            completedExerciseIds: newCompleted,
          });
        }
      }
    } else if (playerState === "transition") {
      if (transitionCountdown > 1) {
        set({ transitionCountdown: transitionCountdown - 1 });
      } else {
        const nextIdx = currentExerciseIndex + 1;
        const nextEx = filteredExercises[nextIdx];
        const duration = nextEx ? nextEx.durationSeconds : 30;

        set({
          playerState: "exercise",
          currentExerciseIndex: nextIdx,
          exerciseTimerSeconds: duration,
        });
      }
    }
  },

  nextExercise: () => {
    const { currentExerciseIndex, filteredExercises, completedExerciseIds } =
      get();
    const currentEx = filteredExercises[currentExerciseIndex];
    const newCompleted =
      currentEx && !completedExerciseIds.includes(currentEx.exerciseId)
        ? [...completedExerciseIds, currentEx.exerciseId]
        : completedExerciseIds;

    if (currentExerciseIndex < filteredExercises.length - 1) {
      const nextIdx = currentExerciseIndex + 1;
      const nextEx = filteredExercises[nextIdx];
      set({
        currentExerciseIndex: nextIdx,
        exerciseTimerSeconds: nextEx ? nextEx.durationSeconds : 30,
        completedExerciseIds: newCompleted,
        playerState: "exercise",
      });
    } else {
      set({
        playerState: "complete",
        completedExerciseIds: newCompleted,
      });
    }
  },

  previousExercise: () => {
    const { currentExerciseIndex, filteredExercises } = get();
    if (currentExerciseIndex > 0) {
      const prevIdx = currentExerciseIndex - 1;
      const prevEx = filteredExercises[prevIdx];
      set({
        currentExerciseIndex: prevIdx,
        exerciseTimerSeconds: prevEx ? prevEx.durationSeconds : 30,
        playerState: "exercise",
      });
    }
  },

  skipExercise: () => {
    const { currentExerciseIndex, filteredExercises } = get();
    if (currentExerciseIndex < filteredExercises.length - 1) {
      const nextIdx = currentExerciseIndex + 1;
      const nextEx = filteredExercises[nextIdx];
      set({
        currentExerciseIndex: nextIdx,
        exerciseTimerSeconds: nextEx ? nextEx.durationSeconds : 30,
        playerState: "exercise",
      });
    } else {
      set({ playerState: "complete" });
    }
  },

  restartCurrentExercise: () => {
    const { currentExerciseIndex, filteredExercises } = get();
    const currentEx = filteredExercises[currentExerciseIndex];
    set({
      exerciseTimerSeconds: currentEx ? currentEx.durationSeconds : 30,
      playerState: "exercise",
    });
  },

  markCurrentExerciseComplete: () => {
    get().nextExercise();
  },

  finishSessionEarly: () => {
    set({ playerState: "complete" });
  },

  closePlayer: () => {
    set({
      playerState: "idle",
      activeSession: null,
      filteredExercises: [],
      currentExerciseIndex: 0,
      sessionElapsedSeconds: 0,
      completedExerciseIds: [],
    });
  },

  // Audio default values
  audioEnabled: true,
  voiceEnabled: true,
  metronomeEnabled: false,

  speechRate: 1,
  speechVolume: 1,

  setAudioEnabled: (enabled) => set({ audioEnabled: enabled }),

  setVoiceEnabled: (enabled) => set({ voiceEnabled: enabled }),

  setMetronomeEnabled: (enabled) => set({ metronomeEnabled: enabled }),
}));

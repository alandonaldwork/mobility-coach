import React, { useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, ChevronRight, ChevronLeft, SkipForward } from 'lucide-react';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { formatSecondsToMMSS } from '../../utils/formatUtils';
import { Exercise } from '../../types';

interface ExerciseTimerProps {
  exercise: Exercise;
  dose: string;
}

export const ExerciseTimer: React.FC<ExerciseTimerProps> = ({ exercise, dose }) => {
  const {
    exerciseTimerSeconds,
    isPaused,
    pauseTimer,
    resumeTimer,
    tickTimer,
    nextExercise,
    previousExercise,
    skipExercise,
    restartCurrentExercise,
    markCurrentExerciseComplete,
  } = useWorkoutStore();

  useEffect(() => {
    const timer = setInterval(() => {
      tickTimer();
    }, 1000);
    return () => clearInterval(timer);
  }, [tickTimer]);

  const totalDuration = exercise.durationSeconds || 30;
  const progressPercent = Math.min(100, Math.max(0, ((totalDuration - exerciseTimerSeconds) / totalDuration) * 100));
  const halfwaySeconds = Math.floor(totalDuration / 2);
  const isSwitchingNow = exercise.isBilateral && halfwaySeconds > 0 && (exerciseTimerSeconds === halfwaySeconds || exerciseTimerSeconds === halfwaySeconds - 1);
  const currentSide = exerciseTimerSeconds > halfwaySeconds ? 1 : 2;

  return (
    <div className="bg-surface-card border border-surface-border rounded-3xl p-6 shadow-elevated flex flex-col items-center justify-center space-y-6 relative overflow-hidden">
      {/* Exercise Badge */}
      <div className="flex items-center space-x-2">
        <span className="text-xs font-mono font-bold text-volt uppercase tracking-wider bg-volt/10 border border-volt/30 px-3 py-1 rounded-full">
          {exercise.type}
        </span>
        {exercise.isBilateral && (
          <span
            className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border transition-all duration-300 ${
              isSwitchingNow
                ? 'bg-volt text-surface-base border-volt shadow-volt scale-105'
                : currentSide === 1
                ? 'bg-ember/10 border-ember/30 text-ember'
                : 'bg-volt/10 border-volt/30 text-volt'
            }`}
          >
            {isSwitchingNow ? '⚡ SWITCH SIDES NOW ⚡' : `Side ${currentSide} of 2`}
          </span>
        )}
      </div>

      {/* Large Mono Timer */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* SVG Progress Circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="44"
            className="stroke-surface-border"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="44"
            className="stroke-volt transition-all duration-1000 ease-linear"
            strokeWidth="6"
            strokeDasharray={276.46}
            strokeDashoffset={276.46 - (276.46 * progressPercent) / 100}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div className="absolute text-center flex flex-col items-center justify-center space-y-1">
          <span className="text-4xl font-extrabold font-mono text-content-primary tracking-tight">
            {formatSecondsToMMSS(exerciseTimerSeconds)}
          </span>
          <span className="text-xs font-mono text-content-muted">{dose}</span>
        </div>
      </div>

      {/* Timer Controls */}
      <div className="flex items-center justify-center space-x-2 sm:space-x-3 max-w-full">
        <button
          onClick={previousExercise}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-surface-elevated border border-surface-border hover:border-surface-highlight text-content-primary flex items-center justify-center transition-all shrink-0"
          title="Previous Exercise"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={restartCurrentExercise}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-surface-elevated border border-surface-border hover:border-surface-highlight text-content-primary flex items-center justify-center transition-all shrink-0"
          title="Restart Exercise"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {isPaused ? (
          <button
            onClick={resumeTimer}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-volt text-surface-base hover:bg-volt/90 font-extrabold flex items-center justify-center shadow-volt transition-all shrink-0"
            title="Resume"
          >
            <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-surface-base ml-0.5" />
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-volt text-surface-base hover:bg-volt/90 font-extrabold flex items-center justify-center shadow-volt transition-all shrink-0"
            title="Pause"
          >
            <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-surface-base" />
          </button>
        )}

        <button
          onClick={markCurrentExerciseComplete}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-surface-elevated border border-surface-border hover:border-state-success text-state-success flex items-center justify-center transition-all shrink-0"
          title="Mark Complete"
        >
          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextExercise}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-surface-elevated border border-surface-border hover:border-surface-highlight text-content-primary flex items-center justify-center transition-all shrink-0"
          title="Next Exercise"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
};

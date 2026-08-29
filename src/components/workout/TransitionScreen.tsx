import React, { useEffect } from 'react';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { getExerciseById } from '../../data/exercise-catalog';

export const TransitionScreen: React.FC = () => {
  const { transitionCountdown, tickTimer, currentExerciseIndex, filteredExercises, nextExercise } = useWorkoutStore();

  const nextExSession = filteredExercises[currentExerciseIndex + 1];
  const nextExDetails = nextExSession ? getExerciseById(nextExSession.exerciseId) : null;

  useEffect(() => {
    const timer = setInterval(() => {
      tickTimer();
    }, 1000);
    return () => clearInterval(timer);
  }, [tickTimer]);

  return (
    <div className="fixed inset-0 z-50 bg-surface-base/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center space-y-6 animate-scale-in">
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-volt uppercase tracking-wider">
          UP NEXT IN {transitionCountdown} SECONDS...
        </span>
        <h2 className="text-3xl font-black font-mono text-content-primary">
          {transitionCountdown}
        </h2>
      </div>

      {nextExDetails && (
        <div className="bg-surface-card border border-surface-border rounded-2xl p-6 max-w-md w-full space-y-3 shadow-elevated">
          <span className="text-[10px] font-mono text-volt uppercase font-bold">
            Exercise {currentExerciseIndex + 2} of {filteredExercises.length}
          </span>
          <h3 className="text-xl font-extrabold text-content-primary">
            {nextExDetails.name}
          </h3>
          <p className="text-xs text-content-muted">
            Target: <strong className="text-content-primary">{nextExDetails.target}</strong>
          </p>
          <p className="text-xs text-volt font-mono font-bold">
            Dose: {nextExSession.dose}
          </p>
        </div>
      )}

      <button
        onClick={nextExercise}
        className="px-6 py-3 bg-volt text-surface-base font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-volt hover:bg-volt/90 transition-all"
      >
        SKIP COUNTDOWN & START NOW
      </button>
    </div>
  );
};

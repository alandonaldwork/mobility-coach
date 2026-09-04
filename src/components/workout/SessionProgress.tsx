import React from "react";
import { useWorkoutStore } from "../../store/useWorkoutStore";
import { formatSecondsToMMSS } from "../../utils/formatUtils";
import { X } from "lucide-react";

export const SessionProgress: React.FC = () => {
  const {
    currentExerciseIndex,
    filteredExercises,
    sessionElapsedSeconds,
    closePlayer,
  } = useWorkoutStore();

  const totalExercises = filteredExercises.length;
  const currentNum = currentExerciseIndex + 1;

  const totalPlannedSeconds = filteredExercises.reduce(
    (acc, ex) => acc + (ex.durationSeconds || 30),
    0,
  );
  const remainingSeconds = Math.max(
    0,
    totalPlannedSeconds - sessionElapsedSeconds,
  );

  const progressPercent = Math.min(100, (currentNum / totalExercises) * 100);

  return (
    <div className="bg-surface-card border-b border-surface-border p-4 sticky top-0 z-40 backdrop-blur-md">
      <div className="w-full max-w-xl min-[1001px]:max-w-[80%] mx-auto space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-volt">
              Exercise {currentNum} of {totalExercises}
            </span>
          </div>

          <div className="flex items-center space-x-4 text-content-muted">
            <span>
              Elapsed:{" "}
              <strong className="text-content-primary">
                {formatSecondsToMMSS(sessionElapsedSeconds)}
              </strong>
            </span>
            <span>
              Rem:{" "}
              <strong className="text-content-primary">
                {formatSecondsToMMSS(remainingSeconds)}
              </strong>
            </span>

            <button
              onClick={closePlayer}
              className="p-1 rounded-lg hover:bg-surface-elevated text-content-muted hover:text-content-primary transition-colors"
              title="Exit Workout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden border border-surface-border">
          <div
            className="h-full bg-volt rounded-full transition-all duration-300 shadow-volt-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

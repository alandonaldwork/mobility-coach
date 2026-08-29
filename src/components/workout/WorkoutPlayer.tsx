import React from 'react';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { getExerciseById } from '../../data/exercise-catalog';
import { SessionProgress } from './SessionProgress';
import { ExerciseTimer } from './ExerciseTimer';
import { ExerciseCard } from './ExerciseCard';
import { TransitionScreen } from './TransitionScreen';
import { CompletionModal } from './CompletionModal';
import { DailyWorkout } from './DailyWorkout';
import { Play } from 'lucide-react';

export const WorkoutPlayer: React.FC = () => {
  const { playerState, activeSession, filteredExercises, currentExerciseIndex, closePlayer } = useWorkoutStore();
  const setPlayerState = useWorkoutStore.setState;

  if (playerState === 'idle' || !activeSession) return null;

  if (playerState === 'briefing') {
    return (
      <div className="fixed inset-0 z-50 bg-surface-base overflow-y-auto p-4 sm:p-6">
        <div className="max-w-xl mx-auto space-y-4">
          <DailyWorkout session={activeSession} onBack={closePlayer} />
          
          <button
            onClick={() => setPlayerState({ playerState: 'exercise' })}
            className="w-full py-4 bg-volt text-surface-base font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-volt flex items-center justify-center space-x-2"
          >
            <Play className="w-5 h-5 fill-surface-base" />
            <span>START FIRST EXERCISE</span>
          </button>
        </div>
      </div>
    );
  }

  if (playerState === 'transition') {
    return <TransitionScreen />;
  }

  if (playerState === 'complete') {
    return <CompletionModal />;
  }

  const currentExSession = filteredExercises[currentExerciseIndex];
  const currentExDetails = currentExSession ? getExerciseById(currentExSession.exerciseId) : null;

  if (!currentExDetails || !currentExSession) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-surface-base flex flex-col overflow-y-auto animate-fade-in">
      {/* Session Progress Top Bar */}
      <SessionProgress />

      {/* Main Player Content */}
      <div className="flex-1 max-w-xl w-full mx-auto px-4 py-4 space-y-5 pb-12">
        {/* Exercise Header */}
        <div className="text-center space-y-1">
          <span className="text-[11px] font-mono font-bold text-volt uppercase tracking-wider">
            {activeSession.name}
          </span>
          <h2 className="text-2xl font-black text-content-primary">
            {currentExDetails.name}
          </h2>
        </div>

        {/* Interactive Timer */}
        <ExerciseTimer exercise={currentExDetails} dose={currentExSession.dose} />

        {/* Exercise Details Card */}
        <ExerciseCard exercise={currentExDetails} dose={currentExSession.dose} />
      </div>
    </div>
  );
};

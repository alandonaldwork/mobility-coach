import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkoutStore } from '../store/useWorkoutStore';
import { EXERCISE_LIBRARY } from '../data/exercise-library';
import { SessionProgress } from '../components/workout/SessionProgress';
import { ExerciseTimer } from '../components/workout/ExerciseTimer';
import { ExerciseCard } from '../components/workout/ExerciseCard';
import { TransitionScreen } from '../components/workout/TransitionScreen';
import { CompletionModal } from '../components/workout/CompletionModal';
import { DailyWorkout } from '../components/workout/DailyWorkout';
import { getSessionForDate } from '../utils/dateUtils';
import { useUserStore } from '../store/useUserStore';
import { Play } from 'lucide-react';

export const SessionPage: React.FC = () => {
  const navigate = useNavigate();
  const { playerState, activeSession, filteredExercises, currentExerciseIndex, closePlayer, startWorkout } = useWorkoutStore();
  const setPlayerState = useWorkoutStore.setState;
  const trainingContext = useUserStore((state) => state.trainingContext);

  // Auto-start today's session if navigated to /session directly in idle state
  useEffect(() => {
    if (playerState === 'idle' && !activeSession) {
      const todaySession = getSessionForDate(new Date());
      startWorkout(todaySession.dayId, trainingContext);
    }
  }, [playerState, activeSession, startWorkout, trainingContext]);

  // If player state transitions back to idle (e.g. via exit button), navigate back home
  useEffect(() => {
    if (playerState === 'idle' && activeSession === null) {
      navigate('/');
    }
  }, [playerState, activeSession, navigate]);

  const handleExitSession = () => {
    closePlayer();
    navigate('/');
  };

  if (playerState === 'idle' || !activeSession) {
    return (
      <div className="flex items-center justify-center py-20 min-h-screen bg-surface-base">
        <p className="text-sm font-mono text-content-muted">Initializing workout session...</p>
      </div>
    );
  }

  if (playerState === 'briefing') {
    return (
      <div className="min-h-screen w-full bg-surface-base flex items-center justify-center p-4">
        <div className="w-full max-w-xl min-[1001px]:max-w-[80%] space-y-4 py-4 mx-auto">
          <DailyWorkout session={activeSession} onBack={handleExitSession} />
          
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
    return (
      <div className="fixed inset-0 z-50 bg-surface-base flex items-center justify-center">
        <TransitionScreen />
      </div>
    );
  }

  if (playerState === 'complete') {
    return (
      <div className="fixed inset-0 z-50 bg-surface-base flex items-center justify-center">
        <CompletionModal />
      </div>
    );
  }

  const currentExSession = filteredExercises[currentExerciseIndex];
  const currentExDetails = currentExSession ? EXERCISE_LIBRARY.find((e) => e.id === currentExSession.exerciseId) : null;

  if (!currentExDetails || !currentExSession) {
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-surface-base flex flex-col">
      {/* Session Progress Bar */}
      <SessionProgress />

      {/* Main Player Content Container */}
      <div className="flex-1 w-full max-w-xl min-[1001px]:max-w-[80%] mx-auto px-4 py-6 space-y-5 pb-16 flex flex-col justify-center">
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

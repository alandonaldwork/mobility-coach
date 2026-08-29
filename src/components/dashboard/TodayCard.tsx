import React from 'react';
import { Play, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getSessionForDate } from '../../utils/dateUtils';
import { useUserStore } from '../../store/useUserStore';
import { useWorkoutStore } from '../../store/useWorkoutStore';

export const TodayCard: React.FC = () => {
  const navigate = useNavigate();
  const today = new Date();
  const session = getSessionForDate(today);
  const trainingContext = useUserStore((state) => state.trainingContext);
  const startWorkout = useWorkoutStore((state) => state.startWorkout);

  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  const handleStartSession = () => {
    startWorkout(session.dayId, trainingContext);
    navigate('/session');
  };

  return (
    <div className="bg-surface-card border border-surface-border rounded-2xl p-5 relative overflow-hidden space-y-4 shadow-elevated">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-mono font-bold text-volt uppercase tracking-wider block">
            TODAY'S SCHEDULED SESSION
          </span>
          <h2 className="text-xl font-extrabold text-content-primary tracking-tight mt-0.5">
            Day {session.dayId}: {session.name}
          </h2>
          <p className="text-xs text-content-muted mt-1 font-sans">{formattedDate}</p>
        </div>
        <div className="bg-volt/10 border border-volt/30 rounded-xl px-3 py-1.5 text-center">
          <span className="text-xs font-mono font-bold text-volt block">DAY</span>
          <span className="text-lg font-extrabold font-mono text-volt leading-none">{session.dayId}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="bg-surface-elevated border border-surface-border rounded-xl p-3">
          <span className="text-[10px] font-mono text-content-muted uppercase block">Focus</span>
          <span className="text-xs font-bold text-content-primary block mt-0.5 truncate">{session.focus}</span>
        </div>
        <div className="bg-surface-elevated border border-surface-border rounded-xl p-3">
          <span className="text-[10px] font-mono text-content-muted uppercase block">Planned Duration</span>
          <span className="text-xs font-bold text-volt block mt-0.5 flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 inline mr-1" />
            {session.plannedDurationMinutes} min (incl. Desk Reset)
          </span>
        </div>
      </div>

      <div className="bg-surface-elevated/60 border border-surface-border rounded-xl p-3 text-xs space-y-1">
        <div className="flex items-center justify-between text-content-secondary">
          <span>Desk Reset Routine:</span>
          <span className="font-mono font-semibold text-content-primary">{session.deskResetMinutes} min</span>
        </div>
        <div className="flex items-center justify-between text-content-secondary">
          <span>Main Rotating Session:</span>
          <span className="font-mono font-semibold text-content-primary">~{session.mainSessionMinutes} min</span>
        </div>
        <div className="flex items-center justify-between text-content-secondary pt-1 border-t border-surface-border">
          <span>Exercises Count:</span>
          <span className="font-mono font-semibold text-volt">{session.exercises.length} exercises</span>
        </div>
      </div>

      <button
        onClick={handleStartSession}
        className="w-full py-4 bg-volt text-surface-base hover:bg-volt/90 font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all shadow-volt flex items-center justify-center space-x-2 group"
      >
        <Play className="w-5 h-5 fill-surface-base group-hover:scale-110 transition-transform" />
        <span>START TODAY'S SESSION</span>
        <ArrowRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
};

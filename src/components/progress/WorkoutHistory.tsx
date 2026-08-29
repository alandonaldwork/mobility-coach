import React from 'react';
import { History, CheckCircle2, Flame, Clock } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';
import { getWeeklySchedule } from '../../data/schedules';

export const WorkoutHistory: React.FC = () => {
  const completedSessions = useUserStore((state) => state.completedSessions);

  if (completedSessions.length === 0) {
    return (
      <div className="bg-surface-card border border-surface-border rounded-2xl p-6 text-center space-y-2 shadow-card">
        <History className="w-8 h-8 text-content-muted mx-auto" />
        <h3 className="text-sm font-bold text-content-primary">No Completed Sessions Yet</h3>
        <p className="text-xs text-content-muted">Press "Start Today's Session" on the dashboard to complete your first workout!</p>
      </div>
    );
  }

  return (
    <div className="bg-surface-card border border-surface-border rounded-2xl p-5 space-y-4 shadow-elevated">
      <div className="flex items-center justify-between border-b border-surface-border pb-3">
        <h3 className="text-sm font-bold text-content-primary flex items-center space-x-2">
          <History className="w-4 h-4 text-volt" />
          <span>Workout History Log ({completedSessions.length})</span>
        </h3>
      </div>

      <div className="space-y-2">
        {completedSessions.map((session) => {
          const sessionDate = new Date(`${session.date}T00:00:00`);
          const goal = useUserStore.getState().actions.getGoalForMonth(
            sessionDate.getFullYear(),
            sessionDate.getMonth(),
          );
          const scheduleSession = getWeeklySchedule(goal).find((s) => s.dayId === session.dayId);
          return (
            <div
              key={session.id}
              className="bg-surface-elevated border border-surface-border rounded-xl p-3.5 flex items-center justify-between hover:border-surface-highlight transition-colors"
            >
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono text-volt uppercase font-bold">
                    {session.date}
                  </span>
                  <span className="text-[10px] font-mono text-content-muted">
                    • Day {session.dayId}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-content-primary">
                  {scheduleSession?.name || `Day ${session.dayId} Session`}
                </h4>
                <p className="text-[11px] text-content-muted">
                  Context: <span className="text-content-secondary capitalize">{session.trainingContext.replace('_', ' ')}</span>
                </p>
              </div>

              <div className="text-right space-y-1">
                <div className="flex items-center space-x-1 justify-end font-mono text-xs font-bold text-volt">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{session.completedDurationMinutes} min</span>
                </div>
                <span className="text-[10px] font-mono text-content-muted block">
                  {session.exercisesCompletedCount} / {session.totalExercisesCount} exercises
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

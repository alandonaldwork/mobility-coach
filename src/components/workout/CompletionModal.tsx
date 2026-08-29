import React, { useEffect, useState } from 'react';
import { Trophy, CheckCircle2, Flame, ArrowRight, RotateCcw, Clock, Zap } from 'lucide-react';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { useUserStore } from '../../store/useUserStore';

export const CompletionModal: React.FC = () => {
  const { activeSession, sessionElapsedSeconds, filteredExercises, completedExerciseIds, closePlayer, startDeskResetStandalone } = useWorkoutStore();
  const { recordCompletedSession, addBonusMinutes } = useUserStore((state) => state.actions);
  const { dailyMinutes, currentStreak, longestStreak } = useUserStore();

  const [hasRecorded, setHasRecorded] = useState(false);

  const completedMins = Math.max(1, Math.round(sessionElapsedSeconds / 60));
  const todayISO = new Date().toISOString().split('T')[0];
  const totalMinsToday = (dailyMinutes[todayISO] || 0) + (hasRecorded ? 0 : completedMins);

  const is30MinGoalAchieved = totalMinsToday >= 30;
  const minutesNeededFor30 = Math.max(0, 30 - totalMinsToday);

  useEffect(() => {
    if (!hasRecorded && activeSession) {
      recordCompletedSession({
        dayId: activeSession.dayId,
        completedDurationMinutes: completedMins,
        exercisesCompletedCount: completedExerciseIds.length,
        totalExercisesCount: filteredExercises.length,
        trainingContext: useUserStore.getState().trainingContext,
      });
      setHasRecorded(true);
    }
  }, [activeSession, completedMins, completedExerciseIds.length, filteredExercises.length, hasRecorded, recordCompletedSession]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div className="bg-surface-card border border-surface-border rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center space-y-6 shadow-elevated relative my-8">
        
        {/* Celebration Header */}
        <div className="space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-volt/10 border border-volt/30 text-volt mx-auto flex items-center justify-center shadow-volt">
            <Trophy className="w-8 h-8 text-volt" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-content-primary tracking-tight font-mono">
            SESSION COMPLETE 🎉
          </h2>
          <p className="text-xs text-content-muted font-sans">
            Great work! Mobility & joint health preserved.
          </p>
        </div>

        {/* Workout Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface-elevated border border-surface-border rounded-2xl p-4 space-y-1">
            <span className="text-[10px] font-mono text-content-muted uppercase">Completed Time</span>
            <p className="text-2xl font-extrabold font-mono text-volt">
              {completedMins} min
            </p>
          </div>

          <div className="bg-surface-elevated border border-surface-border rounded-2xl p-4 space-y-1">
            <span className="text-[10px] font-mono text-content-muted uppercase">Exercises Done</span>
            <p className="text-2xl font-extrabold font-mono text-content-primary">
              {completedExerciseIds.length} / {filteredExercises.length}
            </p>
          </div>
        </div>

        {/* 30-Minute Streak Goal Banner */}
        <div className={`rounded-2xl border p-4 text-left space-y-2 ${
          is30MinGoalAchieved
            ? 'bg-state-success/10 border-state-success/40 text-state-success'
            : 'bg-surface-elevated border-surface-border text-content-primary'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Flame className={`w-5 h-5 ${is30MinGoalAchieved ? 'text-ember animate-pulse' : 'text-volt'}`} />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">
                {is30MinGoalAchieved ? '30-MINUTE GOAL ACHIEVED 🔥' : "TODAY'S MOBILITY PROGRESS"}
              </span>
            </div>
            <span className="text-xs font-mono font-bold">
              {totalMinsToday} / 30 min
            </span>
          </div>

          <div className="w-full h-2.5 bg-surface-base rounded-full overflow-hidden border border-surface-border">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                is30MinGoalAchieved ? 'bg-state-success' : 'bg-volt'
              }`}
              style={{ width: `${Math.min(100, (totalMinsToday / 30) * 100)}%` }}
            />
          </div>

          {is30MinGoalAchieved ? (
            <p className="text-xs text-state-success font-semibold pt-1">
              Qualified for today's streak day! Current streak: <strong className="font-mono">{currentStreak} days</strong>.
            </p>
          ) : (
            <p className="text-xs text-content-muted pt-1">
              You need <strong className="text-volt font-mono">{minutesNeededFor30} minutes remaining</strong> to reach your 30-minute streak goal for today.
            </p>
          )}
        </div>

        {/* Bonus Mobility Section if under 30 min */}
        {!is30MinGoalAchieved && (
          <div className="bg-surface-elevated/70 border border-surface-border rounded-2xl p-4 text-left space-y-3">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-volt" />
              <h4 className="text-xs font-bold text-content-primary uppercase font-mono">
                Bonus Mobility to Reach 30 Min
              </h4>
            </div>
            <p className="text-xs text-content-muted leading-relaxed">
              Prescribed daily session was ~{activeSession?.plannedDurationMinutes} min. Perform a 5-minute Desk Reset or repeat selected active drills to complete your 30-minute streak goal without altering prescribed program doses.
            </p>

            <div className="flex space-x-2">
              <button
                onClick={() => {
                  closePlayer();
                  setTimeout(() => startDeskResetStandalone(), 100);
                }}
                className="flex-1 py-2.5 bg-surface-card border border-volt/30 hover:border-volt text-volt font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Clock className="w-4 h-4" />
                <span>+5 Min Desk Reset</span>
              </button>

              <button
                onClick={() => {
                  addBonusMinutes(minutesNeededFor30);
                }}
                className="py-2.5 px-3 bg-surface-card border border-surface-border text-content-muted hover:text-content-primary font-mono text-xs rounded-xl"
                title="Manually log bonus active mobility"
              >
                Log +{minutesNeededFor30}m
              </button>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="pt-2 space-y-2">
          <button
            onClick={closePlayer}
            className="w-full py-4 bg-volt text-surface-base hover:bg-volt/90 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-volt flex items-center justify-center space-x-2"
          >
            <span>RETURN TO DASHBOARD</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

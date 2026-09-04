import React, { useState, useEffect } from 'react';
import { Play, Clock, ArrowRight, ShieldAlert, Sparkles, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getSessionForDate } from '../../utils/dateUtils';
import { useUserStore } from '../../store/useUserStore';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { modifySessionForContext } from '../../utils/contextUtils';
import { TRAINING_CONTEXT_RULES } from '../../data/training-context-modifications';
import { TodayCardSkeleton } from '../shared/SkeletonLoader';

export const TodayCard: React.FC = () => {
  const navigate = useNavigate();
  const today = new Date();
  const getGoalForMonth = useUserStore((state) => state.actions.getGoalForMonth);
  const monthGoal = getGoalForMonth(today.getFullYear(), today.getMonth());
  const rawSession = getSessionForDate(today, monthGoal);
  const trainingContext = useUserStore((state) => state.trainingContext);
  const startWorkout = useWorkoutStore((state) => state.startWorkout);

  const [isAdapting, setIsAdapting] = useState(false);

  useEffect(() => {
    setIsAdapting(true);
    const timer = setTimeout(() => setIsAdapting(false), 350);
    return () => clearTimeout(timer);
  }, [trainingContext]);

  const contextRule = TRAINING_CONTEXT_RULES[trainingContext] || TRAINING_CONTEXT_RULES.normal;
  const { modifiedSession, removedCount, originalDurationMinutes, modifiedDurationMinutes } = modifySessionForContext(rawSession, trainingContext);

  if (isAdapting) {
    return <TodayCardSkeleton />;
  }

  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  const handleStartSession = () => {
    startWorkout(rawSession.dayId, trainingContext, monthGoal);
    navigate('/session');
  };

  const isContextAltered = trainingContext !== 'normal';

  return (
    <div className="bg-surface-card border border-surface-border rounded-2xl p-4 sm:p-5 relative overflow-hidden space-y-3.5 sm:space-y-4 shadow-elevated">
      <div className="flex items-start justify-between gap-2.5">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-volt uppercase tracking-wider block">
              TODAY'S SCHEDULED SESSION
            </span>
            {isContextAltered && (
              <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 shrink-0">
                <Activity className="w-3 h-3 inline mr-0.5" />
                <span>{contextRule.label}</span>
              </span>
            )}
          </div>
          <h2 className="text-base sm:text-xl font-extrabold text-content-primary tracking-tight mt-0.5 line-clamp-2 leading-snug">
            Day {modifiedSession.dayId}: {modifiedSession.name}
          </h2>
          <p className="text-[11px] sm:text-xs text-content-muted mt-0.5 font-sans">{formattedDate}</p>
        </div>
        <div className="bg-volt/10 border border-volt/30 rounded-xl px-2.5 sm:px-3 py-1.5 text-center shrink-0">
          <span className="text-[10px] sm:text-xs font-mono font-bold text-volt block">DAY</span>
          <span className="text-base sm:text-lg font-extrabold font-mono text-volt leading-none">{modifiedSession.dayId}</span>
        </div>
      </div>

      {isContextAltered && (
        <div className="bg-surface-elevated/90 border border-volt/20 rounded-xl p-3 text-xs space-y-1">
          <div className="flex items-center justify-between font-bold text-volt">
            <span className="flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Context Adaptive Schedule</span>
            </span>
            <span className="font-mono text-[10px] text-content-muted">
              {originalDurationMinutes}m → <strong className="text-volt">{modifiedDurationMinutes}m</strong>
            </span>
          </div>
          <p className="text-[11px] text-content-secondary leading-relaxed">
            {contextRule.beforeGuidance}
          </p>
          {removedCount > 0 && (
            <p className="text-[10px] font-mono text-amber-400/90 pt-0.5">
              ⚠️ {removedCount} passive/static stretch{removedCount > 1 ? 'es' : ''} filtered out to protect pre-training muscle readiness.
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="bg-surface-elevated border border-surface-border rounded-xl p-3">
          <span className="text-[10px] font-mono text-content-muted uppercase block">Focus</span>
          <span className="text-xs font-bold text-content-primary block mt-0.5 truncate">{modifiedSession.focus}</span>
        </div>
        <div className="bg-surface-elevated border border-surface-border rounded-xl p-3">
          <span className="text-[10px] font-mono text-content-muted uppercase block">Planned Duration</span>
          <span className="text-xs font-bold text-volt block mt-0.5 flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 inline mr-1" />
            {modifiedDurationMinutes} min {isContextAltered && `(${modifiedSession.deskResetMinutes}m desk + ${modifiedSession.mainSessionMinutes}m main)`}
          </span>
        </div>
      </div>

      <div className="bg-surface-elevated/60 border border-surface-border rounded-xl p-3 text-xs space-y-1">
        <div className="flex items-center justify-between text-content-secondary">
          <span>Desk Reset Routine:</span>
          <span className="font-mono font-semibold text-content-primary">{modifiedSession.deskResetMinutes} min</span>
        </div>
        <div className="flex items-center justify-between text-content-secondary">
          <span>Main Rotating Session:</span>
          <span className="font-mono font-semibold text-content-primary">~{modifiedSession.mainSessionMinutes} min</span>
        </div>
        <div className="flex items-center justify-between text-content-secondary pt-1 border-t border-surface-border">
          <span>Active Exercises Count:</span>
          <span className="font-mono font-semibold text-volt">{modifiedSession.exercises.length} exercises {removedCount > 0 && `(${removedCount} excluded)`}</span>
        </div>
      </div>

      <button
        onClick={handleStartSession}
        className="w-full py-4 bg-volt text-surface-base hover:bg-volt/90 font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all shadow-volt flex items-center justify-center space-x-2 group"
      >
        <Play className="w-5 h-5 fill-surface-base group-hover:scale-110 transition-transform" />
        <span>START TODAY'S SESSION ({modifiedDurationMinutes} MIN)</span>
        <ArrowRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
};


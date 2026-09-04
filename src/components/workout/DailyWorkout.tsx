import React, { useState, useEffect } from "react";
import {
  Play,
  ArrowLeft,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DailySession } from "../../types";
import { getExerciseById } from "../../data/exercise-catalog";
import { useWorkoutStore } from "../../store/useWorkoutStore";
import { useUserStore } from "../../store/useUserStore";
import { TrainingContextSelector } from "../context/TrainingContextSelector";
import { SafetyNotice } from "../shared/SafetyNotice";
import { modifySessionForContext } from "../../utils/contextUtils";
import { TRAINING_CONTEXT_RULES } from "../../data/training-context-modifications";
import { DailyWorkoutSkeleton } from "../shared/SkeletonLoader";

interface DailyWorkoutProps {
  session: DailySession;
  onBack?: () => void;
}

export const DailyWorkout: React.FC<DailyWorkoutProps> = ({
  session,
  onBack,
}) => {
  const navigate = useNavigate();
  const trainingContext = useUserStore((state) => state.trainingContext);
  const startWorkout = useWorkoutStore((state) => state.startWorkout);

  const [isAdapting, setIsAdapting] = useState(false);

  useEffect(() => {
    setIsAdapting(true);
    const timer = setTimeout(() => setIsAdapting(false), 350);
    return () => clearTimeout(timer);
  }, [trainingContext]);

  const contextRule =
    TRAINING_CONTEXT_RULES[trainingContext] || TRAINING_CONTEXT_RULES.normal;
  const {
    modifiedSession,
    modificationNote,
    exerciseStatusMap,
    removedCount,
    modifiedDurationMinutes,
  } = modifySessionForContext(session, trainingContext);

  if (isAdapting) {
    return <DailyWorkoutSkeleton />;
  }

  const handleStartSession = () => {
    startWorkout(session.dayId, trainingContext);
    navigate("/session");
  };

  const isContextAltered = trainingContext !== "normal";

  return (
    <div className="space-y-5 animate-fade-in">
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs font-mono text-content-muted hover:text-volt transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      )}

      {/* Session Header */}
      <div className="bg-surface-card border border-surface-border rounded-3xl p-6 space-y-4 shadow-elevated">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold text-volt uppercase tracking-wider bg-volt/10 border border-volt/30 px-3 py-1 rounded-full">
              Day {modifiedSession.dayId} Rotation
            </span>
            {isContextAltered && (
              <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold px-2.5 py-1 rounded-full flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 inline mr-1" />
                <span>{contextRule.label} Mode</span>
              </span>
            )}
          </div>
          <span className="text-xs font-mono text-content-muted">
            Total ~{modifiedDurationMinutes} min
          </span>
        </div>

        <h2 className="text-2xl font-black text-content-primary">
          {modifiedSession.name}
        </h2>

        <p className="text-xs text-content-secondary leading-relaxed">
          <strong className="text-content-primary">Focus:</strong>{" "}
          {modifiedSession.focus} — {modifiedSession.emphasis}
        </p>

        {/* Context Specific Banner */}
        {isContextAltered && (
          <div className="bg-surface-elevated border border-volt/30 rounded-2xl p-4 space-y-2">
            <div className="flex items-center space-x-2 text-volt font-mono font-bold text-xs">
              <ShieldAlert className="w-4 h-4 text-volt" />
              <span>TRAINING CONTEXT ADJUSTMENT RULES</span>
            </div>
            <p className="text-xs text-content-secondary leading-relaxed font-sans">
              {modificationNote}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="bg-surface-base/60 border border-surface-border rounded-xl p-2.5">
                <span className="font-mono text-volt font-bold block">
                  PRE-TRAINING GUIDANCE:
                </span>
                <span className="text-content-muted">
                  {contextRule.beforeGuidance}
                </span>
              </div>
              <div className="bg-surface-base/60 border border-surface-border rounded-xl p-2.5">
                <span className="font-mono text-content-primary font-bold block">
                  POST-TRAINING GUIDANCE:
                </span>
                <span className="text-content-muted">
                  {contextRule.afterGuidance}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="pt-2">
          <button
            onClick={handleStartSession}
            className="w-full py-4 bg-volt text-surface-base hover:bg-volt/90 font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-volt flex items-center justify-center space-x-2"
          >
            <Play className="w-5 h-5 fill-surface-base" />
            <span>START SESSION NOW ({modifiedDurationMinutes} MIN)</span>
          </button>
        </div>
      </div>

      {/* Context Selector */}
      <TrainingContextSelector />

      {/* Exercise List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold text-content-primary uppercase tracking-wider">
            PRESCRIBED EXERCISE SEQUENCE ({modifiedSession.exercises.length}{" "}
            ACTIVE EXERCISES)
          </h3>
          {removedCount > 0 && (
            <span className="text-[10px] font-mono text-amber-400">
              ({removedCount} Passive Stretches Excluded)
            </span>
          )}
        </div>

        <div className="space-y-2">
          {modifiedSession.exercises.map((se, idx) => {
            const exDetails = getExerciseById(se.exerciseId);
            if (!exDetails) return null;
            const status = exerciseStatusMap[se.exerciseId];

            return (
              <div
                key={`${se.exerciseId}_${idx}`}
                className="bg-surface-card border border-surface-border rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-2.5 hover:border-surface-highlight transition-colors"
              >
                <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0 flex-1">
                  <div className="w-7 h-7 rounded-lg bg-surface-elevated text-volt font-mono font-bold text-xs flex items-center justify-center border border-surface-border shrink-0">
                    {idx + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <h4 className="text-xs sm:text-sm font-bold text-content-primary truncate">
                        {exDetails.name}
                      </h4>
                      {status?.tag && (
                        <span className="bg-volt/10 text-volt border border-volt/30 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0">
                          {status.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-content-muted font-mono truncate">
                      {se.dose} •{" "}
                      <span className="text-volt">
                        {se.durationSeconds}s duration
                      </span>
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                      exDetails.type === "Passive"
                        ? "bg-ember/10 border border-ember/30 text-ember"
                        : "bg-volt/10 border border-volt/30 text-volt"
                    }`}
                  >
                    {exDetails.type}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <SafetyNotice />
    </div>
  );
};

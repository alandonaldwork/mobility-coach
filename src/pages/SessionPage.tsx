import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkoutStore } from "../store/useWorkoutStore";
import { getExerciseById } from "../data/exercise-catalog";
import { SessionProgress } from "../components/workout/SessionProgress";
import { ExerciseTimer } from "../components/workout/ExerciseTimer";
import { ExerciseCard } from "../components/workout/ExerciseCard";
import { TransitionScreen } from "../components/workout/TransitionScreen";
import { CompletionModal } from "../components/workout/CompletionModal";
import { DailyWorkout } from "../components/workout/DailyWorkout";
import { getSessionForDate } from "../utils/dateUtils";
import { useUserStore } from "../store/useUserStore";
import {
  AlertTriangle,
  BookOpen,
  LayoutList,
  Play,
  ShieldAlert,
  Wind,
} from "lucide-react";
import { TRAINING_CONTEXT_RULES } from "../data/training-context-modifications";

type Tab = "details" | "instructions";

export const SessionPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    playerState,
    activeSession,
    filteredExercises,
    currentExerciseIndex,
    closePlayer,
    startWorkout,
  } = useWorkoutStore();
  const setPlayerState = useWorkoutStore.setState;
  const trainingContext = useUserStore((state) => state.trainingContext);
  const [activeTab, setActiveTab] = useState<Tab>("details");

  // Auto-start today's session if navigated to /session directly in idle state
  useEffect(() => {
    if (playerState === "idle" && !activeSession) {
      const today = new Date();
      const todaySession = getSessionForDate(
        today,
        useUserStore
          .getState()
          .actions.getGoalForMonth(today.getFullYear(), today.getMonth()),
      );
      startWorkout(
        todaySession.dayId,
        trainingContext,
        useUserStore
          .getState()
          .actions.getGoalForMonth(today.getFullYear(), today.getMonth()),
      );
    }
  }, [playerState, activeSession, startWorkout, trainingContext]);

  // If player state transitions back to idle (e.g. via exit button), navigate back home
  useEffect(() => {
    if (playerState === "idle" && activeSession === null) {
      navigate("/");
    }
  }, [playerState, activeSession, navigate]);

  const handleExitSession = () => {
    closePlayer();
    navigate("/");
  };

  if (playerState === "idle" || !activeSession) {
    return (
      <div className="flex items-center justify-center py-20 min-h-screen bg-surface-base">
        <p className="text-sm font-mono text-content-muted">
          Initializing workout session...
        </p>
      </div>
    );
  }

  if (playerState === "briefing") {
    return (
      <div className="min-h-screen w-full bg-surface-base flex items-center justify-center p-4">
        <div className="w-full max-w-xl min-[1001px]:max-w-[80%] space-y-4 py-4 mx-auto">
          <DailyWorkout session={activeSession} onBack={handleExitSession} />

          <button
            onClick={() => setPlayerState({ playerState: "exercise" })}
            className="w-full py-4 bg-volt text-surface-base font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-volt flex items-center justify-center space-x-2"
          >
            <Play className="w-5 h-5 fill-surface-base" />
            <span>START FIRST EXERCISE</span>
          </button>
        </div>
      </div>
    );
  }

  if (playerState === "transition") {
    return (
      <div className="fixed inset-0 z-50 bg-surface-base flex items-center justify-center">
        <TransitionScreen />
      </div>
    );
  }

  if (playerState === "complete") {
    return (
      <div className="fixed inset-0 z-50 bg-surface-base flex items-center justify-center">
        <CompletionModal />
      </div>
    );
  }

  const currentExSession = filteredExercises[currentExerciseIndex];
  const currentExDetails = currentExSession
    ? getExerciseById(currentExSession.exerciseId)
    : null;

  if (!currentExDetails || !currentExSession) {
    return null;
  }

  const hasSteps = currentExDetails.steps && currentExDetails.steps.length > 0;

  return (
    <div className="min-h-screen w-full bg-surface-base flex flex-col">
      {/* Session Progress Bar */}
      <SessionProgress />

      {/* Main Player Content Container */}
      <div className="flex-1 w-full max-w-xl min-[1001px]:max-w-[80%] mx-auto px-4 py-6 space-y-5 pb-16 flex flex-col justify-center">
        {/* Exercise Header */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-[11px] font-mono font-bold text-volt uppercase tracking-wider">
              {activeSession.name}
            </span>
            {trainingContext !== "normal" && (
              <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                {TRAINING_CONTEXT_RULES[trainingContext]?.label ||
                  trainingContext}
              </span>
            )}
          </div>
          <h2 className="text-2xl font-black text-content-primary">
            {currentExDetails.name}
          </h2>
        </div>

        {/* Interactive Timer */}
        <ExerciseTimer
          exercise={currentExDetails}
          dose={currentExSession.dose}
        />

        {/* Exercise Details Card */}
        {/* <ExerciseCard exercise={currentExDetails} dose={currentExSession.dose} /> */}
        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-surface-elevated border border-surface-border rounded-xl p-1">
          <button
            onClick={() => setActiveTab("details")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === "details"
                ? "bg-surface-card text-content-primary shadow-sm border border-surface-border"
                : "text-content-muted hover:text-content-secondary"
            }`}
          >
            <LayoutList className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>
          <button
            onClick={() => setActiveTab("instructions")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === "instructions"
                ? "bg-volt text-surface-base shadow-volt-sm"
                : "text-content-muted hover:text-content-secondary"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>How To</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "details" ? (
          <ExerciseCard
            exercise={currentExDetails}
            dose={currentExSession.dose}
          />
        ) : (
          <div className="space-y-4 animate-fade-in">
            {/* Step-by-Step Instructions */}
            <div className="bg-surface-card border border-surface-border rounded-2xl p-5 space-y-4 shadow-elevated">
              <div>
                <span className="text-[10px] font-mono text-volt uppercase font-bold tracking-wider block">
                  Step-by-Step Instructions
                </span>
                <h3 className="text-base font-extrabold text-content-primary mt-0.5">
                  {currentExDetails.name}
                </h3>
                <p className="text-[11px] text-content-muted font-mono mt-0.5">
                  Prescribed dose: {currentExSession.dose}
                </p>
              </div>

              {hasSteps ? (
                <ol className="space-y-3">
                  {currentExDetails.steps!.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-volt/10 border border-volt/30 text-volt text-[11px] font-mono font-black flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-sm text-content-primary leading-relaxed">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              ) : (
                /* Fallback to cues if no steps data */
                <ol className="space-y-3">
                  {currentExDetails.cues.map((cue, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-volt/10 border border-volt/30 text-volt text-[11px] font-mono font-black flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-sm text-content-primary leading-relaxed">
                        {cue}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            {/* Breathing + Common Mistakes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-surface-card border border-surface-border rounded-2xl p-4 space-y-2">
                <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-volt uppercase tracking-wider">
                  <Wind className="w-3.5 h-3.5" />
                  Breathing Pattern
                </span>
                <p className="text-xs text-content-primary leading-relaxed">
                  {currentExDetails.breathingCues}
                </p>
              </div>

              {currentExDetails.commonMistakes?.length > 0 && (
                <div className="bg-ember/5 border border-ember/20 rounded-2xl p-4 space-y-2">
                  <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-ember uppercase tracking-wider">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Common Mistakes
                  </span>
                  <ul className="space-y-1.5">
                    {currentExDetails.commonMistakes.map((m, i) => (
                      <li
                        key={i}
                        className="text-xs text-content-secondary flex items-start gap-2"
                      >
                        <span className="text-ember font-bold shrink-0 mt-0.5">
                          ✕
                        </span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Safety Note */}
            {currentExDetails.safetyNotes && (
              <div className="bg-ember/10 border border-ember/30 rounded-2xl p-4 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-ember shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono font-bold text-ember uppercase tracking-wider block mb-1">
                    Safety Notice
                  </span>
                  <p className="text-xs text-ember leading-relaxed">
                    {currentExDetails.safetyNotes}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { useWorkoutStore } from "../../store/useWorkoutStore";
import { getExerciseById } from "../../data/exercise-catalog";
import { SessionProgress } from "./SessionProgress";
import { ExerciseTimer } from "./ExerciseTimer";
import { ExerciseCard } from "./ExerciseCard";
import { TransitionScreen } from "./TransitionScreen";
import { CompletionModal } from "./CompletionModal";
import { DailyWorkout } from "./DailyWorkout";
import {
  Play,
  BookOpen,
  LayoutList,
  Wind,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

type Tab = "details" | "instructions";

export const WorkoutPlayer: React.FC = () => {
  const {
    playerState,
    activeSession,
    filteredExercises,
    currentExerciseIndex,
    closePlayer,
  } = useWorkoutStore();
  const setPlayerState = useWorkoutStore.setState;
  const [activeTab, setActiveTab] = useState<Tab>("details");

  if (playerState === "idle" || !activeSession) return null;

  if (playerState === "briefing") {
    return (
      <div className="fixed inset-0 z-50 bg-surface-base overflow-y-auto p-4 sm:p-6">
        <div className="max-w-xl mx-auto space-y-4">
          <DailyWorkout session={activeSession} onBack={closePlayer} />

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
    return <TransitionScreen />;
  }

  if (playerState === "complete") {
    return <CompletionModal />;
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
        <ExerciseTimer
          exercise={currentExDetails}
          dose={currentExSession.dose}
        />

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

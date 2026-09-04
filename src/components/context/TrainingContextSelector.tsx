import React, { useState } from "react";
import { Activity, Dumbbell, Zap, Moon, Shield, Check, Loader2 } from "lucide-react";
import { useUserStore } from "../../store/useUserStore";
import { TrainingContext } from "../../types";
import { TRAINING_CONTEXT_RULES } from "../../data/training-context-modifications";

export const TrainingContextSelector: React.FC = () => {
  const currentContext = useUserStore((state) => state.trainingContext);
  const setContext = useUserStore((state) => state.actions.setTrainingContext);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSelectContext = (id: TrainingContext) => {
    if (id === currentContext) return;
    setIsUpdating(true);
    setContext(id);
    setTimeout(() => setIsUpdating(false), 350);
  };

  const contexts: Array<{
    id: TrainingContext;
    label: string;
    impact: string;
    icon: React.FC<{ className?: string }>;
  }> = [
    {
      id: "normal",
      label: "Normal / Rest",
      impact: "Full Routine",
      icon: Shield,
    },
    {
      id: "sport_training",
      label: "Sport Practice",
      impact: "Active Pre-Court (~12m)",
      icon: Activity,
    },
    {
      id: "match_day",
      label: "Match Day",
      impact: "Express Active (~8m)",
      icon: Zap,
    },
    {
      id: "heavy_lower_strength",
      label: "Lower Strength",
      impact: "Pre-Lift Active Hip/Ankle",
      icon: Dumbbell,
    },
    {
      id: "heavy_upper_strength",
      label: "Upper Strength",
      impact: "Pre-Lift Active Scap/T-Spine",
      icon: Dumbbell,
    },
    {
      id: "jump_plyos",
      label: "Jump / Plyos",
      impact: "Protects Calf Stiffness",
      icon: Zap,
    },
    {
      id: "recovery_rest",
      label: "Recovery Day",
      impact: "+15s Passive Holds",
      icon: Moon,
    },
  ];

  return (
    <div className="bg-surface-card border border-surface-border rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-content-primary">
            Today's Training Context
          </h3>
          <p className="text-xs text-content-muted">
            Alters today's exercises & duration to match your physical demands
          </p>
        </div>
        {isUpdating ? (
          <span className="text-[10px] font-mono font-bold text-volt bg-volt/10 border border-volt/30 px-2.5 py-0.5 rounded-full flex items-center space-x-1 animate-pulse">
            <Loader2 className="w-3 h-3 animate-spin inline mr-1" />
            ADAPTING ROUTINE...
          </span>
        ) : currentContext !== "normal" ? (
          <span className="text-[10px] font-mono font-bold text-volt bg-volt/10 border border-volt/30 px-2 py-0.5 rounded-full">
            ADAPTED WORKOUT ACTIVE
          </span>
        ) : null}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
        {contexts.map((item) => {
          const isSelected = currentContext === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectContext(item.id)}
              className={`p-2 sm:p-2.5 rounded-xl border text-left flex flex-col justify-between min-w-0 space-y-1 transition-all ${
                isSelected
                  ? "bg-volt/10 border-volt text-volt font-bold shadow-volt-sm"
                  : "bg-surface-elevated border-surface-border text-content-secondary hover:text-content-primary hover:border-surface-highlight"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <Icon
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${isSelected ? "text-volt" : "text-content-muted"}`}
                />
                {isSelected && <Check className="w-3.5 h-3.5 text-volt shrink-0" />}
              </div>
              <span className="text-[11px] sm:text-xs font-bold truncate block w-full min-w-0">
                {item.label}
              </span>
              <span
                className={`text-[9px] font-mono block truncate w-full min-w-0 ${isSelected ? "text-volt/90 font-semibold" : "text-content-muted"}`}
              >
                {item.impact}
              </span>
            </button>
          );
        })}
      </div>

      {currentContext !== "normal" && (
        <div className="mt-2 text-xs bg-surface-elevated border border-volt/20 rounded-xl p-3 text-content-secondary space-y-1 animate-fade-in">
          <p className="font-bold text-volt flex items-center space-x-1">
            <span>
              ⚡ {TRAINING_CONTEXT_RULES[currentContext]?.label} Schedule
              Modifications
            </span>
          </p>
          <p className="text-[11px] text-content-muted leading-relaxed">
            {TRAINING_CONTEXT_RULES[currentContext]?.beforeGuidance}
          </p>
        </div>
      )}
    </div>
  );
};

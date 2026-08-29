import React from 'react';
import { Activity, Dumbbell, Zap, Moon, Shield } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';
import { TrainingContext } from '../../types';
import { TRAINING_CONTEXT_RULES } from '../../data/training-context-modifications';

export const TrainingContextSelector: React.FC = () => {
  const currentContext = useUserStore((state) => state.trainingContext);
  const setContext = useUserStore((state) => state.actions.setTrainingContext);

  const contexts: Array<{ id: TrainingContext; label: string; icon: React.FC<{ className?: string }> }> = [
    { id: 'normal', label: 'Normal / Rest', icon: Shield },
    { id: 'volleyball_training', label: 'Volleyball Practice', icon: Activity },
    { id: 'match_day', label: 'Match Day', icon: Zap },
    { id: 'heavy_lower_strength', label: 'Lower Strength', icon: Dumbbell },
    { id: 'heavy_upper_strength', label: 'Upper Strength', icon: Dumbbell },
    { id: 'jump_plyos', label: 'Jump / Plyos', icon: Zap },
    { id: 'recovery_rest', label: 'Recovery Day', icon: Moon },
  ];

  return (
    <div className="bg-surface-card border border-surface-border rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-content-primary">Today's Training Context</h3>
          <p className="text-xs text-content-muted">Adjusts session rules to preserve jump & hit power</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {contexts.map((item) => {
          const isSelected = currentContext === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setContext(item.id)}
              className={`p-2.5 rounded-xl border text-left flex items-center space-x-2 transition-all ${
                isSelected
                  ? 'bg-volt/10 border-volt text-volt font-bold shadow-volt-sm'
                  : 'bg-surface-elevated border-surface-border text-content-secondary hover:text-content-primary hover:border-surface-highlight'
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-volt' : 'text-content-muted'}`} />
              <span className="text-xs truncate">{item.label}</span>
            </button>
          );
        })}
      </div>

      {currentContext !== 'normal' && (
        <div className="mt-2 text-xs bg-surface-elevated border border-surface-border rounded-xl p-3 text-content-secondary space-y-1">
          <p className="font-semibold text-volt">
            {TRAINING_CONTEXT_RULES[currentContext]?.label} Active
          </p>
          <p className="text-[11px] text-content-muted leading-relaxed">
            {TRAINING_CONTEXT_RULES[currentContext]?.beforeGuidance}
          </p>
        </div>
      )}
    </div>
  );
};

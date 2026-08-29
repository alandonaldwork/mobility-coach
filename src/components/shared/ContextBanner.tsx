import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { TrainingContext } from '../../types';
import { TRAINING_CONTEXT_RULES } from '../../data/training-context-modifications';

interface ContextBannerProps {
  context: TrainingContext;
}

export const ContextBanner: React.FC<ContextBannerProps> = ({ context }) => {
  const rule = TRAINING_CONTEXT_RULES[context];
  if (!rule || context === 'normal') return null;

  return (
    <div className="bg-volt/10 border border-volt/30 rounded-xl p-3.5 flex items-start space-x-3">
      <ShieldCheck className="w-5 h-5 text-volt flex-shrink-0 mt-0.5" />
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-volt uppercase tracking-wider">
            {rule.label} Mode Active
          </span>
        </div>
        <p className="text-xs text-content-primary leading-relaxed font-sans">
          <span className="font-semibold text-content-primary">Pre-activity:</span> {rule.beforeGuidance}
        </p>
        <p className="text-[11px] text-content-muted leading-relaxed">
          <span className="font-semibold text-content-secondary">Post-activity:</span> {rule.afterGuidance}
        </p>
      </div>
    </div>
  );
};

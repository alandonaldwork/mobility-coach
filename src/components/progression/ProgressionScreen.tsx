import React from 'react';
import { Zap, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { PROGRESSION_PLAN } from '../../data/progression-plan';

export const ProgressionScreen: React.FC = () => {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-4 space-y-1 shadow-elevated">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-volt/10 text-volt border border-volt/30 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-content-primary tracking-tight">
              4–6 Week Progression System
            </h2>
            <p className="text-xs text-content-muted">Source-program progression triggers, hold ceilings & integration</p>
          </div>
        </div>
      </div>

      <div className="bg-surface-elevated/70 border border-surface-border rounded-xl p-3.5 text-xs text-content-secondary flex items-start space-x-2.5">
        <Info className="w-4 h-4 text-volt flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Progression is not about forcing deeper stretches — it's about building active control, expanding hold ceilings, and verifying range transfers into explosive jump/landing mechanics.
        </p>
      </div>

      {/* Phase Cards */}
      <div className="space-y-4">
        {PROGRESSION_PLAN.map((phase, idx) => (
          <div key={phase.phase} className="bg-surface-card border border-surface-border rounded-2xl p-5 space-y-4 shadow-elevated">
            <div className="flex items-center justify-between border-b border-surface-border pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-volt/10 text-volt font-mono font-bold text-xs flex items-center justify-center border border-volt/30">
                  0{idx + 1}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-volt uppercase font-bold">{phase.weeks}</span>
                  <h3 className="text-base font-extrabold text-content-primary">{phase.phase} Phase</h3>
                </div>
              </div>
            </div>

            <p className="text-xs text-content-secondary leading-relaxed">
              <strong className="text-content-primary">Focus:</strong> {phase.focus}
            </p>

            {/* Guidelines */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-volt uppercase block">Phase Guidelines</span>
              <ul className="space-y-1">
                {phase.guidelines.map((g, i) => (
                  <li key={i} className="text-xs text-content-primary flex items-start space-x-2">
                    <span className="text-volt font-bold">•</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Triggers */}
            {phase.progressionTriggers.length > 0 && (
              <div className="bg-surface-elevated border border-surface-border rounded-xl p-3.5 space-y-1.5 text-xs">
                <span className="font-mono font-bold text-state-warning uppercase block">
                  Signs You Are Ready To Progress:
                </span>
                <ul className="space-y-1 text-content-secondary">
                  {phase.progressionTriggers.map((t, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-state-warning flex-shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

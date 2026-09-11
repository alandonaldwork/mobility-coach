import React from 'react';
import { Hotspot } from '../../data/body-hotspots';
import { DailySession } from '../../types';
import { ReliefIntent } from '../../utils/reliefRoutineGenerator';
import { getExerciseById } from '../../data/exercise-catalog';
import { Clock, Play, Zap, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

interface RoutineConfiguratorProps {
  hotspot: Hotspot;
  durationMinutes: 3 | 5 | 10;
  onChangeDuration: (mins: 3 | 5 | 10) => void;
  intent: ReliefIntent;
  onChangeIntent: (intent: ReliefIntent) => void;
  generatedSession: DailySession;
  onStartRoutine: () => void;
}

export const RoutineConfigurator: React.FC<RoutineConfiguratorProps> = ({
  hotspot,
  durationMinutes,
  onChangeDuration,
  intent,
  onChangeIntent,
  generatedSession,
  onStartRoutine,
}) => {
  return (
    <div className="bg-surface-card border border-surface-border rounded-3xl p-5 sm:p-6 space-y-5 shadow-elevated flex flex-col justify-between">
      {/* Hotspot Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold text-volt uppercase tracking-wider bg-volt/10 border border-volt/30 px-3 py-0.5 rounded-full">
            TARGET REGION
          </span>
          <span className="text-xs font-mono text-content-muted">
            {generatedSession.exercises.length} Exercises Selected
          </span>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-black text-content-primary">
            {hotspot.label}
          </h3>
          <p className="text-xs font-mono text-volt font-bold">
            {hotspot.subtitle}
          </p>
        </div>

        <p className="text-xs text-content-secondary leading-relaxed">
          {hotspot.description}
        </p>

        {/* Common Issues Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {hotspot.commonIssues.map((issue) => (
            <span
              key={issue}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-surface-elevated border border-surface-border text-content-muted"
            >
              {issue}
            </span>
          ))}
        </div>
      </div>

      <hr className="border-surface-border" />

      {/* Controls: Duration & Intent */}
      <div className="space-y-4">
        {/* Duration Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-bold text-content-primary uppercase flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-volt" />
            <span>Target Duration</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { mins: 3 as const, label: '3 Min', desc: 'Micro-Break' },
              { mins: 5 as const, label: '5 Min', desc: 'Standard' },
              { mins: 10 as const, label: '10 Min', desc: 'Deep Flow' },
            ].map((d) => (
              <button
                key={d.mins}
                type="button"
                onClick={() => onChangeDuration(d.mins)}
                className={`py-2 px-2 rounded-xl text-center border transition-all ${
                  durationMinutes === d.mins
                    ? 'bg-volt/15 border-volt text-volt shadow-volt-sm font-bold'
                    : 'bg-surface-elevated border-surface-border text-content-muted hover:border-surface-highlight hover:text-content-primary'
                }`}
              >
                <div className="text-xs font-mono font-extrabold">{d.label}</div>
                <div className="text-[10px] opacity-75">{d.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Intent Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-bold text-content-primary uppercase flex items-center space-x-1.5">
            <Zap className="w-3.5 h-3.5 text-ember" />
            <span>Relief Style</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'balanced' as const, label: 'Balanced', desc: 'Flow & Hold' },
              { id: 'gentle' as const, label: 'Gentle', desc: 'Passive Rest' },
              { id: 'active' as const, label: 'Active', desc: 'CARs & Range' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChangeIntent(opt.id)}
                className={`py-2 px-2 rounded-xl text-center border transition-all ${
                  intent === opt.id
                    ? 'bg-ember/15 border-ember text-ember shadow-ember font-bold'
                    : 'bg-surface-elevated border-surface-border text-content-muted hover:border-surface-highlight hover:text-content-primary'
                }`}
              >
                <div className="text-xs font-mono font-extrabold">{opt.label}</div>
                <div className="text-[10px] opacity-75">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <hr className="border-surface-border" />

      {/* Generated Routine Preview List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-content-primary uppercase flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-volt" />
            <span>Generated Sequence</span>
          </span>
          <span className="text-[10px] font-mono text-volt font-bold">
            ~{durationMinutes} MINUTES
          </span>
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {generatedSession.exercises.map((se, idx) => {
            const ex = getExerciseById(se.exerciseId);
            if (!ex) return null;

            return (
              <div
                key={`${se.exerciseId}-${idx}`}
                className="flex items-center justify-between p-2.5 bg-surface-elevated/80 border border-surface-border rounded-xl text-left"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-volt/10 text-volt border border-volt/30 flex items-center justify-center text-[10px] font-mono font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <div className="truncate">
                    <div className="text-xs font-bold text-content-primary truncate">
                      {ex.name}
                    </div>
                    <div className="text-[10px] text-content-muted truncate">
                      {se.dose}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0 ml-2">
                  <span className="text-[10px] font-mono font-bold text-volt uppercase bg-volt/10 px-2 py-0.5 rounded-md">
                    {se.durationSeconds}s
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={onStartRoutine}
        className="w-full py-4 bg-volt text-surface-base font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-volt hover:bg-volt/90 transition-all flex items-center justify-center space-x-2 group"
      >
        <Play className="w-5 h-5 fill-surface-base transition-transform group-hover:scale-110" />
        <span>START QUICK RELIEF ({durationMinutes} MIN)</span>
      </button>
    </div>
  );
};

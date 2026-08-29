import React, { useState } from 'react';
import { Target, Info, AlertTriangle, ShieldCheck, Dumbbell, ChevronDown, ChevronUp } from 'lucide-react';
import { Exercise } from '../../types';
import { EquipmentBadge } from '../shared/EquipmentBadge';
import { SubstitutionPanel } from '../shared/SubstitutionPanel';

interface ExerciseCardProps {
  exercise: Exercise;
  dose: string;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, dose }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-surface-card border border-surface-border rounded-2xl p-5 space-y-4 shadow-elevated">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-volt uppercase font-bold tracking-wider">
            Target Region: {exercise.region.toUpperCase()}
          </span>
          <EquipmentBadge equipment={exercise.equipment} />
        </div>
        <h3 className="text-xl font-extrabold text-content-primary tracking-tight">
          {exercise.name}
        </h3>
        <p className="text-xs text-content-muted leading-relaxed font-sans">
          <strong className="text-content-primary font-semibold">Prescribed Dose:</strong> {dose}
        </p>
      </div>

      {/* Target & Volleyball Benefit */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div className="bg-surface-elevated border border-surface-border rounded-xl p-3 space-y-1">
          <span className="text-[10px] font-mono text-content-muted uppercase flex items-center space-x-1">
            <Target className="w-3.5 h-3.5 text-volt" />
            <span>Target Joint / Tissue</span>
          </span>
          <p className="text-xs font-semibold text-content-primary leading-snug">
            {exercise.target}
          </p>
        </div>

        <div className="bg-surface-elevated border border-surface-border rounded-xl p-3 space-y-1">
          <span className="text-[10px] font-mono text-content-muted uppercase flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-volt" />
            <span>Why It Matters for Volleyball</span>
          </span>
          <p className="text-xs font-semibold text-content-primary leading-snug">
            {exercise.whyItMatters}
          </p>
        </div>
      </div>

      {/* Technique Cues */}
      <div className="bg-surface-elevated/60 border border-surface-border rounded-xl p-3.5 space-y-2">
        <span className="text-xs font-bold text-volt uppercase font-mono block">
          Key Technique Cues
        </span>
        <ul className="space-y-1">
          {exercise.cues.map((cue, idx) => (
            <li key={idx} className="text-xs text-content-primary flex items-start space-x-2">
              <span className="text-volt font-bold">•</span>
              <span>{cue}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Expandable Technique Details */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full py-2 flex items-center justify-center space-x-1 text-xs font-mono font-bold text-content-muted hover:text-volt transition-colors"
      >
        <span>{showDetails ? 'Hide Extra Details' : 'Show Common Mistakes & Breathing'}</span>
        {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {showDetails && (
        <div className="space-y-3 pt-2 border-t border-surface-border animate-fade-in">
          {/* Breathing */}
          <div className="text-xs space-y-1">
            <span className="font-bold text-content-primary block">Breathing:</span>
            <p className="text-content-muted">{exercise.breathingCues}</p>
          </div>

          {/* Common Mistakes */}
          <div className="text-xs space-y-1">
            <span className="font-bold text-ember block">Common Mistakes to Avoid:</span>
            <ul className="space-y-1">
              {exercise.commonMistakes.map((m, i) => (
                <li key={i} className="text-content-muted flex items-start space-x-1.5">
                  <span className="text-ember font-bold">✕</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Safety Warning */}
      {exercise.safetyNotes && (
        <div className="bg-ember/10 border border-ember/30 rounded-xl p-3 text-xs text-ember flex items-start space-x-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed font-sans">{exercise.safetyNotes}</p>
        </div>
      )}

      {/* Substitutions panel */}
      <SubstitutionPanel exerciseName={exercise.name} equipment={exercise.equipment} />
    </div>
  );
};

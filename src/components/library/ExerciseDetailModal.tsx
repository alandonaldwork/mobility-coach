import React from 'react';
import { Exercise } from '../../types';
import { X, Target, ShieldCheck, Dumbbell, AlertTriangle } from 'lucide-react';
import { EquipmentBadge } from '../shared/EquipmentBadge';
import { SubstitutionPanel } from '../shared/SubstitutionPanel';

interface ExerciseDetailModalProps {
  exercise: Exercise;
  onClose: () => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({ exercise, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-surface-card border border-surface-border rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-elevated relative my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-surface-border pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold text-volt uppercase bg-volt/10 border border-volt/30 px-2.5 py-0.5 rounded-full">
                {exercise.region.toUpperCase()}
              </span>
              <span className="text-[10px] font-mono font-bold text-content-muted uppercase border border-surface-border px-2.5 py-0.5 rounded-full">
                {exercise.type}
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-content-primary leading-tight">
              {exercise.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface-elevated text-content-muted hover:text-content-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dose & Equipment */}
        <div className="bg-surface-elevated border border-surface-border rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-content-muted uppercase block">Default Prescribed Dose</span>
            <span className="text-sm font-bold text-volt font-mono">{exercise.defaultDose}</span>
          </div>
          <EquipmentBadge equipment={exercise.equipment} />
        </div>

        {/* Target & Why It Matters */}
        <div className="space-y-3">
          <div className="bg-surface-elevated border border-surface-border rounded-xl p-3.5 space-y-1">
            <span className="text-xs font-mono font-bold text-volt uppercase flex items-center space-x-1">
              <Target className="w-4 h-4 mr-1" /> Target Joint / Tissue
            </span>
            <p className="text-xs font-semibold text-content-primary leading-relaxed">{exercise.target}</p>
          </div>

          <div className="bg-surface-elevated border border-surface-border rounded-xl p-3.5 space-y-1">
            <span className="text-xs font-mono font-bold text-volt uppercase flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4 mr-1" /> Why It Matters for Volleyball
            </span>
            <p className="text-xs text-content-secondary leading-relaxed">{exercise.whyItMatters}</p>
          </div>
        </div>

        {/* Cues */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono font-bold text-volt uppercase">Technique Cues</h4>
          <ul className="space-y-1">
            {exercise.cues.map((c, i) => (
              <li key={i} className="text-xs text-content-primary flex items-start space-x-2">
                <span className="text-volt font-bold">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mistakes */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono font-bold text-ember uppercase">Common Mistakes to Avoid</h4>
          <ul className="space-y-1">
            {exercise.commonMistakes.map((m, i) => (
              <li key={i} className="text-xs text-content-muted flex items-start space-x-2">
                <span className="text-ember font-bold">✕</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Breathing & Best Time */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-surface-elevated border border-surface-border rounded-xl p-3">
            <span className="font-bold text-content-primary block mb-0.5">Breathing:</span>
            <p className="text-content-muted">{exercise.breathingCues}</p>
          </div>
          <div className="bg-surface-elevated border border-surface-border rounded-xl p-3">
            <span className="font-bold text-content-primary block mb-0.5">Best Time:</span>
            <p className="text-content-muted">{exercise.bestTime.join(', ')}</p>
          </div>
        </div>

        {exercise.safetyNotes && (
          <div className="bg-ember/10 border border-ember/30 rounded-xl p-3 text-xs text-ember flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>{exercise.safetyNotes}</p>
          </div>
        )}

        <SubstitutionPanel exerciseName={exercise.name} equipment={exercise.equipment} />

        <button
          onClick={onClose}
          className="w-full py-3 bg-surface-elevated border border-surface-border text-content-primary hover:text-volt font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
        >
          Close Detail View
        </button>
      </div>
    </div>
  );
};

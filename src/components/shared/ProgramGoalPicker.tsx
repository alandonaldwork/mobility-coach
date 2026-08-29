import React from 'react';
import { ProgramGoal } from '../../types';

const GOALS: { id: ProgramGoal; label: string }[] = [
  { id: 'combined', label: 'Combined' },
  { id: 'stretch', label: 'Stretches' },
  { id: 'mobility', label: 'Mobility' },
];

interface ProgramGoalPickerProps {
  value: ProgramGoal;
  onChange: (goal: ProgramGoal) => void;
}

export const ProgramGoalPicker: React.FC<ProgramGoalPickerProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-wrap gap-1.5">
      {GOALS.map((goal) => (
        <button
          key={goal.id}
          type="button"
          onClick={() => onChange(goal.id)}
          className={`px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all ${
            value === goal.id
              ? 'bg-volt text-surface-base font-bold shadow-volt-sm'
              : 'bg-surface-elevated border border-surface-border text-content-secondary hover:text-content-primary'
          }`}
        >
          {goal.label}
        </button>
      ))}
    </div>
  );
};

export const programGoalLabel = (goal: ProgramGoal): string => {
  if (goal === 'stretch') return 'Stretch';
  if (goal === 'mobility') return 'Mobility';
  return 'Combined';
};

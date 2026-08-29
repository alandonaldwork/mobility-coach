import React from 'react';
import { RefreshCw } from 'lucide-react';
import { EQUIPMENT_SUBSTITUTIONS } from '../../data/substitutions';

interface SubstitutionPanelProps {
  exerciseName: string;
  equipment: string[];
}

export const SubstitutionPanel: React.FC<SubstitutionPanelProps> = ({ exerciseName, equipment }) => {
  const matchingSub = EQUIPMENT_SUBSTITUTIONS.find((s) =>
    equipment.some((eq) => s.missingEquipment.toLowerCase().includes(eq.toLowerCase())) ||
    s.affectedExercises.some((ae) => ae.toLowerCase().includes(exerciseName.toLowerCase()))
  );

  if (!matchingSub) return null;

  return (
    <div className="bg-surface-card border border-surface-border rounded-xl p-3.5 space-y-1.5">
      <div className="flex items-center space-x-2 text-volt font-bold text-xs">
        <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
        <span>Equipment Substitution Option</span>
      </div>
      <p className="text-xs font-semibold text-content-primary">
        No {matchingSub.missingEquipment}? Use <span className="text-volt">{matchingSub.alternative}</span>
      </p>
      <p className="text-[11px] text-content-muted leading-relaxed">
        {matchingSub.instructions}
      </p>
    </div>
  );
};

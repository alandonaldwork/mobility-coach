import React from 'react';
import { Dumbbell, Shield } from 'lucide-react';

interface EquipmentBadgeProps {
  equipment: string[];
}

export const EquipmentBadge: React.FC<EquipmentBadgeProps> = ({ equipment }) => {
  if (!equipment || equipment.length === 0 || (equipment.length === 1 && equipment[0] === 'None')) {
    return (
      <span className="inline-flex items-center space-x-1 bg-surface-card border border-surface-border text-content-muted text-[11px] px-2.5 py-1 rounded-md font-mono">
        <Shield className="w-3 h-3 text-volt" />
        <span>No Equipment</span>
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {equipment.map((item) => (
        <span
          key={item}
          className="inline-flex items-center space-x-1 bg-surface-card border border-surface-border text-content-secondary text-[11px] px-2.5 py-1 rounded-md font-mono"
        >
          <Dumbbell className="w-3 h-3 text-volt" />
          <span>{item}</span>
        </span>
      ))}
    </div>
  );
};

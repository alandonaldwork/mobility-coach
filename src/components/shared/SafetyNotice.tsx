import React from 'react';
import { AlertTriangle, Info, ShieldAlert } from 'lucide-react';

interface SafetyNoticeProps {
  message?: string;
  type?: 'warning' | 'caution' | 'info';
  compact?: boolean;
}

export const SafetyNotice: React.FC<SafetyNoticeProps> = ({ 
  message = 'Keep effort around 4–6/10. Stop immediately if you feel sharp, localized, or radiating pain.', 
  type = 'caution',
  compact = false 
}) => {
  const isWarning = type === 'warning';

  return (
    <div className={`rounded-xl border p-3.5 flex items-start space-x-3 ${
      isWarning 
        ? 'bg-ember/10 border-ember/30 text-ember' 
        : 'bg-surface-elevated border-surface-border text-content-secondary'
    }`}>
      {isWarning ? (
        <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
      ) : (
        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-state-warning" />
      )}
      <div className="text-xs leading-relaxed font-sans">
        <span className="font-bold block text-content-primary mb-0.5">
          {isWarning ? 'CRITICAL SAFETY NOTICE' : 'SAFETY GUIDANCE'}
        </span>
        {message}
      </div>
    </div>
  );
};

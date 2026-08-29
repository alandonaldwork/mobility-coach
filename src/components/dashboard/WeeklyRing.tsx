import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';

export const WeeklyRing: React.FC = () => {
  const dailyMinutes = useUserStore((state) => state.dailyMinutes);

  // Get last 7 days dates
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const mins = dailyMinutes[dateStr] || 0;
    const isQual = mins >= 30;
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'narrow' });
    const dayNum = d.getDate();
    return { dateStr, mins, isQual, dayLabel, dayNum };
  });

  const completedCount = days.filter((d) => d.isQual).length;

  return (
    <div className="bg-surface-card border border-surface-border rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-mono font-bold text-content-primary uppercase tracking-wider">
            7-DAY CONSISTENCY
          </h3>
          <p className="text-xs text-content-muted">{completedCount} of 7 days hit 30-min goal</p>
        </div>
        <span className="text-xs font-mono font-bold text-volt">{Math.round((completedCount / 7) * 100)}%</span>
      </div>

      <div className="grid grid-cols-7 gap-2 pt-1">
        {days.map((d, i) => (
          <div key={d.dateStr} className="flex flex-col items-center space-y-1">
            <span className="text-[10px] font-mono text-content-muted">{d.dayLabel}</span>
            <div
              className={`w-9 h-9 rounded-xl border flex flex-col items-center justify-center transition-all ${
                d.isQual
                  ? 'bg-state-success/15 border-state-success text-state-success font-bold'
                  : d.mins > 0
                  ? 'bg-volt/10 border-volt text-volt font-medium'
                  : 'bg-surface-elevated border-surface-border text-content-muted'
              }`}
            >
              <span className="text-xs font-mono">{d.dayNum}</span>
            </div>
            <span className="text-[9px] font-mono text-content-muted">{d.mins}m</span>
          </div>
        ))}
      </div>
    </div>
  );
};

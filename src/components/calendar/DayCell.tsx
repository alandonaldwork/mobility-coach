import React from 'react';
import { CalendarDayInfo } from '../../utils/dateUtils';
import { useUserStore } from '../../store/useUserStore';
import { CheckCircle2, Flame, Play } from 'lucide-react';

interface DayCellProps {
  day: CalendarDayInfo;
  onSelectDay: (day: CalendarDayInfo) => void;
}

export const DayCell: React.FC<DayCellProps> = ({ day, onSelectDay }) => {
  const dailyMinutes = useUserStore((state) => state.dailyMinutes);
  const minutesCompleted = dailyMinutes[day.dateString] || 0;

  const isQual = minutesCompleted >= 30;
  const isStarted = minutesCompleted > 0;

  return (
    <div
      onClick={() => onSelectDay(day)}
      className={`min-h-[72px] sm:min-h-[95px] p-1.5 sm:p-2 rounded-lg sm:rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
        day.isToday
          ? 'bg-volt/10 border-volt shadow-volt-sm ring-1 ring-volt'
          : !day.isCurrentMonth
          ? 'bg-surface-base/40 border-surface-border/40 opacity-40'
          : isQual
          ? 'bg-state-success/10 border-state-success/40'
          : isStarted
          ? 'bg-volt/5 border-volt/30'
          : 'bg-surface-card border-surface-border hover:border-surface-highlight'
      }`}
    >
      <div className="flex items-center justify-between gap-1">
        <span
          className={`text-[11px] sm:text-xs font-mono font-bold ${
            day.isToday ? 'text-volt' : 'text-content-primary'
          }`}
        >
          {day.dayOfMonth}
        </span>

        {isQual ? (
          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-state-success fill-state-success/20 shrink-0" />
        ) : isStarted ? (
          <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-volt shrink-0">{minutesCompleted}m</span>
        ) : null}
      </div>

      <div className="space-y-0.5 mt-0.5 min-w-0">
        <span className="text-[8px] sm:text-[9px] font-mono text-volt uppercase block font-semibold truncate">
          DAY {day.programDayId}
        </span>
        <p className="text-[10px] sm:text-[11px] font-bold text-content-primary truncate leading-tight">
          {day.session.name}
        </p>
        <span className="text-[8px] sm:text-[9px] text-content-muted block font-mono truncate">
          ~{day.session.plannedDurationMinutes}m
        </span>
      </div>

      {isQual && (
        <div className="mt-0.5 flex items-center space-x-1 text-[8px] sm:text-[9px] font-mono text-state-success font-bold">
          <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-ember shrink-0" />
          <span className="truncate">30m Goal</span>
        </div>
      )}
    </div>
  );
};

import React from "react";
import { CalendarDayInfo } from "../../utils/dateUtils";
import { useUserStore } from "../../store/useUserStore";
import { CheckCircle2, Flame } from "lucide-react";

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
      className={`
        relative cursor-pointer transition-all duration-200 select-none
        rounded-lg sm:rounded-xl border
        flex flex-col items-center justify-start
        min-h-[52px] sm:min-h-[95px]
        p-1 sm:p-2
        active:scale-95
        ${
          day.isToday
            ? "bg-volt/15 border-volt shadow-[0_0_8px_rgba(200,255,0,0.2)] ring-1 ring-volt"
            : !day.isCurrentMonth
              ? "bg-surface-base/20 border-surface-border/20 opacity-30 pointer-events-none"
              : isQual
                ? "bg-state-success/10 border-state-success/40"
                : isStarted
                  ? "bg-volt/5 border-volt/30"
                  : "bg-surface-card border-surface-border hover:border-surface-highlight hover:bg-surface-elevated/60"
        }
      `}
    >
      {/* Day Number */}
      <span
        className={`
          text-[11px] sm:text-xs font-mono font-bold leading-none mt-0.5
          ${day.isToday ? "text-volt" : "text-content-primary"}
        `}
      >
        {day.dayOfMonth}
      </span>

      {/* Status dot / icon — mobile only shows a compact indicator */}
      <div className="mt-1 flex items-center justify-center">
        {isQual ? (
          <>
            {/* Mobile: colored dot */}
            <span className="block sm:hidden w-2 h-2 rounded-full bg-state-success shadow-[0_0_4px_rgba(0,200,100,0.6)]" />
            {/* Desktop: full icon */}
            <CheckCircle2 className="hidden sm:block w-4 h-4 text-state-success fill-state-success/20" />
          </>
        ) : isStarted ? (
          <>
            {/* Mobile: volt dot */}
            <span className="block sm:hidden w-2 h-2 rounded-full bg-volt shadow-[0_0_4px_rgba(200,255,0,0.5)]" />
            {/* Desktop: minutes */}
            <span className="hidden sm:block text-[10px] font-mono font-semibold text-volt">
              {minutesCompleted}m
            </span>
          </>
        ) : (
          /* Subtle day-id dot for unstarted days */
          <span className="block sm:hidden w-1.5 h-1.5 rounded-full bg-surface-highlight/50" />
        )}
      </div>

      {/* Desktop-only: session info */}
      <div className="hidden sm:flex flex-col w-full mt-auto pt-1 min-w-0 space-y-0.5">
        <span className="text-[8px] font-mono text-volt uppercase font-semibold truncate">
          Day {day.programDayId}
        </span>
        <p className="text-[10px] sm:text-[11px] font-bold text-content-primary truncate leading-tight">
          {day.session.name}
        </p>
        <span className="text-[8px] text-content-muted font-mono truncate">
          ~{day.session.plannedDurationMinutes}m
        </span>
        {isQual && (
          <div className="flex items-center space-x-0.5 text-[8px] font-mono text-state-success font-bold">
            <Flame className="w-2.5 h-2.5 text-ember shrink-0" />
            <span>Goal</span>
          </div>
        )}
      </div>

      {/* Today ring pulse */}
      {day.isToday && (
        <span className="absolute inset-0 rounded-lg sm:rounded-xl ring-1 ring-volt/40 animate-pulse pointer-events-none" />
      )}
    </div>
  );
};

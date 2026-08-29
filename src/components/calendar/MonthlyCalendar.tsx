import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info } from 'lucide-react';
import { generateMonthCalendarDays, getMonthName, CalendarDayInfo } from '../../utils/dateUtils';
import { DayCell } from './DayCell';
import { useNavigate } from 'react-router-dom';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { useUserStore } from '../../store/useUserStore';
import { ProgramGoal } from '../../types';

const goalOptions: { id: ProgramGoal; label: string }[] = [
  { id: 'combined', label: 'Combined' },
  { id: 'stretch', label: 'Stretches' },
  { id: 'mobility', label: 'Mobility' },
];

export const MonthlyCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<CalendarDayInfo | null>(null);

  const startWorkout = useWorkoutStore((state) => state.startWorkout);
  const trainingContext = useUserStore((state) => state.trainingContext);
  const setMonthlyGoal = useUserStore((state) => state.actions.setMonthlyGoal);
  const navigate = useNavigate();

  const year = currentDate.getFullYear();
  const monthIndex = currentDate.getMonth();
  const monthGoal = useUserStore((state) => state.actions.getGoalForMonth(year, monthIndex));

  const monthDays = generateMonthCalendarDays(year, monthIndex, monthGoal);

  const prevMonth = () => {
    setCurrentDate(new Date(year, monthIndex - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, monthIndex + 1, 1));
  };

  const handleStartSession = (dayId: number) => {
    setSelectedDay(null);
    startWorkout(dayId, trainingContext, monthGoal);
    navigate('/session');
  };

  const weekDayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-4">
      {/* Month Navigator Header */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-4 space-y-3 shadow-elevated">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-volt/10 text-volt border border-volt/30 flex items-center justify-center">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-content-primary font-mono tracking-tight">
                {getMonthName(monthIndex)} {year}
              </h2>
              <p className="text-xs text-content-muted">7-Day {goalOptions.find((option) => option.id === monthGoal)?.label} rotation</p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={prevMonth}
              className="p-2 rounded-xl bg-surface-elevated border border-surface-border hover:border-volt/30 text-content-primary hover:text-volt transition-colors"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1.5 rounded-xl bg-surface-elevated border border-surface-border text-xs font-mono font-bold text-volt hover:bg-volt hover:text-surface-base transition-colors"
            >
              Today
            </button>
            <button
              onClick={nextMonth}
              className="p-2 rounded-xl bg-surface-elevated border border-surface-border hover:border-volt/30 text-content-primary hover:text-volt transition-colors"
              aria-label="Next Month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-mono text-content-muted uppercase block font-bold">Monthly program:</span>
          <div className="flex flex-wrap gap-1.5">
            {goalOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setMonthlyGoal(year, monthIndex, option.id)}
                className={`px-3 py-1 rounded-lg text-[11px] font-mono transition-all ${
                  monthGoal === option.id
                    ? 'bg-volt text-surface-base font-bold shadow-volt-sm'
                    : 'bg-surface-elevated border border-surface-border text-content-secondary hover:text-content-primary'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Rotation Info Banner */}
      <div className="bg-surface-elevated/80 border border-surface-border rounded-xl p-3 text-xs text-content-secondary flex items-start space-x-2.5">
        <Info className="w-4 h-4 text-volt flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          This month uses the {goalOptions.find((option) => option.id === monthGoal)?.label.toLowerCase()} rotation. Day 1 = Ankle/Hip, Day 2 = Shoulder/Thoracic, and so on.
        </p>
      </div>

      {/* Grid Headers */}
      <div className="grid grid-cols-7 gap-1.5 text-center">
        {weekDayHeaders.map((header) => (
          <div key={header} className="text-[11px] font-mono font-bold text-content-muted uppercase py-1">
            {header}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {monthDays.map((day, idx) => (
          <DayCell key={`${day.dateString}_${idx}`} day={day} onSelectDay={setSelectedDay} />
        ))}
      </div>

      {/* Day Modal Preview */}
      {selectedDay && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-card border border-surface-border rounded-2xl max-w-md w-full p-5 space-y-4 shadow-elevated">
            <div className="flex items-center justify-between border-b border-surface-border pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-volt uppercase">
                  {selectedDay.date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </span>
                <h3 className="text-lg font-extrabold text-content-primary">
                  Day {selectedDay.programDayId}: {selectedDay.session.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDay(null)}
                className="text-content-muted hover:text-content-primary p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p><strong className="text-content-primary">Focus:</strong> {selectedDay.session.focus}</p>
              <p><strong className="text-content-primary">Emphasis:</strong> {selectedDay.session.emphasis}</p>
              <p><strong className="text-content-primary">Total Planned Time:</strong> ~{selectedDay.session.plannedDurationMinutes} min ({selectedDay.session.deskResetMinutes}m desk reset + {selectedDay.session.mainSessionMinutes}m main)</p>
            </div>

            <div className="pt-2 flex space-x-3">
              <button
                onClick={() => handleStartSession(selectedDay.programDayId)}
                className="flex-1 py-3 bg-volt text-surface-base hover:bg-volt/90 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-volt"
              >
                START SESSION
              </button>
              <button
                onClick={() => setSelectedDay(null)}
                className="px-4 py-3 bg-surface-elevated border border-surface-border text-content-primary hover:text-volt font-bold text-xs rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

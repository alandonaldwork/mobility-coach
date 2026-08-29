import { DailySession, ProgramGoal } from '../types';
import { getWeeklySchedule } from '../data/schedules';

export interface CalendarDayInfo {
  date: Date;
  dateString: string; // YYYY-MM-DD
  dayOfMonth: number;
  programDayId: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  session: DailySession;
  isCurrentMonth: boolean;
  isToday: boolean;
  isFuture: boolean;
}

const sessionForDay = (dayId: 1 | 2 | 3 | 4 | 5 | 6 | 7, goal: ProgramGoal): DailySession => {
  const schedule = getWeeklySchedule(goal);
  return schedule.find((s) => s.dayId === dayId) || schedule[0];
};

/**
 * Calculates continuous 7-day program rotation day for any date.
 * Continuous rotation: anchor date Day 1 = Day 1 (e.g. Day 1 of month or reference epoch).
 * Per spec Section 3 & 4:
 * Day 1 = program Day 1
 * Day 2 = program Day 2
 * ...
 * Day 7 = program Day 7
 * Day 8 starts rotation again from Day 1.
 */
export const getProgramDayForDate = (date: Date): 1 | 2 | 3 | 4 | 5 | 6 | 7 => {
  const dayOfMonth = date.getDate();
  const dayId = (((dayOfMonth - 1) % 7) + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7;
  return dayId;
};

export const getSessionForDate = (date: Date, goal: ProgramGoal = 'combined'): DailySession => {
  const dayId = getProgramDayForDate(date);
  return sessionForDay(dayId, goal);
};

export const generateMonthCalendarDays = (
  year: number,
  monthIndex: number,
  goal: ProgramGoal = 'combined',
): CalendarDayInfo[] => {
  const today = new Date();
  const todayISO = today.toISOString().split('T')[0];

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, monthIndex, 1).getDay(); // 0 = Sunday

  const days: CalendarDayInfo[] = [];

  const pushDay = (d: Date, isCurrentMonth: boolean) => {
    const dateString = d.toISOString().split('T')[0];
    const programDayId = getProgramDayForDate(d);
    days.push({
      date: d,
      dateString,
      dayOfMonth: d.getDate(),
      programDayId,
      session: sessionForDay(programDayId, goal),
      isCurrentMonth,
      isToday: dateString === todayISO,
      isFuture: d > today && dateString !== todayISO,
    });
  };

  const prevMonthLastDay = new Date(year, monthIndex, 0).getDate();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    pushDay(new Date(year, monthIndex - 1, prevMonthLastDay - i), false);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    pushDay(new Date(year, monthIndex, day), true);
  }

  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    pushDay(new Date(year, monthIndex + 1, i), false);
  }

  return days;
};

export const getMonthName = (monthIndex: number): string => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return monthNames[monthIndex];
};

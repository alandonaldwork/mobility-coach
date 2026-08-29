import { WEEKLY_SCHEDULE } from '../data/weekly-mobility-schedule';
import { DailySession } from '../types';

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

export const getSessionForDate = (date: Date): DailySession => {
  const dayId = getProgramDayForDate(date);
  return WEEKLY_SCHEDULE.find((s) => s.dayId === dayId) || WEEKLY_SCHEDULE[0];
};

export const generateMonthCalendarDays = (year: number, monthIndex: number): CalendarDayInfo[] => {
  const today = new Date();
  const todayISO = today.toISOString().split('T')[0];

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, monthIndex, 1).getDay(); // 0 = Sunday

  const days: CalendarDayInfo[] = [];

  // Padding days from previous month
  const prevMonthLastDay = new Date(year, monthIndex, 0).getDate();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const d = new Date(year, monthIndex - 1, prevMonthLastDay - i);
    const dateString = d.toISOString().split('T')[0];
    const programDayId = getProgramDayForDate(d);
    days.push({
      date: d,
      dateString,
      dayOfMonth: d.getDate(),
      programDayId,
      session: WEEKLY_SCHEDULE.find((s) => s.dayId === programDayId)!,
      isCurrentMonth: false,
      isToday: dateString === todayISO,
      isFuture: d > today,
    });
  }

  // Days of current month
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, monthIndex, day);
    const dateString = d.toISOString().split('T')[0];
    const programDayId = getProgramDayForDate(d);
    days.push({
      date: d,
      dateString,
      dayOfMonth: day,
      programDayId,
      session: WEEKLY_SCHEDULE.find((s) => s.dayId === programDayId)!,
      isCurrentMonth: true,
      isToday: dateString === todayISO,
      isFuture: d > today && dateString !== todayISO,
    });
  }

  // Padding days for next month to complete grid (42 cells = 6 weeks)
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, monthIndex + 1, i);
    const dateString = d.toISOString().split('T')[0];
    const programDayId = getProgramDayForDate(d);
    days.push({
      date: d,
      dateString,
      dayOfMonth: d.getDate(),
      programDayId,
      session: WEEKLY_SCHEDULE.find((s) => s.dayId === programDayId)!,
      isCurrentMonth: false,
      isToday: dateString === todayISO,
      isFuture: d > today,
    });
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

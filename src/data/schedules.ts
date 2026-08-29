import { DailySession, ProgramGoal } from '../types';
import { COMBINED_WEEKLY_SCHEDULE } from './weekly-combined-schedule';
import { MOBILITY_WEEKLY_SCHEDULE } from './weekly-mobility-schedule';
import { STRETCH_WEEKLY_SCHEDULE } from './weekly-stretch-schedule';

export const getWeeklySchedule = (goal: ProgramGoal): DailySession[] => {
  if (goal === 'stretch') return STRETCH_WEEKLY_SCHEDULE;
  if (goal === 'mobility') return MOBILITY_WEEKLY_SCHEDULE;
  return COMBINED_WEEKLY_SCHEDULE;
};

export const monthGoalKey = (year: number, monthIndex: number): string =>
  `${year}-${String(monthIndex + 1).padStart(2, '0')}`;

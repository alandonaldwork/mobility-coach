import React from 'react';
import { Flame, Trophy, Clock, CheckCircle2, BarChart2, Calendar, Target } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';
import { WorkoutHistory } from './WorkoutHistory';

export const ProgressDashboard: React.FC = () => {
  const { currentStreak, longestStreak, dailyMinutes, completedSessions } = useUserStore();

  const totalSessionsCount = completedSessions.length;
  const totalMinutes = Object.values(dailyMinutes).reduce((acc, m) => acc + m, 0);

  const datesWithMinutes = Object.keys(dailyMinutes);
  const qualifying30MinDaysCount = Object.values(dailyMinutes).filter((m) => m >= 30).length;

  const currentMonthISO = new Date().toISOString().slice(0, 7); // "YYYY-MM"
  const currentMonthDays = datesWithMinutes.filter((d) => d.startsWith(currentMonthISO));
  const currentMonthMinutes = currentMonthDays.reduce((acc, d) => acc + (dailyMinutes[d] || 0), 0);
  const currentMonthQualCount = currentMonthDays.filter((d) => (dailyMinutes[d] || 0) >= 30).length;

  const totalDaysInCurrentMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();

  const goalSuccessRate = datesWithMinutes.length > 0
    ? Math.round((qualifying30MinDaysCount / datesWithMinutes.length) * 100)
    : 0;

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-4 space-y-1 shadow-elevated">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-volt/10 text-volt border border-volt/30 flex items-center justify-center">
            <BarChart2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-content-primary tracking-tight">
              Mobility & Recovery Analytics
            </h2>
            <p className="text-xs text-content-muted">Monthly statistics, streak history & completed sessions</p>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-surface-card border border-surface-border rounded-2xl p-4 space-y-1 shadow-card">
          <span className="text-[10px] font-mono text-content-muted uppercase flex items-center space-x-1">
            <Flame className="w-3.5 h-3.5 text-ember" />
            <span>Current Streak</span>
          </span>
          <p className="text-2xl font-black font-mono text-content-primary">{currentStreak} <span className="text-xs text-content-muted">days</span></p>
        </div>

        <div className="bg-surface-card border border-surface-border rounded-2xl p-4 space-y-1 shadow-card">
          <span className="text-[10px] font-mono text-content-muted uppercase flex items-center space-x-1">
            <Trophy className="w-3.5 h-3.5 text-state-warning" />
            <span>Longest Streak</span>
          </span>
          <p className="text-2xl font-black font-mono text-content-primary">{longestStreak} <span className="text-xs text-content-muted">days</span></p>
        </div>

        <div className="bg-surface-card border border-surface-border rounded-2xl p-4 space-y-1 shadow-card">
          <span className="text-[10px] font-mono text-content-muted uppercase flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-volt" />
            <span>Total Mobility Time</span>
          </span>
          <p className="text-2xl font-black font-mono text-volt">{totalMinutes} <span className="text-xs text-content-muted">min</span></p>
        </div>

        <div className="bg-surface-card border border-surface-border rounded-2xl p-4 space-y-1 shadow-card">
          <span className="text-[10px] font-mono text-content-muted uppercase flex items-center space-x-1">
            <Target className="w-3.5 h-3.5 text-state-success" />
            <span>Goal Success</span>
          </span>
          <p className="text-2xl font-black font-mono text-state-success">{goalSuccessRate}%</p>
        </div>
      </div>

      {/* Monthly Summary Box */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-5 space-y-4 shadow-elevated">
        <div className="flex items-center justify-between border-b border-surface-border pb-3">
          <div>
            <span className="text-[10px] font-mono text-volt uppercase font-bold">MONTHLY STATS</span>
            <h3 className="text-base font-extrabold text-content-primary">
              {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} Summary
            </h3>
          </div>
          <Calendar className="w-5 h-5 text-volt" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-surface-elevated border border-surface-border rounded-xl p-3">
            <span className="text-[10px] font-mono text-content-muted uppercase">Qualifying 30-min Days</span>
            <p className="text-xl font-bold font-mono text-state-success mt-0.5">
              {currentMonthQualCount} / {totalDaysInCurrentMonth} days
            </p>
          </div>

          <div className="bg-surface-elevated border border-surface-border rounded-xl p-3">
            <span className="text-[10px] font-mono text-content-muted uppercase">Monthly Mobility Time</span>
            <p className="text-xl font-bold font-mono text-volt mt-0.5">
              {currentMonthMinutes} min
            </p>
          </div>

          <div className="bg-surface-elevated border border-surface-border rounded-xl p-3 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono text-content-muted uppercase">Completed Sessions</span>
            <p className="text-xl font-bold font-mono text-content-primary mt-0.5">
              {totalSessionsCount} sessions
            </p>
          </div>
        </div>
      </div>

      {/* History Log */}
      <WorkoutHistory />
    </div>
  );
};

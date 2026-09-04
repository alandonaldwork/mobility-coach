import React, { useState } from 'react';
import { Flame, Trophy, Target, CheckCircle2, Share2 } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';
import { ShareStreakModal } from './ShareStreakModal';

export const StreakCard: React.FC = () => {
  const currentStreak = useUserStore((state) => state.currentStreak);
  const longestStreak = useUserStore((state) => state.longestStreak);
  const dailyMinutes = useUserStore((state) => state.dailyMinutes);

  const today = new Date().toISOString().split('T')[0];
  const todayMins = dailyMinutes[today] || 0;
  const isGoalAchieved = todayMins >= 30;
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <div className="bg-surface-card border border-surface-border rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-elevated">
      {/* Accent glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-volt/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-mono text-volt font-bold uppercase tracking-wider">
              30-MIN GOAL STREAK
            </span>
            {isGoalAchieved && (
              <span className="inline-flex items-center space-x-1 bg-state-success/10 border border-state-success/30 text-state-success text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0">
                <CheckCircle2 className="w-3 h-3" />
                <span>QUALIFIED TODAY</span>
              </span>
            )}
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-content-primary tracking-tight">
              {currentStreak}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-content-muted">
              DAYS STREAK
            </span>
          </div>
        </div>

        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-surface-elevated border border-surface-border flex items-center justify-center text-ember shadow-inner shrink-0">
          <Flame className={`w-7 h-7 sm:w-8 sm:h-8 ${currentStreak > 0 ? 'animate-pulse' : 'text-content-muted'}`} />
        </div>
      </div>

      {/* Progress towards 30-min goal */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-content-muted font-medium flex items-center space-x-1">
            <Target className="w-3.5 h-3.5 text-volt" />
            <span>Today's Goal Progress</span>
          </span>
          <span className="font-mono font-bold text-content-primary">
            {todayMins} / 30 min
          </span>
        </div>

        <div className="w-full h-2.5 bg-surface-elevated rounded-full overflow-hidden border border-surface-border">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isGoalAchieved ? 'bg-state-success shadow-volt-sm' : 'bg-volt'
            }`}
            style={{ width: `${Math.min(100, (todayMins / 30) * 100)}%` }}
          />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-surface-border flex items-center justify-between text-xs text-content-muted">
        <div className="flex items-center space-x-1.5">
          <Trophy className="w-3.5 h-3.5 text-state-warning" />
          <span>Longest: <strong className="text-content-primary font-mono">{longestStreak} days</strong></span>
        </div>
        <button onClick={() => setIsShareOpen(true)} className="inline-flex items-center gap-1.5 text-[11px] text-volt hover:text-volt/80 font-bold transition-colors" aria-label="Share your streak"><Share2 className="w-3.5 h-3.5" />Share streak</button>
      </div>
      {isShareOpen && <ShareStreakModal currentStreak={currentStreak} longestStreak={longestStreak} todayMinutes={todayMins} onClose={() => setIsShareOpen(false)} />}
    </div>
  );
};

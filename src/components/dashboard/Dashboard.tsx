import React from 'react';
import { StreakCard } from './StreakCard';
import { TodayCard } from './TodayCard';
import { WeeklyRing } from './WeeklyRing';
import { QuickActions } from './QuickActions';
import { TrainingContextSelector } from '../context/TrainingContextSelector';
import { SafetyNotice } from '../shared/SafetyNotice';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-5">
      {/* Top Banner / Streak */}
      <StreakCard />

      {/* Today's Workout Card */}
      <TodayCard />

      {/* Training Context Selector */}
      <TrainingContextSelector />

      {/* Weekly Consistency Ring */}
      <WeeklyRing />

      {/* Quick Access Routines */}
      <QuickActions />

      {/* Safety Notice */}
      <SafetyNotice message="Keep effort around 4–6/10. Static stretching should be performed AFTER training or on rest days to protect jump explosiveness." />
    </div>
  );
};

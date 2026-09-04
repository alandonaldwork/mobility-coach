import React from 'react';

export const TodayCardSkeleton: React.FC = () => {
  return (
    <div className="bg-surface-card border border-surface-border rounded-2xl p-5 space-y-4 shadow-elevated animate-pulse">
      {/* Header line */}
      <div className="flex items-center justify-between">
        <div className="space-y-2 flex-1 pr-4">
          <div className="h-3.5 bg-surface-elevated rounded-md w-1/3"></div>
          <div className="h-6 bg-surface-elevated rounded-lg w-2/3"></div>
          <div className="h-3 bg-surface-elevated rounded-md w-1/4"></div>
        </div>
        <div className="w-12 h-12 bg-surface-elevated rounded-xl"></div>
      </div>

      {/* Adaptive banner skeleton */}
      <div className="bg-surface-elevated/70 border border-surface-border rounded-xl p-3 space-y-2">
        <div className="h-4 bg-surface-border rounded w-1/2"></div>
        <div className="h-3 bg-surface-border rounded w-5/6"></div>
      </div>

      {/* Grid stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="h-14 bg-surface-elevated rounded-xl p-3 space-y-1.5">
          <div className="h-2.5 bg-surface-border rounded w-1/3"></div>
          <div className="h-4 bg-surface-border rounded w-2/3"></div>
        </div>
        <div className="h-14 bg-surface-elevated rounded-xl p-3 space-y-1.5">
          <div className="h-2.5 bg-surface-border rounded w-1/3"></div>
          <div className="h-4 bg-surface-border rounded w-2/3"></div>
        </div>
      </div>

      {/* Summary lines */}
      <div className="bg-surface-elevated/50 border border-surface-border rounded-xl p-3 space-y-2">
        <div className="flex justify-between">
          <div className="h-3 bg-surface-border rounded w-1/3"></div>
          <div className="h-3 bg-surface-border rounded w-1/6"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-3 bg-surface-border rounded w-1/3"></div>
          <div className="h-3 bg-surface-border rounded w-1/6"></div>
        </div>
      </div>

      {/* Button */}
      <div className="h-12 bg-volt/30 rounded-xl w-full"></div>
    </div>
  );
};

export const DailyWorkoutSkeleton: React.FC = () => {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="bg-surface-card border border-surface-border rounded-3xl p-6 space-y-4 shadow-elevated">
        <div className="flex items-center justify-between">
          <div className="h-6 bg-surface-elevated rounded-full w-32"></div>
          <div className="h-4 bg-surface-elevated rounded w-20"></div>
        </div>
        <div className="h-8 bg-surface-elevated rounded-xl w-3/4"></div>
        <div className="h-4 bg-surface-elevated rounded w-1/2"></div>
        <div className="h-20 bg-surface-elevated rounded-2xl"></div>
        <div className="h-12 bg-volt/30 rounded-2xl w-full"></div>
      </div>

      <div className="space-y-2">
        <div className="h-4 bg-surface-elevated rounded w-48 mb-3"></div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 bg-surface-card border border-surface-border rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-7 h-7 rounded-lg bg-surface-elevated"></div>
              <div className="space-y-1.5 flex-1 pr-4">
                <div className="h-4 bg-surface-elevated rounded w-1/2"></div>
                <div className="h-3 bg-surface-elevated rounded w-1/3"></div>
              </div>
            </div>
            <div className="w-16 h-5 bg-surface-elevated rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { Clock, Zap, Calendar, BookOpen, Activity, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWorkoutStore } from '../../store/useWorkoutStore';

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  const startDeskReset = useWorkoutStore((state) => state.startDeskResetStandalone);
  const startMED = useWorkoutStore((state) => state.startMEDStandalone);

  const handleStartDeskReset = () => {
    startDeskReset();
    navigate('/session');
  };

  const handleStartMED = () => {
    startMED();
    navigate('/session');
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-mono font-bold text-content-primary uppercase tracking-wider">
        QUICK ACCESS ROUTINES
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* 5-Min Desk Reset */}
        <div
          onClick={handleStartDeskReset}
          className="bg-surface-card border border-surface-border hover:border-volt/40 rounded-2xl p-4 cursor-pointer transition-all hover:bg-surface-elevated group flex items-start justify-between"
        >
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-volt/10 text-volt border border-volt/30 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-volt uppercase font-mono">5-MIN DESK RESET</span>
            </div>
            <h4 className="text-sm font-bold text-content-primary group-hover:text-volt transition-colors">
              Workday Desk Break
            </h4>
            <p className="text-xs text-content-muted leading-relaxed">
              No equipment needed. Repeatable 5-min routine for posture, thoracic, & hip flexors.
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-content-muted group-hover:text-volt transition-colors flex-shrink-0 mt-2" />
        </div>

        {/* Minimum Effective Dose */}
        <div
          onClick={handleStartMED}
          className="bg-surface-card border border-surface-border hover:border-ember/40 rounded-2xl p-4 cursor-pointer transition-all hover:bg-surface-elevated group flex items-start justify-between"
        >
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-ember/10 text-ember border border-ember/30 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-ember uppercase font-mono">8–9 MIN EXPRESS</span>
            </div>
            <h4 className="text-sm font-bold text-content-primary group-hover:text-ember transition-colors">
              Minimum Effective Dose
            </h4>
            <p className="text-xs text-content-muted leading-relaxed">
              For jammed days. 8 active movements covering all 7 sport joint regions.
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-content-muted group-hover:text-ember transition-colors flex-shrink-0 mt-2" />
        </div>
      </div>

      {/* Navigation Shortcut Grid */}
      <div className="grid grid-cols-3 gap-2.5 pt-1">
        <button
          onClick={() => navigate('/calendar')}
          className="bg-surface-card border border-surface-border hover:border-surface-highlight p-3 rounded-xl flex flex-col items-center justify-center text-center space-y-1 hover:bg-surface-elevated transition-colors"
        >
          <Calendar className="w-5 h-5 text-volt" />
          <span className="text-xs font-semibold text-content-primary">Calendar</span>
        </button>

        <button
          onClick={() => navigate('/library')}
          className="bg-surface-card border border-surface-border hover:border-surface-highlight p-3 rounded-xl flex flex-col items-center justify-center text-center space-y-1 hover:bg-surface-elevated transition-colors"
        >
          <BookOpen className="w-5 h-5 text-volt" />
          <span className="text-xs font-semibold text-content-primary">32 Library</span>
        </button>

        <button
          onClick={() => navigate('/assessments')}
          className="bg-surface-card border border-surface-border hover:border-surface-highlight p-3 rounded-xl flex flex-col items-center justify-center text-center space-y-1 hover:bg-surface-elevated transition-colors"
        >
          <Activity className="w-5 h-5 text-volt" />
          <span className="text-xs font-semibold text-content-primary">Assessment</span>
        </button>
      </div>
    </div>
  );
};

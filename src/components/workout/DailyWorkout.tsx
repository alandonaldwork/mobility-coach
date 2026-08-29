import React from 'react';
import { Play, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DailySession } from '../../types';
import { getExerciseById } from '../../data/exercise-catalog';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { TrainingContextSelector } from '../context/TrainingContextSelector';
import { SafetyNotice } from '../shared/SafetyNotice';

interface DailyWorkoutProps {
  session: DailySession;
  onBack?: () => void;
}

export const DailyWorkout: React.FC<DailyWorkoutProps> = ({ session, onBack }) => {
  const navigate = useNavigate();
  const setPlayerState = useWorkoutStore.setState;

  const handleStartSession = () => {
    setPlayerState({ playerState: 'exercise' });
    navigate('/session');
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs font-mono text-content-muted hover:text-volt transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      )}

      {/* Session Header */}
      <div className="bg-surface-card border border-surface-border rounded-3xl p-6 space-y-3 shadow-elevated">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-volt uppercase tracking-wider bg-volt/10 border border-volt/30 px-3 py-1 rounded-full">
            Day {session.dayId} Rotation
          </span>
          <span className="text-xs font-mono text-content-muted">
            Total ~{session.plannedDurationMinutes} min
          </span>
        </div>

        <h2 className="text-2xl font-black text-content-primary">
          {session.name}
        </h2>

        <p className="text-xs text-content-secondary leading-relaxed">
          <strong className="text-content-primary">Focus:</strong> {session.focus} — {session.emphasis}
        </p>

        <div className="pt-2">
          <button
            onClick={handleStartSession}
            className="w-full py-4 bg-volt text-surface-base hover:bg-volt/90 font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-volt flex items-center justify-center space-x-2"
          >
            <Play className="w-5 h-5 fill-surface-base" />
            <span>START SESSION NOW</span>
          </button>
        </div>
      </div>

      {/* Context Selector */}
      <TrainingContextSelector />

      {/* Exercise List */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono font-bold text-content-primary uppercase tracking-wider">
          PRESCRIBED EXERCISE SEQUENCE ({session.exercises.length} EXERCISES)
        </h3>

        <div className="space-y-2">
          {session.exercises.map((se, idx) => {
            const exDetails = getExerciseById(se.exerciseId);
            if (!exDetails) return null;

            return (
              <div
                key={`${se.exerciseId}_${idx}`}
                className="bg-surface-card border border-surface-border rounded-xl p-3.5 flex items-center justify-between hover:border-surface-highlight transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-surface-elevated text-volt font-mono font-bold text-xs flex items-center justify-center border border-surface-border">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-content-primary">{exDetails.name}</h4>
                    <p className="text-[11px] text-content-muted font-mono">{se.dose}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    exDetails.type === 'Passive'
                      ? 'bg-ember/10 border border-ember/30 text-ember'
                      : 'bg-volt/10 border border-volt/30 text-volt'
                  }`}>
                    {exDetails.type}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <SafetyNotice />
    </div>
  );
};

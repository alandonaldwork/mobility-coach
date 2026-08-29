import React from 'react';
import { Settings, Dumbbell, Trash2, CheckCircle2 } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { ProgramGoal } from '../types';

const goalOptions: { id: ProgramGoal; label: string; description: string }[] = [
  { id: 'combined', label: 'Combined', description: 'A balanced mix of stretches and active mobility.' },
  { id: 'stretch', label: 'Stretches', description: 'Hold-based flexibility and recovery sessions.' },
  { id: 'mobility', label: 'Mobility', description: 'Active range, control, and movement sessions.' },
];

export const SettingsPage: React.FC = () => {
  const { equipmentPreferences, actions } = useUserStore();
  const [showResetConfirm, setShowResetConfirm] = React.useState(false);
  const today = new Date();
  const currentGoal = actions.getGoalForMonth(today.getFullYear(), today.getMonth());

  const toggleEquipment = (key: keyof typeof equipmentPreferences) => {
    actions.updateEquipmentPreferences({ [key]: !equipmentPreferences[key] });
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="bg-surface-card border border-surface-border rounded-2xl p-4 space-y-1 shadow-elevated">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-volt/10 text-volt border border-volt/30 flex items-center justify-center">
            <Settings className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-content-primary tracking-tight">
              Settings & Equipment Preferences
            </h2>
            <p className="text-xs text-content-muted font-sans">Configure available gear & manage local storage</p>
          </div>
        </div>
      </div>

      <div className="bg-surface-card border border-surface-border rounded-2xl p-5 space-y-3 shadow-elevated">
        <div>
          <h3 className="text-xs font-mono font-bold text-volt uppercase">This Month's Program</h3>
          <p className="text-xs text-content-muted mt-1">
            Choose the rotation used for {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {goalOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => actions.setMonthlyGoal(today.getFullYear(), today.getMonth(), option.id)}
              className={`text-left p-3 rounded-xl border transition-all ${
                currentGoal === option.id
                  ? 'bg-volt/10 border-volt/50 text-content-primary'
                  : 'bg-surface-elevated border-surface-border text-content-secondary hover:border-volt/30'
              }`}
            >
              <span className="text-xs font-bold block">{option.label}</span>
              <span className="text-[11px] text-content-muted leading-relaxed block mt-0.5">{option.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Equipment Toggles */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-5 space-y-3 shadow-elevated">
        <h3 className="text-xs font-mono font-bold text-volt uppercase">Equipment On Hand</h3>
        <p className="text-xs text-content-muted">Toggle gear to automatically show substitution options during workouts.</p>

        <div className="space-y-2 pt-1">
          {[
            { key: 'hasBand', label: 'Resistance Band', desc: 'Used for Band Pull-Aparts & ER 90/90' },
            { key: 'hasRoller', label: 'Foam Roller', desc: 'Used for Thoracic Extension & SMR' },
            { key: 'hasWall', label: 'Wall / Doorframe', desc: 'Used for Ankle Mobilizations & Scapular Slides' },
            { key: 'hasMat', label: 'Floor Mat', desc: 'Used for 90/90 Switches & Couch Stretch' },
          ].map((item) => {
            const isChecked = equipmentPreferences[item.key as keyof typeof equipmentPreferences];
            return (
              <div
                key={item.key}
                onClick={() => toggleEquipment(item.key as keyof typeof equipmentPreferences)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-surface-elevated border-volt/30 text-content-primary'
                    : 'bg-surface-base border-surface-border text-content-muted'
                }`}
              >
                <div className="space-y-0.5">
                  <span className="text-xs font-bold block">{item.label}</span>
                  <span className="text-[11px] text-content-muted">{item.desc}</span>
                </div>
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                  isChecked ? 'bg-volt border-volt text-surface-base' : 'border-surface-border'
                }`}>
                  {isChecked && <CheckCircle2 className="w-4 h-4" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-5 space-y-3 shadow-elevated">
        <h3 className="text-xs font-mono font-bold text-ember uppercase">Data & Persistence</h3>
        <p className="text-xs text-content-muted">Your streaks, assessment logs, and workout history are stored locally in your browser.</p>

        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full py-3 bg-surface-elevated border border-ember/30 text-ember hover:bg-ember/10 font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>RESET ALL PROGRESS & HISTORY</span>
          </button>
        ) : (
          <div className="bg-ember/10 border border-ember/30 rounded-xl p-3.5 space-y-2 text-center">
            <p className="text-xs text-ember font-bold">Are you sure? This will delete all streaks and session logs.</p>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  actions.resetAllProgress();
                  setShowResetConfirm(false);
                }}
                className="flex-1 py-2 bg-ember text-white font-bold text-xs rounded-lg"
              >
                Yes, Reset Everything
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2 bg-surface-elevated border border-surface-border text-content-primary font-bold text-xs rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

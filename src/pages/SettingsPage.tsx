import React from 'react';
import { Settings, Dumbbell, Trash2, CheckCircle2, Activity, ArrowRight, ClipboardCheck, Sun, Moon, Volume2, VolumeX, Mic, MicOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';
import { useTheme } from '../hooks/useTheme';
import { ProgramGoal } from '../types';
import { speechService } from '../audio/speech';

const goalOptions: { id: ProgramGoal; label: string; description: string }[] = [
  { id: 'combined', label: 'Combined', description: 'A balanced mix of stretches and active mobility.' },
  { id: 'stretch', label: 'Stretches', description: 'Hold-based flexibility and recovery sessions.' },
  { id: 'mobility', label: 'Mobility', description: 'Active range, control, and movement sessions.' },
];

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { equipmentPreferences, assessmentRecords, audioPreferences, actions } = useUserStore();
  const [showResetConfirm, setShowResetConfirm] = React.useState(false);
  const [availableVoices, setAvailableVoices] = React.useState<SpeechSynthesisVoice[]>([]);
  const today = new Date();
  const currentGoal = actions.getGoalForMonth(today.getFullYear(), today.getMonth());

  React.useEffect(() => {
    const loadVoices = () => {
      const voices = speechService.getVoices().filter(v => v.lang.startsWith('en'));
      setAvailableVoices(voices);
    };
    loadVoices();
    window.speechSynthesis?.addEventListener('voiceschanged', loadVoices);
    return () => window.speechSynthesis?.removeEventListener('voiceschanged', loadVoices);
  }, []);

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
              Settings & Configuration
            </h2>
            <p className="text-xs text-content-muted font-sans">Configure visual theme, gear, self-assessments & local storage</p>
          </div>
        </div>
      </div>

      {/* Theme / Appearance Section */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-5 space-y-3 shadow-elevated">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-xs font-mono font-bold text-volt uppercase">Appearance & Theme</h3>
            <p className="text-xs text-content-muted">Choose your preferred visual mode for mobility and recovery sessions.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`p-3.5 rounded-xl border flex items-center justify-between transition-all text-left ${
              theme === 'dark'
                ? 'bg-volt/10 border-volt/50 shadow-volt-sm text-content-primary'
                : 'bg-surface-elevated border-surface-border text-content-muted hover:border-volt/30'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-surface-base border border-surface-border flex items-center justify-center text-volt">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block text-content-primary">Dark Theme</span>
                <span className="text-[11px] text-content-muted">Athletic black & electric volt (Default)</span>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
              theme === 'dark' ? 'bg-volt border-volt text-surface-base' : 'border-surface-border'
            }`}>
              {theme === 'dark' && <CheckCircle2 className="w-4 h-4" />}
            </div>
          </button>

          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`p-3.5 rounded-xl border flex items-center justify-between transition-all text-left ${
              theme === 'light'
                ? 'bg-volt/10 border-volt/50 shadow-volt-sm text-content-primary'
                : 'bg-surface-elevated border-surface-border text-content-muted hover:border-volt/30'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-surface-base border border-surface-border flex items-center justify-center text-ember">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block text-content-primary">Light Theme</span>
                <span className="text-[11px] text-content-muted">Clean high-contrast daytime mode</span>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
              theme === 'light' ? 'bg-volt border-volt text-surface-base' : 'border-surface-border'
            }`}>
              {theme === 'light' && <CheckCircle2 className="w-4 h-4" />}
            </div>
          </button>
        </div>
      </div>

      {/* Audio & Voice Section */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-5 space-y-4 shadow-elevated">
        <div className="space-y-0.5">
          <h3 className="text-xs font-mono font-bold text-volt uppercase">Audio & Voice</h3>
          <p className="text-xs text-content-muted">Control spoken announcements and audio chimes during sessions.</p>
        </div>

        {/* Toggles row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Audio Chimes toggle */}
          <div
            onClick={() => actions.updateAudioPreferences({ audioEnabled: !audioPreferences.audioEnabled })}
            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              audioPreferences.audioEnabled
                ? 'bg-surface-elevated border-volt/30 text-content-primary'
                : 'bg-surface-base border-surface-border text-content-muted'
            }`}
          >
            <div className="flex items-center gap-2">
              {audioPreferences.audioEnabled
                ? <Volume2 className="w-4 h-4 text-volt" />
                : <VolumeX className="w-4 h-4" />}
              <span className="text-xs font-bold">Chimes</span>
            </div>
            <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
              audioPreferences.audioEnabled ? 'bg-volt border-volt text-surface-base' : 'border-surface-border'
            }`}>
              {audioPreferences.audioEnabled && <CheckCircle2 className="w-4 h-4" />}
            </div>
          </div>

          {/* Voice toggle */}
          <div
            onClick={() => actions.updateAudioPreferences({ voiceEnabled: !audioPreferences.voiceEnabled })}
            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              audioPreferences.voiceEnabled
                ? 'bg-surface-elevated border-volt/30 text-content-primary'
                : 'bg-surface-base border-surface-border text-content-muted'
            }`}
          >
            <div className="flex items-center gap-2">
              {audioPreferences.voiceEnabled
                ? <Mic className="w-4 h-4 text-volt" />
                : <MicOff className="w-4 h-4" />}
              <span className="text-xs font-bold">Voice</span>
            </div>
            <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
              audioPreferences.voiceEnabled ? 'bg-volt border-volt text-surface-base' : 'border-surface-border'
            }`}>
              {audioPreferences.voiceEnabled && <CheckCircle2 className="w-4 h-4" />}
            </div>
          </div>
        </div>

        {/* Speech Rate Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-content-primary">Speech Rate</span>
            <span className="text-xs font-mono text-volt">{audioPreferences.speechRate.toFixed(1)}×</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.1"
            value={audioPreferences.speechRate}
            onChange={(e) => actions.updateAudioPreferences({ speechRate: parseFloat(e.target.value) })}
            className="w-full accent-volt"
          />
          <div className="flex justify-between text-[10px] font-mono text-content-muted">
            <span>0.5× Slow</span>
            <span>1.5× Fast</span>
          </div>
        </div>

        {/* Voice Selector */}
        {availableVoices.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-content-primary block">Voice</span>
            <select
              value={audioPreferences.selectedVoiceName ?? ''}
              onChange={(e) => actions.updateAudioPreferences({ selectedVoiceName: e.target.value || null })}
              className="w-full bg-surface-elevated border border-surface-border rounded-xl px-3 py-2 text-xs text-content-primary focus:outline-none focus:border-volt"
            >
              <option value="">System Default</option>
              {availableVoices.map((v) => (
                <option key={v.name} value={v.name}>{v.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Mobility Assessment Navigation Card */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-5 space-y-3 shadow-elevated">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center space-x-2">
              <h3 className="text-xs font-mono font-bold text-volt uppercase">Mobility Self-Assessments</h3>
              <span className="bg-volt/10 text-volt border border-volt/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                {assessmentRecords.length} LOGS
              </span>
            </div>
            <p className="text-xs text-content-muted">
              Bi-weekly joint symmetry & range of motion tests (Ankle, Hip, Thoracic & Shoulder).
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/assessments')}
          className="w-full py-3.5 bg-volt/10 border border-volt/40 hover:bg-volt hover:text-surface-base text-volt font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-volt-sm flex items-center justify-center space-x-2 group"
        >
          <ClipboardCheck className="w-4 h-4" />
          <span>OPEN MOBILITY ASSESSMENTS & LOGS</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
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

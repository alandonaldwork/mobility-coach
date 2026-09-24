import React, { useState, useMemo } from 'react';
import {
  ListPlus,
  Search,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Play,
  Save,
  BookOpen,
  Heart,
  Clock,
  RotateCcw,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { UNIFIED_LIBRARY } from '../data/exercise-catalog';
import { Exercise, SessionExercise, ExerciseType } from '../types';
import { useUserStore } from '../store/useUserStore';
import { useWorkoutStore } from '../store/useWorkoutStore';

type BuilderTab = 'build' | 'edit' | 'saved';

const regionOptions = ['all', 'ankle', 'hip', 'thoracic', 'shoulder', 'neck', 'wrist', 'full-body'];

function makeTrayItem(ex: Exercise): SessionExercise {
  return {
    exerciseId: ex.id,
    startTime: '00:00',
    durationSeconds: ex.durationSeconds ?? 45,
    dose: ex.defaultDose,
    type: ex.type as ExerciseType,
  };
}

export const CustomRoutineBuilderPage: React.FC = () => {
  const [tab, setTab] = useState<BuilderTab>('build');
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [tray, setTray] = useState<SessionExercise[]>([]);
  const [routineName, setRoutineName] = useState('');

  const { favoriteExerciseIds, customRoutines, actions } = useUserStore();
  const { startCustomReliefSession } = useWorkoutStore();

  // ── Filtered exercise list ──────────────────────────────────────
  const filtered = useMemo(() => {
    return UNIFIED_LIBRARY.filter((ex) => {
      const matchSearch =
        search === '' ||
        ex.name.toLowerCase().includes(search.toLowerCase()) ||
        ex.target.toLowerCase().includes(search.toLowerCase());
      const matchRegion = selectedRegion === 'all' || ex.region === selectedRegion;
      return matchSearch && matchRegion;
    });
  }, [search, selectedRegion]);

  // ── Tray helpers ────────────────────────────────────────────────
  const addToTray = (ex: Exercise) => {
    setTray((prev) => [...prev, makeTrayItem(ex)]);
  };

  const removeFromTray = (idx: number) => {
    setTray((prev) => prev.filter((_, i) => i !== idx));
  };

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    setTray((prev) => {
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  };

  const moveDown = (idx: number) => {
    setTray((prev) => {
      if (idx >= prev.length - 1) return prev;
      const next = [...prev];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
  };

  const updateDuration = (idx: number, val: number) => {
    setTray((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, durationSeconds: val } : item))
    );
  };

  const updateDose = (idx: number, val: string) => {
    setTray((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, dose: val } : item))
    );
  };

  const totalSeconds = tray.reduce((sum, t) => sum + t.durationSeconds, 0);
  const totalMinutes = Math.round(totalSeconds / 60);

  // ── Start session helper ────────────────────────────────────────
  const startNow = (exercises: SessionExercise[]) => {
    startCustomReliefSession({
      dayId: 7,
      name: routineName || 'Custom Routine',
      focus: 'Custom',
      emphasis: 'User-built',
      plannedDurationMinutes: Math.ceil(exercises.reduce((s, e) => s + e.durationSeconds, 0) / 60),
      deskResetMinutes: 0,
      mainSessionMinutes: Math.ceil(exercises.reduce((s, e) => s + e.durationSeconds, 0) / 60),
      exercises,
    });
  };

  const saveRoutine = () => {
    if (tray.length === 0) return;
    actions.saveCustomRoutine({
      name: routineName.trim() || 'My Routine',
      exercises: tray,
    });
    setTray([]);
    setRoutineName('');
    setTab('saved');
  };

  // ── Tabs definition ─────────────────────────────────────────────
  const tabs: { id: BuilderTab; label: string; icon: React.ReactNode }[] = [
    { id: 'build', label: 'Browse', icon: <Search className="w-3.5 h-3.5" /> },
    {
      id: 'edit',
      label: `Build ${tray.length > 0 ? `(${tray.length})` : ''}`,
      icon: <ListPlus className="w-3.5 h-3.5" />,
    },
    {
      id: 'saved',
      label: `Saved (${customRoutines.length})`,
      icon: <BookOpen className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="bg-surface-card border border-surface-border rounded-3xl p-4 sm:p-5 space-y-1 shadow-elevated overflow-hidden relative">
        <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-volt/5 blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3 relative">
          <div className="w-11 h-11 rounded-2xl bg-volt/10 text-volt border border-volt/30 flex items-center justify-center shadow-volt-sm">
            <ListPlus className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] font-bold text-volt block">
              Custom Workout
            </span>
            <h2 className="text-xl font-extrabold text-content-primary tracking-tight">
              Routine Builder
            </h2>
            <p className="text-xs text-content-muted mt-0.5">
              Hand-pick exercises, set durations, and start your session.
            </p>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex gap-2 bg-surface-elevated border border-surface-border rounded-2xl p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-[11px] font-mono font-bold transition-all ${
              tab === t.id
                ? 'bg-volt text-surface-base shadow-volt-sm'
                : 'text-content-muted hover:text-content-primary'
            }`}
          >
            {t.icon}
            <span className="truncate">{t.label}</span>
          </button>
        ))}
      </div>

      {/* ── TAB: Build (Browse Exercises) ───────────────────────── */}
      {tab === 'build' && (
        <div className="space-y-4 animate-fade-in">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-content-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search exercises..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-card border border-surface-border rounded-2xl pl-11 pr-4 py-3 text-xs text-content-primary placeholder-content-muted focus:outline-none focus:border-volt focus:ring-2 focus:ring-volt/10 transition-all"
            />
          </div>

          {/* Region filter */}
          <div className="flex flex-wrap gap-1.5">
            {regionOptions.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono capitalize transition-all ${
                  selectedRegion === r
                    ? 'bg-volt text-surface-base font-bold'
                    : 'bg-surface-elevated border border-surface-border text-content-secondary hover:border-volt/30'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Tray summary bar */}
          {tray.length > 0 && (
            <div className="flex items-center justify-between bg-volt/10 border border-volt/30 rounded-2xl px-4 py-3">
              <span className="text-xs font-mono font-bold text-volt">
                {tray.length} exercise{tray.length !== 1 ? 's' : ''} · ~{totalMinutes} min
              </span>
              <button
                onClick={() => setTab('edit')}
                className="text-[11px] font-mono font-bold text-surface-base bg-volt px-3 py-1.5 rounded-xl shadow-volt-sm hover:bg-volt/90 transition-colors"
              >
                Edit Routine →
              </button>
            </div>
          )}

          {/* Exercise list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map((ex) => {
              const isFav = favoriteExerciseIds.includes(ex.id);
              const inTray = tray.some((t) => t.exerciseId === ex.id);
              return (
                <div
                  key={`${ex.libraryTag}-${ex.id}`}
                  className="bg-surface-card border border-surface-border rounded-2xl p-3.5 space-y-2 shadow-card"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] font-mono font-bold text-volt uppercase bg-volt/10 border border-volt/20 px-2 py-0.5 rounded-md">
                          {ex.region}
                        </span>
                        {isFav && <Heart className="w-3 h-3 fill-ember text-ember shrink-0" />}
                      </div>
                      <h3 className="text-sm font-bold text-content-primary leading-snug">{ex.name}</h3>
                      <p className="text-[11px] text-content-muted font-mono mt-0.5">{ex.defaultDose}</p>
                    </div>
                    <button
                      onClick={() => addToTray(ex)}
                      title="Add to routine"
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all border ${
                        inTray
                          ? 'bg-volt/20 border-volt/40 text-volt'
                          : 'bg-surface-elevated border-surface-border text-content-muted hover:border-volt hover:text-volt hover:bg-volt/10'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── TAB: Edit (Arrange & Configure) ─────────────────────── */}
      {tab === 'edit' && (
        <div className="space-y-4 animate-fade-in">
          {/* Routine name */}
          <div className="relative">
            <Sparkles className="w-4 h-4 text-volt absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Name your routine (e.g. Morning Hip Flow)"
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
              className="w-full bg-surface-card border border-surface-border rounded-2xl pl-11 pr-4 py-3 text-xs text-content-primary placeholder-content-muted focus:outline-none focus:border-volt focus:ring-2 focus:ring-volt/10 transition-all font-bold"
            />
          </div>

          {tray.length === 0 ? (
            <div className="bg-surface-card border border-surface-border rounded-2xl p-10 text-center space-y-3">
              <ListPlus className="w-10 h-10 text-content-muted mx-auto" />
              <p className="text-xs text-content-muted">No exercises yet.</p>
              <button
                onClick={() => setTab('build')}
                className="text-xs font-mono font-bold text-volt hover:underline"
              >
                Browse exercises →
              </button>
            </div>
          ) : (
            <>
              {/* Stats bar */}
              <div className="flex items-center gap-3 text-xs font-mono text-content-muted px-1">
                <span className="flex items-center gap-1.5"><ListPlus className="w-3.5 h-3.5 text-volt" />{tray.length} exercises</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-volt" />~{totalMinutes} min</span>
              </div>

              {/* Reorderable exercise list */}
              <div className="space-y-2">
                {tray.map((item, idx) => {
                  const ex = UNIFIED_LIBRARY.find((e) => e.id === item.exerciseId);
                  if (!ex) return null;
                  return (
                    <div
                      key={`${item.exerciseId}-${idx}`}
                      className="bg-surface-card border border-surface-border rounded-2xl p-3 space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        {/* Order controls */}
                        <div className="flex flex-col gap-0.5">
                          <button
                            onClick={() => moveUp(idx)}
                            disabled={idx === 0}
                            className="w-6 h-6 flex items-center justify-center rounded-lg text-content-muted hover:text-volt transition-colors disabled:opacity-30"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => moveDown(idx)}
                            disabled={idx === tray.length - 1}
                            className="w-6 h-6 flex items-center justify-center rounded-lg text-content-muted hover:text-volt transition-colors disabled:opacity-30"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Step number */}
                        <span className="w-6 h-6 rounded-full bg-volt/10 text-volt border border-volt/30 flex items-center justify-center text-[10px] font-mono font-black shrink-0">
                          {idx + 1}
                        </span>

                        {/* Name */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-content-primary truncate">{ex.name}</p>
                          <p className="text-[10px] text-content-muted font-mono capitalize">{ex.region} · {ex.type}</p>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromTray(idx)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-content-muted hover:text-ember transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Duration + Dose edits */}
                      <div className="grid grid-cols-2 gap-2 pl-14">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-content-muted uppercase block">Duration (sec)</label>
                          <input
                            type="number"
                            min="5"
                            max="300"
                            value={item.durationSeconds}
                            onChange={(e) => updateDuration(idx, parseInt(e.target.value) || 30)}
                            className="w-full bg-surface-elevated border border-surface-border rounded-xl px-3 py-1.5 text-xs text-content-primary focus:outline-none focus:border-volt font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-content-muted uppercase block">Dose label</label>
                          <input
                            type="text"
                            value={item.dose}
                            onChange={(e) => updateDose(idx, e.target.value)}
                            className="w-full bg-surface-elevated border border-surface-border rounded-xl px-3 py-1.5 text-xs text-content-primary focus:outline-none focus:border-volt"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={saveRoutine}
                  className="flex-1 py-3.5 bg-surface-elevated border border-volt/40 text-volt font-extrabold text-xs uppercase tracking-wider rounded-2xl hover:bg-volt/10 transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Routine
                </button>
                <button
                  onClick={() => startNow(tray)}
                  className="flex-1 py-3.5 bg-volt text-surface-base font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-volt hover:bg-volt/90 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-surface-base" />
                  Start Now
                </button>
              </div>

              <button
                onClick={() => { if (window.confirm('Clear the current routine?')) setTray([]); }}
                className="w-full text-[11px] font-mono text-content-muted hover:text-ember transition-colors flex items-center justify-center gap-1.5 py-1"
              >
                <RotateCcw className="w-3 h-3" />
                Clear all
              </button>
            </>
          )}
        </div>
      )}

      {/* ── TAB: Saved Routines ──────────────────────────────────── */}
      {tab === 'saved' && (
        <div className="space-y-3 animate-fade-in">
          {customRoutines.length === 0 ? (
            <div className="bg-surface-card border border-surface-border rounded-2xl p-10 text-center space-y-3">
              <BookOpen className="w-10 h-10 text-content-muted mx-auto" />
              <p className="text-sm font-bold text-content-primary">No saved routines yet</p>
              <p className="text-xs text-content-muted">Build and save a routine to see it here.</p>
              <button
                onClick={() => setTab('build')}
                className="text-xs font-mono font-bold text-volt hover:underline"
              >
                Start building →
              </button>
            </div>
          ) : (
            customRoutines.map((routine) => {
              const totalSec = routine.exercises.reduce((s, e) => s + e.durationSeconds, 0);
              const totalMin = Math.round(totalSec / 60);
              return (
                <div
                  key={routine.id}
                  className="bg-surface-card border border-surface-border rounded-2xl p-4 space-y-3 shadow-card"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-extrabold text-content-primary">{routine.name}</h3>
                      <div className="flex items-center gap-3 mt-1 text-[11px] font-mono text-content-muted">
                        <span className="flex items-center gap-1"><ListPlus className="w-3 h-3 text-volt" />{routine.exercises.length} exercises</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-volt" />~{totalMin} min</span>
                      </div>
                    </div>
                    <button
                      onClick={() => { if (window.confirm('Delete this routine?')) actions.deleteCustomRoutine(routine.id); }}
                      className="w-8 h-8 flex items-center justify-center rounded-xl text-content-muted hover:text-ember hover:bg-ember/10 transition-all border border-surface-border"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Exercise chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {routine.exercises.slice(0, 5).map((item, i) => {
                      const ex = UNIFIED_LIBRARY.find((e) => e.id === item.exerciseId);
                      return (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-surface-elevated border border-surface-border text-content-secondary truncate max-w-[140px]"
                        >
                          {ex?.name ?? `#${item.exerciseId}`}
                        </span>
                      );
                    })}
                    {routine.exercises.length > 5 && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-volt/10 border border-volt/20 text-volt">
                        +{routine.exercises.length - 5} more
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => startNow(routine.exercises)}
                    className="w-full py-3 bg-volt text-surface-base font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-volt hover:bg-volt/90 transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-surface-base" />
                    Start Routine
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

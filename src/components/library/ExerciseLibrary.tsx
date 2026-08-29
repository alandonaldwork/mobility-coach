import React, { useState } from 'react';
import { Search, Filter, BookOpen, ChevronRight } from 'lucide-react';
import { EXERCISE_LIBRARY } from '../../data/exercise-library';
import { Exercise, BodyRegion, ExerciseType } from '../../types';
import { ExerciseDetailModal } from './ExerciseDetailModal';

export const ExerciseLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);

  const regions = ['all', 'ankle', 'hip', 'thoracic', 'shoulder', 'neck', 'wrist', 'full-body'];
  const types = ['all', 'Active', 'Dynamic', 'Activation', 'Passive', 'SMR', 'Breathing'];

  const filteredExercises = EXERCISE_LIBRARY.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.whyItMatters.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRegion = selectedRegion === 'all' || ex.region === selectedRegion;
    const matchesType = selectedType === 'all' || ex.type === selectedType;

    return matchesSearch && matchesRegion && matchesType;
  });

  return (
    <div className="space-y-4">
      {/* Search Header */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-4 space-y-3 shadow-elevated">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-volt/10 text-volt border border-volt/30 flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-content-primary tracking-tight">
              32-Exercise Master Library
            </h2>
            <p className="text-xs text-content-muted">Source-program technique references & doses</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-content-muted absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search exercises, targets, or volleyball benefits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-elevated border border-surface-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-content-primary placeholder-content-muted focus:outline-none focus:border-volt transition-colors"
          />
        </div>

        {/* Region Filter Chips */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-mono text-content-muted uppercase block font-bold">Filter by Region:</span>
          <div className="flex flex-wrap gap-1.5">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`px-3 py-1 rounded-lg text-[11px] font-mono capitalize transition-all ${
                  selectedRegion === r
                    ? 'bg-volt text-surface-base font-bold shadow-volt-sm'
                    : 'bg-surface-elevated border border-surface-border text-content-secondary hover:text-content-primary'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Type Filter Chips */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono text-content-muted uppercase block font-bold">Filter by Type:</span>
          <div className="flex flex-wrap gap-1.5">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1 rounded-lg text-[11px] font-mono capitalize transition-all ${
                  selectedType === t
                    ? 'bg-volt text-surface-base font-bold shadow-volt-sm'
                    : 'bg-surface-elevated border border-surface-border text-content-secondary hover:text-content-primary'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs font-mono text-content-muted px-1">
        <span>Showing {filteredExercises.length} of 32 exercises</span>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredExercises.map((ex) => (
          <div
            key={ex.id}
            onClick={() => setActiveExercise(ex)}
            className="bg-surface-card border border-surface-border hover:border-volt/40 rounded-2xl p-4 cursor-pointer transition-all hover:bg-surface-elevated space-y-2 group shadow-card"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-volt uppercase bg-volt/10 border border-volt/20 px-2 py-0.5 rounded-md">
                #{ex.id} · {ex.region}
              </span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                ex.type === 'Passive'
                  ? 'bg-ember/10 text-ember border border-ember/20'
                  : 'bg-surface-elevated text-content-secondary border border-surface-border'
              }`}>
                {ex.type}
              </span>
            </div>

            <h3 className="text-sm font-bold text-content-primary group-hover:text-volt transition-colors">
              {ex.name}
            </h3>

            <p className="text-xs text-content-muted line-clamp-2 leading-relaxed">
              {ex.whyItMatters}
            </p>

            <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-content-secondary border-t border-surface-border">
              <span>{ex.defaultDose}</span>
              <ChevronRight className="w-4 h-4 text-content-muted group-hover:text-volt transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {activeExercise && (
        <ExerciseDetailModal
          exercise={activeExercise}
          onClose={() => setActiveExercise(null)}
        />
      )}
    </div>
  );
};

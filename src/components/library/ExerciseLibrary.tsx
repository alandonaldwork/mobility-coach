import React, { useState } from "react";
import {
  Search,
  BookOpen,
  ChevronRight,
  Layers3,
  RotateCcw,
  SlidersHorizontal,
  Heart,
} from "lucide-react";
import { UNIFIED_LIBRARY } from "../../data/exercise-catalog";
import { Exercise, LibraryTag } from "../../types";
import { ExerciseDetailModal } from "./ExerciseDetailModal";
import { useUserStore } from "../../store/useUserStore";

type CatalogFilter = "combined" | LibraryTag | "favorites";

export const ExerciseLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCatalog, setSelectedCatalog] =
    useState<CatalogFilter>("combined");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);

  const { favoriteExerciseIds, actions } = useUserStore();

  const catalogs: { id: CatalogFilter; label: string }[] = [
    { id: "combined", label: "All" },
    { id: "stretch", label: "Stretches" },
    { id: "mobility", label: "Mobility" },
    { id: "favorites", label: `❤ Saved (${favoriteExerciseIds.length})` },
  ];
  const regions = [
    "all",
    "ankle",
    "hip",
    "thoracic",
    "shoulder",
    "neck",
    "wrist",
    "full-body",
  ];
  const types = [
    "all",
    "Active",
    "Dynamic",
    "Activation",
    "Passive",
    "SMR",
    "Breathing",
    "Static",
    "PNF",
  ];

  const catalogExercises =
    selectedCatalog === "combined"
      ? UNIFIED_LIBRARY
      : selectedCatalog === "favorites"
      ? UNIFIED_LIBRARY.filter((ex) => favoriteExerciseIds.includes(ex.id))
      : UNIFIED_LIBRARY.filter((ex) => ex.libraryTag === selectedCatalog);

  const filteredExercises = catalogExercises.filter((ex) => {
    const matchesSearch =
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.whyItMatters.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion =
      selectedRegion === "all" || ex.region === selectedRegion;
    const matchesType = selectedType === "all" || ex.type === selectedType;

    return matchesSearch && matchesRegion && matchesType;
  });

  const hasActiveFilters =
    searchQuery || selectedRegion !== "all" || selectedType !== "all";
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedRegion("all");
    setSelectedType("all");
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <section className="bg-surface-card border border-surface-border rounded-3xl p-4 sm:p-5 space-y-5 shadow-elevated overflow-hidden relative">
        <div className="absolute -right-16 -top-20 w-48 h-48 rounded-full bg-volt/5 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-volt/10 text-volt border border-volt/30 flex items-center justify-center shadow-volt-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] font-bold text-volt">
                  Movement reference
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-content-primary tracking-tight mt-0.5">
                Exercise Library
              </h2>
              <p className="text-xs text-content-muted mt-0.5">
                Browse stretches and mobility drills built for your program.
              </p>
            </div>
          </div>

          <div className="hidden sm:block self-start sm:text-right bg-surface-elevated/70 border border-surface-border rounded-2xl px-3.5 py-2.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-content-muted block">
              Available drills
            </span>
            <span className="text-lg leading-none font-extrabold font-mono text-volt">
              {catalogExercises.length}
            </span>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-3 items-center">
          <div className="relative group">
            <Search className="w-4 h-4 text-content-muted absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-volt transition-colors" />
            <input
              type="text"
              placeholder="Search drills, targets, or benefits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-elevated border border-surface-border rounded-2xl pl-11 pr-4 py-3 text-xs text-content-primary placeholder-content-muted focus:outline-none focus:border-volt focus:ring-2 focus:ring-volt/10 transition-all"
            />
          </div>

          <div className="grid grid-cols-4 rounded-2xl p-1 bg-surface-elevated border border-surface-border gap-1">
            {catalogs.map((catalog) => (
              <button
                key={catalog.id}
                onClick={() => setSelectedCatalog(catalog.id)}
                className={`px-2 py-1.5 rounded-xl text-[10px] sm:text-[11px] font-mono transition-all text-center truncate ${
                  selectedCatalog === catalog.id
                    ? catalog.id === 'favorites'
                      ? 'bg-ember text-white font-bold shadow-sm'
                      : "bg-volt text-surface-base font-bold shadow-volt-sm"
                    : "text-content-secondary hover:text-content-primary hover:bg-surface-card"
                }`}
              >
                {catalog.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative z-10 bg-surface-base/35 border border-surface-border rounded-2xl p-3 sm:p-4 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[10px] font-mono text-content-muted uppercase tracking-wider font-bold">
              <SlidersHorizontal className="w-3.5 h-3.5 text-volt" />
              Refine your results
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-content-secondary hover:text-volt transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_1fr] gap-4 xl:gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-content-muted uppercase block font-bold">
                Target region
              </span>
              <div className="flex flex-wrap gap-1.5">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono capitalize transition-all ${
                      selectedRegion === region
                        ? "bg-volt text-surface-base font-bold shadow-volt-sm"
                        : "bg-surface-elevated border border-surface-border text-content-secondary hover:border-volt/30 hover:text-content-primary"
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono text-content-muted uppercase block font-bold">
                Movement type
              </span>
              <div className="flex flex-wrap gap-1.5">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono transition-all capitalize ${
                      selectedType === type
                        ? "bg-volt text-surface-base font-bold shadow-volt-sm"
                        : "bg-surface-elevated border border-surface-border text-content-secondary hover:border-volt/30 hover:text-content-primary"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between text-xs font-mono text-content-muted px-1.5">
        <span className="inline-flex items-center gap-2">
          <Layers3 className="w-3.5 h-3.5 text-volt" />
          Showing{" "}
          <strong className="text-content-primary">
            {filteredExercises.length}
          </strong>{" "}
          of {catalogExercises.length} exercises
        </span>
        {hasActiveFilters && (
          <span className="hidden sm:inline text-volt">Filtered</span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredExercises.map((ex) => {
          const isFav = favoriteExerciseIds.includes(ex.id);
          return (
          <div
            key={`${ex.libraryTag}-${ex.id}`}
            onClick={() => setActiveExercise(ex)}
            className="bg-surface-card border border-surface-border hover:border-volt/40 rounded-2xl p-3.5 sm:p-4 cursor-pointer transition-all hover:bg-surface-elevated space-y-2 group shadow-card"
          >
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <span className="text-[10px] font-mono font-bold text-volt uppercase bg-volt/10 border border-volt/20 px-2 py-0.5 rounded-md shrink-0">
                #{ex.id} · {ex.region}
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                {/* Favorite Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); actions.toggleFavorite(ex.id); }}
                  title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                  className={`w-6 h-6 flex items-center justify-center rounded-lg transition-all ${
                    isFav
                      ? 'text-ember'
                      : 'text-content-muted hover:text-ember'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-ember' : ''}`} />
                </button>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    ex.libraryTag === "stretch"
                      ? "bg-ember/10 text-ember border border-ember/20"
                      : "bg-volt/10 text-volt border border-volt/20"
                  }`}
                >
                  {ex.libraryTag === "stretch" ? "Stretch" : "Mobility"}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    ex.type === "Passive" || ex.type === "Static"
                      ? "bg-ember/10 text-ember border border-ember/20"
                      : "bg-surface-elevated text-content-secondary border border-surface-border"
                  }`}
                >
                  {ex.type}
                </span>
              </div>
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
          );
        })}
      </div>

      {activeExercise && (
        <ExerciseDetailModal
          exercise={activeExercise}
          onClose={() => setActiveExercise(null)}
        />
      )}
    </div>
  );
};

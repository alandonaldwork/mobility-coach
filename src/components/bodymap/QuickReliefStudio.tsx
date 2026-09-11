import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BODY_HOTSPOTS, Hotspot } from '../../data/body-hotspots';
import { BodyMapSvg } from './BodyMapSvg';
import { RoutineConfigurator } from './RoutineConfigurator';
import { generateReliefRoutine, ReliefIntent } from '../../utils/reliefRoutineGenerator';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { Crosshair, Sparkles, Shield, HeartPulse } from 'lucide-react';

export const QuickReliefStudio: React.FC = () => {
  const navigate = useNavigate();
  const startCustomSession = useWorkoutStore((state) => state.startCustomReliefSession);

  const [view, setView] = useState<'front' | 'back'>('front');
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot>(() => {
    return BODY_HOTSPOTS.find((h) => h.id === 'hips-front') || BODY_HOTSPOTS[0];
  });
  const [durationMinutes, setDurationMinutes] = useState<3 | 5 | 10>(5);
  const [intent, setIntent] = useState<ReliefIntent>('balanced');

  // Generate routine live when parameters change
  const generatedSession = useMemo(() => {
    return generateReliefRoutine({
      hotspot: selectedHotspot,
      durationMinutes,
      intent,
    });
  }, [selectedHotspot, durationMinutes, intent]);

  const handleStartRoutine = () => {
    startCustomSession(generatedSession);
    navigate('/session');
  };

  const handleSelectHotspot = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot);
    if (hotspot.view !== view) {
      setView(hotspot.view);
    }
  };

  const currentViewHotspots = BODY_HOTSPOTS.filter((h) => h.view === view);

  return (
    <div className="space-y-6">
      {/* Studio Header Banner */}
      <div className="bg-surface-card border border-surface-border rounded-3xl p-5 sm:p-6 shadow-elevated relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-2 bg-volt/10 border border-volt/30 text-volt text-xs font-mono font-bold px-3 py-1 rounded-full shadow-volt-sm">
            <Crosshair className="w-3.5 h-3.5" />
            <span>INTERACTIVE BODY MAP & QUICK RELIEF</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-content-primary tracking-tight">
            Pinpoint Tightness. Relieve in Minutes.
          </h2>

          <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
            Select an anatomical hotspot to generate a rapid, targeted mobility protocol. Perfect for workday desk resets, pre-run primers, or end-of-day pain relief.
          </p>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-volt/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Quick Select Region Chips Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-mono font-bold text-content-muted uppercase tracking-wider">
            QUICK PICK REGION ({view.toUpperCase()} VIEW)
          </span>
          <span className="text-[10px] font-mono text-volt">
            TAP HOTSPOT OR CHIP
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {currentViewHotspots.map((hotspot) => {
            const isSelected = selectedHotspot.id === hotspot.id;
            return (
              <button
                key={hotspot.id}
                type="button"
                onClick={() => handleSelectHotspot(hotspot)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold shrink-0 border transition-all ${
                  isSelected
                    ? 'bg-volt text-surface-base border-volt shadow-volt-sm scale-105'
                    : 'bg-surface-card border-surface-border text-content-muted hover:text-content-primary hover:border-surface-highlight'
                }`}
              >
                {hotspot.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Grid: SVG Map on Left / Configurator on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Anatomy Canvas */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <BodyMapSvg
            selectedHotspot={selectedHotspot}
            onSelectHotspot={handleSelectHotspot}
            view={view}
            onToggleView={setView}
          />
        </div>

        {/* Right: Routine Configurator & Preview */}
        <div className="lg:col-span-7">
          <RoutineConfigurator
            hotspot={selectedHotspot}
            durationMinutes={durationMinutes}
            onChangeDuration={setDurationMinutes}
            intent={intent}
            onChangeIntent={setIntent}
            generatedSession={generatedSession}
            onStartRoutine={handleStartRoutine}
          />
        </div>
      </div>
    </div>
  );
};

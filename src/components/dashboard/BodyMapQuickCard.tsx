import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Crosshair, ArrowRight, Sparkles, Zap } from 'lucide-react';

const POPULAR_HOTSPOTS = [
  { id: 'hips-front', label: 'Hips & Pelvis' },
  { id: 'lowerback-back', label: 'Lower Back' },
  { id: 'neck-front', label: 'Neck & Traps' },
  { id: 'thoracic-front', label: 'Thoracic Spine' },
  { id: 'shoulders-front', label: 'Shoulders' },
  { id: 'ankles-front', label: 'Ankles & Shins' },
];

export const BodyMapQuickCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-surface-card to-surface-elevated border border-surface-border hover:border-volt/40 rounded-3xl p-5 sm:p-6 shadow-elevated space-y-4 transition-all duration-300 relative overflow-hidden group">
      {/* Glow decorative spot */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-volt/10 rounded-full blur-3xl pointer-events-none group-hover:bg-volt/15 transition-all" />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-volt/15 border border-volt/30 flex items-center justify-center text-volt shadow-volt-sm">
              <Crosshair className="w-4 h-4 animate-pulse" />
            </div>
            <span className="text-xs font-mono font-bold text-volt uppercase tracking-wider">
              TARGETED PAIN & TIGHTNESS RELIEF
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-content-primary">
            Where does your body feel tight right now?
          </h3>
        </div>
      </div>

      <p className="text-xs text-content-secondary leading-relaxed">
        Point to the problem area on our interactive anatomical body map to immediately launch a custom 3, 5, or 10-minute targeted relief flow.
      </p>

      {/* Quick Region Selector Pills */}
      <div className="flex flex-wrap gap-2 pt-1">
        {POPULAR_HOTSPOTS.map((spot) => (
          <button
            key={spot.id}
            onClick={() => navigate('/relief')}
            className="px-3 py-1.5 rounded-xl bg-surface-base/80 border border-surface-border hover:border-volt/50 hover:bg-volt/10 hover:text-volt text-content-muted text-xs font-mono font-bold transition-all shadow-sm flex items-center space-x-1.5"
          >
            <Zap className="w-3 h-3 text-volt" />
            <span>{spot.label}</span>
          </button>
        ))}
      </div>

      {/* Action Button */}
      <button
        onClick={() => navigate('/relief')}
        className="w-full py-3.5 bg-volt/10 border border-volt/30 hover:bg-volt hover:text-surface-base text-volt font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-volt-sm flex items-center justify-center space-x-2 group/btn"
      >
        <span>OPEN INTERACTIVE BODY MAP & STUDIO</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
      </button>
    </div>
  );
};

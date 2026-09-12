import React, { useState } from 'react';
import { Hotspot, BODY_HOTSPOTS } from '../../data/body-hotspots';
import { Sparkles, Eye, RotateCw } from 'lucide-react';

interface BodyMapSvgProps {
  selectedHotspot: Hotspot;
  onSelectHotspot: (hotspot: Hotspot) => void;
  view: 'front' | 'back';
  onToggleView: (view: 'front' | 'back') => void;
}

export const BodyMapSvg: React.FC<BodyMapSvgProps> = ({
  selectedHotspot,
  onSelectHotspot,
  view,
  onToggleView,
}) => {
  const [hoveredHotspot, setHoveredHotspot] = useState<Hotspot | null>(null);

  const currentHotspots = BODY_HOTSPOTS.filter((h) => h.view === view);

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* View Toggle Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-surface-base/80 backdrop-blur border border-surface-border rounded-2xl mb-3 shadow-sm">
        <button
          type="button"
          onClick={() => onToggleView('front')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
            view === 'front'
              ? 'bg-volt text-surface-base shadow-volt-sm'
              : 'text-content-muted hover:text-content-primary'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>FRONT VIEW</span>
        </button>
        <button
          type="button"
          onClick={() => onToggleView('back')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
            view === 'back'
              ? 'bg-volt text-surface-base shadow-volt-sm'
              : 'text-content-muted hover:text-content-primary'
          }`}
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>BACK VIEW</span>
        </button>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[300/520] bg-surface-card/60 border border-surface-border/80 rounded-3xl p-4 shadow-elevated flex items-center justify-center overflow-hidden">
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#a3e635 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />

        {/* Anatomy Silhouette SVG */}
        <svg
          viewBox="0 0 300 520"
          className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        >
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--silhouette-grad-start, #1e293b)" stopOpacity="0.9" />
              <stop offset="50%" stopColor="var(--silhouette-grad-mid, #0f172a)" stopOpacity="0.95" />
              <stop offset="100%" stopColor="var(--silhouette-grad-start, #1e293b)" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="glowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ccff00" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Athletic Human Silhouette */}
          <g className="transition-all duration-300">
            {/* Head & Neck */}
            <path
              d="M150,30 C162,30 172,42 172,58 C172,74 163,85 158,88 L158,102 L142,102 L142,88 C137,85 128,74 128,58 C128,42 138,30 150,30 Z"
              fill="url(#bodyGrad)"
              stroke="var(--silhouette-stroke, #334155)"
              strokeWidth="2"
            />
            {/* Traps & Torso */}
            <path
              d="M142,102 L112,114 C98,120 90,132 88,150 L84,200 C83,212 80,225 76,238 L62,285 C59,295 64,305 74,307 C82,309 90,303 93,295 L106,242 C108,234 112,226 116,220 L118,255 L118,295 L124,310 L136,315 L144,300 L150,300 L156,300 L164,315 L176,310 L182,295 L182,255 L184,220 C188,226 192,234 194,242 L207,295 C210,303 218,309 226,307 C236,305 241,295 238,285 L224,238 C220,225 217,212 216,200 L212,150 C210,132 202,120 188,114 L158,102 Z"
              fill="url(#bodyGrad)"
              stroke="var(--silhouette-stroke, #334155)"
              strokeWidth="2"
            />
            {/* Left Leg */}
            <path
              d="M124,310 L116,380 C114,402 116,420 119,442 L121,475 C121,484 115,492 126,494 C136,495 140,488 139,478 L136,442 C134,420 137,402 142,380 L144,300 Z"
              fill="url(#bodyGrad)"
              stroke="var(--silhouette-stroke, #334155)"
              strokeWidth="2"
            />
            {/* Right Leg */}
            <path
              d="M156,300 L158,380 C163,402 166,420 164,442 L161,478 C160,488 164,495 174,494 C185,492 179,484 179,475 L181,442 C184,420 186,402 184,380 L176,310 Z"
              fill="url(#bodyGrad)"
              stroke="var(--silhouette-stroke, #334155)"
              strokeWidth="2"
            />

            {/* Back View Scapular / Spine Lines */}
            {view === 'back' && (
              <g stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6">
                <line x1="150" y1="95" x2="150" y2="295" />
                <path d="M126,130 Q138,155 134,180" fill="none" />
                <path d="M174,130 Q162,155 166,180" fill="none" />
              </g>
            )}

            {/* Front View Clavicle / Core Lines */}
            {view === 'front' && (
              <g stroke="#475569" strokeWidth="1.5" opacity="0.5">
                <path d="M124,116 Q150,126 176,116" fill="none" />
                <line x1="150" y1="130" x2="150" y2="250" strokeDasharray="2 3" />
              </g>
            )}
          </g>

          {/* Interactive Hotspot Pins */}
          {currentHotspots.map((hotspot) => {
            const isSelected = selectedHotspot.id === hotspot.id;
            const isHovered = hoveredHotspot?.id === hotspot.id;
            const cx = (hotspot.x / 100) * 300;
            const cy = (hotspot.y / 100) * 520;

            return (
              <g
                key={hotspot.id}
                className="cursor-pointer group"
                onClick={() => onSelectHotspot(hotspot)}
                onMouseEnter={() => setHoveredHotspot(hotspot)}
                onMouseLeave={() => setHoveredHotspot(null)}
              >
                {/* Outer Radar Ping for Active/Hovered Hotspot */}
                {(isSelected || isHovered) && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="18"
                    className="stroke-volt fill-volt/10 animate-ping origin-center"
                    strokeWidth="1.5"
                    style={{ transformOrigin: `${cx}px ${cy}px` }}
                  />
                )}

                {/* Pulsing Aura */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? '14' : isHovered ? '12' : '9'}
                  className={`transition-all duration-300 ${
                    isSelected
                      ? 'fill-volt/30 stroke-volt stroke-2 shadow-volt'
                      : isHovered
                      ? 'fill-volt/20 stroke-volt/80 stroke-1.5'
                      : 'fill-surface-elevated/90 stroke-content-muted/60 stroke-1'
                  }`}
                />

                {/* Solid Core Dot */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? '6' : '4'}
                  className={`transition-all duration-200 ${
                    isSelected ? 'fill-volt' : isHovered ? 'fill-volt/90' : 'fill-content-secondary'
                  }`}
                />

                {/* Symmetrical Dot for bilateral limbs if applicable */}
                {hotspot.x < 50 && hotspot.region !== 'thoracic' && hotspot.region !== 'neck' && (
                  <circle
                    cx={300 - cx}
                    cy={cy}
                    r={isSelected ? '5' : '3.5'}
                    opacity={isSelected ? 0.9 : 0.4}
                    className={isSelected ? 'fill-volt' : 'fill-content-muted'}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover / Selection Micro-Badge Overlay */}
        {(hoveredHotspot || selectedHotspot) && (
          <div className="absolute bottom-3 inset-x-4 pointer-events-none transition-all duration-200">
            <div className="bg-surface-base/95 backdrop-blur-md border border-volt/40 rounded-xl px-3 py-1.5 flex items-center justify-between shadow-volt-sm">
              <div className="flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-volt" />
                <span className="text-xs font-mono font-bold text-content-primary">
                  {(hoveredHotspot || selectedHotspot).label}
                </span>
              </div>
              <span className="text-[10px] font-mono text-volt uppercase font-semibold">
                TAP TO CONFIGURE
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

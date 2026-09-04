import React from 'react';
import { Flame, Dumbbell, LogOut } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const currentStreak = useUserStore((state) => state.currentStreak);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 h-16 bg-surface-base/95 backdrop-blur-md border-b border-surface-border px-4 sm:px-6 flex items-center justify-between w-full">
      <div 
        onClick={() => navigate('/')} 
        className="flex items-center space-x-3 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-xl bg-volt/10 border border-volt/30 flex items-center justify-center text-volt group-hover:bg-volt group-hover:text-surface-base transition-colors shrink-0">
          <Dumbbell className="w-5 h-5" />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-base font-extrabold tracking-tight text-content-primary leading-tight">
            ELITE ATHLETE
          </h1>
          <p className="text-[10px] font-mono tracking-wider text-volt uppercase">
            Mobility & Recovery Coach
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Streak pill */}
        <div className="flex items-center space-x-1.5 bg-surface-card border border-surface-border px-3 py-1.5 rounded-full">
          <Flame className={`w-4 h-4 ${currentStreak > 0 ? 'text-ember animate-pulse' : 'text-content-muted'}`} />
          <span className="text-xs font-mono font-bold text-content-primary">
            {currentStreak} <span className="text-content-muted font-normal text-[10px]">DAYS</span>
          </span>
        </div>
        <button onClick={onLogout} className="h-8 px-2.5 sm:px-3 rounded-lg border border-surface-border text-content-muted hover:text-content-primary hover:border-volt/40 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors" title="Log out"><LogOut className="w-3.5 h-3.5" /><span className="hidden sm:inline">Log out</span></button>
      </div>
    </header>
  );
};

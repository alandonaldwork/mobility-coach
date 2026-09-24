import React, { useState } from 'react';
import { Flame, Dumbbell, LogOut, ChevronDown, User } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';

import { ThemeToggle } from '../shared/ThemeToggle';
import { MobileMenuBottomSheet } from './MobileMenuBottomSheet';

interface HeaderProps {
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const currentStreak = useUserStore((state) => state.currentStreak);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
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

        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Streak pill */}
          <div className="flex items-center space-x-1.5 bg-surface-card border border-surface-border px-3 py-1.5 rounded-full">
            <Flame className={`w-4 h-4 ${currentStreak > 0 ? 'text-ember animate-pulse' : 'text-content-muted'}`} />
            <span className="text-xs font-mono font-bold text-content-primary">
              {currentStreak} <span className="text-content-muted font-normal text-[10px]">DAYS</span>
            </span>
          </div>
          
          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Desktop Logout Button */}
          <button 
            onClick={onLogout} 
            className="hidden min-[1001px]:flex h-8 px-2.5 sm:px-3 rounded-lg border border-surface-border text-content-muted hover:text-content-primary hover:border-volt/40 text-[10px] font-bold uppercase tracking-wider items-center gap-1.5 transition-colors" 
            title="Log out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log out</span>
          </button>

          {/* Mobile Menu Trigger Button (Replaces Logout in Mobile View) */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex min-[1001px]:hidden h-9 px-2.5 rounded-xl bg-surface-card border border-surface-border hover:border-volt/40 text-content-primary items-center gap-1.5 transition-all active:scale-95 shadow-sm group"
            title="More Options & Menu"
            aria-label="Open menu and more routes"
          >
            <div className="w-5 h-5 rounded-lg bg-volt/15 text-volt flex items-center justify-center group-hover:bg-volt group-hover:text-surface-base transition-colors shrink-0">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-content-secondary group-hover:text-content-primary">
              Menu
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-content-muted group-hover:text-volt transition-colors" />
          </button>
        </div>
      </header>

      {/* Mobile Menu & Missing Routes Bottom Sheet */}
      <MobileMenuBottomSheet
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onLogout={onLogout}
      />
    </>
  );
};


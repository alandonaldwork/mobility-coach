import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  BarChart3, 
  Zap, 
  Settings, 
  Flame, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
  const currentStreak = useUserStore((state) => state.currentStreak);

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/calendar', label: 'Calendar', icon: Calendar },
    { to: '/library', label: 'Library', icon: BookOpen },
    { to: '/progress', label: 'Stats', icon: BarChart3 },
    { to: '/progression', label: 'Plan', icon: Zap },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      aria-label="Sidebar navigation"
      className={`fixed top-16 left-0 bottom-0 z-20 bg-surface-base/95 backdrop-blur-xl border-r border-surface-border hidden min-[1001px]:flex flex-col transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Floating Collapse/Expand Button on Right Border */}
      <button
        onClick={onToggleCollapse}
        title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        className="absolute -right-3.5 top-6 z-30 w-7 h-7 rounded-full bg-surface-card border border-surface-border text-content-secondary hover:text-volt hover:border-volt/50 flex items-center justify-center shadow-md hover:scale-110 transition-all duration-200"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Navigation Items */}
      <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            title={isCollapsed ? item.label : undefined}
          >
            {({ isActive }) => (
              <motion.div
                whileHover={{ scale: 1.03, x: isCollapsed ? 0 : 2 }}
                whileTap={{ scale: 0.96 }}
                className={`relative flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-colors duration-200 ${
                  isActive
                    ? 'text-volt font-semibold'
                    : 'text-content-muted hover:text-content-primary hover:bg-surface-card/50'
                } ${isCollapsed ? 'justify-center px-0' : ''}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSidebarIndicator"
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 rounded-xl bg-surface-card border border-volt/20 shadow-volt-sm z-0"
                    transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                  />
                )}
                <motion.div 
                  animate={{ scale: isActive ? 1.08 : 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="z-10 flex items-center space-x-3"
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span className="text-sm tracking-wide truncate">{item.label}</span>}
                </motion.div>
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer / Streak Widget */}
      <div className="p-3 border-t border-surface-border">
        {isCollapsed ? (
          <div
            title={`${currentStreak} Days Streak`}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-surface-card border border-surface-border"
          >
            <Flame className={`w-5 h-5 ${currentStreak > 0 ? 'text-ember animate-pulse' : 'text-content-muted'}`} />
            <span className="text-[10px] font-mono font-bold text-content-primary mt-1">{currentStreak}</span>
          </div>
        ) : (
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-surface-card border border-surface-border">
            <div className="p-2 rounded-lg bg-surface-elevated text-ember">
              <Flame className={`w-5 h-5 ${currentStreak > 0 ? 'animate-pulse' : ''}`} />
            </div>
            <div>
              <p className="text-[10px] font-mono text-content-muted uppercase">Active Streak</p>
              <p className="text-xs font-mono font-bold text-content-primary">
                {currentStreak} <span className="text-content-muted font-normal">DAYS</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

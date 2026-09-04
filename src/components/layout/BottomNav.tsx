import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Calendar,
  BookOpen,
  BarChart3,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const BottomNav: React.FC = () => {
  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/calendar", label: "Calendar", icon: Calendar },
    { to: "/library", label: "Library", icon: BookOpen },
    { to: "/progress", label: "Stats", icon: BarChart3 },
    { to: "/progression", label: "Plan", icon: Zap },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-surface-base/95 backdrop-blur-lg border-t border-surface-border py-2 px-2 min-[1001px]:hidden">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-volt bg-surface-card border border-volt/20 shadow-volt-sm font-semibold"
                  : "text-content-muted hover:text-content-primary"
              }`
            }
          >
            <item.icon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-wide">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

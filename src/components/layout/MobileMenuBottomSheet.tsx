import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  ClipboardCheck,
  Zap,
  Settings,
  LogOut,
  X,
  Flame,
  User,
  ChevronRight,
  Home,
  Crosshair,
  BookOpen,
  Calendar,
  ListPlus,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useUserStore } from "../../store/useUserStore";

interface MobileMenuBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const MobileMenuBottomSheet: React.FC<MobileMenuBottomSheetProps> = ({
  isOpen,
  onClose,
  onLogout,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentStreak = useUserStore((state) => state.currentStreak);
  const trainingContext = useUserStore((state) => state.trainingContext);
  const audioPreferences = useUserStore((state) => state.audioPreferences);
  const updateAudioPreferences = useUserStore(
    (state) => state.actions.updateAudioPreferences
  );

  const loggedInUser =
    localStorage.getItem("elite_mobility_logged_in_user") || "Guest Athlete";
  const displayUserName =
    loggedInUser.charAt(0).toUpperCase() + loggedInUser.slice(1);

  // Prevent background scroll when bottom sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Missing routes that are NOT in the 5-item mobile BottomNav
  const missingRoutes = [
    {
      to: "/progress",
      label: "Stats & Analytics",
      description: "Streak history, daily minutes & session log",
      icon: BarChart3,
      badge: "Analytics",
      badgeColor: "text-volt bg-volt/10 border-volt/20",
    },
    {
      to: "/assessments",
      label: "Mobility Assessments",
      description: "Joint range of motion & benchmark scoring",
      icon: ClipboardCheck,
      badge: "ROM Tests",
      badgeColor: "text-ember bg-ember/10 border-ember/20",
    },
    {
      to: "/progression",
      label: "Training Plan",
      description: "4-phase volleyball mobility & recovery roadmap",
      icon: Zap,
      badge: "Periodization",
      badgeColor: "text-state-success bg-state-success/10 border-state-success/20",
    },
    {
      to: "/settings",
      label: "Settings & Preferences",
      description: "Audio cues, equipment kit & account options",
      icon: Settings,
      badge: "Config",
      badgeColor: "text-content-muted bg-surface-elevated border-surface-border",
    },
  ];

  // Core routes in BottomNav for quick reference
  const bottomNavRoutes = [
    { to: "/", label: "Home", icon: Home },
    { to: "/relief", label: "Body Map", icon: Crosshair },
    { to: "/calendar", label: "Calendar", icon: Calendar },
    { to: "/library", label: "Library", icon: BookOpen },
    { to: "/routines", label: "Routines", icon: ListPlus },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogoutClick = () => {
    onClose();
    onLogout();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center min-[1001px]:hidden">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Bottom Sheet Modal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full max-h-[90vh] bg-surface-card border-t border-surface-border rounded-t-3xl shadow-2xl flex flex-col overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
            aria-label="Athlete navigation and options"
          >
            {/* Grab Handle */}
            <div className="w-full pt-3 pb-1 flex justify-center cursor-pointer" onClick={onClose}>
              <div className="w-12 h-1.5 rounded-full bg-surface-border hover:bg-volt/40 transition-colors" />
            </div>

            {/* Header: User Profile & Close */}
            <div className="px-5 py-3 border-b border-surface-border flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-volt/15 border border-volt/30 flex items-center justify-center text-volt shrink-0 shadow-volt-sm">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-extrabold text-content-primary">
                      {displayUserName}
                    </h2>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-full bg-surface-elevated border border-surface-border text-content-muted">
                      {trainingContext}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-content-muted mt-0.5">
                    <Flame className={`w-3.5 h-3.5 ${currentStreak > 0 ? "text-ember animate-pulse" : "text-content-muted"}`} />
                    <span className="font-mono text-[11px] font-bold text-content-secondary">
                      {currentStreak} Day Streak
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-surface-elevated border border-surface-border flex items-center justify-center text-content-muted hover:text-content-primary hover:border-volt/30 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
              {/* Missing Navigation Section */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-volt">
                    More Features & Routes
                  </span>
                  <span className="text-[10px] text-content-muted">
                    Not in bottom bar
                  </span>
                </div>

                <div className="space-y-2">
                  {missingRoutes.map((item) => {
                    const isActive = location.pathname === item.to;
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.to}
                        onClick={() => handleNavigate(item.to)}
                        className={`w-full text-left p-3 rounded-2xl border transition-all duration-200 flex items-center justify-between group ${
                          isActive
                            ? "bg-surface-elevated border-volt/40 shadow-volt-sm"
                            : "bg-surface-base/80 border-surface-border hover:border-surface-highlight hover:bg-surface-elevated/60"
                        }`}
                      >
                        <div className="flex items-center space-x-3.5 min-w-0">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                              isActive
                                ? "bg-volt text-surface-base border-volt"
                                : "bg-surface-elevated border-surface-border text-content-primary group-hover:text-volt group-hover:border-volt/30"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-sm font-bold truncate ${
                                  isActive ? "text-volt" : "text-content-primary"
                                }`}
                              >
                                {item.label}
                              </span>
                              <span
                                className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase ${item.badgeColor}`}
                              >
                                {item.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-content-muted truncate mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <ChevronRight
                          className={`w-4 h-4 ml-2 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                            isActive ? "text-volt" : "text-content-muted"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Audio Cue Switch */}
              <div className="bg-surface-base/60 border border-surface-border rounded-2xl p-3 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-surface-border flex items-center justify-center text-volt">
                    {audioPreferences.audioEnabled ? (
                      <Volume2 className="w-4 h-4" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-content-muted" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-content-primary">
                      Audio Announcements
                    </p>
                    <p className="text-[10px] text-content-muted">
                      {audioPreferences.audioEnabled
                        ? "Voice & timer beeps enabled"
                        : "Audio cues muted"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    updateAudioPreferences({
                      audioEnabled: !audioPreferences.audioEnabled,
                    })
                  }
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-colors border ${
                    audioPreferences.audioEnabled
                      ? "bg-volt/15 border-volt/40 text-volt hover:bg-volt/20"
                      : "bg-surface-elevated border-surface-border text-content-muted hover:text-content-primary"
                  }`}
                >
                  {audioPreferences.audioEnabled ? "On" : "Off"}
                </button>
              </div>

              {/* Bottom Nav Quick Jump Grid */}
              <div>
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-content-muted block mb-2">
                  All Main Pages
                </span>
                <div className="grid grid-cols-5 gap-1.5">
                  {bottomNavRoutes.map((route) => {
                    const isActive = location.pathname === route.to;
                    const Icon = route.icon;
                    return (
                      <button
                        key={route.to}
                        onClick={() => handleNavigate(route.to)}
                        className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border text-center transition-all ${
                          isActive
                            ? "bg-volt/10 border-volt/30 text-volt"
                            : "bg-surface-base/60 border-surface-border text-content-muted hover:text-content-primary hover:border-surface-highlight"
                        }`}
                      >
                        <Icon className="w-4 h-4 mb-1" />
                        <span className="text-[9px] font-medium truncate w-full">
                          {route.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer with Prominent Logout Button */}
            <div className="p-4 border-t border-surface-border bg-surface-card/90 backdrop-blur-md">
              <button
                onClick={handleLogoutClick}
                className="w-full h-12 rounded-xl bg-surface-elevated hover:bg-state-danger/15 border border-surface-border hover:border-state-danger/40 text-state-danger font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

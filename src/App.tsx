import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AppShell } from './components/layout/AppShell';
import { HomePage } from './pages/HomePage';
import { CalendarPage } from './pages/CalendarPage';
import { LibraryPage } from './pages/LibraryPage';
import { ProgressPage } from './pages/ProgressPage';
import { AssessmentsPage } from './pages/AssessmentsPage';
import { ProgressionPage } from './pages/ProgressionPage';
import { SettingsPage } from './pages/SettingsPage';
import { SessionPage } from './pages/SessionPage';
import { ReliefPage } from './pages/ReliefPage';
import { LoginPage } from './pages/LoginPage';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, scale: 0.94, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.03, y: -6 }}
        transition={{ 
          duration: 0.26, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        className="w-full min-h-full origin-top"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/relief" element={<ReliefPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/assessments" element={<AssessmentsPage />} />
          <Route path="/progression" element={<ProgressionPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/session" element={<SessionPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('elite_mobility_login_status') === 'true');

  const handleLogout = () => {
    localStorage.removeItem('elite_mobility_login_status');
    localStorage.removeItem('elite_mobility_logged_in_user');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn ? <AppShell onLogout={handleLogout}><AnimatedRoutes /></AppShell> : <LoginPage onLogin={() => setIsLoggedIn(true)} />}
    </Router>
  );
};

export default App;

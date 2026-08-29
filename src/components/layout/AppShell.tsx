import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { Sidebar } from './Sidebar';

interface AppShellProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export const AppShell: React.FC<AppShellProps> = ({ children, onLogout }) => {
  const location = useLocation();
  const isSessionRoute = location.pathname.startsWith('/session');

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('sidebar_collapsed') === 'true';
  });

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('sidebar_collapsed', String(next));
      return next;
    });
  };

  if (isSessionRoute) {
    return (
      <div className="min-h-screen bg-surface-base text-content-primary flex flex-col font-sans antialiased selection:bg-volt selection:text-surface-base">
        <main className="flex-1 w-full min-h-screen p-0">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-base text-content-primary flex flex-col font-sans antialiased selection:bg-volt selection:text-surface-base">
      <Header onLogout={onLogout} />
      <Sidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={toggleSidebar} />
      
      <main
        className={`flex-1 w-full mx-auto px-4 sm:px-8 py-6 transition-[padding-left] duration-300 ease-in-out max-[1000px]:pb-20 max-[1000px]:max-w-4xl min-[1001px]:max-w-none ${
          isSidebarCollapsed ? 'min-[1001px]:pl-28' : 'min-[1001px]:pl-72'
        }`}
      >
        {children}
      </main>

      <BottomNav />
    </div>
  );
};

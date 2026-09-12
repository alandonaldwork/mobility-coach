import { useState, useEffect, useCallback } from 'react';

export type Theme = 'dark' | 'light';

const THEME_STORAGE_KEY = 'elite_mobility_theme';

export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }
  return 'dark'; // Default to the established dark theme
}

export function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
  }
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

// Global listener to keep multiple hook consumers in sync
type ThemeListener = (theme: Theme) => void;
const listeners = new Set<ThemeListener>();

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    // Ensure the initial class matches state
    applyTheme(theme);

    const listener: ThemeListener = (newTheme) => {
      setThemeState(newTheme);
    };
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    listeners.forEach((fn) => fn(newTheme));
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  }, [theme, setTheme]);

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark',
  };
}

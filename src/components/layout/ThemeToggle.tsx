import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const THEME_COLOR: Record<Theme, string> = { light: '#f7f5f0', dark: '#0d0d0c' };

const readSaved = (): Theme | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null;
  }
};

const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
};

/** Light/dark switch. The initial theme is set in index.html before paint; this keeps it in sync. */
export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
  );

  // Follow the system setting until the visitor picks a theme themselves.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (e: MediaQueryListEvent) => {
      if (readSaved()) return;
      const next: Theme = e.matches ? 'light' : 'dark';
      applyTheme(next);
      setTheme(next);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    applyTheme(next);
    setTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  };

  const nextLabel = theme === 'light' ? 'Dark mode' : 'Light mode';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${nextLabel.toLowerCase()}`}
      title={`Switch to ${nextLabel.toLowerCase()}`}
      className={`inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded-full border border-line-strong px-3.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent ${className}`}
    >
      {theme === 'light' ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}
      <span>{nextLabel}</span>
    </button>
  );
};

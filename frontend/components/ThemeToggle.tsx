'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  // Ensure code only runs on client
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (saved === 'dark' || (!saved && prefersDark)) {
        document.documentElement.classList.add('dark');
        setDark(true);
      } else {
        document.documentElement.classList.remove('dark');
        setDark(false);
      }
    }
  }, []);

  const toggleTheme = () => {
    if (typeof window !== 'undefined') {
      const isDark = !dark;
      setDark(isDark);
      document.documentElement.classList.toggle('dark', isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  };

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <button
      onClick={toggleTheme}
      className={`
        w-17 h-10 flex items-center rounded-full px+5
        ${dark
          ? 'bg-indigo-400 border-gray-300'
          : 'bg-indigo-100 border-gray-200'}
        transition-colors duration-300
        focus:outline-none focus:ring-2 focus:ring-gray-300
        border relative shadow-sm
      `}
      aria-label="Toggle theme"
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        boxShadow: '0 2px 8px 0 rgba(180, 180, 200, 0.10)',
      }}
    >
      {/* Background labels */}
      <span className="absolute left-2 text-[10px] font-semibold select-none tracking-wide text-gray-50 dark:text-gray-100">
        Dark
      </span>
      <span className="absolute right-2 text-[9px] font-semibold select-none tracking-wide text-gray-400 dark:text-gray-700">
        Light
      </span>
      {/* Moving thumb */}
      <span
        className={`
          w-7 h-7 rounded-full shadow transform
          ${dark ? 'bg-white' : 'bg-indigo-400'}
          transition-transform duration-300
          ${dark ? 'translate-x-8' : 'translate-x-1'}
          z-10 border border-gray-200
        `}
        style={{
          boxShadow: '0 0px 6px 0 rgba(180, 180, 200, 0.15)',
        }}
      />
    </button>
  );
}

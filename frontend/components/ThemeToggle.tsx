'use client'
// import { log } from
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        w-17 h-11 flex items-center rounded-full
        ${isDark ? 'bg-indigo-500 border-indigo-500' : 'bg-indigo-100 border-gray-200'}
        transition-colors duration-300
        focus:outline-none focus:ring-2 focus:ring-gray-300
        border relative shadow-sm
      `}
      aria-label="Toggle theme"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        boxShadow: '0 2px 8px 0 rgba(180, 180, 200, 0.10)',
      }}
    >
      {/* Background labels */}
      <span className="absolute left-1 text-[10px] font-semibold select-none tracking-wide text-gray-50 dark:text-gray-100">
        Dark
      </span>
      <span className="absolute right-1 text-[10px] font-semibold select-none tracking-wide text-gray-400 dark:text-gray-700">
        Light
      </span>
      {/* Moving thumb */}
      <span
        className={`
          w-8 h-8 rounded-full shadow transform
          ${isDark ? 'bg-white' : 'bg-indigo-400'}
          transition-transform duration-300
          ${isDark ? 'translate-x-8' : 'translate-x'}
          z-10 border border-gray-200
        `}
        style={{
          boxShadow: '0 1px 5px 0 rgba(180, 180, 200, 0.15)',
        }}
      />
    </button>
  )
}

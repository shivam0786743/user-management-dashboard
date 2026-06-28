import React from 'react';
import { FiSun, FiMoon, FiUsers, FiShield } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

/**
 * Navbar Header component.
 * Minimalist header with solid branding, flat badges, and theme toggler.
 */
const Navbar = ({ totalUsers }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">

        {/* Brand mark */}
        <div className="flex items-center gap-2.5 select-none">
          <div className="p-1.5 bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 rounded-lg">
            <FiUsers className="w-4 h-4" />
          </div>
          <div className="text-left">
            <h1 className="text-sm font-semibold text-slate-900 dark:text-zinc-100 tracking-tight">
              User Management
            </h1>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">

          {/* Live users pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 dark:bg-zinc-900 border border-slate-250/50 dark:border-zinc-800 select-none">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-medium text-slate-600 dark:text-zinc-400">
              {totalUsers} Users
            </span>
          </div>

          {/* Admin badge */}
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 dark:bg-zinc-900 border border-slate-250/50 dark:border-zinc-800 select-none">
            <FiShield className="w-3 h-3 text-slate-500 dark:text-zinc-400" />
            <span className="text-[11px] font-medium text-slate-600 dark:text-zinc-400">Admin</span>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-50 dark:hover:bg-zinc-850 cursor-pointer transition-colors duration-150 shadow-sm"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <FiSun className="w-3.5 h-3.5 text-amber-500" />
            ) : (
              <FiMoon className="w-3.5 h-3.5 text-slate-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

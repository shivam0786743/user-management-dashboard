import React from 'react';

/**
 * TableSkeleton component.
 * Renders shimmering placeholders mirroring the layout of the desktop user table.
 */
export const TableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="w-full border border-slate-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">
      {/* Header skeleton bar */}
      <div className="bg-slate-50 dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 px-6 py-3.5 flex items-center justify-between">
        <div className="shimmer h-3.5 rounded w-8"></div>
        <div className="shimmer h-3.5 rounded w-24"></div>
        <div className="shimmer h-3.5 rounded w-24"></div>
        <div className="shimmer h-3.5 rounded w-40"></div>
        <div className="shimmer h-3.5 rounded w-24"></div>
        <div className="shimmer h-3.5 rounded w-16"></div>
      </div>
      
      {/* Row skeletons */}
      <div className="divide-y divide-slate-100 dark:divide-zinc-800/65">
        {Array.from({ length: rows }).map((_, idx) => (
          <div key={idx} className="px-6 py-4 flex items-center justify-between">
            <div className="shimmer h-3.5 rounded w-8"></div>
            <div className="shimmer h-3.5 rounded w-24"></div>
            <div className="shimmer h-3.5 rounded w-24"></div>
            <div className="shimmer h-3.5 rounded w-40"></div>
            <div className="shimmer h-4 rounded w-20"></div>
            <div className="flex gap-2">
              <div className="shimmer h-6 rounded w-6"></div>
              <div className="shimmer h-6 rounded w-6"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * CardSkeleton component.
 * Renders shimmering grid items mimicking the card list on mobile layouts.
 */
export const CardSkeleton = ({ cards = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: cards }).map((_, idx) => (
        <div
          key={idx}
          className="p-4 border border-slate-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 flex flex-col gap-3 shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div className="shimmer h-3.5 rounded w-12"></div>
            <div className="shimmer h-4.5 rounded w-20"></div>
          </div>
          <div className="flex flex-col gap-2 mt-1">
            <div className="shimmer h-5 rounded w-3/4"></div>
            <div className="shimmer h-3.5 rounded w-1/2"></div>
          </div>
          <div className="flex justify-end gap-2 mt-3 pt-2.5 border-t border-slate-100 dark:border-zinc-800/60">
            <div className="shimmer h-6 rounded w-6"></div>
            <div className="shimmer h-6 rounded w-6"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Standard Spinner component.
 */
export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        className={`animate-spin text-blue-600 dark:text-blue-500 ${sizes[size]}`}
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

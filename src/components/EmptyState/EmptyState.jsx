import React from 'react';
import { FiUsers, FiSearch } from 'react-icons/fi';
import Button from '../Button/Button';

/**
 * Reusable EmptyState component.
 * Displays a descriptive vector layout when lists are empty or filters return zero matches.
 */
const EmptyState = ({
  title = 'No users found',
  description = 'Try adjusting your search terms or filters to find what you are looking for.',
  iconType = 'search', // 'search' or 'users'
  onClearFilters,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 py-12">
      <div className="p-3 bg-slate-50 dark:bg-zinc-950 text-slate-400 dark:text-zinc-500 rounded-lg mb-3 border border-slate-100 dark:border-zinc-850">
        {iconType === 'search' ? (
          <FiSearch className="w-6 h-6 text-slate-400 dark:text-zinc-550" />
        ) : (
          <FiUsers className="w-6 h-6 text-slate-400 dark:text-zinc-550" />
        )}
      </div>
      
      <h3 className="text-sm font-semibold text-slate-900 dark:text-zinc-200 mb-1 select-none">
        {title}
      </h3>
      
      <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mb-4 leading-relaxed select-none">
        {description}
      </p>

      {onClearFilters && (
        <Button variant="secondary" size="sm" onClick={onClearFilters}>
          Clear All Filters
        </Button>
      )}
    </div>
  );
};

export default EmptyState;

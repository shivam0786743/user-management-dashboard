import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

/**
 * Debounced Search Bar component.
 * Minimalist design with soft borders, light focus rings, and compact width.
 */
const SearchBar = ({ value, onSearch, placeholder = 'Search by name, email or department...' }) => {
  const [localValue, setLocalValue] = useState(value);
  const onSearchRef = useRef(onSearch);

  // Sync ref to always have the latest callback reference
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  // Synchronize local input state with potential external resets
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Run the debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchRef.current(localValue);
    }, 300); // 300ms debounce interval

    return () => {
      clearTimeout(timer);
    };
  }, [localValue]);

  const handleClear = () => {
    setLocalValue('');
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-sm group">
      {/* Search Lens Icon */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiSearch className="h-3.5 w-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-150" />
      </div>

      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="w-full pl-9 pr-8 py-1.5 text-xs bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-150 placeholder-slate-400 dark:placeholder-zinc-500 hover:border-slate-300 dark:hover:border-zinc-700 shadow-sm"
        placeholder={placeholder}
      />

      {/* Clear button */}
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-450 hover:text-slate-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
          aria-label="Clear search"
        >
          <FiX className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

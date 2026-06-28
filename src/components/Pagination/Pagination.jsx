import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

/**
 * Segmented Border Group Pagination Controller.
 * Unified button group styling matching the reference image.
 */
const Pagination = ({
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) onPageChange(page);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-3 select-none border-t border-slate-100 dark:border-zinc-800/60 pt-5 mt-2">

      {/* Left: segmented button group containing prev, numbers, and next */}
      <div className="flex items-center justify-center md:justify-start">
        <div className="inline-flex items-center -space-x-px rounded-lg border border-slate-220 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
          
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-600 dark:text-zinc-450 hover:bg-slate-50 dark:hover:bg-zinc-850 hover:text-slate-900 dark:hover:text-zinc-100 border-r border-slate-220 dark:border-zinc-800 disabled:opacity-45 disabled:pointer-events-none transition-colors duration-100 cursor-pointer"
          >
            <span className="text-[14px]">←</span> Previous
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
            .map((page, index, arr) => {
              const showEllipsis = index > 0 && page - arr[index - 1] > 1;
              return (
                <React.Fragment key={page}>
                  {showEllipsis && (
                    <span className="inline-flex items-center justify-center px-3 py-2 text-xs font-medium text-slate-400 dark:text-zinc-600 border-r border-slate-220 dark:border-zinc-800 select-none bg-white dark:bg-zinc-900">
                      …
                    </span>
                  )}
                  <button
                    onClick={() => handlePageChange(page)}
                    className={`inline-flex items-center justify-center px-3.5 py-2 text-xs font-medium border-r border-slate-220 dark:border-zinc-800 transition-colors duration-100 cursor-pointer ${
                      currentPage === page
                        ? 'bg-slate-50 dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 font-bold'
                        : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-850 hover:text-slate-900 dark:hover:text-zinc-100'
                    }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              );
            })}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-600 dark:text-zinc-450 hover:bg-slate-50 dark:hover:bg-zinc-850 hover:text-slate-900 dark:hover:text-zinc-100 disabled:opacity-45 disabled:pointer-events-none transition-colors duration-100 cursor-pointer"
          >
            Next <span className="text-[14px]">→</span>
          </button>

        </div>
      </div>

      {/* Right: page size + entry description */}
      <div className="flex flex-wrap items-center gap-2 justify-center md:justify-end">
        <span className="text-[11px] text-slate-450 dark:text-zinc-500">Show</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="px-2 py-1 text-xs bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 text-slate-650 dark:text-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 cursor-pointer shadow-sm transition-all duration-150"
        >
          {[10, 25, 50, 100].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <span className="text-xs text-slate-500 dark:text-zinc-400">
          Showing{' '}
          <span className="font-medium text-slate-800 dark:text-zinc-200">{startItem}</span>
          {' '}–{' '}
          <span className="font-medium text-slate-800 dark:text-zinc-200">{endItem}</span>
          {' '}of{' '}
          <span className="font-medium text-slate-800 dark:text-zinc-200">{totalItems}</span>
          {' '}entries
        </span>
      </div>

    </div>
  );
};

export default Pagination;

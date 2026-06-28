import React from 'react';
import { FiMail, FiEdit2, FiTrash2 } from 'react-icons/fi';

/**
 * Mobile/Tablet User Card — professional, minimal redesign.
 * Flat slate avatar, desaturated enterprise badges, and clean spacing.
 */
const Card = ({ user, onEdit, onDelete }) => {
  const getDeptStyle = (dept) => {
    const map = {
      Engineering: 'bg-blue-50/70 text-blue-700 border-blue-200/60 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30',
      HR:          'bg-green-50/70 text-green-700 border-green-200/60 dark:bg-green-950/20 dark:text-green-400 dark:border-green-900/30',
      Finance:     'bg-orange-50/70 text-orange-755 border-orange-200/60 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/30',
      Marketing:   'bg-purple-50/70 text-purple-700 border-purple-200/60 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-900/30',
      Operations:  'bg-slate-100/80 text-slate-700 border-slate-200/60 dark:bg-zinc-800/50 dark:text-zinc-400 dark:border-zinc-700/40',
    };
    return map[dept] || 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-zinc-850 dark:text-zinc-300';
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg shadow-sm hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-150 flex flex-col">
      <div className="p-4 flex flex-col gap-3">

        {/* Header row: avatar + name + ID */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200/50 dark:border-zinc-700/50 flex items-center justify-center text-slate-600 dark:text-zinc-400 text-xs font-semibold flex-shrink-0">
            {(user.firstName?.[0] ?? '?').toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-zinc-100 truncate">
              {user.firstName} {user.lastName}
            </h4>
            <p className="text-[11px] font-mono text-slate-400 dark:text-zinc-500">#{user.id}</p>
          </div>
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${getDeptStyle(user.department)}`}>
            {user.department}
          </span>
        </div>

        {/* Email */}
        <a
          href={`mailto:${user.email}`}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-900/50 border border-slate-200/60 dark:border-zinc-800/60 text-xs text-slate-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-900 transition-colors"
        >
          <FiMail className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
          <span className="truncate font-mono">{user.email}</span>
        </a>

        {/* Footer actions */}
        <div className="flex justify-end gap-1.5 pt-2.5 border-t border-slate-100 dark:border-zinc-800/60">
          <button
            onClick={() => onEdit(user)}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium text-slate-600 dark:text-zinc-300 hover:text-slate-955 hover:bg-slate-50 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 transition-colors cursor-pointer"
          >
            <FiEdit2 className="w-3 h-3" /> Edit
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium text-slate-600 dark:text-zinc-300 hover:text-red-600 hover:bg-red-50/50 dark:hover:bg-red-950/20 dark:hover:text-red-400 border border-slate-200 dark:border-zinc-800 transition-colors cursor-pointer"
          >
            <FiTrash2 className="w-3 h-3" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

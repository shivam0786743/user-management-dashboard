import React from 'react';
import { FiEdit2, FiTrash2, FiChevronUp, FiChevronDown } from 'react-icons/fi';

/**
 * Desktop User List Table — matching the reference design.
 * Clean rows, blue-themed circle avatars, checkbox column, and soft rounded department badges.
 */
const Table = ({ users, onEdit, onDelete, sortConfig, onSort }) => {
  const columns = [
    { key: 'id', label: 'ID', width: 'w-16' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'department', label: 'Department' },
  ];

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return (
        <svg
          className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity ml-1 flex-shrink-0 text-slate-450"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
        </svg>
      );
    }
    return sortConfig.direction === 'asc'
      ? <FiChevronUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 ml-1 flex-shrink-0" />
      : <FiChevronDown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 ml-1 flex-shrink-0" />;
  };

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
    <div className="w-full overflow-x-auto max-h-[620px] overflow-y-auto">
      <table className="w-full text-left border-collapse min-w-[820px]">

        {/* ── Header ── */}
        <thead>
          <tr className="border-b border-slate-200 dark:border-zinc-800 bg-transparent">
            {/* Mock Checkbox Header */}
            <th className="w-12 pl-6 py-3.5">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-slate-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500/10 focus:ring-offset-0 cursor-not-allowed bg-white dark:bg-zinc-900"
                disabled
              />
            </th>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => onSort(col.key)}
                className={`px-5 py-3.5 text-[11px] font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-normal cursor-pointer group select-none hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${col.width ?? ''}`}
              >
                <div className="flex items-center">
                  {col.label}
                  {renderSortIcon(col.key)}
                </div>
              </th>
            ))}
            <th className="px-5 py-3.5 text-[11px] font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-normal text-right select-none pr-6">
              Actions
            </th>
          </tr>
        </thead>

        {/* ── Rows ── */}
        <tbody className="divide-y divide-slate-100 dark:divide-zinc-850">
          {users.map((user) => (
            <tr
              key={user.id}
              className="group/row hover:bg-slate-50/60 dark:hover:bg-zinc-900/30 transition-colors duration-100"
            >
              {/* Mock Checkbox Row */}
              <td className="pl-6 py-4 w-12">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500/10 focus:ring-offset-0 cursor-not-allowed bg-white dark:bg-zinc-900"
                  disabled
                />
              </td>

              {/* ID */}
              <td className="px-5 py-4 text-xs font-mono text-slate-400 dark:text-zinc-500 w-16">
                #{user.id}
              </td>

              {/* First Name */}
              <td className="px-5 py-4 text-sm">
                <div className="flex items-center gap-3">
                  {/* Clean Blue Circle Avatar matching reference image */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100/50 dark:border-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-semibold">
                    {(user.firstName?.[0] ?? '?').toUpperCase()}
                  </div>
                  <span className="font-medium text-slate-900 dark:text-zinc-100">{user.firstName}</span>
                </div>
              </td>

              {/* Last Name */}
              <td className="px-5 py-4 text-sm font-medium text-slate-900 dark:text-zinc-100">
                {user.lastName}
              </td>

              {/* Email */}
              <td className="px-5 py-4 text-sm text-slate-550 dark:text-zinc-400 font-mono">
                {user.email}
              </td>

              {/* Department */}
              <td className="px-5 py-4 text-sm">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${getDeptStyle(user.department)}`}>
                  {user.department}
                </span>
              </td>

              {/* Actions */}
              <td className="px-5 pr-6 py-4 text-sm text-right">
                <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover/row:opacity-100 transition-opacity duration-100">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 rounded transition-colors cursor-pointer"
                    title="Edit user"
                  >
                    <FiEdit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-450 rounded transition-colors cursor-pointer"
                    title="Delete user"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

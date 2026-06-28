import React from 'react';
import { FiUsers, FiBriefcase, FiTrendingUp, FiAward } from 'react-icons/fi';

/**
 * StatsBar — a row of animated KPI cards shown above the user table.
 */
const StatsBar = ({ users, processedCount }) => {
  const deptCounts = users.reduce((acc, u) => {
    acc[u.department] = (acc[u.department] || 0) + 1;
    return acc;
  }, {});

  const topDept = Object.entries(deptCounts).sort((a, b) => b[1] - a[1])[0];
  const uniqueDepts = Object.keys(deptCounts).length;

  const stats = [
    {
      label: 'Total Users',
      value: users.length,
      icon: FiUsers,
      color: 'indigo',
      gradient: 'from-indigo-500 to-purple-600',
      bg: 'bg-indigo-50 dark:bg-indigo-950/30',
      border: 'border-indigo-100 dark:border-indigo-900/40',
      text: 'text-indigo-600 dark:text-indigo-400',
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/50',
    },
    {
      label: 'Showing Now',
      value: processedCount,
      icon: FiTrendingUp,
      color: 'violet',
      gradient: 'from-violet-500 to-purple-600',
      bg: 'bg-violet-50 dark:bg-violet-950/30',
      border: 'border-violet-100 dark:border-violet-900/40',
      text: 'text-violet-600 dark:text-violet-400',
      iconBg: 'bg-violet-100 dark:bg-violet-900/50',
    },
    {
      label: 'Departments',
      value: uniqueDepts,
      icon: FiBriefcase,
      color: 'pink',
      gradient: 'from-pink-500 to-rose-500',
      bg: 'bg-pink-50 dark:bg-pink-950/30',
      border: 'border-pink-100 dark:border-pink-900/40',
      text: 'text-pink-600 dark:text-pink-400',
      iconBg: 'bg-pink-100 dark:bg-pink-900/50',
    },
    {
      label: 'Top Department',
      value: topDept ? topDept[0] : '—',
      sub: topDept ? `${topDept[1]} members` : '',
      icon: FiAward,
      color: 'amber',
      gradient: 'from-amber-400 to-orange-500',
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      border: 'border-amber-100 dark:border-amber-900/40',
      text: 'text-amber-600 dark:text-amber-400',
      iconBg: 'bg-amber-100 dark:bg-amber-900/50',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`animate-float-up relative overflow-hidden rounded-2xl p-4 sm:p-5 border ${s.bg} ${s.border} group hover:scale-[1.02] transition-transform duration-200`}
          style={{ animationDelay: `${i * 80}ms` }}
        >
          {/* Subtle gradient orb */}
          <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full bg-gradient-to-br ${s.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />

          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                {s.label}
              </p>
              <p className={`text-2xl sm:text-3xl font-extrabold ${s.text} truncate leading-none`}>
                {s.value}
              </p>
              {s.sub && (
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-medium">{s.sub}</p>
              )}
            </div>
            <div className={`flex-shrink-0 p-2.5 rounded-xl ${s.iconBg}`}>
              <s.icon className={`w-5 h-5 ${s.text}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;

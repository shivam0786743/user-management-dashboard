import React from 'react';

/**
 * Reusable Button — minimal, professional redesign.
 * Solid primary blue accent, subtle borders, no flashy gradients or glows.
 */
const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  className = '',
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 ' +
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-950 ' +
    'disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer';

  const variants = {
    primary:
      'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm focus:ring-blue-500',

    secondary:
      'bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 ' +
      'text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-850 ' +
      'hover:text-slate-900 dark:hover:text-zinc-100 shadow-sm focus:ring-slate-400',

    danger:
      'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm focus:ring-red-500',

    ghost:
      'text-slate-600 dark:text-zinc-450 hover:bg-slate-100 dark:hover:bg-zinc-900 ' +
      'hover:text-slate-900 dark:hover:text-zinc-100 focus:ring-slate-300',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        Icon && iconPosition === 'left' && <Icon className="h-4 w-4 flex-shrink-0" />
      )}

      <span>{children}</span>

      {!isLoading && Icon && iconPosition === 'right' && (
        <Icon className="h-4 w-4 flex-shrink-0" />
      )}
    </button>
  );
};

export default Button;

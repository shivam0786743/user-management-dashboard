import React, { forwardRef } from 'react';

/**
 * Reusable Input component. Supports both standard input types and select elements.
 * Forwards its ref to integrate seamlessly with react-hook-form.
 */
const Input = forwardRef(({
  label,
  id,
  type = 'text',
  error,
  className = '',
  required = false,
  children,
  ...props
}, ref) => {
  const isSelect = type === 'select';
  
  const inputClass =
    'w-full px-3 py-2 text-sm rounded-lg border bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 ' +
    'border-slate-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 ' +
    'transition-all duration-150 shadow-sm placeholder-slate-400 dark:placeholder-zinc-500 ' +
    `${error ? 'border-red-500 focus:ring-red-500/10 focus:border-red-500 dark:border-red-500 dark:focus:ring-red-500/10' : ''} ` +
    `${className}`;

  return (
    <div className="w-full flex flex-col gap-1 text-left">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold text-slate-600 dark:text-zinc-400 select-none"
        >
          {label} {required && <span className="text-red-555">*</span>}
        </label>
      )}
      
      {isSelect ? (
        <select id={id} ref={ref} className={inputClass} {...props}>
          {children}
        </select>
      ) : (
        <input id={id} ref={ref} type={type} className={inputClass} {...props} />
      )}
      
      {error && (
        <span className="text-[11px] text-red-600 dark:text-red-400 font-medium mt-0.5 animate-slide-in">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

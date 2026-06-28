import React, { createContext, useContext, useState, useCallback } from 'react';
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';

const ToastContext = createContext(undefined);

/**
 * ToastProvider component that wraps the application and provides toast notifications.
 * Renders a list of active toasts at the bottom-right of the viewport.
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  const showSuccess = useCallback((message) => addToast(message, 'success'), [addToast]);
  const showError = useCallback((message) => addToast(message, 'error'), [addToast]);
  const showInfo = useCallback((message) => addToast(message, 'info'), [addToast]);

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showInfo, removeToast }}>
      {children}
      {/* Toast container overlay */}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 max-w-xs w-full px-4 pointer-events-none">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem = ({ toast, onClose }) => {
  const { message, type } = toast;

  let icon = <FiInfo className="w-4 h-4 text-blue-500 flex-shrink-0" />;
  let borderStyle = 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md';

  if (type === 'success') {
    icon = <FiCheckCircle className="w-4 h-4 text-green-600 dark:text-green-500 flex-shrink-0" />;
  } else if (type === 'error') {
    icon = <FiAlertCircle className="w-4 h-4 text-red-600 dark:text-red-500 flex-shrink-0" />;
  }

  return (
    <div
      className={`pointer-events-auto flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-left ${borderStyle} animate-slide-in`}
      role="alert"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {icon}
        <p className="text-xs font-medium text-slate-700 dark:text-zinc-200 truncate">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-3 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 rounded hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        aria-label="Dismiss notification"
      >
        <FiX className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

/**
 * Custom hook to consume the ToastContext.
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';

/**
 * Accessible, responsive Modal component.
 * Mounted directly to document.body using React Portals.
 * Listens for Escape key presses and outside clicks to close.
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  const modalRef = useRef(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      // Prevent background scrolling when modal is open
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Close modal when clicking outside the modal content container
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/30 dark:bg-zinc-950/50 backdrop-blur-[1px] animate-fade-in"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        className={`w-full ${sizeClasses[size]} bg-white dark:bg-zinc-900 rounded-lg border border-slate-250 dark:border-zinc-800 shadow-xl overflow-hidden transform scale-100 transition-all duration-150 animate-slide-in`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-zinc-100">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-650 dark:hover:text-zinc-200 rounded transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-5 py-4 max-h-[75vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

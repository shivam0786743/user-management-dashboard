import React from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { FiAlertTriangle } from 'react-icons/fi';

/**
 * Destructive action ConfirmDialog component.
 * Reuses the Portal Modal component, displaying warnings and executing confirmation promises.
 */
const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Confirmation',
  message = 'Are you sure you want to delete this record? This action is permanent and cannot be undone.',
  confirmText = 'Delete User',
  cancelText = 'Cancel',
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-red-50 dark:bg-red-950/25 text-red-600 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-900/30 flex-shrink-0">
            <FiAlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed select-none">
              {message}
            </p>
          </div>
        </div>

        {/* Form controls */}
        <div className="flex items-center justify-end gap-2 mt-2 pt-3 border-t border-slate-150 dark:border-zinc-800">
          <Button variant="secondary" onClick={onClose} disabled={isLoading} size="sm">
            {cancelText}
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isLoading} size="sm">
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;

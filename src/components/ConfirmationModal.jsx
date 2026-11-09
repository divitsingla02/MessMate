import React from 'react';
import { AlertCircle, X } from 'lucide-react';

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDanger = false,
  onConfirm,
  onCancel
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-messText/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-card-lg max-w-md w-full p-6 shadow-soft-lg border border-secondary-dark/30 transform transition-all"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isDanger ? 'bg-rose-100 text-rose-600' : 'bg-secondary text-primary'}`}>
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-messText">{title}</h3>
            </div>
          </div>
          <button 
            onClick={onCancel}
            className="text-messText-light hover:text-messText p-1 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-messText-muted mt-3 leading-relaxed">
          {message}
        </p>

        <div className="flex items-center justify-end gap-3 mt-6 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl border border-secondary-dark text-sm font-medium text-messText hover:bg-secondary/50 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${
              isDanger
                ? 'bg-rose-600 text-white hover:bg-rose-700'
                : 'bg-primary text-white hover:bg-primary-dark'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}


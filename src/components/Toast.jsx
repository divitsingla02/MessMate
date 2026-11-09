import React, { useState, useEffect, createContext, useContext } from 'react';
import { CheckCircle2, AlertTriangle, Info, X, Leaf, Sparkles } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = ({ message, subtitle, type = 'success', duration = 4000 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, subtitle, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Listen to custom window events for toasts
  useEffect(() => {
    const handleCustomToast = (e) => {
      if (e.detail) {
        showToast(e.detail);
      }
    };
    window.addEventListener('messmate_toast', handleCustomToast);
    return () => window.removeEventListener('messmate_toast', handleCustomToast);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast floating container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      showToast: (detail) => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('messmate_toast', { detail }));
        }
      }
    };
  }
  return context;
};

// Global helper to trigger toast from anywhere
export const triggerToast = (detail) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('messmate_toast', { detail }));
  }
};

const ToastItem = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, toast.duration);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  const getIcon = () => {
    switch (toast.type) {
      case 'eco':
      case 'waste':
        return <Leaf className="w-5 h-5 text-emerald-600 flex-shrink-0" />;
      case 'achievement':
        return <Sparkles className="w-5 h-5 text-accent flex-shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />;
      case 'success':
      default:
        return <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'eco':
      case 'waste':
        return 'border-emerald-200 bg-white/95';
      case 'achievement':
        return 'border-accent/40 bg-white/95';
      case 'warning':
        return 'border-amber-200 bg-white/95';
      case 'info':
        return 'border-blue-200 bg-white/95';
      default:
        return 'border-secondary-dark/60 bg-white/95';
    }
  };

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-soft-lg backdrop-blur-md transition-all duration-300 animate-fade-in ${getBorderColor()}`}
      role="alert"
    >
      <div className="mt-0.5">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-messText tracking-tight">{toast.message}</p>
        {toast.subtitle && (
          <p className="text-xs text-messText-muted mt-0.5 leading-relaxed">{toast.subtitle}</p>
        )}
      </div>
      <button
        onClick={onDismiss}
        className="text-messText-light hover:text-messText transition-colors p-1 rounded-md hover:bg-black/5"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};


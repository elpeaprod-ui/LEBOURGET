import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let borderClass = 'border-[#E4002B]';
        let icon = <Info className="w-5 h-5 text-red-500 shrink-0" />;

        if (toast.type === 'success') {
          borderClass = 'border-emerald-500';
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
        } else if (toast.type === 'warning') {
          borderClass = 'border-amber-500';
          icon = <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
        } else if (toast.type === 'error') {
          borderClass = 'border-red-600';
          icon = <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto bg-[#0A1128] text-white border-l-4 ${borderClass} p-4 shadow-2xl flex items-start gap-3 transition-all duration-300 animate-in slide-in-from-right`}
          >
            {icon}
            <div className="flex-1 text-xs font-medium text-slate-100 leading-snug">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-0.5"
              aria-label="Fermer la notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

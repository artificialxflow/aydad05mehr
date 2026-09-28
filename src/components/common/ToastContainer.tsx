import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-16 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-50 space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-3.5 rounded-2xl shadow-2xl border text-xs font-medium flex items-center gap-2.5 text-right animate-in fade-in slide-in-from-top-4 duration-200 ${
            toast.type === 'success'
              ? 'bg-[#151D35] text-emerald-300 border-emerald-500/40 shadow-emerald-950/40'
              : toast.type === 'danger'
              ? 'bg-[#151D35] text-red-300 border-red-500/40 shadow-red-950/40'
              : 'bg-[#151D35] text-purple-200 border-purple-500/40 shadow-purple-950/40'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
          {toast.type === 'danger' && <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-purple-400 flex-shrink-0" />}
          <span className="flex-1 leading-snug">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

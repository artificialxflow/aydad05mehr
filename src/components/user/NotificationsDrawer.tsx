import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, X, Check, ShieldAlert, Scale, Info } from 'lucide-react';

export const NotificationsDrawer: React.FC = () => {
  const {
    notificationsDrawerOpen,
    setNotificationsDrawerOpen,
    notifications,
    markNotificationsAsRead,
  } = useApp();

  if (!notificationsDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#090D1A]/80 backdrop-blur-sm flex items-start justify-center p-4 pt-16">
      <div className="bg-[#12182E] rounded-3xl p-5 max-w-sm w-full border border-purple-500/30 text-right animate-in fade-in slide-in-from-top-4 shadow-2xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-bold text-white">اعلان‌ها و پیام‌های سیستم</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markNotificationsAsRead}
              className="text-[10px] text-purple-300 hover:underline"
            >
              علامت همه به عنوان خوانده‌شده
            </button>
            <button onClick={() => setNotificationsDrawerOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-2xl border text-right transition-colors ${
                n.read ? 'bg-[#090D1A] border-white/5 opacity-80' : 'bg-purple-950/20 border-purple-500/30'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-white flex items-center gap-1.5">
                  {n.type === 'proposal' && <Scale className="w-3.5 h-3.5 text-blue-400" />}
                  {n.type === 'security' && <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />}
                  {n.type === 'system' && <Info className="w-3.5 h-3.5 text-purple-400" />}
                  <span>{n.title}</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{n.message}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => setNotificationsDrawerOpen(false)}
          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-colors"
        >
          بستن اعلان‌ها
        </button>
      </div>
    </div>
  );
};

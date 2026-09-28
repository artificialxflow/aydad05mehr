import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  Smartphone,
  Maximize2,
  User as UserIcon,
  Scale,
  Settings,
  Bell,
  LogIn,
  Radio,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentRole,
    setCurrentRole,
    currentUser,
    openAuthModal,
    viewDeviceFrame,
    setViewDeviceFrame,
    isLiveLocationActive,
    setNotificationsDrawerOpen,
    notifications,
  } = useApp();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-[#090D1A]/95 backdrop-blur-md border-b border-purple-500/15 px-3 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
        {/* Brand Zone */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-900/30">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-white">آیداد</span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Aydad v2
              </span>
            </div>
            <p className="text-[10px] text-[#8E95A9] hidden sm:block -mt-0.5">
              سامانه هوشمند امنیت بانوان و شبکه فریلنسری وکلا
            </p>
          </div>
        </div>

        {/* 3 Main Apps Switcher */}
        <div className="flex items-center p-1 bg-[#12182E] rounded-2xl border border-white/10 text-xs">
          <button
            onClick={() => setCurrentRole('citizen')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              currentRole === 'citizen'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-[#8E95A9] hover:text-white'
            }`}
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">اپلیکیشن</span>
            <span>شهروند</span>
          </button>

          <button
            onClick={() => setCurrentRole('lawyer')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              currentRole === 'lawyer'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-[#8E95A9] hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">اپلیکیشن</span>
            <span>وکیل فریلنسر</span>
          </button>

          <button
            onClick={() => setCurrentRole('admin')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              currentRole === 'admin'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-[#8E95A9] hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">پنل</span>
            <span>مدیریت</span>
          </button>
        </div>

        {/* Actions (Notifications, Mobile Frame Toggle, Login) */}
        <div className="flex items-center gap-2">
          {/* Notifications Button */}
          <button
            onClick={() => setNotificationsDrawerOpen(true)}
            className="relative w-9 h-9 rounded-2xl bg-[#12182E] hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 transition-colors"
            title="اعلان‌ها"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </button>

          {/* Toggle Device Frame on desktop */}
          <button
            onClick={() => setViewDeviceFrame(!viewDeviceFrame)}
            title={viewDeviceFrame ? 'نمای تمام‌صفحه' : 'نمای گوشی هوشمند'}
            className="hidden lg:flex items-center justify-center w-9 h-9 rounded-2xl bg-[#12182E] hover:bg-white/10 border border-white/10 text-slate-300 transition-colors"
          >
            {viewDeviceFrame ? <Maximize2 className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>

          {/* User Auth Profile Trigger */}
          <button
            onClick={() => openAuthModal('login')}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-2xl bg-[#12182E] hover:bg-[#1a2340] border border-white/10 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-purple-500/30 text-purple-300 flex items-center justify-center text-xs font-bold">
              {currentUser?.name?.charAt(0) || 'ک'}
            </div>
            <span className="text-xs font-bold text-white hidden sm:block truncate max-w-[80px]">
              {currentUser?.name || 'ورود'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

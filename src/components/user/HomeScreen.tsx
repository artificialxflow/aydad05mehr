import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  Bell,
  MapPin,
  PhoneCall,
  Share2,
  Bot,
  ArrowLeft,
  AlertTriangle,
  Headphones,
  ShieldCheck,
  BookOpen,
  Scale,
  Plus,
  ChevronLeft,
  Star,
  Users,
  Radio,
} from 'lucide-react';
import { AIAssistantDrawer } from './AIAssistantDrawer';
import { DangerReportModal } from './DangerReportModal';

export const HomeScreen: React.FC = () => {
  const {
    triggerSOS,
    isLiveLocationActive,
    toggleLiveLocation,
    specialists,
    setActiveTab,
    setSelectedLawyerForBooking,
    setNewProjectModalOpen,
    currentUser,
    openAuthModal,
    setVirtualCompanionModalOpen,
    setHelpSupportModalOpen,
    setSelectedServiceCategory,
    setServiceDetailModalOpen,
    setNotificationsDrawerOpen,
    showToast,
  } = useApp();

  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isDangerModalOpen, setIsDangerModalOpen] = useState(false);

  return (
    <div className="space-y-4 pb-28 md:pb-12 max-w-md mx-auto px-3.5 pt-2">
      {/* Top Header matching Screen 2 */}
      <div className="flex items-center justify-between py-2">
        {/* Brand logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-900/40">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-white">آیداد</span>
              <span className="text-[10px] text-purple-400 font-mono">Aydad</span>
            </div>
            <span className="text-[10px] text-[#8E95A9] block -mt-0.5">امنیت در کنار شما</span>
          </div>
        </div>

        {/* Right side: Notification bell & User avatar */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast('شما هیچ اعلان خوانده‌نشده‌ای ندارید', 'info')}
            className="relative w-9 h-9 rounded-2xl bg-[#12182E] hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
          </button>

          <button
            onClick={() => openAuthModal('login')}
            className="w-9 h-9 rounded-2xl overflow-hidden border border-purple-500/30 flex items-center justify-center bg-purple-900/30"
          >
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
              alt="Sara"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* Hero Card matching Screen 2 (Night city background with glowing red SOS trigger) */}
      <div className="relative rounded-[32px] overflow-hidden border border-purple-500/20 shadow-2xl bg-[#12182E] p-5 text-right">
        {/* Ambient background glow and woman image overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#090D1A] via-[#12182E]/90 to-transparent z-10" />
        <img
          src="/src/assets/images/aydad_woman_hero_1790625713591.jpg"
          alt="Safety Hero"
          className="absolute left-0 top-0 bottom-0 w-44 object-cover object-center opacity-40 mix-blend-luminosity filter contrast-125"
        />

        <div className="relative z-20 flex items-center justify-between">
          <div className="max-w-[210px]">
            <span className="text-[11px] font-bold text-red-400 bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-500/20 inline-block mb-1.5">
              وضعیت اضطراری
            </span>
            <h2 className="text-xl font-black text-white leading-tight">
              کمک فوری در مواقع خطر
            </h2>
            <p className="text-xs text-[#8E95A9] mt-1 font-medium">
              دکمه SOS را فشار دهید
            </p>
          </div>

          {/* Glowing Circular SOS Button matching Screen 2 */}
          <button
            onClick={triggerSOS}
            className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FF003D] via-[#FF2E55] to-[#FF5B5B] shadow-[0_0_30px_rgba(255,0,61,0.6)] flex flex-col items-center justify-center text-white active:scale-90 transition-transform animate-pulse-sos flex-shrink-0"
          >
            <ShieldAlert className="w-5 h-5 text-white mb-0.5" />
            <span className="text-xs font-black tracking-widest">SOS</span>
          </button>
        </div>
      </div>

      {/* 3 Quick Action Cards Row matching Screen 2 */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Card 1: مکان امن */}
        <button
          onClick={() => setActiveTab('safety')}
          className="p-3 rounded-2xl bg-[#12182E] hover:bg-[#18213e] border border-white/5 flex flex-col items-center justify-center text-center transition-all group"
        >
          <div className="w-10 h-10 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-white block">مکان امن</span>
          <span className="text-[9px] text-[#8E95A9] mt-0.5 block leading-tight">پیدا کردن مکان‌های امن</span>
        </button>

        {/* Card 2: همراه مجازی */}
        <button
          onClick={() => setVirtualCompanionModalOpen(true)}
          className="p-3 rounded-2xl bg-[#12182E] hover:bg-[#18213e] border border-white/5 flex flex-col items-center justify-center text-center transition-all group"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
            <PhoneCall className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-white block">همراه مجازی</span>
          <span className="text-[9px] text-[#8E95A9] mt-0.5 block leading-tight">تماس و پشتیبانی</span>
        </button>

        {/* Card 3: اشتراک‌گذاری موقعیت */}
        <button
          onClick={toggleLiveLocation}
          className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all group ${
            isLiveLocationActive
              ? 'bg-emerald-950/20 border-emerald-500/30'
              : 'bg-[#12182E] border-white/5 hover:bg-[#18213e]'
          }`}
        >
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-1.5 transition-transform ${
            isLiveLocationActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-600/10 text-emerald-300'
          }`}>
            <Share2 className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-white block">اشتراک موقعیت</span>
          <span className="text-[9px] text-[#8E95A9] mt-0.5 block leading-tight">با دوستان و خانواده</span>
        </button>
      </div>

      {/* AI Assistant Banner Card matching Screen 2 */}
      <div
        onClick={() => setIsAiDrawerOpen(true)}
        className="bg-[#12182E] rounded-3xl p-3.5 border border-purple-500/25 hover:border-purple-500/50 cursor-pointer shadow-lg transition-all flex items-center justify-between gap-3 text-right group"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-purple-900/30 flex-shrink-0 group-hover:scale-105 transition-transform">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">مشکل یا سوالی دارید؟</h4>
            <p className="text-[11px] text-[#8E95A9] mt-0.5">با هوش مصنوعی آیداد صحبت کنید</p>
          </div>
        </div>

        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </div>
      </div>

      {/* "خدمات سریع" (Quick Services 4 Cards Grid matching Screen 2) */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-sm font-bold text-white">خدمات سریع</h3>
          <button
            onClick={() => setActiveTab('services')}
            className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-0.5"
          >
            <span>همه خدمات</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Service 1: گزارش خطر */}
          <button
            onClick={() => setIsDangerModalOpen(true)}
            className="p-3.5 rounded-2xl bg-[#12182E] hover:bg-[#18213e] border border-white/5 text-right flex items-start gap-3 transition-colors"
          >
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 mt-0.5">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">گزارش خطر</span>
              <span className="text-[10px] text-[#8E95A9] mt-0.5 block">ثبت و پیگیری</span>
            </div>
          </button>

          {/* Service 2: پشتیبانی فوری */}
          <button
            onClick={() => setHelpSupportModalOpen(true)}
            className="p-3.5 rounded-2xl bg-[#12182E] hover:bg-[#18213e] border border-white/5 text-right flex items-start gap-3 transition-colors"
          >
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 mt-0.5">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">پشتیبانی فوری</span>
              <span className="text-[10px] text-[#8E95A9] mt-0.5 block">۲۴ ساعته</span>
            </div>
          </button>

          {/* Service 3: تضمین امنیت */}
          <button
            onClick={() => setActiveTab('safety')}
            className="p-3.5 rounded-2xl bg-[#12182E] hover:bg-[#18213e] border border-white/5 text-right flex items-start gap-3 transition-colors"
          >
            <div className="p-2 rounded-xl bg-red-600/20 text-red-400 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">تضمین امنیت</span>
              <span className="text-[10px] text-[#8E95A9] mt-0.5 block">برای بانوان</span>
            </div>
          </button>

          {/* Service 4: آموزش و آگاهی */}
          <button
            onClick={() => {
              setSelectedServiceCategory('training');
              setServiceDetailModalOpen(true);
            }}
            className="p-3.5 rounded-2xl bg-[#12182E] hover:bg-[#18213e] border border-white/5 text-right flex items-start gap-3 transition-colors"
          >
            <div className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 mt-0.5">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">آموزش و آگاهی</span>
              <span className="text-[10px] text-[#8E95A9] mt-0.5 block">مهارت‌های فردی</span>
            </div>
          </button>
        </div>
      </div>

      {/* Freelance Lawyers Spotlight (Seamlessly integrated with user brief!) */}
      <div className="bg-[#12182E] rounded-3xl p-4 border border-purple-500/20 text-right shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-purple-400" />
            <h3 className="text-xs font-bold text-white">وکلای فریلنسر و مشاوران حقوقی</h3>
          </div>
          <button
            onClick={() => setNewProjectModalOpen(true)}
            className="px-2.5 py-1 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white text-[10px] font-bold border border-purple-500/30 transition-colors flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>ثبت پرونده</span>
          </button>
        </div>

        {specialists.slice(0, 1).map((lawyer) => (
          <div
            key={lawyer.id}
            className="bg-[#090D1A] rounded-2xl p-3 border border-white/5 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5">
              <img
                src={lawyer.avatar}
                alt={lawyer.name}
                className="w-11 h-11 rounded-xl object-cover border border-purple-500/30"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">{lawyer.name}</span>
                  <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1 py-0.2 rounded">
                    پروانه کانون
                  </span>
                </div>
                <p className="text-[10px] text-[#8E95A9] truncate max-w-[170px] mt-0.5">{lawyer.title}</p>
                <span className="text-[10px] font-mono text-purple-300 font-bold">
                  {lawyer.consultationFee.toLocaleString('fa-IR')} تومان / مشاوره فوری
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedLawyerForBooking(lawyer)}
              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold transition-colors shadow-md"
            >
              مشاوره
            </button>
          </div>
        ))}
      </div>

      {/* Global Modals for Home Screen */}
      <AIAssistantDrawer isOpen={isAiDrawerOpen} onClose={() => setIsAiDrawerOpen(false)} />
      <DangerReportModal isOpen={isDangerModalOpen} onClose={() => setIsDangerModalOpen(false)} />
    </div>
  );
};

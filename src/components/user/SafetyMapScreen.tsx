import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Share2,
  AlertTriangle,
  Mic,
  PhoneCall,
  ChevronLeft,
  Shield,
  Building2,
  Cross,
  HeartHandshake,
  Star,
  Navigation,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { DangerReportModal } from './DangerReportModal';

export const SafetyMapScreen: React.FC = () => {
  const {
    isLiveLocationActive,
    toggleLiveLocation,
    isRecordingSecretAudio,
    toggleSecretAudio,
    triggerSOS,
    showToast,
  } = useApp();

  const [activeTabMode, setActiveTabMode] = useState<'menu' | 'map'>('menu');
  const [isDangerModalOpen, setIsDangerModalOpen] = useState(false);
  const [selectedMapFilter, setSelectedMapFilter] = useState<'nearby' | 'all'>('nearby');

  const safePlacesList = [
    {
      id: 'p-1',
      name: 'ایستگاه پلیس ۱۰۳ ونک',
      category: 'کلانتری و پلیس',
      distance: '۱.۲ کیلومتر',
      rating: 4.9,
      phone: '110',
      icon: Shield,
      color: 'bg-blue-600/20 text-blue-400',
    },
    {
      id: 'p-2',
      name: 'داروخانه شبانه‌روزی میرداماد',
      category: 'داروخانه شبانه‌روزی',
      distance: '۱.۵ کیلومتر',
      rating: 4.8,
      phone: '02122223344',
      icon: Cross,
      color: 'bg-emerald-600/20 text-emerald-400',
    },
    {
      id: 'p-3',
      name: 'مرکز بهداشت و درمان مطهری',
      category: 'بیمارستان و اورژانس',
      distance: '۲.۳ کیلومتر',
      rating: 4.7,
      phone: '115',
      icon: Building2,
      color: 'bg-purple-600/20 text-purple-400',
    },
    {
      id: 'p-4',
      name: 'مجموعه امن و خانه حمایت بانوان',
      category: 'اورژانس اجتماعی بهزیستی',
      distance: '۲.۸ کیلومتر',
      rating: 4.9,
      phone: '123',
      icon: HeartHandshake,
      color: 'bg-pink-600/20 text-pink-400',
    },
  ];

  return (
    <div className="space-y-4 pb-28 md:pb-12 max-w-md mx-auto px-3.5 pt-2 text-right">
      {/* Segmented Top Mode Switcher (منوی قابلیت‌های امنیت vs نقشه مکان‌های امن) */}
      <div className="flex items-center p-1 bg-[#12182E] rounded-2xl border border-white/10 text-xs">
        <button
          onClick={() => setActiveTabMode('menu')}
          className={`flex-1 py-2 rounded-xl font-bold transition-all ${
            activeTabMode === 'menu'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-[#8E95A9] hover:text-white'
          }`}
        >
          موقعیت و امنیت (قابلیت‌ها)
        </button>
        <button
          onClick={() => setActiveTabMode('map')}
          className={`flex-1 py-2 rounded-xl font-bold transition-all ${
            activeTabMode === 'map'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-[#8E95A9] hover:text-white'
          }`}
        >
          نقشه مکان‌های امن
        </button>
      </div>

      {/* ======================================================= */}
      {/* MODE 1: SAFETY MENU (Matching Screen 4) */}
      {/* ======================================================= */}
      {activeTabMode === 'menu' && (
        <div className="space-y-3.5 animate-in fade-in duration-200">
          {/* Purple Gradient Banner matching Screen 4 */}
          <div className="rounded-3xl p-5 bg-gradient-to-r from-purple-800 via-indigo-800 to-purple-900 border border-purple-400/30 shadow-xl flex items-center justify-between">
            <div className="max-w-[240px]">
              <span className="text-[10px] text-purple-200 bg-white/10 px-2 py-0.5 rounded-full inline-block mb-1">
                امنیت ۲۴ ساعته
              </span>
              <h3 className="text-base font-black text-white">
                هم‌پای شماست تا آرامش
              </h3>
              <p className="text-[11px] text-purple-200 mt-1 leading-snug">
                با قابلیت‌های هوشمند امنیت، هر لحظه در پناه شبکه حفاظتی آیداد باشید.
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center flex-shrink-0 text-white shadow-inner">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* 5 Menu Capability Rows matching Screen 4 */}
          <div className="space-y-2.5">
            {/* 1. مکان‌های امن */}
            <button
              onClick={() => setActiveTabMode('map')}
              className="w-full p-4 rounded-2xl bg-[#12182E] hover:bg-[#18213e] border border-white/5 flex items-center justify-between transition-colors text-right"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">مکان‌های امن</h4>
                  <p className="text-xs text-[#8E95A9] mt-0.5">نزدیک‌ترین مکان‌های امن در اطراف شما</p>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-slate-500" />
            </button>

            {/* 2. اشتراک‌گذاری موقعیت */}
            <button
              onClick={toggleLiveLocation}
              className="w-full p-4 rounded-2xl bg-[#12182E] hover:bg-[#18213e] border border-white/5 flex items-center justify-between transition-colors text-right"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  isLiveLocationActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-600/10 text-emerald-300'
                }`}>
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">اشتراک‌گذاری موقعیت</h4>
                    {isLiveLocationActive && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-mono">فعال</span>
                    )}
                  </div>
                  <p className="text-xs text-[#8E95A9] mt-0.5">با خانواده و دوستان</p>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-slate-500" />
            </button>

            {/* 3. گزارش خطر */}
            <button
              onClick={() => setIsDangerModalOpen(true)}
              className="w-full p-4 rounded-2xl bg-[#12182E] hover:bg-[#18213e] border border-white/5 flex items-center justify-between transition-colors text-right"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-red-600/20 text-red-400 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">گزارش خطر</h4>
                  <p className="text-xs text-[#8E95A9] mt-0.5">ثبت سریع حادثه و ارسال به مراکز امنیتی</p>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-slate-500" />
            </button>

            {/* 4. ضبط صدا */}
            <button
              onClick={toggleSecretAudio}
              className="w-full p-4 rounded-2xl bg-[#12182E] hover:bg-[#18213e] border border-white/5 flex items-center justify-between transition-colors text-right"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  isRecordingSecretAudio ? 'bg-purple-600 text-white animate-pulse' : 'bg-purple-600/20 text-purple-400'
                }`}>
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">ضبط صدا</h4>
                    {isRecordingSecretAudio && (
                      <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.2 rounded animate-pulse">در حال ضبط...</span>
                    )}
                  </div>
                  <p className="text-xs text-[#8E95A9] mt-0.5">ثبت صوت در مواقع اضطراری</p>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-slate-500" />
            </button>

            {/* 5. تماس اضطراری */}
            <button
              onClick={triggerSOS}
              className="w-full p-4 rounded-2xl bg-[#12182E] hover:bg-[#18213e] border border-white/5 flex items-center justify-between transition-colors text-right"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-pink-600/20 text-pink-400 flex items-center justify-center flex-shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">تماس اضطراری</h4>
                  <p className="text-xs text-[#8E95A9] mt-0.5">دسترسی سریع به شماره‌های ضروری (SOS)</p>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================= */}
      {/* MODE 2: SAFE PLACES MAP (Matching Screen 5) */}
      {/* ======================================================= */}
      {activeTabMode === 'map' && (
        <div className="space-y-3.5 animate-in fade-in duration-200">
          {/* Top filter pills matching Screen 5: "نزدیک من" & "همه شهرها" */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">مکان‌های امن</h3>
            <div className="flex items-center gap-1.5 p-1 bg-[#12182E] rounded-xl border border-white/10 text-xs">
              <button
                onClick={() => setSelectedMapFilter('nearby')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  selectedMapFilter === 'nearby'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-[#8E95A9] hover:text-white'
                }`}
              >
                نزدیک من
              </button>
              <button
                onClick={() => setSelectedMapFilter('all')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  selectedMapFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-[#8E95A9] hover:text-white'
                }`}
              >
                همه شهرها
              </button>
            </div>
          </div>

          {/* Dark Map Canvas with glowing shield pins */}
          <div className="relative w-full h-56 rounded-3xl overflow-hidden border border-purple-500/20 bg-[#090D1A] shadow-xl">
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Glowing Map Pins */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center animate-ping-slow">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/50">
                  <Shield className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 rounded-full bg-pink-600/30 flex items-center justify-center animate-ping-slow">
                <div className="w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/50">
                  <HeartHandshake className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <div className="absolute top-3/4 left-1/3 -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 rounded-full bg-emerald-600/30 flex items-center justify-center animate-ping-slow">
                <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/50">
                  <Cross className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Center Current Location Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-purple-600 border-2 border-white shadow-[0_0_15px_#8B5CF6] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <span className="text-[9px] font-bold bg-[#090D1A]/90 text-white px-2 py-0.5 rounded-full border border-purple-500/40 mt-1 whitespace-nowrap shadow-md">
                موقعیت شما
              </span>
            </div>
          </div>

          {/* List of Safe Places matching Screen 5 */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white">مکان‌های امن نزدیک شما</h4>
            {safePlacesList.map((place) => {
              const Icon = place.icon;
              return (
                <div
                  key={place.id}
                  className="p-3.5 rounded-2xl bg-[#12182E] hover:bg-[#18213e] border border-white/5 flex items-center justify-between transition-colors text-right"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${place.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">{place.name}</h5>
                      <span className="text-[10px] text-[#8E95A9] block mt-0.5">{place.category}</span>
                      <div className="flex items-center gap-2 mt-1 text-[10px]">
                        <span className="text-purple-400 font-bold font-mono">{place.distance}</span>
                        <span>·</span>
                        <span className="text-amber-400 flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span className="font-mono">{place.rating}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={`tel:${place.phone}`}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-purple-600 hover:text-white text-purple-300 border border-white/10 transition-colors"
                    title="تماس"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Danger Report Modal */}
      <DangerReportModal isOpen={isDangerModalOpen} onClose={() => setIsDangerModalOpen(false)} />
    </div>
  );
};

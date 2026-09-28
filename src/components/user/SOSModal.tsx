import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  ChevronRight,
  Headphones,
  MapPin,
  Shield,
  PhoneCall,
  Users,
  CheckCircle2,
  X,
  Radio,
} from 'lucide-react';

export const SOSModal: React.FC = () => {
  const { isSOSActive, cancelSOS, trustedContacts, siteSettings, showToast } = useApp();
  const [countdown, setCountdown] = useState(5);
  const [isDispatched, setIsDispatched] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSOSActive && !isDispatched) {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      } else {
        setIsDispatched(true);
      }
    }
    return () => clearTimeout(timer);
  }, [isSOSActive, countdown, isDispatched]);

  if (!isSOSActive) return null;

  const handleManualSend = () => {
    setCountdown(0);
    setIsDispatched(true);
    showToast('هشدار اضطراری با موفقیت به مراکز امنیتی و مخاطبان مخابره شد', 'danger');
  };

  const handleClose = () => {
    setCountdown(5);
    setIsDispatched(false);
    cancelSOS();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#090D1A] flex flex-col justify-between p-4 sm:p-6 overflow-y-auto">
      {/* Top Header matching Screen 3 */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={handleClose}
          className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h2 className="text-lg font-black text-white">کمک فوری</h2>
          <p className="text-xs text-[#8E95A9]">با یک لمس، درخواست کمک ارسال کنید</p>
        </div>

        <button
          onClick={() => showToast('پشتیبانی ۲۴ ساعته آیداد: ۰۲۱۸۲۸۰۸۰۶۶', 'info')}
          className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-purple-400 transition-colors"
        >
          <Headphones className="w-5 h-5" />
        </button>
      </div>

      {/* Main Core: Glowing Radar and SOS Button matching Screen 3 */}
      <div className="my-auto flex flex-col items-center justify-center py-4">
        {!isDispatched ? (
          <>
            {/* Concentric Radar Rings */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
              {/* Outer Radar Rings */}
              <div className="absolute inset-0 rounded-full border border-red-500/20 animate-ping-slow" />
              <div className="absolute inset-4 rounded-full border border-red-500/30" />
              <div className="absolute inset-10 rounded-full border border-red-500/40 bg-red-950/20" />
              
              {/* Center Glowing SOS Button */}
              <button
                onClick={handleManualSend}
                className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-[#FF003D] via-[#FF2E55] to-[#FF5B5B] text-white shadow-[0_0_50px_rgba(255,0,61,0.6)] flex flex-col items-center justify-center active:scale-95 transition-transform animate-pulse-sos z-10"
              >
                <ShieldAlert className="w-10 h-10 text-white mb-1" />
                <span className="text-4xl font-black tracking-widest">SOS</span>
                <span className="text-[11px] font-semibold mt-1 opacity-90">
                  {countdown > 0 ? `ارسال در ${countdown} ثانیه` : 'لمس کنید'}
                </span>
              </button>
            </div>

            {/* Location Notice Card matching Screen 3 */}
            <div className="w-full max-w-sm bg-[#12182E] rounded-3xl p-4 border border-white/10 text-right mt-6 shadow-xl">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-2xl bg-purple-600/20 text-purple-400 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">ارسال موقعیت مکانی</h4>
                  <p className="text-xs text-[#8E95A9] mt-0.5 leading-relaxed">
                    موقعیت شما به نزدیک‌ترین مراکز امنیتی و مخاطبین اضطراری ارسال می‌شود.
                  </p>
                </div>
              </div>
            </div>

            {/* 3 Contact Quick Circles matching Screen 3 */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-sm mt-4">
              <a
                href={`tel:${siteSettings.policePhone}`}
                className="p-3 rounded-2xl bg-[#12182E] hover:bg-slate-800 border border-white/5 flex flex-col items-center justify-center gap-1.5 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-white">تماس با پلیس</span>
                <span className="text-[10px] text-slate-400 font-mono">۱۱۰</span>
              </a>

              <button
                onClick={() => showToast('پیام اضطراری به خانواده مخابره شد', 'success')}
                className="p-3 rounded-2xl bg-[#12182E] hover:bg-slate-800 border border-white/5 flex flex-col items-center justify-center gap-1.5 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-white">تماس با خانواده</span>
                <span className="text-[10px] text-slate-400">مادر / همسر</span>
              </button>

              <button
                onClick={() => showToast('پیام اضطراری به دوستان و وکیل مخابره شد', 'success')}
                className="p-3 rounded-2xl bg-[#12182E] hover:bg-slate-800 border border-white/5 flex flex-col items-center justify-center gap-1.5 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-white">تماس با دوستان</span>
                <span className="text-[10px] text-slate-400">وکیل مدافع</span>
              </button>
            </div>
          </>
        ) : (
          /* Dispatched Confirmation View */
          <div className="w-full max-w-sm bg-[#12182E] rounded-3xl p-6 border border-emerald-500/30 text-right shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-emerald-400 mb-4">
              <CheckCircle2 className="w-8 h-8 flex-shrink-0" />
              <div>
                <h3 className="text-base font-bold text-white">درخواست امداد ارسال شد</h3>
                <p className="text-xs text-slate-300">موقعیت زنده و ضبط محیط مخابره گردید</p>
              </div>
            </div>

            <div className="bg-[#090D1A] rounded-2xl p-3 border border-white/5 text-xs text-slate-300 space-y-1 mb-4">
              <div>موقعیت: <strong className="text-white">تهران، خیابان ولیعصر (دقت ۳ متر)</strong></div>
              <div>مخاطبان مطلع شده: <strong className="text-emerald-400">{trustedContacts.length} مخاطب امن</strong></div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
            >
              پایان وضعیت اضطراری
            </button>
          </div>
        )}
      </div>

      {/* Bottom Floating Long CTA matching Screen 3 */}
      {!isDispatched && (
        <div className="w-full max-w-sm mx-auto pb-2">
          <button
            onClick={handleManualSend}
            className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF003D] via-[#FF2E55] to-[#FF5B5B] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(255,0,61,0.5)] active:scale-[0.98] transition-transform"
          >
            <span>فشار طولانی برای ارسال SOS</span>
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
        </div>
      )}
    </div>
  );
};

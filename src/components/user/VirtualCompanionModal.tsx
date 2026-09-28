import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  PhoneCall,
  X,
  Clock,
  Shield,
  PhoneOff,
  User,
  Volume2,
  CheckCircle,
} from 'lucide-react';

export const VirtualCompanionModal: React.FC = () => {
  const { virtualCompanionModalOpen, setVirtualCompanionModalOpen, showToast } = useApp();

  const [intervalMinutes, setIntervalMinutes] = useState(15);
  const [isCompanionActive, setIsCompanionActive] = useState(false);
  const [isFakeCallTriggered, setIsFakeCallTriggered] = useState(false);
  const [fakeCallSeconds, setFakeCallSeconds] = useState(5);
  const [isRinging, setIsRinging] = useState(false);
  const [isCallAnswered, setIsCallAnswered] = useState(false);

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (isFakeCallTriggered && fakeCallSeconds > 0) {
      t = setTimeout(() => setFakeCallSeconds(fakeCallSeconds - 1), 1000);
    } else if (isFakeCallTriggered && fakeCallSeconds === 0 && !isRinging && !isCallAnswered) {
      setIsRinging(true);
    }
    return () => clearTimeout(t);
  }, [isFakeCallTriggered, fakeCallSeconds, isRinging, isCallAnswered]);

  if (!virtualCompanionModalOpen) return null;

  const startFakeCall = () => {
    setIsFakeCallTriggered(true);
    setFakeCallSeconds(4);
    setIsRinging(false);
    setIsCallAnswered(false);
    showToast('تماس جعلی تا ۴ ثانیه دیگر زنگ خواهد خورد. گوشی را آماده نگه‌دارید.', 'info');
  };

  const cancelFakeCall = () => {
    setIsFakeCallTriggered(false);
    setIsRinging(false);
    setIsCallAnswered(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#090D1A]/85 backdrop-blur-sm flex items-center justify-center p-4">
      {/* If Simulated Phone is ringing */}
      {isRinging && !isCallAnswered ? (
        <div className="fixed inset-0 z-50 bg-[#090D1A] flex flex-col justify-between p-8 text-center animate-in zoom-in-95">
          <div className="pt-12">
            <span className="text-xs text-purple-300 font-mono tracking-widest block mb-2 animate-pulse">
              تماس ورودی صوتی...
            </span>
            <div className="w-24 h-24 rounded-full bg-purple-600/30 border-2 border-purple-400 mx-auto flex items-center justify-center text-white mb-4 animate-bounce">
              <User className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-black text-white">پدر (منزل)</h2>
            <span className="text-xs text-slate-400 font-mono" dir="ltr">0912 111 2233</span>
          </div>

          <div className="flex items-center justify-around pb-12">
            <button
              onClick={cancelFakeCall}
              className="w-18 h-18 rounded-full bg-red-600 hover:bg-red-700 text-white flex flex-col items-center justify-center shadow-lg shadow-red-900/50"
            >
              <PhoneOff className="w-7 h-7" />
              <span className="text-[10px] mt-1 font-bold">رد تماس</span>
            </button>

            <button
              onClick={() => setIsCallAnswered(true)}
              className="w-18 h-18 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex flex-col items-center justify-center shadow-lg shadow-emerald-900/50 animate-pulse"
            >
              <PhoneCall className="w-7 h-7" />
              <span className="text-[10px] mt-1 font-bold">پاسخ</span>
            </button>
          </div>
        </div>
      ) : isCallAnswered ? (
        <div className="fixed inset-0 z-50 bg-[#090D1A] flex flex-col justify-between p-8 text-center animate-in fade-in">
          <div className="pt-12">
            <div className="w-20 h-20 rounded-full bg-emerald-600/30 border border-emerald-400 mx-auto flex items-center justify-center text-white mb-3">
              <User className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white">پدر (در حال مکالمه...)</h3>
            <span className="text-xs text-emerald-400 font-mono mt-1 block">00:18</span>

            <p className="text-xs text-slate-300 mt-6 max-w-xs mx-auto leading-relaxed bg-[#12182E] p-3 rounded-2xl border border-white/5">
              «سلام بابا جان، من سر کوچه هستم. ۵ دقیقه دیگه می‌رسم منزل، لطفاً در رو باز بذارید.»
            </p>
          </div>

          <button
            onClick={cancelFakeCall}
            className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto mb-12 shadow-lg"
          >
            <PhoneOff className="w-7 h-7" />
          </button>
        </div>
      ) : (
        /* Regular Virtual Companion Modal */
        <div className="bg-[#12182E] rounded-3xl p-5 max-w-sm w-full border border-purple-500/30 text-right animate-in fade-in shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-blue-400" />
              <h3 className="text-sm font-bold text-white">همراه مجازی و تماس اضطراری ساختگی</h3>
            </div>
            <button onClick={() => setVirtualCompanionModalOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Feature 1: Fake Call Simulator */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/25 space-y-2">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-purple-400" />
              <span>تماس تلفنی ساختگی (فرار از موقعیت مشکوک)</span>
            </h4>
            <p className="text-[11px] text-[#8E95A9] leading-relaxed">
              اگر در تاکسی یا خیابان احساس معذب بودن می‌کنید، با زدن دکمه زیر گوشی شما ۵ ثانیه دیگر به شکل واقعی زنگ می‌خورد تا بتوانید تظاهر به مکالمه کنید.
            </p>
            <button
              onClick={startFakeCall}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors shadow-md mt-1"
            >
              شروع زنگ خوردن گوشی (ظرف ۵ ثانیه)
            </button>
          </div>

          {/* Feature 2: Route Companion Timer */}
          <div className="p-4 rounded-2xl bg-[#090D1A] border border-white/5 space-y-2">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>همراه هوشمند مسیر (Periodic Check-in)</span>
            </h4>
            <p className="text-[11px] text-[#8E95A9] leading-relaxed">
              هر ۱۵ یا ۳۰ دقیقه یکبار از شما سوال می‌پرسد «آیا سالم رسیدید؟». در صورت عدم تأیید، هشدار به مخاطبین امن فرستاده می‌شود.
            </p>

            <button
              onClick={() => {
                setIsCompanionActive(!isCompanionActive);
                showToast(
                  !isCompanionActive
                    ? 'همراه هوشمند مسیر فعال شد و هر ۱۵ دقیقه وضعیت شما بررسی می‌گردد'
                    : 'همراه هوشمند مسیر متوقف شد',
                  'info'
                );
              }}
              className={`w-full py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                isCompanionActive
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
            >
              {isCompanionActive ? 'همراه هوشمند مسیر فعال است ✓' : 'فعال‌سازی ردیابی هوشمند مسیر'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

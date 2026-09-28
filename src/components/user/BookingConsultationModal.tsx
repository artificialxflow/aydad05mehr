import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Specialist } from '../../types';
import {
  Phone,
  Video,
  MessageSquare,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle,
  X,
  CreditCard,
  Lock,
} from 'lucide-react';

export const BookingConsultationModal: React.FC = () => {
  const { selectedLawyerForBooking, setSelectedLawyerForBooking, showToast } = useApp();

  const [consultType, setConsultType] = useState<'phone' | 'video' | 'chat'>('phone');
  const [selectedSlot, setSelectedSlot] = useState('امروز ساعت ۱۷:۰۰');
  const [userNotes, setUserNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!selectedLawyerForBooking) return null;

  const lawyer = selectedLawyerForBooking;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    showToast(`جلسه مشاوره با ${lawyer.name} با موفقیت ثبت شد`, 'success');
  };

  const handleClose = () => {
    setIsSuccess(false);
    setSelectedLawyerForBooking(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#151D35] rounded-3xl p-6 max-w-md w-full border border-purple-500/30 text-right animate-in fade-in zoom-in-95 my-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">رزرو جلسه مشاوره حقوقی فوری</h3>
              <p className="text-xs text-[#A3A8B8]">با {lawyer.name}</p>
            </div>
          </div>
          <button onClick={handleClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleConfirm} className="space-y-4">
            {/* Lawyer Quick Strip */}
            <div className="bg-[#0B1020] rounded-2xl p-3 border border-white/5 flex items-center gap-3">
              <img
                src={lawyer.avatar}
                alt={lawyer.name}
                className="w-12 h-12 rounded-xl object-cover border border-purple-500/30"
              />
              <div className="text-right">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">{lawyer.name}</span>
                  <span className="text-[10px] text-emerald-400 font-mono">({lawyer.barLicenseNumber})</span>
                </div>
                <p className="text-[11px] text-[#A3A8B8] truncate max-w-xs">{lawyer.title}</p>
                <span className="text-xs text-emerald-400 font-bold font-mono mt-0.5 block">
                  تعرفه: {lawyer.consultationFee.toLocaleString('fa-IR')} تومان
                </span>
              </div>
            </div>

            {/* Consultation Type Selector */}
            <div>
              <label className="text-xs text-[#A3A8B8] block mb-1.5 font-medium">نوع ارتباط:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setConsultType('phone')}
                  className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all ${
                    consultType === 'phone'
                      ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                      : 'bg-[#0B1020] text-slate-300 border-white/5'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>تماس تلفنی</span>
                </button>

                <button
                  type="button"
                  onClick={() => setConsultType('video')}
                  className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all ${
                    consultType === 'video'
                      ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                      : 'bg-[#0B1020] text-slate-300 border-white/5'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>تماس تصویری</span>
                </button>

                <button
                  type="button"
                  onClick={() => setConsultType('chat')}
                  className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all ${
                    consultType === 'chat'
                      ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                      : 'bg-[#0B1020] text-slate-300 border-white/5'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>چت متنی امن</span>
                </button>
              </div>
            </div>

            {/* Time Slot Picker */}
            <div>
              <label className="text-xs text-[#A3A8B8] block mb-1.5 font-medium">انتخاب زمان جلسه:</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['امروز ساعت ۱۷:۰۰', 'امروز ساعت ۱۹:۳۰', 'فردا ساعت ۱۱:۰۰', 'فردا ساعت ۱۵:۳۰'].map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-2.5 rounded-xl border text-center transition-colors font-mono ${
                      selectedSlot === slot
                        ? 'bg-purple-600/30 text-purple-300 border-purple-500 font-bold'
                        : 'bg-[#0B1020] text-slate-400 border-white/5 hover:border-white/20'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">
                خلاصه سوال یا موضوع پرونده (محرمانه):
              </label>
              <textarea
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="توضیح کوتاه تا وکیل قبل از تماس با موضوع آشنا باشد..."
                rows={2}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>

            {/* Summary & Price */}
            <div className="p-3 rounded-2xl bg-[#0B1020] border border-white/5 flex items-center justify-between text-xs">
              <span className="text-slate-400">مبلغ قابل پرداخت (با ضمانت برگشت):</span>
              <span className="text-emerald-400 font-black text-sm font-mono">
                {lawyer.consultationFee.toLocaleString('fa-IR')} تومان
              </span>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors shadow-lg shadow-purple-900/40"
              >
                تأیید و اتصال به درگاه پرداخت امن
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs transition-colors"
              >
                انصراف
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">مشاوره با موفقیت ثبت شد</h4>
              <p className="text-xs text-[#A3A8B8] mt-1">
                وکیل محترم، {lawyer.name} در زمان انتخابی ({selectedSlot}) از طریق سامانه امن با شما ارتباط برقرار خواهد کرد.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="w-full py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold"
            >
              متوجه شدم
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HelpCircle, X, PhoneCall, MessageCircle, ChevronDown, ShieldAlert } from 'lucide-react';

export const HelpSupportModal: React.FC = () => {
  const { helpSupportModalOpen, setHelpSupportModalOpen, siteSettings, showToast } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!helpSupportModalOpen) return null;

  const faqs = [
    {
      q: 'در زمان فشردن دکمه SOS چه اتفاقی می‌افتد؟',
      a: 'پیامک اضطراری حاوی لینک نقشه زنده و موقعیت مکانی دقیق شما بلافاصله برای مخاطبین امن ارسال شده و ضبط نامحسوس صدای محیط فعال می‌گردد.',
    },
    {
      q: 'چگونه می‌توانم از وکلای فریلنسر سامانه مشاوره بگیرم؟',
      a: 'در تب «خدمات»، می‌توانید درخواست پرونده حقوقی خود را ثبت کنید تا وکلای تأیید شده کانون پیشنهاد قیمت دهند، یا مستقیماً یک جلسه مشاوره تلفنی فوری رزرو کنید.',
    },
    {
      q: 'آیا موقعیت مکانی و صداهای ضبط‌شده محرمانه هستند؟',
      a: 'بله، تمامی داده‌ها با رمزنگاری سرتاسری ذخیره شده و فقط در صورت تأیید شما و جهت ارائه به مراجع قضایی یا مخاطبین امن قابل دسترس هستند.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#090D1A]/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#12182E] rounded-3xl p-5 max-w-md w-full border border-purple-500/30 text-right animate-in fade-in shadow-2xl my-auto">
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-teal-400" />
            <h3 className="text-sm font-bold text-white">پشتیبانی و راهنمای آیداد</h3>
          </div>
          <button onClick={() => setHelpSupportModalOpen(false)} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Support Hotline Banner */}
        <div className="p-3.5 rounded-2xl bg-[#090D1A] border border-white/5 flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold text-white block">مرکز پشتیبانی شبانه‌روزی</span>
            <span className="text-[11px] text-purple-300 font-mono" dir="ltr">{siteSettings.displayPhone}</span>
          </div>
          <a
            href={`tel:${siteSettings.emergencyPhone}`}
            className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>تماس</span>
          </a>
        </div>

        {/* FAQs */}
        <div className="space-y-2 mb-4">
          <span className="text-xs font-bold text-white block mb-1">پرسش‌های متداول بانوان:</span>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#090D1A] border border-white/5 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-3 text-right flex items-center justify-between text-xs font-bold text-white hover:text-purple-300"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-3 pb-3 text-xs text-[#8E95A9] leading-relaxed border-t border-white/5 pt-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            showToast('درخواست شما برای تیم پشتیبانی ارسال شد و به زودی پاسخ داده می‌شود', 'success');
            setHelpSupportModalOpen(false);
          }}
          className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors"
        >
          گفتگوی آنلاین با پشتیبانی
        </button>
      </div>
    </div>
  );
};

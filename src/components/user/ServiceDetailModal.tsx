import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Heart, BookOpen, Activity, Scale, Layers, Sparkles, Phone, CheckCircle } from 'lucide-react';

export const ServiceDetailModal: React.FC = () => {
  const {
    serviceDetailModalOpen,
    setServiceDetailModalOpen,
    selectedServiceCategory,
    setActiveTab,
    showToast,
  } = useApp();

  if (!serviceDetailModalOpen || !selectedServiceCategory) return null;

  const contentMap: Record<string, { title: string; subtitle: string; desc: string; bullets: string[] }> = {
    psychology: {
      title: 'مشاوره روانشناسی و تروما',
      subtitle: 'ویژه بانوان و بحران‌های خانوادگی',
      desc: 'خدمات مشاوره تخصصی بالینی برای کاهش استرس پس از سانحه (PTSD)، تسکین شوک ناشی از مزاحمت یا خشونت، و بازتوانی روحی توسط روانشناسان دارای پروانه سازمان نظام روانشناسی.',
      bullets: [
        'جلسات تلفنی و آنلاین کاملاً محرمانه',
        'مداخله فوری در بحران‌های عاطفی حاد',
        'پشتیبانی روانی در طول مراحل دادرسی دادگاه',
      ],
    },
    training: {
      title: 'آموزش امنیت و مهارت‌های فردی',
      subtitle: 'دوره‌های تخصصی پیشگیری از خطر',
      desc: 'آموزش‌های ویدیویی و صوتی استاندارد جهت ارتقای آگاهی بانوان در خصوص رفتارشناسی مهاجمان، تکنیک‌های رهایی از خطر در معابر خلوت، و حفظ خونسردی در موقعیت‌های اضطراری.',
      bullets: [
        'تکنیک‌های دفاع شخصی و افزایش هوشیاری محیطی',
        'نکات ایمنی در استفاده از تاکسی‌های اینترنتی',
        'حفظ حریم خصوصی و امنیت حساب‌های دیجیتال و شبکه‌های اجتماعی',
      ],
    },
    monitoring: {
      title: 'پایش آنلاین و سلامت مسیر',
      subtitle: 'حفاظت مداوم در سفرهای درون‌شهری',
      desc: 'ردیابی خودکار انحراف از مسیر مجاز، هشدار توقف طولانی در نقاط ناامن، و اعلام وضعیت بلادرنگ به سرورهای پشتیبانی آیداد.',
      bullets: [
        'تشخیص هوشمند انحراف مسیر تاکسی',
        'ارسال زنده مختصات به مخاطبان امن انتخابی',
        'ثبت گزارش سلامت در مقصد',
      ],
    },
    facilities: {
      title: 'تسهیلات و مراکز حمایتی همکار',
      subtitle: 'خانه‌های امن و سازمان‌های مردم‌نهاد',
      desc: 'شبکه ارتباطی مستقیم آیداد با خانه‌های امن بهزیستی، مراکز مداخله در بحران اورژانس اجتماعی ۱۲۳ و کانون‌های وکلای نیکوکار در سراسر کشور.',
      bullets: [
        'معرفی به مراکز اسکان اضطراری در شرایط تهدید جانی',
        'پذیرش با همکاری بهزیستی و اورژانس اجتماعی',
        'کمک‌های مشاوره‌ای و معاضدت‌های رایگان',
      ],
    },
    emergency: {
      title: 'خدمات اضطراری شبانه‌روزی',
      subtitle: 'پاسخگویی سریع ۲۴/۷',
      desc: 'تیم پشتیبانی و اپراتورهای آموزش‌دیده آیداد در تمام ساعات شبانه‌روز آماده هماهنگی با پلیس ۱۱۰، اورژانس ۱۱۵ و هدایت سریع امدادگران هستند.',
      bullets: [
        'پاسخگویی بدون معطلی در کمتر از ۳ بوق',
        'ارسال سریع آمبولانس یا گشت کلانتری',
        'راهنمایی گام‌به‌گام تا رسیدن نیروهای امدادی',
      ],
    },
  };

  const current = contentMap[selectedServiceCategory] || contentMap.psychology;

  return (
    <div className="fixed inset-0 z-50 bg-[#090D1A]/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12182E] rounded-3xl p-5 max-w-sm w-full border border-purple-500/30 text-right animate-in fade-in shadow-2xl space-y-3.5">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="text-sm font-bold text-white">{current.title}</h3>
            <span className="text-[10px] text-[#8E95A9]">{current.subtitle}</span>
          </div>
          <button onClick={() => setServiceDetailModalOpen(false)} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">{current.desc}</p>

        <div className="p-3 rounded-2xl bg-[#090D1A] border border-white/5 space-y-1.5">
          <span className="text-[11px] font-bold text-purple-300 block mb-1">ویژگی‌های این خدمت:</span>
          {current.bullets.map((b, i) => (
            <div key={i} className="flex items-center gap-2 text-[11px] text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>{b}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => {
              setServiceDetailModalOpen(false);
              showToast(`درخواست استفاده از ${current.title} ثبت شد`, 'success');
            }}
            className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors"
          >
            درخواست دریافت این خدمت
          </button>
          <button
            onClick={() => setServiceDetailModalOpen(false)}
            className="px-3 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};

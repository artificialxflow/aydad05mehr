import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bot,
  Send,
  Mic,
  X,
  Sparkles,
  Paperclip,
  CheckCircle,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const { showToast } = useApp();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: 'سلام! من دستیار هوشمند آیداد هستم.\nهر سوالی درباره امنیت، حقوق بانوان یا مشکلات روزمره دارید، بپرسید.',
      time: '۱۲:۳۰',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const suggestionChips = [
    'چطور از خودم در برابر مزاحمت‌ها محافظت کنم؟',
    'مقصد امن برای تردد در شب کجاست؟',
    'در صورت مواجهه با خطر چه کاری انجام دهم؟',
    'چگونه از وکیل فریلنسر مشاوره فوری بگیرم؟',
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    const time = new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { sender: 'user', text: q, time }]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      let reply = 'در چنین شرایطی، آرامش خود را حفظ نمایید. دکمه SOS آماده ارسال موقعیت زنده است و در صورت لزوم می‌توانید از بخش خدمات، با وکلای پایه یک مورد تأیید کانون ارتباط بگیرید.';
      if (q.includes('مزاحمت')) {
        reply = '۱. از تغییر مسیر ناگهانی یا ورود به کوچه‌های تاریک بپرهیزید و وارد مکان‌های عمومی روشن شوید.\n۲. صدای محیط را با قابلیت ضبط مخفی ثبت کنید.\n۳. شماره پلاک یا مشخصات را در گزارش خطر ثبت کنید؛ طبق ماده ۶۱۹ قانون مجازات اسلامی مزاحمت خیابانی جرم کیفری است.';
      } else if (q.includes('سفر') || q.includes('مقصد')) {
        reply = 'در نقشه «مکان‌های امن» آیداد، نزدیک‌ترین کلانتری‌ها، بیمارستان‌ها، داروخانه‌های شبانه‌روزی و مراکز حمایت بانوان در سراسر کشور نشان‌گذاری شده‌اند.';
      } else if (q.includes('وکیل') || q.includes('مشاوره') || q.includes('فریلنسر')) {
        reply = 'شما می‌توانید در تب «خدمات»، پرونده جدید خود را ثبت کنید تا وکلای فریلنسر پیشنهاد قیمت ارسال کنند یا مستقیماً یک جلسه مشاوره تلفنی رزرو نمایید.';
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply, time }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#090D1A]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#12182E] rounded-[32px] p-5 max-w-lg w-full border border-purple-500/30 text-right shadow-2xl flex flex-col h-[600px] max-h-[90vh] my-auto">
        {/* Header matching Screen 6 */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-900/40">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">دستیار هوشمند آیداد</h3>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>آنلاین و آماده پاسخگویی ۲۴ ساعته</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-none shadow-md'
                    : 'bg-[#090D1A] text-slate-200 border border-purple-500/20 rounded-bl-none whitespace-pre-line shadow-inner'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 font-mono px-1">{m.time}</span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-purple-400 p-2">
              <Sparkles className="w-4 h-4 animate-spin text-purple-400" />
              <span>دستیار در حال تحلیل پاسخ...</span>
            </div>
          )}
        </div>

        {/* Suggestion Chips matching Screen 6 */}
        <div className="py-2 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-[11px]">
          {suggestionChips.map((chip, i) => (
            <button
              key={i}
              onClick={() => handleSend(chip)}
              className="py-1.5 px-3 rounded-full bg-white/[0.04] hover:bg-purple-600/20 text-slate-300 hover:text-purple-300 border border-white/10 whitespace-nowrap transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar matching Screen 6 */}
        <div className="pt-2 border-t border-white/10 flex items-center gap-2 bg-[#090D1A] rounded-2xl p-1.5 border border-white/10">
          <button
            onClick={() => showToast('در حال شبیه‌سازی ضبط صدا برای هوش مصنوعی...', 'info')}
            className="p-2 rounded-xl text-slate-400 hover:text-purple-400 hover:bg-white/5 transition-colors"
          >
            <Mic className="w-5 h-5 text-purple-400" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="پیام خود را بنویسید..."
            className="flex-1 bg-transparent px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-40 text-white transition-colors"
          >
            <Send className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

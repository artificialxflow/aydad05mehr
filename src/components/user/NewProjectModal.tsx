import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Briefcase, X, Plus, AlertCircle, Shield } from 'lucide-react';

export const NewProjectModal: React.FC = () => {
  const { newProjectModalOpen, setNewProjectModalOpen, addProject, currentUser, showToast } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('کیفری و آزار بانوان');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(1500000);
  const [deadline, setDeadline] = useState('۲ روز کاری');
  const [urgency, setUrgency] = useState<'immediate' | 'high' | 'normal'>('high');

  if (!newProjectModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      showToast('لطفاً عنوان و شرح پرونده را وارد کنید', 'danger');
      return;
    }

    addProject({
      title,
      category,
      description,
      clientName: currentUser.name,
      clientPhone: currentUser.phone,
      budget: Number(budget),
      deadline,
      status: 'open',
      urgency,
    });

    setTitle('');
    setDescription('');
    setNewProjectModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#151D35] rounded-3xl p-6 max-w-lg w-full border border-purple-500/30 text-right animate-in fade-in zoom-in-95 my-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">ثبت پرونده یا استعلام قیمت حقوقی</h3>
              <p className="text-xs text-[#A3A8B8]">وکلای متخصص آیداد پیشنهاد قیمت و راهکار ارسال می‌کنند</p>
            </div>
          </div>
          <button
            onClick={() => setNewProjectModalOpen(false)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">عنوان درخواست یا پرونده:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: تنظیم فوری شکواییه مزاحمت در محل کار، مشاوره حضانت فرزند..."
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-400"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">دسته‌بندی موضوع:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
              >
                <option value="کیفری و آزار بانوان">کیفری و آزار بانوان</option>
                <option value="خشونت خانگی">خشونت خانگی</option>
                <option value="حقوق خانواده و مهریه">حقوق خانواده و مهریه</option>
                <option value="جرایم سایبری و اخاذی">جرایم سایبری و اخاذی</option>
                <option value="تنظیم لایحه و دادخواست">تنظیم لایحه و دادخواست</option>
                <option value="بررسی قرارداد استخدامی">بررسی قرارداد استخدامی</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">سطح فوریت:</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
              >
                <option value="immediate">بسیار فوری (۲۴ ساعت)</option>
                <option value="high">فوری (۲ تا ۳ روز)</option>
                <option value="normal">عادی (یک هفته)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">شرح کامل موضوع و نیاز حقوقی:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="جزییات حادثه، مستندات و مدارکی که در دست دارید (تصاویر، پیامک، صوت یا شهود)..."
              rows={4}
              className="w-full bg-[#0B1020] border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-400 leading-relaxed"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">بودجه پیشنهادی شما (تومان):</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                step="50000"
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400 font-mono"
                required
              />
            </div>

            <div>
              <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">مهلت پیشنهادی تحویل:</label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="مثال: ۲ روز کاری"
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          {/* Escrow Guarantee Notice */}
          <div className="p-3 rounded-2xl bg-[#0B1020] border border-emerald-500/20 text-xs text-slate-300 flex items-start gap-2">
            <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-emerald-400 font-bold block mb-0.5">حفظ محرمانگی و امانت‌داری آیداد:</span>
              <span className="text-[11px] text-slate-400">
                هویت و اطلاعات تماس شما تا زمان پذیرش وکیل کاملاً محفوظ است و مبالغ پرداختی نزد سامانه امن تا رضایت شما بلوکه می‌ماند.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors shadow-lg shadow-purple-900/40"
            >
              انتشار درخواست و دریافت پیشنهاد وکلای فریلنسر
            </button>
            <button
              type="button"
              onClick={() => setNewProjectModalOpen(false)}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs transition-colors"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  User as UserIcon,
  Scale,
  Shield,
  Phone,
  CheckCircle,
  FileText,
  Upload,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    authModalInitialTab,
    closeAuthModal,
    setCurrentUser,
    setCurrentRole,
    registerSpecialist,
    users,
    showToast,
  } = useApp();

  const [authTab, setAuthTab] = useState<'login' | 'register_citizen' | 'register_lawyer'>('login');

  // Login form state
  const [loginPhone, setLoginPhone] = useState('09303209196');

  // Citizen registration form state
  const [citName, setCitName] = useState('');
  const [citPhone, setCitPhone] = useState('');
  const [citContact, setCitContact] = useState('');

  // Lawyer registration form state
  const [lawName, setLawName] = useState('');
  const [lawPhone, setLawPhone] = useState('');
  const [lawBarId, setLawBarId] = useState('');
  const [lawTitle, setLawTitle] = useState('وکیل پایه یک دادگستری');
  const [lawFee, setLawFee] = useState(350000);
  const [lawExperience, setLawExperience] = useState(5);
  const [lawBio, setLawBio] = useState('');
  const [lawSpecialties, setLawSpecialties] = useState<string[]>(['جرایم علیه اشخاص', 'خشونت خانگی']);

  useEffect(() => {
    if (authModalInitialTab) {
      setAuthTab(authModalInitialTab);
    }
  }, [authModalInitialTab]);

  if (!authModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = users.find((u) => u.phone === loginPhone.trim());
    if (existing) {
      setCurrentUser(existing);
      setCurrentRole(existing.role);
      showToast(`خوش آمدید، ${existing.name}`, 'success');
      closeAuthModal();
    } else {
      // Mock create as citizen
      const newUser = {
        id: `u-${Date.now()}`,
        name: 'کاربر جدید',
        phone: loginPhone,
        role: 'citizen' as const,
        createdAt: 'امروز',
        isVerified: true,
      };
      setCurrentUser(newUser);
      setCurrentRole('citizen');
      showToast('ورود با موفقیت انجام شد', 'success');
      closeAuthModal();
    }
  };

  const handleRegisterCitizen = (e: React.FormEvent) => {
    e.preventDefault();
    if (!citName.trim() || !citPhone.trim()) {
      showToast('لطفاً نام و شماره تلفن را وارد کنید', 'danger');
      return;
    }

    const newUser = {
      id: `u-${Date.now()}`,
      name: citName,
      phone: citPhone,
      role: 'citizen' as const,
      createdAt: 'امروز',
      emergencyContactsCount: citContact ? 1 : 0,
      eventsCount: 0,
      isVerified: true,
    };
    setCurrentUser(newUser);
    setCurrentRole('citizen');
    showToast(`ثبت‌نام شهروندی با موفقیت انجام شد. خوش آمدید ${citName}`, 'success');
    closeAuthModal();
  };

  const handleRegisterLawyer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lawName.trim() || !lawPhone.trim() || !lawBarId.trim()) {
      showToast('لطفاً نام، شماره موبایل و شماره پروانه وکالت را وارد فرمایید', 'danger');
      return;
    }

    registerSpecialist({
      name: lawName,
      title: `${lawTitle} — متخصص ${lawSpecialties.join(' و ')}`,
      phone: lawPhone,
      barLicenseNumber: lawBarId,
      consultationFee: Number(lawFee),
      hourlyRate: Number(lawFee) * 2,
      experienceYears: Number(lawExperience),
      bio: lawBio || 'وکیل پایه یک آماده دفاع و مشاوره تخصصی در دعاوی حقوقی و کیفری.',
      specialties: lawSpecialties,
    });

    const newLawyerUser = {
      id: `u-${Date.now()}`,
      name: lawName,
      phone: lawPhone,
      role: 'lawyer' as const,
      createdAt: 'امروز',
      isVerified: false,
    };
    setCurrentUser(newLawyerUser);
    setCurrentRole('lawyer');
    closeAuthModal();
  };

  const toggleSpecialty = (spec: string) => {
    if (lawSpecialties.includes(spec)) {
      setLawSpecialties(lawSpecialties.filter((s) => s !== spec));
    } else {
      setLawSpecialties([...lawSpecialties, spec]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#151D35] rounded-3xl p-6 max-w-lg w-full border border-purple-500/30 text-right animate-in fade-in zoom-in-95 my-auto max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">ورود و عضویت در آیداد</h3>
              <p className="text-xs text-[#A3A8B8]">انتخاب نقش: شهروند یا وکیل فریلنسر</p>
            </div>
          </div>
          <button onClick={closeAuthModal} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Tabs */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-[#0B1020] rounded-2xl mb-4 border border-white/5 text-xs">
          <button
            onClick={() => setAuthTab('login')}
            className={`py-2 rounded-xl font-bold transition-all text-center ${
              authTab === 'login'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ورود سریع
          </button>
          <button
            onClick={() => setAuthTab('register_citizen')}
            className={`py-2 rounded-xl font-bold transition-all text-center ${
              authTab === 'register_citizen'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ثبت‌نام شهروند
          </button>
          <button
            onClick={() => setAuthTab('register_lawyer')}
            className={`py-2 rounded-xl font-bold transition-all text-center ${
              authTab === 'register_lawyer'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ثبت‌نام وکیل / فریلنسر
          </button>
        </div>

        {/* TAB 1: LOGIN */}
        {authTab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">شماره تلفن همراه:</label>
              <input
                type="tel"
                value={loginPhone}
                onChange={(e) => setLoginPhone(e.target.value)}
                placeholder="0912xxxxxxx"
                dir="ltr"
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400 font-mono text-left"
                required
              />
            </div>

            {/* Quick Demo Switcher Strip */}
            <div className="p-3 rounded-2xl bg-[#0B1020] border border-white/5 text-xs">
              <span className="text-slate-400 block mb-2 font-medium">ورود سریع آزمایشی (دمو):</span>
              <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                <button
                  type="button"
                  onClick={() => setLoginPhone('09303209196')}
                  className="p-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20"
                >
                  سارا (شهروند)
                </button>
                <button
                  type="button"
                  onClick={() => setLoginPhone('09123542940')}
                  className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/20"
                >
                  وکیل سارا امیری
                </button>
                <button
                  type="button"
                  onClick={() => setLoginPhone('09126723365')}
                  className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20"
                >
                  ادمین سامانه
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors shadow-lg shadow-purple-900/40"
            >
              ورود به سامانه
            </button>
          </form>
        )}

        {/* TAB 2: REGISTER CITIZEN */}
        {authTab === 'register_citizen' && (
          <form onSubmit={handleRegisterCitizen} className="space-y-3.5">
            <div>
              <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">نام و نام خانوادگی:</label>
              <input
                type="text"
                value={citName}
                onChange={(e) => setCitName(e.target.value)}
                placeholder="مثال: رویا رضایی"
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                required
              />
            </div>

            <div>
              <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">شماره موبایل فعال:</label>
              <input
                type="tel"
                value={citPhone}
                onChange={(e) => setCitPhone(e.target.value)}
                placeholder="0912xxxxxxx"
                dir="ltr"
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400 font-mono text-left"
                required
              />
            </div>

            <div>
              <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">
                شماره تماس اولویت اضطراری (مادر/همسر/دوست):
              </label>
              <input
                type="tel"
                value={citContact}
                onChange={(e) => setCitContact(e.target.value)}
                placeholder="0912xxxxxxx"
                dir="ltr"
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400 font-mono text-left"
              />
            </div>

            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-[11px] text-purple-200">
              با ثبت‌نام، دسترسی به دکمه فوری SOS، ضبط مخفی، نقشه امن و دستیار هوشمند حقوقی فعال می‌گردد.
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors shadow-lg shadow-purple-900/40"
            >
              تکمیل ثبت‌نام شهروند
            </button>
          </form>
        )}

        {/* TAB 3: REGISTER LAWYER / FREELANCER */}
        {authTab === 'register_lawyer' && (
          <form onSubmit={handleRegisterLawyer} className="space-y-3.5">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-200">
              به شبکه وکلای فریلنسر آیداد بپیوندید. پس از ثبت و تطبیق پروانه با کانون وکلا یا نظام مشاوره، حساب شما فعال می‌شود.
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">نام و نام خانوادگی:</label>
                <input
                  type="text"
                  value={lawName}
                  onChange={(e) => setLawName(e.target.value)}
                  placeholder="مثال: دکتر علیرضا نوری"
                  className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">شماره موبایل:</label>
                <input
                  type="tel"
                  value={lawPhone}
                  onChange={(e) => setLawPhone(e.target.value)}
                  placeholder="0912xxxxxxx"
                  dir="ltr"
                  className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-400 font-mono text-left"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">شماره پروانه وکالت / نظام:</label>
                <input
                  type="text"
                  value={lawBarId}
                  onChange={(e) => setLawBarId(e.target.value)}
                  placeholder="مثال: ۱۹۴۵۲/ک/الف"
                  className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-400 font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">تعرفه پیشنهادی مشاوره (تومان):</label>
                <input
                  type="number"
                  value={lawFee}
                  onChange={(e) => setLawFee(Number(e.target.value))}
                  step="50000"
                  className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-400 font-mono"
                  required
                />
              </div>
            </div>

            {/* Specialties Selection */}
            <div>
              <label className="text-xs text-[#A3A8B8] block mb-1.5 font-medium">زمینه‌های تخصصی شما:</label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'جرایم علیه اشخاص',
                  'خشونت خانگی',
                  'حقوق خانواده و مهریه',
                  'جرایم سایبری و فتا',
                  'تنظیم دادخواست و لایحه',
                  'قراردادهای کار',
                  'روانشناسی بحران',
                ].map((spec) => {
                  const isSelected = lawSpecialties.includes(spec);
                  return (
                    <button
                      type="button"
                      key={spec}
                      onClick={() => toggleSpecialty(spec)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-400'
                          : 'bg-[#0B1020] text-slate-400 border-white/5'
                      }`}
                    >
                      {spec}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">خلاصه رزومه و سوابق:</label>
              <textarea
                value={lawBio}
                onChange={(e) => setLawBio(e.target.value)}
                placeholder="سوابق دعاوی، تخصص در دادسرا، سال‌های فعالیت..."
                rows={2}
                className="w-full bg-[#0B1020] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-400"
              />
            </div>

            {/* Upload Document Simulator */}
            <div className="p-3 rounded-2xl bg-[#0B1020] border border-dashed border-white/20 text-center cursor-pointer hover:border-blue-400 transition-colors">
              <Upload className="w-5 h-5 text-blue-400 mx-auto mb-1" />
              <span className="text-xs text-slate-300 block">بارگذاری تصویر پروانه وکالت یا کارت ملی</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">فرمت PDF، JPG یا PNG (حداکثر ۱۰ مگابایت)</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors shadow-lg shadow-blue-900/40"
            >
              ارسال مدارک جهت بررسی و عضویت در پنل وکلا
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

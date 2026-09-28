import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  User,
  Settings,
  Users,
  Clock,
  HelpCircle,
  Plus,
  Trash2,
  Check,
  Scale,
  Sparkles,
} from 'lucide-react';

export const ProfileAndContactsScreen: React.FC = () => {
  const {
    currentUser,
    currentRole,
    setCurrentRole,
    trustedContacts,
    addTrustedContact,
    deleteTrustedContact,
    toggleContactSOS,
    openAuthModal,
    showToast,
  } = useApp();

  const [showContactsManager, setShowContactsManager] = useState(false);
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactRel, setNewContactRel] = useState<'مادر' | 'پدر' | 'همسر' | 'خواهر' | 'برادر' | 'دوست' | 'وکیل'>('مادر');
  const [newContactReceiveSOS, setNewContactReceiveSOS] = useState(true);

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactPhone.trim()) {
      showToast('لطفاً نام و شماره تلفن را وارد کنید', 'danger');
      return;
    }

    addTrustedContact({
      name: newContactName,
      relationship: newContactRel,
      phone: newContactPhone,
      priority: trustedContacts.length + 1,
      receiveSOS: newContactReceiveSOS,
    });

    setNewContactName('');
    setNewContactPhone('');
    setShowAddContactModal(false);
  };

  return (
    <div className="space-y-4 pb-28 md:pb-12 max-w-md mx-auto px-3.5 pt-2 text-right">
      {/* Header matching Screen 9 */}
      <div className="flex items-center justify-between pb-1">
        <button
          onClick={() => showToast('صفحه اصلی پروفایل', 'info')}
          className="w-9 h-9 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <h2 className="text-base font-bold text-white">پروفایل من</h2>
        <div className="w-9" />
      </div>

      {/* User Avatar & Info matching Screen 9 */}
      <div className="flex flex-col items-center justify-center py-2 text-center">
        <div className="relative w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-purple-600 via-pink-500 to-purple-400 shadow-xl shadow-purple-950/50 mb-2">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"
            alt={currentUser.name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h3 className="text-base font-black text-white">{currentUser.name}</h3>
        <p className="text-xs text-[#8E95A9] mt-0.5">عضویت از ۱۴۰۲</p>
      </div>

      {/* Safety Score Card matching Screen 9 */}
      <div className="bg-[#12182E] rounded-3xl p-5 border border-purple-500/25 shadow-xl relative overflow-hidden flex items-center justify-between">
        <div className="text-right">
          <span className="text-xs text-[#8E95A9] font-medium block">امتیاز امنیت</span>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-white font-mono">۸۷</span>
            <span className="text-xs text-[#8E95A9] font-mono">/ ۱۰۰</span>
          </div>
          <p className="text-[11px] text-purple-300">با رعایت نکات ایمنی، امتیاز خود را افزایش دهید</p>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500/80 flex items-center justify-center text-white shadow-lg shadow-purple-900/40 flex-shrink-0">
          <Shield className="w-7 h-7" />
        </div>
      </div>

      {/* Settings Menu Rows matching Screen 9 */}
      <div className="space-y-2">
        {/* 1. اطلاعات شخصی */}
        <button
          onClick={() => openAuthModal('login')}
          className="w-full p-4 rounded-2xl bg-[#12182E] hover:bg-[#18213e] border border-white/5 flex items-center justify-between transition-colors text-right"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-white">اطلاعات شخصی</span>
          </div>
          <ChevronLeft className="w-4 h-4 text-slate-500" />
        </button>

        {/* 2. تنظیمات امنیتی */}
        <button
          onClick={() => showToast('تنظیمات امنیتی و سنسور لرزش گوشی بررسی شد', 'info')}
          className="w-full p-4 rounded-2xl bg-[#12182E] hover:bg-[#18213e] border border-white/5 flex items-center justify-between transition-colors text-right"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-white">تنظیمات امنیتی</span>
          </div>
          <ChevronLeft className="w-4 h-4 text-slate-500" />
        </button>

        {/* 3. مخاطبین اضطراری */}
        <button
          onClick={() => setShowContactsManager(!showContactsManager)}
          className="w-full p-4 rounded-2xl bg-[#12182E] hover:bg-[#18213e] border border-white/5 flex items-center justify-between transition-colors text-right"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-600/20 text-pink-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">مخاطبین اضطراری</span>
              <span className="text-[10px] text-purple-300 font-mono mt-0.5 block">{trustedContacts.length} مخاطب معتمد</span>
            </div>
          </div>
          <ChevronLeft className={`w-4 h-4 text-slate-500 transition-transform ${showContactsManager ? '-rotate-90' : ''}`} />
        </button>

        {/* Expanded Contacts List if tapped */}
        {showContactsManager && (
          <div className="p-3.5 rounded-2xl bg-[#090D1A] border border-purple-500/20 space-y-2.5 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-bold">فهرست دریافت‌کنندگان پیامک اضطراری:</span>
              <button
                onClick={() => setShowAddContactModal(true)}
                className="px-2.5 py-1 rounded-lg bg-purple-600 text-white text-[10px] font-bold flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>افزودن</span>
              </button>
            </div>

            {trustedContacts.map((c) => (
              <div
                key={c.id}
                className="p-2.5 rounded-xl bg-[#12182E] border border-white/5 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="text-white font-bold">{c.name} ({c.relationship})</span>
                  <span className="text-slate-400 font-mono text-[10px] block" dir="ltr">{c.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => toggleContactSOS(c.id)}
                    className={`px-2 py-0.5 rounded text-[10px] ${
                      c.receiveSOS ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {c.receiveSOS ? 'دریافت SOS' : 'غیرفعال'}
                  </button>
                  <button onClick={() => deleteTrustedContact(c.id)} className="p-1 text-slate-500 hover:text-red-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. تاریخچه فعالیت‌ها */}
        <button
          onClick={() => showToast('تاریخچه ثبت SOS و اشتراک موقعیت ثبت شده است', 'info')}
          className="w-full p-4 rounded-2xl bg-[#12182E] hover:bg-[#18213e] border border-white/5 flex items-center justify-between transition-colors text-right"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-white">تاریخچه فعالیت‌ها</span>
          </div>
          <ChevronLeft className="w-4 h-4 text-slate-500" />
        </button>

        {/* 5. پشتیبانی و راهنما */}
        <button
          onClick={() => showToast('پشتیبانی ۲۴ ساعته: ۰۲۱۸۲۸۰۸۰۶۶', 'info')}
          className="w-full p-4 rounded-2xl bg-[#12182E] hover:bg-[#18213e] border border-white/5 flex items-center justify-between transition-colors text-right"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600/20 text-teal-400 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-white">پشتیبانی و راهنما</span>
          </div>
          <ChevronLeft className="w-4 h-4 text-slate-500" />
        </button>
      </div>

      {/* Role Switching Shortcut for easy testing */}
      <div className="pt-2">
        <span className="text-[10px] text-[#8E95A9] block mb-1.5 font-medium">جابجایی بین نقش‌های سامانه:</span>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <button
            onClick={() => setCurrentRole('citizen')}
            className={`py-2 px-1 rounded-xl transition-all font-bold ${
              currentRole === 'citizen' ? 'bg-purple-600 text-white shadow-md' : 'bg-[#12182E] text-slate-400'
            }`}
          >
            شهروند
          </button>
          <button
            onClick={() => setCurrentRole('lawyer')}
            className={`py-2 px-1 rounded-xl transition-all font-bold ${
              currentRole === 'lawyer' ? 'bg-blue-600 text-white shadow-md' : 'bg-[#12182E] text-slate-400'
            }`}
          >
            وکیل فریلنسر
          </button>
          <button
            onClick={() => setCurrentRole('admin')}
            className={`py-2 px-1 rounded-xl transition-all font-bold ${
              currentRole === 'admin' ? 'bg-emerald-600 text-white shadow-md' : 'bg-[#12182E] text-slate-400'
            }`}
          >
            پنل مدیریت
          </button>
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddContactModal && (
        <div className="fixed inset-0 z-50 bg-[#090D1A]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12182E] rounded-3xl p-5 max-w-sm w-full border border-purple-500/30 text-right animate-in fade-in">
            <h3 className="text-sm font-bold text-white mb-3">افزودن مخاطب اضطراری جدید</h3>
            <form onSubmit={handleSaveContact} className="space-y-3">
              <div>
                <label className="text-xs text-[#8E95A9] block mb-1">نام مخاطب:</label>
                <input
                  type="text"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  placeholder="مثال: مادر، همسر..."
                  className="w-full bg-[#090D1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-[#8E95A9] block mb-1">نسبت:</label>
                <select
                  value={newContactRel}
                  onChange={(e) => setNewContactRel(e.target.value as any)}
                  className="w-full bg-[#090D1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="مادر">مادر</option>
                  <option value="پدر">پدر</option>
                  <option value="همسر">همسر</option>
                  <option value="خواهر">خواهر</option>
                  <option value="دوست">دوست صمیمی</option>
                  <option value="وکیل">وکیل</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-[#8E95A9] block mb-1">شماره موبایل:</label>
                <input
                  type="tel"
                  value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  placeholder="0912xxxxxxx"
                  dir="ltr"
                  className="w-full bg-[#090D1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono text-left"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold"
                >
                  ذخیره
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddContactModal(false)}
                  className="px-3 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

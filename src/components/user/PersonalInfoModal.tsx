import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, X, CheckCircle, Shield } from 'lucide-react';

export const PersonalInfoModal: React.FC = () => {
  const { personalInfoModalOpen, setPersonalInfoModalOpen, currentUser, updateCurrentUserProfile } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [nationalId, setNationalId] = useState(currentUser.nationalId || '0029384751');

  if (!personalInfoModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUserProfile(name, phone, nationalId);
    setPersonalInfoModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#090D1A]/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12182E] rounded-3xl p-5 max-w-sm w-full border border-purple-500/30 text-right animate-in fade-in shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-bold text-white">ویرایش اطلاعات شخصی</h3>
          </div>
          <button onClick={() => setPersonalInfoModalOpen(false)} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs text-[#8E95A9] block mb-1">نام و نام خانوادگی:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#090D1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
              required
            />
          </div>

          <div>
            <label className="text-xs text-[#8E95A9] block mb-1">شماره تلفن همراه:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              dir="ltr"
              className="w-full bg-[#090D1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono text-left focus:outline-none focus:border-purple-400"
              required
            />
          </div>

          <div>
            <label className="text-xs text-[#8E95A9] block mb-1">کد ملی (جهت خدمات حقوقی و ثنا):</label>
            <input
              type="text"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              className="w-full bg-[#090D1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors"
            >
              ذخیره تغییرات
            </button>
            <button
              type="button"
              onClick={() => setPersonalInfoModalOpen(false)}
              className="px-3 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

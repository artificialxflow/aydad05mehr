import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, X, Shield, Smartphone, Mic, Lock, BellOff } from 'lucide-react';

export const SecuritySettingsModal: React.FC = () => {
  const {
    securitySettingsModalOpen,
    setSecuritySettingsModalOpen,
    isShakeSensorActive,
    toggleShakeSensor,
    showToast,
  } = useApp();

  const [autoRecordAudio, setAutoRecordAudio] = useState(true);
  const [silentSOS, setSilentSOS] = useState(false);
  const [pinLock, setPinLock] = useState(false);
  const [sensitivity, setSensitivity] = useState(3);

  if (!securitySettingsModalOpen) return null;

  const handleSave = () => {
    showToast('تنظیمات امنیتی ذخیره شد', 'success');
    setSecuritySettingsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#090D1A]/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12182E] rounded-3xl p-5 max-w-sm w-full border border-purple-500/30 text-right animate-in fade-in shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold text-white">تنظیمات امنیتی و سنسورها</h3>
          </div>
          <button onClick={() => setSecuritySettingsModalOpen(false)} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {/* Shake Sensor */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#090D1A] border border-white/5">
            <div>
              <span className="text-xs font-bold text-white block">سنسور لرزش گوشی (Shake)</span>
              <span className="text-[10px] text-[#8E95A9] block mt-0.5">ارسال خودکار هشدار با تکان شدید</span>
            </div>
            <button
              onClick={toggleShakeSensor}
              className={`w-10 h-5 rounded-full transition-colors flex items-center p-0.5 ${
                isShakeSensorActive ? 'bg-purple-600 justify-start' : 'bg-slate-700 justify-end'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
            </button>
          </div>

          {/* Auto Record Audio on SOS */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#090D1A] border border-white/5">
            <div>
              <span className="text-xs font-bold text-white block">ضبط خودکار صوت در SOS</span>
              <span className="text-[10px] text-[#8E95A9] block mt-0.5">شروع خودکار ضبط صدای محیط به مدت ۲ دقیقه</span>
            </div>
            <button
              onClick={() => setAutoRecordAudio(!autoRecordAudio)}
              className={`w-10 h-5 rounded-full transition-colors flex items-center p-0.5 ${
                autoRecordAudio ? 'bg-purple-600 justify-start' : 'bg-slate-700 justify-end'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
            </button>
          </div>

          {/* Silent SOS Mode */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#090D1A] border border-white/5">
            <div>
              <span className="text-xs font-bold text-white block">حالت بی‌صدا (Silent SOS)</span>
              <span className="text-[10px] text-[#8E95A9] block mt-0.5">ارسال هشدار بدون پخش صدای آژیر در صحنه</span>
            </div>
            <button
              onClick={() => setSilentSOS(!silentSOS)}
              className={`w-10 h-5 rounded-full transition-colors flex items-center p-0.5 ${
                silentSOS ? 'bg-purple-600 justify-start' : 'bg-slate-700 justify-end'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
            </button>
          </div>

          {/* PIN Lock */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#090D1A] border border-white/5">
            <div>
              <span className="text-xs font-bold text-white block">قفل رمز عبور یا اثر انگشت</span>
              <span className="text-[10px] text-[#8E95A9] block mt-0.5">درخواست رمز برای توقف هشدار اضطراری</span>
            </div>
            <button
              onClick={() => setPinLock(!pinLock)}
              className={`w-10 h-5 rounded-full transition-colors flex items-center p-0.5 ${
                pinLock ? 'bg-purple-600 justify-start' : 'bg-slate-700 justify-end'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
            </button>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors"
        >
          ذخیره تنظیمات امنیتی
        </button>
      </div>
    </div>
  );
};

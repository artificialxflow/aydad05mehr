import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  AlertTriangle,
  X,
  MapPin,
  ShieldAlert,
  ChevronRight,
  Shield,
  Eye,
  HandMetal,
  UserX,
  Volume2,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const DangerReportModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { addEmergencyEvent, showToast } = useApp();

  const [selectedType, setSelectedType] = useState<string>('مزاحمت خیابانی');
  const [details, setDetails] = useState('');

  if (!isOpen) return null;

  const incidentTypes = [
    { id: 'دزدی و سرقت', label: 'دزدی و سرقت', icon: ShieldAlert },
    { id: 'تعرض و آزار', label: 'تعرض و آزار', icon: UserX },
    { id: 'مزاحمت خیابانی', label: 'مزاحمت خیابانی', icon: Eye },
    { id: 'تهدید و ارعاب', label: 'تهدید و ارعاب', icon: AlertTriangle },
    { id: 'حوادث دیگر', label: 'حوادث دیگر', icon: Shield },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEmergencyEvent(
      selectedType === 'مزاحمت خیابانی' ? 'HARASSMENT' : selectedType === 'تهدید و ارعاب' ? 'THREAT' : 'SOS',
      `گزارش ${selectedType}`,
      details || `گزارش ثبت شده برای ${selectedType}`,
      'high'
    );
    showToast(`گزارش ${selectedType} با موقعیت مکانی زنده ثبت گردید`, 'success');
    setDetails('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#090D1A]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#12182E] rounded-[32px] p-6 max-w-md w-full border border-purple-500/25 text-right shadow-2xl shadow-purple-950/50 animate-in fade-in zoom-in-95 my-auto">
        {/* Header matching Screen 8 */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold text-white">گزارش خطر</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h4 className="text-sm font-bold text-white">اطلاعات حادثه را ثبت کنید</h4>
            <p className="text-xs text-[#8E95A9] mt-0.5">لطفاً نوع حادثه را انتخاب کنید</p>
          </div>

          {/* 5 Incident Type Cards (matching Screen 8) */}
          <div className="grid grid-cols-2 gap-2.5">
            {incidentTypes.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedType === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSelectedType(item.id)}
                  className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-2 border transition-all ${
                    isSelected
                      ? 'bg-purple-600/25 border-purple-500 text-white shadow-lg shadow-purple-900/30'
                      : 'bg-[#090D1A] border-white/5 text-[#8E95A9] hover:text-white hover:border-white/15'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-purple-500 text-white' : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Description input matching Screen 8 */}
          <div>
            <label className="text-xs text-[#8E95A9] block mb-1 font-medium">توضیحات بیشتر (اختیاری):</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="لطفاً جزییات حادثه را وارد کنید..."
              rows={3}
              className="w-full bg-[#090D1A] border border-white/10 rounded-2xl p-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-400 leading-relaxed"
            />
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>موقعیت جغرافیایی زنده شما ضمیمه این گزارش خواهد شد.</span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-500 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xs shadow-lg shadow-purple-900/40 transition-all active:scale-[0.98]"
          >
            ارسال گزارش
          </button>
        </form>
      </div>
    </div>
  );
};

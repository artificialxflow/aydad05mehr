import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, X, MapPin, Volume2, ShieldAlert, CheckCircle, Play, Pause } from 'lucide-react';

export const ActivityHistoryModal: React.FC = () => {
  const { activityHistoryModalOpen, setActivityHistoryModalOpen, events, showToast } = useApp();
  const [playingId, setPlayingId] = useState<string | null>(null);

  if (!activityHistoryModalOpen) return null;

  const togglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      showToast('در حال پخش صوت ضبط شده محیط...', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#090D1A]/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#12182E] rounded-3xl p-5 max-w-md w-full border border-purple-500/30 text-right animate-in fade-in shadow-2xl my-auto max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white">تاریخچه فعالیت‌ها و رویدادها</h3>
          </div>
          <button onClick={() => setActivityHistoryModalOpen(false)} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="p-3.5 rounded-2xl bg-[#090D1A] border border-white/5 space-y-2 text-right"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    ev.type === 'SOS'
                      ? 'bg-red-500/20 text-red-300'
                      : 'bg-purple-500/20 text-purple-300'
                  }`}
                >
                  {ev.typeLabelFa || ev.type}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{ev.timestamp}</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span className="truncate">{ev.location.address}</span>
              </div>

              {ev.audioUrl && (
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/80 border border-white/5 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => togglePlay(ev.id)}
                      className="w-7 h-7 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center transition-colors"
                    >
                      {playingId === ev.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                    </button>
                    <span className="text-purple-300 text-[11px]">صوت ضبط‌شده محیط</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[10px]">{ev.audioDuration || '01:12'}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => setActivityHistoryModalOpen(false)}
          className="mt-3 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors"
        >
          بستن تاریخچه
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FolderKanban,
  FileCheck,
  Clock,
  CheckCircle,
  MessageCircle,
  Phone,
  Shield,
  Star,
  Plus,
  AlertCircle,
  ChevronLeft,
} from 'lucide-react';

export const MyCasesScreen: React.FC = () => {
  const {
    projects,
    proposals,
    acceptProposal,
    setNewProjectModalOpen,
    setActiveTab,
    showToast,
  } = useApp();

  const [selectedCaseTab, setSelectedCaseTab] = useState<'active' | 'proposals'>('active');

  return (
    <div className="space-y-4 pb-28 md:pb-12 max-w-2xl mx-auto px-4 pt-2">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-purple-400" />
            <span>پرونده‌ها و مشاوره‌های من</span>
          </h2>
          <p className="text-xs text-[#A3A8B8]">پیگیری استعلام‌ها، پیشنهادهای دریافتی از وکلا و جلسات</p>
        </div>

        <button
          onClick={() => setNewProjectModalOpen(true)}
          className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>پرونده جدید</span>
        </button>
      </div>

      {/* Segmented Sub Tabs */}
      <div className="flex items-center p-1 bg-[#151D35] rounded-2xl border border-white/10 text-xs">
        <button
          onClick={() => setSelectedCaseTab('active')}
          className={`flex-1 py-2 rounded-xl font-bold transition-all ${
            selectedCaseTab === 'active'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-[#A3A8B8] hover:text-white'
          }`}
        >
          درخواست‌های من ({projects.length})
        </button>

        <button
          onClick={() => setSelectedCaseTab('proposals')}
          className={`flex-1 py-2 rounded-xl font-bold transition-all ${
            selectedCaseTab === 'proposals'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-[#A3A8B8] hover:text-white'
          }`}
        >
          پیشنهادهای وکلا ({proposals.length})
        </button>
      </div>

      {/* Cases List */}
      {selectedCaseTab === 'active' && (
        <div className="space-y-3">
          {projects.map((proj) => {
            const projectProposals = proposals.filter((p) => p.projectId === proj.id);
            return (
              <div
                key={proj.id}
                className="bg-[#151D35] rounded-3xl p-5 border border-white/5 hover:border-purple-500/20 transition-all text-right"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          proj.status === 'open'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}
                      >
                        {proj.status === 'open' ? 'در انتظار پیشنهاد وکلا' : 'در حال انجام توسط وکیل'}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">{proj.createdAt}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1.5">{proj.title}</h3>
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-400 bg-[#0B1020] px-2.5 py-1 rounded-xl border border-white/5">
                    {proj.budget.toLocaleString('fa-IR')} تومان
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{proj.description}</p>

                {/* Proposals Received Accordion */}
                <div className="mt-4 pt-3 border-t border-white/5">
                  <div className="flex items-center justify-between text-xs text-[#A3A8B8] mb-2">
                    <span className="font-semibold text-white">
                      پیشنهادهای ارسالی وکلا ({projectProposals.length}):
                    </span>
                    {projectProposals.length > 0 && (
                      <span className="text-purple-400 text-[11px]">جهت انتخاب وکیل کلیک کنید</span>
                    )}
                  </div>

                  {projectProposals.length === 0 ? (
                    <div className="p-3 rounded-2xl bg-[#0B1020] text-center text-xs text-slate-400">
                      هنوز پیشنهادی برای این پرونده ثبت نشده است. وکلای فعال به زودی پاسخ خواهند داد.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {projectProposals.map((prop) => (
                        <div
                          key={prop.id}
                          className="bg-[#0B1020] p-3.5 rounded-2xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-start gap-3">
                            <img
                              src={prop.specialistAvatar}
                              alt={prop.specialistName}
                              className="w-10 h-10 rounded-xl object-cover border border-white/10"
                            />
                            <div className="text-right">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white">{prop.specialistName}</span>
                                <span className="text-[10px] text-amber-400">★ {prop.specialistRating}</span>
                              </div>
                              <p className="text-[11px] text-[#A3A8B8]">{prop.specialistTitle}</p>
                              <p className="text-xs text-slate-200 mt-1 italic leading-relaxed">
                                «{prop.coverLetter}»
                              </p>
                              <div className="flex items-center gap-3 mt-1.5 text-[11px]">
                                <span className="text-emerald-400 font-bold font-mono">
                                  {prop.price.toLocaleString('fa-IR')} تومان
                                </span>
                                <span className="text-slate-400 font-mono">· تحویل در {prop.estimatedDays} روز</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                            {prop.status === 'accepted' ? (
                              <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>پذیرفته شده</span>
                              </span>
                            ) : (
                              <button
                                onClick={() => acceptProposal(prop.id)}
                                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-md"
                              >
                                پذیرش و استخدام وکیل
                              </button>
                            )}

                            <button
                              onClick={() => showToast(`اتصال به چت امن با ${prop.specialistName}`, 'info')}
                              className="p-2 rounded-xl bg-[#151D35] hover:bg-slate-800 text-slate-300 border border-white/10 transition-colors"
                              title="گفتگوی امن"
                            >
                              <MessageCircle className="w-4 h-4 text-purple-400" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Proposals Tab */}
      {selectedCaseTab === 'proposals' && (
        <div className="space-y-3">
          {proposals.map((prop) => (
            <div
              key={prop.id}
              className="bg-[#151D35] rounded-3xl p-5 border border-white/5 text-right shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <img
                    src={prop.specialistAvatar}
                    alt={prop.specialistName}
                    className="w-12 h-12 rounded-2xl object-cover border border-purple-500/30"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white">{prop.specialistName}</h3>
                    <p className="text-xs text-[#A3A8B8]">{prop.specialistTitle}</p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-amber-400">
                      <span>امتیاز: {prop.specialistRating} ★</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-300 font-mono">ثبت شده در {prop.createdAt}</span>
                    </div>
                  </div>
                </div>

                <div className="text-left bg-[#0B1020] p-2.5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 block">مبلغ پیشنهادی:</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">
                    {prop.price.toLocaleString('fa-IR')} تومان
                  </span>
                </div>
              </div>

              <div className="bg-[#0B1020] rounded-2xl p-3 mt-3 border border-white/5 text-xs text-slate-300 leading-relaxed">
                {prop.coverLetter}
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                <span className="text-xs text-slate-400">
                  زمان انجام تخمینی: <strong className="text-white">{prop.estimatedDays} روز کاری</strong>
                </span>

                <div className="flex items-center gap-2">
                  {prop.status === 'accepted' ? (
                    <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                      پرونده در جریان است
                    </span>
                  ) : (
                    <button
                      onClick={() => acceptProposal(prop.id)}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors shadow-md"
                    >
                      تأیید و پرداخت امن حق‌الوکاله
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

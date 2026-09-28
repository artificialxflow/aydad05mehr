import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  FolderKanban,
  PhoneCall,
  Wallet,
  UserCheck,
  Scale,
  Plus,
  Send,
  CheckCircle,
  Clock,
  MessageSquare,
  FileText,
  Upload,
  CreditCard,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  Check,
  Search,
  ChevronLeft,
  DollarSign,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { FreelanceProject, Proposal } from '../../types';

export const LawyerApp: React.FC = () => {
  const {
    lawyerActiveTab,
    setLawyerActiveTab,
    projects,
    proposals,
    addProposal,
    consultations,
    completeConsultation,
    walletTransactions,
    requestPayout,
    lawyerAvailability,
    toggleLawyerAvailability,
    uploadCaseDocument,
    specialists,
    updateLawyerProfile,
    showToast,
  } = useApp();

  const currentLawyer = specialists[0]; // Sara Amiri

  // Bidding modal
  const [biddingProject, setBiddingProject] = useState<FreelanceProject | null>(null);
  const [bidPrice, setBidPrice] = useState<number>(1500000);
  const [bidDays, setBidDays] = useState<number>(2);
  const [bidLetter, setBidLetter] = useState<string>('');

  // Payout modal
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState(1500000);
  const [payoutIban, setPayoutIban] = useState('IR420120000000012345678901');

  // Document upload modal
  const [selectedContractForDoc, setSelectedContractForDoc] = useState<FreelanceProject | null>(null);
  const [docName, setDocName] = useState('لایحه_دفاعیه_نهایی.pdf');

  // Category filter for open projects
  const [projectCategoryFilter, setProjectCategoryFilter] = useState('all');

  const filteredProjects = projects.filter(
    (p) => projectCategoryFilter === 'all' || p.category.includes(projectCategoryFilter)
  );

  const handleOpenBid = (proj: FreelanceProject) => {
    setBiddingProject(proj);
    setBidPrice(proj.budget);
    setBidDays(2);
    setBidLetter('با سلام، اینجانب مدارک و شرح درخواست شما را بررسی نمودم. لایحه مستند به قوانین جاری ظرف مهلت مقرر تنظیم و در سامانه ارائه خواهد شد.');
  };

  const handleSubmitBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!biddingProject) return;

    addProposal({
      projectId: biddingProject.id,
      specialistId: currentLawyer.id,
      specialistName: currentLawyer.name,
      specialistAvatar: currentLawyer.avatar,
      specialistTitle: currentLawyer.title,
      specialistRating: currentLawyer.rating,
      price: Number(bidPrice),
      estimatedDays: Number(bidDays),
      coverLetter: bidLetter,
    });

    setBiddingProject(null);
  };

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    requestPayout(Number(payoutAmount), payoutIban);
    setShowPayoutModal(false);
  };

  return (
    <div className="min-h-screen bg-[#090D1A] text-white flex flex-col text-right pb-28 md:pb-12">
      {/* Top Lawyer Header */}
      <div className="bg-[#12182E] border-b border-purple-500/20 px-4 py-3 sticky top-[57px] z-30 shadow-md">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={currentLawyer.avatar}
              alt={currentLawyer.name}
              className="w-10 h-10 rounded-2xl object-cover border-2 border-purple-500/40"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white">{currentLawyer.name}</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20 flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  <span>تأیید کانون</span>
                </span>
              </div>
              <span className="text-[10px] text-[#8E95A9] font-mono">
                پروانه: {currentLawyer.barLicenseNumber}
              </span>
            </div>
          </div>

          {/* Availability Toggle */}
          <button
            onClick={toggleLawyerAvailability}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              lawyerAvailability
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${lawyerAvailability ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            <span>{lawyerAvailability ? 'آماده قبول پرونده' : 'عدم پذیرش'}</span>
          </button>
        </div>
      </div>

      {/* Main Lawyer Content based on active lawyer tab */}
      <div className="max-w-xl mx-auto w-full px-4 pt-4 flex-1">
        {/* ======================================================== */}
        {/* TAB 1: OPEN CASES MARKETPLACE (مناقصات و پرونده‌های باز) */}
        {/* ======================================================== */}
        {lawyerActiveTab === 'cases' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-purple-400" />
                  <span>پرونده‌ها و مناقصات حقوقی جدید</span>
                </h2>
                <p className="text-xs text-[#8E95A9]">درخواست‌های ثبت‌شده توسط موکلین را بررسی و پیشنهاد قیمت ارسال کنید</p>
              </div>
            </div>

            {/* Simple Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {[
                { id: 'all', label: 'همه پرونده‌ها' },
                { id: 'کیفری', label: 'کیفری و آزار' },
                { id: 'خانواده', label: 'دعاوی خانواده' },
                { id: 'قرارداد', label: 'قراردادها و کار' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setProjectCategoryFilter(c.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
                    projectCategoryFilter === c.id
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-[#12182E] text-[#8E95A9] hover:text-white border border-white/5'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* List of Cases */}
            <div className="space-y-3">
              {filteredProjects.map((p) => {
                const myProposal = proposals.find(
                  (prop) => prop.projectId === p.id && prop.specialistName.includes(currentLawyer.name)
                );
                return (
                  <div
                    key={p.id}
                    className="bg-[#12182E] rounded-3xl p-4 border border-white/5 hover:border-purple-500/30 transition-all shadow-lg text-right"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                            {p.category}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">{p.createdAt}</span>
                        </div>
                        <h3 className="text-sm font-bold text-white mt-1.5">{p.title}</h3>
                      </div>

                      <div className="text-left bg-[#090D1A] px-2.5 py-1.5 rounded-xl border border-white/5 flex-shrink-0">
                        <span className="text-[9px] text-slate-400 block">بودجه موکل:</span>
                        <span className="text-xs font-bold text-emerald-400 font-mono">
                          {p.budget.toLocaleString('fa-IR')} ت
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">{p.description}</p>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5 text-xs text-[#8E95A9]">
                      <div className="flex items-center gap-2">
                        <span>موکل: {p.clientName}</span>
                        <span>·</span>
                        <span>مهلت: {p.deadline}</span>
                      </div>

                      {myProposal ? (
                        <span className="text-emerald-400 font-bold text-xs bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20">
                          پیشنهاد شما ثبت شده ({myProposal.price.toLocaleString('fa-IR')} ت)
                        </span>
                      ) : (
                        <button
                          onClick={() => handleOpenBid(p)}
                          className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-purple-900/30 transition-colors"
                        >
                          <Send className="w-3 h-3 rotate-180" />
                          <span>ارسال پیشنهاد قیمت</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: MY CONTRACTS (قراردادهای جاری و تحویل کار) */}
        {/* ======================================================== */}
        {lawyerActiveTab === 'contracts' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-1.5">
                <FolderKanban className="w-4 h-4 text-blue-400" />
                <span>قراردادهای جاری و پرونده‌های فعال من</span>
              </h2>
              <p className="text-xs text-[#8E95A9]">مدیریت لوایح، ارتباط با موکلین و بارگذاری اسناد حقوقی</p>
            </div>

            <div className="space-y-3">
              {projects.slice(0, 2).map((proj) => (
                <div
                  key={proj.id}
                  className="bg-[#12182E] rounded-3xl p-5 border border-white/5 text-right shadow-lg space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        در حال انجام توسط شما
                      </span>
                      <h3 className="text-sm font-bold text-white mt-1.5">{proj.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">موکل: {proj.clientName} ({proj.clientPhone})</p>
                    </div>

                    <span className="text-xs font-mono font-bold text-emerald-400 bg-[#090D1A] px-2.5 py-1 rounded-xl">
                      {proj.budget.toLocaleString('fa-IR')} تومان (امانی)
                    </span>
                  </div>

                  {/* Actions for this contract */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                    <button
                      onClick={() => {
                        setSelectedContractForDoc(proj);
                      }}
                      className="py-2 px-3 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>ارسال پیش‌نویس لایحه</span>
                    </button>

                    <button
                      onClick={() => showToast(`اتصال به چت امن با موکل (${proj.clientName})`, 'info')}
                      className="py-2 px-3 rounded-xl bg-[#090D1A] hover:bg-slate-800 text-slate-200 border border-white/10 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                      <span>گفتگوی محرمانه با موکل</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: BOOKED CONSULTATIONS (مشاوره‌های آنلاین تلفنی/چت) */}
        {/* ======================================================== */}
        {lawyerActiveTab === 'consultations' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>جلسات مشاوره رزرو شده</span>
              </h2>
              <p className="text-xs text-[#8E95A9]">مشاوره‌های تلفنی و آنلاین رزرو شده توسط کاربران سامانه</p>
            </div>

            <div className="space-y-3">
              {consultations.map((sess) => (
                <div
                  key={sess.id}
                  className="bg-[#12182E] rounded-3xl p-4 border border-white/5 text-right shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{sess.clientName}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                            sess.status === 'upcoming'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-white/5 text-slate-400'
                          }`}
                        >
                          {sess.status === 'upcoming' ? 'در انتظار برگزاری' : 'انجام شده'}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#8E95A9] font-mono block mt-0.5" dir="ltr">
                        {sess.clientPhone}
                      </span>
                    </div>

                    <div className="text-left bg-[#090D1A] px-2.5 py-1 rounded-xl text-xs font-mono font-bold text-emerald-400">
                      {sess.fee.toLocaleString('fa-IR')} ت
                    </div>
                  </div>

                  <div className="bg-[#090D1A] rounded-2xl p-2.5 my-2.5 border border-white/5 text-xs text-slate-300">
                    <span className="text-slate-400 block text-[10px] mb-0.5">زمان مقرر و موضوع:</span>
                    <strong className="text-purple-300">{sess.scheduledTime}</strong> — {sess.notes}
                  </div>

                  {sess.status === 'upcoming' ? (
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                      <a
                        href={`tel:${sess.clientPhone}`}
                        className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>تماس با موکل</span>
                      </a>
                      <button
                        onClick={() => completeConsultation(sess.id)}
                        className="py-2 px-3 rounded-xl bg-[#090D1A] hover:bg-slate-800 text-slate-300 border border-white/10 text-xs font-medium transition-colors"
                      >
                        ثبت پایان جلسه
                      </button>
                    </div>
                  ) : (
                    <div className="text-left text-xs text-slate-400 pt-1">
                      حق مشاوره به کیف پول شما واریز گردید.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: WALLET & FINANCES (کیف پول و تسویه حساب) */}
        {/* ======================================================== */}
        {lawyerActiveTab === 'wallet' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-1.5">
                <Wallet className="w-4 h-4 text-emerald-400" />
                <span>کیف پول و امور مالی وکیل</span>
              </h2>
              <p className="text-xs text-[#8E95A9]">موجودی درآمدهای حاصل از مشاوره‌ها و پرونده‌های فریلنسری</p>
            </div>

            {/* Balance Card */}
            <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-[#12182E] rounded-3xl p-5 border border-purple-500/30 text-right shadow-xl">
              <span className="text-xs text-purple-200 font-medium block mb-1">موجودی آماده تسویه:</span>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-black text-white font-mono">
                  {(3850000).toLocaleString('fa-IR')}
                </span>
                <span className="text-xs text-purple-200">تومان</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPayoutModal(true)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-white text-purple-950 font-black text-xs hover:bg-slate-100 transition-colors shadow-lg"
                >
                  درخواست تسویه به حساب بانکی
                </button>
              </div>
            </div>

            {/* Transactions Ledger */}
            <div>
              <h3 className="text-xs font-bold text-white mb-2">گردش حساب و تراکنش‌های اخیر</h3>
              <div className="space-y-2">
                {walletTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-3 rounded-2xl bg-[#12182E] border border-white/5 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          tx.type === 'credit'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}
                      >
                        {tx.type === 'credit' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                      </div>
                      <div>
                        <span className="text-white font-bold block">{tx.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">{tx.date}</span>
                      </div>
                    </div>

                    <div className="text-left font-mono">
                      <span
                        className={`font-bold block ${
                          tx.type === 'credit' ? 'text-emerald-400' : 'text-slate-300'
                        }`}
                      >
                        {tx.type === 'credit' ? '+' : '-'} {tx.amount.toLocaleString('fa-IR')} ت
                      </span>
                      <span className="text-[9px] text-slate-500">
                        {tx.status === 'successful' ? 'موفق' : 'در حال بررسی'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: PROFILE & LICENSE SETTINGS (پروفایل و پروانه) */}
        {/* ======================================================== */}
        {lawyerActiveTab === 'profile' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-purple-400" />
                <span>پروفایل و پروانه وکالت</span>
              </h2>
              <p className="text-xs text-[#8E95A9]">تنظیم تعرفه مشاوره، شماره پروانه کانون و حوزه‌های تخصصی</p>
            </div>

            <div className="bg-[#12182E] rounded-3xl p-5 border border-white/5 space-y-3.5">
              <div>
                <label className="text-xs text-[#8E95A9] block mb-1">شماره پروانه وکالت کانون دادگستری:</label>
                <input
                  type="text"
                  defaultValue={currentLawyer.barLicenseNumber}
                  className="w-full bg-[#090D1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  readOnly
                />
              </div>

              <div>
                <label className="text-xs text-[#8E95A9] block mb-1">تعرفه مشاوره تلفنی (تومان):</label>
                <input
                  type="number"
                  defaultValue={currentLawyer.consultationFee}
                  step="50000"
                  onChange={(e) => updateLawyerProfile({ consultationFee: Number(e.target.value) })}
                  className="w-full bg-[#090D1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-[#8E95A9] block mb-1">بیوگرافی و معرفی تخصصی:</label>
                <textarea
                  defaultValue={currentLawyer.bio}
                  rows={3}
                  onChange={(e) => updateLawyerProfile({ bio: e.target.value })}
                  className="w-full bg-[#090D1A] border border-white/10 rounded-xl p-2.5 text-xs text-white leading-relaxed"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => showToast('تنظیمات پروفایل وکیل با موفقیت ذخیره شد', 'success')}
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  ذخیره تغییرات
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lawyer Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#12182E]/95 backdrop-blur-xl border-t border-purple-500/20 px-3 py-1.5 shadow-2xl safe-area-bottom">
        <div className="max-w-md mx-auto grid grid-cols-5 items-center h-16">
          {[
            { id: 'cases', label: 'پرونده‌ها', icon: Briefcase },
            { id: 'contracts', label: 'قراردادها', icon: FolderKanban },
            { id: 'consultations', label: 'مشاوره‌ها', icon: PhoneCall },
            { id: 'wallet', label: 'کیف پول', icon: Wallet },
            { id: 'profile', label: 'پروانه من', icon: UserCheck },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = lawyerActiveTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setLawyerActiveTab(item.id as any)}
                className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
                  isActive ? 'text-purple-400 font-bold' : 'text-[#8E95A9] hover:text-white'
                }`}
              >
                <div
                  className={`p-1.5 rounded-xl transition-all ${
                    isActive ? 'bg-purple-600/25 text-purple-400 scale-105' : 'text-[#8E95A9]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] mt-0.5 whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bid Modal */}
      {biddingProject && (
        <div className="fixed inset-0 z-50 bg-[#090D1A]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12182E] rounded-3xl p-5 max-w-sm w-full border border-purple-500/30 text-right animate-in fade-in">
            <h3 className="text-sm font-bold text-white mb-1">ارسال پیشنهاد قیمت و زمان</h3>
            <p className="text-xs text-slate-400 mb-3 truncate">{biddingProject.title}</p>

            <form onSubmit={handleSubmitBid} className="space-y-3">
              <div>
                <label className="text-xs text-[#8E95A9] block mb-1">مبلغ پیشنهادی حق‌الوکاله (تومان):</label>
                <input
                  type="number"
                  value={bidPrice}
                  onChange={(e) => setBidPrice(Number(e.target.value))}
                  step="50000"
                  className="w-full bg-[#090D1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-[#8E95A9] block mb-1">مدت زمان تحویل (روز):</label>
                <input
                  type="number"
                  value={bidDays}
                  onChange={(e) => setBidDays(Number(e.target.value))}
                  min="1"
                  className="w-full bg-[#090D1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-[#8E95A9] block mb-1">راهکار حقوقی پیشنهادی شما:</label>
                <textarea
                  value={bidLetter}
                  onChange={(e) => setBidLetter(e.target.value)}
                  rows={3}
                  className="w-full bg-[#090D1A] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold"
                >
                  ارسال پیشنهاد
                </button>
                <button
                  type="button"
                  onClick={() => setBiddingProject(null)}
                  className="px-3 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payout Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 bg-[#090D1A]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12182E] rounded-3xl p-5 max-w-sm w-full border border-purple-500/30 text-right animate-in fade-in">
            <h3 className="text-sm font-bold text-white mb-1">درخواست تسویه حساب به شماره شبا</h3>
            <p className="text-xs text-slate-400 mb-3">واریز ظرف ۲۴ ساعت از طریق سامانه پایا</p>

            <form onSubmit={handleRequestPayout} className="space-y-3">
              <div>
                <label className="text-xs text-[#8E95A9] block mb-1">مبلغ درخواستی (تومان):</label>
                <input
                  type="number"
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(Number(e.target.value))}
                  step="100000"
                  className="w-full bg-[#090D1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-[#8E95A9] block mb-1">شماره شبا مقصد:</label>
                <input
                  type="text"
                  value={payoutIban}
                  onChange={(e) => setPayoutIban(e.target.value)}
                  dir="ltr"
                  className="w-full bg-[#090D1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono text-left"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
                >
                  تأیید درخواست تسویه
                </button>
                <button
                  type="button"
                  onClick={() => setShowPayoutModal(false)}
                  className="px-3 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document Upload Modal */}
      {selectedContractForDoc && (
        <div className="fixed inset-0 z-50 bg-[#090D1A]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12182E] rounded-3xl p-5 max-w-sm w-full border border-purple-500/30 text-right animate-in fade-in">
            <h3 className="text-sm font-bold text-white mb-1">ارسال لایحه یا شکواییه به موکل</h3>
            <p className="text-xs text-slate-400 mb-3 truncate">{selectedContractForDoc.title}</p>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-[#8E95A9] block mb-1">نام سند حقوقی:</label>
                <input
                  type="text"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  className="w-full bg-[#090D1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div className="p-4 rounded-2xl bg-[#090D1A] border border-dashed border-purple-500/30 text-center">
                <FileText className="w-8 h-8 text-purple-400 mx-auto mb-1" />
                <span className="text-xs text-slate-300 block">فایل لایحه انتخاب شد (آماده ارسال)</span>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    uploadCaseDocument(selectedContractForDoc.id, docName);
                    setSelectedContractForDoc(null);
                  }}
                  className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold"
                >
                  ارسال رسمی به موکل
                </button>
                <button
                  onClick={() => setSelectedContractForDoc(null)}
                  className="px-3 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs"
                >
                  انصراف
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

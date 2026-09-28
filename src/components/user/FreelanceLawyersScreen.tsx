import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Specialist, FreelanceProject } from '../../types';
import {
  Scale,
  Briefcase,
  Star,
  CheckCircle,
  Plus,
  Search,
  FileText,
  UserCheck,
  Send,
  ShieldCheck,
  Heart,
  BookOpen,
  Activity,
  Layers,
  Sparkles,
  Phone,
} from 'lucide-react';

export const FreelanceLawyersScreen: React.FC = () => {
  const {
    specialists,
    projects,
    proposals,
    currentUser,
    currentRole,
    setNewProjectModalOpen,
    setSelectedLawyerForBooking,
    addProposal,
    showToast,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'lawyers' | 'projects'>('lawyers');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Proposal modal state for lawyers
  const [biddingProject, setBiddingProject] = useState<FreelanceProject | null>(null);
  const [bidPrice, setBidPrice] = useState<number>(1500000);
  const [bidDays, setBidDays] = useState<number>(2);
  const [bidLetter, setBidLetter] = useState<string>('');

  const servicesCategories = [
    {
      id: 'psychology',
      title: 'مشاوره روانشناسی',
      subtitle: 'ویژه بانوان',
      icon: Heart,
      color: 'bg-pink-600/20 text-pink-400',
    },
    {
      id: 'training',
      title: 'آموزش امنیت فردی',
      subtitle: 'دوره‌های تخصصی',
      icon: BookOpen,
      color: 'bg-emerald-600/20 text-emerald-400',
    },
    {
      id: 'monitoring',
      title: 'پایش آنلاین',
      subtitle: 'سلامت و امنیت',
      icon: Activity,
      color: 'bg-blue-600/20 text-blue-400',
    },
    {
      id: 'legal',
      title: 'خدمات حقوقی و وکلا',
      subtitle: 'مشاوره اولیه و وکالت',
      icon: Scale,
      color: 'bg-purple-600/20 text-purple-400',
    },
    {
      id: 'facilities',
      title: 'تسهیلات و پشتیبانی',
      subtitle: 'مراکز همکار',
      icon: Layers,
      color: 'bg-amber-600/20 text-amber-400',
    },
    {
      id: 'emergency',
      title: 'خدمات اضطراری',
      subtitle: 'شبانه‌روزی',
      icon: Sparkles,
      color: 'bg-red-600/20 text-red-400',
    },
  ];

  const specialtiesList = [
    { id: 'all', label: 'همه' },
    { id: 'women', label: 'جرایم و آزار بانوان' },
    { id: 'family', label: 'خانواده، حضانت و مهریه' },
    { id: 'cyber', label: 'جرایم سایبری و تعقیب' },
    { id: 'contracts', label: 'قراردادها و کار' },
  ];

  const filteredSpecialists = specialists.filter((lawyer) => {
    if (lawyer.status !== 'active') return false;
    const matchesSearch =
      lawyer.name.includes(searchQuery) ||
      lawyer.title.includes(searchQuery) ||
      lawyer.specialties.some((s) => s.includes(searchQuery));
    if (!matchesSearch) return false;

    if (selectedSpecialty === 'all') return true;
    if (selectedSpecialty === 'women') {
      return lawyer.specialties.some((s) => s.includes('خشونت') || s.includes('بانوان') || s.includes('اشخاص'));
    }
    if (selectedSpecialty === 'family') {
      return lawyer.specialties.some((s) => s.includes('خانواده') || s.includes('حضانت'));
    }
    if (selectedSpecialty === 'cyber') {
      return lawyer.specialties.some((s) => s.includes('رایانه‌ای') || s.includes('مجازی') || s.includes('فتا'));
    }
    if (selectedSpecialty === 'contracts') {
      return lawyer.specialties.some((s) => s.includes('قرارداد') || s.includes('دادخواست'));
    }
    return true;
  });

  const handleOpenBid = (proj: FreelanceProject) => {
    setBiddingProject(proj);
    setBidPrice(proj.budget);
    setBidDays(2);
    setBidLetter('');
  };

  const handleSubmitBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!biddingProject) return;

    addProposal({
      projectId: biddingProject.id,
      specialistId: currentUser.specialistProfileId || 'sp-1',
      specialistName: currentUser.name,
      specialistAvatar: currentUser.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      specialistTitle: 'وکیل پایه یک دادگستری',
      specialistRating: 5.0,
      price: Number(bidPrice),
      estimatedDays: Number(bidDays),
      coverLetter: bidLetter || 'با سلام، پس از مطالعه شرح درخواست شما، آمادگی کامل جهت انجام تخصصی و پیگیری فوری پرونده را دارم.',
    });

    setBiddingProject(null);
  };

  return (
    <div className="space-y-4 pb-28 md:pb-12 max-w-md mx-auto px-3.5 pt-2 text-right">
      {/* Top Banner matching Screen 7: "با آیداد قوی‌تر باش / آموزش، مشاوره، پشتیبانی" */}
      <div className="relative rounded-[32px] overflow-hidden border border-purple-500/25 bg-gradient-to-r from-purple-900 via-indigo-950 to-[#12182E] p-5 shadow-xl">
        <div className="relative z-10 max-w-[220px]">
          <span className="text-[10px] text-pink-300 font-bold bg-pink-500/10 px-2 py-0.5 rounded-full border border-pink-500/20 inline-block mb-1">
            شبکه جامع حمایتی
          </span>
          <h2 className="text-xl font-black text-white leading-tight">
            با آیداد قوی‌تر باش
          </h2>
          <p className="text-xs text-[#8E95A9] mt-1 font-medium">
            آموزش، مشاوره حقوقی، پشتیبانی
          </p>
        </div>

        <img
          src="/src/assets/images/aydad_woman_hero_1790625713591.jpg"
          alt="Banner"
          className="absolute left-0 top-0 bottom-0 w-36 object-cover object-center opacity-30 mix-blend-luminosity filter contrast-125"
        />
      </div>

      {/* 6 Services Category Grid matching Screen 7 */}
      <div>
        <h3 className="text-xs font-bold text-white mb-2.5">دسته‌بندی خدمات آیداد</h3>
        <div className="grid grid-cols-2 gap-2.5">
          {servicesCategories.map((srv) => {
            const Icon = srv.icon;
            return (
              <button
                key={srv.id}
                onClick={() => {
                  if (srv.id === 'legal') {
                    setActiveSubTab('lawyers');
                  } else {
                    showToast(`خدمت «${srv.title}» به زودی ارائه می‌گردد`, 'info');
                  }
                }}
                className="p-3 rounded-2xl bg-[#12182E] hover:bg-[#18213e] border border-white/5 flex items-center gap-3 transition-colors text-right"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${srv.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{srv.title}</h4>
                  <span className="text-[10px] text-[#8E95A9] block mt-0.5">{srv.subtitle}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Freelance Lawyers & Cases Section */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-purple-400" />
            <span>بستر فریلنسری وکلای پایه یک</span>
          </h3>

          <button
            onClick={() => setNewProjectModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[11px] font-bold shadow-md shadow-purple-900/30 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>ثبت پرونده</span>
          </button>
        </div>

        {/* Sub tabs: وکلا vs پروژه‌های باز */}
        <div className="flex items-center p-1 bg-[#12182E] rounded-2xl border border-white/10 text-xs mb-3">
          <button
            onClick={() => setActiveSubTab('lawyers')}
            className={`flex-1 py-2 rounded-xl font-bold transition-all ${
              activeSubTab === 'lawyers'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-[#8E95A9] hover:text-white'
            }`}
          >
            وکلا و متخصصان ({filteredSpecialists.length})
          </button>
          <button
            onClick={() => setActiveSubTab('projects')}
            className={`flex-1 py-2 rounded-xl font-bold transition-all ${
              activeSubTab === 'projects'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-[#8E95A9] hover:text-white'
            }`}
          >
            پروژه‌ها و استعلام‌ها ({projects.length})
          </button>
        </div>

        {/* Search & Specialties Filters */}
        <div className="space-y-2 mb-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی وکیل، خشونت خانگی، مهریه، قرارداد..."
              className="w-full bg-[#12182E] border border-white/10 rounded-2xl pr-9 pl-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            {specialtiesList.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedSpecialty(item.id)}
                className={`px-3 py-1 rounded-xl whitespace-nowrap transition-colors ${
                  selectedSpecialty === item.id
                    ? 'bg-purple-600 text-white font-bold'
                    : 'bg-[#12182E] text-[#8E95A9] hover:text-white border border-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: LAWYERS CARDS */}
        {activeSubTab === 'lawyers' && (
          <div className="space-y-3">
            {filteredSpecialists.map((lawyer) => (
              <div
                key={lawyer.id}
                className="bg-[#12182E] rounded-3xl p-4 border border-white/5 hover:border-purple-500/30 transition-all shadow-lg text-right"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={lawyer.avatar}
                      alt={lawyer.name}
                      className="w-13 h-13 rounded-2xl object-cover border border-purple-500/30 flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-xs font-bold text-white">{lawyer.name}</h4>
                        <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20 font-mono">
                          {lawyer.barLicenseNumber}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8E95A9] mt-0.5 truncate max-w-[190px]">{lawyer.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-300">
                        <span className="text-amber-400 font-mono">★ {lawyer.rating}</span>
                        <span>·</span>
                        <span>{lawyer.completedCasesCount} پرونده</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left bg-[#090D1A] px-2.5 py-1.5 rounded-xl border border-white/5">
                    <span className="text-[9px] text-slate-400 block">مشاوره:</span>
                    <span className="text-xs font-bold text-emerald-400 font-mono">
                      {lawyer.consultationFee.toLocaleString('fa-IR')}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed line-clamp-2">
                  {lawyer.bio}
                </p>

                <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-white/5">
                  <div className="flex flex-wrap gap-1 max-w-[180px]">
                    {lawyer.specialties.slice(0, 2).map((s, idx) => (
                      <span key={idx} className="text-[9px] bg-white/5 text-slate-300 px-2 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedLawyerForBooking(lawyer)}
                    className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors shadow-md"
                  >
                    رزرو مشاوره فوری
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: FREELANCE PROJECTS (پروژه‌ها و مناقصات) */}
        {activeSubTab === 'projects' && (
          <div className="space-y-3">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="bg-[#12182E] rounded-3xl p-4 border border-white/5 hover:border-blue-500/30 transition-all text-right shadow-lg"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                        {proj.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{proj.createdAt}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white mt-1">{proj.title}</h4>
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-400 bg-[#090D1A] px-2.5 py-1 rounded-xl">
                    {proj.budget.toLocaleString('fa-IR')} ت
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{proj.description}</p>

                <div className="flex items-center justify-between text-[11px] text-[#8E95A9] mt-3 pt-2.5 border-t border-white/5">
                  <span>{proj.proposalsCount} پیشنهاد وکیل</span>
                  {currentRole === 'lawyer' ? (
                    <button
                      onClick={() => handleOpenBid(proj)}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1"
                    >
                      <Send className="w-3 h-3 rotate-180" />
                      <span>ارسال پیشنهاد قیمت</span>
                    </button>
                  ) : (
                    <span className="text-purple-300 text-[10px]">در انتظار بررسی وکلا</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lawyer Bid Modal */}
      {biddingProject && (
        <div className="fixed inset-0 z-50 bg-[#090D1A]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12182E] rounded-3xl p-5 max-w-sm w-full border border-blue-500/30 text-right animate-in fade-in">
            <h3 className="text-sm font-bold text-white mb-2">ارسال پیشنهاد همکاری وکیل</h3>
            <p className="text-xs text-slate-400 truncate mb-3">{biddingProject.title}</p>

            <form onSubmit={handleSubmitBid} className="space-y-3">
              <div>
                <label className="text-xs text-[#8E95A9] block mb-1">مبلغ پیشنهادی (تومان):</label>
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
                <label className="text-xs text-[#8E95A9] block mb-1">توضیحات و راهکار حقوقی:</label>
                <textarea
                  value={bidLetter}
                  onChange={(e) => setBidLetter(e.target.value)}
                  placeholder="نحوه دفاع و تنظیم لایحه..."
                  rows={3}
                  className="w-full bg-[#090D1A] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold"
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
    </div>
  );
};

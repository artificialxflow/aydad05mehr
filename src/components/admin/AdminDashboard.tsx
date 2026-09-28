import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  EmergencyEvent,
  Specialist,
  User,
  BlogPost,
  EventStatus,
} from '../../types';
import {
  Activity,
  Users,
  AlertTriangle,
  Scale,
  Briefcase,
  FileText,
  Settings,
  Phone,
  Radio,
  Search,
  CheckCircle,
  XCircle,
  Eye,
  Filter,
  ArrowUpRight,
  TrendingUp,
  Clock,
  MapPin,
  Volume2,
  Send,
  Plus,
  Trash2,
  Edit,
  DollarSign,
  Shield,
  Layers,
  Check,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    adminActiveTab,
    setAdminActiveTab,
    events,
    updateEventStatus,
    specialists,
    approveSpecialist,
    rejectSpecialist,
    users,
    projects,
    proposals,
    blogPosts,
    addBlogPost,
    deleteBlogPost,
    siteSettings,
    updateSiteSettings,
    showToast,
  } = useApp();

  // Event modal state
  const [selectedEventForDetail, setSelectedEventForDetail] = useState<EmergencyEvent | null>(null);

  // Specialist review state
  const [specialistTabFilter, setSpecialistTabFilter] = useState<'pending' | 'active' | 'suspended'>('pending');
  const [selectedSpecialistDetail, setSelectedSpecialistDetail] = useState<Specialist | null>(null);

  // Users filter state
  const [userSearch, setUserSearch] = useState('');
  const [selectedUserDetail, setSelectedUserDetail] = useState<User | null>(null);

  // Blog modal state
  const [showAddArticleModal, setShowAddArticleModal] = useState(false);
  const [artTitle, setArtTitle] = useState('');
  const [artCategory, setArtCategory] = useState('حقوق کیفری بانوان');
  const [artSummary, setArtSummary] = useState('');
  const [artContent, setArtContent] = useState('');
  const [artAuthor, setArtAuthor] = useState('واحد حقوقی آیداد');

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(siteSettings);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(settingsForm);
  };

  const handleAddArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle.trim() || !artContent.trim()) {
      showToast('لطفاً عنوان و متن مقاله را وارد کنید', 'danger');
      return;
    }

    addBlogPost({
      title: artTitle,
      category: artCategory,
      summary: artSummary || artTitle,
      content: artContent,
      author: artAuthor,
      date: 'امروز',
      readTime: '۴ دقیقه',
      published: true,
    });

    setArtTitle('');
    setArtSummary('');
    setArtContent('');
    setShowAddArticleModal(false);
  };

  // Event statistics
  const activeEventsCount = events.filter((e) => e.status === 'ACTIVE').length;
  const pendingSpecialistsCount = specialists.filter((s) => s.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#0B1020] text-white">
      {/* Sub Header Navigation for Admin */}
      <div className="bg-[#151D35] border-b border-white/10 sticky top-[57px] z-30 px-4 py-2.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <button
              onClick={() => setAdminActiveTab('dashboard')}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap ${
                adminActiveTab === 'dashboard'
                  ? 'bg-purple-600 text-white font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>داشبورد و آمار کل</span>
            </button>

            <button
              onClick={() => setAdminActiveTab('events')}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap relative ${
                adminActiveTab === 'events'
                  ? 'bg-purple-600 text-white font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>رویدادهای اضطراری</span>
              {activeEventsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-mono flex items-center justify-center font-bold">
                  {activeEventsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setAdminActiveTab('specialists')}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap ${
                adminActiveTab === 'specialists'
                  ? 'bg-purple-600 text-white font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>تأیید مدارک وکلا و متخصصان</span>
              {pendingSpecialistsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30">
                  {pendingSpecialistsCount} جدید
                </span>
              )}
            </button>

            <button
              onClick={() => setAdminActiveTab('freelance')}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap ${
                adminActiveTab === 'freelance'
                  ? 'bg-purple-600 text-white font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>پروژه‌ها و قراردادهای فریلنسری</span>
            </button>

            <button
              onClick={() => setAdminActiveTab('users')}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap ${
                adminActiveTab === 'users'
                  ? 'bg-purple-600 text-white font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>کاربران و شهروندان</span>
            </button>

            <button
              onClick={() => setAdminActiveTab('blog')}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap ${
                adminActiveTab === 'blog'
                  ? 'bg-purple-600 text-white font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>مدیریت وبلاگ و آموزش</span>
            </button>

            <button
              onClick={() => setAdminActiveTab('settings')}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap ${
                adminActiveTab === 'settings'
                  ? 'bg-purple-600 text-white font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>تنظیمات سامانه</span>
            </button>
          </div>

          <div className="text-left text-xs text-slate-400 font-mono hidden md:block whitespace-nowrap">
            مدیر سیستم: {users[0]?.phone}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        {/* ============================================================ */}
        {/* VIEW 1: DASHBOARD OVERVIEW */}
        {/* ============================================================ */}
        {adminActiveTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Top Stat Cards (from original screenshot + enhanced freelance metrics) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Users */}
              <div className="bg-[#151D35] rounded-3xl p-5 border border-white/10 shadow-lg text-right">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#A3A8B8] font-medium">کل کاربران سامانه</span>
                  <div className="p-2.5 rounded-2xl bg-blue-500/20 text-blue-400">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-black font-mono text-white">19</span>
                  <span className="text-xs text-emerald-400 font-medium">+۲ کاربر در ۷ روز اخیر</span>
                </div>
              </div>

              {/* Card 2: Emergency Events */}
              <div className="bg-[#151D35] rounded-3xl p-5 border border-white/10 shadow-lg text-right">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#A3A8B8] font-medium">رویدادهای اضطراری</span>
                  <div className="p-2.5 rounded-2xl bg-red-500/20 text-red-400">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-black font-mono text-red-400">{events.length}</span>
                  <span className="text-xs text-slate-400 font-medium">{activeEventsCount} رویداد فعال هم‌اکنون</span>
                </div>
              </div>

              {/* Card 3: Active Lawyers / Specialists */}
              <div className="bg-[#151D35] rounded-3xl p-5 border border-white/10 shadow-lg text-right">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#A3A8B8] font-medium">وکلای فریلنسر فعال</span>
                  <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-400">
                    <Scale className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-black font-mono text-purple-400">
                    {specialists.filter((s) => s.status === 'active').length}
                  </span>
                  <span className="text-xs text-amber-400 font-medium">{pendingSpecialistsCount} در انتظار بررسی</span>
                </div>
              </div>

              {/* Card 4: Freelance Projects Escrow */}
              <div className="bg-[#151D35] rounded-3xl p-5 border border-white/10 shadow-lg text-right">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#A3A8B8] font-medium">حجم پروژه‌های فریلنسری</span>
                  <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
                    <Briefcase className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-black font-mono text-emerald-400">
                    {(7250000).toLocaleString('fa-IR')}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">تومان امانی</span>
                </div>
              </div>
            </div>

            {/* Charts Grid: 30-Day trend + Hourly distribution (matching screenshot 1) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chart 1: 30-day incident trends */}
              <div className="bg-[#151D35] rounded-3xl p-6 border border-white/10 shadow-lg text-right">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                    <span>روند رویدادهای اضطراری (۳۰ روز گذشته)</span>
                  </h3>
                  <span className="text-xs text-slate-400">مجموع: {events.length} رویداد</span>
                </div>

                {/* Simulated SVG Bar Chart */}
                <div className="h-56 flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-white/10">
                  {[
                    { label: '۸ شهریور', count: 3, height: '20%' },
                    { label: '۹ شهریور', count: 4, height: '25%' },
                    { label: '۱۱ شهریور', count: 2, height: '15%' },
                    { label: '۱۲ شهریور', count: 12, height: '45%' },
                    { label: '۱۳ شهریور', count: 5, height: '28%' },
                    { label: '۱۹ شهریور', count: 4, height: '22%' },
                    { label: '۲۵ شهریور', count: 18, height: '55%' },
                    { label: '۲ مهر', count: 34, height: '95%' },
                    { label: '۳ مهر', count: 6, height: '30%' },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer">
                      <span className="text-[10px] font-mono text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity">
                        {bar.count}
                      </span>
                      <div
                        style={{ height: bar.height }}
                        className="w-full bg-gradient-to-t from-purple-700 to-indigo-500 rounded-t-xl group-hover:from-purple-600 group-hover:to-pink-500 transition-all shadow-md"
                      />
                      <span className="text-[9px] text-slate-400 truncate max-w-[45px] text-center mt-1">
                        {bar.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart 2: Hourly distribution */}
              <div className="bg-[#151D35] rounded-3xl p-6 border border-white/10 shadow-lg text-right">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>توزیع زمانی رویدادها بر اساس ساعت روز</span>
                  </h3>
                  <span className="text-xs text-red-400 font-medium">اوج حوادث: ۱۳:۰۰ تا ۱۷:۰۰</span>
                </div>

                {/* Simulated Hourly Chart */}
                <div className="h-56 flex items-end justify-between gap-1.5 pt-6 pb-2 px-2 border-b border-white/10">
                  {[
                    { hour: '06:00', count: 5, height: '22%' },
                    { hour: '07:00', count: 6, height: '25%' },
                    { hour: '08:00', count: 8, height: '32%' },
                    { hour: '12:00', count: 3, height: '18%' },
                    { hour: '13:00', count: 22, height: '68%' },
                    { hour: '14:00', count: 32, height: '92%' },
                    { hour: '15:00', count: 12, height: '42%' },
                    { hour: '16:00', count: 4, height: '20%' },
                    { hour: '17:00', count: 11, height: '38%' },
                    { hour: '21:00', count: 5, height: '22%' },
                    { hour: '22:00', count: 4, height: '20%' },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group cursor-pointer">
                      <span className="text-[10px] font-mono text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity">
                        {bar.count}
                      </span>
                      <div
                        style={{ height: bar.height }}
                        className="w-full bg-gradient-to-t from-blue-700 to-cyan-500 rounded-t-xl group-hover:from-blue-600 group-hover:to-cyan-400 transition-all shadow-md"
                      />
                      <span className="text-[9px] text-slate-400 font-mono mt-1">{bar.hour}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Event Type Breakdown Badges (from original screenshot 1) */}
            <div className="bg-[#151D35] rounded-3xl p-6 border border-white/10 shadow-lg text-right">
              <h3 className="text-base font-bold text-white mb-4">توزیع نوع رویدادهای اضطراری</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                {[
                  { label: 'SOS اضطراری', count: 28, color: 'text-red-400' },
                  { label: 'اشتراک موقعیت (LOCATION)', count: 21, color: 'text-purple-400' },
                  { label: 'کمک به بانوان (HELP_WOMEN)', count: 8, color: 'text-pink-400' },
                  { label: 'تصادف و سانحه (ACCIDENT)', count: 8, color: 'text-amber-400' },
                  { label: 'ضبط مخفی صدا (AUDIO)', count: 5, color: 'text-blue-400' },
                  { label: 'تکان شدید گوشی (SHAKE)', count: 5, color: 'text-indigo-400' },
                  { label: 'تهدید و تعقیب (THREAT)', count: 4, color: 'text-rose-400' },
                  { label: 'عکس و مدرک (IMAGE)', count: 4, color: 'text-cyan-400' },
                  { label: 'سالمندان (HELP_ELDERLY)', count: 3, color: 'text-teal-400' },
                  { label: 'دانش‌آموزان (HELP_STUDENTS)', count: 1, color: 'text-violet-400' },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#0B1020] border border-white/5">
                    <span className={`text-2xl font-black font-mono ${item.color} block`}>
                      {item.count}
                    </span>
                    <span className="text-[11px] text-[#A3A8B8] mt-1 block font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 2: EMERGENCY EVENTS MONITORING (مانیتورینگ رویدادها) */}
        {/* ============================================================ */}
        {adminActiveTab === 'events' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span>مانیتورینگ رویدادهای اضطراری بلادرنگ</span>
                </h3>
                <p className="text-xs text-[#A3A8B8]">فهرست کامل پیام‌های SOS، موقعیت‌ها و ضبط‌های مخفی کاربران</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">تعداد کل: {events.length}</span>
              </div>
            </div>

            {/* Events Table */}
            <div className="bg-[#151D35] rounded-3xl border border-white/10 overflow-hidden shadow-xl text-right">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#0B1020] text-[#A3A8B8] border-b border-white/10 uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">نوع رویداد</th>
                      <th className="py-3.5 px-4 font-semibold">کاربر / شماره تماس</th>
                      <th className="py-3.5 px-4 font-semibold">تاریخ و زمان</th>
                      <th className="py-3.5 px-4 font-semibold">وضعیت امداد</th>
                      <th className="py-3.5 px-4 font-semibold text-center">اطلاع‌رسانی</th>
                      <th className="py-3.5 px-4 font-semibold text-center">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {events.map((ev) => (
                      <tr key={ev.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border ${
                              ev.type === 'SOS'
                                ? 'bg-red-500/20 text-red-300 border-red-500/30'
                                : ev.type === 'THREAT'
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                : ev.type === 'AUDIO'
                                ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                                : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                            }`}
                          >
                            {ev.typeLabelFa || ev.type}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white">{ev.userName}</div>
                          <span className="font-mono text-[11px] text-slate-400" dir="ltr">{ev.userPhone}</span>
                        </td>

                        <td className="py-3.5 px-4 text-slate-300">
                          {ev.timestamp}
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                              ev.status === 'ACTIVE'
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
                                : ev.status === 'RESOLVED'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            {ev.status === 'ACTIVE' ? 'فعال / نیازمند اقدام' : ev.status === 'RESOLVED' ? 'رسیدگی شده' : 'در حال بررسی'}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-300">
                          {ev.notifiedContactsCount}/{ev.totalContactsCount}
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => setSelectedEventForDetail(ev)}
                            className="px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white transition-all text-xs font-medium flex items-center justify-center gap-1 mx-auto"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>جزئیات و نقشه</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 3: SPECIALISTS & FREELANCERS (مدیریت متخصصان و وکلا) */}
        {/* ============================================================ */}
        {adminActiveTab === 'specialists' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Scale className="w-5 h-5 text-purple-400" />
                  <span>تأیید مدارک و مدیریت وکلای فریلنسر</span>
                </h3>
                <p className="text-xs text-[#A3A8B8]">بررسی پروانه وکالت کانون دادگستری و فعال‌سازی حساب فریلنسری</p>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center p-1 bg-[#151D35] rounded-xl border border-white/10 text-xs">
                <button
                  onClick={() => setSpecialistTabFilter('pending')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    specialistTabFilter === 'pending'
                      ? 'bg-amber-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  در انتظار تأیید ({specialists.filter((s) => s.status === 'pending').length})
                </button>
                <button
                  onClick={() => setSpecialistTabFilter('active')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    specialistTabFilter === 'active'
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  وکلای فعال ({specialists.filter((s) => s.status === 'active').length})
                </button>
                <button
                  onClick={() => setSpecialistTabFilter('suspended')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    specialistTabFilter === 'suspended'
                      ? 'bg-red-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  تعلیق شده ({specialists.filter((s) => s.status === 'suspended').length})
                </button>
              </div>
            </div>

            {/* Specialists Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specialists
                .filter((s) => s.status === specialistTabFilter)
                .map((sp) => (
                  <div
                    key={sp.id}
                    className="bg-[#151D35] rounded-3xl p-5 border border-white/10 text-right shadow-lg flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <img
                            src={sp.avatar}
                            alt={sp.name}
                            className="w-14 h-14 rounded-2xl object-cover border border-purple-500/30"
                          />
                          <div>
                            <h4 className="text-sm font-bold text-white">{sp.name}</h4>
                            <p className="text-xs text-[#A3A8B8] mt-0.5">{sp.title}</p>
                            <span className="text-[11px] font-mono text-purple-300 block mt-1">
                              پروانه: {sp.barLicenseNumber}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            sp.status === 'active'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : sp.status === 'pending'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}
                        >
                          {sp.status === 'active' ? 'فعال و معتبر' : sp.status === 'pending' ? 'در انتظار بررسی' : 'تعلیق شده'}
                        </span>
                      </div>

                      <div className="bg-[#0B1020] rounded-2xl p-3 my-3 border border-white/5 text-xs text-slate-300 space-y-1">
                        <div>تلفن تماس: <span className="font-mono text-white" dir="ltr">{sp.phone}</span></div>
                        <div>کد ملی: <span className="font-mono text-white">{sp.nationalId}</span></div>
                        <div>تعرفه هر جلسه: <span className="font-mono text-emerald-400 font-bold">{sp.consultationFee.toLocaleString('fa-IR')} تومان</span></div>
                        <div>فایل ضمیمه: <span className="text-blue-400 underline">{sp.documentName || 'پروانه_وکالت.pdf'}</span></div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mb-3 line-clamp-2">{sp.bio}</p>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-white/5 flex items-center gap-2">
                      {sp.status === 'pending' && (
                        <>
                          <button
                            onClick={() => approveSpecialist(sp.id)}
                            className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>تأیید مدارک و فعال‌سازی</span>
                          </button>
                          <button
                            onClick={() => rejectSpecialist(sp.id)}
                            className="py-2 px-3 rounded-xl bg-red-600/30 hover:bg-red-600 text-red-200 hover:text-white text-xs transition-colors"
                          >
                            رد درخواست
                          </button>
                        </>
                      )}

                      {sp.status === 'active' && (
                        <>
                          <button
                            onClick={() => showToast(`پیام به وکیل ${sp.name} ارسال شد`, 'info')}
                            className="flex-1 py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium transition-colors"
                          >
                            ارسال پیام مدیریتی
                          </button>
                          <button
                            onClick={() => rejectSpecialist(sp.id)}
                            className="py-2 px-3 rounded-xl bg-red-600/30 hover:bg-red-600 text-red-200 hover:text-white text-xs transition-colors"
                          >
                            تعلیق موقت
                          </button>
                        </>
                      )}

                      {sp.status === 'suspended' && (
                        <button
                          onClick={() => approveSpecialist(sp.id)}
                          className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                        >
                          فعال‌سازی مجدد حساب
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 4: FREELANCE PROJECTS (پروژه‌ها و قراردادهای فریلنسری) */}
        {/* ============================================================ */}
        {adminActiveTab === 'freelance' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                  <span>مدیریت قراردادها و مناقصات حقوقی فریلنسری</span>
                </h3>
                <p className="text-xs text-[#A3A8B8]">نظارت بر پرونده‌های ارسالی شهروندان و پیشنهادات قیمت وکلا</p>
              </div>

              <div className="bg-[#151D35] px-3.5 py-1.5 rounded-xl border border-white/10 text-xs text-emerald-400 font-bold">
                کارمزد پلتفرم: {siteSettings.platformCommissionPercent}٪
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {projects.map((proj) => {
                const projectBids = proposals.filter((p) => p.projectId === proj.id);
                return (
                  <div
                    key={proj.id}
                    className="bg-[#151D35] rounded-3xl p-5 border border-white/10 text-right shadow-lg"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
                            {proj.category}
                          </span>
                          <span className="text-xs text-[#A3A8B8] font-mono">{proj.createdAt}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-slate-300">
                            وضعیت: {proj.status === 'open' ? 'مناقصه باز' : 'در حال اجرا'}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white mt-1.5">{proj.title}</h4>
                        <p className="text-xs text-slate-400 mt-1">کارفرما: {proj.clientName} ({proj.clientPhone})</p>
                      </div>

                      <div className="bg-[#0B1020] p-3 rounded-2xl border border-white/5 text-left flex-shrink-0">
                        <span className="text-[10px] text-slate-400 block">بودجه تعیین شده:</span>
                        <span className="text-sm font-bold text-emerald-400 font-mono">
                          {proj.budget.toLocaleString('fa-IR')} تومان
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 mt-3 leading-relaxed">{proj.description}</p>

                    {/* Proposals overview */}
                    <div className="mt-4 pt-3 border-t border-white/5">
                      <span className="text-xs text-slate-400 font-medium block mb-2">
                        پیشنهادهای ارسالی وکلای فریلنسر ({projectBids.length}):
                      </span>

                      <div className="space-y-2">
                        {projectBids.map((b) => (
                          <div
                            key={b.id}
                            className="bg-[#0B1020] p-3 rounded-xl border border-white/5 flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              <img
                                src={b.specialistAvatar}
                                alt={b.specialistName}
                                className="w-8 h-8 rounded-lg object-cover"
                              />
                              <div>
                                <span className="text-white font-bold">{b.specialistName}</span>
                                <span className="text-slate-400 text-[11px] mr-2">«{b.coverLetter.substring(0, 45)}...»</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-emerald-400 font-mono font-bold">
                                {b.price.toLocaleString('fa-IR')} تومان
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-300">
                                {b.status === 'accepted' ? 'پذیرفته شده' : 'در انتظار'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 5: USERS DIRECTORY (مدیریت کاربران) */}
        {/* ============================================================ */}
        {adminActiveTab === 'users' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span>مدیریت کاربران و شهروندان</span>
                </h3>
                <p className="text-xs text-[#A3A8B8]">جستجو، وضعیت مخاطبان امن و گزارش‌های ثبتی هر شماره</p>
              </div>

              {/* Search input (matching screenshot 6) */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="جستجو بر اساس شماره تلفن یا نام..."
                  className="w-full bg-[#151D35] border border-white/10 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-[#151D35] rounded-3xl border border-white/10 overflow-hidden shadow-xl text-right">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#0B1020] text-[#A3A8B8] border-b border-white/10">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">شماره تلفن</th>
                      <th className="py-3.5 px-4 font-semibold">نام کاربر</th>
                      <th className="py-3.5 px-4 font-semibold">تاریخ ثبت‌نام</th>
                      <th className="py-3.5 px-4 font-semibold text-center">مخاطبین امن</th>
                      <th className="py-3.5 px-4 font-semibold text-center">رویدادها</th>
                      <th className="py-3.5 px-4 font-semibold text-center">نقش</th>
                      <th className="py-3.5 px-4 font-semibold text-center">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {users
                      .filter(
                        (u) =>
                          u.phone.includes(userSearch) ||
                          u.name.includes(userSearch)
                      )
                      .map((u) => (
                        <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-white" dir="ltr">
                            {u.phone}
                          </td>
                          <td className="py-3.5 px-4 font-medium text-slate-200">
                            {u.name}
                          </td>
                          <td className="py-3.5 px-4 text-slate-400">
                            {u.createdAt}
                          </td>
                          <td className="py-3.5 px-4 text-center font-mono font-bold text-blue-400">
                            {u.emergencyContactsCount || 1}
                          </td>
                          <td className="py-3.5 px-4 text-center font-mono font-bold text-red-400">
                            {u.eventsCount || 0}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span
                              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                                u.role === 'admin'
                                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                  : u.role === 'lawyer'
                                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                  : 'bg-white/5 text-slate-300'
                              }`}
                            >
                              {u.role === 'admin' ? 'ادمین' : u.role === 'lawyer' ? 'وکیل فریلنسر' : 'کاربر عادی'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              onClick={() => {
                                setSelectedUserDetail(u);
                                showToast(`نمایش سوابق کاربر ${u.phone}`, 'info');
                              }}
                              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                            >
                              جزئیات
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 6: BLOG & EDUCATION (مدیریت وبلاگ و آموزش) */}
        {/* ============================================================ */}
        {adminActiveTab === 'blog' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-400" />
                  <span>مدیریت مقالات، وبلاگ و آموزش‌های ایمنی بانوان</span>
                </h3>
                <p className="text-xs text-[#A3A8B8]">تولید محتوای آموزشی در خصوص حقوق خانواده، ماده ۶۱۹ و حمایت‌های اجتماعی</p>
              </div>

              <button
                onClick={() => setShowAddArticleModal(true)}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-lg shadow-purple-900/30"
              >
                <Plus className="w-4 h-4" />
                <span>افزودن مقاله جدید</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-[#151D35] rounded-3xl p-5 border border-white/10 text-right shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#A3A8B8] mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                        {post.category}
                      </span>
                      <span>{post.date} · {post.readTime}</span>
                    </div>

                    <h4 className="text-base font-bold text-white">{post.title}</h4>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">{post.summary}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#A3A8B8]">
                    <span>نویسنده: <strong className="text-white">{post.author}</strong></span>
                    <button
                      onClick={() => deleteBlogPost(post.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg transition-colors"
                      title="حذف مقاله"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 7: SITE SETTINGS (تنظیمات سامانه - matching screenshot 5) */}
        {/* ============================================================ */}
        {adminActiveTab === 'settings' && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-400" />
                <span>تنظیمات سامانه و خطوط اضطراری</span>
              </h3>
              <p className="text-xs text-[#A3A8B8]">مدیریت شماره‌های تماس، درگاه پیامک و متن‌های صفحه اصلی</p>
            </div>

            <form onSubmit={handleSaveSettings} className="bg-[#151D35] rounded-3xl p-6 border border-white/10 space-y-4 text-right shadow-xl">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">شماره تماس اضطراری (E.164/local):</label>
                  <input
                    type="text"
                    value={settingsForm.emergencyPhone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, emergencyPhone: e.target.value })}
                    dir="ltr"
                    className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400 font-mono text-left"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">نمایش شماره تماس:</label>
                  <input
                    type="text"
                    value={settingsForm.displayPhone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, displayPhone: e.target.value })}
                    className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">عنوان درباره ما:</label>
                <input
                  type="text"
                  value={settingsForm.aboutTitle}
                  onChange={(e) => setSettingsForm({ ...settingsForm, aboutTitle: e.target.value })}
                  className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">متن درباره ما:</label>
                <textarea
                  value={settingsForm.aboutContent}
                  onChange={(e) => setSettingsForm({ ...settingsForm, aboutContent: e.target.value })}
                  rows={3}
                  className="w-full bg-[#0B1020] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-400 leading-relaxed"
                />
              </div>

              <div>
                <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">عنوان تماس با ما:</label>
                <input
                  type="text"
                  value={settingsForm.contactTitle}
                  onChange={(e) => setSettingsForm({ ...settingsForm, contactTitle: e.target.value })}
                  className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">متن تماس با ما:</label>
                <textarea
                  value={settingsForm.contactContent}
                  onChange={(e) => setSettingsForm({ ...settingsForm, contactContent: e.target.value })}
                  rows={2}
                  className="w-full bg-[#0B1020] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-400 leading-relaxed"
                />
              </div>

              <div>
                <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">شعار فوتر:</label>
                <input
                  type="text"
                  value={settingsForm.footerSlogan}
                  onChange={(e) => setSettingsForm({ ...settingsForm, footerSlogan: e.target.value })}
                  className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors shadow-lg shadow-purple-900/40"
                >
                  ذخیره تنظیمات سایت
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Event Detail Modal (Triage, Audio, Map) */}
      {selectedEventForDetail && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#151D35] rounded-3xl p-6 max-w-lg w-full border border-purple-500/30 text-right animate-in fade-in zoom-in-95 my-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold ${
                    selectedEventForDetail.type === 'SOS'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  }`}
                >
                  {selectedEventForDetail.typeLabelFa}
                </span>
                <span className="text-xs text-slate-400 font-mono">{selectedEventForDetail.timestampFull}</span>
              </div>
              <button
                onClick={() => setSelectedEventForDetail(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* User Caller Info */}
              <div className="bg-[#0B1020] p-4 rounded-2xl border border-white/5">
                <span className="text-xs text-slate-400 block mb-1">اطلاعات فرستنده هشدار:</span>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{selectedEventForDetail.userName}</span>
                  <span className="font-mono text-sm text-purple-400" dir="ltr">
                    {selectedEventForDetail.userPhone}
                  </span>
                </div>
              </div>

              {/* Location Coordinates */}
              <div className="bg-[#0B1020] p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>موقعیت مکانی مخابره شده:</span>
                </div>
                <p className="text-xs font-medium text-white">{selectedEventForDetail.location.address}</p>
                <div className="text-[11px] font-mono text-slate-400 mt-1" dir="ltr">
                  LAT: {selectedEventForDetail.location.lat.toFixed(4)}, LNG: {selectedEventForDetail.location.lng.toFixed(4)}
                </div>
              </div>

              {/* Audio Playback Simulation (if audio event) */}
              {selectedEventForDetail.audioUrl && (
                <div className="bg-[#0B1020] p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4 text-purple-400" />
                      <span>صوت ضبط شده محیط:</span>
                    </span>
                    <span className="text-xs font-mono text-slate-400">{selectedEventForDetail.audioDuration || '01:12'}</span>
                  </div>

                  {/* Audio wave bar simulation */}
                  <div className="flex items-center gap-1 h-8 bg-slate-900 rounded-xl px-3">
                    {[12, 24, 18, 28, 14, 20, 32, 16, 26, 30, 22, 14, 28, 18, 10, 24].map((h, i) => (
                      <div
                        key={i}
                        style={{ height: `${h}px` }}
                        className="flex-1 bg-purple-500 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Triage Status Actions */}
              <div className="pt-2">
                <span className="text-xs text-slate-400 block mb-2 font-medium">تغییر وضعیت رویداد:</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      updateEventStatus(selectedEventForDetail.id, 'RESOLVED');
                      setSelectedEventForDetail(null);
                    }}
                    className="py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
                  >
                    امدادرسانی شد
                  </button>
                  <button
                    onClick={() => {
                      updateEventStatus(selectedEventForDetail.id, 'INVESTIGATING');
                      setSelectedEventForDetail(null);
                    }}
                    className="py-2.5 px-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors"
                  >
                    در حال پیگیری
                  </button>
                  <button
                    onClick={() => {
                      updateEventStatus(selectedEventForDetail.id, 'FALSE_ALARM');
                      setSelectedEventForDetail(null);
                    }}
                    className="py-2.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                  >
                    هشدار اشتباه
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Article Modal */}
      {showAddArticleModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#151D35] rounded-3xl p-6 max-w-lg w-full border border-purple-500/30 text-right animate-in fade-in zoom-in-95 my-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-400" />
                <span>انتشار مقاله حقوقی و ایمنی جدید</span>
              </h3>
              <button
                onClick={() => setShowAddArticleModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddArticle} className="space-y-3.5">
              <div>
                <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">عنوان مقاله:</label>
                <input
                  type="text"
                  value={artTitle}
                  onChange={(e) => setArtTitle(e.target.value)}
                  placeholder="مثال: نحوه پیگیری مزاحمت‌های پیامکی در پلیس فتا..."
                  className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">دسته‌بندی:</label>
                  <select
                    value={artCategory}
                    onChange={(e) => setArtCategory(e.target.value)}
                    className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                  >
                    <option value="حقوق کیفری بانوان">حقوق کیفری بانوان</option>
                    <option value="حمایت اجتماعی و سلامت روان">حمایت اجتماعی و سلامت روان</option>
                    <option value="قراردادها و قوانین کار">قراردادها و قوانین کار</option>
                    <option value="دعاوی خانواده و حضانت">دعاوی خانواده و حضانت</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">نام نویسنده:</label>
                  <input
                    type="text"
                    value={artAuthor}
                    onChange={(e) => setArtAuthor(e.target.value)}
                    className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">خلاصه کوتاه:</label>
                <input
                  type="text"
                  value={artSummary}
                  onChange={(e) => setArtSummary(e.target.value)}
                  placeholder="یک یا دو جمله برای پیش‌نمایش در کارت..."
                  className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-xs text-[#A3A8B8] block mb-1 font-medium">متن کامل مقاله:</label>
                <textarea
                  value={artContent}
                  onChange={(e) => setArtContent(e.target.value)}
                  placeholder="محتوای آموزشی، مواد قانونی، راهکارهای عملی..."
                  rows={5}
                  className="w-full bg-[#0B1020] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-400 leading-relaxed"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors shadow-lg shadow-purple-900/40"
                >
                  انتشار مقاله در وبلاگ
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddArticleModal(false)}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs transition-colors"
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

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  TrustedContact,
  EmergencyEvent,
  Specialist,
  FreelanceProject,
  Proposal,
  BlogPost,
  SiteSettings,
  EventType,
  EventStatus,
  ConsultationSession,
  WalletTransaction,
} from '../types';
import {
  initialUsers,
  initialTrustedContacts,
  initialSpecialists,
  initialEmergencyEvents,
  initialProjects,
  initialProposals,
  initialBlogPosts,
  initialSiteSettings,
  initialConsultationSessions,
  initialWalletTransactions,
} from '../data/mockData';

interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'danger' | 'info';
}

interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'sos' | 'proposal' | 'security' | 'system';
}

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  activeTab: 'home' | 'safety' | 'services' | 'cases' | 'profile';
  setActiveTab: (tab: 'home' | 'safety' | 'services' | 'cases' | 'profile') => void;
  adminActiveTab: 'dashboard' | 'events' | 'specialists' | 'freelance' | 'users' | 'blog' | 'settings';
  setAdminActiveTab: (tab: 'dashboard' | 'events' | 'specialists' | 'freelance' | 'users' | 'blog' | 'settings') => void;
  
  // Lawyer App State
  lawyerActiveTab: 'cases' | 'contracts' | 'consultations' | 'wallet' | 'profile';
  setLawyerActiveTab: (tab: 'cases' | 'contracts' | 'consultations' | 'wallet' | 'profile') => void;
  consultations: ConsultationSession[];
  completeConsultation: (id: string) => void;
  walletTransactions: WalletTransaction[];
  requestPayout: (amount: number, iban: string) => void;
  lawyerAvailability: boolean;
  toggleLawyerAvailability: () => void;
  uploadCaseDocument: (projectId: string, fileName: string) => void;

  // Emergency & Safety toggles
  isSOSActive: boolean;
  setIsSOSActive: (val: boolean) => void;
  triggerSOS: () => void;
  cancelSOS: () => void;
  isRecordingSecretAudio: boolean;
  toggleSecretAudio: () => void;
  isLiveLocationActive: boolean;
  toggleLiveLocation: () => void;
  isCarDangerActive: boolean;
  toggleCarDanger: () => void;
  isShakeSensorActive: boolean;
  toggleShakeSensor: () => void;
  safetyScore: number;
  
  // Data State
  events: EmergencyEvent[];
  addEmergencyEvent: (type: EventType, labelFa: string, details?: string, severity?: 'critical' | 'high' | 'medium') => void;
  updateEventStatus: (id: string, status: EventStatus) => void;
  
  specialists: Specialist[];
  approveSpecialist: (id: string) => void;
  rejectSpecialist: (id: string) => void;
  registerSpecialist: (data: Partial<Specialist>) => void;
  updateLawyerProfile: (data: Partial<Specialist>) => void;
  
  users: User[];
  updateCurrentUserProfile: (name: string, phone: string, nationalId?: string) => void;
  trustedContacts: TrustedContact[];
  addTrustedContact: (contact: Omit<TrustedContact, 'id'>) => void;
  deleteTrustedContact: (id: string) => void;
  toggleContactSOS: (id: string) => void;
  
  projects: FreelanceProject[];
  addProject: (proj: Omit<FreelanceProject, 'id' | 'createdAt' | 'proposalsCount'>) => void;
  
  proposals: Proposal[];
  addProposal: (prop: Omit<Proposal, 'id' | 'createdAt' | 'status'>) => void;
  acceptProposal: (proposalId: string) => void;
  
  blogPosts: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, 'id' | 'views'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  
  // Modals & UI
  authModalOpen: boolean;
  authModalInitialTab: 'login' | 'register_citizen' | 'register_lawyer';
  openAuthModal: (tab?: 'login' | 'register_citizen' | 'register_lawyer') => void;
  closeAuthModal: () => void;
  
  newProjectModalOpen: boolean;
  setNewProjectModalOpen: (val: boolean) => void;
  
  selectedLawyerForBooking: Specialist | null;
  setSelectedLawyerForBooking: (lawyer: Specialist | null) => void;
  
  // Sub-menu modals for full interactivity
  personalInfoModalOpen: boolean;
  setPersonalInfoModalOpen: (val: boolean) => void;
  securitySettingsModalOpen: boolean;
  setSecuritySettingsModalOpen: (val: boolean) => void;
  activityHistoryModalOpen: boolean;
  setActivityHistoryModalOpen: (val: boolean) => void;
  helpSupportModalOpen: boolean;
  setHelpSupportModalOpen: (val: boolean) => void;
  virtualCompanionModalOpen: boolean;
  setVirtualCompanionModalOpen: (val: boolean) => void;
  serviceDetailModalOpen: boolean;
  setServiceDetailModalOpen: (val: boolean) => void;
  selectedServiceCategory: string | null;
  setSelectedServiceCategory: (cat: string | null) => void;
  notificationsDrawerOpen: boolean;
  setNotificationsDrawerOpen: (val: boolean) => void;
  notifications: AppNotification[];
  markNotificationsAsRead: () => void;

  viewDeviceFrame: boolean;
  setViewDeviceFrame: (val: boolean) => void;
  
  toasts: ToastState[];
  showToast: (message: string, type?: 'success' | 'danger' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<User>(initialUsers[1]); // Sara Mohammadi (citizen)
  const [currentRole, setCurrentRole] = useState<UserRole>('citizen');
  
  const [activeTab, setActiveTab] = useState<'home' | 'safety' | 'services' | 'cases' | 'profile'>('home');
  const [adminActiveTab, setAdminActiveTab] = useState<'dashboard' | 'events' | 'specialists' | 'freelance' | 'users' | 'blog' | 'settings'>('dashboard');

  // Lawyer App State
  const [lawyerActiveTab, setLawyerActiveTab] = useState<'cases' | 'contracts' | 'consultations' | 'wallet' | 'profile'>('cases');
  const [consultations, setConsultations] = useState<ConsultationSession[]>(initialConsultationSessions);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(initialWalletTransactions);
  const [lawyerAvailability, setLawyerAvailability] = useState<boolean>(true);
  
  const [isSOSActive, setIsSOSActive] = useState<boolean>(false);
  const [isRecordingSecretAudio, setIsRecordingSecretAudio] = useState<boolean>(false);
  const [isLiveLocationActive, setIsLiveLocationActive] = useState<boolean>(true);
  const [isCarDangerActive, setIsCarDangerActive] = useState<boolean>(false);
  const [isShakeSensorActive, setIsShakeSensorActive] = useState<boolean>(false);
  const [safetyScore] = useState<number>(87);
  
  const [events, setEvents] = useState<EmergencyEvent[]>(initialEmergencyEvents);
  const [specialists, setSpecialists] = useState<Specialist[]>(initialSpecialists);
  const [trustedContacts, setTrustedContacts] = useState<TrustedContact[]>(initialTrustedContacts);
  const [projects, setProjects] = useState<FreelanceProject[]>(initialProjects);
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(initialSiteSettings);
  
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalInitialTab, setAuthModalInitialTab] = useState<'login' | 'register_citizen' | 'register_lawyer'>('login');
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);
  const [selectedLawyerForBooking, setSelectedLawyerForBooking] = useState<Specialist | null>(null);

  // Sub-menu modals state
  const [personalInfoModalOpen, setPersonalInfoModalOpen] = useState(false);
  const [securitySettingsModalOpen, setSecuritySettingsModalOpen] = useState(false);
  const [activityHistoryModalOpen, setActivityHistoryModalOpen] = useState(false);
  const [helpSupportModalOpen, setHelpSupportModalOpen] = useState(false);
  const [virtualCompanionModalOpen, setVirtualCompanionModalOpen] = useState(false);
  const [serviceDetailModalOpen, setServiceDetailModalOpen] = useState(false);
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<string | null>(null);
  const [notificationsDrawerOpen, setNotificationsDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      title: 'پیشنهاد وکیل جدید',
      message: 'وکیل سارا امیری برای پرونده «تنظیم شکواییه مزاحمت» پیشنهاد قیمت ثبت کرد.',
      time: '۱۰ دقیقه پیش',
      read: false,
      type: 'proposal',
    },
    {
      id: 'notif-2',
      title: 'سپر امنیتی فعال شد',
      message: 'موقعیت مکانی زنده شما با دقت ۳ متر در حال مخابره است.',
      time: '۱ ساعت پیش',
      read: false,
      type: 'security',
    },
    {
      id: 'notif-3',
      title: 'پیام مدیریت سامانه',
      message: 'نسخه جدید آیداد با امکان مشاوره آنلاین وکلا هم‌اکنون فعال است.',
      time: 'امروز',
      read: true,
      type: 'system',
    },
  ]);
  
  const [viewDeviceFrame, setViewDeviceFrame] = useState(false);
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const completeConsultation = (id: string) => {
    setConsultations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'completed' } : c))
    );
    showToast('جلسه مشاوره به عنوان تکمیل شده ثبت شد', 'success');
  };

  const requestPayout = (amount: number, iban: string) => {
    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      amount,
      type: 'payout',
      title: `درخواست تسویه به شبا ${iban.slice(0, 10)}...`,
      date: 'لحظاتی پیش',
      status: 'pending',
    };
    setWalletTransactions((prev) => [newTx, ...prev]);
    showToast(`درخواست تسویه به مبلغ ${amount.toLocaleString('fa-IR')} تومان ثبت شد و تا ۲۴ ساعت آینده واریز می‌شود`, 'success');
  };

  const toggleLawyerAvailability = () => {
    setLawyerAvailability((prev) => {
      const next = !prev;
      showToast(next ? 'وضعیت شما فعال شد و آماده قبول پرونده هستید' : 'وضعیت شما به غیرفعال تغییر یافت', 'info');
      return next;
    });
  };

  const uploadCaseDocument = (projectId: string, fileName: string) => {
    showToast(`فایل «${fileName}» با موفقیت برای پرونده بارگذاری شد`, 'success');
  };

  const updateLawyerProfile = (data: Partial<Specialist>) => {
    setSpecialists((prev) =>
      prev.map((sp) => (sp.id === 'sp-1' ? { ...sp, ...data } : sp))
    );
    showToast('اطلاعات پروفایل و پروانه وکالت به‌روزرسانی شد', 'success');
  };

  const updateCurrentUserProfile = (name: string, phone: string, nationalId?: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      name,
      phone,
      nationalId,
    }));
    showToast('اطلاعات کاربری با موفقیت ویرایش شد', 'success');
  };

  const showToast = (message: string, type: 'success' | 'danger' | 'info' = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const triggerSOS = () => {
    setIsSOSActive(true);
    addEmergencyEvent('SOS', 'هشدار اضطراری (SOS)', 'دکمه اضطراری سرخ توسط کاربر فشرده شد', 'critical');
    showToast('هشدار اضطراری فعال شد! پیامک به مخاطبین امن در حال ارسال است', 'danger');
  };

  const cancelSOS = () => {
    setIsSOSActive(false);
    showToast('هشدار SOS متوقف شد', 'info');
  };

  const toggleSecretAudio = () => {
    if (!isRecordingSecretAudio) {
      setIsRecordingSecretAudio(true);
      addEmergencyEvent('AUDIO', 'ضبط مخفی صدا', 'آغاز ضبط خودکار صوت در پس‌زمینه و آماده‌سازی جهت آپلود امن', 'high');
      showToast('ضبط مخفی صدا آغاز شد و در پس‌زمینه در حال ذخیره است', 'success');
    } else {
      setIsRecordingSecretAudio(false);
      showToast('ضبط مخفی صدا ذخیره و متوقف شد', 'info');
    }
  };

  const toggleLiveLocation = () => {
    const nextVal = !isLiveLocationActive;
    setIsLiveLocationActive(nextVal);
    if (nextVal) {
      addEmergencyEvent('LOCATION', 'اشتراک موقعیت مکانی زنده', 'موقعیت مکانی دقیق روی نقشه فعال شد', 'medium');
      showToast('ردیابی زنده موقعیت با دقت GPS فعال شد', 'success');
    } else {
      showToast('اشتراک موقعیت مکانی متوقف شد', 'info');
    }
  };

  const toggleCarDanger = () => {
    const nextVal = !isCarDangerActive;
    setIsCarDangerActive(nextVal);
    if (nextVal) {
      addEmergencyEvent('THREAT', 'هشدار خطر در خودرو / تاکسی', 'کاربر وضعیت اضطراری حین تردد با خودرو را اعلام کرد', 'critical');
      showToast('حالت اضطراری خطر در خودرو فعال شد و مشخصات مسیر ثبت می‌گردد', 'danger');
    } else {
      showToast('حالت خطر در خودرو غیرفعال شد', 'info');
    }
  };

  const toggleShakeSensor = () => {
    const nextVal = !isShakeSensorActive;
    setIsShakeSensorActive(nextVal);
    if (nextVal) {
      showToast('سنسور لرزش گوشی فعال شد (۳ بار تکان شدید = ارسال SOS)', 'success');
    } else {
      showToast('سنسور لرزش گوشی غیرفعال شد', 'info');
    }
  };

  const addEmergencyEvent = (
    type: EventType,
    labelFa: string,
    details?: string,
    severity: 'critical' | 'high' | 'medium' = 'medium'
  ) => {
    const newEvent: EmergencyEvent = {
      id: `ev-${Date.now()}`,
      type,
      typeLabelFa: labelFa,
      userPhone: currentUser.phone,
      userName: currentUser.name,
      timestamp: 'هم‌اکنون',
      timestampFull: new Date().toLocaleTimeString('fa-IR'),
      status: 'ACTIVE',
      location: {
        lat: 35.7219 + (Math.random() - 0.5) * 0.05,
        lng: 51.4012 + (Math.random() - 0.5) * 0.05,
        address: 'تهران، موقعیت شناسایی شده زنده با GPS',
      },
      notifiedContactsCount: trustedContacts.filter((c) => c.receiveSOS).length,
      totalContactsCount: trustedContacts.length,
      details,
      severity,
    };
    setEvents((prev) => [newEvent, ...prev]);
  };

  const updateEventStatus = (id: string, status: EventStatus) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, status } : ev))
    );
    showToast(`وضعیت رویداد به ${status === 'RESOLVED' ? 'رسیدگی شده' : status === 'INVESTIGATING' ? 'در حال بررسی' : status === 'FALSE_ALARM' ? 'هشدار کاذب' : 'امدادرسانی شده'} تغییر یافت`, 'info');
  };

  const approveSpecialist = (id: string) => {
    setSpecialists((prev) =>
      prev.map((sp) => (sp.id === id ? { ...sp, status: 'active', isVerified: true } : sp))
    );
    showToast('پروانه و مدارک متخصص تأیید و در سامانه فعال شد', 'success');
  };

  const rejectSpecialist = (id: string) => {
    setSpecialists((prev) =>
      prev.map((sp) => (sp.id === id ? { ...sp, status: 'suspended', isVerified: false } : sp))
    );
    showToast('درخواست متخصص رد شد', 'danger');
  };

  const registerSpecialist = (data: Partial<Specialist>) => {
    const newSp: Specialist = {
      id: `sp-${Date.now()}`,
      name: data.name || 'متخصص جدید',
      title: data.title || 'وکیل پایه یک دادگستری',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      phone: data.phone || '09120000000',
      email: data.email || 'lawyer@aydad.ir',
      rating: 5.0,
      reviewsCount: 1,
      status: 'pending', // Pending approval by admin!
      isVerified: false,
      specialties: data.specialties && data.specialties.length > 0 ? data.specialties : ['حقوق بانوان', 'جرایم کیفری'],
      barLicenseNumber: data.barLicenseNumber || 'در انتظار استعلام',
      consultationFee: data.consultationFee || 350000,
      hourlyRate: data.hourlyRate || 750000,
      experienceYears: data.experienceYears || 5,
      bio: data.bio || 'متخصص حقوقی آماده قبول پرونده و ارائه مشاوره تخصصی.',
      location: data.location || 'تهران',
      completedCasesCount: 0,
      nationalId: data.nationalId || '0011223344',
      registeredDate: 'امروز',
      documentName: 'مدارک_پروانه_وکالت.pdf',
    };
    setSpecialists((prev) => [newSp, ...prev]);
    showToast('ثبت‌نام شما به عنوان متخصص ثبت شد و پس از بررسی مدارک توسط ادمین فعال می‌گردد', 'success');
  };

  const addTrustedContact = (contact: Omit<TrustedContact, 'id'>) => {
    const newContact: TrustedContact = {
      id: `tc-${Date.now()}`,
      ...contact,
    };
    setTrustedContacts((prev) => [...prev, newContact]);
    showToast(`مخاطب امن «${contact.name}» با موفقیت افزوده شد`, 'success');
  };

  const deleteTrustedContact = (id: string) => {
    setTrustedContacts((prev) => prev.filter((c) => c.id !== id));
    showToast('مخاطب امن حذف شد', 'info');
  };

  const toggleContactSOS = (id: string) => {
    setTrustedContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, receiveSOS: !c.receiveSOS } : c))
    );
  };

  const addProject = (proj: Omit<FreelanceProject, 'id' | 'createdAt' | 'proposalsCount'>) => {
    const newP: FreelanceProject = {
      id: `fp-${Date.now()}`,
      ...proj,
      proposalsCount: 0,
      createdAt: 'لحظاتی پیش',
    };
    setProjects((prev) => [newP, ...prev]);
    showToast('درخواست پرونده شما ثبت شد و وکلای متخصص پیشنهادهای خود را ارسال خواهند کرد', 'success');
  };

  const addProposal = (prop: Omit<Proposal, 'id' | 'createdAt' | 'status'>) => {
    const newProp: Proposal = {
      id: `prop-${Date.now()}`,
      ...prop,
      createdAt: 'هم‌اکنون',
      status: 'pending',
    };
    setProposals((prev) => [newProp, ...prev]);
    // increment proposalsCount on project
    setProjects((prev) =>
      prev.map((p) => (p.id === prop.projectId ? { ...p, proposalsCount: p.proposalsCount + 1 } : p))
    );
    showToast('پیشنهاد همکاری شما با موفقیت برای موکل ارسال شد', 'success');
  };

  const acceptProposal = (proposalId: string) => {
    const p = proposals.find((x) => x.id === proposalId);
    if (!p) return;
    setProposals((prev) =>
      prev.map((item) => (item.id === proposalId ? { ...item, status: 'accepted' } : item))
    );
    setProjects((prev) =>
      prev.map((proj) => (proj.id === p.projectId ? { ...proj, status: 'in_progress' } : proj))
    );
    showToast(`پیشنهاد ${p.specialistName} پذیرفته شد و پرونده به جریان افتاد`, 'success');
  };

  const addBlogPost = (post: Omit<BlogPost, 'id' | 'views'>) => {
    const newB: BlogPost = {
      id: `b-${Date.now()}`,
      ...post,
      views: 12,
    };
    setBlogPosts((prev) => [newB, ...prev]);
    showToast('مقاله آموزشی جدید منتشر شد', 'success');
  };

  const updateBlogPost = (id: string, post: Partial<BlogPost>) => {
    setBlogPosts((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...post } : b))
    );
    showToast('تغییرات مقاله ذخیره شد', 'success');
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts((prev) => prev.filter((b) => b.id !== id));
    showToast('مقاله حذف شد', 'info');
  };

  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('تنظیمات سامانه با موفقیت ذخیره شد', 'success');
  };

  const openAuthModal = (tab: 'login' | 'register_citizen' | 'register_lawyer' = 'login') => {
    setAuthModalInitialTab(tab);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  // Sync role changes with active user if needed
  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    if (newRole === 'admin') {
      setCurrentUser(users.find((u) => u.role === 'admin') || users[0]);
      showToast('ورود به پنل مدیریت آیداد', 'info');
    } else if (newRole === 'lawyer') {
      setCurrentUser(users.find((u) => u.role === 'lawyer') || users[4]);
      showToast('تغییر حالت کاربری به وکیل و فریلنسر حقوقی', 'info');
    } else {
      setCurrentUser(users.find((u) => u.role === 'citizen') || users[1]);
      showToast('تغییر حالت کاربری به شهروند (کاربر عادی)', 'info');
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentRole,
        setCurrentRole: handleRoleChange,
        activeTab,
        setActiveTab,
        adminActiveTab,
        setAdminActiveTab,
        isSOSActive,
        setIsSOSActive,
        triggerSOS,
        cancelSOS,
        isRecordingSecretAudio,
        toggleSecretAudio,
        isLiveLocationActive,
        toggleLiveLocation,
        isCarDangerActive,
        toggleCarDanger,
        isShakeSensorActive,
        toggleShakeSensor,
        safetyScore,
        events,
        addEmergencyEvent,
        updateEventStatus,
        specialists,
        approveSpecialist,
        rejectSpecialist,
        registerSpecialist,
        updateLawyerProfile,
        users,
        updateCurrentUserProfile,
        trustedContacts,
        addTrustedContact,
        deleteTrustedContact,
        toggleContactSOS,
        projects,
        addProject,
        proposals,
        addProposal,
        acceptProposal,
        blogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        siteSettings,
        updateSiteSettings,
        
        // Lawyer App
        lawyerActiveTab,
        setLawyerActiveTab,
        consultations,
        completeConsultation,
        walletTransactions,
        requestPayout,
        lawyerAvailability,
        toggleLawyerAvailability,
        uploadCaseDocument,

        authModalOpen,
        authModalInitialTab,
        openAuthModal,
        closeAuthModal,
        newProjectModalOpen,
        setNewProjectModalOpen,
        selectedLawyerForBooking,
        setSelectedLawyerForBooking,
        
        // Sub-menu modals
        personalInfoModalOpen,
        setPersonalInfoModalOpen,
        securitySettingsModalOpen,
        setSecuritySettingsModalOpen,
        activityHistoryModalOpen,
        setActivityHistoryModalOpen,
        helpSupportModalOpen,
        setHelpSupportModalOpen,
        virtualCompanionModalOpen,
        setVirtualCompanionModalOpen,
        serviceDetailModalOpen,
        setServiceDetailModalOpen,
        selectedServiceCategory,
        setSelectedServiceCategory,
        notificationsDrawerOpen,
        setNotificationsDrawerOpen,
        notifications,
        markNotificationsAsRead,

        viewDeviceFrame,
        setViewDeviceFrame,
        toasts,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

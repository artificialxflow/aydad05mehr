export type UserRole = 'citizen' | 'lawyer' | 'admin';

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  nationalId?: string;
  isVerified?: boolean;
  createdAt: string;
  emergencyContactsCount?: number;
  eventsCount?: number;
  specialistProfileId?: string;
}

export interface TrustedContact {
  id: string;
  name: string;
  relationship: 'مادر' | 'پدر' | 'همسر' | 'خواهر' | 'برادر' | 'دوست' | 'وکیل' | 'سایر';
  phone: string;
  priority: number;
  receiveSOS: boolean;
}

export type EventType =
  | 'SOS'
  | 'HELP_WOMEN'
  | 'ACCIDENT'
  | 'HELP_ELDERLY'
  | 'LOCATION'
  | 'IMAGE'
  | 'AUDIO'
  | 'SHAKE'
  | 'THREAT'
  | 'HARASSMENT'
  | 'STALKING';

export type EventStatus = 'ACTIVE' | 'RESOLVED' | 'INVESTIGATING' | 'DISPATCHED' | 'FALSE_ALARM';

export interface EmergencyEvent {
  id: string;
  type: EventType;
  typeLabelFa: string;
  userPhone: string;
  userName: string;
  timestamp: string;
  timestampFull: string;
  status: EventStatus;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  audioUrl?: string;
  audioDuration?: string;
  imageUrl?: string;
  notifiedContactsCount: number;
  totalContactsCount: number;
  details?: string;
  severity: 'critical' | 'high' | 'medium' | 'info';
}

export type SpecialistStatus = 'active' | 'pending' | 'suspended';

export interface Specialist {
  id: string;
  name: string;
  title: string;
  avatar: string;
  phone: string;
  email: string;
  rating: number;
  reviewsCount: number;
  status: SpecialistStatus;
  isVerified: boolean;
  specialties: string[];
  barLicenseNumber: string; // شماره پروانه وکالت / نظام روانشناسی
  consultationFee: number; // تومان برای هر جلسه تلفنی
  hourlyRate: number; // تومان در ساعت
  experienceYears: number;
  bio: string;
  location: string;
  completedCasesCount: number;
  nationalId: string;
  registeredDate: string;
  documentName?: string;
}

export interface FreelanceProject {
  id: string;
  title: string;
  description: string;
  category: string;
  clientName: string;
  clientPhone: string;
  budget: number; // تومان
  deadline: string;
  status: 'open' | 'in_progress' | 'completed' | 'disputed';
  proposalsCount: number;
  createdAt: string;
  urgency: 'immediate' | 'high' | 'normal';
}

export interface Proposal {
  id: string;
  projectId: string;
  specialistId: string;
  specialistName: string;
  specialistAvatar: string;
  specialistTitle: string;
  specialistRating: number;
  price: number; // تومان
  estimatedDays: number;
  coverLetter: string;
  createdAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  views: number;
  published: boolean;
}

export interface ConsultationSession {
  id: string;
  specialistId: string;
  clientName: string;
  clientPhone: string;
  type: 'phone' | 'video' | 'chat';
  scheduledTime: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  fee: number;
  notes?: string;
}

export interface WalletTransaction {
  id: string;
  amount: number;
  type: 'credit' | 'payout';
  title: string;
  date: string;
  status: 'successful' | 'pending';
}

export interface SiteSettings {
  emergencyPhone: string;
  displayPhone: string;
  policePhone: string;
  socialEmergencyPhone: string;
  aboutTitle: string;
  aboutContent: string;
  contactTitle: string;
  contactContent: string;
  footerSlogan: string;
  smsGatewayActive: boolean;
  aiSafetyAnalysisEnabled: boolean;
  platformCommissionPercent: number;
}

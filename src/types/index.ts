export interface User {
  id: number;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'EDITOR' | 'ADMIN_LAYANAN' | 'ADMIN';
}

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image?: string;
  featuredImage?: string;
  category: 'AGENDA' | 'ACARA' | 'KEGIATAN' | string;
  status: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  author?: any;
  titleEn?: string;
  excerptEn?: string;
  contentEn?: string;
}

export interface AnnouncementItem {
  id: number;
  title: string;
  slug: string;
  content: string;
  isPinned: boolean;
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  attachmentUrl?: string;
  attachmentName?: string;
  status?: 'DRAFT' | 'PUBLISHED' | string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  author?: any;
}

export interface PriceRate {
  id: number;
  serviceType: string;
  businessScale: string;
  label: string;
  bpjphPrice: number;
  lphPrice: number;
  formulaNotes?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface CalculationResult {
  rateLabel?: string;
  serviceType: string;
  businessScale: string;
  productCount?: number;
  ingredientCount?: number;
  breakdown: Array<{
    item: string;
    bpjph: number;
    lph: number;
  }>;
  totalBpjph: number;
  totalLph: number;
  savingsNominal: number;
  savingsPercent: number;
  notes?: string;
  disclaimer?: string;
}

export interface SatisfactionSurvey {
  id: number;
  name?: string;
  contact?: string;
  serviceUsed: string;
  rating: number;
  speedRating: number;
  friendlinessRating: number;
  clarityRating: number;
  facilityRating: number;
  comment?: string;
  submittedAt?: string;
}

export interface Complaint {
  id: number;
  ticketCode: string;
  name: string;
  contact: string;
  contactType: 'EMAIL' | 'WHATSAPP' | string;
  category: string;
  description: string;
  attachmentUrl?: string;
  status: 'RECEIVED' | 'IN_PROGRESS' | 'RESOLVED' | string;
  adminReply?: string;
  createdAt?: string;
  submittedAt?: string;
  updatedAt?: string;
}

export interface KnowledgeBaseItem {
  id: number;
  question: string;
  answer: string;
  tags?: string;
  isActive: boolean;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

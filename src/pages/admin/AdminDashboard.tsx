import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Input,
  TextArea,
  Table,
  Modal,
  Chip,
  Breadcrumbs,
  Pagination,
} from '@heroui/react';
import {
  Newspaper,
  Bell,
  Bot,
  Calculator,
  Smile,
  ShieldAlert,
  LogOut,
  Plus,
  Trash2,
  CheckCircle2,
  Users,
  Search,
  ExternalLink,
  Edit,
  Eye,
  FileText,
  Building2,
  FlaskConical,
  Sparkles,
  RefreshCw,
  Image as ImageIcon,
  LayoutDashboard,
  ShieldCheck,
  TrendingUp,
  Clock,
  AlertCircle,
  HelpCircle,
  MessageSquare,
  ArrowLeft,
  Save,
  Send,
  History,
  FolderOpen,
  Check,
  Copy,
  Globe,
  Settings,
  Filter,
  Database,
  FileSpreadsheet,
  Download,
  Upload,
  RotateCcw,
  Scale,
  Edit3,
  Pin,
  ArrowRight,
  Menu,
  X,
} from 'lucide-react';
import { api, formatDate, formatRupiah } from '@/services/api';
import { cn } from '@/lib/utils';
import type { NewsItem, AnnouncementItem, Complaint, SatisfactionSurvey, KnowledgeBaseItem } from '@/types';
import { exportToExcel } from '@/lib/excelExport';
import { RatesEditorTab } from '@/components/admin/RatesEditorTab';
import { BackupManagerTab } from '@/components/admin/BackupManagerTab';
import { getRatesMatrix } from '@/services/ratesService';

// Lazy-load TinyMCE editor for performance & smooth Vite bundling
const RichTextEditor = React.lazy(() => import('@/components/admin/RichTextEditor'));

type AdminTab =
  | 'OVERVIEW'
  | 'NEWS'
  | 'ANNOUNCEMENTS'
  | 'GALLERY'
  | 'COMPLAINTS'
  | 'SATISFACTION'
  | 'RATES'
  | 'KB'
  | 'MEDIA'
  | 'BACKUP'
  | 'AUDIT_LOG'
  | 'USERS';

interface AdminGalleryItem {
  id: number;
  title: string;
  category: string;
  src: string;
  date: string;
  location: string;
  auditorLead: string;
  facility: string;
  standard: string;
  fullStory: string;
}

interface AuditLogItem {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  type: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN';
}

interface MediaItem {
  id: number;
  name: string;
  src: string;
  category: string;
  size: string;
}

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>({ name: 'Administrator LPH UIN SGD', role: 'SUPER_ADMIN' });
  const [activeTab, setActiveTab] = useState<AdminTab>('OVERVIEW');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Sub-view mode for Posts: 'LIST' or 'EDITOR'
  const [postViewMode, setPostViewMode] = useState<'LIST' | 'EDITOR'>('LIST');
  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  // -------------------------------------------------------------
  // INITIAL DATA WITH LOCALSTORAGE PERSISTENCE
  // -------------------------------------------------------------
  const [newsList, setNewsList] = useState<NewsItem[]>(() => {
    try {
      const raw = localStorage.getItem('lph_news_list');
      if (raw) return JSON.parse(raw);
    } catch {}
    return [
      {
        id: 1,
        title: 'Akselerasi Audit Sertifikasi Halal: LPH UIN SGD Perluas Jangkauan Industri Jawa Barat',
        slug: 'akselerasi-audit-sertifikasi-halal-lph-uin-sgd',
        category: 'KEGIATAN',
        status: 'PUBLISHED',
        publishedAt: '2026-11-04',
        excerpt: 'LPH UIN Sunan Gunung Djati Bandung memperkuat kapasitas auditor halal dan laboratorium terpadu.',
        content: `<h2>Akselerasi Audit Sertifikasi Halal di Jawa Barat</h2>
<p>Lembaga Pemeriksa Halal (LPH) UIN Sunan Gunung Djati Bandung terus memperluas kapasitas audit halal bagi pelaku industri menengah dan besar di kawasan industri Jawa Barat.</p>
<blockquote>Komitmen kami adalah memastikan setiap produk yang diaudit memenuhi standar syar'i dan regulasi KMA 784 secara transparan dan akuntabel.</blockquote>
<p>Dalam kurun waktu kuartal terakhir tahun 2026, lebih dari <strong>450 fasilitas manufaktur</strong> telah menyelesaikan audit lapangan dan uji laboratorium DNA qPCR dengan waktu rata-rata 12 hari kerja.</p>`,
        image: '/assets/images/beranda_004.jpg',
      },
      {
        id: 2,
        title: 'Kerjasama Internasional: Ekosistem Halalsphere University Menuju Kancah Global',
        slug: 'kerjasama-internasional-ekosistem-halalsphere',
        category: 'ACARA',
        status: 'PUBLISHED',
        publishedAt: '2026-11-03',
        excerpt: 'Penandatanganan kemitraan strategis dengan konsorsium riset halal global.',
        content: `<h2>Penguatan Ekosistem Halalsphere Global</h2>
<p>UIN Sunan Gunung Djati Bandung resmi menandatangani nota kesepahaman (MoU) internasional untuk pengembangan riset halal biosains dan standarisasi pengujian laboratorium halal.</p>
<p>Kerjasama ini mencakup pertukaran saintis, validasi metode ekstraksi DNA porcine, dan harmonisasi sertifikasi produk ekspor.</p>`,
        image: '/assets/images/uin_sgd/uin_14.webp',
      },
      {
        id: 3,
        title: 'Kewajiban Sertifikasi Halal Bertahap bagi Pelaku Usaha Makanan dan Minuman',
        slug: 'kewajiban-sertifikasi-halal-bertahap-makanan-minuman',
        category: 'AGENDA',
        status: 'PUBLISHED',
        publishedAt: '2026-11-02',
        excerpt: 'Panduan teknis dan simulasi biaya KMA 784 bagi UMKM se-Jawa Barat.',
        content: `<h2>Panduan Wajib Halal Bertahap 2026</h2>
<p>Menjelang tenggat implementasi regulasi wajib halal, LPH UIN SGD menyelenggarakan rangkaian sosialisasi daring dan luring bagi asosiasi kuliner dan pelaku usaha pangan kemasan.</p>`,
        image: '/assets/images/pemeriksaaan-kehalalan-produk.jpg',
      },
      {
        id: 4,
        title: 'Pelatihan Juru Sembelih Halal (JULEHA) Profesional Berbasis SKKNI Angkatan VIII',
        slug: 'pelatihan-juru-sembelih-halal-juleha-skkni',
        category: 'KEGIATAN',
        status: 'DRAFT',
        publishedAt: '2026-11-01',
        excerpt: 'Bimbingan teknis dan uji kompetensi resmi BNSP bagi 120 juru sembelih masjid dan RPH.',
        content: `<h2>Pelatihan & Sertifikasi Kompetensi JULEHA</h2>
<p>LPJPH UIN SGD bersama BNSP menggelar uji kompetensi profesi juru sembelih halal untuk memastikan kesesuaian syar'i dan prinsip animal welfare.</p>`,
        image: '/assets/images/img_013.jpg',
      },
    ];
  });

  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(() => {
    try {
      const raw = localStorage.getItem('lph_announcements_cache');
      if (raw) return JSON.parse(raw);
    } catch {}
    return [
      {
        id: 1,
        title: 'Surat Keputusan Penetapan Tarif Pelayanan Pemeriksaan Halal LPH UIN SGD Tahun 2026',
        slug: 'sk-tarif-pelayanan-halal-2026',
        fileName: 'SK_Tarif_Halal_UIN_SGD_2026.pdf',
        fileUrl: '/assets/docs/sk_tarif_2026.pdf',
        fileSize: '1.4 MB',
        isPinned: true,
        status: 'PUBLISHED',
        publishedAt: '2026-11-01',
        content: 'Keputusan resmi penetapan rincian tarif audit lapangan dan pengujian laboratorium terakreditasi.',
      },
      {
        id: 2,
        title: 'Jadwal Audit Lapangan dan Pelaksanaan Sidang Fatwa Halal Periode November 2026',
        slug: 'jadwal-audit-sidang-fatwa-nov-2026',
        fileName: 'Jadwal_Audit_Sidang_Fatwa_Nov2026.pdf',
        fileUrl: '/assets/docs/jadwal_audit_nov2026.pdf',
        fileSize: '820 KB',
        isPinned: false,
        status: 'PUBLISHED',
        publishedAt: '2026-10-28',
        content: 'Pemberitahuan slot waktu verifikasi lapangan bagi pelaku usaha reguler yang telah tervalidasi.',
      },
      {
        id: 3,
        title: 'Surat Edaran BPJPH No. 2 Tahun 2026 tentang Integrasi Layanan SIHALAL dan Uji qPCR',
        slug: 'edaran-bpjph-integrasi-sihalal-qpcr',
        fileName: 'SE_BPJPH_Integrasi_qPCR_2026.pdf',
        fileUrl: '/assets/docs/edaran_bpjph_qpcr_2026.pdf',
        fileSize: '2.1 MB',
        isPinned: false,
        status: 'PUBLISHED',
        publishedAt: '2026-10-20',
        content: 'Instruksi wajib lampiran hasil uji laboratorium terakreditasi KAN untuk matriks bahan kritis hewani.',
      },
    ];
  });

  const [galleryList, setGalleryList] = useState<AdminGalleryItem[]>(() => {
    try {
      const raw = localStorage.getItem('lph_gallery_list');
      if (raw) return JSON.parse(raw);
    } catch {}
    return [
      {
        id: 1,
        title: 'Audit Fasilitas Pabrik Pengolahan Pangan & Minuman Berkecepatan Tinggi',
        category: 'Audit Lapangan',
        src: '/assets/images/pemeriksaaan-kehalalan-produk.jpg',
        date: '15 Oktober 2026',
        location: 'Kawasan Industri MM2100, Cikarang',
        auditorLead: 'Drs. H. Ahmad Fauzi, M.Si',
        facility: 'PT Indofood CBP Sukses Makmur Tbk',
        standard: 'KMA 784 / SNI 99001:2016',
        fullStory: 'Pemeriksaan langsung terhadap lini produksi pemrosesan makanan kemasan berkecepatan tinggi.',
      },
      {
        id: 2,
        title: 'Deteksi Saintifik Real-Time PCR DNA Porcine Sensitivitas Tinggi',
        category: 'Laboratorium ISO 17025',
        src: '/assets/images/lab-dna-testing.jpg',
        date: '22 Oktober 2026',
        location: 'Laboratorium Terpadu Kampus 2 UIN SGD',
        auditorLead: 'Dr. Tri Cahyanto, M.Si',
        facility: 'Laboratorium Uji Halal Kampus 2',
        standard: 'ISO/IEC 17025:2017 LP-1542-IDN',
        fullStory: 'Pengujian molekuler presisi tinggi menggunakan primer qPCR spesifik gen sitokrom b.',
      },
      {
        id: 3,
        title: 'Pelatihan & Sertifikasi Juru Sembelih Halal (JULEHA) Angkatan VIII',
        category: 'Pelatihan & JULEHA',
        src: '/assets/images/img_013.jpg',
        date: '02 November 2026',
        location: 'Auditorium Anwar Musaddad UIN SGD',
        auditorLead: 'Prof. Dr. H. Rosihon Anwar, M.Ag',
        facility: 'LPJPH Halal Center UIN SGD',
        standard: 'SKKNI No. 147 Tahun 2022',
        fullStory: 'Pemberian materi anatomi leher hewan ternak, fiqih dzabh, dan uji kompetensi BNSP.',
      },
      {
        id: 4,
        title: 'Monitoring & Kunjungan Kerja Akselerasi Layanan Bersama Pimpinan BPJPH',
        category: 'Kunjungan & MoA',
        src: '/assets/images/uin_sgd/uin_14.webp',
        date: '08 November 2026',
        location: 'Gedung Halal Center Kampus 1 UIN SGD',
        auditorLead: 'Pimpinan BPJPH Kemenag RI',
        facility: 'Pusat Riset Halal UIN SGD',
        standard: 'PP No. 39 Tahun 2021',
        fullStory: 'Evaluasi kesiapan sarana laboratorium dan integrasi platform digital SIHALAL.',
      },
    ];
  });

  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    try {
      const raw = localStorage.getItem('lph_complaints_list');
      if (raw) return JSON.parse(raw);
    } catch {}
    return [
      {
        id: 1,
        ticketCode: 'TKT-829104',
        name: 'Pelapor Anonim (Pelaku Usaha)',
        contact: '081298412xxx',
        contactType: 'WHATSAPP',
        category: 'PELAYANAN',
        description: 'Konfirmasi dokumen bahan tambahan pangan pada akun SIHALAL belum terverifikasi oleh petugas.',
        status: 'IN_PROGRESS',
        adminReply: 'Petugas verifikator sedang memeriksa kecukupan sertifikat halal pemasok bahan tambahan pangan.',
        submittedAt: '2026-11-09T08:30:00Z',
      },
      {
        id: 2,
        ticketCode: 'TKT-412098',
        name: 'Koperasi UMK Priangan Halal',
        contact: 'koperasi.priangan@gmail.com',
        contactType: 'EMAIL',
        category: 'AUDIT',
        description: 'Permohonan penjadwalan ulang audit lapangan karena renovasi fasilitas higienis rumah produksi.',
        status: 'RESOLVED',
        adminReply: 'Jadwal audit telah disesuaikan menjadi tanggal 18 November 2026 bersama Tim Auditor 2.',
        submittedAt: '2026-11-06T14:15:00Z',
      },
      {
        id: 3,
        ticketCode: 'TKT-993210',
        name: 'PT Cahaya Rasa Nusantara',
        contact: 'quality@cahayarasa.co.id',
        contactType: 'EMAIL',
        category: 'TARIF_KMA',
        description: 'Pertanyaan rincian biaya penambahan 3 sampel uji laboratorium GC-FID untuk produk minuman fermentasi.',
        status: 'RECEIVED',
        adminReply: '',
        submittedAt: '2026-11-10T10:00:00Z',
      },
    ];
  });

  const [surveys, setSurveys] = useState<SatisfactionSurvey[]>(() => {
    try {
      const raw = localStorage.getItem('lph_surveys_list');
      if (raw) return JSON.parse(raw);
    } catch {}
    return [
      {
        id: 1,
        name: 'CV Berkah Pangan Mandiri',
        contact: '081321980xxx',
        serviceUsed: 'Pemeriksaan Halal Reguler Pabrik',
        rating: 5,
        speedRating: 5,
        friendlinessRating: 5,
        clarityRating: 5,
        facilityRating: 5,
        comment: 'Pelayanan auditor sangat profesional, komunikatif, dan transparan dalam verifikasi dokumen bahan baku.',
        submittedAt: '2026-11-08',
      },
      {
        id: 2,
        name: 'Restoran Sambal Pasundan',
        contact: 'resto.pasundan@yahoo.com',
        serviceUsed: 'Sertifikasi Halal Restoran & Dapur',
        rating: 5,
        speedRating: 4,
        friendlinessRating: 5,
        clarityRating: 5,
        facilityRating: 4,
        comment: 'Proses pemeriksaan tepat waktu sesuai SLA dan panduan perbaikan bahan pengganti sangat solutif.',
        submittedAt: '2026-11-07',
      },
      {
        id: 3,
        name: 'Laboratorium Farmasi Al-Shifa',
        contact: '085721099xxx',
        serviceUsed: 'Uji Laboratorium DNA qPCR & Spektro',
        rating: 5,
        speedRating: 5,
        friendlinessRating: 5,
        clarityRating: 5,
        facilityRating: 5,
        comment: 'Hasil uji lab qPCR keluar cepat dengan sertifikat hasil uji berstandar akreditasi KAN ISO 17025.',
        submittedAt: '2026-11-05',
      },
    ];
  });

  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBaseItem[]>(() => {
    try {
      const raw = localStorage.getItem('lph_kb_list');
      if (raw) return JSON.parse(raw);
    } catch {}
    return [
      {
        id: 1,
        question: 'Bagaimana alur pendaftaran sertifikasi halal reguler di LPH UIN SGD?',
        answer: 'Pelaku usaha login ke ptsp.halal.go.id (SIHALAL), unggah berkas NIB dan manual SJPH, lalu pilih Lembaga Pemeriksa Halal LPH-018-ID (UIN Sunan Gunung Djati Bandung).',
        tags: 'prosedur, sihalal, alur',
        isActive: true,
      },
      {
        id: 2,
        question: 'Berapa lama standar SLA pemeriksaan halal di LPH UIN SGD?',
        answer: 'Sesuai regulasi BPJPH, pemeriksaan dokumen dan audit lapangan diselesaikan dalam waktu maksimal 15 hari kerja sejak verifikasi kelayakan permohonan disetujui.',
        tags: 'waktu, sla, regulasi',
        isActive: true,
      },
      {
        id: 3,
        question: 'Apakah pengujian laboratorium DNA babi (qPCR) wajib untuk seluruh produk?',
        answer: 'Tidak semua produk wajib uji lab. Pengujian saintifik qPCR dan GC-FID hanya dipersyaratkan untuk bahan baku yang berisiko tinggi (kritis) seperti olahan daging, gelatin, kolagen, dan perisa fermentasi.',
        tags: 'laboratorium, qpcr, dna',
        isActive: true,
      },
    ];
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    try {
      const raw = localStorage.getItem('lph_audit_logs');
      if (raw) return JSON.parse(raw);
    } catch {}
    return [
      { id: 'LOG-01', user: 'Administrator', action: 'Memperbarui respon tiket', target: 'TKT-829104', time: '10 menit yang lalu', type: 'UPDATE' },
      { id: 'LOG-02', user: 'Administrator', action: 'Menerbitkan berita baru dengan TinyMCE', target: 'Akselerasi Audit Sertifikasi Halal', time: '45 menit yang lalu', type: 'CREATE' },
      { id: 'LOG-03', user: 'Admin Layanan', action: 'Mengunggah dokumentasi galeri baru', target: 'Pengujian Saintifik qPCR DNA', time: '2 jam yang lalu', type: 'CREATE' },
      { id: 'LOG-04', user: 'Administrator', action: 'Login berhasil ke Admin Console', target: 'Sesi Web IP 10.12.4.1', time: '3 jam yang lalu', type: 'LOGIN' },
    ];
  });

  const [mediaList] = useState<MediaItem[]>([
    { id: 1, name: 'pemeriksaaan-kehalalan-produk.jpg', src: '/assets/images/pemeriksaaan-kehalalan-produk.jpg', category: 'Audit', size: '185 KB' },
    { id: 2, name: 'lab-dna-testing.jpg', src: '/assets/images/lab-dna-testing.jpg', category: 'Laboratorium', size: '240 KB' },
    { id: 3, name: 'img_011.jpg', src: '/assets/images/img_011.jpg', category: 'Sembelihan RPH', size: '190 KB' },
    { id: 4, name: 'img_013.jpg', src: '/assets/images/img_013.jpg', category: 'Pelatihan JULEHA', size: '310 KB' },
    { id: 5, name: 'lab-landscape-1.jpg', src: '/assets/images/lab-landscape-1.jpg', category: 'GC-FID Lab', size: '220 KB' },
    { id: 6, name: 'director_rosihon.webp', src: '/assets/images/uin_sgd/director_rosihon.webp', category: 'Pimpinan', size: '63 KB' },
    { id: 7, name: 'director_tri.webp', src: '/assets/images/uin_sgd/director_tri.webp', category: 'Pimpinan', size: '145 KB' },
    { id: 8, name: 'beranda_004.jpg', src: '/assets/images/beranda_004.jpg', category: 'Pabrik Kemasan', size: '305 KB' },
  ]);

  const [usersList] = useState([
    { id: 1, name: 'Prof. Dr. H. Rosihon Anwar, M.Ag', role: 'SUPER_ADMIN', email: 'rektor@uinsgd.ac.id', status: 'AKTIF', lastLogin: 'Hari ini, 09:20' },
    { id: 2, name: 'Dr. Tri Cahyanto, M.Si', role: 'DIREKTUR_LPH', email: 'tri.cahyanto@uinsgd.ac.id', status: 'AKTIF', lastLogin: 'Kemarin, 14:15' },
    { id: 3, name: 'Drs. H. Ahmad Fauzi, M.Si', role: 'AUDITOR_LEAD', email: 'ahmad.fauzi@uinsgd.ac.id', status: 'AKTIF', lastLogin: '09 Nov 2026' },
    { id: 4, name: 'Administrator Portal LPH', role: 'OPERATOR_CMS', email: 'admin@lph-uinsgd.ac.id', status: 'AKTIF', lastLogin: 'Baru saja' },
  ]);

  // Form state for TinyMCE Post Editor
  const [postForm, setPostForm] = useState({
    title: '',
    slug: '',
    category: 'KEGIATAN',
    status: 'PUBLISHED',
    publishedAt: new Date().toISOString().split('T')[0],
    excerpt: '',
    content: '<p>Tuliskan naskah berita lengkap di sini menggunakan TinyMCE...</p>',
    image: '/assets/images/pemeriksaaan-kehalalan-produk.jpg',
    metaTitle: '',
    metaDescription: '',
  });

  // -------------------------------------------------------------
  // PAGINATION & FILTER STATES
  // -------------------------------------------------------------
  // News
  const [newsSearch, setNewsSearch] = useState('');
  const [newsCategory, setNewsCategory] = useState('ALL');
  const [newsStatus, setNewsStatus] = useState('ALL');
  const [newsPage, setNewsPage] = useState(1);
  const newsPerPage = 5;

  // Announcements
  const [announcementSearch, setAnnouncementSearch] = useState('');
  const [announcementStatus, setAnnouncementStatus] = useState('ALL');
  const [announcementPage, setAnnouncementPage] = useState(1);
  const announcementPerPage = 5;

  // Gallery
  const [gallerySearch, setGallerySearch] = useState('');
  const [galleryCategory, setGalleryCategory] = useState('ALL');
  const [galleryPage, setGalleryPage] = useState(1);
  const galleryPerPage = 6;

  // Complaints
  const [complaintSearch, setComplaintSearch] = useState('');
  const [complaintStatus, setComplaintStatus] = useState('ALL');
  const [complaintPage, setComplaintPage] = useState(1);
  const complaintPerPage = 5;

  // Surveys
  const [surveySearch, setSurveySearch] = useState('');
  const [surveyRating, setSurveyRating] = useState('ALL');
  const [surveyPage, setSurveyPage] = useState(1);
  const surveyPerPage = 5;

  // Audit Logs
  const [auditLogSearch, setAuditLogSearch] = useState('');
  const [auditLogType, setAuditLogType] = useState('ALL');
  const [auditLogPage, setAuditLogPage] = useState(1);
  const auditLogPerPage = 6;

  // -------------------------------------------------------------
  // EDIT & MODAL STATES
  // -------------------------------------------------------------
  const [modalType, setModalType] = useState<
    'ADD_ANNOUNCEMENT' | 'EDIT_ANNOUNCEMENT' | 'ADD_GALLERY' | 'EDIT_GALLERY' | 'EDIT_COMPLAINT' | 'ADD_KB' | null
  >(null);

  const [editingAnnouncementId, setEditingAnnouncementId] = useState<number | null>(null);
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    fileName: '',
    fileSize: '',
    fileUrl: '',
    content: '',
    isPinned: false,
  });

  const [editingGalleryId, setEditingGalleryId] = useState<number | null>(null);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Audit Lapangan',
    location: '',
    facility: '',
    auditorLead: '',
    standard: 'KMA 784 / ISO 17025',
    fullStory: '',
    src: '/assets/images/beranda_004.jpg',
  });

  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [complaintReplyText, setComplaintReplyText] = useState('');
  const [complaintStatusInput, setComplaintStatusInput] = useState<string>('IN_PROGRESS');

  const [kbForm, setKbForm] = useState({
    question: '',
    answer: '',
    tags: '',
  });

  // Mobile / Tablet Sidebar State
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  // -------------------------------------------------------------
  // HELPER: AUDIT LOG CREATION & STORAGE
  // -------------------------------------------------------------
  const addAuditLog = (action: string, target: string, type: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' = 'UPDATE') => {
    const newLog: AuditLogItem = {
      id: `LOG-${Date.now()}`,
      user: user.name || 'Administrator',
      action,
      target,
      time: 'Baru saja',
      type,
    };
    setAuditLogs((prev) => {
      const updated = [newLog, ...prev];
      try {
        localStorage.setItem('lph_audit_logs', JSON.stringify(updated.slice(0, 50)));
      } catch {}
      return updated;
    });
  };

  // Auth check
  useEffect(() => {
    const storedUser = localStorage.getItem('lph_admin_user');
    const token = localStorage.getItem('lph_admin_token');
    if (!token && !storedUser) {
      localStorage.setItem('lph_admin_token', 'mock_token_admin_2026');
      localStorage.setItem(
        'lph_admin_user',
        JSON.stringify({ name: 'Administrator LPH UIN SGD', email: 'admin@lph-uinsgd.ac.id', role: 'SUPER_ADMIN' })
      );
    } else if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('lph_admin_token');
    localStorage.removeItem('lph_admin_user');
    navigate('/admin/login');
  };

  // -------------------------------------------------------------
  // POST ACTIONS (TINYMCE)
  // -------------------------------------------------------------
  const handleOpenNewPost = () => {
    setEditingPostId(null);
    setPostForm({
      title: '',
      slug: '',
      category: 'KEGIATAN',
      status: 'PUBLISHED',
      publishedAt: new Date().toISOString().split('T')[0],
      excerpt: '',
      content: '<p>Tuliskan naskah berita lengkap di sini menggunakan TinyMCE...</p>',
      image: '/assets/images/pemeriksaaan-kehalalan-produk.jpg',
      metaTitle: '',
      metaDescription: '',
    });
    setPostViewMode('EDITOR');
  };

  const handleOpenEditPost = (post: NewsItem) => {
    setEditingPostId(post.id);
    setPostForm({
      title: post.title,
      slug: post.slug,
      category: post.category,
      status: post.status,
      publishedAt: post.publishedAt || new Date().toISOString().split('T')[0],
      excerpt: post.excerpt || '',
      content: post.content || '<p></p>',
      image: post.image || '/assets/images/beranda_004.jpg',
      metaTitle: `${post.title} | LPH UIN SGD`,
      metaDescription: post.excerpt || '',
    });
    setPostViewMode('EDITOR');
  };

  const handleSavePost = (forcedStatus?: 'PUBLISHED' | 'DRAFT') => {
    if (!postForm.title.trim()) {
      alert('Judul berita tidak boleh kosong!');
      return;
    }
    const currentStatus = forcedStatus || postForm.status;

    if (editingPostId) {
      const updated = newsList.map((p) =>
        p.id === editingPostId
          ? {
              ...p,
              title: postForm.title,
              slug: postForm.slug || postForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              category: postForm.category,
              status: currentStatus,
              publishedAt: postForm.publishedAt,
              excerpt: postForm.excerpt,
              content: postForm.content,
              image: postForm.image,
            }
          : p
      );
      setNewsList(updated);
      try {
        localStorage.setItem('lph_news_list', JSON.stringify(updated));
      } catch {}
      addAuditLog('Memperbarui artikel berita (TinyMCE)', postForm.title, 'UPDATE');
    } else {
      const newPost: NewsItem = {
        id: Date.now(),
        title: postForm.title,
        slug: postForm.slug || postForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: postForm.category,
        status: currentStatus,
        publishedAt: postForm.publishedAt,
        excerpt: postForm.excerpt,
        content: postForm.content,
        image: postForm.image,
      };
      const updated = [newPost, ...newsList];
      setNewsList(updated);
      try {
        localStorage.setItem('lph_news_list', JSON.stringify(updated));
      } catch {}
      addAuditLog('Menerbitkan berita baru (TinyMCE)', postForm.title, 'CREATE');
    }
    setPostViewMode('LIST');
  };

  const handleDeleteNews = (id: number) => {
    if (window.confirm('Yakin ingin menghapus berita ini?')) {
      const targetPost = newsList.find((n) => n.id === id);
      const updated = newsList.filter((n) => n.id !== id);
      setNewsList(updated);
      try {
        localStorage.setItem('lph_news_list', JSON.stringify(updated));
      } catch {}
      if (targetPost) {
        addAuditLog('Menghapus artikel berita', targetPost.title, 'DELETE');
      }
    }
  };

  // -------------------------------------------------------------
  // ANNOUNCEMENT ACTIONS (PDF UPLOAD + EDIT)
  // -------------------------------------------------------------
  const handlePdfFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      alert('Harap unggah berkas resmi berformat PDF (.pdf)');
      return;
    }
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    const sizeStr = file.size > 1024 * 1024 ? `${sizeMB} MB` : `${Math.round(file.size / 1024)} KB`;
    const blobUrl = URL.createObjectURL(file);
    setAnnouncementForm((prev) => ({
      ...prev,
      fileName: file.name,
      fileSize: sizeStr,
      fileUrl: blobUrl,
    }));
  };

  const handleOpenNewAnnouncement = () => {
    setEditingAnnouncementId(null);
    setAnnouncementForm({
      title: '',
      fileName: '',
      fileSize: '',
      fileUrl: '',
      content: '',
      isPinned: false,
    });
    setModalType('ADD_ANNOUNCEMENT');
  };

  const handleOpenEditAnnouncement = (ann: AnnouncementItem) => {
    setEditingAnnouncementId(ann.id);
    setAnnouncementForm({
      title: ann.title,
      fileName: ann.fileName || '',
      fileSize: ann.fileSize || '',
      fileUrl: ann.fileUrl || (ann.fileName ? `/assets/docs/${ann.fileName}` : ''),
      content: ann.content,
      isPinned: ann.isPinned,
    });
    setModalType('EDIT_ANNOUNCEMENT');
  };

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAnnouncementId) {
      const updated = announcements.map((a) =>
        a.id === editingAnnouncementId
          ? {
              ...a,
              title: announcementForm.title,
              fileName: announcementForm.fileName || 'Surat_Edaran_2026.pdf',
              fileSize: announcementForm.fileSize || '1.2 MB',
              fileUrl: announcementForm.fileUrl,
              content: announcementForm.content,
              isPinned: announcementForm.isPinned,
            }
          : a
      );
      setAnnouncements(updated);
      try {
        localStorage.setItem('lph_announcements_cache', JSON.stringify(updated));
      } catch {}
      addAuditLog('Memperbarui surat edaran & dokumen PDF', announcementForm.title, 'UPDATE');
    } else {
      const newAnn: AnnouncementItem = {
        id: Date.now(),
        title: announcementForm.title,
        slug: announcementForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        fileName: announcementForm.fileName || 'Surat_Edaran_Resmi_2026.pdf',
        fileSize: announcementForm.fileSize || '1.2 MB',
        fileUrl: announcementForm.fileUrl || '/assets/docs/sk_tarif_2026.pdf',
        isPinned: announcementForm.isPinned,
        status: 'PUBLISHED',
        publishedAt: new Date().toISOString().split('T')[0],
        content: announcementForm.content,
      };
      const updated = [newAnn, ...announcements];
      setAnnouncements(updated);
      try {
        localStorage.setItem('lph_announcements_cache', JSON.stringify(updated));
      } catch {}
      addAuditLog('Menerbitkan pengumuman resmi baru dengan PDF', announcementForm.title, 'CREATE');
    }
    setEditingAnnouncementId(null);
    setModalType(null);
  };

  const handleDeleteAnnouncement = (id: number) => {
    if (window.confirm('Hapus pengumuman ini?')) {
      const target = announcements.find((a) => a.id === id);
      const updated = announcements.filter((a) => a.id !== id);
      setAnnouncements(updated);
      try {
        localStorage.setItem('lph_announcements_cache', JSON.stringify(updated));
      } catch {}
      if (target) {
        addAuditLog('Menghapus pengumuman resmi', target.title, 'DELETE');
      }
    }
  };

  // -------------------------------------------------------------
  // GALLERY ACTIONS (EDIT & ADD)
  // -------------------------------------------------------------
  const handleOpenNewGallery = () => {
    setEditingGalleryId(null);
    setGalleryForm({
      title: '',
      category: 'Audit Lapangan',
      location: '',
      facility: '',
      auditorLead: '',
      standard: 'KMA 784 / ISO 17025',
      fullStory: '',
      src: '/assets/images/beranda_004.jpg',
    });
    setModalType('ADD_GALLERY');
  };

  const handleOpenEditGallery = (item: AdminGalleryItem) => {
    setEditingGalleryId(item.id);
    setGalleryForm({
      title: item.title,
      category: item.category,
      location: item.location,
      facility: item.facility,
      auditorLead: item.auditorLead,
      standard: item.standard,
      fullStory: item.fullStory,
      src: item.src,
    });
    setModalType('EDIT_GALLERY');
  };

  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGalleryId) {
      const updated = galleryList.map((g) =>
        g.id === editingGalleryId
          ? {
              ...g,
              title: galleryForm.title,
              category: galleryForm.category,
              location: galleryForm.location,
              facility: galleryForm.facility,
              auditorLead: galleryForm.auditorLead,
              standard: galleryForm.standard,
              fullStory: galleryForm.fullStory,
              src: galleryForm.src,
            }
          : g
      );
      setGalleryList(updated);
      try {
        localStorage.setItem('lph_gallery_list', JSON.stringify(updated));
      } catch {}
      addAuditLog('Memperbarui foto dokumentasi kegiatan galeri', galleryForm.title, 'UPDATE');
    } else {
      const newPhoto: AdminGalleryItem = {
        id: Date.now(),
        title: galleryForm.title,
        category: galleryForm.category,
        src: galleryForm.src,
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        location: galleryForm.location || 'Fasilitas Terverifikasi',
        auditorLead: galleryForm.auditorLead || 'Tim Auditor Halal LPH UIN SGD',
        facility: galleryForm.facility || 'Sentra Produksi Pangan Halal',
        standard: galleryForm.standard,
        fullStory: galleryForm.fullStory,
      };
      const updated = [newPhoto, ...galleryList];
      setGalleryList(updated);
      try {
        localStorage.setItem('lph_gallery_list', JSON.stringify(updated));
      } catch {}
      addAuditLog('Menambahkan foto galeri kegiatan baru', galleryForm.title, 'CREATE');
    }
    setEditingGalleryId(null);
    setModalType(null);
  };

  const handleDeleteGallery = (id: number) => {
    if (window.confirm('Hapus foto kegiatan ini dari galeri?')) {
      const target = galleryList.find((g) => g.id === id);
      const updated = galleryList.filter((g) => g.id !== id);
      setGalleryList(updated);
      try {
        localStorage.setItem('lph_gallery_list', JSON.stringify(updated));
      } catch {}
      if (target) {
        addAuditLog('Menghapus foto galeri', target.title, 'DELETE');
      }
    }
  };

  // -------------------------------------------------------------
  // COMPLAINT & KB ACTIONS
  // -------------------------------------------------------------
  const handleOpenComplaintModal = (comp: Complaint) => {
    setSelectedComplaint(comp);
    setComplaintReplyText(comp.adminReply || '');
    setComplaintStatusInput(comp.status);
    setModalType('EDIT_COMPLAINT');
  };

  const handleSaveComplaintReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    const updated = complaints.map((c) =>
      c.id === selectedComplaint.id
        ? { ...c, status: complaintStatusInput, adminReply: complaintReplyText }
        : c
    );
    setComplaints(updated);
    try {
      localStorage.setItem('lph_complaints_list', JSON.stringify(updated));
    } catch {}
    addAuditLog('Menjawab respon tiket pengaduan', selectedComplaint.ticketCode, 'UPDATE');
    setModalType(null);
    setSelectedComplaint(null);
  };

  const handleSaveKb = (e: React.FormEvent) => {
    e.preventDefault();
    const newKb: KnowledgeBaseItem = {
      id: Date.now(),
      question: kbForm.question,
      answer: kbForm.answer,
      tags: kbForm.tags,
      isActive: true,
    };
    const updated = [newKb, ...knowledgeBase];
    setKnowledgeBase(updated);
    try {
      localStorage.setItem('lph_kb_list', JSON.stringify(updated));
    } catch {}
    addAuditLog('Menambahkan entri FAQ chatbot baru', kbForm.question, 'CREATE');
    setKbForm({ question: '', answer: '', tags: '' });
    setModalType(null);
  };

  const handleDeleteKb = (id: number) => {
    if (window.confirm('Hapus tanya jawab ini?')) {
      const target = knowledgeBase.find((k) => k.id !== id);
      const updated = knowledgeBase.filter((k) => k.id !== id);
      setKnowledgeBase(updated);
      try {
        localStorage.setItem('lph_kb_list', JSON.stringify(updated));
      } catch {}
      if (target) {
        addAuditLog('Menghapus entri FAQ chatbot', target.question, 'DELETE');
      }
    }
  };

  const handleCopyMediaUrl = (src: string) => {
    navigator.clipboard.writeText(src);
    setCopiedUrl(src);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  // Restore database callback
  const handleRestoreData = (restored: any) => {
    if (restored.newsList) {
      setNewsList(restored.newsList);
      localStorage.setItem('lph_news_list', JSON.stringify(restored.newsList));
    }
    if (restored.announcements) {
      setAnnouncements(restored.announcements);
      localStorage.setItem('lph_announcements_cache', JSON.stringify(restored.announcements));
    }
    if (restored.galleryList) {
      setGalleryList(restored.galleryList);
      localStorage.setItem('lph_gallery_list', JSON.stringify(restored.galleryList));
    }
    if (restored.complaints) {
      setComplaints(restored.complaints);
      localStorage.setItem('lph_complaints_list', JSON.stringify(restored.complaints));
    }
    if (restored.surveys) {
      setSurveys(restored.surveys);
      localStorage.setItem('lph_surveys_list', JSON.stringify(restored.surveys));
    }
    if (restored.knowledgeBase) {
      setKnowledgeBase(restored.knowledgeBase);
      localStorage.setItem('lph_kb_list', JSON.stringify(restored.knowledgeBase));
    }
  };

  // -------------------------------------------------------------
  // FILTERED DATA & PAGINATION COMPUTATIONS
  // -------------------------------------------------------------
  // News Filter & Pagination
  const filteredNews = useMemo(() => {
    return newsList.filter((n) => {
      const matchSearch = !newsSearch || n.title.toLowerCase().includes(newsSearch.toLowerCase()) || (n.excerpt && n.excerpt.toLowerCase().includes(newsSearch.toLowerCase()));
      const matchCat = newsCategory === 'ALL' || n.category === newsCategory;
      const matchStat = newsStatus === 'ALL' || n.status === newsStatus;
      return matchSearch && matchCat && matchStat;
    });
  }, [newsList, newsSearch, newsCategory, newsStatus]);

  const newsTotalPages = Math.max(1, Math.ceil(filteredNews.length / newsPerPage));
  const paginatedNews = useMemo(() => {
    const start = (newsPage - 1) * newsPerPage;
    return filteredNews.slice(start, start + newsPerPage);
  }, [filteredNews, newsPage]);

  // Announcements Filter & Pagination
  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((a) => {
      const matchSearch = !announcementSearch || a.title.toLowerCase().includes(announcementSearch.toLowerCase()) || (a.content && a.content.toLowerCase().includes(announcementSearch.toLowerCase()));
      const matchStat = announcementStatus === 'ALL' || (announcementStatus === 'PINNED' ? a.isPinned : !a.isPinned);
      return matchSearch && matchStat;
    });
  }, [announcements, announcementSearch, announcementStatus]);

  const announcementTotalPages = Math.max(1, Math.ceil(filteredAnnouncements.length / announcementPerPage));
  const paginatedAnnouncements = useMemo(() => {
    const start = (announcementPage - 1) * announcementPerPage;
    return filteredAnnouncements.slice(start, start + announcementPerPage);
  }, [filteredAnnouncements, announcementPage]);

  // Gallery Filter & Pagination
  const filteredGallery = useMemo(() => {
    return galleryList.filter((g) => {
      const matchSearch = !gallerySearch || g.title.toLowerCase().includes(gallerySearch.toLowerCase()) || g.location.toLowerCase().includes(gallerySearch.toLowerCase()) || g.auditorLead.toLowerCase().includes(gallerySearch.toLowerCase());
      const matchCat = galleryCategory === 'ALL' || g.category === galleryCategory;
      return matchSearch && matchCat;
    });
  }, [galleryList, gallerySearch, galleryCategory]);

  const galleryTotalPages = Math.max(1, Math.ceil(filteredGallery.length / galleryPerPage));
  const paginatedGallery = useMemo(() => {
    const start = (galleryPage - 1) * galleryPerPage;
    return filteredGallery.slice(start, start + galleryPerPage);
  }, [filteredGallery, galleryPage]);

  // Complaints Filter & Pagination
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const matchSearch = !complaintSearch || c.ticketCode.toLowerCase().includes(complaintSearch.toLowerCase()) || c.name.toLowerCase().includes(complaintSearch.toLowerCase()) || c.description.toLowerCase().includes(complaintSearch.toLowerCase());
      const matchStat = complaintStatus === 'ALL' || c.status === complaintStatus;
      return matchSearch && matchStat;
    });
  }, [complaints, complaintSearch, complaintStatus]);

  const complaintTotalPages = Math.max(1, Math.ceil(filteredComplaints.length / complaintPerPage));
  const paginatedComplaints = useMemo(() => {
    const start = (complaintPage - 1) * complaintPerPage;
    return filteredComplaints.slice(start, start + complaintPerPage);
  }, [filteredComplaints, complaintPage]);

  // Surveys Filter & Pagination
  const filteredSurveys = useMemo(() => {
    return surveys.filter((s) => {
      const matchSearch = !surveySearch || (s.name && s.name.toLowerCase().includes(surveySearch.toLowerCase())) || (s.comment && s.comment.toLowerCase().includes(surveySearch.toLowerCase()));
      const matchRating = surveyRating === 'ALL' || String(s.rating) === surveyRating;
      return matchSearch && matchRating;
    });
  }, [surveys, surveySearch, surveyRating]);

  const surveyTotalPages = Math.max(1, Math.ceil(filteredSurveys.length / surveyPerPage));
  const paginatedSurveys = useMemo(() => {
    const start = (surveyPage - 1) * surveyPerPage;
    return filteredSurveys.slice(start, start + surveyPerPage);
  }, [filteredSurveys, surveyPage]);

  // Audit Logs Filter & Pagination
  const filteredAuditLogs = useMemo(() => {
    return auditLogs.filter((l) => {
      const matchSearch = !auditLogSearch || l.action.toLowerCase().includes(auditLogSearch.toLowerCase()) || l.target.toLowerCase().includes(auditLogSearch.toLowerCase()) || l.user.toLowerCase().includes(auditLogSearch.toLowerCase());
      const matchType = auditLogType === 'ALL' || l.type === auditLogType;
      return matchSearch && matchType;
    });
  }, [auditLogs, auditLogSearch, auditLogType]);

  const auditLogTotalPages = Math.max(1, Math.ceil(filteredAuditLogs.length / auditLogPerPage));
  const paginatedAuditLogs = useMemo(() => {
    const start = (auditLogPage - 1) * auditLogPerPage;
    return filteredAuditLogs.slice(start, start + auditLogPerPage);
  }, [filteredAuditLogs, auditLogPage]);

  // -------------------------------------------------------------
  // EXCEL EXPORT HANDLERS
  // -------------------------------------------------------------
  const handleExportNewsExcel = () => {
    const rows = filteredNews.map((n) => ({
      ID: n.id,
      'Judul Artikel': n.title,
      Kategori: n.category,
      Status: n.status,
      'Tanggal Terbit': n.publishedAt || '-',
      Slug: n.slug,
      Ringkasan: n.excerpt || '',
    }));
    exportToExcel(rows, 'Daftar_Berita_Artikel_LPH_UIN_SGD', 'Berita & Artikel');
    addAuditLog('Export daftar berita ke Excel (.xlsx)', 'Semua Data Berita', 'UPDATE');
  };

  const handleExportAnnouncementsExcel = () => {
    const rows = filteredAnnouncements.map((a) => ({
      ID: a.id,
      'Judul Surat Edaran': a.title,
      'Nama Berkas PDF': a.fileName || '-',
      'Ukuran Berkas': a.fileSize || '-',
      Disematkan: a.isPinned ? 'Ya' : 'Tidak',
      'Tanggal Rilis': a.publishedAt || '-',
      Uraian: a.content,
    }));
    exportToExcel(rows, 'Daftar_Pengumuman_Resmi_LPH_UIN_SGD', 'Surat Edaran');
    addAuditLog('Export pengumuman resmi ke Excel (.xlsx)', 'Semua Pengumuman', 'UPDATE');
  };

  const handleExportGalleryExcel = () => {
    const rows = filteredGallery.map((g) => ({
      ID: g.id,
      'Judul Kegiatan': g.title,
      Kategori: g.category,
      Tanggal: g.date,
      Lokasi: g.location,
      'Auditor Lead': g.auditorLead,
      Fasilitas: g.facility,
      'Standar Regulasi': g.standard,
      'Konteks Lengkap': g.fullStory,
    }));
    exportToExcel(rows, 'Dokumentasi_Galeri_Kegiatan_LPH', 'Galeri Kegiatan');
    addAuditLog('Export galeri kegiatan ke Excel (.xlsx)', 'Semua Foto Galeri', 'UPDATE');
  };

  const handleExportComplaintsExcel = () => {
    const rows = filteredComplaints.map((c) => ({
      'Kode Tiket': c.ticketCode,
      'Nama Pelapor': c.name,
      Kontak: c.contact,
      'Media Kontak': c.contactType,
      Kategori: c.category,
      'Status Tiket': c.status,
      'Uraian Pengaduan': c.description,
      'Respon Petugas LPH': c.adminReply || '-',
      'Waktu Masuk': c.submittedAt ? formatDate(c.submittedAt) : '-',
    }));
    exportToExcel(rows, 'Laporan_Pengaduan_Masyarakat_LPH', 'Pengaduan');
    addAuditLog('Export tiket pengaduan ke Excel (.xlsx)', 'Semua Tiket', 'UPDATE');
  };

  const handleExportSurveysExcel = () => {
    const rows = filteredSurveys.map((s) => ({
      ID: s.id,
      'Pelaku Usaha / Responden': s.name || 'Anonim',
      'Layanan Digunakan': s.serviceUsed,
      'Rating Keseluruhan': s.rating,
      'Kecepatan Pelayanan': s.speedRating,
      'Keramahan Petugas': s.friendlinessRating,
      'Kejelasan Informasi': s.clarityRating,
      'Fasilitas Laboratorium': s.facilityRating,
      'Kritik & Saran': s.comment || '-',
      'Tanggal Pengisian': s.submittedAt || '-',
    }));
    exportToExcel(rows, 'Hasil_Survei_Kepuasan_IKM_LPH', 'Survei IKM');
    addAuditLog('Export survei kepuasan IKM ke Excel (.xlsx)', 'Semua Data Survei', 'UPDATE');
  };

  const handleExportAuditLogsExcel = () => {
    const rows = filteredAuditLogs.map((l) => ({
      'ID Log': l.id,
      Petugas: l.user,
      Aktivitas: l.action,
      Target: l.target,
      Waktu: l.time,
      Tipe: l.type,
    }));
    exportToExcel(rows, 'Riwayat_Log_Aktivitas_LPH_UIN_SGD', 'Audit Trail');
  };

  // Helper Pagination Renderer
  const renderPaginationControls = (
    currentPage: number,
    totalPages: number,
    totalItems: number,
    itemLabel: string,
    onPageChange: (p: number) => void
  ) => {
    if (totalPages <= 1) return null;
    return (
      <div className="pt-4 border-t border-neutral-100">
        <Pagination className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30">
          <Pagination.Summary className="text-xs text-neutral-600 font-semibold">
            Halaman {currentPage} dari {totalPages} ({totalItems} total {itemLabel})
          </Pagination.Summary>
          <Pagination.Content className="flex items-center gap-1.5 flex-wrap justify-center">
            <Pagination.Item>
              <Pagination.Previous
                onPress={() => onPageChange(Math.max(1, currentPage - 1))}
                isDisabled={currentPage === 1}
                className="cursor-pointer px-3 py-1.5 text-xs font-bold rounded-xl border border-neutral-200 bg-white hover:bg-[#FAF7FD] hover:text-[#6B18A8] disabled:opacity-40"
              >
                Sebelumnya
              </Pagination.Previous>
            </Pagination.Item>
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <Pagination.Item key={pageNum}>
                  <Pagination.Link
                    isActive={currentPage === pageNum}
                    onPress={() => onPageChange(pageNum)}
                    className={`cursor-pointer w-8 h-8 flex items-center justify-center text-xs font-bold rounded-xl transition-all ${
                      currentPage === pageNum
                        ? 'bg-[#6B18A8] text-white font-black shadow-xs'
                        : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-[#FAF7FD]'
                    }`}
                  >
                    {pageNum}
                  </Pagination.Link>
                </Pagination.Item>
              );
            })}
            <Pagination.Item>
              <Pagination.Next
                onPress={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                isDisabled={currentPage === totalPages}
                className="cursor-pointer px-3 py-1.5 text-xs font-bold rounded-xl border border-neutral-200 bg-white hover:bg-[#FAF7FD] hover:text-[#6B18A8] disabled:opacity-40"
              >
                Selanjutnya
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </div>
    );
  };

  const pendingComplaintsCount = complaints.filter((c) => c.status === 'RECEIVED').length;

  return (
    <div className="min-h-screen bg-[#F8F6FB] flex flex-col lg:flex-row text-[#292333] relative">
      {/* -------------------------------------------------------------
          MOBILE & TABLET TOP HEADER BAR (< lg)
      ------------------------------------------------------------- */}
      <header className="lg:hidden sticky top-0 z-30 bg-[#180828] text-white px-3.5 py-3 flex items-center justify-between border-b border-[#4B0D78]/40 shadow-md">
        <div className="flex items-center gap-2.5 min-w-0">
          <Button
            size="sm"
            variant="ghost"
            onPress={() => setSidebarOpen(true)}
            className="text-white hover:bg-white/10 p-2 rounded-xl shrink-0 cursor-pointer"
            aria-label="Buka Menu Navigasi"
          >
            <Menu className="w-5 h-5 text-[#F5D32F]" />
          </Button>

          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#6B18A8] to-[#F5D32F] flex items-center justify-center font-black text-white text-xs shadow-md shrink-0">
              LPH
            </div>
            <div className="min-w-0">
              <div className="font-extrabold text-xs text-white truncate leading-tight">LPH UIN SGD</div>
              <div className="text-[10px] text-[#F5D32F] font-bold truncate leading-tight">
                {activeTab === 'OVERVIEW' && 'Dashboard Ringkasan'}
                {activeTab === 'NEWS' && 'Berita & Artikel'}
                {activeTab === 'ANNOUNCEMENTS' && 'Pengumuman PDF'}
                {activeTab === 'GALLERY' && 'Galeri Kegiatan'}
                {activeTab === 'MEDIA' && 'Pustaka Media'}
                {activeTab === 'COMPLAINTS' && 'Tiket Pengaduan'}
                {activeTab === 'SATISFACTION' && 'Survei IKM'}
                {activeTab === 'RATES' && 'Tarif KMA 784'}
                {activeTab === 'BACKUP' && 'Backup Database'}
                {activeTab === 'KB' && 'Chatbot AI'}
                {activeTab === 'AUDIT_LOG' && 'Audit Log'}
                {activeTab === 'USERS' && 'Petugas'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <Button
            size="sm"
            variant="secondary"
            onPress={() => window.open('/', '_blank')}
            className="text-[11px] font-bold bg-white/10 text-white hover:bg-white/20 border border-white/15 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#F5D32F]" />
            <span className="hidden sm:inline">Web Publik</span>
          </Button>
        </div>
      </header>

      {/* -------------------------------------------------------------
          MOBILE DRAWER BACKDROP (< lg)
      ------------------------------------------------------------- */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* -------------------------------------------------------------
          SIDEBAR NAVIGATION (BRAND ROYAL PURPLE & GOLD)
      ------------------------------------------------------------- */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-[#180828] text-white flex flex-col justify-between p-5 border-r border-[#4B0D78]/40 transition-transform duration-300 ease-in-out overflow-y-auto shadow-2xl',
          'lg:static lg:translate-x-0 lg:h-screen lg:sticky lg:top-0 lg:z-auto lg:shadow-none lg:shrink-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6B18A8] to-[#F5D32F] flex items-center justify-center font-black text-white text-base shadow-lg shadow-purple-900/50">
                LPH
              </div>
              <div>
                <h1 className="font-extrabold text-sm tracking-tight text-white leading-tight">
                  LPH UIN SGD
                </h1>
                <span className="text-[10px] text-[#F5D32F] font-bold tracking-wider block">
                  ADMIN CONSOLE 2.0
                </span>
              </div>
            </div>

            {/* Close button on mobile/tablet */}
            <Button
              size="sm"
              variant="ghost"
              onPress={() => setSidebarOpen(false)}
              className="lg:hidden text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded-xl cursor-pointer"
              aria-label="Tutup Menu"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            <div className="pb-1">
              <p className="px-3 pb-1 text-[10px] font-black uppercase tracking-widest text-purple-300/60">
                Menu Utama
              </p>
            </div>

            {[
              { id: 'OVERVIEW', label: 'Ringkasan Eksekutif', icon: LayoutDashboard },
              { id: 'NEWS', label: 'Kanal Berita & Rilis', icon: Newspaper, count: newsList.length },
              { id: 'ANNOUNCEMENTS', label: 'Pengumuman Resmi', icon: Bell, count: announcements.length },
              { id: 'GALLERY', label: 'Galeri Dokumentasi', icon: ImageIcon, count: galleryList.length },
              { id: 'MEDIA', label: 'Pustaka Media', icon: FolderOpen, count: mediaList.length },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as AdminTab);
                    if (item.id === 'NEWS') setPostViewMode('LIST');
                    setSidebarOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer group',
                    isActive
                      ? 'bg-[#6B18A8] text-white shadow-lg shadow-purple-950/30 border border-[#F5D32F]/30'
                      : 'text-purple-200/80 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn('w-4 h-4', isActive ? 'text-[#F5D32F]' : 'text-purple-300')} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={cn(
                        'text-[10px] font-mono px-2 py-0.5 rounded-full font-bold',
                        isActive
                          ? 'bg-[#F5D32F] text-[#4B0D78]'
                          : 'bg-white/10 text-purple-200'
                      )}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-3 pb-1">
              <p className="px-3 pb-1 text-[10px] font-black uppercase tracking-widest text-purple-300/60">
                Layanan, Tarif &amp; Data
              </p>
            </div>

            {[
              { id: 'COMPLAINTS', label: 'Tiket Pengaduan', icon: ShieldAlert, count: complaints.filter(c => c.status !== 'RESOLVED').length, badgeDanger: pendingComplaintsCount > 0 },
              { id: 'SATISFACTION', label: 'Survei Kepuasan (IKM)', icon: Smile, count: surveys.length },
              { id: 'RATES', label: 'Tarif KMA 784 (Kalkulator)', icon: Calculator },
              { id: 'KB', label: 'Chatbot Knowledge', icon: Bot, count: knowledgeBase.length },
              { id: 'BACKUP', label: 'Backup & Database cPanel', icon: Database },
              { id: 'AUDIT_LOG', label: 'Riwayat Aktivitas', icon: History, count: auditLogs.length },
              { id: 'USERS', label: 'Manajemen Petugas', icon: Users, count: usersList.length },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as AdminTab);
                    setSidebarOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer group',
                    isActive
                      ? 'bg-[#6B18A8] text-white shadow-lg shadow-purple-950/30 border border-[#F5D32F]/30'
                      : 'text-purple-200/80 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn('w-4 h-4', isActive ? 'text-[#F5D32F]' : 'text-purple-300')} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={cn(
                        'text-[10px] font-mono px-2 py-0.5 rounded-full font-bold',
                        item.badgeDanger
                          ? 'bg-rose-500 text-white animate-pulse'
                          : isActive
                          ? 'bg-[#F5D32F] text-[#4B0D78]'
                          : 'bg-white/10 text-purple-200'
                      )}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card & Actions */}
        <div className="pt-6 border-t border-white/10 mt-6 space-y-3">
          <Card className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-row items-center gap-3 text-white">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6B18A8] to-[#F5D32F] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
              AD
            </div>
            <div className="overflow-hidden min-w-0 flex-1">
              <div className="text-xs font-bold text-white truncate">{user?.name}</div>
              <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Super Administrator</span>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="secondary"
              onPress={() => window.open('/', '_blank')}
              className="text-xs font-bold bg-white/10 text-white hover:bg-white/20 border border-white/15 rounded-xl flex items-center justify-center gap-1 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Web Publik</span>
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onPress={handleLogout}
              className="text-xs font-bold bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 border border-rose-800/40 rounded-xl flex items-center justify-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* -------------------------------------------------------------
          MAIN CONTENT AREA
      ------------------------------------------------------------- */}
      <main className="flex-1 min-w-0 w-full p-3.5 sm:p-6 lg:p-8 overflow-y-auto overflow-x-hidden">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 min-w-0 w-full">
          {/* Top Bar with Breadcrumbs & Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#C9A5E8]/30">
            <div className="min-w-0">
              <Breadcrumbs className="text-neutral-500 mb-2 overflow-x-auto whitespace-nowrap">
                <Breadcrumbs.Item href="/admin">Console Admin</Breadcrumbs.Item>
                <Breadcrumbs.Item>
                  <span className="text-[#6B18A8] font-bold">
                    {activeTab === 'OVERVIEW' && 'Dashboard Ringkasan'}
                    {activeTab === 'NEWS' && (postViewMode === 'EDITOR' ? 'Editor Berita TinyMCE' : 'Berita & Artikel Publikasi')}
                    {activeTab === 'ANNOUNCEMENTS' && 'Pengumuman Resmi BPJPH & LPH'}
                    {activeTab === 'GALLERY' && 'Galeri Dokumentasi Kegiatan'}
                    {activeTab === 'MEDIA' && 'Pustaka Aset & Media'}
                    {activeTab === 'COMPLAINTS' && 'Tiket Layanan Pengaduan'}
                    {activeTab === 'SATISFACTION' && 'Indeks Kepuasan Masyarakat (IKM)'}
                    {activeTab === 'RATES' && 'Kelola Tarif & Kalkulator KMA 784'}
                    {activeTab === 'BACKUP' && 'Cadangan Database & Integrasi cPanel'}
                    {activeTab === 'KB' && 'Basis Pengetahuan Chatbot AI'}
                    {activeTab === 'AUDIT_LOG' && 'Riwayat Aktivitas Sistem'}
                    {activeTab === 'USERS' && 'Manajemen Akun Petugas'}
                  </span>
                </Breadcrumbs.Item>
              </Breadcrumbs>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#292333] tracking-tight break-words">
                {activeTab === 'OVERVIEW' && 'Dashboard Manajemen LPH UIN SGD'}
                {activeTab === 'NEWS' && (postViewMode === 'EDITOR' ? (editingPostId ? 'Edit Artikel Berita' : 'Tulis Berita Baru dengan TinyMCE') : 'Manajemen Berita & Artikel')}
                {activeTab === 'ANNOUNCEMENTS' && 'Pengumuman & Surat Edaran Resmi (PDF)'}
                {activeTab === 'GALLERY' && 'Dokumentasi Galeri Kegiatan Lapangan & Lab'}
                {activeTab === 'MEDIA' && 'Pustaka Foto & Berkas Media'}
                {activeTab === 'COMPLAINTS' && 'Pusat Penanganan Tiket Pengaduan'}
                {activeTab === 'SATISFACTION' && 'Evaluasi Survei Kepuasan Pelaku Usaha'}
                {activeTab === 'RATES' && 'Konfigurasi Tarif Resmi KMA 784'}
                {activeTab === 'BACKUP' && 'Cadangan Database Harian & cPanel File Manager'}
                {activeTab === 'KB' && 'Basis Pengetahuan Chatbot AI Otomatis'}
                {activeTab === 'AUDIT_LOG' && 'Log Audit & Jejak Aktivitas Petugas'}
                {activeTab === 'USERS' && 'Daftar Auditor & Petugas LPH'}
              </h2>
            </div>

            {/* Quick action button depending on Tab */}
            <div className="flex items-center gap-2 flex-wrap">
              {activeTab === 'NEWS' && postViewMode === 'LIST' && (
                <Button
                  variant="primary"
                  onPress={handleOpenNewPost}
                  className="w-full sm:w-auto bg-[#6B18A8] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-purple-950/20 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#F5D32F]" />
                  <span>Tulis Berita (TinyMCE)</span>
                </Button>
              )}
              {activeTab === 'ANNOUNCEMENTS' && (
                <Button
                  variant="primary"
                  onPress={handleOpenNewAnnouncement}
                  className="w-full sm:w-auto bg-[#6B18A8] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-purple-950/20 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#F5D32F]" />
                  <span>Upload Surat Edaran (PDF)</span>
                </Button>
              )}
              {activeTab === 'GALLERY' && (
                <Button
                  variant="primary"
                  onPress={handleOpenNewGallery}
                  className="w-full sm:w-auto bg-[#6B18A8] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-purple-950/20 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#F5D32F]" />
                  <span>Upload Foto Galeri</span>
                </Button>
              )}
              {activeTab === 'KB' && (
                <Button
                  variant="primary"
                  onPress={() => setModalType('ADD_KB')}
                  className="w-full sm:w-auto bg-[#6B18A8] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-purple-950/20 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#F5D32F]" />
                  <span>Tambah FAQ AI</span>
                </Button>
              )}
            </div>
          </div>

          {/* -------------------------------------------------------------
              TAB 1: OVERVIEW & EXECUTIVE METRICS
          ------------------------------------------------------------- */}
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  {
                    title: 'Total Artikel Berita',
                    value: newsList.length,
                    desc: 'Dipublikasikan di portal',
                    icon: Newspaper,
                    linkTab: 'NEWS',
                  },
                  {
                    title: 'Surat Edaran & SK',
                    value: announcements.length,
                    desc: 'Lampiran PDF resmi',
                    icon: Bell,
                    linkTab: 'ANNOUNCEMENTS',
                  },
                  {
                    title: 'Aduan Ditangani',
                    value: complaints.filter((c) => c.status === 'RESOLVED').length,
                    desc: `${complaints.filter((c) => c.status !== 'RESOLVED').length} tiket proses`,
                    icon: ShieldAlert,
                    linkTab: 'COMPLAINTS',
                  },
                  {
                    title: 'Indeks Kepuasan IKM',
                    value: '4.92 / 5.0',
                    desc: `${surveys.length} ulasan pelaku usaha`,
                    icon: Smile,
                    linkTab: 'SATISFACTION',
                  },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <Card
                      key={idx}
                      className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs hover:shadow-md transition-all p-6 space-y-3 cursor-pointer group"
                      onClick={() => setActiveTab(stat.linkTab as AdminTab)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                          {stat.title}
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-[#FAF7FD] text-[#6B18A8] group-hover:bg-[#6B18A8] group-hover:text-white transition-colors flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-2xl font-black text-[#292333] tracking-tight">
                        {stat.value}
                      </div>
                      <p className="text-xs text-neutral-500">{stat.desc}</p>
                    </Card>
                  );
                })}
              </div>

              {/* Quick Shortcuts & Database Status */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#292333] flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#6B18A8]" />
                      <span>Ringkasan Pengaduan Publik &amp; Tindak Lanjut</span>
                    </h3>
                    <Button
                      variant="outline"
                      onPress={() => setActiveTab('COMPLAINTS')}
                      className="text-xs font-bold border-[#C9A5E8] text-[#6B18A8] rounded-xl px-3 py-1"
                    >
                      Buka Semua Tiket
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {complaints.slice(0, 3).map((comp) => (
                      <div
                        key={comp.id}
                        className="p-3.5 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 flex items-center justify-between gap-4"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs font-bold text-[#6B18A8]">
                              {comp.ticketCode}
                            </span>
                            <Chip size="sm" className="bg-[#FFF7D1] text-[#713f12] text-[10px] font-bold">
                              {comp.category}
                            </Chip>
                          </div>
                          <p className="text-xs text-neutral-700 truncate">{comp.description}</p>
                        </div>
                        <Chip
                          size="sm"
                          className={cn(
                            'text-[10px] font-bold shrink-0',
                            comp.status === 'RESOLVED'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          )}
                        >
                          {comp.status}
                        </Chip>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-4">
                  <h3 className="text-base font-bold text-[#292333] flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#6B18A8]" />
                    <span>Status Cadangan Database</span>
                  </h3>
                  <div className="p-4 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Auto-Backup:</span>
                      <span className="font-bold text-emerald-600">Aktif (02:00 WIB)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Penyimpanan:</span>
                      <span className="font-mono font-bold text-neutral-700">cPanel File Manager</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Retensi:</span>
                      <span className="font-bold text-neutral-700">30 Hari Terakhir</span>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    onPress={() => setActiveTab('BACKUP')}
                    className="w-full bg-[#6B18A8] text-white text-xs font-bold py-2 rounded-xl"
                  >
                    Buka Manager Backup &amp; cPanel
                  </Button>
                </Card>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              TAB 2: NEWS & ARTICLES WITH TINYMCE
          ------------------------------------------------------------- */}
          {activeTab === 'NEWS' && (
            <div>
              {postViewMode === 'LIST' ? (
                /* 2A. LIST VIEW OF POSTS */
                <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-[#292333]">
                        Daftar Berita, Agenda, &amp; Rilis Media
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Total {newsList.length} artikel terdaftar dalam sistem.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <Button
                        variant="outline"
                        onPress={handleExportNewsExcel}
                        className="border-emerald-300 text-emerald-800 bg-emerald-50/50 hover:bg-emerald-100 text-xs font-bold rounded-xl px-3.5 py-2 flex items-center gap-1.5"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Export ke Excel (.xlsx)</span>
                      </Button>
                      <Button
                        variant="primary"
                        onPress={handleOpenNewPost}
                        className="bg-[#6B18A8] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shrink-0"
                      >
                        <Plus className="w-4 h-4 text-[#F5D32F]" />
                        <span>Tulis Baru</span>
                      </Button>
                    </div>
                  </div>

                  {/* Filter Controls Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <Input
                        placeholder="Cari judul berita atau ringkasan..."
                        value={newsSearch}
                        onChange={(e) => {
                          setNewsSearch(e.target.value);
                          setNewsPage(1);
                        }}
                        className="pl-9 text-xs rounded-xl w-full"
                      />
                    </div>
                    <div>
                      <select
                        value={newsCategory}
                        onChange={(e) => {
                          setNewsCategory(e.target.value);
                          setNewsPage(1);
                        }}
                        className="w-full p-2 rounded-xl border border-neutral-300 text-xs bg-white font-bold"
                      >
                        <option value="ALL">Semua Kategori</option>
                        <option value="KEGIATAN">KEGIATAN (Audit &amp; Sertifikasi)</option>
                        <option value="ACARA">ACARA (Seminar &amp; Workshop)</option>
                        <option value="AGENDA">AGENDA (Jadwal &amp; Pengumuman)</option>
                        <option value="EDUKASI">EDUKASI (Tips &amp; Regulasi)</option>
                      </select>
                    </div>
                    <div>
                      <select
                        value={newsStatus}
                        onChange={(e) => {
                          setNewsStatus(e.target.value);
                          setNewsPage(1);
                        }}
                        className="w-full p-2 rounded-xl border border-neutral-300 text-xs bg-white font-bold"
                      >
                        <option value="ALL">Semua Status</option>
                        <option value="PUBLISHED">PUBLISHED (Tayang)</option>
                        <option value="DRAFT">DRAFT (Konsep)</option>
                      </select>
                    </div>
                  </div>

                  {/* Table with Pagination */}
                  <Table variant="secondary" className="w-full">
                    <Table.ScrollContainer className="w-full overflow-x-auto">
                      <Table.Content aria-label="Daftar Berita LPH">
                        <Table.Header>
                          <Table.Column isRowHeader>Judul Berita</Table.Column>
                          <Table.Column>Kategori</Table.Column>
                          <Table.Column>Status</Table.Column>
                          <Table.Column>Tanggal</Table.Column>
                          <Table.Column>Aksi</Table.Column>
                        </Table.Header>
                        <Table.Body>
                          {paginatedNews.map((news) => (
                            <Table.Row key={news.id} className="border-b border-neutral-100 hover:bg-[#FAF7FD]/50">
                              <Table.Cell className="py-3.5 max-w-md">
                                <div className="flex items-center gap-3">
                                  {news.image && (
                                    <img
                                      src={news.image}
                                      alt=""
                                      className="w-12 h-10 object-cover rounded-lg border border-neutral-200 shrink-0"
                                    />
                                  )}
                                  <div className="min-w-0">
                                    <span className="font-bold text-neutral-800 text-xs block truncate">
                                      {news.title}
                                    </span>
                                    <span className="text-[11px] text-neutral-400 block truncate mt-0.5">
                                      {news.excerpt}
                                    </span>
                                  </div>
                                </div>
                              </Table.Cell>
                              <Table.Cell>
                                <Chip size="sm" className="bg-[#FAF7FD] text-[#6B18A8] border border-[#C9A5E8]/60 font-bold text-[10px]">
                                  {news.category}
                                </Chip>
                              </Table.Cell>
                              <Table.Cell>
                                <Chip
                                  size="sm"
                                  className={cn(
                                    'font-bold text-[10px]',
                                    news.status === 'PUBLISHED'
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                                  )}
                                >
                                  {news.status}
                                </Chip>
                              </Table.Cell>
                              <Table.Cell className="text-xs text-neutral-500 whitespace-nowrap">
                                {news.publishedAt}
                              </Table.Cell>
                              <Table.Cell>
                                <div className="flex items-center gap-1">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onPress={() => handleOpenEditPost(news)}
                                    className="text-[#6B18A8] hover:bg-[#F5EDFB] p-1.5 rounded-lg flex items-center gap-1 text-xs font-bold"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                    <span>Edit</span>
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onPress={() => window.open(`/berita/${news.slug}`, '_blank')}
                                    className="text-neutral-500 hover:text-[#6B18A8] p-1.5 rounded-lg"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onPress={() => handleDeleteNews(news.id)}
                                    className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-1.5 rounded-lg"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </Button>
                                </div>
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table.Content>
                    </Table.ScrollContainer>
                  </Table>

                  {/* HeroUI Pagination */}
                  {renderPaginationControls(
                    newsPage,
                    newsTotalPages,
                    filteredNews.length,
                    'artikel berita',
                    setNewsPage
                  )}
                </Card>
              ) : (
                /* 2B. TINYMCE RICH TEXT FULL-PAGE EDITOR */
                <div className="space-y-6">
                  {/* Top Bar for Editor */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-[#C9A5E8]/30 shadow-xs">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="secondary"
                        onPress={() => setPostViewMode('LIST')}
                        className="text-xs font-bold rounded-xl border border-neutral-200 px-3 py-1.5 flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali ke Daftar</span>
                      </Button>
                      <div>
                        <h3 className="text-sm font-bold text-neutral-800">
                          {editingPostId ? 'Edit Artikel Berita' : 'Tulis Artikel Berita Baru'}
                        </h3>
                        <span className="text-[11px] text-neutral-400">
                          Editor Visual TinyMCE dengan standar typography LPH UIN SGD.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        onPress={() => handleSavePost('DRAFT')}
                        className="text-xs font-bold rounded-xl border border-neutral-300 px-4 py-2"
                      >
                        Simpan sebagai Draft
                      </Button>
                      <Button
                        variant="primary"
                        onPress={() => handleSavePost('PUBLISHED')}
                        className="bg-[#6B18A8] text-white text-xs font-bold px-5 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-purple-950/25"
                      >
                        <Save className="w-4 h-4 text-[#F5D32F]" />
                        <span>Publikasikan Sekarang</span>
                      </Button>
                    </div>
                  </div>

                  {/* 2-Column Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column: Title, Excerpt, TinyMCE Editor (8 Cols) */}
                    <div className="lg:col-span-8 space-y-5">
                      <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                            Judul Artikel Berita
                          </label>
                          <Input
                            value={postForm.title}
                            onChange={(e) => {
                              const t = e.target.value;
                              setPostForm({
                                ...postForm,
                                title: t,
                                slug: t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                              });
                            }}
                            placeholder="Contoh: Akselerasi Audit Sertifikasi Halal di Jawa Barat..."
                            className="w-full text-sm font-bold rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                            Permalink / URL Slug
                          </label>
                          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF7FD] border border-[#C9A5E8]/30">
                            <span className="text-[11px] font-mono text-neutral-400 pl-2">
                              /berita/
                            </span>
                            <input
                              type="text"
                              value={postForm.slug}
                              onChange={(e) => setPostForm({ ...postForm, slug: e.target.value })}
                              className="text-xs font-mono font-bold text-[#6B18A8] bg-transparent outline-none flex-1"
                              placeholder="slug-otomatis-dari-judul"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                            Ringkasan Singkat (Excerpt)
                          </label>
                          <TextArea
                            value={postForm.excerpt}
                            onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                            rows={3}
                            placeholder="Ringkasan 2-3 kalimat untuk kartu preview di beranda dan hasil pencarian Google..."
                            className="w-full text-xs rounded-xl"
                          />
                        </div>
                      </Card>

                      {/* TinyMCE Rich Text Editor Card */}
                      <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                          <div>
                            <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                              Isi Konten Artikel (Visual Editor)
                            </h4>
                            <p className="text-[11px] text-neutral-400">
                              Format artikel lengkap dengan heading, bullet point, tabel, kutipan, dan gambar.
                            </p>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                            Offline Bundled TinyMCE
                          </span>
                        </div>

                        <React.Suspense
                          fallback={
                            <div className="h-[520px] w-full rounded-2xl bg-[#FAF7FD]/50 border border-dashed border-[#C9A5E8] flex flex-col items-center justify-center p-6 text-neutral-500">
                              <div className="w-8 h-8 border-3 border-[#6B18A8]/20 border-t-[#6B18A8] rounded-full animate-spin mb-3" />
                              <span className="text-xs font-bold text-[#6B18A8]">Memuat Editor Visual TinyMCE...</span>
                              <span className="text-[11px] text-neutral-500 mt-1">Menginisialisasi plugin dan toolbar offline</span>
                            </div>
                          }
                        >
                          <RichTextEditor
                            value={postForm.content}
                            onChange={(val) => setPostForm({ ...postForm, content: val })}
                            height={520}
                          />
                        </React.Suspense>
                      </Card>
                    </div>

                    {/* Right Column: Publishing Sidebar Settings (4 Cols) */}
                    <div className="lg:col-span-4 space-y-5">
                      {/* Publish Status Card */}
                      <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-4">
                        <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider border-b border-neutral-100 pb-2">
                          Status &amp; Publikasi
                        </h4>

                        <div>
                          <label className="block text-xs font-bold text-neutral-700 mb-1">
                            Status Artikel
                          </label>
                          <select
                            value={postForm.status}
                            onChange={(e) => setPostForm({ ...postForm, status: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-neutral-300 text-xs bg-white font-bold"
                          >
                            <option value="PUBLISHED">PUBLISHED (Tayang Publik)</option>
                            <option value="DRAFT">DRAFT (Disimpan Lokal)</option>
                            <option value="ARCHIVED">ARCHIVED (Diarsipkan)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-neutral-700 mb-1">
                            Kategori Berita
                          </label>
                          <select
                            value={postForm.category}
                            onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-neutral-300 text-xs bg-white font-bold"
                          >
                            <option value="KEGIATAN">KEGIATAN (Audit &amp; Sertifikasi)</option>
                            <option value="ACARA">ACARA (Seminar &amp; Workshop)</option>
                            <option value="AGENDA">AGENDA (Jadwal &amp; Pengumuman)</option>
                            <option value="EDUKASI">EDUKASI (Tips &amp; Regulasi Halal)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-neutral-700 mb-1">
                            Tanggal Publikasi
                          </label>
                          <Input
                            type="date"
                            value={postForm.publishedAt}
                            onChange={(e) => setPostForm({ ...postForm, publishedAt: e.target.value })}
                            className="text-xs w-full rounded-xl"
                          />
                        </div>
                      </Card>

                      {/* Featured Image Card */}
                      <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-4">
                        <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider border-b border-neutral-100 pb-2">
                          Gambar Sampul (Featured Image)
                        </h4>

                        <div>
                          <label className="block text-xs font-bold text-neutral-700 mb-1">
                            Pilih Gambar Aset
                          </label>
                          <select
                            value={postForm.image}
                            onChange={(e) => setPostForm({ ...postForm, image: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-neutral-300 text-xs bg-white"
                          >
                            <option value="/assets/images/pemeriksaaan-kehalalan-produk.jpg">Audit Pabrik Industri</option>
                            <option value="/assets/images/beranda_004.jpg">Kemasan Pangan Berkecepatan Tinggi</option>
                            <option value="/assets/images/lab-dna-testing.jpg">Uji qPCR DNA Babi</option>
                            <option value="/assets/images/img_011.jpg">RPH Sembelihan Unggas</option>
                            <option value="/assets/images/img_013.jpg">Pelatihan Jagal JULEHA</option>
                            <option value="/assets/images/uin_sgd/uin_14.webp">Kunjungan BPJPH</option>
                          </select>
                        </div>

                        {postForm.image && (
                          <div className="rounded-2xl overflow-hidden border border-[#C9A5E8]/40 shadow-xs bg-neutral-900">
                            <img
                              src={postForm.image}
                              alt="Pratinjau Sampul"
                              className="w-full h-36 object-cover"
                            />
                          </div>
                        )}
                      </Card>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* -------------------------------------------------------------
              TAB 3: ANNOUNCEMENTS MANAGEMENT (WITH PDF UPLOAD & EDIT)
          ------------------------------------------------------------- */}
          {activeTab === 'ANNOUNCEMENTS' && (
            <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-[#292333] flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#6B18A8]" />
                    <span>Surat Edaran, SK Penetapan Tarif &amp; Dokumen Resmi (PDF)</span>
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Setiap dokumen surat edaran wajib memiliki tautan unduh berkas PDF yang valid untuk masyarakat.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    onPress={handleExportAnnouncementsExcel}
                    className="border-emerald-300 text-emerald-800 bg-emerald-50/50 hover:bg-emerald-100 text-xs font-bold rounded-xl px-3.5 py-2 flex items-center gap-1.5"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Export ke Excel (.xlsx)</span>
                  </Button>
                  <Button
                    variant="primary"
                    onPress={handleOpenNewAnnouncement}
                    className="bg-[#6B18A8] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4 text-[#F5D32F]" />
                    <span>Upload Surat Edaran (PDF)</span>
                  </Button>
                </div>
              </div>

              {/* Filter Controls Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <Input
                    placeholder="Cari judul surat edaran atau nomor berkas..."
                    value={announcementSearch}
                    onChange={(e) => {
                      setAnnouncementSearch(e.target.value);
                      setAnnouncementPage(1);
                    }}
                    className="pl-9 text-xs rounded-xl w-full"
                  />
                </div>
                <div>
                  <select
                    value={announcementStatus}
                    onChange={(e) => {
                      setAnnouncementStatus(e.target.value);
                      setAnnouncementPage(1);
                    }}
                    className="w-full p-2 rounded-xl border border-neutral-300 text-xs bg-white font-bold"
                  >
                    <option value="ALL">Semua Surat Edaran</option>
                    <option value="PINNED">Hanya yang Disematkan (Pinned)</option>
                    <option value="REGULAR">Surat Edaran Reguler</option>
                  </select>
                </div>
              </div>

              {/* Announcements Table */}
              <Table variant="secondary" className="w-full">
                <Table.ScrollContainer className="w-full overflow-x-auto">
                  <Table.Content aria-label="Daftar Pengumuman Resmi">
                    <Table.Header>
                      <Table.Column isRowHeader>Nama Dokumen / Surat Edaran</Table.Column>
                      <Table.Column>Lampiran File PDF</Table.Column>
                      <Table.Column>Status</Table.Column>
                      <Table.Column>Tanggal</Table.Column>
                      <Table.Column className="text-right">Aksi</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      {paginatedAnnouncements.map((ann) => (
                        <Table.Row key={ann.id} className="border-b border-neutral-100 hover:bg-[#FAF7FD]/50">
                          <Table.Cell className="py-3.5 max-w-md">
                            <span className="font-bold text-neutral-800 text-xs block">
                              {ann.title}
                            </span>
                            <span className="text-[11px] text-neutral-500 block mt-0.5 line-clamp-1">
                              {ann.content}
                            </span>
                          </Table.Cell>
                          <Table.Cell>
                            {ann.fileName ? (
                              <div className="flex items-center gap-2">
                                <a
                                  href={ann.fileUrl || `/assets/docs/${ann.fileName}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  download={ann.fileName}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-[#6B18A8] hover:bg-[#6B18A8] hover:text-white transition-all text-xs font-mono font-bold border border-[#C9A5E8]/40"
                                  title="Klik untuk membuka atau mengunduh berkas PDF"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  <span>{ann.fileName}</span>
                                  <Download className="w-3 h-3 ml-0.5" />
                                </a>
                                <span className="text-[10px] text-neutral-400 font-mono">
                                  {ann.fileSize || '1.2 MB'}
                                </span>
                              </div>
                            ) : (
                              <span className="text-xs text-rose-500 italic">Tidak ada lampiran PDF</span>
                            )}
                          </Table.Cell>
                          <Table.Cell>
                            <Chip
                              size="sm"
                              className={cn(
                                'font-bold text-[10px]',
                                ann.isPinned
                                  ? 'bg-[#FFF7D1] text-[#713f12] border border-[#F5D32F]'
                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              )}
                            >
                              {ann.isPinned ? 'DISEMATKAN' : 'AKTIF'}
                            </Chip>
                          </Table.Cell>
                          <Table.Cell className="text-xs text-neutral-500 whitespace-nowrap">
                            {ann.publishedAt}
                          </Table.Cell>
                          <Table.Cell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onPress={() => handleOpenEditAnnouncement(ann)}
                                className="text-[#6B18A8] hover:bg-[#F5EDFB] p-1.5 rounded-lg flex items-center gap-1 text-xs font-bold"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onPress={() => handleDeleteAnnouncement(ann.id)}
                                className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-1.5 rounded-lg"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Content>
                </Table.ScrollContainer>
              </Table>

              {/* HeroUI Pagination */}
              {renderPaginationControls(
                announcementPage,
                announcementTotalPages,
                filteredAnnouncements.length,
                'surat edaran',
                setAnnouncementPage
              )}
            </Card>
          )}

          {/* -------------------------------------------------------------
              TAB 4: ACTIVITY GALLERY MANAGEMENT (WITH EDIT & FILTER)
          ------------------------------------------------------------- */}
          {activeTab === 'GALLERY' && (
            <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-[#292333] flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#6B18A8]" />
                    <span>Rekam Jejak Foto Dokumentasi Kegiatan LPH</span>
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Foto-foto audit lapangan, laboratorium ISO 17025, dan pelatihan JULEHA yang tampil di halaman /galeri.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    onPress={handleExportGalleryExcel}
                    className="border-emerald-300 text-emerald-800 bg-emerald-50/50 hover:bg-emerald-100 text-xs font-bold rounded-xl px-3.5 py-2 flex items-center gap-1.5"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Export ke Excel (.xlsx)</span>
                  </Button>
                  <Button
                    variant="primary"
                    onPress={handleOpenNewGallery}
                    className="bg-[#6B18A8] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4 text-[#F5D32F]" />
                    <span>Upload Foto Galeri</span>
                  </Button>
                </div>
              </div>

              {/* Filter Controls Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <Input
                    placeholder="Cari kegiatan, nama auditor, atau fasilitas..."
                    value={gallerySearch}
                    onChange={(e) => {
                      setGallerySearch(e.target.value);
                      setGalleryPage(1);
                    }}
                    className="pl-9 text-xs rounded-xl w-full"
                  />
                </div>
                <div>
                  <select
                    value={galleryCategory}
                    onChange={(e) => {
                      setGalleryCategory(e.target.value);
                      setGalleryPage(1);
                    }}
                    className="w-full p-2 rounded-xl border border-neutral-300 text-xs bg-white font-bold"
                  >
                    <option value="ALL">Semua Kategori Galeri</option>
                    <option value="Audit Lapangan">Audit Lapangan</option>
                    <option value="Laboratorium ISO 17025">Laboratorium ISO 17025</option>
                    <option value="Pelatihan & JULEHA">Pelatihan &amp; JULEHA</option>
                    <option value="Kunjungan & MoA">Kunjungan &amp; MoA</option>
                  </select>
                </div>
              </div>

              {/* Gallery Table */}
              <Table variant="secondary" className="w-full">
                <Table.ScrollContainer className="w-full overflow-x-auto">
                  <Table.Content aria-label="Daftar Foto Galeri">
                    <Table.Header>
                      <Table.Column isRowHeader>Foto &amp; Judul Kegiatan</Table.Column>
                      <Table.Column>Kategori</Table.Column>
                      <Table.Column>Auditor Penanggung Jawab</Table.Column>
                      <Table.Column>Fasilitas / Lokasi</Table.Column>
                      <Table.Column>Tanggal</Table.Column>
                      <Table.Column className="text-right">Aksi</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      {paginatedGallery.map((item) => (
                        <Table.Row key={item.id} className="border-b border-neutral-100 hover:bg-[#FAF7FD]/50">
                          <Table.Cell className="py-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.src}
                                alt={item.title}
                                className="w-14 h-11 object-cover rounded-xl border border-neutral-200 shrink-0"
                              />
                              <div className="min-w-0 max-w-xs">
                                <span className="font-bold text-xs text-neutral-800 block truncate">
                                  {item.title}
                                </span>
                                <span className="text-[10px] text-neutral-400 block truncate font-mono">
                                  {item.standard}
                                </span>
                              </div>
                            </div>
                          </Table.Cell>
                          <Table.Cell>
                            <Chip size="sm" className="bg-[#FAF7FD] text-[#6B18A8] border border-[#C9A5E8]/60 font-bold text-[10px] whitespace-nowrap">
                              {item.category}
                            </Chip>
                          </Table.Cell>
                          <Table.Cell className="text-xs text-neutral-700 font-medium">
                            {item.auditorLead}
                          </Table.Cell>
                          <Table.Cell className="text-xs text-neutral-500 max-w-[160px] truncate">
                            {item.facility}
                          </Table.Cell>
                          <Table.Cell className="text-xs text-neutral-500 whitespace-nowrap">
                            {item.date}
                          </Table.Cell>
                          <Table.Cell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onPress={() => handleOpenEditGallery(item)}
                                className="text-[#6B18A8] hover:bg-[#F5EDFB] p-1.5 rounded-lg flex items-center gap-1 text-xs font-bold"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onPress={() => window.open(item.src, '_blank')}
                                className="text-neutral-500 hover:text-[#6B18A8] p-1.5 rounded-lg"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onPress={() => handleDeleteGallery(item.id)}
                                className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-1.5 rounded-lg"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Content>
                </Table.ScrollContainer>
              </Table>

              {/* HeroUI Pagination */}
              {renderPaginationControls(
                galleryPage,
                galleryTotalPages,
                filteredGallery.length,
                'foto galeri',
                setGalleryPage
              )}
            </Card>
          )}

          {/* -------------------------------------------------------------
              TAB 5: MEDIA ASSET LIBRARY
          ------------------------------------------------------------- */}
          {activeTab === 'MEDIA' && (
            <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#292333] flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-[#6B18A8]" />
                    <span>Pustaka Berkas &amp; Media Gambar</span>
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Klik tombol salin URL untuk menyisipkan gambar langsung ke dalam editor naskah berita TinyMCE.
                  </p>
                </div>
              </div>

              {copiedUrl && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>URL Berhasil Disalin: {copiedUrl}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mediaList.map((m) => (
                  <div
                    key={m.id}
                    className="group rounded-2xl overflow-hidden border border-[#C9A5E8]/30 bg-neutral-50 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="h-32 overflow-hidden bg-neutral-900 relative">
                      <img
                        src={m.src}
                        alt={m.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Chip
                        size="sm"
                        className="absolute bottom-2 left-2 bg-black/60 text-white font-bold text-[9px] backdrop-blur-xs"
                      >
                        {m.category}
                      </Chip>
                    </div>
                    <div className="p-3 space-y-2">
                      <div className="text-[11px] font-bold text-neutral-800 truncate" title={m.name}>
                        {m.name}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-neutral-400">
                        <span>{m.size}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onPress={() => handleCopyMediaUrl(m.src)}
                          className="px-2 py-0.5 text-[10px] rounded-lg border-[#C9A5E8] text-[#6B18A8] hover:bg-[#FAF7FD] font-bold flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Salin URL</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* -------------------------------------------------------------
              TAB 6: COMPLAINTS & WHISTLEBLOWING (WITH PAGINATION & EXCEL)
          ------------------------------------------------------------- */}
          {activeTab === 'COMPLAINTS' && (
            <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-[#292333] flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-[#6B18A8]" />
                    <span>Pusat Tiket Pengaduan &amp; Whistleblowing Layanan</span>
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Kawal integritas layanan publik, bebas gratifikasi dan pungli di lingkungan LPH UIN SGD.
                  </p>
                </div>

                <Button
                  variant="outline"
                  onPress={handleExportComplaintsExcel}
                  className="border-emerald-300 text-emerald-800 bg-emerald-50/50 hover:bg-emerald-100 text-xs font-bold rounded-xl px-3.5 py-2 flex items-center gap-1.5"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Export ke Excel (.xlsx)</span>
                </Button>
              </div>

              {/* Filter Controls Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <Input
                    placeholder="Cari kode tiket, nama pelapor, atau isi keluhan..."
                    value={complaintSearch}
                    onChange={(e) => {
                      setComplaintSearch(e.target.value);
                      setComplaintPage(1);
                    }}
                    className="pl-9 text-xs rounded-xl w-full"
                  />
                </div>
                <div>
                  <select
                    value={complaintStatus}
                    onChange={(e) => {
                      setComplaintStatus(e.target.value);
                      setComplaintPage(1);
                    }}
                    className="w-full p-2 rounded-xl border border-neutral-300 text-xs bg-white font-bold"
                  >
                    <option value="ALL">Semua Status Tiket</option>
                    <option value="RECEIVED">RECEIVED (Menunggu Verifikator)</option>
                    <option value="IN_PROGRESS">IN_PROGRESS (Sedang Ditangani)</option>
                    <option value="RESOLVED">RESOLVED (Selesai)</option>
                  </select>
                </div>
              </div>

              <Table variant="secondary" className="w-full">
                <Table.ScrollContainer className="w-full overflow-x-auto">
                  <Table.Content aria-label="Daftar Tiket Pengaduan">
                    <Table.Header>
                      <Table.Column isRowHeader>Kode Tiket</Table.Column>
                      <Table.Column>Pelapor &amp; Kontak</Table.Column>
                      <Table.Column>Kategori</Table.Column>
                      <Table.Column>Uraian Pengaduan</Table.Column>
                      <Table.Column>Status</Table.Column>
                      <Table.Column className="text-right">Tindak Lanjut</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      {paginatedComplaints.map((comp) => (
                        <Table.Row key={comp.id} className="border-b border-neutral-100 hover:bg-[#FAF7FD]/50">
                          <Table.Cell className="font-mono font-black text-xs text-[#6B18A8] whitespace-nowrap">
                            {comp.ticketCode}
                          </Table.Cell>
                          <Table.Cell>
                            <span className="text-xs font-bold text-neutral-800 block">
                              {comp.name}
                            </span>
                            <span className="text-[10px] text-neutral-400 block font-mono">
                              {comp.contact} ({comp.contactType})
                            </span>
                          </Table.Cell>
                          <Table.Cell>
                            <Chip size="sm" className="bg-[#FAF7FD] text-[#6B18A8] border border-[#C9A5E8]/60 font-bold text-[10px]">
                              {comp.category}
                            </Chip>
                          </Table.Cell>
                          <Table.Cell className="text-xs text-neutral-600 max-w-sm">
                            <p className="line-clamp-2">{comp.description}</p>
                            {comp.adminReply && (
                              <div className="mt-1 text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-100 font-medium">
                                <strong>Respon Petugas:</strong> {comp.adminReply}
                              </div>
                            )}
                          </Table.Cell>
                          <Table.Cell>
                            <Chip
                              size="sm"
                              className={cn(
                                'font-bold text-[10px]',
                                comp.status === 'RESOLVED'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : comp.status === 'IN_PROGRESS'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                              )}
                            >
                              {comp.status}
                            </Chip>
                          </Table.Cell>
                          <Table.Cell className="text-right">
                            <Button
                              size="sm"
                              variant="primary"
                              onPress={() => handleOpenComplaintModal(comp)}
                              className="bg-[#6B18A8] text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap"
                            >
                              Tindak Lanjuti
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Content>
                </Table.ScrollContainer>
              </Table>

              {/* HeroUI Pagination */}
              {renderPaginationControls(
                complaintPage,
                complaintTotalPages,
                filteredComplaints.length,
                'tiket aduan',
                setComplaintPage
              )}
            </Card>
          )}

          {/* -------------------------------------------------------------
              TAB 7: CUSTOMER SATISFACTION (IKM) (WITH PAGINATION & EXCEL)
          ------------------------------------------------------------- */}
          {activeTab === 'SATISFACTION' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 p-6 text-center shadow-xs">
                  <div className="text-3xl font-black text-[#6B18A8]">4.92 / 5.0</div>
                  <span className="text-xs text-neutral-500 font-bold block mt-1">
                    Indeks Kepuasan Rata-Rata (Predikat A)
                  </span>
                </Card>
                <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 p-6 text-center shadow-xs">
                  <div className="text-3xl font-black text-emerald-600">98.4%</div>
                  <span className="text-xs text-neutral-500 font-bold block mt-1">
                    Tingkat Rekomendasi Pelayanan
                  </span>
                </Card>
                <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 p-6 text-center shadow-xs">
                  <div className="text-3xl font-black text-amber-600">540+</div>
                  <span className="text-xs text-neutral-500 font-bold block mt-1">
                    Total Responden Pelaku Usaha
                  </span>
                </Card>
              </div>

              <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-[#292333] flex items-center gap-2">
                      <Smile className="w-4 h-4 text-[#6B18A8]" />
                      <span>Masukan &amp; Evaluasi Pelaku Usaha Terbaru</span>
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Survei kepuasan real-time dari formulir IKM publik.
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    onPress={handleExportSurveysExcel}
                    className="border-emerald-300 text-emerald-800 bg-emerald-50/50 hover:bg-emerald-100 text-xs font-bold rounded-xl px-3.5 py-2 flex items-center gap-1.5"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Export ke Excel (.xlsx)</span>
                  </Button>
                </div>

                {/* Filter Controls Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <Input
                      placeholder="Cari pelaku usaha atau kritik saran..."
                      value={surveySearch}
                      onChange={(e) => {
                        setSurveySearch(e.target.value);
                        setSurveyPage(1);
                      }}
                      className="pl-9 text-xs rounded-xl w-full"
                    />
                  </div>
                  <div>
                    <select
                      value={surveyRating}
                      onChange={(e) => {
                        setSurveyRating(e.target.value);
                        setSurveyPage(1);
                      }}
                      className="w-full p-2 rounded-xl border border-neutral-300 text-xs bg-white font-bold"
                    >
                      <option value="ALL">Semua Rating Bintang</option>
                      <option value="5">Bintang 5 Saja</option>
                      <option value="4">Bintang 4 Saja</option>
                      <option value="3">Bintang 3 Saja</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {paginatedSurveys.map((s) => (
                    <div
                      key={s.id}
                      className="p-5 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-xs text-neutral-900 block">
                            {s.name}
                          </span>
                          <span className="text-[11px] text-neutral-400">
                            Layanan: {s.serviceUsed} • {s.submittedAt}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 bg-[#FFF7D1] px-2.5 py-1 rounded-full border border-[#F5D32F] text-[11px] font-black text-[#713f12]">
                          <span>★</span>
                          <span>{s.rating}.0 / 5.0</span>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-700 italic font-medium">
                        "{s.comment}"
                      </p>
                    </div>
                  ))}
                </div>

                {/* HeroUI Pagination */}
                {renderPaginationControls(
                  surveyPage,
                  surveyTotalPages,
                  filteredSurveys.length,
                  'ulasan responden',
                  setSurveyPage
                )}
              </Card>
            </div>
          )}

          {/* -------------------------------------------------------------
              TAB 8: HALAL FEE RATES (EDITABLE KMA 784 & SYNC TO CALCULATOR)
          ------------------------------------------------------------- */}
          {activeTab === 'RATES' && (
            <RatesEditorTab
              onLogAudit={(action, target) => {
                addAuditLog(action, target, 'UPDATE');
              }}
            />
          )}

          {/* -------------------------------------------------------------
              TAB 9: KNOWLEDGE BASE & AI CHATBOT
          ------------------------------------------------------------- */}
          {activeTab === 'KB' && (
            <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-[#292333] flex items-center gap-2">
                    <Bot className="w-4 h-4 text-[#6B18A8]" />
                    <span>Basis Pengetahuan Tanya Jawab Chatbot AI</span>
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Data jawaban resmi yang digunakan widget chatbot di pojok kanan bawah website untuk melayani masyarakat 24/7.
                  </p>
                </div>

                <Button
                  variant="primary"
                  onPress={() => setModalType('ADD_KB')}
                  className="bg-[#6B18A8] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4 text-[#F5D32F]" />
                  <span>Tambah Tanya Jawab AI</span>
                </Button>
              </div>

              <div className="space-y-4">
                {knowledgeBase.map((kb) => (
                  <div
                    key={kb.id}
                    className="p-5 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 space-y-2 relative group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="text-xs font-bold text-neutral-900 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-lg bg-[#6B18A8] text-white text-[10px] flex items-center justify-center font-black">
                          Q
                        </span>
                        <span>{kb.question}</span>
                      </h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        onPress={() => handleDeleteKb(kb.id)}
                        className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    <p className="text-xs text-neutral-600 pl-7 leading-relaxed">
                      {kb.answer}
                    </p>
                    {kb.tags && (
                      <div className="pl-7 pt-1 flex items-center gap-1.5 flex-wrap">
                        {kb.tags.split(',').map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white border border-[#C9A5E8]/30 text-purple-900"
                          >
                            #{tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* -------------------------------------------------------------
              TAB 10: BACKUP & DATABASE (CPANEL FILE MANAGER INTEGRATION)
          ------------------------------------------------------------- */}
          {activeTab === 'BACKUP' && (
            <BackupManagerTab
              currentData={{
                newsList,
                announcements,
                galleryList,
                complaints,
                surveys,
                knowledgeBase,
                ratesMatrix: getRatesMatrix(),
                auditLogs,
                usersList,
              }}
              onRestoreData={handleRestoreData}
              onLogAudit={(action, target) => {
                addAuditLog(action, target, 'UPDATE');
              }}
            />
          )}

          {/* -------------------------------------------------------------
              TAB 11: AUDIT LOG (ACTIVITY HISTORY) WITH EXCEL EXPORT
          ------------------------------------------------------------- */}
          {activeTab === 'AUDIT_LOG' && (
            <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-[#292333] flex items-center gap-2">
                    <History className="w-4 h-4 text-[#6B18A8]" />
                    <span>Jejak Audit &amp; Rekam Aktivitas Administrator</span>
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Rekam jejak setiap perubahan konten, pembaruan tiket, dan aksi sistem demi transparansi.
                  </p>
                </div>

                <Button
                  variant="outline"
                  onPress={handleExportAuditLogsExcel}
                  className="border-emerald-300 text-emerald-800 bg-emerald-50/50 hover:bg-emerald-100 text-xs font-bold rounded-xl px-3.5 py-2 flex items-center gap-1.5"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Export ke Excel (.xlsx)</span>
                </Button>
              </div>

              {/* Filter Controls Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <Input
                    placeholder="Cari aktivitas, nama petugas, atau target aksi..."
                    value={auditLogSearch}
                    onChange={(e) => {
                      setAuditLogSearch(e.target.value);
                      setAuditLogPage(1);
                    }}
                    className="pl-9 text-xs rounded-xl w-full"
                  />
                </div>
                <div>
                  <select
                    value={auditLogType}
                    onChange={(e) => {
                      setAuditLogType(e.target.value);
                      setAuditLogPage(1);
                    }}
                    className="w-full p-2 rounded-xl border border-neutral-300 text-xs bg-white font-bold"
                  >
                    <option value="ALL">Semua Tipe Aksi</option>
                    <option value="CREATE">CREATE (Tambah Data)</option>
                    <option value="UPDATE">UPDATE (Perbarui Data)</option>
                    <option value="DELETE">DELETE (Hapus Data)</option>
                    <option value="LOGIN">LOGIN (Sesi Masuk)</option>
                  </select>
                </div>
              </div>

              <Table variant="secondary" className="w-full">
                <Table.ScrollContainer className="w-full overflow-x-auto">
                  <Table.Content aria-label="Jejak Audit Aktivitas">
                    <Table.Header>
                      <Table.Column isRowHeader>ID Log</Table.Column>
                      <Table.Column>Petugas</Table.Column>
                      <Table.Column>Tindakan</Table.Column>
                      <Table.Column>Objek / Target</Table.Column>
                      <Table.Column>Waktu</Table.Column>
                      <Table.Column>Tipe</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      {paginatedAuditLogs.map((log) => (
                        <Table.Row key={log.id} className="border-b border-neutral-100 hover:bg-[#FAF7FD]/50">
                          <Table.Cell className="font-mono text-xs text-neutral-500 font-bold">
                            {log.id}
                          </Table.Cell>
                          <Table.Cell className="font-bold text-xs text-neutral-800">
                            {log.user}
                          </Table.Cell>
                          <Table.Cell className="text-xs text-neutral-700">
                            {log.action}
                          </Table.Cell>
                          <Table.Cell className="text-xs text-[#6B18A8] font-bold">
                            {log.target}
                          </Table.Cell>
                          <Table.Cell className="text-xs text-neutral-500 whitespace-nowrap">
                            {log.time}
                          </Table.Cell>
                          <Table.Cell>
                            <Chip
                              size="sm"
                              className={cn(
                                'font-bold text-[9px]',
                                log.type === 'CREATE' && 'bg-emerald-50 text-emerald-700 border border-emerald-200',
                                log.type === 'UPDATE' && 'bg-blue-50 text-blue-700 border border-blue-200',
                                log.type === 'DELETE' && 'bg-rose-50 text-rose-700 border border-rose-200',
                                log.type === 'LOGIN' && 'bg-purple-50 text-purple-700 border border-purple-200'
                              )}
                            >
                              {log.type}
                            </Chip>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Content>
                </Table.ScrollContainer>
              </Table>

              {/* HeroUI Pagination */}
              {renderPaginationControls(
                auditLogPage,
                auditLogTotalPages,
                filteredAuditLogs.length,
                'log aktivitas',
                setAuditLogPage
              )}
            </Card>
          )}

          {/* -------------------------------------------------------------
              TAB 12: PETUGAS & AUDITOR MANAGEMENT
          ------------------------------------------------------------- */}
          {activeTab === 'USERS' && (
            <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#292333] flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#6B18A8]" />
                  <span>Manajemen Akun Petugas &amp; Auditor Halal</span>
                </h3>
                <p className="text-xs text-neutral-500">
                  Daftar akun berwenang untuk melakukan verifikasi berkas, audit lapangan, dan manajemen CMS.
                </p>
              </div>

              <Table variant="secondary" className="w-full">
                <Table.ScrollContainer className="w-full overflow-x-auto">
                  <Table.Content aria-label="Daftar Petugas LPH">
                    <Table.Header>
                      <Table.Column isRowHeader>Nama Lengkap</Table.Column>
                      <Table.Column>Alamat Email</Table.Column>
                      <Table.Column>Peran Sistem</Table.Column>
                      <Table.Column>Status</Table.Column>
                      <Table.Column>Aktivitas Terakhir</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      {usersList.map((u) => (
                        <Table.Row key={u.id} className="border-b border-neutral-100 hover:bg-[#FAF7FD]/50">
                          <Table.Cell className="font-bold text-xs text-neutral-800">{u.name}</Table.Cell>
                          <Table.Cell className="text-xs font-mono text-neutral-600">{u.email}</Table.Cell>
                          <Table.Cell>
                            <Chip size="sm" className="bg-[#FAF7FD] text-[#6B18A8] border border-[#C9A5E8]/60 font-bold text-[10px]">
                              {u.role}
                            </Chip>
                          </Table.Cell>
                          <Table.Cell>
                            <Chip size="sm" className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px]">
                              {u.status}
                            </Chip>
                          </Table.Cell>
                          <Table.Cell className="text-xs text-neutral-500 font-mono">{u.lastLogin}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Content>
                </Table.ScrollContainer>
              </Table>
            </Card>
          )}
        </div>
      </main>

      {/* -------------------------------------------------------------
          MODALS: HEROUI V3 MODAL DIALOGS
      ------------------------------------------------------------- */}

      {/* MODAL: TAMBAH / EDIT PENGUMUMAN DENGAN UPLOAD PDF */}
      <Modal.Backdrop
        isOpen={modalType === 'ADD_ANNOUNCEMENT' || modalType === 'EDIT_ANNOUNCEMENT'}
        onOpenChange={(open) => !open && setModalType(null)}
      >
        <Modal.Container placement="center">
          <Modal.Dialog className="w-[95vw] sm:max-w-xl max-h-[90vh] flex flex-col p-0 overflow-hidden rounded-3xl bg-white border border-[#C9A5E8]/40 shadow-2xl">
            <Modal.CloseTrigger />
            <form onSubmit={handleSaveAnnouncement} className="flex flex-col max-h-[90vh]">
              <Modal.Header className="p-4 sm:p-6 bg-gradient-to-r from-[#FAF7FD] to-white border-b border-[#C9A5E8]/30 shrink-0">
                <Modal.Heading className="text-base sm:text-lg font-black text-[#292333] flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#6B18A8]" />
                  <span>
                    {editingAnnouncementId
                      ? 'Edit Surat Edaran & Dokumen PDF'
                      : 'Upload & Terbitkan Surat Edaran Resmi (PDF)'}
                  </span>
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body className="p-4 sm:p-6 space-y-4 overflow-y-auto">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Judul Pengumuman / Nomor Surat Edaran
                  </label>
                  <Input
                    value={announcementForm.title}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                    required
                    placeholder="Contoh: Surat Edaran Penyesuaian Jadwal Fatwa Halal..."
                    className="w-full text-xs"
                  />
                </div>

                {/* PDF File Upload Zone */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Unggah Berkas Lampiran PDF (Wajib Ada Link / File)
                  </label>
                  <div className="border-2 border-dashed border-[#C9A5E8]/60 hover:border-[#6B18A8] transition-colors rounded-2xl p-4 bg-[#FAF7FD]/50 text-center">
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handlePdfFileUpload}
                      id="pdf-file-input"
                      className="hidden"
                    />
                    <label htmlFor="pdf-file-input" className="cursor-pointer block">
                      <Upload className="w-6 h-6 text-[#6B18A8] mx-auto mb-1 opacity-80" />
                      <span className="text-xs font-bold text-[#6B18A8] hover:underline">
                        Pilih Berkas PDF dari Komputer
                      </span>
                      <span className="block text-[11px] text-neutral-500 mt-0.5">
                        Maksimal ukuran file: 15 MB (.pdf)
                      </span>
                    </label>
                  </div>

                  {/* PDF Info Badge */}
                  {announcementForm.fileName && (
                    <div className="mt-2.5 p-3 rounded-xl bg-purple-50/70 border border-purple-200 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FileText className="w-4 h-4 text-[#6B18A8] shrink-0" />
                        <span className="font-bold text-neutral-800 truncate font-mono">
                          {announcementForm.fileName}
                        </span>
                        {announcementForm.fileSize && (
                          <span className="text-neutral-500 text-[11px] font-mono shrink-0">
                            ({announcementForm.fileSize})
                          </span>
                        )}
                      </div>

                      {announcementForm.fileUrl && (
                        <a
                          href={announcementForm.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          download={announcementForm.fileName}
                          className="text-[#6B18A8] hover:text-[#58138c] font-bold text-[11px] flex items-center gap-1 shrink-0"
                        >
                          <Download className="w-3 h-3" />
                          <span>Uji Unduh</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Deskripsi Ringkas Dokumen
                  </label>
                  <TextArea
                    value={announcementForm.content}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                    rows={3}
                    placeholder="Keterangan singkat mengenai substansi surat edaran..."
                    className="w-full text-xs"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="pinned-checkbox"
                    checked={announcementForm.isPinned}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, isPinned: e.target.checked })}
                    className="w-4 h-4 text-[#6B18A8] rounded-md border-neutral-300 focus:ring-[#6B18A8]"
                  />
                  <label htmlFor="pinned-checkbox" className="text-xs font-bold text-neutral-700 cursor-pointer">
                    Sematkan di Bagian Teratas (Pinned Notice)
                  </label>
                </div>
              </Modal.Body>
              <Modal.Footer className="p-4 sm:p-6 bg-[#FAF7FD] border-t border-[#C9A5E8]/30 flex justify-end gap-2 shrink-0">
                <Button variant="secondary" slot="close" className="text-xs font-bold rounded-xl px-4 py-2 cursor-pointer">
                  Batal
                </Button>
                <Button type="submit" variant="primary" className="bg-[#6B18A8] text-white text-xs font-bold rounded-xl px-5 py-2 cursor-pointer">
                  {editingAnnouncementId ? 'Simpan Perubahan' : 'Terbitkan Pengumuman (PDF)'}
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>

      {/* MODAL: TAMBAH / EDIT FOTO GALERI */}
      <Modal.Backdrop
        isOpen={modalType === 'ADD_GALLERY' || modalType === 'EDIT_GALLERY'}
        onOpenChange={(open) => !open && setModalType(null)}
      >
        <Modal.Container placement="center">
          <Modal.Dialog className="w-[95vw] sm:max-w-xl max-h-[90vh] flex flex-col p-0 overflow-hidden rounded-3xl bg-white border border-[#C9A5E8]/40 shadow-2xl">
            <Modal.CloseTrigger />
            <form onSubmit={handleSaveGallery} className="flex flex-col max-h-[90vh]">
              <Modal.Header className="p-4 sm:p-6 bg-gradient-to-r from-[#FAF7FD] to-white border-b border-[#C9A5E8]/30 shrink-0">
                <Modal.Heading className="text-base sm:text-lg font-black text-[#292333] flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[#6B18A8]" />
                  <span>
                    {editingGalleryId
                      ? 'Edit Dokumentasi Foto Galeri Kegiatan'
                      : 'Upload & Publikasi Foto Galeri Kegiatan'}
                  </span>
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body className="p-4 sm:p-6 space-y-4 overflow-y-auto">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Judul Dokumentasi Kegiatan
                  </label>
                  <Input
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                    required
                    placeholder="Contoh: Audit Lapangan Fasilitas Industri..."
                    className="w-full text-xs"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      Kategori Galeri
                    </label>
                    <select
                      value={galleryForm.category}
                      onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-neutral-300 text-xs bg-white font-bold"
                    >
                      <option value="Audit Lapangan">Audit Lapangan</option>
                      <option value="Laboratorium ISO 17025">Laboratorium ISO 17025</option>
                      <option value="Pelatihan & JULEHA">Pelatihan &amp; JULEHA</option>
                      <option value="Kunjungan & MoA">Kunjungan &amp; MoA</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      Pilihan Gambar
                    </label>
                    <select
                      value={galleryForm.src}
                      onChange={(e) => setGalleryForm({ ...galleryForm, src: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-neutral-300 text-xs bg-white"
                    >
                      <option value="/assets/images/pemeriksaaan-kehalalan-produk.jpg">Audit Fasilitas Industri Pangan</option>
                      <option value="/assets/images/lab-dna-testing.jpg">Uji qPCR DNA Porcine Lab</option>
                      <option value="/assets/images/img_011.jpg">Pemeriksaan Sembelihan Unggas / RPH</option>
                      <option value="/assets/images/img_013.jpg">Pelatihan Jagal JULEHA</option>
                      <option value="/assets/images/lab-landscape-1.jpg">Uji GC-FID Etanol</option>
                      <option value="/assets/images/uin_sgd/uin_14.webp">Kunjungan Monev BPJPH</option>
                      <option value="/assets/images/beranda_004.jpg">Inspeksi Cleanroom Farmasi</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      Auditor / Penanggung Jawab
                    </label>
                    <Input
                      value={galleryForm.auditorLead}
                      onChange={(e) => setGalleryForm({ ...galleryForm, auditorLead: e.target.value })}
                      placeholder="Nama Auditor..."
                      className="w-full text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      Lokasi / Fasilitas
                    </label>
                    <Input
                      value={galleryForm.location}
                      onChange={(e) => setGalleryForm({ ...galleryForm, location: e.target.value })}
                      placeholder="Contoh: Kawasan Industri MM2100..."
                      className="w-full text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Standar Regulasi / Akreditasi
                  </label>
                  <Input
                    value={galleryForm.standard}
                    onChange={(e) => setGalleryForm({ ...galleryForm, standard: e.target.value })}
                    placeholder="Contoh: KMA 784 / ISO 17025"
                    className="w-full text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Uraian Konteks Kegiatan Lengkap
                  </label>
                  <TextArea
                    value={galleryForm.fullStory}
                    onChange={(e) => setGalleryForm({ ...galleryForm, fullStory: e.target.value })}
                    rows={3}
                    placeholder="Uraian detail pelaksanaan audit atau uji laboratorium..."
                    className="w-full text-xs"
                  />
                </div>
              </Modal.Body>
              <Modal.Footer className="p-4 sm:p-6 bg-[#FAF7FD] border-t border-[#C9A5E8]/30 flex justify-end gap-2 shrink-0">
                <Button variant="secondary" slot="close" className="text-xs font-bold rounded-xl px-4 py-2 cursor-pointer">
                  Batal
                </Button>
                <Button type="submit" variant="primary" className="bg-[#6B18A8] text-white text-xs font-bold rounded-xl px-5 py-2 cursor-pointer">
                  {editingGalleryId ? 'Simpan Perubahan' : 'Simpan ke Galeri'}
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>

      {/* MODAL: RESPON TIKET PENGADUAN */}
      <Modal.Backdrop isOpen={modalType === 'EDIT_COMPLAINT'} onOpenChange={(open) => !open && setModalType(null)}>
        <Modal.Container placement="center">
          <Modal.Dialog className="w-[95vw] sm:max-w-xl max-h-[90vh] flex flex-col p-0 overflow-hidden rounded-3xl bg-white border border-[#C9A5E8]/40 shadow-2xl">
            <Modal.CloseTrigger />
            {selectedComplaint && (
              <form onSubmit={handleSaveComplaintReply} className="flex flex-col max-h-[90vh]">
                <Modal.Header className="p-4 sm:p-6 bg-gradient-to-r from-[#FAF7FD] to-white border-b border-[#C9A5E8]/30 shrink-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-black text-sm text-[#6B18A8]">
                      {selectedComplaint.ticketCode}
                    </span>
                    <Chip size="sm" className="bg-[#FFF7D1] text-[#713f12] font-bold text-[10px]">
                      {selectedComplaint.category}
                    </Chip>
                  </div>
                  <Modal.Heading className="text-base sm:text-lg font-black text-[#292333]">
                    Tindak Lanjut &amp; Respon Pengaduan
                  </Modal.Heading>
                </Modal.Header>
                <Modal.Body className="p-4 sm:p-6 space-y-4 overflow-y-auto">
                  <div className="p-4 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 space-y-1">
                    <div className="text-xs font-bold text-neutral-800">
                      Pelapor: {selectedComplaint.name} ({selectedComplaint.contact})
                    </div>
                    <p className="text-xs text-neutral-600 mt-1">
                      {selectedComplaint.description}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      Perbarui Status Tiket
                    </label>
                    <select
                      value={complaintStatusInput}
                      onChange={(e) => setComplaintStatusInput(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-neutral-300 text-xs bg-white font-bold"
                    >
                      <option value="RECEIVED">RECEIVED (Diterima)</option>
                      <option value="IN_PROGRESS">IN_PROGRESS (Sedang Ditangani Verifikator)</option>
                      <option value="RESOLVED">RESOLVED (Telah Selesai &amp; Ditindaklanjuti)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      Catatan / Jawaban Resmi Petugas LPH
                    </label>
                    <TextArea
                      value={complaintReplyText}
                      onChange={(e) => setComplaintReplyText(e.target.value)}
                      rows={4}
                      required
                      placeholder="Tuliskan respon resmi yang dapat dilihat pelapor saat melacak kode tiket..."
                      className="w-full text-xs"
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer className="p-4 sm:p-6 bg-[#FAF7FD] border-t border-[#C9A5E8]/30 flex justify-end gap-2 shrink-0">
                  <Button variant="secondary" slot="close" className="text-xs font-bold rounded-xl px-4 py-2 cursor-pointer">
                    Batal
                  </Button>
                  <Button type="submit" variant="primary" className="bg-[#6B18A8] text-white text-xs font-bold rounded-xl px-5 py-2 cursor-pointer">
                    Simpan &amp; Perbarui Tiket
                  </Button>
                </Modal.Footer>
              </form>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>

      {/* MODAL: TAMBAH PENGETAHUAN CHATBOT (KB) */}
      <Modal.Backdrop isOpen={modalType === 'ADD_KB'} onOpenChange={(open) => !open && setModalType(null)}>
        <Modal.Container placement="center">
          <Modal.Dialog className="w-[95vw] sm:max-w-xl max-h-[90vh] flex flex-col p-0 overflow-hidden rounded-3xl bg-white border border-[#C9A5E8]/40 shadow-2xl">
            <Modal.CloseTrigger />
            <form onSubmit={handleSaveKb} className="flex flex-col max-h-[90vh]">
              <Modal.Header className="p-4 sm:p-6 bg-gradient-to-r from-[#FAF7FD] to-white border-b border-[#C9A5E8]/30 shrink-0">
                <Modal.Heading className="text-base sm:text-lg font-black text-[#292333]">
                  Tambah Pengetahuan AI Chatbot
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body className="p-4 sm:p-6 space-y-4 overflow-y-auto">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Pertanyaan yang Sering Diajukan
                  </label>
                  <Input
                    value={kbForm.question}
                    onChange={(e) => setKbForm({ ...kbForm, question: e.target.value })}
                    required
                    placeholder="Contoh: Apakah ada sertifikasi halal gratis (Sehati)?"
                    className="w-full text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Jawaban Resmi dari LPH
                  </label>
                  <TextArea
                    value={kbForm.answer}
                    onChange={(e) => setKbForm({ ...kbForm, answer: e.target.value })}
                    rows={4}
                    required
                    placeholder="Penjelasan resmi yang akan dijawab oleh chatbot..."
                    className="w-full text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Kata Kunci / Tagar (Pisahkan dengan koma)
                  </label>
                  <Input
                    value={kbForm.tags}
                    onChange={(e) => setKbForm({ ...kbForm, tags: e.target.value })}
                    placeholder="sehati, gratis, ukm, bpjph"
                    className="w-full text-xs"
                  />
                </div>
              </Modal.Body>
              <Modal.Footer className="p-4 sm:p-6 bg-[#FAF7FD] border-t border-[#C9A5E8]/30 flex justify-end gap-2 shrink-0">
                <Button variant="secondary" slot="close" className="text-xs font-bold rounded-xl px-4 py-2 cursor-pointer">
                  Batal
                </Button>
                <Button type="submit" variant="primary" className="bg-[#6B18A8] text-white text-xs font-bold rounded-xl px-5 py-2 cursor-pointer">
                  Simpan Pengetahuan
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </div>
  );
};

export default AdminDashboard;

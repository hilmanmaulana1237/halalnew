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
} from 'lucide-react';
import { api, formatDate, formatRupiah } from '@/services/api';
import { cn } from '@/lib/utils';
import type { NewsItem, AnnouncementItem, Complaint, SatisfactionSurvey, KnowledgeBaseItem } from '@/types';

type AdminTab =
  | 'OVERVIEW'
  | 'NEWS'
  | 'ANNOUNCEMENTS'
  | 'GALLERY'
  | 'COMPLAINTS'
  | 'SATISFACTION'
  | 'RATES'
  | 'KB';

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

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>({ name: 'Admin LPH UIN SGD', role: 'ADMIN' });
  const [activeTab, setActiveTab] = useState<AdminTab>('OVERVIEW');
  const [searchQuery, setSearchQuery] = useState('');

  // -------------------------------------------------------------
  // INITIAL MOCK DATA REFLECTING THE ENTIRE WEBSITE CONTENT
  // -------------------------------------------------------------
  const [newsList, setNewsList] = useState<NewsItem[]>([
    {
      id: 1,
      title: 'Akselerasi Audit Sertifikasi Halal: LPH UIN SGD Perluas Jangkauan Industri Jawa Barat',
      slug: 'akselerasi-audit-sertifikasi-halal-lph-uin-sgd',
      category: 'KEGIATAN',
      status: 'PUBLISHED',
      publishedAt: '2026-11-04',
      excerpt: 'LPH UIN Sunan Gunung Djati Bandung memperkuat kapasitas auditor halal dan laboratorium terpadu.',
      content: 'LPH UIN Sunan Gunung Djati Bandung memperkuat kapasitas auditor halal dan laboratorium terpadu dalam rangka mendukung target Wajib Halal Nasional.',
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
      content: 'Penandatanganan kemitraan strategis dengan konsorsium riset halal global di bidang biosains halal dan deteksi DNA molekuler.',
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
      content: 'Sosialisasi menyeluruh bagi pelaku usaha mikro, kecil, dan menengah mengenai tata cara pendaftaran akun SIHALAL BPJPH.',
      image: '/assets/images/pemeriksaaan-kehalalan-produk.jpg',
    },
    {
      id: 4,
      title: 'Pelatihan Juru Sembelih Halal (JULEHA) Profesional Berbasis SKKNI',
      slug: 'pelatihan-juru-sembelih-halal-juleha-skkni',
      category: 'KEGIATAN',
      status: 'DRAFT',
      publishedAt: '2026-11-01',
      excerpt: 'Bimbingan teknis dan uji kompetensi bagi jagal masjid dan RPH.',
      content: 'Pelatihan fiqih sembelihan dan standard animal welfare bagi para juru sembelih.',
      image: '/assets/images/img_013.jpg',
    },
  ]);

  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([
    {
      id: 1,
      title: 'Surat Keputusan Penetapan Tarif Pelayanan Pemeriksaan Halal LPH UIN SGD Tahun 2026',
      slug: 'sk-tarif-pelayanan-halal-2026',
      fileName: 'SK_Tarif_Halal_UIN_SGD_2026.pdf',
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
      fileSize: '2.1 MB',
      isPinned: false,
      status: 'PUBLISHED',
      publishedAt: '2026-10-20',
      content: 'Instruksi wajib lampiran hasil uji laboratorium terakreditasi KAN untuk matriks bahan kritis hewani.',
    },
  ]);

  const [galleryList, setGalleryList] = useState<AdminGalleryItem[]>([
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
  ]);

  const [complaints, setComplaints] = useState<Complaint[]>([
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
  ]);

  const [surveys, setSurveys] = useState<SatisfactionSurvey[]>([
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
  ]);

  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBaseItem[]>([
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
  ]);

  // -------------------------------------------------------------
  // MODAL STATES
  // -------------------------------------------------------------
  const [modalType, setModalType] = useState<
    'ADD_NEWS' | 'ADD_ANNOUNCEMENT' | 'ADD_GALLERY' | 'EDIT_COMPLAINT' | 'ADD_KB' | null
  >(null);

  // Form states
  const [newsForm, setNewsForm] = useState({
    title: '',
    category: 'KEGIATAN',
    status: 'PUBLISHED',
    excerpt: '',
    content: '',
  });

  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    fileName: '',
    content: '',
    isPinned: false,
  });

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

  // -------------------------------------------------------------
  // AUTH CHECK
  // -------------------------------------------------------------
  useEffect(() => {
    const storedUser = localStorage.getItem('lph_admin_user');
    const token = localStorage.getItem('lph_admin_token');
    if (!token && !storedUser) {
      localStorage.setItem('lph_admin_token', 'mock_token_admin_2026');
      localStorage.setItem(
        'lph_admin_user',
        JSON.stringify({ name: 'Admin LPH UIN SGD', email: 'admin@lph-uinsgd.ac.id', role: 'SUPER_ADMIN' })
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
  // HANDLERS FOR CRUD
  // -------------------------------------------------------------
  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: NewsItem = {
      id: Date.now(),
      title: newsForm.title,
      slug: newsForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: newsForm.category,
      status: newsForm.status,
      excerpt: newsForm.excerpt,
      content: newsForm.content,
      publishedAt: new Date().toISOString().split('T')[0],
      image: '/assets/images/pemeriksaaan-kehalalan-produk.jpg',
    };
    setNewsList([newItem, ...newsList]);
    setNewsForm({ title: '', category: 'KEGIATAN', status: 'PUBLISHED', excerpt: '', content: '' });
    setModalType(null);
  };

  const handleDeleteNews = (id: number) => {
    if (window.confirm('Yakin ingin menghapus berita ini?')) {
      setNewsList(newsList.filter((n) => n.id !== id));
    }
  };

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnn: AnnouncementItem = {
      id: Date.now(),
      title: announcementForm.title,
      slug: announcementForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      fileName: announcementForm.fileName || 'Surat_Edaran_Resmi_2026.pdf',
      fileSize: '1.2 MB',
      isPinned: announcementForm.isPinned,
      status: 'PUBLISHED',
      publishedAt: new Date().toISOString().split('T')[0],
      content: announcementForm.content,
    };
    setAnnouncements([newAnn, ...announcements]);
    setAnnouncementForm({ title: '', fileName: '', content: '', isPinned: false });
    setModalType(null);
  };

  const handleDeleteAnnouncement = (id: number) => {
    if (window.confirm('Hapus pengumuman ini?')) {
      setAnnouncements(announcements.filter((a) => a.id !== id));
    }
  };

  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
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
    setGalleryList([newPhoto, ...galleryList]);
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
    setModalType(null);
  };

  const handleDeleteGallery = (id: number) => {
    if (window.confirm('Hapus foto kegiatan ini dari galeri?')) {
      setGalleryList(galleryList.filter((g) => g.id !== id));
    }
  };

  const handleOpenComplaintModal = (comp: Complaint) => {
    setSelectedComplaint(comp);
    setComplaintReplyText(comp.adminReply || '');
    setComplaintStatusInput(comp.status);
    setModalType('EDIT_COMPLAINT');
  };

  const handleSaveComplaintReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    setComplaints(
      complaints.map((c) =>
        c.id === selectedComplaint.id
          ? { ...c, status: complaintStatusInput, adminReply: complaintReplyText }
          : c
      )
    );
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
    setKnowledgeBase([newKb, ...knowledgeBase]);
    setKbForm({ question: '', answer: '', tags: '' });
    setModalType(null);
  };

  const handleDeleteKb = (id: number) => {
    if (window.confirm('Hapus tanya jawab ini?')) {
      setKnowledgeBase(knowledgeBase.filter((k) => k.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6FB] flex flex-col md:flex-row text-[#292333]">
      {/* -------------------------------------------------------------
          SIDEBAR NAVIGATION (HeroUI & Brand Palette)
      ------------------------------------------------------------- */}
      <aside className="w-full md:w-72 bg-[#180828] text-white flex flex-col p-5 shrink-0 justify-between border-r border-[#C9A5E8]/20 shadow-2xl relative z-20">
        <div>
          {/* Brand Header */}
          <div className="pb-5 border-b border-white/10 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#6B18A8] text-white flex items-center justify-center shadow-lg shadow-purple-950/40 border border-[#F5D32F]/30 font-black">
                <ShieldCheck className="w-6 h-6 text-[#F5D32F]" />
              </div>
              <div>
                <h1 className="text-sm font-black text-white tracking-wide">
                  LPH UIN SGD
                </h1>
                <p className="text-[10px] text-[#F5D32F] font-bold tracking-wider uppercase">
                  Console Admin v3.2
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1.5">
            {[
              { id: 'OVERVIEW', label: 'Ringkasan Eksekutif', icon: LayoutDashboard },
              { id: 'NEWS', label: 'Berita & Artikel', icon: Newspaper, count: newsList.length },
              { id: 'ANNOUNCEMENTS', label: 'Pengumuman Resmi', icon: Bell, count: announcements.length },
              { id: 'GALLERY', label: 'Galeri Kegiatan (Baru)', icon: ImageIcon, count: galleryList.length },
              { id: 'COMPLAINTS', label: 'Tiket Pengaduan', icon: ShieldAlert, count: complaints.filter(c => c.status !== 'RESOLVED').length },
              { id: 'SATISFACTION', label: 'Survei Kepuasan (IKM)', icon: Smile, count: surveys.length },
              { id: 'RATES', label: 'Simulasi Tarif KMA 784', icon: Calculator },
              { id: 'KB', label: 'Tanya Jawab Chatbot AI', icon: Bot, count: knowledgeBase.length },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as AdminTab)}
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
                <span>Petugas Administrator</span>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="secondary"
              onPress={() => window.open('/', '_blank')}
              className="text-xs font-bold bg-white/10 text-white hover:bg-white/20 border border-white/15 rounded-xl flex items-center justify-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Lihat Web</span>
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onPress={handleLogout}
              className="text-xs font-bold bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 border border-rose-800/40 rounded-xl flex items-center justify-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* -------------------------------------------------------------
          MAIN CONTENT AREA (HeroUI Components & Data Display)
      ------------------------------------------------------------- */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Top Bar with Breadcrumbs & Action Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#C9A5E8]/30">
            <div>
              <Breadcrumbs className="text-neutral-500 mb-2">
                <Breadcrumbs.Item href="/admin">Console Admin</Breadcrumbs.Item>
                <Breadcrumbs.Item>
                  <span className="text-[#6B18A8] font-bold">
                    {activeTab === 'OVERVIEW' && 'Ringkasan & Statistik'}
                    {activeTab === 'NEWS' && 'Berita & Artikel Publikasi'}
                    {activeTab === 'ANNOUNCEMENTS' && 'Pengumuman Resmi BPJPH & LPH'}
                    {activeTab === 'GALLERY' && 'Galeri Dokumentasi Kegiatan'}
                    {activeTab === 'COMPLAINTS' && 'Tiket Layanan Pengaduan'}
                    {activeTab === 'SATISFACTION' && 'Indeks Kepuasan Masyarakat (IKM)'}
                    {activeTab === 'RATES' && 'Simulasi Tarif Halal KMA 784'}
                    {activeTab === 'KB' && 'Basis Pengetahuan Chatbot AI'}
                  </span>
                </Breadcrumbs.Item>
              </Breadcrumbs>

              <h2 className="text-2xl sm:text-3xl font-black text-[#292333] tracking-tight">
                {activeTab === 'OVERVIEW' && 'Dashboard Manajemen LPH UIN SGD'}
                {activeTab === 'NEWS' && 'Manajemen Berita & Artikel Publikasi'}
                {activeTab === 'ANNOUNCEMENTS' && 'Manajemen Pengumuman & Surat Edaran'}
                {activeTab === 'GALLERY' && 'Manajemen Galeri Rekam Jejak Kegiatan'}
                {activeTab === 'COMPLAINTS' && 'Pusat Penanganan Tiket Pengaduan'}
                {activeTab === 'SATISFACTION' && 'Evaluasi Survei Kepuasan Masyarakat'}
                {activeTab === 'RATES' && 'Konfigurasi & Log Simulasi Tarif KMA 784'}
                {activeTab === 'KB' && 'Basis Pengetahuan Otomasi Chatbot AI'}
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Kelola konten portal publik, data audit, dan tanggapan interaksi masyarakat secara real-time.
              </p>
            </div>

            {/* Action Buttons depending on Tab */}
            <div className="flex items-center gap-2">
              {activeTab === 'NEWS' && (
                <Button
                  variant="primary"
                  onPress={() => setModalType('ADD_NEWS')}
                  className="bg-[#6B18A8] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-purple-950/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Berita Baru</span>
                </Button>
              )}
              {activeTab === 'ANNOUNCEMENTS' && (
                <Button
                  variant="primary"
                  onPress={() => setModalType('ADD_ANNOUNCEMENT')}
                  className="bg-[#6B18A8] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-purple-950/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Pengumuman</span>
                </Button>
              )}
              {activeTab === 'GALLERY' && (
                <Button
                  variant="primary"
                  onPress={() => setModalType('ADD_GALLERY')}
                  className="bg-[#6B18A8] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-purple-950/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Foto Galeri</span>
                </Button>
              )}
              {activeTab === 'KB' && (
                <Button
                  variant="primary"
                  onPress={() => setModalType('ADD_KB')}
                  className="bg-[#6B18A8] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-purple-950/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Tanya Jawab AI</span>
                </Button>
              )}
            </div>
          </div>

          {/* -------------------------------------------------------------
              TAB 1: OVERVIEW & EXECUTIVE METRICS
          ------------------------------------------------------------- */}
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-8">
              {/* 6 Key Stat Cards using HeroUI Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  {
                    title: 'Berita & Artikel Publikasi',
                    count: newsList.length,
                    note: `${newsList.filter(n => n.status === 'PUBLISHED').length} Tayang di Beranda`,
                    icon: Newspaper,
                    color: 'purple',
                    linkTab: 'NEWS',
                  },
                  {
                    title: 'Dokumen Pengumuman Resmi',
                    count: announcements.length,
                    note: 'SK Tarif & Jadwal Audit',
                    icon: Bell,
                    color: 'yellow',
                    linkTab: 'ANNOUNCEMENTS',
                  },
                  {
                    title: 'Galeri Foto Kegiatan LPH',
                    count: galleryList.length,
                    note: 'Audit, Lab & Pelatihan JULEHA',
                    icon: ImageIcon,
                    color: 'purple',
                    linkTab: 'GALLERY',
                  },
                  {
                    title: 'Tiket Pengaduan Masuk',
                    count: complaints.length,
                    note: `${complaints.filter(c => c.status === 'RESOLVED').length} Tiket Berhasil Ditangani`,
                    icon: ShieldAlert,
                    color: 'rose',
                    linkTab: 'COMPLAINTS',
                  },
                  {
                    title: 'Indeks Kepuasan (IKM)',
                    count: '4.92 / 5.0',
                    note: 'Predikat A (Sangat Baik)',
                    icon: Smile,
                    color: 'emerald',
                    linkTab: 'SATISFACTION',
                  },
                  {
                    title: 'Simulasi Tarif Halal KMA 784',
                    count: '142 Simulasi',
                    note: 'Akses Publik Bulan Ini',
                    icon: Calculator,
                    color: 'yellow',
                    linkTab: 'RATES',
                  },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <Card
                      key={idx}
                      className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 hover:shadow-xl hover:shadow-purple-950/5 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                          {stat.title}
                        </span>
                        <div className="p-2.5 rounded-2xl bg-[#FAF7FD] text-[#6B18A8] border border-[#C9A5E8]/40">
                          <Icon className="w-5 h-5 text-[#6B18A8]" />
                        </div>
                      </div>
                      <div className="text-3xl font-black text-[#292333] tracking-tight">
                        {stat.count}
                      </div>
                      <div className="mt-3 flex items-center justify-between pt-3 border-t border-neutral-100">
                        <span className="text-xs text-neutral-500 font-medium">
                          {stat.note}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onPress={() => setActiveTab(stat.linkTab as AdminTab)}
                          className="text-[11px] font-bold text-[#6B18A8] hover:bg-[#F5EDFB] px-2 py-1 rounded-lg"
                        >
                          Kelola &rarr;
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Recent Pending Tasks / Whistleblowing Highlight */}
              <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-base font-bold text-[#292333] flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#6B18A8]" />
                      <span>Tiket Pengaduan Membutuhkan Tindak Lanjut</span>
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Daftar tiket aduan masyarakat yang belum ditutup atau membutuhkan konfirmasi verifikator.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onPress={() => setActiveTab('COMPLAINTS')}
                    className="text-xs font-bold rounded-xl"
                  >
                    Lihat Semua Tiket
                  </Button>
                </div>

                <div className="space-y-3">
                  {complaints
                    .filter((c) => c.status !== 'RESOLVED')
                    .map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono font-black text-[#6B18A8]">
                              {item.ticketCode}
                            </span>
                            <Chip size="sm" className="bg-[#FFF7D1] text-[#713f12] font-bold text-[10px]">
                              {item.category}
                            </Chip>
                            <span className="text-[11px] text-neutral-400">
                              {formatDate(item.submittedAt)}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-700 font-medium">
                            {item.description}
                          </p>
                          <span className="text-[11px] text-neutral-500 mt-1 block">
                            Pelapor: {item.name} ({item.contact})
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="primary"
                          onPress={() => handleOpenComplaintModal(item)}
                          className="bg-[#6B18A8] text-white text-xs font-bold rounded-xl px-4 shrink-0"
                        >
                          Tindak Lanjuti
                        </Button>
                      </div>
                    ))}
                </div>
              </Card>
            </div>
          )}

          {/* -------------------------------------------------------------
              TAB 2: NEWS & ARTICLES MANAGEMENT
          ------------------------------------------------------------- */}
          {activeTab === 'NEWS' && (
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

                <div className="w-full sm:w-64">
                  <Input
                    placeholder="Cari berita..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-xs rounded-xl"
                  />
                </div>
              </div>

              {/* HeroUI v3 Table */}
              <Table variant="secondary" className="w-full">
                <Table.ScrollContainer>
                  <Table.Content aria-label="Daftar Berita LPH">
                    <Table.Header>
                      <Table.Column isRowHeader>Judul Berita</Table.Column>
                      <Table.Column>Kategori</Table.Column>
                      <Table.Column>Status</Table.Column>
                      <Table.Column>Tanggal</Table.Column>
                      <Table.Column>Aksi</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      {newsList
                        .filter((n) => !searchQuery || n.title.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((news) => (
                          <Table.Row key={news.id} className="border-b border-neutral-100 hover:bg-[#FAF7FD]/50">
                            <Table.Cell className="py-3.5 max-w-md">
                              <span className="font-bold text-neutral-800 text-xs block truncate">
                                {news.title}
                              </span>
                              <span className="text-[11px] text-neutral-400 block truncate mt-0.5">
                                {news.excerpt}
                              </span>
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
                              <div className="flex items-center gap-1.5">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onPress={() => window.open(`/berita/${news.slug}`, '_blank')}
                                  className="text-neutral-500 hover:text-[#6B18A8] p-1.5 rounded-lg"
                                >
                                  <Eye className="w-3.5 h-3.5" />
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
            </Card>
          )}

          {/* -------------------------------------------------------------
              TAB 3: ANNOUNCEMENTS MANAGEMENT
          ------------------------------------------------------------- */}
          {activeTab === 'ANNOUNCEMENTS' && (
            <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-[#292333]">
                    Surat Edaran, SK Tarif &amp; Pengumuman BPJPH
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Dokumen resmi yang dapat diunduh publik melalui portal.
                  </p>
                </div>
              </div>

              {/* HeroUI v3 Table */}
              <Table variant="secondary" className="w-full">
                <Table.ScrollContainer>
                  <Table.Content aria-label="Daftar Pengumuman Resmi">
                    <Table.Header>
                      <Table.Column isRowHeader>Nama Dokumen / Pengumuman</Table.Column>
                      <Table.Column>Berkas PDF</Table.Column>
                      <Table.Column>Status</Table.Column>
                      <Table.Column>Tanggal</Table.Column>
                      <Table.Column>Aksi</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      {announcements.map((ann) => (
                        <Table.Row key={ann.id} className="border-b border-neutral-100 hover:bg-[#FAF7FD]/50">
                          <Table.Cell className="py-3.5 max-w-md">
                            <span className="font-bold text-neutral-800 text-xs block">
                              {ann.title}
                            </span>
                            <span className="text-[11px] text-neutral-400 block mt-0.5">
                              {ann.content}
                            </span>
                          </Table.Cell>
                          <Table.Cell>
                            <span className="text-xs font-mono text-[#6B18A8] font-bold block">
                              {ann.fileName}
                            </span>
                            <span className="text-[10px] text-neutral-400">{ann.fileSize}</span>
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
                          <Table.Cell>
                            <Button
                              size="sm"
                              variant="ghost"
                              onPress={() => handleDeleteAnnouncement(ann.id)}
                              className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-1.5 rounded-lg"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Content>
                </Table.ScrollContainer>
              </Table>
            </Card>
          )}

          {/* -------------------------------------------------------------
              TAB 4: ACTIVITY GALLERY MANAGEMENT
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
              </div>

              {/* HeroUI v3 Table */}
              <Table variant="secondary" className="w-full">
                <Table.ScrollContainer>
                  <Table.Content aria-label="Daftar Foto Galeri">
                    <Table.Header>
                      <Table.Column isRowHeader>Foto &amp; Judul Kegiatan</Table.Column>
                      <Table.Column>Kategori</Table.Column>
                      <Table.Column>Auditor Penanggung Jawab</Table.Column>
                      <Table.Column>Fasilitas / Lokasi</Table.Column>
                      <Table.Column>Tanggal</Table.Column>
                      <Table.Column>Aksi</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      {galleryList.map((item) => (
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
                          <Table.Cell>
                            <div className="flex items-center gap-1">
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
            </Card>
          )}

          {/* -------------------------------------------------------------
              TAB 5: COMPLAINTS & WHISTLEBLOWING
          ------------------------------------------------------------- */}
          {activeTab === 'COMPLAINTS' && (
            <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-[#292333]">
                    Pusat Tiket Pengaduan &amp; Whistleblowing Layanan
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Kawal integritas layanan publik, bebas gratifikasi dan pungli di lingkungan LPH UIN SGD.
                  </p>
                </div>
              </div>

              {/* HeroUI v3 Table */}
              <Table variant="secondary" className="w-full">
                <Table.ScrollContainer>
                  <Table.Content aria-label="Daftar Tiket Pengaduan">
                    <Table.Header>
                      <Table.Column isRowHeader>Kode Tiket</Table.Column>
                      <Table.Column>Pelapor &amp; Kontak</Table.Column>
                      <Table.Column>Kategori</Table.Column>
                      <Table.Column>Uraian Pengaduan</Table.Column>
                      <Table.Column>Status</Table.Column>
                      <Table.Column>Tindak Lanjut</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      {complaints.map((comp) => (
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
                                  : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                              )}
                            >
                              {comp.status}
                            </Chip>
                          </Table.Cell>
                          <Table.Cell>
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
            </Card>
          )}

          {/* -------------------------------------------------------------
              TAB 6: CUSTOMER SATISFACTION (IKM)
          ------------------------------------------------------------- */}
          {activeTab === 'SATISFACTION' && (
            <div className="space-y-6">
              {/* Stat Summary */}
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

              {/* Feed of Recent Reviews */}
              <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-6">
                <h3 className="text-base font-bold text-[#292333]">
                  Masukan &amp; Evaluasi Pelaku Usaha Terbaru
                </h3>

                <div className="space-y-4">
                  {surveys.map((s) => (
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
              </Card>
            </div>
          )}

          {/* -------------------------------------------------------------
              TAB 7: HALAL FEE RATES (KMA 784)
          ------------------------------------------------------------- */}
          {activeTab === 'RATES' && (
            <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-[#292333] flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-[#6B18A8]" />
                    <span>Matriks Tarif Resmi Sertifikasi Halal KMA 784</span>
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Standar tarif batas atas dan bawah berdasarkan regulasi Kementerian Agama RI &amp; BPJPH.
                  </p>
                </div>
              </div>

              <Table variant="secondary" className="w-full">
                <Table.ScrollContainer>
                  <Table.Content aria-label="Matriks Tarif KMA 784">
                    <Table.Header>
                      <Table.Column isRowHeader>Skala Usaha</Table.Column>
                      <Table.Column>Jenis Fasilitas</Table.Column>
                      <Table.Column>Tarif BPJPH</Table.Column>
                      <Table.Column>Tarif Pemeriksaan LPH</Table.Column>
                      <Table.Column>Status Regulasi</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      {[
                        { scale: 'Usaha Mikro (UMK)', fac: 'Pangan Sederhana (Self Declare / Reguler)', bpjph: 'Rp 300.000', lph: 'Rp 350.000', stat: 'KMA 784/2021' },
                        { scale: 'Usaha Kecil', fac: '1 Lini Produksi Pabrik / Restoran', bpjph: 'Rp 650.000', lph: 'Rp 2.500.000', stat: 'KMA 784/2021' },
                        { scale: 'Usaha Menengah', fac: 'Pabrik Kompleks & Bahan Tambahan Pangan', bpjph: 'Rp 1.250.000', lph: 'Rp 5.500.000', stat: 'KMA 784/2021' },
                        { scale: 'Usaha Besar', fac: 'Industri Multinasional / Farmasi / RPH', bpjph: 'Rp 3.500.000', lph: 'Rp 12.500.000', stat: 'KMA 784/2021' },
                        { scale: 'Semua Skala', fac: 'Uji Laboratorium DNA Porcine qPCR (Per Sampel)', bpjph: '-', lph: 'Rp 1.200.000', stat: 'ISO 17025' },
                        { scale: 'Semua Skala', fac: 'Uji Laboratorium Etanol GC-FID (Per Sampel)', bpjph: '-', lph: 'Rp 650.000', stat: 'ISO 17025' },
                      ].map((rate, i) => (
                        <Table.Row key={i} className="border-b border-neutral-100 hover:bg-[#FAF7FD]/50">
                          <Table.Cell className="font-bold text-xs text-neutral-800">{rate.scale}</Table.Cell>
                          <Table.Cell className="text-xs text-neutral-600">{rate.fac}</Table.Cell>
                          <Table.Cell className="text-xs font-mono font-semibold text-neutral-700">{rate.bpjph}</Table.Cell>
                          <Table.Cell className="text-xs font-mono font-black text-[#6B18A8]">{rate.lph}</Table.Cell>
                          <Table.Cell>
                            <Chip size="sm" className="bg-[#FFF7D1] text-[#713f12] border border-[#F5D32F] font-bold text-[10px]">
                              {rate.stat}
                            </Chip>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Content>
                </Table.ScrollContainer>
              </Table>
            </Card>
          )}

          {/* -------------------------------------------------------------
              TAB 8: KNOWLEDGE BASE & AI CHATBOT
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
              </div>

              <div className="space-y-4">
                {knowledgeBase.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 space-y-2 relative"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="text-xs font-bold text-neutral-900 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-[#6B18A8]" />
                        <span>{item.question}</span>
                      </h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        onPress={() => handleDeleteKb(item.id)}
                        className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-1.5 rounded-lg shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed font-normal pl-6">
                      {item.answer}
                    </p>
                    {item.tags && (
                      <div className="pl-6 pt-1 flex items-center gap-1.5 flex-wrap">
                        {item.tags.split(',').map((t, i) => (
                          <span
                            key={i}
                            className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-white border border-[#C9A5E8]/40 text-[#6B18A8]"
                          >
                            #{t.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </main>

      {/* -------------------------------------------------------------
          MODALS: HEROUI V3 MODAL DIALOGS
      ------------------------------------------------------------- */}

      {/* MODAL 1: TAMBAH BERITA */}
      <Modal.Backdrop isOpen={modalType === 'ADD_NEWS'} onOpenChange={(open) => !open && setModalType(null)}>
        <Modal.Container placement="center">
          <Modal.Dialog className="max-w-xl p-0 overflow-hidden rounded-3xl bg-white border border-[#C9A5E8]/40 shadow-2xl">
            <Modal.CloseTrigger />
            <form onSubmit={handleSaveNews}>
              <Modal.Header className="p-6 bg-gradient-to-r from-[#FAF7FD] to-white border-b border-[#C9A5E8]/30">
                <Modal.Heading className="text-lg font-black text-[#292333]">
                  Tambah Berita / Artikel Baru
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Judul Artikel
                  </label>
                  <Input
                    value={newsForm.title}
                    onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                    required
                    placeholder="Contoh: Akselerasi Audit Halal Industri..."
                    className="w-full text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      Kategori
                    </label>
                    <select
                      value={newsForm.category}
                      onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-neutral-300 text-xs bg-white"
                    >
                      <option value="KEGIATAN">KEGIATAN</option>
                      <option value="ACARA">ACARA</option>
                      <option value="AGENDA">AGENDA</option>
                      <option value="EDUKASI">EDUKASI</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      Status Publikasi
                    </label>
                    <select
                      value={newsForm.status}
                      onChange={(e) => setNewsForm({ ...newsForm, status: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-neutral-300 text-xs bg-white"
                    >
                      <option value="PUBLISHED">PUBLISHED (Tayang)</option>
                      <option value="DRAFT">DRAFT (Draf)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Ringkasan Singkat (Excerpt)
                  </label>
                  <Input
                    value={newsForm.excerpt}
                    onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                    required
                    placeholder="Ringkasan 1-2 kalimat untuk kartu berita..."
                    className="w-full text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Konten Lengkap Berita
                  </label>
                  <TextArea
                    value={newsForm.content}
                    onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                    rows={4}
                    required
                    placeholder="Tuliskan isi berita selengkapnya..."
                    className="w-full text-xs"
                  />
                </div>
              </Modal.Body>
              <Modal.Footer className="p-4 sm:p-6 bg-[#FAF7FD] border-t border-[#C9A5E8]/30 flex justify-end gap-2">
                <Button variant="secondary" slot="close" className="text-xs font-bold rounded-xl px-4 py-2">
                  Batal
                </Button>
                <Button type="submit" variant="primary" className="bg-[#6B18A8] text-white text-xs font-bold rounded-xl px-5 py-2">
                  Simpan Berita
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>

      {/* MODAL 2: TAMBAH PENGUMUMAN */}
      <Modal.Backdrop isOpen={modalType === 'ADD_ANNOUNCEMENT'} onOpenChange={(open) => !open && setModalType(null)}>
        <Modal.Container placement="center">
          <Modal.Dialog className="max-w-xl p-0 overflow-hidden rounded-3xl bg-white border border-[#C9A5E8]/40 shadow-2xl">
            <Modal.CloseTrigger />
            <form onSubmit={handleSaveAnnouncement}>
              <Modal.Header className="p-6 bg-gradient-to-r from-[#FAF7FD] to-white border-b border-[#C9A5E8]/30">
                <Modal.Heading className="text-lg font-black text-[#292333]">
                  Tambah Pengumuman Resmi / SK
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Judul Pengumuman
                  </label>
                  <Input
                    value={announcementForm.title}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                    required
                    placeholder="Contoh: Surat Edaran Penyesuaian Jadwal Fatwa..."
                    className="w-full text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Nama File Lampiran (PDF)
                  </label>
                  <Input
                    value={announcementForm.fileName}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, fileName: e.target.value })}
                    placeholder="Contoh: SE_Jadwal_Fatwa_2026.pdf"
                    className="w-full text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Deskripsi Ringkas
                  </label>
                  <TextArea
                    value={announcementForm.content}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                    rows={3}
                    placeholder="Keterangan singkat pengumuman..."
                    className="w-full text-xs"
                  />
                </div>
              </Modal.Body>
              <Modal.Footer className="p-4 sm:p-6 bg-[#FAF7FD] border-t border-[#C9A5E8]/30 flex justify-end gap-2">
                <Button variant="secondary" slot="close" className="text-xs font-bold rounded-xl px-4 py-2">
                  Batal
                </Button>
                <Button type="submit" variant="primary" className="bg-[#6B18A8] text-white text-xs font-bold rounded-xl px-5 py-2">
                  Simpan Pengumuman
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>

      {/* MODAL 3: TAMBAH FOTO GALERI */}
      <Modal.Backdrop isOpen={modalType === 'ADD_GALLERY'} onOpenChange={(open) => !open && setModalType(null)}>
        <Modal.Container placement="center">
          <Modal.Dialog className="max-w-xl p-0 overflow-hidden rounded-3xl bg-white border border-[#C9A5E8]/40 shadow-2xl">
            <Modal.CloseTrigger />
            <form onSubmit={handleSaveGallery}>
              <Modal.Header className="p-6 bg-gradient-to-r from-[#FAF7FD] to-white border-b border-[#C9A5E8]/30">
                <Modal.Heading className="text-lg font-black text-[#292333]">
                  Upload &amp; Publikasi Foto Galeri Kegiatan
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body className="p-6 space-y-4">
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      Kategori Galeri
                    </label>
                    <select
                      value={galleryForm.category}
                      onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-neutral-300 text-xs bg-white"
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
                <div className="grid grid-cols-2 gap-4">
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
                      placeholder="Contoh: Kawasan Industri..."
                      className="w-full text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Uraian Konteks Kegiatan
                  </label>
                  <TextArea
                    value={galleryForm.fullStory}
                    onChange={(e) => setGalleryForm({ ...galleryForm, fullStory: e.target.value })}
                    rows={3}
                    placeholder="Uraian detail pelaksanaan audit atau uji lab..."
                    className="w-full text-xs"
                  />
                </div>
              </Modal.Body>
              <Modal.Footer className="p-4 sm:p-6 bg-[#FAF7FD] border-t border-[#C9A5E8]/30 flex justify-end gap-2">
                <Button variant="secondary" slot="close" className="text-xs font-bold rounded-xl px-4 py-2">
                  Batal
                </Button>
                <Button type="submit" variant="primary" className="bg-[#6B18A8] text-white text-xs font-bold rounded-xl px-5 py-2">
                  Simpan ke Galeri
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>

      {/* MODAL 4: RESPON TIKET PENGADUAN */}
      <Modal.Backdrop isOpen={modalType === 'EDIT_COMPLAINT'} onOpenChange={(open) => !open && setModalType(null)}>
        <Modal.Container placement="center">
          <Modal.Dialog className="max-w-xl p-0 overflow-hidden rounded-3xl bg-white border border-[#C9A5E8]/40 shadow-2xl">
            <Modal.CloseTrigger />
            {selectedComplaint && (
              <form onSubmit={handleSaveComplaintReply}>
                <Modal.Header className="p-6 bg-gradient-to-r from-[#FAF7FD] to-white border-b border-[#C9A5E8]/30">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-black text-sm text-[#6B18A8]">
                      {selectedComplaint.ticketCode}
                    </span>
                    <Chip size="sm" className="bg-[#FFF7D1] text-[#713f12] font-bold text-[10px]">
                      {selectedComplaint.category}
                    </Chip>
                  </div>
                  <Modal.Heading className="text-lg font-black text-[#292333]">
                    Tindak Lanjut &amp; Respon Pengaduan
                  </Modal.Heading>
                </Modal.Header>
                <Modal.Body className="p-6 space-y-4">
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
                <Modal.Footer className="p-4 sm:p-6 bg-[#FAF7FD] border-t border-[#C9A5E8]/30 flex justify-end gap-2">
                  <Button variant="secondary" slot="close" className="text-xs font-bold rounded-xl px-4 py-2">
                    Batal
                  </Button>
                  <Button type="submit" variant="primary" className="bg-[#6B18A8] text-white text-xs font-bold rounded-xl px-5 py-2">
                    Simpan &amp; Perbarui Tiket
                  </Button>
                </Modal.Footer>
              </form>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>

      {/* MODAL 5: TAMBAH PENGETAHUAN CHATBOT (KB) */}
      <Modal.Backdrop isOpen={modalType === 'ADD_KB'} onOpenChange={(open) => !open && setModalType(null)}>
        <Modal.Container placement="center">
          <Modal.Dialog className="max-w-xl p-0 overflow-hidden rounded-3xl bg-white border border-[#C9A5E8]/40 shadow-2xl">
            <Modal.CloseTrigger />
            <form onSubmit={handleSaveKb}>
              <Modal.Header className="p-6 bg-gradient-to-r from-[#FAF7FD] to-white border-b border-[#C9A5E8]/30">
                <Modal.Heading className="text-lg font-black text-[#292333]">
                  Tambah Pengetahuan AI Chatbot
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body className="p-6 space-y-4">
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
              <Modal.Footer className="p-4 sm:p-6 bg-[#FAF7FD] border-t border-[#C9A5E8]/30 flex justify-end gap-2">
                <Button variant="secondary" slot="close" className="text-xs font-bold rounded-xl px-4 py-2">
                  Batal
                </Button>
                <Button type="submit" variant="primary" className="bg-[#6B18A8] text-white text-xs font-bold rounded-xl px-5 py-2">
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

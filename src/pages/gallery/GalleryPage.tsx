import React, { useState, useMemo } from 'react';
import {
  Modal,
  Tabs,
  Pagination,
  Breadcrumbs,
  Chip,
  Button,
  Input,
  Card,
} from '@heroui/react';
import {
  Search,
  Calendar,
  MapPin,
  UserCheck,
  Award,
  ShieldCheck,
  FlaskConical,
  ExternalLink,
  SlidersHorizontal,
  Building2,
  Users,
  Sparkles,
  Share2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Spotlight } from '@/components/ui/spotlight';
import { FocusCards, type FocusCardItem } from '@/components/ui/focus-cards';
import { YellowDotGrid, YellowHighlight } from '@/components/ui/decorative-shapes';
import { cn } from '@/lib/utils';

export interface GalleryItem extends FocusCardItem {
  auditorLead: string;
  facility: string;
  standard: string;
  fullStory: string;
  categoryKey: 'audit' | 'lab' | 'training' | 'partnership';
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: 1,
    title: 'Audit Fasilitas Pabrik Pengolahan Pangan & Minuman Berkecepatan Tinggi',
    category: 'Audit Lapangan',
    categoryKey: 'audit',
    src: '/assets/images/pemeriksaaan-kehalalan-produk.jpg',
    date: '15 Oktober 2026',
    location: 'Kawasan Industri MM2100, Cikarang, Jawa Barat',
    description: 'Pemeriksaan langsung terhadap lini produksi pemrosesan makanan kemasan berkecepatan tinggi, titik kritis bahan pengental nabati, dan prosedur sanitasi mesin pencucian.',
    auditorLead: 'Drs. H. Ahmad Fauzi, M.Si (Auditor Halal Madya BPJPH)',
    facility: 'PT Indofood CBP Sukses Makmur Tbk - Divisi Nutrition & Special Food',
    standard: 'SJPH KMA 784 Tahun 2021 & SNI 99001:2016',
    fullStory: 'Tim auditor halal LPH UIN Sunan Gunung Djati Bandung melakukan verifikasi menyeluruh di lokasi manufaktur. Pemeriksaan berfokus pada pemastian pemisahan fasilitas produksi dari kontaminan non-halal, matriks asal bahan baku perisa, emulsifier, serta kepatuhan prosedur operasional standar (SOP) pencucian higienis.',
    tags: ['Pangan Olahan', 'Audit Pabrik', 'KMA 784', 'SJPH'],
  },
  {
    id: 2,
    title: 'Deteksi Saintifik Real-Time PCR DNA Porcine Sensitivitas Tinggi',
    category: 'Laboratorium ISO 17025',
    categoryKey: 'lab',
    src: '/assets/images/lab-dna-testing.jpg',
    date: '22 Oktober 2026',
    location: 'Laboratorium Terpadu Biosains Kampus 2 UIN Sunan Gunung Djati Bandung',
    description: 'Pengujian molekuler presisi tinggi menggunakan primer qPCR spesifik gen sitokrom b (Cyt b) untuk mendeteksi residu turunan babi pada produk olahan daging dan kapsul.',
    auditorLead: 'Dr. Tri Cahyanto, M.Si & Tim Analis Biologi Molekuler Terakreditasi KAN',
    facility: 'Laboratorium Terpadu Pengujian Halal Kampus 2 UIN SGD',
    standard: 'Akreditasi KAN SNI ISO/IEC 17025:2017 No. LP-1542-IDN',
    fullStory: 'Sebagai bagian dari tahapan saintifik penentuan kehalalan, sampel produk pangan dan farmasi yang memiliki risiko kritis diuji di fasilitas laboratorium biosains. Ekstraksi DNA dilakukan secara duplikat dengan limit of detection mencapai 0.01% DNA babi, menjamin hasil akuntabel sebelum dibawa ke Sidang Fatwa MUI.',
    tags: ['qPCR', 'DNA Porcine', 'ISO 17025', 'KAN Akreditasi'],
  },
  {
    id: 3,
    title: 'Audit Ketertelusuran Rantai Pasok Sembelihan Unggas & RPH Modern',
    category: 'Audit Lapangan',
    categoryKey: 'audit',
    src: '/assets/images/img_011.jpg',
    date: '28 Oktober 2026',
    location: 'Rumah Pemotongan Unggas (RPU) Ciroyom, Kota Bandung',
    description: 'Pemeriksaan syar’i penyembelihan leher unggas (tiga saluran wajib: trakea, esofagus, vena jugularis) serta rantai pendingin (cold chain) karkas ayam.',
    auditorLead: 'Ust. H. Dede Mulyana, S.Ag (Penyelia Halal & Assessor Sembelihan)',
    facility: 'Sentra Pemotongan Hewan dan Distribusi Unggas Ciroyom',
    standard: 'HAS 23103 Pedoman Pemenuhan Kriteria Halal RPH / Fatwa MUI No. 12/2009',
    fullStory: 'Auditor halal memverifikasi langsung kompetensi juru sembelih di lokasi pemotongan, pembacaan basmalah secara personal pada setiap hewan, serta kecepatan pemotongan dan penirisan darah tuntas sebelum karkas masuk ke air panas perebusan.',
    tags: ['Jagal Halal', 'RPU Unggas', 'Cold Chain', 'Syar’i Halal'],
  },
  {
    id: 4,
    title: 'Pelatihan & Sertifikasi Juru Sembelih Halal (JULEHA) Angkatan VIII',
    category: 'Pelatihan & JULEHA',
    categoryKey: 'training',
    src: '/assets/images/img_013.jpg',
    date: '02 November 2026',
    location: 'Auditorium Anwar Musaddad, Kampus 1 UIN Sunan Gunung Djati Bandung',
    description: 'Pemberian materi anatomi leher hewan ternak, fiqih dzabh syariah, tata kelola bilah tajam ergonomis, dan uji kompetensi resmi BNSP bagi 120 peserta.',
    auditorLead: 'Prof. Dr. H. Rosihon Anwar, M.Ag & Instruktur BNSP Jawa Barat',
    facility: 'Lembaga Pelatihan JPH (LPJPH) Halal Center UIN SGD',
    standard: 'SKKNI No. 147 Tahun 2022 Bidang Penyembelihan Hewan Halal',
    fullStory: 'Program bimbingan intensif 3 hari ini melatih juru sembelih dari berbagai masjid, yayasan kurban, dan rumah potong hewan se-Jawa Barat guna memastikan terpenuhinya standar animal welfare (kesejahteraan hewan) dan syarat kehalalan syariah Islam.',
    tags: ['JULEHA', 'Pelatihan Jagal', 'BNSP Sertifikasi', 'Animal Welfare'],
  },
  {
    id: 5,
    title: 'Analisis Cemaran Etanol & Pelarut Organik Metode Kromatografi Gas GC-FID',
    category: 'Laboratorium ISO 17025',
    categoryKey: 'lab',
    src: '/assets/images/lab-landscape-1.jpg',
    date: '05 November 2026',
    location: 'Ruang Instrumentasi Kimia Analitik Gedung Terpadu UIN SGD',
    description: 'Pengukuran kuantitatif kandungan alkohol residu fermentasi dan sisa pelarut ekstraksi pada produk perisa konsentrat, kombucha, dan kecap kedelai.',
    auditorLead: 'Siti Rahmawati, M.Si (Kepala Unit Analisis Kromatografi LPH UIN SGD)',
    facility: 'Instrument Center Agilent 8890 GC-FID System',
    standard: 'Fatwa MUI No. 10 Tahun 2018 (Batas Maksimal Etanol Khusus)',
    fullStory: 'Pengujian GC-FID dengan kolom kapiler polar memungkinkan pendeteksian senyawa volatil etanol hingga kadar 0.005%. Data kromatogram ini menjadi dasar ilmiah apakah produk hasil fermentasi memenuhi ambang batas kehalalan fatwa nasional.',
    tags: ['GC-FID', 'Uji Etanol', 'Kromatografi', 'Kimia Pangan'],
  },
  {
    id: 6,
    title: 'Kunjungan Kerja Monitoring & Akselerasi Layanan Halal Bersama Pimpinan BPJPH',
    category: 'Kunjungan & MoA',
    categoryKey: 'partnership',
    src: '/assets/images/uin_sgd/uin_14.webp',
    date: '08 November 2026',
    location: 'Ruang Rapat Utama Gedung Halal Center Kampus 1 UIN SGD',
    description: 'Evaluasi kesiapan sarana laboratorium dan integrasi platform digital SIHALAL dalam rangka percepatan audit halal reguler industri nasional.',
    auditorLead: 'Pimpinan Badan Penyelenggara Jaminan Produk Halal (BPJPH) Kemenag RI',
    facility: 'Pusat Riset Halal UIN Sunan Gunung Djati Bandung',
    standard: 'Peraturan Pemerintah No. 39 Tahun 2021 tentang Penyelenggaraan Bidang JPH',
    fullStory: 'Delegasi BPJPH mengapresiasi kecepatan waktu pemeriksaan LPH UIN SGD yang konsisten berada di bawah standar SLA regulasi (15 hari kerja), serta kesiapan fasilitas uji DNA kampus 2 yang berstandar internasional.',
    tags: ['BPJPH', 'Kemenag RI', 'Akselerasi Layanan', 'SLA Halal'],
  },
  {
    id: 7,
    title: 'Inspeksi Fasilitas Ruang Bersih (Cleanroom) Industri Farmasi & Kosmetik',
    category: 'Audit Lapangan',
    categoryKey: 'audit',
    src: '/assets/images/beranda_004.jpg',
    date: '12 November 2026',
    location: 'Sentra Manufaktur Farmasi & Kosmetik Padalarang',
    description: 'Pemeriksaan jalur sirkulasi HEPA filter, kualifikasi bahan baku kolagen, dan pembuktian bebas kontaminasi silang najis pada sistem kemas sekunder.',
    auditorLead: 'Apt. Farida Nurul Hidayah, M.Farm & Tim Auditor Farmasi',
    facility: 'Fasilitas Produksi Formulasi Kosmetika Parahyangan',
    standard: 'Pedoman Halal Kosmetika Fatwa MUI No. 26/2013 & CPKB BPOM',
    fullStory: 'Pemeriksaan pada industri kosmetik mencakup verifikasi sumber bahan aktif, pemastian bahwa turunan gliserin berasal dari kelapa sawit murni (bukan lemak hewani haram), dan sterilisasi tangki pencampur emulsi.',
    tags: ['Kosmetik Halal', 'Cleanroom', 'Farmasi', 'Gliserin Nabati'],
  },
  {
    id: 8,
    title: 'Surveillance Audit Akreditasi KAN & Uji Kalibrasi Spektrofotometri',
    category: 'Laboratorium ISO 17025',
    categoryKey: 'lab',
    src: '/assets/images/lab-landscape-2.jpg',
    date: '14 November 2026',
    location: 'Laboratorium Kalibrasi dan Penjaminan Mutu UIN SGD',
    description: 'Asesmen berkala surveillance sistem mutu laboratorium uji halal, kalibrasi timbangan analitik micro-balance, dan pembacaan mikroplate reader ELISA.',
    auditorLead: 'Asesor Utama Komite Akreditasi Nasional (KAN)',
    facility: 'Unit Penjaminan Mutu Laboratorium Terpadu UIN SGD',
    standard: 'SNI ISO/IEC 17025:2017 Klausul 6 (Persyaratan Sumber Daya)',
    fullStory: 'Asesmen surveillance ini mengonfirmasi bahwa seluruh peralatan instrumentasi di LPH UIN SGD tertelusur (traceable) ke Standar Nasional Satuan Ukuran (SNSU) dan memenuhi standar ketidakpastian pengukuran yang sangat ketat.',
    tags: ['Surveillance KAN', 'Kalibrasi', 'ISO 17025', 'Penjaminan Mutu'],
  },
  {
    id: 9,
    title: 'Bimbingan Teknis Penyelia Halal Pelaku Usaha Mikro & Menengah (UMKM)',
    category: 'Pelatihan & JULEHA',
    categoryKey: 'training',
    src: '/assets/images/img_014.jpg',
    date: '17 November 2026',
    location: 'Pusat Inkubasi Bisnis Halal Gedung Rektorat UIN SGD',
    description: 'Pelatihan penyusunan manual SJPH, penetapan matriks bahan baku halal, dan simulasi penanganan produk cacat tidak halal bagi 80 pelaku UMKM binaan.',
    auditorLead: 'Fasilitator LPJPH UIN SGD & Dinas Perindustrian Jawa Barat',
    facility: 'Inkubator Bisnis & Halal Center UIN SGD',
    standard: 'Keputusan Kepala BPJPH No. 40 Tahun 2022 Pedoman Sertifikasi UMK',
    fullStory: 'Peserta bimbingan teknis dibimbing secara intensif satu per satu dalam mengisi dokumen SIHALAL, mengidentifikasi bahan baku positif (positive list), serta menyiapkan dokumen penetapan penyelia halal internal perusahaan.',
    tags: ['Bimtek UMKM', 'Penyelia Halal', 'Positive List', 'Manual SJPH'],
  },
  {
    id: 10,
    title: 'Penandatanganan MoA Kemitraan Fasilitasi Halal Asosiasi Pengusaha Kuliner',
    category: 'Kunjungan & MoA',
    categoryKey: 'partnership',
    src: '/assets/images/uin_sgd/director_tri.webp',
    date: '20 November 2026',
    location: 'Ballroom Hotel Savoy Homann, Jl. Asia Afrika, Kota Bandung',
    description: 'Nota kesepahaman percepatan sertifikasi halal bagi 500 restoran dan katering komersial se-Jawa Barat menjelang pemberlakuan kewajiban halal penuh.',
    auditorLead: 'Dr. Tri Cahyanto, M.Si & Ketua Badan Pengurus Daerah Asosiasi Kuliner Jabar',
    facility: 'Forum Kerjasama Industri Makanan & Minuman Halal',
    standard: 'Kemitraan Strategis Akselerasi Halal Indonesia 2026',
    fullStory: 'Kerja sama strategis ini memberikan kemudahan pendampingan pra-audit dan prioritas slot penjadwalan pemeriksaan halal bagi seluruh anggota asosiasi untuk memastikan kepatuhan regulasi UU No. 33 Tahun 2014.',
    tags: ['MoA Kemitraan', 'Restoran Halal', 'Asosiasi Kuliner', 'Regulasi'],
  },
  {
    id: 11,
    title: 'Pengujian Sidik Jari Spektroskopi FTIR Perbedaan Gelatin Sapi vs Babi',
    category: 'Laboratorium ISO 17025',
    categoryKey: 'lab',
    src: '/assets/images/uji-laboratorium.jpg',
    date: '23 November 2026',
    location: 'Laboratorium Spektroskopi Molekuler UIN SGD',
    description: 'Diferensiasi spektra inframerah Fourier-Transform (FTIR-ATR) pada pita serapan Amida I dan Amida II untuk memverifikasi asal cangkang kapsul obat keras.',
    auditorLead: 'Tim Peneliti Biosains Farmasi Halal LPH UIN SGD',
    facility: 'PerkinElmer Spectrum Two FTIR Spectrometer',
    standard: 'Metode Kemometrik Multivariate Principal Component Analysis (PCA)',
    fullStory: 'Pengujian FTIR dikombinasikan dengan analisis statistik multivariat PCA untuk mengidentifikasi pola spektral spesifik dari gelatin sapi murni, ikan, dan gelatin babi dengan akurasi klasifikasi mencapai 99.4%.',
    tags: ['FTIR-ATR', 'Gelatin Halal', 'Kemometrik', 'Kapsul Obat'],
  },
  {
    id: 12,
    title: 'Audit Lapangan Pabrik Formulasi Bumbu, Premiks, & Seasoning Sintetis',
    category: 'Audit Lapangan',
    categoryKey: 'audit',
    src: '/assets/images/img_012.jpg',
    date: '26 November 2026',
    location: 'Kawasan Industri Jababeka Tahap III, Cikarang',
    description: 'Pemeriksaan titik kritis bahan perisa gurih monosodium glutamat (MSG), yeast extract, hidrolisat protein nabati, dan verifikasi sertifikat halal impor.',
    auditorLead: 'Ir. H. Salman Farisi, M.T (Auditor Halal Spesialis Bioproses Kimia)',
    facility: 'PT Ajinomoto Indonesia Factory Facility',
    standard: 'Sistem Jaminan Produk Halal (SJPH) Komitmen & Verifikasi Bahan',
    fullStory: 'Pemeriksaan mencakup verifikasi rantai fermentasi mikroba untuk produksi asam glutamat, media pembiakan bakteri (apakah menggunakan pepton hewani atau nabati), serta sertifikat halal dari lembaga halal luar negeri (LHLN) yang diakui BPJPH.',
    tags: ['Seasoning Halal', 'Fermentasi', 'LHLN Halal', 'Bumbu Sintetis'],
  },
  {
    id: 13,
    title: 'Workshop Nasional Harmonisasi Protokol Audit Halal Antar-PTKIN Se-Indonesia',
    category: 'Pelatihan & JULEHA',
    categoryKey: 'training',
    src: '/assets/images/uin_sgd/uin_15.webp',
    date: '28 November 2026',
    location: 'Ruang Rapat Senat Rektorat Lt. 2 UIN Sunan Gunung Djati Bandung',
    description: 'Pertukaran saintifik dan penyusunan standar SOP audit laboratorium terpadu antara 18 LPH Perguruan Tinggi Keagamaan Islam Negeri seluruh Indonesia.',
    auditorLead: 'Forum Kerjasama LPH Perguruan Tinggi Negeri Kemenag RI',
    facility: 'Pusat Keunggulan Riset Halal UIN SGD',
    standard: 'Konsorsium Lembaga Pemeriksa Halal Perguruan Tinggi Islam',
    fullStory: 'Workshop dua hari ini menyepakati manual acuan standar penanganan sampel kritis, validasi metode pengujian DNA qPCR antar-laboratorium, dan digitalisasi pelaporan LPH menuju ekosistem halal cerdas.',
    tags: ['PTKIN Halal', 'Workshop Nasional', 'Harmonisasi SOP', 'Riset Halal'],
  },
  {
    id: 14,
    title: 'Audiensi Rutin Bersama Dewan Fatwa MUI Jabar & Evaluasi Laporan Audit',
    category: 'Kunjungan & MoA',
    categoryKey: 'partnership',
    src: '/assets/images/uin_sgd/uin_16.webp',
    date: '01 Desember 2026',
    location: 'Gedung Majelis Ulama Indonesia Provinsi Jawa Barat, Kota Bandung',
    description: 'Sinkronisasi berkala berkas Laporan Hasil Pemeriksaan (LHP) produk sebelum diajukan ke Sidang Komisi Fatwa MUI untuk penetapan ketetapan kehalalan.',
    auditorLead: 'Pimpinan Komisi Fatwa MUI Jabar & Tim Manajemen LPH UIN SGD',
    facility: 'Sekretariat Komisi Fatwa MUI Jawa Barat',
    standard: 'Peraturan MUI tentang Prosedur Penetapan Fatwa Produk Halal',
    fullStory: 'Pertemuan ini mempererat sinergi antara aspek saintifik yang dilakukan LPH UIN SGD dengan aspek syar’iyah yang menjadi wewenang penuh para ulama Komisi Fatwa MUI Jawa Barat.',
    tags: ['MUI Fatwa', 'Sidang Halal', 'Dewan Syariah', 'Ketetapan Halal'],
  },
  {
    id: 15,
    title: 'Pengujian Laboratorium Mikrobiologi & Deteksi Sanitasi Kontaminan Swab',
    category: 'Laboratorium ISO 17025',
    categoryKey: 'lab',
    src: '/assets/images/beranda_006.jpg',
    date: '04 Desember 2026',
    location: 'Laboratorium Mikrobiologi Pangan Kampus 2 UIN SGD',
    description: 'Analisis mikrobiologis angka lempeng total (ALT), coliform, serta swab permukaan meja potong dan pipa saluran pengalir susu cair.',
    auditorLead: 'Dra. Hj. Neneng Windayani, M.Pd (Spesialis Mikrobiologi Mutu Halal)',
    facility: 'Clean Bench & Inkubator Mikrobiologi Terstandar ISO',
    standard: 'SNI 01-2897-1992 Uji Mikrobiologi Daging, Telur, dan Susu',
    fullStory: 'Selain pemenuhan aspek halal syariah, prinsip thoyyiban (kebersihan, keamanan konsumsi, dan mutu kesehatan) diuji secara objektif di laboratorium untuk memastikan produk yang dikonsumsi masyarakat aman.',
    tags: ['Halal Thayyib', 'Mikrobiologi', 'Swab Test', 'Higienitas'],
  },
  {
    id: 16,
    title: 'Sosialisasi Halal Awareness & Edukasi Kantin Halal Kampus Berkelanjutan',
    category: 'Pelatihan & JULEHA',
    categoryKey: 'training',
    src: '/assets/images/uin_sgd/uin_13.webp',
    date: '07 Desember 2026',
    location: 'Kantin Pusat Mahasiswa Kampus 1 UIN Sunan Gunung Djati Bandung',
    description: 'Pendampingan langsung bagi 45 pedagang kuliner kantin mahasiswa dalam pemisahan peralatan masak dan pemilihan bahan bumbu bersertifikat halal.',
    auditorLead: 'Relawan Duta Halal UIN SGD & Satgas Halal Jawa Barat',
    facility: 'Pusat Kehidupan Kampus Sehat & Halal UIN SGD',
    standard: 'Pilot Project Kantin Halal Kampus Indonesia Sehat',
    fullStory: 'Edukasi praktis ini mengajarkan pedagang kecil cara mengecek logo halal resmi, menghindari bumbu masak curah berisiko non-halal, dan menjaga higienitas tempat pengolahan makanan harian.',
    tags: ['Kantin Halal', 'Edukasi Mahasiswa', 'Halal Awareness', 'UMK Kampus'],
  },
];

const ITEMS_PER_PAGE = 9;

export const GalleryPage: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Filtered gallery items based on category tabs and search keyword
  const filteredItems = useMemo(() => {
    return GALLERY_DATA.filter((item) => {
      const matchCategory =
        activeCategory === 'all' || item.categoryKey === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.location && item.location.toLowerCase().includes(q)) ||
        item.facility.toLowerCase().includes(q) ||
        item.standard.toLowerCase().includes(q) ||
        item.tags?.some((t) => t.toLowerCase().includes(q));

      return matchCategory && matchQuery;
    });
  }, [activeCategory, searchQuery]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const handleCategoryChange = (key: React.Key) => {
    setActiveCategory(key as string);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#FAF7FD] text-[#292333]">
      {/* 1. HERO SECTION WITH ACETERNITY UI SPOTLIGHT & HEROUI BREADCRUMBS */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1a0528] via-[#240638] to-[#1a0528] text-white pt-28 pb-20 sm:pt-36 sm:pb-24 border-b border-[#C9A5E8]/20">
        {/* Aceternity UI Spotlight Effects */}
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#F5D32F" />
        <Spotlight className="top-10 right-0 md:right-40" fill="#C9A5E8" />

        {/* Ambient Decorative Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,211,47,0.06),_transparent_60%)] pointer-events-none" />
        <YellowDotGrid rows={4} cols={6} className="absolute top-12 right-12 opacity-15 pointer-events-none hidden lg:grid" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* HeroUI Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumbs className="text-purple-200">
              <Breadcrumbs.Item href="/">
                <span className="text-purple-300 hover:text-white transition-colors text-xs font-semibold">
                  {isEn ? 'Home' : 'Beranda'}
                </span>
              </Breadcrumbs.Item>
              <Breadcrumbs.Item href="/berita">
                <span className="text-purple-300 hover:text-white transition-colors text-xs font-semibold">
                  {isEn ? 'Publications' : 'Publikasi'}
                </span>
              </Breadcrumbs.Item>
              <Breadcrumbs.Item>
                <span className="text-[#F5D32F] font-bold text-xs">
                  {isEn ? 'Activity Gallery' : 'Galeri Kegiatan'}
                </span>
              </Breadcrumbs.Item>
            </Breadcrumbs>
          </div>

          <div className="max-w-3xl">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7FD]/10 border border-[#C9A5E8]/30 backdrop-blur-md text-[#F5D32F] text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#F5D32F]" />
              <span>{isEn ? 'OFFICIAL DOCUMENTATION & SCIENTIFIC TRACK RECORD' : 'DOKUMENTASI RESMI KEGIATAN & REKAM JEJAK'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              {isEn ? (
                <>
                  Inspection & Halal Laboratory <YellowHighlight>Photo Gallery</YellowHighlight>
                </>
              ) : (
                <>
                  Galeri Dokumentasi & Audit <YellowHighlight>LPH UIN SGD</YellowHighlight>
                </>
              )}
            </h1>

            <p className="mt-5 text-sm sm:text-base lg:text-lg text-purple-100/90 leading-relaxed font-normal">
              {isEn
                ? 'Visual documentation of on-site industrial audits, accredited ISO/IEC 17025 scientific testing, halal slaughterer & supervisor training, and strategic institutional collaborations by LPH UIN Sunan Gunung Djati Bandung.'
                : 'Dokumentasi visual rangkaian audit kehalalan fasilitas industri, pengujian saintifik di laboratorium berakreditasi ISO/IEC 17025, bimbingan teknis penyelia halal & JULEHA, serta kemitraan strategis LPH UIN Sunan Gunung Djati Bandung.'}
            </p>
          </div>

          {/* Key Metric Highlights using HeroUI Card */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              {
                icon: <Building2 className="w-5 h-5 text-[#F5D32F]" />,
                num: '450+',
                label: isEn ? 'Industrial Facilities Audited' : 'Fasilitas Pabrik Diaudit',
              },
              {
                icon: <FlaskConical className="w-5 h-5 text-[#C9A5E8]" />,
                num: '1.200+',
                label: isEn ? 'qPCR & GC-FID Tests Completed' : 'Uji qPCR & GC-FID Selesai',
              },
              {
                icon: <Users className="w-5 h-5 text-[#F5D32F]" />,
                num: '3.500+',
                label: isEn ? 'Supervisors & Butchers Trained' : 'Penyelia & JULEHA Terlatih',
              },
              {
                icon: <Award className="w-5 h-5 text-[#C9A5E8]" />,
                num: '100%',
                label: isEn ? 'Official BPJPH & MUI Compliance' : 'Akreditasi BPJPH & MUI Sah',
              },
            ].map((stat, idx) => (
              <Card
                key={idx}
                className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 text-white hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-xl bg-white/10 shrink-0">{stat.icon}</div>
                  <span className="text-xl sm:text-2xl font-black text-white">{stat.num}</span>
                </div>
                <p className="text-xs text-purple-200/90 font-medium leading-snug">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 2. FILTER & CONTROLS SECTION (HeroUI Tabs & Input) */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-[#C9A5E8]/30 shadow-xs py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Category Tabs using HeroUI v3 Tabs */}
            <div className="overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              <Tabs
                selectedKey={activeCategory}
                onSelectionChange={handleCategoryChange}
                className="min-w-max"
              >
                <Tabs.List className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/40">
                  <Tabs.Tab
                    id="all"
                    className={cn(
                      'px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap',
                      activeCategory === 'all'
                        ? 'bg-[#6B18A8] text-white shadow-xs'
                        : 'text-neutral-700 hover:text-[#6B18A8] hover:bg-[#F5EDFB]'
                    )}
                  >
                    {isEn ? 'All Photos' : 'Semua Kegiatan'} ({GALLERY_DATA.length})
                  </Tabs.Tab>

                  <Tabs.Tab
                    id="audit"
                    className={cn(
                      'px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap',
                      activeCategory === 'audit'
                        ? 'bg-[#6B18A8] text-white shadow-xs'
                        : 'text-neutral-700 hover:text-[#6B18A8] hover:bg-[#F5EDFB]'
                    )}
                  >
                    {isEn ? 'Field Audits' : 'Audit Lapangan'} (4)
                  </Tabs.Tab>

                  <Tabs.Tab
                    id="lab"
                    className={cn(
                      'px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap',
                      activeCategory === 'lab'
                        ? 'bg-[#6B18A8] text-white shadow-xs'
                        : 'text-neutral-700 hover:text-[#6B18A8] hover:bg-[#F5EDFB]'
                    )}
                  >
                    {isEn ? 'ISO 17025 Labs' : 'Laboratorium ISO 17025'} (4)
                  </Tabs.Tab>

                  <Tabs.Tab
                    id="training"
                    className={cn(
                      'px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap',
                      activeCategory === 'training'
                        ? 'bg-[#6B18A8] text-white shadow-xs'
                        : 'text-neutral-700 hover:text-[#6B18A8] hover:bg-[#F5EDFB]'
                    )}
                  >
                    {isEn ? 'Training & JULEHA' : 'Pelatihan & JULEHA'} (4)
                  </Tabs.Tab>

                  <Tabs.Tab
                    id="partnership"
                    className={cn(
                      'px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap',
                      activeCategory === 'partnership'
                        ? 'bg-[#6B18A8] text-white shadow-xs'
                        : 'text-neutral-700 hover:text-[#6B18A8] hover:bg-[#F5EDFB]'
                    )}
                  >
                    {isEn ? 'MoA & Institutional Visits' : 'Kunjungan & MoA'} (4)
                  </Tabs.Tab>
                  <Tabs.Indicator className="bg-[#6B18A8] rounded-xl shadow-xs" />
                </Tabs.List>
              </Tabs>
            </div>

            {/* Search Input using HeroUI Input */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                <Input
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder={isEn ? 'Search photo or topic...' : 'Cari foto kegiatan / topik...'}
                  className="pl-10 pr-4 py-2 text-xs rounded-xl bg-white border border-[#C9A5E8]/40 focus:border-[#6B18A8] focus:ring-2 focus:ring-[#6B18A8]/20 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GALLERY CONTENT (Aceternity UI FocusCards) */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Active Filter Info & Count */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-neutral-500">
                {isEn ? 'Showing' : 'Menampilkan'}
              </span>
              <Chip size="sm" className="bg-[#F5EDFB] text-[#6B18A8] border border-[#C9A5E8]/60 font-bold text-xs">
                {filteredItems.length} {isEn ? 'Photos' : 'Foto Dokumentasi'}
              </Chip>
              {searchQuery && (
                <span className="text-xs text-neutral-500">
                  {isEn ? `for keyword "${searchQuery}"` : `untuk kata kunci "${searchQuery}"`}
                </span>
              )}
            </div>

            <div className="text-xs text-neutral-500 hidden sm:block">
              {isEn ? 'Hover card to focus, click to view full story' : 'Arahkan kursor untuk fokus, klik foto untuk detail lengkap'}
            </div>
          </div>

          {/* If No Items Found */}
          {filteredItems.length === 0 ? (
            <Card className="p-12 text-center rounded-3xl bg-white border border-[#C9A5E8]/30 shadow-xs max-w-xl mx-auto my-12">
              <div className="w-16 h-16 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/40 flex items-center justify-center mx-auto mb-4 text-[#6B18A8]">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-neutral-800 mb-2">
                {isEn ? 'No Documentation Found' : 'Tidak Ada Dokumentasi Ditemukan'}
              </h3>
              <p className="text-xs text-neutral-500 mb-6">
                {isEn
                  ? 'No photos matched your search criteria. Try modifying your search keywords or switching categories.'
                  : 'Tidak ada foto yang cocok dengan kata kunci pencarian Anda. Coba ubah kata kunci atau ganti kategori kegiatan.'}
              </p>
              <Button
                variant="primary"
                onPress={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="bg-[#6B18A8] text-white text-xs font-bold px-6 py-2 rounded-xl mx-auto"
              >
                {isEn ? 'Reset Filter' : 'Reset Pencarian & Kategori'}
              </Button>
            </Card>
          ) : (
            <>
              {/* Aceternity UI Focus Cards Grid */}
              <FocusCards
                cards={paginatedItems}
                onSelectCard={(item) => setSelectedItem(item as GalleryItem)}
              />

              {/* 4. HEROUI V3 PAGINATION COMPONENT */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 shadow-xs">
                    <Pagination.Summary className="text-xs sm:text-sm text-neutral-600 font-semibold">
                      {isEn
                        ? `Showing page ${currentPage} of ${totalPages} (${filteredItems.length} total photos)`
                        : `Menampilkan halaman ${currentPage} dari ${totalPages} (${filteredItems.length} total foto kegiatan)`}
                    </Pagination.Summary>

                    <Pagination.Content className="flex items-center gap-1.5 flex-wrap justify-center">
                      <Pagination.Item>
                        <Pagination.Previous
                          onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          isDisabled={currentPage === 1}
                          className="cursor-pointer px-3.5 py-1.5 text-xs font-bold rounded-xl border border-neutral-200 bg-white hover:bg-[#FAF7FD] hover:text-[#6B18A8] hover:border-[#C9A5E8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 shadow-2xs"
                        >
                          <span>{isEn ? 'Previous' : 'Sebelumnya'}</span>
                        </Pagination.Previous>
                      </Pagination.Item>

                      {Array.from({ length: totalPages }).map((_, idx) => {
                        const pageNum = idx + 1;
                        const isActive = currentPage === pageNum;
                        return (
                          <Pagination.Item key={pageNum}>
                            <Pagination.Link
                              isActive={isActive}
                              onPress={() => setCurrentPage(pageNum)}
                              className={cn(
                                'cursor-pointer w-9 h-9 flex items-center justify-center text-xs font-bold rounded-xl transition-all',
                                isActive
                                  ? 'bg-[#6B18A8] text-white shadow-md shadow-purple-950/25 font-black border border-[#6B18A8]'
                                  : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-[#FAF7FD] hover:text-[#6B18A8] hover:border-[#C9A5E8]'
                              )}
                            >
                              {pageNum}
                            </Pagination.Link>
                          </Pagination.Item>
                        );
                      })}

                      <Pagination.Item>
                        <Pagination.Next
                          onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          isDisabled={currentPage === totalPages}
                          className="cursor-pointer px-3.5 py-1.5 text-xs font-bold rounded-xl border border-neutral-200 bg-white hover:bg-[#FAF7FD] hover:text-[#6B18A8] hover:border-[#C9A5E8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 shadow-2xs"
                        >
                          <span>{isEn ? 'Next' : 'Selanjutnya'}</span>
                        </Pagination.Next>
                      </Pagination.Item>
                    </Pagination.Content>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* 5. PRE-FOOTER INVITATION / AUDIT REGISTRATION BANNER */}
      <section className="pb-24 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="rounded-3xl bg-gradient-to-r from-[#240638] via-[#4B0D78] to-[#240638] text-white p-8 sm:p-12 relative overflow-hidden border border-[#C9A5E8]/40 shadow-2xl">
            {/* Ambient decorative glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,_rgba(245,211,47,0.15),_transparent_70%)] pointer-events-none" />
            <YellowDotGrid rows={3} cols={5} className="absolute bottom-6 right-8 opacity-20 pointer-events-none hidden md:grid" />

            <div className="relative z-10 max-w-2xl">
              <span className="text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-[#FFF7D1] text-[#713f12] border border-[#F5D32F] mb-4 inline-block">
                {isEn ? 'HALAL AUDIT & SCIENTIFIC COLLABORATION' : 'KONSULTASI & JADWAL AUDIT HALAL'}
              </span>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2 leading-snug">
                {isEn
                  ? 'Ready to Certify Your Production Facility with LPH UIN SGD?'
                  : 'Ingin Memeriksakan Kehalalan Produk & Menguji Sampel di LPH UIN SGD?'}
              </h2>

              <p className="text-xs sm:text-sm text-purple-100/90 mt-3 leading-relaxed">
                {isEn
                  ? 'Simulate your official regular certification fees according to KMA 784, schedule on-site facility audits, or request ISO 17025 accredited laboratory testing.'
                  : 'Hitung simulasi tarif resmi sesuai regulasi KMA 784, jadwalkan pemeriksaan fasilitas industri, atau konsultasikan kebutuhan uji qPCR & GC-FID bersama tim ahli kami.'}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-8">
                <Link to="/layanan/kalkulator">
                  <Button
                    variant="primary"
                    className="bg-[#F5D32F] hover:bg-[#ffe358] text-[#4B0D78] font-black text-xs px-6 py-3 rounded-xl shadow-lg shadow-yellow-500/20"
                  >
                    {isEn ? 'Calculate Halal Fee' : 'Simulasi Tarif Halal'}
                  </Button>
                </Link>

                <Link to="/kontak">
                  <Button
                    variant="secondary"
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs px-6 py-3 rounded-xl backdrop-blur-md"
                  >
                    {isEn ? 'Contact Audit Secretariat' : 'Hubungi Sekretariat LPH'}
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 6. HEROUI V3 MODAL LIGHTBOX FOR DETAILED ACTIVITY VIEW */}
      <Modal.Backdrop
        isOpen={!!selectedItem}
        onOpenChange={(isOpen) => {
          if (!isOpen) setSelectedItem(null);
        }}
      >
        <Modal.Container placement="center">
          <Modal.Dialog className="max-w-3xl sm:max-w-4xl p-0 overflow-hidden rounded-3xl bg-white border border-[#C9A5E8]/40 shadow-2xl">
            <Modal.CloseTrigger />

            {selectedItem && (
              <>
                <Modal.Header className="p-6 sm:p-7 bg-gradient-to-r from-[#FAF7FD] via-white to-[#FAF7FD] border-b border-[#C9A5E8]/30">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FFF7D1] text-[#713f12] border border-[#F5D32F]">
                      {selectedItem.category}
                    </span>
                    <span className="text-xs text-neutral-500 flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#6B18A8]" />
                      {selectedItem.date}
                    </span>
                  </div>

                  <Modal.Heading className="text-xl sm:text-2xl font-black text-[#292333] leading-snug">
                    {selectedItem.title}
                  </Modal.Heading>
                </Modal.Header>

                <Modal.Body className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
                  {/* Big Crisp Preview Image */}
                  <div className="relative rounded-2xl overflow-hidden border border-[#C9A5E8]/30 shadow-md h-64 sm:h-96 w-full bg-neutral-900">
                    <img
                      src={selectedItem.src}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#F5D32F]" />
                      <span>{isEn ? 'Verified Documentation' : 'Dokumentasi Resmi Terverifikasi'}</span>
                    </div>
                  </div>

                  {/* Metadata Specification Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#6B18A8] mb-1">
                        <MapPin className="w-4 h-4 text-[#6B18A8]" />
                        <span>{isEn ? 'Location / Facility' : 'Lokasi & Fasilitas'}</span>
                      </div>
                      <p className="text-xs text-neutral-700 font-semibold">{selectedItem.location}</p>
                      <p className="text-[11px] text-neutral-500 mt-0.5">{selectedItem.facility}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#6B18A8] mb-1">
                        <UserCheck className="w-4 h-4 text-[#6B18A8]" />
                        <span>{isEn ? 'Lead Auditor / Personnel' : 'Auditor / Personel Penanggung Jawab'}</span>
                      </div>
                      <p className="text-xs text-neutral-700 font-semibold">{selectedItem.auditorLead}</p>
                      <p className="text-[11px] text-neutral-500 mt-0.5">{selectedItem.standard}</p>
                    </div>
                  </div>

                  {/* Detailed Description */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B18A8] mb-2">
                      {isEn ? 'Inspection Context & Summary' : 'Uraian Pelaksanaan Kegiatan'}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                      {selectedItem.fullStory}
                    </p>
                  </div>

                  {/* Tags */}
                  {selectedItem.tags && selectedItem.tags.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-neutral-100">
                      <span className="text-[11px] font-bold text-neutral-500 mr-1">Tags:</span>
                      {selectedItem.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-[#FAF7FD] text-[#6B18A8] border border-[#C9A5E8]/40"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Modal.Body>

                <Modal.Footer className="p-4 sm:p-6 bg-[#FAF7FD] border-t border-[#C9A5E8]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      onPress={() => window.open(selectedItem.src, '_blank')}
                      className="text-xs font-bold text-neutral-700 border border-neutral-200 bg-white hover:bg-neutral-50 rounded-xl px-3.5 py-2 flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{isEn ? 'View Original' : 'Buka Foto Asli'}</span>
                    </Button>
                  </div>

                  <Button
                    variant="primary"
                    slot="close"
                    className="bg-[#6B18A8] text-white text-xs font-bold px-6 py-2 rounded-xl"
                  >
                    {isEn ? 'Close' : 'Tutup'}
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </div>
  );
};

export default GalleryPage;

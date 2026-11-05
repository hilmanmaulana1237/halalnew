import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Card, Modal, Tabs } from '@heroui/react';
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  FileCheck,
  FileText,
  FlaskConical,
  GraduationCap,
  HelpCircle,
  MapPin,
  MessageCircle,
  Microscope,
  Newspaper,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
  Utensils,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HeroVideoBanner } from '@/components/ui/hero-video-banner';
import { MetricCard } from '@/components/ui/metric-card';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { Spotlight } from '@/components/ui/spotlight';
import { SectionHeader } from '@/components/ui/section-header';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { MovingBorderButton } from '@/components/ui/moving-border';
import { TimelineSteps } from '@/components/ui/timeline-steps';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { useLanguage } from '@/context/LanguageContext';

interface Director {
  id: number;
  name: string;
  position: string;
  image: string;
  quote?: string;
  education: string[];
  experience: string[];
}

export const getDirectors = (isEn: boolean): Director[] => [
  {
    id: 1,
    name: 'Prof. Dr. H. Rosihon Anwar, M.Ag.',
    position: isEn
      ? 'Rector of UIN SGD Bandung / Halal Center Advisory Board'
      : 'Rektor UIN SGD Bandung / Dewan Pembina Halal Center',
    image: '/assets/images/uin_sgd/director_rosihon.webp',
    quote: isEn
      ? 'UIN Sunan Gunung Djati Bandung dedicates its entire academic potential, halal science research, and accredited laboratories to accelerate a credible and high-integrity global halal industry ecosystem.'
      : 'UIN Sunan Gunung Djati Bandung mendedikasikan seluruh potensi akademik, riset sains halal, dan laboratorium untuk mengakselerasi ekosistem industri halal global yang kredibel dan maslahat.',
    education: isEn
      ? [
          'Professor of Quranic Exegesis & Tafsir, UIN Sunan Gunung Djati Bandung',
          'Doctor (Ph.D) in Islamic Studies / Tafsir Hadith Postgraduate School UIN SGD Bandung',
          'Master of Arts (M.Ag) in Islamic Thought, UIN SGD Bandung',
          'Bachelor of Theology & Islamic Studies (S.Ag), Faculty of Ushuluddin UIN SGD Bandung',
        ]
      : [
          "Guru Besar Ilmu Al-Qur'an dan Tafsir UIN Sunan Gunung Djati Bandung",
          'Doktor (S3) Studi Islam / Tafsir Hadis Pascasarjana UIN SGD Bandung',
          'Magister Agama (S2) Pemikiran Islam UIN SGD Bandung',
          'Sarjana Agama (S1) Fakultas Ushuluddin UIN SGD Bandung',
        ],
    experience: isEn
      ? [
          'Rector of UIN Sunan Gunung Djati Bandung (2023 - Present)',
          'Main Pioneer & Institutional Architect of the "Halalsphere University" Paradigm',
          'Advisory Board Member of LPH and LP3H Halal Center UIN Sunan Gunung Djati',
          'Vice Rector for Academic Affairs, UIN Sunan Gunung Djati Bandung (2019 - 2023)',
        ]
      : [
          'Rektor UIN Sunan Gunung Djati Bandung (2023 - Sekarang)',
          'Inisiator & Pengarah Utama Paradigma "Halalsphere University"',
          'Dewan Pembina LPH dan LP3H Halal Center UIN Sunan Gunung Djati',
          'Wakil Rektor Bidang Akademik UIN Sunan Gunung Djati Bandung (2019 - 2023)',
        ],
  },
  {
    id: 2,
    name: 'Dr. Tri Cahyanto, M.Si.',
    position: isEn
      ? 'Head of Halal Center UIN SGD'
      : 'Kepala Halal Center UIN SGD',
    image: '/assets/images/uin_sgd/director_tri.webp',
    quote: isEn
      ? "LPH and LP3H Halal Center UIN SGD are committed to delivering swift, transparent, and accountable inspection grounded in Sharia compliance and ISO/IEC 17025 laboratory precision."
      : "LPH dan LP3H Halal Center UIN SGD berkomitmen memberikan pelayanan prima, cepat, akuntabel, dan berbasis integritas syar'i serta pengujian laboratorium yang presisi demi melindungi hak konsumen muslim.",
    education: isEn
      ? [
          'Doctor (Ph.D) in Biological Sciences & Applied Life Sciences',
          'Master of Science (M.Si) in Conservation Biology & Molecular Authentication',
          'Certified Lead Halal Auditor Licensed by BPJPH Ministry of Religious Affairs & MUI',
          'Certified Competency Assessor for Halal Product Assurance (JPH)',
        ]
      : [
          'Doktor (S3) Ilmu Biologi & Sains Hayati Terapan',
          'Magister Sains (S2) Biologi Konservasi & Autentikasi Produk',
          'Pelatihan & Sertifikasi Lead Auditor Halal Berlisensi BPJPH & MUI',
          'Sertifikasi Kompetensi Asesor Pengawas Jaminan Produk Halal',
        ],
    experience: isEn
      ? [
          'Head of Halal Center, UIN Sunan Gunung Djati Bandung',
          'Operational & Technical Lead of LPH UIN Sunan Gunung Djati Bandung',
          'National Coordinator of Halal Process Mentoring Body (LP3H) UIN SGD',
          'Senior Lecturer & Researcher in Halal Molecular Bio-Testing',
        ]
      : [
          'Kepala Pusat Kajian Halal (Halal Center) UIN SGD Bandung',
          'Pimpinan Teknis Operasional LPH UIN Sunan Gunung Djati Bandung',
          'Koordinator Nasional Lembaga Pendamping PPH (LP3H) UIN SGD',
          'Dosen & Peneliti Laboratorium Pengujian Autentikasi Kehalalan Hayati',
        ],
  },
];

export const DIRECTORS: Director[] = getDirectors(false);

export const getUinServices = (isEn: boolean) => [
  {
    title: isEn ? 'Self-Declare Halal Certification' : 'Sertifikasi Halal Self Declare',
    description: isEn
      ? 'Free, accredited halal product process mentoring tailored for micro and small enterprises (MSEs).'
      : 'Fasilitasi pendampingan proses produk halal secara gratis dan terakreditasi khusus untuk pelaku usaha mikro & kecil (UMK).',
    url: 'https://halal.uinsgd.ac.id/sertifikasi-halal-self-declare/',
    icon: <Users className="w-6 h-6 text-[#6b1282]" />,
    badge: isEn ? 'MSE Program' : 'Program UMK',
    accentColor: 'purple' as const,
    colSpan: 'md:col-span-1',
  },
  {
    title: isEn ? 'Regular Halal Certification' : 'Sertifikasi Halal Reguler',
    description: isEn
      ? 'Comprehensive scientific inspection and audit for medium and large industries by certified BPJPH & MUI auditors.'
      : 'Pemeriksaan dan audit saintifik komprehensif bagi industri menengah dan besar oleh auditor halal bersertifikasi nasional BPJPH & MUI.',
    url: 'https://lph.uinsgd.ac.id/',
    icon: <ShieldCheck className="w-6 h-6 text-[#6b1282]" />,
    badge: isEn ? 'Accredited LPH' : 'LPH Terakreditasi',
    accentColor: 'purple' as const,
    colSpan: 'md:col-span-2',
  },
  {
    title: isEn ? 'Certification & Regulatory Advisory' : 'Konsultasi Sertifikasi & Regulasi',
    description: isEn
      ? 'In-person and virtual consultation regarding ingredient eligibility, Halal Assurance Systems, and BPJPH guidelines.'
      : 'Layanan konsultasi tatap muka maupun daring mengenai kelayakan bahan baku, sistem jaminan halal, dan regulasi BPJPH.',
    url: 'https://wa.me/6282118201232',
    icon: <Phone className="w-6 h-6 text-[#6b1282]" />,
    badge: isEn ? 'Fast Response' : 'Layanan Cepat',
    accentColor: 'purple' as const,
    colSpan: 'md:col-span-1',
  },
  {
    title: isEn ? 'Halal Research & Publications' : 'Publikasi Artikel & Riset Halal',
    description: isEn
      ? 'Scientific publications in the SINTA-accredited Indonesian Journal of Halal Research (IJHR) in halal bio-science.'
      : 'Penerbitan jurnal ilmiah berkala Indonesian Journal of Halal Research (IJHR) terakreditasi SINTA bidang kehalalan hayati.',
    url: 'https://journal.uinsgd.ac.id/index.php/ijhar',
    icon: <BookOpen className="w-6 h-6 text-[#6b1282]" />,
    badge: isEn ? 'SINTA Research' : 'Riset SINTA',
    accentColor: 'purple' as const,
    colSpan: 'md:col-span-1',
  },
  {
    title: isEn ? 'Halal Mentoring Body (LP3H)' : 'Lembaga Pendamping PPH (LP3H)',
    description: isEn
      ? 'Training and coordinating thousands of verified PPH assistants safeguarding product integrity across West Java.'
      : 'Mencetak dan mengoordinasikan ribuan pendamping PPH terverifikasi untuk mengawal kehalalan produk di seluruh pelosok Jawa Barat.',
    url: 'https://halal.uinsgd.ac.id/lembaga-pendamping-proses-produk-halal-lp3h',
    icon: <Award className="w-6 h-6 text-[#6b1282]" />,
    badge: isEn ? 'Thousands of Cadres' : 'Ribuan Kader',
    accentColor: 'purple' as const,
    colSpan: 'md:col-span-1',
  },
  {
    title: isEn ? 'Halal Training Center (JPH)' : 'Lembaga Pelatihan JPH',
    description: isEn
      ? 'Official competency certification programs for Halal Supervisors, Halal Auditors, and enterprise QA management.'
      : 'Program sertifikasi kompetensi resmi untuk Penyelia Halal, Auditor Halal, dan tim manajemen mutu perusahaan.',
    url: 'https://halal.uinsgd.ac.id/lembaga-pelatihan-jaminan-produk-halal-jph/',
    icon: <GraduationCap className="w-6 h-6 text-[#6b1282]" />,
    badge: isEn ? 'Certified Training' : 'Pelatihan Resmi',
    accentColor: 'purple' as const,
    colSpan: 'md:col-span-1',
  },
  {
    title: isEn ? 'Halal Slaughterer Academy (JULEHA)' : 'Akademi Juru Sembelih Halal (JULEHA)',
    description: isEn
      ? 'Education and standardization of Sharia-compliant slaughtering methods for ruminant and poultry slaughterers.'
      : 'Pendidikan dan standarisasi teknik penyembelihan syar’i bagi juru sembelih RPH ruminansia dan unggas bersertifikat BNSP.',
    url: 'https://halal.uinsgd.ac.id/akademi-juru-sembelih-halal-juleha/',
    icon: <Utensils className="w-6 h-6 text-[#6b1282]" />,
    badge: isEn ? 'Sharia Compliant' : 'Standar Syar’i',
    accentColor: 'purple' as const,
    colSpan: 'md:col-span-1',
  },
  {
    title: isEn ? 'Integrated Halal Testing Laboratory' : 'Laboratorium Pengujian Halal Terpadu',
    description: isEn
      ? 'High-precision scientific testing: Porcine DNA qPCR detection, ethanol residuals (GC-FID), and gelatin analysis.'
      : 'Uji saintifik presisi tinggi: Deteksi DNA Babi qPCR, Uji Cemaran Etanol (GC-FID), serta analisa gelatin dan profil asam lemak.',
    url: 'https://halal.uinsgd.ac.id/laboratorium-pengujian-halal/',
    icon: <FlaskConical className="w-6 h-6 text-[#6b1282]" />,
    badge: 'ISO/IEC 17025',
    accentColor: 'purple' as const,
    colSpan: 'md:col-span-1',
  },
];

const PARTNER_ITEMS = [
  { name: 'Kementerian Agama RI & BPJPH', image: '/assets/images/uin_sgd/uin_18.webp', alt: 'Kemenag RI BPJPH' },
  { name: 'Komite Akreditasi Nasional (KAN)', image: '/assets/images/uin_sgd/uin_23.webp', alt: 'KAN' },
  { name: 'Majelis Ulama Indonesia (MUI)', image: '/assets/images/uin_sgd/uin_21.webp', alt: 'MUI' },
  { name: 'UIN Sunan Gunung Djati Bandung', image: '/assets/images/uin_sgd/uin_20.webp', alt: 'UIN SGD Bandung' },
  { name: 'Lembaga Pemeriksa Halal Resmi', image: '/assets/images/uin_sgd/uin_19.webp', alt: 'LPH' },
  { name: 'Badan Penyelenggara Jaminan Produk Halal', image: '/assets/images/uin_sgd/uin_18.webp', alt: 'BPJPH Kemenag' },
];

export const HomePage: React.FC = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  const directors = getDirectors(isEn);
  const uinServices = getUinServices(isEn);
  const [activeTab, setActiveTab] = useState<string>('artikel');
  const [selectedDirector, setSelectedDirector] = useState<Director | null>(null);
  const [selectedBranch, setSelectedBranch] = useState(0);
  const [mapViewMode, setMapViewMode] = useState<'google' | 'osm'>('google');

  const branchLocations = [
    {
      id: 'kampus1',
      title: isEn ? 'Campus 1 (LPH Headquarters & Secretariat)' : 'Kampus 1 (Kantor Pusat LPH & Sekretariat)',
      badge: isEn ? 'Main Secretariat' : 'Sekretariat Utama',
      shortName: 'Kampus 1 Cibiru',
      address: 'Gedung Lecture Hall Lt. 1, Kampus 1 UIN SGD, Jl. A.H. Nasution No. 105, Cipadung, Kec. Cibiru, Kota Bandung, Jawa Barat 40614',
      lat: -6.9248,
      lng: 107.7176,
      query: '-6.9248,107.7176+(LPH+UIN+Sunan+Gunung+Djati+Bandung)',
      gmapsDirectUrl: 'https://maps.google.com/?q=-6.9248,107.7176',
    },
    {
      id: 'kampus2',
      title: isEn ? 'Campus 2 (Integrated Lab ISO 17025)' : 'Kampus 2 (Lab Riset Terpadu ISO 17025)',
      badge: 'ISO/IEC 17025',
      shortName: 'Kampus 2 Gedebage',
      address: 'Gedung Riset & Laboratorium Terpadu, Kampus 2 UIN SGD, Jl. Cimencrang, Gedebage, Kota Bandung 40294 (Dekat Masjid Raya Al-Jabbar)',
      lat: -6.9389,
      lng: 107.7025,
      query: '-6.9389,107.7025+(Laboratorium+Halal+Kampus+2+UIN+Sunan+Gunung+Djati)',
      gmapsDirectUrl: 'https://maps.google.com/?q=-6.9389,107.7025',
    },
    {
      id: 'priangan',
      title: isEn ? 'Eastern Priangan Partnership Hub' : 'Sentra Halal UMK Priangan Timur',
      badge: isEn ? 'Tasikmalaya & Garut' : 'Tasikmalaya & Garut',
      shortName: 'Priangan Timur',
      address: 'Pusat Kemitraan & Pendampingan Halal UMK Wilayah Priangan Timur (Tasikmalaya, Garut, Ciamis), Jawa Barat',
      lat: -7.3274,
      lng: 108.2207,
      query: '-7.3274,108.2207+(Sentra+Halal+UIN+SGD+Priangan+Timur)',
      gmapsDirectUrl: 'https://maps.google.com/?q=-7.3274,108.2207',
    },
    {
      id: 'cirebon',
      title: isEn ? 'Ciayumajakuning Partnership Hub' : 'Sentra Halal UMK Ciayumajakuning',
      badge: isEn ? 'Cirebon Region' : 'Wilayah Cirebon',
      shortName: 'Ciayumajakuning',
      address: 'Pusat Kemitraan & Pendampingan Halal UMK Wilayah Ciayumajakuning (Cirebon, Indramayu, Majalengka, Kuningan), Jawa Barat',
      lat: -6.7320,
      lng: 108.5523,
      query: '-6.7320,108.5523+(Sentra+Halal+UIN+SGD+Ciayumajakuning)',
      gmapsDirectUrl: 'https://maps.google.com/?q=-6.7320,108.5523',
    },
  ];

  useEffect(() => {
    if (mapViewMode !== 'osm') return;
    let mapInstance: L.Map | null = null;
    let timer1: any = null;
    let timer2: any = null;

    try {
      const mapContainer = document.getElementById('map');
      if (mapContainer && !(mapContainer as any)._leaflet_id) {
        const bounds = L.latLngBounds([-11.0, 95.0], [6.0, 141.0]);
        const cur = branchLocations[selectedBranch];
        mapInstance = L.map('map', {
          center: [cur.lat, cur.lng],
          zoom: 11,
          maxBounds: bounds,
          maxBoundsViscosity: 1.0,
          minZoom: 5,
          maxZoom: 18,
          zoomControl: true,
          scrollWheelZoom: false,
        });

        // 100% Free OpenStreetMap Standard Tiles - Absolutely Zero API Key Needed
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(mapInstance);

        const svgMarker = `
          <svg width="34" height="44" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="markerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#6b1282" />
                <stop offset="100%" stop-color="#4a0d5c" />
              </linearGradient>
            </defs>
            <path d="M15 0C8 0 3 6 3 13c0 8 12 26 12 26s12-18 12-26c0-7-5-13-12-13z" fill="url(#markerGrad)" stroke="#ffffff" stroke-width="2.5"/>
            <circle cx="15" cy="13" r="5" fill="#ffffff"/>
          </svg>`;

        const customIcon = L.divIcon({
          className: 'leaflet-custom-marker',
          html: svgMarker,
          iconSize: [34, 44],
          iconAnchor: [17, 44],
          popupAnchor: [0, -40],
        });

        branchLocations.forEach((loc) => {
          const marker = L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(mapInstance!);
          marker.bindPopup(`
            <div style="font-family: inherit; padding: 6px; min-width: 220px;">
              <span style="font-size: 10px; font-weight: 800; color: #6b1282; text-transform: uppercase;">${loc.badge}</span>
              <h5 style="font-size: 13px; font-weight: 800; color: #1b183a; margin-top: 2px; margin-bottom: 4px;">${loc.title}</h5>
              <p style="font-size: 11px; color: #4b5563; line-height: 1.4; margin-bottom: 0;">${loc.address}</p>
            </div>
          `);
        });

        const refreshMapSize = () => {
          if (mapInstance) {
            mapInstance.invalidateSize();
          }
        };
        refreshMapSize();
        timer1 = setTimeout(refreshMapSize, 300);
        timer2 = setTimeout(refreshMapSize, 800);
        window.addEventListener('resize', refreshMapSize);
      }
    } catch (e) {
      console.warn('Leaflet map error:', e);
    }

    return () => {
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
      window.removeEventListener('resize', () => { });
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [mapViewMode, selectedBranch]);

  return (
    <div className="flex flex-col w-full overflow-hidden bg-white">
      {/* 1. HERO BANNER WITH VIDEO & SEARCH CARD (Aceternity UI Rebuild) */}
      <HeroVideoBanner />

      {/* 2. STATS SECTION (Untitled UI Metric Cards Row - 1/3 Dark Purple Overlap, 2/3 Light) */}
      <section className="relative z-30 w-full pb-10 sm:pb-14">
        {/* Top 1/3 dark purple-black background connecting seamlessly to Hero */}
        <div className="absolute top-0 inset-x-0 h-1/3 sm:h-[35%] bg-[#1a0726] -mt-px pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(107,18,130,0.3),_transparent_75%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <MetricCard
              label={t('metric_exp_label')}
              value="8+"
              numberTarget={8}
              suffix="+"
              change={t('metric_exp_change')}
              isPositive={true}
              accentColor="purple"
              description={t('metric_exp_desc')}
              icon={<Award className="w-5 h-5" />}
            />
            <MetricCard
              label={t('metric_certs_label')}
              value="1.000+"
              numberTarget={1000}
              suffix="+"
              change="+28% YoY"
              isPositive={true}
              accentColor="purple"
              description={t('metric_certs_desc')}
              icon={<FileCheck className="w-5 h-5" />}
            />
            <MetricCard
              label={t('metric_auditors_label')}
              value="100+"
              numberTarget={100}
              suffix="+"
              change={t('metric_auditors_change')}
              isPositive={true}
              accentColor="purple"
              description={t('metric_auditors_desc')}
              icon={<Users className="w-5 h-5" />}
            />
            <MetricCard
              label={t('metric_lab_label')}
              value="ISO 17025"
              suffix=""
              change={t('metric_lab_change')}
              isPositive={true}
              accentColor="purple"
              description={t('metric_lab_desc')}
              icon={<FlaskConical className="w-5 h-5" />}
            />
          </div>
        </div>
      </section>

      {/* 3. ABOUT HALAL CENTER SECTION (Classy Pearl Background) */}
      <section className="py-20 lg:py-28 bg-[#faf8fc] border-y border-neutral-200/70" id="tentang">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Certificate Visual with Aceternity BackgroundGradient Glow */}
            <div className="lg:col-span-5 flex justify-center">
              <BackgroundGradient className="rounded-[22px] p-2 bg-white">
                <div className="relative rounded-2xl overflow-hidden bg-white p-3">
                  <img
                    src="/assets/images/certificate.png"
                    alt="Sertifikat Akreditasi LPH UIN SGD"
                    className="w-full max-h-[460px] object-contain rounded-xl"
                  />
                  <div className="mt-4 flex items-center justify-between text-xs font-semibold px-2">
                    <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      {isEn ? 'Official BPJPH Accreditation' : 'Akreditasi Resmi BPJPH'}
                    </span>
                    <span className="text-purple-700 font-mono font-bold">No. Reg: LPH-018-ID</span>
                  </div>
                </div>
              </BackgroundGradient>
            </div>

            {/* Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-[#6b1282] border border-purple-200 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {isEn ? 'About Us' : 'Tentang Kami'}
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a0726] tracking-tight leading-snug">
                {isEn ? 'Halal Center UIN SGD Through the ' : 'Pusat Halal UIN SGD Melalui Konsep '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6b1282] to-[#86198f]">
                  “Halalsphere University”
                </span>
              </h2>

              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
                {isEn
                  ? 'Halal Center UIN Sunan Gunung Djati Bandung is committed to becoming a leading institution in developing national and global halal ecosystems. As a certified Halal Inspection Agency (LPH) and Halal Process Mentoring Body (LP3H) accredited by BPJPH Ministry of Religious Affairs, we uphold strict audit standards, precision scientific laboratory testing, and premium mentoring for all business enterprises.'
                  : 'Pusat Halal (Halal Center) UIN Sunan Gunung Djati Bandung berkomitmen untuk menjadi lembaga terdepan dalam pengembangan ekosistem halal nasional dan global. Sebagai Lembaga Pemeriksa Halal (LPH) dan Lembaga Pendamping Proses Produk Halal (LP3H) terakreditasi BPJPH Kementerian Agama RI, kami senantiasa menjaga standar mutu pemeriksaan, pengujian laboratorium saintifik presisi, dan pendampingan prima bagi seluruh pelaku usaha.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#6b1282] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 text-sm">
                      {isEn ? 'Sharia Integrity' : 'Integritas Syar’i'}
                    </h4>
                    <p className="text-xs text-neutral-600 mt-1">
                      {isEn
                        ? 'Absolute compliance with MUI fatwas and halal product assurance regulations.'
                        : 'Kepatuhan mutlak terhadap fatwa MUI dan regulasi jaminan produk halal.'}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#6b1282] flex items-center justify-center shrink-0">
                    <Microscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 text-sm">
                      {isEn ? 'Scientific & Precision' : 'Saintifik & Presisi'}
                    </h4>
                    <p className="text-xs text-neutral-600 mt-1">
                      {isEn
                        ? 'ISO 17025 accredited laboratory testing for porcine DNA and ethanol contamination.'
                        : 'Laboratorium pengujian DNA babi dan cemaran alkohol terakreditasi ISO 17025.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link to="/tentang">
                  <Button
                    variant="primary"
                    className="bg-[#6b1282] hover:bg-[#581c87] text-white font-bold px-7 py-3 rounded-xl text-sm shadow-md shadow-purple-950/15"
                  >
                    {isEn ? 'View Full Profile' : 'Lihat Profil Lengkap'}
                  </Button>
                </Link>
                <Link to="/layanan/kalkulator">
                  <Button
                    variant="outline"
                    className="border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-semibold px-7 py-3 rounded-xl text-sm"
                  >
                    {isEn ? 'Start Halal Certification' : 'Mulai Sertifikasi Halal'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TWO MAIN SERVICES CARDS (Crisp Pure White) */}
      <section className="py-20 lg:py-24 bg-white" id="layanan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={isEn ? 'CORE SERVICES' : 'LAYANAN UTAMA'}
            badgeColor="purple"
            title={isEn ? 'Excellence in Every Step of Halal Certification' : 'Kemudahan dalam Setiap Langkah Sertifikasi Halal'}
            subtitle={isEn
              ? 'Comprehensive end-to-end inspection ensuring your products meet both Islamic sharia requirements and government regulations.'
              : 'Pemeriksaan komprehensif dari hulu ke hilir untuk memastikan produk Anda memenuhi syarat syariah dan regulasi pemerintah.'}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 - LPH & LP3H */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl border border-purple-100 bg-white overflow-hidden shadow-lg shadow-purple-950/5 hover:shadow-xl hover:shadow-purple-950/10 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/assets/images/pemeriksaaan-kehalalan-produk.jpg"
                    alt="Pemeriksaan Kehalalan Produk"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#6b1282] text-white shadow-md">
                      LPH &amp; LP3H
                    </span>
                  </div>
                </div>
                <div className="p-7 pb-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1a0726]">
                    {isEn ? 'Product Halal Inspection (LPH & LP3H)' : 'Pemeriksaan Kehalalan Produk (LPH & LP3H)'}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed mt-3">
                    {isEn
                      ? 'Core services of LPH UIN SGD encompassing thorough evaluations of production processes, raw materials, and Halal Assurance Systems (SJPH) for both regular industrial audits and MSE Self-Declare programs.'
                      : 'Layanan utama LPH UIN SGD mencakup pemeriksaan menyeluruh terhadap proses produksi, bahan baku, dan Sistem Jaminan Produk Halal (SJPH) baik untuk jalur reguler industri maupun pendampingan Self Declare UMK melalui LP3H.'}
                  </p>
                </div>
              </div>
              <div className="p-7 pt-4 flex items-center justify-between border-t border-neutral-100 mt-4">
                <Link to="/layanan/kalkulator">
                  <Button variant="primary" className="bg-[#6b1282] hover:bg-[#581c87] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md">
                    {isEn ? 'Calculate Estimated Cost' : 'Hitung Estimasi Biaya'}
                  </Button>
                </Link>
                <Link to="/tentang" className="text-xs font-bold text-[#6b1282] hover:underline flex items-center gap-1">
                  {isEn ? 'View Details' : 'Lihat Detail'} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Card 2 - Lab Terpadu */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl border border-purple-100 bg-white overflow-hidden shadow-lg shadow-purple-950/5 hover:shadow-xl hover:shadow-purple-950/10 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/assets/images/uji-laboratorium.jpg"
                    alt="Uji Laboratorium & Pelatihan Halal"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#6b1282] text-white shadow-md">
                      {isEn ? 'Integrated Laboratory' : 'Laboratorium Terpadu'}
                    </span>
                  </div>
                </div>
                <div className="p-7 pb-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1a0726]">
                    {isEn ? 'Laboratory Testing & Halal Training' : 'Uji Laboratorium & Pelatihan Halal'}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed mt-3">
                    {isEn
                      ? 'Integrated Laboratory services for manufacturers to verify halal compliance (qPCR porcine DNA detection, alcohol, gelatin) and competency training for certified Halal Slaughterers (JULEHA) and Supervisors.'
                      : 'Layanan pengujian Laboratorium Terpadu bagi produsen untuk mematuhi regulasi halal (deteksi DNA babi qPCR, alkohol, gelatin) serta pelatihan kompetensi Juru Sembelih Halal (JULEHA) dan Penyelia Halal terakreditasi.'}
                  </p>
                </div>
              </div>
              <div className="p-7 pt-4 flex items-center justify-between border-t border-neutral-100 mt-4">
                <Link to="/kontak">
                  <Button variant="primary" className="bg-[#6b1282] hover:bg-[#581c87] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md">
                    {isEn ? 'Book Lab Testing' : 'Reservasi Pengujian Lab'}
                  </Button>
                </Link>
                <Link to="/tentang" className="text-xs font-bold text-[#6b1282] hover:underline flex items-center gap-1">
                  {isEn ? 'View Details' : 'Lihat Detail'} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. 8 SERVICES THEME GRID (Classy Light Mesh Micro-Dots) */}
      <section className="py-24 bg-[#faf7fd] bg-[radial-gradient(#e9d5ff_1px,transparent_1px)] [background-size:24px_24px] border-y border-purple-100/70" id="layanan-terpadu">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={isEn ? "INTEGRATED HALAL SERVICES" : "LAYANAN HALAL TERPADU"}
            badgeColor="purple"
            title={isEn ? "8 Flagship Services of Halal Center UIN SGD" : "8 Layanan Unggulan Halal Center UIN SGD"}
            subtitle={isEn
              ? "A comprehensive ecosystem spanning free MSE certification to advanced molecular bio-testing."
              : "Ekosistem komprehensif mulai dari sertifikasi gratis UMK hingga pengujian molekuler hayati tingkat lanjut."}
          />

          <BentoGrid className="max-w-7xl">
            {uinServices.map((srv, idx) => (
              <BentoGridItem
                key={idx}
                className={srv.colSpan}
                title={srv.title}
                description={srv.description}
                badge={srv.badge}
                accentColor={srv.accentColor}
                header={
                  <div className="text-neutral-400 hover:text-[#6b1282] transition-colors p-1">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                }
                icon={srv.icon}
                onClick={() => window.open(srv.url, '_blank')}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* 5B. CERTIFICATION JOURNEY TIMELINE (Crisp Pure White) */}
      <section className="py-24 bg-white" id="alur-sertifikasi">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={isEn ? "OFFICIAL PROCEDURAL FLOW" : "ALUR PROSEDUR RESMI"}
            badgeColor="amber"
            title={isEn ? "4 Easy Steps to Halal Certification at LPH UIN SGD" : "Alur 4 Langkah Mudah Sertifikasi Halal di LPH UIN SGD"}
            subtitle={isEn
              ? "Transparent, swift, and accountable guidance from SIHALAL registration, document audit, and laboratory testing to official BPJPH certificate issuance."
              : "Panduan transparan, cepat, dan akuntabel dari pengajuan SIHALAL, verifikasi berkas, audit lapangan & laboratorium, hingga terbit sertifikat halal resmi BPJPH."}
          />

          <TimelineSteps />
        </div>
      </section>

      {/* 6. DUAL LEADERSHIP SHOWCASE (Both Leaders Displayed Directly with Alternating Blueprint Layout) */}
      <section className="py-20 lg:py-28 bg-[#f8f9fc] border-y border-neutral-200/70" id="pimpinan">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={isEn ? "EXECUTIVE BOARD & PATRON" : "DEWAN PIMPINAN & PEMBINA"}
            badgeColor="purple"
            title={isEn ? "Leadership with Sharia Integrity & Halal Research Excellence" : "Kepemimpinan Berintegritas Syar’i & Keunggulan Riset Halal"}
            subtitle={isEn
              ? "Synergy between university strategic vision and bio-science research expertise to safeguard halal audit quality, ISO 17025 laboratory accountability, and public welfare."
              : "Sinergi visi strategis universitas dan keahlian riset sains hayati untuk mengawal mutu pemeriksaan halal, akuntabilitas laboratorium ISO 17025, dan kemaslahatan industri bagi umat."}
          />

          <div className="mt-12 space-y-10 sm:space-y-14">
            {/* CARD 1: KEPALA HALAL CENTER (Dr. Tri Cahyanto) - Left: Content, Right: Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-3xl border border-neutral-200/90 bg-[#fafbfc] overflow-hidden shadow-xl shadow-purple-950/5 p-6 sm:p-10 lg:p-12 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:22px_22px]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left (7 cols): Content & Executive Statement */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold bg-purple-100/90 text-[#6b1282] border border-purple-200/80 uppercase tracking-wider mb-4 shadow-xs">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {isEn ? 'LPH Technical Lead & Head of Halal Center' : 'Pimpinan Teknis LPH & Kepala Pusat Kajian Halal'}
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a0726] tracking-tight">
                      Dr. Tri Cahyanto, M.Si.
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-neutral-500 mt-1">
                      {isEn
                        ? 'Life Science Expert & Licensed Lead Auditor BPJPH Kemenag RI'
                        : 'Pakar Sains Hayati & Lead Auditor Halal Berlisensi BPJPH Kemenag RI'}
                    </p>

                    {/* Executive Quote Box */}
                    <div className="mt-6 p-6 rounded-2xl bg-white/95 border border-purple-100 shadow-sm relative">
                      <span className="text-4xl text-[#6b1282]/30 font-serif absolute top-3 left-4 select-none leading-none">“</span>
                      <p className="text-sm sm:text-base text-neutral-700 italic leading-relaxed pl-6 relative z-10 font-normal">
                        "{directors[1].quote}"
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 pt-6 border-t border-neutral-200/80 flex flex-wrap items-center gap-4">
                    <Button
                      variant="primary"
                      className="bg-[#6b1282] hover:bg-[#581c87] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md inline-flex items-center gap-2"
                      onPress={() => setSelectedDirector(directors[1])}
                    >
                      <span>{isEn ? 'View Profile & Credentials' : 'Buka Profil & Kredensial Pimpinan'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                    <Link
                      to="/layanan/kalkulator"
                      className="text-xs font-bold text-neutral-700 hover:text-[#6b1282] transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>{isEn ? 'Certification Flow Consultation' : 'Konsultasi Alur Sertifikasi'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right (5 cols): Cutout Portrait */}
                <div className="lg:col-span-5 flex flex-col items-center justify-end relative pt-2">
                  <div className="relative w-full max-w-sm flex flex-col items-center">
                    <div className="absolute inset-x-8 bottom-0 h-64 bg-gradient-to-t from-purple-200/40 via-purple-100/20 to-transparent rounded-full blur-2xl pointer-events-none" />
                    <img
                      src={directors[1].image}
                      alt={directors[1].name}
                      className="relative z-10 w-auto max-h-[380px] sm:max-h-[420px] object-contain drop-shadow-xl"
                    />
                    <div className="relative z-20 -mt-6 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-purple-100 shadow-md text-center max-w-xs w-full">
                      <h4 className="text-sm font-bold text-[#1a0726]">
                        {directors[1].name}
                      </h4>
                      <p className="text-[11px] font-semibold text-[#6b1282] mt-0.5">
                        {isEn ? 'Head of Halal Center UIN Sunan Gunung Djati' : 'Kepala Halal Center UIN Sunan Gunung Djati'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD 2: DEWAN PEMBINA (Prof. Rosihon Anwar) - Left: Portrait, Right: Content (Alternating) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-3xl border border-neutral-200/90 bg-[#fafbfc] overflow-hidden shadow-xl shadow-purple-950/5 p-6 sm:p-10 lg:p-12 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:22px_22px]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left on Desktop (5 cols): Cutout Portrait */}
                <div className="lg:col-span-5 flex flex-col items-center justify-end relative pt-2 order-2 lg:order-1">
                  <div className="relative w-full max-w-sm flex flex-col items-center">
                    <div className="absolute inset-x-8 bottom-0 h-64 bg-gradient-to-t from-purple-200/40 via-purple-100/20 to-transparent rounded-full blur-2xl pointer-events-none" />
                    <img
                      src={directors[0].image}
                      alt={directors[0].name}
                      className="relative z-10 w-auto max-h-[380px] sm:max-h-[420px] object-contain drop-shadow-xl"
                    />
                    <div className="relative z-20 -mt-6 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-purple-100 shadow-md text-center max-w-xs w-full">
                      <h4 className="text-sm font-bold text-[#1a0726]">
                        {directors[0].name}
                      </h4>
                      <p className="text-[11px] font-semibold text-[#6b1282] mt-0.5">
                        {isEn ? 'Rector of UIN SGD & Halal Center Patron' : 'Rektor UIN SGD & Dewan Pembina Halal Center'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right on Desktop (7 cols): Content & Institutional Vision */}
                <div className="lg:col-span-7 flex flex-col justify-between order-1 lg:order-2">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold bg-purple-100/90 text-[#6b1282] border border-purple-200/80 uppercase tracking-wider mb-4 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5" />
                      {isEn ? 'Rector of UIN SGD & Halal Center Patron' : 'Rektor UIN SGD & Dewan Pembina Halal Center'}
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a0726] tracking-tight">
                      Prof. Dr. H. Rosihon Anwar, M.Ag.
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-neutral-500 mt-1">
                      {isEn
                        ? 'Professor of Quranic Exegesis & Tafsir • Pioneer of "Halalsphere University"'
                        : "Guru Besar Ilmu Al-Qur'an & Tafsir • Inisiator Paradigma \"Halalsphere University\""}
                    </p>

                    {/* Institutional Quote Box */}
                    <div className="mt-6 p-6 rounded-2xl bg-white/95 border border-purple-100 shadow-sm relative">
                      <span className="text-4xl text-[#6b1282]/30 font-serif absolute top-3 left-4 select-none leading-none">“</span>
                      <p className="text-sm sm:text-base text-neutral-700 italic leading-relaxed pl-6 relative z-10 font-normal">
                        "{directors[0].quote}"
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 pt-6 border-t border-neutral-200/80 flex flex-wrap items-center gap-4">
                    <Button
                      variant="primary"
                      className="bg-[#6b1282] hover:bg-[#581c87] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md inline-flex items-center gap-2"
                      onPress={() => setSelectedDirector(directors[0])}
                    >
                      <span>{isEn ? "View Rector's Track Record & Profile" : 'Buka Profil & Rekam Jejak Rektor'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                    <Link
                      to="/tentang"
                      className="text-xs font-bold text-neutral-700 hover:text-[#6b1282] transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>{isEn ? 'Explore Institutional Profile & Vision' : 'Pelajari Profil Lembaga & Visi Kampus'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Modal Director Detail using HeroUI v3 Modal */}
        {selectedDirector && (
          <Modal.Backdrop isOpen={!!selectedDirector} onOpenChange={() => setSelectedDirector(null)}>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-[640px] bg-white text-neutral-900 rounded-3xl p-6 sm:p-8">
                <Modal.CloseTrigger />
                <Modal.Header className="flex flex-col items-start gap-1 pb-4 border-b border-neutral-100">
                  <span className="text-xs font-black text-[#6b1282] uppercase tracking-wider">
                    {selectedDirector.position}
                  </span>
                  <Modal.Heading className="text-2xl font-black text-[#1b183a]">
                    {selectedDirector.name}
                  </Modal.Heading>
                </Modal.Header>

                <Modal.Body className="py-6 space-y-6 max-h-[70vh] overflow-y-auto">
                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                    <img
                      src={selectedDirector.image}
                      alt={selectedDirector.name}
                      className="w-24 h-24 rounded-2xl object-cover object-top border-2 border-purple-200 shadow-sm"
                    />
                    <blockquote className="text-xs text-neutral-600 italic leading-relaxed border-l-2 border-[#6b1282] pl-3">
                      "{selectedDirector.quote}"
                    </blockquote>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-2 text-[#6b1282]">
                      <GraduationCap className="w-4 h-4" />
                      {isEn ? 'Education & Academic Qualifications' : 'Edukasi & Kualifikasi Akademik'}
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-neutral-600 pl-4 list-disc">
                      {selectedDirector.education.map((edu: string, idx: number) => (
                        <li key={idx}>{edu}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-2 text-[#6b1282]">
                      <Award className="w-4 h-4" />
                      {isEn ? 'Experience & Strategic Focus' : 'Pengalaman & Fokus Strategis'}
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-neutral-600 pl-4 list-disc">
                      {selectedDirector.experience.map((exp: string, idx: number) => (
                        <li key={idx}>{exp}</li>
                      ))}
                    </ul>
                  </div>
                </Modal.Body>

                <Modal.Footer className="border-t border-neutral-100 pt-4">
                  <Button
                    variant="primary"
                    className="w-full bg-[#6b1282] hover:bg-[#581c87] text-white font-bold rounded-xl py-2.5"
                    onPress={() => setSelectedDirector(null)}
                  >
                    {isEn ? 'Close Profile' : 'Tutup Profil'}
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        )}
      </section>

      {/* 7. NEWS & UPDATE SECTION (Pure Crisp White) */}
      <section className="py-24 bg-white" id="berita">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-[#6b1282] border border-purple-200 uppercase tracking-wider mb-2">
                {isEn ? 'ARTICLES & REGULATION' : 'ARTIKEL & REGULASI'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1b183a] tracking-tight">
                {isEn ? 'Halal Center UIN Sunan Gunung Djati Updates' : 'Seputar Halal Center UIN Sunan Gunung Djati'}
              </h2>
            </div>
            <Link to="/berita" className="text-sm font-bold text-[#6b1282] hover:underline flex items-center gap-1">
              {isEn ? 'View All News' : 'Lihat Selengkapnya'} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category Tabs using HeroUI Tabs */}
          <div className="mb-8">
            <Tabs
              selectedKey={activeTab}
              onSelectionChange={(key) => setActiveTab(key as string)}
              className="w-full overflow-x-auto"
            >
              <Tabs.ListContainer>
                <Tabs.List aria-label={isEn ? "Article Categories" : "Kategori Artikel"}>
                  <Tabs.Tab
                    id="artikel"
                    className="data-[selected=true]:text-white font-semibold transition-colors"
                  >
                    {isEn ? 'Key Articles & Regulations' : 'Artikel & Regulasi Utama'}
                    <Tabs.Indicator className="bg-[#6b1282] rounded-3xl shadow-xs" />
                  </Tabs.Tab>
                  <Tabs.Tab
                    id="uin_berita"
                    className="data-[selected=true]:text-white font-semibold transition-colors"
                  >
                    {isEn ? 'Halal Center News' : 'Berita Halal Center'}
                    <Tabs.Indicator className="bg-[#6b1282] rounded-3xl shadow-xs" />
                  </Tabs.Tab>
                  <Tabs.Tab
                    id="jurnal"
                    className="data-[selected=true]:text-white font-semibold transition-colors"
                  >
                    {isEn ? 'Journal & Research (IJHR)' : 'Jurnal & Riset (IJHR)'}
                    <Tabs.Indicator className="bg-[#6b1282] rounded-3xl shadow-xs" />
                  </Tabs.Tab>
                  <Tabs.Tab
                    id="umk"
                    className="data-[selected=true]:text-white font-semibold transition-colors"
                  >
                    {isEn ? 'MSE Zone & SEHATI' : 'Ruang UMK & SEHATI'}
                    <Tabs.Indicator className="bg-[#6b1282] rounded-3xl shadow-xs" />
                  </Tabs.Tab>
                  <Tabs.Tab
                    id="fatwa"
                    className="data-[selected=true]:text-white font-semibold transition-colors"
                  >
                    {isEn ? 'Fatwa & BPJPH Regulations' : 'Fatwa & Regulasi BPJPH'}
                    <Tabs.Indicator className="bg-[#6b1282] rounded-3xl shadow-xs" />
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs.ListContainer>
            </Tabs>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              {/* Tab 1: Artikel */}
              {activeTab === 'artikel' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  img: '/assets/images/news_thumb_1.jpg',
                  cat: isEn ? 'COSMETICS & HEALTH' : 'KOSMETIK & KESEHATAN',
                  catColor: 'text-[#6b1282]',
                  title: isEn
                    ? 'The Dangers of Hydroquinone in Cosmetics and Halal Critical Points'
                    : 'Bahaya Hidrokuinon dalam Kosmetik dan Titik Kritis Kehalalan',
                  desc: isEn
                    ? 'Hydroquinone is a common active compound in skin brightening products subject to stringent health safety and halal compliance.'
                    : 'Hidrokuinon adalah senyawa kimia yang umum digunakan dalam produk pencerah kulit dan memiliki regulasi ketat dalam aspek keamanan dan kehalalan.',
                  link: '/artikel/1',
                },
                {
                  img: '/assets/images/news_thumb_2.jpg',
                  cat: isEn ? 'PACKAGING & LOGISTICS' : 'KEMASAN & LOGISTIK',
                  catColor: 'text-[#0284c7]',
                  title: isEn
                    ? 'Understanding the Vital Role of Migration Testing on Food Packaging'
                    : 'Kenali Pentingnya Pengujian Migrasi pada Kemasan Pangan',
                  desc: isEn
                    ? 'Migration testing verifies that hazardous substances do not transfer to food materials according to food safety and halal standards.'
                    : 'Pengujian migrasi pada kemasan pangan menjamin zat berbahaya tidak berpindah ke bahan konsumsi sesuai standar keamanan pangan dan syariat halal.',
                  link: '/artikel/2',
                },
                {
                  img: '/assets/images/news_thumb_3.jpg',
                  cat: isEn ? 'HEALTH REGULATION' : 'REGULASI KESEHATAN',
                  catColor: 'text-[#6b1282]',
                  title: isEn
                    ? 'Regulatory Insight! Health Ministry Decree No. 2/2023 & Halal Alignment'
                    : 'Kulik Regulasi! Permenkes No.2 Tahun 2023 & Keselarasan SJPH',
                  desc: isEn
                    ? 'Comprehensive overview of environmental health quality standards and hygienic processing aligned with the Halal Assurance System (SJPH).'
                    : 'Kupas tuntas standar baku mutu kesehatan lingkungan dan persyaratan pengolahan higienis yang sejalan dengan Sistem Jaminan Produk Halal (SJPH).',
                  link: '/artikel/3',
                },
              ].map((article, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-3xl border border-neutral-200/80 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <img src={article.img} alt={article.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <span className={`text-[11px] font-black uppercase tracking-wider ${article.catColor}`}>
                      {article.cat}
                    </span>
                    <h3 className="font-extrabold text-lg text-neutral-900 mt-2 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed mb-4">
                      {article.desc}
                    </p>
                    <Link to={article.link} className="text-xs font-bold text-[#6b1282] hover:underline flex items-center gap-1">
                      {isEn ? 'Read Now' : 'Baca Sekarang'} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Tab 2: Berita */}
          {activeTab === 'uin_berita' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  img: '/assets/images/uin_sgd/uin_14.webp',
                  cat: 'LP3H UIN SGD',
                  title: isEn
                    ? 'UIN SGD Bandung Conducts PPH Assistant National Training'
                    : 'UIN SGD Bandung Gelar Pelatihan Pendamping PPH dan Rakornas',
                  desc: isEn
                    ? 'LP3H Halal Center UIN SGD consistently certifies thousands of competent PPH assistants across Indonesia.'
                    : 'LP3H Halal Center UIN SGD konsisten mencetak ribuan pendamping PPH berkompeten untuk mengakselerasi sertifikasi halal UMK se-Indonesia.',
                  link: '/artikel/1',
                },
                {
                  img: '/assets/images/uin_sgd/uin_15.webp',
                  cat: 'PROGRAM SEHATI',
                  title: isEn
                    ? 'Facilitating 1,000+ Free Halal Certificates for West Java MSEs'
                    : 'Fasilitasi Lebih dari 1.000 Sertifikat Halal Gratis UMK Jawa Barat',
                  desc: isEn
                    ? 'Collaborative program between Halal Center UIN SGD and BPJPH Ministry of Religious Affairs assisting micro businesses.'
                    : 'Program kolaborasi Halal Center UIN SGD bersama BPJPH Kemenag RI dalam mendampingi pelaku usaha mikro kecil meraih sertifikat halal resmi.',
                  link: '/artikel/2',
                },
                {
                  img: '/assets/images/uin_sgd/uin_16.webp',
                  cat: isEn ? 'LEGALITY GUIDE' : 'PANDUAN LEGALITAS',
                  title: isEn
                    ? 'Complete Guide to OSS NIB Registration & Self-Declare Criteria'
                    : 'Panduan Lengkap Pengajuan NIB OSS & Syarat Self Declare',
                  desc: isEn
                    ? 'Step-by-step guidance on risk-based NIB issuance and SiHalal raw material input assisted by LP3H UIN SGD.'
                    : 'Langkah mudah pembuatan NIB berbasis risiko dan pengisian data bahan baku di portal SiHalal dengan pendampingan LP3H UIN SGD.',
                  link: '/artikel/3',
                },
              ].map((article, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-3xl border border-neutral-200/80 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all"
                >
                  <img src={article.img} alt={article.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <span className="text-[11px] font-black text-[#6b1282] uppercase tracking-wider">
                      {article.cat}
                    </span>
                    <h3 className="font-extrabold text-lg text-neutral-900 mt-2 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed mb-4">
                      {article.desc}
                    </p>
                    <Link to={article.link} className="text-xs font-bold text-[#6b1282] hover:underline flex items-center gap-1">
                      {isEn ? 'Read Now' : 'Baca Sekarang'} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Tab 3: Jurnal */}
          {activeTab === 'jurnal' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  img: '/assets/images/Screenshot-2026-09-11-at-15-16-41-Jurnal-Halal-180.pdf-1.png',
                  cat: 'IJHR SINTA',
                  title: isEn
                    ? 'Indonesian Journal of Halal Research (IJHR) Vol. 6 No. 2'
                    : 'Indonesian Journal of Halal Research (IJHR) Vol. 6 No. 2',
                  desc: isEn
                    ? 'SINTA-accredited scientific periodical discussing innovations in bio-molecular halal authentication and global policy.'
                    : 'Publikasi jurnal ilmiah berkala terakreditasi SINTA yang membahas inovasi riset autentikasi halal hayati dan kebijakan halal global.',
                  url: 'https://journal.uinsgd.ac.id/index.php/ijhr',
                },
                {
                  img: '/assets/images/Screenshot-2026-07-17-at-07-01-06-Jurnal-Halal-179.pdf.png',
                  cat: isEn ? 'DNA RESEARCH' : 'RISET DNA',
                  title: isEn
                    ? 'Halal Authentication of Processed Meat via Real-Time PCR'
                    : 'Autentikasi Halal Daging Olahan dengan Metode Real-Time PCR',
                  desc: isEn
                    ? 'Quantitative laboratory research detecting porcine DNA to safeguard national meat supply chain integrity.'
                    : 'Riset laboratorium pengujian DNA babi secara kuantitatif untuk melindungi rantai pasok daging olahan industri pangan nasional.',
                  url: 'https://journal.uinsgd.ac.id/index.php/ijhr',
                },
                {
                  img: '/assets/images/uji-laboratorium.jpg',
                  cat: isEn ? 'TEST METHODOLOGY' : 'METODOLOGI UJI',
                  title: isEn
                    ? 'Alcohol Residual Testing & Critical Point Detection in Ingredients'
                    : 'Pengujian Cemaran Alkohol & Deteksi Titik Kritis Bahan',
                  desc: isEn
                    ? 'Gas chromatography (GC-FID) test methodology determining ethanol limits in flavorings, solvents, and fermented goods.'
                    : 'Metodologi uji gas chromatography (GC-FID) untuk penetapan ambang batas etanol pada perisa, pelarut, dan produk fermentasi.',
                  url: 'https://halal.uinsgd.ac.id/laboratorium-pengujian-halal/',
                },
              ].map((article, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-3xl border border-neutral-200/80 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all"
                >
                  <img src={article.img} alt={article.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <span className="text-[11px] font-bold text-[#6b1282] uppercase tracking-wider">
                      {article.cat}
                    </span>
                    <h3 className="font-bold text-lg text-neutral-900 mt-2 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed mb-4 font-normal">
                      {article.desc}
                    </p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#6b1282] hover:underline flex items-center gap-1"
                    >
                      {isEn ? 'Open Research Paper' : 'Buka Tautan Riset'} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Tab 4: Ruang UMK */}
          {activeTab === 'umk' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  img: '/assets/images/uin_sgd/uin_16.webp',
                  cat: isEn ? 'MSE CLINIC' : 'KLINIK UMK',
                  title: isEn
                    ? 'Free Consultation Clinic for OSS NIB & SiHalal Setup'
                    : 'Klinik Konsultasi Gratis Pembuatan NIB & Akun SiHalal',
                  desc: isEn
                    ? 'In-person consultation service at Campus 1 UIN Sunan Gunung Djati Bandung assisting MSEs with halal document completeness.'
                    : 'Layanan konsultasi tatap muka langsung di Kampus 1 UIN Sunan Gunung Djati Bandung membantu UMK melengkapi dokumen halal.',
                },
                {
                  img: '/assets/images/uin_sgd/uin_14.webp',
                  cat: isEn ? 'SEHATI FACILITATION' : 'FASILITASI SEHATI',
                  title: isEn
                    ? 'Free Halal Mentoring (SEHATI) for Micro Enterprises'
                    : 'Pendampingan Halal Gratis (SEHATI) untuk Pelaku Usaha Mikro',
                  desc: isEn
                    ? 'Government free certification quotas verified on-site by certified PPH Assistants from UIN Sunan Gunung Djati.'
                    : 'Fasilitasi kuota sertifikasi gratis dari pemerintah melalui verifikasi lapangan oleh Pendamping PPH UIN Sunan Gunung Djati.',
                },
                {
                  img: '/assets/images/uin_sgd/uin_15.webp',
                  cat: isEn ? 'MSE JULEHA' : 'JULEHA UMK',
                  title: isEn
                    ? 'Halal Slaughterer Competency Training for MSE Communities'
                    : 'Program Pelatihan Juru Sembelih Halal bagi Komunitas UMK',
                  desc: isEn
                    ? 'Elevating poultry and small ruminant slaughtering competence to ensure end-to-end halal meat supply chain compliance.'
                    : 'Peningkatan kompetensi juru sembelih unggas dan ruminansia kecil guna memastikan rantai pasok daging halal dari hulu ke hilir.',
                },
              ].map((article, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-3xl border border-neutral-200/80 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all"
                >
                  <img src={article.img} alt={article.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <span className="text-[11px] font-bold text-[#6b1282] uppercase tracking-wider">
                      {article.cat}
                    </span>
                    <h3 className="font-bold text-lg text-neutral-900 mt-2 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed mb-4 font-normal">
                      {article.desc}
                    </p>
                    <Link to="/layanan" className="text-xs font-bold text-[#6b1282] hover:underline flex items-center gap-1">
                      {isEn ? 'Explore Program' : 'Pelajari Program'} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Tab 5: Fatwa & Regulasi */}
          {activeTab === 'fatwa' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  img: '/assets/images/img_015.jpg',
                  cat: isEn ? 'MINISTRY DECREE' : 'KEPUTUSAN MENAG',
                  title: isEn
                    ? 'Religious Affairs Decree No. 748/2021 on Mandatory Certified Products'
                    : 'KMA No. 748 Tahun 2021 tentang Produk Wajib Bersertifikat',
                  desc: isEn
                    ? 'Classification list of food, beverage, medicine, cosmetics, and consumer items subject to mandatory halal certification.'
                    : 'Daftar klasifikasi jenis produk makanan, minuman, obat, kosmetik, dan barang gunaan yang wajib memiliki sertifikasi halal.',
                },
                {
                  img: '/assets/images/img_014.jpg',
                  cat: isEn ? 'MUI FATWA' : 'FATWA MUI',
                  title: isEn
                    ? 'Fatwa Standard on Halal Compliance for GMO and Recombinant Products'
                    : 'Fatwa Standar Kehalalan Produk Rekayasa Genetika (GMO)',
                  desc: isEn
                    ? 'Islamic legal guidelines determining the halal status of recombinant microbial fermentation and modern biotechnology ingredients.'
                    : 'Pedoman penetapan kehalalan bahan hasil fermentasi mikroba rekombinan dan bahan bioteknologi pangan modern.',
                },
                {
                  img: '/assets/images/img_013.jpg',
                  cat: isEn ? 'NATIONAL REGULATION' : 'REGULASI NASIONAL',
                  title: isEn
                    ? 'Phased Mandatory Halal Certification for Business Operators'
                    : 'Kewajiban Sertifikasi Halal Bertahap bagi Pelaku Usaha',
                  desc: isEn
                    ? 'Implementation schedule for mandatory halal certification in accordance with Law No. 33/2014 and Govt. Regulation in Lieu of Law No. 2/2022.'
                    : 'Pemberlakuan penahapan kewajiban bersertifikat halal sesuai regulasi UU No. 33 Tahun 2014 dan Perpu No. 2 Tahun 2022.',
                },
              ].map((article, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-3xl border border-neutral-200/80 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all"
                >
                  <img src={article.img} alt={article.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <span className="text-[11px] font-bold text-[#6b1282] uppercase tracking-wider">
                      {article.cat}
                    </span>
                    <h3 className="font-bold text-lg text-neutral-900 mt-2 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed mb-4 font-normal">
                      {article.desc}
                    </p>
                    <Link to="/artikel/3" className="text-xs font-bold text-[#6b1282] hover:underline flex items-center gap-1">
                      {isEn ? 'Read Now' : 'Baca Sekarang'} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 8. MITRA & AKREDITASI MARQUEE (Classy Soft Pearl Ivory) */}
      <section className="py-16 bg-[#faf8fc] border-t border-purple-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#6b1282]">
            {isEn
              ? 'Affiliate Networks, Advisory Council & Official Accreditation Bodies'
              : 'Jaringan Afiliasi, Pembina & Lembaga Akreditasi Resmi'}
          </p>
        </div>
        <InfiniteMovingCards items={PARTNER_ITEMS} direction="left" speed="normal" />
      </section>

      {/* 9. MAP LOCATION SECTION (Classy Subtle Lavender Tint Gradient) */}
      <section className="py-24 bg-gradient-to-b from-white via-[#fdfbfe] to-[#f7f2fb]" id="lokasi">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={isEn ? "SERVICE & LAB NETWORK" : "JARINGAN LAYANAN & LABORATORIUM"}
            badgeColor="purple"
            title={isEn ? "Office & Halal Service Centers of UIN SGD" : "Lokasi Kantor & Sentra Layanan Halal UIN SGD"}
            subtitle={isEn
              ? "Visit our service office at Campus 1, Integrated Laboratory Building Campus 2, and partnership centers in Eastern Priangan & Ciayumajakuning."
              : "Kunjungi kantor layanan kami di Kampus 1, Gedung Laboratorium Terpadu Kampus 2, serta sentra kemitraan Priangan Timur & Ciayumajakuning."}
          />

          {/* Branch Selector Chips & Map Provider Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              {branchLocations.map((branch, idx) => (
                <button
                  key={branch.id}
                  type="button"
                  onClick={() => setSelectedBranch(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                    selectedBranch === idx
                      ? 'bg-[#6b1282] text-white shadow-sm ring-2 ring-[#6b1282]/30'
                      : 'bg-white text-neutral-600 hover:text-[#6b1282] border border-neutral-200 hover:border-purple-200'
                  }`}
                >
                  {branch.shortName}
                </button>
              ))}
            </div>

            <div className="inline-flex items-center p-1 bg-purple-50/80 rounded-xl border border-purple-100 text-xs font-semibold text-neutral-600">
              <button
                type="button"
                onClick={() => setMapViewMode('google')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  mapViewMode === 'google'
                    ? 'bg-white text-[#6b1282] font-bold shadow-2xs'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Google Maps ({isEn ? 'No API Key' : 'Bebas API Key'})
              </button>
              <button
                type="button"
                onClick={() => setMapViewMode('osm')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  mapViewMode === 'osm'
                    ? 'bg-white text-[#6b1282] font-bold shadow-2xs'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                OpenStreetMap ({isEn ? 'No API Key' : 'Bebas API Key'})
              </button>
            </div>
          </div>

          <div className="relative rounded-3xl p-[1.5px] bg-gradient-to-r from-[#4a0d5c] via-[#86198f] to-[#4a0d5c] shadow-2xl shadow-purple-950/10">
            <div className="bg-white rounded-[22px] p-3">
              {mapViewMode === 'google' ? (
                <iframe
                  title="Peta Kantor LPH UIN SGD"
                  width="100%"
                  height="460"
                  className="w-full h-[460px] rounded-2xl border-0 shadow-inner"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${branchLocations[selectedBranch].query}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                />
              ) : (
                <div id="map" className="w-full h-[460px] rounded-2xl overflow-hidden" />
              )}
            </div>
          </div>

          {/* Active Branch Location Info Card */}
          <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-white border border-purple-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#6b1282] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm sm:text-base text-neutral-900">
                    {branchLocations[selectedBranch].title}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-[#6b1282] border border-purple-200">
                    {branchLocations[selectedBranch].badge}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 mt-1 max-w-3xl">
                  {branchLocations[selectedBranch].address}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={branchLocations[selectedBranch].gmapsDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="primary"
                  className="bg-[#6b1282] hover:bg-[#581c87] text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  {isEn ? 'Directions on Google Maps' : 'Petunjuk Arah Google Maps'}
                </Button>
              </a>
              <Link to="/kontak">
                <Button
                  variant="outline"
                  className="border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-bold px-4 py-2 rounded-xl text-xs"
                >
                  {isEn ? 'Contact Info' : 'Info Kontak'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

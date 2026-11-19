import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Card, Modal, Tabs } from '@heroui/react';
import {
  ArrowRight,
  Award,
  BookOpen,
  Calculator,
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
  ShieldAlert,
  ShieldCheck,
  Smile,
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
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { useLanguage } from '@/context/LanguageContext';
import { OrganicWave, LiquidDripWave, YellowDotGrid, YellowHighlight, OrganicBlob } from '@/components/ui/decorative-shapes';
import { getDirectors, getUinServices, DIRECTORS, type Director } from '@/data/directorsData';

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

  const officeLocation = {
    title: isEn
      ? 'Integrated Halal Testing Laboratory & Secretariat'
      : 'Gedung Laboratorium Pengujian Halal Terpadu & Sekretariat LPH',
    complex: isEn
      ? 'Integrated Campus Complex UIN Sunan Gunung Djati Bandung'
      : 'Kawasan Kampus Terpadu UIN Sunan Gunung Djati Bandung',
    address: isEn
      ? 'Integrated Halal Laboratory Building, Integrated Campus Complex UIN Sunan Gunung Djati Bandung, Jl. Cimencrang, Gedebage, Bandung, West Java 40294 (Adjacent to Al-Jabbar Grand Mosque)'
      : 'Gedung Laboratorium Halal Terpadu, Kawasan Kampus Terpadu UIN Sunan Gunung Djati Bandung, Jl. Cimencrang, Gedebage, Kota Bandung, Jawa Barat 40294 (Kawasan Masjid Raya Al-Jabbar)',
    lat: -6.9389,
    lng: 107.7025,
    query: '-6.9389,107.7025+(Gedung+Laboratorium+Halal+Terpadu+UIN+Sunan+Gunung+Djati)',
    gmapsDirectUrl: 'https://maps.google.com/?q=-6.9389,107.7025',
  };

  return (
    <div className="flex flex-col w-full overflow-hidden bg-white">
      {/* 1. HERO BANNER WITH VIDEO & SEARCH CARD (Aceternity UI Rebuild) */}
      <HeroVideoBanner />

      {/* 2. STATS SECTION (Untitled UI Metric Cards Row with Yellow Accents) */}
      <section className="relative z-30 w-full pt-6 pb-14 sm:pb-20 bg-gradient-to-b from-white via-[#FAF7FD]/80 to-white overflow-hidden">
        <YellowDotGrid rows={3} cols={6} className="absolute -top-4 right-12 opacity-30 pointer-events-none hidden md:grid" />
        <div className="relative max-w-[1440px] xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10">
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
              value="Standar KAN"
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

      {/* 3. ABOUT LPH SECTION (Soft Purple Canvas with Yellow Accents) */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-[#FAF7FD] to-[#FAF7FD]/90 border-y border-[#C9A5E8]/30 relative overflow-hidden" id="tentang">
        <YellowDotGrid rows={4} cols={5} className="absolute top-8 left-8 opacity-25 pointer-events-none hidden lg:grid" />
        <YellowDotGrid rows={3} cols={4} className="absolute bottom-8 right-8 opacity-20 pointer-events-none hidden md:grid" />

        <div className="relative z-10 max-w-[1440px] xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Certificate Visual with Aceternity BackgroundGradient Glow */}
            <div className="lg:col-span-5 flex justify-center">
              <BackgroundGradient className="rounded-[24px] p-2 bg-white shadow-xl shadow-purple-900/10">
                <div className="relative rounded-2xl overflow-hidden bg-white p-3 border border-[#C9A5E8]/30">
                  <img
                    src="/assets/images/certificate.png"
                    alt="Sertifikat Akreditasi LPH UIN SGD"
                    className="w-full max-h-[460px] object-contain rounded-xl"
                  />

                </div>
              </BackgroundGradient>
            </div>

            {/* Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-[#FFF7D1] text-[#713f12] border border-[#F5D32F] uppercase tracking-wider shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#eab308]" />
                {isEn ? 'About Us' : 'Tentang Kami'}
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#292333] tracking-tight leading-snug">
                {isEn ? 'LPH UIN SGD Through the ' : 'LPH UIN SGD Melalui Konsep '}
                <YellowHighlight className="text-[#6B18A8]">
                  “Halalsphere University”
                </YellowHighlight>
              </h2>

              <p className="text-base sm:text-lg text-[#756D7C] leading-relaxed font-normal">
                {isEn
                  ? 'Halal Inspection Agency (LPH) UIN Sunan Gunung Djati Bandung is committed to becoming a leading institution in developing national and global halal ecosystems. Accredited by BPJPH Ministry of Religious Affairs, we uphold strict audit standards, precision scientific laboratory testing, and premium services for all business enterprises.'
                  : 'Lembaga Pemeriksa Halal (LPH) UIN Sunan Gunung Djati Bandung berkomitmen untuk menjadi lembaga terdepan dalam pengembangan ekosistem halal nasional dan global. Terakreditasi resmi BPJPH Kementerian Agama RI, kami senantiasa menjaga standar mutu pemeriksaan, pengujian laboratorium saintifik presisi, dan pelayanan prima bagi seluruh pelaku usaha.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-[#C9A5E8]/40 shadow-sm flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F5EDFB] text-[#6B18A8] border border-[#C9A5E8]/30 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#6B18A8]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#292333] text-sm">
                      {isEn ? 'Sharia Integrity' : 'Integritas Syar’i'}
                    </h4>
                    <p className="text-xs text-[#756D7C] mt-1">
                      {isEn
                        ? 'Absolute compliance with MUI fatwas and halal product assurance regulations.'
                        : 'Kepatuhan mutlak terhadap fatwa MUI dan regulasi jaminan produk halal.'}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#F5D32F]/50 shadow-sm flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF7D1] text-[#713f12] border border-[#F5D32F]/40 flex items-center justify-center shrink-0">
                    <Microscope className="w-5 h-5 text-[#eab308]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#292333] text-sm">
                      {isEn ? 'Scientific & Precision' : 'Saintifik & Presisi'}
                    </h4>
                    <p className="text-xs text-[#756D7C] mt-1">
                      {isEn
                        ? 'Accredited laboratory testing for porcine DNA and ethanol contamination.'
                        : 'Laboratorium pengujian deteksi kandungan babi dan cemaran alkohol terakreditasi resmi.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link to="/tentang">
                  <Button
                    variant="primary"
                    className="bg-[#6B18A8] hover:bg-[#58138a] text-white font-bold px-7 py-3 rounded-xl text-sm shadow-md shadow-purple-950/15 cursor-pointer"
                  >
                    {isEn ? 'View Full Profile' : 'Lihat Profil Lengkap'}
                  </Button>
                </Link>
                <Link to="/layanan/kalkulator">
                  <Button
                    variant="primary"
                    className="bg-[#F5D32F] hover:bg-[#eab308] text-[#3B074A] font-extrabold px-7 py-3 rounded-xl text-sm shadow-sm cursor-pointer"
                  >
                    {isEn ? 'Start Halal Certification' : 'Mulai Sertifikasi Halal'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TWO MAIN SERVICES CARDS (Crisp Pure White with Yellow & Purple Accents) */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-[#FAF7FD]/80 via-white to-[#FAF7FD]/50 relative overflow-hidden" id="layanan">
        <YellowDotGrid rows={3} cols={6} className="absolute top-10 right-10 opacity-25 pointer-events-none hidden lg:grid" />
        <div className="max-w-[1440px] xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <SectionHeader
            badge={isEn ? 'CORE SERVICES' : 'LAYANAN UTAMA'}
            badgeColor="yellow"
            title={isEn ? 'Excellence in Every Step of Halal Certification' : 'Kemudahan dalam Setiap Langkah Sertifikasi Halal'}
            subtitle={isEn
              ? 'Comprehensive end-to-end inspection ensuring your products meet both Islamic sharia requirements and government regulations.'
              : 'Pemeriksaan komprehensif dari hulu ke hilir untuk memastikan produk Anda memenuhi syarat syariah dan regulasi pemerintah.'}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 - LPH Reguler */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl border border-[#C9A5E8]/40 bg-white overflow-hidden shadow-lg shadow-purple-950/5 hover:shadow-xl hover:border-[#6B18A8]/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/assets/images/pemeriksaaan-kehalalan-produk.jpg"
                    alt="Pemeriksaan Kehalalan Produk"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#6B18A8] text-white shadow-md">
                      LPH Terakreditasi
                    </span>
                  </div>
                </div>
                <div className="p-7 pb-2">
                  <h3 className="text-xl sm:text-2xl font-black text-[#292333]">
                    {isEn ? 'Product Halal Inspection (Regular Scheme)' : 'Pemeriksaan Kehalalan Produk (Jalur Reguler)'}
                  </h3>
                  <p className="text-[#756D7C] text-sm leading-relaxed mt-3">
                    {isEn
                      ? 'Core services of LPH UIN SGD encompassing thorough evaluations of production processes, raw materials, on-site facility audits, and Halal Assurance Systems (SJPH) for corporate and industrial enterprises.'
                      : 'Layanan utama LPH UIN SGD mencakup pemeriksaan menyeluruh terhadap proses produksi, validasi bahan baku, audit fasilitas manufaktur, dan Sistem Jaminan Produk Halal (SJPH) bagi pelaku usaha industri.'}
                  </p>
                </div>
              </div>
              <div className="p-5 sm:p-7 pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-purple-50 mt-4">
                <Link to="/layanan/kalkulator" className="w-full sm:w-auto">
                  <Button variant="primary" className="w-full sm:w-auto bg-[#6B18A8] hover:bg-[#58138a] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer flex items-center justify-center whitespace-nowrap">
                    {isEn ? 'Calculate Estimated Cost' : 'Hitung Estimasi Biaya'}
                  </Button>
                </Link>
                <Link to="/tentang" className="text-xs font-bold text-[#6B18A8] hover:text-[#58138a] hover:underline flex items-center justify-center sm:justify-start gap-1 py-1 whitespace-nowrap">
                  <span>{isEn ? 'View Details' : 'Lihat Detail'}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </Link>
              </div>
            </motion.div>

            {/* Card 2 - Lab Terpadu */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl border border-[#F5D32F]/50 bg-white overflow-hidden shadow-lg shadow-purple-950/5 hover:shadow-xl hover:border-[#F5D32F] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/assets/images/uji-laboratorium.jpg"
                    alt="Laboratorium Pengujian Halal Terpadu"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-[#F5D32F] text-[#3B074A] shadow-md">
                      {isEn ? 'Integrated Laboratory' : 'Laboratorium Terpadu'}
                    </span>
                  </div>
                </div>
                <div className="p-7 pb-2">
                  <h3 className="text-xl sm:text-2xl font-black text-[#292333]">
                    {isEn ? 'Integrated Halal Testing Laboratory' : 'Laboratorium Pengujian Halal Terpadu'}
                  </h3>
                  <p className="text-[#756D7C] text-sm leading-relaxed mt-3">
                    {isEn
                      ? 'Accredited laboratory testing services for manufacturers: porcine DNA detection with high sensitivity, ethanol residual analysis, and gelatin & fatty acid profiling.'
                      : 'Layanan pengujian saintifik Laboratorium Terpadu terakreditasi resmi bagi pelaku usaha: deteksi kandungan babi sensitivitas tinggi, uji cemaran alkohol/etanol, serta analisa gelatin dan asam lemak.'}
                  </p>
                </div>
              </div>
              <div className="p-5 sm:p-7 pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-purple-50 mt-4">
                <a
                  href="https://halal.uinsgd.ac.id/laboratorium-pengujian-halal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="primary" className="w-full sm:w-auto bg-[#F5D32F] hover:bg-[#eab308] text-[#3B074A] font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap">
                    <span>{isEn ? 'Halal Lab Testing' : 'Pengujian Laboratorium Halal'}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </Button>
                </a>
                <a
                  href="https://halal.uinsgd.ac.id/laboratorium-pengujian-halal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#6B18A8] hover:text-[#58138a] hover:underline flex items-center justify-center sm:justify-start gap-1 py-1 whitespace-nowrap"
                >
                  <span>{isEn ? 'Lab Profile & Facilities' : 'Fasilitas & Lab'}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. FLAGSHIP SERVICES GRID (Classy Light Mesh Micro-Dots with Yellow Dot Decor) */}
      <section className="py-24 bg-gradient-to-b from-[#FAF7FD] via-purple-50/30 to-[#FAF7FD] border-y border-[#C9A5E8]/30 relative overflow-hidden" id="layanan-terpadu">
        <YellowDotGrid rows={4} cols={5} className="absolute top-10 right-8 opacity-25 pointer-events-none hidden lg:grid" />
        <YellowDotGrid rows={3} cols={4} className="absolute bottom-10 left-8 opacity-20 pointer-events-none hidden md:grid" />
        <div className="max-w-[1440px] xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <SectionHeader
            badge={isEn ? "FLAGSHIP HALAL SERVICES" : "LAYANAN HALAL UNGGULAN"}
            badgeColor="yellow"
            title={isEn ? "Flagship Services of LPH UIN SGD" : "Layanan Unggulan LPH UIN SGD"}
            subtitle={isEn
              ? "Comprehensive ecosystem from regular industrial halal audit to precision molecular bio-testing."
              : "Ekosistem komprehensif mulai dari audit halal reguler industri hingga pengujian molekuler hayati tingkat lanjut."}
          />

          <BentoGrid className="max-w-[1440px] xl:max-w-[1536px]">
            {uinServices.map((srv, idx) => (
              <BentoGridItem
                key={idx}
                className={srv.colSpan}
                title={srv.title}
                description={srv.description}
                badge={srv.badge}
                accentColor={srv.accentColor}
                header={
                  <div className="text-neutral-400 hover:text-[#6B18A8] transition-colors p-1">
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

      {/* 5B. CERTIFICATION JOURNEY TIMELINE with Background Image Overlay */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#FAF7FD] via-white/80 to-[#FAF7FD]" id="alur-sertifikasi">
        {/* Background Image & Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img
            src="/assets/images/alur-sertifikasi-bg.jpg"
            alt="Alur Sertifikasi Halal Background"
            className="w-full h-full object-cover object-center opacity-25 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7FD]/90 via-white/85 to-[#FAF7FD]/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(107,24,168,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,211,47,0.08),transparent_50%)]" />
        </div>

        <YellowDotGrid rows={4} cols={5} className="absolute top-10 right-10 opacity-20 pointer-events-none hidden lg:grid z-0" />
        <YellowDotGrid rows={3} cols={4} className="absolute bottom-10 left-10 opacity-20 pointer-events-none hidden md:grid z-0" />

        <div className="max-w-[1440px] xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
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

      {/* 5C. THREE INTERACTIVE DIGITAL SERVICES (Aceternity UI 3D Cards) */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-[#FAF7FD]/70 to-[#FAF7FD] border-t border-[#C9A5E8]/30 relative overflow-hidden" id="layanan-digital">
        <YellowDotGrid rows={4} cols={5} className="absolute top-10 right-10 opacity-20 pointer-events-none hidden lg:grid" />
        <YellowDotGrid rows={3} cols={4} className="absolute bottom-10 left-10 opacity-20 pointer-events-none hidden md:grid" />

        <div className="max-w-[1440px] xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <SectionHeader
            badge={isEn ? "CORE DIGITAL PORTAL" : "LAYANAN DIGITAL UTAMA"}
            badgeColor="yellow"
            title={isEn ? "3 Interactive Public Services of LPH UIN SGD" : "3 Layanan Digital Interaktif Utama LPH UIN SGD"}
            subtitle={isEn
              ? "Access transparent regular halal fee simulation, submit confidential whistleblowing reports, and evaluate satisfaction ratings directly through our digital ecosystem."
              : "Akses kalkulasi simulasi tarif halal transparan, sampaikan laporan pengaduan whistleblowing terpercaya, dan berikan evaluasi kepuasan layanan publik secara mudah dan terintegrasi."}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-14 items-stretch">
            {/* Card 1: Kalkulator Tarif Halal */}
            <CardContainer className="inter-var w-full h-full" containerClassName="py-0 h-full w-full">
              <CardBody className="bg-white relative group/card hover:shadow-2xl hover:shadow-purple-950/10 border border-[#C9A5E8]/40 hover:border-[#6B18A8]/60 w-full h-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <CardItem
                      translateZ="40"
                      className="w-13 h-13 rounded-2xl bg-[#F5EDFB] text-[#6B18A8] border border-[#C9A5E8]/60 flex items-center justify-center shadow-xs"
                    >
                      <Calculator className="w-6 h-6 text-[#6B18A8]" />
                    </CardItem>
                    <CardItem
                      translateZ="30"
                      className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#FFF7D1] text-[#713f12] border border-[#F5D32F] shadow-2xs"
                    >
                      {isEn ? 'KMA 784 Standard' : 'Simulasi KMA 784'}
                    </CardItem>
                  </div>

                  <CardItem
                    as="h3"
                    translateZ="50"
                    className="text-lg sm:text-xl font-black text-[#292333] group-hover/card:text-[#6B18A8] transition-colors leading-snug"
                  >
                    {isEn ? 'Halal Tariff Calculator' : 'Kalkulator Tarif Halal'}
                  </CardItem>

                  <CardItem
                    as="p"
                    translateZ="35"
                    className="text-xs sm:text-sm text-[#756D7C] leading-relaxed mt-2.5 font-normal"
                  >
                    {isEn
                      ? 'Simulate transparent estimated audit fees according to official BPJPH decrees, product counts, and enterprise scale.'
                      : 'Simulasi transparan estimasi rincian biaya audit halal reguler sesuai regulasi resmi KMA BPJPH, skala usaha, dan jumlah produk.'}
                  </CardItem>

                  <CardItem translateZ="45" className="mt-6 space-y-2.5">
                    {[
                      isEn ? 'On-site Facility & RPH Audit Cost' : 'Audit Lapangan Fasilitas & RPH',
                      isEn ? 'Laboratory Testing Estimation' : 'Estimasi Pengujian Lab',
                      isEn ? 'Download Formal Breakdown PDF' : 'Unduh Rincian Estimasi Dokumen PDF',
                    ].map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-neutral-700 bg-[#FAF7FD] px-3.5 py-2 rounded-xl border border-[#C9A5E8]/30">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </CardItem>
                </div>

                <CardItem translateZ="50" className="mt-8 pt-4 border-t border-[#C9A5E8]/25 w-full">
                  <Link to="/layanan/kalkulator" className="w-full block">
                    <Button
                      variant="primary"
                      fullWidth
                      className="w-full bg-[#6B18A8] hover:bg-[#58138a] text-white font-extrabold text-xs py-3 rounded-xl shadow-md shadow-purple-950/15 flex items-center justify-center gap-2 group/btn cursor-pointer transition-all duration-200"
                    >
                      <span>{isEn ? 'Calculate Estimated Fee' : 'Hitung Estimasi Biaya'}</span>
                      <ArrowRight className="w-4 h-4 text-[#F5D32F] group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardItem>
              </CardBody>
            </CardContainer>

            {/* Card 2: Pengaduan & Whistleblowing */}
            <CardContainer className="inter-var w-full h-full" containerClassName="py-0 h-full w-full">
              <CardBody className="bg-white relative group/card hover:shadow-2xl hover:shadow-purple-950/10 border border-[#C9A5E8]/40 hover:border-[#6B18A8]/60 w-full h-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <CardItem
                      translateZ="40"
                      className="w-13 h-13 rounded-2xl bg-[#F5EDFB] text-[#6B18A8] border border-[#C9A5E8]/60 flex items-center justify-center shadow-xs"
                    >
                      <ShieldAlert className="w-6 h-6 text-[#6B18A8]" />
                    </CardItem>
                    <CardItem
                      translateZ="30"
                      className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#FFF7D1] text-[#713f12] border border-[#F5D32F] shadow-2xs"
                    >
                      {isEn ? '100% Confidential' : 'WBS Rahasia 100%'}
                    </CardItem>
                  </div>

                  <CardItem
                    as="h3"
                    translateZ="50"
                    className="text-lg sm:text-xl font-black text-[#292333] group-hover/card:text-[#6B18A8] transition-colors leading-snug"
                  >
                    {isEn ? 'Complaints & Whistleblowing' : 'Pengaduan & Whistleblowing'}
                  </CardItem>

                  <CardItem
                    as="p"
                    translateZ="35"
                    className="text-xs sm:text-sm text-[#756D7C] leading-relaxed mt-2.5 font-normal"
                  >
                    {isEn
                      ? 'Protected whistleblowing channel to report violations, audit ethics deviations, and protect sharia compliance integrity.'
                      : 'Kanal pengaduan resmi dan terlindungi untuk melaporkan indikasi pelanggaran, kode etik auditor, dan menjaga integritas kepatuhan syar’i.'}
                  </CardItem>

                  <CardItem translateZ="45" className="mt-6 space-y-2.5">
                    {[
                      isEn ? 'Whistleblower Identity Guaranteed' : 'Kerahasiaan Identitas Pelapor Terjamin',
                      isEn ? 'Independent Ethics Committee Audit' : 'Verifikasi Tim Etik & Pengawasan Independen',
                      isEn ? 'Structured & Timely Investigation' : 'Tindak Lanjut & Investigasi Terukur',
                    ].map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-neutral-700 bg-[#FAF7FD] px-3.5 py-2 rounded-xl border border-[#C9A5E8]/30">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </CardItem>
                </div>

                <CardItem translateZ="50" className="mt-8 pt-4 border-t border-[#C9A5E8]/25 w-full">
                  <Link to="/layanan/pengaduan" className="w-full block">
                    <Button
                      variant="primary"
                      fullWidth
                      className="w-full bg-[#6B18A8] hover:bg-[#58138a] text-white font-extrabold text-xs py-3 rounded-xl shadow-md shadow-purple-950/15 flex items-center justify-center gap-2 group/btn cursor-pointer transition-all duration-200"
                    >
                      <span>{isEn ? 'Submit Formal Report' : 'Sampaikan Pengaduan'}</span>
                      <ArrowRight className="w-4 h-4 text-[#F5D32F] group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardItem>
              </CardBody>
            </CardContainer>

            {/* Card 3: Survei Kepuasan (IKM) */}
            <CardContainer className="inter-var w-full h-full" containerClassName="py-0 h-full w-full">
              <CardBody className="bg-white relative group/card hover:shadow-2xl hover:shadow-purple-950/10 border border-[#C9A5E8]/40 hover:border-[#6B18A8]/60 w-full h-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <CardItem
                      translateZ="40"
                      className="w-13 h-13 rounded-2xl bg-[#F5EDFB] text-[#6B18A8] border border-[#C9A5E8]/60 flex items-center justify-center shadow-xs"
                    >
                      <Smile className="w-6 h-6 text-[#6B18A8]" />
                    </CardItem>
                    <CardItem
                      translateZ="30"
                      className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#FFF7D1] text-[#713f12] border border-[#F5D32F] shadow-2xs"
                    >
                      {isEn ? 'Satisfaction Index' : 'Indeks Kepuasan (IKM)'}
                    </CardItem>
                  </div>

                  <CardItem
                    as="h3"
                    translateZ="50"
                    className="text-lg sm:text-xl font-black text-[#292333] group-hover/card:text-[#6B18A8] transition-colors leading-snug"
                  >
                    {isEn ? 'Satisfaction Survey (IKM)' : 'Survei Kepuasan (IKM)'}
                  </CardItem>

                  <CardItem
                    as="p"
                    translateZ="35"
                    className="text-xs sm:text-sm text-[#756D7C] leading-relaxed mt-2.5 font-normal"
                  >
                    {isEn
                      ? 'Provide your valuable feedback and ratings to help LPH UIN SGD enhance service standards and inspection speed.'
                      : 'Berikan evaluasi dan masukan Anda untuk membantu LPH UIN SGD terus meningkatkan kualitas pelayanan, keramahan, dan kecepatan audit.'}
                  </CardItem>

                  <CardItem translateZ="45" className="mt-6 space-y-2.5">
                    {[
                      isEn ? 'Standardized Service Quality' : 'Penilaian Mutu & Pelayanan Terstandar',
                      isEn ? 'Speed & Transparency Feedback' : 'Evaluasi Kecepatan & Transparansi Biaya',
                      isEn ? 'Continuous Public Improvement' : 'Dorong Peningkatan Mutu Berkelanjutan',
                    ].map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-neutral-700 bg-[#FAF7FD] px-3.5 py-2 rounded-xl border border-[#C9A5E8]/30">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </CardItem>
                </div>

                <CardItem translateZ="50" className="mt-8 pt-4 border-t border-[#C9A5E8]/25 w-full">
                  <Link to="/layanan/kepuasan" className="w-full block">
                    <Button
                      variant="primary"
                      fullWidth
                      className="w-full bg-[#6B18A8] hover:bg-[#58138a] text-white font-extrabold text-xs py-3 rounded-xl shadow-md shadow-purple-950/15 flex items-center justify-center gap-2 group/btn cursor-pointer transition-all duration-200"
                    >
                      <span>{isEn ? 'Take Satisfaction Survey' : 'Isi Survei Kepuasan'}</span>
                      <ArrowRight className="w-4 h-4 text-[#F5D32F] group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        </div>
      </section>

      {/* 6. DUAL LEADERSHIP SHOWCASE (Both Leaders Displayed Directly with Alternating Layout) */}
      <section className="py-20 lg:py-28 bg-[#FAF7FD] border-y border-[#C9A5E8]/30 relative overflow-visible" id="pimpinan">
        <YellowDotGrid rows={4} cols={5} className="absolute top-10 left-10 opacity-20 pointer-events-none hidden lg:grid" />
        <YellowDotGrid rows={3} cols={4} className="absolute bottom-10 right-10 opacity-20 pointer-events-none hidden md:grid" />
        <div className="w-full max-w-[1440px] xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <SectionHeader
            badge={isEn ? "EXECUTIVE BOARD & PATRON" : "DEWAN PIMPINAN & PEMBINA"}
            badgeColor="yellow"
            title={isEn ? "Leadership with Sharia Integrity & Halal Research Excellence" : "Kepemimpinan Berintegritas Syar’i & Keunggulan Riset Halal"}
            subtitle={isEn
              ? "Synergy between university strategic vision and bio-science research expertise to safeguard halal audit quality, accredited laboratory accountability, and public welfare."
              : "Sinergi visi strategis universitas dan keahlian riset sains hayati untuk mengawal mutu pemeriksaan halal, akuntabilitas laboratorium terakreditasi resmi, dan kemaslahatan industri bagi umat."}
          />

          <div className="mt-24 lg:mt-36 space-y-28 lg:space-y-48">
            {/* CARD 1: DEWAN PEMBINA (Prof. Dr. H. Rosihon Anwar) - Left: Content, Right: Portrait Pop-Out */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative rounded-3xl border border-[#C9A5E8]/50 bg-white overflow-visible shadow-xl shadow-purple-950/5 hover:shadow-2xl hover:border-[#6B18A8]/60 transition-all duration-300 p-6 sm:p-10 lg:p-12 xl:p-14 w-full"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left (7 cols): Content & Institutional Vision */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-extrabold bg-[#FFF7D1] text-[#713f12] border border-[#F5D32F] uppercase tracking-wider mb-4 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#eab308]" />
                      {isEn ? 'Rector of UIN SGD & LPH Patron' : 'Rektor UIN SGD & Dewan Pembina LPH'}
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#292333] tracking-tight">
                      Prof. Dr. H. Rosihon Anwar, M.Ag.
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#756D7C] mt-1">
                      {isEn
                        ? 'Rector of UIN Sunan Gunung Djati Bandung • Advisory Board of LPH UIN SGD'
                        : 'Rektor UIN SGD Bandung • Dewan Pembina LPH UIN Sunan Gunung Djati'}
                    </p>

                    {/* Institutional Quote Box */}
                    <div className="mt-6 p-6 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 shadow-xs relative">
                      <span className="text-4xl text-[#F5D32F] font-serif absolute top-3 left-4 select-none leading-none">“</span>
                      <p className="text-sm sm:text-base text-neutral-700 italic leading-relaxed pl-6 relative z-10 font-normal">
                        "{directors[0].quote}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right (5 cols): Cutout Portrait with Bold Pop-Out Head Breaking Card Top Border */}
                <div className="lg:col-span-5 flex flex-col items-center justify-end relative pt-6 lg:pt-0 lg:-mt-44 xl:-mt-52 lg:-mb-12 xl:-mb-14 z-20">
                  <div className="relative w-full max-w-[340px] sm:max-w-md lg:max-w-[420px] flex flex-col items-center">
                    {/* Ambient Glow Aura behind head */}
                    <div className="absolute inset-x-4 top-0 h-72 sm:h-84 bg-gradient-to-t from-purple-200/50 via-[#F5EDFB]/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

                    {/* Decorative yellow dot grid next to the popped-out head */}
                    <div className="absolute -top-6 -right-2 opacity-50 pointer-events-none hidden lg:block">
                      <YellowDotGrid rows={3} cols={3} dotColor="#F5D32F" />
                    </div>

                    <img
                      src={directors[0].image}
                      alt={directors[0].name}
                      className="relative z-10 w-auto max-h-[420px] sm:max-h-[480px] lg:max-h-[520px] xl:max-h-[560px] object-contain drop-shadow-[0_25px_35px_rgba(75,13,120,0.25)] transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Floating Name Card anchored at bottom of portrait */}
                    <div className="relative z-20 -mt-6 sm:-mt-8 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-[#C9A5E8]/40 shadow-xl shadow-purple-950/10 text-center max-w-xs w-full">
                      <h4 className="text-sm font-black text-[#292333]">
                        {directors[0].name}
                      </h4>
                      <p className="text-[11px] font-bold text-[#6B18A8] mt-0.5">
                        {isEn ? 'Rector of UIN SGD & LPH Patron' : 'Rektor UIN SGD & Dewan Pembina LPH'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD 2: PIMPINAN TEKNIS LPH (Dr. Tri Cahyanto) - Left: Portrait Pop-Out, Right: Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative rounded-3xl border border-[#F5D32F]/60 bg-white overflow-visible shadow-xl shadow-purple-950/5 hover:shadow-2xl hover:border-[#F5D32F] transition-all duration-300 p-6 sm:p-10 lg:p-12 xl:p-14 w-full"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left on Desktop (5 cols): Cutout Portrait with Bold Pop-Out Head Breaking Card Top Border */}
                <div className="lg:col-span-5 flex flex-col items-center justify-end relative pt-6 lg:pt-0 order-2 lg:order-1 lg:-mt-36 xl:-mt-44 lg:-mb-12 xl:-mb-14 z-20">
                  <div className="relative w-full max-w-[340px] sm:max-w-md lg:max-w-[420px] flex flex-col items-center">
                    {/* Ambient Glow Aura behind head */}
                    <div className="absolute inset-x-4 top-0 h-72 sm:h-84 bg-gradient-to-t from-yellow-200/40 via-[#FFF7D1]/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

                    {/* Decorative yellow dot grid next to the popped-out head */}
                    <div className="absolute -top-6 -left-2 opacity-50 pointer-events-none hidden lg:block">
                      <YellowDotGrid rows={3} cols={3} dotColor="#F5D32F" />
                    </div>

                    <img
                      src={directors[1].image}
                      alt={directors[1].name}
                      className="relative z-10 w-auto max-h-[420px] sm:max-h-[480px] lg:max-h-[520px] xl:max-h-[560px] object-contain drop-shadow-[0_25px_35px_rgba(113,63,18,0.22)] transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Floating Name Card anchored at bottom of portrait */}
                    <div className="relative z-20 -mt-6 sm:-mt-8 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-[#F5D32F]/50 shadow-xl shadow-yellow-950/10 text-center max-w-xs w-full">
                      <h4 className="text-sm font-black text-[#292333]">
                        {directors[1].name}
                      </h4>
                      <p className="text-[11px] font-bold text-[#6B18A8] mt-0.5">
                        {isEn ? 'Technical Lead of LPH UIN Sunan Gunung Djati' : 'Pimpinan Teknis LPH UIN Sunan Gunung Djati'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right on Desktop (7 cols): Content & Executive Statement */}
                <div className="lg:col-span-7 flex flex-col justify-between order-1 lg:order-2">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold bg-[#F5EDFB] text-[#6B18A8] border border-[#C9A5E8] uppercase tracking-wider mb-4 shadow-xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#6B18A8]" />
                      {isEn ? 'Operational & Technical Lead of LPH UIN SGD' : 'Pimpinan Teknis & Operasional LPH UIN SGD'}
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#292333] tracking-tight">
                      Dr. Tri Cahyanto, M.Si.
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#756D7C] mt-1">
                      {isEn
                        ? 'Life Science Expert & Licensed Lead Auditor BPJPH Kemenag RI'
                        : 'Pakar Sains Hayati & Lead Auditor Halal Berlisensi BPJPH Kemenag RI'}
                    </p>

                    {/* Executive Quote Box */}
                    <div className="mt-6 p-6 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 shadow-xs relative">
                      <span className="text-4xl text-[#F5D32F] font-serif absolute top-3 left-4 select-none leading-none">“</span>
                      <p className="text-sm sm:text-base text-neutral-700 italic leading-relaxed pl-6 relative z-10 font-normal">
                        "{directors[1].quote}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. NEWS & UPDATE SECTION (Subtle Gradient Background) */}
      <section className="py-24 bg-gradient-to-b from-white via-[#FAF7FD]/70 to-[#FAF7FD]" id="berita">
        <div className="max-w-[1440px] xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-[#6b1282] border border-purple-200 uppercase tracking-wider mb-2">
                {isEn ? 'ARTICLES & REGULATION' : 'ARTIKEL & REGULASI'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1b183a] tracking-tight">
                {isEn ? 'LPH UIN Sunan Gunung Djati Updates' : 'Seputar LPH UIN Sunan Gunung Djati'}
              </h2>
            </div>
            <Link to="/berita" className="text-sm font-bold text-[#6b1282] hover:underline flex items-center gap-1">
              {isEn ? 'View All News' : 'Lihat Selengkapnya'} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category Tabs using HeroUI Tabs */}
          <div className="mb-8 overflow-x-auto max-w-full pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <Tabs
              selectedKey={activeTab}
              onSelectionChange={(key) => setActiveTab(key as string)}
              className="w-full min-w-max sm:min-w-0"
            >
              <Tabs.ListContainer>
                <Tabs.List aria-label={isEn ? "Article Categories" : "Kategori Artikel"} className="flex-nowrap whitespace-nowrap gap-1">
                  <Tabs.Tab
                    id="artikel"
                    className="data-[selected=true]:bg-[#6b1282] data-[selected=true]:text-white text-neutral-700 hover:text-[#6b1282] px-4 py-2 rounded-full font-semibold transition-all"
                  >
                    {isEn ? 'Key Articles & Regulations' : 'Artikel & Regulasi Utama'}
                  </Tabs.Tab>
                  <Tabs.Tab
                    id="uin_berita"
                    className="data-[selected=true]:bg-[#6b1282] data-[selected=true]:text-white text-neutral-700 hover:text-[#6b1282] px-4 py-2 rounded-full font-semibold transition-all"
                  >
                    {isEn ? 'LPH News & Activities' : 'Berita & Kegiatan LPH'}
                  </Tabs.Tab>
                  <Tabs.Tab
                    id="jurnal"
                    className="data-[selected=true]:bg-[#6b1282] data-[selected=true]:text-white text-neutral-700 hover:text-[#6b1282] px-4 py-2 rounded-full font-semibold transition-all"
                  >
                    {isEn ? 'Journal & Research (IJHR)' : 'Jurnal & Riset (IJHR)'}
                  </Tabs.Tab>
                  <Tabs.Tab
                    id="pelatihan"
                    className="data-[selected=true]:bg-[#6b1282] data-[selected=true]:text-white text-neutral-700 hover:text-[#6b1282] px-4 py-2 rounded-full font-semibold transition-all"
                  >
                    {isEn ? 'Training & Competence' : 'Pelatihan & Kompetensi'}
                  </Tabs.Tab>
                  <Tabs.Tab
                    id="fatwa"
                    className="data-[selected=true]:bg-[#6b1282] data-[selected=true]:text-white text-neutral-700 hover:text-[#6b1282] px-4 py-2 rounded-full font-semibold transition-all"
                  >
                    {isEn ? 'Fatwa & BPJPH Regulations' : 'Fatwa & Regulasi BPJPH'}
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
                      link: '/berita/akselerasi-sertifikasi-halal-uin-sgd',
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
                      link: '/berita/kerjasama-internasional-halalsphere-university',
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
                      link: '/berita/kewajiban-sertifikasi-halal-bertahap',
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
                      cat: 'LPH UIN SGD',
                      title: isEn
                        ? 'UIN SGD Bandung Strengthens Halal Audit Standards and National Coordination'
                        : 'UIN SGD Bandung Perkuat Standar Audit Halal dan Rakornas LPH',
                      desc: isEn
                        ? 'LPH UIN SGD consistently enhances auditor competencies to accelerate national industrial certification.'
                        : 'LPH UIN SGD konsisten meningkatkan mutu dan kompetensi auditor halal untuk akselerasi sertifikasi industri nasional.',
                      link: '/berita/akselerasi-sertifikasi-halal-uin-sgd',
                    },
                    {
                      img: '/assets/images/uin_sgd/uin_15.webp',
                      cat: 'AKREDITASI LPH',
                      title: isEn
                        ? 'LPH UIN Sunan Gunung Djati Achieves BPJPH Prime Accreditation'
                        : 'LPH UIN Sunan Gunung Djati Raih Peringkat Akreditasi Utama BPJPH',
                      desc: isEn
                        ? 'Official BPJPH accreditation recognizing high professional integrity in auditing food, pharmaceuticals, and consumer goods.'
                        : 'Pencapaian akreditasi resmi BPJPH Kemenag RI dalam penyelenggaraan audit kehalalan produk pangan, obat, dan barang gunaan secara profesional.',
                      link: '/berita/kerjasama-internasional-halalsphere-university',
                    },
                    {
                      img: '/assets/images/uin_sgd/uin_16.webp',
                      cat: isEn ? 'LEGALITY GUIDE' : 'PANDUAN REGULER',
                      title: isEn
                        ? 'Complete Guide to Regular SIHALAL Registration & SJPH Manual'
                        : 'Panduan Lengkap Pengajuan Sertifikasi Halal Reguler via SiHalal',
                      desc: isEn
                        ? 'Step-by-step guidance on risk-based NIB issuance and SiHalal raw material input selecting LPH-018-ID UIN SGD.'
                        : 'Langkah mudah pembuatan NIB berbasis risiko dan pengisian data bahan baku di portal SiHalal dengan memilih LPH UIN SGD.',
                      link: '/berita/kewajiban-sertifikasi-halal-bertahap',
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
                      cat: isEn ? 'IJHR JOURNAL' : 'JURNAL IJHR',
                      title: isEn
                        ? 'Indonesian Journal of Halal Research (IJHR) Vol. 6 No. 2'
                        : 'Indonesian Journal of Halal Research (IJHR) Vol. 6 No. 2',
                      desc: isEn
                        ? 'Peer-reviewed scientific periodical discussing innovations in bio-molecular halal authentication and global policy.'
                        : 'Publikasi jurnal ilmiah berkala yang membahas inovasi riset autentikasi halal hayati dan kebijakan halal global.',
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

              {/* Tab 4: Pelatihan & Kompetensi */}
              {activeTab === 'pelatihan' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      img: '/assets/images/uin_sgd/uin_16.webp',
                      cat: isEn ? 'SUPERVISOR TRAINING' : 'PELATIHAN PENYELIA',
                      title: isEn
                        ? 'Halal Supervisor Certification Based on National SKKNI'
                        : 'Pelatihan & Sertifikasi Penyelia Halal Berbasis SKKNI',
                      desc: isEn
                        ? 'Official competence training preparing internal enterprise halal management officers.'
                        : 'Bimbingan teknis resmi mencetak penyelia halal internal yang kompeten mengawal SJPH di perusahaan.',
                    },
                    {
                      img: '/assets/images/uin_sgd/uin_14.webp',
                      cat: isEn ? 'LEAD AUDITOR' : 'AUDITOR HALAL',
                      title: isEn
                        ? 'National Halal Lead Auditor Professional Program'
                        : 'Program Bimbingan Teknis Auditor Halal Nasional',
                      desc: isEn
                        ? 'Intensive certification licensed by BPJPH and BNSP for professional industrial auditors.'
                        : 'Pelatihan intensif berlisensi BPJPH dan BNSP untuk mencetak auditor halal profesional berintegritas tinggi.',
                    },
                    {
                      img: '/assets/images/uin_sgd/uin_15.webp',
                      cat: isEn ? 'JULEHA ACADEMY' : 'AKADEMI JULEHA',
                      title: isEn
                        ? 'Halal Slaughterer Competency Certification (JULEHA)'
                        : 'Sertifikasi Kompetensi Juru Sembelih Halal (JULEHA)',
                      desc: isEn
                        ? 'Elevating ruminant and poultry slaughtering competence to ensure end-to-end halal meat supply chain compliance.'
                        : 'Peningkatan kompetensi juru sembelih unggas dan ruminansia guna memastikan rantai pasok daging halal dari hulu ke hilir.',
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

      {/* 8. MITRA & AKREDITASI MARQUEE (Classy Soft Pearl Ivory with Subtle Purple Gradient) */}
      <section className="py-16 bg-gradient-to-r from-[#FAF7FD] via-[#F5EDFB]/60 to-[#FAF7FD] border-t border-purple-100/70 overflow-hidden">
        <div className="max-w-[1440px] xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10 text-center mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#6B18A8]">
            {isEn
              ? 'Affiliate Networks, Advisory Council & Official Accreditation Bodies'
              : 'Jaringan Afiliasi, Pembina & Lembaga Akreditasi Resmi'}
          </p>
        </div>
        <InfiniteMovingCards items={[...PARTNER_ITEMS, ...PARTNER_ITEMS]} direction="right" speed="normal" />
      </section>

      {/* 9. MAP LOCATION SECTION (Clean White & Lavender with Yellow Accents) */}
      <section className="py-24 bg-gradient-to-b from-white via-[#fdfbfe] to-[#f7f2fb] relative overflow-hidden" id="lokasi">
        <YellowDotGrid rows={3} cols={6} className="absolute top-8 right-10 opacity-25 pointer-events-none hidden lg:grid" />
        <div className="max-w-[1440px] xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <SectionHeader
            badge={isEn ? "OFFICE & LABORATORY LOCATION" : "LOKASI KANTOR & LABORATORIUM"}
            badgeColor="yellow"
            title={isEn ? "Central Office & Integrated Halal Testing Laboratory" : "Kantor Layanan & Laboratorium Pengujian Halal Terpadu"}
            subtitle={isEn
              ? "Visit our central service office and accredited testing laboratory located in the Integrated Campus Complex of UIN Sunan Gunung Djati Bandung."
              : "Kunjungi kantor pelayanan utama dan laboratorium pengujian terakreditasi resmi LPH UIN Sunan Gunung Djati Bandung."}
          />

          <div className="relative rounded-3xl p-[2px] bg-gradient-to-r from-[#4B0D78] via-[#6B18A8] via-[#F5D32F] to-[#4B0D78] shadow-2xl shadow-purple-950/10">
            <div className="bg-white rounded-[22px] p-3">
              <iframe
                title="Peta Kantor & Laboratorium LPH UIN SGD"
                width="100%"
                height="460"
                className="w-full h-[340px] sm:h-[460px] rounded-2xl border-0 shadow-inner"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${officeLocation.query}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              />
            </div>
          </div>

          {/* Active Office Location Info Card */}
          <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-white border border-[#C9A5E8]/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#F5EDFB] text-[#6B18A8] border border-[#C9A5E8]/30 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-bold text-sm sm:text-base text-neutral-900 truncate">
                    {officeLocation.title}
                  </h4>
                </div>
                <p className="text-xs text-neutral-600 mt-1 max-w-3xl leading-relaxed">
                  {officeLocation.address}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full md:w-auto shrink-0">
              <a
                href={officeLocation.gmapsDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial"
              >
                <Button
                  variant="primary"
                  className="w-full sm:w-auto bg-[#6B18A8] hover:bg-[#58138a] text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  {isEn ? 'Directions on Google Maps' : 'Petunjuk Arah Google Maps'}
                </Button>
              </a>
              <Link to="/kontak" className="flex-1 sm:flex-initial">
                <Button
                  variant="primary"
                  className="w-full sm:w-auto bg-[#F5D32F] hover:bg-[#eab308] text-[#3B074A] font-extrabold px-4 py-2 rounded-xl text-xs cursor-pointer shadow-xs flex items-center justify-center"
                >
                  {isEn ? 'Contact Info' : 'Info Kontak'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. PRE-FOOTER CALL TO ACTION BANNER (White + Soft Purple Canvas with Yellow Sparkles) */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#F7F2FB] to-[#FAF7FD] relative overflow-hidden">
        <YellowDotGrid rows={4} cols={6} className="absolute top-6 left-8 opacity-25 pointer-events-none hidden md:grid" />
        <YellowDotGrid rows={3} cols={5} className="absolute bottom-6 right-8 opacity-20 pointer-events-none hidden sm:grid" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-[#FFF7D1] text-[#713f12] border border-[#F5D32F] uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#eab308]" />
            {isEn ? 'OFFICIAL HALAL ASSISTANCE' : 'PENDAMPINGAN SERTIFIKASI HALAL'}
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#292333] tracking-tight leading-tight">
            {isEn ? 'Ready to Get ' : 'Siap Mendapatkan '}
            <YellowHighlight className="text-[#6B18A8]">
              {isEn ? 'Official Halal Assistance?' : 'Pendampingan Sertifikasi Halal?'}
            </YellowHighlight>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#756D7C] max-w-2xl mx-auto leading-relaxed">
            {isEn
              ? 'Get swift regular halal inspection, accredited laboratory testing, and professional advisory by certified lead auditors of LPH UIN SGD Bandung.'
              : 'Dapatkan pendampingan audit halal reguler, pengujian laboratorium terakreditasi resmi, dan sertifikasi bersama tim auditor berlisensi LPH UIN Sunan Gunung Djati Bandung.'}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/layanan/kalkulator">
              <Button
                variant="primary"
                className="bg-[#6B18A8] hover:bg-[#58138a] text-white font-extrabold px-8 py-3.5 rounded-xl text-sm sm:text-base shadow-lg shadow-purple-950/20 inline-flex items-center gap-2 cursor-pointer hover:scale-[1.02] transition-transform"
              >
                <Calculator className="w-5 h-5 text-purple-200" />
                {isEn ? 'Simulate Halal Fee Now' : 'Hitung Simulasi Tarif Halal'}
              </Button>
            </Link>
            <a
              href="https://wa.me/6282126493700"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="primary"
                className="bg-[#F5D32F] hover:bg-[#eab308] text-[#3B074A] font-extrabold px-8 py-3.5 rounded-xl text-sm sm:text-base shadow-md shadow-yellow-500/20 inline-flex items-center gap-2 cursor-pointer hover:scale-[1.02] transition-transform"
              >
                <Phone className="w-5 h-5 text-[#3B074A]" />
                {isEn ? 'WhatsApp Official Desk' : 'Konsultasi WhatsApp Resmi'}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

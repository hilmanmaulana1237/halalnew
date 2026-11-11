import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@heroui/react';
import {
  Menu,
  X,
  Home,
  ChevronDown,
  Calculator,
  ShieldAlert,
  Smile,
  BookOpen,
  HelpCircle,
  Newspaper,
  Bell,
  Phone,
  Sparkles,
  ShieldCheck,
  Users,
  FlaskConical,
  GraduationCap,
  Award,
  MapPin,
  Building2,
  Image as ImageIcon
} from 'lucide-react';
import {
  MegaMenuItem,
  MenuCardItem,
  FeaturedPreviewCard,
  MenuFooter,
  BlueprintBadge
} from '@/components/ui/navbar-mega-menu';
import { useLanguage } from '@/context/LanguageContext';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<any>(null);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top 4-Color Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#4B0D78] via-[#6B18A8] via-[#F5D32F] to-[#6B18A8]" />

      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-purple-100/70 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo: Official LPH Banner from User Upload */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img
                src="/assets/images/uin_sgd/logo_lph_official_purple.webp"
                alt="Lembaga Pemeriksa Halal UIN SGD Bandung"
                className="h-12 sm:h-13 w-auto object-contain rounded-lg shadow-xs hover:scale-105 transition-transform"
              />
            </Link>

            {/* Desktop Navigation (Modern Classic Typography) */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${isActive('/')
                  ? 'text-[#6B18A8] bg-[#F5EDFB] shadow-xs border-b-2 border-[#F5D32F]'
                  : 'text-[#292333] hover:text-[#6B18A8] hover:bg-[#F5EDFB]/60'
                  }`}
              >
                {t('nav_home')}
              </Link>

              {/* Mega Menu 1: Tentang Kami */}
              <MegaMenuItem
                title={language === 'en' ? 'About Us' : 'Tentang Kami'}
                isActive={activeDropdown === 'tentang'}
                onMouseEnter={() => handleMouseEnter('tentang')}
                onMouseLeave={handleMouseLeave}
                onClick={() => toggleDropdown('tentang')}
              >
                <div className="w-[820px] max-w-[94vw]">
                  <div className="grid grid-cols-12 gap-3.5 items-stretch">
                    {/* Left Sub-card (7 cols): Screenshot 1 "Get started" style */}
                    <div className="col-span-7 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 p-4 sm:p-5 flex flex-col justify-between hover:border-[#6B18A8]/40 transition-colors">
                      <div className="text-xs font-bold text-[#6B18A8] mb-3 tracking-wide flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5D32F]" />
                        <span>{language === 'en' ? 'INSTITUTIONAL PROFILE' : 'PROFIL & KELEMBAGAAN LPH'}</span>
                      </div>
                      <div className="space-y-1 flex-1 flex flex-col justify-between">
                        <MenuCardItem
                          icon={<BookOpen className="w-4 h-4" />}
                          title={language === 'en' ? 'Profile & History' : 'Profil & Sejarah LPH'}
                          description={language === 'en'
                            ? 'Establishment history, MUI sharia fatwa foundation, and Halalsphere University vision.'
                            : "Sejarah pendirian, landasan fatwa syar'i MUI, dan visi riset Halalsphere University."}
                          to="/tentang"
                          onClick={() => setActiveDropdown(null)}
                        />
                        <MenuCardItem
                          icon={<ShieldCheck className="w-4 h-4" />}
                          title={language === 'en' ? 'Accreditation & Legality' : 'Akreditasi & Legalitas Resmi'}
                          description={language === 'en'
                            ? 'Official BPJPH decree No. LPH-018-ID and KAN ISO/IEC 17025 recognition.'
                            : 'Regulasi resmi BPJPH No. LPH-018-ID dan pengakuan KAN ISO/IEC 17025.'}
                          to="/tentang"
                          badge="LPH-018-ID"
                          badgeVariant="purple"
                          onClick={() => setActiveDropdown(null)}
                        />
                        <MenuCardItem
                          icon={<HelpCircle className="w-4 h-4" />}
                          title={language === 'en' ? 'FAQ & Halal QnA' : 'Tanya Jawab & Halal QnA'}
                          description={language === 'en'
                            ? 'Official guidelines on certification procedures, audit workflows, and SIHALAL documents.'
                            : 'Kumpulan jawaban resmi seputar persyaratan, alur audit, dan dokumen SIHALAL.'}
                          to="/layanan/qna"
                          badge="FAQ"
                          badgeVariant="sky"
                          onClick={() => setActiveDropdown(null)}
                        />
                      </div>
                    </div>

                    {/* Right Sub-card (5 cols): Screenshot 2 Featured Visual Card */}
                    <div className="col-span-5 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 p-3.5 sm:p-4 flex flex-col justify-between hover:border-[#6B18A8]/40 transition-colors">
                      <FeaturedPreviewCard
                        image="/assets/images/certificate.png"
                        title={language === 'en' ? 'Official LPH Accreditation' : 'Sertifikat Akreditasi LPH'}
                        badge={language === 'en' ? 'BPJPH Certified' : 'Resmi BPJPH'}
                        badgeVariant="sky"
                        description={language === 'en'
                          ? 'National benchmark Halal Inspection Agency under UIN Sunan Gunung Djati Bandung.'
                          : 'Lembaga Pemeriksa Halal rujukan nasional di bawah naungan UIN Sunan Gunung Djati Bandung.'}
                        to="/tentang"
                        actionText={language === 'en' ? 'Learn Institutional Profile' : 'Pelajari Profil Lembaga'}
                        onClick={() => setActiveDropdown(null)}
                      />
                    </div>
                  </div>

                  {/* Bottom Footer Bar (Screenshot 1 Community style) */}
                  <MenuFooter
                    label={language === 'en' ? 'Campus Service Hubs' : 'Sentra Jaringan Layanan'}
                    links={[
                      { label: language === 'en' ? 'Campus 1 Cibiru' : 'Kampus 1 Cibiru Bandung', to: '/kontak' },
                      { label: language === 'en' ? 'Bio Lab Campus 2' : 'Lab Hayati Kampus 2', to: '/kontak' },
                      { label: language === 'en' ? 'Eastern Priangan Hub' : 'Sentra Priangan Timur', to: '/kontak' },
                      { label: language === 'en' ? 'Ciayumajakuning Hub' : 'Sentra Ciayumajakuning', to: '/kontak' },
                    ]}
                    onClick={() => setActiveDropdown(null)}
                  />
                </div>
              </MegaMenuItem>

              {/* Mega Menu 2: Layanan LPH */}
              <MegaMenuItem
                title={language === 'en' ? 'Halal Services' : 'Layanan LPH'}
                isActive={activeDropdown === 'layanan'}
                onMouseEnter={() => handleMouseEnter('layanan')}
                onMouseLeave={handleMouseLeave}
                onClick={() => toggleDropdown('layanan')}
              >
                <div className="w-[840px] max-w-[95vw]">
                  <div className="grid grid-cols-12 gap-3.5 items-stretch">
                    {/* Left Sub-card (7 cols): Main Services Rich Cards */}
                    <div className="col-span-7 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 p-4 sm:p-5 flex flex-col justify-between hover:border-[#6B18A8]/40 transition-colors">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B18A8] mb-3 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5D32F]" />
                        <span>{language === 'en' ? 'MAIN HALAL SERVICES' : 'LAYANAN UTAMA LPH'}</span>
                      </div>
                      <div className="space-y-1 flex-1 flex flex-col justify-between">
                        <MenuCardItem
                          icon={<Calculator className="w-4 h-4" />}
                          title={language === 'en' ? 'Tariff Calculator' : 'Kalkulator Tarif Halal'}
                          description={language === 'en'
                            ? 'Simulate estimated regular halal audit fees in accordance with official KMA 784.'
                            : 'Simulasi perhitungan estimasi tarif audit halal reguler sesuai regulasi resmi KMA 784.'}
                          to="/layanan/kalkulator"
                          badge={language === 'en' ? 'Popular' : 'Populer'}
                          badgeVariant="yellow"
                          onClick={() => setActiveDropdown(null)}
                        />
                        <MenuCardItem
                          icon={<Smile className="w-4 h-4" />}
                          title={language === 'en' ? 'Public Satisfaction Survey (IKM)' : 'Survei Kepuasan (IKM)'}
                          description={language === 'en'
                            ? 'Community satisfaction questionnaire for public transparency and audit quality evaluation.'
                            : 'Kuesioner evaluasi mutu pelayanan publik dan indeks kepuasan pelaku usaha.'}
                          to="/layanan/kepuasan"
                          badge={language === 'en' ? 'Survey' : 'IKM Resmi'}
                          badgeVariant="emerald"
                          onClick={() => setActiveDropdown(null)}
                        />
                        <MenuCardItem
                          icon={<Building2 className="w-4 h-4" />}
                          title={language === 'en' ? 'Facility & Slaughterhouse Audit' : 'Pemeriksaan Fasilitas & RPH'}
                          description={language === 'en'
                            ? 'On-site facility inspection, raw material validation, and slaughterhouse audit by licensed lead auditors.'
                            : 'Pemeriksaan lapangan fasilitas manufaktur, validasi bahan baku, dan audit RPH oleh auditor resmi.'}
                          to="/layanan/kalkulator"
                          badge={language === 'en' ? 'Audit LPH' : 'Audit LPH'}
                          badgeVariant="sky"
                          onClick={() => setActiveDropdown(null)}
                        />
                        <MenuCardItem
                          icon={<FlaskConical className="w-4 h-4" />}
                          title={language === 'en' ? 'Integrated Bio Lab' : 'Laboratorium Hayati Terpadu'}
                          description={language === 'en'
                            ? 'High-precision qPCR porcine DNA and GC-FID ethanol testing with ISO 17025 standards.'
                            : 'Uji saintifik qPCR DNA porcine, uji alkohol GC-FID, dan analisis gelatin terakreditasi KAN.'}
                          href="https://halal.uinsgd.ac.id/laboratorium-pengujian-halal/"
                          badge="ISO 17025"
                          badgeVariant="purple"
                          onClick={() => setActiveDropdown(null)}
                        />
                      </div>
                    </div>

                    {/* Right Sub-card (5 cols): Pengaduan & Whistleblowing */}
                    <div className="col-span-5 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 p-3.5 sm:p-4 flex flex-col justify-between hover:border-[#6B18A8]/40 transition-colors">
                      <FeaturedPreviewCard
                        image="/assets/images/value-integritas.jpg"
                        title={language === 'en' ? 'Whistleblowing & Complaints' : 'Pengaduan & Whistleblowing'}
                        badge={language === 'en' ? 'Main Feature' : 'Fitur Utama'}
                        badgeVariant="yellow"
                        description={language === 'en'
                          ? 'Official confidential channel to report violations, auditor ethics, or sharia compliance issues.'
                          : 'Kanal resmi pengaduan pelanggaran proses sertifikasi halal, kode etik auditor, dan integritas kepatuhan syariah.'}
                        to="/layanan/pengaduan"
                        actionText={language === 'en' ? 'Submit Whistleblower Report' : 'Kirim Laporan Pengaduan'}
                        onClick={() => setActiveDropdown(null)}
                      />
                    </div>
                  </div>

                  {/* Bottom Footer Bar */}
                  <MenuFooter
                    label={language === 'en' ? 'Official Public Channels & Help' : 'Kanal Publik & Bantuan Resmi'}
                    links={[
                      { label: language === 'en' ? 'Whistleblower System' : 'Pengaduan Whistleblowing', to: '/layanan/pengaduan' },
                      { label: language === 'en' ? 'Satisfaction Index' : 'Survei Kepuasan (IKM)', to: '/layanan/kepuasan' },
                      { label: 'Portal SIHALAL BPJPH', href: 'https://ptsp.halal.go.id/' },
                      { label: language === 'en' ? 'WhatsApp Helpdesk' : 'WhatsApp Layanan', href: 'https://wa.me/6282126493700' },
                    ]}
                    onClick={() => setActiveDropdown(null)}
                  />
                </div>
              </MegaMenuItem>

              {/* Mega Menu 3: News & Update */}
              <MegaMenuItem
                title={language === 'en' ? 'News & Media' : 'News & Update'}
                isActive={activeDropdown === 'news'}
                onMouseEnter={() => handleMouseEnter('news')}
                onMouseLeave={handleMouseLeave}
                onClick={() => toggleDropdown('news')}
              >
                <div className="w-[520px] max-w-[94vw]">
                  <div className="rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 p-4 sm:p-5 flex flex-col justify-between hover:border-[#6B18A8]/40 transition-colors">
                    <div className="text-xs font-bold text-[#6B18A8] mb-3 tracking-wide flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F5D32F]" />
                      <span>{language === 'en' ? 'PUBLICATIONS & CIRCULARS' : 'PUBLIKASI & PENGUMUMAN RESMI'}</span>
                    </div>
                    <div className="space-y-1.5">
                      <MenuCardItem
                        icon={<Newspaper className="w-4 h-4" />}
                        title={language === 'en' ? 'LPH News & Activities' : 'Berita & Kegiatan LPH'}
                        description={language === 'en'
                          ? 'Field audit coverage, scientific seminars, workshops, and official press releases.'
                          : 'Liputan audit lapangan, seminar ilmiah, workshop, dan siaran pers resmi.'}
                        to="/berita"
                        badge={language === 'en' ? 'Latest' : 'Terbaru'}
                        badgeVariant="sky"
                        onClick={() => setActiveDropdown(null)}
                      />
                      <MenuCardItem
                        icon={<ImageIcon className="w-4 h-4" />}
                        title={language === 'en' ? 'Activity & Documentation Gallery' : 'Galeri Kegiatan & Dokumentasi'}
                        description={language === 'en'
                          ? 'Visual documentation of on-site audits, ISO 17025 lab testing, and JULEHA training.'
                          : 'Dokumentasi visual audit lapangan industri, pengujian lab ISO 17025, dan bimbingan JULEHA.'}
                        to="/galeri"
                        badge={language === 'en' ? 'Gallery' : 'Galeri'}
                        badgeVariant="yellow"
                        onClick={() => setActiveDropdown(null)}
                      />
                      <MenuCardItem
                        icon={<Bell className="w-4 h-4" />}
                        title={language === 'en' ? 'Official Announcements' : 'Pengumuman Resmi BPJPH'}
                        description={language === 'en'
                          ? 'BPJPH circulars, fatwa session schedules, and crucial business notices.'
                          : 'Surat edaran BPJPH, jadwal sidang fatwa, dan informasi penting pelaku usaha.'}
                        href="https://bpjph.halal.go.id/category/pengumuman"
                        badge={language === 'en' ? 'Notice' : 'Edaran'}
                        badgeVariant="purple"
                        onClick={() => setActiveDropdown(null)}
                      />
                    </div>
                  </div>

                  {/* Bottom Footer Bar */}
                  <MenuFooter
                    label={language === 'en' ? 'Official Documents & Research' : 'Dokumen & Riset Resmi'}
                    links={[
                      { label: language === 'en' ? 'Download SJPH Manual' : 'Unduh Pedoman SJPH', to: '/berita' },
                      { label: language === 'en' ? 'Activity Gallery' : 'Galeri Foto Kegiatan', to: '/galeri' },
                    ]}
                    onClick={() => setActiveDropdown(null)}
                  />
                </div>
              </MegaMenuItem>

              <Link
                to="/kontak"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${isActive('/kontak')
                  ? 'text-[#6B18A8] bg-[#F5EDFB] shadow-xs border-b-2 border-[#F5D32F]'
                  : 'text-[#292333] hover:text-[#6B18A8] hover:bg-[#F5EDFB]/60'
                  }`}
              >
                {t('nav_contact')}
              </Link>
            </nav>

            {/* Actions: Modern Purple CTA with Yellow Sparkle & Language */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/layanan/kalkulator">
                <Button
                  variant="primary"
                  className="bg-[#6B18A8] hover:bg-[#4B0D78] text-white font-bold px-5 py-2.5 rounded-full text-xs sm:text-sm shadow-md shadow-purple-950/20 transition-all flex items-center gap-2 hover:scale-105 active:scale-98 cursor-pointer"
                >
                  <span>{t('nav_calc_fee')}</span>
                </Button>
              </Link>
              <div className="flex items-center gap-1 text-xs font-bold text-neutral-500 border-l border-[#C9A5E8]/40 pl-3">
                <button
                  type="button"
                  onClick={() => setLanguage('id')}
                  className={`px-2.5 py-1 rounded-xl transition-all duration-200 cursor-pointer ${language === 'id'
                    ? 'bg-[#6B18A8] text-white font-black shadow-xs ring-1 ring-[#F5D32F]'
                    : 'text-[#756D7C] hover:text-[#6B18A8] hover:bg-[#F5EDFB]'
                    }`}
                >
                  ID
                </button>
                <span className="text-[#C9A5E8]">|</span>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 rounded-xl transition-all duration-200 cursor-pointer ${language === 'en'
                    ? 'bg-[#6B18A8] text-white font-black shadow-xs ring-1 ring-[#F5D32F]'
                    : 'text-[#756D7C] hover:text-[#6B18A8] hover:bg-[#F5EDFB]'
                    }`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Mobile Menu Button (Android Native Style from HMI) */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-xl border border-purple-200/80 bg-purple-50/80 text-[#6b1282] hover:bg-purple-100 transition active:scale-95 cursor-pointer"
                onClick={() => setMobileOpen((value) => !value)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header >

      {/* Mobile Backdrop Overlay (HMI Android style) */}
      <div
        className={`fixed inset-0 z-[60] bg-purple-950/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${mobileOpen ? "visible opacity-100 pointer-events-auto" : "invisible opacity-0 pointer-events-none"
          }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />

      {/* Mobile Aside Drawer Container (HMI Android style with rounded-l-[2.5rem]) */}
      <aside
        className={`fixed right-0 top-0 z-[80] h-dvh w-[86%] max-w-[360px] overflow-y-auto rounded-l-[2.5rem] bg-gradient-to-b from-white via-[#faf5ff] to-[#f5e8ff] px-5 pb-10 pt-6 shadow-[-20px_0_60px_rgba(107,18,130,0.22)] transition-transform duration-300 ease-out lg:hidden ${mobileOpen ? "pointer-events-auto translate-x-0" : "pointer-events-none translate-x-full"
          }`}
        aria-hidden={!mobileOpen}
      >
        {/* Top Header: Brand Logo & Elevated Circular Close Button */}
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-purple-100">
          <img
            src="/assets/images/uin_sgd/logo_lph_official_purple.webp"
            alt="LPH UIN SGD"
            className="h-10 w-auto object-contain rounded-lg shadow-2xs"
          />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-full bg-[#6b1282] text-white shadow-[0_8px_20px_rgba(107,18,130,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Tutup menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Language Selector Pill */}
        <div className="mb-4 flex items-center justify-between p-2 rounded-2xl bg-purple-100/70 border border-purple-200/60">
          <span className="text-xs font-bold text-neutral-700 pl-2">
            {language === 'en' ? 'Language' : 'Pilihan Bahasa'}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setLanguage('id')}
              className={`px-3 py-1 rounded-xl text-xs font-extrabold transition cursor-pointer ${language === 'id' ? 'bg-[#6b1282] text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                }`}
            >
              ID
            </button>
            <span className="text-purple-300">|</span>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-xl text-xs font-extrabold transition cursor-pointer ${language === 'en' ? 'bg-[#6b1282] text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Navigation Items (HMI Style Mobile Group & Mobile Link) */}
        <MobileLink to="/" icon={Home} label={t('nav_home')} onClick={() => setMobileOpen(false)} />

        <MobileGroup
          label={language === 'en' ? 'About Us' : 'Tentang Kami'}
          defaultOpen={true}
          links={[
            { label: language === 'en' ? 'Profile & History' : 'Profil & Sejarah LPH', to: '/tentang', icon: BookOpen },
            { label: language === 'en' ? 'Accreditation & Legality' : 'Akreditasi & Legalitas Resmi', to: '/tentang', icon: ShieldCheck },
            { label: language === 'en' ? 'FAQ & Halal QnA' : 'FAQ & Halal QnA', to: '/layanan/qna', icon: HelpCircle },
          ]}
          onNavigate={() => setMobileOpen(false)}
        />

        <MobileGroup
          label={language === 'en' ? 'Halal Services' : 'Layanan LPH'}
          links={[
            { label: language === 'en' ? 'Tariff Calculator' : 'Kalkulator Tarif Halal', to: '/layanan/kalkulator', icon: Calculator },
            { label: language === 'en' ? 'Whistleblowing & Complaints' : 'Pengaduan & Whistleblowing', to: '/layanan/pengaduan', icon: ShieldAlert },
            { label: language === 'en' ? 'Satisfaction Survey (IKM)' : 'Survei Kepuasan (IKM)', to: '/layanan/kepuasan', icon: Smile },
            { label: language === 'en' ? 'Facility & RPH Audit' : 'Pemeriksaan Fasilitas & RPH', to: '/layanan/kalkulator', icon: Building2 },
            { label: language === 'en' ? 'Integrated Bio Lab' : 'Laboratorium Hayati Terpadu', href: 'https://halal.uinsgd.ac.id/laboratorium-pengujian-halal/', icon: FlaskConical },
          ]}
          onNavigate={() => setMobileOpen(false)}
        />

        <MobileGroup
          label={language === 'en' ? 'News & Media' : 'News & Update'}
          links={[
            { label: language === 'en' ? 'News & Activities' : 'Berita & Kegiatan LPH', to: '/berita', icon: Newspaper },
            { label: language === 'en' ? 'Activity Gallery' : 'Galeri Kegiatan LPH', to: '/galeri', icon: ImageIcon },
            { label: language === 'en' ? 'Official Announcements' : 'Pengumuman Resmi BPJPH', href: 'https://bpjph.halal.go.id/category/pengumuman', icon: Bell },
          ]}
          onNavigate={() => setMobileOpen(false)}
        />

        <MobileLink to="/kontak" icon={Phone} label={t('nav_contact')} onClick={() => setMobileOpen(false)} />

        {/* Accent CTA Button like HMI */}
        <MobileLink
          to="/layanan/kalkulator"
          icon={Calculator}
          label={t('nav_calc_fee')}
          onClick={() => setMobileOpen(false)}
          accent
        />

        {/* Direct WhatsApp Consultation Button */}
        <a
          href="https://wa.me/6282126493700"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileOpen(false)}
          className="mt-3 flex items-center justify-center gap-2 rounded-2xl border border-[#F5D32F] bg-[#FFF7D1] px-4 py-3 text-xs font-bold text-[#713f12] shadow-xs hover:bg-[#fef08a] transition"
        >
          <Phone className="h-4 w-4 text-[#713f12]" />
          <span>WhatsApp Layanan & Konsultasi</span>
        </a>
      </aside >
    </>
  );
};

/* HMI Android Style Mobile Sub-components */
type IconType = React.ComponentType<{ className?: string }>;

function MobileLink({
  to,
  href,
  label,
  icon: Icon,
  onClick,
  accent,
}: {
  to?: string;
  href?: string;
  label: string;
  icon: IconType;
  onClick: () => void;
  accent?: boolean;
}) {
  const isExternal = !!href;
  const content = (
    <span className="inline-flex items-center gap-3">
      <Icon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </span>
  );

  const className = `mb-2 flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-extrabold transition shadow-xs cursor-pointer ${accent
    ? "bg-[#6B18A8] text-white shadow-md shadow-purple-950/20 hover:bg-[#4B0D78] border border-[#F5D32F]/40"
    : "bg-[#F5EDFB]/70 text-[#292333] hover:bg-[#F5EDFB] hover:text-[#6B18A8] border border-[#C9A5E8]/40"
    }`;

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={to || "/"} onClick={onClick} className={className}>
      {content}
    </Link>
  );
}

function MobileGroup({
  label,
  links,
  onNavigate,
  defaultOpen = false,
}: {
  label: string;
  links: Array<{ label: string; href?: string; to?: string; icon: IconType }>;
  onNavigate: () => void;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <details
      className="group mb-2"
      open={isOpen}
      onToggle={(e) => setIsOpen(e.currentTarget.open)}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between rounded-2xl bg-purple-50/70 px-4 py-3.5 text-sm font-black text-[#1a0726] border border-purple-100/60 transition hover:bg-purple-100/70">
        <span>{label}</span>
        <ChevronDown className="h-4 w-4 text-[#6b1282] transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="ml-4 mt-2 grid gap-1.5 border-l-2 border-[#6b1282] pl-3">
        {links.map((item, idx) => {
          const isExternal = !!item.href;
          const content = (
            <>
              <item.icon className="h-4 w-4 text-[#6b1282] shrink-0" />
              <span className="truncate">{item.label}</span>
            </>
          );
          const itemClass = "flex items-center gap-3 rounded-xl border border-purple-100/80 bg-white px-4 py-2.5 text-xs font-bold text-neutral-700 hover:text-[#6b1282] hover:bg-purple-50 transition shadow-2xs cursor-pointer";

          if (item.href) {
            return (
              <a
                key={idx}
                href={item.href}
                onClick={onNavigate}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className={itemClass}
              >
                {content}
              </a>
            );
          }

          return (
            <Link key={idx} to={item.to || "/"} onClick={onNavigate} className={itemClass}>
              {content}
            </Link>
          );
        })}
      </div>
    </details>
  );
}

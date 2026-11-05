import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Drawer, Label } from '@heroui/react';
import {
  Menu,
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
  Award
} from 'lucide-react';
import {
  MegaMenuItem,
  MenuCardItem,
  MenuCategoryGrid,
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
      {/* Top Royal Purple Line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#4a0d5c] via-[#6b1282] to-[#86198f]" />

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
                  ? 'text-[#6b1282] bg-purple-50/90 shadow-xs'
                  : 'text-neutral-700 hover:text-[#6b1282] hover:bg-purple-50/40'
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
                    <div className="col-span-7 rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 sm:p-5 flex flex-col justify-between hover:border-white/[0.12] transition-colors">
                      <div className="text-xs font-semibold text-neutral-400 mb-3 tracking-wide">
                        {language === 'en' ? 'INSTITUTIONAL PROFILE' : 'PROFIL & KELEMBAGAAN LPH'}
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
                    <div className="col-span-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] p-3.5 sm:p-4 flex flex-col justify-between hover:border-white/[0.12] transition-colors">
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

              {/* Mega Menu 2: Layanan LPH (Screenshot 2 "Blocks by section" 3-column style) */}
              <MegaMenuItem
                title={language === 'en' ? 'Halal Services' : 'Layanan LPH'}
                isActive={activeDropdown === 'layanan'}
                onMouseEnter={() => handleMouseEnter('layanan')}
                onMouseLeave={handleMouseLeave}
                onClick={() => toggleDropdown('layanan')}
              >
                <div className="w-[860px] max-w-[95vw]">
                  <div className="grid grid-cols-12 gap-3.5 items-stretch">
                    {/* Left Sub-card (7 cols): Screenshot 2 3-Column Category Grid */}
                    <div className="col-span-7 rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 sm:p-5 flex flex-col justify-between hover:border-white/[0.12] transition-colors">
                      <MenuCategoryGrid
                        title={language === 'en' ? 'SERVICES BY CATEGORY' : 'SEMUA LAYANAN BERDASARKAN KATEGORI'}
                        items={[
                          { label: language === 'en' ? 'Tariff Calculator' : 'Kalkulator Tarif', to: '/layanan/kalkulator' },
                          { label: 'Self Declare', href: 'https://halal.uinsgd.ac.id/sertifikasi-halal-self-declare/' },
                          { label: language === 'en' ? 'Regular Audit' : 'Audit Reguler', to: '/layanan/kalkulator' },
                          { label: language === 'en' ? 'Facility Audit' : 'Audit Fasilitas', to: '/layanan/qna' },
                          { label: language === 'en' ? 'Slaughterhouse' : 'Audit RPH & RPU', to: '/layanan/qna' },
                          { label: language === 'en' ? 'Bio Laboratory' : 'Lab Hayati', href: 'https://halal.uinsgd.ac.id/laboratorium-pengujian-halal/' },
                          { label: language === 'en' ? 'Porcine DNA Test' : 'Uji DNA Babi', href: 'https://halal.uinsgd.ac.id/laboratorium-pengujian-halal/' },
                          { label: language === 'en' ? 'Ethanol Test' : 'Uji Etanol', href: 'https://halal.uinsgd.ac.id/laboratorium-pengujian-halal/' },
                          { label: language === 'en' ? 'Gelatin Test' : 'Uji Gelatin', href: 'https://halal.uinsgd.ac.id/laboratorium-pengujian-halal/' },
                          { label: language === 'en' ? 'Juleha Training' : 'Pelatihan Juleha', to: '/layanan/qna' },
                          { label: language === 'en' ? 'Whistleblowing' : 'Pengaduan', to: '/layanan/pengaduan' },
                          { label: language === 'en' ? 'Satisfaction Index' : 'Survei IKM', to: '/layanan/kepuasan' },
                          { label: language === 'en' ? 'Halal QnA' : 'Halal QnA', to: '/layanan/qna' },
                          { label: 'Portal SIHALAL', href: 'https://ptsp.halal.go.id/' },
                          { label: language === 'en' ? 'SJPH Consultation' : 'Konsultasi SJPH', to: '/kontak' },
                        ]}
                        actionText={language === 'en' ? 'Explore All in Tariff Calculator ->' : 'Lihat Semua di Kalkulator Tarif ->'}
                        actionTo="/layanan/kalkulator"
                        onClick={() => setActiveDropdown(null)}
                      />
                    </div>

                    {/* Right Sub-card (5 cols): Screenshot 2 Featured Visual Card with Photo */}
                    <div className="col-span-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] p-3.5 sm:p-4 flex flex-col justify-between hover:border-white/[0.12] transition-colors">
                      <FeaturedPreviewCard
                        image="/assets/images/uji-laboratorium.jpg"
                        title={language === 'en' ? 'Certified Halal Laboratory' : 'Laboratorium Halal Terpadu'}
                        badge="ISO 17025"
                        badgeVariant="sky"
                        description={language === 'en'
                          ? 'High-precision qPCR DNA & GC-FID ethanol testing with international KAN ISO/IEC 17025 accreditation.'
                          : 'Pengujian saintifik presisi tinggi untuk qPCR DNA porcine dan alkohol GC-FID standar akreditasi KAN ISO 17025.'}
                        to="/layanan/kalkulator"
                        actionText={language === 'en' ? 'Simulate Audit & Fees' : 'Simulasi Biaya & Jadwal Audit'}
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
                      { label: language === 'en' ? 'WhatsApp Helpdesk' : 'WhatsApp Layanan', href: 'https://wa.me/6282118201232' },
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
                <div className="w-[820px] max-w-[94vw]">
                  <div className="grid grid-cols-12 gap-3.5 items-stretch">
                    {/* Left Sub-card (7 cols): Screenshot 1 "Get started" style */}
                    <div className="col-span-7 rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 sm:p-5 flex flex-col justify-between hover:border-white/[0.12] transition-colors">
                      <div className="text-xs font-semibold text-neutral-400 mb-3 tracking-wide">
                        {language === 'en' ? 'PUBLICATIONS & CIRCULARS' : 'PUBLIKASI, RISET & PENGUMUMAN'}
                      </div>
                      <div className="space-y-1 flex-1 flex flex-col justify-between">
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
                          icon={<Bell className="w-4 h-4" />}
                          title={language === 'en' ? 'Official Announcements' : 'Pengumuman Resmi BPJPH'}
                          description={language === 'en'
                            ? 'BPJPH circulars, fatwa session schedules, and crucial business notices.'
                            : 'Surat edaran BPJPH, jadwal sidang fatwa, dan informasi penting pelaku usaha.'}
                          to="/pengumuman"
                          badge={language === 'en' ? 'Notice' : 'Edaran'}
                          badgeVariant="purple"
                          onClick={() => setActiveDropdown(null)}
                        />
                        <MenuCardItem
                          icon={<GraduationCap className="w-4 h-4" />}
                          title={language === 'en' ? 'Halal Research Journal (IJHR)' : 'Jurnal Riset Halal (IJHR)'}
                          description={language === 'en'
                            ? 'Indonesian Journal of Halal Research nationally accredited by SINTA.'
                            : 'Indonesian Journal of Halal Research terakreditasi SINTA 2 nasional.'}
                          href="https://journal.uinsgd.ac.id/index.php/ijhar"
                          badge="SINTA 2"
                          badgeVariant="emerald"
                          onClick={() => setActiveDropdown(null)}
                        />
                      </div>
                    </div>

                    {/* Right Sub-card (5 cols): Screenshot 2 Featured Visual Card with Photo */}
                    <div className="col-span-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] p-3.5 sm:p-4 flex flex-col justify-between hover:border-white/[0.12] transition-colors">
                      <FeaturedPreviewCard
                        image="/assets/images/uin_sgd/uin_07.webp"
                        title={language === 'en' ? 'World Halal Conference' : 'Konferensi Halal Dunia'}
                        badge={language === 'en' ? 'Global Agenda' : 'Agenda Global'}
                        badgeVariant="sky"
                        description={language === 'en'
                          ? 'Strengthening global halal industry ecosystem through scientific research and sharia compliance.'
                          : 'Penguatan ekosistem industri halal dunia melalui kolaborasi saintifik dan kepatuhan syariah.'}
                        to="/berita"
                        actionText={language === 'en' ? 'Read Full Story' : 'Baca Kabar Selengkapnya'}
                        onClick={() => setActiveDropdown(null)}
                      />
                    </div>
                  </div>

                  {/* Bottom Footer Bar */}
                  <MenuFooter
                    label={language === 'en' ? 'Official Documents & Research' : 'Dokumen & Riset Resmi'}
                    links={[
                      { label: language === 'en' ? 'Download SJPH Manual' : 'Unduh Pedoman SJPH', to: '/berita' },
                      { label: language === 'en' ? 'SINTA Journal Archive' : 'Arsip Publikasi SINTA', href: 'https://journal.uinsgd.ac.id/index.php/ijhar' },
                      { label: language === 'en' ? 'Activity Gallery' : 'Galeri Foto Kegiatan', to: '/berita' },
                    ]}
                    onClick={() => setActiveDropdown(null)}
                  />
                </div>
              </MegaMenuItem>

              <Link
                to="/kontak"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${isActive('/kontak')
                  ? 'text-[#6b1282] bg-purple-50/90 shadow-xs'
                  : 'text-neutral-700 hover:text-[#6b1282] hover:bg-purple-50/40'
                  }`}
              >
                {t('nav_contact')}
              </Link>
            </nav>

            {/* Actions: Modern Classic Purple CTA & Language */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/layanan/kalkulator">
                <Button
                  variant="primary"
                  className="bg-[#6b1282] hover:bg-[#581c87] text-white font-bold px-5 py-2.5 rounded-full text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5"
                >
                  {t('nav_calc_fee')}
                </Button>
              </Link>
              <div className="flex items-center gap-1 text-xs font-bold text-neutral-500 border-l border-neutral-200 pl-3">
                <button
                  type="button"
                  onClick={() => setLanguage('id')}
                  className={`px-2 py-1 rounded-lg transition-all duration-200 ${language === 'id'
                      ? 'bg-purple-100 text-[#6b1282] font-black shadow-2xs'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                >
                  ID
                </button>
                <span className="text-neutral-300">|</span>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 rounded-lg transition-all duration-200 ${language === 'en'
                      ? 'bg-purple-100 text-[#6b1282] font-black shadow-2xs'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Button
                variant="ghost"
                aria-label="Buka Menu"
                className="p-2"
                onPress={() => setMobileOpen(true)}
              >
                <Menu className="w-6 h-6 text-[#6b1282]" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer using HeroUI Drawer */}
      <Drawer.Backdrop isOpen={mobileOpen} onOpenChange={setMobileOpen}>
        <Drawer.Content placement="right" className="w-[320px] max-w-full bg-white">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header className="border-b border-neutral-100 pb-4">
              <img
                src="/assets/images/uin_sgd/logo_lph_official_purple.webp"
                alt="Halal Center UIN SGD"
                className="h-10 w-auto rounded-md shadow-xs"
              />
            </Drawer.Header>

            <Drawer.Body className="py-6 space-y-4">
              {/* Language Switcher in Mobile Drawer */}
              <div className="flex items-center justify-between p-2.5 bg-purple-50/70 rounded-2xl border border-purple-100">
                <span className="text-xs font-bold text-neutral-700">
                  {language === 'en' ? 'Select Language:' : 'Pilih Bahasa:'}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setLanguage('id')}
                    className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${language === 'id'
                        ? 'bg-[#6b1282] text-white shadow-xs'
                        : 'text-neutral-600 hover:bg-white'
                      }`}
                  >
                    ID
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${language === 'en'
                        ? 'bg-[#6b1282] text-white shadow-xs'
                        : 'text-neutral-600 hover:bg-white'
                      }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-base font-bold text-neutral-800 hover:bg-neutral-100"
                >
                  {t('nav_home')}
                </Link>

                <div className="pt-2 pb-1 px-4 text-xs font-bold text-[#6b1282] uppercase tracking-wider">
                  {language === 'en' ? 'About Us' : 'Tentang Kami'}
                </div>
                <Link
                  to="/tentang"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-purple-50 rounded-xl"
                >
                  <BookOpen className="w-4 h-4 text-[#6b1282]" />
                  {language === 'en' ? 'LPH Profile & History' : 'Profil & Sejarah LPH'}
                </Link>
                <Link
                  to="/layanan/qna"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-emerald-50 rounded-xl"
                >
                  <HelpCircle className="w-4 h-4 text-[#005a36]" />
                  {language === 'en' ? 'FAQ & Halal Q&A' : 'FAQ & Halal QnA'}
                </Link>

                <div className="pt-3 pb-1 px-4 text-xs font-bold text-[#005a36] uppercase tracking-wider">
                  {language === 'en' ? 'Halal Services' : 'Layanan Halal'}
                </div>
                <Link
                  to="/layanan/kalkulator"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl"
                >
                  <Calculator className="w-4 h-4 text-[#6b1282]" />
                  {language === 'en' ? 'Fee Calculator' : 'Kalkulator Tarif'}
                </Link>
                <Link
                  to="/layanan/pengaduan"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl"
                >
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  {language === 'en' ? 'Complaints & Whistleblowing' : 'Pengaduan & Whistleblowing'}
                </Link>
                <Link
                  to="/layanan/kepuasan"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl"
                >
                  <Smile className="w-4 h-4 text-amber-600" />
                  {language === 'en' ? 'Satisfaction Survey' : 'Survei Kepuasan Pelanggan'}
                </Link>

                <div className="pt-3 pb-1 px-4 text-xs font-bold text-[#0284c7] uppercase tracking-wider">
                  {language === 'en' ? 'Information & Contact' : 'Informasi & Kontak'}
                </div>
                <Link
                  to="/berita"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl"
                >
                  <Newspaper className="w-4 h-4 text-[#0284c7]" />
                  {language === 'en' ? 'News & Activities' : 'Berita & Kegiatan'}
                </Link>
                <Link
                  to="/pengumuman"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl"
                >
                  <Bell className="w-4 h-4 text-amber-500" />
                  {language === 'en' ? 'Official Announcements' : 'Pengumuman Resmi'}
                </Link>
                <Link
                  to="/kontak"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl"
                >
                  <Phone className="w-4 h-4 text-[#005a36]" />
                  {t('nav_contact')}
                </Link>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-100">
                <Link to="/layanan/kalkulator" onClick={() => setMobileOpen(false)}>
                  <Button
                    variant="primary"
                    fullWidth
                    className="bg-[#6b1282] hover:bg-[#581c87] text-white font-bold rounded-xl py-3 shadow-md"
                  >
                    {t('nav_calc_fee')}
                  </Button>
                </Link>
              </div>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </>
  );
};

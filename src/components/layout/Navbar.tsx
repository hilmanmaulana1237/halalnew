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
  FeaturedPreviewCard, 
  MenuFooter 
} from '@/components/ui/navbar-mega-menu';

export const Navbar: React.FC = () => {
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
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive('/')
                    ? 'text-[#6b1282] bg-purple-50/90 shadow-xs'
                    : 'text-neutral-700 hover:text-[#6b1282] hover:bg-purple-50/40'
                }`}
              >
                Beranda
              </Link>

              {/* Mega Menu 1: Tentang Kami */}
              <MegaMenuItem
                title="Tentang Kami"
                isActive={activeDropdown === 'tentang'}
                onMouseEnter={() => handleMouseEnter('tentang')}
                onMouseLeave={handleMouseLeave}
                onClick={() => toggleDropdown('tentang')}
              >
                <div className="w-[760px] max-w-[92vw]">
                  <div className="grid grid-cols-12 gap-5 items-stretch">
                    {/* Left Column (7 cols): 3 Rich Categorized Cards */}
                    <div className="col-span-7 flex flex-col justify-between">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300/80">
                          Profil &amp; Kelembagaan
                        </span>
                        <span className="text-[10px] text-neutral-400 font-medium">3 Layanan</span>
                      </div>
                      <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                        <MenuCardItem
                          icon={<BookOpen className="w-4 h-4" />}
                          title="Profil &amp; Sejarah LPH"
                          description="Sejarah pendirian, landasan fatwa syar'i MUI, dan visi Halalsphere University."
                          to="/tentang"
                          onClick={() => setActiveDropdown(null)}
                        />
                        <MenuCardItem
                          icon={<ShieldCheck className="w-4 h-4" />}
                          title="Akreditasi &amp; Legalitas Resmi"
                          description="Regulasi resmi BPJPH No. LPH-018-ID dan pengakuan KAN ISO/IEC 17025."
                          to="/tentang"
                          badge="LPH-018-ID"
                          onClick={() => setActiveDropdown(null)}
                        />
                        <MenuCardItem
                          icon={<HelpCircle className="w-4 h-4" />}
                          title="FAQ &amp; Halal QnA"
                          description="Kumpulan jawaban resmi seputar persyaratan, alur audit, dan dokumen SIHALAL."
                          to="/layanan/qna"
                          onClick={() => setActiveDropdown(null)}
                        />
                      </div>
                    </div>

                    {/* Right Column (5 cols): Featured Visual Preview Card with Photo */}
                    <div className="col-span-5 flex flex-col justify-between">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300/80">
                          Sorotan Resmi
                        </span>
                        <span className="text-[10px] text-purple-400 font-medium">ISO 17025</span>
                      </div>
                      <div className="flex-1">
                        <FeaturedPreviewCard
                          image="/assets/images/certificate.png"
                          title="Sertifikat Akreditasi LPH"
                          badge="Resmi BPJPH"
                          description="Lembaga Pemeriksa Halal rujukan nasional di bawah naungan UIN Sunan Gunung Djati Bandung."
                          to="/tentang"
                          actionText="Pelajari Profil Lembaga"
                          onClick={() => setActiveDropdown(null)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Footer Bar */}
                  <MenuFooter
                    label="Sentra Jaringan Layanan"
                    links={[
                      { label: "Kampus 1 Cibiru Bandung", to: "/kontak" },
                      { label: "Lab Hayati Kampus 2", to: "/kontak" },
                      { label: "Sentra Priangan Timur", to: "/kontak" },
                      { label: "Sentra Ciayumajakuning", to: "/kontak" },
                    ]}
                    onClick={() => setActiveDropdown(null)}
                  />
                </div>
              </MegaMenuItem>

              {/* Mega Menu 2: Layanan LPH */}
              <MegaMenuItem
                title="Layanan LPH"
                isActive={activeDropdown === 'layanan'}
                onMouseEnter={() => handleMouseEnter('layanan')}
                onMouseLeave={handleMouseLeave}
                onClick={() => toggleDropdown('layanan')}
              >
                <div className="w-[760px] max-w-[92vw]">
                  <div className="grid grid-cols-12 gap-5 items-stretch">
                    {/* Left Column (7 cols): 3 Rich Categorized Cards */}
                    <div className="col-span-7 flex flex-col justify-between">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300/80">
                          Layanan Pemeriksaan &amp; Lab
                        </span>
                        <span className="text-[10px] text-neutral-400 font-medium">3 Program</span>
                      </div>
                      <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                        <MenuCardItem
                          icon={<Calculator className="w-4 h-4" />}
                          title="Kalkulator Tarif Halal"
                          description="Simulasi estimasi tarif audit halal reguler sesuai regulasi resmi KMA 784."
                          to="/layanan/kalkulator"
                          badge="Populer"
                          onClick={() => setActiveDropdown(null)}
                        />
                        <MenuCardItem
                          icon={<Users className="w-4 h-4" />}
                          title="Self Declare (SEHATI UMK)"
                          description="Pendampingan sertifikasi halal gratis pelaku usaha mikro dan kecil."
                          href="https://halal.uinsgd.ac.id/sertifikasi-halal-self-declare/"
                          badge="Gratis"
                          onClick={() => setActiveDropdown(null)}
                        />
                        <MenuCardItem
                          icon={<FlaskConical className="w-4 h-4" />}
                          title="Laboratorium Uji Hayati"
                          description="Uji qPCR DNA babi, cemaran alkohol GC-FID, dan profil asam lemak gelatin."
                          href="https://halal.uinsgd.ac.id/laboratorium-pengujian-halal/"
                          badge="ISO 17025"
                          onClick={() => setActiveDropdown(null)}
                        />
                      </div>
                    </div>

                    {/* Right Column (5 cols): Featured Visual Preview Card with Photo */}
                    <div className="col-span-5 flex flex-col justify-between">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300/80">
                          Layanan Unggulan
                        </span>
                        <span className="text-[10px] text-purple-400 font-medium">Saintifik</span>
                      </div>
                      <div className="flex-1">
                        <FeaturedPreviewCard
                          image="/assets/images/uji-laboratorium.jpg"
                          title="Uji Lab qPCR DNA Babi"
                          badge="Terakreditasi"
                          description="Pengujian saintifik presisi tinggi dan standarisasi kompetensi Juru Sembelih Halal (JULEHA)."
                          to="/layanan/kalkulator"
                          actionText="Hitung Simulasi Tarif"
                          onClick={() => setActiveDropdown(null)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Footer Bar */}
                  <MenuFooter
                    label="Kanal Publik & Bantuan"
                    links={[
                      { label: "Pengaduan Whistleblowing", to: "/layanan/pengaduan" },
                      { label: "Survei Kepuasan (IKM)", to: "/layanan/kepuasan" },
                      { label: "Portal SIHALAL BPJPH", href: "https://ptsp.halal.go.id/" },
                      { label: "WhatsApp Layanan", href: "https://wa.me/6282118201232" },
                    ]}
                    onClick={() => setActiveDropdown(null)}
                  />
                </div>
              </MegaMenuItem>

              {/* Mega Menu 3: News & Update */}
              <MegaMenuItem
                title="News & Update"
                isActive={activeDropdown === 'news'}
                onMouseEnter={() => handleMouseEnter('news')}
                onMouseLeave={handleMouseLeave}
                onClick={() => toggleDropdown('news')}
              >
                <div className="w-[760px] max-w-[92vw]">
                  <div className="grid grid-cols-12 gap-5 items-stretch">
                    {/* Left Column (7 cols): 3 Rich Categorized Cards */}
                    <div className="col-span-7 flex flex-col justify-between">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300/80">
                          Publikasi &amp; Informasi
                        </span>
                        <span className="text-[10px] text-neutral-400 font-medium">3 Kanal</span>
                      </div>
                      <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                        <MenuCardItem
                          icon={<Newspaper className="w-4 h-4" />}
                          title="Berita &amp; Kegiatan LPH"
                          description="Liputan audit lapangan, seminar ilmiah, workshop, dan siaran pers resmi."
                          to="/berita"
                          badge="Terbaru"
                          onClick={() => setActiveDropdown(null)}
                        />
                        <MenuCardItem
                          icon={<Bell className="w-4 h-4" />}
                          title="Pengumuman Resmi"
                          description="Surat edaran BPJPH, jadwal sidang fatwa, dan informasi penting pelaku usaha."
                          to="/pengumuman"
                          onClick={() => setActiveDropdown(null)}
                        />
                        <MenuCardItem
                          icon={<BookOpen className="w-4 h-4" />}
                          title="Jurnal Riset Halal (IJHR)"
                          description="Indonesian Journal of Halal Research terakreditasi SINTA nasional."
                          href="https://journal.uinsgd.ac.id/index.php/ijhar"
                          badge="SINTA"
                          onClick={() => setActiveDropdown(null)}
                        />
                      </div>
                    </div>

                    {/* Right Column (5 cols): Featured Visual Preview Card with Photo */}
                    <div className="col-span-5 flex flex-col justify-between">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300/80">
                          Agenda Strategis
                        </span>
                        <span className="text-[10px] text-purple-400 font-medium">Global</span>
                      </div>
                      <div className="flex-1">
                        <FeaturedPreviewCard
                          image="/assets/images/uin_sgd/uin_07.webp"
                          title="Konferensi Halal Dunia"
                          badge="Internasional"
                          description="Penguatan ekosistem industri halal dunia melalui kolaborasi saintifik dan kepatuhan syariah."
                          to="/berita"
                          actionText="Baca Kabar Selengkapnya"
                          onClick={() => setActiveDropdown(null)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Footer Bar */}
                  <MenuFooter
                    label="Dokumen & Riset"
                    links={[
                      { label: "Unduh Pedoman SJPH", to: "/berita" },
                      { label: "Arsip Publikasi SINTA", href: "https://journal.uinsgd.ac.id/index.php/ijhar" },
                      { label: "Galeri Foto Kegiatan", to: "/berita" },
                    ]}
                    onClick={() => setActiveDropdown(null)}
                  />
                </div>
              </MegaMenuItem>

              <Link
                to="/kontak"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive('/kontak')
                    ? 'text-[#6b1282] bg-purple-50/90 shadow-xs'
                    : 'text-neutral-700 hover:text-[#6b1282] hover:bg-purple-50/40'
                }`}
              >
                Kontak
              </Link>
            </nav>

            {/* Actions: Modern Classic Purple CTA & Language */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/layanan/kalkulator">
                <Button
                  variant="primary"
                  className="bg-[#6b1282] hover:bg-[#581c87] text-white font-bold px-5 py-2.5 rounded-full text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                  Hitung Tarif Halal
                </Button>
              </Link>
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 border-l border-neutral-200 pl-3">
                <span className="text-[#6b1282] font-black cursor-pointer">ID</span>
                <span>|</span>
                <span className="hover:text-neutral-900 cursor-pointer">EN</span>
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
              <div className="flex flex-col space-y-1.5">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-base font-bold text-neutral-800 hover:bg-neutral-100"
                >
                  Beranda
                </Link>

                <div className="pt-2 pb-1 px-4 text-xs font-bold text-[#6b1282] uppercase tracking-wider">
                  Tentang Kami
                </div>
                <Link
                  to="/tentang"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-purple-50 rounded-xl"
                >
                  <BookOpen className="w-4 h-4 text-[#6b1282]" />
                  Profil &amp; Sejarah LPH
                </Link>
                <Link
                  to="/layanan/qna"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-emerald-50 rounded-xl"
                >
                  <HelpCircle className="w-4 h-4 text-[#005a36]" />
                  FAQ &amp; Halal QnA
                </Link>

                <div className="pt-3 pb-1 px-4 text-xs font-bold text-[#005a36] uppercase tracking-wider">
                  Layanan Halal
                </div>
                <Link
                  to="/layanan/kalkulator"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl"
                >
                  <Calculator className="w-4 h-4 text-[#6b1282]" />
                  Kalkulator Tarif
                </Link>
                <Link
                  to="/layanan/pengaduan"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl"
                >
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  Pengaduan &amp; Whistleblowing
                </Link>
                <Link
                  to="/layanan/kepuasan"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl"
                >
                  <Smile className="w-4 h-4 text-amber-600" />
                  Survei Kepuasan Pelanggan
                </Link>

                <div className="pt-3 pb-1 px-4 text-xs font-bold text-[#0284c7] uppercase tracking-wider">
                  Informasi &amp; Kontak
                </div>
                <Link
                  to="/berita"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl"
                >
                  <Newspaper className="w-4 h-4 text-[#0284c7]" />
                  Berita &amp; Kegiatan
                </Link>
                <Link
                  to="/pengumuman"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl"
                >
                  <Bell className="w-4 h-4 text-amber-500" />
                  Pengumuman Resmi
                </Link>
                <Link
                  to="/kontak"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl"
                >
                  <Phone className="w-4 h-4 text-[#005a36]" />
                  Hubungi Kami
                </Link>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-100">
                <Link to="/layanan/kalkulator" onClick={() => setMobileOpen(false)}>
                  <Button
                    variant="primary"
                    fullWidth
                    className="bg-gradient-to-r from-[#6b1282] to-[#005a36] text-white font-bold rounded-xl py-3"
                  >
                    Hitung Tarif Halal
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

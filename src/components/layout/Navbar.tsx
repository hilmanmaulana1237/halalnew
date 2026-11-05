import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Drawer, Dropdown, Label } from '@heroui/react';
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
  Sparkles 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top Colorful Jewel Line (Echoing the LPH Star Palette) */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#6b1282] via-[#0284c7] via-[#10b981] to-[#f59e0b]" />

      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200/70 shadow-xs transition-all">
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

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive('/')
                    ? 'text-[#6b1282] bg-purple-50/80 shadow-xs'
                    : 'text-neutral-700 hover:text-[#6b1282] hover:bg-neutral-50'
                }`}
              >
                Beranda
              </Link>

              {/* Dropdown: Tentang Kami */}
              <Dropdown>
                <Dropdown.Trigger>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 px-3 py-2 text-sm font-bold text-neutral-700 hover:text-[#6b1282] rounded-xl"
                  >
                    Tentang Kami
                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Popover>
                  <Dropdown.Menu className="w-56 p-1.5 rounded-2xl shadow-xl border border-neutral-100">
                    <Dropdown.Item id="tentang-profil" textValue="Profil & Sejarah LPH">
                      <Link to="/tentang" className="flex items-center gap-2.5 w-full py-1.5">
                        <BookOpen className="w-4 h-4 text-[#6b1282]" />
                        <Label className="cursor-pointer font-bold text-sm text-neutral-800">
                          Profil &amp; Sejarah LPH
                        </Label>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="tentang-qna" textValue="FAQ & Halal QnA">
                      <Link to="/layanan/qna" className="flex items-center gap-2.5 w-full py-1.5">
                        <HelpCircle className="w-4 h-4 text-[#005a36]" />
                        <Label className="cursor-pointer font-bold text-sm text-neutral-800">
                          FAQ &amp; Halal QnA
                        </Label>
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>

              {/* Dropdown: Layanan LPH */}
              <Dropdown>
                <Dropdown.Trigger>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 px-3 py-2 text-sm font-bold text-neutral-700 hover:text-[#005a36] rounded-xl"
                  >
                    Layanan LPH
                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Popover>
                  <Dropdown.Menu className="w-64 p-1.5 rounded-2xl shadow-xl border border-neutral-100">
                    <Dropdown.Item id="layanan-kalkulator" textValue="Kalkulator Tarif">
                      <Link to="/layanan/kalkulator" className="flex items-center gap-2.5 w-full py-1.5">
                        <Calculator className="w-4 h-4 text-[#6b1282]" />
                        <Label className="cursor-pointer font-bold text-sm text-neutral-800">
                          Kalkulator Tarif Halal
                        </Label>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="layanan-pengaduan" textValue="Pengaduan & Whistleblowing">
                      <Link to="/layanan/pengaduan" className="flex items-center gap-2.5 w-full py-1.5">
                        <ShieldAlert className="w-4 h-4 text-rose-600" />
                        <Label className="cursor-pointer font-bold text-sm text-neutral-800">
                          Pengaduan &amp; Whistleblowing
                        </Label>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="layanan-kepuasan" textValue="Survei Kepuasan Pelanggan">
                      <Link to="/layanan/kepuasan" className="flex items-center gap-2.5 w-full py-1.5">
                        <Smile className="w-4 h-4 text-amber-600" />
                        <Label className="cursor-pointer font-bold text-sm text-neutral-800">
                          Survei Kepuasan Pelanggan
                        </Label>
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>

              {/* Dropdown: News & Update */}
              <Dropdown>
                <Dropdown.Trigger>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 px-3 py-2 text-sm font-bold text-neutral-700 hover:text-[#0284c7] rounded-xl"
                  >
                    News &amp; Update
                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Popover>
                  <Dropdown.Menu className="w-56 p-1.5 rounded-2xl shadow-xl border border-neutral-100">
                    <Dropdown.Item id="news-berita" textValue="Berita & Kegiatan">
                      <Link to="/berita" className="flex items-center gap-2.5 w-full py-1.5">
                        <Newspaper className="w-4 h-4 text-[#0284c7]" />
                        <Label className="cursor-pointer font-bold text-sm text-neutral-800">
                          Berita &amp; Kegiatan
                        </Label>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="news-pengumuman" textValue="Pengumuman Resmi">
                      <Link to="/pengumuman" className="flex items-center gap-2.5 w-full py-1.5">
                        <Bell className="w-4 h-4 text-[#f59e0b]" />
                        <Label className="cursor-pointer font-bold text-sm text-neutral-800">
                          Pengumuman Resmi
                        </Label>
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>

              <Link
                to="/kontak"
                className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive('/kontak')
                    ? 'text-[#005a36] bg-emerald-50/80 shadow-xs'
                    : 'text-neutral-700 hover:text-[#005a36] hover:bg-neutral-50'
                }`}
              >
                Kontak
              </Link>
            </nav>

            {/* Actions: Colorful Gradient CTA & Language */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/layanan/kalkulator">
                <Button
                  variant="primary"
                  className="bg-gradient-to-r from-[#6b1282] via-[#7e22ce] to-[#005a36] hover:brightness-110 text-white font-bold px-5 py-2.5 rounded-full text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
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

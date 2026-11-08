import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@heroui/react';
import { Phone, Mail, MapPin, Calculator, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { OrganicWave, YellowDotGrid } from '@/components/ui/decorative-shapes';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  return (
    <footer className="relative bg-[#25032E] text-neutral-300 overflow-hidden">
      {/* Top Organic Wave Transition */}
      <div className="relative w-full overflow-hidden leading-none -mb-1 bg-transparent">
        <OrganicWave position="top" fillColor="#25032E" />
      </div>

      {/* Decorative Yellow Dot Grids in corners */}
      <YellowDotGrid rows={4} cols={6} className="absolute top-12 right-10 opacity-25 pointer-events-none hidden lg:grid" />
      <YellowDotGrid rows={3} cols={5} className="absolute bottom-20 left-6 opacity-20 pointer-events-none hidden sm:grid" />

      {/* Ambient Radial Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6B18A8]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#F5D32F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Info & Call to Action (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 inline-block shadow-lg hover:border-[#F5D32F]/50 transition-colors">
                <img
                  src="/assets/images/uin_sgd/logo_lph_official_purple.webp"
                  alt="Lembaga Pemeriksa Halal UIN Sunan Gunung Djati Bandung"
                  className="h-12 w-auto object-contain brightness-110"
                />
              </div>
            </Link>
            <p className="text-sm text-neutral-300 leading-relaxed font-normal">
              {t('footer_desc')}
            </p>
            <div className="pt-2">
              <Link to="/layanan/kalkulator">
                <Button
                  variant="primary"
                  className="bg-[#F5D32F] hover:bg-[#eab308] text-[#3B074A] font-extrabold text-xs sm:text-sm rounded-xl px-5 py-2.5 shadow-md shadow-yellow-500/20 inline-flex items-center gap-2 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-[#3B074A]" />
                  {t('footer_cta_calc')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Column 2: Jelajahi (Col 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-[#F5D32F] rounded-full inline-block" />
              {t('footer_col_explore')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-[#F5D32F] transition-colors">
                  {t('nav_home')}
                </Link>
              </li>
              <li>
                <Link to="/tentang" className="text-neutral-300 hover:text-[#F5D32F] transition-colors">
                  {isEn ? 'About Us' : 'Tentang Kami'}
                </Link>
              </li>
              <li>
                <Link to="/layanan/kalkulator" className="text-neutral-300 hover:text-[#F5D32F] transition-colors">
                  {isEn ? 'Fee Calculator' : 'Kalkulator Tarif'}
                </Link>
              </li>
              <li>
                <Link to="/berita" className="text-neutral-300 hover:text-[#F5D32F] transition-colors">
                  {isEn ? 'News & Articles' : 'Berita & Artikel'}
                </Link>
              </li>
              <li>
                <Link to="/layanan/qna" className="text-neutral-300 hover:text-[#F5D32F] transition-colors">
                  {t('footer_faq')}
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="text-neutral-300 hover:text-[#F5D32F] transition-colors">
                  {isEn ? 'Contact Us' : 'Hubungi Kami'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Unit Layanan (Col 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-[#F5D32F] rounded-full inline-block" />
              {t('footer_col_units')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/tentang" className="text-neutral-300 hover:text-[#F5D32F] transition-colors">
                  {isEn ? 'Halal Inspection Agency (LPH)' : 'Lembaga Pemeriksa Halal (LPH)'}
                </Link>
              </li>
              <li>
                <Link to="/layanan/kalkulator" className="text-neutral-300 hover:text-[#F5D32F] transition-colors">
                  {isEn ? 'Regular Halal Certification' : 'Sertifikasi Halal Reguler'}
                </Link>
              </li>
              <li>
                <Link to="/tentang" className="text-neutral-300 hover:text-[#F5D32F] transition-colors">
                  {isEn ? 'Testing & Calibration Laboratory' : 'Laboratorium Pengujian & Kalibrasi'}
                </Link>
              </li>
              <li>
                <Link to="/tentang" className="text-neutral-300 hover:text-[#F5D32F] transition-colors">
                  {isEn ? 'Halal Training Center (LPJPH)' : 'Lembaga Pelatihan JPH (LPJPH)'}
                </Link>
              </li>
              <li>
                <Link to="/tentang" className="text-neutral-300 hover:text-[#F5D32F] transition-colors">
                  {isEn ? 'Halal Slaughter Academy (JULEHA)' : 'Akademi Juru Sembelih Halal (JULEHA)'}
                </Link>
              </li>
              <li>
                <a
                  href="https://journal.uinsgd.ac.id/index.php/ijhar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-[#F5D32F] transition-colors inline-flex items-center gap-1.5"
                >
                  Indonesian Journal of Halal Research
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Kontak Resmi (Col 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-[#F5D32F] rounded-full inline-block" />
              {t('footer_col_contact')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-neutral-300">
                <div className="w-7 h-7 rounded-lg bg-[#F5D32F]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-[#F5D32F]" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">WhatsApp Desk</div>
                  <a
                    href="https://wa.me/6282126493700"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#F5D32F] font-bold transition-colors"
                  >
                    +62 821-2649-3700
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5 text-neutral-300">
                <div className="w-7 h-7 rounded-lg bg-[#F5D32F]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-[#F5D32F]" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">{t('footer_office_phone')}</div>
                  <a href="tel:0227800525" className="text-white hover:text-[#F5D32F] font-bold transition-colors">
                    (022) 7800525
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5 text-neutral-300">
                <div className="w-7 h-7 rounded-lg bg-[#F5D32F]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-[#F5D32F]" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">{isEn ? 'Official Email' : 'Email Resmi'}</div>
                  <a href="mailto:halal@uinsgd.ac.id" className="text-white hover:text-[#F5D32F] font-bold transition-colors">
                    halal@uinsgd.ac.id
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5 text-neutral-300">
                <div className="w-7 h-7 rounded-lg bg-[#F5D32F]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#F5D32F]" />
                </div>
                <div className="text-xs leading-relaxed text-neutral-300">
                  <p><strong className="text-white">{isEn ? 'Campus 1:' : 'Kampus 1:'}</strong> Lecture Hall Lt. 1, Jl. A.H. Nasution No. 105, Cibiru, Bandung 40614</p>
                  <p className="mt-1"><strong className="text-white">{isEn ? 'Campus 2:' : 'Kampus 2:'}</strong> Integrated Laboratory Bldg, Jl. Cimencrang, Gedebage, Bandung 40294</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#6B18A8]/30 bg-[#190220] py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>
            &copy; {new Date().getFullYear()} {isEn ? 'Halal Center & Halal Inspection Agency (LPH) UIN Sunan Gunung Djati Bandung.' : 'Halal Center & Lembaga Pemeriksa Halal (LPH) UIN Sunan Gunung Djati Bandung.'}
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[#F5D32F] font-bold">{t('footer_accreditation')}</span>
            <span className="text-[#C9A5E8]">•</span>
            <span className="text-white font-bold">No. Reg: LPH-018-ID</span>
            <span className="text-[#C9A5E8]">•</span>
            <span className="text-[#F5D32F] font-bold">ISO/IEC 17025 Accredited</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

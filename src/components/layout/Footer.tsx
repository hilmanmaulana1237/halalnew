import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@heroui/react';
import { Phone, Mail, Globe, MapPin, Calculator, ExternalLink, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  return (
    <footer className="relative bg-[#1a0726] text-neutral-300 overflow-hidden">
      {/* Decorative Purple Accent Line on top */}
      <div className="h-1 w-full bg-gradient-to-r from-[#4a0d5c] via-[#6b1282] to-[#86198f]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Info & Call to Action (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/assets/images/uin_sgd/logo_lph_official_purple.webp"
                alt="Lembaga Pemeriksa Halal UIN Sunan Gunung Djati Bandung"
                className="h-14 w-auto object-contain rounded-xl shadow-lg brightness-105 hover:scale-105 transition-transform"
              />
            </Link>
            <p className="text-sm text-neutral-300 leading-relaxed font-normal">
              {t('footer_desc')}
            </p>
            <div className="pt-2">
              <Link to="/layanan/kalkulator">
                <Button
                  variant="primary"
                  className="bg-[#6b1282] hover:bg-[#581c87] text-white font-bold text-xs sm:text-sm rounded-xl px-4 py-2.5 shadow-md inline-flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4 text-purple-200" />
                  {t('footer_cta_calc')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Column 2: Jelajahi (Col 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-purple-300">
              {t('footer_col_explore')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-white transition-colors">
                  {t('nav_home')}
                </Link>
              </li>
              <li>
                <Link to="/tentang" className="text-neutral-300 hover:text-white transition-colors">
                  {isEn ? 'About Us' : 'Tentang Kami'}
                </Link>
              </li>
              <li>
                <Link to="/layanan/kalkulator" className="text-neutral-300 hover:text-white transition-colors">
                  {isEn ? 'Fee Calculator' : 'Kalkulator Tarif'}
                </Link>
              </li>
              <li>
                <Link to="/berita" className="text-neutral-300 hover:text-white transition-colors">
                  {isEn ? 'News & Articles' : 'Berita & Artikel'}
                </Link>
              </li>
              <li>
                <Link to="/layanan/qna" className="text-neutral-300 hover:text-white transition-colors">
                  {t('footer_faq')}
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="text-neutral-300 hover:text-white transition-colors">
                  {isEn ? 'Contact Us' : 'Hubungi Kami'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Unit Layanan (Col 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-purple-300">
              {t('footer_col_units')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/tentang" className="text-neutral-300 hover:text-white transition-colors">
                  {isEn ? 'Halal Inspection Agency (LPH)' : 'Lembaga Pemeriksa Halal (LPH)'}
                </Link>
              </li>
              <li>
                <Link to="/tentang" className="text-neutral-300 hover:text-white transition-colors">
                  {isEn ? 'Halal Process Assistant Agency (LP3H)' : 'Lembaga Pendamping PPH (LP3H)'}
                </Link>
              </li>
              <li>
                <Link to="/tentang" className="text-neutral-300 hover:text-white transition-colors">
                  {isEn ? 'Testing & Calibration Laboratory' : 'Laboratorium Pengujian & Kalibrasi'}
                </Link>
              </li>
              <li>
                <Link to="/tentang" className="text-neutral-300 hover:text-white transition-colors">
                  {isEn ? 'Halal Training Center (LPJPH)' : 'Lembaga Pelatihan JPH (LPJPH)'}
                </Link>
              </li>
              <li>
                <Link to="/tentang" className="text-neutral-300 hover:text-white transition-colors">
                  {isEn ? 'Halal Slaughter Academy (JULEHA)' : 'Akademi Juru Sembelih Halal (JULEHA)'}
                </Link>
              </li>
              <li>
                <a
                  href="https://journal.uinsgd.ac.id/index.php/ijhr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  Indonesian Journal of Halal Research
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Kontak Resmi (Col 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-purple-300">
              {t('footer_col_contact')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-neutral-300">
                <Phone className="w-4 h-4 text-purple-300 shrink-0 mt-1" />
                <div>
                  <div className="text-xs text-neutral-400">WhatsApp Desk</div>
                  <a
                    href="https://wa.me/6282118201232"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-purple-300 font-bold"
                  >
                    +62 821 1820 1232
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5 text-neutral-300">
                <Phone className="w-4 h-4 text-purple-300 shrink-0 mt-1" />
                <div>
                  <div className="text-xs text-neutral-400">{t('footer_office_phone')}</div>
                  <a href="tel:0227800525" className="text-white hover:text-purple-300 font-bold">
                    (022) 7800525
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5 text-neutral-300">
                <Mail className="w-4 h-4 text-purple-300 shrink-0 mt-1" />
                <div>
                  <div className="text-xs text-neutral-400">{isEn ? 'Official Email' : 'Email Resmi'}</div>
                  <a href="mailto:halal@uinsgd.ac.id" className="text-white hover:text-purple-300 font-bold">
                    halal@uinsgd.ac.id
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5 text-neutral-300">
                <MapPin className="w-4 h-4 text-purple-300 shrink-0 mt-1" />
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
      <div className="border-t border-purple-900/50 bg-[#12041b] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>
            &copy; {new Date().getFullYear()} {isEn ? 'Halal Center & Halal Inspection Agency (LPH) UIN Sunan Gunung Djati Bandung.' : 'Halal Center & Lembaga Pemeriksa Halal (LPH) UIN Sunan Gunung Djati Bandung.'}
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-purple-200 font-bold">{t('footer_accreditation')}</span>
            <span>•</span>
            <span className="text-white font-bold">No. Reg: LPH-018-ID</span>
            <span>•</span>
            <span className="text-purple-200 font-bold">ISO/IEC 17025 Accredited</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

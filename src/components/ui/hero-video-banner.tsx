import React, { useState } from 'react';
import { Input, Button } from '@heroui/react';
import { Search, Sparkles, ArrowRight, Tag, Building2, FileCheck, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FlipWords } from '@/components/ui/flip-words';
import { useLanguage } from '@/context/LanguageContext';
import { OrganicWave, YellowDotGrid, YellowHighlight } from '@/components/ui/decorative-shapes';

export const HeroVideoBanner: React.FC = () => {
  const { language, t } = useLanguage();
  const [productName, setProductName] = useState('');
  const [producerName, setProducerName] = useState('');
  const [certNo, setCertNo] = useState('');

  const words = language === 'en'
    ? [
      'Halal Assurance',
      'Sharia Integrity',
      'Precision Science',
      'Global Standards',
    ]
    : [
      'Jaminan Halal',
      'Integritas Syar’i',
      'Sains Presisi',
      'Standar Mutlak',
    ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (productName.trim()) query.set('produk', productName.trim());
    if (producerName.trim()) query.set('produsen', producerName.trim());
    if (certNo.trim()) query.set('no_regis', certNo.trim());
    const queryString = query.toString();
    const targetUrl = queryString
      ? `https://bpjph.halal.go.id/?${queryString}`
      : 'https://bpjph.halal.go.id/';
    window.open(targetUrl, '_blank');
  };

  const quickSearch = (term: string) => {
    setProductName(term);
  };

  return (
    <section className="relative min-h-[94vh] flex flex-col justify-between overflow-hidden bg-[#1a0726]">
      {/* Background Video Layer - Vibrant & Clearly Visible */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-85 contrast-115"
        >
          <source src="/assets/videos/lab-lppom.mp4" type="video/mp4" />
        </video>

        {/* LPH Official Royal Purple & Amber Mesh Overlays that let video shine through clearly */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0726] via-[#3d0b4d]/75 to-[#1a0726]/85 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(107,24,168,0.45),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(245,211,47,0.18),transparent_50%)]" />
      </div>

      {/* Decorative Yellow Dot Grids (Corner Accents) */}
      <div className="absolute top-14 left-6 sm:left-12 opacity-50 pointer-events-none hidden sm:grid">
        <YellowDotGrid rows={5} cols={5} dotColor="#F5D32F" />
      </div>
      <div className="absolute top-24 right-6 sm:right-16 opacity-50 pointer-events-none hidden sm:grid">
        <YellowDotGrid rows={5} cols={5} dotColor="#F5D32F" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-6 sm:pb-8 text-center flex flex-col items-center justify-center flex-1">
        {/* Animated Eyebrow Badge (Glassmorphism with Yellow Pulsing Dot) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold mb-6 shadow-xl"
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5D32F] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F5D32F]"></span>
          </span>
          <span className="tracking-wide text-white font-bold">{t('hero_badge_lph')}</span>
          <span className="text-purple-300">•</span>
          <span className="text-purple-200 font-semibold">{t('hero_badge_univ')}</span>
        </motion.div>

        {/* Main Heading with Crisp White & Yellow Highlight */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.2] drop-shadow-2xl"
        >
          {language === 'en' ? (
            <>
              Leading in{' '}
              <span className="text-[#F5D32F] inline-block">
                <FlipWords words={words} className="text-[#F5D32F]" />
              </span>
              <br className="hidden sm:inline" />
              for <YellowHighlight className="text-white">Global Industry</YellowHighlight>
            </>
          ) : (
            <>
              Pelayanan Terdepan{' '}
              <span className="text-[#F5D32F] inline-block">
                <FlipWords words={words} className="text-[#F5D32F]" />
              </span>
              <br className="hidden sm:inline" />
              Industri <YellowHighlight className="text-white">Halal Nasional</YellowHighlight>
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-base sm:text-lg lg:text-xl text-purple-100 max-w-3xl leading-relaxed font-normal drop-shadow-md"
        >
          {t('hero_subtitle')}
        </motion.p>

        {/* Dual CTA Buttons (Vibrant Yellow Primary + Purple Glass Secondary) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary CTA (Vibrant Yellow) */}
          <Link to="/layanan/kalkulator">
            <Button
              variant="primary"
              className="h-12 bg-[#F5D32F] hover:bg-[#eab308] text-[#3B074A] font-extrabold text-sm px-7 rounded-2xl shadow-xl shadow-yellow-500/25 transition-all flex items-center gap-2 hover:scale-105 active:scale-98 cursor-pointer"
            >
              <span>{t('hero_cta_calc')}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          {/* Secondary CTA (Purple Glass) */}
          <Link to="/tentang">
            <Button
              variant="primary"
              className="h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold text-sm px-7 rounded-2xl shadow-md transition-all flex items-center gap-2 hover:scale-105 active:scale-98 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#F5D32F]" />
              <span>{t('hero_cta_profile')}</span>
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Floating Search Box (Pure White with Subtle Purple & Yellow Accents) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8"
      >
        <div className="relative rounded-3xl p-[1.5px] bg-gradient-to-r from-[#6B18A8]/40 via-[#F5D32F]/70 to-[#6B18A8]/40 shadow-2xl shadow-purple-950/25">
          <div className="bg-white rounded-[22px] p-5 sm:p-7 shadow-lg border border-[#C9A5E8]/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#F5EDFB] text-[#6B18A8] border border-[#C9A5E8]/60 flex items-center justify-center shadow-xs">
                  <Search className="w-5 h-5 text-[#6B18A8]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#292333]">
                    {t('search_title')}
                  </h3>
                  <span className="text-xs font-medium text-[#756D7C]">
                    {t('search_subtitle')}
                  </span>
                </div>
              </div>

              {/* Quick tags in Yellow & Purple */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-semibold text-neutral-400">{t('search_popular')}</span>
                {(language === 'en' ? ['Coffee', 'Bread', 'Cosmetics', 'Meat'] : ['Kopi', 'Roti', 'Kosmetik', 'Daging']).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => quickSearch(tag)}
                    className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#FAF7FD] hover:bg-[#FFF7D1] text-[#6B18A8] hover:text-[#713f12] border border-[#C9A5E8]/40 hover:border-[#F5D32F] transition-colors cursor-pointer"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={handleSearch}
              action="https://bpjph.halal.go.id/"
              method="GET"
              target="_blank"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] sm:text-xs font-bold text-neutral-700 uppercase tracking-wide flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#6B18A8]" />
                  <span>{t('search_label_product')}</span>
                </label>
                <Input
                  fullWidth
                  name="produk"
                  variant="primary"
                  placeholder={t('search_placeholder_product')}
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="h-11 rounded-xl bg-neutral-50 border border-neutral-300 hover:border-purple-300 focus:border-[#6B18A8] text-xs sm:text-sm text-neutral-900 shadow-2xs transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] sm:text-xs font-bold text-neutral-700 uppercase tracking-wide flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#6B18A8]" />
                  <span>{t('search_label_producer')}</span>
                </label>
                <Input
                  fullWidth
                  name="produsen"
                  variant="primary"
                  placeholder={t('search_placeholder_producer')}
                  value={producerName}
                  onChange={(e) => setProducerName(e.target.value)}
                  className="h-11 rounded-xl bg-neutral-50 border border-neutral-300 hover:border-purple-300 focus:border-[#6B18A8] text-xs sm:text-sm text-neutral-900 shadow-2xs transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] sm:text-xs font-bold text-neutral-700 uppercase tracking-wide flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-[#6B18A8]" />
                  <span>{t('search_label_cert')}</span>
                </label>
                <Input
                  fullWidth
                  name="no_regis"
                  variant="primary"
                  placeholder={t('search_placeholder_cert')}
                  value={certNo}
                  onChange={(e) => setCertNo(e.target.value)}
                  className="h-11 rounded-xl bg-neutral-50 border border-neutral-300 hover:border-purple-300 focus:border-[#6B18A8] text-xs sm:text-sm text-neutral-900 shadow-2xs transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="hidden lg:block text-[11px] sm:text-xs font-bold text-transparent select-none">
                  &nbsp;
                </span>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  className="bg-[#6B18A8] hover:bg-[#58138a] text-white font-extrabold h-11 rounded-xl shadow-md shadow-purple-950/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] text-xs sm:text-sm cursor-pointer"
                >
                  <Search className="w-4 h-4 text-[#F5D32F]" />
                  <span>{t('search_button')}</span>
                </Button>
              </div>
            </form>

            {/* Informational Guidance Tip */}
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#FAF7FD] border border-[#C9A5E8]/30 px-4 py-2.5 text-xs text-[#756D7C]">
              <ShieldCheck className="w-4 h-4 text-[#6B18A8] shrink-0" />
              <span>{language === 'en' ? 'Direct search connected with official BPJPH database. Fill one or more fields for accurate results.' : 'Pencarian langsung terhubung dengan basis data resmi BPJPH. Isi satu atau beberapa kolom untuk hasil akurat.'}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Organic Wave Separator transitioning smoothly into white */}
      <OrganicWave fillColor="#ffffff" position="bottom" />
    </section>
  );
};

export default HeroVideoBanner;

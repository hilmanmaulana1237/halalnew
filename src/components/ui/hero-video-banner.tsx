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
      'Halal Assurance',
      'Integritas Syar’i',
      'Riset Sains Presisi',
      'Akreditasi Mutlak',
    ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    query.set('post_type', 'produk-halal');
    if (productName) query.set('nama_product', productName);
    if (producerName) query.set('nama_produsen', producerName);
    if (certNo) query.set('certified_no', certNo);
    window.open(`https://halalmui.org/produk-halal/?${query.toString()}`, '_blank');
  };

  const quickSearch = (term: string) => {
    setProductName(term);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#F5EDFB] via-white to-white">
      {/* Decorative Yellow Dot Grids (Corner Accents) */}
      <div className="absolute top-12 left-6 sm:left-12 opacity-40 pointer-events-none">
        <YellowDotGrid rows={5} cols={5} dotColor="#F5D32F" />
      </div>
      <div className="absolute top-24 right-6 sm:right-16 opacity-45 pointer-events-none">
        <YellowDotGrid rows={5} cols={5} dotColor="#F5D32F" />
      </div>

      {/* Ambient Organic Blobs (Purple & Soft Yellow) */}
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-[#C9A5E8]/20 blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-32 right-1/4 w-80 h-80 rounded-full bg-[#F5D32F]/15 blur-3xl pointer-events-none -z-0" />

      {/* Subtle Video Background Ambient Layer with low opacity */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-[0.06] pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter contrast-125"
        >
          <source src="/assets/videos/lab-lppom.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-6 sm:pb-8 text-center flex flex-col items-center justify-center flex-1">
        {/* Animated Eyebrow Badge (White + Purple + Yellow dot) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#C9A5E8]/70 text-[#6B18A8] text-xs sm:text-sm font-bold mb-6 shadow-md shadow-purple-950/5"
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5D32F] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F5D32F]"></span>
          </span>
          <span className="tracking-wide">{t('hero_badge_lph')}</span>
          <span className="text-neutral-300">•</span>
          <span className="text-[#756D7C] font-semibold">{t('hero_badge_univ')}</span>
        </motion.div>

        {/* Main Heading with Deep Purple & Yellow Highlight */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#292333] tracking-tight leading-[1.12]"
        >
          {language === 'en' ? (
            <>
              Leading in{' '}
              <span className="text-[#6B18A8]">
                <FlipWords words={words} className="text-[#6B18A8]" />
              </span>
              <br className="hidden sm:inline" />
              for <YellowHighlight>Global Industry</YellowHighlight>
            </>
          ) : (
            <>
              Pelayanan Terdepan{' '}
              <span className="text-[#6B18A8]">
                <FlipWords words={words} className="text-[#6B18A8]" />
              </span>
              <br className="hidden sm:inline" />
              Industri <YellowHighlight>Halal Nasional</YellowHighlight>
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-base sm:text-lg lg:text-xl text-[#756D7C] max-w-3xl leading-relaxed font-normal"
        >
          {t('hero_subtitle')}
        </motion.p>

        {/* Dual CTA Buttons (Primary Purple & Secondary Yellow) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary CTA (Purple) */}
          <Link to="/layanan/kalkulator">
            <Button
              variant="primary"
              className="h-12 bg-[#6B18A8] hover:bg-[#4B0D78] text-white font-bold text-sm px-6 rounded-2xl shadow-lg shadow-purple-950/20 transition-all flex items-center gap-2 hover:scale-105 active:scale-98 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#F5D32F]" />
              <span>{t('hero_cta_calc')}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          {/* Secondary CTA (Yellow) */}
          <Link to="/tentang">
            <Button
              variant="secondary"
              className="h-12 bg-[#F5D32F] hover:bg-[#eab308] text-[#3B074A] font-bold text-sm px-6 rounded-2xl shadow-md shadow-yellow-500/20 border border-[#F5D32F] transition-all flex items-center gap-2 hover:scale-105 active:scale-98 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#3B074A]" />
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
        className="relative z-20 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10"
      >
        <div className="relative rounded-3xl p-[1.5px] bg-gradient-to-r from-[#6B18A8]/30 via-[#F5D32F]/60 to-[#6B18A8]/30 shadow-2xl shadow-purple-950/10">
          <div className="bg-white rounded-[22px] p-5 sm:p-7 shadow-sm border border-[#C9A5E8]/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#F5EDFB] text-[#6B18A8] border border-[#C9A5E8]/60 flex items-center justify-center shadow-xs">
                  <Search className="w-5 h-5" />
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

              {/* Quick tags with yellow hover accents */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-[#756D7C]">{t('search_popular')}</span>
                {(language === 'en' ? ['Coffee', 'Bread', 'Cosmetics', 'Meat'] : ['Kopi', 'Roti', 'Kosmetik', 'Daging']).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => quickSearch(tag)}
                    className="text-[11px] font-bold px-3 py-1 rounded-xl bg-[#F5EDFB] hover:bg-[#FFF7D1] text-[#6B18A8] hover:text-[#713f12] border border-[#C9A5E8]/60 hover:border-[#F5D32F] transition-all cursor-pointer shadow-2xs"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] sm:text-xs font-bold text-[#292333] uppercase tracking-wide flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#6B18A8]" />
                  <span>{t('search_label_product')}</span>
                </label>
                <Input
                  fullWidth
                  variant="primary"
                  placeholder={t('search_placeholder_product')}
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="h-11 rounded-xl bg-white border border-[#C9A5E8]/60 hover:border-[#6B18A8] focus:border-[#6B18A8] text-xs sm:text-sm text-[#292333] shadow-2xs transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] sm:text-xs font-bold text-[#292333] uppercase tracking-wide flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#6B18A8]" />
                  <span>{t('search_label_producer')}</span>
                </label>
                <Input
                  fullWidth
                  variant="primary"
                  placeholder={t('search_placeholder_producer')}
                  value={producerName}
                  onChange={(e) => setProducerName(e.target.value)}
                  className="h-11 rounded-xl bg-white border border-[#C9A5E8]/60 hover:border-[#6B18A8] focus:border-[#6B18A8] text-xs sm:text-sm text-[#292333] shadow-2xs transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] sm:text-xs font-bold text-[#292333] uppercase tracking-wide flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-[#6B18A8]" />
                  <span>{t('search_label_cert')}</span>
                </label>
                <Input
                  fullWidth
                  variant="primary"
                  placeholder={t('search_placeholder_cert')}
                  value={certNo}
                  onChange={(e) => setCertNo(e.target.value)}
                  className="h-11 rounded-xl bg-white border border-[#C9A5E8]/60 hover:border-[#6B18A8] focus:border-[#6B18A8] text-xs sm:text-sm text-[#292333] shadow-2xs transition-all"
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
                  className="bg-[#6B18A8] hover:bg-[#4B0D78] text-white font-bold h-11 rounded-xl shadow-md shadow-purple-950/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] text-xs sm:text-sm cursor-pointer"
                >
                  <Search className="w-4 h-4 text-[#F5D32F]" />
                  <span>{t('search_button')}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Bottom Organic Wave Separator transitioning to next section */}
      <OrganicWave fillColor="#ffffff" position="bottom" />
    </section>
  );
};

export default HeroVideoBanner;

import React, { useState } from 'react';
import { Input, Button } from '@heroui/react';
import { Search, Sparkles, ArrowRight, Tag, Building2, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MovingBorderButton } from '@/components/ui/moving-border';
import { FlipWords } from '@/components/ui/flip-words';
import { SparklesCore } from '@/components/ui/sparkles';
import { useLanguage } from '@/context/LanguageContext';

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
    <section className="relative min-h-[94vh] flex flex-col justify-between overflow-hidden bg-[#1a0726]">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-70 contrast-115"
        >
          <source src="/assets/videos/lab-lppom.mp4" type="video/mp4" />
          Your browser does not support video playback.
        </video>

        {/* LPH Official Royal Purple Mesh Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0726] via-[#4a0d5c]/75 to-[#1a0726]/85 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(107,18,130,0.55),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(74,13,92,0.45),transparent_50%)]" />
      </div>

      {/* Floating Sparkles Canvas (Starlight White & Lavender) */}
      <SparklesCore
        id="hero-sparkles"
        minSize={0.8}
        maxSize={2.4}
        particleDensity={38}
        particleColor={['#ffffff', '#f5d0fe', '#e9d5ff', '#d8b4fe']}
      />

      {/* Ambient Radial Floating Glows */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-gradient-to-r from-[#6b1282]/35 via-[#4a0d5c]/20 to-transparent blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-gradient-to-l from-[#6b1282]/35 via-[#4a0d5c]/20 to-transparent blur-3xl pointer-events-none animate-pulse" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-8 sm:pb-10 text-center flex flex-col items-center justify-center flex-1">
        {/* Animated Eyebrow Badge (Modern Classic) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-purple-200 text-xs sm:text-sm font-semibold mb-6 shadow-xl"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-200"></span>
          </span>
          <span className="text-white tracking-wide">{t('hero_badge_lph')}</span>
        </motion.div>

        {/* Main Heading with Modern Classic Serif Typography & FlipWords */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.15] drop-shadow-2xl"
        >
          Leading in{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-200">
            <FlipWords words={words} className="text-purple-200" />
          </span>
          <br className="hidden sm:inline" />
          Solutions
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-base sm:text-lg lg:text-xl text-neutral-200 max-w-3xl leading-relaxed font-normal drop-shadow-md"
        >
          {t('hero_subtitle')}
        </motion.p>

        {/* Action Buttons featuring Moving Border in Royal Purple */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/layanan/kalkulator">
            <MovingBorderButton
              duration={3200}
              className="bg-[#6b1282] hover:bg-[#581c87] text-white font-bold hover:brightness-110 shadow-xl"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-200" />
                {t('hero_cta_calc')}
                <ArrowRight className="w-4 h-4" />
              </span>
            </MovingBorderButton>
          </Link>
          <Link to="/tentang">
            <Button
              variant="outline"
              className="h-12 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md font-semibold text-sm px-6 rounded-2xl transition-all shadow-xl hover:scale-105"
            >
              {t('hero_cta_profile')}
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Floating Search Box with Refined Royal Purple Border Frame */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10 sm:pb-12"
      >
        <div className="relative rounded-3xl p-[1.5px] bg-gradient-to-r from-[#4a0d5c] via-[#86198f] to-[#4a0d5c] shadow-2xl shadow-purple-950/30">
          <div className="bg-white rounded-[22px] p-5 sm:p-7 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#6b1282] flex items-center justify-center shadow-xs">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1a0726]">
                    {t('search_title')}
                  </h3>
                  <span className="text-xs font-medium text-neutral-500">
                    {t('search_subtitle')}
                  </span>
                </div>
              </div>

              {/* Quick tags in Purple & White */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-semibold text-neutral-400">{t('search_popular')}</span>
                {(language === 'en' ? ['Coffee', 'Bread', 'Cosmetics', 'Meat'] : ['Kopi', 'Roti', 'Kosmetik', 'Daging']).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => quickSearch(tag)}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-[#6b1282] border border-purple-100/70 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] sm:text-xs font-bold text-neutral-700 uppercase tracking-wide flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#6b1282]" />
                  <span>{t('search_label_product')}</span>
                </label>
                <Input
                  fullWidth
                  variant="primary"
                  placeholder={t('search_placeholder_product')}
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="h-11 rounded-xl bg-white border border-neutral-300 hover:border-purple-300 focus:border-[#6b1282] text-xs sm:text-sm text-neutral-900 shadow-2xs transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] sm:text-xs font-bold text-neutral-700 uppercase tracking-wide flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#6b1282]" />
                  <span>{t('search_label_producer')}</span>
                </label>
                <Input
                  fullWidth
                  variant="primary"
                  placeholder={t('search_placeholder_producer')}
                  value={producerName}
                  onChange={(e) => setProducerName(e.target.value)}
                  className="h-11 rounded-xl bg-white border border-neutral-300 hover:border-purple-300 focus:border-[#6b1282] text-xs sm:text-sm text-neutral-900 shadow-2xs transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] sm:text-xs font-bold text-neutral-700 uppercase tracking-wide flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-[#6b1282]" />
                  <span>{t('search_label_cert')}</span>
                </label>
                <Input
                  fullWidth
                  variant="primary"
                  placeholder={t('search_placeholder_cert')}
                  value={certNo}
                  onChange={(e) => setCertNo(e.target.value)}
                  className="h-11 rounded-xl bg-white border border-neutral-300 hover:border-purple-300 focus:border-[#6b1282] text-xs sm:text-sm text-neutral-900 shadow-2xs transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                {/* Spacer label on desktop to ensure exact height & baseline alignment with other columns */}
                <span className="hidden lg:block text-[11px] sm:text-xs font-bold text-transparent select-none">
                  &nbsp;
                </span>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  className="bg-[#6b1282] hover:bg-[#581c87] text-white font-bold h-11 rounded-xl shadow-md shadow-purple-950/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] text-xs sm:text-sm cursor-pointer"
                >
                  <Search className="w-4 h-4 text-purple-200" />
                  <span>{t('search_button')}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroVideoBanner;

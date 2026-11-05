import React, { useState } from 'react';
import { Input, Button } from '@heroui/react';
import { Search, Sparkles, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MovingBorderButton } from '@/components/ui/moving-border';
import { FlipWords } from '@/components/ui/flip-words';
import { SparklesCore } from '@/components/ui/sparkles';

export const HeroVideoBanner: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [producerName, setProducerName] = useState('');
  const [certNo, setCertNo] = useState('');

  const words = [
    'Halal Assurance',
    'Integritas Syar’i',
    'Riset Sains Presisi',
    'Akreditasi Mutlak',
    'Kemitraan Terpercaya',
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
    <section className="relative min-h-[94vh] flex flex-col justify-between overflow-hidden bg-[#1b183a]">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-75 contrast-110"
        >
          <source src="/assets/videos/lab-lppom.mp4" type="video/mp4" />
          Your browser does not support video playback.
        </video>

        {/* LPH Official Color Mesh Overlays (Royal Purple #6b1282, Emerald #005a36, Azure #0284c7, Amber #f59e0b) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b183a] via-[#581c87]/70 to-[#005a36]/65 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(107,18,130,0.55),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.4),transparent_50%),radial-gradient(circle_at_50%_15%,rgba(2,132,199,0.35),transparent_50%)]" />
      </div>

      {/* Floating Sparkles Canvas (Aceternity UI) with LPH Logo Jewels */}
      <SparklesCore
        id="hero-sparkles"
        minSize={0.8}
        maxSize={2.8}
        particleDensity={45}
        particleColor={['#c084fc', '#34d399', '#38bdf8', '#fbbf24', '#ffffff']}
      />

      {/* Ambient Radial Floating Glows */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-gradient-to-r from-[#6b1282]/40 via-[#0284c7]/25 to-transparent blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-gradient-to-l from-[#10b981]/40 via-[#f59e0b]/25 to-transparent blur-3xl pointer-events-none animate-pulse" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-10 text-center flex flex-col items-center justify-center flex-1">
        {/* Animated Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-emerald-200 text-xs sm:text-sm font-bold mb-6 shadow-2xl"
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-white tracking-wide">Lembaga Pemeriksa Halal</span>
          <span className="text-purple-300 font-extrabold">•</span>
          <span className="text-emerald-300">UIN Sunan Gunung Djati Bandung</span>
        </motion.div>

        {/* Main Heading with Aceternity FlipWords in Jewel Colors */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.15] drop-shadow-2xl"
        >
          Leading in{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-sky-300 via-purple-300 to-amber-300">
            <FlipWords words={words} className="text-emerald-300" />
          </span>
          <br className="hidden sm:inline" />
          Solutions
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-base sm:text-lg lg:text-xl text-neutral-100 max-w-3xl leading-relaxed font-normal drop-shadow-md"
        >
          Lembaga Pemeriksa Halal (LPH) UIN Sunan Gunung Djati Bandung berupaya mempertahankan posisinya sebagai lembaga pemeriksa halal terkemuka serta menjadi mitra utama industri halal nasional dan internasional.
        </motion.p>

        {/* Action Buttons featuring Aceternity Moving Border & Glowing Glass */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/layanan/kalkulator">
            <MovingBorderButton
              duration={3200}
              className="bg-gradient-to-r from-[#6b1282] via-[#4a0d5c] to-[#005a36] text-white font-bold hover:brightness-110 shadow-xl"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                Hitung Tarif Halal
                <ArrowRight className="w-4 h-4" />
              </span>
            </MovingBorderButton>
          </Link>
          <Link to="/tentang">
            <Button
              variant="outline"
              className="h-12 bg-white/15 hover:bg-white/25 text-white border border-white/40 backdrop-blur-md font-bold text-sm px-6 rounded-2xl transition-all shadow-xl hover:scale-105"
            >
              Pelajari Profil LPH
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Floating Search Box with Aceternity Jewel Gradient Border Frame */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10"
      >
        <div className="relative rounded-3xl p-[2px] bg-gradient-to-r from-[#6b1282] via-[#0284c7] via-[#10b981] to-[#f59e0b] shadow-2xl">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[22px] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#6b1282] flex items-center justify-center shadow-xs">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#1b183a]">
                    Cari Produk Halal Melalui Pemeriksaan LPH UIN SGD
                  </h3>
                  <span className="text-xs font-semibold text-neutral-500">
                    Terhubung langsung dengan Pangkalan Data Resmi BPJPH &amp; MUI
                  </span>
                </div>
              </div>

              {/* Quick tags */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-neutral-400">Pencarian Populer:</span>
                {['Kopi', 'Roti', 'Kosmetik', 'Daging'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => quickSearch(tag)}
                    className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-purple-100 text-neutral-700 hover:text-[#6b1282] transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1.5">
                  Nama Produk
                </label>
                <Input
                  placeholder="Contoh: Kopi, Roti, Kosmetik..."
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  variant="secondary"
                  className="bg-neutral-50 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1.5">
                  Nama Produsen / Perusahaan
                </label>
                <Input
                  placeholder="Contoh: PT Sumber Pangan..."
                  value={producerName}
                  onChange={(e) => setProducerName(e.target.value)}
                  variant="secondary"
                  className="bg-neutral-50 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1.5">
                  No. Sertifikat / Ketetapan
                </label>
                <Input
                  placeholder="ID32... / No. Sertifikat"
                  value={certNo}
                  onChange={(e) => setCertNo(e.target.value)}
                  variant="secondary"
                  className="bg-neutral-50 rounded-xl"
                />
              </div>

              <div className="md:pt-5">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  className="bg-gradient-to-r from-[#6b1282] via-[#581c87] to-[#005a36] hover:brightness-110 text-white font-bold h-10 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  <Search className="w-4 h-4 text-emerald-300" />
                  Cari Produk Halal
                </Button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

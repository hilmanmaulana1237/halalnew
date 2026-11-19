import React, { useState, useEffect } from 'react';
import { Button, Card, Input } from '@heroui/react';
import {
  Calculator,
  Download,
  CheckCircle,
  FileText,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MapPin,
  Clock,
  Globe2,
  ExternalLink,
  Phone,
  ZoomIn,
  AlertCircle,
  Layers,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { SparklesCore } from '@/components/ui/sparkles';
import { getFlyerRates, type FlyerRatesConfig } from '@/services/ratesService';

export const PriceCalculatorPage: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  // Dynamic flyer rates synchronized with Admin Panel
  const [flyerRates, setFlyerRates] = useState<FlyerRatesConfig>(getFlyerRates());

  useEffect(() => {
    const handleUpdate = () => {
      setFlyerRates(getFlyerRates());
    };
    window.addEventListener('lph-rates-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('lph-rates-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // State for interactive simulator
  const [selectedRegion, setSelectedRegion] = useState<'BANDUNG' | 'JABAR' | 'INTERNATIONAL'>('JABAR');
  const [businessScale, setBusinessScale] = useState<'MIKRO_KECIL' | 'MENENGAH' | 'BESAR'>('MIKRO_KECIL');
  const [productTier, setProductTier] = useState<number>(50); // 50, 100, 200, 201
  const [isFlyerZoomed, setIsFlyerZoomed] = useState<boolean>(false);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat(isEn ? 'en-US' : 'id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatShortMillions = (val: number) => {
    const millions = val / 1000000;
    return `Mulai Rp${millions % 1 === 0 ? millions : millions.toFixed(2).replace('.', ',')} Jt`;
  };

  // Calculation logic based on official flyer (dynamic from Admin)
  const getEstimatedFee = () => {
    if (selectedRegion === 'INTERNATIONAL') {
      const minPrice = flyerRates.international?.minPrice || 60000000;
      return {
        amount: minPrice,
        label: isEn ? `Starting from ${formatRupiah(minPrice)}` : `Mulai dari ${formatRupiah(minPrice)},-`,
        notes: isEn
          ? 'International inspection outside Indonesia. Please consult official LPH WhatsApp for custom quotation and logistics.'
          : 'Pemeriksaan internasional luar negeri. Hubungi WhatsApp resmi LPH untuk estimasi detail akomodasi dan logistik auditor.',
        isCustom: true,
      };
    }

    if (selectedRegion === 'BANDUNG') {
      if (businessScale === 'MIKRO_KECIL') {
        const amt = flyerRates.bandung?.mikroKecil || 1820000;
        return {
          amount: amt,
          label: `${formatRupiah(amt)},-`,
          notes: isEn
            ? 'Estimated starting fee for Micro / Small scale within Bandung City area.'
            : `Mulai dari ${formatRupiah(amt)},- untuk Usaha Mikro / Kecil wilayah Kota Bandung.`,
          isCustom: false,
        };
      } else {
        const amt = flyerRates.bandung?.menengahBesar || 17000000;
        return {
          amount: amt,
          label: `${formatRupiah(amt)},-`,
          notes: isEn
            ? 'Estimated starting fee for Medium / Large scale within Bandung City area.'
            : `Mulai dari ${formatRupiah(amt)},- untuk Usaha Menengah / Besar wilayah Kota Bandung.`,
          isCustom: false,
        };
      }
    }

    // Jawa Barat Region
    if (businessScale === 'MIKRO_KECIL') {
      if (productTier <= 50) {
        const amt = flyerRates.jabar?.mikroKecil?.p0_50 || 3300000;
        return {
          amount: amt,
          label: `${formatRupiah(amt)},-`,
          notes: isEn ? '0 - 50 Product Variants (Jawa Barat)' : 'Jumlah Produk 0 - 50 (Wilayah Jawa Barat)',
          isCustom: false,
        };
      } else if (productTier <= 100) {
        const amt = flyerRates.jabar?.mikroKecil?.p50_100 || 3900000;
        return {
          amount: amt,
          label: `${formatRupiah(amt)},-`,
          notes: isEn ? '50 - 100 Product Variants (Jawa Barat)' : 'Jumlah Produk 50 - 100 (Wilayah Jawa Barat)',
          isCustom: false,
        };
      } else if (productTier <= 200) {
        const amt = flyerRates.jabar?.mikroKecil?.p100_200 || 4400000;
        return {
          amount: amt,
          label: `${formatRupiah(amt)},-`,
          notes: isEn ? '100 - 200 Product Variants (Jawa Barat)' : 'Jumlah Produk 100 - 200 (Wilayah Jawa Barat)',
          isCustom: false,
        };
      } else {
        const amt = flyerRates.jabar?.mikroKecil?.pOver200 || 4900000;
        return {
          amount: amt,
          label: `${formatRupiah(amt)},-`,
          notes: isEn ? '> 200 Product Variants (Jawa Barat)' : 'Jumlah Produk > 200 (Wilayah Jawa Barat)',
          isCustom: false,
        };
      }
    } else if (businessScale === 'MENENGAH') {
      const amt = flyerRates.jabar?.menengah || 21000000;
      return {
        amount: amt,
        label: `${formatRupiah(amt)},-`,
        notes: isEn
          ? 'Medium Enterprise scale across West Java region.'
          : `Mulai dari ${formatRupiah(amt)},- untuk Usaha Menengah di Jawa Barat.`,
        isCustom: false,
      };
    } else {
      const amt = flyerRates.jabar?.besar || 30000000;
      return {
        amount: amt,
        label: `${formatRupiah(amt)},-`,
        notes: isEn
          ? 'Large Enterprise scale across West Java region.'
          : `Mulai dari ${formatRupiah(amt)},- untuk Usaha Besar di Jawa Barat.`,
        isCustom: false,
      };
    }
  };

  const currentEstimate = getEstimatedFee();

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-b from-[#FAF7FD] via-white to-[#F7F2FB] pb-24">
      {/* Header Banner */}
      <section className="relative py-14 sm:py-20 lg:py-24 bg-[#1a0726] text-white overflow-hidden text-center">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#4B0D78] via-[#6B18A8] via-[#F5D32F] to-[#6B18A8]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0726] via-[#4a0d5c] to-[#1a0726] opacity-95" />
        <SparklesCore
          id="calc-sparkles"
          minSize={0.7}
          maxSize={2.2}
          particleDensity={35}
          particleColor={['#ffffff', '#f5d0fe', '#F5D32F', '#d8b4fe']}
        />
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7D1] text-[#713f12] text-xs font-extrabold uppercase tracking-wider mb-4 border border-[#F5D32F] shadow-xs">
            <Calculator className="w-3.5 h-3.5 text-[#eab308]" />
            {isEn ? 'OFFICIAL HALAL TARIFF ESTIMATION' : 'ESTIMASI TARIF SERTIFIKASI HALAL REGULER'}
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-2xl leading-tight">
            ESTIMASI TARIF <span className="text-[#F5D32F]">SKEMA REGULER</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-purple-200 font-bold">
            Lembaga Pemeriksa Halal (LPH) UIN Sunan Gunung Djati Bandung
          </p>
          <p className="mt-2 text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            {isEn
              ? 'Transparent tariff simulation conforming to BPJPH Decree No. 22 of 2024 with institutional price concession discounts from LPH UIN SGD Bandung.'
              : 'Simulasi tarif transparan mengacu pada Kepkaban 22 Tahun 2024 yang kemudian diberikan potongan harga dari LPH UIN SGD Bandung.'}
          </p>
        </div>
      </section>

      {/* Main Container - Extended Proportions & Responsive Spacing */}
      <div className="w-full max-w-[1440px] xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 -mt-6 sm:-mt-10 relative z-30 space-y-6 sm:space-y-8">

        {/* Prominent Estimation Warning Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#F5D32F] shadow-lg shadow-yellow-950/5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFF7D1] text-[#713f12] flex items-center justify-center shrink-0 border border-[#F5D32F]/60 mt-0.5">
              <AlertCircle className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-[#713f12] uppercase tracking-wide">
                {isEn ? 'ESTIMATION STAGE NOTICE (NOT A FIXED FEE)' : 'PEMBERITAHUAN: SELURUH NOMINAL MASIH TAHAP ESTIMASI (BUKAN BIAYA FIX)'}
              </h4>
              <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                {isEn
                  ? 'Tariff estimates are benchmarked against BPJPH Decree No. 22 of 2024 and include institutional fee relief discounts provided by LPH UIN SGD Bandung. Final official invoice will be generated directly via SIHALAL BPJPH.'
                  : 'Estimasi tarif mengacu pada Kepkaban 22 Tahun 2024 dengan potongan harga khusus dari LPH UIN SGD Bandung. Tagihan resmi final diterbitkan melalui invoice billing SIHALAL BPJPH.'}
              </p>
            </div>
          </div>
          <div className="shrink-0 pl-12 sm:pl-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-[#FFF7D1] text-[#713f12] border border-[#F5D32F] whitespace-nowrap">
              <Sparkles className="w-3 h-3 text-amber-600" />
              {isEn ? 'Official LPH Rate' : 'Diskon Khusus LPH'}
            </span>
          </div>
        </div>

        {/* 2-Column Section: Flyer Card (Left) & Interactive Calculator (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Official Flyer Visual (Col 5) */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
            <Card className="bg-white rounded-3xl border border-[#C9A5E8]/40 shadow-xl overflow-hidden p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#6B18A8]" />
                  <h3 className="font-bold text-sm sm:text-base text-neutral-900">
                    {isEn ? 'Official Tariff Flyer' : 'Flyer Resmi Skema Reguler'}
                  </h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF7FD] text-[#6B18A8] border border-[#C9A5E8]/50">
                  Resmi LPH
                </span>
              </div>

              {/* Flyer Image with Zoom Preview (Crystal Clear, No Dark Tint) */}
              <div
                className="relative rounded-2xl overflow-hidden border border-[#C9A5E8]/40 bg-white group cursor-pointer shadow-sm hover:shadow-md transition-all max-h-[380px] sm:max-h-[460px] lg:max-h-none flex items-center justify-center p-1"
                onClick={() => setIsFlyerZoomed(true)}
              >
                <img
                  src="/assets/images/flyer-skema-reguler.jpg"
                  alt="Flyer Sertifikasi Halal Skema Reguler LPH UIN SGD Bandung"
                  className="w-full h-auto object-contain rounded-xl group-hover:scale-[1.01] transition-transform duration-300"
                />

                {/* Clean Floating Glass Badge (Tidak Menghitamkan Flyer) */}
                <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none">
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Button
                  variant="primary"
                  className="flex-1 bg-[#6B18A8] hover:bg-[#58138a] text-white text-xs font-bold py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                  onPress={() => setIsFlyerZoomed(true)}
                >
                  <ZoomIn className="w-3.5 h-3.5 text-[#F5D32F]" />
                  <span>{isEn ? 'Enlarge' : 'Perbesar Flyer'}</span>
                </Button>
                <a
                  href="/assets/images/flyer-skema-reguler.jpg"
                  download="Flyer_Sertifikasi_Halal_LPH_UIN_SGD.jpg"
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    className="w-full border-neutral-300 text-neutral-700 text-xs font-bold py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-1.5 hover:bg-neutral-50"
                  >
                    <Download className="w-3.5 h-3.5 text-[#6B18A8]" />
                    <span>{isEn ? 'Download (.jpg)' : 'Unduh (.jpg)'}</span>
                  </Button>
                </a>
              </div>
            </Card>
          </div>

          {/* Right Column: Interactive Estimation Simulator (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="bg-white rounded-3xl border border-[#C9A5E8]/40 shadow-xl p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">
              <div className="border-b border-neutral-100 pb-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#6B18A8] uppercase tracking-wider">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Interactive Tariff Simulator' : 'Simulasi Estimasi Interaktif'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#292333] mt-1">
                  {isEn ? 'Calculate Estimated Audit Cost' : 'Hitung Estimasi Biaya Berdasarkan Flyer'}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  {isEn
                    ? 'Select your enterprise location and scale to review the corresponding flyer rate.'
                    : 'Pilih wilayah lokasi dan skala usaha Anda untuk melihat estimasi biaya yang sesuai dengan flyer resmi.'}
                </p>
              </div>

              {/* Region Selector */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#6B18A8]" />
                  <span>{isEn ? 'Enterprise Location / Region' : 'Wilayah / Lokasi Pelaku Usaha'}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                  {[
                    { id: 'BANDUNG', label: 'Kota Bandung', sub: formatShortMillions(flyerRates.bandung?.mikroKecil || 1820000) },
                    { id: 'JABAR', label: 'Jawa Barat', sub: formatShortMillions(flyerRates.jabar?.mikroKecil?.p0_50 || 3300000) },
                    { id: 'INTERNATIONAL', label: 'Luar Indonesia', sub: formatShortMillions(flyerRates.international?.minPrice || 60000000) },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedRegion(r.id as any)}
                      className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[56px] sm:min-h-[64px] ${selectedRegion === r.id
                          ? 'bg-[#6B18A8] text-white border-[#6B18A8] shadow-md shadow-purple-950/20'
                          : 'bg-[#FAF7FD] text-neutral-700 border-[#C9A5E8]/40 hover:bg-white hover:border-[#6B18A8]'
                        }`}
                    >
                      <span className="font-bold text-xs sm:text-sm">{r.label}</span>
                      <span className={`text-[11px] font-bold mt-1 ${selectedRegion === r.id ? 'text-[#F5D32F]' : 'text-[#6B18A8]'}`}>
                        {r.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Business Scale (For Bandung & Jabar) */}
              {selectedRegion !== 'INTERNATIONAL' && (
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#6B18A8]" />
                    <span>{isEn ? 'Business Scale' : 'Skala Usaha'}</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                    {[
                      { id: 'MIKRO_KECIL', label: 'Mikro / Kecil', desc: 'UMKM & Industri Kecil' },
                      { id: 'MENENGAH', label: 'Menengah', desc: 'Industri Menengah' },
                      { id: 'BESAR', label: 'Besar', desc: 'Korporasi & Pabrik' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setBusinessScale(s.id as any)}
                        className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[56px] sm:min-h-[64px] ${businessScale === s.id
                            ? 'bg-[#6B18A8] text-white border-[#6B18A8] shadow-md shadow-purple-950/20'
                            : 'bg-[#FAF7FD] text-neutral-700 border-[#C9A5E8]/40 hover:bg-white hover:border-[#6B18A8]'
                          }`}
                      >
                        <span className="font-bold text-xs sm:text-sm">{s.label}</span>
                        <span className={`text-[10px] font-medium mt-1 ${businessScale === s.id ? 'text-purple-200' : 'text-neutral-500'}`}>
                          {s.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Tier (Only for Jawa Barat + Mikro/Kecil) */}
              {selectedRegion === 'JABAR' && businessScale === 'MIKRO_KECIL' && (
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-2">
                    {isEn ? 'Number of Product Variants (Jawa Barat Scheme)' : 'Jumlah Varian Produk (Sesuai Skema Jabar di Flyer)'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                    {[
                      { tier: 50, label: '0 - 50 Produk', price: formatRupiah(flyerRates.jabar?.mikroKecil?.p0_50 || 3300000) },
                      { tier: 100, label: '50 - 100 Produk', price: formatRupiah(flyerRates.jabar?.mikroKecil?.p50_100 || 3900000) },
                      { tier: 200, label: '100 - 200 Produk', price: formatRupiah(flyerRates.jabar?.mikroKecil?.p100_200 || 4400000) },
                      { tier: 201, label: '> 200 Produk', price: formatRupiah(flyerRates.jabar?.mikroKecil?.pOver200 || 4900000) },
                    ].map((p) => (
                      <button
                        key={p.tier}
                        type="button"
                        onClick={() => setProductTier(p.tier)}
                        className={`p-2.5 sm:p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[56px] sm:min-h-[64px] ${productTier === p.tier
                            ? 'bg-[#6B18A8] text-white border-[#6B18A8] shadow-xs'
                            : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-white'
                          }`}
                      >
                        <span className="font-bold text-[11px] sm:text-xs">{p.label}</span>
                        <span className={`text-[10px] sm:text-[11px] font-extrabold mt-1 ${productTier === p.tier ? 'text-[#F5D32F]' : 'text-[#6B18A8]'}`}>
                          {p.price}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Result Showcase Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#FAF7FD] to-purple-50/70 border-2 border-[#C9A5E8]/60 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6B18A8]">
                    {isEn ? 'Estimated Service Rate' : 'Estimasi Tarif Layanan'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#FFF7D1] text-[#713f12] border border-[#F5D32F]">
                    {isEn ? 'Stage: Estimation' : 'Tahap: Estimasi'}
                  </span>
                </div>

                <div className="text-2xl sm:text-4xl font-black text-[#6B18A8] font-mono break-words">
                  {currentEstimate.label}
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
                  {currentEstimate.notes}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] text-[#4B0D78] font-semibold border-t border-[#C9A5E8]/30">
                  <Clock className="w-3.5 h-3.5 text-[#6B18A8] shrink-0" />
                  <span>{isEn ? 'Estimated Duration: 2 Weeks post-payment (Fatwa session 2x / month)' : 'Estimasi Durasi: 2 Minggu setelah pelunasan (Sidang fatwa 2x sebulan)'}</span>
                </div>

                {selectedRegion === 'INTERNATIONAL' && (
                  <div className="pt-1">
                    <span className="inline-block px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                      🌍 Layanan Pemeriksaan Luar Negeri / Internasional
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${flyerRates.international?.contactWa || '6282126493700'}?text=${encodeURIComponent(
                    `Halo Admin LPH UIN SGD Bandung, saya ingin konsultasi pendaftaran sertifikasi halal skema reguler untuk wilayah ${selectedRegion} (${businessScale}). Mohon arahan alur dan persyaratannya.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    variant="primary"
                    fullWidth
                    className="bg-[#F5D32F] hover:bg-[#eab308] text-[#3B074A] font-extrabold min-h-[48px] py-3 rounded-xl shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-[#3B074A]" />
                    <span>{isEn ? 'Consult via Official WhatsApp' : 'Konsultasi Sertifikasi (WhatsApp)'}</span>
                  </Button>
                </a>

                <a
                  href="https://ptsp.halal.go.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    fullWidth
                    className="border-neutral-300 text-neutral-700 hover:text-[#6B18A8] font-bold min-h-[48px] py-3 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer hover:bg-neutral-50"
                  >
                    <span>{isEn ? 'Open SIHALAL Portal' : 'Buka Portal SIHALAL BPJPH'}</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal Zoom Flyer */}
      {isFlyerZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsFlyerZoomed(false)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl p-2 sm:p-4 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 border-b border-neutral-100">
              <h3 className="font-bold text-sm sm:text-base text-neutral-800">
                Flyer Sertifikasi Halal "Skema Reguler" - LPH UIN SGD Bandung
              </h3>
              <button
                type="button"
                onClick={() => setIsFlyerZoomed(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto max-h-[75vh] p-2 flex justify-center">
              <img
                src="/assets/images/flyer-skema-reguler.jpg"
                alt="Flyer Sertifikasi Halal Skema Reguler Penuh"
                className="max-w-full h-auto rounded-xl object-contain"
              />
            </div>
            <div className="p-3 border-t border-neutral-100 flex justify-end gap-2">
              <a
                href="/assets/images/flyer-skema-reguler.jpg"
                download="Flyer_Sertifikasi_Halal_LPH_UIN_SGD.jpg"
              >
                <Button variant="primary" className="bg-[#6B18A8] text-white text-xs font-bold px-4 py-2 rounded-xl">
                  Unduh Flyer (.jpg)
                </Button>
              </a>
              <Button
                variant="outline"
                className="text-xs font-bold px-4 py-2 rounded-xl"
                onPress={() => setIsFlyerZoomed(false)}
              >
                Tutup
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceCalculatorPage;

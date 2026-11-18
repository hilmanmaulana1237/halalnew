import React, { useState } from 'react';
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

export const PriceCalculatorPage: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  // State for interactive simulator
  const [selectedRegion, setSelectedRegion] = useState<'BANDUNG' | 'JABAR' | 'INTERNATIONAL'>('JABAR');
  const [businessScale, setBusinessScale] = useState<'MIKRO_KECIL' | 'MENENGAH' | 'BESAR'>('MIKRO_KECIL');
  const [productTier, setProductTier] = useState<number>(50); // 50, 100, 200, 201
  const [isFlyerZoomed, setIsFlyerZoomed] = useState<boolean>(false);

  // Calculation logic based on official flyer
  const getEstimatedFee = () => {
    if (selectedRegion === 'INTERNATIONAL') {
      return {
        amount: 60000000,
        label: isEn ? 'Starting from Rp 60,000,000' : 'Mulai dari Rp60.000.000,-',
        notes: isEn
          ? 'International inspection outside Indonesia. Please consult official LPH WhatsApp for custom quotation and logistics.'
          : 'Pemeriksaan internasional luar negeri. Hubungi WhatsApp resmi LPH untuk estimasi detail akomodasi dan logistik auditor.',
        isCustom: true,
      };
    }

    if (selectedRegion === 'BANDUNG') {
      if (businessScale === 'MIKRO_KECIL') {
        return {
          amount: 1820000,
          label: 'Rp1.820.000,-',
          notes: isEn
            ? 'Estimated starting fee for Micro / Small scale within Bandung City area.'
            : 'Mulai dari Rp1.820.000,- untuk Usaha Mikro / Kecil wilayah Kota Bandung.',
          isCustom: false,
        };
      } else {
        return {
          amount: 17000000,
          label: 'Rp17.000.000,-',
          notes: isEn
            ? 'Estimated starting fee for Medium / Large scale within Bandung City area.'
            : 'Mulai dari Rp17.000.000,- untuk Usaha Menengah / Besar wilayah Kota Bandung.',
          isCustom: false,
        };
      }
    }

    // Jawa Barat Region
    if (businessScale === 'MIKRO_KECIL') {
      if (productTier <= 50) {
        return {
          amount: 3300000,
          label: 'Rp3.300.000,-',
          notes: isEn ? '0 - 50 Product Variants (Jawa Barat)' : 'Jumlah Produk 0 - 50 (Wilayah Jawa Barat)',
          isCustom: false,
        };
      } else if (productTier <= 100) {
        return {
          amount: 3900000,
          label: 'Rp3.900.000,-',
          notes: isEn ? '50 - 100 Product Variants (Jawa Barat)' : 'Jumlah Produk 50 - 100 (Wilayah Jawa Barat)',
          isCustom: false,
        };
      } else if (productTier <= 200) {
        return {
          amount: 4400000,
          label: 'Rp4.400.000,-',
          notes: isEn ? '100 - 200 Product Variants (Jawa Barat)' : 'Jumlah Produk 100 - 200 (Wilayah Jawa Barat)',
          isCustom: false,
        };
      } else {
        return {
          amount: 4900000,
          label: 'Rp4.900.000,-',
          notes: isEn ? '> 200 Product Variants (Jawa Barat)' : 'Jumlah Produk > 200 (Wilayah Jawa Barat)',
          isCustom: false,
        };
      }
    } else if (businessScale === 'MENENGAH') {
      return {
        amount: 21000000,
        label: 'Rp21.000.000,-',
        notes: isEn
          ? 'Medium Enterprise scale across West Java region.'
          : 'Mulai dari Rp21.000.000,- untuk Usaha Menengah di Jawa Barat.',
        isCustom: false,
      };
    } else {
      return {
        amount: 30000000,
        label: 'Rp30.000.000,-',
        notes: isEn
          ? 'Large Enterprise scale across West Java region.'
          : 'Mulai dari Rp30.000.000,- untuk Usaha Besar di Jawa Barat.',
        isCustom: false,
      };
    }
  };

  const currentEstimate = getEstimatedFee();

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat(isEn ? 'en-US' : 'id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-b from-[#FAF7FD] via-white to-[#F7F2FB] pb-24">
      {/* Header Banner */}
      <section className="relative py-20 lg:py-24 bg-[#1a0726] text-white overflow-hidden text-center">
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
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-2xl leading-tight">
            ESTIMASI TARIF <span className="text-[#F5D32F]">SKEMA REGULER</span>
          </h1>
          <p className="mt-3 text-base sm:text-lg text-purple-200 font-medium">
            Lembaga Pemeriksa Halal (LPH) UIN Sunan Gunung Djati Bandung
          </p>
          <p className="mt-2 text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            {isEn
              ? 'Transparent tariff simulation conforming to BPJPH Decree No. 22 of 2024 with institutional price concession discounts from LPH UIN SGD Bandung.'
              : 'Simulasi tarif transparan mengacu pada Kepkaban 22 Tahun 2024 yang kemudian diberikan potongan harga dari LPH UIN SGD Bandung.'}
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-30 space-y-8">

        {/* 2-Column Section: Flyer Card (Left) & Interactive Calculator (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Flyer Visual (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="bg-white rounded-3xl border border-[#C9A5E8]/40 shadow-xl overflow-hidden p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#6B18A8]" />
                  <h3 className="font-bold text-sm sm:text-base text-neutral-900">
                    {isEn ? 'Official Tariff Flyer' : 'Flyer Resmi Skema Reguler'}
                  </h3>
                </div>
              </div>

              {/* Flyer Image with Zoom Preview */}
              <div
                className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 group cursor-pointer shadow-inner"
                onClick={() => setIsFlyerZoomed(true)}
              >
                <img
                  src="/assets/images/flyer-skema-reguler.jpg"
                  alt="Flyer Sertifikasi Halal Skema Reguler LPH UIN SGD Bandung"
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[#3B074A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs">
                  <ZoomIn className="w-5 h-5 text-[#F5D32F]" />
                  <span>{isEn ? 'Click to Enlarge Flyer' : 'Klik untuk Memperbesar Flyer'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Button
                  variant="primary"
                  className="flex-1 bg-[#6B18A8] hover:bg-[#58138a] text-white text-xs font-bold py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                  onPress={() => setIsFlyerZoomed(true)}
                >
                  <ZoomIn className="w-3.5 h-3.5 text-[#F5D32F]" />
                  <span>{isEn ? 'View Full Flyer' : 'Buka Flyer Penuh'}</span>
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
                    <span>{isEn ? 'Download Flyer' : 'Unduh Flyer'}</span>
                  </Button>
                </a>
              </div>


            </Card>
          </div>

          {/* Right Column: Interactive Estimation Simulator (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="bg-white rounded-3xl border border-[#C9A5E8]/40 shadow-xl p-6 sm:p-8 space-y-6">
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'BANDUNG', label: 'Kota Bandung', sub: 'Mulai Rp1,82 Jt' },
                    { id: 'JABAR', label: 'Jawa Barat', sub: 'Mulai Rp3,3 Jt' },
                    { id: 'INTERNATIONAL', label: 'Luar Indonesia', sub: 'Mulai Rp60 Jt' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedRegion(r.id as any)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${selectedRegion === r.id
                        ? 'bg-[#6B18A8] text-white border-[#6B18A8] shadow-md shadow-purple-950/20'
                        : 'bg-[#FAF7FD] text-neutral-700 border-[#C9A5E8]/40 hover:bg-white hover:border-[#6B18A8]'
                        }`}
                    >
                      <span className="font-bold text-xs sm:text-sm">{r.label}</span>
                      <span className={`text-[10px] font-semibold mt-1 ${selectedRegion === r.id ? 'text-[#F5D32F]' : 'text-[#6B18A8]'}`}>
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
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'MIKRO_KECIL', label: 'Mikro / Kecil', desc: 'UMKM & Industri Kecil' },
                      { id: 'MENENGAH', label: 'Menengah', desc: 'Industri Menengah' },
                      { id: 'BESAR', label: 'Besar', desc: 'Korporasi & Pabrik' },
                    ].map((s) => (
                      <Button
                        key={s.id}
                        type="button"
                        variant={businessScale === s.id ? 'primary' : 'outline'}
                        className={`text-xs font-bold py-3 rounded-xl transition-all cursor-pointer h-auto flex flex-col items-start ${businessScale === s.id
                          ? 'bg-[#6B18A8] text-white shadow-xs'
                          : 'border-neutral-200 text-neutral-700 hover:bg-[#FAF7FD]'
                          }`}
                        onPress={() => setBusinessScale(s.id as any)}
                      >
                        <span className="font-bold text-xs">{s.label}</span>
                        <span className={`text-[10px] font-normal ${businessScale === s.id ? 'text-purple-200' : 'text-neutral-400'}`}>
                          {s.desc}
                        </span>
                      </Button>
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
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { tier: 50, label: '0 - 50 Produk', price: 'Rp3.300.000' },
                      { tier: 100, label: '50 - 100 Produk', price: 'Rp3.900.000' },
                      { tier: 200, label: '100 - 200 Produk', price: 'Rp4.400.000' },
                      { tier: 201, label: '> 200 Produk', price: 'Rp4.900.000' },
                    ].map((p) => (
                      <button
                        key={p.tier}
                        type="button"
                        onClick={() => setProductTier(p.tier)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${productTier === p.tier
                          ? 'bg-[#6B18A8] text-white border-[#6B18A8] shadow-xs'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-white'
                          }`}
                      >
                        <span className="font-bold text-xs">{p.label}</span>
                        <span className={`text-[10px] font-extrabold mt-0.5 ${productTier === p.tier ? 'text-[#F5D32F]' : 'text-[#6B18A8]'}`}>
                          {p.price}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Result Showcase Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#FAF7FD] to-purple-50/70 border-2 border-[#C9A5E8]/60 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6B18A8]">
                    {isEn ? 'Estimated Rate' : 'Estimasi Tarif Layanan'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#FFF7D1] text-[#713f12] border border-[#F5D32F]">
                    {isEn ? 'Stage: Estimation' : 'Tahap: Estimasi'}
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-black text-[#6B18A8] font-mono">
                  {currentEstimate.label}
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {currentEstimate.notes}
                </p>

                {selectedRegion === 'INTERNATIONAL' && (
                  <div className="pt-2">
                    <span className="inline-block px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                      🌍 Layanan Pemeriksaan Luar Negeri / Internasional
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/6282126493700?text=${encodeURIComponent(
                    `Halo Admin LPH UIN SGD Bandung, saya ingin konsultasi pendaftaran sertifikasi halal skema reguler untuk wilayah ${selectedRegion} (${businessScale}). Mohon arahan alur dan persyaratannya.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    variant="primary"
                    fullWidth
                    className="bg-[#F5D32F] hover:bg-[#eab308] text-[#3B074A] font-extrabold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
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
                    className="border-neutral-300 text-neutral-700 hover:text-[#6B18A8] font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer hover:bg-neutral-50"
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

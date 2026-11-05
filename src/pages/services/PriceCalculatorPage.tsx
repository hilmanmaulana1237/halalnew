import React, { useState, useEffect } from 'react';
import { Button, Card, Input, Skeleton } from '@heroui/react';
import { Calculator, Download, CheckCircle, FileText, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { api } from '@/services/api';
import type { CalculationResult } from '@/types';

export const PriceCalculatorPage: React.FC = () => {
  const [serviceType, setServiceType] = useState<string>('REGULER');
  const [businessScale, setBusinessScale] = useState<string>('MIKRO');
  const [productCount, setProductCount] = useState<number>(1);
  const [ingredientCount, setIngredientCount] = useState<number>(5);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const calculate = async () => {
    setLoading(true);
    try {
      const res = await api.post('/calculator/calculate', {
        serviceType,
        businessScale,
        productCount: Number(productCount),
        ingredientCount: Number(ingredientCount),
      });
      if (res.data?.success) {
        setResult(res.data.data);
      } else {
        throw new Error('API offline');
      }
    } catch {
      // Standard calculation matching BPJPH rates
      const bpjphBase =
        businessScale === 'MIKRO'
          ? 300000
          : businessScale === 'KECIL'
          ? 2500000
          : businessScale === 'MENENGAH'
          ? 5000000
          : 12500000;
      const lphBase = Math.round(bpjphBase * 0.85);
      const prodAddon = (productCount - 1) * 25000;
      const ingrAddon = ingredientCount > 10 ? (ingredientCount - 10) * 15000 : 0;
      const totalB = bpjphBase + prodAddon + ingrAddon;
      const totalL = lphBase + Math.round(prodAddon * 0.8) + Math.round(ingrAddon * 0.8);
      const savingsNominal = totalB - totalL;
      const savingsPercent = Math.round((savingsNominal / totalB) * 100);

      setResult({
        serviceType,
        businessScale,
        totalBpjph: totalB,
        totalLph: totalL,
        savingsNominal,
        savingsPercent,
        breakdown: [
          {
            item: 'Biaya Pendaftaran & Verifikasi Dokumen',
            bpjph: Math.round(bpjphBase * 0.3),
            lph: Math.round(lphBase * 0.3),
          },
          {
            item: 'Audit & Pemeriksaan Lapangan oleh Auditor Halal LPH',
            bpjph: Math.round(bpjphBase * 0.5),
            lph: Math.round(lphBase * 0.5),
          },
          {
            item: 'Uji Laboratorium & Analisis Kehalalan Saintifik',
            bpjph: Math.round(bpjphBase * 0.2),
            lph: Math.round(lphBase * 0.2),
          },
          {
            item: `Tambahan Varian Produk (${productCount} item) & Bahan (${ingredientCount} item)`,
            bpjph: prodAddon + ingrAddon,
            lph: Math.round((prodAddon + ingrAddon) * 0.8),
          },
        ],
        notes:
          'Simulasi biaya didasarkan pada Keputusan Kepala BPJPH dan Standar Layanan LPH UIN SGD Bandung.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculate();
  }, [serviceType, businessScale, productCount, ingredientCount]);

  const handleDownloadPDF = async () => {
    const el = document.getElementById('calc-summary-card');
    if (!el) return;
    try {
      const canvas = await html2canvas(el, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.text('Estimasi Biaya Pemeriksaan Halal - LPH UIN SGD Bandung', 10, 15);
      pdf.addImage(imgData, 'PNG', 10, 25, imgWidth, imgHeight);
      pdf.save(
        `Estimasi_Tarif_Halal_${businessScale}_${new Date().toISOString().split('T')[0]}.pdf`
      );
    } catch {
      window.print();
    }
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-neutral-50 pb-20">
      {/* Header Banner in LPH Royal Purple & Emerald Gradient */}
      <section className="bg-gradient-to-r from-[#6b1282] via-[#4a0d5c] to-[#005a36] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
            <Calculator className="w-3.5 h-3.5" />
            Transparansi Biaya Sertifikasi Halal
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Kalkulator Tarif Halal LPH UIN SGD
          </h1>
          <p className="mt-3 text-neutral-200 max-w-2xl mx-auto text-sm sm:text-base font-normal">
            Simulasi transparan biaya pemeriksaan halal reguler sesuai standar tarif resmi BPJPH Kementerian Agama RI dan keunggulan efisiensi LPH UIN Sunan Gunung Djati.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Parameter Form (Col 5) */}
          <div className="lg:col-span-5">
            <Card className="bg-white rounded-3xl border border-neutral-200/80 shadow-xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-neutral-100 pb-4">
                <span className="text-xs font-black text-[#6b1282] uppercase tracking-wider">
                  Parameter Usaha
                </span>
                <h3 className="text-xl font-black text-[#1b183a] mt-1">
                  Pengaturan Skema &amp; Skala
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Sesuaikan skala usaha dan perkiraan jumlah produk/bahan baku.
                </p>
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-2">
                  Skema Layanan
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={serviceType === 'REGULER' ? 'primary' : 'outline'}
                    className={
                      serviceType === 'REGULER'
                        ? 'bg-[#6b1282] text-white font-bold text-xs py-2.5 rounded-xl shadow-xs'
                        : 'border-neutral-200 text-neutral-700 text-xs py-2.5 rounded-xl'
                    }
                    onPress={() => setServiceType('REGULER')}
                  >
                    Sertifikasi Baru (Reguler)
                  </Button>
                  <Button
                    variant={serviceType === 'PERPANJANGAN' ? 'primary' : 'outline'}
                    className={
                      serviceType === 'PERPANJANGAN'
                        ? 'bg-[#6b1282] text-white font-bold text-xs py-2.5 rounded-xl shadow-xs'
                        : 'border-neutral-200 text-neutral-700 text-xs py-2.5 rounded-xl'
                    }
                    onPress={() => setServiceType('PERPANJANGAN')}
                  >
                    Perpanjangan Sertifikat
                  </Button>
                </div>
              </div>

              {/* Business Scale */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-2">
                  Skala Usaha
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'MIKRO', label: 'Usaha Mikro (UMK)', color: 'bg-[#005a36]' },
                    { id: 'KECIL', label: 'Usaha Kecil', color: 'bg-[#6b1282]' },
                    { id: 'MENENGAH', label: 'Usaha Menengah', color: 'bg-[#0284c7]' },
                    { id: 'BESAR', label: 'Industri Besar', color: 'bg-[#d97706]' },
                  ].map((s) => (
                    <Button
                      key={s.id}
                      variant={businessScale === s.id ? 'primary' : 'outline'}
                      className={
                        businessScale === s.id
                          ? `${s.color} text-white font-bold text-xs py-2.5 rounded-xl shadow-xs`
                          : 'border-neutral-200 text-neutral-700 text-xs py-2.5 rounded-xl'
                      }
                      onPress={() => setBusinessScale(s.id)}
                    >
                      {s.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Product and Ingredient Count */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-1.5">
                    Jumlah Produk (Item)
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="500"
                    value={productCount.toString()}
                    onChange={(e) =>
                      setProductCount(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-full rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-1.5">
                    Jumlah Bahan (Item)
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="1000"
                    value={ingredientCount.toString()}
                    onChange={(e) =>
                      setIngredientCount(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-full rounded-xl"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 leading-relaxed flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#005a36] shrink-0 mt-0.5" />
                <span>
                  LPH UIN SGD Bandung memberikan efisiensi biaya audit lapangan dan pengujian laboratorium berstandar akreditasi ISO 17025.
                </span>
              </div>
            </Card>
          </div>

          {/* Result Calculation Summary (Col 7) */}
          <div className="lg:col-span-7">
            <div id="calc-summary-card">
              <Card className="bg-white rounded-3xl border border-neutral-200/80 shadow-xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 gap-2">
                  <div>
                    <span className="text-xs font-black text-[#6b1282] uppercase tracking-wider">
                      Hasil Simulasi Biaya
                    </span>
                    <h3 className="text-xl font-black text-[#1b183a]">
                      Estimasi Biaya Pemeriksaan Halal
                    </h3>
                  </div>
                  <Button
                    variant="outline"
                    className="border-neutral-200 text-[#6b1282] font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 self-start sm:self-auto"
                    onPress={handleDownloadPDF}
                  >
                    <Download className="w-3.5 h-3.5" />
                    Unduh PDF
                  </Button>
                </div>

                {loading || !result ? (
                  <div className="space-y-4">
                    <Skeleton className="h-20 w-full rounded-xl" />
                    <Skeleton className="h-40 w-full rounded-xl" />
                  </div>
                ) : (
                  <>
                    {/* Big Metric Box */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
                        <span className="text-xs font-bold text-neutral-500 block uppercase">
                          Standar Maksimum BPJPH
                        </span>
                        <span className="text-2xl sm:text-3xl font-black text-neutral-800 block mt-1 font-mono">
                          {formatRupiah(result.totalBpjph)}
                        </span>
                        <span className="text-[11px] text-neutral-400 mt-1 block">
                          Sesuai Keputusan Tarif Resmi
                        </span>
                      </div>

                      <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 via-purple-50/20 to-emerald-50 border border-emerald-300">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#005a36] uppercase">
                            Estimasi LPH UIN SGD
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#005a36] text-white">
                            Hemat {result.savingsPercent}%
                          </span>
                        </div>
                        <span className="text-2xl sm:text-3xl font-black text-[#005a36] block mt-1 font-mono">
                          {formatRupiah(result.totalLph)}
                        </span>
                        <span className="text-[11px] text-emerald-800 mt-1 block font-bold">
                          Efisiensi hemat {formatRupiah(result.savingsNominal)}
                        </span>
                      </div>
                    </div>

                    {/* Breakdown Table */}
                    <div>
                      <h4 className="text-xs font-black text-neutral-700 uppercase tracking-wide mb-3">
                        Rincian Komponen Biaya
                      </h4>
                      <div className="rounded-2xl border border-neutral-200 overflow-hidden text-xs">
                        <table className="w-full text-left">
                          <thead className="bg-neutral-100/80 text-neutral-700 font-black border-b border-neutral-200">
                            <tr>
                              <th className="py-3 px-4">Komponen Layanan</th>
                              <th className="py-3 px-4 text-right">Maks. BPJPH</th>
                              <th className="py-3 px-4 text-right text-[#005a36]">LPH UIN SGD</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-100">
                            {result.breakdown.map((row, idx) => (
                              <tr key={idx} className="hover:bg-purple-50/30 transition-colors">
                                <td className="py-3 px-4 font-bold text-neutral-800">
                                  {row.item}
                                </td>
                                <td className="py-3 px-4 text-right text-neutral-500 font-mono font-medium">
                                  {formatRupiah(row.bpjph)}
                                </td>
                                <td className="py-3 px-4 text-right font-black text-[#005a36] font-mono">
                                  {formatRupiah(row.lph)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Notes & Disclaimer */}
                    <p className="text-[11px] text-neutral-400 leading-relaxed italic">
                      * {result.notes} Biaya belum termasuk akomodasi auditor jika lokasi pabrik di luar jangkauan reguler.
                    </p>

                    {/* CTA Button in LPH Gradient */}
                    <div className="pt-2">
                      <a
                        href="https://wa.me/6282118201232"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block"
                      >
                        <Button
                          variant="primary"
                          fullWidth
                          className="bg-gradient-to-r from-[#6b1282] via-[#7e22ce] to-[#005a36] hover:brightness-110 text-white font-black py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 text-sm"
                        >
                          Konsultasikan &amp; Ajukan Pemeriksaan Sekarang
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  </>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculatorPage;

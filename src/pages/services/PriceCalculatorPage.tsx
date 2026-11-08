import React, { useState, useEffect } from 'react';
import { Button, Card, Input, Skeleton } from '@heroui/react';
import { Calculator, Download, CheckCircle, FileText, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { api } from '@/services/api';
import type { CalculationResult } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

export const PriceCalculatorPage: React.FC = () => {
  const { language, t } = useLanguage();
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

      const isEn = language === 'en';

      setResult({
        serviceType,
        businessScale,
        totalBpjph: totalB,
        totalLph: totalL,
        savingsNominal,
        savingsPercent,
        breakdown: [
          {
            item: isEn ? 'Registration & Document Verification Fee' : 'Biaya Pendaftaran & Verifikasi Dokumen',
            bpjph: Math.round(bpjphBase * 0.3),
            lph: Math.round(lphBase * 0.3),
          },
          {
            item: isEn ? 'On-Site Audit & Inspection by LPH Halal Auditors' : 'Audit & Pemeriksaan Lapangan oleh Auditor Halal LPH',
            bpjph: Math.round(bpjphBase * 0.5),
            lph: Math.round(lphBase * 0.5),
          },
          {
            item: isEn ? 'Laboratory Testing & Scientific Halal Analysis' : 'Uji Laboratorium & Analisis Kehalalan Saintifik',
            bpjph: Math.round(bpjphBase * 0.2),
            lph: Math.round(lphBase * 0.2),
          },
          {
            item: isEn
              ? `Additional Product Variants (${productCount} items) & Ingredients (${ingredientCount} items)`
              : `Tambahan Varian Produk (${productCount} item) & Bahan (${ingredientCount} item)`,
            bpjph: prodAddon + ingrAddon,
            lph: Math.round((prodAddon + ingrAddon) * 0.8),
          },
        ],
        notes: isEn
          ? 'Simulation based on BPJPH Official Regulation and LPH UIN SGD Bandung Service Standards.'
          : 'Simulasi biaya didasarkan pada Keputusan Kepala BPJPH dan Standar Layanan LPH UIN SGD Bandung.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculate();
  }, [serviceType, businessScale, productCount, ingredientCount, language]);

  const handleDownloadPDF = async () => {
    const el = document.getElementById('calc-summary-card');
    if (!el) return;
    try {
      const canvas = await html2canvas(el, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.text(
        language === 'en'
          ? 'Halal Inspection Fee Estimate - LPH UIN SGD Bandung'
          : 'Estimasi Biaya Pemeriksaan Halal - LPH UIN SGD Bandung',
        10,
        15
      );
      pdf.addImage(imgData, 'PNG', 10, 25, imgWidth, imgHeight);
      pdf.save(
        `Estimasi_Tarif_Halal_${businessScale}_${new Date().toISOString().split('T')[0]}.pdf`
      );
    } catch {
      window.print();
    }
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat(language === 'en' ? 'en-US' : 'id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-neutral-50 pb-20">
      {/* Header Banner in Royal Purple Gradient with Yellow Accents */}
      <section className="bg-gradient-to-r from-[#1a0726] via-[#4a0d5c] to-[#1a0726] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#4B0D78] via-[#6B18A8] via-[#F5D32F] to-[#6B18A8]" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7D1] text-[#713f12] text-xs font-extrabold uppercase tracking-wider mb-4 border border-[#F5D32F] shadow-xs">
            <Calculator className="w-3.5 h-3.5 text-[#eab308]" />
            {t('calc_badge')}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-2xl">
            {t('calc_title')}
          </h1>
          <p className="mt-3 text-neutral-200 max-w-2xl mx-auto text-sm sm:text-base font-normal leading-relaxed">
            {t('calc_subtitle')}
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
                  {t('calc_param_tag')}
                </span>
                <h3 className="text-xl font-black text-[#1b183a] mt-1">
                  {t('calc_param_title')}
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  {t('calc_param_desc')}
                </p>
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-2">
                  {t('calc_scheme_label')}
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
                    {t('calc_scheme_new')}
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
                    {t('calc_scheme_renewal')}
                  </Button>
                </div>
              </div>

              {/* Business Scale */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-2">
                  {t('calc_scale_label')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'MIKRO', label: t('calc_scale_micro') },
                    { id: 'KECIL', label: t('calc_scale_small') },
                    { id: 'MENENGAH', label: t('calc_scale_medium') },
                    { id: 'BESAR', label: t('calc_scale_large') },
                  ].map((s) => (
                    <Button
                      key={s.id}
                      variant={businessScale === s.id ? 'primary' : 'outline'}
                      className={
                        businessScale === s.id
                          ? 'bg-[#6b1282] text-white font-bold text-xs py-2.5 rounded-xl shadow-xs'
                          : 'border-neutral-200 text-neutral-700 text-xs py-2.5 rounded-xl hover:bg-purple-50/50'
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
                    {t('calc_products_count')}
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
                    {t('calc_ingredients_count')}
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

              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 text-xs text-purple-950 leading-relaxed flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#6b1282] shrink-0 mt-0.5" />
                <span>
                  {t('calc_iso_note')}
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
                      {t('calc_summary_tag')}
                    </span>
                    <h3 className="text-xl font-black text-[#1b183a]">
                      {t('calc_summary_title')}
                    </h3>
                  </div>
                  <Button
                    variant="outline"
                    className="border-neutral-200 text-[#6b1282] font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 self-start sm:self-auto hover:bg-purple-50"
                    onPress={handleDownloadPDF}
                  >
                    <Download className="w-3.5 h-3.5" />
                    {t('calc_download_pdf')}
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
                          {t('calc_bpjph_max')}
                        </span>
                        <span className="text-2xl sm:text-3xl font-black text-neutral-800 block mt-1 font-mono">
                          {formatRupiah(result.totalBpjph)}
                        </span>
                        <span className="text-[11px] text-neutral-400 mt-1 block">
                          {t('calc_official_tariff')}
                        </span>
                      </div>

                      <div className="p-5 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/40 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#6B18A8] uppercase">
                            {t('calc_uin_estimate')}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#F5D32F] text-[#3B074A] shadow-xs">
                            {t('calc_save')} {result.savingsPercent}%
                          </span>
                        </div>
                        <span className="text-2xl sm:text-3xl font-black text-[#6B18A8] block mt-1 font-mono">
                          {formatRupiah(result.totalLph)}
                        </span>
                        <span className="text-[11px] text-purple-900 mt-1 block font-semibold">
                          {t('calc_saving_efficiency')} {formatRupiah(result.savingsNominal)}
                        </span>
                      </div>
                    </div>

                    {/* Breakdown Table */}
                    <div>
                      <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wide mb-3">
                        {t('calc_breakdown_title')}
                      </h4>
                      <div className="rounded-2xl border border-neutral-200 overflow-hidden text-xs">
                        <table className="w-full text-left">
                          <thead className="bg-neutral-100/80 text-neutral-700 font-bold border-b border-neutral-200">
                            <tr>
                              <th className="py-3 px-4">{t('calc_col_component')}</th>
                              <th className="py-3 px-4 text-right">{t('calc_col_bpjph')}</th>
                              <th className="py-3 px-4 text-right text-[#6b1282]">{t('calc_col_lph')}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-100">
                            {result.breakdown.map((row, idx) => (
                              <tr key={idx} className="hover:bg-purple-50/30 transition-colors">
                                <td className="py-3 px-4 font-semibold text-neutral-800">
                                  {row.item}
                                </td>
                                <td className="py-3 px-4 text-right text-neutral-500 font-mono font-medium">
                                  {formatRupiah(row.bpjph)}
                                </td>
                                <td className="py-3 px-4 text-right font-black text-[#6b1282] font-mono">
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
                      * {result.notes}{' '}
                      {language === 'en'
                        ? 'Fees exclude auditor accommodation if the facility is outside regular inspection zones.'
                        : 'Biaya belum termasuk akomodasi auditor jika lokasi pabrik di luar jangkauan reguler.'}
                    </p>

                    {/* CTA Button in LPH Gradient */}
                    <div className="pt-2">
                      <a
                        href="https://wa.me/6282126493700"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block"
                      >
                        <Button
                          variant="primary"
                          fullWidth
                          className="bg-[#6B18A8] hover:bg-[#58138a] text-white font-extrabold py-3.5 rounded-2xl shadow-xl shadow-purple-950/20 flex items-center justify-center gap-2 text-sm cursor-pointer hover:scale-[1.01] transition-transform"
                        >
                          {t('calc_cta_button')}
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

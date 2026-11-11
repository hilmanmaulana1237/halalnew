import React, { useState } from 'react';
import { Button, Card, Input, Chip, Table, Modal } from '@heroui/react';
import {
  Calculator,
  Edit3,
  RotateCcw,
  Plus,
  Save,
  CheckCircle2,
  FileSpreadsheet,
  AlertCircle,
  FlaskConical,
  Scale,
  Sparkles,
} from 'lucide-react';
import {
  getRatesMatrix,
  saveRatesMatrix,
  resetRatesMatrix,
  type RatesMatrix,
  type HalalRateConfig,
} from '@/services/ratesService';
import { formatRupiah } from '@/services/api';
import { exportToExcel } from '@/lib/excelExport';

interface RatesEditorTabProps {
  onLogAudit?: (action: string, target: string) => void;
}

export const RatesEditorTab: React.FC<RatesEditorTabProps> = ({ onLogAudit }) => {
  const [rates, setRates] = useState<RatesMatrix>(getRatesMatrix());
  const [isEditingScale, setIsEditingScale] = useState<string | null>(null);
  const [scaleForm, setScaleForm] = useState({
    bpjph: 0,
    lph: 0,
    label: '',
  });

  const [isEditingCustom, setIsEditingCustom] = useState<HalalRateConfig | null>(null);
  const [customForm, setCustomForm] = useState<HalalRateConfig>({
    id: '',
    category: 'Pemeriksaan Lapangan',
    label: '',
    description: '',
    bpjphPrice: 0,
    lphPrice: 0,
    regulation: 'KMA 784/2026',
    isActive: true,
  });

  const [showAddCustomModal, setShowAddCustomModal] = useState<boolean>(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Open Edit Base Scale Modal
  const handleOpenEditScale = (scaleKey: string) => {
    const scale = rates.baseRates[scaleKey as keyof typeof rates.baseRates];
    if (!scale) return;
    setIsEditingScale(scaleKey);
    setScaleForm({
      bpjph: scale.bpjph,
      lph: scale.lph,
      label: scale.label,
    });
  };

  // Save Base Scale
  const handleSaveScale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditingScale) return;

    const updated: RatesMatrix = {
      ...rates,
      baseRates: {
        ...rates.baseRates,
        [isEditingScale]: {
          ...rates.baseRates[isEditingScale as keyof typeof rates.baseRates],
          bpjph: Number(scaleForm.bpjph),
          lph: Number(scaleForm.lph),
          label: scaleForm.label,
        },
      },
    };

    setRates(updated);
    saveRatesMatrix(updated);
    setIsEditingScale(null);
    setSaveSuccessMsg(`Tarif skala ${isEditingScale} berhasil disimpan & disinkronkan ke kalkulator publik.`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);

    if (onLogAudit) {
      onLogAudit('Memperbarui tarif dasar KMA 784', `Skala ${isEditingScale}`);
    }
  };

  // Update Addon / Lab Values
  const handleUpdateAddon = (field: 'product' | 'ingredient' | 'qpcr' | 'gcfid', subfield: string, val: number) => {
    let updated: RatesMatrix = { ...rates };
    if (field === 'product') {
      updated.productAddonPerItem = {
        ...updated.productAddonPerItem,
        [subfield]: val,
      };
    } else if (field === 'ingredient') {
      updated.ingredientAddonPerItem = {
        ...updated.ingredientAddonPerItem,
        [subfield]: val,
      };
    } else if (field === 'qpcr') {
      updated.labTesting.qpcrDna.price = val;
    } else if (field === 'gcfid') {
      updated.labTesting.gcFidEtanol.price = val;
    }

    setRates(updated);
    saveRatesMatrix(updated);
    setSaveSuccessMsg('Parameter biaya kalkulator berhasil diperbarui.');
    setTimeout(() => setSaveSuccessMsg(null), 3000);

    if (onLogAudit) {
      onLogAudit('Memperbarui parameter addon tarif', field);
    }
  };

  // Reset to default
  const handleResetToDefault = () => {
    if (window.confirm('Reset seluruh konfigurasi tarif ke ketetapan standar resmi KMA 784?')) {
      const def = resetRatesMatrix();
      setRates(def);
      setSaveSuccessMsg('Tarif berhasil dikembalikan ke standar regulasi resmi.');
      setTimeout(() => setSaveSuccessMsg(null), 4000);
      if (onLogAudit) {
        onLogAudit('Reset tarif ke default KMA 784', 'Semua Skala');
      }
    }
  };

  // Export Rates to Excel
  const handleExportRatesExcel = () => {
    const excelRows = [
      ...Object.entries(rates.baseRates).map(([scaleKey, data]) => ({
        'Komponen Biaya': `Tarif Dasar - ${data.label}`,
        'Skala Usaha': scaleKey,
        'Tarif BPJPH (Kas Negara)': data.bpjph,
        'Tarif Pemeriksaan LPH': data.lph,
        'Total Biaya': data.bpjph + data.lph,
        'Dasar Regulasi': 'KMA No. 784 Tahun 2021',
        Status: 'Aktif',
      })),
      {
        'Komponen Biaya': 'Tambahan per Varian Produk',
        'Skala Usaha': 'Semua Skala',
        'Tarif BPJPH (Kas Negara)': rates.productAddonPerItem.bpjph,
        'Tarif Pemeriksaan LPH': rates.productAddonPerItem.lph,
        'Total Biaya': rates.productAddonPerItem.bpjph + rates.productAddonPerItem.lph,
        'Dasar Regulasi': 'Standar SLA LPH',
        Status: 'Aktif',
      },
      {
        'Komponen Biaya': 'Tambahan per Bahan Tambahan (> 10 Bahan)',
        'Skala Usaha': 'Semua Skala',
        'Tarif BPJPH (Kas Negara)': rates.ingredientAddonPerItem.bpjph,
        'Tarif Pemeriksaan LPH': rates.ingredientAddonPerItem.lph,
        'Total Biaya': rates.ingredientAddonPerItem.bpjph + rates.ingredientAddonPerItem.lph,
        'Dasar Regulasi': 'Standar SLA LPH',
        Status: 'Aktif',
      },
      {
        'Komponen Biaya': rates.labTesting.qpcrDna.name,
        'Skala Usaha': 'Semua Skala',
        'Tarif BPJPH (Kas Negara)': 0,
        'Tarif Pemeriksaan LPH': rates.labTesting.qpcrDna.price,
        'Total Biaya': rates.labTesting.qpcrDna.price,
        'Dasar Regulasi': 'ISO/IEC 17025:2017',
        Status: 'Aktif',
      },
      {
        'Komponen Biaya': rates.labTesting.gcFidEtanol.name,
        'Skala Usaha': 'Semua Skala',
        'Tarif BPJPH (Kas Negara)': 0,
        'Tarif Pemeriksaan LPH': rates.labTesting.gcFidEtanol.price,
        'Total Biaya': rates.labTesting.gcFidEtanol.price,
        'Dasar Regulasi': 'ISO/IEC 17025:2017',
        Status: 'Aktif',
      },
    ];

    exportToExcel(excelRows, 'Matriks_Tarif_Halal_KMA_784_LPH_UIN_SGD', 'Tarif KMA 784');
    if (onLogAudit) {
      onLogAudit('Export matriks tarif ke Excel', 'Format XLSX');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Quick Action Card */}
      <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#292333] flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#6B18A8]" />
              <span>Kelola &amp; Edit Matriks Tarif Sertifikasi Halal KMA 784</span>
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Setiap perubahan tarif di panel ini secara instan terhubung dan mempengaruhi perhitungan pada <strong>Kalkulator Biaya Publik</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              onPress={handleExportRatesExcel}
              className="border-emerald-300 text-emerald-800 bg-emerald-50/50 hover:bg-emerald-100 text-xs font-bold rounded-xl px-3.5 py-2 flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export ke Excel (.xlsx)</span>
            </Button>

            <Button
              variant="outline"
              onPress={handleResetToDefault}
              className="border-neutral-300 text-neutral-600 hover:bg-neutral-50 text-xs font-bold rounded-xl px-3.5 py-2 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Standar KMA</span>
            </Button>
          </div>
        </div>

        {saveSuccessMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}
      </Card>

      {/* 1. Base Rates Table with Direct Edit Buttons */}
      <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#6B18A8]" />
            <h4 className="text-sm font-bold text-neutral-800">
              Tarif Dasar Pemeriksaan Berdasarkan Skala Usaha (Reguler / Pabrik)
            </h4>
          </div>
          <Chip size="sm" className="bg-[#FAF7FD] text-[#6B18A8] border border-[#C9A5E8]/40 font-bold text-[10px]">
            Live Sync ke Kalkulator
          </Chip>
        </div>

        <Table variant="secondary" className="w-full">
          <Table.ScrollContainer className="w-full overflow-x-auto">
            <Table.Content aria-label="Tabel Tarif Dasar KMA 784">
              <Table.Header>
                <Table.Column isRowHeader>Skala Usaha</Table.Column>
                <Table.Column>Tarif BPJPH (Kas Negara)</Table.Column>
                <Table.Column>Tarif Pemeriksaan LPH</Table.Column>
                <Table.Column>Total Biaya</Table.Column>
                <Table.Column>Status Regulasi</Table.Column>
                <Table.Column className="text-right">Aksi</Table.Column>
              </Table.Header>
              <Table.Body>
                {Object.entries(rates.baseRates).map(([scaleKey, item]) => {
                  const total = item.bpjph + item.lph;
                  return (
                    <Table.Row key={scaleKey} className="border-b border-neutral-100 hover:bg-[#FAF7FD]/50">
                      <Table.Cell>
                        <div className="font-bold text-xs text-neutral-800">{scaleKey}</div>
                        <div className="text-[11px] text-neutral-500">{item.label}</div>
                      </Table.Cell>
                      <Table.Cell className="text-xs font-mono font-semibold text-neutral-700">
                        {formatRupiah(item.bpjph)}
                      </Table.Cell>
                      <Table.Cell className="text-xs font-mono font-black text-[#6B18A8]">
                        {formatRupiah(item.lph)}
                      </Table.Cell>
                      <Table.Cell className="text-xs font-mono font-black text-emerald-700">
                        {formatRupiah(total)}
                      </Table.Cell>
                      <Table.Cell>
                        <Chip size="sm" className="bg-[#FFF7D1] text-[#713f12] border border-[#F5D32F] font-bold text-[10px]">
                          KMA 784/2021
                        </Chip>
                      </Table.Cell>
                      <Table.Cell className="text-right">
                        <Button
                          variant="outline"
                          onPress={() => handleOpenEditScale(scaleKey)}
                          className="px-3 py-1 text-xs font-bold rounded-xl border-[#C9A5E8] text-[#6B18A8] hover:bg-[#FAF7FD]"
                        >
                          <Edit3 className="w-3 h-3 mr-1" />
                          Edit Tarif
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </Card>

      {/* 2. Add-ons & Laboratory Testing Cost Parameters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add-on Variants & Ingredients */}
        <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#6B18A8]" />
            <h4 className="text-sm font-bold text-neutral-800">
              Biaya Tambahan Varian Produk &amp; Bahan Kritis
            </h4>
          </div>

          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 space-y-3">
              <span className="text-xs font-bold text-neutral-700 block">
                Tambahan Biaya per Varian Produk (Mulai Produk ke-2)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">
                    BPJPH (Rp)
                  </label>
                  <Input
                    type="number"
                    value={String(rates.productAddonPerItem.bpjph)}
                    onChange={(e) =>
                      handleUpdateAddon('product', 'bpjph', Number(e.target.value))
                    }
                    className="w-full text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#6B18A8] uppercase block mb-1">
                    LPH UIN SGD (Rp)
                  </label>
                  <Input
                    type="number"
                    value={String(rates.productAddonPerItem.lph)}
                    onChange={(e) =>
                      handleUpdateAddon('product', 'lph', Number(e.target.value))
                    }
                    className="w-full text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 space-y-3">
              <span className="text-xs font-bold text-neutral-700 block">
                Tambahan Biaya per Bahan Baku Tambahan (Jika &gt; 10 Bahan)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">
                    BPJPH (Rp)
                  </label>
                  <Input
                    type="number"
                    value={String(rates.ingredientAddonPerItem.bpjph)}
                    onChange={(e) =>
                      handleUpdateAddon('ingredient', 'bpjph', Number(e.target.value))
                    }
                    className="w-full text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#6B18A8] uppercase block mb-1">
                    LPH UIN SGD (Rp)
                  </label>
                  <Input
                    type="number"
                    value={String(rates.ingredientAddonPerItem.lph)}
                    onChange={(e) =>
                      handleUpdateAddon('ingredient', 'lph', Number(e.target.value))
                    }
                    className="w-full text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Laboratory Testing Rates */}
        <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs p-6 space-y-4">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-[#6B18A8]" />
            <h4 className="text-sm font-bold text-neutral-800">
              Tarif Uji Laboratorium Terakreditasi KAN ISO 17025
            </h4>
          </div>

          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-700">
                  Uji DNA Porcine Real-Time qPCR (Per Sampel)
                </span>
                <Chip size="sm" className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px]">
                  LP-1542-IDN
                </Chip>
              </div>
              <p className="text-[11px] text-neutral-500">
                Pemeriksaan molekuler deteksi cemaran babi pada daging, gelatin, dan kapsul obat.
              </p>
              <div>
                <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">
                  Biaya Uji Laboratorium (Rp)
                </label>
                <Input
                  type="number"
                  value={String(rates.labTesting.qpcrDna.price)}
                  onChange={(e) => handleUpdateAddon('qpcr', 'price', Number(e.target.value))}
                  className="w-full text-xs font-mono font-bold"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-700">
                  Uji Etanol GC-FID Gas Chromatography (Per Sampel)
                </span>
                <Chip size="sm" className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px]">
                  LP-1542-IDN
                </Chip>
              </div>
              <p className="text-[11px] text-neutral-500">
                Penetapan kadar alkohol &amp; etanol pada produk minuman fermentasi dan perisa konsentrat.
              </p>
              <div>
                <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">
                  Biaya Uji Laboratorium (Rp)
                </label>
                <Input
                  type="number"
                  value={String(rates.labTesting.gcFidEtanol.price)}
                  onChange={(e) => handleUpdateAddon('gcfid', 'price', Number(e.target.value))}
                  className="w-full text-xs font-mono font-bold"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* MODAL: EDIT BASE SCALE RATE */}
      <Modal.Backdrop isOpen={!!isEditingScale} onOpenChange={(open) => !open && setIsEditingScale(null)}>
        <Modal.Container placement="center">
          <Modal.Dialog className="w-[95vw] sm:max-w-lg max-h-[90vh] flex flex-col p-0 overflow-hidden rounded-3xl bg-white border border-[#C9A5E8]/40 shadow-2xl">
            <Modal.CloseTrigger />
            {isEditingScale && (
              <form onSubmit={handleSaveScale} className="flex flex-col max-h-[90vh]">
                <Modal.Header className="p-4 sm:p-6 bg-gradient-to-r from-[#FAF7FD] to-white border-b border-[#C9A5E8]/30 shrink-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Chip size="sm" className="bg-[#FAF7FD] text-[#6B18A8] font-bold text-[10px]">
                      {isEditingScale}
                    </Chip>
                  </div>
                  <Modal.Heading className="text-base sm:text-lg font-black text-[#292333]">
                    Edit Komponen Tarif: {scaleForm.label}
                  </Modal.Heading>
                </Modal.Header>
                <Modal.Body className="p-4 sm:p-6 space-y-4 overflow-y-auto">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      Deskripsi Skala Usaha
                    </label>
                    <Input
                      value={scaleForm.label}
                      onChange={(e) => setScaleForm({ ...scaleForm, label: e.target.value })}
                      required
                      className="w-full text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      Tarif BPJPH (Kas Negara) - Rp
                    </label>
                    <Input
                      type="number"
                      value={String(scaleForm.bpjph)}
                      onChange={(e) => setScaleForm({ ...scaleForm, bpjph: Number(e.target.value) })}
                      required
                      className="w-full text-xs font-mono"
                    />
                    <span className="text-[11px] text-neutral-400 mt-1 block">
                      Disetor ke Kas Negara melalui kode billing SIHALAL.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      Tarif Pemeriksaan LPH UIN SGD - Rp
                    </label>
                    <Input
                      type="number"
                      value={String(scaleForm.lph)}
                      onChange={(e) => setScaleForm({ ...scaleForm, lph: Number(e.target.value) })}
                      required
                      className="w-full text-xs font-mono font-bold text-[#6B18A8]"
                    />
                    <span className="text-[11px] text-neutral-400 mt-1 block">
                      Biaya audit lapangan dan verifikasi dokumen halal.
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-neutral-700">Total Tarif Hasil Penyesuaian:</span>
                    <span className="font-mono font-black text-sm text-[#6B18A8]">
                      {formatRupiah(scaleForm.bpjph + scaleForm.lph)}
                    </span>
                  </div>
                </Modal.Body>
                <Modal.Footer className="p-4 sm:p-6 bg-[#FAF7FD] border-t border-[#C9A5E8]/30 flex justify-end gap-2">
                  <Button variant="secondary" slot="close" className="text-xs font-bold rounded-xl px-4 py-2">
                    Batal
                  </Button>
                  <Button type="submit" variant="primary" className="bg-[#6B18A8] text-white text-xs font-bold rounded-xl px-5 py-2">
                    Simpan Perubahan Tarif
                  </Button>
                </Modal.Footer>
              </form>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </div>
  );
};

export default RatesEditorTab;


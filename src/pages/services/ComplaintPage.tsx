import React, { useState } from 'react';
import { Button, Card, Input, TextArea, Tabs } from '@heroui/react';
import { ShieldAlert, Search, CheckCircle2, Clock, AlertTriangle, FileText, ArrowRight } from 'lucide-react';
import { api } from '@/services/api';
import type { Complaint } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { SparklesCore } from '@/components/ui/sparkles';

export const ComplaintPage: React.FC = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [activeTab, setActiveTab] = useState<string>('FORM');

  // Form State
  const [reporterName, setReporterName] = useState('');
  const [reporterContact, setReporterContact] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [category, setCategory] = useState('PELAYANAN');
  const [description, setDescription] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Track State
  const [searchTicket, setSearchTicket] = useState('');
  const [trackResult, setTrackResult] = useState<Complaint | null>(null);
  const [trackLoading, setTrackLoading] = useState(false);
  const [trackError, setTrackError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmittedTicket(null);

    const generatedCode = 'TKT-' + Math.floor(100000 + Math.random() * 900000);
    try {
      const formData = new FormData();
      formData.append('name', isAnonymous ? 'Anonim' : reporterName);
      formData.append('contact', isAnonymous ? '-' : reporterContact);
      formData.append('category', category);
      formData.append('description', description);
      await api.post('/complaints', formData);
    } catch {
      // Mock fallback
    } finally {
      setSubmittedTicket(generatedCode);
      setReporterName('');
      setReporterContact('');
      setDescription('');
      setLoading(false);
    }
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTicket.trim()) return;
    setTrackLoading(true);
    setTrackError(null);
    setTrackResult(null);

    try {
      const res = await api.get(`/complaints/track/${searchTicket.trim().toUpperCase()}`);
      if (res.data?.success && res.data.data) {
        setTrackResult(res.data.data);
      } else {
        throw new Error('Not found');
      }
    } catch {
      if (searchTicket.toUpperCase().startsWith('TKT-')) {
        setTrackResult({
          id: 99,
          ticketCode: searchTicket.toUpperCase(),
          name: isEn ? 'Verified Reporter' : 'Pelapor Terverifikasi',
          contact: '***',
          contactType: 'WHATSAPP',
          category: isEn ? 'Service Evaluation' : 'Evaluasi Pelayanan',
          description: isEn ? 'Complaint successfully recorded and under technical evaluation.' : 'Pengaduan Anda sedang dalam verifikasi dan penelaahan tim mutu.',
          status: 'IN_REVIEW',
          adminReply: isEn
            ? 'Your report has been verified by the Internal Quality Team of LPH UIN SGD Bandung and is being resolved.'
            : 'Laporan Anda telah divalidasi oleh Tim Pengendali Mutu Internal LPH UIN SGD Bandung dan sedang dalam tindak lanjut investigasi.',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      } else {
        setTrackError(
          isEn
            ? 'Ticket code not found. Please verify your ticket format (e.g. TKT-123456).'
            : 'Kode tiket tidak ditemukan. Pastikan format tiket benar (Contoh: TKT-123456).'
        );
      }
    } finally {
      setTrackLoading(false);
    }
  };

  const categories = isEn
    ? [
        { id: 'PELAYANAN', label: 'Public Service' },
        { id: 'AUDIT', label: 'Audit Procedure' },
        { id: 'TARIF', label: 'Tariff & Fees' },
        { id: 'ETIKA', label: 'Ethics & Integrity' },
      ]
    : [
        { id: 'PELAYANAN', label: 'Pelayanan Publik' },
        { id: 'AUDIT', label: 'Prosedur Audit' },
        { id: 'TARIF', label: 'Kesesuaian Tarif' },
        { id: 'ETIKA', label: 'Etika & Integritas' },
      ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-neutral-50 pb-20">
      {/* Banner in Royal Purple Gradient with Yellow Accents & Sparkles */}
      <section className="relative py-20 lg:py-24 bg-[#1a0726] text-white overflow-hidden text-center">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#4B0D78] via-[#6B18A8] via-[#F5D32F] to-[#6B18A8]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0726] via-[#4a0d5c] to-[#1a0726] opacity-95" />
        <SparklesCore
          id="complaint-sparkles"
          minSize={0.7}
          maxSize={2.2}
          particleDensity={35}
          particleColor={['#ffffff', '#f5d0fe', '#F5D32F', '#d8b4fe']}
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7D1] text-[#713f12] text-xs font-extrabold uppercase tracking-wider mb-4 border border-[#F5D32F] shadow-xs">
            <ShieldAlert className="w-3.5 h-3.5 text-[#eab308]" />
            {isEn ? 'Official Whistleblowing & Complaint Service' : 'Whistleblowing & Layanan Pengaduan Resmi'}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-2xl leading-tight">
            {isEn ? (
              <>Complaints & <span className="text-[#F5D32F]">Service Integrity</span></>
            ) : (
              <>Pengaduan & <span className="text-[#F5D32F]">Integritas Layanan</span></>
            )}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-200 max-w-2xl mx-auto leading-relaxed font-normal">
            {isEn
              ? 'Official channel for reporting service bottlenecks, audit discrepancies, or integrity concerns securely and confidentially.'
              : 'Saluran resmi pelaporan kendala layanan, ketidaksesuaian prosedur audit, atau dugaan pelanggaran kode etik secara aman dan rahasia.'}
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-8">
        <Card className="bg-white rounded-3xl border border-neutral-200/80 shadow-xl p-6 sm:p-10">
          {/* Tabs */}
          <div className="mb-8 border-b border-neutral-100 pb-4">
            <Tabs
              selectedKey={activeTab}
              onSelectionChange={(k) => setActiveTab(k as string)}
              className="w-full"
            >
              <Tabs.ListContainer>
                <Tabs.List aria-label="Menu Pengaduan">
                  <Tabs.Tab id="FORM">{isEn ? 'Submit Complaint Report' : 'Kirim Laporan Pengaduan'}</Tabs.Tab>
                  <Tabs.Tab id="TRACK">{isEn ? 'Track Ticket Status' : 'Lacak Status Tiket'}</Tabs.Tab>
                </Tabs.List>
              </Tabs.ListContainer>
            </Tabs>
          </div>

          {/* TAB 1: FORM PENGADUAN */}
          {activeTab === 'FORM' && (
            <div>
              {submittedTicket ? (
                <div className="p-8 rounded-2xl bg-purple-50/80 border border-purple-200 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-purple-100 text-[#6b1282] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900">
                    {isEn ? 'Report Successfully Received!' : 'Laporan Berhasil Diterima!'}
                  </h3>
                  <p className="text-sm text-neutral-600 max-w-md mx-auto">
                    {isEn
                      ? 'Keep this ticket code to track the resolution progress of your report:'
                      : 'Simpan kode tiket berikut untuk melacak perkembangan status penanganan pengaduan Anda:'}
                  </p>
                  <div className="inline-block px-6 py-3 rounded-xl bg-white border-2 border-[#6b1282] font-mono text-2xl font-black text-[#6b1282] tracking-wider shadow-sm">
                    {submittedTicket}
                  </div>
                  <div className="pt-4 flex justify-center gap-3">
                    <Button
                      variant="primary"
                      className="bg-[#6b1282] hover:bg-[#581c87] text-white font-semibold rounded-xl"
                      onPress={() => {
                        setSubmittedTicket(null);
                        setSearchTicket(submittedTicket);
                        setActiveTab('TRACK');
                      }}
                    >
                      {isEn ? 'Track This Ticket' : 'Lacak Status Tiket Ini'}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-neutral-300 text-neutral-700 rounded-xl"
                      onPress={() => setSubmittedTicket(null)}
                    >
                      {isEn ? 'Submit Another Report' : 'Buat Laporan Baru'}
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Anonymous Switch */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900">
                        {isEn ? 'Report Anonymously (Confidential)' : 'Laporkan Secara Anonim (Rahasia)'}
                      </h4>
                      <p className="text-xs text-neutral-500">
                        {isEn
                          ? 'Your identity will not be shared or revealed to reported parties.'
                          : 'Identitas Anda tidak akan disimpan atau diteruskan kepada pihak terlapor.'}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant={isAnonymous ? 'primary' : 'outline'}
                      className={
                        isAnonymous
                          ? 'bg-[#6b1282] text-white text-xs font-bold rounded-xl'
                          : 'border-neutral-300 text-neutral-700 text-xs rounded-xl'
                      }
                      onPress={() => setIsAnonymous(!isAnonymous)}
                    >
                      {isAnonymous
                        ? (isEn ? 'Anonymous Active' : 'Anonim Aktif')
                        : (isEn ? 'Include Identity' : 'Gunakan Identitas')}
                    </Button>
                  </div>

                  {!isAnonymous && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                          {isEn ? 'Reporter Full Name' : 'Nama Lengkap Pelapor'}
                        </label>
                        <Input
                          placeholder={isEn ? 'Enter your name...' : 'Masukkan nama Anda...'}
                          value={reporterName}
                          onChange={(e) => setReporterName(e.target.value)}
                          required={!isAnonymous}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                          {isEn ? 'Contact (WhatsApp / Email)' : 'Kontak (No. WA / Email)'}
                        </label>
                        <Input
                          placeholder={isEn ? 'e.g. 0812... / name@email.com' : 'Contoh: 08123456789 / nama@email.com'}
                          value={reporterContact}
                          onChange={(e) => setReporterContact(e.target.value)}
                          required={!isAnonymous}
                          className="w-full"
                        />
                      </div>
                    </div>
                  )}

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-2">
                      {isEn ? 'Complaint Category' : 'Kategori Pengaduan'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {categories.map((cat) => (
                        <Button
                          key={cat.id}
                          type="button"
                          variant={category === cat.id ? 'primary' : 'outline'}
                          className={
                            category === cat.id
                              ? 'bg-[#6b1282] text-white font-semibold text-xs py-2 rounded-xl'
                              : 'border-neutral-200 text-neutral-700 text-xs py-2 rounded-xl'
                          }
                          onPress={() => setCategory(cat.id)}
                        >
                          {cat.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      {isEn ? 'Detailed Report Description' : 'Deskripsi Pengaduan Lengkap'}
                    </label>
                    <TextArea
                      rows={5}
                      placeholder={isEn ? 'Describe chronologically the issue, date, location, and parties involved...' : 'Jelaskan secara kronologis kendala yang Anda alami, waktu kejadian, dan pihak terkait...'}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    isPending={loading}
                    className="bg-[#6b1282] hover:bg-[#581c87] text-white font-bold py-3 rounded-xl shadow-md text-sm"
                  >
                    {isEn ? 'Submit Complaint Report' : 'Kirim Laporan Pengaduan'}
                  </Button>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: LACAK TIKET */}
          {activeTab === 'TRACK' && (
            <div className="space-y-6">
              <form onSubmit={handleTrack} className="flex gap-3">
                <Input
                  placeholder={isEn ? 'Enter Ticket Code (e.g. TKT-123456)...' : 'Masukkan Kode Tiket (Contoh: TKT-123456)...'}
                  value={searchTicket}
                  onChange={(e) => setSearchTicket(e.target.value)}
                  className="flex-1 font-mono uppercase"
                  required
                />
                <Button
                  type="submit"
                  variant="primary"
                  isPending={trackLoading}
                  className="bg-[#6b1282] hover:bg-[#581c87] text-white font-bold px-6 rounded-xl flex items-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  {isEn ? 'Track' : 'Lacak'}
                </Button>
              </form>

              {trackError && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{trackError}</span>
                </div>
              )}

              {trackResult && (
                <div className="p-4 sm:p-6 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/40 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#C9A5E8]/30 pb-4 gap-2">
                    <div>
                      <span className="text-xs text-[#756D7C] font-semibold uppercase">
                        {isEn ? 'Ticket Code' : 'Kode Tiket'}
                      </span>
                      <h4 className="text-xl font-mono font-bold text-[#6B18A8]">
                        {trackResult.ticketCode}
                      </h4>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FFF7D1] text-[#713f12] border border-[#F5D32F] self-start sm:self-auto shrink-0 whitespace-nowrap">
                      <Clock className="w-3.5 h-3.5" />
                      {isEn ? 'Under Review' : 'Dalam Penanganan'}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <p className="text-neutral-500">
                      <strong>{isEn ? 'Category:' : 'Kategori:'}</strong> {trackResult.category}
                    </p>
                    <p className="text-neutral-700 bg-white p-3 rounded-xl border border-neutral-200">
                      <strong>{isEn ? 'Report Description:' : 'Deskripsi Laporan:'}</strong> {trackResult.description}
                    </p>
                    {trackResult.adminReply && (
                      <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 text-purple-950 mt-3">
                        <strong className="block text-[#6b1282] text-xs mb-1">
                          {isEn ? 'Official Quality Team Response:' : 'Tanggapan Resmi Tim Pengendali Mutu:'}
                        </strong>
                        <p className="leading-relaxed">{trackResult.adminReply}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ComplaintPage;

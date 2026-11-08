import React, { useState, useEffect } from 'react';
import { Button, Card, Input, Accordion } from '@heroui/react';
import { HelpCircle, Search, Sparkles, MessageCircle, ArrowRight, ChevronDown } from 'lucide-react';
import { api } from '@/services/api';
import type { KnowledgeBaseItem } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { SparklesCore } from '@/components/ui/sparkles';

const INITIAL_FAQS_ID: KnowledgeBaseItem[] = [
  {
    id: 1,
    question: 'Bagaimana tahapan pemeriksaan sertifikasi halal jalur reguler di LPH UIN SGD Bandung?',
    answer:
      'Pemeriksaan halal jalur reguler di LPH UIN SGD mencakup 5 tahapan utama: (1) Pendaftaran permohonan di SIHALAL BPJPH dan memilih LPH UIN Sunan Gunung Djati (Kode: LPH-018-ID), (2) Verifikasi kelengkapan berkas dan dokumen Sistem Jaminan Produk Halal (SJPH), (3) Penjadwalan dan pelaksanaan audit lapangan fasilitas produksi oleh Tim Auditor Halal terlisensi, (4) Pengujian laboratorium terakreditasi ISO 17025 apabila terdapat bahan kritis yang membutuhkan uji qPCR DNA/alkohol, dan (5) Sidang Fatwa Halal MUI hingga penerbitan Sertifikat Halal resmi oleh BPJPH.',
    tags: 'PROSEDUR',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    question: 'Berapa lama estimasi waktu pemeriksaan halal di LPH UIN SGD Bandung?',
    answer:
      'Waktu pemeriksaan lapangan dan audit laboratorium di LPH UIN SGD diselesaikan dalam waktu 10 hingga 15 hari kerja terhitung sejak dokumen permohonan diverifikasi lengkap di sistem SIHALAL BPJPH.',
    tags: 'PROSEDUR',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    question: 'Apa saja dokumen persyaratan wajib yang harus disiapkan sebelum mengajukan audit halal?',
    answer:
      'Dokumen utama mencakup: 1. NIB (Nomor Induk Berusaha), 2. Manual Sistem Jaminan Produk Halal (SJPH), 3. Daftar nama produk dan bahan baku beserta sertifikat halal asal bahannya, 4. Matriks produk dan alur proses produksi higienis, 5. Surat keputusan penetapan Penyelia Halal bersertifikat.',
    tags: 'SYARAT',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    question: 'Bagaimana penentuan tarif pemeriksaan halal reguler di LPH UIN SGD?',
    answer:
      'Tarif pemeriksaan mengacu pada standar Keputusan Kepala BPJPH Kemenag RI dengan komponen dasar skala usaha (Mikro, Kecil, Menengah, Besar), jumlah varian produk, dan kebutuhan uji saintifik laboratorium. Anda dapat memanfaatkan fitur Kalkulator Tarif di website kami untuk estimasi transparan.',
    tags: 'TARIF',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    question: 'Apakah laboratorium UIN SGD melayani pengujian DNA babi dan alkohol untuk umum?',
    answer:
      'Ya, Laboratorium Pengujian Halal Terpadu UIN SGD di Kampus 2 melayani pengujian deteksi cemaran DNA Porcine (babi) menggunakan Real-Time qPCR, pengujian kadar etanol (alkohol) dengan GC-MS, dan autentikasi kehalalan gelatin baik bagi mitra audit LPH maupun permohonan pengujian mandiri dari industri.',
    tags: 'LABORATORIUM',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const INITIAL_FAQS_EN: KnowledgeBaseItem[] = [
  {
    id: 1,
    question: 'What are the key stages of regular halal inspection at LPH UIN SGD Bandung?',
    answer:
      'Regular halal inspection at LPH UIN SGD encompasses 5 essential stages: (1) Submission on BPJPH SIHALAL selecting LPH UIN Sunan Gunung Djati (Code: LPH-018-ID), (2) Verification of Halal Assurance System (SJPH) and ingredient documents, (3) On-site production facility audit by licensed lead auditors, (4) Accredited ISO 17025 laboratory analysis when critical raw materials require qPCR/GC-FID testing, and (5) MUI Fatwa Council decree leading to official BPJPH Halal Certificate issuance.',
    tags: 'PROCEDURE',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    question: 'What is the turnaround time for halal inspection at LPH UIN SGD Bandung?',
    answer:
      'Field inspections and laboratory evaluations at LPH UIN SGD are completed within 10 to 15 working days once the application documents have been verified on the official BPJPH SIHALAL system.',
    tags: 'PROCEDURE',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    question: 'What mandatory documents are required prior to applying for a halal audit?',
    answer:
      'Key documents include: 1. Business Identification Number (NIB), 2. Halal Product Assurance Manual (SJPH), 3. Ingredient list and supporting halal certificates, 4. Product matrix and production flow diagram, 5. Decree appointing certified internal Halal Supervisors.',
    tags: 'REQUIREMENTS',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    question: 'How are regular halal inspection fees determined at LPH UIN SGD?',
    answer:
      'Fees follow the official BPJPH Ministry of Religious Affairs regulation based on company scale (Micro, Small, Medium, Large), product variety, and laboratory testing scope. You can use our Halal Fee Calculator for transparent estimates.',
    tags: 'FEES',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    question: 'Does the UIN SGD laboratory offer porcine DNA and alcohol testing for public enterprises?',
    answer:
      'Yes, our Integrated Halal Testing Laboratory at Campus 2 provides Porcine DNA qPCR detection, GC-MS ethanol analysis, and gelatin profiling for both LPH audit clients and independent corporate testing requests.',
    tags: 'LABORATORY',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const QnaPage: React.FC = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [faqs, setFaqs] = useState<KnowledgeBaseItem[]>(isEn ? INITIAL_FAQS_EN : INITIAL_FAQS_ID);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // AI QnA state
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    setFaqs(isEn ? INITIAL_FAQS_EN : INITIAL_FAQS_ID);
    setActiveCategory('ALL');
  }, [language, isEn]);

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    setAiLoading(true);
    setAiAnswer(null);

    try {
      const res = await api.post('/chat/message', {
        message: aiQuestion,
        history: [],
      });
      if (res.data?.success) {
        setAiAnswer(res.data.data.answer);
      } else {
        throw new Error('Fallback');
      }
    } catch {
      setAiAnswer(
        isEn
          ? 'Under BPJPH regulations and LPH UIN SGD Bandung guidelines, every business must ensure raw materials possess valid halal certificates or belong to the positive list. Please contact our auditor team via WhatsApp for personalized technical support.'
          : 'Berdasarkan regulasi jaminan produk halal BPJPH dan pedoman LPH UIN SGD Bandung, setiap pelaku usaha wajib memastikan bahan baku memiliki sertifikat halal yang valid atau masuk dalam daftar positive list. Silakan hubungi tim auditor kami via WhatsApp untuk konsultasi teknis lebih detail.'
      );
    } finally {
      setAiLoading(false);
    }
  };

  const categories = isEn
    ? [
        { id: 'ALL', label: 'All' },
        { id: 'PROCEDURE', label: 'Procedure' },
        { id: 'REQUIREMENTS', label: 'Requirements' },
        { id: 'FEES', label: 'Tariff & Fees' },
        { id: 'LABORATORY', label: 'Laboratory' },
      ]
    : [
        { id: 'ALL', label: 'Semua' },
        { id: 'PROSEDUR', label: 'Prosedur' },
        { id: 'SYARAT', label: 'Syarat' },
        { id: 'TARIF', label: 'Tarif' },
        { id: 'LABORATORIUM', label: 'Laboratorium' },
      ];

  const filteredFaqs = faqs.filter((item) => {
    const matchCat =
      activeCategory === 'ALL' ||
      item.tags?.toUpperCase().includes(activeCategory);
    const matchQuery =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-neutral-50 pb-20">
      {/* Banner in Royal Purple Gradient with Yellow Accents & Sparkles */}
      <section className="relative py-20 lg:py-24 bg-[#1a0726] text-white overflow-hidden text-center">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#4B0D78] via-[#6B18A8] via-[#F5D32F] to-[#6B18A8]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0726] via-[#4a0d5c] to-[#1a0726] opacity-95" />
        <SparklesCore
          id="qna-sparkles"
          minSize={0.7}
          maxSize={2.2}
          particleDensity={35}
          particleColor={['#ffffff', '#f5d0fe', '#F5D32F', '#d8b4fe']}
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7D1] text-[#713f12] text-xs font-extrabold uppercase tracking-wider mb-4 border border-[#F5D32F] shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#eab308]" />
            {isEn ? 'Help Center & Quick Consultation' : 'Pusat Bantuan & Konsultasi Cepat'}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-2xl leading-tight">
            {isEn ? (
              <>FAQ & <span className="text-[#F5D32F]">Halal Q&A</span> Center</>
            ) : (
              <>Pusat FAQ & <span className="text-[#F5D32F]">Halal QnA</span></>
            )}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-200 max-w-2xl mx-auto leading-relaxed font-normal">
            {isEn
              ? 'Find comprehensive answers regarding regular halal inspection, laboratory testing, tariff estimation, and official BPJPH regulations.'
              : 'Temukan jawaban komprehensif seputar proses sertifikasi halal reguler LPH, uji laboratorium hayati, estimasi tarif, dan regulasi resmi BPJPH.'}
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-8 space-y-8">
        {/* Interactive AI Ask Card */}
        <Card className="bg-white rounded-3xl border border-neutral-200/80 shadow-xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 text-[#1a0726]">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold">
              {isEn ? 'Ask Halal Center AI Assistant' : 'Tanya Asisten AI Halal Center'}
            </h3>
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed">
            {isEn
              ? 'Ask specific questions about raw materials, SIHALAL documents, or audit procedures.'
              : 'Ajukan pertanyaan spesifik tentang bahan, dokumen SIHALAL, atau alur sertifikasi halal.'}
          </p>
          <form onSubmit={handleAskAI} className="flex gap-2">
            <Input
              placeholder={
                isEn
                  ? 'e.g. Does emulsifier E471 require a halal certificate?...'
                  : 'Contoh: Apakah emulsifier E471 butuh sertifikat halal?...'
              }
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              className="flex-1"
              required
            />
            <Button
              type="submit"
              variant="primary"
              isPending={aiLoading}
              className="bg-[#6b1282] hover:bg-[#581c87] text-white font-bold px-6 rounded-xl text-xs sm:text-sm"
            >
              {isEn ? 'Ask AI' : 'Tanya AI'}
            </Button>
          </form>

          {aiAnswer && (
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs sm:text-sm text-purple-950 space-y-2 mt-4 animate-in fade-in duration-300">
              <span className="font-bold text-[#6b1282] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                {isEn ? 'Halal Assistant Answer:' : 'Jawaban Asisten Halal:'}
              </span>
              <p className="leading-relaxed">{aiAnswer}</p>
            </div>
          )}
        </Card>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Category Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                size="sm"
                variant={activeCategory === cat.id ? 'primary' : 'outline'}
                className={
                  activeCategory === cat.id
                    ? 'bg-[#6b1282] text-white font-bold text-xs py-1 px-3 rounded-lg'
                    : 'border-neutral-200 text-neutral-700 text-xs py-1 px-3 rounded-lg hover:bg-white'
                }
                onPress={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full sm:w-64">
            <Input
              placeholder={isEn ? 'Search keywords...' : 'Cari kata kunci...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Accordion FAQ List using HeroUI Accordion */}
        <Card className="bg-white rounded-3xl border border-neutral-200/80 shadow-md p-6 sm:p-8">
          <Accordion className="w-full divide-y divide-neutral-100">
            {filteredFaqs.map((faq) => (
              <Accordion.Item key={faq.id} className="py-3">
                <Accordion.Heading>
                  <Accordion.Trigger className="text-left font-bold text-neutral-900 text-sm sm:text-base hover:text-[#6b1282] transition-colors py-2 flex items-center justify-between w-full">
                    <span>{faq.question}</span>
                    <Accordion.Indicator>
                      <ChevronDown className="w-4 h-4 text-neutral-400" />
                    </Accordion.Indicator>
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                  <Accordion.Body className="pt-2 pb-4 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {faq.answer}
                  </Accordion.Body>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card>
      </div>
    </div>
  );
};

export default QnaPage;

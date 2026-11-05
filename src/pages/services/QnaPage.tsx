import React, { useState, useEffect } from 'react';
import { Button, Card, Input, Accordion } from '@heroui/react';
import { HelpCircle, Search, Sparkles, MessageCircle, ArrowRight, ChevronDown } from 'lucide-react';
import { api } from '@/services/api';
import type { KnowledgeBaseItem } from '@/types';

const INITIAL_FAQS: KnowledgeBaseItem[] = [
  {
    id: 1,
    question: 'Apa perbedaan skema sertifikasi Halal Self Declare dan Jalur Reguler?',
    answer:
      'Self Declare adalah sertifikasi halal gratis (program SEHATI BPJPH) khusus untuk Usaha Mikro dan Kecil (UMK) dengan produk berisiko rendah yang proses produksinya dipastikan telah memenuhi standar kehalalan dan didampingi oleh LP3H. Sedangkan Jalur Reguler ditujukan bagi usaha kecil, menengah, dan besar atau produk yang menggunakan bahan berisiko dan harus melalui audit fisik serta uji laboratorium oleh Lembaga Pemeriksa Halal (LPH).',
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

export const QnaPage: React.FC = () => {
  const [faqs, setFaqs] = useState<KnowledgeBaseItem[]>(INITIAL_FAQS);
  const [activeCategory, setActiveCategory] = useState<string>('SEMUA');
  const [searchQuery, setSearchQuery] = useState('');

  // AI QnA state
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await api.get('/chat/admin/kb');
        if (res.data?.success && res.data.data.length > 0) {
          setFaqs(res.data.data.filter((f: KnowledgeBaseItem) => f.isActive));
        }
      } catch {
        // Fallback to initial
      }
    };
    fetchFaqs();
  }, []);

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
        'Berdasarkan regulasi jaminan produk halal BPJPH dan pedoman LPH UIN SGD Bandung, setiap pelaku usaha wajib memastikan bahan baku memiliki sertifikat halal yang valid atau masuk dalam daftar positive list. Silakan hubungi tim auditor kami via WhatsApp untuk konsultasi teknis lebih detail.'
      );
    } finally {
      setAiLoading(false);
    }
  };

  const filteredFaqs = faqs.filter((item) => {
    const matchCat =
      activeCategory === 'SEMUA' ||
      item.tags?.toUpperCase().includes(activeCategory);
    const matchQuery =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-neutral-50 pb-20">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#1a0726] via-[#4a0d5c] to-[#1a0726] text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-purple-300" />
            Pusat Bantuan &amp; Konsultasi Cepat
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            FAQ &amp; Halal QnA Center
          </h1>
          <p className="mt-3 text-neutral-200 max-w-2xl mx-auto text-sm sm:text-base font-normal">
            Temukan jawaban komprehensif seputar proses sertifikasi halal reguler, Self Declare, uji laboratorium, dan regulasi resmi BPJPH.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-8 space-y-8">
        {/* Interactive AI Ask Card */}
        <Card className="bg-white rounded-3xl border border-neutral-200/80 shadow-xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 text-[#1a0726]">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold">Tanya Asisten AI Halal Center</h3>
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Ajukan pertanyaan spesifik tentang bahan, dokumen SIHALAL, atau alur sertifikasi halal.
          </p>
          <form onSubmit={handleAskAI} className="flex gap-2">
            <Input
              placeholder="Contoh: Apakah emulsifier E471 butuh sertifikat halal?..."
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
              Tanya AI
            </Button>
          </form>

          {aiAnswer && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 space-y-2 mt-4 animate-in fade-in duration-300">
              <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Jawaban Asisten Halal:
              </span>
              <p className="leading-relaxed">{aiAnswer}</p>
            </div>
          )}
        </Card>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Category Chips */}
          <div className="flex flex-wrap gap-2">
            {['SEMUA', 'PROSEDUR', 'SYARAT', 'TARIF', 'LABORATORIUM'].map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={activeCategory === cat ? 'primary' : 'outline'}
                className={
                  activeCategory === cat
                    ? 'bg-[#005a36] text-white font-bold text-xs py-1 px-3 rounded-lg'
                    : 'border-neutral-200 text-neutral-700 text-xs py-1 px-3 rounded-lg hover:bg-white'
                }
                onPress={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full sm:w-64">
            <Input
              placeholder="Cari kata kunci..."
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
                  <Accordion.Trigger className="text-left font-bold text-neutral-900 text-sm sm:text-base hover:text-[#005a36] transition-colors py-2 flex items-center justify-between w-full">
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

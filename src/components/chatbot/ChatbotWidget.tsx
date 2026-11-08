import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Input } from '@heroui/react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  RotateCcw,
  ArrowUpRight,
  MessageCircle,
  CheckCircle2,
  HelpCircle,
  Clock,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { api } from '@/services/api';

interface Message {
  id: string;
  sender: 'BOT' | 'USER';
  text: string;
  time: string;
  isFallback?: boolean;
  waUrl?: string;
  waText?: string;
  suggestedAction?: {
    label: string;
    href?: string;
    to?: string;
  };
}

interface SmartAnswer {
  keywords: string[];
  answerId: string;
  answerEn: string;
  isFallback?: boolean;
  suggestedAction?: {
    labelId: string;
    labelEn: string;
    href?: string;
    to?: string;
  };
}

const KNOWLEDGE_BASE: SmartAnswer[] = [
  {
    keywords: ['biaya', 'tarif', 'harga', 'bayar', 'kalkulator', 'cost', 'fee', 'price', 'rate'],
    answerId: `💰 **Rincian Tarif & Biaya Sertifikasi Halal LPH UIN SGD:**\n\nBiaya sertifikasi halal jalur reguler mengacu pada Keputusan Menteri Agama (KMA) No. 784/2021 & Keputusan Kepala BPJPH. Biaya tergantung pada:\n• Skala usaha (Mikro, Kecil, Menengah, Besar)\n• Kompleksitas proses dan fasilitas produksi\n• Kebutuhan uji laboratorium saintifik terakreditasi ISO 17025\n\nAnda dapat mensimulasikan estimasi biaya secara akurat di fitur Kalkulator Tarif kami.`,
    answerEn: `💰 **Halal Certification Fees & Rates (LPH UIN SGD):**\n\nRegular halal audit fees are governed by Ministry of Religious Affairs (KMA) No. 784/2021 and BPJPH regulations. Costs depend on:\n• Company scale (Micro, Small, Medium, Large)\n• Facility and production process complexity\n• ISO/IEC 17025 accredited laboratory testing needs\n\nYou can simulate your estimated cost using our Halal Fee Calculator.`,
    suggestedAction: {
      labelId: 'Buka Kalkulator Tarif Halal',
      labelEn: 'Open Halal Fee Calculator',
      to: '/layanan/kalkulator'
    }
  },
  {
    keywords: ['syarat', 'reguler', 'dokumen', 'audit', 'pemeriksaan', 'regular', 'requirements', 'persyaratan'],
    answerId: `📋 **Persyaratan Audit Sertifikasi Halal Reguler LPH UIN SGD:**\n\n• Memiliki Nomor Induk Berusaha (NIB) berbasis risiko.\n• Manual Sistem Jaminan Produk Halal (SJPH).\n• Daftar produk dan bahan baku beserta sertifikat halal asal bahannya.\n• Matriks produk dan alur proses produksi yang higienis.\n• Surat Keputusan penetapan Penyelia Halal bersertifikat kompetensi.\n• Siap menjalani audit lapangan fasilitas produksi oleh Auditor LPH UIN SGD.`,
    answerEn: `📋 **Regular Halal Audit Requirements (LPH UIN SGD):**\n\n• Valid Risk-Based Business Identification Number (NIB).\n• Halal Assurance System (SJPH) Manual.\n• List of ingredients and raw materials with supporting halal certificates.\n• Product matrix and hygienic production flow diagrams.\n• Appointment decree of certified internal Halal Supervisor.\n• Preparedness for on-site facility audit by LPH UIN SGD Lead Auditors.`,
    suggestedAction: {
      labelId: 'Konsultasi Syarat via WhatsApp',
      labelEn: 'Consult Requirements via WhatsApp',
      href: 'https://wa.me/6282126493700?text=Halo%20Admin%2C%20saya%20ingin%20konsultasi%20syarat%20Audit%20Reguler%20LPH'
    }
  },
  {
    keywords: ['lab', 'laboratorium', 'dna', 'babi', 'porcine', 'alkohol', 'etanol', 'gelatin', 'iso 17025', 'uji', 'test'],
    answerId: `🔬 **Layanan Pengujian Laboratorium Hayati ISO/IEC 17025:**\n\nLaboratorium Hayati Terpadu Kampus 2 UIN Sunan Gunung Djati Bandung melayani pengujian saintifik akurasi tinggi:\n\n• **Deteksi qPCR DNA Babi (Porcine):** Deteksi spesifik gen sitokrom b babi pada daging olahan, bumbu, & kosmetik.\n• **Analisis Residual Etanol / Alkohol:** Menggunakan instrumen Gas Chromatography (GC-FID) presisi tinggi.\n• **Identifikasi Gelatin & Asam Lemak:** Uji asal bahan baku hewani.\n\nSeluruh proses uji tervalidasi standar internasional dan diakui KAN & BPJPH.`,
    answerEn: `🔬 **ISO/IEC 17025 Accredited Laboratory Testing:**\n\nIntegrated Life Sciences Laboratory at Campus 2 UIN Sunan Gunung Djati Bandung provides high-precision testing:\n\n• **Porcine DNA qPCR Detection:** Specific detection of pig cytochrome b genes in processed food, seasonings & cosmetics.\n• **Residual Ethanol / Alcohol Analysis:** High-accuracy GC-FID instrumentation.\n• **Gelatin & Fatty Acid Profiling:** Identification of animal origin derivatives.\n\nAll tests are validated under international ISO/IEC 17025 standards accredited by KAN.`,
    suggestedAction: {
      labelId: 'Pelajari Laboratorium Halal',
      labelEn: 'Explore Halal Laboratory',
      href: 'https://halal.uinsgd.ac.id/laboratorium-pengujian-halal/'
    }
  },
  {
    keywords: ['alur', 'daftar', 'sihalal', 'ptsp', 'cara', 'prosedur', 'register', 'flow', 'steps', 'syarat'],
    answerId: `📜 **6 Langkah Mudah Mendaftar Sertifikasi Halal di LPH UIN SGD:**\n\n1. Kunjungi portal resmi BPJPH di **ptsp.halal.go.id**.\n2. Login dengan akun NIB OSS Anda.\n3. Pilih jalur pengajuan: **Reguler**.\n4. Pada pilihan Lembaga Pemeriksa Halal, pilih **LPH UIN Sunan Gunung Djati Bandung** (Kode: **LPH-018-ID**).\n5. Unggah dokumen bahan, manual SJPH, dan alur proses produksi.\n6. Tim auditor kami akan melakukan verifikasi dokumen dan audit lapangan/laboratorium.`,
    answerEn: `📜 **6 Easy Steps to Register Halal Certification with LPH UIN SGD:**\n\n1. Visit the official BPJPH portal at **ptsp.halal.go.id**.\n2. Log in using your OSS NIB credentials.\n3. Select your application pathway: **Regular**.\n4. Under Halal Inspection Agency (LPH), select **LPH UIN Sunan Gunung Djati Bandung** (Code: **LPH-018-ID**).\n5. Upload your ingredient list, Halal Assurance manual (SJPH), and production matrix.\n6. Our certified auditors will conduct document verification and field/lab audit.`,
    suggestedAction: {
      labelId: 'Kunjungi Portal SIHALAL BPJPH',
      labelEn: 'Visit BPJPH SIHALAL Portal',
      href: 'https://ptsp.halal.go.id/'
    }
  },
  {
    keywords: ['pelatihan', 'auditor', 'penyelia', 'training', 'kursus', 'bnsp', 'skkni', 'juleha', 'kompetensi'],
    answerId: `🎓 **Pelatihan & Sertifikasi Kompetensi Halal:**\n\nHalal Center UIN SGD menyelenggarakan bimbingan teknis dan uji kompetensi berkala:\n\n• **Pelatihan Auditor Halal:** Berlisensi BPJPH & BNSP.\n• **Pelatihan Penyelia Halal (Internal Halal Officer):** Berbasis SKKNI untuk perusahaan & industri.\n• **Bimtek Juru Sembelih Halal (JULEHA):** Standarisasi kehalalan RPH dan unggas.\n\nSertifikat pelatihan diakui secara nasional untuk syarat akreditasi perusahaan.`,
    answerEn: `🎓 **Halal Competency Training & Certification:**\n\nHalal Center UIN SGD holds regular professional workshops and competency assessments:\n\n• **Halal Auditor Training:** Licensed by BPJPH & BNSP.\n• **Halal Supervisor Training:** SKKNI-based curriculum for internal company halal officers.\n• **Halal Slaughterer (JULEHA) Training:** Sharia-compliant slaughterhouse standardization.\n\nTraining certificates are recognized nationwide for corporate compliance.`,
    suggestedAction: {
      labelId: 'Jadwal Pelatihan via WhatsApp',
      labelEn: 'Training Schedule via WhatsApp',
      href: 'https://wa.me/6282126493700?text=Halo%20Admin%2C%20saya%20ingin%20informasi%20jadwal%20Pelatihan%20Auditor%20dan%20Penyelia%20Halal'
    }
  },
  {
    keywords: ['lokasi', 'alamat', 'kantor', 'gedung', 'kampus', 'dimana', 'location', 'address', 'office'],
    answerId: `📍 **Alamat & Kantor Halal Center UIN SGD:**\n\n• **Kampus 1:** Gedung Lecture Hall / Halal Center, Jl. A.H. Nasution No. 105, Cipadung, Kec. Cibiru, Kota Bandung, Jawa Barat 40614.\n• **Kampus 2 (Laboratorium Terpadu ISO 17025):** Jl. Cimencrang, Kec. Gedebage, Kota Bandung (dekat Masjid Raya Al-Jabbar).\n\nJam Operasional Layanan:\nSenin – Jumat: 08.00 – 16.00 WIB.`,
    answerEn: `📍 **Office Locations of Halal Center UIN SGD:**\n\n• **Campus 1:** Halal Center Building, Jl. A.H. Nasution No. 105, Cibiru, Bandung, West Java 40614.\n• **Campus 2 (Integrated ISO 17025 Lab):** Jl. Cimencrang, Gedebage, Bandung (near Al-Jabbar Grand Mosque).\n\nOffice Hours:\nMonday – Friday: 08:00 AM – 04:00 PM WIB.`,
    suggestedAction: {
      labelId: 'Buka Google Maps',
      labelEn: 'Open Google Maps',
      href: 'https://maps.app.goo.gl/9ZpZJz762a4oFq2N8'
    }
  },
  {
    keywords: ['kontak', 'hubungi', 'wa', 'whatsapp', 'admin', 'telepon', 'phone', 'contact', 'call', 'cs', 'customer service', 'bicara'],
    answerId: `📞 **Kontak Layanan Resmi Halal Center UIN SGD:**\n\nAnda dapat berkonsultasi langsung dengan petugas pelayanan dan verifikator kami melalui saluran berikut:\n\n• **WhatsApp Layanan:** +62 821-2649-3700\n• **Email Resmi:** halalcenter@uinsgd.ac.id / lph@uinsgd.ac.id\n• **Website:** halal.uinsgd.ac.id\n\nKlik tombol di bawah untuk langsung terhubung ke WhatsApp Admin kami.`,
    answerEn: `📞 **Official Support Contacts:**\n\nYou can consult directly with our verification officers and support team through:\n\n• **WhatsApp Support:** +62 821-2649-3700\n• **Email:** halalcenter@uinsgd.ac.id / lph@uinsgd.ac.id\n• **Website:** halal.uinsgd.ac.id\n\nClick the button below to connect with our official WhatsApp Admin immediately.`,
    isFallback: true,
    suggestedAction: {
      labelId: 'Chat WhatsApp Sekarang',
      labelEn: 'Chat WhatsApp Now',
      href: 'https://wa.me/6282126493700?text=Halo%20Admin%20Halal%20Center%20UIN%20SGD%2C%20saya%20ingin%20berkonsultasi'
    }
  }
];

const renderFormattedMessage = (text: string, isUser: boolean) => {
  if (isUser) {
    return <span className="whitespace-pre-line">{text}</span>;
  }

  const lines = text.split('\n');

  return (
    <div className="space-y-1 text-xs sm:text-[13px] leading-relaxed">
      {lines.map((line, lineIdx) => {
        if (!line.trim()) {
          return <div key={lineIdx} className="h-1.5" />;
        }

        // Split by markdown bold (**...**) and italic (*...*)
        const segments = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);

        return (
          <div key={lineIdx} className="leading-relaxed">
            {segments.map((seg, segIdx) => {
              if (seg.startsWith('**') && seg.endsWith('**') && seg.length >= 4) {
                const boldContent = seg.slice(2, -2);
                return (
                  <strong key={segIdx} className="font-bold text-[#1a0726]">
                    {boldContent}
                  </strong>
                );
              }
              if (seg.startsWith('*') && seg.endsWith('*') && seg.length >= 2) {
                const italicContent = seg.slice(1, -1);
                return (
                  <em key={segIdx} className="italic text-neutral-700">
                    {italicContent}
                  </em>
                );
              }
              // Clean any stray asterisks just in case
              const cleaned = seg.replace(/\*\*/g, '');
              return <span key={segIdx}>{cleaned}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export const ChatbotWidget: React.FC = () => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialWelcomeText = language === 'en'
    ? 'Hello! I am the Halal Center UIN SGD AI Assistant. Ask me anything regarding halal certification, fees, document requirements, or laboratory tests. If I cannot answer your question, I will connect you directly to our official WhatsApp support!'
    : 'Halo! Saya Asisten AI Halal Center UIN Sunan Gunung Djati Bandung. Silakan tanyakan seputar pendaftaran sertifikasi halal, syarat dokumen, uji lab, atau tarif. Jika butuh bimbingan lebih lanjut, kami akan menghubungkan Anda langsung ke WhatsApp resmi!';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'BOT',
      text: initialWelcomeText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // Update initial welcome message if language changed and only welcome exists
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [
          {
            id: 'welcome',
            sender: 'BOT',
            text: initialWelcomeText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ];
      }
      return prev;
    });
  }, [language, initialWelcomeText]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Smart natural language matching function
  const findSmartResponse = (query: string): SmartAnswer | null => {
    const q = query.toLowerCase();
    for (const item of KNOWLEDGE_BASE) {
      for (const kw of item.keywords) {
        if (q.includes(kw)) {
          return item;
        }
      }
    }
    return null;
  };

  const handleSend = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const userText = (customQuery || input).trim();
    if (!userText || loading) return;

    setInput('');
    const userMsg: Message = {
      id: 'user_' + Date.now(),
      sender: 'USER',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    // Give a short realistic typing delay (Aceternity style smooth micro-interaction)
    await new Promise((res) => setTimeout(res, 600));

    // 1. Try local smart knowledge base first for instant accuracy
    const match = findSmartResponse(userText);

    if (match) {
      const answerText = language === 'en' ? match.answerEn : match.answerId;
      setMessages((prev) => [
        ...prev,
        {
          id: 'bot_' + Date.now(),
          sender: 'BOT',
          text: answerText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isFallback: match.isFallback,
          waUrl: 'https://wa.me/6282126493700?text=' + encodeURIComponent(`Halo Admin Halal Center UIN SGD, saya bertanya mengenai: "${userText}"`),
          waText: language === 'en' ? 'Consult Officer via WhatsApp' : 'Lanjutkan Chat via WhatsApp',
          suggestedAction: match.suggestedAction ? {
            label: language === 'en' ? match.suggestedAction.labelEn : match.suggestedAction.labelId,
            href: match.suggestedAction.href,
            to: match.suggestedAction.to
          } : undefined
        },
      ]);
      setLoading(false);
      return;
    }

    // 2. Try backend API if query wasn't locally matched
    try {
      const res = await api.post('/chat/message', {
        message: userText,
        history: messages.slice(-4),
      });

      if (res.data?.success && res.data.data?.answer) {
        setMessages((prev) => [
          ...prev,
          {
            id: 'bot_' + Date.now(),
            sender: 'BOT',
            text: res.data.data.answer,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isFallback: res.data.data.canContactAdmin,
            waUrl: res.data.data.waUrl || 'https://wa.me/6282126493700?text=' + encodeURIComponent(`Halo Admin Halal Center UIN SGD, saya bertanya mengenai: "${userText}"`),
            waText: language === 'en' ? 'Consult Officer via WhatsApp' : 'Lanjutkan Chat via WhatsApp',
          },
        ]);
        setLoading(false);
        return;
      }
      throw new Error('Fallback needed');
    } catch {
      // 3. Fallback: The exact requested flow ("kalo misalkan ga ke jawab baru diarahin untuk chat whatsapp")
      const fallbackMsg = language === 'en'
        ? `I could not find a specific automated answer for your query: "${userText}".\n\nHalal certification regulations often involve specific technical nuances. Please chat directly with our official Halal Center UIN Sunan Gunung Djati Bandung verifiers via WhatsApp for personalized guidance.`
        : `Maaf, saya belum menemukan jawaban otomatis yang tepat untuk pertanyaan Anda: "${userText}".\n\nKetentuan regulasi halal memiliki detail teknis spesifik. Silakan konsultasikan langsung dengan Tim Auditor & Verifikator resmi Halal Center UIN Sunan Gunung Djati Bandung via WhatsApp:`;

      setMessages((prev) => [
        ...prev,
        {
          id: 'bot_' + Date.now(),
          sender: 'BOT',
          text: fallbackMsg,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isFallback: true,
          waUrl: 'https://wa.me/6282126493700?text=' + encodeURIComponent(`Halo Admin Halal Center UIN SGD, saya ingin berkonsultasi mengenai: "${userText}"`),
          waText: language === 'en' ? 'Connect via WhatsApp (+62 821-2649-3700)' : 'Hubungi WhatsApp Resmi (+62 821-2649-3700)',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'BOT',
        text: initialWelcomeText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const quickPromptChips = [
    { label: t('chatbot_chip_fee'), query: language === 'en' ? 'Halal certification fee and cost' : 'Berapa biaya tarif sertifikasi halal?' },
    { label: t('chatbot_chip_regular'), query: language === 'en' ? 'Regular halal audit requirements and documents' : 'Syarat dan dokumen audit halal reguler LPH' },
    { label: t('chatbot_chip_lab'), query: language === 'en' ? 'Porcine DNA and alcohol lab test ISO 17025' : 'Uji laboratorium DNA babi dan alkohol ISO 17025' },
    { label: t('chatbot_chip_sihalal'), query: language === 'en' ? 'How to register on SIHALAL BPJPH' : 'Alur dan cara daftar di SIHALAL BPJPH' },
  ];

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right ONLY) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Subtle Interactive Prompt Pill when collapsed */}
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden md:flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-xl shadow-purple-950/10 border border-[#C9A5E8]/60 cursor-pointer hover:border-[#F5D32F] hover:scale-105 transition-all duration-300 group"
          >
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F5D32F]"></span>
            </span>
            <span className="text-xs font-bold text-[#292333] group-hover:text-[#6B18A8] transition-colors">
              {language === 'en' ? 'Ask Halal AI' : 'Tanya AI Halal'}
            </span>
          </div>
        )}

        <Button
          variant="primary"
          aria-label={isOpen ? 'Tutup Chatbot' : 'Buka Asisten AI Halal'}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 cursor-pointer ${isOpen
              ? 'bg-neutral-800 hover:bg-neutral-900 text-white rotate-90 scale-95'
              : 'bg-gradient-to-r from-[#4B0D78] via-[#6B18A8] to-[#4B0D78] hover:brightness-110 text-white ring-4 ring-[#F5D32F]/50 shadow-purple-950/30 hover:scale-110'
            }`}
          onPress={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <div className="relative">
              <Bot className="w-7 h-7 text-white" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#F5D32F] rounded-full border-2 border-[#4B0D78]" />
            </div>
          )}
        </Button>
      </div>

      {/* Floating Chat Panel (Dominantly White, Royal Purple & Yellow Accents) */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[380px] sm:w-[420px] max-w-[calc(100vw-2rem)] animate-in fade-in slide-in-from-bottom-5 duration-300">
          <Card className="rounded-[28px] border border-[#C9A5E8]/60 bg-white shadow-2xl shadow-purple-950/25 overflow-hidden flex flex-col h-[580px] max-h-[82vh] ring-1 ring-purple-100">
            {/* Top 4-Color Gradient Strip */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#4B0D78] via-[#6B18A8] via-[#F5D32F] to-[#6B18A8]" />

            {/* Header: Pure White with Royal Purple Branding & Yellow Badge */}
            <div className="bg-white px-5 py-3.5 border-b border-purple-100/90 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-[#6B18A8] to-[#4B0D78] flex items-center justify-center text-white shadow-md shadow-purple-900/20">
                  <Bot className="w-5 h-5 text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#F5D32F] rounded-full border-2 border-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-extrabold text-sm text-[#292333]">
                      {t('chatbot_title')}
                    </h4>
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 bg-[#FFF7D1] text-[#713f12] border border-[#F5D32F]/50 rounded-md">
                      AI 24/7
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{t('chatbot_subtitle')}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Reset Chat"
                  className="text-neutral-400 hover:text-[#6B18A8] hover:bg-purple-50 p-1.5 rounded-xl min-w-0 cursor-pointer"
                  onPress={resetChat}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Tutup"
                  className="text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 p-1.5 rounded-xl min-w-0"
                  onPress={() => setIsOpen(false)}
                >
                  <ChevronDown className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages Body (Dominantly White Canvas with Subtle Lavender Touch) */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#faf8fc]/80 text-xs">
              {messages.map((m) => {
                const isUser = m.sender === 'USER';
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[88%] ${isUser ? 'ml-auto' : 'mr-auto'
                      }`}
                  >
                    {/* Message Bubble */}
                    <div
                      className={`px-4 py-3 rounded-2xl text-xs sm:text-[13px] leading-relaxed ${isUser
                          ? 'bg-[#6b1282] text-white rounded-tr-xs shadow-md shadow-purple-950/10'
                          : 'bg-white text-neutral-800 border border-purple-100 rounded-tl-xs shadow-xs'
                        }`}
                    >
                      {renderFormattedMessage(m.text, isUser)}
                    </div>

                    <span className="text-[10px] text-neutral-400 mt-1 px-1 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {m.time}
                    </span>

                    {/* Secondary Suggested Action Link (e.g. Open Calculator or SIHALAL) */}
                    {m.suggestedAction && (
                      <div className="mt-2 w-full">
                        {m.suggestedAction.to ? (
                          <a
                            href={m.suggestedAction.to}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF7D1] hover:bg-[#ffef9e] text-[#713f12] font-extrabold text-xs border border-[#F5D32F] transition-colors shadow-xs"
                          >
                            <span>{m.suggestedAction.label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <a
                            href={m.suggestedAction.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF7D1] hover:bg-[#ffef9e] text-[#713f12] font-extrabold text-xs border border-[#F5D32F] transition-colors shadow-xs"
                          >
                            <span>{m.suggestedAction.label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    )}

                    {/* Prominent WhatsApp Escalation Card (When AI can't answer or user needs human officer) */}
                    {m.isFallback && (
                      <div className="mt-2.5 w-full rounded-2xl p-3 bg-gradient-to-br from-emerald-50 to-white border border-emerald-200/90 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-7 h-7 rounded-lg bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                            <MessageCircle className="w-4 h-4 fill-white" />
                          </div>
                          <div>
                            <div className="font-bold text-xs text-[#065f46]">
                              {language === 'en' ? 'Official WhatsApp Desk' : 'Layanan WhatsApp Resmi'}
                            </div>
                            <div className="text-[10px] text-neutral-500 font-medium">
                              +62 821-2649-3700 (Admin LPH)
                            </div>
                          </div>
                        </div>
                        <a
                          href={m.waUrl || 'https://wa.me/6282126493700'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#1ebd5b] text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white" />
                          <span>{m.waText || t('chatbot_wa_button')}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing indicator */}
              {loading && (
                <div className="flex items-center gap-2.5 text-xs text-neutral-600 bg-white p-3 rounded-2xl border border-purple-100 shadow-xs max-w-[75%]">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#6b1282] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#86198f] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#a21caf] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="font-medium text-neutral-500">
                    {language === 'en' ? 'AI is analyzing regulations...' : 'AI sedang menganalisis regulasi...'}
                  </span>
                </div>
              )}

              {/* Initial Quick Prompt Chips (Shown only when chat is fresh) */}
              {messages.length === 1 && !loading && (
                <div className="pt-2">
                  <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                    {language === 'en' ? 'Quick Inquiries:' : 'Pertanyaan Cepat:'}
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {quickPromptChips.map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSend(undefined, chip.query)}
                        className="text-left px-3 py-2 rounded-xl bg-white hover:bg-purple-50 text-neutral-700 hover:text-[#6b1282] border border-purple-100/90 text-xs font-medium transition-all shadow-2xs hover:border-purple-300 flex items-center justify-between group"
                      >
                        <span>{chip.label}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-[#6b1282] transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form (Crisp White with Royal Purple Button) */}
            <div className="p-3 bg-white border-t border-purple-100">
              <form onSubmit={(e) => handleSend(e)} className="flex gap-2 items-center">
                <Input
                  placeholder={t('chatbot_input_placeholder')}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  variant="secondary"
                  className="flex-1 text-xs sm:text-[13px] bg-[#faf8fc] rounded-xl border-purple-200/80"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isPending={loading}
                  aria-label="Kirim Pesan"
                  className="bg-[#6B18A8] hover:bg-[#58138a] text-white px-4 h-10 rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>

              {/* Bottom Subtle Disclaimer */}
              <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-400 px-1">
                <span className="truncate">{t('chatbot_disclaimer')}</span>
                <a
                  href="https://wa.me/6282126493700"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6B18A8] hover:text-[#58138a] hover:underline font-bold shrink-0 ml-2"
                >
                  WhatsApp ↗
                </a>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;

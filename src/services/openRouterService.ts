/**
 * OpenRouter AI Service for LPH UIN Sunan Gunung Djati Bandung
 * Powered by Google Gemini 2.5 Flash Lite via OpenRouter API
 */

export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface SuggestedAction {
  label: string;
  href?: string;
  to?: string;
}

export interface AiChatResult {
  answer: string;
  suggestedAction?: SuggestedAction;
  waUrl?: string;
  waText?: string;
  isAiGenerated: boolean;
  modelUsed: string;
}

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_MODEL =
  import.meta.env.VITE_OPENROUTER_MODEL || 'google/gemini-2.5-flash-lite';

/**
 * Retrieves the OpenRouter API key from Vite environment or localStorage
 */
export function getOpenRouterApiKey(): string {
  if (import.meta.env.VITE_OPENROUTER_API_KEY) {
    return import.meta.env.VITE_OPENROUTER_API_KEY;
  }
  try {
    const saved = localStorage.getItem('lph_openrouter_api_key');
    if (saved) return saved;
  } catch {}
  return '';
}

/**
 * Builds dynamic system prompt integrating static LPH knowledge
 * and dynamic FAQs saved by admin in localStorage ('lph_kb_list').
 */
function buildSystemPrompt(language: string): string {
  // Collect dynamic KB from admin
  let dynamicKbSnippets = '';
  try {
    const rawKb = localStorage.getItem('lph_kb_list');
    if (rawKb) {
      const kbList = JSON.parse(rawKb);
      if (Array.isArray(kbList) && kbList.length > 0) {
        dynamicKbSnippets = '\n\nINFORMASI DAN FAQ TAMBAHAN DARI ADMIN CMS LPH:\n' +
          kbList
            .map(
              (item: any, idx: number) =>
                `${idx + 1}. Tanya: "${item.question}" -> Jawaban Resmi: "${item.answer}"`
            )
            .join('\n');
      }
    }
  } catch {}

  const isEn = language === 'en';

  return `Anda adalah Asisten AI Resmi dari Lembaga Pemeriksa Halal (LPH) Universitas Islam Negeri Sunan Gunung Djati Bandung (UIN SGD).
Identitas Resmi LPH:
- Kode LPH di BPJPH Kementerian Agama RI: LPH-018-ID
- Nama Lembaga: LPH UIN Sunan Gunung Djati Bandung
- Website Resmi: https://halal.uinsgd.ac.id
- Email Resmi: lph@uinsgd.ac.id
- WhatsApp Layanan Resmi: +62 821-2649-3700 (Tautan konsultasi: https://wa.me/6282126493700)
- Kampus 1: Gedung Lecture Hall / Kantor LPH, Jl. A.H. Nasution No. 105, Cibiru, Bandung, Jawa Barat 40614.
- Kampus 2 (Laboratorium): Laboratorium Biosains Pengujian Halal Terpadu ISO/IEC 17025, Jl. Cimencrang, Gedebage, Bandung (dekat Masjid Raya Al-Jabbar).
- Jam Layanan: Senin – Jumat, pukul 08.00 – 16.00 WIB.

TUGAS & KARAKTER ANDA:
1. Membantu pelaku usaha (UMKM, industri menengah & besar), auditor, akademisi, dan masyarakat dengan ramah, santun, islami, berbasis sains dan syariat.
2. Jawab secara ringkas, jelas, terstruktur (gunakan poin-poin/bullet points dan teks tebal/bold untuk kata kunci penting).
3. Jika pertanyaan diajukan dalam Bahasa Inggris, jawab dalam Bahasa Inggris yang fasih dan profesional. Jika dalam Bahasa Indonesia, jawab dalam Bahasa Indonesia yang formal namun ramah.
4. ALUR PENDAFTARAN SERTIFIKASI HALAL:
   - Pelaku usaha mendaftar mandiri secara online melalui portal resmi SIHALAL BPJPH di ptsp.halal.go.id dengan akun NIB OSS.
   - Pada pilihan Lembaga Pemeriksa Halal, WAJIB memilih: LPH UIN Sunan Gunung Djati Bandung (Kode: LPH-018-ID).
   - Unggah daftar bahan, manual SJPH (Sistem Jaminan Produk Halal), dan diagram proses produksi.
   - Auditor LPH UIN SGD melakukan verifikasi dokumen dan audit lapangan/laboratorium.
   - Hasil audit dibawa ke Sidang Komisi Fatwa MUI untuk penetapan kehalalan produk.
   - Sertifikat Halal resmi diterbitkan oleh BPJPH Kemenag RI.
5. PENGUJIAN LABORATORIUM ISO/IEC 17025:
   - Terakreditasi KAN (Komite Akreditasi Nasional) SNI ISO/IEC 17025:2017 No. LP-1542-IDN.
   - Layanan pengujian mencakup: Deteksi Real-Time qPCR DNA Babi (Porcine Cyt b) sensitivitas tinggi (LOD hingga 0.01%), Analisis Residual Etanol/Alkohol menggunakan Gas Chromatography (GC-FID), serta profiling gelatin dan asam lemak.
6. TARIF & BIAYA:
   - Tarif resmi mengacu pada Keputusan Menteri Agama (KMA) No. 784 Tahun 2021 dan Keputusan Kepala BPJPH.
   - Biaya transparan sesuai skala usaha dan kompleksitas fasilitas/uji laboratorium.
   - Simulasi biaya lengkap dan transparan dapat dicoba di menu website: /layanan/kalkulator.
7. PELATIHAN & KOMPETENSI:
   - Diklat Auditor Halal (standar BPJPH & BNSP).
   - Pelatihan Penyelia Halal (Internal Halal Supervisor) berbasis SKKNI.
   - Bimbingan Teknis Juru Sembelih Halal (JULEHA) untuk RPH ruminansia & unggas.
8. KONSULTASI KHUSUS & PENUTUP:
   - Jika pengguna menanyakan konsultasi berkas langsung atau butuh tindak lanjut khusus, sarankan dengan ramah untuk menghubungi WhatsApp resmi LPH di +62 821-2649-3700.
   - Jaga netralitas dan etika; hanya berikan informasi yang akurat seputar halal, syariat, dan sains pengujian.${dynamicKbSnippets}

Gaya penulisan:
- ${isEn ? 'Respond in English with clear markdown formatting.' : 'Awali dengan salam yang hangat bila percakapan baru dimulai, gunakan format markdown yang rapi.'}`;
}

/**
 * Sends chat message to OpenRouter API with Gemini 2.5 Flash Lite
 */
export async function askOpenRouterAI(
  userQuery: string,
  history: Array<{ sender: 'USER' | 'BOT'; text: string }> = [],
  language: string = 'id'
): Promise<AiChatResult> {
  const apiKey = getOpenRouterApiKey();
  const model = DEFAULT_MODEL;

  if (!apiKey) {
    throw new Error('OpenRouter API key tidak ditemukan. Silakan tambahkan VITE_OPENROUTER_API_KEY di .env atau konfigurasi admin.');
  }

  // Prepare messages array
  const messagesPayload: OpenRouterMessage[] = [
    {
      role: 'system',
      content: buildSystemPrompt(language),
    },
  ];

  // Append last 6 turns of chat history for context continuity
  const recentHistory = history.slice(-6);
  for (const h of recentHistory) {
    if (h.sender === 'USER') {
      messagesPayload.push({ role: 'user', content: h.text });
    } else if (h.sender === 'BOT') {
      // Don't include huge welcome text
      if (h.text.length < 500) {
        messagesPayload.push({ role: 'assistant', content: h.text });
      }
    }
  }

  // Add the new user query
  messagesPayload.push({ role: 'user', content: userQuery });

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://halal.uinsgd.ac.id',
        'X-Title': 'LPH UIN Sunan Gunung Djati Bandung AI',
      },
      body: JSON.stringify({
        model,
        messages: messagesPayload,
        temperature: 0.4,
        max_tokens: 800,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`OpenRouter API error ${response.status}:`, errorText);
      throw new Error(`OpenRouter returned status ${response.status}`);
    }

    const data = await response.json();
    const replyText =
      data.choices?.[0]?.message?.content ||
      (language === 'en'
        ? 'Thank you for your inquiry. Please consult our official WhatsApp verifier for technical assistance.'
        : 'Terima kasih atas pertanyaan Anda. Silakan hubungi tim verifikator WhatsApp resmi kami untuk konsultasi teknis lebih lanjut.');

    // Determine smart action button based on user intent
    const qLower = userQuery.toLowerCase();
    let suggestedAction: SuggestedAction | undefined;

    if (
      qLower.includes('biaya') ||
      qLower.includes('tarif') ||
      qLower.includes('kalkulator') ||
      qLower.includes('fee') ||
      qLower.includes('price') ||
      qLower.includes('cost')
    ) {
      suggestedAction = {
        label: language === 'en' ? 'Simulate Fee on Calculator' : 'Hitung Estimasi di Kalkulator Tarif',
        to: '/layanan/kalkulator',
      };
    } else if (
      qLower.includes('lab') ||
      qLower.includes('uji') ||
      qLower.includes('pcr') ||
      qLower.includes('babi') ||
      qLower.includes('alkohol')
    ) {
      suggestedAction = {
        label: language === 'en' ? 'Lab ISO 17025 Info' : 'Pelajari Fasilitas Lab Terpadu',
        href: 'https://halal.uinsgd.ac.id/laboratorium-pengujian-halal/',
      };
    } else if (
      qLower.includes('sihalal') ||
      qLower.includes('daftar') ||
      qLower.includes('ptsp') ||
      qLower.includes('register')
    ) {
      suggestedAction = {
        label: language === 'en' ? 'Open SIHALAL BPJPH' : 'Buka Portal SIHALAL BPJPH',
        href: 'https://ptsp.halal.go.id/',
      };
    } else if (
      qLower.includes('wa') ||
      qLower.includes('kontak') ||
      qLower.includes('cs') ||
      qLower.includes('telepon') ||
      qLower.includes('contact')
    ) {
      suggestedAction = {
        label: language === 'en' ? 'Chat WhatsApp Officer' : 'Chat WhatsApp Petugas LPH',
        href: `https://wa.me/6282126493700?text=${encodeURIComponent(`Halo Admin LPH UIN SGD, saya ingin berkonsultasi mengenai: "${userQuery}"`)}`,
      };
    }

    const waUrl =
      `https://wa.me/6282126493700?text=` +
      encodeURIComponent(`Halo Petugas LPH UIN SGD, saya berkonsultasi via AI Chatbot tentang: "${userQuery}"`);

    return {
      answer: replyText,
      suggestedAction,
      waUrl,
      waText: language === 'en' ? 'Consult Officer via WhatsApp' : 'Lanjutkan Diskusi via WhatsApp',
      isAiGenerated: true,
      modelUsed: model,
    };
  } catch (err: any) {
    console.error('Failed to communicate with OpenRouter Gemini:', err);
    throw err;
  }
}

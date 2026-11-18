import React, { useState } from 'react';
import { Button, Card, Input, TextArea } from '@heroui/react';
import { Smile, CheckCircle2, Star, ThumbsUp, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { api } from '@/services/api';
import { scanForThreats } from '@/lib/security';
import { useLanguage } from '@/context/LanguageContext';
import { SparklesCore } from '@/components/ui/sparkles';

interface FormQuestion {
  id: string;
  question: string;
  questionEn: string;
  labels: {
    1: { id: string; en: string };
    2: { id: string; en: string };
    3: { id: string; en: string };
    4: { id: string; en: string };
  };
}

const QUESTIONS: FormQuestion[] = [
  {
    id: 'q1Requirement',
    question: 'Bagaimana pendapat anda terhadap kesesuaian persyaratan layanan kehalalan produk dengan layanannya di LPH UIN Sunan Gunung Djati Bandung? *',
    questionEn: 'How do you perceive the conformity of halal service requirements with the actual services provided at LPH UIN SGD Bandung? *',
    labels: {
      1: { id: 'Tidak Sesuai', en: 'Not Conform' },
      2: { id: 'Kurang Sesuai', en: 'Less Conform' },
      3: { id: 'Sesuai', en: 'Conform' },
      4: { id: 'Sangat Sesuai', en: 'Fully Conform' },
    },
  },
  {
    id: 'q2Procedure',
    question: 'Bagaimana pendapat anda terhadap kemudahan prosedur layanan pemeriksaan kehalalan produk di LPH UIN Sunan Gunung Djati Bandung? *',
    questionEn: 'How do you evaluate the ease of procedures for halal product inspection services at LPH UIN SGD Bandung? *',
    labels: {
      1: { id: 'Tidak Mudah', en: 'Difficult' },
      2: { id: 'Kurang Mudah', en: 'Less Easy' },
      3: { id: 'Mudah', en: 'Easy' },
      4: { id: 'Sangat Mudah', en: 'Very Easy' },
    },
  },
  {
    id: 'q3Speed',
    question: 'Bagaimana pendapat anda terhadap kecepatan dan ketepatan waktu proses pemeriksaan kehalalan produk di LPH UIN Sunan Gunung Djati Bandung? *',
    questionEn: 'How do you rate the speed and punctuality of the halal inspection process at LPH UIN SGD Bandung? *',
    labels: {
      1: { id: 'Sangat Lambat', en: 'Very Slow' },
      2: { id: 'Lambat', en: 'Slow' },
      3: { id: 'Cepat', en: 'Fast' },
      4: { id: 'Sangat Cepat', en: 'Very Fast' },
    },
  },
  {
    id: 'q4Tariff',
    question: 'Bagaimana pendapat anda terhadap tarif/biaya pemeriksaan kehalalan produk di LPH UIN Sunan Gunung Djati Bandung?',
    questionEn: 'How do you perceive the affordability of halal inspection tariffs/fees at LPH UIN SGD Bandung?',
    labels: {
      1: { id: 'Tidak Terjangkau', en: 'Not Affordable' },
      2: { id: 'Kurang Terjangkau', en: 'Less Affordable' },
      3: { id: 'Terjangkau', en: 'Affordable' },
      4: { id: 'Sangat Terjangkau', en: 'Very Affordable' },
    },
  },
  {
    id: 'q5StandardResult',
    question: 'Bagaimana pendapat anda tentang kesesuaian produk pelayanan antara yang tercantum dalam standar pelayanan pemeriksaan kehalalan produk dengan hasil yang diterima di LPH UIN Sunan Gunung Djati Bandung? *',
    questionEn: 'How do you evaluate the conformity between published service standards and the actual deliverables received at LPH UIN SGD Bandung? *',
    labels: {
      1: { id: 'Tidak Sesuai', en: 'Not In Line' },
      2: { id: 'Kurang Sesuai', en: 'Less In Line' },
      3: { id: 'Sesuai', en: 'In Line' },
      4: { id: 'Sangat Sesuai', en: 'Fully In Line' },
    },
  },
  {
    id: 'q6Competence',
    question: 'Bagaimana pendapat anda kompetensi/pengetahuan petugas/auditor layanan pemeriksaan kehalalan produk di LPH UIN Sunan Gunung Djati Bandung? *',
    questionEn: 'How do you rate the competency and knowledge of auditors/officers at LPH UIN SGD Bandung? *',
    labels: {
      1: { id: 'Tidak Kompeten', en: 'Incompetent' },
      2: { id: 'Kurang Kompeten', en: 'Less Competent' },
      3: { id: 'Kompeten', en: 'Competent' },
      4: { id: 'Sangat Kompeten', en: 'Highly Competent' },
    },
  },
  {
    id: 'q7Behavior',
    question: 'Bagaimana pendapat anda perilaku petugas/auditor layanan pemeriksaan kehalalan produk di LPH UIN Sunan Gunung Djati Bandung? *',
    questionEn: 'How do you assess the courtesy and professional conduct of auditors/officers at LPH UIN SGD Bandung? *',
    labels: {
      1: { id: 'Tidak Sopan & Ramah', en: 'Impolite & Unfriendly' },
      2: { id: 'Kurang Sopan & Ramah', en: 'Less Polite' },
      3: { id: 'Sopan & Ramah', en: 'Polite & Friendly' },
      4: { id: 'Sangat Sopan & Ramah', en: 'Very Courteous & Helpful' },
    },
  },
  {
    id: 'q8Facility',
    question: 'Bagaimana pendapat anda tentang kualitas sarana prasarana dalam layanan pemeriksaan kehalalan produk di LPH UIN Sunan Gunung Djati Bandung? *',
    questionEn: 'How do you rate the quality of facilities and laboratory infrastructure at LPH UIN SGD Bandung? *',
    labels: {
      1: { id: 'Buruk', en: 'Poor' },
      2: { id: 'Cukup', en: 'Fair' },
      3: { id: 'Baik', en: 'Good' },
      4: { id: 'Sangat Baik', en: 'Excellent' },
    },
  },
  {
    id: 'q9ComplaintHandling',
    question: 'Bagaimana pendapat anda tentang pengaduan dalam layanan pemeriksaan kehalalan produk di LPH UIN Sunan Gunung Djati Bandung? *',
    questionEn: 'How do you evaluate the responsiveness of complaint handling services at LPH UIN SGD Bandung? *',
    labels: {
      1: { id: 'Buruk', en: 'Poor' },
      2: { id: 'Cukup', en: 'Fair' },
      3: { id: 'Baik', en: 'Good' },
      4: { id: 'Sangat Baik', en: 'Excellent' },
    },
  },
];

export const SatisfactionPage: React.FC = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  // Respondent Profile
  const [productType, setProductType] = useState('Makanan & Minuman');
  const [businessScale, setBusinessScale] = useState('Usaha Mikro / Kecil');
  const [businessLocation, setBusinessLocation] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  // 9 Questions on a 1-4 Likert Scale (Default to 4: Sangat Baik / Sesuai)
  const [ratings, setRatings] = useState<Record<string, number>>({
    q1Requirement: 4,
    q2Procedure: 4,
    q3Speed: 4,
    q4Tariff: 4,
    q5StandardResult: 4,
    q6Competence: 4,
    q7Behavior: 4,
    q8Facility: 4,
    q9ComplaintHandling: 4,
  });

  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const setQuestionRating = (qId: string, val: number) => {
    setRatings((prev) => ({ ...prev, [qId]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!businessLocation.trim()) {
      alert(isEn ? 'Please specify your business location (Regency / City).' : 'Mohon isi Lokasi Usaha (Kabupaten/Kota).');
      return;
    }

    // Anti-Judol & Anti-Spam Threat Filter
    const threat = scanForThreats(comment, `${name} ${businessLocation}`);
    if (!threat.isClean) {
      alert(
        isEn
          ? 'Submission blocked: Your review contains forbidden spam keywords or prohibited links.'
          : 'Pengiriman ulasan ditolak: Ulasan Anda terdeteksi mengandung kata kunci spam atau tautan terlarang.'
      );
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: name.trim() || 'Anonim / Pelaku Usaha',
        contact: contact.trim() || '-',
        serviceUsed: 'Pemeriksaan Kehalalan Produk Reguler LPH UIN SGD',
        productType,
        businessScale,
        businessLocation,
        q1Requirement: ratings.q1Requirement,
        q2Procedure: ratings.q2Procedure,
        q3Speed: ratings.q3Speed,
        q4Tariff: ratings.q4Tariff,
        q5StandardResult: ratings.q5StandardResult,
        q6Competence: ratings.q6Competence,
        q7Behavior: ratings.q7Behavior,
        q8Facility: ratings.q8Facility,
        q9ComplaintHandling: ratings.q9ComplaintHandling,
        // Overall average on 1-5 scale for backward-compatibility
        rating: Math.round(((Object.values(ratings).reduce((a, b) => a + b, 0) / 9) / 4) * 5),
        speedRating: ratings.q3Speed,
        friendlinessRating: ratings.q7Behavior,
        clarityRating: ratings.q1Requirement,
        facilityRating: ratings.q8Facility,
        comment: comment.trim(),
        submittedAt: new Date().toISOString(),
      };

      await api.post('/satisfaction', payload);

      // Save to localStorage so admin review dashboard has instant data
      try {
        const raw = localStorage.getItem('lph_satisfaction_list');
        const existing = raw ? JSON.parse(raw) : [];
        existing.unshift({ id: Date.now(), ...payload });
        localStorage.setItem('lph_satisfaction_list', JSON.stringify(existing.slice(0, 100)));
      } catch {}
    } catch {
      // Offline fallback: save to localStorage
      try {
        const raw = localStorage.getItem('lph_satisfaction_list');
        const existing = raw ? JSON.parse(raw) : [];
        existing.unshift({
          id: Date.now(),
          name: name.trim() || 'Anonim / Pelaku Usaha',
          contact: contact.trim() || '-',
          serviceUsed: 'Pemeriksaan Kehalalan Produk Reguler LPH UIN SGD',
          productType,
          businessScale,
          businessLocation,
          ...ratings,
          comment: comment.trim(),
          submittedAt: new Date().toISOString(),
        });
        localStorage.setItem('lph_satisfaction_list', JSON.stringify(existing.slice(0, 100)));
      } catch {}
    } finally {
      setSubmitted(true);
      setLoading(false);
    }
  };

  const productTypes = isEn
    ? [
        'Food & Beverage',
        'Cosmetics & Toiletries',
        'Pharmaceuticals & Traditional Medicine',
        'Chemical & Biological Products',
        'Consumer Goods / Wearables',
        'Slaughterhouse / Poultry Service',
      ]
    : [
        'Makanan & Minuman',
        'Kosmetik & Produk Perawatan',
        'Obat & Farmasi Herbal',
        'Produk Kimiawi & Hayati',
        'Barang Gunaan / Logistik',
        'Jasa Penyembelihan (RPH / RPA)',
      ];

  const scales = isEn
    ? ['Micro Enterprise', 'Small Enterprise', 'Medium Enterprise', 'Large Enterprise']
    : ['Usaha Mikro', 'Usaha Kecil', 'Usaha Menengah', 'Usaha Besar'];

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-b from-[#FAF7FD] via-white to-[#F7F2FB] pb-24">
      {/* Banner in Royal Purple Gradient with Yellow Accents & Sparkles */}
      <section className="relative py-20 lg:py-24 bg-[#1a0726] text-white overflow-hidden text-center">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#4B0D78] via-[#6B18A8] via-[#F5D32F] to-[#6B18A8]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0726] via-[#4a0d5c] to-[#1a0726] opacity-95" />
        <SparklesCore
          id="satisfaction-sparkles"
          minSize={0.7}
          maxSize={2.2}
          particleDensity={35}
          particleColor={['#ffffff', '#f5d0fe', '#F5D32F', '#d8b4fe']}
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7D1] text-[#713f12] text-xs font-extrabold uppercase tracking-wider mb-4 border border-[#F5D32F] shadow-xs">
            <Smile className="w-3.5 h-3.5 text-[#eab308]" />
            {isEn ? 'OFFICIAL CUSTOMER SATISFACTION QUESTIONNAIRE' : 'KUESIONER KEPUASAN PELANGGAN RESMI'}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-2xl leading-tight">
            KUESIONER KEPUASAN <span className="text-[#F5D32F]">PELANGGAN</span>
          </h1>
          <p className="mt-2 text-base sm:text-lg font-bold text-purple-200">
            Lembaga Pemeriksa Halal (LPH) UIN Sunan Gunung Djati Bandung
          </p>
          <p className="mt-3 text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed font-normal">
            {isEn
              ? 'This questionnaire is conducted as an objective evaluation and basis for future institutional enhancement of LPH UIN SGD Bandung.'
              : 'Kuesioner ini dilakukan sebagai penilaian dan bahan perbaikan bagi lembaga untuk kedepannya.'}
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-8 relative z-30">
        <Card className="bg-white rounded-3xl border border-[#C9A5E8]/40 shadow-2xl p-6 sm:p-10 space-y-8">
          {submitted ? (
            <div className="p-8 sm:p-12 text-center space-y-5">
              <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#292333]">
                {isEn ? 'Thank You for Your Valuable Assessment!' : 'Terima Kasih Atas Partisipasi Anda!'}
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 max-w-lg mx-auto leading-relaxed">
                {isEn
                  ? 'Your feedback has been securely registered in the quality management system of LPH UIN Sunan Gunung Djati Bandung for continuous service perfection.'
                  : 'Jawaban dan masukan Anda telah tercatat dengan aman pada sistem penjaminan mutu LPH UIN Sunan Gunung Djati Bandung untuk penyempurnaan layanan pemeriksaan kehalalan produk.'}
              </p>
              <div className="pt-4 flex justify-center">
                <Button
                  variant="primary"
                  className="bg-[#6B18A8] hover:bg-[#58138a] text-white font-extrabold text-sm px-7 py-3 rounded-xl shadow-md cursor-pointer"
                  onPress={() => setSubmitted(false)}
                >
                  {isEn ? 'Submit Another Response' : 'Isi Kuesioner Baru'}
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Privacy Notice Banner */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/40 text-xs sm:text-sm text-[#4B0D78]">
                <ShieldCheck className="w-5 h-5 text-[#6B18A8] shrink-0" />
                <span>
                  <strong>{isEn ? 'Confidential Evaluation:' : 'Penilaian Dijamin Kerahasiaannya:'}</strong>{' '}
                  {isEn
                    ? 'All ratings are processed anonymously for internal quality calibration. * indicates required questions.'
                    : 'Seluruh tanggapan diolah untuk audit mutu internal. Tanda bintang (*) menunjukkan pertanyaan wajib.'}
                </span>
              </div>

              {/* Section 1: Respondent Profile */}
              <div className="space-y-5 border-b border-neutral-100 pb-8">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#6B18A8] text-white font-black text-xs flex items-center justify-center">
                    A
                  </span>
                  <h3 className="text-lg font-black text-[#292333]">
                    {isEn ? 'Respondent & Enterprise Profile' : 'Profil Pelaku Usaha & Pemohon'}
                  </h3>
                </div>

                {/* Jenis Produk */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-2">
                    {isEn ? 'Product Category *' : 'Jenis Produk *'}
                  </label>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    className="w-full p-3 rounded-xl border border-neutral-300 text-sm font-semibold bg-white focus:outline-none focus:border-[#6B18A8] shadow-2xs"
                  >
                    {productTypes.map((pt) => (
                      <option key={pt} value={pt}>
                        {pt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Skala Usaha */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-2">
                    {isEn ? 'Business Scale *' : 'Skala Usaha *'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {scales.map((sc) => (
                      <Button
                        key={sc}
                        type="button"
                        variant={businessScale === sc ? 'primary' : 'outline'}
                        className={`text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer ${
                          businessScale === sc
                            ? 'bg-[#6B18A8] text-white shadow-xs'
                            : 'border-neutral-200 text-neutral-700 hover:bg-[#FAF7FD]'
                        }`}
                        onPress={() => setBusinessScale(sc)}
                      >
                        {sc}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Lokasi Usaha (Kabupaten/Kota) */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-1.5">
                    {isEn ? 'Business Location (Regency / City) *' : 'Lokasi Usaha (Kabupaten/Kota) *'}
                  </label>
                  <Input
                    placeholder={isEn ? 'e.g. Bandung City / Bekasi Regency' : 'Contoh: Kota Bandung / Kab. Bandung Barat'}
                    value={businessLocation}
                    onChange={(e) => setBusinessLocation(e.target.value)}
                    required
                    className="w-full text-sm font-semibold rounded-xl"
                  />
                </div>

                {/* Optional Name & Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wide mb-1">
                      {isEn ? 'Contact Person / Enterprise Name (Optional)' : 'Nama Kontak / Pelaku Usaha (Opsional)'}
                    </label>
                    <Input
                      placeholder={isEn ? 'e.g. PT Berkah Alam' : 'Contoh: PT Berkah Alam / Bpk. Fulan'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wide mb-1">
                      {isEn ? 'Email / WhatsApp (Optional)' : 'Email / WhatsApp (Opsional)'}
                    </label>
                    <Input
                      placeholder="08123456789 / info@usaha.com"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full text-xs rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: 9 Questions based on GForm */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#F5D32F] text-[#3B074A] font-black text-xs flex items-center justify-center">
                      B
                    </span>
                    <h3 className="text-lg font-black text-[#292333]">
                      {isEn ? 'Service Quality Assessment (Scale 1 - 4)' : 'Penilaian Mutu Pelayanan (Skala 1 - 4)'}
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-400">
                    {isEn ? 'Mohon diisi sesuai pengalaman Anda' : 'Mohon diisi sesuai pengalaman Anda!'}
                  </span>
                </div>

                <div className="space-y-5">
                  {QUESTIONS.map((q, idx) => {
                    const currentVal = ratings[q.id] || 4;
                    return (
                      <div
                        key={q.id}
                        className="p-5 rounded-2xl bg-white border border-[#C9A5E8]/35 hover:border-[#6B18A8]/60 shadow-xs transition-all space-y-3"
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-[#6B18A8]/10 text-[#6B18A8] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="text-xs sm:text-sm font-bold text-neutral-800 leading-snug">
                            {isEn ? q.questionEn : q.question}
                          </p>
                        </div>

                        {/* 1 - 4 Scale Selection Buttons */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 pl-0 sm:pl-9">
                          {[1, 2, 3, 4].map((score) => {
                            const isSelected = currentVal === score;
                            const labelObj = q.labels[score as 1 | 2 | 3 | 4];
                            const labelText = isEn ? labelObj.en : labelObj.id;

                            return (
                              <button
                                key={score}
                                type="button"
                                onClick={() => setQuestionRating(q.id, score)}
                                className={`p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between min-h-[64px] ${
                                  isSelected
                                    ? 'bg-[#6B18A8] text-white border-[#6B18A8] shadow-md shadow-purple-950/20'
                                    : 'bg-[#FAF7FD] text-neutral-700 border-[#C9A5E8]/40 hover:bg-white hover:border-[#6B18A8]'
                                }`}
                              >
                                <span className={`text-base font-black ${isSelected ? 'text-[#F5D32F]' : 'text-[#6B18A8]'}`}>
                                  {score}
                                </span>
                                <span className="text-[11px] font-semibold leading-tight line-clamp-2 mt-1">
                                  {labelText}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 3: Comments & Feedback */}
              <div className="space-y-3 border-t border-neutral-100 pt-6">
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide">
                  {isEn ? 'Additional Feedback, Suggestions & Appreciation' : 'Kritik, Saran & Masukan Tambahan Bagi LPH UIN SGD'}
                </label>
                <TextArea
                  rows={4}
                  placeholder={
                    isEn
                      ? 'Share your detailed impressions, recommendations, or suggestions for service enhancement...'
                      : 'Tuliskan kesan, saran perbaikan, atau apresiasi Anda untuk kemajuan pelayanan LPH UIN SGD Bandung...'
                  }
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full text-xs sm:text-sm rounded-xl"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isPending={loading}
                className="bg-[#6B18A8] hover:bg-[#58138a] text-white font-extrabold py-4 rounded-2xl shadow-xl shadow-purple-950/25 text-sm sm:text-base cursor-pointer hover:scale-[1.01] transition-transform"
              >
                {isEn ? 'Submit Customer Satisfaction Questionnaire' : 'Kirim Kuesioner Kepuasan Pelanggan'}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SatisfactionPage;

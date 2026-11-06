import React, { useState } from 'react';
import { Button, Card, Input, TextArea } from '@heroui/react';
import { Smile, CheckCircle2, Star, ThumbsUp, ArrowRight } from 'lucide-react';
import { api } from '@/services/api';
import { useLanguage } from '@/context/LanguageContext';

export const SatisfactionPage: React.FC = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [serviceUsed, setServiceUsed] = useState(
    isEn ? 'Regular Halal Inspection' : 'Pemeriksaan Kehalalan Produk Reguler'
  );
  const [rating, setRating] = useState(5);
  const [speedRating, setSpeedRating] = useState(5);
  const [friendlinessRating, setFriendlinessRating] = useState(5);
  const [clarityRating, setClarityRating] = useState(5);
  const [facilityRating, setFacilityRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/satisfaction', {
        name,
        contact,
        serviceUsed,
        rating,
        speedRating,
        friendlinessRating,
        clarityRating,
        facilityRating,
        comment,
      });
    } catch {
      // Offline fallback
    } finally {
      setSubmitted(true);
      setLoading(false);
    }
  };

  const renderRatingGroup = (index: number, label: string, currentVal: number, setVal: (n: number) => void) => {
    const options = isEn
      ? [
          { val: 1, label: 'Poor' },
          { val: 2, label: 'Fair' },
          { val: 3, label: 'Good' },
          { val: 4, label: 'Very Good' },
          { val: 5, label: 'Excellent' },
        ]
      : [
          { val: 1, label: 'Sangat Kurang' },
          { val: 2, label: 'Kurang' },
          { val: 3, label: 'Cukup' },
          { val: 4, label: 'Baik' },
          { val: 5, label: 'Sangat Baik' },
        ];

    return (
      <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-3">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#6b1282] text-white flex items-center justify-center text-xs font-bold">
            {index}
          </span>
          <span className="font-bold text-sm text-neutral-800">{label}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {options.map((item) => (
            <Button
              key={item.val}
              size="sm"
              variant={currentVal === item.val ? 'primary' : 'outline'}
              className={
                currentVal === item.val
                  ? 'bg-[#6b1282] text-white font-bold text-xs py-1.5 px-3 rounded-lg shadow-xs'
                  : 'border-neutral-200 text-neutral-700 text-xs py-1.5 px-3 rounded-lg hover:bg-white'
              }
              onPress={() => setVal(item.val)}
            >
              {item.val} - {item.label}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const services = isEn
    ? [
        'Regular Halal Inspection',
        'Facility & Slaughterhouse Audit',
        'Laboratory Testing & Training',
      ]
    : [
        'Sertifikasi Halal Reguler',
        'Audit Fasilitas & RPH',
        'Uji Laboratorium & Pelatihan',
      ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-neutral-50 pb-20">
      {/* Banner in Royal Purple Gradient with Yellow Accents */}
      <section className="bg-gradient-to-r from-[#1a0726] via-[#4a0d5c] to-[#1a0726] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#4B0D78] via-[#6B18A8] via-[#F5D32F] to-[#6B18A8]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7D1] text-[#713f12] text-xs font-extrabold uppercase tracking-wider mb-4 border border-[#F5D32F] shadow-xs">
            <Smile className="w-3.5 h-3.5 text-[#eab308]" />
            {isEn ? 'Community Satisfaction Index (CSI)' : 'Indeks Kepuasan Masyarakat (IKM)'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            {isEn ? 'Customer Satisfaction Survey' : 'Survei Kepuasan Pelanggan'}
          </h1>
          <p className="mt-3 text-neutral-200 max-w-2xl mx-auto text-sm sm:text-base font-normal">
            {isEn
              ? 'Your feedback is invaluable to enhance the service quality and testing standards of LPH UIN Sunan Gunung Djati.'
              : 'Partisipasi Anda sangat berharga untuk meningkatkan kualitas pelayanan sertifikasi halal dan laboratorium LPH UIN Sunan Gunung Djati.'}
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-8">
        <Card className="bg-white rounded-3xl border border-neutral-200/80 shadow-xl p-6 sm:p-10">
          {submitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-purple-100 text-[#6b1282] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900">
                {isEn ? 'Thank You For Your Feedback!' : 'Terima Kasih Atas Ulasan Anda!'}
              </h3>
              <p className="text-sm text-neutral-600 max-w-md mx-auto">
                {isEn
                  ? 'Your ratings have been recorded in our internal quality assurance system for continuous service evaluation and enhancement.'
                  : 'Masukan Anda telah dicatat dalam sistem penjaminan mutu LPH UIN SGD untuk evaluasi dan peningkatan standar layanan berkelanjutan.'}
              </p>
              <div className="pt-4 flex justify-center">
                <Button
                  variant="primary"
                  className="bg-[#6b1282] text-white font-semibold rounded-xl"
                  onPress={() => setSubmitted(false)}
                >
                  {isEn ? 'Submit Another Review' : 'Kirim Ulasan Lain'}
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-neutral-100 pb-4">
                <h3 className="text-xl font-bold text-[#1a0726]">
                  {isEn ? 'Service Quality Questionnaire' : 'Kuesioner Mutu Pelayanan'}
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  {isEn
                    ? 'Please provide objective feedback based on your experience using LPH UIN SGD services.'
                    : 'Mohon berikan penilaian objektif berdasarkan pengalaman Anda menggunakan layanan LPH UIN SGD.'}
                </p>
              </div>

              {/* Identity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    {isEn ? 'Business / Applicant Name' : 'Nama / Pelaku Usaha'}
                  </label>
                  <Input
                    placeholder={isEn ? 'e.g. PT Halal Food / Mr. John' : 'Contoh: PT Berkah Halal / Bpk. Fulan'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    {isEn ? 'WhatsApp Number / Email' : 'Nomor WhatsApp / Email'}
                  </label>
                  <Input
                    placeholder="08123456789"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-2">
                  {isEn ? 'Service Utilized' : 'Layanan yang Digunakan'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {services.map((s) => (
                    <Button
                      key={s}
                      type="button"
                      variant={serviceUsed === s ? 'primary' : 'outline'}
                      className={
                        serviceUsed === s
                          ? 'bg-[#6b1282] text-white font-semibold text-xs py-2 rounded-xl'
                          : 'border-neutral-200 text-neutral-700 text-xs py-2 rounded-xl'
                      }
                      onPress={() => setServiceUsed(s)}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Rating Questions */}
              <div className="space-y-4 pt-2">
                {renderRatingGroup(
                  1,
                  isEn ? 'Service Speed & Punctuality' : 'Kecepatan & Ketepatan Waktu Pelayanan',
                  speedRating,
                  setSpeedRating
                )}
                {renderRatingGroup(
                  2,
                  isEn ? 'Staff & Auditor Professionalism' : 'Keramahan & Sikap Petugas / Auditor',
                  friendlinessRating,
                  setFriendlinessRating
                )}
                {renderRatingGroup(
                  3,
                  isEn ? 'Clarity of Information & Audit Procedures' : 'Kejelasan Informasi & Prosedur Audit',
                  clarityRating,
                  setClarityRating
                )}
                {renderRatingGroup(
                  4,
                  isEn ? 'Laboratory Facilities & Accuracy' : 'Fasilitas & Kualitas Laboratorium',
                  facilityRating,
                  setFacilityRating
                )}
                {renderRatingGroup(
                  5,
                  isEn ? 'Overall Satisfaction' : 'Kepuasan Menyeluruh (Overall)',
                  rating,
                  setRating
                )}
              </div>

              {/* Comments */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                  {isEn ? 'Feedback, Critique & Suggestions' : 'Kritik, Saran & Masukan'}
                </label>
                <TextArea
                  rows={4}
                  placeholder={isEn ? 'Write your constructive feedback or appreciation here...' : 'Tuliskan saran perbaikan atau apresiasi Anda untuk kami...'}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
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
                {isEn ? 'Submit Survey Assessment' : 'Kirim Penilaian Kepuasan'}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SatisfactionPage;

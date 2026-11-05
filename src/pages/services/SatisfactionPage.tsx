import React, { useState } from 'react';
import { Button, Card, Input, TextArea } from '@heroui/react';
import { Smile, CheckCircle2, Star, ThumbsUp, ArrowRight } from 'lucide-react';
import { api } from '@/services/api';

export const SatisfactionPage: React.FC = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [serviceUsed, setServiceUsed] = useState('Pemeriksaan Kehalalan Produk Reguler');
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
    const options = [
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

  return (
    <div className="flex flex-col w-full min-h-screen bg-neutral-50 pb-20">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#1a0726] via-[#4a0d5c] to-[#1a0726] text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20 shadow-xs">
            <Smile className="w-3.5 h-3.5 text-purple-300" />
            Indeks Kepuasan Masyarakat (IKM)
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Survei Kepuasan Pelanggan
          </h1>
          <p className="mt-3 text-neutral-200 max-w-2xl mx-auto text-sm sm:text-base font-normal">
            Partisipasi Anda sangat berharga untuk meningkatkan kualitas pelayanan sertifikasi halal dan laboratorium LPH UIN Sunan Gunung Djati.
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
                Terima Kasih Atas Ulasan Anda!
              </h3>
              <p className="text-sm text-neutral-600 max-w-md mx-auto">
                Masukan Anda telah dicatat dalam sistem penjaminan mutu LPH UIN SGD untuk evaluasi dan peningkatan standar layanan berkelanjutan.
              </p>
              <div className="pt-4 flex justify-center">
                <Button
                  variant="primary"
                  className="bg-[#272353] text-white font-semibold rounded-xl"
                  onPress={() => setSubmitted(false)}
                >
                  Kirim Ulasan Lain
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-neutral-100 pb-4">
                <h3 className="text-xl font-bold text-[#272353]">
                  Kuesioner Mutu Pelayanan
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Mohon berikan penilaian objektif berdasarkan pengalaman Anda menggunakan layanan LPH UIN SGD.
                </p>
              </div>

              {/* Identity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Nama / Pelaku Usaha
                  </label>
                  <Input
                    placeholder="Contoh: PT Berkah Halal / Bpk. Fulan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Nomor WhatsApp / Email
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
                  Layanan yang Digunakan
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    'Sertifikasi Halal Reguler',
                    'Pendampingan Self Declare',
                    'Uji Laboratorium & Pelatihan',
                  ].map((s) => (
                    <Button
                      key={s}
                      type="button"
                      variant={serviceUsed === s ? 'primary' : 'outline'}
                      className={
                        serviceUsed === s
                          ? 'bg-[#272353] text-white font-semibold text-xs py-2 rounded-xl'
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
                {renderRatingGroup(1, 'Kecepatan & Ketepatan Waktu Pelayanan', speedRating, setSpeedRating)}
                {renderRatingGroup(2, 'Keramahan & Sikap Petugas / Auditor', friendlinessRating, setFriendlinessRating)}
                {renderRatingGroup(3, 'Kejelasan Informasi & Prosedur Audit', clarityRating, setClarityRating)}
                {renderRatingGroup(4, 'Fasilitas & Kualitas Laboratorium', facilityRating, setFacilityRating)}
                {renderRatingGroup(5, 'Kepuasan Menyeluruh (Overall)', rating, setRating)}
              </div>

              {/* Comments */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                  Kritik, Saran &amp; Masukan
                </label>
                <TextArea
                  rows={4}
                  placeholder="Tuliskan saran perbaikan atau apresiasi Anda untuk kami..."
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
                className="bg-[#005a36] hover:bg-[#00472a] text-white font-bold py-3 rounded-xl shadow-md text-sm"
              >
                Kirim Penilaian Kepuasan
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SatisfactionPage;

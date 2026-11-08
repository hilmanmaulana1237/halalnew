import React, { useState } from 'react';
import { Button, Card, Input, TextArea } from '@heroui/react';
import { Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const ContactPage: React.FC = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-neutral-50 pb-20">
      {/* Banner in Royal Purple Gradient with Yellow Accents */}
      <section className="bg-gradient-to-r from-[#1a0726] via-[#4a0d5c] to-[#1a0726] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#4B0D78] via-[#6B18A8] via-[#F5D32F] to-[#6B18A8]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7D1] text-[#713f12] text-xs font-extrabold uppercase tracking-wider mb-4 border border-[#F5D32F] shadow-xs">
            <Phone className="w-3.5 h-3.5 text-[#eab308]" />
            {isEn ? 'Communication & Partnerships' : 'Layanan Komunikasi & Kemitraan'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            {isEn ? 'Contact Halal Center UIN SGD' : 'Hubungi Halal Center UIN SGD'}
          </h1>
          <p className="mt-3 text-neutral-200 max-w-2xl mx-auto text-sm sm:text-base font-normal">
            {isEn
              ? 'We are ready to assist your regular halal certification, laboratory testing, auditor training, and industrial partnerships.'
              : 'Kami siap mendampingi kebutuhan sertifikasi halal reguler, pengujian laboratorium saintifik, hingga pelatihan kompetensi industri.'}
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Info Card (Col 5) */}
          <div className="lg:col-span-5">
            <Card className="bg-white rounded-3xl border border-neutral-200/80 shadow-md p-6 sm:p-8 space-y-6 h-full">
              <div className="border-b border-neutral-100 pb-4">
                <span className="text-xs font-bold text-[#6b1282] uppercase tracking-wider">
                  {isEn ? 'SECRETARIAT & LABORATORY' : 'SEKRETARIAT & LABORATORIUM'}
                </span>
                <h3 className="text-xl font-bold text-[#1a0726] mt-1">
                  {isEn ? 'LPH UIN SGD Headquarters' : 'Kantor Pusat LPH UIN SGD'}
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#6b1282] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-neutral-900">{isEn ? 'Office & Lab Addresses' : 'Alamat Kantor & Lab'}</h5>
                    <p className="text-neutral-600 mt-1">
                      <strong>{isEn ? 'Campus 1 (Secretariat):' : 'Kampus 1 (Sekretariat):'}</strong> Lecture Hall Lt. 1, Jl. A.H. Nasution No. 105, Cibiru, Bandung 40614
                    </p>
                    <p className="text-neutral-600 mt-1">
                      <strong>{isEn ? 'Campus 2 (Integrated Lab):' : 'Kampus 2 (Lab Terpadu):'}</strong> Research &amp; Integrated Lab Bldg, Jl. Cimencrang, Gedebage, Bandung 40294
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#6b1282] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-neutral-900">{isEn ? 'Telephone & WhatsApp' : 'Telepon & WhatsApp'}</h5>
                    <p className="text-neutral-600 mt-1">
                      {isEn ? 'Official WhatsApp:' : 'WA Resmi:'}{' '}
                      <a href="https://wa.me/6282126493700" className="text-[#6b1282] font-bold hover:underline">
                        +62 821-2649-3700
                      </a>
                    </p>
                    <p className="text-neutral-600">{isEn ? 'Office Phone: (022) 7800525' : 'Telepon Kantor: (022) 7800525'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#6b1282] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-neutral-900">{isEn ? 'Official Email' : 'Email Resmi'}</h5>
                    <a href="mailto:halal@uinsgd.ac.id" className="text-[#6b1282] hover:underline">
                      halal@uinsgd.ac.id
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#6b1282] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-neutral-900">{isEn ? 'Operating Hours' : 'Jam Operasional Layanan'}</h5>
                    <p className="text-neutral-600 mt-1">
                      {isEn ? 'Monday – Friday: 08:00 AM – 04:00 PM WIB' : 'Senin – Jumat: 08.00 – 16.00 WIB'}
                    </p>
                    <p className="text-neutral-400 text-xs">
                      {isEn ? 'Saturday, Sunday & Public Holidays: Closed' : 'Sabtu, Minggu & Hari Libur Nasional: Tutup'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100">
                <a
                  href="https://wa.me/6282126493700"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="primary"
                    fullWidth
                    className="bg-[#6b1282] hover:bg-[#581c87] text-white font-bold py-2.5 rounded-xl shadow-xs text-xs sm:text-sm flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    {isEn ? 'Chat Directly via WhatsApp' : 'Chat Langsung via WhatsApp'}
                  </Button>
                </a>
              </div>
            </Card>
          </div>

          {/* Form Card (Col 7) */}
          <div className="lg:col-span-7">
            <Card className="bg-white rounded-3xl border border-neutral-200/80 shadow-md p-6 sm:p-8">
              {sent ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-purple-100 text-[#6b1282] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900">
                    {isEn ? 'Your Message Has Been Sent!' : 'Pesan Anda Telah Terkirim!'}
                  </h3>
                  <p className="text-sm text-neutral-600 max-w-md mx-auto">
                    {isEn
                      ? 'The Secretariat team of LPH UIN SGD will reply promptly to your inquiry.'
                      : 'Tim Sekretariat LPH UIN SGD akan segera membalas pertanyaan atau permohonan Anda ke kontak yang telah dicantumkan.'}
                  </p>
                  <Button
                    variant="primary"
                    className="bg-[#6b1282] text-white rounded-xl"
                    onPress={() => setSent(false)}
                  >
                    {isEn ? 'Send Another Message' : 'Kirim Pesan Lain'}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-neutral-100 pb-3">
                    <span className="text-xs font-bold text-[#6b1282] uppercase tracking-wider">
                      {isEn ? 'INQUIRY FORM' : 'FORMULIR PERTANYAAN'}
                    </span>
                    <h3 className="text-xl font-bold text-[#1a0726] mt-1">
                      {isEn ? 'Send a Direct Message' : 'Kirim Pesan Langsung'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                        {isEn ? 'Full Name' : 'Nama Lengkap'}
                      </label>
                      <Input
                        placeholder={isEn ? 'Your full name...' : 'Nama Anda...'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                        {isEn ? 'Email Address' : 'Email'}
                      </label>
                      <Input
                        type="email"
                        placeholder="nama@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                        {isEn ? 'WhatsApp Number' : 'Nomor WhatsApp'}
                      </label>
                      <Input
                        placeholder="08123456789"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                        {isEn ? 'Subject / Inquiry Area' : 'Subjek Kepentingan'}
                      </label>
                      <Input
                        placeholder={isEn ? 'e.g. Regular Halal Audit for Bakery' : 'Contoh: Audit Halal Reguler Pabrik Roti'}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      {isEn ? 'Message / Details' : 'Isi Pesan / Pertanyaan'}
                    </label>
                    <TextArea
                      rows={5}
                      placeholder={isEn ? 'Provide full details of your halal certification, lab testing, or audit inquiry...' : 'Tuliskan secara lengkap kebutuhan sertifikasi halal, pengujian lab, atau layanan audit Anda...'}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    className="bg-[#6B18A8] hover:bg-[#58138a] text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-purple-950/20 text-sm cursor-pointer hover:scale-[1.01] transition-all"
                  >
                    {isEn ? 'Send Message' : 'Kirimkan Pesan'}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

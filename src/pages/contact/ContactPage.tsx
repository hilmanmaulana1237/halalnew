import React, { useState } from 'react';
import { Button, Card, Input, TextArea } from '@heroui/react';
import { Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';

export const ContactPage: React.FC = () => {
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
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#1a0726] via-[#4a0d5c] to-[#1a0726] text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20 shadow-xs">
            <Phone className="w-3.5 h-3.5" />
            Layanan Komunikasi &amp; Kemitraan
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Hubungi Halal Center UIN SGD
          </h1>
          <p className="mt-3 text-neutral-200 max-w-2xl mx-auto text-sm sm:text-base font-normal">
            Kami siap mendampingi kebutuhan sertifikasi halal reguler, program Self Declare, uji laboratorium, hingga kerja sama pelatihan industri.
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
                  SEKRETARIAT &amp; LABORATORIUM
                </span>
                <h3 className="text-xl font-bold text-[#1a0726] mt-1">
                  Kantor Pusat LPH UIN SGD
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#6b1282] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-neutral-900">Alamat Kantor &amp; Lab</h5>
                    <p className="text-neutral-600 mt-1">
                      <strong>Kampus 1 (Sekretariat):</strong> Gedung Lecture Hall Lt. 1, Jl. A.H. Nasution No. 105, Cibiru, Bandung 40614
                    </p>
                    <p className="text-neutral-600 mt-1">
                      <strong>Kampus 2 (Lab Terpadu):</strong> Gedung Riset &amp; Laboratorium Terpadu, Jl. Cimencrang, Gedebage, Bandung 40294
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#6b1282] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-neutral-900">Telepon &amp; WhatsApp</h5>
                    <p className="text-neutral-600 mt-1">
                      WA Resmi:{' '}
                      <a href="https://wa.me/6282118201232" className="text-[#6b1282] font-bold hover:underline">
                        +62 821 1820 1232
                      </a>
                    </p>
                    <p className="text-neutral-600">Telepon Kantor: (022) 7800525</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#6b1282] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-neutral-900">Email Resmi</h5>
                    <a href="mailto:halal@uinsgd.ac.id" className="text-[#6b1282] hover:underline">
                      halal@uinsgd.ac.id
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#6b1282] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-neutral-900">Jam Operasional Layanan</h5>
                    <p className="text-neutral-600 mt-1">
                      Senin – Jumat: 08.00 – 16.00 WIB
                    </p>
                    <p className="text-neutral-400 text-xs">Sabtu, Minggu &amp; Hari Libur Nasional: Tutup</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100">
                <a
                  href="https://wa.me/6282118201232"
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
                    Chat Langsung via WhatsApp
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
                    Pesan Anda Telah Terkirim!
                  </h3>
                  <p className="text-sm text-neutral-600 max-w-md mx-auto">
                    Tim Sekretariat LPH UIN SGD akan segera membalas pertanyaan atau permohonan Anda ke kontak yang telah dicantumkan.
                  </p>
                  <Button
                    variant="primary"
                    className="bg-[#6b1282] text-white rounded-xl"
                    onPress={() => setSent(false)}
                  >
                    Kirim Pesan Lain
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-neutral-100 pb-3">
                    <span className="text-xs font-bold text-[#6b1282] uppercase tracking-wider">
                      FORMULIR PERTANYAAN
                    </span>
                    <h3 className="text-xl font-bold text-[#1a0726] mt-1">
                      Kirim Pesan Langsung
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                        Nama Lengkap
                      </label>
                      <Input
                        placeholder="Nama Anda..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                        Email
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
                        Nomor WhatsApp
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
                        Subjek Kepentingan
                      </label>
                      <Input
                        placeholder="Contoh: Audit Halal Reguler Pabrik Roti"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      Isi Pesan / Pertanyaan
                    </label>
                    <TextArea
                      rows={5}
                      placeholder="Tuliskan secara lengkap kebutuhan sertifikasi halal, pengujian lab, atau pendampingan Anda..."
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
                    className="bg-[#6b1282] hover:bg-[#581c87] text-white font-bold py-3 rounded-xl shadow-md text-sm"
                  >
                    Kirimkan Pesan
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

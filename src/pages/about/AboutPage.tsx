import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Modal } from '@heroui/react';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  GraduationCap, 
  ShieldCheck, 
  Sparkles, 
  Target, 
  Users, 
  ArrowRight,
  ExternalLink 
} from 'lucide-react';
import { motion } from 'motion/react';
import { SectionHeader } from '@/components/ui/section-header';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { SparklesCore } from '@/components/ui/sparkles';
import { DIRECTORS } from '../home/HomePage';

export const AboutPage: React.FC = () => {
  const [selectedDirector, setSelectedDirector] = useState<any | null>(null);

  const values = [
    {
      title: 'Integritas Syar’i',
      desc: 'Menegakkan standar kepatuhan halal berlandaskan fatwa MUI dan regulasi jaminan produk halal secara mutlak dan terpercaya.',
      icon: <ShieldCheck className="w-6 h-6 text-[#6b1282]" />,
      accent: 'border-purple-200 bg-purple-50/40 text-[#6b1282]',
      spotlight: '#6b1282',
    },
    {
      title: 'Keunggulan Saintifik',
      desc: 'Didukung laboratorium pengujian modern (qPCR, GC-FID) berstandar ISO/IEC 17025 untuk validasi molekuler bahan kritis.',
      icon: <Sparkles className="w-6 h-6 text-[#005a36]" />,
      accent: 'border-emerald-200 bg-emerald-50/40 text-[#005a36]',
      spotlight: '#10b981',
    },
    {
      title: 'Inklusivitas UMK',
      desc: 'Mendampingi ribuan pelaku usaha mikro dan kecil melalui program Sertifikasi Halal Gratis (SEHATI) di seluruh Jawa Barat.',
      icon: <Users className="w-6 h-6 text-[#0284c7]" />,
      accent: 'border-sky-200 bg-sky-50/40 text-[#0284c7]',
      spotlight: '#0284c7',
    },
    {
      title: 'Sinergi Kolaboratif',
      desc: 'Menjalin kemitraan erat bersama BPJPH, Kementerian Agama RI, KAN, MUI, dinas terkait, serta perguruan tinggi global.',
      icon: <Award className="w-6 h-6 text-[#f59e0b]" />,
      accent: 'border-amber-200 bg-amber-50/40 text-amber-700',
      spotlight: '#f59e0b',
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Hero Banner in LPH Royal Purple & Emerald Gradient with Sparkles */}
      <section className="relative py-20 lg:py-28 bg-[#1b183a] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6b1282] via-[#4a0d5c] to-[#005a36]/80 opacity-95" />
        <SparklesCore
          id="about-sparkles"
          minSize={0.7}
          maxSize={2.2}
          particleDensity={35}
          particleColor={['#c084fc', '#34d399', '#38bdf8', '#fbbf24', '#ffffff']}
        />
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
            <BookOpen className="w-3.5 h-3.5" />
            Profil &amp; Sejarah Lembaga
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            Tentang Halal Center UIN SGD Bandung
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-200 max-w-3xl mx-auto leading-relaxed font-normal">
            Menegakkan ekosistem halal terpadu berbasis paradigma <em>"Halalsphere University"</em> melalui riset saintifik, pemeriksaan reguler, pendampingan UMK, dan laboratorium presisi tinggi.
          </p>
        </div>
      </section>

      {/* Profil & Sejarah Section with BackgroundGradient */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <BackgroundGradient className="rounded-[22px] p-2 bg-white">
                <div className="relative rounded-2xl overflow-hidden bg-white p-3">
                  <img
                    src="/assets/images/certificate.png"
                    alt="Sertifikat Akreditasi LPH UIN SGD"
                    className="w-full h-auto object-cover rounded-xl"
                  />
                </div>
              </BackgroundGradient>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-black text-[#6b1282] uppercase tracking-wider">
                SEJARAH &amp; KILAS BALIK
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1b183a] tracking-tight">
                Dedikasi Berkelanjutan Bagi Akselerasi Industri Halal
              </h2>
              <p className="text-neutral-600 text-base leading-relaxed">
                Pusat Halal (Halal Center) Universitas Islam Negeri Sunan Gunung Djati Bandung didirikan sebagai wujud nyata pengabdian perguruan tinggi keagamaan Islam negeri dalam menjawab amanat Undang-Undang No. 33 Tahun 2014 tentang Jaminan Produk Halal.
              </p>
              <p className="text-neutral-600 text-base leading-relaxed">
                Dengan mengusung paradigma <strong className="text-[#6b1282]">“Halalsphere University”</strong>, Halal Center UIN SGD tidak sekadar menjadi lembaga administratif, melainkan episentrum keilmuan halal yang memadukan riset biologi molekuler, teknologi pangan, kajian fikih kontemporer, dan penguatan ekonomi kerakyatan.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link to="/layanan/kalkulator">
                  <Button variant="primary" className="bg-[#6b1282] hover:bg-[#581c87] text-white font-bold rounded-xl px-6 py-2.5 shadow-md">
                    Hitung Estimasi Biaya Halal
                  </Button>
                </Link>
                <Link to="/kontak">
                  <Button variant="outline" className="border-neutral-300 text-neutral-700 font-bold rounded-xl px-6 py-2.5">
                    Hubungi Sekretariat
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi in Jewel Cards */}
      <section className="py-20 bg-neutral-50/80 border-y border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="ARAH STRATEGIS"
            badgeColor="emerald"
            title="Visi &amp; Misi Halal Center UIN SGD"
            subtitle="Landasan dan tujuan mulia dalam mengabdi kepada bangsa dan umat muslim dunia."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="rounded-3xl p-8 bg-white border border-purple-200/80 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#6b1282] flex items-center justify-center mb-6 shadow-xs">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-[#1b183a] mb-4">Visi Utama</h3>
                <p className="text-neutral-600 leading-relaxed text-base font-normal">
                  "Menjadi Lembaga Pemeriksa Halal (LPH) dan Pusat Kajian Halal bereputasi internasional, unggul dalam sains autentikasi halal, berintegritas syar'i, dan terdepan dalam pemberdayaan UMK menuju Indonesia Pusat Halal Dunia."
                </p>
              </div>
            </Card>

            <Card className="rounded-3xl p-8 bg-white border border-emerald-200/80 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#005a36] flex items-center justify-center mb-6 shadow-xs">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-[#1b183a] mb-4">Misi Strategis</h3>
                <ul className="space-y-3 text-neutral-600 text-sm">
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#005a36] mt-2 shrink-0" />
                    Menyelenggarakan pemeriksaan kehalalan produk yang profesional, akuntabel, dan tepat waktu.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#005a36] mt-2 shrink-0" />
                    Mengembangkan laboratorium uji kehalalan berbasis teknologi mutakhir dan standar ISO 17025.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#005a36] mt-2 shrink-0" />
                    Mendampingi serta mengedukasi pelaku usaha mikro, kecil, dan menengah secara berkesinambungan.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#005a36] mt-2 shrink-0" />
                    Menerbitkan hasil riset internasional melalui Indonesian Journal of Halal Research (IJHR).
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Nilai-Nilai Inti (Multi-Color Jewel Values) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="NILAI BUDAYA"
            badgeColor="purple"
            title="Prinsip &amp; Tata Nilai Kerja Lembaga"
            subtitle="Menjunjung tinggi standar etika syariat dan keilmuan profesional."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <CardSpotlight
                  color={val.spotlight}
                  className={`h-full ${val.accent} flex flex-col justify-between p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center mb-4">
                      {val.icon}
                    </div>
                    <h4 className="font-extrabold text-lg text-neutral-900 mb-2">{val.title}</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed font-normal">{val.desc}</p>
                  </div>
                </CardSpotlight>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Showcase */}
      <section className="py-20 bg-[#1b183a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-purple-400">
              DEWAN PIMPINAN
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
              Pimpinan &amp; Pengarah Lembaga
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {DIRECTORS.map((dir) => (
              <div
                key={dir.id}
                onClick={() => setSelectedDirector(dir)}
                className="p-6 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-pointer flex items-center gap-5 hover:border-purple-400/50"
              >
                <img
                  src={dir.image}
                  alt={dir.name}
                  className="w-20 h-20 rounded-2xl object-cover object-top border-2 border-purple-400/50 shadow-md"
                />
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase">
                    {dir.position}
                  </span>
                  <h3 className="text-base font-extrabold text-white mt-1">{dir.name}</h3>
                  <span className="text-xs text-purple-300 mt-2 flex items-center gap-1 hover:text-white">
                    Buka Profil Detail <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Director Detail using HeroUI v3 Modal */}
        {selectedDirector && (
          <Modal.Backdrop isOpen={!!selectedDirector} onOpenChange={() => setSelectedDirector(null)}>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-[600px] bg-white text-neutral-900 rounded-3xl p-6 sm:p-8">
                <Modal.CloseTrigger />
                <Modal.Header className="pb-4 border-b border-neutral-100">
                  <span className="text-xs font-black text-[#6b1282] uppercase tracking-wider">
                    {selectedDirector.position}
                  </span>
                  <Modal.Heading className="text-2xl font-black text-[#1b183a]">
                    {selectedDirector.name}
                  </Modal.Heading>
                </Modal.Header>

                <Modal.Body className="py-6 space-y-4 max-h-[70vh] overflow-y-auto">
                  <div className="flex gap-4 items-center bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                    <img
                      src={selectedDirector.image}
                      alt={selectedDirector.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <p className="text-xs text-neutral-600 italic">"{selectedDirector.quote}"</p>
                  </div>
                  <div>
                    <h5 className="font-extrabold text-xs uppercase tracking-wider text-[#6b1282] mb-2">
                      Pendidikan &amp; Kualifikasi
                    </h5>
                    <ul className="text-xs text-neutral-600 list-disc pl-4 space-y-1">
                      {selectedDirector.education.map((e: string, i: number) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </div>
                </Modal.Body>
                <Modal.Footer className="pt-4 border-t border-neutral-100">
                  <Button
                    variant="primary"
                    className="w-full bg-[#6b1282] hover:bg-[#581c87] text-white font-bold rounded-xl"
                    onPress={() => setSelectedDirector(null)}
                  >
                    Tutup
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        )}
      </section>
    </div>
  );
};

export default AboutPage;

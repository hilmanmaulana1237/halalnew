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
import { YellowHighlight, YellowDotGrid } from '@/components/ui/decorative-shapes';
import { getDirectors } from '../home/HomePage';
import { useLanguage } from '@/context/LanguageContext';

export const AboutPage: React.FC = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  const directors = getDirectors(isEn);
  const [selectedDirector, setSelectedDirector] = useState<any | null>(null);

  const values = isEn
    ? [
        {
          title: 'Sharia Integrity',
          desc: 'Upholding halal compliance standards based on MUI fatwas and halal product assurance regulations unconditionally and reliably.',
          icon: <ShieldCheck className="w-6 h-6 text-[#6b1282]" />,
          accent: 'border-purple-100 bg-white hover:bg-purple-50/20 text-[#6b1282]',
          spotlight: '#6b1282',
        },
        {
          title: 'Scientific Excellence',
          desc: 'Supported by modern testing laboratories (qPCR, GC-FID) accredited to ISO/IEC 17025 for molecular validation of critical ingredients.',
          icon: <Sparkles className="w-6 h-6 text-[#6b1282]" />,
          accent: 'border-purple-100 bg-white hover:bg-purple-50/20 text-[#6b1282]',
          spotlight: '#6b1282',
        },
        {
          title: 'Professional Competence',
          desc: 'Equipping lead auditors, halal supervisors, and slaughterers (Juleha) with certified national competencies to ensure audit excellence.',
          icon: <GraduationCap className="w-6 h-6 text-[#6b1282]" />,
          accent: 'border-purple-100 bg-white hover:bg-purple-50/20 text-[#6b1282]',
          spotlight: '#6b1282',
        },
        {
          title: 'Collaborative Synergy',
          desc: 'Fostering close partnerships with BPJPH, Ministry of Religious Affairs, KAN, MUI, regional agencies, and global universities.',
          icon: <Award className="w-6 h-6 text-[#6b1282]" />,
          accent: 'border-purple-100 bg-white hover:bg-purple-50/20 text-[#6b1282]',
          spotlight: '#6b1282',
        },
      ]
    : [
        {
          title: 'Integritas Syar’i',
          desc: 'Menegakkan standar kepatuhan halal berlandaskan fatwa MUI dan regulasi jaminan produk halal secara mutlak dan terpercaya.',
          icon: <ShieldCheck className="w-6 h-6 text-[#6b1282]" />,
          accent: 'border-purple-100 bg-white hover:bg-purple-50/20 text-[#6b1282]',
          spotlight: '#6b1282',
        },
        {
          title: 'Keunggulan Saintifik',
          desc: 'Didukung laboratorium pengujian modern (qPCR, GC-FID) berstandar ISO/IEC 17025 untuk validasi molekuler bahan kritis.',
          icon: <Sparkles className="w-6 h-6 text-[#6b1282]" />,
          accent: 'border-purple-100 bg-white hover:bg-purple-50/20 text-[#6b1282]',
          spotlight: '#6b1282',
        },
        {
          title: 'Kompetensi Profesional',
          desc: 'Membekali lead auditor, penyelia halal, dan juru sembelih (Juleha) dengan sertifikasi kompetensi nasional guna menjaga mutu audit.',
          icon: <GraduationCap className="w-6 h-6 text-[#6b1282]" />,
          accent: 'border-purple-100 bg-white hover:bg-purple-50/20 text-[#6b1282]',
          spotlight: '#6b1282',
        },
        {
          title: 'Sinergi Kolaboratif',
          desc: 'Menjalin kemitraan erat bersama BPJPH, Kementerian Agama RI, KAN, MUI, dinas terkait, serta perguruan tinggi global.',
          icon: <Award className="w-6 h-6 text-[#6b1282]" />,
          accent: 'border-purple-100 bg-white hover:bg-purple-50/20 text-[#6b1282]',
          spotlight: '#6b1282',
        },
      ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Hero Banner in Royal Purple Gradient with Sparkles & Yellow Accents */}
      <section className="relative py-20 lg:py-28 bg-[#1a0726] text-white overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#4B0D78] via-[#6B18A8] via-[#F5D32F] to-[#6B18A8]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0726] via-[#4a0d5c] to-[#1a0726] opacity-95" />
        <SparklesCore
          id="about-sparkles"
          minSize={0.7}
          maxSize={2.2}
          particleDensity={35}
          particleColor={['#ffffff', '#f5d0fe', '#F5D32F', '#d8b4fe']}
        />
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7D1] text-[#713f12] text-xs font-extrabold uppercase tracking-wider mb-4 border border-[#F5D32F] shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-[#eab308]" />
            {isEn ? 'Institutional Profile & History' : 'Profil & Sejarah Lembaga'}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-2xl leading-tight">
            {isEn ? (
              <>About <span className="text-[#F5D32F]">Halal Center</span> UIN SGD Bandung</>
            ) : (
              <>Tentang <span className="text-[#F5D32F]">Halal Center</span> UIN SGD Bandung</>
            )}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-200 max-w-3xl mx-auto leading-relaxed font-normal">
            {isEn
              ? 'Advancing an integrated halal ecosystem based on the "Halalsphere University" paradigm through scientific research, regular audits, professional competency training, and precision laboratories.'
              : 'Menegakkan ekosistem halal terpadu berbasis paradigma "Halalsphere University" melalui riset saintifik, pemeriksaan reguler, pelatihan kompetensi, dan laboratorium presisi tinggi.'}
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
                  <div className="mt-3 flex items-center justify-between text-xs font-bold text-neutral-600 px-1">
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      {isEn ? 'Official BPJPH Accredited' : 'Akreditasi Resmi BPJPH'}
                    </span>
                    <span className="text-[#6b1282] font-mono">No. Reg: LPH-018-ID</span>
                  </div>
                </div>
              </BackgroundGradient>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-black text-[#6b1282] uppercase tracking-wider">
                {isEn ? 'HISTORY & MILESTONES' : 'SEJARAH & KILAS BALIK'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1b183a] tracking-tight">
                {isEn
                  ? 'Sustainable Dedication to Halal Industry Acceleration'
                  : 'Dedikasi Berkelanjutan Bagi Akselerasi Industri Halal'}
              </h2>
              <p className="text-neutral-600 text-base leading-relaxed">
                {isEn
                  ? 'The Halal Center of State Islamic University Sunan Gunung Djati Bandung was founded as a concrete manifestation of higher education service to fulfill the mandate of Law No. 33 of 2014 concerning Halal Product Assurance.'
                  : 'Pusat Halal (Halal Center) Universitas Islam Negeri Sunan Gunung Djati Bandung didirikan sebagai wujud nyata pengabdian perguruan tinggi keagamaan Islam negeri dalam menjawab amanat Undang-Undang No. 33 Tahun 2014 tentang Jaminan Produk Halal.'}
              </p>
              <p className="text-neutral-600 text-base leading-relaxed">
                {isEn
                  ? 'Embodying the "Halalsphere University" paradigm, Halal Center UIN SGD is more than an administrative entity; it is a scientific hub uniting molecular biology research, food technology, contemporary Islamic jurisprudence, and grassroots economic empowerment.'
                  : 'Dengan mengusung paradigma “Halalsphere University”, Halal Center UIN SGD tidak sekadar menjadi lembaga administratif, melainkan episentrum keilmuan halal yang memadukan riset biologi molekuler, teknologi pangan, kajian fikih kontemporer, dan penguatan ekonomi kerakyatan.'}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link to="/layanan/kalkulator">
                  <Button variant="primary" className="bg-[#6b1282] hover:bg-[#581c87] text-white font-bold rounded-xl px-6 py-2.5 shadow-md">
                    {t('nav_calc_fee')}
                  </Button>
                </Link>
                <Link to="/kontak">
                  <Button variant="outline" className="border-neutral-300 text-neutral-700 font-bold rounded-xl px-6 py-2.5 hover:bg-neutral-100">
                    {isEn ? 'Contact Secretariat' : 'Hubungi Sekretariat'}
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
            badge={isEn ? 'STRATEGIC DIRECTION' : 'ARAH STRATEGIS'}
            badgeColor="emerald"
            title={isEn ? 'Vision & Mission of Halal Center UIN SGD' : 'Visi & Misi Halal Center UIN SGD'}
            subtitle={isEn ? 'Noble foundation and purpose in serving the nation and global Muslim community.' : 'Landasan dan tujuan mulia dalam mengabdi kepada bangsa dan umat muslim dunia.'}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="rounded-3xl p-8 bg-white border border-purple-200/80 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#6b1282] flex items-center justify-center mb-6 shadow-xs">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#1a0726] mb-4">
                  {isEn ? 'Core Vision' : 'Visi Utama'}
                </h3>
                <p className="text-neutral-600 leading-relaxed text-base font-normal">
                  {isEn
                    ? '"To become an internationally reputable Halal Inspection Agency (LPH) and Halal Study Center, leading in halal authentication science, sharia integrity, and MSE empowerment towards Indonesia as the Global Halal Hub."'
                    : '"Menjadi Lembaga Pemeriksa Halal (LPH) dan Pusat Kajian Halal bereputasi internasional, unggul dalam sains autentikasi halal, berintegritas syar\'i, dan terdepan dalam pemberdayaan UMK menuju Indonesia Pusat Halal Dunia."'}
                </p>
              </div>
            </Card>

            <Card className="rounded-3xl p-8 bg-white border border-purple-100 shadow-md shadow-purple-950/5 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#6b1282] flex items-center justify-center mb-6 shadow-xs">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#1a0726] mb-4">
                  {isEn ? 'Strategic Missions' : 'Misi Strategis'}
                </h3>
                <ul className="space-y-3 text-neutral-600 text-sm">
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#6b1282] mt-2 shrink-0" />
                    {isEn
                      ? 'Conducting professional, accountable, and prompt product halal inspections.'
                      : 'Menyelenggarakan pemeriksaan kehalalan produk yang profesional, akuntabel, dan tepat waktu.'}
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#6b1282] mt-2 shrink-0" />
                    {isEn
                      ? 'Developing state-of-the-art halal testing laboratories under ISO/IEC 17025 standards.'
                      : 'Mengembangkan laboratorium uji kehalalan berbasis teknologi mutakhir dan standar ISO 17025.'}
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#6b1282] mt-2 shrink-0" />
                    {isEn
                      ? 'Continuously mentoring and educating micro, small, and medium business actors.'
                      : 'Mendampingi serta mengedukasi pelaku usaha mikro, kecil, dan menengah secara berkesinambungan.'}
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#6b1282] mt-2 shrink-0" />
                    {isEn
                      ? 'Publishing international research outcomes through the Indonesian Journal of Halal Research (IJHR).'
                      : 'Menerbitkan hasil riset internasional melalui Indonesian Journal of Halal Research (IJHR).'}
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
            badge={isEn ? 'CORE VALUES' : 'NILAI BUDAYA'}
            badgeColor="purple"
            title={isEn ? 'Working Principles & Institutional Values' : 'Prinsip & Tata Nilai Kerja Lembaga'}
            subtitle={isEn ? 'Upholding sharia ethical standards and professional science.' : 'Menjunjung tinggi standar etika syariat dan keilmuan profesional.'}
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

      {/* Leadership Showcase - Modern HeroUI & Aceternity Card Layout */}
      <section className="py-24 bg-[#FAF7FD] border-t border-[#C9A5E8]/30 relative overflow-hidden" id="pimpinan-lembaga">
        <YellowDotGrid rows={4} cols={5} className="absolute top-10 right-8 opacity-25 pointer-events-none hidden lg:grid" dotColor="#F5D32F" />
        <YellowDotGrid rows={3} cols={4} className="absolute bottom-10 left-8 opacity-20 pointer-events-none hidden md:grid" dotColor="#F5D32F" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge={isEn ? 'EXECUTIVE BOARD & PATRON' : 'DEWAN PIMPINAN & PEMBINA'}
            badgeColor="yellow"
            title={isEn ? 'Institutional Leadership & Guidance' : 'Pimpinan & Pengarah Lembaga'}
            subtitle={isEn
              ? 'Synergy between academic excellence, sharia integrity, and halal science guiding Halal Center UIN SGD.'
              : 'Sinergi keunggulan akademik, integritas syariah, dan sains halal dalam mengawal Halal Center UIN SGD.'}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
            {directors.map((dir) => (
              <motion.div
                key={dir.id}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelectedDirector(dir)}
                className="group relative rounded-3xl p-6 sm:p-8 bg-white border border-[#C9A5E8]/40 shadow-lg shadow-purple-950/5 hover:shadow-2xl hover:border-[#6B18A8]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Ambient Top Glow Accent */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#6B18A8] via-[#F5D32F] to-[#6B18A8] opacity-75 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="relative shrink-0">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#C9A5E8]/60 shadow-md group-hover:border-[#6B18A8] transition-colors">
                        <img
                          src={dir.image}
                          alt={dir.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#FFF7D1] border border-[#F5D32F] flex items-center justify-center text-[#713f12] shadow-xs">
                        <Sparkles className="w-2.5 h-2.5 text-[#eab308]" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#FFF7D1] text-[#713f12] border border-[#F5D32F] uppercase tracking-wider mb-2 shadow-2xs">
                        <Sparkles className="w-3 h-3 text-[#eab308]" />
                        <span className="truncate">{dir.id === 1 ? (isEn ? 'Patron & Rector' : 'Dewan Pembina / Rektor') : (isEn ? 'Head of Halal Center' : 'Kepala Halal Center')}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-[#292333] group-hover:text-[#6B18A8] transition-colors leading-snug">
                        {dir.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#756D7C] mt-1 line-clamp-2">
                        {dir.position}
                      </p>
                    </div>
                  </div>

                  {/* Quote Box */}
                  <div className="mt-5 p-4 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 shadow-xs relative">
                    <span className="text-3xl text-[#F5D32F] font-serif absolute top-1 left-3 select-none leading-none">“</span>
                    <p className="text-xs sm:text-sm text-neutral-700 italic leading-relaxed pl-5 font-normal line-clamp-3">
                      "{dir.quote}"
                    </p>
                  </div>
                </div>

                {/* Bottom Action Strip */}
                <div className="mt-6 pt-4 border-t border-[#C9A5E8]/25 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#6B18A8] group-hover:text-[#4B0D78] flex items-center gap-1.5 transition-colors">
                    <span>{isEn ? 'View Profile & Track Record' : 'Buka Profil & Rekam Jejak'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[11px] font-semibold text-neutral-400 group-hover:text-neutral-600 transition-colors">
                    {isEn ? 'Details' : 'Detail'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal Director Detail using HeroUI v3 Modal */}
        {selectedDirector && (
          <Modal.Backdrop isOpen={!!selectedDirector} onOpenChange={() => setSelectedDirector(null)}>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-[620px] bg-white text-neutral-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#C9A5E8]/40">
                <Modal.CloseTrigger />
                <Modal.Header className="pb-4 border-b border-[#C9A5E8]/25">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#FFF7D1] text-[#713f12] border border-[#F5D32F] uppercase tracking-wider mb-2">
                    <Sparkles className="w-3 h-3 text-[#eab308]" />
                    <span>{selectedDirector.position}</span>
                  </div>
                  <Modal.Heading className="text-2xl font-black text-[#292333]">
                    {selectedDirector.name}
                  </Modal.Heading>
                </Modal.Header>

                <Modal.Body className="py-6 space-y-5 max-h-[70vh] overflow-y-auto">
                  <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start bg-[#FAF7FD] p-4 rounded-2xl border border-[#C9A5E8]/30">
                    <img
                      src={selectedDirector.image}
                      alt={selectedDirector.name}
                      className="w-20 h-20 rounded-xl object-cover border border-[#C9A5E8]/50 shadow-xs shrink-0"
                    />
                    <p className="text-xs sm:text-sm text-neutral-700 italic leading-relaxed">
                      "{selectedDirector.quote}"
                    </p>
                  </div>
                  <div>
                    <h5 className="font-extrabold text-xs uppercase tracking-wider text-[#6B18A8] mb-2 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-[#6B18A8]" />
                      <span>{isEn ? 'Education & Academic Qualifications' : 'Pendidikan & Kualifikasi Akademik'}</span>
                    </h5>
                    <ul className="text-xs text-neutral-600 list-disc pl-5 space-y-1.5">
                      {selectedDirector.education.map((e: string, i: number) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </div>
                  {selectedDirector.experience && selectedDirector.experience.length > 0 && (
                    <div>
                      <h5 className="font-extrabold text-xs uppercase tracking-wider text-[#6B18A8] mb-2 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-[#6B18A8]" />
                        <span>{isEn ? 'Experience & Strategic Focus' : 'Pengalaman & Fokus Strategis'}</span>
                      </h5>
                      <ul className="text-xs text-neutral-600 list-disc pl-5 space-y-1.5">
                        {selectedDirector.experience.map((exp: string, i: number) => (
                          <li key={i}>{exp}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer className="pt-4 border-t border-[#C9A5E8]/25">
                  <Button
                    variant="primary"
                    className="w-full bg-[#6B18A8] hover:bg-[#4B0D78] text-white font-bold rounded-xl py-2.5 cursor-pointer"
                    onPress={() => setSelectedDirector(null)}
                  >
                    {isEn ? 'Close Profile' : 'Tutup Profil'}
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

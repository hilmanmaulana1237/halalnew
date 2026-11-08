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
              <>About <span className="text-[#F5D32F]">LPH</span> UIN SGD Bandung</>
            ) : (
              <>Tentang <span className="text-[#F5D32F]">LPH</span> UIN SGD Bandung</>
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
                ? 'The Halal Inspection Agency (LPH) of State Islamic University Sunan Gunung Djati Bandung was founded as a concrete manifestation of higher education service to fulfill the mandate of Law No. 33 of 2014 concerning Halal Product Assurance.'
                  : 'Lembaga Pemeriksa Halal (LPH) Universitas Islam Negeri Sunan Gunung Djati Bandung didirikan sebagai wujud nyata pengabdian perguruan tinggi keagamaan Islam negeri dalam menjawab amanat Undang-Undang No. 33 Tahun 2014 tentang Jaminan Produk Halal.'}
              </p>
              <p className="text-neutral-600 text-base leading-relaxed">
                {isEn
                ? 'Embodying the "Halalsphere University" paradigm, LPH UIN SGD is more than an administrative entity; it is a scientific inspection hub uniting molecular biology research, food technology, contemporary Islamic jurisprudence, and grassroots economic empowerment.'
                  : 'Dengan mengusung paradigma “Halalsphere University”, LPH UIN SGD tidak sekadar menjadi lembaga administratif, melainkan episentrum pemeriksaan dan keilmuan halal yang memadukan riset biologi molekuler, teknologi pangan, kajian fikih kontemporer, dan penguatan ekonomi kerakyatan.'}
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
            title={isEn ? 'Vision & Mission of LPH UIN SGD' : 'Visi & Misi LPH UIN SGD'}
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
                  ? '"To become an internationally reputable Halal Inspection Agency (LPH), leading in halal authentication science, sharia integrity, and MSE empowerment towards Indonesia as the Global Halal Hub."'
                    : '"Menjadi Lembaga Pemeriksa Halal (LPH) bereputasi internasional, unggul dalam sains autentikasi halal, berintegritas syar\'i, dan terdepan dalam pemberdayaan UMK menuju Indonesia Pusat Halal Dunia."'}
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

      {/* Leadership Showcase - Matching Homepage Grand Alternating Layout */}
      <section className="py-20 lg:py-28 bg-[#FAF7FD] border-t border-[#C9A5E8]/30 relative overflow-visible" id="pimpinan-lembaga">
        <YellowDotGrid rows={4} cols={5} className="absolute top-10 left-10 opacity-20 pointer-events-none hidden lg:grid" dotColor="#F5D32F" />
        <YellowDotGrid rows={3} cols={4} className="absolute bottom-10 right-10 opacity-20 pointer-events-none hidden md:grid" dotColor="#F5D32F" />
        <div className="w-full max-w-[1440px] xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <SectionHeader
            badge={isEn ? "EXECUTIVE BOARD & PATRON" : "DEWAN PIMPINAN & PEMBINA"}
            badgeColor="yellow"
            title={isEn ? "Leadership with Sharia Integrity & Halal Research Excellence" : "Kepemimpinan Berintegritas Syar’i & Keunggulan Riset Halal"}
            subtitle={isEn
              ? "Synergy between university strategic vision and bio-science research expertise to safeguard halal audit quality, ISO 17025 laboratory accountability, and public welfare."
              : "Sinergi visi strategis universitas dan keahlian riset sains hayati untuk mengawal mutu pemeriksaan halal, akuntabilitas laboratorium ISO 17025, dan kemaslahatan industri bagi umat."}
          />

          <div className="mt-24 lg:mt-36 space-y-28 lg:space-y-48">
            {/* CARD 1: DEWAN PEMBINA (Prof. Dr. H. Rosihon Anwar) - Left: Content, Right: Portrait Pop-Out */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative rounded-3xl border border-[#C9A5E8]/50 bg-white overflow-visible shadow-xl shadow-purple-950/5 hover:shadow-2xl hover:border-[#6B18A8]/60 transition-all duration-300 p-6 sm:p-10 lg:p-12 xl:p-14 w-full"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left (7 cols): Content & Institutional Vision */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-extrabold bg-[#FFF7D1] text-[#713f12] border border-[#F5D32F] uppercase tracking-wider mb-4 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#eab308]" />
                      {isEn ? 'Rector of UIN SGD & LPH Patron' : 'Rektor UIN SGD & Dewan Pembina LPH'}
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#292333] tracking-tight">
                      Prof. Dr. H. Rosihon Anwar, M.Ag.
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#756D7C] mt-1">
                      {isEn
                        ? 'Professor of Quranic Exegesis & Tafsir • Pioneer of "Halalsphere University"'
                        : "Guru Besar Ilmu Al-Qur'an & Tafsir • Inisiator Paradigma \"Halalsphere University\""}
                    </p>

                    {/* Institutional Quote Box */}
                    <div className="mt-6 p-6 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 shadow-xs relative">
                      <span className="text-4xl text-[#F5D32F] font-serif absolute top-3 left-4 select-none leading-none">“</span>
                      <p className="text-sm sm:text-base text-neutral-700 italic leading-relaxed pl-6 relative z-10 font-normal">
                        "{directors[0].quote}"
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 pt-6 border-t border-purple-100 flex flex-wrap items-center gap-4">
                    <Button
                      variant="primary"
                      className="bg-[#6B18A8] hover:bg-[#58138a] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md inline-flex items-center gap-2 cursor-pointer"
                      onPress={() => setSelectedDirector(directors[0])}
                    >
                      <span>{isEn ? "View Rector's Track Record & Profile" : 'Buka Profil & Rekam Jejak Rektor'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                    <Link
                      to="/kontak"
                      className="text-xs font-bold text-neutral-700 hover:text-[#6B18A8] transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>{isEn ? 'Contact Secretariat & Campus Vision' : 'Hubungi Sekretariat & Konsultasi'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right (5 cols): Cutout Portrait with Bold Pop-Out Head Breaking Card Top Border */}
                <div className="lg:col-span-5 flex flex-col items-center justify-end relative pt-6 lg:pt-0 lg:-mt-44 xl:-mt-52 lg:-mb-12 xl:-mb-14 z-20">
                  <div className="relative w-full max-w-[340px] sm:max-w-md lg:max-w-[420px] flex flex-col items-center">
                    {/* Ambient Glow Aura behind head */}
                    <div className="absolute inset-x-4 top-0 h-72 sm:h-84 bg-gradient-to-t from-purple-200/50 via-[#F5EDFB]/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

                    {/* Decorative yellow dot grid next to the popped-out head */}
                    <div className="absolute -top-6 -right-2 opacity-50 pointer-events-none hidden lg:block">
                      <YellowDotGrid rows={3} cols={3} dotColor="#F5D32F" />
                    </div>

                    <img
                      src={directors[0].image}
                      alt={directors[0].name}
                      className="relative z-10 w-auto max-h-[420px] sm:max-h-[480px] lg:max-h-[520px] xl:max-h-[560px] object-contain drop-shadow-[0_25px_35px_rgba(75,13,120,0.25)] transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Floating Name Card anchored at bottom of portrait */}
                    <div className="relative z-20 -mt-6 sm:-mt-8 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-[#C9A5E8]/40 shadow-xl shadow-purple-950/10 text-center max-w-xs w-full">
                      <h4 className="text-sm font-black text-[#292333]">
                        {directors[0].name}
                      </h4>
                      <p className="text-[11px] font-bold text-[#6B18A8] mt-0.5">
                        {isEn ? 'Rector of UIN SGD & LPH Patron' : 'Rektor UIN SGD & Dewan Pembina LPH'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD 2: PIMPINAN TEKNIS LPH (Dr. Tri Cahyanto) - Left: Portrait Pop-Out, Right: Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative rounded-3xl border border-[#F5D32F]/60 bg-white overflow-visible shadow-xl shadow-purple-950/5 hover:shadow-2xl hover:border-[#F5D32F] transition-all duration-300 p-6 sm:p-10 lg:p-12 xl:p-14 w-full"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left on Desktop (5 cols): Cutout Portrait with Bold Pop-Out Head Breaking Card Top Border */}
                <div className="lg:col-span-5 flex flex-col items-center justify-end relative pt-6 lg:pt-0 order-2 lg:order-1 lg:-mt-36 xl:-mt-44 lg:-mb-12 xl:-mb-14 z-20">
                  <div className="relative w-full max-w-[340px] sm:max-w-md lg:max-w-[420px] flex flex-col items-center">
                    {/* Ambient Glow Aura behind head */}
                    <div className="absolute inset-x-4 top-0 h-72 sm:h-84 bg-gradient-to-t from-yellow-200/40 via-[#FFF7D1]/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

                    {/* Decorative yellow dot grid next to the popped-out head */}
                    <div className="absolute -top-6 -left-2 opacity-50 pointer-events-none hidden lg:block">
                      <YellowDotGrid rows={3} cols={3} dotColor="#F5D32F" />
                    </div>

                    <img
                      src={directors[1].image}
                      alt={directors[1].name}
                      className="relative z-10 w-auto max-h-[420px] sm:max-h-[480px] lg:max-h-[520px] xl:max-h-[560px] object-contain drop-shadow-[0_25px_35px_rgba(113,63,18,0.22)] transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Floating Name Card anchored at bottom of portrait */}
                    <div className="relative z-20 -mt-6 sm:-mt-8 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-[#F5D32F]/50 shadow-xl shadow-yellow-950/10 text-center max-w-xs w-full">
                      <h4 className="text-sm font-black text-[#292333]">
                        {directors[1].name}
                      </h4>
                      <p className="text-[11px] font-bold text-[#6B18A8] mt-0.5">
                        {isEn ? 'Technical Lead of LPH UIN Sunan Gunung Djati' : 'Pimpinan Teknis LPH UIN Sunan Gunung Djati'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right on Desktop (7 cols): Content & Executive Statement */}
                <div className="lg:col-span-7 flex flex-col justify-between order-1 lg:order-2">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold bg-[#F5EDFB] text-[#6B18A8] border border-[#C9A5E8] uppercase tracking-wider mb-4 shadow-xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#6B18A8]" />
                      {isEn ? 'Operational & Technical Lead of LPH UIN SGD' : 'Pimpinan Teknis & Operasional LPH UIN SGD'}
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#292333] tracking-tight">
                      Dr. Tri Cahyanto, M.Si.
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#756D7C] mt-1">
                      {isEn
                        ? 'Life Science Expert & Licensed Lead Auditor BPJPH Kemenag RI'
                        : 'Pakar Sains Hayati & Lead Auditor Halal Berlisensi BPJPH Kemenag RI'}
                    </p>

                    {/* Executive Quote Box */}
                    <div className="mt-6 p-6 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 shadow-xs relative">
                      <span className="text-4xl text-[#F5D32F] font-serif absolute top-3 left-4 select-none leading-none">“</span>
                      <p className="text-sm sm:text-base text-neutral-700 italic leading-relaxed pl-6 relative z-10 font-normal">
                        "{directors[1].quote}"
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 pt-6 border-t border-purple-100 flex flex-wrap items-center gap-4">
                    <Button
                      variant="primary"
                      className="bg-[#F5D32F] hover:bg-[#eab308] text-[#3B074A] font-extrabold text-xs px-6 py-3 rounded-xl shadow-md inline-flex items-center gap-2 cursor-pointer"
                      onPress={() => setSelectedDirector(directors[1])}
                    >
                      <span>{isEn ? 'View Profile & Credentials' : 'Buka Profil & Kredensial Pimpinan'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                    <Link
                      to="/layanan/kalkulator"
                      className="text-xs font-bold text-neutral-700 hover:text-[#6B18A8] transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>{isEn ? 'Certification Flow Consultation' : 'Konsultasi Alur Sertifikasi'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Modal Director Detail using HeroUI v3 Modal */}
        {selectedDirector && (
          <Modal.Backdrop isOpen={!!selectedDirector} onOpenChange={() => setSelectedDirector(null)}>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-[640px] bg-white text-neutral-900 rounded-3xl p-6 sm:p-8">
                <Modal.CloseTrigger />
                <Modal.Header className="flex flex-col items-start gap-1 pb-4 border-b border-neutral-100">
                  <span className="text-xs font-black text-[#6b1282] uppercase tracking-wider">
                    {selectedDirector.position}
                  </span>
                  <Modal.Heading className="text-2xl font-black text-[#1b183a]">
                    {selectedDirector.name}
                  </Modal.Heading>
                </Modal.Header>

                <Modal.Body className="py-6 space-y-6 max-h-[70vh] overflow-y-auto">
                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                    <img
                      src={selectedDirector.image}
                      alt={selectedDirector.name}
                      className="w-24 h-24 rounded-2xl object-cover object-top border-2 border-purple-200 shadow-sm shrink-0"
                    />
                    <blockquote className="text-xs text-neutral-600 italic leading-relaxed border-l-2 border-[#6b1282] pl-3">
                      "{selectedDirector.quote}"
                    </blockquote>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-2 text-[#6b1282]">
                      <GraduationCap className="w-4 h-4" />
                      {isEn ? 'Education & Academic Qualifications' : 'Edukasi & Kualifikasi Akademik'}
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-neutral-600 pl-4 list-disc">
                      {selectedDirector.education.map((edu: string, idx: number) => (
                        <li key={idx}>{edu}</li>
                      ))}
                    </ul>
                  </div>

                  {selectedDirector.experience && selectedDirector.experience.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-2 text-[#6b1282]">
                        <Award className="w-4 h-4" />
                        {isEn ? 'Experience & Strategic Focus' : 'Pengalaman & Fokus Strategis'}
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-neutral-600 pl-4 list-disc">
                        {selectedDirector.experience.map((exp: string, idx: number) => (
                          <li key={idx}>{exp}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Modal.Body>

                <Modal.Footer className="border-t border-neutral-100 pt-4">
                  <Button
                    variant="primary"
                    className="w-full bg-[#6b1282] hover:bg-[#581c87] text-white font-bold rounded-xl py-2.5 cursor-pointer"
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

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ArrowRight, ShieldCheck, FileSearch, FlaskConical, Award } from "lucide-react";
import { Button } from "@heroui/react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface StepItem {
  id: number;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  accent: "purple" | "blue" | "emerald" | "amber";
  badge: string;
  points: string[];
  ctaText?: string;
  ctaLink?: string;
}

const STEPS: StepItem[] = [
  {
    id: 1,
    stepNumber: "01",
    title: "Permohonan & Input SIHALAL",
    subtitle: "Pendaftaran Online & Pemilihan LPH UIN SGD",
    description:
      "Pelaku usaha mengajukan permohonan sertifikasi halal melalui portal resmi ptsp.halal.go.id (SIHALAL) dan memilih Lembaga Pemeriksa Halal (LPH) UIN Sunan Gunung Djati Bandung (Kode Registrasi: LPH-018-ID).",
    icon: <ShieldCheck className="w-6 h-6" />,
    accent: "purple",
    badge: "Langkah Awal",
    points: [
      "Penyiapan data Nomor Induk Berusaha (NIB) berbasis risiko",
      "Upload manual Sistem Jaminan Produk Halal (SJPH)",
      "Penetapan Penyelia Halal bersertifikat kompetensi",
    ],
    ctaText: "Akses SIHALAL BPJPH",
    ctaLink: "https://ptsp.halal.go.id/",
  },
  {
    id: 2,
    stepNumber: "02",
    title: "Verifikasi Berkas & Bahan Kritis",
    subtitle: "Screening Dokumen & Matriks Bahan Baku",
    description:
      "Tim verifikator LPH UIN SGD memeriksa kelengkapan daftar bahan, matriks asal bahan, keabsahan sertifikat halal bahan dari pemasok, serta kesiapan fasilitas produksi secara menyeluruh.",
    icon: <FileSearch className="w-6 h-6" />,
    accent: "blue",
    badge: "Verifikasi Cepat",
    points: [
      "Pemeriksaan ketat terhadap bahan nabati, hewani, & mikrobial",
      "Pengecekan fasilitas produksi terbebas dari najis / haram",
      "Penerbitan surat perintah bayar & konfirmasi jadwal audit",
    ],
    ctaText: "Hitung Simulasi Tarif",
    ctaLink: "/layanan/kalkulator",
  },
  {
    id: 3,
    stepNumber: "03",
    title: "Audit Lapangan & Uji Laboratorium",
    subtitle: "Pemeriksaan Fisik & Pengujian DNA qPCR",
    description:
      "Auditor Halal berlisensi melakukan audit on-site ke fasilitas produksi. Jika terdapat bahan kritis, sampel diuji saintifik di Laboratorium Terpadu Kampus 2 UIN SGD (Real-Time PCR DNA Porcine & GC-FID Alkohol).",
    icon: <FlaskConical className="w-6 h-6" />,
    accent: "emerald",
    badge: "Saintifik ISO 17025",
    points: [
      "Audit ketertelusuran (traceability) alur proses produksi",
      "Pengambilan sampel bahan kritis secara aseptik",
      "Pengujian laboratorium presisi tinggi dengan hasil akuntabel",
    ],
    ctaText: "Lihat Layanan Laboratorium",
    ctaLink: "/tentang",
  },
  {
    id: 4,
    stepNumber: "04",
    title: "Sidang Fatwa MUI & Sertifikat Terbit",
    subtitle: "Ketetapan Halal & Sertifikat Resmi BPJPH",
    description:
      "Laporan Hasil Pemeriksaan (LHP) diajukan ke Komisi Fatwa MUI untuk penetapan kehalalan. Setelah Ketetapan Halal (KH) terbit, BPJPH Kemenag RI menerbitkan Sertifikat Halal resmi yang dapat diunduh digital.",
    icon: <Award className="w-6 h-6" />,
    accent: "amber",
    badge: "Sertifikasi Sah",
    points: [
      "Sidang Fatwa Komisi MUI menjamin kepatuhan syar'i 100%",
      "Penerbitan Sertifikat Halal resmi dengan nomor ID terdaftar",
      "Produk siap dipasarkan dengan logo Halal Indonesia resmi",
    ],
    ctaText: "Konsultasi Pendampingan",
    ctaLink: "/kontak",
  },
];

export const TimelineSteps: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const current = STEPS.find((s) => s.id === activeStep) || STEPS[0];

  const colorConfig = {
    purple: {
      border: "border-purple-300",
      activeBg: "bg-[#6b1282] text-white",
      badge: "bg-purple-100 text-[#6b1282] border-purple-200",
      accentText: "text-[#6b1282]",
      button: "bg-[#6b1282] hover:bg-[#581c87] text-white",
      glow: "shadow-purple-500/20",
    },
    blue: {
      border: "border-sky-300",
      activeBg: "bg-[#0284c7] text-white",
      badge: "bg-sky-100 text-[#0284c7] border-sky-200",
      accentText: "text-[#0284c7]",
      button: "bg-[#0284c7] hover:bg-[#0369a1] text-white",
      glow: "shadow-sky-500/20",
    },
    emerald: {
      border: "border-emerald-300",
      activeBg: "bg-[#005a36] text-white",
      badge: "bg-emerald-100 text-[#005a36] border-emerald-200",
      accentText: "text-[#005a36]",
      button: "bg-[#005a36] hover:bg-[#00472a] text-white",
      glow: "shadow-emerald-500/20",
    },
    amber: {
      border: "border-amber-300",
      activeBg: "bg-[#d97706] text-white",
      badge: "bg-amber-100 text-amber-900 border-amber-200",
      accentText: "text-amber-800",
      button: "bg-[#d97706] hover:bg-[#b45309] text-white",
      glow: "shadow-amber-500/20",
    },
  };

  const currentTheme = colorConfig[current.accent];

  return (
    <div className="w-full">
      {/* Step Selector Pills Bar (Untitled UI Step Nav with LPH Jewel Hues) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {STEPS.map((step) => {
          const isSelected = step.id === activeStep;
          const theme = colorConfig[step.accent];

          return (
            <motion.button
              key={step.id}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveStep(step.id)}
              className={cn(
                "relative flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 shadow-sm",
                isSelected
                  ? `${theme.activeBg} ${theme.glow} shadow-lg ring-2 ring-offset-2 ring-white`
                  : "bg-white border-neutral-200 hover:border-neutral-300 text-neutral-700 hover:bg-neutral-50/80"
              )}
            >
              <span
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-xl text-xs font-black shrink-0 transition-colors",
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-neutral-100 text-neutral-800"
                )}
              >
                {step.stepNumber}
              </span>

              <div className="overflow-hidden">
                <span
                  className={cn(
                    "block text-xs font-black truncate",
                    isSelected ? "text-white" : "text-neutral-900"
                  )}
                >
                  {step.title}
                </span>
                <span
                  className={cn(
                    "block text-[11px] truncate mt-0.5",
                    isSelected ? "text-white/80" : "text-neutral-500"
                  )}
                >
                  {step.badge}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Active Step Showcase Card with Motion Fade & Slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl p-[2px] bg-gradient-to-r from-[#6b1282] via-[#0284c7] via-[#10b981] to-[#f59e0b] shadow-2xl"
        >
          <div className="bg-white rounded-[22px] p-6 sm:p-10 flex flex-col lg:flex-row items-center gap-8 justify-between">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "px-3.5 py-1 rounded-full text-xs font-bold border tracking-wide uppercase",
                    currentTheme.badge
                  )}
                >
                  Tahap {current.stepNumber} • {current.badge}
                </span>
                <span className="text-xs font-bold text-neutral-400">
                  LPH UIN SGD Bandung
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#1b183a]">
                {current.title}
              </h3>

              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                {current.description}
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider block">
                  Poin Kunci &amp; Prosedur:
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-neutral-600">
                  {current.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className={cn("w-4 h-4 shrink-0 mt-0.5", currentTheme.accentText)}
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {current.ctaLink && (
                <div className="pt-4 flex items-center gap-4">
                  {current.ctaLink.startsWith("http") ? (
                    <a
                      href={current.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="primary"
                        className={cn(
                          "font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2",
                          currentTheme.button
                        )}
                      >
                        {current.ctaText}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </a>
                  ) : (
                    <Link to={current.ctaLink}>
                      <Button
                        variant="primary"
                        className={cn(
                          "font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2",
                          currentTheme.button
                        )}
                      >
                        {current.ctaText}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Visual Jewel Icon Badge on Right */}
            <div className="w-full lg:w-72 shrink-0 flex flex-col items-center justify-center p-8 rounded-2xl bg-neutral-50 border border-neutral-100 text-center">
              <div
                className={cn(
                  "w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-xl mb-4 transition-transform hover:scale-110",
                  currentTheme.activeBg
                )}
              >
                {current.icon}
              </div>
              <h4 className="font-extrabold text-neutral-900 text-sm">
                Standar Mutu Terjamin
              </h4>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Terakreditasi BPJPH Kementerian Agama RI &amp; Fatwa Majelis Ulama Indonesia.
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};


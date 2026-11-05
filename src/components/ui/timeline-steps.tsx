import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ArrowRight, ShieldCheck, FileSearch, FlaskConical, Award } from "lucide-react";
import { Button } from "@heroui/react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

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

const STEPS_ID: StepItem[] = [
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

const STEPS_EN: StepItem[] = [
  {
    id: 1,
    stepNumber: "01",
    title: "Application & SIHALAL Submission",
    subtitle: "Online Registration & Selecting LPH UIN SGD",
    description:
      "Business actors submit halal applications via the official ptsp.halal.go.id (SIHALAL) portal and select Halal Inspection Agency (LPH) UIN Sunan Gunung Djati Bandung (Registration Code: LPH-018-ID).",
    icon: <ShieldCheck className="w-6 h-6" />,
    accent: "purple",
    badge: "Step One",
    points: [
      "Preparation of risk-based Business Identification Number (NIB)",
      "Uploading Halal Assurance System Manual (SJPH)",
      "Appointment of certified internal Halal Supervisors",
    ],
    ctaText: "Access BPJPH SIHALAL",
    ctaLink: "https://ptsp.halal.go.id/",
  },
  {
    id: 2,
    stepNumber: "02",
    title: "Document Screening & Critical Ingredients",
    subtitle: "Document Audit & Ingredient Traceability Matrix",
    description:
      "LPH UIN SGD verifiers examine ingredient matrices, supplier halal certificates, and production facility cleanliness readiness.",
    icon: <FileSearch className="w-6 h-6" />,
    accent: "blue",
    badge: "Fast Screening",
    points: [
      "Strict evaluation of plant, animal, and microbial derivatives",
      "Facility inspection to ensure zero najis / non-halal contamination",
      "Payment order issuance & audit schedule confirmation",
    ],
    ctaText: "Simulate Audit Fee",
    ctaLink: "/layanan/kalkulator",
  },
  {
    id: 3,
    stepNumber: "03",
    title: "On-Site Factory Audit & Lab Testing",
    subtitle: "Physical Inspection & Porcine qPCR DNA Assay",
    description:
      "Certified Halal Auditors conduct on-site factory verification. Critical samples undergo scientific testing at Integrated Lab Campus 2 (Real-Time Porcine DNA qPCR & GC-FID Ethanol).",
    icon: <FlaskConical className="w-6 h-6" />,
    accent: "emerald",
    badge: "ISO 17025 Scientific",
    points: [
      "Full traceability check of raw ingredients to finished packaging",
      "Aseptic sampling of critical raw ingredients",
      "High-precision testing with ISO/IEC 17025 accredited results",
    ],
    ctaText: "Explore Laboratory",
    ctaLink: "/tentang",
  },
  {
    id: 4,
    stepNumber: "04",
    title: "MUI Fatwa Assembly & Certificate Issuance",
    subtitle: "Halal Ruling & Official BPJPH Certificate",
    description:
      "Audit reports are submitted to the MUI Fatwa Commission. Upon halal ruling approval, BPJPH Ministry of Religious Affairs issues the official digital Halal Certificate.",
    icon: <Award className="w-6 h-6" />,
    accent: "amber",
    badge: "Officially Certified",
    points: [
      "MUI Fatwa Commission guarantees 100% sharia integrity",
      "Official Halal Certificate with registered barcode ID",
      "Authorized to market products with official Indonesian Halal logo",
    ],
    ctaText: "Consult Our Team",
    ctaLink: "/kontak",
  },
];

export const TimelineSteps: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const steps = isEn ? STEPS_EN : STEPS_ID;

  const [activeStep, setActiveStep] = useState<number>(1);
  const current = steps.find((s) => s.id === activeStep) || steps[0];

  const colorMap = {
    purple: {
      activeBg: "bg-[#6b1282] text-white shadow-lg shadow-purple-900/30 ring-4 ring-purple-100",
      activeTab: "border-[#6b1282] bg-purple-50/70",
      badge: "bg-purple-100 text-[#6b1282] border-purple-200",
      button: "bg-[#6b1282] hover:bg-[#581c87] text-white",
      bullet: "bg-[#6b1282]",
    },
    blue: {
      activeBg: "bg-[#0284c7] text-white shadow-lg shadow-sky-900/30 ring-4 ring-sky-100",
      activeTab: "border-[#0284c7] bg-sky-50/70",
      badge: "bg-sky-100 text-[#0284c7] border-sky-200",
      button: "bg-[#0284c7] hover:bg-[#0369a1] text-white",
      bullet: "bg-[#0284c7]",
    },
    emerald: {
      activeBg: "bg-[#005a36] text-white shadow-lg shadow-emerald-900/30 ring-4 ring-emerald-100",
      activeTab: "border-[#005a36] bg-emerald-50/70",
      badge: "bg-emerald-100 text-[#005a36] border-emerald-200",
      button: "bg-[#005a36] hover:bg-[#00472a] text-white",
      bullet: "bg-[#005a36]",
    },
    amber: {
      activeBg: "bg-[#d97706] text-white shadow-lg shadow-amber-900/30 ring-4 ring-amber-100",
      activeTab: "border-[#d97706] bg-amber-50/70",
      badge: "bg-amber-100 text-[#d97706] border-amber-200",
      button: "bg-[#d97706] hover:bg-[#b45309] text-white",
      bullet: "bg-[#d97706]",
    },
  };

  const currentTheme = colorMap[current.accent];

  return (
    <div className="w-full">
      {/* Step Buttons (4 Steps Bar) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {steps.map((step) => {
          const isActive = step.id === activeStep;
          const theme = colorMap[step.accent];
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStep(step.id)}
              className={cn(
                "relative text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group",
                isActive
                  ? cn("border-2 shadow-md bg-white", theme.activeTab)
                  : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/70"
              )}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <span
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm transition-all",
                    isActive
                      ? theme.activeBg
                      : "bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200"
                  )}
                >
                  {step.stepNumber}
                </span>
                <span
                  className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider",
                    isActive
                      ? theme.badge
                      : "bg-neutral-100 text-neutral-500 border-neutral-200"
                  )}
                >
                  {step.badge}
                </span>
              </div>
              <div>
                <h4
                  className={cn(
                    "font-bold text-xs sm:text-sm line-clamp-1 transition-colors",
                    isActive ? "text-neutral-900" : "text-neutral-600 group-hover:text-neutral-900"
                  )}
                >
                  {step.title}
                </h4>
                <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                  {step.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Showcase Card with Motion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xl shadow-purple-950/5 relative overflow-hidden"
        >
          {/* Subtle Top Accent */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#6b1282] via-[#0284c7] via-[#005a36] to-[#d97706]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column (8 cols): Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-3xl sm:text-4xl font-black text-[#6b1282]">
                  {current.stepNumber}
                </span>
                <div>
                  <span
                    className={cn(
                      "text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider",
                      currentTheme.badge
                    )}
                  >
                    {current.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1">
                    {current.title}
                  </h3>
                </div>
              </div>

              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                {current.description}
              </p>

              {/* Key Bullet Points */}
              <div className="pt-2 space-y-2.5">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                  {isEn ? "Key Activities:" : "Aktivitas Kunci:"}
                </span>
                <ul className="space-y-2">
                  {current.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                      <span className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", currentTheme.bullet)} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Action */}
              {current.ctaText && (
                <div className="pt-4">
                  {current.ctaLink?.startsWith("http") ? (
                    <a href={current.ctaLink} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="primary"
                        className={cn(
                          "font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md inline-flex items-center gap-2",
                          currentTheme.button
                        )}
                      >
                        <span>{current.ctaText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </a>
                  ) : (
                    <Link to={current.ctaLink || "#"}>
                      <Button
                        variant="primary"
                        className={cn(
                          "font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md inline-flex items-center gap-2",
                          currentTheme.button
                        )}
                      >
                        <span>{current.ctaText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Right Column (4 cols): Stylized Visual Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-xs p-6 rounded-3xl bg-neutral-50/80 border border-neutral-200 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-[#6b1282]">
                  {current.icon}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">{current.subtitle}</h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    {isEn
                      ? "Official procedural workflow under BPJPH Ministry of Religious Affairs standards."
                      : "Standar operasional prosedur resmi terintegrasi BPJPH Kementerian Agama RI."}
                  </p>
                </div>
                <div className="w-full pt-2 border-t border-neutral-200/70 flex items-center justify-between text-[11px] text-neutral-500 font-semibold">
                  <span>{isEn ? "Standard SLA" : "Standar Waktu"}</span>
                  <span className="text-[#6b1282] font-bold">
                    {isEn ? "10–15 Days" : "10–15 Hari Kerja"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

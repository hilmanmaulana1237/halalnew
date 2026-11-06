import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ArrowRight, ShieldCheck, FileSearch, FlaskConical, Award } from "lucide-react";
import { Button } from "@heroui/react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { YellowDotGrid } from "./decorative-shapes";

export interface StepItem {
  id: number;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
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
    badge: "Sertifikasi Sah",
    points: [
      "Sidang Fatwa Komisi MUI menjamin kepatuhan syar'i 100%",
      "Penerbitan Sertifikat Halal resmi dengan nomor ID terdaftar",
      "Produk siap dipasarkan dengan logo Halal Indonesia resmi",
    ],
    ctaText: "Konsultasi Sertifikasi",
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
    badge: "Fast Screening",
    points: [
      "Strict evaluation of plant, animal, and microbial derivatives",
      "Facility inspection to ensure zero najis / non-halal contamination",
      "Payment order issuance & audit schedule confirmation",
    ],
    ctaText: "Calculate Tariff Estimate",
    ctaLink: "/layanan/kalkulator",
  },
  {
    id: 3,
    stepNumber: "03",
    title: "On-Site Facility Audit & Laboratory Testing",
    subtitle: "Field Inspection & qPCR Porcine DNA Analysis",
    description:
      "Licensed Lead Halal Auditors conduct on-site audits. If critical materials are detected, samples undergo ISO/IEC 17025 accredited laboratory testing at Campus 2 UIN SGD.",
    icon: <FlaskConical className="w-6 h-6" />,
    badge: "ISO 17025 Science",
    points: [
      "End-to-end traceability audit of the manufacturing process",
      "Aseptic sampling of critical raw materials & flavorings",
      "High-precision laboratory testing with accountable scientific reports",
    ],
    ctaText: "Explore Laboratory Services",
    ctaLink: "/tentang",
  },
  {
    id: 4,
    stepNumber: "04",
    title: "MUI Fatwa Decree & BPJPH Certificate",
    subtitle: "Sharia Halal Decree & Official Halal Certificate",
    description:
      "Inspection results are submitted to the MUI Fatwa Council for sharia validation. Once the Halal Decree is finalized, BPJPH issues the official Halal Certificate.",
    icon: <Award className="w-6 h-6" />,
    badge: "Official Halal",
    points: [
      "MUI Fatwa Council hearing ensures 100% sharia integrity",
      "Official certificate issued with unique registered ID",
      "Products authorized to display the official Indonesian Halal Logo",
    ],
    ctaText: "Consult Certification",
    ctaLink: "/kontak",
  },
];

export const TimelineSteps: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const steps = isEn ? STEPS_EN : STEPS_ID;
  const [activeStep, setActiveStep] = useState<number>(1);

  const current = steps.find((s) => s.id === activeStep) || steps[0];

  return (
    <div className="w-full">
      {/* Step Buttons (4 Steps Bar) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {steps.map((step) => {
          const isActive = step.id === activeStep;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStep(step.id)}
              className={cn(
                "relative text-left p-4 sm:p-5 rounded-3xl border transition-all duration-300 flex flex-col justify-between group cursor-pointer",
                isActive
                  ? "border-[#6B18A8] bg-[#F5EDFB] shadow-lg shadow-purple-950/10 ring-2 ring-[#6B18A8]/20"
                  : "border-[#C9A5E8]/40 bg-white hover:border-[#6B18A8]/60 hover:bg-[#F5EDFB]/40"
              )}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <span
                  className={cn(
                    "w-10 h-10 rounded-2xl flex items-center justify-center font-mono font-black text-sm transition-all",
                    isActive
                      ? "bg-[#6B18A8] text-[#F5D32F] shadow-md shadow-purple-950/20"
                      : "bg-[#F5EDFB] text-[#6B18A8] group-hover:bg-[#FFF7D1] group-hover:text-[#713f12]"
                  )}
                >
                  {step.stepNumber}
                </span>
                <span
                  className={cn(
                    "text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider",
                    isActive
                      ? "bg-[#FFF7D1] text-[#713f12] border-[#F5D32F]"
                      : "bg-[#F5EDFB] text-[#756D7C] border-[#C9A5E8]/60"
                  )}
                >
                  {step.badge}
                </span>
              </div>
              <div>
                <h4
                  className={cn(
                    "font-bold text-xs sm:text-sm line-clamp-1 transition-colors",
                    isActive ? "text-[#4B0D78]" : "text-[#292333] group-hover:text-[#6B18A8]"
                  )}
                >
                  {step.title}
                </h4>
                <p className="text-[11px] text-[#756D7C] line-clamp-1 mt-0.5 font-medium">
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
          className="rounded-3xl border border-[#C9A5E8]/60 bg-white p-6 sm:p-10 shadow-xl shadow-purple-950/5 relative overflow-hidden"
        >
          {/* Top Multi-Color Accent Bar */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#4B0D78] via-[#6B18A8] via-[#F5D32F] to-[#6B18A8]" />

          {/* Decorative Yellow Dot Grid in background */}
          <div className="absolute top-6 right-8 opacity-30">
            <YellowDotGrid rows={4} cols={5} dotColor="#F5D32F" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column (8 cols): Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-3xl sm:text-5xl font-black text-[#6B18A8]">
                  {current.stepNumber}
                </span>
                <div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full border uppercase tracking-wider bg-[#FFF7D1] text-[#713f12] border-[#F5D32F]">
                    {current.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#292333] mt-1.5">
                    {current.title}
                  </h3>
                </div>
              </div>

              <p className="text-[#756D7C] text-sm sm:text-base leading-relaxed font-normal">
                {current.description}
              </p>

              {/* Key Bullet Points */}
              <div className="pt-2 space-y-2.5">
                <span className="text-xs font-bold text-[#292333] uppercase tracking-wider block">
                  {isEn ? "Key Activities:" : "Aktivitas Kunci:"}
                </span>
                <ul className="space-y-2">
                  {current.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#292333]">
                      <span className="w-2 h-2 rounded-full mt-1.5 shrink-0 bg-[#F5D32F]" />
                      <span className="font-medium">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              {current.ctaText && (
                <div className="pt-4 flex items-center gap-3">
                  {current.ctaLink?.startsWith("http") ? (
                    <a href={current.ctaLink} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="primary"
                        className="bg-[#6B18A8] hover:bg-[#4B0D78] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-2xl shadow-md inline-flex items-center gap-2 cursor-pointer"
                      >
                        <span>{current.ctaText}</span>
                        <ArrowRight className="w-4 h-4 text-[#F5D32F]" />
                      </Button>
                    </a>
                  ) : (
                    <Link to={current.ctaLink || "#"}>
                      <Button
                        variant="primary"
                        className="bg-[#6B18A8] hover:bg-[#4B0D78] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-2xl shadow-md inline-flex items-center gap-2 cursor-pointer"
                      >
                        <span>{current.ctaText}</span>
                        <ArrowRight className="w-4 h-4 text-[#F5D32F]" />
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Right Column (4 cols): Visual Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-[#F5EDFB] border border-[#C9A5E8]/60 p-6 flex flex-col items-center justify-center text-center shadow-inner group">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-[#C9A5E8]/40 flex items-center justify-center text-[#6B18A8] mb-3 group-hover:scale-110 group-hover:bg-[#FFF7D1] transition-transform duration-300">
                  {current.icon}
                </div>
                <div className="font-mono text-2xl font-black text-[#6B18A8]">
                  Tahap {current.stepNumber}
                </div>
                <div className="text-xs font-semibold text-[#756D7C] mt-1 line-clamp-2">
                  {current.subtitle}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#F5D32F] text-[#3B074A] flex items-center justify-center font-bold text-xs shadow-md">
                  ✓
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TimelineSteps;

import React from 'react';
import { ShieldCheck, Phone, FlaskConical } from 'lucide-react';

export interface Director {
  id: number;
  name: string;
  position: string;
  image: string;
  quote?: string;
  education: string[];
  experience: string[];
}

export const getDirectors = (isEn: boolean): Director[] => [
  {
    id: 1,
    name: 'Prof. Dr. H. Rosihon Anwar, M.Ag.',
    position: isEn
      ? 'Rector of UIN SGD Bandung / LPH Advisory Board'
      : 'Rektor UIN SGD Bandung / Dewan Pembina LPH',
    image: '/assets/images/uin_sgd/director_rosihon.webp',
    quote: isEn
      ? 'UIN Sunan Gunung Djati Bandung dedicates its entire academic potential, halal science research, and accredited laboratories to accelerate a credible and high-integrity global halal industry ecosystem.'
      : 'UIN Sunan Gunung Djati Bandung mendedikasikan seluruh potensi akademik, riset sains halal, dan laboratorium untuk mengakselerasi ekosistem industri halal global yang kredibel dan maslahat.',
    education: isEn
      ? [
        'Professor of Quranic Exegesis & Tafsir, UIN Sunan Gunung Djati Bandung',
        'Doctor (Ph.D) in Islamic Studies / Tafsir Hadith Postgraduate School UIN SGD Bandung',
        'Master of Arts (M.Ag) in Islamic Thought, UIN SGD Bandung',
        'Bachelor of Theology & Islamic Studies (S.Ag), Faculty of Ushuluddin UIN SGD Bandung',
      ]
      : [
        "Guru Besar Ilmu Al-Qur'an dan Tafsir UIN Sunan Gunung Djati Bandung",
        'Doktor (S3) Studi Islam / Tafsir Hadis Pascasarjana UIN SGD Bandung',
        'Magister Agama (S2) Pemikiran Islam UIN SGD Bandung',
        'Sarjana Agama (S1) Fakultas Ushuluddin UIN SGD Bandung',
      ],
    experience: isEn
      ? [
        'Rector of UIN Sunan Gunung Djati Bandung (2023 - Present)',
        'Main Pioneer & Institutional Architect of the "Halalsphere University" Paradigm',
        'Advisory Board Member of LPH UIN Sunan Gunung Djati',
        'Vice Rector for Academic Affairs, UIN Sunan Gunung Djati Bandung (2019 - 2023)',
      ]
      : [
        'Rektor UIN Sunan Gunung Djati Bandung (2023 - Sekarang)',
        'Inisiator & Pengarah Utama Paradigma "Halalsphere University"',
        'Dewan Pembina LPH UIN Sunan Gunung Djati',
        'Wakil Rektor Bidang Akademik UIN Sunan Gunung Djati Bandung (2019 - 2023)',
      ],
  },
  {
    id: 2,
    name: 'Dr. Tri Cahyanto, M.Si.',
    position: isEn
      ? 'Technical Lead of LPH UIN SGD'
      : 'Pimpinan Teknis LPH UIN SGD',
    image: '/assets/images/uin_sgd/director_tri.webp',
    quote: isEn
      ? "LPH UIN SGD is committed to delivering swift, transparent, and accountable inspection grounded in Sharia compliance and accredited laboratory precision."
      : "LPH UIN SGD berkomitmen memberikan pelayanan prima, cepat, akuntabel, dan berbasis integritas syar'i serta pengujian laboratorium yang presisi demi melindungi hak konsumen muslim.",
    education: isEn
      ? [
        'Doctor (Ph.D) in Biological Sciences & Applied Life Sciences',
        'Master of Science (M.Si) in Conservation Biology & Molecular Authentication',
        'Certified Lead Halal Auditor Licensed by BPJPH Ministry of Religious Affairs & MUI',
        'Certified Competency Assessor for Halal Product Assurance (JPH)',
      ]
      : [
        'Doktor (S3) Ilmu Biologi & Sains Hayati Terapan',
        'Magister Sains (S2) Biologi Konservasi & Autentikasi Produk',
        'Pelatihan & Sertifikasi Lead Auditor Halal Berlisensi BPJPH & MUI',
        'Sertifikasi Kompetensi Asesor Pengawas Jaminan Produk Halal',
      ],
    experience: isEn
      ? [
        'Operational & Technical Lead of LPH UIN Sunan Gunung Djati Bandung',
        'Lead Halal Auditor & Assessor Licensed by BPJPH & MUI',
        'Senior Lecturer & Researcher in Halal Molecular Bio-Testing',
      ]
      : [
        'Pimpinan Teknis Operasional LPH UIN Sunan Gunung Djati Bandung',
        'Lead Auditor & Asesor Halal Berlisensi Resmi BPJPH & MUI',
        'Dosen & Peneliti Laboratorium Pengujian Autentikasi Kehalalan Hayati',
      ],
  },
];

export const DIRECTORS: Director[] = getDirectors(false);

export const getUinServices = (isEn: boolean) => [
  {
    title: isEn ? 'Regular Halal Certification' : 'Sertifikasi Halal Reguler',
    description: isEn
      ? 'Comprehensive scientific inspection and audit for medium and large industries by certified BPJPH & MUI auditors.'
      : 'Pemeriksaan dan audit saintifik komprehensif bagi industri menengah dan besar oleh auditor halal bersertifikasi nasional BPJPH & MUI.',
    url: 'https://lph.uinsgd.ac.id/',
    icon: React.createElement(ShieldCheck, { className: 'w-6 h-6 text-[#6B18A8]' }),
    badge: isEn ? 'Accredited LPH' : 'LPH Terakreditasi',
    accentColor: 'purple' as const,
    colSpan: 'md:col-span-1',
  },
  {
    title: isEn ? 'Certification & Regulatory Advisory' : 'Konsultasi Sertifikasi & Regulasi',
    description: isEn
      ? 'In-person and virtual consultation regarding ingredient eligibility, Halal Assurance Systems, and BPJPH guidelines.'
      : 'Layanan konsultasi tatap muka maupun daring mengenai kelayakan bahan baku, sistem jaminan halal, dan regulasi BPJPH.',
    url: 'https://wa.me/6282126493700',
    icon: React.createElement(Phone, { className: 'w-6 h-6 text-[#6B18A8]' }),
    badge: isEn ? 'Fast Response' : 'Layanan Cepat',
    accentColor: 'purple' as const,
    colSpan: 'md:col-span-1',
  },
  {
    title: isEn ? 'Integrated Halal Testing Laboratory' : 'Laboratorium Pengujian Halal Terpadu',
    description: isEn
      ? 'High-precision scientific testing: Pork derivative detection, alcohol content analysis, and gelatin verification.'
      : 'Uji laboratorium presisi: Deteksi kandungan babi, uji batas alkohol/etanol, serta pemeriksaan kehalalan gelatin.',
    url: 'https://halal.uinsgd.ac.id/laboratorium-pengujian-halal/',
    icon: React.createElement(FlaskConical, { className: 'w-6 h-6 text-[#6B18A8]' }),
    badge: isEn ? 'Accredited Lab' : 'Lab Terakreditasi',
    accentColor: 'purple' as const,
    colSpan: 'md:col-span-1',
  },
];

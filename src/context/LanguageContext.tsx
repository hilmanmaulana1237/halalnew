import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'id' | 'en';

interface Translations {
  [key: string]: {
    id: string;
    en: string;
  };
}

export const translations: Translations = {
  // Navigation
  nav_home: { id: 'Beranda', en: 'Home' },
  nav_profile: { id: 'Profil', en: 'Profile' },
  nav_services: { id: 'Layanan', en: 'Services' },
  nav_news: { id: 'Berita & Artikel', en: 'News & Articles' },
  nav_research: { id: 'Riset & Lab', en: 'Research & Lab' },
  nav_contact: { id: 'Kontak', en: 'Contact' },
  nav_calc_fee: { id: 'Hitung Tarif Halal', en: 'Calculate Halal Fee' },
  nav_accreditation_badge: { id: 'Resmi BPJPH No. LPH-018-ID', en: 'Official BPJPH No. LPH-018-ID' },

  // Mega Menu Profile
  menu_about_title: { id: 'Tentang Kami', en: 'About Us' },
  menu_about_desc: { id: 'Profil kelembagaan, sejarah, dan dedikasi Halal Center UIN SGD.', en: 'Institutional profile, history, and Halal Center UIN SGD dedication.' },
  menu_vision_title: { id: 'Visi & Tata Nilai', en: 'Vision & Core Values' },
  menu_vision_desc: { id: 'Integritas syar’i, keunggulan saintifik, dan pelayanan ramah pelaku usaha.', en: 'Sharia integrity, scientific excellence, and business-friendly service.' },
  menu_structure_title: { id: 'Struktur Organisasi', en: 'Organizational Structure' },
  menu_structure_desc: { id: 'Dewan pimpinan, auditor ahli, penyelia halal, dan tenaga laboratorium.', en: 'Executive board, certified auditors, halal supervisors, and laboratory team.' },
  menu_legality_title: { id: 'Legalitas & Akreditasi', en: 'Legality & Accreditation' },
  menu_legality_desc: { id: 'Regulasi resmi BPJPH No. LPH-018-ID dan pengakuan KAN ISO/IEC 17025.', en: 'Official BPJPH No. LPH-018-ID regulation and KAN ISO/IEC 17025 accreditation.' },

  // Mega Menu Services
  menu_audit_title: { id: 'Pemeriksaan Halal LPH', en: 'LPH Halal Inspection' },
  menu_audit_desc: { id: 'Audit kehalalan produk pangan, minuman, kosmetik, kimiawi, dan barang gunaan.', en: 'Halal audit for food, beverages, cosmetics, chemicals, and consumer goods.' },
  menu_self_declare_title: { id: 'Sertifikasi Self Declare', en: 'Self Declare Certification' },
  menu_self_declare_desc: { id: 'Pendampingan Program SEHATI gratis untuk pelaku Usaha Mikro dan Kecil (UMK).', en: 'Free SEHATI program assistance for Micro and Small Enterprises (MSEs).' },
  menu_lab_title: { id: 'Pengujian Laboratorium', en: 'Laboratory Testing' },
  menu_lab_desc: { id: 'Uji qPCR DNA babi, cemaran alkohol GC-FID, dan profil asam lemak gelatin.', en: 'Porcine DNA qPCR, GC-FID alcohol residual, and gelatin fatty acid profile tests.' },
  menu_training_title: { id: 'Pelatihan Auditor & Penyelia', en: 'Auditor & Supervisor Training' },
  menu_training_desc: { id: 'Bimbingan teknis kompetensi bersertifikat BNSP dan SKKNI Halal resmi.', en: 'Competency training certified by BNSP and official Halal SKKNI standards.' },

  // Hero Section
  hero_badge_lph: { id: 'Lembaga Pemeriksa Halal', en: 'Halal Inspection Agency' },
  hero_badge_univ: { id: 'UIN Sunan Gunung Djati Bandung', en: 'UIN Sunan Gunung Djati Bandung' },
  hero_subtitle: {
    id: 'Lembaga Pemeriksa Halal (LPH) UIN Sunan Gunung Djati Bandung berupaya mempertahankan posisinya sebagai lembaga pemeriksa halal terkemuka serta menjadi mitra utama industri halal nasional dan internasional.',
    en: 'Halal Inspection Agency (LPH) UIN Sunan Gunung Djati Bandung strives to maintain its position as a leading halal inspection institution and trusted partner for national and global halal industries.'
  },
  hero_cta_calc: { id: 'Hitung Tarif Halal', en: 'Calculate Halal Fee' },
  hero_cta_profile: { id: 'Pelajari Profil LPH', en: 'Explore LPH Profile' },

  // Hero Search Box
  search_title: { id: 'Cari Produk Halal Melalui Pemeriksaan LPH UIN SGD', en: 'Search Certified Halal Products Audited by LPH UIN SGD' },
  search_subtitle: { id: 'Terhubung langsung dengan Pangkalan Data Resmi BPJPH & MUI', en: 'Directly synchronized with official BPJPH & MUI certification databases' },
  search_popular: { id: 'Pencarian Populer:', en: 'Popular Searches:' },
  search_label_product: { id: 'Nama Produk', en: 'Product Name' },
  search_placeholder_product: { id: 'Contoh: Kopi, Roti, Kosmetik...', en: 'e.g. Coffee, Bread, Cosmetics...' },
  search_label_producer: { id: 'Nama Produsen / Perusahaan', en: 'Manufacturer / Company Name' },
  search_placeholder_producer: { id: 'Contoh: PT Sumber Pangan...', en: 'e.g. PT Sumber Pangan...' },
  search_label_cert: { id: 'No. Sertifikat / Ketetapan', en: 'Certificate / Ruling No.' },
  search_placeholder_cert: { id: 'ID32... / No. Sertifikat', en: 'ID32... / Certificate No.' },
  search_button: { id: 'Cari Produk Halal', en: 'Search Halal Product' },

  // Metrics
  metric_exp_label: { id: 'PENGALAMAN & DEDIKASI', en: 'EXPERIENCE & DEDICATION' },
  metric_exp_change: { id: 'Sejak 2016', en: 'Since 2016' },
  metric_exp_desc: { id: 'Dedikasi riset sains halal & sertifikasi resmi berkelanjutan bagi kemaslahatan umat.', en: 'Dedicated halal science research & official certification for community welfare.' },
  
  metric_certs_label: { id: 'SERTIFIKAT HALAL TERBIT', en: 'HALAL CERTIFICATES ISSUED' },
  metric_certs_desc: { id: 'Diterbitkan resmi bagi pelaku usaha mikro, kecil, hingga korporasi multinasional.', en: 'Officially issued for micro, small enterprises up to multinational corporations.' },

  metric_auditors_label: { id: 'AUDITOR & PENDAMPING', en: 'AUDITORS & SUPERVISORS' },
  metric_auditors_change: { id: 'Tersertifikasi', en: 'Certified' },
  metric_auditors_desc: { id: 'Auditor halal, penyelia, dan pendamping PPH berlisensi BPJPH & MUI di seluruh Indonesia.', en: 'Certified halal auditors, supervisors, and PPH assistants licensed across Indonesia.' },

  metric_lab_label: { id: 'STANDAR LABORATORIUM', en: 'LABORATORY STANDARD' },
  metric_lab_change: { id: 'Akreditasi KAN', en: 'KAN Accredited' },
  metric_lab_desc: { id: 'Pengujian saintifik presisi tinggi: Deteksi qPCR DNA Babi, GC-FID Etanol, & Gelatin.', en: 'High-precision scientific testing: Porcine DNA qPCR, GC-FID Ethanol, & Gelatin.' },

  // Chatbot
  chatbot_title: { id: 'Asisten AI Halal Center', en: 'Halal Center AI Assistant' },
  chatbot_subtitle: { id: 'Aktif 24/7 • Terhubung SIHALAL', en: 'Online 24/7 • SIHALAL Integrated' },
  chatbot_welcome: {
    id: 'Halo! Selamat datang di layanan cerdas Halal Center UIN Sunan Gunung Djati Bandung. Ada yang bisa kami bantu seputar sertifikasi halal, syarat dokumen, uji lab, atau tarif?',
    en: 'Hello! Welcome to Halal Center UIN Sunan Gunung Djati Bandung smart assistant. How can we assist you with halal certification, document requirements, lab testing, or fees?'
  },
  chatbot_input_placeholder: { id: 'Tanyakan sesuatu tentang sertifikasi halal...', en: 'Ask anything about halal certification...' },
  chatbot_disclaimer: { id: 'Didukung oleh Halal Center UIN Sunan Gunung Djati Bandung', en: 'Powered by Halal Center UIN Sunan Gunung Djati Bandung' },
  chatbot_fallback_message: {
    id: 'Pertanyaan Anda memerlukan verifikasi teknis lebih lanjut oleh Auditor / Petugas Halal Center UIN Sunan Gunung Djati Bandung. Silakan lanjutkan komunikasi langsung dengan tim kami via WhatsApp resmi:',
    en: 'Your inquiry requires further technical verification by our Halal Center Auditors / Officers. Please proceed with our team via our official WhatsApp:'
  },
  chatbot_wa_button: { id: 'Chat Tim via WhatsApp', en: 'Chat Support via WhatsApp' },
  chatbot_chip_fee: { id: '💰 Biaya Sertifikasi Halal', en: '💰 Halal Certification Fee' },
  chatbot_chip_selfdeclare: { id: '📋 Syarat Self Declare Gratis', en: '📋 Free Self-Declare Terms' },
  chatbot_chip_lab: { id: '🔬 Uji Lab DNA Babi ISO 17025', en: '🔬 Porcine DNA Lab Test' },
  chatbot_chip_sihalal: { id: '📜 Alur Pendaftaran SIHALAL', en: '📜 SIHALAL Registration Flow' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'id',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('halal_lang');
    return saved === 'en' ? 'en' : 'id';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('halal_lang', lang);
  };

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language] || translations[key].id;
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/home/HomePage';
import { AboutPage } from './pages/about/AboutPage';
import { NewsListPage } from './pages/news/NewsListPage';
import { NewsDetailPage } from './pages/news/NewsDetailPage';
import { AnnouncementListPage } from './pages/announcement/AnnouncementListPage';
import { AnnouncementDetailPage } from './pages/announcement/AnnouncementDetailPage';
import { QnaPage } from './pages/services/QnaPage';
import { PriceCalculatorPage } from './pages/services/PriceCalculatorPage';
import { SatisfactionPage } from './pages/services/SatisfactionPage';
import { ComplaintPage } from './pages/services/ComplaintPage';
import { ContactPage } from './pages/contact/ContactPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { Button } from '@heroui/react';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
        {/* Public Website with Header, Footer, and Floating WhatsApp/Chatbot */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tentang" element={<AboutPage />} />
          <Route path="/tentang-lppom" element={<Navigate to="/tentang" replace />} />
          <Route path="/berita" element={<NewsListPage />} />
          <Route path="/berita/:slug" element={<NewsDetailPage />} />
          <Route path="/artikel" element={<NewsListPage />} />
          <Route path="/artikel/:slug" element={<NewsDetailPage />} />
          <Route path="/pengumuman" element={<AnnouncementListPage />} />
          <Route path="/pengumuman/:slug" element={<AnnouncementDetailPage />} />

          {/* Layanan */}
          <Route path="/layanan" element={<Navigate to="/tentang#layanan" replace />} />
          <Route path="/layanan/qna" element={<QnaPage />} />
          <Route path="/faq" element={<Navigate to="/layanan/qna" replace />} />
          <Route path="/layanan/kalkulator" element={<PriceCalculatorPage />} />
          <Route path="/layanan/kalkulator-harga" element={<PriceCalculatorPage />} />
          <Route path="/registrasi" element={<Navigate to="/layanan/kalkulator" replace />} />
          <Route path="/layanan/kepuasan" element={<SatisfactionPage />} />
          <Route path="/layanan/kepuasan-pelanggan" element={<SatisfactionPage />} />
          <Route path="/layanan/pengaduan" element={<ComplaintPage />} />

          {/* Kontak */}
          <Route path="/kontak" element={<ContactPage />} />

          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
                <h1 className="text-7xl font-extrabold text-[#272353]">404</h1>
                <h3 className="text-xl font-bold text-neutral-800 mt-2 mb-2">Halaman Tidak Ditemukan</h3>
                <p className="text-sm text-neutral-500 mb-6 max-w-md">
                  Halaman yang Anda tuju mungkin salah ketik atau telah dipindahkan ke tautan baru.
                </p>
                <Link to="/">
                  <Button variant="primary" className="bg-[#272353] text-white font-semibold rounded-xl">
                    Kembali ke Beranda
                  </Button>
                </Link>
              </div>
            }
          />
        </Route>

        {/* Admin Portal (Isolated Layout) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;

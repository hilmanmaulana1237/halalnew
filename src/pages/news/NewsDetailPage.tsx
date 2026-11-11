import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card, Skeleton } from '@heroui/react';
import { Calendar, MapPin, ArrowLeft, Share2 } from 'lucide-react';
import { api, formatDate } from '@/services/api';
import { useLanguage } from '@/context/LanguageContext';
import { sanitizeHtml } from '@/lib/security';
import type { NewsItem } from '@/types';

export const NewsDetailPage: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const { slug } = useParams<{ slug: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/news/${slug}`);
        if (res.data?.success) {
          setNews(res.data.data);
        } else {
          throw new Error('Not found');
        }
      } catch {
        // Check localStorage first
        try {
          const raw = localStorage.getItem('lph_news_list');
          if (raw) {
            const list = JSON.parse(raw);
            const found = list.find((item: any) => item.slug === slug || String(item.id) === slug);
            if (found) {
              setNews(found);
              setLoading(false);
              return;
            }
          }
        } catch {}

        // Fallback for static mock
        setNews({
          id: 1,
          title:
            'Akselerasi Audit Sertifikasi Halal: LPH UIN Sunan Gunung Djati Perluas Jangkauan Industri Jawa Barat',
          slug: slug || 'akselerasi-sertifikasi-halal-uin-sgd',
          excerpt:
          'LPH UIN Sunan Gunung Djati terus memperkuat kapasitas audit kehalalan produk dan penerapan Sistem Jaminan Produk Halal (SJPH).',
          content: `Lembaga Pemeriksa Halal (LPH) UIN Sunan Gunung Djati Bandung terus memperkuat komitmennya sebagai motor penggerak ekosistem halal nasional melalui konsep "Halalsphere University". 

Dalam kegiatan bimbingan teknis intensif yang diselenggarakan di Kampus 1 Cibiru, tim auditor halal dan pelaku usaha dibekali pemahaman mendalam tentang standar Sistem Jaminan Produk Halal (SJPH), verifikasi dokumen bahan baku, serta validasi saintifik pengujian laboratorium.

Rektor UIN SGD Bandung, Prof. Dr. H. Rosihon Anwar, M.Ag., dalam sambutannya menegaskan bahwa keberadaan Lembaga Pemeriksa Halal (LPH) UIN SGD adalah bukti nyata hilirisasi riset akademik dan pengabdian masyarakat untuk memberikan rasa aman serta perlindungan konsumen muslim di seluruh penjuru Indonesia.

          Pimpinan Teknis LPH UIN SGD, Dr.Tri Cahyanto, M.Si., menambahkan bahwa kegiatan ini ditargetkan mampu mempercepat kepatuhan sertifikasi halal reguler bagi produk olahan makanan, minuman, dan farmasi di Jawa Barat.`,
          category: 'KEGIATAN',
          status: 'PUBLISHED',
          author: 'Humas LPH UIN SGD',
          image: '/assets/images/img_011.jpg',
          eventDate: '2026-11-10',
          eventLocation: 'Aula Gedung Rektorat Lt. 2 Kampus 1 UIN SGD',
          createdAt: '2026-11-04T08:00:00Z',
          updatedAt: '2026-11-04T08:00:00Z',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug]);

  if (loading || !news) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-4">
        <Skeleton className="h-10 w-3/4 rounded-xl" />
        <Skeleton className="h-80 w-full rounded-2xl" />
        <Skeleton className="h-6 w-full rounded-lg" />
        <Skeleton className="h-6 w-5/6 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-neutral-50 pb-20 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Back Link */}
        <Link
          to="/berita"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-[#6b1282] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {isEn ? 'Back to News List' : 'Kembali ke Daftar Berita'}
        </Link>

        {/* Article Card */}
        <Card className="bg-white rounded-3xl border border-neutral-200/80 shadow-md p-6 sm:p-10 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block px-3 py-1 rounded-md text-xs font-bold bg-[#6b1282] text-white">
                {news.category}
              </span>
              {isEn && news.titleEn && (
                <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  🇬🇧 English Translation
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1a0726] tracking-tight leading-snug">
              {isEn && news.titleEn ? news.titleEn : news.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 mt-4 pb-4 border-b border-neutral-100">
              <span className="flex items-center gap-1.5 text-neutral-600 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#6b1282]" />
                {formatDate(news.createdAt)}
              </span>
              <span>•</span>
              <span>{isEn ? 'Author:' : 'Penulis:'} {news.author}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden border border-neutral-100">
            <img
              src={news.image || '/assets/images/img_011.jpg'}
              alt={isEn && news.titleEn ? news.titleEn : news.title}
              className="w-full max-h-[450px] object-cover"
            />
          </div>

          {/* Event Metadata (if any) */}
          {(news.eventDate || news.eventLocation) && (
            <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 text-xs text-neutral-600 space-y-1">
              {news.eventDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#6b1282]" />
                  <span>
                    <strong>{isEn ? 'Event Date:' : 'Tanggal Acara:'}</strong> {formatDate(news.eventDate)}
                  </span>
                </div>
              )}
              {news.eventLocation && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#6b1282]" />
                  <span>
                    <strong>{isEn ? 'Location:' : 'Lokasi:'}</strong> {news.eventLocation}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Body Content with Anti-XSS Sanitization */}
          {(() => {
            const displayContent = isEn && news.contentEn ? news.contentEn : news.content;
            return displayContent.includes('<') ? (
              <div
                className="prose max-w-none text-neutral-700 text-sm sm:text-base leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(displayContent) }}
              />
            ) : (
              <div className="prose max-w-none text-neutral-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
                {displayContent}
              </div>
            );
          })()}
        </Card>
      </div>
    </div>
  );
};

export default NewsDetailPage;

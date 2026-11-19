import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Skeleton, Breadcrumbs } from '@heroui/react';
import {
  Calendar,
  MapPin,
  ArrowLeft,
  Share2,
  Clock,
  User,
  Check,
  MessageCircle,
  Copy,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { api, formatDate } from '@/services/api';
import { useLanguage } from '@/context/LanguageContext';
import { sanitizeHtml } from '@/lib/security';
import type { NewsItem } from '@/types';

export const NewsDetailPage: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const { slug } = useParams<{ slug: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Calculate estimated reading time (standard: 200 words per minute)
  const calculateReadingTime = (text: string) => {
    const words = text ? text.trim().split(/\s+/).length : 0;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} ${isEn ? 'min read' : 'menit baca'}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWA = () => {
    const title = news?.title || '';
    const url = window.location.href;
    const text = `${title}\n\nBaca artikel selengkapnya di portal resmi LPH UIN SGD:\n${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareTwitter = () => {
    const title = news?.title || '';
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
  };

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
        let allNewsList: NewsItem[] = [];
        try {
          const raw = localStorage.getItem('lph_news_list');
          if (raw) {
            allNewsList = JSON.parse(raw);
            const found = allNewsList.find((item: any) => item.slug === slug || String(item.id) === slug);
            if (found) {
              setNews(found);
              // Set related news (excluding current article)
              setRelatedNews(allNewsList.filter((item) => item.id !== found.id).slice(0, 3));
              setLoading(false);
              return;
            }
          }
        } catch { }

        // Fallback for static mock
        const fallbackNews: NewsItem = {
          id: 1,
          title:
            'Akselerasi Audit Sertifikasi Halal: LPH UIN Sunan Gunung Djati Perluas Jangkauan Industri Jawa Barat',
          slug: slug || 'akselerasi-sertifikasi-halal-uin-sgd',
          excerpt:
            'LPH UIN Sunan Gunung Djati terus memperkuat kapasitas audit kehalalan produk dan penerapan Sistem Jaminan Produk Halal (SJPH).',
          content: `Lembaga Pemeriksa Halal (LPH) UIN Sunan Gunung Djati Bandung terus memperkuat komitmennya sebagai motor penggerak ekosistem halal nasional melalui konsep "Halalsphere University". 

Dalam kegiatan bimbingan teknis intensif yang diselenggarakan di Aula Utama LPH UIN SGD Bandung, tim auditor halal dan pelaku usaha dibekali pemahaman mendalam tentang standar Sistem Jaminan Produk Halal (SJPH), verifikasi dokumen bahan baku, serta validasi saintifik pengujian laboratorium.

Rektor UIN SGD Bandung, Prof. Dr. H. Rosihon Anwar, M.Ag., dalam sambutannya menegaskan bahwa keberadaan Lembaga Pemeriksa Halal (LPH) UIN SGD adalah bukti nyata hilirisasi riset akademik dan pengabdian masyarakat untuk memberikan rasa aman serta perlindungan konsumen muslim di seluruh penjuru Indonesia.

Pimpinan Teknis LPH UIN SGD, Dr. Tri Cahyanto, M.Si., menambahkan bahwa kegiatan ini ditargetkan mampu mempercepat kepatuhan sertifikasi halal reguler bagi produk olahan makanan, minuman, dan farmasi di Jawa Barat.`,
          category: 'KEGIATAN',
          status: 'PUBLISHED',
          author: 'Humas LPH UIN SGD',
          image: '/assets/images/img_011.jpg',
          eventDate: '2026-11-10',
          eventLocation: 'Aula Utama LPH UIN SGD Bandung',
          createdAt: '2026-11-04T08:00:00Z',
          updatedAt: '2026-11-04T08:00:00Z',
        };
        setNews(fallbackNews);

        // Fallback related news
        setRelatedNews([
          {
            id: 2,
            title: 'Bimbingan Teknis Penerapan Standar Halal Bagi 50 UMKM Makanan Minuman',
            slug: 'bimtek-standar-halal-umkm',
            excerpt: 'Pendampingan sertifikasi halal reguler kolaborasi LPH UIN SGD bersama Dinas Koperasi & UMKM.',
            content: '',
            category: 'PELATIHAN',
            status: 'PUBLISHED',
            author: 'Tim Auditor LPH',
            image: '/assets/images/img_013.jpg',
            createdAt: '2026-11-08T09:00:00Z',
            updatedAt: '2026-11-08T09:00:00Z',
          },
          {
            id: 3,
            title: 'Kunjungan Kerja Monitoring BPJPH: Tinjau Kesiapan Laboratorium Terpadu',
            slug: 'kunjungan-monitoring-bpjph',
            excerpt: 'Pimpinan BPJPH mengapresiasi kecepatan waktu audit dan kelengkapan sarana pengujian bahan halal.',
            content: '',
            category: 'KUNJUNGAN',
            status: 'PUBLISHED',
            author: 'Humas LPH',
            image: '/assets/images/uin_sgd/uin_14.webp',
            createdAt: '2026-11-12T10:00:00Z',
            updatedAt: '2026-11-12T10:00:00Z',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug]);

  if (loading || !news) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-4">
        <Skeleton className="h-6 w-1/3 rounded-lg" />
        <Skeleton className="h-10 w-3/4 rounded-xl" />
        <Skeleton className="h-80 w-full rounded-2xl" />
        <Skeleton className="h-6 w-full rounded-lg" />
        <Skeleton className="h-6 w-5/6 rounded-lg" />
      </div>
    );
  }

  const displayTitle = isEn && news.titleEn ? news.titleEn : news.title;
  const displayContent = isEn && news.contentEn ? news.contentEn : news.content;
  const displayAuthor = news.author?.trim() ? news.author : 'Humas LPH UIN SGD Bandung';
  const displayDate = news.createdAt ? formatDate(news.createdAt) : 'Terbaru';

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FAF7FD] pb-24 pt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* 1. Official Breadcrumbs Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <Breadcrumbs>
            <Breadcrumbs.Item href="/">{isEn ? 'Home' : 'Beranda'}</Breadcrumbs.Item>
            <Breadcrumbs.Item href="/berita">{isEn ? 'News' : 'Berita'}</Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <span className="font-bold text-[#6B18A8]">
                {news.category || (isEn ? 'Article' : 'Artikel')}
              </span>
            </Breadcrumbs.Item>
          </Breadcrumbs>

          <Link
            to="/berita"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-[#6B18A8] transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isEn ? 'Back to News' : 'Kembali ke Berita'}</span>
          </Link>
        </div>

        {/* 2. Main Article Card */}
        <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-lg p-6 sm:p-10 space-y-6">
          
          {/* Header Metadata */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Single Category Badge (Bug duplikasi tuntas diperbaiki) */}
              <div className="flex items-center gap-2">
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black bg-[#6B18A8] text-white tracking-wider uppercase">
                  {news.category || 'KEGIATAN'}
                </span>
                {isEn && news.titleEn && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    🇬🇧 English Translation
                  </span>
                )}
              </div>

              {/* Reading Time Badge */}
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5 text-[#6B18A8]" />
                <span>{calculateReadingTime(displayContent)}</span>
              </span>
            </div>

            {/* Article Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#292333] tracking-tight leading-snug">
              {displayTitle}
            </h1>

            {/* Author & Publication Date Row (Clean, No Broken Hyphen) */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 pt-2 pb-4 border-b border-neutral-100">
              <span className="flex items-center gap-1.5 font-semibold text-neutral-700">
                <Calendar className="w-4 h-4 text-[#6B18A8]" />
                <span>{displayDate}</span>
              </span>
              <span className="text-neutral-300">•</span>
              <span className="flex items-center gap-1.5 font-medium text-neutral-600">
                <User className="w-4 h-4 text-[#F5D32F]" />
                <span>{isEn ? 'Author:' : 'Penulis:'} <strong>{displayAuthor}</strong></span>
              </span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden border border-neutral-200/80 shadow-inner bg-neutral-100">
            <img
              src={news.image || '/assets/images/img_011.jpg'}
              alt={displayTitle}
              className="w-full max-h-[460px] object-cover"
            />
          </div>

          {/* Social Share Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30">
            <span className="text-xs font-bold text-[#6B18A8] flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-[#6B18A8]" />
              <span>{isEn ? 'Share this article:' : 'Bagikan artikel ini:'}</span>
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleShareWA}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer transition-all"
                aria-label="Share via WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={handleShareTwitter}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-black text-white font-bold text-xs shadow-xs cursor-pointer transition-all"
                aria-label="Share on X"
              >
                <span>𝕏 Post</span>
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-300 font-bold text-xs shadow-xs cursor-pointer transition-all"
                aria-label="Copy link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-neutral-600" />}
                <span>{copied ? (isEn ? 'Copied!' : 'Tersalin!') : (isEn ? 'Copy Link' : 'Salin Tautan')}</span>
              </button>
            </div>
          </div>

          {/* Event Metadata (if available) */}
          {(news.eventDate || news.eventLocation) && (
            <div className="p-4 rounded-xl bg-[#FAF7FD] border border-[#C9A5E8]/40 text-xs text-neutral-700 space-y-1.5">
              {news.eventDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#6B18A8]" />
                  <span>
                    <strong>{isEn ? 'Event Date:' : 'Tanggal Acara:'}</strong> {formatDate(news.eventDate)}
                  </span>
                </div>
              )}
              {news.eventLocation && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#6B18A8]" />
                  <span>
                    <strong>{isEn ? 'Location:' : 'Lokasi:'}</strong> {news.eventLocation}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Article Body Content with Anti-XSS Sanitization */}
          {displayContent.includes('<') ? (
            <div
              className="prose max-w-none text-neutral-800 text-sm sm:text-base leading-relaxed space-y-4 pt-2"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(displayContent) }}
            />
          ) : (
            <div className="prose max-w-none text-neutral-800 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line pt-2">
              {displayContent}
            </div>
          )}

          {/* Author / Editorial Byline Box */}
          <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center gap-4 bg-[#FAF7FD] p-4 sm:p-5 rounded-2xl border border-[#C9A5E8]/20">
            <div className="w-12 h-12 rounded-full bg-[#6B18A8] text-white font-black flex items-center justify-center shrink-0 text-sm shadow-sm">
              LPH
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-neutral-900">
                Pusat Publikasi & Informasi Resmi
              </h4>
              <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                Lembaga Pemeriksa Halal (LPH) UIN Sunan Gunung Djati Bandung • Melayani Pemeriksaan Halal Nasional & Internasional
              </p>
            </div>
          </div>
        </Card>

        {/* 3. Related News Section */}
        {relatedNews.length > 0 && (
          <div className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#6B18A8]" />
                <h3 className="text-lg sm:text-xl font-bold text-[#292333]">
                  {isEn ? 'Related News & Updates' : 'Berita & Informasi Terkait Lainnya'}
                </h3>
              </div>
              <Link
                to="/berita"
                className="text-xs font-bold text-[#6B18A8] hover:underline flex items-center gap-1"
              >
                <span>{isEn ? 'View All' : 'Lihat Semua'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedNews.map((item) => (
                <Link
                  key={item.id}
                  to={`/berita/${item.slug}`}
                  className="group block"
                >
                  <Card className="bg-white rounded-2xl border border-[#C9A5E8]/30 overflow-hidden shadow-xs hover:shadow-md hover:border-[#6B18A8]/50 transition-all h-full flex flex-col justify-between">
                    <div>
                      <div className="h-36 overflow-hidden bg-neutral-100">
                        <img
                          src={item.image || '/assets/images/img_011.jpg'}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF7FD] text-[#6B18A8] border border-[#C9A5E8]/40">
                          {item.category}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-[#6B18A8] transition-colors line-clamp-2 leading-snug">
                          {isEn && item.titleEn ? item.titleEn : item.title}
                        </h4>
                      </div>
                    </div>
                    <div className="px-4 pb-4 pt-1 text-[11px] text-neutral-400 border-t border-neutral-50 flex items-center justify-between">
                      <span>{item.createdAt ? formatDate(item.createdAt) : ''}</span>
                      <span className="text-[#6B18A8] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        Baca <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default NewsDetailPage;

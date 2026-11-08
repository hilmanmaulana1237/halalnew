import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, Card, Input, Skeleton } from '@heroui/react';
import { Newspaper, Calendar, MapPin, ArrowRight, Search } from 'lucide-react';
import { api, formatDate } from '@/services/api';
import { useLanguage } from '@/context/LanguageContext';
import type { NewsItem } from '@/types';
import { SparklesCore } from '@/components/ui/sparkles';

const INITIAL_NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'Akselerasi Audit Sertifikasi Halal: LPH UIN SGD Perluas Jangkauan Industri Jawa Barat',
    slug: 'akselerasi-sertifikasi-halal-uin-sgd',
    excerpt:
      'LPH Halal Center UIN Sunan Gunung Djati terus memperkuat kapasitas audit kehalalan produk dan penerapan Sistem Jaminan Produk Halal (SJPH).',
    content:
      'LPH Halal Center UIN Sunan Gunung Djati Bandung menggelar bimbingan teknis akbar persiapan audit halal reguler dan verifikasi bahan kritis bagi pelaku usaha di Jawa Barat...',
    category: 'KEGIATAN',
    status: 'PUBLISHED',
    author: 'Humas Halal Center',
    image: '/assets/images/img_011.jpg',
    eventDate: '2026-11-10',
    eventLocation: 'Aula Gedung Rektorat Lt. 2 Kampus 1 UIN SGD',
    createdAt: '2026-11-04T08:00:00Z',
    updatedAt: '2026-11-04T08:00:00Z',
  },
  {
    id: 2,
    title: 'Kerjasama Internasional: Ekosistem Halalsphere University Menuju Kancah Global',
    slug: 'kerjasama-internasional-halalsphere-university',
    excerpt:
      'Rektor UIN SGD menegaskan kesiapan lab halal terpadu untuk pengujian sampel dan pengakuan standar sertifikasi internasional.',
    content:
      'Dalam upaya memperluas jejaring global, UIN Sunan Gunung Djati Bandung menjalin kemitraan strategis dengan berbagai lembaga riset halal mancanegara...',
    category: 'ACARA',
    status: 'PUBLISHED',
    author: 'Tim Riset IJHR',
    image: '/assets/images/img_012.jpg',
    eventDate: '2026-11-15',
    eventLocation: 'Auditorium Utama UIN SGD',
    createdAt: '2026-11-03T10:00:00Z',
    updatedAt: '2026-11-03T10:00:00Z',
  },
  {
    id: 3,
    title: 'Kewajiban Sertifikasi Halal Bertahap bagi Pelaku Usaha Makanan dan Minuman',
    slug: 'kewajiban-sertifikasi-halal-bertahap',
    excerpt:
      'Pemberlakuan penahapan kewajiban bersertifikat halal sesuai regulasi UU No. 33 Tahun 2014 dan Perpu No. 2 Tahun 2022.',
    content:
      'Kementerian Agama melalui BPJPH terus mengingatkan para pelaku usaha makanan dan minuman untuk segera mengurus sertifikasi halal sebelum batas akhir yang ditentukan...',
    category: 'AGENDA',
    status: 'PUBLISHED',
    author: 'Badan Pengawas Halal',
    image: '/assets/images/img_013.jpg',
    createdAt: '2026-11-02T14:30:00Z',
    updatedAt: '2026-11-02T14:30:00Z',
  },
  {
    id: 4,
    title: 'Fatwa Standar Kehalalan Produk Rekayasa Genetika (GMO) dan Mikroba Rekombinan',
    slug: 'fatwa-standar-kehalalan-rekayasa-genetika',
    excerpt:
      'Pedoman penetapan kehalalan bahan hasil fermentasi mikroba rekombinan dan bahan bioteknologi pangan modern.',
    content:
      'Komisi Fatwa MUI bersama para pakar bioteknologi menetapkan standar fikih ilmiah terkait penggunaan enzim dan ragi hasil rekayasa genetika...',
    category: 'AGENDA',
    status: 'PUBLISHED',
    author: 'Pakar Sains Halal',
    image: '/assets/images/img_014.jpg',
    createdAt: '2026-11-01T09:15:00Z',
    updatedAt: '2026-11-01T09:15:00Z',
  },
];

export const NewsListPage: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [searchParams, setSearchParams] = useSearchParams();
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [loading, setLoading] = useState(false);

  const category = searchParams.get('category') || 'ALL';
  const query = searchParams.get('q') || '';

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await api.get('/news', {
          params: {
            category: category !== 'ALL' ? category : undefined,
            q: query || undefined,
          },
        });
        if (res.data?.success && res.data.data.length > 0) {
          setNews(res.data.data);
        }
      } catch {
        // Fallback to local
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [category, query]);

  const handleCategoryChange = (cat: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (cat === 'ALL') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', cat);
    }
    setSearchParams(nextParams);
  };

  const getCategoryLabel = (cat: string) => {
    if (!isEn) {
      if (cat === 'ALL') return 'Semua Kategori';
      return cat;
    }
    switch (cat) {
      case 'ALL':
        return 'All Categories';
      case 'KEGIATAN':
        return 'ACTIVITIES';
      case 'ACARA':
        return 'EVENTS';
      case 'AGENDA':
        return 'AGENDA';
      default:
        return cat;
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-neutral-50 pb-20">
      {/* Banner in Royal Purple Gradient with Yellow Accents & Sparkles */}
      <section className="relative py-20 lg:py-24 bg-[#1a0726] text-white overflow-hidden text-center">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#4B0D78] via-[#6B18A8] via-[#F5D32F] to-[#6B18A8]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0726] via-[#4a0d5c] to-[#1a0726] opacity-95" />
        <SparklesCore
          id="news-sparkles"
          minSize={0.7}
          maxSize={2.2}
          particleDensity={35}
          particleColor={['#ffffff', '#f5d0fe', '#F5D32F', '#d8b4fe']}
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7D1] text-[#713f12] text-xs font-extrabold uppercase tracking-wider mb-4 border border-[#F5D32F] shadow-xs">
            <Newspaper className="w-3.5 h-3.5 text-[#eab308]" />
            {isEn ? 'News, Research & Events' : 'Warta, Riset & Kegiatan'}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-2xl leading-tight">
            {isEn ? (
              <>Halal Center <span className="text-[#F5D32F]">News & Media</span></>
            ) : (
              <>Warta & Berita <span className="text-[#F5D32F]">Halal Center</span></>
            )}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-200 max-w-2xl mx-auto leading-relaxed font-normal">
            {isEn
              ? 'Latest information regarding training schedules, laboratory research breakthroughs, and national halal product regulations.'
              : 'Informasi terkini mengenai agenda pelatihan, capaian riset laboratorium, dan regulasi jaminan produk halal nasional.'}
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-8 space-y-8">
        {/* Filter Card */}
        <Card className="bg-white rounded-2xl border border-neutral-200/80 shadow-md p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {['ALL', 'KEGIATAN', 'ACARA', 'AGENDA'].map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={category === cat ? 'primary' : 'outline'}
                className={
                  category === cat
                    ? 'bg-[#6b1282] text-white font-bold text-xs py-1.5 px-3 rounded-lg shadow-xs'
                    : 'border-neutral-200 text-neutral-700 text-xs py-1.5 px-3 rounded-lg hover:bg-neutral-50'
                }
                onPress={() => handleCategoryChange(cat)}
              >
                {getCategoryLabel(cat)}
              </Button>
            ))}
          </div>

          <div className="w-full sm:w-72">
            <Input
              placeholder={isEn ? "Search news title..." : "Cari judul berita..."}
              value={query}
              onChange={(e) => {
                const nextParams = new URLSearchParams(searchParams);
                if (e.target.value) {
                  nextParams.set('q', e.target.value);
                } else {
                  nextParams.delete('q');
                }
                setSearchParams(nextParams);
              }}
              className="w-full"
            />
          </div>
        </Card>

        {/* News Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-80 w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <Card
                key={item.id}
                className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-neutral-100">
                    <img
                      src={item.image || '/assets/images/img_011.jpg'}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#6b1282] text-white shadow-md">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{formatDate(item.createdAt)}</span>
                      <span>•</span>
                      <span>{item.author}</span>
                    </div>

                    <h3 className="font-bold text-lg text-neutral-900 leading-snug line-clamp-2 hover:text-[#6b1282] transition-colors">
                      <Link to={`/berita/${item.slug || item.id}`}>{item.title}</Link>
                    </h3>

                    <p className="text-xs text-neutral-500 mt-2 line-clamp-3 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-neutral-100 mt-2">
                  <Link
                    to={`/berita/${item.slug || item.id}`}
                    className="text-xs font-bold text-[#6b1282] hover:underline flex items-center gap-1 pt-3"
                  >
                    {isEn ? 'Read More' : 'Baca Selengkapnya'} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsListPage;

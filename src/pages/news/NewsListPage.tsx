import React, { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, Card, Input, Skeleton, Pagination } from '@heroui/react';
import { Newspaper, Calendar, ArrowRight, Search } from 'lucide-react';
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
      'LPH UIN Sunan Gunung Djati terus memperkuat kapasitas audit kehalalan produk dan penerapan Sistem Jaminan Produk Halal (SJPH).',
    content:
      'LPH UIN Sunan Gunung Djati Bandung menggelar bimbingan teknis akbar persiapan audit halal reguler dan verifikasi bahan kritis bagi pelaku usaha di Jawa Barat...',
    category: 'KEGIATAN',
    status: 'PUBLISHED',
    author: 'Humas LPH UIN SGD',
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
  {
    id: 5,
    title: 'Workshop Standarisasi Laboratorium Pengujian Halal Terpadu ISO/IEC 17025',
    slug: 'workshop-standarisasi-laboratorium-iso-17025',
    excerpt:
      'Pelatihan mendalam metode pengujian laboratorium presisi deteksi cemaran alkohol dan profil asam lemak bersama praktisi ahli.',
    content:
      'Laboratorium Uji Halal UIN SGD menyelenggarakan workshop penguatan kalibrasi dan validasi instrumen GC-FID serta qPCR...',
    category: 'KEGIATAN',
    status: 'PUBLISHED',
    author: 'Laboratorium Halal SGD',
    image: '/assets/images/uin_sgd/uin_14.webp',
    createdAt: '2026-10-28T09:00:00Z',
    updatedAt: '2026-10-28T09:00:00Z',
  },
  {
    id: 6,
    title: 'Sosialisasi Sertifikasi Halal Reguler Bagi Pelaku UMKM Binaan Se-Jawa Barat',
    slug: 'sosialisasi-sertifikasi-halal-reguler-umkm',
    excerpt:
      'Panduan teknis penyusunan manual SJPH dan kelengkapan dokumen persyaratan sertifikasi halal melalui portal SiHalal.',
    content:
      'Ratusan pelaku usaha binaan di Jawa Barat mengikuti sosialisasi tatap muka intensif mengenai kriteria sistem jaminan produk halal...',
    category: 'ACARA',
    status: 'PUBLISHED',
    author: 'Humas LPH UIN SGD',
    image: '/assets/images/uin_sgd/uin_15.webp',
    createdAt: '2026-10-25T11:20:00Z',
    updatedAt: '2026-10-25T11:20:00Z',
  },
  {
    id: 7,
    title: 'Pelatihan Kompetensi Calon Auditor Halal Angkatan VI LPH UIN SGD',
    slug: 'pelatihan-kompetensi-calon-auditor-halal-vi',
    excerpt:
      'Program intensif peningkatan kapasitas calon auditor halal mencakup audit kepatuhan syariah dan verifikasi ketertelusuran bahan.',
    content:
      'Sebanyak 35 peserta dari berbagai disiplin ilmu pangan, kimia, dan biologi mengikuti diklat kompetensi auditor halal profesional...',
    category: 'AGENDA',
    status: 'PUBLISHED',
    author: 'Divisi Diklat Auditor',
    image: '/assets/images/uin_sgd/uin_16.webp',
    createdAt: '2026-10-20T08:30:00Z',
    updatedAt: '2026-10-20T08:30:00Z',
  },
  {
    id: 8,
    title: 'Uji Presisi Deteksi Residu DNA Babi Berbasis Real-Time qPCR pada Olahan Daging',
    slug: 'uji-presisi-deteksi-dna-babi-qpcr',
    excerpt:
      'Penelitian saintifik pembuktian batas deteksi kehalalan produk pangan beku olahan komersial di laboratorium riset terakreditasi.',
    content:
      'Tim saintis laboratorium LPH UIN SGD berhasil mempublikasikan temuan metode ekstraksi cepat DNA spesifik babi pada produk pangan olahan...',
    category: 'KEGIATAN',
    status: 'PUBLISHED',
    author: 'Tim Peneliti Hayati',
    image: '/assets/images/img_015.jpg',
    createdAt: '2026-10-15T13:45:00Z',
    updatedAt: '2026-10-15T13:45:00Z',
  },
  {
    id: 9,
    title: 'Simposium Nasional Penerapan Fikih Halal dan Rekayasa Enzim Pangan Modern',
    slug: 'simposium-nasional-fikih-halal-enzim-modern',
    excerpt:
      'Diskusi lintas disiplin mempertemukan ulama fikih dan pakar bioteknologi dalam menentukan ketetapan hukum bahan penolong industri.',
    content:
      'Simposium ini merumuskan batasan kaidah istihalah dan istihlak dalam produksi pangan berbasis fermentasi modern...',
    category: 'ACARA',
    status: 'PUBLISHED',
    author: 'Komite Syariah & Riset',
    image: '/assets/images/img_011.jpg',
    createdAt: '2026-10-10T10:15:00Z',
    updatedAt: '2026-10-10T10:15:00Z',
  },
  {
    id: 10,
    title: 'Kunjungan Edukasi Industri dan Pendampingan Pengisian Akun SiHalal BPJPH',
    slug: 'kunjungan-edukasi-industri-pendampingan-sihalal',
    excerpt:
      'Layanan jemput bola tim LPH untuk memfasilitasi verifikasi berkas dan registrasi audit pelaku industri farmasi dan kosmetik.',
    content:
      'Tim auditor LPH UIN SGD mengunjungi kawasan industri manufaktur guna memberikan asistensi pemenuhan manual SJPH secara langsung...',
    category: 'AGENDA',
    status: 'PUBLISHED',
    author: 'Divisi Pelayanan Publik',
    image: '/assets/images/img_012.jpg',
    createdAt: '2026-10-05T09:20:00Z',
    updatedAt: '2026-10-05T09:20:00Z',
  },
  {
    id: 11,
    title: 'Penerbitan Edisi Terbaru Indonesian Journal of Halal Research (IJHR) Vol. 6',
    slug: 'penerbitan-edisi-ijhr-vol-6',
    excerpt:
      'Jurnal bereputasi internasional memuat riset terkini mengenai autentikasi gelatin, sertifikasi halal lintas negara, dan fikih sains.',
    content:
      'IJHR terus membuktikan komitmen keilmuan UIN SGD dalam menyumbangkan publikasi rujukan bagi ekosistem riset halal dunia...',
    category: 'KEGIATAN',
    status: 'PUBLISHED',
    author: 'Dewan Redaksi IJHR',
    image: '/assets/images/img_013.jpg',
    createdAt: '2026-09-30T14:00:00Z',
    updatedAt: '2026-09-30T14:00:00Z',
  },
  {
    id: 12,
    title: 'Konsolidasi Tim Auditor Halal Dalam Menghadapi Penahapan Wajib Halal 2026',
    slug: 'konsolidasi-tim-auditor-halal-penahapan-2026',
    excerpt:
      'Penyelarasan SOP pemeriksaan kehalalan produk obat bebas, suplemen, dan kosmetik menyongsong tenggat waktu nasional.',
    content:
      'Pertemuan koordinasi berkala ini memastikan seluruh auditor memiliki kesamaan persepsi instrumen audit dan integritas standar...',
    category: 'ACARA',
    status: 'PUBLISHED',
    author: 'Pimpinan Teknis LPH',
    image: '/assets/images/img_014.jpg',
    createdAt: '2026-09-25T15:30:00Z',
    updatedAt: '2026-09-25T15:30:00Z',
  },
];

const ITEMS_PER_PAGE = 6;

export const NewsListPage: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [searchParams, setSearchParams] = useSearchParams();
  const [news, setNews] = useState<NewsItem[]>(() => {
    try {
      const raw = localStorage.getItem('lph_news_list');
      if (raw) return JSON.parse(raw);
    } catch {}
    return INITIAL_NEWS;
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const category = searchParams.get('category') || 'ALL';
  const query = searchParams.get('q') || '';

  // Dynamic Categories from LocalStorage and active items
  const categoriesList = useMemo(() => {
    let cats: string[] = ['ALL', 'KEGIATAN', 'ACARA', 'AGENDA', 'EDUKASI', 'PUBLIKASI'];
    try {
      const raw = localStorage.getItem('lph_news_categories');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          cats = ['ALL', ...parsed];
        }
      }
    } catch {}
    news.forEach((item) => {
      if (item.category && !cats.includes(item.category)) {
        cats.push(item.category);
      }
    });
    return Array.from(new Set(cats));
  }, [news]);

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

  // Reset page when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
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
      case 'EDUKASI':
        return 'EDUCATION';
      case 'PUBLIKASI':
        return 'PUBLICATIONS';
      case 'KERJASAMA':
        return 'PARTNERSHIP';
      default:
        return cat;
    }
  };

  // Filtered and paginated news
  const filteredNews = news.filter((item) => {
    const matchesCategory = category === 'ALL' || item.category === category;
    const matchesQuery =
      !query ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.excerpt && item.excerpt.toLowerCase().includes(query.toLowerCase())) ||
      (item.author && item.author.toLowerCase().includes(query.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const totalPages = Math.max(1, Math.ceil(filteredNews.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredNews.length);
  const paginatedNews = filteredNews.slice(startIndex, endIndex);

  // Pagination helper with ellipsis support
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (safeCurrentPage > 3) {
        pages.push('ellipsis');
      }
      const start = Math.max(2, safeCurrentPage - 1);
      const end = Math.min(totalPages - 1, safeCurrentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (safeCurrentPage < totalPages - 2) {
        pages.push('ellipsis');
      }
      pages.push(totalPages);
    }
    return pages;
  };

  const scrollToGridTop = () => {
    const el = document.getElementById('news-grid-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
              <>LPH UIN SGD <span className="text-[#F5D32F]">News & Media</span></>
            ) : (
              <>Warta & Berita <span className="text-[#F5D32F]">LPH UIN SGD</span></>
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
      <div id="news-grid-container" className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-8 space-y-8 scroll-mt-24">
        {/* Filter Card */}
        <Card className="bg-white rounded-2xl border border-neutral-200/80 shadow-md p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {categoriesList.map((cat: string) => (
              <Button
                key={cat}
                size="sm"
                variant={category === cat ? 'primary' : 'outline'}
                className={
                  category === cat
                    ? 'bg-[#6B18A8] text-white font-bold text-xs py-1.5 px-3 rounded-lg shadow-xs cursor-pointer'
                    : 'border-neutral-200 text-neutral-700 text-xs py-1.5 px-3 rounded-lg hover:bg-neutral-50 cursor-pointer'
                }
                onPress={() => handleCategoryChange(cat)}
              >
                {getCategoryLabel(cat)}
              </Button>
            ))}
          </div>

          <div className="w-full sm:w-72 relative">
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
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-80 w-full rounded-2xl" />
            ))}
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200/80 p-8 space-y-3">
            <Newspaper className="w-12 h-12 text-neutral-300 mx-auto" />
            <h3 className="text-base font-bold text-neutral-800">
              {isEn ? 'No articles found' : 'Tidak ada berita ditemukan'}
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              {isEn
                ? 'Try searching with different keywords or switch the category filter.'
                : 'Coba gunakan kata kunci pencarian lain atau pilih kategori berbeda.'}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedNews.map((item) => (
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
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#6B18A8] text-white shadow-md">
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

                      <h3 className="font-bold text-lg text-neutral-900 leading-snug line-clamp-2 hover:text-[#6B18A8] transition-colors">
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
                      className="text-xs font-bold text-[#6B18A8] hover:underline flex items-center gap-1 pt-3"
                    >
                      {isEn ? 'Read More' : 'Baca Selengkapnya'} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>

            {/* Official HeroUI Pagination */}
            <div className="pt-4">
              <Pagination className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
                <Pagination.Summary className="text-xs sm:text-sm text-neutral-600 font-semibold">
                  {isEn
                    ? `Showing ${startIndex + 1}-${endIndex} of ${filteredNews.length} articles`
                    : `Menampilkan ${startIndex + 1}-${endIndex} dari ${filteredNews.length} berita`}
                </Pagination.Summary>

                {totalPages > 1 && (
                  <Pagination.Content className="flex items-center gap-1.5 flex-wrap justify-center">
                    <Pagination.Item>
                      <Pagination.Previous
                        isDisabled={safeCurrentPage === 1}
                        onPress={() => {
                          setCurrentPage((p) => Math.max(1, p - 1));
                          scrollToGridTop();
                        }}
                        className="cursor-pointer px-3 py-1.5 text-xs font-bold rounded-xl border border-neutral-200 bg-white hover:bg-[#FAF7FD] hover:text-[#6B18A8] hover:border-[#C9A5E8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 shadow-2xs"
                      >
                        <Pagination.PreviousIcon />
                        <span>{isEn ? 'Previous' : 'Sebelumnya'}</span>
                      </Pagination.Previous>
                    </Pagination.Item>

                    {getPageNumbers().map((p, i) =>
                      p === 'ellipsis' ? (
                        <Pagination.Item key={`ellipsis-${i}`}>
                          <Pagination.Ellipsis className="px-2 text-neutral-400 font-bold" />
                        </Pagination.Item>
                      ) : (
                        <Pagination.Item key={p}>
                          <Pagination.Link
                            isActive={p === safeCurrentPage}
                            onPress={() => {
                              setCurrentPage(p);
                              scrollToGridTop();
                            }}
                            className={`cursor-pointer w-9 h-9 flex items-center justify-center text-xs font-bold rounded-xl transition-all ${
                              p === safeCurrentPage
                                ? 'bg-[#6B18A8] text-white shadow-md shadow-purple-950/25 font-black border border-[#6B18A8]'
                                : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-[#FAF7FD] hover:text-[#6B18A8] hover:border-[#C9A5E8]'
                            }`}
                          >
                            {p}
                          </Pagination.Link>
                        </Pagination.Item>
                      )
                    )}

                    <Pagination.Item>
                      <Pagination.Next
                        isDisabled={safeCurrentPage === totalPages}
                        onPress={() => {
                          setCurrentPage((p) => Math.min(totalPages, p + 1));
                          scrollToGridTop();
                        }}
                        className="cursor-pointer px-3 py-1.5 text-xs font-bold rounded-xl border border-neutral-200 bg-white hover:bg-[#FAF7FD] hover:text-[#6B18A8] hover:border-[#C9A5E8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 shadow-2xs"
                      >
                        <span>{isEn ? 'Next' : 'Selanjutnya'}</span>
                        <Pagination.NextIcon />
                      </Pagination.Next>
                    </Pagination.Item>
                  </Pagination.Content>
                )}
              </Pagination>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsListPage;

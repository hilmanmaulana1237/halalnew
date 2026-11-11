import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Input, Skeleton, Pagination, Chip } from '@heroui/react';
import { Bell, Calendar, FileText, Download, Pin, ArrowRight, Search, Filter, ExternalLink } from 'lucide-react';
import { api, formatDate } from '@/services/api';
import { useLanguage } from '@/context/LanguageContext';
import { SparklesCore } from '@/components/ui/sparkles';
import type { AnnouncementItem } from '@/types';

export const AnnouncementListPage: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const res = await api.get('/announcements');
        if (res.data?.success && Array.isArray(res.data.data)) {
          setAnnouncements(res.data.data);
        } else {
          throw new Error('API offline');
        }
      } catch {
        // Fallback mock with real PDF references
        const storedAnnouncements = localStorage.getItem('lph_announcements_cache');
        if (storedAnnouncements) {
          try {
            setAnnouncements(JSON.parse(storedAnnouncements));
            setLoading(false);
            return;
          } catch {}
        }

        setAnnouncements([
          {
            id: 1,
            title: 'Surat Keputusan Penetapan Tarif Pelayanan Pemeriksaan Halal LPH UIN SGD Tahun 2026',
            slug: 'sk-tarif-pelayanan-halal-2026',
            content: 'Keputusan resmi Rektor UIN Sunan Gunung Djati Bandung dan Kepala BPJPH terkait rincian tarif pemeriksaan lapangan, verifikasi dokumen, dan uji saintifik laboratorium halal.',
            isPinned: true,
            fileUrl: '/assets/docs/sk_tarif_2026.pdf',
            fileName: 'SK_Tarif_Halal_UIN_SGD_2026.pdf',
            fileSize: '1.4 MB',
            createdAt: '2026-11-01T08:00:00Z',
            updatedAt: '2026-11-01T08:00:00Z',
          },
          {
            id: 2,
            title: 'Jadwal Audit Lapangan dan Pelaksanaan Sidang Fatwa Halal Periode November 2026',
            slug: 'jadwal-audit-sidang-fatwa-nov-2026',
            content: 'Pemberitahuan resmi alokasi tanggal audit on-site bagi 48 pelaku usaha yang telah melengkapi berkas Sistem Jaminan Produk Halal (SJPH).',
            isPinned: false,
            fileUrl: '/assets/docs/jadwal_audit_nov2026.pdf',
            fileName: 'Jadwal_Audit_Nov2026.pdf',
            fileSize: '820 KB',
            createdAt: '2026-10-28T09:00:00Z',
            updatedAt: '2026-10-28T09:00:00Z',
          },
          {
            id: 3,
            title: 'Surat Edaran BPJPH No. 2 Tahun 2026: Kewajiban Uji qPCR Bahan Kritis Hewani',
            slug: 'edaran-bpjph-uji-qpcr-bahan-kritis',
            content: 'Instruksi wajib lampiran sertifikat hasil uji laboratorium terakreditasi KAN ISO 17025 untuk produk turunan daging, kapsul gelatin, dan enzim mikroba.',
            isPinned: false,
            fileUrl: '/assets/docs/edaran_bpjph_qpcr_2026.pdf',
            fileName: 'SE_BPJPH_Uji_qPCR_2026.pdf',
            fileSize: '2.1 MB',
            createdAt: '2026-10-20T11:00:00Z',
            updatedAt: '2026-10-20T11:00:00Z',
          },
          {
            id: 4,
            title: 'Pedoman Teknis Pemenuhan SJPH KMA 784 untuk Pelaku Usaha Mikro dan Kecil (UMK)',
            slug: 'pedoman-sjph-kma-784-umk',
            content: 'Buku panduan praktis penyusunan manual SJPH, penetapan penyelia halal internal, dan mitigasi kontaminasi najis di fasilitas produksi rumahan.',
            isPinned: false,
            fileUrl: '/assets/docs/pedoman_sjph_umk_2026.pdf',
            fileName: 'Buku_Pedoman_SJPH_UMK_2026.pdf',
            fileSize: '3.5 MB',
            createdAt: '2026-10-15T14:30:00Z',
            updatedAt: '2026-10-15T14:30:00Z',
          },
          {
            id: 5,
            title: 'Daftar Laboratorium Rekanan Terakreditasi KAN untuk Pengujian Porcine & Etanol',
            slug: 'daftar-lab-rekanan-terakreditasi-kan',
            content: 'Daftar jejaring laboratorium pengujian halal yang bekerjasama dengan LPH UIN SGD untuk pengujian FTIR, GC-FID, dan qPCR dengan sertifikasi KAN.',
            isPinned: false,
            fileUrl: '/assets/docs/daftar_lab_kan_2026.pdf',
            fileName: 'Daftar_Lab_KAN_UIN_SGD.pdf',
            fileSize: '950 KB',
            createdAt: '2026-10-10T10:00:00Z',
            updatedAt: '2026-10-10T10:00:00Z',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const categories = [
    { key: 'ALL', label: isEn ? 'All Documents' : 'Semua Dokumen' },
    { key: 'SK', label: isEn ? 'Decree (SK)' : 'Surat Keputusan (SK)' },
    { key: 'SE', label: isEn ? 'Circulars (SE)' : 'Surat Edaran (SE)' },
    { key: 'PEDOMAN', label: isEn ? 'Guidelines' : 'Pedoman & Panduan' },
  ];

  const filtered = useMemo(() => {
    return announcements.filter((item) => {
      // Category filter
      let matchCat = true;
      if (selectedCategory === 'SK') {
        matchCat = item.title.toLowerCase().includes('keputusan') || item.title.toLowerCase().includes('sk');
      } else if (selectedCategory === 'SE') {
        matchCat = item.title.toLowerCase().includes('edaran') || item.title.toLowerCase().includes('se');
      } else if (selectedCategory === 'PEDOMAN') {
        matchCat = item.title.toLowerCase().includes('pedoman') || item.title.toLowerCase().includes('panduan') || item.title.toLowerCase().includes('daftar');
      }

      // Search query filter
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.content.toLowerCase().includes(q) ||
        (item.fileName && item.fileName.toLowerCase().includes(q));

      return matchCat && matchQuery;
    });
  }, [announcements, selectedCategory, searchQuery]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginatedAnnouncements = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);

  const handleCategoryChange = (key: string) => {
    setSelectedCategory(key);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FAF7FD] pb-24 text-[#292333]">
      {/* Banner in Royal Purple Gradient with Yellow Accents & Sparkles */}
      <section className="relative py-20 lg:py-24 bg-[#1a0726] text-white overflow-hidden text-center">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#4B0D78] via-[#6B18A8] via-[#F5D32F] to-[#6B18A8]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0726] via-[#4a0d5c] to-[#1a0726] opacity-95" />
        <SparklesCore
          id="announcement-sparkles"
          minSize={0.7}
          maxSize={2.2}
          particleDensity={35}
          particleColor={['#ffffff', '#f5d0fe', '#F5D32F', '#d8b4fe']}
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7D1] text-[#713f12] text-xs font-extrabold uppercase tracking-wider mb-4 border border-[#F5D32F] shadow-xs">
            <Bell className="w-3.5 h-3.5 text-[#eab308]" />
            {isEn ? 'Official Circulars & Documents' : 'Pengumuman & Surat Edaran Resmi'}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-2xl leading-tight">
            {isEn ? (
              <>Official <span className="text-[#F5D32F]">Announcements</span> LPH UIN SGD</>
            ) : (
              <>Pengumuman <span className="text-[#F5D32F]">Resmi</span> LPH UIN SGD</>
            )}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-200 max-w-2xl mx-auto leading-relaxed font-normal">
            {isEn
              ? 'Official circulars, field audit schedules, fee decree determinations, and downloadable PDF guidelines.'
              : 'Informasi edaran resmi, jadwal audit lapangan, keputusan penetapan tarif, dan dokumen pedoman teknis siap unduh.'}
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-8 space-y-6 relative z-10">
        {/* Search & Filter Bar */}
        <Card className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-md p-4 sm:p-6 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              <Input
                placeholder={isEn ? "Search by document title, topic, or file name..." : "Cari judul surat edaran, topik, atau nama berkas PDF..."}
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2.5 text-xs rounded-xl bg-[#FAF7FD] border border-[#C9A5E8]/40 focus:border-[#6B18A8] focus:ring-2 focus:ring-[#6B18A8]/20 w-full"
              />
            </div>
            {searchQuery && (
              <Button
                variant="outline"
                onPress={() => setSearchQuery('')}
                className="text-xs px-3 py-2 border-neutral-300 text-neutral-600 rounded-xl"
              >
                Reset
              </Button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="text-xs font-bold text-neutral-500 shrink-0 mr-1">
              {isEn ? 'Filter Document:' : 'Kategori:'}
            </span>
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategoryChange(cat.key)}
                className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === cat.key
                    ? 'bg-[#6B18A8] text-white shadow-sm'
                    : 'bg-[#FAF7FD] text-neutral-600 border border-[#C9A5E8]/30 hover:bg-[#F5EDFB] hover:text-[#6B18A8]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Card>

        {/* Counter Info */}
        <div className="flex items-center justify-between text-xs font-semibold text-neutral-600 px-2">
          <span>
            {isEn
              ? `Displaying ${filtered.length} official document(s)`
              : `Menampilkan ${filtered.length} surat edaran & dokumen resmi`}
          </span>
          <span className="text-neutral-400">
            {isEn ? 'Direct PDF download available' : 'Dokumen PDF dapat diunduh langsung'}
          </span>
        </div>

        {/* List Content */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-36 w-full rounded-3xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <Card className="p-12 text-center rounded-3xl bg-white border border-[#C9A5E8]/30 shadow-xs">
            <FileText className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-neutral-700">Tidak ada pengumuman yang sesuai</h4>
            <p className="text-xs text-neutral-500 mt-1">Coba gunakan kata kunci lain atau pilih semua kategori.</p>
            <Button
              variant="primary"
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
              }}
              className="mt-4 bg-[#6B18A8] text-white text-xs font-bold px-5 py-2 rounded-xl mx-auto"
            >
              Reset Filter
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {paginatedAnnouncements.map((item) => (
              <Card
                key={item.id}
                className="bg-white rounded-3xl border border-[#C9A5E8]/30 shadow-xs hover:shadow-md transition-all p-6 sm:p-7"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.isPinned && (
                        <Chip size="sm" className="bg-[#FFF7D1] text-[#713f12] border border-[#F5D32F] font-bold text-[10px] flex items-center gap-1">
                          <Pin className="w-3 h-3 text-[#eab308] inline mr-1" /> Pinned
                        </Chip>
                      )}
                      <span className="text-xs text-neutral-500 font-semibold flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#6B18A8]" />
                        {formatDate(item.createdAt || item.publishedAt)}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 hover:text-[#6B18A8] transition-colors leading-snug">
                      <Link to={`/pengumuman/${item.slug || item.id}`}>{item.title}</Link>
                    </h3>

                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {item.content}
                    </p>

                    {/* Attached File Badge with Direct Download */}
                    {item.fileName && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF7FD] border border-[#C9A5E8]/40 text-xs text-neutral-700 font-mono">
                          <FileText className="w-4 h-4 text-[#6B18A8]" />
                          <span className="font-bold">{item.fileName}</span>
                          {item.fileSize && (
                            <span className="text-neutral-400 font-sans">({item.fileSize})</span>
                          )}
                        </div>

                        <a
                          href={item.fileUrl || `/assets/docs/${item.fileName}`}
                          download={item.fileName}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-50 text-[#6B18A8] hover:bg-[#6B18A8] hover:text-white transition-all text-xs font-bold border border-[#C9A5E8]/40"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{isEn ? 'Download PDF' : 'Unduh Berkas PDF'}</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Action Link */}
                  <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-neutral-100">
                    <Link to={`/pengumuman/${item.slug || item.id}`}>
                      <Button
                        variant="primary"
                        className="bg-[#6B18A8] hover:bg-[#58138c] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-xs"
                      >
                        <span>{isEn ? 'Detail Surat' : 'Buka Detail Edaran'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}

            {/* Official HeroUI Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF7FD] border border-[#C9A5E8]/30 shadow-xs">
                  <Pagination.Summary className="text-xs sm:text-sm text-neutral-600 font-semibold">
                    {isEn
                      ? `Showing page ${currentPage} of ${totalPages} (${filtered.length} total circulars)`
                      : `Menampilkan halaman ${currentPage} dari ${totalPages} (${filtered.length} total surat edaran)`}
                  </Pagination.Summary>

                  <Pagination.Content className="flex items-center gap-1.5 flex-wrap justify-center">
                    <Pagination.Item>
                      <Pagination.Previous
                        onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        isDisabled={currentPage === 1}
                        className="cursor-pointer px-3.5 py-1.5 text-xs font-bold rounded-xl border border-neutral-200 bg-white hover:bg-[#FAF7FD] hover:text-[#6B18A8] hover:border-[#C9A5E8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 shadow-2xs"
                      >
                        <span>{isEn ? 'Previous' : 'Sebelumnya'}</span>
                      </Pagination.Previous>
                    </Pagination.Item>

                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNum = idx + 1;
                      return (
                        <Pagination.Item key={pageNum}>
                          <Pagination.Link
                            isActive={currentPage === pageNum}
                            onPress={() => setCurrentPage(pageNum)}
                            className={`cursor-pointer w-9 h-9 flex items-center justify-center text-xs font-bold rounded-xl transition-all ${
                              currentPage === pageNum
                                ? 'bg-[#6B18A8] text-white shadow-md shadow-purple-950/25 font-black border border-[#6B18A8]'
                                : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-[#FAF7FD] hover:text-[#6B18A8] hover:border-[#C9A5E8]'
                            }`}
                          >
                            {pageNum}
                          </Pagination.Link>
                        </Pagination.Item>
                      );
                    })}

                    <Pagination.Item>
                      <Pagination.Next
                        onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        isDisabled={currentPage === totalPages}
                        className="cursor-pointer px-3.5 py-1.5 text-xs font-bold rounded-xl border border-neutral-200 bg-white hover:bg-[#FAF7FD] hover:text-[#6B18A8] hover:border-[#C9A5E8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 shadow-2xs"
                      >
                        <span>{isEn ? 'Next' : 'Selanjutnya'}</span>
                      </Pagination.Next>
                    </Pagination.Item>
                  </Pagination.Content>
                </Pagination>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementListPage;

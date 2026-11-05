import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Input, Skeleton } from '@heroui/react';
import { Bell, Calendar, FileText, Download, Pin, ArrowRight } from 'lucide-react';
import { api, formatDate } from '@/services/api';
import { useLanguage } from '@/context/LanguageContext';
import type { AnnouncementItem } from '@/types';

const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 1,
    title:
      'Surat Keputusan Penetapan Tarif Pelayanan Pemeriksaan Halal LPH UIN SGD Tahun 2026',
    slug: 'sk-tarif-pelayanan-halal-2026',
    content:
      'Pemberitahuan resmi mengenai penyesuaian tarif audit dan pengujian kehalalan produk sesuai arahan Badan Penyelenggara Jaminan Produk Halal (BPJPH) Kementerian Agama Republik Indonesia...',
    isPinned: true,
    fileUrl: '/assets/docs/sk_tarif_2026.pdf',
    fileName: 'SK_Tarif_Halal_UIN_SGD_2026.pdf',
    fileSize: '1.4 MB',
    createdAt: '2026-11-01T08:00:00Z',
    updatedAt: '2026-11-01T08:00:00Z',
  },
  {
    id: 2,
    title:
      'Jadwal Audit Lapangan dan Pelaksanaan Sidang Fatwa Halal Periode November 2026',
    slug: 'jadwal-audit-lapangan-november-2026',
    content:
      'Diumumkan kepada seluruh pelaku usaha yang telah menyelesaikan pendaftaran pada SIHALAL bahwa verifikasi lapangan akan dilaksanakan sesuai jadwal terlampir...',
    isPinned: false,
    fileUrl: '/assets/docs/jadwal_audit_nov2026.pdf',
    fileName: 'Jadwal_Audit_Nov2026.pdf',
    fileSize: '820 KB',
    createdAt: '2026-10-28T09:00:00Z',
    updatedAt: '2026-10-28T09:00:00Z',
  },
  {
    id: 3,
    title:
      'Jadwal Bimbingan Teknis Sistem Jaminan Produk Halal (SJPH) Bagi Pelaku Usaha Industri',
    slug: 'bimtek-sjph-industri',
    content:
      'LPH UIN Sunan Gunung Djati Bandung membuka pendaftaran bimbingan teknis penyusunan dokumen SJPH dan persiapan audit halal reguler bagi industri manufaktur...',
    isPinned: false,
    fileUrl: '/assets/docs/panduan_audit_lph.pdf',
    fileName: 'Panduan_Audit_Halal_LPH.pdf',
    fileSize: '2.1 MB',
    createdAt: '2026-10-25T11:00:00Z',
    updatedAt: '2026-10-25T11:00:00Z',
  },
];

export const AnnouncementListPage: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [announcements, setAnnouncements] =
    useState<AnnouncementItem[]>(INITIAL_ANNOUNCEMENTS);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const res = await api.get('/announcements');
        if (res.data?.success && res.data.data.length > 0) {
          setAnnouncements(res.data.data);
        }
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const filtered = announcements.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) || item.content.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-neutral-50 pb-20">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#1a0726] via-[#4a0d5c] to-[#1a0726] text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20 shadow-xs">
            <Bell className="w-3.5 h-3.5 text-purple-300" />
            {isEn ? 'Official Announcements & Circulars' : 'Pengumuman & Surat Edaran Resmi'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            {isEn ? 'Official Announcements LPH UIN SGD' : 'Pengumuman Resmi LPH UIN SGD'}
          </h1>
          <p className="mt-3 text-neutral-200 max-w-2xl mx-auto text-sm sm:text-base font-normal">
            {isEn
              ? 'Official circulars, field audit schedules, fee decree determinations, and technical guidelines.'
              : 'Informasi edaran resmi, jadwal audit lapangan, keputusan penetapan tarif, dan dokumen pedoman teknis.'}
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-8 space-y-6">
        {/* Search */}
        <Card className="bg-white rounded-2xl border border-neutral-200/80 shadow-md p-4 sm:p-6">
          <Input
            placeholder={isEn ? "Search announcements or circulars..." : "Cari pengumuman atau surat edaran..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </Card>

        {/* List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((item) => (
              <Card
                key={item.id}
                className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm hover:shadow-md transition-all p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      {item.isPinned && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          <Pin className="w-3 h-3" /> Pinned
                        </span>
                      )}
                      <span className="text-xs text-neutral-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(item.createdAt)}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-neutral-900 hover:text-[#6b1282] transition-colors leading-snug">
                      <Link to={`/pengumuman/${item.slug || item.id}`}>{item.title}</Link>
                    </h3>

                    <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                      {item.content}
                    </p>

                    {item.fileName && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 font-mono">
                        <FileText className="w-3.5 h-3.5 text-[#6b1282]" />
                        <span>{item.fileName}</span>
                        {item.fileSize && (
                          <span className="text-neutral-400">({item.fileSize})</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="sm:self-center shrink-0">
                    <Link to={`/pengumuman/${item.slug || item.id}`}>
                      <Button
                        variant="outline"
                        className="border-purple-200 text-[#6b1282] hover:bg-purple-50 text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5"
                      >
                        {isEn ? 'Read Notice' : 'Buka Surat Edaran'} <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementListPage;

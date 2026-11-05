import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card, Skeleton } from '@heroui/react';
import { Calendar, FileText, Download, ArrowLeft, Pin } from 'lucide-react';
import { api, formatDate } from '@/services/api';
import { useLanguage } from '@/context/LanguageContext';
import type { AnnouncementItem } from '@/types';

export const AnnouncementDetailPage: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const { slug } = useParams<{ slug: string }>();
  const [item, setItem] = useState<AnnouncementItem | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/announcements/${slug}`);
        if (res.data?.success) {
          setItem(res.data.data);
        } else {
          throw new Error('Not found');
        }
      } catch {
        // Fallback mock
        setItem({
          id: 1,
          title:
            'Surat Keputusan Penetapan Tarif Pelayanan Pemeriksaan Halal LPH UIN SGD Tahun 2026',
          slug: slug || 'sk-tarif-pelayanan-halal-2026',
          content: `Berdasarkan Keputusan Kepala Badan Penyelenggara Jaminan Produk Halal (BPJPH) Kementerian Agama Republik Indonesia serta Peraturan Rektor UIN Sunan Gunung Djati Bandung tentang Tata Kelola Lembaga Pemeriksa Halal (LPH), bersama ini diumumkan rincian tarif layanan pemeriksaan dan pengujian kehalalan produk tahun 2026.

1. Pelaku Usaha Mikro (UMK) jalur reguler memperoleh keringanan tarif pemeriksaan administratif dan audit lapangan.
2. Usaha Kecil dan Menengah dikenakan biaya sesuai komponen uji bahan baku saintifik laboratorium.
3. Seluruh proses permohonan wajib terdaftar dan terintegrasi melalui portal resmi SIHALAL Kementerian Agama.

Diharapkan seluruh pemangku kepentingan industri halal, asosiasi pelaku usaha, dan mitra UMKM dapat memedomani ketentuan tarif resmi ini.`,
          isPinned: true,
          fileUrl: '/assets/docs/sk_tarif_2026.pdf',
          fileName: 'SK_Tarif_Halal_UIN_SGD_2026.pdf',
          fileSize: '1.4 MB',
          createdAt: '2026-11-01T08:00:00Z',
          updatedAt: '2026-11-01T08:00:00Z',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug]);

  if (loading || !item) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-4">
        <Skeleton className="h-10 w-3/4 rounded-xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-6 w-full rounded-lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-neutral-50 pb-20 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Link
          to="/pengumuman"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-[#6b1282] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {isEn ? 'Back to Announcements' : 'Kembali ke Daftar Pengumuman'}
        </Link>

        <Card className="bg-white rounded-3xl border border-neutral-200/80 shadow-md p-6 sm:p-10 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {item.isPinned && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  <Pin className="w-3 h-3" /> Pinned
                </span>
              )}
              <span className="text-xs text-neutral-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#6b1282]" />
                {formatDate(item.createdAt)}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a0726] tracking-tight leading-snug">
              {item.title}
            </h1>
          </div>

          {/* Attached Document Box */}
          {item.fileName && (
            <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#6b1282] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-mono text-xs sm:text-sm font-bold text-neutral-800">
                    {item.fileName}
                  </h5>
                  <span className="text-[11px] text-neutral-400">
                    {isEn ? 'Official Attached Document' : 'Dokumen Resmi Terlampir'} {item.fileSize && `• ${item.fileSize}`}
                  </span>
                </div>
              </div>

              <a
                href={item.fileUrl || '#'}
                download
                className="shrink-0"
              >
                <Button
                  variant="primary"
                  className="bg-[#6b1282] hover:bg-[#581c87] text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  {isEn ? 'Download Document' : 'Unduh Dokumen'}
                </Button>
              </a>
            </div>
          )}

          {/* Content */}
          <div className="prose max-w-none text-neutral-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line border-t border-neutral-100 pt-6">
            {item.content}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnnouncementDetailPage;

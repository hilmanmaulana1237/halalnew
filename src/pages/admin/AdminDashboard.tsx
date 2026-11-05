import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input, TextArea } from '@heroui/react';
import {
  Newspaper,
  Bell,
  Bot,
  Calculator,
  Smile,
  ShieldAlert,
  LogOut,
  Plus,
  Trash2,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { api, formatDate, formatRupiah } from '@/services/api';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>({ name: 'Admin LPH UIN SGD', role: 'ADMIN' });
  const [activeTab, setActiveTab] = useState<
    'NEWS' | 'ANNOUNCEMENTS' | 'KB' | 'RATES' | 'SATISFACTION' | 'COMPLAINTS'
  >('NEWS');

  useEffect(() => {
    const storedUser = localStorage.getItem('lph_admin_user');
    const token = localStorage.getItem('lph_admin_token');
    if (!token && !storedUser) {
      localStorage.setItem('lph_admin_token', 'mock_token');
      localStorage.setItem(
        'lph_admin_user',
        JSON.stringify({ name: 'Admin LPH UIN SGD', role: 'ADMIN' })
      );
    } else if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('lph_admin_token');
    localStorage.removeItem('lph_admin_user');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col md:flex-row">
      {/* Untitled UI Style Sidebar */}
      <aside className="w-full md:w-68 bg-[#1b183a] text-white flex flex-col p-5 shrink-0 justify-between border-r border-white/10">
        <div>
          {/* Logo Brand Header */}
          <div className="pb-6 border-b border-white/10 mb-6">
            <img
              src="/assets/images/uin_sgd/logo_lph_official_purple.webp"
              alt="LPH UIN SGD"
              className="h-10 w-auto object-contain rounded-lg shadow-xs mb-2"
            />
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-400">
                Admin Console
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/80 text-purple-200 border border-purple-700 font-mono">
                v2.0
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {[
              { id: 'NEWS', label: 'Berita & Kegiatan', icon: <Newspaper className="w-4 h-4" /> },
              { id: 'ANNOUNCEMENTS', label: 'Pengumuman Resmi', icon: <Bell className="w-4 h-4" /> },
              { id: 'KB', label: 'Knowledge Base AI', icon: <Bot className="w-4 h-4" /> },
              { id: 'RATES', label: 'Konfigurasi Tarif', icon: <Calculator className="w-4 h-4" /> },
              { id: 'SATISFACTION', label: 'Survei Kepuasan (IKM)', icon: <Smile className="w-4 h-4" /> },
              { id: 'COMPLAINTS', label: 'Pengaduan Layanan', icon: <ShieldAlert className="w-4 h-4" /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-[#6b1282] to-[#005a36] text-white shadow-md'
                    : 'text-neutral-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="pt-6 border-t border-white/10 mt-6 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{user?.name}</div>
              <div className="text-[10px] text-emerald-300">Petugas Terautentikasi</div>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="w-full border-white/20 text-neutral-300 hover:text-white hover:bg-white/10 text-xs flex items-center justify-center gap-2 rounded-xl"
            onPress={handleLogout}
          >
            <LogOut className="w-3.5 h-3.5" />
            Keluar (Logout)
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
            <div>
              <h2 className="text-2xl font-extrabold text-[#272353]">
                {activeTab === 'NEWS' && 'Manajemen Berita & Kegiatan'}
                {activeTab === 'ANNOUNCEMENTS' && 'Manajemen Pengumuman Resmi'}
                {activeTab === 'KB' && 'Basis Pengetahuan (AI Chatbot)'}
                {activeTab === 'RATES' && 'Konfigurasi Tarif Layanan LPH'}
                {activeTab === 'SATISFACTION' && 'Hasil Indeks Kepuasan Masyarakat'}
                {activeTab === 'COMPLAINTS' && 'Daftar Tiket Pengaduan Masyarakat'}
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Kelola data portal publik dan respon interaksi masyarakat secara real-time.
              </p>
            </div>
          </div>

          {/* TAB: NEWS */}
          {activeTab === 'NEWS' && (
            <Card className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-neutral-500 uppercase">
                  Daftar Berita Aktif
                </span>
                <Button
                  size="sm"
                  variant="primary"
                  className="bg-[#005a36] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Berita
                </Button>
              </div>

              <div className="divide-y divide-neutral-100 text-xs">
                {[
                  {
                    title: 'Akselerasi Sertifikasi Halal: UIN SGD Latih 100+ Pendamping PPH Jawa Barat',
                    cat: 'KEGIATAN',
                    date: '4 November 2026',
                  },
                  {
                    title: 'Kerjasama Internasional: Ekosistem Halalsphere University Menuju Kancah Global',
                    cat: 'ACARA',
                    date: '3 November 2026',
                  },
                  {
                    title: 'Kewajiban Sertifikasi Halal Bertahap bagi Pelaku Usaha Makanan dan Minuman',
                    cat: 'AGENDA',
                    date: '2 November 2026',
                  },
                ].map((n, i) => (
                  <div key={i} className="py-3 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mr-2">
                        {n.cat}
                      </span>
                      <strong className="text-neutral-900">{n.title}</strong>
                      <span className="text-neutral-400 block mt-1">{n.date}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs py-1 px-3">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB: ANNOUNCEMENTS */}
          {activeTab === 'ANNOUNCEMENTS' && (
            <Card className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-neutral-500 uppercase">
                  Surat Edaran &amp; Pengumuman
                </span>
                <Button
                  size="sm"
                  variant="primary"
                  className="bg-[#005a36] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Pengumuman
                </Button>
              </div>

              <div className="divide-y divide-neutral-100 text-xs">
                {[
                  {
                    title: 'Surat Keputusan Penetapan Tarif Pelayanan Pemeriksaan Halal LPH UIN SGD Tahun 2026',
                    file: 'SK_Tarif_Halal_UIN_SGD_2026.pdf',
                    date: '1 November 2026',
                  },
                  {
                    title: 'Jadwal Audit Lapangan dan Pelaksanaan Sidang Fatwa Halal Periode November 2026',
                    file: 'Jadwal_Audit_Nov2026.pdf',
                    date: '28 Oktober 2026',
                  },
                ].map((a, i) => (
                  <div key={i} className="py-3 flex items-center justify-between gap-4">
                    <div>
                      <strong className="text-neutral-900">{a.title}</strong>
                      <span className="text-neutral-400 block mt-1 font-mono">{a.file} • {a.date}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs py-1 px-3">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB: KB (Tanya Jawab AI) */}
          {activeTab === 'KB' && (
            <Card className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm p-6 space-y-4">
              <span className="text-xs font-bold text-neutral-500 uppercase">
                Pertanyaan &amp; Jawaban AI Otomatis
              </span>
              <div className="space-y-3 text-xs">
                {[
                  {
                    q: 'Apa perbedaan skema sertifikasi Halal Self Declare dan Jalur Reguler?',
                    cat: 'PROSEDUR',
                  },
                  {
                    q: 'Berapa lama estimasi waktu pemeriksaan halal di LPH UIN SGD Bandung?',
                    cat: 'PROSEDUR',
                  },
                  {
                    q: 'Apakah laboratorium UIN SGD melayani pengujian DNA babi dan alkohol untuk umum?',
                    cat: 'LABORATORIUM',
                  },
                ].map((kb, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      {kb.cat}
                    </span>
                    <h5 className="font-bold text-neutral-900 mt-2">{kb.q}</h5>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB: COMPLAINTS */}
          {activeTab === 'COMPLAINTS' && (
            <Card className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm p-6 space-y-4">
              <span className="text-xs font-bold text-neutral-500 uppercase">
                Daftar Tiket Pengaduan Masuk
              </span>
              <div className="space-y-3 text-xs">
                {[
                  {
                    ticket: 'TKT-829104',
                    name: 'Pelapor Anonim',
                    category: 'PELAYANAN',
                    status: 'IN_PROGRESS',
                    desc: 'Konfirmasi dokumen bahan tambahan pangan pada akun SIHALAL belum terverifikasi.',
                  },
                  {
                    ticket: 'TKT-412098',
                    name: 'Koperasi UMK Priangan',
                    category: 'AUDIT',
                    status: 'RESOLVED',
                    desc: 'Permohonan penjadwalan ulang audit lapangan karena renovasi fasilitas higienis.',
                  },
                ].map((c, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="font-mono text-emerald-800 font-bold">{c.ticket}</strong>
                        <span className="text-[10px] font-bold bg-neutral-200 px-2 py-0.5 rounded">
                          {c.category}
                        </span>
                      </div>
                      <p className="text-neutral-700 mt-1">{c.desc}</p>
                      <span className="text-neutral-400 text-[11px] mt-1 block">Pelapor: {c.name}</span>
                    </div>
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB: SATISFACTION */}
          {activeTab === 'SATISFACTION' && (
            <Card className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm p-6 space-y-4">
              <span className="text-xs font-bold text-neutral-500 uppercase">
                Statistik Skor IKM (Indeks Kepuasan Masyarakat)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <span className="text-3xl font-extrabold text-[#005a36]">4.92 / 5.0</span>
                  <span className="text-xs text-emerald-800 block mt-1 font-semibold">Skor Kepuasan Rata-Rata</span>
                </div>
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-center">
                  <span className="text-3xl font-extrabold text-[#272353]">98.4%</span>
                  <span className="text-xs text-indigo-800 block mt-1 font-semibold">Tingkat Rekomendasi Layanan</span>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                  <span className="text-3xl font-extrabold text-amber-700">540+</span>
                  <span className="text-xs text-amber-800 block mt-1 font-semibold">Total Responden UMK</span>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

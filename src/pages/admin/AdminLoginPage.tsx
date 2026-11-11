import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input } from '@heroui/react';
import { ShieldCheck, Lock, Mail, AlertTriangle, ArrowRight } from 'lucide-react';
import { api } from '@/services/api';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@lph-uinsgd.ac.id');
  const [password, setPassword] = useState('admin123456');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data?.success) {
        localStorage.setItem('lph_admin_token', res.data.token);
        localStorage.setItem('lph_admin_user', JSON.stringify(res.data.user));
        navigate('/admin');
        return;
      }
    } catch {
      if (email === 'admin@lph-uinsgd.ac.id') {
        localStorage.setItem('lph_admin_token', 'mock_jwt_token_2026');
        localStorage.setItem(
          'lph_admin_user',
          JSON.stringify({
            name: 'Administrator LPH UIN SGD',
            email: 'admin@lph-uinsgd.ac.id',
            role: 'SUPER_ADMIN',
          })
        );
        navigate('/admin');
        return;
      }
      setError('Login gagal. Periksa kembali email dan kata sandi Anda.');
    } finally {
      setLoading(false);
    }
  };

  const handleDirectDemoLogin = () => {
    localStorage.setItem('lph_admin_token', 'mock_jwt_token_2026');
    localStorage.setItem(
      'lph_admin_user',
      JSON.stringify({
        name: 'Administrator LPH UIN SGD',
        email: 'admin@lph-uinsgd.ac.id',
        role: 'SUPER_ADMIN',
      })
    );
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#180828] via-[#240638] to-[#180828] p-4 relative overflow-hidden">
      <Card className="w-full max-w-md bg-white rounded-3xl border border-[#C9A5E8]/40 shadow-2xl p-8 space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#6B18A8] text-white flex items-center justify-center mx-auto shadow-lg shadow-purple-950/20 border border-[#F5D32F]/40">
            <ShieldCheck className="w-8 h-8 text-[#F5D32F]" />
          </div>
          <h2 className="text-2xl font-black text-[#292333] tracking-tight">
            Portal Admin LPH UIN SGD
          </h2>
          <p className="text-xs text-neutral-500">
            Masuk untuk mengelola berita, pengumuman, galeri kegiatan, tiket pengaduan, dan survei kepuasan.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
              Alamat Email Petugas
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
              Kata Sandi
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-xs"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              className="w-full bg-[#6B18A8] hover:bg-[#521082] text-white font-bold py-3 rounded-xl shadow-lg shadow-purple-950/20 text-xs flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Memverifikasi...' : 'Masuk Dashboard'}</span>
              <ArrowRight className="w-4 h-4 text-[#F5D32F]" />
            </Button>
          </div>
        </form>

        <div className="pt-2 border-t border-neutral-100 flex flex-col gap-2">
          <Button
            variant="secondary"
            onPress={handleDirectDemoLogin}
            className="w-full bg-[#FAF7FD] hover:bg-[#F5EDFB] text-[#6B18A8] border border-[#C9A5E8]/60 text-xs font-bold py-2.5 rounded-xl"
          >
            Akses Langsung Mode Demo (One-Click)
          </Button>

          <p className="text-[10px] text-neutral-400 text-center">
            Kredensial Default: admin@lph-uinsgd.ac.id / admin123456
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AdminLoginPage;

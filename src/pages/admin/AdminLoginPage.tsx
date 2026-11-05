import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input } from '@heroui/react';
import { ShieldCheck, Lock, Mail, AlertTriangle } from 'lucide-react';
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
      // Mock login for standalone / offline demonstration
      if (email === 'admin@lph-uinsgd.ac.id') {
        localStorage.setItem('lph_admin_token', 'mock_jwt_token_2026');
        localStorage.setItem(
          'lph_admin_user',
          JSON.stringify({
            name: 'Administrator LPH UIN SGD',
            email: 'admin@lph-uinsgd.ac.id',
            role: 'ADMIN',
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

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-neutral-50 p-4">
      <Card className="w-full max-w-md bg-white rounded-3xl border border-neutral-200/80 shadow-2xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#272353] text-white flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#272353]">
            Portal Admin LPH UIN SGD
          </h2>
          <p className="text-xs text-neutral-500">
            Masuk untuk mengelola tiket pengaduan, survei kepuasan, berita, dan live chat.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
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
              className="w-full"
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
              className="w-full"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isPending={loading}
              className="bg-[#272353] hover:bg-[#1b183a] text-white font-bold py-3 rounded-xl shadow-md text-sm"
            >
              Masuk Dashboard
            </Button>
          </div>
        </form>

        <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 text-[11px] text-neutral-500 text-center">
          Akun Demo: <strong>admin@lph-uinsgd.ac.id</strong> / <strong>admin123456</strong>
        </div>
      </Card>
    </div>
  );
};

export default AdminLoginPage;

import { useState } from 'react';
import { type Location, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';

import { useAuth } from '../../hooks/useAuth';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const { signInWithOtp, loading, session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="mx-auto w-full max-w-md space-y-6 rounded-2xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="text-2xl font-semibold text-white">Videxa’ya giriş yap</h1>
      <p className="text-sm text-slate-300">E-posta adresinizi girin, Supabase OTP ile bağlantı gönderelim.</p>
      <form
        className="space-y-4"
        onSubmit={async (event) => {
          event.preventDefault();
          await signInWithOtp(email);
          setSent(true);
        }}
      >
        <label className="space-y-2 text-sm text-slate-200">
          E-posta
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2">
            <Mail className="h-4 w-4 text-indigo-300" />
            <input
              type="email"
              required
              placeholder="ornek@videxa.app"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent text-sm text-white outline-none"
            />
          </div>
        </label>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          <ArrowRight className="h-4 w-4" /> {loading ? 'Gönderiliyor...' : 'Giriş bağlantısı yolla'}
        </button>
      </form>
      {sent && <p className="text-xs text-indigo-200">Gelen kutunuzu kontrol edin. Bağlantıya tıklayınca otomatik giriş yapılacak.</p>}
      {session && (
        <button
          onClick={() => navigate((location.state as { from?: Location })?.from?.pathname ?? '/dashboard')}
          className="text-xs text-indigo-300 underline"
        >
          Dashboard’a dön
        </button>
      )}
    </div>
  );
}

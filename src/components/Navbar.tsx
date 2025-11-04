import { Link, NavLink } from 'react-router-dom';
import { LogIn, Play, Settings as SettingsIcon, Sparkles, User } from 'lucide-react';

import { useAuth } from '../hooks/useAuth';
import { PlanBadge } from './PlanBadge';

const navClass = ({ isActive }: { isActive: boolean }) =>
  `inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-white/10 ${
    isActive ? 'bg-white/10 text-white' : 'text-slate-200'
  }`;

export function Navbar() {
  const { session, profile, signOut } = useAuth();

  return (
    <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-white">
          <Sparkles className="h-6 w-6 text-indigo-400" />
          Videxa
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={navClass} end>
            <Play className="h-4 w-4" />
            Ürün
          </NavLink>
          <NavLink to="/dashboard" className={navClass}>
            <Play className="h-4 w-4" />
            Stüdyo
          </NavLink>
          <NavLink to="/billing" className={navClass}>
            <Sparkles className="h-4 w-4" />
            Planlar
          </NavLink>
          <NavLink to="/settings" className={navClass}>
            <SettingsIcon className="h-4 w-4" />
            Ayarlar
          </NavLink>
        </nav>
        <div className="flex items-center gap-3">
          {session ? (
            <>
              <PlanBadge plan={profile?.plan ?? 'free'} />
              <button
                onClick={signOut}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-white/30 hover:text-white"
              >
                <LogIn className="h-4 w-4 rotate-180" />
                Çıkış
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
            >
              <User className="h-4 w-4" />
              Giriş Yap
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

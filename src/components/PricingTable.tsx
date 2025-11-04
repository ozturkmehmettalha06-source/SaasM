import { Check, Sparkles } from 'lucide-react';

import { useAuth } from '../hooks/useAuth';
import { useCheckout } from '../hooks/useCheckout';

const plans = [
  {
    name: 'free',
    title: 'Starter',
    price: '0₺',
    description: 'Haftada 3 video çıktısı, temel şablonlar.',
    features: ['15 saniyeye kadar videolar', 'Metin→video', 'Supabase depolama 1GB'],
    highlight: false
  },
  {
    name: 'basic',
    title: 'Creator',
    price: '499₺',
    description: 'Gelişmiş şablonlar ve 4K render motoru.',
    features: ['Günde 10 video', 'Ses klonlama', 'Webhook entegrasyonu'],
    highlight: true,
    priceId: import.meta.env.VITE_STRIPE_PRICE_BASIC
  },
  {
    name: 'pro',
    title: 'Studio',
    price: '1.299₺',
    description: 'Ekipler için sınırsız proje, API erişimi.',
    features: ['Sınırsız proje', 'Çok dilli altyazı', 'Özel n8n senaryoları'],
    highlight: false,
    priceId: import.meta.env.VITE_STRIPE_PRICE_PRO
  }
] as const;

export function PricingTable() {
  const { profile } = useAuth();
  const { redirectToCheckout, loading } = useCheckout();

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => {
        const isActive = profile?.plan === plan.name;
        return (
          <div
            key={plan.name}
            className={`flex flex-col rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl shadow-black/20 transition ${
              plan.highlight ? 'border-indigo-500/50 ring-2 ring-indigo-500/40' : ''
            }`}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-widest text-indigo-200/80">{plan.title}</p>
                <h3 className="text-3xl font-semibold text-white">{plan.price}<span className="text-base text-slate-300">/ay</span></h3>
              </div>
              {plan.highlight && (
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-200">
                  <Sparkles className="h-4 w-4" /> Popüler
                </span>
              )}
            </div>
            <p className="mb-6 text-sm text-slate-300">{plan.description}</p>
            <ul className="mb-8 space-y-3 text-sm text-slate-200">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-emerald-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => plan.priceId && redirectToCheckout(plan.priceId)}
              disabled={loading || isActive || !plan.priceId}
              className="mt-auto inline-flex w-full items-center justify-center rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300"
            >
              {isActive ? 'Aktif Plan' : plan.priceId ? 'Stripe ile Yükselt' : 'Ücretsiz Kullanmaya Başla'}
            </button>
          </div>
        );
      })}
    </div>
  );
}

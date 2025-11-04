import { Link } from 'react-router-dom';
import { ArrowRight, Film, Layers, Sparkles, Zap } from 'lucide-react';

import { PricingTable } from '../components/PricingTable';

const highlights = [
  {
    title: 'Metin → Video Motoru',
    description: 'Türkçe promptlarla dakikalar içinde ürün tanıtımları, eğitim videoları, sosyal içerikler oluşturun.',
    icon: Sparkles
  },
  {
    title: 'Şablon Tabanlı Çalışma',
    description: 'Marka renklerinizi, fontlarınızı ve logonuzu tek seferde kaydedin, tüm videolara otomatik uygulansın.',
    icon: Layers
  },
  {
    title: 'Supabase Proje Yönetimi',
    description: 'Takım arkadaşlarınızla proje paylaşın, video çıktılarınızı sürümleyin ve toplu indirin.',
    icon: Film
  }
];

export function Home() {
  return (
    <div className="space-y-16">
      <section className="grid items-center gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-indigo-200">
            <Zap className="h-4 w-4" /> Yapay zeka video stüdyosu
          </span>
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Videxa ile dakikalar içinde satışa hazır videolar üretin.
          </h1>
          <p className="text-lg text-slate-300">
            Prompt bazlı video üretimi, otomatik seslendirme, altyazı ve marka kitleri tek platformda. Stripe ile saniyeler içinde
            yükseltin, Supabase ile güvenle saklayın.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
            >
              Stüdyoyu Deneyin <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="#pricing" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/40 hover:text-white">
              Planları Görün
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-500/30 via-sky-500/10 to-purple-500/10 blur-3xl" aria-hidden />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/30">
            <p className="text-sm font-medium text-indigo-200">AI storyboard</p>
            <div className="mt-4 space-y-3 text-sm text-slate-200">
              <p>🎬 Video tipi: Ürün Lansmanı</p>
              <p>🗣️ Ses: Türkçe kadın sesi, enerji yüksek</p>
              <p>🪄 Stil: Neon, dinamik geçişler, 4K render</p>
            </div>
            <div className="mt-6 grid gap-3">
              <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3 text-xs text-slate-300">
                <span className="font-semibold text-white">Sahne 1:</span> Şehirde hızla ilerleyen drone çekimi, üzerine neon Videxa logosu gelir.
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3 text-xs text-slate-300">
                <span className="font-semibold text-white">Sahne 2:</span> Ekrana Videxa dashboard’u, gerçek zamanlı render animasyonu.
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3 text-xs text-slate-300">
                <span className="font-semibold text-white">Sahne 3:</span> Mutlu ekip videoyu sosyal medyada paylaşırken.
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-black/20">
            <item.icon className="mb-4 h-10 w-10 text-indigo-300" />
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{item.description}</p>
          </div>
        ))}
      </section>
      <section id="pricing" className="space-y-8">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-bold text-white">Stripe destekli ölçeklenebilir fiyatlandırma</h2>
          <p className="text-sm text-slate-300">Planınızı seçin, Stripe Checkout ile saniyeler içinde yükseltin.</p>
        </div>
        <PricingTable />
      </section>
    </div>
  );
}

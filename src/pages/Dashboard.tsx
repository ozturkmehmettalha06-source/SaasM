import { useMemo } from 'react';
import { Clock, Download, FileVideo, Loader2 } from 'lucide-react';

import { VideoPreview } from '../components/VideoPreview';
import { VideoPromptForm } from '../components/VideoPromptForm';
import { useAuth } from '../hooks/useAuth';
import { useVideoGeneration } from '../hooks/useVideoGeneration';

const usageLimits = {
  free: 3,
  basic: 10,
  pro: 999,
  enterprise: 999
};

export function Dashboard() {
  const { profile } = useAuth();
  const { generate, data, isPending, error } = useVideoGeneration();

  const limit = useMemo(() => usageLimits[profile?.plan ?? 'free'], [profile?.plan]);

  return (
    <div className="space-y-12">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <VideoPreview url={data?.videoUrl} isGenerating={isPending} />
        <div className="space-y-6">
          <VideoPromptForm
            loading={isPending}
            onSubmit={async (values) => {
              await generate(values);
            }}
          />
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white">Plan limitleri</p>
            <p className="mt-2 flex items-center gap-2 text-xs uppercase tracking-wide text-indigo-200">
              <Clock className="h-4 w-4" /> Günlük üretim limiti: {limit === 999 ? 'Sınırsız' : `${limit} video`}
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Limitlere takıldığınızda Stripe üzerinden planınızı yükseltebilir, n8n otomasyonunuzla müşterilerinize videoları otomatik gönderebilirsiniz.
            </p>
          </div>
          {data?.status === 'completed' && data.videoUrl && (
            <a
              href={data.videoUrl}
              download
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-200 transition hover:border-indigo-400 hover:bg-indigo-500/20"
            >
              <Download className="h-4 w-4" /> Videoyu indir
            </a>
          )}
          {error instanceof Error && (
            <div className="flex items-center gap-2 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-100">
              <Loader2 className="h-4 w-4 animate-spin" /> {error.message}
            </div>
          )}
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Son üretimler</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-white/5 bg-slate-900/50 p-4">
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <FileVideo className="h-5 w-5 text-indigo-300" />
                <div>
                  <p className="font-medium text-white">Neon Launch #{index + 1}</p>
                  <p className="text-xs text-slate-400">Status: completed • 4K</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

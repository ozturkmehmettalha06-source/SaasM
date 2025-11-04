import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sparkles } from 'lucide-react';
import { z } from 'zod';

const schema = z.object({
  prompt: z.string().min(10, 'Prompt en az 10 karakter olmalı'),
  style: z.string().default('cinematic'),
  duration: z.number().min(5).max(60)
});

export type PromptFormValues = z.infer<typeof schema>;

interface VideoPromptFormProps {
  defaultValues?: PromptFormValues;
  onSubmit: (values: PromptFormValues) => Promise<void> | void;
  loading?: boolean;
}

export function VideoPromptForm({ defaultValues, onSubmit, loading }: VideoPromptFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PromptFormValues>({
    defaultValues: defaultValues ?? { prompt: '', style: 'cinematic', duration: 15 },
    resolver: zodResolver(schema)
  });

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await onSubmit({ ...values, duration: Number(values.duration) });
      })}
      className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6"
    >
      <div className="space-y-2">
        <label htmlFor="prompt" className="text-sm font-medium text-slate-100">
          Prompt
        </label>
        <textarea
          id="prompt"
          rows={4}
          className="w-full rounded-lg border border-white/10 bg-slate-950/80 p-3 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
          placeholder="Örn: Neon ışıklı bir şehirde gece yürüyen genç bir girişimci..."
          {...register('prompt')}
        />
        {errors.prompt && <p className="text-xs text-rose-400">{errors.prompt.message}</p>}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="style" className="text-sm font-medium text-slate-100">
            Stil
          </label>
          <select
            id="style"
            className="w-full rounded-lg border border-white/10 bg-slate-950/80 p-3 text-sm text-white focus:border-indigo-500 focus:outline-none"
            {...register('style')}
          >
            <option value="cinematic">Sinematik</option>
            <option value="product">Ürün Demo</option>
            <option value="explainer">Eğitici</option>
            <option value="tiktok">TikTok Reels</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="duration" className="text-sm font-medium text-slate-100">
            Süre (sn)
          </label>
          <input
            id="duration"
            type="number"
            min={5}
            max={60}
            className="w-full rounded-lg border border-white/10 bg-slate-950/80 p-3 text-sm text-white focus:border-indigo-500 focus:outline-none"
            {...register('duration', { valueAsNumber: true })}
          />
          {errors.duration && <p className="text-xs text-rose-400">{errors.duration.message}</p>}
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-700"
      >
        <Sparkles className="h-4 w-4" /> {loading ? 'Oluşturuluyor...' : 'Videomu Üret'}
      </button>
    </form>
  );
}

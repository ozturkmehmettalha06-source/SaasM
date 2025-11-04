import { useForm } from 'react-hook-form';

import { useAuth } from '../hooks/useAuth';

interface SettingsForm {
  brandColor: string;
  fontFamily: string;
  webhookUrl: string;
}

export function Settings() {
  const { profile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SettingsForm>({
    defaultValues: {
      brandColor: '#6366f1',
      fontFamily: 'Inter',
      webhookUrl: 'https://hooks.n8n.cloud/videxa'
    }
  });

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Ayarlar</h1>
        <p className="text-sm text-slate-300">Profil: {profile?.email ?? 'Bilinmiyor'}</p>
      </header>
      <form
        onSubmit={handleSubmit(async (values) => {
          console.log('Kaydedilen ayarlar', values);
        })}
        className="space-y-6 rounded-2xl border border-white/10 bg-slate-900/60 p-6"
      >
        <div className="space-y-2">
          <label htmlFor="brandColor" className="text-sm font-medium text-slate-100">
            Marka Rengi
          </label>
          <input
            id="brandColor"
            type="color"
            className="h-12 w-20 cursor-pointer rounded-lg border border-white/10 bg-slate-950/80"
            {...register('brandColor')}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="fontFamily" className="text-sm font-medium text-slate-100">
            Font Ailesi
          </label>
          <input
            id="fontFamily"
            type="text"
            className="w-full rounded-lg border border-white/10 bg-slate-950/80 p-3 text-sm text-white"
            {...register('fontFamily')}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="webhookUrl" className="text-sm font-medium text-slate-100">
            n8n Webhook URL
          </label>
          <input
            id="webhookUrl"
            type="url"
            className="w-full rounded-lg border border-white/10 bg-slate-950/80 p-3 text-sm text-white"
            {...register('webhookUrl')}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          Kaydet
        </button>
      </form>
    </div>
  );
}

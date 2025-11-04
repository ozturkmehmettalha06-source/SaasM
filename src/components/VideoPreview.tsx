interface VideoPreviewProps {
  url?: string | null;
  isGenerating?: boolean;
}

export function VideoPreview({ url, isGenerating }: VideoPreviewProps) {
  return (
    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70">
      {url ? (
        <video src={url} controls className="h-full w-full object-cover" />
      ) : (
        <div className="text-center text-sm text-slate-300">
          {isGenerating ? 'Video oluşturuluyor, lütfen bekleyin...' : 'Henüz video yok. Prompt gönderdiğinizde burada görünecek.'}
        </div>
      )}
      {isGenerating && <div className="absolute inset-0 animate-pulse bg-indigo-500/10" aria-hidden />}
    </div>
  );
}

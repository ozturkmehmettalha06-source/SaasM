import { PromptFormValues } from '../components/VideoPromptForm';

interface VideoResponse {
  id: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  videoUrl?: string;
  prompt: string;
}

const apiBase = import.meta.env.VITE_VIDEO_API_URL;

export async function generateVideo(values: PromptFormValues): Promise<VideoResponse> {
  if (!apiBase) {
    throw new Error('Video API adresi bulunamadı. VITE_VIDEO_API_URL değişkenini kontrol edin.');
  }

  const response = await fetch(`${apiBase}/videos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message ?? 'Video üretimi başarısız oldu');
  }

  return response.json();
}

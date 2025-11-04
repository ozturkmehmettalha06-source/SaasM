import { useMutation } from '@tanstack/react-query';

import { generateVideo } from '../lib/video-api';

export function useVideoGeneration() {
  const mutation = useMutation({
    mutationFn: generateVideo
  });

  return {
    generate: mutation.mutateAsync,
    data: mutation.data,
    isPending: mutation.isPending,
    error: mutation.error
  };
}

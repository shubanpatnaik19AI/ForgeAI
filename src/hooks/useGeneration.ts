import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Generation } from '../lib/types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export function useGeneration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generation, setGeneration] = useState<Generation | null>(null);
  const [streamedHtml, setStreamedHtml] = useState<string>('');

  const generate = async (prompt: string) => {
    setLoading(true);
    setError(null);
    setStreamedHtml('');
    setGeneration(null);

    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/generate-website`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ prompt }),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Generation failed');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let fullHtml = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.type === 'text') {
                fullHtml += parsed.content;
                setStreamedHtml(fullHtml);
              } else if (parsed.type === 'done') {
                const saved = parsed.generation as Generation;
                setGeneration(saved);
              } else if (parsed.type === 'error') {
                throw new Error(parsed.message);
              }
            } catch {
              // skip non-json lines
            }
          }
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async (): Promise<Generation[]> => {
    const { data, error } = await supabase
      .from('generations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) return [];
    return data as Generation[];
  };

  return { generate, loading, error, generation, streamedHtml, loadHistory };
}

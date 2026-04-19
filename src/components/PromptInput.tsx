import { useState, useRef, KeyboardEvent } from 'react';
import { Sparkles, ArrowUp, Loader2 } from 'lucide-react';

const suggestions = [
  'A SaaS landing page with pricing',
  'A portfolio for a designer',
  'A restaurant website',
  'A fitness app dashboard',
  'A blog with dark mode',
  'An e-commerce product page',
];

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  loading: boolean;
}

export function PromptInput({ onGenerate, loading }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const trimmed = prompt.trim();
    if (!trimmed || loading) return;
    onGenerate(trimmed);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestion = (s: string) => {
    setPrompt(s);
    textareaRef.current?.focus();
  };

  return (
    <div className="w-full">
      <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 focus-within:border-blue-300 focus-within:shadow-xl transition-all">
        <div className="flex items-start gap-3 p-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Sparkles size={16} className="text-white" />
          </div>
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the website or app you want to build..."
            rows={3}
            className="flex-1 resize-none text-gray-800 placeholder-gray-400 text-base leading-relaxed outline-none bg-transparent"
            disabled={loading}
          />
        </div>

        <div className="flex items-center justify-between px-4 pb-4 pt-1">
          <p className="text-xs text-gray-400">
            Press <kbd className="bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 font-mono text-gray-500">Enter</kbd> to generate &nbsp;·&nbsp; <kbd className="bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 font-mono text-gray-500">Shift+Enter</kbd> for new line
          </p>
          <button
            onClick={handleSubmit}
            disabled={!prompt.trim() || loading}
            className="w-10 h-10 rounded-xl bg-gray-900 hover:bg-gray-700 disabled:bg-gray-200 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all hover:shadow-md"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <ArrowUp size={18} />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => handleSuggestion(s)}
            disabled={loading}
            className="text-xs bg-white border border-gray-200 text-gray-600 rounded-full px-3 py-1.5 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeViewProps {
  html: string;
}

export function CodeView({ html }: CodeViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!html) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-950">
        <p className="text-gray-600 text-sm">No code generated yet</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-gray-950 overflow-hidden">
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700 rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
        >
          {copied ? (
            <>
              <Check size={12} className="text-green-400" />
              Copied!
            </>
          ) : (
            <>
              <Copy size={12} />
              Copy Code
            </>
          )}
        </button>
      </div>
      <div className="w-full h-full overflow-auto p-6 pt-14">
        <pre className="text-gray-300 text-xs font-mono leading-relaxed whitespace-pre-wrap break-all">
          {html}
        </pre>
      </div>
    </div>
  );
}

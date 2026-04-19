import { useEffect, useRef } from 'react';

interface LivePreviewProps {
  html: string;
}

export function LivePreview({ html }: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(html);
    doc.close();
  }, [html]);

  if (!html) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
          </div>
          <p className="text-gray-400 font-medium">Your website will appear here</p>
          <p className="text-gray-300 text-sm mt-1">Enter a prompt above to get started</p>
        </div>
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      className="w-full h-full border-0"
      sandbox="allow-scripts allow-same-origin allow-forms"
      title="Generated Website Preview"
    />
  );
}

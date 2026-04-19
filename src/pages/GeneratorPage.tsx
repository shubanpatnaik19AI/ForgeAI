import { useState } from 'react';
import { Eye, Code2, Download, RefreshCw, Loader2, AlertCircle, Maximize2, PanelLeftClose, PanelLeft } from 'lucide-react';
import { PromptInput } from '../components/PromptInput';
import { LivePreview } from '../components/LivePreview';
import { CodeView } from '../components/CodeView';
import { HistorySidebar } from '../components/HistorySidebar';
import { useGeneration } from '../hooks/useGeneration';
import { Generation, ViewMode } from '../lib/types';

export function GeneratorPage() {
  const { generate, loading, error, generation, streamedHtml } = useGeneration();
  const [viewMode, setViewMode] = useState<ViewMode>('preview');
  const [currentGeneration, setCurrentGeneration] = useState<Generation | null>(null);
  const [historyRefresh, setHistoryRefresh] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const activeHtml = currentGeneration?.html_output ?? streamedHtml;
  const activeId = currentGeneration?.id ?? generation?.id ?? null;

  const handleGenerate = async (prompt: string) => {
    setCurrentGeneration(null);
    await generate(prompt);
    setHistoryRefresh((n) => n + 1);
  };

  const handleSelectHistory = (g: Generation) => {
    setCurrentGeneration(g);
  };

  const handleDownload = () => {
    const html = activeHtml;
    if (!html) return;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-site.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen bg-gray-50 pt-16 overflow-hidden">
      {/* History sidebar */}
      {sidebarOpen && !isFullscreen && (
        <HistorySidebar
          currentId={activeId}
          onSelect={handleSelectHistory}
          refreshTrigger={historyRefresh}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top toolbar */}
        {!isFullscreen && (
          <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-4 flex-shrink-0">
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="text-gray-400 hover:text-gray-700 transition-colors"
              title={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
            >
              {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
            </button>

            <div className="flex-1" />

            {/* View toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1 gap-1">
              <button
                onClick={() => setViewMode('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'preview'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Eye size={14} />
                Preview
              </button>
              <button
                onClick={() => setViewMode('code')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'code'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Code2 size={14} />
                Code
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                disabled={!activeHtml}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-gray-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Download size={14} />
                Download
              </button>
              <button
                onClick={() => setIsFullscreen(true)}
                disabled={!activeHtml}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-gray-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                title="Fullscreen preview"
              >
                <Maximize2 size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Preview area */}
        <div className="flex-1 overflow-hidden relative">
          {loading && (
            <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Loader2 size={22} className="text-white animate-spin" />
                </div>
                <p className="text-gray-700 font-semibold">Generating your website...</p>
                <p className="text-gray-400 text-sm mt-1">This takes a few seconds</p>
              </div>
            </div>
          )}

          {isFullscreen ? (
            <div className="fixed inset-0 z-50 bg-white flex flex-col">
              <div className="bg-gray-900 px-4 py-2 flex items-center justify-between">
                <span className="text-gray-300 text-sm font-medium">Fullscreen Preview</span>
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="text-gray-400 hover:text-white text-sm flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw size={14} />
                  Exit
                </button>
              </div>
              <div className="flex-1">
                <LivePreview html={activeHtml} />
              </div>
            </div>
          ) : viewMode === 'preview' ? (
            <div className="w-full h-full">
              <LivePreview html={activeHtml} />
            </div>
          ) : (
            <CodeView html={activeHtml} />
          )}
        </div>

        {/* Prompt input at bottom */}
        {!isFullscreen && (
          <div className="bg-white border-t border-gray-100 px-6 py-5 flex-shrink-0">
            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4">
                <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-700 text-sm font-medium">Generation failed</p>
                  <p className="text-red-500 text-xs mt-0.5">{error}</p>
                </div>
              </div>
            )}
            <PromptInput onGenerate={handleGenerate} loading={loading} />
          </div>
        )}
      </div>
    </div>
  );
}

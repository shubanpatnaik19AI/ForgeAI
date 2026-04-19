import { useEffect, useState } from 'react';
import { Clock, ChevronRight, Loader2 } from 'lucide-react';
import { Generation } from '../lib/types';
import { useGeneration } from '../hooks/useGeneration';

interface HistorySidebarProps {
  currentId: string | null;
  onSelect: (g: Generation) => void;
  refreshTrigger: number;
}

export function HistorySidebar({ currentId, onSelect, refreshTrigger }: HistorySidebarProps) {
  const [history, setHistory] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const { loadHistory } = useGeneration();

  useEffect(() => {
    setLoading(true);
    loadHistory().then((data) => {
      setHistory(data);
      setLoading(false);
    });
  }, [refreshTrigger]);

  return (
    <aside className="w-72 bg-white border-r border-gray-100 flex flex-col h-full">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
        <Clock size={15} className="text-gray-400" />
        <h3 className="text-sm font-semibold text-gray-700">Recent Generations</h3>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={18} className="animate-spin text-gray-300" />
          </div>
        ) : history.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <p className="text-gray-400 text-sm">No generations yet</p>
            <p className="text-gray-300 text-xs mt-1">Your history will appear here</p>
          </div>
        ) : (
          <ul className="py-2">
            {history.map((g) => (
              <li key={g.id}>
                <button
                  onClick={() => onSelect(g)}
                  className={`w-full text-left px-5 py-3.5 hover:bg-gray-50 transition-colors group flex items-start gap-3 ${
                    currentId === g.id ? 'bg-blue-50 hover:bg-blue-50' : ''
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${currentId === g.id ? 'bg-blue-500' : 'bg-gray-200'}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${currentId === g.id ? 'text-blue-700' : 'text-gray-700'}`}>
                      {g.title}
                    </p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{g.prompt}</p>
                    <p className="text-xs text-gray-300 mt-1">
                      {new Date(g.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <ChevronRight
                    size={14}
                    className={`flex-shrink-0 mt-0.5 transition-opacity ${currentId === g.id ? 'opacity-100 text-blue-400' : 'opacity-0 group-hover:opacity-100 text-gray-300'}`}
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}

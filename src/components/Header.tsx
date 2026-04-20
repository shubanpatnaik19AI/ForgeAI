import { Zap } from 'lucide-react';
import { AppPage } from '../lib/types';

interface HeaderProps {
  page: AppPage;
  onNavigate: (page: AppPage) => void;
}

export function Header({ page, onNavigate }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <Zap size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-gray-900 text-lg tracking-tight">
            LightYears<span className="text-blue-600">AI</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Features
          </a>
          <a href="#examples" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Examples
          </a>
        </nav>

        <button
          onClick={() => onNavigate('generator')}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
            page === 'generator'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-gray-900 text-white hover:bg-gray-700'
          }`}
        >
          {page === 'generator' ? 'Studio' : 'Start Building'}
        </button>
      </div>
    </header>
  );
}

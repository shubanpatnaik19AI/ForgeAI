import { ArrowRight, Code2, Eye, Sparkles, Zap, Globe, Layers } from 'lucide-react';
import { AppPage } from '../lib/types';

interface LandingPageProps {
  onNavigate: (page: AppPage) => void;
}

const examples = [
  'A modern SaaS landing page with pricing tables',
  'A portfolio website for a photographer',
  'A dashboard with charts and data visualization',
  'A restaurant website with menu and reservations',
  'An e-commerce product page with a shopping cart',
  'A blog with dark mode and reading progress',
];

const features = [
  {
    icon: Sparkles,
    title: 'Prompt to Website',
    desc: 'Describe what you want in plain English and watch it come alive in seconds.',
  },
  {
    icon: Eye,
    title: 'Live Preview',
    desc: 'See your generated site instantly in a full live preview. No setup required.',
  },
  {
    icon: Code2,
    title: 'Clean Code Output',
    desc: 'Get production-ready HTML, CSS, and JavaScript you can copy and deploy.',
  },
  {
    icon: Globe,
    title: 'Modern Design',
    desc: 'AI-crafted layouts using modern CSS, animations, and design principles.',
  },
  {
    icon: Zap,
    title: 'Blazing Fast',
    desc: 'Streaming generation means you see results as they\'re created in real-time.',
  },
  {
    icon: Layers,
    title: 'Full History',
    desc: 'Every generation is saved so you can revisit and build on previous work.',
  },
];

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-36 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 rounded-full px-4 py-1.5 text-sm font-medium mb-8">
            <Sparkles size={14} />
            Powered by Claude AI
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6">
            Build websites
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              from a single prompt
            </span>
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Describe your vision, and ForgeAI will generate a fully functional,
            beautifully designed website in seconds. No code required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('generator')}
              className="group inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-700 transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              Start Building Free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('generator')}
              className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-semibold text-lg hover:border-gray-300 hover:shadow-md transition-all"
            >
              <Eye size={20} />
              See Examples
            </button>
          </div>
        </div>

        {/* Mock preview card */}
        <div className="max-w-5xl mx-auto mt-20 relative">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 bg-white border border-gray-200 rounded-md px-4 py-1.5 text-sm text-gray-400 font-mono">
                forgeai.studio
              </div>
            </div>
            <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur rounded-2xl px-8 py-5 mb-6">
                  <Zap className="text-cyan-400" size={28} />
                  <span className="text-white font-bold text-2xl">ForgeAI Studio</span>
                </div>
                <p className="text-gray-400 text-sm">Your generated website appears here</p>
                <div className="mt-6 flex justify-center gap-3">
                  <div className="h-2 w-24 bg-white/10 rounded-full" />
                  <div className="h-2 w-16 bg-white/10 rounded-full" />
                  <div className="h-2 w-20 bg-white/10 rounded-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-gray-900/10 blur-xl rounded-full" />
        </div>
      </section>

      {/* Example prompts */}
      <section id="examples" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Try these prompts</h2>
            <p className="text-gray-500">Click any example to generate it instantly</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {examples.map((example, i) => (
              <button
                key={i}
                onClick={() => onNavigate('generator')}
                className="group text-left bg-white rounded-xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                    <Sparkles size={14} className="text-blue-600" />
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{example}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              From prompt to production-ready code in one seamless workflow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <f.icon size={22} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to build something amazing?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Start generating beautiful websites in seconds. No account needed.
          </p>
          <button
            onClick={() => onNavigate('generator')}
            className="group inline-flex items-center gap-2 bg-white text-gray-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            Launch Studio
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <footer className="py-8 px-6 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-md flex items-center justify-center">
              <Zap size={12} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-gray-400 text-sm font-medium">ForgeAI</span>
          </div>
          <p className="text-gray-600 text-sm">Built with Claude AI</p>
        </div>
      </footer>
    </div>
  );
}

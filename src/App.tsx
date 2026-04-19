import { useState } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './pages/LandingPage';
import { GeneratorPage } from './pages/GeneratorPage';
import { AppPage } from './lib/types';

function App() {
  const [page, setPage] = useState<AppPage>('landing');

  return (
    <div className="min-h-screen">
      <Header page={page} onNavigate={setPage} />
      {page === 'landing' ? (
        <LandingPage onNavigate={setPage} />
      ) : (
        <GeneratorPage />
      )}
    </div>
  );
}

export default App;

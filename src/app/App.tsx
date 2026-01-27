import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Navigation } from '@/app/components/Navigation';
import { HomePage } from '@/app/pages/HomePage';
import { ReceivePage } from '@/app/pages/ReceivePage';
import { HowItWorksPage } from '@/app/pages/HowItWorksPage';
import { SecurityPage } from '@/app/pages/SecurityPage';
import { DocsPage } from '@/app/pages/DocsPage';
import { Github } from 'lucide-react';

type Page =
  | 'home'
  | 'receive'
  | 'how-it-works'
  | 'security'
  | 'docs';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [receiveToken, setReceiveToken] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  /* -------------------------------
   THEME INITIALIZATION
  -------------------------------- */
  useEffect(() => {
    const savedTheme = localStorage.getItem(
      'silent-drop-theme'
    ) as 'light' | 'dark' | null;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle(
        'dark',
        savedTheme === 'dark'
      );
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

      setTheme(prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  const handleToggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('silent-drop-theme', newTheme);
  };

  /* -------------------------------
   HASH ROUTING (REAL LINKS)
   Example: #/drop/<TOKEN>
  -------------------------------- */
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);

      if (hash.startsWith('/drop/')) {
        const token = hash.replace('/drop/', '');
        setReceiveToken(token);
        setCurrentPage('receive');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  /* -------------------------------
   PAGE RENDERING
  -------------------------------- */
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;

      case 'receive':
        return <ReceivePage token={receiveToken} />;

      case 'how-it-works':
        return <HowItWorksPage />;

      case 'security':
        return <SecurityPage />;

      case 'docs':
        return <DocsPage />;

      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Animated Page Container */}
      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="relative"
        >
          {renderPage()}
        </motion.main>
      </AnimatePresence>

      {/* Footer */}
      <footer className="mt-auto border-t border-border">
  <div
    className="
      max-w-7xl mx-auto
      px-4 sm:px-6 lg:px-8
      py-6
      flex flex-col sm:flex-row
      items-center
      justify-between
      gap-4
      text-sm
    "
  >
    {/* Left: Copyright */}
    <div className="text-muted-foreground text-center sm:text-left">
      © 2026 Silent Drop · Part of SecureHub
    </div>

    {/* Right: Links */}
    <div
      className="
        flex items-center
        gap-6
        text-muted-foreground
        justify-center sm:justify-end
      "
    >
      <button
        onClick={() => setCurrentPage('security')}
        className="hover:text-foreground transition-colors"
        aria-label="Security"
      >
        <span className="hidden sm:inline">Security</span>
        <span className="sm:hidden">🔒</span>
      </button>

      <button
        onClick={() => setCurrentPage('docs')}
        className="hover:text-foreground transition-colors"
        aria-label="Docs"
      >
        <span className="hidden sm:inline">Docs</span>
        <span className="sm:hidden">📄</span>
      </button>

      <a
        href="https://github.com/mrinal140420"
        target="_blank"
        rel="noopener noreferrer"
        className="
          flex items-center gap-2
          hover:text-foreground
          transition-colors
        "
        aria-label="GitHub repository"
      >
        <Github className="h-5 w-5" />
        <span className="hidden sm:inline">GitHub</span>
      </a>
    </div>
  </div>
</footer>

    </div>
  );
}

export default App;

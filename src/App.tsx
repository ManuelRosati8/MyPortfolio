
import React, { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Header from './components/Header';
import Hero from './pages/Hero';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import AuroraBackground from './components/AuroraBackground';

const AppContent = () => {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t('meta.title');
  }, [t]);

  return (
    <div className="font-sans min-h-screen bg-neutral-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <AuroraBackground />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <Portfolio />
          <Contact />
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;

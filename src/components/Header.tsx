import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useT } from '../i18n/useTranslation';

const MotionDiv = motion.div;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const progressRef = useRef<HTMLDivElement>(null);
  const { t } = useT();

  const NAV_LINKS = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.work'), href: '#portfolio' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    if (isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const updateScrollState = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }

      const anchor = window.innerHeight * 0.35;
      let current = 'home';

      ['home', 'about', 'portfolio', 'contact'].forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= anchor) current = id;
      });

      setActiveSection(current);
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <nav className="container relative mx-auto flex items-center justify-between border-b border-neutral-200 bg-white/85 px-4 py-3 backdrop-blur-md transition-colors duration-300 dark:border-neutral-800/50 dark:bg-black/70 sm:px-6">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden">
            <div ref={progressRef} className="h-full w-full origin-left scale-x-0 bg-orange-500" />
          </div>
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white transition-colors hover:text-orange-500 dark:hover:text-orange-500">
            <span className="text-orange-500">&lt;</span>ManuelRosati<span className="text-orange-500"> /&gt;</span>
          </a>

          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />
            <LanguageToggle />

            <div className="hidden md:flex items-center space-x-6 ml-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
                  className={`group relative cursor-pointer text-sm transition-colors duration-300 hover:text-orange-500 dark:hover:text-orange-500 ${
                    activeSection === link.href.slice(1)
                      ? 'text-orange-500'
                      : 'text-neutral-700 dark:text-neutral-200'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full ${
                      activeSection === link.href.slice(1) ? 'w-full' : 'w-0'
                    }`}
                  />
                </a>
              ))}
            </div>

            <div className="md:hidden ml-1">
              <button
                onClick={toggleMenu}
                className="rounded-lg p-1.5 text-neutral-900 transition-colors hover:bg-neutral-100 focus:outline-none dark:text-white dark:hover:bg-neutral-800/50"
                aria-label="Menu"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </nav>
      </header>
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-white/95 backdrop-blur-sm dark:bg-black/90 md:hidden"
            onClick={toggleMenu}
          >
            <div className="flex items-center gap-4 mb-6">
              <ThemeToggle />
              <LanguageToggle />
            </div>
            <MotionDiv
              className="flex flex-col items-center space-y-8"
              onClick={(e) => e.stopPropagation()}
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
                  className={`cursor-pointer text-2xl transition-colors hover:text-orange-500 dark:hover:text-orange-500 ${
                    activeSection === link.href.slice(1)
                      ? 'text-orange-500'
                      : 'text-neutral-800 dark:text-neutral-200'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </MotionDiv>
            <button
              onClick={(event) => {
                event.stopPropagation();
                toggleMenu();
              }}
              autoFocus
              className="absolute right-6 top-6 rounded-lg p-1.5 text-neutral-900 transition-colors hover:bg-neutral-100 focus:outline-none dark:text-white dark:hover:bg-neutral-800/50"
              aria-label="Chiudi menu"
            >
              <X size={24} />
            </button>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

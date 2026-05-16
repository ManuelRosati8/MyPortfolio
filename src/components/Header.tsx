import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useT } from '../i18n/useTranslation';

const MotionDiv = motion.div;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center bg-white/85 dark:bg-black/70 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800/50 transition-colors duration-300">
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
                  className="text-sm text-neutral-700 dark:text-neutral-200 hover:text-orange-500 dark:hover:text-orange-500 transition-colors duration-300 relative group cursor-pointer"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            <div className="md:hidden ml-1">
              <button onClick={toggleMenu} className="text-neutral-900 dark:text-white focus:outline-none p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-colors" aria-label="Menu">
                <Menu size={22} />
              </button>
            </div>
          </div>
        </nav>
      </header>
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/95 dark:bg-black/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4 md:hidden"
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
                  className="text-2xl text-neutral-800 dark:text-neutral-200 hover:text-orange-500 dark:hover:text-orange-500 transition-colors cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </MotionDiv>
            <button onClick={toggleMenu} className="absolute top-6 right-6 text-neutral-900 dark:text-white focus:outline-none p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-colors" aria-label="Chiudi menu">
                <X size={24} />
            </button>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

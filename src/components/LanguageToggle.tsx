import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { lang, toggleLang } = useLanguage();

  return (
    <motion.button
      onClick={toggleLang}
      className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-mono font-bold text-neutral-400 hover:text-orange-500 hover:bg-neutral-800/50 transition-colors border border-neutral-800 hover:border-orange-500/30"
      whileTap={{ scale: 0.95 }}
      title={lang === 'it' ? 'Switch to English' : 'Passa a Italiano'}
      aria-label={lang === 'it' ? 'Switch to English' : 'Passa a Italiano'}
    >
      <span className={lang === 'it' ? 'text-orange-500' : ''}>IT</span>
      <span className="text-neutral-600">/</span>
      <span className={lang === 'en' ? 'text-orange-500' : ''}>EN</span>
    </motion.button>
  );
};

export default LanguageToggle;

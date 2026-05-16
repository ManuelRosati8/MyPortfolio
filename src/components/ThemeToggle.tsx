import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg text-neutral-400 hover:text-orange-500 hover:bg-neutral-800/50 transition-colors"
      whileTap={{ scale: 0.9 }}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
      aria-label={theme === 'dark' ? 'Attiva tema chiaro' : 'Attiva tema scuro'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180, scale: theme === 'dark' ? 1 : 1.2 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;

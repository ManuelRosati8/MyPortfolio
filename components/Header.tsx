import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../constants';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center bg-gray-950/70 backdrop-blur-md border-b border-gray-800/50">
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="text-xl font-bold text-white transition-colors hover:text-orange-500">
            <span className="text-orange-500">&lt;</span>ManuelRosati<span className="text-orange-500"> /&gt;</span>
          </a>
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-neutral-300 hover:text-orange-500 transition-colors duration-300 relative group cursor-pointer"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-950/90 z-50 flex items-center justify-center md:hidden"
            onClick={toggleMenu} // Close when clicking the backdrop
          >
            <motion.div
              className="flex flex-col items-center space-y-8"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu content
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-2xl text-neutral-200 hover:text-orange-500 transition-colors cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
            <button onClick={toggleMenu} className="absolute top-6 right-6 text-white focus:outline-none">
                <X size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
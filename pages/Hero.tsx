import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

  return (
    <section id="home" className="h-screen flex items-center justify-center relative text-center overflow-hidden">
      <motion.div
        className="z-10 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
          Ciao, sono <span className="text-orange-500">Manuel Rosati</span>.
        </h1>
        <p className="text-lg md:text-2xl text-neutral-300 max-w-3xl mx-auto mb-8">
          Sviluppatore Full-Stack con la passione di trasformare idee complesse in codice elegante e funzionale.
        </p>
        <a
          href="#portfolio"
          onClick={(e) => handleScrollClick(e, '#portfolio')}
          className="bg-orange-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-orange-700 transition-transform duration-300 ease-in-out transform hover:scale-105 inline-block cursor-pointer"
        >
          Scopri i miei lavori
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
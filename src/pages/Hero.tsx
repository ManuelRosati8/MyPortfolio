import React from 'react';
import { motion } from 'framer-motion';
import { useT } from '../i18n/useTranslation';

const MotionDiv = motion.div;

const Hero = () => {
    const { t } = useT();

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
    <section id="home" className="flex items-center justify-center relative text-center overflow-hidden px-6 pt-32 pb-16 md:pt-40 md:pb-24">
      <MotionDiv
        className="z-10 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
          {t('hero.greeting')} <span className="text-orange-500">{t('hero.name')}</span>.
        </h1>
        <p className="text-lg md:text-2xl text-neutral-300 max-w-3xl mx-auto mb-8">
          {t('hero.tagline')}
        </p>
        <a
          href="#portfolio"
          onClick={(e) => handleScrollClick(e, '#portfolio')}
          className="bg-orange-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-orange-700 transition-transform duration-300 ease-in-out transform hover:scale-105 inline-block cursor-pointer"
        >
          {t('hero.cta')}
        </a>
      </MotionDiv>
    </section>
  );
};

export default Hero;

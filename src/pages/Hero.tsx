import React from 'react';
import { motion } from 'framer-motion';
import InteractiveGrid from '@/components/InteractiveGrid';
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
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#faf9f6] px-6 pb-16 pt-32 text-center transition-colors duration-300 dark:bg-[#080808] md:pb-24 md:pt-40"
    >
      <InteractiveGrid />
      <MotionDiv
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight">
          {t('hero.greeting')} <span className="text-orange-500">{t('hero.name')}</span>.
        </h1>
        <p className="text-lg md:text-2xl text-neutral-800 dark:text-neutral-200 max-w-3xl mx-auto mb-8">
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

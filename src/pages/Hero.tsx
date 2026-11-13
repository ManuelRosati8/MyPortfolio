import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
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
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/[0.07] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
          {t('hero.availability')}
        </div>
        <h1 className="mb-4 text-balance text-4xl font-bold leading-tight text-neutral-900 dark:text-white md:text-6xl lg:text-7xl">
          {t('hero.greeting')} <span className="text-orange-500">{t('hero.name')}</span>.
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-pretty text-lg text-neutral-800 dark:text-neutral-200 md:text-2xl">
          {t('hero.tagline')}
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#portfolio"
            onClick={(e) => handleScrollClick(e, '#portfolio')}
            className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-7 py-3 font-bold text-white transition-all duration-300 hover:scale-[1.03] hover:bg-orange-700"
          >
            {t('hero.cta')}
            <ArrowRight size={17} />
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScrollClick(e, '#contact')}
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-7 py-3 font-semibold text-neutral-800 transition-colors duration-300 hover:border-orange-500/50 hover:text-orange-600 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-orange-500/50 dark:hover:text-orange-400"
          >
            {t('hero.contact')}
          </a>
        </div>
      </MotionDiv>

      <a
        href="#about"
        onClick={(e) => handleScrollClick(e, '#about')}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-neutral-500 transition-colors hover:text-orange-500"
      >
        {t('hero.scroll')}
        <ArrowDown size={14} className="motion-safe:animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;

import React, { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '../../constants';
import ProjectCard from '@/components/ProjectCard';
import { useT } from '../i18n/useTranslation';

type StackStyle = React.CSSProperties & {
  '--stack-offset-mobile': string;
  '--stack-offset': string;
};

const Portfolio = () => {
  const { t } = useT();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateActive = () => {
      const anchor = window.innerHeight * 0.35;
      let current = 0;

      cardRefs.current.forEach((card, index) => {
        if (card && card.getBoundingClientRect().top <= anchor) current = index;
      });

      setActiveIndex(current);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);

    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const scrollToProject = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const top = card.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="portfolio" className="container mx-auto px-4 py-20 sm:px-6 md:py-28">
      <div className="mb-12 text-center">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-orange-500">
          02 / {t('nav.work')}
        </p>
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white md:text-4xl">
          {t('portfolio.heading')}<span className="text-orange-500">.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-neutral-700 dark:text-neutral-200">
          {t('portfolio.subtext')}
        </p>
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col gap-5 md:gap-6">
        {PROJECTS.map((project, index) => {
          const style: StackStyle = {
            '--stack-offset-mobile': `${index * 6}px`,
            '--stack-offset': `${index * 14}px`,
            zIndex: index + 1,
          };

          return (
            <div
              key={project.id}
              id={`project-${project.id}`}
              ref={(element) => { cardRefs.current[index] = element; }}
              className="stack-card scroll-mt-28"
              style={style}
            >
              <ProjectCard project={project} index={index} total={PROJECTS.length} />
            </div>
          );
        })}
      </div>

      {isVisible && (
        <nav
          aria-label={t('portfolio.heading')}
          className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-2 xl:flex"
        >
          {PROJECTS.map((project, index) => (
            <button
              key={project.id}
              onClick={() => scrollToProject(index)}
              aria-label={t(`project.${project.id}.title`)}
              aria-current={activeIndex === index ? 'true' : undefined}
              className={`rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 dark:focus-visible:ring-offset-[#0a0a0a] ${
                activeIndex === index
                  ? 'h-6 w-2 bg-orange-500'
                  : 'h-2 w-2 bg-neutral-300 hover:bg-orange-400 dark:bg-neutral-700 dark:hover:bg-orange-400'
              }`}
            />
          ))}
        </nav>
      )}
    </section>
  );
};

export default Portfolio;

import React from 'react';
import { PROJECTS } from '../../constants';
import ProjectCard from '@/components/ProjectCard';
import { useT } from '../i18n/useTranslation';

type StackStyle = React.CSSProperties & {
  '--stack-offset-mobile': string;
  '--stack-offset': string;
};

const Portfolio = () => {
  const { t } = useT();

  return (
    <section id="portfolio" className="container mx-auto px-4 py-20 sm:px-6 md:py-28">
      <div className="mb-12 text-center">
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
            <div key={project.id} className="stack-card" style={style}>
              <ProjectCard project={project} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Portfolio;

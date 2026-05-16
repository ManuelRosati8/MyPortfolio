
import React from 'react';
import { PROJECTS } from '../../constants';
import Section from '@/components/Section';
import ProjectCard from '@/components/ProjectCard';
import { useT } from '../i18n/useTranslation';

const Portfolio = () => {
  const { t } = useT();

  return (
    <Section id="portfolio">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--color-text)' }}>
          {t('portfolio.heading')}<span className="text-orange-500">.</span>
        </h2>
        <p className="mt-4 max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
          {t('portfolio.subtext')}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
};

export default Portfolio;

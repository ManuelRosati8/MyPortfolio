
import React from 'react';
import { PROJECTS } from '../../constants';
import Section from '@/components/Section';
import ProjectCard from '@/components/ProjectCard';

const Portfolio = () => {
  return (
    <Section id="portfolio">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          I Miei Lavori<span className="text-orange-500">.</span>
        </h2>
        <p className="text-neutral-400 mt-4 max-w-2xl mx-auto">
          Una selezione di progetti che mostrano le mie competenze e la mia passione per la creazione di soluzioni digitali.
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

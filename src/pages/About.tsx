import React from 'react';
import Section from '@/components/Section';
import { Award, Cloud } from 'lucide-react';
import { useT } from '../i18n/useTranslation';

const About = () => {
  const { t } = useT();

  return (
    <Section id="about">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
          {t('about.heading')}<span className="text-orange-500">.</span>
        </h2>
        <div className="space-y-4 leading-relaxed text-lg" style={{ color: 'var(--color-text-secondary)' }}>
          <p>
            {t('about.p1')}
          </p>
          <p>
            {t('about.p2')}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <div className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 py-1 px-3 rounded-full text-xs font-mono">
            <Award size={13} />
            PSD I
          </div>
          <div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 py-1 px-3 rounded-full text-xs font-mono">
            <Cloud size={13} />
            AZ-900
          </div>
        </div>

        <div className="flex flex-wrap gap-3 sm:gap-4 mt-8 justify-center">
            <span className="bg-gray-800 text-orange-400 py-1.5 px-4 rounded-full text-sm font-mono">Angular</span>
            <span className="bg-gray-800 text-orange-400 py-1.5 px-4 rounded-full text-sm font-mono">TypeScript</span>
            <span className="bg-gray-800 text-orange-400 py-1.5 px-4 rounded-full text-sm font-mono">Ionic</span>
            <span className="bg-gray-800 text-orange-400 py-1.5 px-4 rounded-full text-sm font-mono">Micro-frontend</span>
            <span className="bg-gray-800 text-orange-400 py-1.5 px-4 rounded-full text-sm font-mono">Java</span>
            <span className="bg-gray-800 text-orange-400 py-1.5 px-4 rounded-full text-sm font-mono">Cypress</span>
            <span className="bg-gray-800 text-orange-400 py-1.5 px-4 rounded-full text-sm font-mono">GIT</span>
            <span className="bg-gray-800 text-orange-400 py-1.5 px-4 rounded-full text-sm font-mono">Google Maps API</span>
        </div>
      </div>
    </Section>
  );
};

export default About;

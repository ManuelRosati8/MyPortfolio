import React from 'react';
import Section from '@/components/Section';
import { Award, Cloud } from 'lucide-react';
import { PROJECTS } from '../../constants';
import { useT } from '../i18n/useTranslation';

const About = () => {
  const { t } = useT();
  const yearsOfExperience = Math.max(1, new Date().getFullYear() - 2021);

  const skillGroups = [
    {
      label: t('about.skills.frontend'),
      items: ['Angular', 'TypeScript', 'React', 'Micro-frontend'],
    },
    {
      label: t('about.skills.backend'),
      items: ['Java', 'Cypress', 'GIT', 'Testing E2E'],
    },
    {
      label: t('about.skills.mobile'),
      items: ['Ionic', 'Google Maps API', 'Mobile', 'UI/UX'],
    },
  ];

  const stats = [
    { value: `${yearsOfExperience}+`, label: t('about.stat.years') },
    { value: String(PROJECTS.length).padStart(2, '0'), label: t('about.stat.projects') },
    { value: '02', label: t('about.stat.certs') },
  ];

  return (
    <Section id="about">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-orange-500">
              01 / {t('nav.about')}
            </p>
            <h2 className="text-balance text-3xl font-bold text-neutral-900 dark:text-white md:text-4xl">
              {t('about.heading')}<span className="text-orange-500">.</span>
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-neutral-800 dark:text-neutral-200">
              {t('about.p1')}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 font-mono text-xs text-orange-600 dark:text-orange-400">
                <Award size={13} />
                PSD I
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 font-mono text-xs text-blue-600 dark:text-blue-400">
                <Cloud size={13} />
                AZ-900
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <p className="text-pretty text-lg leading-relaxed text-neutral-800 dark:text-neutral-200">
              {t('about.p2')}
            </p>

            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-neutral-200 bg-white/70 p-4 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/50"
                >
                  <p className="font-mono text-2xl font-bold text-orange-500 md:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-[11px] leading-snug text-neutral-600 dark:text-neutral-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 font-mono text-xs text-neutral-700 transition-colors hover:border-orange-500/40 hover:text-orange-600 dark:border-neutral-800 dark:bg-neutral-900/70 dark:text-neutral-300 dark:hover:border-orange-500/40 dark:hover:text-orange-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SOCIAL_LINKS } from '../../constants';
import Section from '@/components/Section';
import SocialIcon from '@/components/SocialIcon';
import { useT } from '../i18n/useTranslation';

const Contact = () => {
  const { t } = useT();
  const linkedin = SOCIAL_LINKS.find((link) => link.name === 'LinkedIn');
  const github = SOCIAL_LINKS.find((link) => link.name === 'GitHub');

  return (
    <Section id="contact">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-neutral-200 bg-white/70 p-8 text-center shadow-xl shadow-neutral-200/40 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/50 dark:shadow-black/40 md:p-12">
        <div className="pointer-events-none absolute -top-28 left-1/2 h-56 w-[32rem] -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-orange-500">
            03 / {t('nav.contact')}
          </p>
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white md:text-4xl">
            {t('contact.heading')}<span className="text-orange-500">.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-700 dark:text-neutral-200">
            {t('contact.subtext')}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
            {t('contact.availability')}
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {linkedin && (
              <a
                href={linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:bg-orange-700"
              >
                <linkedin.icon size={16} />
                {t('contact.linkedinCta')}
                <ArrowUpRight size={15} />
              </a>
            )}
            {github && (
              <a
                href={github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-800 transition-colors duration-300 hover:border-orange-500/50 hover:text-orange-600 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-orange-500/50 dark:hover:text-orange-400"
              >
                <github.icon size={16} />
                {t('contact.githubCta')}
              </a>
            )}
          </div>

          <div className="mt-9 flex items-center justify-center gap-7 border-t border-neutral-200 pt-6 dark:border-neutral-800">
            {SOCIAL_LINKS.map((link) => (
              <React.Fragment key={link.href}>
                <SocialIcon icon={link.icon} href={link.href} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;

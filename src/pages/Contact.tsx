import React from 'react';
import { SOCIAL_LINKS } from '../../constants';
import Section from '@/components/Section';
import SocialIcon from '@/components/SocialIcon';
import { useT } from '../i18n/useTranslation';

const Contact = () => {
  const { t } = useT();

  return (
    <Section id="contact">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
          {t('contact.heading')}<span className="text-orange-500">.</span>
        </h2>
        <p className="text-neutral-700 dark:text-neutral-200 mt-4 max-w-2xl mx-auto">
          {t('contact.subtext')}
        </p>
      </div>
      <div className="flex justify-center items-center gap-8">
        {SOCIAL_LINKS.map((link) => (
          <SocialIcon key={link.href} icon={link.icon} href={link.href} />
        ))}
      </div>
    </Section>
  );
};

export default Contact;

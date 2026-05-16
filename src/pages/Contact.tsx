import React from 'react';
import { SOCIAL_LINKS } from '../../constants';
import Section from '@/components/Section';
import SocialIcon from '@/components/SocialIcon';

const Contact = () => {
  return (
    <Section id="contact">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Trovami Online<span className="text-orange-500">.</span>
        </h2>
        <p className="text-neutral-400 mt-4 max-w-2xl mx-auto">
          Dai un'occhiata al mio profilo GitHub per vedere i miei progetti e connettiamoci su LinkedIn. Sono sempre aperto a nuove sfide e collaborazioni.
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

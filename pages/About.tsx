import React from 'react';
import Section from '../components/Section';

const About = () => {
  return (
    <Section id="about">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Chi Sono<span className="text-orange-500">.</span>
        </h2>
        <div className="space-y-4 text-neutral-300 leading-relaxed text-lg">
          <p>
            Sviluppatore software dal 2021, con una forte passione per la tecnologia e un focus primario su Angular e l'ecosistema TypeScript. La mia esperienza spazia dalla creazione di complesse applicazioni a micro-frontend e microservizi, fino allo sviluppo di app mobile ibride.
          </p>
          <p>
            Ho lavorato su diverse piattaforme, incluse soluzioni fintech di equity crowdfunding e gestionali aziendali, utilizzando tecnologie come Java e SpringBoot. Sono un sostenitore del codice pulito e della qualità, con esperienza pratica nell'implementazione di test (inclusi E2E con Cypress) per garantire soluzioni robuste e performanti.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 sm:gap-4 mt-8 justify-center">
            <span className="bg-gray-800 text-orange-400 py-1.5 px-4 rounded-full text-sm font-mono">Angular</span>
            <span className="bg-gray-800 text-orange-400 py-1.5 px-4 rounded-full text-sm font-mono">TypeScript</span>
            <span className="bg-gray-800 text-orange-400 py-1.5 px-4 rounded-full text-sm font-mono">Ionic</span>
            <span className="bg-gray-800 text-orange-400 py-1.5 px-4 rounded-full text-sm font-mono">Java &amp; SpringBoot</span>
            <span className="bg-gray-800 text-orange-400 py-1.5 px-4 rounded-full text-sm font-mono">Micro-frontend</span>
            <span className="bg-gray-800 text-orange-400 py-1.5 px-4 rounded-full text-sm font-mono">Cypress</span>
            <span className="bg-gray-800 text-orange-400 py-1.5 px-4 rounded-full text-sm font-mono">GIT</span>
            <span className="bg-gray-800 text-orange-400 py-1.5 px-4 rounded-full text-sm font-mono">Google Maps API</span>
        </div>
      </div>
    </Section>
  );
};

export default About;
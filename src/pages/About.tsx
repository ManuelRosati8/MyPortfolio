import React from 'react';
import Section from '@/components/Section';
import { Award, Cloud } from 'lucide-react';

const About = () => {
  return (
    <Section id="about">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Chi Sono<span className="text-orange-500">.</span>
        </h2>
        <div className="space-y-4 text-neutral-300 leading-relaxed text-lg">
          <p>
            Sviluppatore software dal 2021, specializzato in <span className="text-orange-400 font-medium">Angular</span> e nell'ecosistema <span className="text-orange-400 font-medium">TypeScript</span>, con esperienza anche lato backend. Il mio focus primario &egrave; il frontend: architetture a micro-frontend, applicazioni mobile ibride con Ionic, e piattaforme web complesse per la Pubblica Amministrazione e il settore fintech.
          </p>
          <p>
            Lavoro a tutto tondo sullo stack — dal frontend Angular al backend in Java — ma &egrave; nell'esperienza utente e nella qualit&agrave; del codice frontend che do il meglio. Sono un sostenitore del codice pulito e dei test automatizzati (E2E con Cypress, unit e integration) per garantire soluzioni robuste e performanti.
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
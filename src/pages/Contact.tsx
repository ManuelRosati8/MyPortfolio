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
      <div className="max-w-2xl mx-auto">
        {/* 
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="sr-only">Nome</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Il tuo nome"
              className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="La tua email"
              className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>
          <div>
            <label htmlFor="message" className="sr-only">Messaggio</label>
            <textarea
              name="message"
              id="message"
              rows={5}
              placeholder="Il tuo messaggio"
              className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 bg-orange-600 text-white font-bold rounded-md transition-all duration-200 ease-in-out transform hover:bg-orange-700 active:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-orange-500"
              style={{
                boxShadow: '0px 4px 0px 0px #c2410c', // orange-800
              }}
            >
              Invia Messaggio
            </button>
          </div>
        </form>
        */}
        <div className="flex justify-center items-center gap-8">
          {SOCIAL_LINKS.map((link) => (
            <SocialIcon key={link.href} icon={link.icon} href={link.href} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Contact;
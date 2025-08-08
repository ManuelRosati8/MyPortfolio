
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './pages/Hero';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";


const App = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions = {
    background: {
      color: {
        value: '#0a0a0a',
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse',
        },
        resize: {
          enable: true,
        },
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: '#f97316',
      },
      links: {
        color: '#ffffff',
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'out',
        },
        random: true,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          height: 800,
          width: 800
        },
        value: 200,
      },
      opacity: {
        value: { min: 0.1, max: 0.6 },
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  } as const;

  return (
    <div className="font-sans min-h-screen bg-[#0a0a0a]">
       {init && <Particles
        id="tsparticles"
        options={particlesOptions}
        className="fixed inset-0 z-0"
      />}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <Portfolio />
          <Contact />
        </main>
      </div>
    </div>
  );
};

export default App;
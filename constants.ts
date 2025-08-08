import { Project } from './types';
import { Github, Linkedin } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Chi sono', href: '#about' },
  { name: 'Lavori', href: '#portfolio' },
  { name: 'Contatti', href: '#contact' },
];

export const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/ManuelRosati8' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/manuel-rosati-317bb2237/' },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Piattaforma Legale per la PA',
    description: 'Sistema a microservizi per la gestione digitale di processi legali e amministrativi complessi.',
    longDescription: 'Ho guidato lo sviluppo frontend di una piattaforma web per la Pubblica Amministrazione, basata su un\'architettura a microservizi per gestire ricorsi, notifiche e documenti legali. Il sistema, realizzato in Angular, automatizza i flussi di lavoro, il tracciamento dei casi e la gestione dei pagamenti.',
    tags: ['Angular', 'Micro-frontends', 'Microservizi', 'PA'],
    imageUrl: 'https://picsum.photos/seed/legaltech/600/400',
    repoUrl: 'https://github.com/ManuelRosati8',
  },
  {
    id: 2,
    title: 'App Mobile per Trasporti Pubblici',
    description: 'App ibrida per pianificazione viaggi, acquisto biglietti e gestione di un portafoglio digitale.',
    longDescription: 'Ho implementato un\'applicazione ibrida (Ionic/Angular) per la pianificazione di viaggi. L\'app integra le API di Google Maps per calcolare percorsi e costi, e include un wallet digitale per incentivi e acquisti, offrendo un\'esperienza utente completa e integrata.',
    tags: ['Angular', 'Ionic', 'Google Maps API', 'Mobile'],
    imageUrl: 'https://picsum.photos/seed/mobilityapp/600/400',
    repoUrl: 'https://github.com/ManuelRosati8',
  },
  {
    id: 3,
    title: 'Gestionale Aziendale Modulare',
    description: 'Applicazione web per la gestione di onboarding, clienti, fornitori, progetti e asset.',
    longDescription: 'Ho sviluppato una web app con backend a microservizi per semplificare i flussi di lavoro aziendali. Ho realizzato moduli per la gestione di asset, risorse, attività e progetti, e condotto test component e E2E con Cypress per assicurare la massima affidabilità del software.',
    tags: ['Angular', 'Microservizi', 'Cypress', 'Testing'],
    imageUrl: 'https://picsum.photos/seed/businesserp/600/400',
    repoUrl: 'https://github.com/ManuelRosati8',
  },
  {
    id: 4,
    title: 'Piattaforma di Equity Crowdfunding',
    description: 'Piattaforma di investimento per facilitare l\'accesso al mercato dei capitali per startup e PMI.',
    longDescription: 'Ho sviluppato il frontend di una piattaforma che connette investitori con startup e PMI in cerca di capitali. L\'applicazione, realizzata con Angular e Material Design, consente agli utenti di analizzare e investire in aziende con piani di business solidi.',
    tags: ['Angular', 'TypeScript', 'Material', 'Fintech'],
    imageUrl: 'https://picsum.photos/seed/crowdfund/600/400',
    repoUrl: 'https://github.com/ManuelRosati8',
  },
  {
    id: 5,
    title: 'Portale Fornitori e Gestione Bandi',
    description: 'Sistemi web per la gestione di richieste fornitori e la consultazione di bandi europei.',
    longDescription: 'Ho creato due portali distinti: uno per la gestione delle richieste dei fornitori, con gestione ruoli e notifiche, e un altro per lo scouting di bandi europei e regionali, dotato di ricerca avanzata e funzionalità di preferiti per semplificare l\'accesso ai fondi.',
    tags: ['Angular', 'UI/UX', 'Ricerca', 'Dati'],
    imageUrl: 'https://picsum.photos/seed/portals/600/400',
    repoUrl: 'https://github.com/ManuelRosati8',
  },
  {
    id: 6,
    title: 'Proof of Concept per la Mobilità',
    description: 'PoC per il calcolo di percorsi multimodali e la pianificazione di itinerari con veicoli ecologici.',
    longDescription: 'Ho sviluppato due PoC utilizzando Ionic e Angular. Il primo calcolava percorsi e costi dei biglietti integrando le API di Google Maps. Il secondo si focalizzava sulla pianificazione di percorsi per veicoli ecologici, includendo la guida vocale per un\'esperienza innovativa.',
    tags: ['Angular', 'Ionic', 'Google Maps API', 'PoC'],
    imageUrl: 'https://picsum.photos/seed/mobilitypoc/600/400',
    repoUrl: 'https://github.com/ManuelRosati8',
  },
];
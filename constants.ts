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
    title: 'Financerox — Gestione Finanze Personali',
    description: 'App full-stack per la gestione delle finanze personali con calendario, pianificazione obiettivi e analisi delle spese ricorrenti.',
    longDescription: '',
    tags: ['React', 'TypeScript', 'Full-Stack', 'Finance'],
    imageUrl: 'https://picsum.photos/seed/financerox/600/400',
    liveUrl: 'https://www.financerox.finance',
  },
  {
    id: 2,
    title: 'Piattaforma Legale per la PA',
    description: 'Sistema a microservizi per la gestione digitale di processi legali e amministrativi complessi.',
    longDescription: '',
    tags: ['Angular', 'Micro-frontends', 'Microservizi', 'PA'],
    imageUrl: 'https://picsum.photos/seed/legaltech/600/400',
  },
  {
    id: 3,
    title: 'App Mobile per Trasporti Pubblici',
    description: 'App ibrida per pianificazione viaggi, acquisto biglietti e gestione di un portafoglio digitale.',
    longDescription: '',
    tags: ['Angular', 'Ionic', 'Google Maps API', 'Mobile'],
    imageUrl: 'https://picsum.photos/seed/mobilityapp/600/400',
  },
  {
    id: 4,
    title: 'Gestionale Aziendale Modulare',
    description: 'Applicazione web per la gestione di onboarding, clienti, fornitori, progetti e asset.',
    longDescription: '',
    tags: ['Angular', 'Microservizi', 'Cypress', 'Testing'],
    imageUrl: 'https://picsum.photos/seed/businesserp/600/400',
  },
  {
    id: 5,
    title: 'Piattaforma di Equity Crowdfunding',
    description: 'Piattaforma di investimento per facilitare l\'accesso al mercato dei capitali per startup e PMI.',
    longDescription: '',
    tags: ['Angular', 'TypeScript', 'Material', 'Fintech'],
    imageUrl: 'https://picsum.photos/seed/crowdfund/600/400',
  },
  {
    id: 6,
    title: 'Portale Fornitori e Gestione Bandi',
    description: 'Sistemi web per la gestione di richieste fornitori e la consultazione di bandi europei.',
    longDescription: '',
    tags: ['Angular', 'UI/UX', 'Ricerca', 'Dati'],
    imageUrl: 'https://picsum.photos/seed/portals/600/400',
  },
  {
    id: 7,
    title: 'Proof of Concept per la Mobilità',
    description: 'PoC per il calcolo di percorsi multimodali e la pianificazione di itinerari con veicoli ecologici.',
    longDescription: '',
    tags: ['Angular', 'Ionic', 'Google Maps API', 'PoC'],
    imageUrl: 'https://picsum.photos/seed/mobilitypoc/600/400',
  },
];


import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'it' | 'en';

export type Translations = {
  [key: string]: {
    it: string;
    en: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translations: Translations;
}

const translations: Translations = {
  // Navigation
  'nav.problem': {
    it: 'Problema',
    en: 'Problem',
  },
  'nav.solution': {
    it: 'Soluzione',
    en: 'Solution',
  },
  'nav.features': {
    it: 'Caratteristiche',
    en: 'Features',
  },
  'nav.workflow': {
    it: 'Come Funziona',
    en: 'How It Works',
  },
  'nav.benefits': {
    it: 'Vantaggi',
    en: 'Benefits',
  },
  'nav.login': {
    it: 'Accedi',
    en: 'Login',
  },
  // Hero section
  'hero.introText': {
    it: 'Il primo marketplace dedicato alla redazione di EPD che connette aziende, consulenti ed enti di certificazione, con approccio "zero re-work".',
    en: 'The first marketplace dedicated to EPD drafting that connects companies, consultants, and certification bodies, with a "zero re-work" approach.',
  },
  'hero.signupCompany': {
    it: 'Iscriviti come Azienda',
    en: 'Sign up as Company',
  },
  'hero.signupConsultant': {
    it: 'Iscriviti come Consulente',
    en: 'Sign up as Consultant',
  },
  'hero.signupCertification': {
    it: 'Iscriviti come Ente di Certificazione',
    en: 'Sign up as Certification Body',
  },
  'hero.platformDescription': {
    it: 'Un marketplace, tre esperienze personalizzate.',
    en: 'One marketplace, three personalized experiences.',
  },
  // Features section
  'features.title': {
    it: 'Cosa offre la piattaforma',
    en: 'Platform Features',
  },
  'features.onboarding.title': {
    it: 'Onboarding personalizzato',
    en: 'Personalized Onboarding',
  },
  'features.onboarding.description': {
    it: 'Percorso guidato per aziende, consulenti e enti di certificazione',
    en: 'Guided path for companies, consultants and certification bodies',
  },
  'features.ai.title': {
    it: 'AI Matching',
    en: 'AI Matching',
  },
  'features.ai.description': {
    it: 'Algoritmo avanzato tra richieste e competenze verificate',
    en: 'Advanced algorithm matching requests with verified skills',
  },
  'features.import.title': {
    it: 'Import automatico dati',
    en: 'Automatic Data Import',
  },
  'features.import.description': {
    it: "Semplificazione del processo di acquisizione dati d'inventario per EPD",
    en: 'Simplified inventory data acquisition process for EPD',
  },
  'features.monitoring.title': {
    it: 'Monitoraggio progetto',
    en: 'Project Monitoring',
  },
  'features.monitoring.description': {
    it: 'Controllo in tempo reale con alert e notifiche personalizzate',
    en: 'Real-time control with customized alerts and notifications',
  },
  // Workflow Section
  'workflow.title': {
    it: 'Come funziona',
    en: 'How it works',
  },
  'workflow.subtitle': {
    it: 'Il processo in quattro semplici passaggi',
    en: 'The process in four simple steps',
  },
  'workflow.step1.title': {
    it: 'Registrati e compila il profilo',
    en: 'Register and complete your profile',
  },
  'workflow.step1.description': {
    it: 'Scheda guidata secondo il tuo ruolo',
    en: 'Guided form according to your role',
  },
  'workflow.step2.title': {
    it: 'Onboarding personalizzato',
    en: 'Personalized onboarding',
  },
  'workflow.step2.description': {
    it: 'Per individuare la tipologia di studio LCA/EPD che risponde alle proprie esigenze',
    en: 'To identify the type of LCA/EPD study that meets your needs',
  },
  'workflow.step3.title': {
    it: 'Match automatico & firma contratto',
    en: 'Automatic match & contract signature',
  },
  'workflow.step3.description': {
    it: 'Nessun contatto diretto fino alla selezione',
    en: 'No direct contact until selection',
  },
  'workflow.step4.title': {
    it: 'Lavora in uno spazio digitale condiviso',
    en: 'Work in a shared digital space',
  },
  'workflow.step4.description': {
    it: 'Con scadenze, documenti, chat e tracciamento',
    en: 'With deadlines, documents, chat and tracking',
  },
  // Benefits section
  'benefits.title': {
    it: 'Vantaggi per ciascun target',
    en: 'Benefits for each target',
  },
  'benefits.subtitle': {
    it: 'Scopri i benefici specifici per il tuo ruolo',
    en: 'Discover the specific benefits for your role',
  },
  'benefits.companies.title': {
    it: 'Aziende',
    en: 'Companies',
  },
  'benefits.companies.benefit1': {
    it: 'Risparmio di tempo e costi',
    en: 'Time and cost savings',
  },
  'benefits.companies.benefit2': {
    it: 'Accesso a consulenti verificati e matching istantaneo',
    en: 'Access to verified consultants and instant matching',
  },
  'benefits.companies.benefit3': {
    it: 'Nessun errore iniziale: onboarding tecnico accurato',
    en: 'No initial errors: accurate technical onboarding',
  },
  'benefits.consultants.title': {
    it: 'Consulenti',
    en: 'Consultants',
  },
  'benefits.consultants.benefit1': {
    it: 'Opportunità già profilate, senza spese di marketing',
    en: 'Pre-profiled opportunities, without marketing expenses',
  },
  'benefits.consultants.benefit2': {
    it: 'Caricamento CV e selezione dei settori di competenza',
    en: 'CV upload and selection of areas of expertise',
  },
  'benefits.consultants.benefit3': {
    it: 'Area personale, rating, e gestione progetti semplificata',
    en: 'Personal area, rating, and simplified project management',
  },
  'benefits.certification.title': {
    it: 'Enti di certificazione',
    en: 'Certification bodies',
  },
  'benefits.certification.benefit1': {
    it: 'Coinvolgimento anticipato nel flusso',
    en: 'Early involvement in the flow',
  },
  'benefits.certification.benefit2': {
    it: 'Dossier clienti ordinati e standardizzati',
    en: 'Organized and standardized client dossiers',
  },
  'benefits.certification.benefit3': {
    it: 'Sincronizzazione automatica delle fasi',
    en: 'Automatic synchronization of phases',
  },
  // CTA Section
  'cta.title': {
    it: 'Inizia subito. La sostenibilità non può aspettare.',
    en: 'Start now. Sustainability cannot wait.',
  },
  'cta.subtitle': {
    it: 'Unisciti al marketplace che sta rivoluzionando il modo in cui aziende, consulenti ed enti di certificazione collaborano per un futuro sostenibile.',
    en: 'Join the marketplace that is revolutionizing how companies, consultants, and certification bodies collaborate for a sustainable future.',
  },
  'cta.appointment.title': {
    it: 'Prenota il tuo primo appuntamento gratuito',
    en: 'Schedule your free first appointment',
  },
  'cta.appointment.description': {
    it: '30 minuti gratuiti per tutte le aziende che si iscrivono',
    en: '30 free minutes for all companies that sign up',
  },
  'cta.book': {
    it: 'Prenota ora',
    en: 'Book now',
  },
  // Footer
  'footer.slogan': {
    it: 'Il marketplace della sostenibilità che connette aziende, consulenti ed enti di certificazione.',
    en: 'The sustainability marketplace that connects companies, consultants and certification bodies.',
  },
  'footer.about': {
    it: 'Chi siamo',
    en: 'About us',
  },
  'footer.story': {
    it: 'La nostra storia',
    en: 'Our story',
  },
  'footer.team': {
    it: 'Team',
    en: 'Team',
  },
  'footer.partners': {
    it: 'Partner',
    en: 'Partners',
  },
  'footer.contacts': {
    it: 'Contatti',
    en: 'Contacts',
  },
  'footer.support': {
    it: 'Supporto',
    en: 'Support',
  },
  'footer.legal': {
    it: 'Legale',
    en: 'Legal',
  },
  'footer.privacy': {
    it: 'Privacy Policy',
    en: 'Privacy Policy',
  },
  'footer.terms': {
    it: 'Termini e Condizioni',
    en: 'Terms and Conditions',
  },
  'footer.cookies': {
    it: 'Cookie Policy',
    en: 'Cookie Policy',
  },
  'footer.rights': {
    it: 'Tutti i diritti riservati.',
    en: 'All rights reserved.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('it');

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`No translation found for key: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

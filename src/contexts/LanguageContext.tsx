
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
    it: 'Semplificazione del processo di acquisizione dati d'inventario per EPD',
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
  // CTA Section
  'cta.title': {
    it: 'Inizia subito. La sostenibilità non può aspettare.',
    en: 'Start now. Sustainability cannot wait.',
  },
  'cta.subtitle': {
    it: 'Unisciti alla piattaforma che sta rivoluzionando il modo in cui aziende, consulenti ed enti di certificazione collaborano per un futuro sostenibile.',
    en: 'Join the platform that is revolutionizing how companies, consultants, and certification bodies collaborate for a sustainable future.',
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

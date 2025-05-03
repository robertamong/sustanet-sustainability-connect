import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the context type
interface LanguageContextProps {
  language: 'it' | 'en';
  setLanguage: (language: 'it' | 'en') => void;
  t: (key: string) => string;
}

// Create the context with a default value
const LanguageContext = createContext<LanguageContextProps>({
  language: 'it', // Default language is Italian
  setLanguage: () => {},
  t: (key: string) => key, // Default translation function (returns the key itself)
});

// Define language translations
const translations = {
  it: {
    'nav.about': 'Chi siamo',
    'nav.features': 'Funzionalità',
    'nav.workflow': 'Come Funziona',
    'nav.benefits': 'Vantaggi',
    'nav.contact': 'Contatti',
    'hero.introText': 'Il primo marketplace dedicato alla redazione di EPD che connette aziende, consulenti ed enti di certificazione, con approccio "zero re-work"',
    'hero.waitingListCta': 'Sì, voglio accesso prioritario',
    'hero.signupCompany': 'Iscriviti come azienda',
    'hero.signupConsultant': 'Iscriviti come consulente',
    'hero.signupCertification': 'Iscriviti come ente',
    'hero.platformDescription': 'La dashboard che connette, semplifica e velocizza il processo di certificazione.',
    'cta.appointment.title': 'Prenota ora il tuo primo appuntamento gratuito',
    'cta.book': 'Prenota ora',
    'features.title': 'Funzionalità',
    'workflow.title': 'Come Funziona',
    'benefits.title': 'Vantaggi',
    'benefits.forCompanies': 'Per le aziende',
    'benefits.forConsultants': 'Per i consulenti',
    'benefits.forCertification': 'Per gli enti',
    'footer.slogan': 'Un unico ambiente per connettere aziende, consulenti ed enti di certificazione',
    'footer.about': 'Chi siamo',
    'footer.story': 'La nostra storia',
    'footer.team': 'Il team',
    'footer.partners': 'Partner',
    'footer.contacts': 'Contatti',
    'footer.support': 'Supporto',
    'footer.legal': 'Legale',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Termini e Condizioni',
    'footer.cookies': 'Cookie Policy',
    'footer.rights': 'Tutti i diritti riservati.',
    'waitingList.title': 'Iscriviti alla lista d\'attesa',
    'waitingList.description': 'Inserisci i tuoi dati per avere accesso prioritario alla piattaforma',
    'waitingList.firstName': 'Nome*',
    'waitingList.lastName': 'Cognome*',
    'waitingList.email': 'Email*',
    'waitingList.organizationType': 'Tipo di organizzazione*',
    'waitingList.organizationName': 'Nome organizzazione',
    'waitingList.firstNamePlaceholder': 'Inserisci il tuo nome',
    'waitingList.lastNamePlaceholder': 'Inserisci il tuo cognome',
    'waitingList.emailPlaceholder': 'esempio@dominio.it',
    'waitingList.selectOrganizationType': 'Seleziona il tipo di organizzazione',
    'waitingList.company': 'Azienda',
    'waitingList.consultant': 'Consulente',
    'waitingList.certificationBody': 'Ente di Certificazione',
    'waitingList.organizationNamePlaceholder': 'Inserisci il nome dell\'organizzazione',
    'waitingList.cancel': 'Annulla',
    'waitingList.submit': 'Iscriviti',
  },
  en: {
    'nav.about': 'About Us',
    'nav.features': 'Features',
    'nav.workflow': 'How it Works',
    'nav.benefits': 'Benefits',
    'nav.contact': 'Contact',
    'hero.introText': 'The first marketplace dedicated to EPD drafting that connects companies, consultants and certification bodies, with a "zero re-work" approach',
    'hero.waitingListCta': 'Yes, I want priority access',
    'hero.signupCompany': 'Sign up as a company',
    'hero.signupConsultant': 'Sign up as a consultant',
    'hero.signupCertification': 'Sign up as a certification body',
    'hero.platformDescription': 'The dashboard that connects, simplifies and speeds up the certification process.',
    'cta.appointment.title': 'Book your first free appointment now',
    'cta.book': 'Book now',
    'features.title': 'Features',
    'workflow.title': 'How it Works',
    'benefits.title': 'Benefits',
    'benefits.forCompanies': 'For companies',
    'benefits.forConsultants': 'For consultants',
    'benefits.forCertification': 'For certification bodies',
    'footer.slogan': 'A single environment to connect companies, consultants and certification bodies',
    'footer.about': 'About Us',
    'footer.story': 'Our Story',
    'footer.team': 'The Team',
    'footer.partners': 'Partners',
    'footer.contacts': 'Contacts',
    'footer.support': 'Support',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms and Conditions',
    'footer.cookies': 'Cookie Policy',
    'footer.rights': 'All rights reserved.',
    'waitingList.title': 'Join the waiting list',
    'waitingList.description': 'Enter your details to get priority access to the platform',
    'waitingList.firstName': 'First Name*',
    'waitingList.lastName': 'Last Name*',
    'waitingList.email': 'Email*',
    'waitingList.organizationType': 'Organization Type*',
    'waitingList.organizationName': 'Organization Name',
    'waitingList.firstNamePlaceholder': 'Enter your first name',
    'waitingList.lastNamePlaceholder': 'Enter your last name',
    'waitingList.emailPlaceholder': 'example@domain.com',
    'waitingList.selectOrganizationType': 'Select organization type',
    'waitingList.company': 'Company',
    'waitingList.consultant': 'Consultant',
    'waitingList.certificationBody': 'Certification Body',
    'waitingList.organizationNamePlaceholder': 'Enter organization name',
    'waitingList.cancel': 'Cancel',
    'waitingList.submit': 'Join',
  }
};

// Language provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State to hold the current language
  const [language, setLanguage] = useState<'it' | 'en'>('it');

  // Function to translate text
  const t = (key: string) => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    // Get the language from localStorage
    const storedLanguage = localStorage.getItem('language') as 'it' | 'en' | null;
    if (storedLanguage) {
      setLanguage(storedLanguage);
    } else {
      // Set the language to the browser language if no language is stored
      const browserLanguage = navigator.language.substring(0, 2) as 'it' | 'en';
      setLanguage(browserLanguage === 'it' ? 'it' : 'en');
    }
  }, []);

  useEffect(() => {
    // Store the language in localStorage
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  return useContext(LanguageContext);
};

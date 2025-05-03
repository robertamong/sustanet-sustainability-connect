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
    'nav.login': 'Accedi',
    'nav.priorityAccess': 'Accesso prioritario',
    'hero.introText': 'La prima piattaforma integrata per la gestione strutturata dell\'intero processo di redazione dell\'EPD che connette aziende, consulenti ed enti di certificazione, con approccio "zero re-work"',
    'hero.waitingListCta': 'Sì, voglio accesso prioritario',
    'hero.platformDescription': 'La dashboard che connette, semplifica e velocizza il processo di certificazione.',
    'features.title': 'Funzionalità della piattaforma',
    'features.whyChoose': 'Perché scegliere Sustanet',
    'features.onboarding.title': 'Onboarding Guidato',
    'features.onboarding.description': 'Procedura guidata per onboarding su misura delle esigenze della tua organizzazione.',
    'features.ai.title': 'Intelligenza Artificiale',
    'features.ai.description': 'Strumenti basati su AI per automatizzare le attività più ripetitive e supportare le tue decisioni.',
    'features.import.title': 'Importazione Dati',
    'features.import.description': 'Facile importazione dei dati da fogli di calcolo e altre fonti esterne.',
    'features.monitoring.title': 'Monitoraggio in tempo reale',
    'features.monitoring.description': 'Dashboard per monitorare lo stato di avanzamento di tutti i tuoi progetti EPD.',
    'workflow.title': 'Come Funziona',
    'workflow.subtitle': 'Processo semplificato in 4 passaggi',
    'workflow.step1.title': 'Registrazione',
    'workflow.step1.description': 'Crea il tuo account e completa il profilo della tua organizzazione.',
    'workflow.step2.title': 'Onboarding personalizzato',
    'workflow.step2.description': 'Per individuare la tipologia di studio LCA/EPD che risponde alle proprie esigenze.',
    'workflow.step3.title': 'Gestione Progetti',
    'workflow.step3.description': 'Crea e gestisci i tuoi progetti EPD in un unico ambiente collaborativo.',
    'workflow.step4.title': 'Monitoraggio e Reportistica',
    'workflow.step4.description': 'Monitora lo stato di avanzamento e genera report automatici.',
    'benefits.title': 'Vantaggi',
    'benefits.subtitle': 'Scopri i vantaggi di utilizzare Sustanet',
    'benefits.companies.title': 'Per le Aziende',
    'benefits.companies.benefit1': 'Riduzione dei tempi di redazione EPD',
    'benefits.companies.benefit2': 'Riduzione significativa dei costi',
    'benefits.companies.benefit3': 'Ambiente collaborativo con consulenti ed enti',
    'benefits.consultants.title': 'Per i Consulenti',
    'benefits.consultants.benefit1': 'Ottimizzazione del workflow di lavoro',
    'benefits.consultants.benefit2': 'Riduzione dei tempi di gestione',
    'benefits.consultants.benefit3': 'Ampliamento del portfolio clienti',
    'benefits.certification.title': 'Per gli Enti di Certificazione',
    'benefits.certification.benefit1': 'Standardizzazione del processo di verifica',
    'benefits.certification.benefit2': 'Riduzione dei tempi di verifica',
    'benefits.certification.benefit3': 'Incremento della qualità delle verifiche',
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
    'nav.login': 'Login',
    'nav.priorityAccess': 'Priority Access',
    'hero.introText': 'The first integrated platform for structured management of the entire EPD writing process that connects companies, consultants and certification bodies, with "zero re-work" approach',
    'hero.waitingListCta': 'Yes, I want priority access',
    'hero.platformDescription': 'The dashboard that connects, simplifies and speeds up the certification process.',
    'features.title': 'Platform Features',
    'features.whyChoose': 'Why choose Sustanet',
    'features.onboarding.title': 'Guided Onboarding',
    'features.onboarding.description': 'Guided procedure for onboarding tailored to your organization\'s needs.',
    'features.ai.title': 'Artificial Intelligence',
    'features.ai.description': 'AI-based tools to automate repetitive tasks and support your decisions.',
    'features.import.title': 'Data Import',
    'features.import.description': 'Easy import of data from spreadsheets and other external sources.',
    'features.monitoring.title': 'Real-time Monitoring',
    'features.monitoring.description': 'Dashboard to monitor the progress of all your EPD projects.',
    'workflow.title': 'How It Works',
    'workflow.subtitle': 'Simplified 4-step process',
    'workflow.step1.title': 'Registration',
    'workflow.step1.description': 'Create your account and complete your organization profile.',
    'workflow.step2.title': 'Personalized Onboarding',
    'workflow.step2.description': 'To identify the type of LCA/EPD study that meets your needs.',
    'workflow.step3.title': 'Project Management',
    'workflow.step3.description': 'Create and manage your EPD projects in a single collaborative environment.',
    'workflow.step4.title': 'Monitoring and Reporting',
    'workflow.step4.description': 'Monitor progress and generate automated reports.',
    'benefits.title': 'Benefits',
    'benefits.subtitle': 'Discover the benefits of using Sustanet',
    'benefits.companies.title': 'For Companies',
    'benefits.companies.benefit1': 'Reduced EPD drafting time',
    'benefits.companies.benefit2': 'Significant cost reduction',
    'benefits.companies.benefit3': 'Collaborative environment with consultants and certification bodies',
    'benefits.consultants.title': 'For Consultants',
    'benefits.consultants.benefit1': 'Workflow optimization',
    'benefits.consultants.benefit2': 'Reduced management time',
    'benefits.consultants.benefit3': 'Expanded client portfolio',
    'benefits.certification.title': 'For Certification Bodies',
    'benefits.certification.benefit1': 'Standardized verification process',
    'benefits.certification.benefit2': 'Reduced verification time',
    'benefits.certification.benefit3': 'Increased verification quality',
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

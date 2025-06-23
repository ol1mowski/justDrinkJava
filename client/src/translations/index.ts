import type { Language } from '../hooks/useLanguage.hooks';

export interface Translations {
  navigation: {
    posts: string;
    about: string;
    quizzes: string;
    jobs: string;
    cvGuide: string;
    login: string;
  };
  search: {
    placeholder: string;
  };
  theme: {
    light: string;
    dark: string;
    system: string;
  };
}

export const translations: Record<Language, Translations> = {
  pl: {
    navigation: {
      posts: 'Posty',
      about: 'O nas',
      quizzes: 'Quizy',
      jobs: 'Oferty pracy',
      cvGuide: 'Poradnik CV',
      login: 'Zaloguj',
    },
    search: {
      placeholder: 'Szukaj w świecie Java...',
    },
    theme: {
      light: 'Jasny',
      dark: 'Ciemny',
      system: 'Systemowy',
    },
  },
  en: {
    navigation: {
      posts: 'Posts',
      about: 'About',
      quizzes: 'Quizzes',
      jobs: 'Job Offers',
      cvGuide: 'CV Guide',
      login: 'Login',
    },
    search: {
      placeholder: 'Search in Java world...',
    },
    theme: {
      light: 'Light',
      dark: 'Dark',
      system: 'System',
    },
  },
  de: {
    navigation: {
      posts: 'Beiträge',
      about: 'Über uns',
      quizzes: 'Quiz',
      jobs: 'Stellenangebote',
      cvGuide: 'CV Leitfaden',
      login: 'Anmelden',
    },
    search: {
      placeholder: 'In der Java-Welt suchen...',
    },
    theme: {
      light: 'Hell',
      dark: 'Dunkel',
      system: 'System',
    },
  },
};

export const useTranslations = (language: Language) => {
  return translations[language];
};

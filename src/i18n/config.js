import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import hi from './locales/hi.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      mr: { translation: en }, // Placeholder
      gu: { translation: en }, // Placeholder
      ta: { translation: en }, // Placeholder
      te: { translation: en }, // Placeholder
      kn: { translation: en }, // Placeholder
      ml: { translation: en }, // Placeholder
      bn: { translation: en }, // Placeholder
      pa: { translation: en }  // Placeholder
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

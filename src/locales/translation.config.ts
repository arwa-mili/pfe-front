import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, fr } from './translations';

const resources = {
  en: {
    translation: en
  },

  fr: {
    translation: fr
  }
};

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  },

  supportedLngs: ['en', 'fr'],

  resources,
  compatibilityJSON: 'v3'
});

export const tt = (key: string) => i18n.t(key);

export const changeLanguage = (language: string) =>
  i18n.changeLanguage(language);

export default i18n;

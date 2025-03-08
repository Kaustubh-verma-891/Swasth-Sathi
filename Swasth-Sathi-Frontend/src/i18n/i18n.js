import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../locales/en.json';
import hiTranslation from '../locales/hi.json';
import guTranslation from '../locales/gu.json';
import puTranslation from '../locales/pu.json';
import mrTranslation from '../locales/mr.json';
import taTranslation from '../locales/ta.json';

const resources = {
  en: { translation: enTranslation }, // English
  hi: { translation: hiTranslation }, // Hindi
  gu: { translation: guTranslation }, // Gujarati
  pu: { translation: puTranslation }, // Punjabi
  mr: { translation: mrTranslation }, // Marathi
  ta: { translation: taTranslation }, // Tamil
};

const savedLanguage = localStorage.getItem("selectedLanguage") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, // Default language
    fallbackLng: 'en', // Fallback language if a translation is not available in the selected language
    interpolation: {
      escapeValue: false, // To prevent escaping HTML characters
    },
  });

export default i18n;

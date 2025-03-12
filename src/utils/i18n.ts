// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from '../locales/en.json';
import translationAR from '../locales/ar.json';

// Get the initial language from localStorage or default to 'en'
const defaultLanguage = localStorage.getItem('zadLanguage') || 'ar';

// the translations
const resources = {
    en: {
        translation: translationEN
    },
    ar: {
        translation: translationAR
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: defaultLanguage, // default language
        fallbackLng: 'en', // fallback language

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;

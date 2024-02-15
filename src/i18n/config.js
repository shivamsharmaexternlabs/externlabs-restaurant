import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

/**
   * Handles language Translation using Json.
   * One for English Language and another for Native language. 
   * @function middleware 
   * @category i18n
   * @subcategory i18n
   */
i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translations: require('./locales/en/EnglishTranslations.json')
    },
    ar: {
      translations: require('./locales/ar-sa/ArabicTranslations.json')
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['en', 'ar'];

export default i18n;

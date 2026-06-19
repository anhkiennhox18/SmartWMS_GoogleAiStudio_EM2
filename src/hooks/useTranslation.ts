import { useTranslation as useI18nTranslation } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import viTranslation from '../locales/vi.json';
import enTranslation from '../locales/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      vi: { translation: viTranslation },
      en: { translation: enTranslation }
    },
    lng: 'vi',
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false
    }
  });

export const useTranslation = () => {
  return useI18nTranslation();
};

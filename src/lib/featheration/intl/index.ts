import i18next, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

import enUS from './locales/en-US.json';
import koKR from './locales/ko-KR.json';

export const LanguageResource: Resource = {
  'ko-KR': koKR,
  'en-US': enUS,
};

export async function initializeI18n() {
  await i18next.use(initReactI18next).init({
    resources: LanguageResource,
    debug: import.meta.env.DEV,
    fallbackLng: 'en-US',
  });
}

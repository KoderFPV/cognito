import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';
import i18next from 'i18next';

export const initZodI18n = async (locale: string): Promise<void> => {
  if (i18next.isInitialized) {
    await i18next.changeLanguage(locale);
  } else {
    await i18next.init({
      lng: locale,
      resources: {
        en: { zod: await import('zod-i18n-map/locales/en/zod.json') },
        pl: { zod: await import('zod-i18n-map/locales/pl/zod.json') },
      },
    });
  }
  z.setErrorMap(zodI18nMap);
};

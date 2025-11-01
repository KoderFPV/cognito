import { NextRequest } from 'next/server';
import { locales } from '@/i18n/config';

export const getLocaleFromRequest = (request: NextRequest): string => {
  const pathname = request.nextUrl.pathname;
  const localeFromPath = pathname.split('/')[1];

  if (locales.includes(localeFromPath as any)) {
    return localeFromPath;
  }

  return locales[0];
};

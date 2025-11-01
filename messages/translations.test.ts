import { describe, it, expect } from 'vitest';
import { locales } from '../i18n/config';
import enMessages from './en.json';
import plMessages from './pl.json';

describe('Translation Messages', () => {
  describe('Message Files', () => {
    it('should load English translations', () => {
      expect(enMessages).toBeDefined();
      expect(typeof enMessages).toBe('object');
    });

    it('should load Polish translations', () => {
      expect(plMessages).toBeDefined();
      expect(typeof plMessages).toBe('object');
    });
  });

  describe('Message Structure', () => {
    it('should have common namespace in English', () => {
      expect(enMessages.common).toBeDefined();
      expect(enMessages.common.login).toBe('Login');
      expect(enMessages.common.email).toBe('Email');
    });

    it('should have common namespace in Polish', () => {
      expect(plMessages.common).toBeDefined();
      expect(plMessages.common.login).toBe('Zaloguj się');
      expect(plMessages.common.email).toBe('Email');
    });

    it('should have home namespace in both locales', () => {
      expect(enMessages.home).toBeDefined();
      expect(plMessages.home).toBeDefined();
    });

    it('should have cms.login namespace in both locales', () => {
      expect(enMessages.cms.login).toBeDefined();
      expect(plMessages.cms.login).toBeDefined();
    });
  });

  describe('Translation Key Parity', () => {
    const getKeys = (obj: any, prefix = ''): string[] => {
      return Object.keys(obj).reduce((keys: string[], key) => {
        const path = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          return keys.concat(getKeys(obj[key], path));
        }
        return keys.concat(path);
      }, []);
    };

    it('should have same translation keys in both locales', () => {
      const enKeys = getKeys(enMessages).sort();
      const plKeys = getKeys(plMessages).sort();

      expect(enKeys).toEqual(plKeys);
    });

    it('should have no missing translations in Polish', () => {
      const enKeys = getKeys(enMessages);
      const plKeys = getKeys(plMessages);

      const missingInPolish = enKeys.filter(key => !plKeys.includes(key));
      expect(missingInPolish).toEqual([]);
    });

    it('should have no extra translations in Polish', () => {
      const enKeys = getKeys(enMessages);
      const plKeys = getKeys(plMessages);

      const extraInPolish = plKeys.filter(key => !enKeys.includes(key));
      expect(extraInPolish).toEqual([]);
    });
  });

  describe('Translation Values', () => {
    it('should have non-empty translation values in English', () => {
      expect(enMessages.common.login).toBeTruthy();
      expect(enMessages.home.title).toBeTruthy();
      expect(enMessages.cms.login.title).toBeTruthy();
    });

    it('should have non-empty translation values in Polish', () => {
      expect(plMessages.common.login).toBeTruthy();
      expect(plMessages.home.title).toBeTruthy();
      expect(plMessages.cms.login.title).toBeTruthy();
    });

    it('should have different values for different locales', () => {
      // Same semantic meaning but different language
      expect(enMessages.common.login).not.toBe(plMessages.common.login);
      expect(enMessages.home.title).not.toBe(plMessages.home.title);
    });
  });

  describe('Locale Coverage', () => {
    it('should have translations for all configured locales', () => {
      const availableTranslations = ['en', 'pl'];

      locales.forEach(locale => {
        expect(availableTranslations).toContain(locale);
      });
    });
  });
});

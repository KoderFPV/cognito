import { describe, it, expect } from 'vitest';
import { locales, defaultLocale, type Locale } from './config';

describe('i18n Configuration', () => {
  it('should have correct locales defined', () => {
    expect(locales).toEqual(['en', 'pl']);
    expect(locales).toHaveLength(2);
  });

  it('should have English as default locale', () => {
    expect(defaultLocale).toBe('en');
  });

  it('should include default locale in locales array', () => {
    expect(locales).toContain(defaultLocale);
  });

  it('should have valid Locale type', () => {
    const testLocale: Locale = 'en';
    expect(locales).toContain(testLocale);
  });

  it('should contain Polish locale', () => {
    expect(locales).toContain('pl');
  });
});

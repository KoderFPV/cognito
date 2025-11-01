import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { getLocaleFromRequest } from './locale.service';

describe('locale.service', () => {
  describe('getLocaleFromRequest', () => {
    it('should extract English locale from path', () => {
      const request = new NextRequest('http://localhost:3000/en/some/path');
      const locale = getLocaleFromRequest(request);

      expect(locale).toBe('en');
    });

    it('should extract Polish locale from path', () => {
      const request = new NextRequest('http://localhost:3000/pl/some/path');
      const locale = getLocaleFromRequest(request);

      expect(locale).toBe('pl');
    });

    it('should return default locale for invalid locale', () => {
      const request = new NextRequest('http://localhost:3000/de/some/path');
      const locale = getLocaleFromRequest(request);

      expect(locale).toBe('en');
    });

    it('should return default locale for root path', () => {
      const request = new NextRequest('http://localhost:3000/');
      const locale = getLocaleFromRequest(request);

      expect(locale).toBe('en');
    });

    it('should extract locale from nested path', () => {
      const request = new NextRequest('http://localhost:3000/pl/cms/dashboard');
      const locale = getLocaleFromRequest(request);

      expect(locale).toBe('pl');
    });
  });
});

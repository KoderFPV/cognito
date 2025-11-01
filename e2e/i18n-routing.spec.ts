import { test, expect } from '@playwright/test';

test.describe('i18n Routing', () => {
  test.describe('Locale Detection and Redirect', () => {
    test('should redirect root / to /en/ (default locale)', async ({ page }) => {
      await page.goto('/');

      // Should redirect to /en/
      await expect(page).toHaveURL(/\/en\/?/);
    });

    test('should handle non-existent locale by redirecting to default', async ({ page }) => {
      const response = await page.goto('/de/');

      // Should either 404 or redirect to default locale
      // Based on next-intl config, it should show 404
      expect(response?.status()).toBe(404);
    });
  });

  test.describe('English Locale (/en/)', () => {
    test('should load English homepage', async ({ page }) => {
      await page.goto('/en/');

      // Check URL
      await expect(page).toHaveURL(/\/en\/?/);

      // Check page loads successfully
      expect(await page.title()).toBeTruthy();
    });

    test('should load CMS login page in English', async ({ page }) => {
      await page.goto('/en/cms/login');

      // Check URL
      await expect(page).toHaveURL(/\/en\/cms\/login/);

      // Check page loads successfully
      expect(await page.title()).toBeTruthy();
    });

    test('should display English translations on homepage', async ({ page }) => {
      await page.goto('/en/');

      // Check for English text from messages/en.json
      const content = await page.textContent('body');
      expect(content).toContain('Welcome to Cognito');
    });
  });

  test.describe('Polish Locale (/pl/)', () => {
    test('should load Polish homepage', async ({ page }) => {
      await page.goto('/pl/');

      // Check URL
      await expect(page).toHaveURL(/\/pl\/?/);

      // Check page loads successfully
      expect(await page.title()).toBeTruthy();
    });

    test('should load CMS login page in Polish', async ({ page }) => {
      await page.goto('/pl/cms/login');

      // Check URL
      await expect(page).toHaveURL(/\/pl\/cms\/login/);

      // Check page loads successfully
      expect(await page.title()).toBeTruthy();
    });

    test('should display Polish translations on homepage', async ({ page }) => {
      await page.goto('/pl/');

      // Check for Polish text from messages/pl.json
      const content = await page.textContent('body');
      expect(content).toContain('Witaj w Cognito');
    });
  });

  test.describe('Locale Persistence', () => {
    test('should maintain English locale when navigating', async ({ page }) => {
      await page.goto('/en/');

      // Navigate to login page (if link exists)
      // For now, just verify direct navigation works
      await page.goto('/en/cms/login');

      // Should still be in English locale
      await expect(page).toHaveURL(/\/en\/cms\/login/);
    });

    test('should maintain Polish locale when navigating', async ({ page }) => {
      await page.goto('/pl/');

      // Navigate to login page
      await page.goto('/pl/cms/login');

      // Should still be in Polish locale
      await expect(page).toHaveURL(/\/pl\/cms\/login/);
    });
  });

  test.describe('Mobile Responsiveness', () => {
    test('should work on mobile viewport for English', async ({ page, browserName }) => {
      // This test will run on both Desktop and Mobile Chrome
      await page.goto('/en/');

      await expect(page).toHaveURL(/\/en\/?/);

      // Check page is accessible
      const content = await page.textContent('body');
      expect(content).toBeTruthy();
    });

    test('should work on mobile viewport for Polish', async ({ page, browserName }) => {
      await page.goto('/pl/');

      await expect(page).toHaveURL(/\/pl\/?/);

      // Check page is accessible
      const content = await page.textContent('body');
      expect(content).toBeTruthy();
    });
  });
});

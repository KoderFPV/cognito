# Testing Guide

This document provides comprehensive information about testing in the Cognito project.

## Testing Stack

### Unit & Integration Tests
- **Vitest** - Fast, modern test runner with native ESM support
- **React Testing Library** - Component testing utilities
- **Happy DOM** - Lightweight DOM implementation

### E2E Tests
- **Playwright** - End-to-end testing framework
- **Devices**: Desktop Chrome, Mobile Chrome (Pixel 5)

## Running Tests

### Unit Tests

```bash
# Run all unit tests once
npm test

# Run tests in watch mode (recommended during development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### E2E Tests

**Important:** E2E tests require the Next.js dev server to be running.

```bash
# Run E2E tests (starts dev server automatically)
npm run test:e2e

# Run E2E tests with UI mode (interactive)
npm run test:e2e:ui

# Run E2E tests in headed mode (see browser)
npm run test:e2e:headed
```

### All Tests

```bash
# Run both unit and E2E tests
npm run test:all
```

## File Structure

```
cognito/
├── e2e/                           # E2E tests (Playwright)
│   └── *.spec.ts
├── test/                          # Test configuration
│   └── setup.ts                   # Vitest setup file
├── **/*.test.ts                   # Unit tests (Vitest)
├── playwright.config.ts           # Playwright configuration
└── vitest.config.ts               # Vitest configuration
```

## Writing Tests

### Unit Test Example (Vitest)

```typescript
// feature.test.ts
import { describe, it, expect } from 'vitest';

describe('Feature Name', () => {
  it('should do something', () => {
    expect(true).toBe(true);
  });
});
```

### Component Test Example

```typescript
// component.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### E2E Test Example (Playwright)

```typescript
// e2e/feature.spec.ts
import { test, expect } from '@playwright/test';

test('should load page', async ({ page }) => {
  await page.goto('/en/');
  await expect(page).toHaveURL(/\/en\/?/);
});
```

## Best Practices

### Unit Tests

- Place test files next to the code they test (e.g., `config.ts` → `config.test.ts`)
- Use descriptive test names that explain what is being tested
- Follow AAA pattern: Arrange, Act, Assert
- Keep tests isolated and independent

### E2E Tests

- Place all E2E tests in the `e2e/` directory
- Test user flows, not implementation details
- Use data-testid attributes for reliable selectors
- Test on both mobile and desktop viewports

### i18n Testing

```typescript
// Test locale routing
test('should redirect to default locale', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/en\/?/);
});

// Test translations display
test('should display correct translation', async ({ page }) => {
  await page.goto('/en/');
  const content = await page.textContent('body');
  expect(content).toContain('expected text');
});

// Test translation key parity
it('should have same translation keys in both locales', () => {
  const enKeys = Object.keys(enMessages);
  const plKeys = Object.keys(plMessages);
  expect(enKeys).toEqual(plKeys);
});
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm test -- --run

      - name: Run E2E tests
        run: npm run test:e2e
```

## Troubleshooting

### Vitest Issues

**Tests fail with "Cannot find module"**
```bash
rm -rf node_modules .next
npm install
```

**Update snapshots**
```bash
npm test -- -u
```

### Playwright Issues

**Tests timeout**
```bash
# Increase timeout
npm run test:e2e -- --timeout 60000
```

**Browser installation fails**
```bash
npx playwright install chromium
```

**View test report**
```bash
npx playwright show-report
```

## Configuration

### Vitest Configuration (`vitest.config.ts`)

- **Environment**: `happy-dom` (lightweight DOM)
- **Setup file**: `test/setup.ts`
- **Coverage**: Configured with v8 provider
- **Excludes**: `node_modules`, `.next`, `e2e/`, `template/`

### Playwright Configuration (`playwright.config.ts`)

- **Test directory**: `e2e/`
- **Base URL**: `http://localhost:3000`
- **Browsers**: Desktop Chrome, Mobile Chrome (Pixel 5)
- **Auto-start**: Dev server starts automatically
- **Reporters**: HTML report

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [React Testing Library](https://testing-library.com/react)
- [next-intl Testing](https://next-intl-docs.vercel.app/docs/workflows/testing)

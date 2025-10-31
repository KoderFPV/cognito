# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language Policy

**IMPORTANT**: Use English for all code, comments, documentation, commit messages, variable names, function names, and any technical communication. This is a strict requirement for the entire codebase.

## Code Conventions

### Exports

- **Prefer named exports**: Use `export const ComponentName` instead of `export default` when possible
- Exception: Next.js requires `export default` for pages, layouts, and route handlers
- Named exports improve code discoverability and refactoring capabilities

## Project Overview

Cognito is a modern e-commerce platform, similar to Magento or WooCommerce, designed with cutting-edge technology and AI-powered features.

### Architecture Components

1. **API Backend**
   - Built with LangGraph for AI-powered workflows
   - MongoDB for application data storage
   - Weaviate for vector embeddings and semantic search
   - RESTful API endpoints

2. **AI Chat Interface**
   - Conversational product search
   - Natural language product discovery
   - Direct purchase capability through chat
   - Mobile-first responsive design with desktop support

3. **CMS (Content Management System)**
   - Store configuration interface
   - Product management
   - Order and inventory management
   - Settings and customization
   - Mobile-first responsive design with desktop support

### Technology Stack

- **Frontend**: Next.js with TypeScript
- **Backend**: LangGraph + MongoDB
- **AI/ML**: LangGraph for conversational commerce
- **Database**:
  - MongoDB - Primary database for application data
  - Weaviate - Vector database for AI-powered search and recommendations

## Code Organization

### Shared Components

- **Forms**: Shared form logic and reusable form components are located in `components/forms`

### Internationalization (i18n)

The application uses **next-intl** for internationalization:

- **Supported locales**: English (en), Polish (pl)
- **Default locale**: English (en)
- **Translation files**: Located in `messages/` directory (e.g., `messages/en.json`, `messages/pl.json`)
- **URL structure**: All routes are prefixed with locale (e.g., `/en/cms/login`, `/pl/cms/login`)
- **Configuration**:
  - `i18n/config.ts` - Locale configuration
  - `i18n/request.ts` - Server-side translation setup
  - `middleware.ts` - Locale detection and routing

**Usage in components:**
```tsx
// Server components
import { useTranslations } from 'next-intl';

const t = useTranslations('namespace');
t('key'); // Returns translated string

// Client components
'use client';
import { useTranslations } from 'next-intl';
// Same usage as server components
```

### Template System

The application uses a **template system** that separates business logic from presentation layer, enabling complete UI customization without modifying core functionality.

#### Architecture Pattern: Container/Presentational

**Business Logic Components** (`components/`, `app/`, `services/`):
- Component state (useState, useReducer)
- Side effects (useEffect, API calls)
- Event handlers and business logic
- Data fetching and mutations
- Routing and navigation

**Template Components** (`template/`):
- Pure presentational components
- HTML structure (JSX)
- CSS styles (SCSS modules)
- Visual design and layout
- Receive all data via props

#### Directory Structure

```
template/
├── components/              # Presentational components
│   └── LoginForm/
│       ├── LoginFormTemplate.tsx         # Pure JSX + props
│       └── LoginFormTemplate.module.scss # Component styles
├── styles/                  # Global styles and design system
│   ├── globals.scss         # Global CSS reset and base styles
│   ├── variables.scss       # Design tokens (colors, fonts, spacing)
│   └── mixins.scss          # Reusable SCSS utilities
└── README.md               # Template customization guide
```

#### Usage Pattern

**Logic Component** (business logic):
```tsx
// components/login/loginForm/LoginForm.tsx
'use client';

import { useState } from 'react';
import { LoginFormTemplate } from '@/template/components/LoginForm/LoginFormTemplate';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    // Business logic here
  };

  return (
    <LoginFormTemplate
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
    />
  );
};
```

**Template Component** (presentation):
```tsx
// template/components/LoginForm/LoginFormTemplate.tsx
import styles from './LoginFormTemplate.module.scss';

export interface LoginFormTemplateProps {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LoginFormTemplate = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormTemplateProps) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
      />
      {/* Pure presentation - no business logic */}
    </form>
  );
};
```

#### Design System

**Design Tokens** (`template/styles/variables.scss`):
- Colors: `$primary-color`, `$secondary-color`, `$background-color`, etc.
- Typography: `$font-family-base`, `$font-size-base`, `$font-size-h1`, etc.
- Spacing: `$spacing-xs` to `$spacing-2xl`
- Border radius: `$border-radius-sm` to `$border-radius-xl`
- Breakpoints: `$breakpoint-mobile`, `$breakpoint-tablet`, `$breakpoint-desktop`

**SCSS Mixins** (`template/styles/mixins.scss`):
```scss
@include flex-center;        // Flexbox centered layout
@include card;               // Card styling with shadow
@include button-primary;     // Primary button styles
@include input-base;         // Input field styles

// Responsive utilities
@include mobile { /* ... */ }
@include tablet-up { /* ... */ }
@include desktop { /* ... */ }
```

#### Best Practices

**✅ DO:**
- Keep template components pure (no state, no side effects)
- Use design tokens from `variables.scss`
- Maintain TypeScript prop interfaces
- Import templates from `@/template/components/`
- Document template customization in `template/README.md`

**❌ DON'T:**
- Add business logic to template components
- Make API calls from templates
- Use React hooks (useState, useEffect) in templates
- Change prop interfaces without updating logic components
- Import from `components/`, `services/`, or `app/` in templates

#### Customization

Users can completely customize the application's appearance by:
1. Replacing the entire `template/` directory
2. Keeping the same file names and TypeScript interfaces
3. Modifying HTML structure and styles as needed

See `template/README.md` for detailed customization guide.

## Project Status

This project is in the initial setup phase. The Next.js frontend structure has been initialized.

## Development Commands

### Docker (Recommended)
```bash
# Start all services (app + MongoDB)
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down

# Rebuild after changes
docker-compose up -d --build
```

### Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Next Steps for Development

When setting up this project, ensure to:
- Set up MongoDB connection
- Implement LangGraph backend API
- Build the chat interface
- Create the CMS admin panel
- Add authentication and authorization
- Implement product management
- Add payment gateway integration

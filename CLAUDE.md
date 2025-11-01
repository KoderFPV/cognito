# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language Policy

**IMPORTANT**: Use English for all code, comments, documentation, commit messages, variable names, function names, and any technical communication. This is a strict requirement for the entire codebase.

## Code Conventions

### Programming Paradigm

- **Functional Programming**: Use functional programming patterns exclusively
- **Never use classes**: All code must use functions, pure functions, and functional composition
- **No OOP**: Avoid object-oriented programming patterns (classes, inheritance, this keyword)
- Use functional patterns: pure functions, immutability, composition, higher-order functions
- **YAGNI (You Aren't Gonna Need It)**: Only implement functionality that is currently needed. Do not create functions, features, or abstractions for future use. If a function is not used in the current implementation, do not write it.
- **No default parameters**: Never use default values in function arguments. All parameters must be explicitly provided by the caller. This makes function calls explicit and prevents hidden behavior.

### Documentation

- **No comments**: Do not add comments or inline documentation
- **No JSDoc**: Do not use JSDoc annotations
- Code should be self-documenting through clear naming and structure

### Exports

- **Prefer named exports**: Use `export const ComponentName` instead of `export default` when possible
- Exception: Next.js requires `export default` for pages, layouts, and route handlers
- Named exports improve code discoverability and refactoring capabilities

### Naming Conventions

- **Interfaces**: All TypeScript interfaces must start with capital "I" (e.g., `IUser`, `IProduct`, `IOrder`)
- This convention clearly distinguishes interfaces from types, classes, and other constructs

## Documentation

Comprehensive documentation is available in the `docs/` directory:
- **AUTHENTICATION.md** - Complete authentication and authorization guide
- **TEST_GUIDE.md** - Testing guidelines and best practices

## Project Overview

Cognito is a modern **agentic e-commerce platform**, similar to Magento or WooCommerce, designed with cutting-edge technology and AI-powered autonomous agents. Unlike traditional e-commerce systems, Cognito leverages AI agents to autonomously handle complex workflows, customer interactions, and business processes.

### Architecture Components

1. **API Backend (Agentic)**
   - Built with LangGraph - framework for building stateful, multi-agent AI applications
   - Autonomous AI agents handle complex e-commerce workflows
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
- **Validation**: Zod with zod-i18n-map for runtime type validation and internationalized error messages
- **Authentication**: Auth.js (NextAuth v5) with JWT sessions and role-based access control

## Code Organization

### Domain Layer

The `domain/` directory contains domain models and interfaces that define the core business entities and their contracts:

- **Domain Interfaces**: TypeScript interfaces and types representing business entities (e.g., `domain/user.ts`)
- **Pure Types**: Domain models are pure TypeScript types with no implementation logic
- **Business Contracts**: Define the shape of data used throughout the application
- **Technology Agnostic**: Domain layer is independent of frameworks, databases, and external services

**Directory Structure:**
```
domain/
├── user.ts           # User-related interfaces and types
├── product.ts        # Product domain models (future)
├── order.ts          # Order domain models (future)
└── ...               # Other domain entities
```

**Principles:**
- Domain types represent business concepts, not database schemas
- Keep domain models simple and focused on data structure
- Use functional programming patterns (no classes)
- Domain layer should have no external dependencies

### Repository Layer

The `repositories/` directory contains all database access logic and external data source operations:

- **Database Operations**: All MongoDB and Weaviate operations must be implemented in repositories
- **Functional Pattern**: Use pure functions for all repository operations
- **Single Responsibility**: Each repository handles operations for one domain entity
- **Technology Abstraction**: Services and components should never directly access databases

**Directory Structure:**
```
repositories/
├── users/
│   ├── usersRepository.ts       # User database operations
│   └── usersRepository.test.ts  # Repository tests
├── products/
│   └── productsRepository.ts    # Product database operations
└── ...                          # Other entity repositories
```

**Example:**
```typescript
// repositories/users/usersRepository.ts
import { Db } from 'mongodb';
import { IUser } from '@/domain/user';

export const findUserByEmail = async (
  db: Db,
  email: string
): Promise<IUser | null> => {
  const collection = db.collection<IUser>('users');
  return collection.findOne({ email, deleted: false });
};

export const createUser = async (
  db: Db,
  userData: Omit<IUser, '_id'>
): Promise<IUser> => {
  const collection = db.collection<IUser>('users');
  const result = await collection.insertOne(userData as any);
  return { ...userData, _id: result.insertedId.toString() };
};
```

**Principles:**
- All MongoDB operations go through repositories
- All Weaviate operations go through repositories
- Repositories return domain types (interfaces from `domain/`)
- Services use repositories, never direct database access
- Use functional programming patterns (no classes)
- Each function should be pure and testable

### Validation with Zod

The application uses **Zod** for runtime type validation and schema validation:

- **Schema Definition**: Define validation schemas using Zod in service layers
- **Internationalization**: Use `zod-i18n-map` for translated validation error messages
- **Supported Languages**: English (en), Polish (pl)
- **Type Safety**: Zod schemas provide both runtime validation and TypeScript type inference

**Usage Pattern:**
```typescript
// services/registration/registration.service.ts
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';

export const registrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

export const validateRegistrationData = (
  data: unknown,
  locale: string
): RegistrationInput => {
  // Configure zod i18n for the locale
  z.setErrorMap(zodI18nMap);
  return registrationSchema.parse(data);
};
```

**Principles:**
- All external input (API requests, form submissions) must be validated with Zod
- Define schemas close to where they're used (in service files)
- Use `z.infer<typeof schema>` to derive TypeScript types from schemas
- Always pass locale explicitly to validation functions (no default parameters)
- Validation errors are automatically translated based on locale

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

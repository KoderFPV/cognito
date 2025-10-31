# Cognito

Modern AI-powered e-commerce platform, similar to Magento or WooCommerce.

**Open Source Software** - Licensed under the Functional Source License (FSL). Free to use and modify, with restrictions on competitive SaaS offerings.

## Project Overview

Cognito is an innovative e-commerce platform leveraging artificial intelligence to enhance the shopping experience.

### Main Components

1. **API Backend**
   - Uses LangGraph for AI workflow management
   - MongoDB for application data storage
   - Weaviate for vector embeddings and semantic search
   - Complex e-commerce operations handling

2. **AI Chat**
   - Natural language product search
   - Intelligent recommendations
   - Direct purchase capability through chat
   - Mobile-first responsive design with desktop support

3. **CMS**
   - Admin panel for store configuration
   - Product management
   - Order and inventory management
   - Personalization and settings
   - Mobile-first responsive design with desktop support

### Technologies

- **Frontend**: Next.js + TypeScript
- **Backend**: LangGraph + MongoDB
- **AI**: LangGraph for conversational commerce
- **Database**:
  - MongoDB - Primary database for application data
  - Weaviate - Vector database for AI-powered search and recommendations
- **i18n**: next-intl (English and Polish support)

## Status

Project in initialization phase.

## Progress

| Feature | Status |
|---------|--------|
| Login | ❌ |
| Product Search | ❌ |
| Checkout | ❌ |
| Payments | ❌ |
| Add New Products | ❌ |
| Store Configuration | ❌ |
| Browse Orders | ❌ |
| Browse Users | ❌ |
| Other | ❌ |

## Running the Project

### Docker (Recommended)

Run the entire application with MongoDB using Docker Compose:

```bash
# Build and start containers
docker-compose up -d

# Check logs
docker-compose logs -f app

# Stop containers
docker-compose down
```

Available services:
- **Application**: http://localhost:3000
- **MongoDB**: localhost:27017

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build production version
npm run build
npm start
```

## Configuration

Copy `.env.example` to `.env` and adjust environment variables:

```bash
cp .env.example .env
```
# cognito

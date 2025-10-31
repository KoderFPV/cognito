# Cognito

Modern AI-powered e-commerce platform, similar to Magento or WooCommerce.

## Project Overview

Cognito is an innovative e-commerce platform leveraging artificial intelligence to enhance the shopping experience.

### Main Components

1. **API Backend**
   - Uses LangGraph for AI workflow management
   - MongoDB as the database
   - Complex e-commerce operations handling

2. **AI Chat**
   - Natural language product search
   - Intelligent recommendations
   - Direct purchase capability through chat

3. **CMS**
   - Admin panel for store configuration
   - Product management
   - Order and inventory management
   - Personalization and settings

### Technologies

- **Frontend**: Next.js + TypeScript
- **Backend**: LangGraph + MongoDB
- **AI**: LangGraph for conversational commerce
- **Database**: MongoDB

## Status

Project in initialization phase.

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

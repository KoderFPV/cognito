# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language Policy

**IMPORTANT**: Use English for all code, comments, documentation, commit messages, variable names, function names, and any technical communication. This is a strict requirement for the entire codebase.

## Project Overview

Cognito is a modern e-commerce platform, similar to Magento or WooCommerce, designed with cutting-edge technology and AI-powered features.

### Architecture Components

1. **API Backend**
   - Built with LangGraph for AI-powered workflows
   - MongoDB as the database layer
   - RESTful API endpoints

2. **AI Chat Interface**
   - Conversational product search
   - Natural language product discovery
   - Direct purchase capability through chat

3. **CMS (Content Management System)**
   - Store configuration interface
   - Product management
   - Order and inventory management
   - Settings and customization

### Technology Stack

- **Frontend**: Next.js with TypeScript
- **Backend**: LangGraph + MongoDB
- **AI/ML**: LangGraph for conversational commerce
- **Database**: MongoDB

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

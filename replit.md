# Overview

This is a full-stack e-commerce pet shop application built with React, TypeScript, Express.js, and PostgreSQL. The application provides a comprehensive online store for pet products, featuring product browsing, cart management, order processing, and admin controls. It includes authentication through Replit's OpenID Connect system and uses modern web technologies for a responsive user experience.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Radix UI primitives with shadcn/ui component system
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite for development and production builds

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **API Design**: RESTful API endpoints with proper error handling
- **Session Management**: Express sessions with PostgreSQL storage
- **File Structure**: Monorepo structure with shared schema definitions

## Authentication & Authorization
- **Provider**: Replit OpenID Connect (OIDC) authentication
- **Session Storage**: PostgreSQL-backed session store using connect-pg-simple
- **Role-Based Access**: Admin users have elevated permissions for product and category management
- **Security**: HTTP-only cookies with secure flags for production

## Database Design
- **Database**: PostgreSQL with Neon serverless hosting
- **Schema Management**: Drizzle migrations with shared schema definitions
- **Key Tables**: 
  - Users (authentication and profile data)
  - Products and Categories (inventory management)
  - Cart Items and Orders (e-commerce functionality)
  - Sessions (authentication state)
  - Wishlist (user favorites)

## Data Layer
- **ORM**: Drizzle ORM with full TypeScript support
- **Validation**: Zod schemas for runtime type checking
- **Storage Interface**: Abstracted storage layer for database operations
- **Connection**: Neon serverless PostgreSQL with WebSocket support

## Component Architecture
- **Design System**: shadcn/ui components built on Radix UI primitives
- **Layout Components**: Responsive navbar, footer, and page layouts
- **Product Components**: Reusable product cards, cart items, and forms
- **Form Handling**: React Hook Form with Zod validation
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Database Connection**: @neondatabase/serverless for optimized connections

## Authentication Services
- **Replit Auth**: OpenID Connect integration for user authentication
- **Passport.js**: Authentication middleware with OpenID strategy
- **Session Management**: connect-pg-simple for PostgreSQL session storage

## UI and Styling
- **Radix UI**: Accessible component primitives for complex UI elements
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography
- **PostCSS**: CSS processing with Autoprefixer

## Development Tools
- **TypeScript**: Static type checking across frontend and backend
- **Vite**: Fast development server and build tool with HMR
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Development environment plugins and error overlays

## Runtime Dependencies
- **Express.js**: Web server framework with middleware support
- **TanStack Query**: Data fetching and caching for React
- **React Hook Form**: Form state management with validation
- **Date-fns**: Date manipulation and formatting utilities
- **Zod**: Runtime type validation and schema definition
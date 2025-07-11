# BMI Calculator Application

## Overview

This is a full-stack BMI (Body Mass Index) calculator application built with React, TypeScript, Express, and PostgreSQL. The application allows users to calculate their BMI based on height, weight, and age inputs with support for different units (metric and imperial). The frontend uses modern React patterns with form validation, while the backend provides a RESTful API structure ready for BMI calculation endpoints.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Hook Form for form state, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with CSS variables for theming support

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL-backed sessions with connect-pg-simple
- **Build System**: ESBuild for server bundling

### Development Setup
- **Development Server**: TSX for TypeScript execution
- **Hot Reload**: Vite HMR for frontend, nodemon-like restart for backend
- **Environment**: Replit-optimized with development banner and error overlay

## Key Components

### Database Schema
The application uses Drizzle ORM with PostgreSQL and defines two main tables:
- **Users**: Basic user authentication with username/password
- **BMI Records**: Stores BMI calculations with age, height, weight, units, calculated BMI, and category

### Frontend Components
- **BMI Calculator**: Main form component with validation using react-hook-form and zod
- **UI Components**: Comprehensive shadcn/ui component library including forms, cards, buttons, inputs, and alerts
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Backend Structure
- **Storage Layer**: Abstracted storage interface with in-memory implementation (ready for database integration)
- **API Routes**: RESTful endpoint structure with /api prefix
- **Error Handling**: Centralized error handling middleware
- **Request Logging**: Detailed API request logging with response capture

## Data Flow

1. **User Input**: User enters age, height, weight, and selects units through the form
2. **Form Validation**: Client-side validation using Zod schemas ensures data integrity
3. **BMI Calculation**: Frontend calculates BMI using standard formula (weight in kg / height in m²)
4. **Unit Conversion**: Automatic conversion between metric and imperial units
5. **Category Classification**: BMI result is categorized (underweight, normal, overweight, obese)
6. **Display Results**: Results shown with appropriate styling and health information

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **UI/UX**: Radix UI primitives, Tailwind CSS, Lucide icons
- **Form Management**: React Hook Form with Zod validation
- **HTTP Client**: TanStack Query for server state management
- **Utility Libraries**: class-variance-authority, clsx, date-fns

### Backend Dependencies
- **Express.js**: Web framework with TypeScript support
- **Database**: Drizzle ORM, Neon Database serverless driver
- **Session Management**: express-session with PostgreSQL store
- **Development**: TSX for TypeScript execution, ESBuild for bundling

### Development Tools
- **Build Tools**: Vite, ESBuild, TypeScript compiler
- **Database Tools**: Drizzle Kit for migrations and schema management
- **Replit Integration**: Cartographer plugin and runtime error overlay

## Deployment Strategy

### Development Mode
- **Frontend**: Vite dev server with HMR on client directory
- **Backend**: TSX execution of TypeScript files with auto-restart
- **Database**: Drizzle push for schema synchronization
- **Environment**: Replit-optimized with development banners and error overlays

### Production Build
- **Frontend**: Vite build to dist/public with asset optimization
- **Backend**: ESBuild bundle to dist/index.js with external dependencies
- **Database**: Environment-based DATABASE_URL configuration
- **Deployment**: Single Node.js process serving both API and static files

### Environment Configuration
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **Session**: Secure session management with PostgreSQL backing
- **Static Assets**: Express static file serving for production builds
- **API Routes**: Prefixed with /api for clear separation from frontend routes

The application follows a modern full-stack architecture with clear separation of concerns, type safety throughout, and production-ready deployment configuration. The storage layer is abstracted to easily switch from in-memory to database persistence, and the frontend provides a complete BMI calculation experience with proper form validation and responsive design.
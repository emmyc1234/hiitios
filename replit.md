# Fitness Workout Generator Application

## Overview

This is a full-stack fitness workout generator application built with React, Express, and TypeScript. The app allows users to configure personalized workout routines based on their preferences (duration, target area, fitness goal) and provides an interactive workout session experience with timers, rest periods, and progress tracking.

## User Preferences

Preferred communication style: Simple, everyday language.
Exercise visuals: User prefers simple icons and clean design over complex animations. Successfully integrated all 15 real exercise demonstration images from MuscleWiki screenshots with proper form guidance. Added Vertical Leg Crunch exercise with demonstration image (August 1, 2025). Completed image integration for all exercises in the database. Added more exercises with existing images to full-body workouts for better variety (August 1, 2025).

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on top of Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: React Query (@tanstack/react-query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API with JSON responses
- **Development**: Hot reloading with Vite middleware integration

### Project Structure
- **Monorepo Setup**: Single repository with client, server, and shared code
- **Client Code**: Located in `/client` directory with React application
- **Server Code**: Located in `/server` directory with Express API
- **Shared Code**: Located in `/shared` directory for common types and schemas

## Key Components

### Database Schema (Drizzle ORM)
- **Users Table**: User authentication and progress tracking
- **Exercises Table**: Exercise database with target areas, difficulty, and instructions
- **Workouts Table**: Generated workout configurations and favorites
- **Workout Sessions Table**: Completed workout tracking and statistics

### Frontend Components
- **Workout Setup**: Configuration interface for workout parameters including customizable exercise duration (45s, 60s, 75s)
- **Workout Screen**: Active workout interface with exercise instructions, timer, home button, and voice announcements for exercise names and countdown
- **Rest Screen**: Rest period interface with countdown timer, home button, and voice announcements for rest periods and upcoming exercises
- **Workout Complete**: Post-workout summary and save functionality
- **Speech System**: Text-to-speech integration for exercise names, countdowns, and workout transitions using Web Speech API

### Backend Services
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development
- **Exercise Management**: CRUD operations for exercise database
- **Workout Generation**: Algorithm for creating personalized workout routines with smart exercise repetition control (max 2x per exercise, 3+ exercise gap between repeats) and automatic bilateral exercise pairing for Single Leg Glute Bridges
- **Session Tracking**: Recording completed workouts and user progress

## Data Flow

1. **Workout Configuration**: User selects duration, target area, fitness goal, and exercise duration (45s/60s/75s)
2. **Workout Generation**: Server generates personalized workout based on available exercises and custom timing
3. **Workout Execution**: Client manages workout flow with customizable exercise timers and progress tracking
4. **Session Recording**: Completed workouts are saved to database with statistics
5. **Progress Tracking**: User progress is updated with workout completion data

### API Endpoints
- `GET /api/exercises` - Retrieve all exercises
- `GET /api/exercises/:targetArea` - Get exercises by target area
- `POST /api/generate-workout` - Generate personalized workout
- `POST /api/workouts` - Save workout to favorites
- `POST /api/workout-sessions` - Record completed workout session

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Minimalist routing library

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite development server with Express API integration
- **Hot Reloading**: Full-stack hot reloading for rapid development
- **Database**: Neon serverless PostgreSQL for development and production

### Production Build
- **Frontend**: Vite builds React app to static files
- **Backend**: ESBuild bundles Express server for Node.js execution
- **Database**: Production PostgreSQL database via Neon
- **Environment Variables**: DATABASE_URL for database connection

### Mobile App Deployment (Added August 1, 2025)
- **Expo Integration**: Native iOS and Android apps configured using Expo EAS
- **Project ID**: `04cb6672-3826-49e1-bbc2-d61897a118b6` linked to user's Expo account
- **Cloud Builds**: EAS Build handles iOS/Android compilation without requiring Mac/Xcode
- **Auto-Submission**: Configured for direct submission to App Store and Google Play Store
- **App Configuration**: Bundle ID `com.hiitworkout.app`, app name "HIIT Workout"
- **Build Command**: `npx eas-cli@latest build --platform all --auto-submit`

### Key Configuration Files
- **drizzle.config.ts**: Database migration and schema configuration
- **vite.config.ts**: Frontend build and development server setup
- **package.json**: Scripts for development, build, and production
- **tsconfig.json**: TypeScript configuration for the entire monorepo

The application follows a modern full-stack TypeScript architecture with emphasis on type safety, developer experience, and maintainable code structure. The workout generation algorithm considers user preferences and available exercises to create personalized fitness routines with appropriate work/rest intervals based on fitness goals.
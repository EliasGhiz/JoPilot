# JoPilot Frontend

## Overview

This project is built using Vite, React, and React Router v7 along with Material UI for styling.

## Application Structure

### Source Code Organization

```
frontend/
├── app/                     # Main application code
│   ├── components/          # Reusable UI components
│   │   ├── Sidebar.tsx      # Application sidebar navigation
│   │   └── TopBar.tsx       # Top application bar
│   │
│   ├── constants/           # Application-wide constants
│   │   └── layout.ts        # Layout dimensions and settings
│   │
│   ├── dashboard/           # Dashboard feature
│   │   ├── Dashboard.tsx    # Dashboard page component
│   │   ├── DashboardLayout.tsx  # Layout wrapper for the app
│   │   ├── Settings.tsx     # Settings page
│   │   └── Test.tsx         # Test API connection page
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useSidebarState.ts  # Manages sidebar open/closed state
│   │   └── useThemeState.ts # Manages theme and color mode
│   │
│   ├── root.tsx             # Root component that renders routes
│   └── routes.tsx           # Application route definitions
│
├── src/                     # Supporting source code
│   ├── index.tsx            # Application entry point
│   └── version.ts           # App version information
│
└── public/                  # Static assets
    ├── favicon.svg          # App favicon
    └── index.html           # HTML template
```

### Key Architectural Components

#### Component Organization

1. **Layout Components**:
   - `DashboardLayout.tsx`: Main layout wrapper that includes the sidebar, topbar, and content area
   - Handles theme switching, sidebar state, and navigation

2. **State Management**:
   - Custom hooks in the `hooks/` directory manage application state
   - `useThemeState.ts`: Manages theme settings (dark/light mode, color variants)
   - `useSidebarState.ts`: Manages sidebar collapsed/expanded state

3. **Theme Configuration**:
   - Theme settings are centralized in `src/themeConfig.ts`
   - Provides consistent styling across the application
   - Supports multiple theme variants (default, red planet, blue space)

4. **Routing**:
   - React Router v7 manages navigation
   - Routes defined in `app/routes.tsx`
   - Nested routing with shared layout components

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Access the frontend through `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

### Issues

Sometimes Material Icons don't install correctly.
Run the following command to manually install them.
```sh
npm install @mui/icons-material
```
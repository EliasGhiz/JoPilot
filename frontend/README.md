# JoPilot Frontend

## Overview

This project is built using Vite, React, and React Router v7 along with Material UI for styling. This README focuses on the key files that define the structure and routing for the frontend application.

## Frontend File Structure

### public/index.html

This is the HTML template for the application.  
- It contains the root div where the React application is mounted.
- It also links to the favicon and sets up meta tags required for responsive design.

### src/index.tsx

This is the entry point for the React application.  
- It initializes the application by creating the React root and wrapping the app in a `<BrowserRouter>` for routing support.
- It imports the main application component from `app/root.tsx`.

### app/root.tsx

The main application component responsible for rendering the routes.  
- It uses React Router's `useRoutes` hook to load the UI based on the route configuration.
- This file is the central container for the dashboard layout and other pages.

### app/routes.tsx

This file defines the route configuration for the application.  
- It sets up a parent route that uses the DashboardLayout for consistent UI elements: a sidebar and a top navigation bar.
- Nested inside are child routes (e.g., Dashboard, Settings, Test) that match specific paths.
- A redirect is provided to route the base URL to the Dashboard.

### app/dashboard Folder

Contains components specific to the dashboard functionality:
- **DashboardLayout.tsx**: Defines the overall layout including the top AppBar, sidebar navigation, and an `<Outlet />` for nested routes.
- **Dashboard.tsx**: Displays the core dashboard content.
- **Settings.tsx**: Contains settings-related content.
- **Test.tsx**: Manages the Test view content.

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

Access frontend through `http://localhost:5173`.

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
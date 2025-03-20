# JoPilot Frontend

## Stack
Vite, React, React Router v7, MUI, TypeScript & JavaScript.

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

# Frontend File Structure

This section explains the purpose of each .tsx file in the `app` folder:

- **app/root.tsx**  
  This is the main entry point for your React application’s routes. It sets up the top-level router using `<Routes>` and `<Route>`, and defines the primary layout and top-level routes (e.g., Dashboard, Settings, Login, and a catch-all 404 route).

- **app/routes/home.tsx**  
  This file defines the home route meta information and logic. It exports route metadata (such as the page title) and a component that redirects users to the Dashboard (using `<Navigate>`). It serves as the default landing page route when accessed.

- **app/dashboard/Dashboard.tsx**  
  This is the core content component for the Dashboard page. It contains the main dashboard content including welcome text and other dashboard-specific information.

- **app/dashboard/DashboardLayout.tsx**  
  This component defines the overall layout for the dashboard pages. It renders the fixed top AppBar, a collapsible sidebar (which includes navigation items for Dashboard and Settings), and an `<Outlet />` to display the nested child routes. This layout ensures consistent placement of navigation and content across dashboard views.

- **app/redirect/RedirectToDashboard.tsx**  
  This file contains a redirect component that triggers a client-side redirect to `/dashboard` when rendered. It is used to automatically navigate users to the Dashboard when they access a root or other default route.
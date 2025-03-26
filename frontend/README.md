# JoPilot Frontend

## Folder Structure

```
frontend/
├── app/                  
│   ├── components/   # Reusable UI components (TopBar, Sidebar, etc.)
│   │   ├── App.tsx     # Main application component
│   │   ├── Sidebar/    # Sidebar navigation components
│   │   └── TopBar/     # Top navigation bar components
│   ├── hooks/        # Custom hooks (e.g. useThemeState, useSidebarState)
│   ├── layout/       # Layout components (e.g. DashboardLayout)
│   ├── pages/        # Page components corresponding to routes
│   ├── theme/        # Theme configuration, color system, and UI constants
│   ├── routes.tsx    # Defines application routes and navigation structure
│   ├── utils/        # Utility functions (e.g. colorUtils)
│   └── index.tsx     # Application entry point that renders App component
├── public/          # Static assets (index.html, favicon, etc.)
```

## Getting Started

### Installation

For development:

```bash
# Standard full installation
npm install
```

For CI/CD environments:

```bash
# Clean install from package-lock.json
npm ci
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

Start the production server:

```bash
npm start
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
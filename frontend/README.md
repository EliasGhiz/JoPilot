# JoPilot Frontend

JoPilot Frontend is a modern web application built with [React](https://reactjs.org/), styled using [MUI (Material UI)](https://mui.com/), and routed via [React Router v7](https://reactrouter.com/). The project is developed with Vite, providing fast build and hot-reload during development.

## Technology Stack

- **React**: For building user interfaces.
- **MUI (Material UI)**: Provides UI components following the Material Design guidelines.
- **React Router v7**: For managing routing and page navigation.
- **Vite**: Development server and build tool.
- **Axios**: For HTTP requests in the API layer.
- **TypeScript**: Ensures type safety throughout the project.

## Folder Structure

The project is organized to separate concerns and promote modularity. Below is an explanation of the folder structure from top to bottom:

```
frontend/
├── app/
│   ├── api/            # Contains API service modules (e.g., api-service.ts) for handling HTTP calls.
│   ├── components/     # Reusable UI components.
│   │   ├── IconButton/ # Centralized icon button component with interactive feedback.
│   │   ├── Sidebar/    # Components for rendering the side navigation including SidebarItem, NavItems, and styling.
│   │   └── TopBar/     # Components for the top navigation bar (TopBar, ThemeToggle, MenuToggleButton).
│   ├── hooks/          # Custom hooks (e.g., useThemeState, useSidebarState) providing state management and persistence.
│   ├── layout/         # Layout components such as DashboardLayout which defines the overall page structure.
│   ├── pages/          # Route-specific page components (e.g., Dashboard.tsx, Settings.tsx, Landing.tsx, RequireAuth.tsx).
│   ├── theme/          # Theme configuration including color utilities, palettes, and theme creation (themeConfig.ts, themeColors.ts, etc.).
│   └── utils/          # Utility modules (e.g., colorUtils.ts) for common helper functions.
├── public/             # Static assets like HTML template, favicon, images, etc.
├── index.html          # Main HTML file which includes the root div for the React application.
├── routes.tsx          # Defines the routing configuration and route entries for React Router.
├── App.tsx             # The main App component that sets up the route-based navigation.
├── MainContent.tsx     # Component providing the primary content area with responsive margins based on sidebar state.
└── AuthProviderWrapper.tsx  # Conditionally wraps the application with Auth0Provider for authentication.
```

### Additional File Explanations

- **App.tsx**: Renders the application using React Router’s route configuration. It decides which page to display based on the current URL.
- **MainContent.tsx**: Provides a container for page content. It automatically adjusts layout based on sidebar width and app bar height.
- **RequireAuth.tsx**: A higher-order component that protects routes by ensuring the user is authenticated. If not, it triggers a redirect.
- **AuthProviderWrapper.tsx**: Wraps the application with Auth0Provider (or bypasses it based on environment settings) to handle user authentication.
- **index.tsx**: Entry point of the application. It initializes the React app, sets up routing with BrowserRouter, and conditionally applies the Auth0Provider.
- **routes.tsx**: Contains routing definitions including protected and public routes, mapping URLs to their respective page components.

## Development Environment Setup

1. **Install Dependencies**

   Navigate to the frontend folder and run:

   ````bash
   npm install
   ````

2. **Create a .env File**

   For development, create a `.env` file in the `frontend` folder with at least the following content:

   ````properties
   VITE_DISABLE_AUTH0=true
   ````

   This setting disables authentication during local development.

3. **Environment Variables for Production**

   In production, you should define the following environment variables:
   - `VITE_AUTH0_DOMAIN`: The Auth0 domain for your application.
   - `VITE_AUTH0_CLIENT_ID`: The Auth0 client ID.

   Configure these variables in your hosting provider’s environment settings or within a production `.env` file (do not commit sensitive data).

4. **Run the Development Server**

   Start the dev server for hot-reload:

   ````bash
   npm run dev
   ````

5. **Build for Production**

   To build the production bundle:

   ````bash
   npm run build
   ````

   To preview the built application:

   ````bash
   npm run start
   ````

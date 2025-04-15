// routes.tsx – Defines the application's routing structure using React Router with a nested hierarchy.

import React, { useEffect } from 'react';
import { type RouteObject } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Test from "./pages/Test";
import Logout from "./pages/Logout";
import Landing from "./pages/Landing";
import RequireAuth from "./components/RequireAuth";
import Applications from "./pages/Applications";
import Postings from "./pages/Postings";
import AnalyzePage from './pages/AnalyzePage';

const disableAuth = import.meta.env.VITE_DISABLE_AUTH0 === 'true'; // added for auth bypass in local dev mode

// Inline component to redirect to Auth0 login
const Login: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);
  return <div>Redirecting to login...</div>;
};

// Define extended route type to include file property
interface ExtendedRouteObject extends Omit<RouteObject, 'children'> {
  file: string;
  children?: ExtendedRouteObject[];
}

const routes: ExtendedRouteObject[] = [
  {
    // Public login route that triggers Auth0 (bypassed when auth is disabled)
    path: '/login',
    element: disableAuth ? <div>Login bypassed</div> : <Login />,
    file: "pages/Login.tsx"
  },
  {
    // Public landing page for root URL
    path: '/',
    element: <Landing />,
    file: "pages/Landing.tsx"
  },
  {
    // Protected routes wrapped conditionally based on auth setting
    path: "", 
    element: disableAuth ? <DashboardLayout /> : (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    file: "layout/DashboardLayout.tsx",
    children: [
      { path: '/dashboard', element: <Dashboard />, file: "pages/Dashboard.tsx" },
      { path: '/applications', element: <Applications />, file: "pages/Applications.tsx" },
      { path: '/settings', element: <Settings />, file: "pages/Settings.tsx" },
      { path: '/test', element: <Test />, file: "pages/Test.tsx" },
      { path: '/logout', element: <Logout />, file: "pages/Logout.tsx" },
      { path: '/postings', element: <Postings />, file: "pages/Postings.tsx" },
      { path: '/analyze', element: < AnalyzePage/>, file: "pages/AnalyzePage.tsx" }
    ]
  }
];

export { routes };
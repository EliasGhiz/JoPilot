// routes.tsx – Defines the application's routing structure using React Router with a nested hierarchy.

import React, { useEffect } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Test from "./pages/Test";
import Logout from "./pages/Logout"; // <-- new import
import RequireAuth from "./components/RequireAuth";

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
    // Public login route that triggers Auth0
    path: '/login',
    element: <Login />,
    file: "pages/Login.tsx"
  },
  {
    // Protected routes
    path: '/',
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    file: "layout/DashboardLayout.tsx",
    children: [
      { index: true, element: <Navigate to="/dashboard" replace />, file: "routes.tsx" },
      { path: 'dashboard', element: <Dashboard />, file: "pages/Dashboard.tsx" },
      { path: 'settings', element: <Settings />, file: "pages/Settings.tsx" },
      { path: 'test', element: <Test />, file: "pages/Test.tsx" },
      { path: 'logout', element: <Logout />, file: "pages/Logout.tsx" }
    ]
  }
];

export default routes;
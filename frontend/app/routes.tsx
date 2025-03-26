// routes.tsx – Defines the application's routing structure using React Router with a nested hierarchy.

import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Test from "./pages/Test";
import { Navigate, type RouteObject } from 'react-router-dom';
import RequireAuth from "./components/RequireAuth";

// Define extended route type to include file property
interface ExtendedRouteObject extends Omit<RouteObject, 'children'> {
  file: string;
  children?: ExtendedRouteObject[];
}

const routes: ExtendedRouteObject[] = [
  {
    // Lock main app routes behind authentication; if not authenticated, RequireAuth triggers redirect
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
      { path: 'test', element: <Test />, file: "pages/Test.tsx" }
    ]
  }
];

export default routes;
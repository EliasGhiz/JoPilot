// routes.tsx – Defines the application's routing structure using React Router with a nested hierarchy.

import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Test from "./pages/Test";
import { Navigate, type RouteObject } from 'react-router-dom';

// Define extended route type to include file property
interface ExtendedRouteObject extends Omit<RouteObject, 'children'> {
  file: string;
  children?: ExtendedRouteObject[]; 
}

// Create routes with explicit file properties for each route
const routes: ExtendedRouteObject[] = [
  {
    // Use DashboardLayout as parent route to display sidebar and navbar
    path: '/',
    element: <DashboardLayout />,
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
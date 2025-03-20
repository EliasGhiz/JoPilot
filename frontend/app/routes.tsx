import DashboardLayout from "./dashboard/DashboardLayout";
import Dashboard from "./dashboard/Dashboard";
import Settings from "./dashboard/Settings";
import Test from "./dashboard/Test";
import { Navigate, type RouteObject } from 'react-router-dom';

type ExtendedRouteObject = RouteObject & {
  file?: string;
}

const routes: ExtendedRouteObject[] = [
  {
    // Use DashboardLayout as parent route to display sidebar and navbar
    path: '/',
    element: <DashboardLayout />,
    file: import.meta.url,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace />, file: import.meta.url } as ExtendedRouteObject,
      { path: 'dashboard', element: <Dashboard />, file: import.meta.url } as ExtendedRouteObject,
      { path: 'settings', element: <Settings />, file: import.meta.url } as ExtendedRouteObject,
      { path: 'test', element: <Test />, file: import.meta.url } as ExtendedRouteObject,
    ]
  }
];

export default routes;
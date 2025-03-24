// App.tsx - App component definition, ets up route-based navigation.

import React from 'react';
import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import routes from '../../app/routes';

const App: React.FC = () => {
  // React Router's 'useRoutes' renders component based on current path
  const element = useRoutes(routes as RouteObject[]);

  // If route non-existent, return fallback
  return element || (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Page Not Found</h1>
      <p>The requested page could not be found.</p>
    </div>
  );
};

export default App;

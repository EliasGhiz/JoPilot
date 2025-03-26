// index.tsx – Main application entry point that configures React with routing and mounts the App component.

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App'; // Now using App from the components folder
import { Auth0Provider } from '@auth0/auth0-react';

console.log('Merged entry point loaded');

const authDomain = import.meta.env.VITE_AUTH0_DOMAIN;
const authClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

// Validate that the necessary env vars are defined
if (!authDomain || !authClientId) {
  console.error('Missing Auth0 configuration. Set VITE_AUTH0_DOMAIN and VITE_AUTH0_CLIENT_ID in your environment.');
  throw new Error('Auth0 configuration is not defined.');
}

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <Auth0Provider
        domain={authDomain}
        clientId={authClientId}
        authorizationParams={{
          redirect_uri: window.location.origin, // For local testing this points to localhost
        }}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Auth0Provider>
    </React.StrictMode>
  );
  console.log('Merged entry point render initiated');
}

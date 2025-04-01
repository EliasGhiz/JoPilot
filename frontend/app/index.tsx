// index.tsx – Main application entry point that configures React with routing and mounts the App component.

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { ThemeProvider } from '@mui/material/styles';
import { useThemeState } from './hooks/useThemeState';
import Auth0ProviderWrapper from './Auth0ProviderWrapper';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import globalScrollbarStyles from './theme/GlobalStyles';

let disableAuth = import.meta.env.VITE_DISABLE_AUTH0 === 'true';
const authDomain = import.meta.env.VITE_AUTH0_DOMAIN;
const authClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

if (!disableAuth && (!authDomain || !authClientId)) {
  console.warn('Missing Auth0 configuration. Disabling authentication.');
  disableAuth = true;
}

// Create a root component that provides the custom theme
const Root: React.FC = () => {
  const themeState = useThemeState();
  return (
    <ThemeProvider theme={themeState.theme}>
      <CssBaseline enableColorScheme />
      <GlobalStyles styles={globalScrollbarStyles} />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <Auth0ProviderWrapper>
        <Root />
      </Auth0ProviderWrapper>
    </React.StrictMode>
  );
}

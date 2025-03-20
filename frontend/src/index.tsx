import React from 'react';
import { createRoot } from 'react-dom/client';
import App from "../app/root";
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

// RequireAuth.tsx – Protects routes by ensuring user authentication; if unauthenticated, redirects directly to Auth0.

import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const RequireAuth: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (!isAuthenticated) return null;
  
  return <>{children}</>;
};

export default RequireAuth;

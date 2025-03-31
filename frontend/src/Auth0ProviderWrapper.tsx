// Auth0ProviderWrapper.tsx - Conditionally wraps children with Auth0Provider or bypasses auth based on environment flag.

import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	// Check if Auth0 should be disabled
	if ((import.meta as any).env.VITE_DISABLE_AUTH0 === 'true') {
		return <>{children}</>;
	}
	return (
		<Auth0Provider
			domain={(import.meta as any).env.VITE_AUTH0_DOMAIN}
			clientId={(import.meta as any).env.VITE_AUTH0_CLIENT_ID}
			authorizationParams={{ redirect_uri: window.location.origin }}
		>
			{children}
		</Auth0Provider>
	);
};

export default Auth0ProviderWrapper;
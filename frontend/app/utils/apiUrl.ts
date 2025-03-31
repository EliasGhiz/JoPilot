// apiUrl.ts – Provides a utility function to determine the appropriate API URL based on the environment.

const getApiUrl = (): string => {
  // Fallback: if running locally, use hardcoded backend URL, otherwise use origin/api.
  const fallbackApiUrl = (() => {
    if (window.location.hostname === 'localhost') {
      return 'http://localhost:5000/api';
    } else if (window.location.port === '3000') {
      return 'http://192.168.1.192:5000/api';
    } else {
      return `${window.location.origin}/api`;
    }
  })();

  return import.meta.env.REACT_APP_API_URL || fallbackApiUrl;
};

export default getApiUrl;

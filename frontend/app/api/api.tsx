import getApiUrl from 'app/api/apiUrl';

// Accept getAccessTokenSilently as an argument for authenticated requests
const baseURL = getApiUrl();

const api = {
    get: async (
        endpoint: string,
        getAccessTokenSilently?: () => Promise<string>
    ) => {
        let headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (getAccessTokenSilently) {
            const token = await getAccessTokenSilently();
            headers['Authorization'] = `Bearer ${token}`;
        }
        const res = await fetch(`${baseURL}${endpoint}`, {
            headers
        });
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        return { data };
    }
};

export default api;
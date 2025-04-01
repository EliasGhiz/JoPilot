import getApiUrl from 'app/api/apiUrl';

const baseURL = getApiUrl();

const api = {
    get: async (endpoint: string) => {
        const res = await fetch(`${baseURL}${endpoint}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        return { data };
    }
};

export default api;
// for axios api layer
import axios from 'axios';
import getApiUrl from 'app/api/apiUrl'; // <-- new import

const api = axios.create({
	// Set the baseURL dynamically
	baseURL: getApiUrl(),
	headers: {
		'Content-Type': 'application/json',
	},
});

export default api;
// for axios api layer
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', //base url for flask api
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
import axios from 'axios';

// Create a pre-configured Axios instance for JSONPlaceholder API
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds request timeout
});

export default api;

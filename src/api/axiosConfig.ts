import axios from 'axios';

// Create an instance of Axios with default settings
const app = axios.create({
  baseURL: 'https://rickandmortyapi.com/api', // Set your API base URL
  timeout: 10000, // Timeout after 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors for request/response handling
app.interceptors.request.use(
  (config) => {
    // You can add authentication tokens or other custom headers here
    // config.headers['Authorization'] = 'Bearer <token>';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

app.interceptors.response.use(
  (response) => {
    // You can handle specific response statuses here
    return response;
  },
  (error) => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

export default app;

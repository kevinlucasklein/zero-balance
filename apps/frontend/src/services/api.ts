import axios from 'axios';

// Determine the base URL based on the environment
const getBaseUrl = () => {
  const mode = import.meta.env.MODE;
  const apiUrl = import.meta.env.VITE_API_URL;
  
  // In development, use the proxy defined in vite.config.ts
  if (mode === 'development') {
    return '/api';
  }
  
  // Check if we're running on Vercel (which has its own proxy configured in the dashboard)
  if (window.location.hostname.includes('vercel.app')) {
    // Use relative path for Vercel's rewrites
    return '/api';
  }
  
  // For other production environments, use the full API URL from environment variables
  return apiUrl || '';
};

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for authentication if needed
api.interceptors.request.use(
  (config) => {
    // You can add authentication headers here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    // Log the API URL being used (helpful for debugging)
    const baseUrl = config.baseURL || '';
    const url = config.url || '';
    console.log('API Request to:', baseUrl + url);
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Error: No response received', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api; 
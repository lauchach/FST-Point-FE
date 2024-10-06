import axios from 'axios';

// Create an Axios instance with default configuration
const api = axios.create({
    baseURL: 'http://localhost:4000/api',  // Set the base URL for all requests
    timeout: 5000, // You can set a timeout for the requests (optional)
});

// Add a request interceptor to attach the token (if any)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Handle login
export const login = async (username, password) => {
    try {
        const response = await api.post('/login', { username, password });
        return response.data;  // Return the data from the response
    } catch (error) {
        throw error.response || error.message;
    }
};

// Handle other API calls here (e.g., getProducts, getProfile, etc.)

export const getProducts = async () => {
  try {
      const response = await api.get('/products');
      return response.data; // Expecting data with points and products list
  } catch (error) {
      throw error.response || error.message;
  }
};
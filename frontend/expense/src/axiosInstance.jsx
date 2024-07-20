import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v2/expenses',
  withCredentials: true, // Send cookies along with requests
});

// Interceptor to add token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
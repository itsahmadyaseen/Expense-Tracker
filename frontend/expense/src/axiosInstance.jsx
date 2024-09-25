import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://expense-tracker-cc3i.onrender.com/api',
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
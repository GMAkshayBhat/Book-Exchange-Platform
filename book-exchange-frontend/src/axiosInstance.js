// src/axiosInstance.js (Create an Axios instance for handling token)
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://book-exchange-platforms.vercel.app/api',  // Set the base URL for your API
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');  // Retrieve token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Set the token in the request headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

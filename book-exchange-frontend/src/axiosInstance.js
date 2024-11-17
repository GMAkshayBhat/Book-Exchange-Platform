/**
 * @file axiosInstance.js
 * @description Description of the file
 * @author G M Akshay Bhat
 * @created 02 19:33
 * @modified 17 19:33
 */


import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',  // Set the base URL for your API
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

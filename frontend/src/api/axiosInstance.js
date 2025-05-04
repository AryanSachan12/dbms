// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jobpredict.onrender.com/api/', // Set base URL for all requests
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

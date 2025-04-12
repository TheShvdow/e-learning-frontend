// src/lib/api.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  withCredentials: true, // pour gérer les sessions/cookies si nécessaire
});

export default axiosInstance;

import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const getToken = () => localStorage.getItem('smartauto_token');

const client = axios.create({
  baseURL: API_BASE,
});

client.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;

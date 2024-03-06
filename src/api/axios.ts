import axios from 'axios';
import { useAuthStore } from '../store/userStore';

const authApi = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true,
});

authApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete config.headers['Authorization'];
  }
  return config;
});

export { authApi };

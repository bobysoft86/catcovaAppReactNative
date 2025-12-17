// src/api/client.ts
import axios from "axios";
import { API_BASE_URL } from "@/src/config/api";
import { getToken } from "@/src/storage/authStorage";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Interceptor para añadir el token automáticamente si existe
api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
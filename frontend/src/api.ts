import axios from "axios";
import { logout } from "./logout";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: { "Content-Type": "application/json" },
});

// Attach access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for 401 → refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh");

      if (refreshToken) {
        try {
          const res = await axios.post(
            "http://localhost:8000/api/accounts/token/refresh/",
            { refresh: refreshToken },
            { headers: { "Content-Type": "application/json" } }
          );

          localStorage.setItem("access", res.data.access);
          originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;
          return api(originalRequest);
        } catch (refreshError) {
          logout();
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      } else {
        logout();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;

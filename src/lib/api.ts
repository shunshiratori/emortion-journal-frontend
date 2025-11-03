"use client";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ej_token");
  if (token) {
    // headersがundefinedの可能性を考慮して初期化
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    // AxiosErrorの型がない環境でも安全にアクセスできるように
    const status = (err.response && err.response.status) || 0;

    if (status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("ej_token");
      localStorage.removeItem("ej_username");
      if (location.pathname !== "/login") location.assign("/login");
    }

    return Promise.reject(err);
  }
);

export default api;

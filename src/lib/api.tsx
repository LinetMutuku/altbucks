import axios from "axios";
import { API_URL } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";

const api = axios.create({
  baseURL: API_URL,
});

// Request Interceptor: Add Token from Local Storage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Unauthorized (401)
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       const authStore = useAuthStore.getState();
//       authStore.logout(); 
//       localStorage.removeItem("authToken");
//       window.location.href = "/log-in"; 
//     }
//     return Promise.reject(error);
//   }
// );

export default api;

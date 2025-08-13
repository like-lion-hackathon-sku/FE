// src/api/client.js
import axios from "axios";
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  withCredentials: true,
});
client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      window.location.href = "/login/login.html"; //  정적 로그인으로
    }
    return Promise.reject(err);
  }
);
export default client;
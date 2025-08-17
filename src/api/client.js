// src/api/client.js
import axios from "axios";

// .env에 VITE_API_BASE_URL을 지정하면 그걸 쓰고,
// 지정 안 하면 기본적으로 '/api' 경로를 사용
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  withCredentials: true, // 세션/쿠키 포함
});

// 응답 인터셉터: 401 Unauthorized일 때 로그인 페이지로 이동
client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // TODO: 라우팅 방식에 따라 수정 (SPA면 react-router navigate 사용)
      window.location.href = "/login/login.html";
    }
    return Promise.reject(err);
  }
);

export default client;

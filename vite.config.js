// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 백엔드 주소: 기본은 ngrok, .env에서 VITE_BACKEND_ORIGIN으로 바꿔 쓸 수 있음
// 예) VITE_BACKEND_ORIGIN=http://localhost:3000
const target =
  process.env.VITE_BACKEND_ORIGIN || "https://9ca3e8cledc5.ngrok-free.app";

export default defineConfig({
  plugins: [react()],

  server: {
    port: 4000,
    host: true, // 같은 네트워크 다른 기기에서 접근 가능하게
    strictPort: true, // 5173이 점유 중이면 실패(자동 포트 변경 방지)

    proxy: {
      // 1) 인증 라우트: /api/auth/*  ->  /auth/*
      "/api/auth": {
        target,
        changeOrigin: true,
        // HTTPS 자체서명 백엔드라면 필요: secure: false
        // secure: false,
        rewrite: (p) => p.replace(/^\/api/, ""), // "/api/auth/..." -> "/auth/..."
        // 쿠키 쓰면, 프런트 fetch에서 credentials: 'include' 설정 필요
      },

      // 2) 일반 API: /api/*  ->  /api/* (그대로)
      "/api": {
        target,
        changeOrigin: true,
        // secure: false, // (http/자가서명일 때만)
        // WebSocket 쓰면:
        // ws: true,
      },

      // 3) Swagger 보기 편하게 프록시 (선택)
      "/docs": {
        target,
        changeOrigin: true,
        // secure: false,
      },
      "/openapi.json": {
        target,
        changeOrigin: true,
        // secure: false,
      },
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 1) /api/auth/* 는 /auth/* 로 바꿔서 백엔드로 전달
      '/api/auth': {
        target: 'https://9ca3e8cledc5.ngrok-free.app',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ''), // "/api/auth/..." -> "/auth/..."
      },
      // 2) /api/* (예: /api/posts)는 그대로 /api/* 유지해서 전달
      '/api': {
        target: 'https://9ca3e8cledc5.ngrok-free.app',
        changeOrigin: true,
        
      },
    },
  },
});
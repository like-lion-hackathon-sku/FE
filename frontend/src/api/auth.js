// src/api/auth.js
import client from "./client";

export const login = (email, password) =>
  client.post("/auth/login", { email, password });   // 쿠키 기반이면 client가 처리:contentReference[oaicite:2]{index=2}

export const register = (email, password, name) =>
  client.post("/auth/register", { email, password, name });

export const logout = () => client.post("/auth/logout");

export const me = () => client.get("/auth/me");      // 현재 사용자 조회(옵션)
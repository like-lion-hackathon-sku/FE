// src/api/auth.js
import client from "./client";

export const login = (email, password) =>
  client.post("/auth/login", { user_id: email, password });   // ← user_id로

export const register = (email, password, name) =>
  client.post("/auth/register", { user_id: email, password, nickname: name }); // 필요시 nickname

export const logout = () => client.post("/auth/logout");

// 세션 확인
export const me = async () => {
  const { data } = await client.get("/auth/me");
  return data;
};
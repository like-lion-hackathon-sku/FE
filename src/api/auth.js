// src/api/auth.js
import client from "./client";

// 로그인
export const login = (email, password) =>
  client.post("/api/auth/login", { user_id: email, password });

// 회원가입
export const register = (email, password, name) =>
  client.post("/api/auth/register", {
    user_id: email,
    password,
    nickname: name, // 필요 시 닉네임
  });

// 로그아웃
export const logout = () => client.post("/api/auth/logout");

// 세션 확인
export const me = async () => {
  const { data } = await client.get("/api/auth/me");
  return data;
};

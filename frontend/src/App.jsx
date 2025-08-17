// src/App.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import BoardPage from "./pages/BoardPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostCreate from "./pages/PostCreatePage";
import PostEditPage from "./pages/PostEditPage";
import Layout from "./components/Layout";

import { logout as apiLogout, me } from "./api/auth";

/* ─────────── Auth Context ─────────── */
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

/** 보호 라우트: 로그인 안 되어 있으면 정적 로그인 페이지로 보냄 */
function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) {
    // 정적 로그인 페이지 (public/login/login.html)
    window.location.href = "/login/login.html";
    return null;
  }
  return children;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 앱 최초 진입 시 세션 조회
  useEffect(() => {
    (async () => {
      try {
        const res = await me();             // API: { ok, data } 형태 가정
        setUser(res?.data ?? null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 로그아웃
  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch {}
    setUser(null);
    window.location.href = "/login/login.html";
  };

  if (loading) return <div style={{ padding: 16 }}>세션 확인 중…</div>;

  return (
    <AuthContext.Provider value={{ user, setUser, logout: handleLogout }}>
      <BrowserRouter>
        {/* Layout 내부에서 useAuth()로 현재 사용자/로그아웃 사용 가능 */}
        <Routes>
          <Route element={<Layout />}>
            {/* ✅ 초기 화면(’/’)을 RequireAuth로 보호 */}
            <Route
              index
              element={
                <RequireAuth>
                  <BoardPage />
                </RequireAuth>
              }
            />

            {/* 글 작성/수정도 보호 */}
            <Route
              path="/posts/new"
              element={
                <RequireAuth>
                  <PostCreate />
                </RequireAuth>
              }
            />
            <Route
              path="/posts/:id/edit"
              element={
                <RequireAuth>
                  <PostEditPage />
                </RequireAuth>
              }
            />

            {/* 상세보기는 공개 (원하면 RequireAuth로 감싸도 됨) */}
            <Route path="/posts/:id" element={<PostDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

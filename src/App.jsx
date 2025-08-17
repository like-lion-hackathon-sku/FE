// src/App.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoardPage from "./pages/BoardPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostCreatePage from "./pages/PostCreatePage";
import PostEditPage from "./pages/PostEditPage";
import Layout from "./components/Layout";
import { logout as apiLogout, me } from "./api/auth";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// 인증 필요한 라우트 감싸기
function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) {
    // 정적 로그인 페이지로 보냄
    window.location.href = "/login/login.html";
    return null;
  }
  return children;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 앱 최초 진입 시 세션 확인
  useEffect(() => {
    (async () => {
      try {
        const u = await me(); // me()가 user 객체 리턴
        setUser(u ?? null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<BoardPage />} />
            <Route
              path="/posts/new"
              element={
                <RequireAuth>
                  <PostCreatePage />
                </RequireAuth>
              }
            />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route
              path="/posts/:id/edit"
              element={
                <RequireAuth>
                  <PostEditPage />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

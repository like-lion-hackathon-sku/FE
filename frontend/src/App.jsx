import React, { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoardPage from "./pages/BoardPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostCreate from "./pages/PostCreatePage";
import PostEditPage from "./pages/PostEditPage";      // ← 경로 확인! (pages에 둔 걸로 가정)
import Layout from "./components/Layout";             // Layout 안에서 <Outlet /> 사용
import {logout as apiLogout, me } from "./api/auth";


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
  const [user, setUser] = useState(null);    // 로그인 사용자
  const [loading, setLoading] = useState(true);

  // 앱 최초 진입 시 세션 확인
  useEffect(() => {
    (async () => {
      try {
        const res = await me();       // { ok, data }
        setUser(res?.data ?? null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleLogout = async () => {
    try { await apiLogout(); } catch {}
    setUser(null);
    window.location.href = "/login/login.html";
  };

  if (loading) return <div style={{ padding: 16 }}>세션 확인 중…</div>;

  return (
    <AuthContext.Provider value={{ user, setUser, logout: handleLogout }}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout /* currentUser prop 제거, 내부에서 useAuth() 사용 */ />}>
            <Route path="/" element={<BoardPage />} />
            <Route
              path="/posts/new"
              element={
                <RequireAuth>
                  <PostCreate />
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
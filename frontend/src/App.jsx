import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import BoardPage from "./pages/BoardPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostCreatePage from "./pages/PostCreatePage";

export default function App() {
  
  return (
    <BrowserRouter>
      <nav
        style={{
          padding: "8px 12px",
          borderBottom: "1px solid #eee",
          display: "flex",
          gap: 12,
        }}
      >
        <Link to="/">게시판</Link>
        <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
          <a href="/login/login.html">로그인</a>
          <a href="/register/register.html">회원가입</a>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<BoardPage />} />
        <Route path="/posts/new" element={<PostCreatePage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
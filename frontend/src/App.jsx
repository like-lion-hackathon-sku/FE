import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoardPage from "./pages/BoardPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostCreate from "./pages/PostCreatePage";
import PostEditPage from "./pages/PostEditPage";      // ← 경로 확인! (pages에 둔 걸로 가정)
import Layout from "./components/Layout";             // Layout 안에서 <Outlet /> 사용

export default function App() {
  const currentUser = { id: "u1", name: "이정완", role: "user" };
  return (
    <BrowserRouter>
      <Routes>
        {/* 여기서 Layout이 모든 페이지를 감쌉니다 */}
        <Route element={<Layout currentUser = {currentUser} />}>
          <Route path="/" element={<BoardPage />} />
          <Route path="/posts/new" element={<PostCreate />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/posts/:id/edit" element={<PostEditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
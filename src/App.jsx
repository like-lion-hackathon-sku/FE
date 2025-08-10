import React from "react";
import BoardPage from "./pages/BoardPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostDetailPage from "./pages/PostDetailPage";
import PostCreate from "./components/post/PostCreate";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoardPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/posts/new" element={<PostCreate />} />
      </Routes>
    </BrowserRouter>
  );
}
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../lib/api.js";

export default function PostCreatePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiFetch("/posts", {
        method: "POST",
        body: { title, content, user_id: 1 }, // TODO: 로그인 유저 ID 가져오기
      });
      navigate("/");
    } catch (err) {
      alert(err.message || "글 작성 실패");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>새 글 작성</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
          />
        </div>
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용"
          />
        </div>
        <button type="submit">작성</button>
      </form>
    </div>
  );
}
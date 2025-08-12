import React, { useState } from "react";
import { apiFetch } from "../../lib/api.js";

export default function CommentForm({ postId }) {
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!body.trim()) return;
    try {
      await apiFetch(`/posts/${postId}/comments`, {
        method: "POST",
        body: { body },
      });
      setBody("");
      // 새로고침 대신 댓글 목록 상태를 상위에서 관리하면 더 좋음
      location.reload();
    } catch (err) {
      alert(err.message || "댓글 작성 실패");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="댓글 입력..."
      />
      <button type="submit">등록</button>
    </form>
  );
}
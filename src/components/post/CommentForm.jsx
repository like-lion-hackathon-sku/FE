// src/components/CommentForm.jsx
import React, { useState } from "react";
import styles from "./PostDetail.module.css";

export default function CommentForm({ onSubmit }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return; // 빈 문자열 제출 방지
    onSubmit?.(value);
    setText("");
  };

  return (
    <form onSubmit={submit} className={styles.commentForm}>
      <input
        type="text"
        className={styles.input}
        placeholder="댓글을 입력하세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="댓글 입력"
      />
      <button className={styles.btnPrimary} type="submit">
        댓글 작성
      </button>
    </form>
  );
}

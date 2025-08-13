import React, { useState } from "react";
import styles from "./PostDetail.module.css";

export default function CommentForm({ onSubmit }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSubmit?.(text);
    setText("");
  };

  return (
    <form onSubmit={submit} className={styles.commentForm}>
      <input
        className={styles.input}
        placeholder="댓글을 입력하세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className={styles.btnPrimary} type="submit">댓글 작성</button>
    </form>
  );
}
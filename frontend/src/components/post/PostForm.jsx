// src/components/post/PostForm.jsx
import React, { useState, useEffect } from "react";
import styles from "./PostCreate.module.css";

export default function PostForm({
  initial = { title: "", body: "" },
  onSubmit,
  onCancel,
  submitLabel = "저장",
}) {
  const [title, setTitle] = useState(initial.title);
  const [body, setBody] = useState(initial.body);

  useEffect(() => {
    setTitle(initial.title ?? "");
    setBody(initial.body ?? "");
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { title: title.trim(), body: body.trim() };
    if (!payload.title || !payload.body) return;
    onSubmit?.(payload);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="title" className={styles.label}>제목</label>
        <input
          id="title"
          className={styles.input}
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="body" className={styles.label}>내용 작성</label>
        <textarea
          id="body"
          className={styles.textarea}
          placeholder="내용을 입력하세요"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.btnPrimary}>{submitLabel}</button>
        {onCancel && (
          <button type="button" className={styles.btnGhost} onClick={onCancel}>
            취소
          </button>
        )}
      </div>
    </form>
  );
}
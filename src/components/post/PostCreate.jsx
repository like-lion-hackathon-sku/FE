// src/components/post/PostCreate.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PostCreate.module.css";



export default function PostCreate({ onSubmit }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { title: title.trim(), body: body.trim() };
    if (!payload.title || !payload.body) return;
    onSubmit?.(payload);      // 실제 API 붙으면 여기서 호출
    navigate("/");            // 등록 후 목록으로
  };


  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <button className={styles.btnGhost} onClick={goBack}>
          목록으로 돌아가기
        </button>
        <h1 className={styles.brand}>Time ∆ttack</h1>
      </header>

      <main className={styles.container}>
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
            <button type="submit" className={styles.btnPrimary}>
              글 등록하기
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
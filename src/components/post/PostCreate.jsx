// src/components/post/PostCreate.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PostCreate.module.css";
import PostForm from "./PostForm";
import { createPost } from "../../api/posts";

export default function PostCreate({ onSubmit }) {
  const navigate = useNavigate();

  // 임시 로그인 사용자 (나중에 AuthContext로 대체)
  const currentUser = { id: "u1", name: "이정완", role: "user" };

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const goBack = () =>
    window.history.length > 1 ? navigate(-1) : navigate("/");

  const handleSubmit = async (payload) => {
    const title = payload.title.trim();
    const body = payload.body.trim();
    if (!title || !body) return;

    setError("");
    setSubmitting(true);
    try {
      if (onSubmit) {
        // 외부에서 주입한 onSubmit 훅이 있으면 우선 사용
        await onSubmit({ title, body });
      } else {
        // API 호출: body -> content 매핑은 createPost 내부에서 처리됨
        await createPost({ title, body, user_id: currentUser.id });
      }
      // 현재 백엔드는 insertId를 안 주므로 목록으로 이동
      navigate("/");
      // insertId 받게 되면: navigate(`/posts/${res.data.id}`);
    } catch (e) {
      console.error(e);
      setError("게시글 작성에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
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
        {error && (
          <p style={{ color: "#ef4444", marginBottom: 8 }}>{error}</p>
        )}
        <PostForm
          initial={{ title: "", body: "" }}
          onSubmit={handleSubmit}
          onCancel={goBack}
          submitLabel={submitting ? "등록 중…" : "글 등록하기"}
        />
      </main>
    </div>
  );
}
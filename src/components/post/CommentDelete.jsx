// src/components/CommentDelete.jsx
import React from "react";
import styles from "./PostDetail.module.css";

export default function CommentDelete({
  commentId,
  authorId,
  authorEmail,
  currentUser,
  onDelete,
}) {
  const isAdmin = currentUser?.role === "admin";

  // 삭제 가능 조건
  const canDelete =
    !!currentUser &&
    (Number(currentUser.id) === Number(authorId) ||
      (!!authorEmail && currentUser.email === authorEmail) ||
      isAdmin);

  if (!canDelete) return null;

  return (
    <button
      className={styles.btnDanger}
      onClick={() => onDelete?.(commentId)}
      aria-label="댓글삭제"
    >
      댓글삭제
    </button>
  );
}

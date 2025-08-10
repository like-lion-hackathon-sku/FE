import React from "react";
import styles from "./PostDetail.module.css";

export default function CommentDelete({ commentId, authorId, currentUser, onDelete }) {
  const isAdmin = currentUser?.role === "admin";
  const canDelete = !!currentUser && (currentUser.id === authorId || isAdmin);
  console.log("[CommentDelete]", { me: currentUser?.id, authorId, isAdmin, canDelete, commentId });
  if (!canDelete) return null;

  return (
    <button
      className={styles.commentDelete}
      onClick={() => onDelete?.(commentId)}
      aria-label="댓글삭제"
    >
      댓글삭제
    </button>
  );
}
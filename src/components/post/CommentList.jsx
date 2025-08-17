// src/components/CommentList.jsx
import React from "react";
import styles from "./PostDetail.module.css";
import CommentItem from "./CommentItem";

export default function CommentList({ items = [], currentUser, onDelete }) {
  if (!Array.isArray(items) || items.length === 0) {
    return <div className={styles.commentsEmpty}>첫 댓글을 남겨보세요!</div>;
  }

  return (
    <ul className={styles.commentList}>
      {items.map((c) => (
        <CommentItem
          key={c.id}
          comment={c}
          currentUser={currentUser}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

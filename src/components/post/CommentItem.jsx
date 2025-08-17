// src/components/CommentItem.jsx
import React from "react";
import styles from "./PostDetail.module.css";
import CommentDelete from "./CommentDelete";

export default function CommentItem({ comment, currentUser, onDelete }) {
  const { id, author, body, createdAt, authorId } = comment ?? {};

  return (
    <li className={styles.commentItem}>
      <div className={styles.commentHeader}>
        <strong className={styles.commentAuthor}>{author ?? "익명"}</strong>
        <time className={styles.commentDate}>
          {createdAt ? createdAt.slice(0, 10) : ""}
        </time>
      </div>

      <p className={styles.commentBody}>{body ?? "(내용 없음)"}</p>

      <CommentDelete
        commentId={id}
        authorId={authorId}
        currentUser={currentUser}
        onDelete={onDelete}
      />
    </li>
  );
}

import React from "react";
import styles from "./PostDetail.module.css";
import CommentDelete from "./CommentDelete";

export default function CommentItem({ comment, currentUser, onDelete }) {
  return (
    <li className={styles.commentItem}>
      <div className={styles.commentAuthor}>{comment.author}</div>
      <div className={styles.commentBody}>{comment.body}</div>
      <time className={styles.commentDate}>{comment.createdAt}</time>

      {/* 여기서 CommentDelete 사용 */}
      <CommentDelete
        commentId={comment.id}
        authorId={comment.authorId}
        //authorEmail={comment.author}
        currentUser={currentUser}
        onDelete={onDelete}
      />
    </li>
  );
}
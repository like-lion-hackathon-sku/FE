import React from "react";
import styles from "./PostDetail.module.css";
import CommentItem from "./CommentItem";

export default function CommentList({ items = [], currentUser, onDelete }) {
  if (!items.length) return <p className="comments__empty">첫 댓글을 남겨보세요!</p>;
  return (
    <ul>
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
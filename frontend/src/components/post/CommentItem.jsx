import React from "react";

export default function CommentItem({ comment }) {
  return (
    <div style={{ borderBottom: "1px solid #eee", padding: "4px 0" }}>
      <b>{comment.author}</b>: {comment.body}
      <div style={{ fontSize: "0.8em", color: "#777" }}>
        {comment.createdAt}
      </div>
    </div>
  );
}
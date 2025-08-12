import React, { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api.js";
import CommentItem from "./CommentItem.jsx";

export default function CommentList({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    apiFetch(`/posts/${postId}/comments`)
      .then((data) => setComments(data))
      .catch((err) => console.error(err));
  }, [postId]);

  return (
    <div>
      <h3>댓글</h3>
      {comments.length === 0 && <p>댓글이 없습니다.</p>}
      {comments.map((c) => (
        <CommentItem key={c.id} comment={c} />
      ))}
    </div>
  );
}
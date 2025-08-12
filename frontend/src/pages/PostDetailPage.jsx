import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiFetch } from "../lib/api.js";
import CommentList from "../components/post/commentList.jsx";
import CommentForm from "../components/post/commentForm.jsx";

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    apiFetch(`/posts/${id}`)
      .then((data) => setPost(data.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!post) return <div>로딩 중...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <hr />
      <CommentList postId={id} />
      <CommentForm postId={id} />
      <Link to="/">목록으로</Link>
    </div>
  );
}
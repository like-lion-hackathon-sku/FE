// src/pages/PostEditPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostForm from "../components/post/PostForm";
import { getPost, updatePost } from "../api/posts";

export default function PostEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const p = await getPost(id);
        setPost(p);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  const handleSubmit = async (payload) => {
    try {
      await updatePost(id, payload);
      navigate(`/posts/${id}`);
    } catch (err) {
      console.error(err);
      alert("수정 실패");
    }
  };

  if (!post) return <p style={{ padding: 12 }}>로딩중…</p>;

  return (
    <PostForm
      initial={{ title: post.title, body: post.body }}
      onSubmit={handleSubmit}
    />
  );
}
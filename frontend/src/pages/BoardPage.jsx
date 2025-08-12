import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../lib/api.js";

export default function BoardPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    apiFetch("/posts")
      .then((data) => setPosts(data.data || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>게시판</h1>
      <Link to="/posts/new">글 작성</Link>
      <ul>
        {posts.map((post) => (
          <li key={post.post_id}>
            <Link to={`/posts/${post.post_id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
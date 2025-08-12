import React from "react";
import { Link } from "react-router-dom";

export default function BoardList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.post_id}>
          <Link to={`/posts/${post.post_id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}
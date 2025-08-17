// src/api/posts.js
import client from "./client";

const mapPost = (r) => ({
  id: r.id ?? r.post_id,
  title: r.title,
  body: r.content,
  authorId: r.user_id,
  author: r.author ?? r.nickname ?? r.user_id, // 백엔드에서 닉네임 내려주면 사용
  createdAt: (r.createdAt ?? r.created_at)?.slice(0, 10),
  date: (r.createdAt ?? r.created_at)?.slice(0, 10),
});

const mapComment = (r) => ({
  id: r.id ?? r.comment_id,
  author: r.author ?? String(r.author_id ?? r.authorId), // 표시용
  body: r.body ?? r.content,
  createdAt: (r.createdAt ?? r.created_at)?.slice?.(0, 10) ?? r.created_at,
  authorId: r.author_id ?? r.authorId,
});

// 게시글 목록
export async function listPosts({ page = 1, limit = 5 } = {}) {
  const { data } = await client.get("/api/posts", {
    params: { page, size: limit },
  });

  const rows = (data.data ?? data).map(mapPost);
  const total = data.meta?.total ?? data.total;
  const totalPages =
    data.meta?.totalPages ??
    (typeof total === "number" ? Math.max(1, Math.ceil(total / limit)) : 1);

  return { rows, page: data.meta?.page ?? page, totalPages };
}

// 단일 게시글
export async function getPost(id) {
  const { data } = await client.get(`/api/posts/${id}`);
  return mapPost(data.data ?? data);
}

// 게시글 생성
export async function createPost({ title, body, user_id }) {
  return client.post("/api/posts", { title, content: body, user_id });
}

// 게시글 수정
export async function updatePost(id, { title, body }) {
  return client.put(`/api/posts/${id}`, { title, content: body });
}

// 게시글 삭제
export async function deletePost(id) {
  return client.delete(`/api/posts/${id}`);
}

// 댓글 목록
export async function listComments(postId) {
  const { data } = await client.get(`/api/posts/${postId}/comments`);
  return (data.data ?? data).map(mapComment);
}

// 댓글 작성
export async function createComment(postId, { body }) {
  return client.post(`/api/posts/${postId}/comments`, { body });
}

// 댓글 삭제
export async function deleteComment(postId, commentId) {
  await client.delete(`/api/posts/${postId}/comments/${commentId}`);
}

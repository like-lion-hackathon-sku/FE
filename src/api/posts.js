// src/api/posts.js
import client from "./client";

const mapPost = (r) => ({
  id: r.post_id,
  title: r.title,
  body: r.content,
  authorId: r.user_id,
  author: r.user_id,
  createdAt: r.created_at?.slice(0, 10),
  date: r.created_at?.slice(0, 10),
});
const mapComment = (r) => ({
  id: r.id,
  author: r.author,                     // 표시용(이메일/닉네임 등)
  body: r.body,
  createdAt: r.createdAt?.slice?.(0,10) || r.createdAt,
  authorId: r.author_id ?? r.authorId,  // ✅ 백엔드 키에 맞춰 보강
});

export async function listPosts({ page = 1, limit = 10 } = {}) {
  const { data } = await client.get("/posts", { params: { page, limit } });

  // 백엔드 응답 형태 대응: { data: [], meta:{ page,totalPages,total } } 또는 { data: [], total }
  const rows = (data.data ?? data).map(mapPost);
  const total = data.meta?.total ?? data.total;
  const totalPages =
    data.meta?.totalPages ??
    (typeof total === "number" ? Math.max(1, Math.ceil(total / limit)) : 1);

  return { rows, page: data.meta?.page ?? page, totalPages };
}

export async function getPost(id) {
  const { data } = await client.get(`/posts/${id}`);
  return mapPost(data.data);
}
export async function createPost({ title, body, user_id }) {
  return client.post("/posts", { title, content: body, user_id });
}
export async function updatePost(id, { title, body }) {
  return client.put(`/posts/${id}`, { title, content: body });
}
export async function deletePost(id) {
  return client.delete(`/posts/${id}`);
}
export async function listComments(postId) {
  const { data } = await client.get(`/posts/${postId}/comments`);
  // 백엔드가 배열을 바로 반환하므로 data는 Array
  return data.map(mapComment);
}
export async function createComment(postId, { body }) {
  // 세션 로그인(쿠키) 기반이면 client.withCredentials=true 설정 필요
  return client.post(`/posts/${postId}/comments`, { body });
}
/*export async function deleteComment(postId, commentId) {
  return client.delete(`/posts/${postId}/comments/${commentId}`);
}*/
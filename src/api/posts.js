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
  author: r.author,            // 백엔드에서 author_email을 author로 내려줌
  body: r.body,
  createdAt: r.createdAt?.slice?.(0,10) || r.createdAt,
  // authorId: r.authorId,      // 백엔드가 author_id도 내려주면 이 줄 추가
});

export async function listPosts() {
  const { data } = await client.get("/posts");
  return data.data.map(mapPost);
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
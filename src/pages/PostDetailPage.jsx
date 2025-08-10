// src/pages/PostDetailPage.jsx
// API 붙이면 주석 해제
// import client from "../api/client";
// src/pages/PostDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostDetail from "../components/post/PostDetail";

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 로그인 사용자 (목업)
  const currentUser = { id: "u1", name: "이정완", role: "user" };

  // 상태
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  async function load() {
    setLoading(true);
    try {
      // 내 글/남 글을 라우트 id로 나눠서 목업
      const isMine = String(id) === "1"; // /posts/1 은 내 글, 그 외는 남 글

      setPost({
        id,
        title: isMine ? "내가 쓴 글" : "남이 쓴 글",
        body: "여기는 글 내용입니다.",
        authorId: isMine ? currentUser.id : "u2",
        author:  isMine ? currentUser.name : "서승기",
        createdAt: "2025-08-09",
      });

      setComments([
        { id: "c1", authorId: "u2", author: "서승기", body: "남이 쓴 댓글", createdAt: "2025-08-09" }, // 삭제 X
        { id: "c2", authorId: currentUser.id, author: currentUser.name, body: "내가 쓴 댓글", createdAt: "2025-08-09" }, // 삭제 O
      ]);
    } finally {
      setLoading(false);
    }
  }
  load();
}, [id]);
  // 목데이터 로드 (API 붙일 때 이 부분 교체)
  /*useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        // ---- 실제 API 예시 ----
        // const { data } = await client.get(`/posts/${id}`);
        // setPost(data.post);
        // setComments(data.comments);

        // ---- 임시 목데이터 ----
        setPost({
          id,
          title: "예시 글 제목",
          body: "여기는 글 내용입니다.",
          authorId: "u1",
          author: "이정완",
          createdAt: "2025-08-09",
        });
        setComments([
          { id: "c1", authorId: "u2", author: "서승기", body: "첫 댓글", createdAt: "2025-08-09" },
          { id: "c2", authorId: "u1", author: "이정완", body: "둘째 댓글", createdAt: "2025-08-09" },
        ]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);*/

  // 뒤로가기 / 삭제 핸들러
  const goBack = () => navigate(-1);
  const onDeletePost = () => navigate("/");

  const onDeleteComment = (cid) =>
    setComments((prev) => prev.filter((c) => c.id !== cid));

  // 댓글 작성 (목업: 현재 사용자로 추가)
  const addComment = async (text) => {
    const body = text.trim();
    if (!body) return;

    // ---- 실제 API 예시 ----
    // const { data } = await client.post(`/posts/${id}/comments`, { body });
    // setComments((prev) => [data, ...prev]);

    // ---- 임시 ----
    const newItem = {
      id: String(Date.now()),
      authorId: currentUser.id,
      author: currentUser.name,
      body,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setComments((prev) => [newItem, ...prev]);
  };

  if (loading || !post) return <p style={{ padding: 12 }}>로딩중…</p>;

  return (
    <PostDetail
      post={post}
      comments={comments}
      currentUser={currentUser}      
      onBack={goBack}
      onSubmitComment={addComment}
      onDeletePost={onDeletePost}    
      onDeleteComment={onDeleteComment}
    />
  );  
}
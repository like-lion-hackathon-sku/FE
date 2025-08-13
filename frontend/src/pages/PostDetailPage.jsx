import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// PostDetail 위치 확인: components/PostDetail.jsx
import PostDetail from "../components/post/PostDetail";

import { getPost, deletePost, listComments, createComment /*, deleteComment */ } from "../api/posts";

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 임시 로그인 사용자 (나중에 AuthContext로 교체)
  const currentUser = { id: "u1", name: "이정완", role: "user" };

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]); // 댓글은 일단 목업
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const p = await getPost(id);
        setPost(p);
        const cs = await listComments(id);
        setComments(cs);
      } catch (e) {
        console.error(e);
        // 404 등으로 실패하면 목록으로 보냄
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  const goBack = () => navigate(-1);

  const onDeletePost = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deletePost(id);
      alert("삭제되었습니다.");
      navigate("/");
    } catch (e) {
      console.error(e);
      alert("삭제에 실패했습니다.");
    }
  };

  /* const onDeleteComment = async (cid) => {
    if (!window.confirm("정말 댓글을 삭제하시겠습니까?")) return;
    try {
      await deleteComment(id, cid); // 서버에 삭제 요청
      const cs = await listComments(id); // 최신 목록 다시 가져오기
      setComments(cs);
    } catch (e) {
      console.error(e);
      alert("댓글 삭제에 실패했습니다.");
    }
  };*/

  const addComment = async (text) => {
    const body = text.trim();
    if (!body) return;
    try {
      await createComment(id, { body });   // 서버로 전송
      const cs = await listComments(id);   // 최신 목록 재조회
      setComments(cs);                     // 화면 갱신
    } catch (e) {
      console.error(e);
      alert("댓글 작성 실패");
    }
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
      onEditPost={(pid) => navigate(`/posts/${pid}/edit`)}
    />
  );
} 
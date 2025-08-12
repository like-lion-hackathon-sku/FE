// src/components/PostDetail.jsx
import React from "react";
import styles from "./PostDetail.module.css";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

export default function PostDetail({
  post,
  comments = [],
  currentUser,      
  onBack,
  onSubmitComment,
  onDeletePost,    
  onDeleteComment,
  onEditPost,
}) {
  const isAdmin = currentUser?.role === "admin";
  const canDeletePost = !!currentUser && (currentUser.id === post.authorId || isAdmin);
  const canEditPost   = canDeletePost;

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <button className={styles.btnGhost} onClick={onBack}>목록으로 돌아가기</button>
        <h1 className={styles.brand}>Time ∆ttack</h1>

        
      </header>

      <main className={styles.container}>
        <article className={styles.article}>
          <header className={styles.articleHeader}>
            <h2 className={styles.title}>{post.title}</h2>

            <div className={styles.meta}>
              <span>작성자 {post.author ?? "-"}</span>
              {post.createdAt && (
                <>
                  <span> · </span>
                  <time dateTime={post.createdAt}>{post.createdAt}</time>
                </>
              )}
            </div>
          </header>

          <hr className={styles.divider} />
          <section className={styles.body}>{post.body}</section>
        </article>

        <section className={styles.comments} aria-label="댓글">
          <h3 className={styles.sectionTitle}>댓글</h3>
          <CommentForm onSubmit={onSubmitComment} />

          {/* ★ 현재 유저/삭제 핸들러 전달 → CommentItem에서 댓글삭제 노출 제어 */}
          <CommentList
            items={comments}
            currentUser={currentUser}
            onDelete={onDeleteComment}
          />
        </section>
        <div className={styles.postActions}>
          {canEditPost && (
            <button
              className={styles.btnEdit}
              onClick={() => onEditPost?.(post.id)}
            >
              글 수정하기
            </button>
          )}
          {canDeletePost && (
            <button
              className={styles.btnDanger}
              onClick={() => onDeletePost?.(post.id)}
            >
              글삭제
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
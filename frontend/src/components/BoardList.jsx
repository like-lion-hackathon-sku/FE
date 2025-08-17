// src/components/BoardList.jsx
import React from "react";
import styles from "./BoardList.module.css";
import { Link } from "react-router-dom";

export default function BoardList({
  rows = [],
  page = 1,
  totalPages = 1,
  onPageChange = () => {},
  onCreate = () => {},
  onLogout = () => {},
  onRowClick = () => {},
}) {
  const prev = () => onPageChange(Math.max(1, page - 1));
  const next = () => onPageChange(Math.min(totalPages, page + 1));

  // 안전한 값 추출 함수 (키 이름 달라도 동작)
  const getAuthor = (r) => r.author ?? r.authorName ?? r.nickname ?? r.authorId ?? "";
  const getDate   = (r) => r.createdAt ?? r.date ?? r.created_at ?? "";

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <button className={styles.btnDanger} onClick={onLogout}>로그아웃</button>
      </header>

      <main className={styles.container}>
        <h1 className={styles.title}>Time ∆ttack</h1>

        <section className={styles.tableWrap} aria-label="게시글 목록">
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col" className={styles.thCenter} style={{ width: 96 }}>번호</th>
                <th scope="col" style={{ width: 180 }}>작성자</th>
                <th scope="col">제목</th>
                <th scope="col" className={styles.thCenter} style={{ width: 160 }}>작성일시</th>
              </tr>
            </thead>
            <tbody>
  {rows.map((r, i) => (
    <tr
      key={`${r.id}-${i}`}
      className={styles.row}
      onClick={() => onRowClick(r.id)}
    >
      <td className={styles.tdCenter} data-label="번호">
        <span className={styles.val}>{r.id}</span>
      </td>

      <td data-label="작성자">
        <span className={styles.val}>{getAuthor(r)}</span>
      </td>

      <td data-label="제목">
        <span className={styles.val}>
          <Link to={`/posts/${r.id}`} onClick={(e) => e.stopPropagation()}>
            {r.title}
          </Link>
        </span>
      </td>

      <td className={styles.tdCenter} data-label="작성일시">
        <span className={styles.val}>{getDate(r)}</span>
      </td>
    </tr>
  ))}

  {rows.length === 0 && (
    <tr>
      <td colSpan={4} className={styles.empty}>데이터가 없습니다.</td>
    </tr>
  )}
</tbody>
          </table>
        </section>

        <nav className={styles.footerBar} aria-label="페이지네이션">
          <div className={styles.pagination}>
            <button className={styles.btn} onClick={prev} disabled={page <= 1}>
              이전
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const n = i + 1;
              const active = n === page;
              return (
                <button
                  key={n}
                  className={`${styles.page} ${active ? styles.pageActive : ""}`}
                  aria-current={active ? "page" : undefined}
                  onClick={() => onPageChange(n)}
                >
                  {n}
                </button>
              );
            })}

            <button className={styles.btn} onClick={next} disabled={page >= totalPages}>
              다음
            </button>
          </div>

          <button className={styles.btnPrimary} onClick={onCreate}>글 작성하기</button>
        </nav>
      </main>
    </div>
  );
}

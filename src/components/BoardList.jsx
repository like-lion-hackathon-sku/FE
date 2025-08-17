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
  /*const BoardList = ({ posts }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>날짜</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.id} className="row">
            <td>{post.id}</td>
            <td>
              {제목 클릭 시 해당 id로 이동 }
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </td>
            <td>{post.author}</td>
            <td>{post.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};*/


  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <a href="/login/login.html" className={styles.btnDanger}>
    로그아웃
  </a>
      </header>

      <main className={styles.container}>
        <h1 className={styles.title}>Time ∆ttack</h1>

        <section className={styles.tableWrap} aria-label="게시글 목록">
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thCenter} style={{width:96}}>번호</th>
                <th style={{width:180}}>작성자</th>
                <th>제목</th>
                <th className={styles.thCenter} style={{width:160}}>작성일자</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
    <tr key={`${r.id}-${i}`} className={styles.row}>
      <td className={styles.tdCenter}>{r.id}</td>
      <td>{r.author}</td>
      <td>
        <Link to={`/posts/${r.id}`}>{r.title}</Link>
      </td>
      <td className={styles.tdCenter}>{r.date}</td>
    </tr>
  ))}
              {rows.length === 0 && (
                <tr><td colSpan={4} className={styles.empty}>데이터가 없습니다.</td></tr>
              )}
            </tbody>
          </table>
        </section>

        <nav className={styles.footerBar} aria-label="페이지네이션">
  <div className={styles.pagination}>
    <button className={styles.btn} onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page <= 1}>
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

    <button className={styles.btn} onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page >= totalPages}>
      다음
    </button>
  </div>

  <button className={styles.btnPrimary} onClick={onCreate}>글 작성하기</button>
</nav>
      </main>
    </div>
  );
}
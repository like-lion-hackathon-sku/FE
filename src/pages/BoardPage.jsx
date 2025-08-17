import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardList from "../components/BoardList";
import { listPosts } from "../api/posts";

export default function BoardPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const LIMIT = 5;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await listPosts({ page, limit: LIMIT });
        // 응답 유연 처리
        const _rows =
          res?.rows ?? res?.data?.rows ?? (Array.isArray(res) ? res : []);
        const _total =
          res?.total ?? res?.data?.total ?? (Array.isArray(res) ? res.length : 0);
        const _totalPages =
          res?.totalPages ??
          res?.data?.totalPages ??
          Math.max(1, Math.ceil((_total || _rows.length) / LIMIT));

        setRows(_rows);
        setTotalPages(_totalPages);
      } catch (e) {
        console.error("posts 실패:", e);
        setRows([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    })();
  }, [page]);

  if (loading) return <p style={{ padding: 12 }}>로딩중…</p>;

  return (
    <BoardList
      rows={rows}
      page={page}
      totalPages={totalPages}
      onPageChange={(p) => setPage(p)}
      onCreate={() => navigate("/posts/new")}
      onLogout={() => console.log("logout")}
      onRowClick={(r) => console.log("open row", r)}
    />
  );
}
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardList from "../components/BoardList";
import { listPosts } from "../api/posts";

/*const rows = [
  { id: 6, author: "양현준", title: "프론트엔드", date: "2025-08-09" },
  { id: 5, author: "서승기", title: "PM", date: "2025-08-09" },
  { id: 4, author: "이호현", title: "백엔드", date: "2025-08-09" },
  { id: 3, author: "김민호", title: "백엔드", date: "2025-08-09" },
  { id: 2, author: "박경원", title: "프론트엔드", date: "2025-08-09" },
  { id: 1, author: "이정완", title: "프론트엔드", date: "2025-08-09" },
];*/

export default function BoardPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const data = await listPosts();
        setRows(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  if (loading) return <p style={{ padding: 12 }}>로딩중…</p>;
  return (
    <BoardList
      rows={rows}
      page={1}
      totalPages={2}
      onPageChange={(p)=>console.log("go page", p)}
      onCreate={() => navigate("/posts/new")} 
      onLogout={()=>console.log("logout")}
      onRowClick={(r)=>console.log("open row", r)}
    />
  );
}
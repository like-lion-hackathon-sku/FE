// components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import logoUrl from "../assets/timeattack.png";
import { useAuth } from "../App";   // ✅ App.jsx에서 export 한 훅 사용

export default function Layout() {
  const { user, logout } = useAuth();   // ✅ 컨텍스트에서 가져오기

  return (
    <div className={styles.app}>
      <aside className={styles.sidebar}>
        <div className={styles.logoWrap}>
          <img src={logoUrl} alt="TimeAttack" className={styles.logo} />

          {user ? (
             <div className={styles.user}>
               {(user.nickname && user.nickname.trim()) ? `${user.nickname}님` : '사용자님'}
             </div>
           ) : null}

          {/* 로그인/로그아웃 액션 */}
          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            {user ? (
              <button onClick={logout}>로그아웃</button>
            ) : (
              <>
                <a href="/login/login.html">로그인</a>
                <a href="/register/register.html">회원가입</a>
              </>
            )}
          </div>
        </div>
      </aside>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
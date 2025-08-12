// components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import logoUrl from "../assets/timeattack.png";

export default function Layout({currentUser}) {
  return (
    <div className={styles.app}>
      <aside className={styles.sidebar}>
        <div className={styles.logoWrap}>
          <img src={logoUrl} alt="TimeAttack" className={styles.logo} />
          <div className={styles.user}>
            {currentUser ? `${currentUser.name}님` : "로그인이 필요합니다"}
          </div>
        </div>
      </aside>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>  
  );
}
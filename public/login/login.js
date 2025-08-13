import { apiFetch } from '/api.js';
console.log('[login.js] 로드됨'); // 로드 확인용
const form = document.getElementById("loginForm");
const user_id = document.getElementById("user_id");
const password = document.getElementById("password");
const togglePw = document.getElementById("togglePw");
const loginBtn = document.getElementById("loginBtn");

function validate() {
  if (!user_id.value.trim()) { alert("아이디를 입력하세요."); user_id.focus(); return false; }
  if (!password.value.trim()) { alert("비밀번호를 입력하세요."); password.focus(); return false; }
  return true;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    loginBtn.disabled = true;
    await apiFetch('/auth/login', {
      method: 'POST',
      body: { user_id: user_id.value.trim(), password: password.value },
    });
    alert('로그인 완료!');
    // React 게시판 홈으로 이동
    location.href = 'http://localhost:5173/';
  } catch (err) {
    alert(err.message || '로그인에 실패했습니다.');
  } finally {
    loginBtn.disabled = false;
  }
});

togglePw.addEventListener("click", () => {
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  togglePw.querySelector(".text-wrapper-2").textContent = type === "password" ? "보기" : "숨김";
});
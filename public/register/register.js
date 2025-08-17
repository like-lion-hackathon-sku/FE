// public/register/register.js
// 1) 정확한 경로로! (public/js/api.js)
import { apiFetch } from '/js/api.js';

const $ = (id) => document.getElementById(id);

const f = $('signupForm');
const user_id = $('user_id');          // 이메일 입력
const password = $('password');
const passwordConfirm = $('passwordConfirm');
const nickname = $('nickname');
const statusArea = $('statusArea');

// 2) 이메일 형식(간단 버전) - 최소 @ 과 .
const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 최소 8자
const rePasswordMin = /^.{8,}$/;

function showStatus(msg, ok = false) {
  statusArea.textContent = msg;
  statusArea.classList.toggle('ok', ok);
}

// 아이디(=이메일) 중복 확인
$('checkIdBtn').addEventListener('click', async () => {
  const email = user_id.value.trim().toLowerCase();
  if (!reEmail.test(email)) {
    showStatus('올바른 이메일 형식을 입력하세요.');
    return;
  }
  try {
    const { duplicated } = await apiFetch('/auth/checkDuplication', {
      method: 'POST',
      body: { user_id: email },
    });
    if (duplicated) showStatus('이미 가입된 이메일입니다.');
    else showStatus('사용 가능한 이메일입니다.', true);
  } catch (e) {
    showStatus(e.message || '중복 확인 실패');
  }
});

// 비밀번호 보기/숨김
$('togglePw').addEventListener('click', () => {
  const cur = password.type === 'password' ? 'text' : 'password';
  password.type = cur;
  const t = $('togglePw').querySelector('.text-wrapper-6');
  if (t) t.textContent = cur === 'password' ? '보기' : '숨김';
});

// 취소 → 로그인 화면
$('cancelBtn').addEventListener('click', () => {
  location.href = '/login/login.html';
});

// 제출(회원가입)
f.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = user_id.value.trim().toLowerCase();

  if (!reEmail.test(email)) return showStatus('올바른 이메일을 입력하세요.');
  if (!rePasswordMin.test(password.value)) return showStatus('비밀번호는 8자 이상이어야 합니다.');
  if (password.value !== passwordConfirm.value) return showStatus('비밀번호가 일치하지 않습니다.');
  if (!nickname.value.trim()) return showStatus('닉네임을 입력하세요.'); // 닉네임을 DB에 안 쓰면 이 줄은 지워도 됩니다

  showStatus('');

  try {
    await apiFetch('/auth/register', {
      method: 'POST',
      body: {
        user_id: email,            // ← 백엔드는 user_id(=email) 기대
        password: password.value,
        nickname: nickname.value.trim(),
        // nickname을 백엔드에서 안 쓰면 보내지 않아도 됩니다
      },
    });
    alert('가입 완료! 로그인 페이지로 이동합니다.');
    location.href = '/login/login.html';
  } catch (err) {
    showStatus(err.message || '가입 실패');
    console.error('register error:', err);
  }
});
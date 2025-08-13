import { apiFetch } from '/api.js';

const $ = (id) => document.getElementById(id);

const f = $('signupForm');
const user_id = $('user_id');
const password = $('password');
const passwordConfirm = $('passwordConfirm');
const nickname = $('nickname');
const statusArea = $('statusArea');

const reUserId = /^[a-zA-Z0-9_]{4,16}$/;
const rePasswordMin = /^.{8,}$/;

function showStatus(msg, ok = false) {
  statusArea.textContent = msg;
  statusArea.classList.toggle('ok', ok);
}

$('checkIdBtn').addEventListener('click', async () => {
  const id = user_id.value.trim();
  if (!reUserId.test(id)) {
    showStatus('아이디 형식을 확인하세요. (영문/숫자/언더스코어 4~16자)');
    return;
  }
  try {
    const { duplicated } = await apiFetch('/auth/checkDuplication', {
      method: 'POST',
      body: { user_id: id },
    });
    if (duplicated) showStatus('이미 사용 중인 아이디입니다.');
    else showStatus('사용 가능한 아이디입니다.', true);
  } catch (e) {
    showStatus(e.message || '중복 확인 실패');
  }
});

$('togglePw').addEventListener('click', () => {
  const cur = password.type === 'password' ? 'text' : 'password';
  password.type = cur;
  $('togglePw').querySelector('.text-wrapper-6').textContent = cur === 'password' ? '보기' : '숨김';
});

$('cancelBtn').addEventListener('click', () => {
  location.href = '/login/login.html';
});

f.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!reUserId.test(user_id.value.trim())) return showStatus('아이디 형식을 확인하세요.');
  if (!rePasswordMin.test(password.value)) return showStatus('비밀번호는 8자 이상이어야 합니다.');
  if (password.value !== passwordConfirm.value) return showStatus('비밀번호가 일치하지 않습니다.');
  if (!nickname.value.trim()) return showStatus('닉네임을 입력하세요.');

  showStatus('');

  try {
    await apiFetch('/auth/register', {
      method: 'POST',
      body: {
        user_id: user_id.value.trim(),
        password: password.value,
        // nickname은 백엔드 스키마에 맞춰 필요 시 추가
      },
    });
    alert('가입 완료! 로그인 페이지로 이동합니다.');
    location.href = '/login/login.html';
  } catch (err) {
    showStatus(err.message || '가입 실패');
  }
});
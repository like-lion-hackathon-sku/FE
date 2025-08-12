import * as AuthService from '../service/auth.service.js';

export async function login(req, res) {
  try {
    const { user_id, password } = req.body ?? {};
    if (!user_id || !password) {
      return res.status(400).json({ ok: false, message: '아이디/비밀번호를 입력하세요.' });
    }
    const { id, email } = await AuthService.login(user_id, password);
    req.session.user = { id, email };
    return res.json({ ok: true, message: '로그인 완료' });
  } catch (err) {
    if (err?.code === 'AUTH_INVALID') {
      return res.status(401).json({ ok: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }
    console.error(err);
    return res.status(500).json({ ok: false, message: '서버 에러' });
  }
}

export async function logout(req, res) {
  try {
    req.session?.destroy(() => {});
    return res.json({ ok: true, message: '로그아웃 완료' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, message: '서버 에러' });
  }
}

export async function register(req, res) {
  try {
    const { user_id, password } = req.body ?? {};
    if (!user_id || !password) {
      return res.status(400).json({ ok: false, message: 'user_id, password required' });
    }
    await AuthService.register(user_id, password);
    return res.status(201).json({ ok: true, message: 'Registered' });
  } catch (err) {
    if (err?.code === 'AUTH_DUP') {
      return res.status(409).json({ ok: false, message: '이미 가입된 이메일입니다.' });
    }
    console.error(err);
    return res.status(500).json({ ok: false, message: '서버 에러' });
  }
}

export async function checkDuplication(req, res) {
  try {
    const { user_id } = req.body ?? {};
    if (!user_id) return res.status(400).json({ ok: false, message: 'user_id required' });
    const duplicated = await AuthService.isDuplicated(user_id);
    return res.json({ ok: true, duplicated });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, message: '서버 에러' });
  }
}
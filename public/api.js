// 같은 오리진에서 API 서빙 시 '' 유지. (개발 중 백엔드가 3000포트면 'http://localhost:3000')
const API_BASE = '/api'; // ← 하드코드 URL 제거(개발은 Vite 프록시, 배포는 리버스프록시 가정)

const join = (base, path) =>
  base.replace(/\/+$/, '') + '/' + String(path || '').replace(/^\/+/, '');

export async function apiFetch(path, { method = 'GET', body, headers = {} } = {}) {
  const url = join(API_BASE, path);
  const isJsonBody = body !== undefined;

  const res = await fetch(url, {
    method,
    credentials: 'include', // 쿠키 포함
    headers: {
      ...(isJsonBody ? { 'Content-Type': 'application/json' } : {}),
      Accept: 'application/json',
      ...headers,
    },
    body: isJsonBody ? JSON.stringify(body) : undefined,
  });

  // 바디가 없거나(204) JSON이 아니어도 안전하게 처리
  let data = null;
  const text = await res.text().catch(() => '');
  try { data = text ? JSON.parse(text) : null; } catch { data = null; }

  if (!res.ok || (data && data.ok === false)) {
    const msg =
      (data && (data.error || data.message)) ||
      res.statusText ||
      '요청에 실패했습니다.';
    throw new Error(msg);
  }
  return data ?? {}; // 항상 객체 반환
}
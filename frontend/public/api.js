// 같은 오리진에서 API 서빙 시 '' 유지. (개발 중 백엔드가 3000포트면 'http://localhost:3000')
const API_BASE = 'http://localhost:5174';

export async function apiFetch(path, { method = 'GET', body, headers = {} } = {}) {
  const res = await fetch(API_BASE + path, {
    method,
    credentials: 'include', // 세션 쿠키 포함
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.ok === false) {
    throw new Error(data?.message || '요청에 실패했습니다.');
  }
  return data;
}
import { pool } from '../db.config.js';

export async function findByEmail(email) {
  const [rows] = await pool.query(
    'SELECT id, email, password_hash FROM users WHERE email = ? LIMIT 1',
    [email]
  );
  return rows[0] ?? null;
}

export async function create({ email, password_hash }) {
  await pool.query(
    'INSERT INTO users (email, password_hash) VALUES (?, ?)',
    [email, password_hash]
  );
}
import bcrypt from 'bcrypt';
import * as Users from '../repository/user.repository.js';

export async function login(user_id, password) {
  const email = String(user_id).trim().toLowerCase();
  const user = await Users.findByEmail(email);
  if (!user) throw { code: 'AUTH_INVALID' };
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) throw { code: 'AUTH_INVALID' };
  return { id: user.id, email: user.email };
}

export async function register(user_id, password) {
  const email = String(user_id).trim().toLowerCase();
  const exists = await Users.findByEmail(email);
  if (exists) throw { code: 'AUTH_DUP' };
  const hash = await bcrypt.hash(password, 12);
  await Users.create({ email, password_hash: hash });
}

export async function isDuplicated(user_id) {
  const email = String(user_id).trim().toLowerCase();
  const exists = await Users.findByEmail(email);
  return Boolean(exists);
}
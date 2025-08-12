import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import { pool } from '../db.config.js';

const router = Router();

/**
 * [GET] /api/posts/:postId/comments
 * 응답: [{ id, author, body, createdAt }]
 */
router.get('/posts/:postId/comments', async (req, res) => {
  try {
    const postId = Number(req.params.postId);
    if (!Number.isFinite(postId) || postId <= 0) {
      return res.status(400).json({ ok: false, message: 'postId invalid' });
    }

    const [rows] = await pool.query(
      'SELECT id, author_email, content, created_at FROM comments WHERE post_id = ? ORDER BY id DESC',
      [postId]
    );

    const items = rows.map(r => ({
      id: r.id,
      author: r.author_email,
      body: r.content,
      createdAt: r.created_at,
    }));

    return res.json(items);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
});

/**
 * [POST] /api/posts/:postId/comments
 * body: { body: string } // 또는 { text: string } 허용
 * 로그인 필요
 * 응답: { ok:true, id }
 */
router.post('/posts/:postId/comments', requireAuth, async (req, res) => {
  try {
    const postId = Number(req.params.postId);
    const text = (req.body?.body ?? req.body?.text ?? '').toString().trim();

    if (!Number.isFinite(postId) || postId <= 0) {
      return res.status(400).json({ ok: false, message: 'postId invalid' });
    }
    if (!text) {
      return res.status(400).json({ ok: false, message: 'content required' });
    }

    const user = req.session.user; // { id, email }

    const [r] = await pool.query(
      'INSERT INTO comments (post_id, author_id, author_email, content) VALUES (?, ?, ?, ?)',
      [postId, user.id, user.email, text]
    );

    return res.status(201).json({ ok: true, id: r.insertId });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
});

export default router;
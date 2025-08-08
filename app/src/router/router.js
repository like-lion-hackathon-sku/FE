import express from 'express'
import authRouter from '../auth/router/auth.router.js'
import postsRouter from '../posts/router/posts.router.js'

const router = express.Router({ mergeParams: true })
router.use('/posts', postsRouter);
router.use('/auth', authRouter)
export default router;
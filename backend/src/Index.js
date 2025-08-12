// src/index.js
import express from 'express';
import session from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';
import helmet from 'helmet';
import 'dotenv/config';
import cors from 'cors';

import { pool } from './db.config.js';
import authRouter from './route/auth.route.js';
import postRouter from './route/post.route.js';
import commentRouter from './route/comment.route.js';

// Swagger
import swaggerAutogen from 'swagger-autogen';
import swaggerUiExpress from 'swagger-ui-express';

const app = express();

// —— CORS (프론트 5173 허용; 필요시 IP도 배열에 추가) ——
const ALLOWED_ORIGINS = ['http://localhost:5173'];
app.use(cors({ origin: ALLOWED_ORIGINS, credentials: true }));

// 보안 헤더
app.use(helmet());

// JSON 파서
app.use(express.json());

// (정적 서빙 제거) app.use(express.static(__dirname)); // ❌ API 서버에서는 불필요

// 세션 스토어 (MySQL)
const MySQLStore = MySQLStoreFactory(session);
const sessionStore = new MySQLStore(
  {
    createDatabaseTable: true,
    schema: {
      tableName: 'sessions',
      columnNames: { session_id: 'session_id', expires: 'expires', data: 'data' },
    },
  },
  pool
);

// 세션 미들웨어
app.use(
  session({
    name: 'sid',
    secret: process.env.SESSION_SECRET ?? 'change-me',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,           // HTTPS 프록시 뒤면 true + app.set('trust proxy', 1)
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
    },
  })
);

// 헬스체크
app.get('/health', (req, res) => res.json({ ok: true }));

// 라우터 마운트
app.use('/auth', authRouter);      // /auth/login, /auth/logout, /auth/register, /auth/checkDuplication
app.use('/api/posts', postRouter); // /api/posts/*
app.use('/api', commentRouter);    // /api/posts/:postId/comments

// —— Swagger UI & OpenAPI JSON ——
app.use(
  '/docs',
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, { swaggerOptions: { url: '/openapi.json' } })
);

app.get('/openapi.json', async (req, res) => {
  // #swagger.ignore = true
  const options = {
    openapi: '3.0.0',
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = '/dev/null';
  const routes = ['./src/index.js'];
  const PORT = Number(process.env.PORT ?? 5174);
  const doc = {
    info: { title: 'Time Attack BBS', description: 'Time Attack 팀 게시판 입니다.' },
    host: `localhost:${PORT}`,
    schemes: ['http'],
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

// 서버 시작
const PORT = Number(process.env.PORT ?? 5174);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
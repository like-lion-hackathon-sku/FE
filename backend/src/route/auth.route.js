import { Router } from 'express';
import {
  login,
  logout,
  register,
  checkDuplication,
} from '../controller/auth.controller.js';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/register', register);
router.post('/checkDuplication', checkDuplication);

export default router;
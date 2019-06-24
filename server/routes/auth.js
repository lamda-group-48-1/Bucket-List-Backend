import express from 'express';
import signUp from '../controllers/signup';
import login from '../controllers/login';
import {
  signup as signupMiddleware,
  login as loginMiddleware,
} from '../middlewares/auth';

const router = express.Router();
router.post('/signup', signupMiddleware, signUp);
router.post('/login', loginMiddleware, login);

export default router;

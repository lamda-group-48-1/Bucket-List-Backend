import express from 'express';
import { signup as signupMiddleware } from '../middlewares/auth';
import { signUp } from '../controllers/signup';

const router = express.Router();
router.post('/signup', signupMiddleware, signUp);

export default router;

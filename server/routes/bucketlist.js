import express from 'express';
import { authenticate } from '../middlewares/auth';
import { validateCreateList } from '../middlewares/bucketlist';
import createList from '../controllers/createList';


const router = express.Router();

router.post('/', authenticate, validateCreateList, createList);

export default router;

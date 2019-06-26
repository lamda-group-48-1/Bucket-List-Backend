import express from 'express';
import { authenticate } from '../middlewares/auth';
import { validateCreateList, validateUpdateList } from '../middlewares/bucketlist';
import createList from '../controllers/createList';
import updateList from '../controllers/update';
import getList from '../controllers/getList';


const router = express.Router();

router.post('/', authenticate, validateCreateList, createList);
router.patch('/', authenticate, validateUpdateList, updateList);
router.get('/', authenticate, getList);

export default router;

import express from 'express';
import { authenticate } from '../middlewares/auth';
import {
  validateCreateList, validateUpdateList, validateGetList,
} from '../middlewares/bucketlist';
import createList from '../controllers/createList';
import updateList from '../controllers/update';
import { getBucketLists, getBucketList } from '../controllers/getList';


const router = express.Router();

router.post('/', authenticate, validateCreateList, createList);
router.patch('/', authenticate, validateUpdateList, updateList);
router.get('/', authenticate, getBucketLists);
router.get('/:id', authenticate, validateGetList, getBucketList);

export default router;

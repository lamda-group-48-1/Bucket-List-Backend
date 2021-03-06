import express from 'express';
import { authenticate } from '../middlewares/auth';
import {
  validateCreateList, validateUpdateList, validateParamsId,
} from '../middlewares/bucketlist';
import createList from '../controllers/createList';
import updateList from '../controllers/update';
import { getBucketLists, getBucketList } from '../controllers/getList';
import deleteList from '../controllers/deleteList';


const router = express.Router();

router.post('/', authenticate, validateCreateList, createList);
router.patch('/', authenticate, validateUpdateList, updateList);
router.get('/', authenticate, getBucketLists);
router.get('/:id', authenticate, validateParamsId, getBucketList);
router.delete('/:id', authenticate, validateParamsId, deleteList);

export default router;

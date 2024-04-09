import express from 'express';
import { deleteHandler } from '../controller/listing.controller';
import validateResource from '../middleware/validateResource';
import { deleteCommentOrPostSchema } from '../schema/listing.schema';

const router = express.Router();

router.post('/api/del', validateResource(deleteCommentOrPostSchema), deleteHandler);

export default router;

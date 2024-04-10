import express from 'express';
import { deleteHandler, hidePostHandler, unhidePostHandler } from '../controller/listing.controller';
import validateResource from '../middleware/validateResource';
import { deleteCommentOrPostSchema, hidePostSchema } from '../schema/listing.schema';

const router = express.Router();

router.post('/api/del', validateResource(deleteCommentOrPostSchema), deleteHandler);
//router.post('/api/hide', validateResource(hidePostSchema), hidePostHandler);
//router.post('/api/hide', validateResource(hidePostSchema), unhidePostHandler);
router.post('/api/hide', hidePostHandler);
router.post('/api/unhide', unhidePostHandler);

export default router;

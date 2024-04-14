import express from 'express';
import {
  deleteHandler,
  hidePostHandler,
  unhidePostHandler,
  addCommentHandler,
  saveHandler,
  unsaveHandler,
  editUserTextHandler,
  insightsCountsHandler,
} from '../controller/listing.controller';
import validateResource from '../middleware/validateResource';
import {
  deleteCommentOrPostSchema,
  hideAndUnhidePostSchema,
  saveAndUnsaveSchema,
  editUserTextSchema,
  insightsCountSchema,
  addCommentSchema,
} from '../schema/listing.schema';

const router = express.Router();

router.post('/api/del', validateResource(deleteCommentOrPostSchema), deleteHandler);
router.post('/api/hide', validateResource(hideAndUnhidePostSchema), hidePostHandler);
router.post('/api/unhide', validateResource(hideAndUnhidePostSchema), unhidePostHandler);
router.post('/api/comment', validateResource(addCommentSchema), addCommentHandler);
router.post('/api/save', validateResource(saveAndUnsaveSchema), saveHandler);
router.post('/api/unsave', validateResource(saveAndUnsaveSchema), unsaveHandler);
router.patch('/api/editusertext', validateResource(editUserTextSchema), editUserTextHandler);
router.get('/api/insights_count/:post', insightsCountsHandler);

export default router;

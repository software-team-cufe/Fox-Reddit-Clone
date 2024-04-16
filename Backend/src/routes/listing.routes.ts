import express, { RequestHandler } from 'express';
import {
  deleteHandler,
  hidePostHandler,
  unhidePostHandler,
  addCommentHandler,
  saveHandler,
  unsaveHandler,
  editUserTextHandler,
  insightsCountsHandler,
  spoilerPostHandler,
  unspoilerPostHandler,
  marknsfwPostHandler,
  unmarknsfwPostHandler,
  lockPostHandler,
  unlockPostHandler,
  votePostHandler,
  submitPostHandler,
} from '../controller/listing.controller';
import validateResource from '../middleware/validateResource';
import {
  deleteCommentOrPostSchema,
  hideAndUnhidePostSchema,
  saveAndUnsaveSchema,
  editUserTextSchema,
  insightsCountSchema,
  addCommentSchema,
  spoilerPostSchema,
  nsfwPostSchema,
  lockPostSchema,
  votePostSchema,
  submitPostSchema,
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

router.post('/api/spoiler', validateResource(spoilerPostSchema), spoilerPostHandler);
router.post('/api/unspoiler', validateResource(spoilerPostSchema), unspoilerPostHandler);
router.post('/api/marknsfw', validateResource(nsfwPostSchema), marknsfwPostHandler);
router.post('/api/unmarknsfw', validateResource(nsfwPostSchema), unmarknsfwPostHandler);
router.post('/api/lock', validateResource(lockPostSchema), lockPostHandler);
router.post('/api/unlock', validateResource(lockPostSchema), unlockPostHandler);
router.post('/api/vote', validateResource(votePostSchema), votePostHandler);
router.post('/api/submit', validateResource(submitPostSchema) as RequestHandler, submitPostHandler);

export default router;

import express from 'express';
import {
  deleteHandler,
  hidePostHandler,
  unhidePostHandler,
  addCommentHandler,
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
  hidePostSchema,
  addCommentSchema,
  spoilerPostSchema,
  nsfwPostSchema,
  lockPostSchema,
  votePostSchema,
  submitPostSchema,
} from '../schema/listing.schema';
import deserializeUser from '../middleware/deserialzeUser';

const router = express.Router();

router.post('/api/del', validateResource(deleteCommentOrPostSchema), deleteHandler);
//router.post('/api/hide', validateResource(hidePostSchema), hidePostHandler);
//router.post('/api/hide', validateResource(hidePostSchema), unhidePostHandler);
router.post('/api/hide', hidePostHandler);
router.post('/api/unhide', unhidePostHandler);
router.post('/api/comment', addCommentHandler);

router.post('/api/spoiler', validateResource(spoilerPostSchema), spoilerPostHandler);
router.post('/api/unspoiler', validateResource(spoilerPostSchema), unspoilerPostHandler);
router.post('/api/marknsfw', validateResource(nsfwPostSchema), marknsfwPostHandler);
router.post('/api/unmarknsfw', validateResource(nsfwPostSchema), unmarknsfwPostHandler);
router.post('/api/lock', validateResource(lockPostSchema), lockPostHandler);
router.post('/api/unlock', validateResource(lockPostSchema), unlockPostHandler);
router.post('/api/vote', validateResource(votePostSchema), votePostHandler);
//router.post('/api/submit', validateResource(submitPostSchema), submitPostHandler);

export default router;

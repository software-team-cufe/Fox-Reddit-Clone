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
} from '../controller/listing.controller';
import validateResource from '../middleware/validateResource';
import {
  deleteCommentOrPostSchema,
  hidePostSchema,
  addCommentSchema,
  spoilerPostSchema,
  nsfwPostSchema,
  lockPostSchema,
} from '../schema/listing.schema';
import deserializeUser from '../middleware/deserialzeUser';

const router = express.Router();

router.post('/api/del', validateResource(deleteCommentOrPostSchema), deleteHandler);
//router.post('/api/hide', validateResource(hidePostSchema), hidePostHandler);
//router.post('/api/hide', validateResource(hidePostSchema), unhidePostHandler);
router.post('/api/hide', hidePostHandler);
router.post('/api/unhide', unhidePostHandler);
router.post('/api/comment', addCommentHandler);

router.post('/api/spoiler', validateResource(spoilerPostSchema), deserializeUser, spoilerPostHandler);
router.post('/api/unspoiler', validateResource(spoilerPostSchema), deserializeUser, unspoilerPostHandler);
router.post('/api/marknsfw', validateResource(nsfwPostSchema), deserializeUser, marknsfwPostHandler);
router.post('/api/unmarknsfw', validateResource(nsfwPostSchema), deserializeUser, unmarknsfwPostHandler);
router.post('/api/lock', validateResource(lockPostSchema), deserializeUser, lockPostHandler);
router.post('/api/unlock', validateResource(lockPostSchema), deserializeUser, unlockPostHandler);

export default router;

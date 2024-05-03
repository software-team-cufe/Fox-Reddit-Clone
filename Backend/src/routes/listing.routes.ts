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
  voteCommentHandler,
  submitPostHandler,
  getSortedPosts,
  getUserHiddenPostsHandler,
  getUserSavedPostsHandler,
  addReplyHandler,
  getCommentRepliesHandler,
  mentionUserHandler,
  getPostAndCommentUserMentionedHandler,
} from '../controller/listing.controller';
import validateResource from '../middleware/validateResource';
import uploadMultipleMulter from '../middleware/multer/multipleFiles';
import { uploadMultipleCloudinary } from '../middleware/cloudinary/uploadMultiple';
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
  voteCommentSchema,
  mentionUserSchema,
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
router.get('/api/user/:username/hiddenPosts', getUserHiddenPostsHandler);
router.get('/api/user/:username/savedPosts', getUserSavedPostsHandler);

router.post('/api/spoiler', validateResource(spoilerPostSchema), spoilerPostHandler);
router.post('/api/unspoiler', validateResource(spoilerPostSchema), unspoilerPostHandler);
router.post('/api/marknsfw', validateResource(nsfwPostSchema), marknsfwPostHandler);
router.post('/api/unmarknsfw', validateResource(nsfwPostSchema), unmarknsfwPostHandler);
router.post('/api/lock', validateResource(lockPostSchema), lockPostHandler);
router.post('/api/unlock', validateResource(lockPostSchema), unlockPostHandler);
router.post('/api/postvote', validateResource(votePostSchema) as RequestHandler, votePostHandler);
router.post('/api/commentvote', validateResource(voteCommentSchema) as RequestHandler, voteCommentHandler);
router.post(
  '/api/submit',
  //validateResource(submitPostSchema) as RequestHandler,
  uploadMultipleMulter,
  uploadMultipleCloudinary,
  submitPostHandler
);
router.get('/api/listing/posts/r/:subreddit/:sort', getSortedPosts);

router.post('/api/addreply', validateResource(addCommentSchema), addReplyHandler);
router.get('/api/get_comment_replies/:commentId', getCommentRepliesHandler);
router.post('/api/mention', validateResource(mentionUserSchema), mentionUserHandler);

router.get('/api/get_user_mentions', getPostAndCommentUserMentionedHandler);

export default router;

import express from 'express';
import {
  deleteHandler,
  hidePostHandler,
  unhidePostHandler,
  addCommentHandler,
  getBestPosts,
  getHotPosts,
  getNewPosts,
  getTopPosts,
  getRandomPosts,
} from '../controller/listing.controller';
import validateResource from '../middleware/validateResource';
import { deleteCommentOrPostSchema, hidePostSchema, addCommentSchema } from '../schema/listing.schema';

const router = express.Router();

router.post('/api/del', validateResource(deleteCommentOrPostSchema), deleteHandler);
//router.post('/api/hide', validateResource(hidePostSchema), hidePostHandler);
//router.post('/api/hide', validateResource(hidePostSchema), unhidePostHandler);
router.post('/api/hide', hidePostHandler);
router.post('/api/unhide', unhidePostHandler);
router.post('/api/comment', addCommentHandler);
router.get('/api/listing/posts/r/:subreddit/best', getBestPosts);
router.get('/api/listing/posts/r/:subreddit/hot', getHotPosts);
router.get('/api/listing/posts/r/:subreddit/new', getNewPosts);
router.get('/api/listing/posts/r/:subreddit/top', getTopPosts);
router.get('/api/listing/posts/r/:subreddit/random', getRandomPosts);

export default router;

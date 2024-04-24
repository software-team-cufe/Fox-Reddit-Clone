import express from 'express';
import {
  getCommunityOfUserAsMemeberHandler,
  getCommunityOfUserAsModeratorHandler,
  createSubredditHandler,
  getCommunityHandler,
  subscribeCommunityHandler,
} from '../controller/community.controller';
import validateResource from '../middleware/validateResource';
import { createCommunitySchema, subscribeCommunitySchema, getCommunitySchema } from '../schema/community.schema';

const router = express.Router();

router.get('/subreddits/mine/member', getCommunityOfUserAsMemeberHandler);
router.get('/subreddits/mine/moderator', getCommunityOfUserAsModeratorHandler);
router.get('/:subreddit', validateResource(getCommunitySchema), getCommunityHandler);

router.post('/create_subreddit', validateResource(createCommunitySchema), createSubredditHandler);
router.post('/:subreddit/api/subscribe', validateResource(subscribeCommunitySchema), subscribeCommunityHandler);

export default router;
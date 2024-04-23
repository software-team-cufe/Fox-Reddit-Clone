import express from 'express';
import {
  getCommunityOfUserAsMemeberHandler,
  getCommunityOfUserAsModeratorHandler,
  createSubredditHandler,
  getCommunityHandler,
} from '../controller/community.controller';
import validateResource from '../middleware/validateResource';
import { createCommunitySchema } from '../schema/community.schema';

const router = express.Router();

router.get('/subreddits/mine/member', getCommunityOfUserAsMemeberHandler);
router.get('/subreddits/mine/moderator', getCommunityOfUserAsModeratorHandler);
router.get('/:subreddit', getCommunityHandler);

router.post('/create_subreddit', validateResource(createCommunitySchema), createSubredditHandler);

export default router;

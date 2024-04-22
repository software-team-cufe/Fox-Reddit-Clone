import express from 'express';
import {
  getCommunityOfUserAsModeratorHandler,
  getCommunityOfUserAsMemeberHandler,
  createSubredditHandler,
} from '../controller/community.controller';

const router = express.Router();

router.get('/subreddits/mine/member', getCommunityOfUserAsMemeberHandler);
router.get('/subreddits/mine/moderator', getCommunityOfUserAsModeratorHandler);

router.post('/create_subreddit', createSubredditHandler);

export default router;

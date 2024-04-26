import express from 'express';
import {
  getCommunityOfUserAsMemeberHandler,
  getCommunityOfUserAsModeratorHandler,
  createSubredditHandler,
  getCommunityHandler,
  subscribeCommunityHandler,
  unsubscribeCommunityHandler,
  banOrUnbanHandler,
  joinModeratorHandler,
  leaveModeratorHandler,
  getUsersIsbannedIncommunityHandler,
  getModeratorsHandler,
} from '../controller/community.controller';
import validateResource from '../middleware/validateResource';
import {
  createCommunitySchema,
  subscribeCommunitySchema,
  getCommunitySchema,
  banOrUnbanSchema,
} from '../schema/community.schema';

const router = express.Router();

router.get('/subreddits/mine/member', getCommunityOfUserAsMemeberHandler);
router.get('/subreddits/mine/moderator', getCommunityOfUserAsModeratorHandler);
router.get('/:subreddit', validateResource(getCommunitySchema), getCommunityHandler);
router.post('/create_subreddit', validateResource(createCommunitySchema), createSubredditHandler);
router.post('/:subreddit/api/subscribe', validateResource(subscribeCommunitySchema), subscribeCommunityHandler);
router.post('/:subreddit/api/unsubscribe', validateResource(subscribeCommunitySchema), unsubscribeCommunityHandler);
router.post('/:subreddit/api/join_moderator', validateResource(subscribeCommunitySchema), joinModeratorHandler);
router.post('/:subreddit/api/leave_moderator', validateResource(subscribeCommunitySchema), leaveModeratorHandler);
router.post('/api/ban_or_unban', validateResource(banOrUnbanSchema), banOrUnbanHandler);
router.get('/r/:subreddit/about/banned', getUsersIsbannedIncommunityHandler);
router.get('/r/:subreddit/about/moderators', getModeratorsHandler);

export default router;

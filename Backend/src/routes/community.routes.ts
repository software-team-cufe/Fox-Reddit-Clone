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
  getMembersHandler,
  editCommunityRulesHandler,
  favoriteCommunityHandler,
  unfavoriteCommunityHandler,
  getFavoriteCommunitiesOfUserHandler,
  getSpamPostsHandler,
  getSpamCommentsHandler,
  markSpamPostHandler,
  markSpamCommentHandler,
} from '../controller/community.controller';
import validateResource from '../middleware/validateResource';
import {
  createCommunitySchema,
  subscribeCommunitySchema,
  getCommunitySchema,
  banOrUnbanSchema,
  editCommunityRulesSchema,
  spamPostSchema,
  spamCommentSchema,
} from '../schema/community.schema';

const router = express.Router();

router.get('/subreddits/mine/member', getCommunityOfUserAsMemeberHandler);
router.get('/subreddits/mine/moderator', getCommunityOfUserAsModeratorHandler);
router.get('/subreddits/mine/favorite', getFavoriteCommunitiesOfUserHandler);
router.get('/:subreddit', validateResource(getCommunitySchema), getCommunityHandler);
router.post('/create_subreddit', validateResource(createCommunitySchema), createSubredditHandler);
router.post('/:subreddit/api/subscribe', validateResource(subscribeCommunitySchema), subscribeCommunityHandler);
router.post('/:subreddit/api/unsubscribe', validateResource(subscribeCommunitySchema), unsubscribeCommunityHandler);
router.post('/:subreddit/api/favorite', validateResource(subscribeCommunitySchema), favoriteCommunityHandler);
router.post('/:subreddit/api/unfavorite', validateResource(subscribeCommunitySchema), unfavoriteCommunityHandler);
router.post('/:subreddit/api/join_moderator', validateResource(subscribeCommunitySchema), joinModeratorHandler);
router.post('/:subreddit/api/leave_moderator', validateResource(subscribeCommunitySchema), leaveModeratorHandler);
router.post('/api/ban_or_unban', validateResource(banOrUnbanSchema), banOrUnbanHandler);
router.get('/:subreddit/about/banned', validateResource(subscribeCommunitySchema), getUsersIsbannedIncommunityHandler);
router.get('/:subreddit/about/moderators', validateResource(subscribeCommunitySchema), getModeratorsHandler);
router.get('/:subreddit/about/members', validateResource(subscribeCommunitySchema), getMembersHandler);
router.get('/:subreddit/about/spam_posts', validateResource(subscribeCommunitySchema), getSpamPostsHandler);
router.get('/:subreddit/about/spam_comments', validateResource(subscribeCommunitySchema), getSpamCommentsHandler);
router.patch('/:subreddit/api/edit_rules', validateResource(editCommunityRulesSchema), editCommunityRulesHandler);
router.post('/:subreddit/api/mark_spam_post', validateResource(spamPostSchema), markSpamPostHandler);
router.post('/:subreddit/api/mark_spam_comment', validateResource(spamCommentSchema), markSpamCommentHandler);
export default router;

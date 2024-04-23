import express from 'express';
import validateResource from '../middleware/validateResource';
import {
  createUserSchema,
  verifyUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  blockUserSchema,
  reportUserSchema,
  followUserSchema,
  unfollowUserSchema,
  changePasswordSchema,
} from '../schema/user.schema';
import {
  createUserHandler,
  verifyUserHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  getCurrentUserHandler,
  getCurrentUserPrefs,
  editCurrentUserPrefs,
  username_availableHandler,
  aboutHandler,
  getUserCommentsHandler,
  getUserOverviewHandler,
  getUserSubmittedHandler,
  getUserHandler,
  blockUserHandler,
  followRequestHandler,
  unfollowRequestHandler,
  getALLFollowersHandler,
  getALLFollowingHandler,
  getALLBlockedHandler,
  deleteUserHandler,
  getUserIDfromTokenHandler,
  // getUpvotedPosts,
  // getDownvotedPosts,
  editCurrentUserNotificationPrefs,
  getCurrentUserNotificationPrefs,
} from '../controller/user.controller';
import requireUser from '../middleware/requireUser';
import deserializeUser from '../middleware/deserialzeUser';
import {
  getCommunityOfUserAsMemeberHandler,
  getCommunityOfUserAsModeratorHandler,
} from '../controller/community.controller';

const router = express.Router();

router.post('/api/users/signup', validateResource(createUserSchema), createUserHandler);

router.get('/api/users/signup/verify/:verify_token', validateResource(verifyUserSchema), verifyUserHandler);
router.post('/api/users/forgotpassword', validateResource(forgotPasswordSchema), forgotPasswordHandler);
router.post('/api/users/resetpassword', validateResource(resetPasswordSchema), resetPasswordHandler);
router.post('/user/changepassword/:user_token', requireUser, validateResource(changePasswordSchema)); //add changepassHandler
router.get('/api/username_available', username_availableHandler);

router.get('/user/:username/about', aboutHandler);

router.get('/user/:username/submitted', getUserSubmittedHandler);

router.get('/user/:username/comments', getUserCommentsHandler);

router.get('/user/:username/overview', getUserOverviewHandler);

router.get('/api/v1/me', requireUser, getCurrentUserHandler);

router.get('/api/v1/me/prefs', getCurrentUserPrefs);

router.patch('/api/v1/me/prefs', editCurrentUserPrefs);

router.get('/api/v1/me/notification/settings', getCurrentUserNotificationPrefs);

router.patch('/api/v1/me/notification/settings', editCurrentUserNotificationPrefs);

// router.get('/api/user/me/upvoted/:sort', getUpvotedPosts);

// router.get('/api/user/me/downvoted/:sort', getDownvotedPosts);

router.get('/api/user/userIDfromToken', deserializeUser, getUserIDfromTokenHandler);

/******************** BOUDY **************************/ //remove deserializeUser
router.delete('/api/users/delete_user', deserializeUser, deleteUserHandler);

router.get('/api/v1/me/followers', deserializeUser, getALLFollowersHandler);

router.get('/api/v1/me/followings', deserializeUser, getALLFollowingHandler);

router.get('/api/v1/me/blocked', deserializeUser, getALLBlockedHandler);

router.get('/api/v1/me/friends/:username', deserializeUser, getUserHandler);

router.get('/api/v1/me/followers/:username', deserializeUser, getUserHandler);

router.get('/api/v1/me/followings/:username', deserializeUser, getUserHandler);

router.post('/api/follow', validateResource(followUserSchema), deserializeUser, followRequestHandler);

router.post('/api/unfollow', validateResource(unfollowUserSchema), deserializeUser, unfollowRequestHandler);

router.post('/api/block_user', validateResource(blockUserSchema), deserializeUser, blockUserHandler);

//router.post('/api/report_user', validateResource(reportUserSchema), deserializeUser, reportUserHandler);

/********************************************************/

export default router;

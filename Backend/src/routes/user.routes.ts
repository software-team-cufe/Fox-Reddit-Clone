import express from 'express';
import validateResource from '../middleware/validateResource';
import { createUserSchema, verifyUserSchema, forgotPasswordSchema, resetPasswordSchema } from '../schema/user.schema';
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
  submittedPostByUsrnameHandler,
} from '../controller/user.controller';
import requireUser from '../middleware/requireUser';

const router = express.Router();

router.post('/api/users/signup', validateResource(createUserSchema), createUserHandler);

router.get('/api/users/signup/verify/:id/:verificationCode', validateResource(verifyUserSchema), verifyUserHandler);

router.post('/api/users/forgotpassword', validateResource(forgotPasswordSchema), forgotPasswordHandler);

router.get('/api/username_available', username_availableHandler);

router.get('/user/:username/about', aboutHandler);

router.get('/user/:username/submitted', submittedPostByUsrnameHandler);

router.post(
  '/api/users/resetpassword/:id/:passwordResetCode',
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);
router.get('/api/v1/me', requireUser, getCurrentUserHandler);

router.get('/api/v1/me/prefs/:id', getCurrentUserPrefs);

router.patch('/api/v1/me/prefs/:id', editCurrentUserPrefs);
export default router;

/********************TODO BOUDY **************************/
// router.get('/api/v1/me/friends', getALLFriendsHandler); //no validation?

// router.get('/api/v1/me/friends/:username', getFriendHandler); // no validation?

// router.post('/api/friend', validateResource(friendRequestSchema), friendRequestHandler);

// router.post('/api/unfriend', validateResource(unFriendRequestSchema), unFriendRequestHandler);

// router.post('/api/block_user', validateResource(blockUserSchema), blockUserHandler);

// router.post('/api/report_user', validateResource(reportUserSchema), reportUserHandler);

/********************************************************/

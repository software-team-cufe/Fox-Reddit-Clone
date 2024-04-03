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
} from '../controller/user.controller';
import requireUser from '../middleware/requireUser';

const router = express.Router();

router.post('/api/users/signup', validateResource(createUserSchema), createUserHandler);

router.get('/api/users/signup/verify/:id/:verificationCode', validateResource(verifyUserSchema), verifyUserHandler);

router.post('/api/users/forgotpassword', validateResource(forgotPasswordSchema), forgotPasswordHandler);

router.post(
  '/api/users/resetpassword/:id/:passwordResetCode',
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);
router.get('/api/v1/me', requireUser, getCurrentUserHandler); //needs schema validation

router.get('/api/v1/me/prefs/:id', getCurrentUserPrefs); //needs schema validation

router.patch('/api/v1/me/prefs/:id', editCurrentUserPrefs); //needs schema validation
export default router;
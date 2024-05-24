import { createSessionHandeler, refreshAccessTokenHandler, getFCMToken } from '../controller/auth.controller';
import validateResource from '../middleware/validateResource';
import { FCMTokenSchema, createSessionSchema } from '../schema/auth.schema';
import express from 'express';
import requireUser from '../middleware/requireUser';

const router = express.Router();

router.post('/api/auth/login', validateResource(createSessionSchema), createSessionHandeler);

router.post('/api/auth/login/fcmtoken', validateResource(FCMTokenSchema), getFCMToken);

router.post('/api/auth/refresh', refreshAccessTokenHandler);
export default router;

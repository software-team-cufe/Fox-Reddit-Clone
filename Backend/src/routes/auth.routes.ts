import { createSessionHandeler, refreshAccessTokenHandler } from '../controller/auth.controller';
import validateResource from '../middleware/validateResource';
import { createSessionSchema } from '../schema/auth.schema';
import express from 'express';
import requireUser from '../middleware/requireUser';

const router = express.Router();

router.post('/api/auth/login', requireUser, validateResource(createSessionSchema), createSessionHandeler);

router.post('/api/sessions/refresh', refreshAccessTokenHandler); //needs schema validation?
export default router;

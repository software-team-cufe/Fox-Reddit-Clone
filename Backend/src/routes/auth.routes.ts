import { createSessionHandeler } from '../controller/auth.controller';
import validateResource from '../middleware/validateResource';
import { createSessionSchema } from '../schema/auth.schema';
import express from 'express';

const router = express.Router();

router.post('/api/auth/login', validateResource(createSessionSchema), createSessionHandeler);

export default router;

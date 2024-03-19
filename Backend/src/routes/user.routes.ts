import exp from 'constants';
import express from 'express';
import validateResource from '../middleware/validateResource';
import { createUserSchema } from '../schema/user.schema';
import { createUserHandler } from '../controller/user.controller';
import { create } from 'lodash';

const router = express.Router();

router.post('/api/users', validateResource(createUserSchema), createUserHandler);

export default router;

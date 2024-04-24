import express from 'express';
import validateResource from '../middleware/validateResource';
import { composeMessageHandler, deleteMessageHandler } from '../controller/message.controller';
import { composeMessageSchema, deleteMessageSchema } from '../schema/message.schema';

const router = express.Router();

router.post('/message/compose/', validateResource(composeMessageSchema), composeMessageHandler);

router.post('/api/del_msg', validateResource(deleteMessageSchema), deleteMessageHandler);

export default router;

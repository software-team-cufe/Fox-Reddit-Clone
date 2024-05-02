import express from 'express';
import validateResource from '../middleware/validateResource';
import {
  composeMessageHandler,
  deleteMessageHandler,
  inboxMessagesHandler,
  sentMessagesHandler,
  allMessagesHandler,
  getUnreadMessagesHandler,
  markReadAllMessagesHandler,
  markReadMessageHandler,
  markUnreadMessageHandler,
  chatMessagesHandler,
  getAllMessagesUsernamesAndSubjectsHandler,
} from '../controller/message.controller';
import { chatMessagesSchema, composeMessageSchema, deleteMessageSchema } from '../schema/message.schema';

const router = express.Router();

router.post('/message/compose/', validateResource(composeMessageSchema), composeMessageHandler);

router.post('/api/del_msg', validateResource(deleteMessageSchema), deleteMessageHandler);

router.get('/message/sent/', sentMessagesHandler);

router.get('/message/inbox/', inboxMessagesHandler);

router.get('/message/allmessages/', allMessagesHandler);

router.post('/message/markReadAllMessages/', markReadAllMessagesHandler);

router.post('/message/markReadMessage/', markReadMessageHandler);

router.get('/message/unreadMessages/', getUnreadMessagesHandler);

router.post('/message/markUnreadMessage/', markUnreadMessageHandler);

router.get('/message/chatMessages/', validateResource(chatMessagesSchema), chatMessagesHandler);

router.get('/message/getAllMessagesUsernamesAndSubjects/', getAllMessagesUsernamesAndSubjectsHandler);

export default router;
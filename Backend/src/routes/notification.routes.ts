import { Router } from 'express';
import { editUserNotification, getUserNotifications } from '../controller/notification.controller';

const router = Router();

router.get('/api/v1/me/notification', getUserNotifications);

router.patch('/api/v1/me/notification/:id/:action', editUserNotification);
export default router;

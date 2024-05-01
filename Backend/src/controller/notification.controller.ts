import { Request, Response } from 'express';
import { findUserById } from '../service/user.service';
import { findNotificationById } from '../service/notification.service';
import NotificationModel from '../model/notification.model';
import notificationInfo from '../model/user.model';

// export async function getUserNotifications(req: Request, res: Response) {
//   try {
//     let user = res.locals.user;
//     if (!user) {
//       return res.status(401).json({
//         msg: 'User doesnt exist',
//       });
//     }
//     user = await findUserById(user._id);
//     const userNotifications: (typeof notificationInfo)[] = user.notifArray;
//     const unreadNotificationsCount = userNotifications.filter(
//       (notifInfo: typeof notificationInfo) => !notifInfo.isRead
//     ).length;

//     if (userNotifications) {
//       const notificationIds = userNotifications.map((notif: typeof notificationInfo) => notif.notificationId);
//       const notifications = await Promise.all(
//         notificationIds.map(async (notificationId: string) => {
//           const notification = await findNotificationById(notificationId);
//           return notification;
//         })
//       );
//       return res.status(200).json({
//         notifications,
//         unreadNotificationsCount,
//       });
//     }
//   } catch (error) {
//     console.error('Error fetching user notifications:', error);
//     return res.status(500).json({
//       msg: 'Internal server error',
//     });
//   }
// }

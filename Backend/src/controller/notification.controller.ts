// import { Request, Response } from 'express';
// import { findUserById, userRepliesIds } from '../service/user.service';
// //import { findNotificationById } from '../service/notification.service';
// import { notificationInfo } from '../model/user.model';
// import CommunityModel from '../model/community.model';

// export async function getUserNotifications(req: Request, res: Response) {
//   try {
//     let user = res.locals.user;
//     if (!user) {
//       return res.status(401).json({
//         msg: 'User doesnt exist',
//       });
//     }
//     user = await findUserById(user._id);
//     const userNotifications: notificationInfo[] = user.notifArray;
//     const unreadNotificationsCount = userNotifications.filter(
//       (notifInfo: notificationInfo) => notifInfo.isRead === false
//     ).length;
//     console.log(user.notifArray);
//     if (userNotifications.length != 0) {
//       const notificationIds = userNotifications.map((notif: notificationInfo) => notif.notificationId);

//       const notifications = await Promise.all(
//         notificationIds.map(async (notificationId) => {
//           if (notificationId) {
//             const notification = await findNotificationById(notificationId.toString());
//             return notification;
//           }
//           return null; // or handle undefined case as needed
//         })
//       );

//       return res.status(200).json({
//         notifications,
//         unreadNotificationsCount,
//       });
//     } else {
//       const community = await CommunityModel.aggregate([
//         { $match: { _id: { $nin: user.member } } },
//         { $sample: { size: 1 } },
//       ]);

//       if (!community) {
//         return res.status(404).json({
//           msg: 'No community found for the user',
//         });
//       }

//       // Include the community in the response
//       return res.status(200).json({
//         community,
//       });
//     }
//   } catch (error) {
//     console.error('Error fetching user notifications:', error);
//     return res.status(500).json({
//       msg: 'Internal server error',
//     });
//   }
// }

// export async function editUserNotification(req: Request, res: Response) {
//   try {
//     let user = res.locals.user;
//     if (!user) {
//       return res.status(401).json({
//         msg: 'User doesnt exist',
//       });
//     }
//     user = await findUserById(user._id);
//     const notifId = req.params.id;
//     const action = req.params.action.toLowerCase();

//     // Find the notification in the user's notifArray
//     const notificationIndex = user.notifArray.findIndex(
//       (notif: notificationInfo) => notif.notificationId && notif.notificationId.toString() === notifId
//     );

//     if (notificationIndex === -1) {
//       return res.status(404).json({
//         msg: 'Notification not found',
//       });
//     }

//     if (action === 'read') {
//       user.notifArray[notificationIndex].isRead = true;
//     } else if (action === 'hide') {
//       // Set isHidden to true for the found notification
//       user.notifArray[notificationIndex].isHidden = true;
//     } else if (action === 'unhide') {
//       // Set isHidden to true for the found notification
//       user.notifArray[notificationIndex].isHidden = false;
//     } else if (action === 'unread') {
//       // Set isHidden to true for the found notification
//       user.notifArray[notificationIndex].isRead = false;
//     } else {
//       return res.status(400).json({
//         msg: 'Invalid action',
//       });
//     }
//     // Save the updated user
//     user.markModified('notifArray');
//     await user.save();
//     return res.status(200).json(user.notifArray[notificationIndex]);
//   } catch (error) {
//     console.error('Error fetching user notifications:', error);
//     return res.status(500).json({
//       msg: 'Internal server error',
//     });
//   }
// }

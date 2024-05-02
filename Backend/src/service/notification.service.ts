import NotificationModel from '../model/notification.model'; // Adjust the import path as necessary
import { Types } from 'mongoose';

export async function findNotificationById(id: string) {
  try {
    const notification = await NotificationModel.findById(id);
    if (!notification) {
      throw new Error('Notification not found');
    }
    return notification;
  } catch (error) {
    console.error('Error fetching notification:', error);
    throw error; // Or handle the error as appropriate for your application
  }
}

// NotificationService.createNotification({
//   icon: theOtherUser.avatar,
//   sourceId: theOtherUser._id,
//   title: `user ${theUserWhoFollowedYou.username} has followed you!`,
//   text: '',
//   type: 'newFollower', // https://something/profile/asdasdas
// })

// NotificationService.createNotification({
//   icon: checkReceiver.avatar,
//   sourceId: createdMessage._id,
//   title: `New message from ${checkReceiver.username}!`,
//   text: `${createdMessage.text.slice(0,50)}...`,
//   type: 'message', // https://something/profile/asdasdas
// })

export async function createNotification(
  icon: string, // Assuming 'icon' is a string representing the icon URL or path
  title: string,
  type: string,
  text: string,
  source: Types.ObjectId // Assuming 'source' is a Mongoose ObjectId
) {
  try {
    // Create a new notification instance
    const notification = new NotificationModel({
      icon,
      title,
      type,
      text,
      source,
    });

    // Save the notification to the database
    const savedNotification = await notification.save();

    // Return the saved notification
    return savedNotification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error; // Or handle the error as appropriate for your application
  }
}

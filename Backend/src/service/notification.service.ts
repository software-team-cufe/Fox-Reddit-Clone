import NotificationModel from '../model/notification.model'; // Adjust the import path as necessary
import { findUserById } from '../service/user.service'; // Import the function to find a user by ID
import { notificationInfo } from '../model/user.model'; // Import the notificationInfo type
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

export async function createNotification(
  userId: Types.ObjectId,
  icon: string, // Assuming 'icon' is a string representing the icon URL or path
  title: string,
  type: string,
  text: string,
  source: Types.ObjectId // Assuming 'source' is a Mongoose ObjectId
) {
  try {
    // Create a new notification instance
    const textSlice = text.slice(0, 30) + '...';
    const notification = new NotificationModel({
      icon,
      title,
      type,
      textSlice,
      source,
    });

    // Save the notification to the database
    const savedNotification = await notification.save();

    const user = await findUserById(userId.toString());
    if (!user) {
      throw new Error('User not found');
    }

    // Create a notificationInfo object with the new notification ID
    const newNotificationInfo: notificationInfo = {
      notificationId: savedNotification._id, // Use the ID of the saved notification
      isRead: false, // Default value
      isHidden: false, // Default value
    };

    // Add the new notificationInfo object to the user's notifArray
    // Ensure user.notifArray is defined, initializing it as an empty array if necessary
    if (!user.notifArray) {
      user.notifArray = [];
    }

    // Now it's safe to push newNotificationInfo into user.notifArray
    user.notifArray.push(newNotificationInfo);

    // Mark the notifArray as modified and save the user
    user.markModified('notifArray');
    await user.save();

    // Return the saved notification
    return savedNotification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error; // Or handle the error as appropriate for your application
  }
}

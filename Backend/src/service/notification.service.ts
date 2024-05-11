import NotificationModel from '../model/notification.model'; // Adjust the import path as necessary
import { findUserById } from '../service/user.service'; // Import the function to find a user by ID
import { notificationInfo } from '../model/user.model'; // Import the notificationInfo type
import { Types } from 'mongoose';
import admin, { ServiceAccount } from 'firebase-admin';

import serviceAccount from '../../serviceAccountKey.json';

process.env.GOOGLE_APPLICATION_CREDENTIALS;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  databaseURL:
    'https://console.firebase.google.com/u/0/project/fox-app-e9b9f/firestore/databases/-default-/data/~2Fnotifications~2FpWhFVkla6UlLCzAsB61k', // Your Firebase database URL
});

/**
 * Finds a notification by its ID.
 *
 * @param {string} id - The ID of the notification to find.
 * @returns {Promise<NotificationModel>} - A promise that resolves to the found notification.
 * @throws {Error} - If the notification is not found.
 */
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

/**
 * Creates a new notification and sends it to the user's device using Firebase Cloud Messaging (FCM).
 *
 * @param {Types.ObjectId} userId - The ID of the user receiving the notification.
 * @param {string} icon - The URL or path of the notification icon.
 * @param {string} title - The title of the notification.
 * @param {string} type - The type of the notification.
 * @param {string} text - The text content of the notification.
 * @param {Types.ObjectId} source - The ID of the source of the notification.
 * @param {string} fcmtoken - The FCM token of the user's device.
 * @returns {Promise<NotificationModel>} - The saved notification object.
 * @throws {Error} - If the user is not found or there is an error sending the notification.
 */
export async function createNotification(
  userId: Types.ObjectId,
  icon: string, // Assuming 'icon' is a string representing the icon URL or path
  title: string,
  type: string,
  text: string,
  source: Types.ObjectId,
  fcmtoken: string // Assuming 'source' is a Mongoose ObjectId
) {
  try {
    // Create a new notification instance
    let textSlice = text.slice(0, 30);
    if (text.length > 30) textSlice += '...';
    const notification = new NotificationModel({
      icon,
      title,
      type,
      textSlice,
      source,
    });

    // Send notification to Firebase
    const message = {
      notification: {
        title: title,
        body: textSlice,
        image: icon,
      },
      data: {
        type: type, // Include the source ID in the data payload
      },
      token: fcmtoken, // You need to obtain the user's FCM token
    };

    const user = await findUserById(userId.toString());
    if (!user) {
      throw new Error('User not found');
    }
    // Send a message to the device corresponding to the provided
    // registration token.
    if (
      (user.notificationPrefs?.privateMessages && type == 'message') ||
      (user.notificationPrefs?.commentsOnYourPosts && type == 'comment') ||
      (user.notificationPrefs?.upvotesOnYourPosts && type == 'Upvote') ||
      (user.notificationPrefs?.repliesToYourComments && type == 'reply') ||
      (user.notificationPrefs?.newFollowers && type == 'newFollower') ||
      (user.notificationPrefs?.postsYouFollow && type == 'newPost')
    ) {
      if (fcmtoken) {
        admin
          .messaging()
          .send(message)
          .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
          })
          .catch((error) => {
            if (error.code === 'messaging/registration-token-not-registered') {
              console.log('Error: FCM token is invalid or not registered.', error);
              // Handle the invalid token error, e.g., remove the token from your database
              user.fcmtoken =
                'dLOGE0M9SFi2nuO207BXrT:APA91bHDz9zuFWgx7FnmS4N6AxecBF0bQ00h6owg8IEj39izvGOwDCeTzXxyUY6uzFN6nvJ8wKRTZEO_3wE4cdPN02yrygKLoLu6O4uG4YavYow1uF-xT3L4mZyuLGAsFwtD3dPKvFfc';
            } else {
              console.log('Error sending message:', error);
              // Handle other types of errors
            }
          });
      }
    }
    // Save the notification to the database
    const savedNotification = await notification.save();

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

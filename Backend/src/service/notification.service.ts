import NotificationModel from '../model/notification.model'; // Adjust the import path as necessary
import { findUserById } from '../service/user.service'; // Import the function to find a user by ID
import { notificationInfo } from '../model/user.model'; // Import the notificationInfo type
import { Types } from 'mongoose';
import admin, { ServiceAccount } from 'firebase-admin';

import serviceAccount from '../../serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  databaseURL:
    'https://console.firebase.google.com/u/0/project/fox-app-e9b9f/firestore/databases/-default-/data/~2Fnotifications~2FpWhFVkla6UlLCzAsB61k', // Your Firebase database URL
});

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
              'dS2hR_kST5aAT-C2HYJ30q:APA91bEKl8bLOGR7HHBs4vXA_SPmagBe8pEax953avEBXkLIGlNCoptsQTu9a30-a_JlDLxhA7X3GmxbVoIoUQHLzfAF0wJQcqUlR0OQ66E7O0sEXuKiW5r4-3G0_co0pOrxhzmw6M6G';
          } else {
            console.log('Error sending message:', error);
            // Handle other types of errors
          }
        });
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

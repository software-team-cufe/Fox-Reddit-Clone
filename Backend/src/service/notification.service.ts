import NotificationModel from '../model/notification.model'; // Adjust the import path as necessary

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

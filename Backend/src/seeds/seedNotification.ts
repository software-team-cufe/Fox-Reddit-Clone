import NotificationModel from '../model/notification.model';
import { faker } from '@faker-js/faker';
// Usage
function getRandomNumber(min: number, max: number): number {
  // Generate a random floating-point number between 0 and 1
  const randomFloat = Math.random();

  // Scale the random number to fit within the desired range
  const scaledRandom = randomFloat * (max - min);

  // Shift the range to start from the minimum value
  const shiftedRandom = scaledRandom + min;

  // Round the result to get an integer if needed
  const randomNumber = Math.round(shiftedRandom);

  return randomNumber;
}
const types = ['message', 'comment', 'Upvote', 'Replies', 'newFollower', 'newPost'];
const randNum = getRandomNumber(0, types.length - 1);
const type = types[randNum];

export async function seedNotification() {
  try {
    const notificationData = {
      userIcon: 'user_avatar_url',
      communityIcon: 'community_icon_url',
      title: faker.lorem.sentence(),
      type: type,
      text: faker.lorem.paragraph(),
      source: faker.lorem.word(),
      createdAt: faker.date.recent(),
    };

    await NotificationModel.create(notificationData);
    console.log('Notification seeded successfully');
  } catch (error) {
    console.error('Error seeding notifications:', error);
  }
}

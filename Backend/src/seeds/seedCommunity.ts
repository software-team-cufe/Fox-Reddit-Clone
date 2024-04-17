import mongoose from 'mongoose';
import { CommunityModel } from '../model/community.model';
import UserModel from '../model/user.model';
import PostModel from '../model/posts.model';
import { faker } from '@faker-js/faker';

export async function seedCommunity() {
  try {
    const communitiesData = [];
    // Generate data for one community
    for (let i = 0; i < 3; i++) {
      // Generating data for 3 communities
      const randomPost = await PostModel.aggregate([{ $sample: { size: 1 } }]);
      // Fetch all users
      const allUsers = await UserModel.find();

      // Shuffle users to ensure randomness
      const shuffledUsers = allUsers.sort(() => Math.random() - 0.5);

      // Select three unique users
      const [member, creator, moderator] = shuffledUsers.slice(0, 3);
      const communityData = {
        //  _id: new mongoose.Types.ObjectId(), // Generate a valid ObjectId string
        subreddit: 'Example_Subreddit ' + faker.internet.displayName(), // Generate a random subreddit name
        description: 'This is a sample community description.' + faker.lorem.sentence(), // Generate a random description
        icon: faker.image.url(), // Generate a random image URL
        banner: faker.image.url(), // Generate a random image URL
        membersCnt: faker.number.int({ min: 10, max: 100 }), // Generate a random number of members
        isDeleted: faker.datatype.boolean(), // Generate a random boolean
        createdAt: faker.date.past(),
        rank: faker.number.int({ min: 1, max: 100 }),
        trendPoints: faker.number.int({ min: 1, max: 100 }),
        pageViewsPerDay: Array.from({ length: 7 }, () => faker.number.int({ min: 0, max: 100 })), // Generate random numbers for 7 days
        pageViewsPerMonth: Array.from({ length: 12 }, () => faker.number.int({ min: 0, max: 100 })), // Generate random numbers for 12 months
        joinedPerDay: Array.from({ length: 7 }, () => faker.number.int({ min: 0, max: 100 })), // Generate random numbers for 7 days
        joinedPerMonth: Array.from({ length: 12 }, () => faker.number.int({ min: 0, max: 100 })), // Generate random numbers for 12 months
        leftPerDay: Array.from({ length: 7 }, () => faker.number.int({ min: 0, max: 100 })), // Generate random numbers for 7 days
        leftPerMonth: Array.from({ length: 12 }, () => faker.number.int({ min: 0, max: 100 })), // Generate random numbers for 12 months
        communityOptions: {
          enableSpoilerTag: faker.datatype.boolean(),
          emailUsernameMention: faker.datatype.boolean(),
          nsfw: faker.datatype.boolean(),
          allowImgAndLinksUploads: faker.datatype.boolean(),
          allowMultipleImagePerPost: faker.datatype.boolean(),
          suggestedCommentSort: faker.helpers.arrayElement(['top', 'controversial', 'new']), // Randomly choose from given options
          privacyType: faker.helpers.arrayElement(['public', 'private', 'restricted']), // Randomly choose from given options
          spamsNumBeforeRemove: faker.number.int({ min: 10, max: 100 }),
        },
        members: Array.from({ length: faker.number.int({ min: 1, max: 2 }) }, () => ({
          userID: member._id,
          isMuted: {
            value: faker.datatype.boolean(),
            date: faker.date.past(),
          },
          isBanned: {
            value: faker.datatype.boolean(),
            date: faker.date.past(),
          },
        })),
        moderators: [
          {
            role: 'creator',
            userID: creator._id,
          },
          {
            userID: moderator._id,
            role: 'moderator',
          },
        ],
        category: 'sample_category',
        categories: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()], // Generate random categories
        invitedModerators: [],
        communityRules: [
          {
            title: faker.lorem.words(2),
            description: faker.lorem.sentence(),
            reason: faker.lorem.sentence(),
          },
          {
            title: faker.lorem.words(2),
            description: faker.lorem.sentence(),
            reason: faker.lorem.sentence(),
          },
        ],
        FAQs: [],
        commcommunityPosts: [randomPost[0]._id],

        flairList: [
          {
            flairText: faker.lorem.word(),
            flairTextColor: faker.internet.color(),
            flairBackGround: faker.internet.color(),
            flairModOnly: faker.datatype.boolean(),
            flairAllowUserEdits: faker.datatype.boolean(),
            //  flairID: new mongoose.Types.ObjectId(),
          },
        ],
      };

      communitiesData.push(communityData);
    }

    await CommunityModel.insertMany(communitiesData);
    console.log('Communities seeded successfully');
  } catch (error) {
    console.error('Error seeding communities:', error);
  }
}

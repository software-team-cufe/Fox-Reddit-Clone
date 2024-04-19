//import mongoose from 'mongoose';
import { CommunityModel } from '../model/community.model';
import UserModel, { User } from '../model/user.model';
import PostModel from '../model/posts.model';
import { faker } from '@faker-js/faker';

export async function seedUser() {
  try {
    const userData = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: '$argon2id$v=19$m=65536,t=3,p=4$7+JDlJCj2Ivjcbytt7XnKw$yTrQTWkuFwu58oR9q4R4V04N/oF3dv0P61qYcUsEiH0',
      avatar: 'default.jpg',
      contentVisibility: true,
      canCreateSubreddit: true,
      isDeleted: false,
      verified: true,
      showActiveCommunities: true,
      hasVerifiedEmail: false,
      type: 'bare email',
      followers: [],
      userFollows: [],
      friendRequestToMe: [],
      friendRequestFromMe: [],
      friend: [],
      blocksFromMe: [],
      blocksToMe: [],
      hasPost: [],
      hasComment: [],
      hasReply: [],
      followPost: [],
      hiddenPosts: [],
      savedPosts: [],
      mentionedInPosts: [],
      mentionedInComments: [],
      createdAt: faker.date.past(),
      verificationCode: faker.string.alphanumeric(),
      prefs: {
        emailPrivateMessage: false,
        countryCode: 'US',
        emailCommentReply: true,
        emailUpvoteComment: true,
        emailMessages: true,
        emailUnsubscribeAll: true,
        emailUpvote: true,
        emailUsernameMention: true,
        emailUserNewFollower: true,
        emailPostReply: true,
        over18: true,
        showPostInNewWindow: true,
        labelNSFW: true,
        liveOrangereds: true,
        markMessagesRead: true,
        enableFollowers: true,
        publicVotes: true,
        showLinkFlair: true,
        showLocationBasedRecommendation: true,
        searchIncludeOver18: true,
        defaultCommentSort: 'new',
        language: 'en',
        threadedMessages: true,
        prefShowTrending: true,
      },
      meReturn: {
        emailUserNewFollower: true,
        emailUsernameMention: true,
        emailUpVotePost: true,
      },
      aboutReturn: {
        isBlocked: false,
        isModerator: false,
        acceptFollowers: true,
      },
      commMember: {
        isMuted: {
          value: false,
        },
        isBanned: {
          value: false,
        },
      },
      hasVote: [
        {
          $oid: '661e452af27d9ab115d3d593',
          type: 1,
        },
        {
          $oid: '661e49b8ec606d002954353f',
          type: -1,
        },
      ],
      votedComments: [],
      updatedAt: faker.date.recent(),
      __v: faker.number.int({ min: 10, max: 100 }),
    };

    await UserModel.create(userData);
    console.log('User seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

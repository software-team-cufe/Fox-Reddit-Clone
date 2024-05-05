import appError from '../utils/appError';
import CommunityModel, {
  Community,
  CommunityRule,
  removalReason,
  ImageWidget,
  TextWidget,
  ButtonWidget,
  ContentControls,
  PostSettings,
} from '../model/community.model';
import { Post } from '../model/posts.model';
import { findUserById } from './user.service';
import { findPostById } from './post.service';
import { findCommentById } from './comment.service';
import UserModel from '../model/user.model';

/**
 * Finds a community by its subreddit name.
 *
 * @param {string} name - The subreddit name to search for.
 * @return {Promise<any>} The community object found based on the subreddit name.
 */
export async function findCommunityByName(name: string) {
  try {
    return await CommunityModel.findOne({ name: name });
  } catch (error) {
    console.error('Error in findCommunityByName:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

/**
 * Fetches communities based on the provided array of community IDs.
 *
 * @param {string[]} commIDs - An array of community IDs.
 * @return {Promise<any[]>} A promise that resolves to an array of populated communities.
 */
export async function getUserCommunities(commIDs: string[]) {
  // Fetch communities based on the provided commIDs
  const communities = await CommunityModel.find({ _id: { $in: commIDs } });

  // Return the populated communities
  return communities;
}
/**
 * Finds a comment by their ID.
 *
 * @param id - The ID of the post to find.
 * @returns A promise that resolves to the user object if found, or null if not found.
 */
export function findCommunityByID(id: string) {
  return CommunityModel.findById(id);
}

/**
 * Create subreddit
 * @param {string} body contain rules details
 * @param {string} user user information
 * @return {Object} state
 * @function
 */
export async function createSubreddit(communityName: string, privacyType: string, over18: boolean, userID: string) {
  const user = await findUserById(userID);

  if (!user) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  if (!user.canCreateSubreddit) {
    return {
      status: false,
      error: 'this user cannot create subreddit',
    };
  }
  const result = await availableSubreddit(communityName);

  if (!result.state) {
    return {
      errorType: 0,
      status: false,
      error: 'subreddit is already made',
    };
  }
  const moderator = {
    userID: userID,
    role: 'creator',
  };
  const memInComm = {
    userID: userID,
    isMuted: {
      value: false,
      date: new Date(),
      reason: 'member is not muted',
    },
    isBanned: {
      value: true,
      date: new Date(),
      reason: 'member not banned',
      note: 'member not banned',
      period: 'member not banned',
    },
  };

  const mods = [moderator];
  const mems = [memInComm];

  // Create the new community
  const new_community = new CommunityModel({
    privacyType: privacyType,
    over18: over18,
    name: communityName,
    moderators: mods,
    members: mems,
  });

  try {
    const createdCommunity = await createcomm(new_community);
    return {
      createdCommunity,
      status: true,
    };
  } catch {
    return {
      errorType: 1,
      status: false,
      error: 'operation failed',
    };
  }
}
/**
 * Check whether subreddit is available or not
 * @param {string} subreddit
 * @returns {object} {state and subreddit}
 * @function
 */
export async function availableSubreddit(subreddit: string) {
  const subre = await findCommunityByName(subreddit);
  if (subre) {
    return {
      state: false,
      subreddit: subre,
    };
  } else {
    return {
      state: true,
      subreddit: null,
    };
  }
}

/**
 * Creates a new community.
 *
 * @param {Partial<Community>} input - The partial community data to create.
 * @return {Promise<Community>} A promise that resolves to the created community.
 */
export function createcomm(input: Partial<Community>) {
  return CommunityModel.create(input);
}

/**
 * addMemberToCom
 * @param {string} body contain rules details
 * @param {string} user user information
 * @return {Object} state
 * @function
 */
export async function addMemberToCom(userID: string, subreddit: string) {
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  const memInComm = {
    userID: userID,
    isMuted: {
      value: false,
      date: new Date(),
      reason: 'member is not muted',
    },
    isBanned: {
      value: false,
      date: new Date(),
      reason: 'member not banned',
      note: 'member not banned',
      period: 'member not banned',
    },
  };

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $addToSet: { members: memInComm } },
      { upsert: true, new: true }
    );
    const updatedCommunity2 = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $inc: { membersCnt: 1 } },
      { upsert: true, new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

/**
 * addModeratorToCom
 * @param {string} body contain rules details
 * @param {string} user user information
 * @return {Object} state
 * @function
 */
export async function addModeratorToCom(userID: string, subreddit: string) {
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  const moderator = {
    userID: userID,
    role: 'moderator',
  };

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $addToSet: { moderators: moderator } },
      { upsert: true, new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

export async function removeModeratorFromCom(userID: string, subreddit: string) {
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $pull: { moderators: { userID: userID } } },
      { new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

export async function removeMemberFromCom(userID: string, subreddit: string) {
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $pull: { members: { userID: userID } } },
      { new: true }
    );
    const updatedCommunity2 = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $inc: { membersCnt: -1 } },
      { upsert: true, new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

/**
 * Retrieves the users who are banned in a community.
 *
 * @param {string} communityName - The name of the community.
 * @return {Promise<{status: boolean, users?: {avatar: string, username: string, _id: string, about: string, bannedTime: Date}[]}>} - A promise that resolves to an object with the status of the operation and the banned users, if successful.
 */
export async function getUsersAsBannedInCommunity(communityName: string) {
  // Find the community by name
  const community = await findCommunityByName(communityName);

  // If community is not found, return status false
  if (!community || !community.members) {
    return { status: false };
  }

  // Extract the IDs and bannedTime of banned users
  const bannedUsers = community.members.filter((member) => member.isBanned?.value === true);
  const userIDs = bannedUsers.map((member) => member.userID);
  const bann = bannedUsers.map((member) => member.isBanned);

  // Fetch the banned users from the database, selecting specific attributes
  const users = await UserModel.find({ _id: { $in: userIDs } }).select('avatar username _id about createdAt');

  // Combine banned users with their bannedTime
  const usersWithBannedTime = users.map((user, index) => ({
    ...user.toObject(),
    banInfo: bann[index],
  }));

  return { status: true, users: usersWithBannedTime };
}

/**
 * Retrieves the users who are banned in a community.
 *
 * @param {string} communityName - The name of the community.
 * @return {Promise<{status: boolean, users?: {avatar: string, username: string, _id: string, about: string, bannedTime: Date}[]}>} - A promise that resolves to an object with the status of the operation and the banned users, if successful.
 */
export async function getBannedUserInCommunity(userID: string, communityName: string) {
  // Find the community by name
  const community = await findCommunityByName(communityName);

  // If community is not found, return status false
  if (!community || !community.members) {
    return { status: false };
  }

  // Extract the IDs and bannedTime of banned users
  const bannedUser = community.members.filter(
    (member) => member.isBanned?.value === true && member.userID?.toString() == userID
  );

  // Fetch the banned users from the database, selecting specific attributes
  const user = await UserModel.findOne({ _id: { $in: userID } }).select('avatar username about createdAt');

  // Combine banned users with their bannedTime
  const userWithBanInfo = {
    user,
    banInfo: bannedUser,
  };

  return { status: true, userr: userWithBanInfo };
}

/**
 * Retrieves the users who are banned in a community.
 *
 * @param {string} communityName - The name of the community.
 * @return {Promise<{status: boolean, users?: {avatar: string, username: string, _id: string, about: string, bannedTime: Date}[]}>} - A promise that resolves to an object with the status of the operation and the banned users, if successful.
 */
export async function getUsersAsMutedInCommunity(communityName: string) {
  // Find the community by name
  const community = await findCommunityByName(communityName);

  // If community is not found, return status false
  if (!community || !community.members) {
    return { status: false };
  }

  // Extract the IDs and bannedTime of banned users
  const bannedUsers = community.members.filter((member) => member.isMuted?.value === true);
  const userIDs = bannedUsers.map((member) => member.userID);
  const bann = bannedUsers.map((member) => member.isMuted);

  // Fetch the banned users from the database, selecting specific attributes
  const users = await UserModel.find({ _id: { $in: userIDs } }).select('avatar username _id about createdAt');

  // Combine banned users with their bannedTime
  const usersWithBannedTime = users.map((user, index) => ({
    ...user.toObject(),
    muteInfo: bann[index],
  }));

  return { status: true, users: usersWithBannedTime };
}

/**
 * Retrieves the users who are banned in a community.
 *
 * @param {string} communityName - The name of the community.
 * @return {Promise<{status: boolean, users?: {avatar: string, username: string, _id: string, about: string, bannedTime: Date}[]}>} - A promise that resolves to an object with the status of the operation and the banned users, if successful.
 */
export async function getMutedUserInCommunity(userID: string, communityName: string) {
  // Find the community by name
  const community = await findCommunityByName(communityName);

  // If community is not found, return status false
  if (!community || !community.members) {
    return { status: false };
  }

  // Extract the IDs and bannedTime of banned users
  const bannedUser = community.members.filter(
    (member) => member.isMuted?.value === true && member.userID?.toString() == userID
  );

  // Fetch the banned users from the database, selecting specific attributes
  const user = await UserModel.findOne({ _id: { $in: userID } }).select('avatar username about createdAt');

  // Combine banned users with their bannedTime
  const userWithMuteInfo = {
    user,
    muteInfo: bannedUser,
  };

  return { status: true, userr: userWithMuteInfo };
}

/**
 * Retrieves the IDs and roles of the moderators of a community.
 *
 * @param {string} communityName - The name of the community.
 * @return {Promise<{status: boolean, users?: {avatar: string, username: string, _id: string, about: string, createdAt: Date, modRole: string}[]}>} - A promise that resolves to an object with the status of the operation and the moderators' IDs and roles, if successful.
 */
export async function getCommunityModerators(communityName: string) {
  // Find the community by name
  const community = await findCommunityByName(communityName);

  // If community is not found, return status false
  if (!community || !community.moderators) {
    return { status: false };
  }
  const moderators = community.moderators.filter((member) => member);
  const moderatorsIDs = moderators.map((mod) => mod.userID);
  const modRole = moderators.map((mod) => mod.role);

  const users = await UserModel.find({ _id: { $in: moderatorsIDs } }).select('avatar username _id about createdAt');

  // Combine banned users with their modRole
  const usersWithModRole = users.map((user, index) => ({
    ...user.toObject(),
    modRole: modRole[index],
  }));

  return { status: true, users: usersWithModRole };
}

/**
 * Retrieves the IDs and attributes of the users who are not banned in a community.
 *
 * @param {string} communityName - The name of the community.
 * @return {Promise<{status: boolean, users?: {avatar: string, username: string, _id: string, about: string, createdAt: Date}[]}>} - A promise that resolves to an object with the status of the operation and the not banned users' IDs and attributes, if successful.
 */
export async function getCommunityMembers(communityName: string) {
  // Find the community by name
  const community = await findCommunityByName(communityName);

  // If community is not found, return status false
  if (!community || !community.members) {
    return { status: false };
  }

  // Extract the IDs of not banned users
  const notBannedUsers = community.members.filter((member) => member.isBanned?.value !== true);
  const userIDs = notBannedUsers.map((member) => member.userID);

  // Fetch the not banned users from the database, selecting specific attributes
  const users = await UserModel.find({ _id: { $in: userIDs } }).select('avatar username _id about createdAt');

  return { status: true, users };
}

export async function editCommunityRules(subreddit: string, rules: CommunityRule[]) {
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { communityRules: rules },
      { new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

export async function editCommunityRemovalReasons(subreddit: string, reasons: removalReason[]) {
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { removalReasons: reasons },
      { new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

export async function editCommunityCategories(subreddit: string, cats: CommunityRule[]) {
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(community._id, { categories: cats }, { new: true });
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

export async function editCommunityImageWidgets(subreddit: string, widgets: ImageWidget[]) {
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { ImageWidget: widgets },
      { new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

export async function editCommunityTextWidgets(subreddit: string, widgets: TextWidget[]) {
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { TextWidget: widgets },
      { new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

export async function editCommunityButtonWidgets(subreddit: string, widgets: ButtonWidget[]) {
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { ButtonWidget: widgets },
      { new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

export async function editCommunityPostSettings(subreddit: string, settings: PostSettings) {
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { PostSettings: settings },
      { new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

export async function editCommunityContentControls(subreddit: string, controls: ContentControls) {
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { ContentControls: controls },
      { new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

/**
 *  mark Spam Post
 * @param {string} body contain rules details
 * @param {string} user user information
 * @return {Object} state
 * @function
 */
export async function markSpamPost(userID: string, subreddit: string, postID: string, type: string) {
  const community = await findCommunityByName(subreddit);
  const post = await findPostById(postID);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  if (!post) {
    return {
      status: false,
      error: 'post not found',
    };
  }

  const spamPost = {
    spammerID: post.userID,
    postID: post._id,
    spamType: type,
    spamText: post.textHTML,
  };

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $addToSet: { spamPosts: spamPost } },
      { upsert: true, new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

/**
 *  mark Spam Comment
 * @param {string} body contain rules details
 * @param {string} user user information
 * @return {Object} state
 * @function
 */
export async function markSpamComment(userID: string, subreddit: string, commentID: string, type: string) {
  const community = await findCommunityByName(subreddit);
  const comment = await findCommentById(commentID);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  if (!comment) {
    return {
      status: false,
      error: 'comment not found',
    };
  }

  const spamComment = {
    spammerID: comment.authorId,
    postID: comment.postID,
    commentID: comment._id,
    spamType: type,
    spamText: comment.textHTML,
  };

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $addToSet: { spamComments: spamComment } },
      { upsert: true, new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

export async function approveSpamPost(postID: string, subreddit: string) {
  const community = await findCommunityByName(subreddit);
  const post = await findPostById(postID);

  if (!community) {
    return {
      status: false,
      error: 'community not found',
    };
  }

  if (!post) {
    return {
      status: false,
      error: 'post not found',
    };
  }

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $pull: { spamPosts: { postID: post._id } } },
      { new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

export async function approveSpamComment(commentID: string, subreddit: string) {
  const community = await findCommunityByName(subreddit);
  const comment = await findCommentById(commentID);

  if (!community) {
    return {
      status: false,
      error: 'community not found',
    };
  }

  if (!comment) {
    return {
      status: false,
      error: 'comment not found',
    };
  }

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $pull: { spamComments: { commentID: comment._id } } },
      { new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

/**
 *  mark Spam Post
 * @param {string} body contain rules details
 * @param {string} user user information
 * @return {Object} state
 * @function
 */
export async function addUserToPending(userID: string, subreddit: string) {
  const community = await findCommunityByName(subreddit);
  const user = await UserModel.findById(userID);

  if (!user) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $addToSet: { pendingMembers: user._id } },
      { upsert: true, new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

export async function getSrSearchResultNotAuth(query: string, page: number, limit: number) {
  //user not logged in
  try {
    const communityResults = await CommunityModel.find({
      $or: [{ name: { $regex: query, $options: 'i' } }, { description: { $regex: query, $options: 'i' } }],
      privacyType: 'Public',
    })
      .skip((page - 1) * limit)
      .limit(limit)
      .select('icon name membersCnt description');
    return communityResults;
  } catch (error) {
    return error;
  }
}
export async function getSrSearchResultAuth(query: string, page: number, limit: number, userID: number) {
  //get public communities and private communities that user joined
  //get user from user id
  //get user joined communities from Member array field in user model and filter private communities
  //get the private communities that match the query     $or: [{ name: { $regex: query, $options: 'i' } }, { description: { $regex: query, $options: 'i' } }],

  try {
    const [user, publicCommunities] = await Promise.all([
      UserModel.findById(userID),
      CommunityModel.find({
        $or: [{ name: { $regex: query, $options: 'i' } }, { description: { $regex: query, $options: 'i' } }],
        privacyType: 'Public',
      })
        .skip((page - 1) * limit)
        .limit(limit)
        .select('icon name membersCnt description'),
    ]);

    if (!user) {
      throw new appError('User not found search auth user', 404);
    }

    const userCommunities = await UserModel.aggregate([
      {
        $match: {
          _id: user._id,
        },
      },
      { $unwind: '$member' },
      { $unwind: '$moderators' },
      {
        $lookup: {
          from: 'communities',
          let: { memberId: '$member.communityId', moderatorId: '$moderators.communityId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [{ $eq: ['$_id', '$$memberId'] }, { $eq: ['$_id', '$$moderatorId'] }],
                },
                $or: [{ name: { $regex: query, $options: 'i' } }, { description: { $regex: query, $options: 'i' } }],
              },
            },
          ],
          as: 'joinedCommunities',
        },
      },
      {
        $unwind: '$joinedCommunities',
      },
      {
        $project: {
          name: '$joinedCommunities.name',
          description: '$joinedCommunities.description',
          icon: '$joinedCommunities.icon',
          membersCnt: '$joinedCommunities.membersCnt',
        },
      },
      // Optionally, add pagination
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]);
    const authUserCommunities = userCommunities.concat(publicCommunities);
    console.log(userCommunities);
    console.log(publicCommunities);
    return authUserCommunities;
  } catch (error) {
    return error;
  }
}

/**
 * banMemberToCom
 * @param {string} body contain rules details
 * @param {string} user user information
 * @return {Object} state
 * @function
 */
export async function banUserInCommunity(
  userID: string,
  subreddit: string,
  reason: string,
  note: string,
  period: number
) {
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  const memInComm = {
    userID: userID,
    isMuted: {
      value: false,
      date: new Date(),
      reason: 'member is not muted',
    },
    isBanned: {
      value: true,
      date: new Date(),
      reason: reason,
      note: note,
      period: period,
    },
  };

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $pull: { members: { userID: userID } } },
      { new: true }
    );
    const updatedCommunity2 = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $addToSet: { members: memInComm } },
      { upsert: true, new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

/**
 * unbanMemberToCom
 * @param {string} body contain rules details
 * @param {string} user user information
 * @return {Object} state
 * @function
 */
export async function unbanUserInCommunity(userID: string, subreddit: string) {
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }
  const memInComm = {
    userID: userID,
    isMuted: {
      value: false,
      date: new Date(),
      reason: 'member is not muted',
    },
    isBanned: {
      value: false,
      date: new Date(),
      reason: 'member not banned',
      note: 'member not banned',
      period: 'member not banned',
    },
  };
  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $pull: { members: { userID: userID } } },
      { new: true }
    );
    const updatedCommunity2 = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $addToSet: { members: memInComm } },
      { upsert: true, new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

/**
 * banMemberToCom
 * @param {string} body contain rules details
 * @param {string} user user information
 * @return {Object} state
 * @function
 */
export async function muteUserInCommunity(userID: string, subreddit: string, reason: string) {
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  const memInComm = {
    userID: userID,
    isMuted: {
      value: true,
      date: new Date(),
      reason: reason,
    },
    isBanned: {
      value: false,
      date: new Date(),
      reason: 'member not banned',
      note: 'member not banned',
      period: 'member not banned',
    },
  };

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $pull: { members: { userID: userID } } },
      { new: true }
    );
    const updatedCommunity2 = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $addToSet: { members: memInComm } },
      { upsert: true, new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

/**
 * unbanMemberToCom
 * @param {string} body contain rules details
 * @param {string} user user information
 * @return {Object} state
 * @function
 */
export async function unmuteUserInCommunity(userID: string, subreddit: string) {
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }
  const memInComm = {
    userID: userID,
    isMuted: {
      value: false,
      date: new Date(),
      reason: 'member is not muted',
    },
    isBanned: {
      value: false,
      date: new Date(),
      reason: 'member not banned',
      note: 'member not banned',
      period: 'member not banned',
    },
  };
  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $pull: { members: { userID: userID } } },
      { new: true }
    );
    const updatedCommunity2 = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $addToSet: { members: memInComm } },
      { upsert: true, new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

//get home page posts for logged in and authenticated user

export async function getHomePostsAuth(page: number, limit: number, userID: number, sort: string, topBy: string) {
  //   What is the difference between the different sort options?
  // "Hot" posts are sorted by number of views.
  // "Top" posts are sorted by upvotes but they have an option of sorting by time where you can choose to view within a specific time frame.
  // "Best" is just a normal feed with random sorting.
  // "New" should be sorted according to time (by the most recent) not an option like in "Top".

  let sortCriteria: Record<string, number> = {};
  switch (sort) {
    case 'hot':
      sortCriteria = { insightCnt: -1 };
      break;
  }

  const UserCommunityPosts = await UserModel.aggregate([
    {
      $match: {
        _id: userID,
      },
    },
    { $unwind: '$member' },
    {
      $lookup: {
        from: 'communities',
        localField: 'member.communityId',
        foreignField: '_id',
        as: 'joinedCommunities',
      },
    },
    {
      $unwind: '$joinedCommunities',
    },
  ]);
}

/**
 * Retrieves a random set of posts from public communities for the home page of a not authenticated user.
 *
 * @param {number} page - The page number of the results.
 * @param {number} limit - The maximum number of posts to return per page.
 * @return {Promise<Array<Object>>} A promise that resolves to an array of post objects with properties:
 *   - communityIcon: The icon of the community where the post was made.
 *   - postTitle: The title of the post.
 *   - postTextHTML: The HTML content of the post.
 *   - votesCount: The number of votes the post has received.
 *   - commentsNum: The number of comments the post has.
 *   - attachments: The attachments associated with the post.
 */
export async function getHomePostsNotAuth(page: number, limit: number) {
  const skip = (page - 1) * limit; // Calculate the number of documents to skip

  const randomPosts = await CommunityModel.aggregate([
    {
      $match: {
        privacyType: 'Public',
      },
    },
    {
      //left outer join with posts collection
      $lookup: {
        from: 'posts', //  posts collection
        localField: 'communityPosts', //name of the posts field in the community model
        foreignField: '_id', //name of the _id field in the posts model
        as: 'posts', //name of the posts field in the result
      },
    },
    { $unwind: '$posts' }, // Unwind the posts array
    {
      $match: {
        'posts.title': { $exists: true }, // Filter out posts without title
      },
    },
    { $sample: { size: limit } }, // Limit the number of posts per community
    { $skip: skip }, // Skip documents based on page and limit
    {
      $project: {
        communityIcon: '$icon', // Project community icon
        communityName: '$name', // Project community name
        communityDescription: '$description', // Project community description
        memberCount: '$membersCnt', // Project member count
        postTitle: '$posts.title', // Project post title
        postTextHTML: '$posts.textHTML', // Project post textHTML
        votesCount: '$posts.votesCount', // Project post votesCount
        commentsNum: '$posts.commentsNum', // Project post commentsNum
        attachments: '$posts.attachments', // Project post attachments
      },
    },
  ]);
  return randomPosts;
}

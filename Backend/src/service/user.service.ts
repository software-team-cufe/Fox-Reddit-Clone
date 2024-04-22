import UserModel, { User, Moderator } from '../model/user.model';
import PostModel, { Post } from '../model/posts.model';
import appError from '../utils/appError';
import CommunityModel from '../model/community.model';
import { Types } from 'mongoose';

/**
 * Creates a new user.
 *
 * @param input - The user data to create.
 * @returns A promise that resolves to the created user.
 */
export function createUser(input: Partial<User>) {
  return UserModel.create(input);
}

/**
 * Finds a user by their ID.
 *
 * @param id - The ID of the user to find.
 * @returns A promise that resolves to the user object if found, or null if not found.
 */
export function findUserById(id: string) {
  return UserModel.findById(id);
}

/**
 * Finds a user by their email address.
 *
 * @param email - The email address of the user to find.
 * @returns A promise that resolves to the user object if found, or null if not found.
 */
export function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}
/**
 * Finds a user by their username.
 *
 * @param username - The username of the user to find.
 * @returns A promise that resolves to the user object if found, or null if not found.
 */
// export function findUserByUsername(username: string) {
//   return UserModel.findOne({ username });
// }

export async function findUserByUsername(username: string) {
  try {
    return await UserModel.findOne({ username });
  } catch (error) {
    throw new appError('User not found ', 404); //vague error Re-throw the error to be caught by the caller
  }
}
/**
 * Finds a user ID by username.
 *
 * @param username - The username of the user to find.
 * @returns A promise that resolves to the user object if found, or null if not found.
 */
// export function findUserByUsername(username: string) {
//   return UserModel.findOne({ username });
// }

export async function findUserIdByUsername(username: string) {
  try {
    // Search for the user by username and select only the _id field
    const user = await UserModel.findOne({ username }).select('_id');

    if (user) {
      // If user is found, return the user ID
      return user._id.toString(); // Convert ObjectId to string
    } else {
      // If user is not found, return null
      return null;
    }
  } catch (error) {
    console.error('Error in findUserIdByUsername:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

/**
 * Finds user posts by username with pagination support.
 *
 * @param username - The username of the user to find posts for.
 * @param page - The page number for pagination.
 * @param count - The number of posts per page.
 * @returns post ids of the user by username for the specified page.
 */
export async function userSubmittedPosts(username: string, page: number, count: number) {
  // Calculate skip based on page and count
  const skip = (page - 1) * count;

  // Find the user by username and retrieve their user submitted posts with pagination
  const user = await UserModel.findOne({ username: username }, 'hasPost')
    .lean()
    .populate({
      path: 'hasPost',
      options: { skip: skip, limit: count },
    });

  // If user is not found, throw an error
  if (!user) {
    throw new appError("This user doesn't exist!", 404);
  }

  // Extract the post IDs from the user's submitted posts if it exists
  const postIDs = user.hasPost ? user.hasPost.map((post) => post._id.toString()) : [];

  // Return the post IDs
  return postIDs;
}
/**
 * Finds user posts by username with pagination support.
 *
 * @param {string} username - The username of the user to find posts for.
 * @param {number} page - The page number for pagination.
 * @param {number} count - The number of posts per page.
 * @returns {string[]} post ids of the user by username for the specified page.
 */
export async function userSavedPosts(username: string, page: number, count: number) {
  // Calculate skip based on page and count
  const skip = (page - 1) * count;

  // Find the user by username and retrieve their user submitted posts with pagination
  const user = await UserModel.findOne({ username: username }, 'savedPosts')
    .lean()
    .populate({
      path: 'savedPosts',
      options: { skip: skip, limit: count },
    });

  // If user is not found, throw an error
  if (!user) {
    throw new appError("This user doesn't exist!", 404);
  }

  // Extract the post IDs from the user's saved posts if it exists
  const postIDs = user.savedPosts ? user.savedPosts.map((post) => post._id.toString()) : [];

  // Return the post IDs
  return postIDs;
}
/**
 * Finds user posts by username with pagination support.
 *
 * @param {string} username - The username of the user to find posts for.
 * @param {number} page - The page number for pagination.
 * @param {number} count - The number of posts per page.
 * @returns {string[]} post ids of the user by username for the specified page.
 */
export async function userHiddenPosts(username: string, page: number, count: number) {
  // Calculate skip based on page and count
  const skip = (page - 1) * count;

  // Find the user by username and retrieve their user hidden posts with pagination
  const user = await UserModel.findOne({ username: username }, 'hiddenPosts')
    .lean()
    .populate({
      path: 'hiddenPosts',
      options: { skip: skip, limit: count },
    });

  // If user is not found, throw an error
  if (!user) {
    throw new appError("This user doesn't exist!", 404);
  }

  // Extract the post IDs from the user's hidden posts if it exists
  const postIDs = user.hiddenPosts ? user.hiddenPosts.map((post) => post._id.toString()) : [];

  // Return the post IDs
  return postIDs;
}
/**
 * Finds user comments by username with pagination support.
 *
 * @param username - The username of the user to find comments for.
 * @param page - The page number for pagination.
 * @param count - The number of comments per page.
 * @returns comment ids of the user by username for the specified page.
 */
export async function userCommentsIds(username: string, page: number, count: number) {
  // Calculate skip based on page and count
  const skip = (page - 1) * count;

  // Find the user by username and retrieve their user submitted posts with pagination
  const user = await UserModel.findOne({ username: username }, 'hasComment')
    .lean()
    .populate({
      path: 'hasComment',
      options: { skip: skip, limit: count },
    });

  // If user is not found, throw an error
  if (!user) {
    throw new appError("This user doesn't exist!", 404);
  }

  // Extract the comment IDs from the user's comments if it exists
  const commentsIDS = user.hasComment ? user.hasComment.map((comment) => comment._id.toString()) : [];
  // Return the comment IDs
  return commentsIDS;
}

/**
 * Finds user replies by username.
 *
 * @param username - The username of the user to find posts for.
 * @returns replies ids of the user  by username.
 */
export async function userRepliesIds(username: string, page: number, count: number) {
  // Calculate skip based on page and count
  const skip = (page - 1) * count;

  // Find the user by username and retrieve their user submitted posts with pagination
  const user = await UserModel.findOne({ username: username }, 'hasReply')
    .lean()
    .populate({
      path: 'hasReply',
      options: { skip: skip, limit: count },
    });

  // If user is not found, throw an error
  if (!user) {
    throw new appError("This user doesn't exist!", 404);
  }

  // Extract the comment IDs from the user's comments if it exists
  const commentsIDS = user.hasReply ? user.hasReply.map((comment) => comment._id.toString()) : [];
  // Return the comment IDs
  return commentsIDS;
}
/**
 * Retrieves the IDs of the communities that a user is a member of.
 *
 * @param {string} userID - The ID of the user.
 * @return {Promise<string[]>} An array of community IDs that the user is a member of.
 */
export async function getCommunitiesIdOfUserAsMemeber(username: string, page: number, count: number) {
  // Calculate skip based on page and count
  const skip = (page - 1) * count;

  // Find the user by ID and retrieve their user as member of communities ID
  const user = await UserModel.findOne({ username: username }, 'member')
    .lean()
    .populate({
      path: 'member',
      options: { skip: skip, limit: count },
    });

  // If user is not found, throw an error
  if (!user) {
    throw new appError("This user doesn't exist!", 404);
  }
  console.log('inside');
  console.log(user.member);
  if (!user.member) {
    return [];
  }
  // Extract the community IDs from the user's member if it exists
  const communityIDs = user.member.map((member) => member.communityId);

  console.log('outside');
  console.log(communityIDs);
  console.log('outside2');

  const communities = await CommunityModel.find({ _id: { $in: communityIDs } });

  // Return the post IDs
  return communities;
}
/**
 * Retrieves the IDs of the communities that a user is a moderator of.
 *
 * @param {string} userID - The ID of the user.
 * @return {Promise<string[]>} An array of community IDs that the user is a moderator of.
 */
export async function getCommunitiesIdOfUserAsModerator(username: string, page: number, count: number) {
  // Calculate skip based on page and count
  const skip = (page - 1) * count;

  // Find the user by ID and retrieve their user as moderator of communities ID
  const user = await UserModel.findOne({ username: username }, 'moderators')
    .lean()
    .populate({
      path: 'moderators',
      options: { skip: skip, limit: count },
    });

  // If user is not found, throw an error
  if (!user) {
    throw new appError("This user doesn't exist!", 404);
  }
  console.log('inside');
  console.log(user.member);
  if (!user.moderators) {
    return [];
  }
  // Extract the community IDs from the user's member if it exists
  const communityIDs = user.moderators.map((member) => member.communityId);

  console.log('outside');
  console.log(communityIDs);
  console.log('outside2');

  const communities = await CommunityModel.find({ _id: { $in: communityIDs } });

  return communities;
}

/**
 * Add user to community
 * @param {String} (username)
 * @param {String} (communityID)
 * @returns {object} mentions
 * @function
 */
export async function addUserToComm(userID: string, communityID: string) {
  const user = await UserModel.findById(userID);
  if (!user) {
    return {
      status: false,
      error: 'user not found',
    };
  }
  const userModerator = {
    communityId: communityID,
    role: 'creator',
  };
  const userMember = {
    communityId: communityID,
    isMuted: false,
    isBanned: false,
  };

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { $addToSet: { moderators: userModerator } },
      { upsert: true, new: true }
    );
    const updatedUser1 = await UserModel.findByIdAndUpdate(
      user._id,
      { $addToSet: { member: userMember } },
      { upsert: true, new: true }
    );
    if (!user.moderators) {
      return {
        status: false,
        error: 'error in adding user',
      };
    }
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

import appError from '../utils/appError';
import CommunityModel, { Community } from '../model/community.model';
import { Post } from '../model/posts.model';
import { findUserById } from './user.service';

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
    },
    isBanned: {
      value: false,
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
    },
    isBanned: {
      value: false,
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
 * Checks if a user is banned or not in a community and performs the corresponding operation.
 *
 * @param {string} userID - The ID of the user.
 * @param {string} subreddit - The name of the subreddit.
 * @param {string} operation - The operation to perform. Possible values are 'ban' or 'unban'.
 * @return {Promise<{status: boolean, error?: string}>} - A promise that resolves to an object with the status of the operation. If the operation fails, an error message is also included.
 */
export async function updateMemberBanStatusInCommunity(userID: string, subreddit: string, operation: string) {
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'Community not found',
    };
  }

  const memInComm = {
    userID: userID,
    isMuted: {
      value: false,
    },
    isBanned: {
      value: operation === 'ban',
      date: new Date(),
    },
  };

  try {
    let updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $pull: { members: { userID: userID } } },
      { new: true }
    );
    updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $addToSet: { members: memInComm } },
      { upsert: true, new: true }
    );

    return {
      status: true,
    };
  } catch (error) {
    console.error('Error updating member ban status:', error);
    return {
      status: false,
      error: 'Failed to update member ban status',
    };
  }
}
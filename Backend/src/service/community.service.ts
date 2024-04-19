import appError from '../utils/appError';
import CommunityModel from '../model/community.model';
import { Post } from '../model/posts.model';
import { User } from '../model/user.model';
import { findUserById } from './user.service';

export async function findCommunityByName(subreddit: string) {
  try {
    return await CommunityModel.findOne({ subreddit });
  } catch (error) {
    console.error('Error in findCommunityByName:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
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
  const new_community = {
    privacyType: privacyType,
    over18: over18,
    moderators: mods,
    members: mems,
  };
  try {
    await CommunityModel.create(new_community);
    return {
      status: true,
      response: 'subreddit created successfully',
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
 * Validation of subreddit's attributes before creation
 * @param {string} body contain rules details
 * @return {Boolean} state
 * @function
 */
export async function creationValidation(name: string, type: string, over18: boolean) {
  if (name || name.substring(0, 2) !== 't5' || !type || over18 === null) return false;
  return true;
}

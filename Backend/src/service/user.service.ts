import UserModel, { User, Moderator } from '../model/user.model';
import PostModel, { Post } from '../model/posts.model';
import appError from '../utils/appError';
import CommunityModel from '../model/community.model';
import { findCommunityByName } from '../service/community.service';
import { Types } from 'mongoose';
import _ from 'lodash';

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
 * Retrieves the names of the communities that a user is a member of.
 *
 * @param {string} username - The username of the user.
 * @param {number} page - The page number for pagination.
 * @param {number} count - The number of items per page.
 * @return {Promise<string[]>} An array of community names that the user is a member of.
 */
export async function getCommunitiesIdOfUserAsMemeber(username: string) {
  // Find the user by ID and retrieve their user as member of communities ID
  const user = await findUserByUsername(username);

  // If user is not found, throw an error
  if (!user) {
    throw new appError("This user doesn't exist!", 404);
  }

  if (!user.member) {
    return [];
  }

  // Extract the community IDs from the user's member if it exists
  const communityIDs = user.member.map((member) => member.communityId);

  // Fetch the communities from the database using the paginated community IDs
  const communities = await CommunityModel.find({ _id: { $in: communityIDs } });

  // Extract community names from fetched communities
  const communityNames = communities.map((community) => community.name);

  return communityNames;
}

/**
 * Retrieves the IDs of the communities that a user is a moderator of.
 *
 * @param {string} userID - The ID of the user.
 * @return {Promise<string[]>} An array of community IDs that the user is a moderator of.
 */
export async function getCommunitiesIdOfUserAsModerator(username: string) {
  // Find the user by ID and retrieve their user as member of communities ID
  const user = await findUserByUsername(username);

  // If user is not found, throw an error
  if (!user) {
    throw new appError("This user doesn't exist!", 404);
  }
  if (!user.moderators) {
    return [];
  }
  //Extract the community IDs from the user's member if it exists
  const communityIDs = user.moderators.map((member) => member.communityId);

  const communities = await CommunityModel.find({ _id: { $in: communityIDs } });

  // Extract community names from fetched communities
  const communityNames = communities.map((community) => community.name);

  return communityNames;
}

/**
 * Retrieves the IDs of the communities that a user is a creator of.
 *
 * @param {string} userID - The ID of the user.
 * @return {Promise<string[]>} An array of community IDs that the user is a creator of.
 */
export async function getCommunitiesIdOfUserAsCreator(username: string) {
  // Find the user by ID and retrieve their user as member of communities ID
  const user = await findUserByUsername(username);

  // If user is not found, throw an error
  if (!user) {
    throw new appError("This user doesn't exist!", 404);
  }

  // If user has no moderators, return an empty array
  if (!user.moderators) {
    return [];
  }

  // Filter out moderators with role 'creator' and extract the community IDs
  const communityIDs = user.moderators
    .filter((moderator) => moderator.role === 'creator')
    .map((moderator) => moderator.communityId);

  // Find communities based on the extracted community IDs
  const communities = await CommunityModel.find({ _id: { $in: communityIDs } });

  // Extract community names from fetched communities
  const communityNames = communities.map((community) => community.name);

  return communityNames;
}

/**
 * Retrieves the IDs of the communities that a user favaorite.
 *
 * @param {string} userID - The ID of the user.
 * @return {Promise<string[]>} An array of community names.
 */
export async function getFavoriteCommunitiesOfUser(username: string) {
  // Find the user by ID and retrieve their user as member of communities ID
  const user = await findUserByUsername(username);

  // If user is not found, throw an error
  if (!user) {
    throw new appError("This user doesn't exist!", 404);
  }
  if (!user.favorites) {
    return [];
  }

  const communities = await CommunityModel.find({ _id: { $in: user.favorites } });

  // Extract community names from fetched communities
  const communityNames = communities.map((community) => community.name);

  return communityNames;
}

/**
 * Add user to community
 * @param {String} (username)
 * @param {String} (communityID)
 * @returns {object} mentions
 * @function
 */
export async function addMemberToUser(userID: string, communityName: string) {
  const community = await CommunityModel.findOne({ name: communityName });
  if (!community) {
    return {
      status: false,
      error: 'community not found',
    };
  }
  const communityID = community._id.toString();
  const user = await UserModel.findById(userID);
  if (!user) {
    return {
      status: false,
      error: 'user not found',
    };
  }
  const userMember = {
    communityId: communityID,
    isMuted: false,
    isBanned: false,
  };

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { $addToSet: { member: userMember } },
      { upsert: true, new: true }
    );
    if (!user.member) {
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

/**
 * Add Moderator to community
 * @param {String} (username)
 * @param {String} (communityID)
 * @returns {object} mentions
 * @function
 */
export async function addModeratorToUser(userID: string, communityName: string) {
  const community = await CommunityModel.findOne({ name: communityName });
  if (!community) {
    return {
      status: false,
      error: 'community not found',
    };
  }
  const communityID = community._id.toString();
  const user = await UserModel.findById(userID);
  if (!user) {
    return {
      status: false,
      error: 'user not found',
    };
  }
  const userModerator = {
    communityId: communityID,
    role: 'moderator',
  };

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { $addToSet: { moderators: userModerator } },
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

/**
 * Add creater to community
 * @param {String} (username)
 * @param {String} (communityID)
 * @returns {object} mentions
 * @function
 */
export async function addCreatorToUser(userID: string, communityID: string) {
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
    if (!user.moderators || !user.member) {
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

/**
 * remove user from community
 * @param {String} (username)
 * @param {String} (communityID)
 * @returns {object} mentions
 * @function
 */
export async function removeMemberFromUser(userID: string, subreddit: string) {
  const user = await UserModel.findById(userID);
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }
  if (!user) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { $pull: { member: { communityId: community._id.toHexString() } } },
      { upsert: true, new: true }
    );
    if (!user.member) {
      return {
        status: false,
        error: 'error in removing user',
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

/**
 * remove moderator from community
 * @param {String} (username)
 * @param {String} (communityID)
 * @returns {object} mentions
 * @function
 */
export async function removeModeratorFromUser(userID: string, subreddit: string) {
  const user = await UserModel.findById(userID);
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }
  if (!user) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { $pull: { moderators: { communityId: community._id.toHexString() } } },
      { upsert: true, new: true }
    );
    if (!user.member) {
      return {
        status: false,
        error: 'error in removing user',
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

/**
 * addMemberToCom
 * @param {string} body
 * @param {string} user user information
 * @return {Object} state
 * @function
 */
export async function addPostVoteToUser(userID: string, postID: string, type: number) {
  const user = await findUserById(userID);

  if (!user) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  const vote = {
    postID: postID,
    type: type,
  };
  const temp = user.postVotes;
  try {
    const updateduser = await UserModel.findByIdAndUpdate(
      user._id,
      {
        $addToSet: { postVotes: vote },
      },
      { upsert: true, new: true }
    );
    const temp2 = updateduser.postVotes;
    const isSame = _.isEqual(temp, temp2);

    if (isSame) {
      const updatedPost = await UserModel.findByIdAndUpdate(
        user._id,
        {
          $pull: { postVotes: vote },
        },
        { upsert: true, new: true }
      );
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

/**
 * addMemberToCom
 * @param {string} body
 * @param {string} user user information
 * @return {Object} state
 * @function
 */
export async function addCommentVoteToUser(userID: string, commentID: string, type: number) {
  const user = await findUserById(userID);

  if (!user) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  const vote = {
    commentID: commentID,
    type: type,
  };
  const temp = user.commentVotes;
  try {
    const updateduser = await UserModel.findByIdAndUpdate(
      user._id,
      {
        $addToSet: { commentVotes: vote },
      },
      { upsert: true, new: true }
    );
    const temp2 = updateduser.commentVotes;
    const isSame = _.isEqual(temp, temp2);

    if (isSame) {
      const updated = await UserModel.findByIdAndUpdate(
        user._id,
        {
          $pull: { commentVotes: vote },
        },
        { upsert: true, new: true }
      );
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

/**
 * Checks if a user is banned or not in a community and performs the corresponding operation.
 *
 * @param {string} userID - The ID of the user.
 * @param {string} communityName - The name of the community.
 * @param {string} operation - The operation to perform. Possible values are 'ban' or 'unban'.
 * @return {Promise<{status: boolean, error?: string}>} - A promise that resolves to an object with the status of the operation. If the operation fails, an error message is also included.
 */
export async function updateMemberBanStatusInUser(userID: string, communityName: string, operation: string) {
  const community = await CommunityModel.findOne({ name: communityName });
  if (!community) {
    return {
      status: false,
      error: 'Community not found',
    };
  }

  const communityID = community._id.toString();
  const user = await UserModel.findById(userID);
  if (!user) {
    return {
      status: false,
      error: 'User not found',
    };
  }

  const userMember = {
    communityId: communityID,
    isMuted: false,
    isBanned: operation === 'ban',
  };

  try {
    let updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { $pull: { member: { communityId: communityID } } },
      { upsert: true, new: true }
    );

    updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { $addToSet: { member: userMember } },
      { upsert: true, new: true }
    );

    if (!updatedUser.member) {
      return {
        status: false,
        error: 'Error in updating user member status',
      };
    }
  } catch (error) {
    return {
      status: false,
      error: 'Error updating user: ' + error,
    };
  }

  return {
    status: true,
  };
}

/**
 * Add favorite to user
 * @param {String} (username)
 * @param {String} (communityID)
 * @returns {object} mentions
 * @function
 */
export async function addFavoriteToUser(userID: string, communityName: string) {
  const community = await CommunityModel.findOne({ name: communityName });
  if (!community) {
    return {
      status: false,
      error: 'community not found',
    };
  }
  const user = await UserModel.findById(userID);
  if (!user) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { $addToSet: { favorites: community._id } },
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
 * remove favorite to user
 * @param {String} (username)
 * @param {String} (communityID)
 * @returns {object} mentions
 * @function
 */
export async function removeFavoriteFromUser(userID: string, communityName: string) {
  const community = await CommunityModel.findOne({ name: communityName });
  if (!community) {
    return {
      status: false,
      error: 'community not found',
    };
  }
  const user = await UserModel.findById(userID);
  if (!user) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { $pull: { favorites: community._id } },
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

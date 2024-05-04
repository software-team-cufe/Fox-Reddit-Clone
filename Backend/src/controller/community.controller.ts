import {
  findCommunityByName,
  findCommunityByID,
  getUserCommunities,
  createSubreddit,
  addMemberToCom,
  addModeratorToCom,
  addUserToPending,
  removeMemberFromCom,
  removeModeratorFromCom,
  getUsersAsBannedInCommunity,
  getUsersAsMutedInCommunity,
  getCommunityModerators,
  getCommunityMembers,
  editCommunityRules,
  editCommunityRemovalReasons,
  editCommunityCategories,
  markSpamPost,
  markSpamComment,
  approveSpamPost,
  approveSpamComment,
  banUserInCommunity,
  unbanUserInCommunity,
  muteUserInCommunity,
  unmuteUserInCommunity,
  getBannedUserInCommunity,
  getMutedUserInCommunity,
} from '../service/community.service';
import {
  getCommunitiesIdOfUserAsMemeber,
  getCommunitiesIdOfUserAsModerator,
  getCommunitiesIdOfUserAsCreator,
  getFavoriteCommunitiesOfUser,
  addMemberToUser,
  addCreatorToUser,
  addModeratorToUser,
  addFavoriteToUser,
  removeMemberFromUser,
  removeModeratorFromUser,
  removeFavoriteFromUser,
  findUserById,
  findUserByUsername,
  banUserInUser,
  unbanUserInUser,
  muteUserInUser,
  unmuteUserInUser,
} from '../service/user.service';

import { Community, CommunityModel } from '../model/community.model';
import { Moderator, UserModel } from '../model/user.model';
import { NextFunction, Request, Response } from 'express';
import { findPostById } from '../service/post.service';
import { findCommentById } from '../service/comment.service';
import PostModel from '../model/posts.model';
import CommentModel from '../model/comments.model';
import appError from '../utils/appError';

/**
 * Retrieves the communities that a user is a member of.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the communities are retrieved and sent in the response.
 */
export async function getCommunityOfUserAsMemeberHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const user = res.locals.user;
    // Check if user is missing or invalid
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }
    const communities = await getCommunitiesIdOfUserAsMemeber(user.username);

    res.status(200).json({ communities });
  } catch (error) {
    console.error('Error in getCommunityOfUserHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/**
 * Handles the request to get the communities of a user as a moderator.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise that resolves when the function is complete.
 */
export async function getCommunityOfUserAsModeratorHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const user = res.locals.user;
    // Check if user is missing or invalid
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }
    const communities = await getCommunitiesIdOfUserAsModerator(user.username);

    res.status(200).json({ communities });
  } catch (error) {
    console.error('Error in getCommunityOfUserHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/**
 * Handles the request to get the communities of a user as a creator.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise that resolves when the function is complete.
 */
export async function getCommunityOfUserAsCreatorHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const user = res.locals.user;
    // Check if user is missing or invalid
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }
    const communities = await getCommunitiesIdOfUserAsCreator(user.username);

    res.status(200).json({ communities });
  } catch (error) {
    console.error('Error in getCommunityOfUserAsCreatorHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/**
 * Handles the request to get the community name.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise that resolves when the function is complete.
 */
export async function getCommunityNameHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const user = res.locals.user;
    const communityID = req.body.communityID;
    const community = await findCommunityByID(communityID);
    // Check if user is missing or invalid
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    // Check if subreddit is missing or invalid
    if (!community) {
      return res.status(402).json({
        error: 'Community not found',
      });
    }
    const communityName = community.name;
    res.status(200).json({ communityName });
  } catch (error) {
    console.error('Error in getCommunityOfUserAsCreatorHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/**
 * Create subreddit handler.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise of a void.
 */
export async function createSubredditHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  // Get user ID from request
  const userID = res.locals.user._id;
  const user = res.locals.user;

  // Check if user is missing or invalid
  if (!user) {
    return res.status(401).json({
      error: 'Access token is missing or invalid',
    });
  }
  const comm = await findCommunityByName(req.body.name);
  if (comm) {
    return res.status(403).json({
      error: 'Community name already taken',
    });
  }
  if (user.canCreateSubreddit === false) {
    return res.status(403).json({
      error: 'User can not create subreddit',
    });
  }
  // Create subreddit
  try {
    const result = await createSubreddit(req.body.name, req.body.type, req.body.over18, userID);

    // Handle creation failure
    if (!result.status) {
      return res.status(500).json({
        error: result.error,
      });
    }

    if (!result.createdCommunity) {
      return res.status(400).json({
        error: result.error,
      });
    }
    // Add user to subreddit
    const updateUser = await addCreatorToUser(user, result.createdCommunity._id.toString());

    // Handle user addition failure
    if (updateUser.status === false) {
      return res.status(500).json({
        error: updateUser.error,
      });
    }
    const community = result.createdCommunity;
    // Return success response
    return res.status(200).json({
      community,
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error creating subreddit:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

/**
 * Subscribe subreddit handler.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise of a void.
 */
export async function subscribeCommunityHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  // Get user ID from request
  const userID = res.locals.user._id;
  const user = res.locals.user;
  const subreddit = req.params.subreddit;
  const community = await findCommunityByName(subreddit);

  // Check if subreddit is missing or invalid
  if (!community) {
    return res.status(402).json({
      error: 'Community not found',
    });
  }

  if (community.privacyType === 'Private') {
    const updateUser = await addUserToPending(userID, subreddit);
    if (updateUser.status === false) {
      return res.status(500).json({
        error: updateUser.error,
      });
    }
    // Return success response
    return res.status(200).json({
      status: 'succeeded',
    });
  }
  // Check if user is missing or invalid
  if (!user) {
    return res.status(401).json({
      error: 'Access token is missing or invalid',
    });
  }
  try {
    const updateUser = await addMemberToUser(userID, subreddit);
    const updateUser1 = await addMemberToCom(userID, subreddit);

    // Handle user addition failure
    if (updateUser.status === false || updateUser1.status === false) {
      return res.status(500).json({
        error: updateUser.error,
      });
    }
    // Return success response
    return res.status(200).json({
      status: 'succeeded',
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error adding member to subreddit:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

/**
 * unsubscribe subreddit handler.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise of a void.
 */
export async function unsubscribeCommunityHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  // Get user ID from request
  const userID = res.locals.user._id;
  const user = res.locals.user;
  const subreddit = req.params.subreddit;
  const community = await findCommunityByName(subreddit);

  // Check if subreddit is missing or invalid
  if (!community) {
    return res.status(402).json({
      error: 'Community not found',
    });
  }

  // Check if user is missing or invalid
  if (!user) {
    return res.status(401).json({
      error: 'Access token is missing or invalid',
    });
  }
  try {
    const updateUser = await removeMemberFromUser(userID, subreddit);
    const updateUser1 = await removeMemberFromCom(userID, subreddit);

    // Handle user addition failure
    if (updateUser.status === false || updateUser1.status === false) {
      return res.status(500).json({
        error: updateUser.error,
      });
    }
    // Return success response
    return res.status(200).json({
      status: 'succeeded',
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error removing member from subreddit:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

export async function getCommunityHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const userID = res.locals.user._id;
    const user = res.locals.user;
    const subreddit = req.params.subreddit;
    const community = await findCommunityByName(subreddit);

    // Check if user is missing or invalid
    if (!user) {
      return res.status(401).json({
        error: 'Access token is missing or invalid',
      });
    }
    if (!community) {
      return res.status(402).json({
        error: 'Community not found',
      });
    }
    return res.status(200).json({
      community,
    });
  } catch (error) {
    console.error('Error in getCommunityInfoHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

export async function getAllCommunityHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const userID = res.locals.user._id;
    const user = res.locals.user;

    // Check if user is missing or invalid
    if (!user) {
      return res.status(401).json({
        error: 'Access token is missing or invalid',
      });
    }

    const communities = await CommunityModel.aggregate([
      {
        $project: {
          name: 1,
          categories: 1,
          count: { $size: '$members' },
          icon: 1,
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    return res.status(200).json({
      communities,
    });
  } catch (error) {
    console.error('Error in getCommunityInfoHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/**
 * ban handler.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise of a void.
 */
export async function banHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  // Get user ID from request
  const userID = res.locals.user._id;
  const user = res.locals.user;
  const subreddit = req.params.subreddit;
  const community = await findCommunityByName(subreddit);
  const username = req.params.username;
  const banned = await findUserByUsername(username);
  const reason = req.body.reason;
  const note = req.body.note;
  const period = req.body.period;

  // Check if subreddit is missing or invalid
  if (!community) {
    return res.status(402).json({
      error: 'Community not found',
    });
  }

  // Check if user is missing or invalid
  if (!user) {
    return res.status(401).json({
      error: 'Access token is missing or invalid',
    });
  }

  // Check if user is missing or invalid
  if (!banned) {
    return res.status(401).json({
      error: 'User not found',
    });
  }

  let isMod = false;

  if (community.moderators) {
    community.moderators.forEach((el) => {
      // Check if userID is defined and equal to commModerator
      if (el.userID?.toString() === user._id?.toString()) isMod = true;
    });
  }
  if (isMod === false) {
    return res.status(404).json({ status: 'error', message: 'Members can not ban other members' });
  }
  const bannedID = banned._id.toString();
  try {
    const updateUser = await banUserInCommunity(bannedID, subreddit, reason, note, period);
    const updateUser2 = await banUserInUser(bannedID, subreddit, reason, note, period);
    // Handle user addition failure
    if (updateUser.status === false || updateUser2.status === false) {
      return res.status(500).json({
        error: 'Error in banning user',
      });
    }
    // Return success response
    return res.status(200).json({
      status: 'succeeded',
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error banning member in subreddit:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

/**
 * unban handler.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise of a void.
 */
export async function unbanHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  // Get user ID from request
  const userID = res.locals.user._id;
  const user = res.locals.user;
  const subreddit = req.params.subreddit;
  const community = await findCommunityByName(subreddit);
  const username = req.params.username;
  const banned = await findUserByUsername(username);

  // Check if subreddit is missing or invalid
  if (!community) {
    return res.status(402).json({
      error: 'Community not found',
    });
  }

  // Check if user is missing or invalid
  if (!user) {
    return res.status(401).json({
      error: 'Access token is missing or invalid',
    });
  }

  // Check if user is missing or invalid
  if (!banned) {
    return res.status(401).json({
      error: 'User not found',
    });
  }

  let isMod = false;

  if (community.moderators) {
    community.moderators.forEach((el) => {
      // Check if userID is defined and equal to commModerator
      if (el.userID?.toString() === user._id?.toString()) isMod = true;
    });
  }
  if (isMod === false) {
    return res.status(404).json({ status: 'error', message: 'Members can not ban other members' });
  }
  const bannedID = banned._id.toString();
  try {
    const updateUser = await unbanUserInCommunity(bannedID, subreddit);
    const updateUser2 = await unbanUserInUser(bannedID, subreddit);
    // Handle user addition failure
    if (updateUser.status === false || updateUser2.status === false) {
      return res.status(500).json({
        error: 'Error in banning user',
      });
    }
    // Return success response
    return res.status(200).json({
      status: 'succeeded',
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error banning member in subreddit:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

/**
 * mute handler.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise of a void.
 */
export async function muteHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  // Get user ID from request
  const userID = res.locals.user._id;
  const user = res.locals.user;
  const subreddit = req.params.subreddit;
  const community = await findCommunityByName(subreddit);
  const username = req.params.username;
  const banned = await findUserByUsername(username);
  const reason = req.body.reason;

  // Check if subreddit is missing or invalid
  if (!community) {
    return res.status(402).json({
      error: 'Community not found',
    });
  }

  // Check if user is missing or invalid
  if (!user) {
    return res.status(401).json({
      error: 'Access token is missing or invalid',
    });
  }

  // Check if user is missing or invalid
  if (!banned) {
    return res.status(401).json({
      error: 'User not found',
    });
  }

  let isMod = false;

  if (community.moderators) {
    community.moderators.forEach((el) => {
      // Check if userID is defined and equal to commModerator
      if (el.userID?.toString() === user._id?.toString()) isMod = true;
    });
  }
  if (isMod === false) {
    return res.status(404).json({ status: 'error', message: 'Members can not mute other members' });
  }
  const bannedID = banned._id.toString();
  try {
    const updateUser = await muteUserInCommunity(bannedID, subreddit, reason);
    const updateUser2 = await muteUserInUser(bannedID, subreddit, reason);
    // Handle user addition failure
    if (updateUser.status === false || updateUser2.status === false) {
      return res.status(500).json({
        error: 'Error in muting user',
      });
    }
    // Return success response
    return res.status(200).json({
      status: 'succeeded',
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error muting member in subreddit:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

/**
 * unban handler.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise of a void.
 */
export async function unmuteHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  // Get user ID from request
  const userID = res.locals.user._id;
  const user = res.locals.user;
  const subreddit = req.params.subreddit;
  const community = await findCommunityByName(subreddit);
  const username = req.params.username;
  const banned = await findUserByUsername(username);

  // Check if subreddit is missing or invalid
  if (!community) {
    return res.status(402).json({
      error: 'Community not found',
    });
  }

  // Check if user is missing or invalid
  if (!user) {
    return res.status(401).json({
      error: 'Access token is missing or invalid',
    });
  }

  // Check if user is missing or invalid
  if (!banned) {
    return res.status(401).json({
      error: 'User not found',
    });
  }

  let isMod = false;

  if (community.moderators) {
    community.moderators.forEach((el) => {
      // Check if userID is defined and equal to commModerator
      if (el.userID?.toString() === user._id?.toString()) isMod = true;
    });
  }
  if (isMod === false) {
    return res.status(404).json({ status: 'error', message: 'Members can not mute other members' });
  }
  const bannedID = banned._id.toString();
  try {
    const updateUser = await unmuteUserInCommunity(bannedID, subreddit);
    const updateUser2 = await unmuteUserInUser(bannedID, subreddit);
    // Handle user addition failure
    if (updateUser.status === false || updateUser2.status === false) {
      return res.status(500).json({
        error: 'Error in unmuting user',
      });
    }
    // Return success response
    return res.status(200).json({
      status: 'succeeded',
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error unmuting member in subreddit:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

/**
 * Join Moderaor handler.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise of a void.
 */
export async function joinModeratorHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  // Get user ID from request
  const userID = res.locals.user._id;
  const user = res.locals.user;
  const subreddit = req.params.subreddit;
  const community = await findCommunityByName(subreddit);

  // Check if user is missing or invalid
  if (!user) {
    return res.status(401).json({
      error: 'Access token is missing or invalid',
    });
  }

  // Check if subreddit is missing or invalid
  if (!community) {
    return res.status(402).json({
      error: 'Community not found',
    });
  }

  try {
    const updateUser = await addModeratorToUser(userID, subreddit);
    const updateUser1 = await addModeratorToCom(userID, subreddit);

    // Handle user addition failure
    if (updateUser.status === false || updateUser1.status === false) {
      return res.status(500).json({
        error: updateUser.error,
      });
    }
    // Return success response
    return res.status(200).json({
      status: 'succeeded',
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error member joining moderation:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

/**
 * leave Moderaor handler.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise of a void.
 */
export async function leaveModeratorHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  // Get user ID from request
  const userID = res.locals.user._id;
  const user = res.locals.user;
  const subreddit = req.params.subreddit;
  const community = await findCommunityByName(subreddit);

  // Check if user is missing or invalid
  if (!user) {
    return res.status(401).json({
      error: 'Access token is missing or invalid',
    });
  }

  // Check if subreddit is missing or invalid
  if (!community) {
    return res.status(402).json({
      error: 'Community not found',
    });
  }

  try {
    const updateUser = await removeModeratorFromUser(userID, subreddit);
    const updateUser1 = await removeModeratorFromCom(userID, subreddit);

    // Handle user addition failure
    if (updateUser.status === false || updateUser1.status === false) {
      return res.status(500).json({
        error: updateUser.error,
      });
    }
    // Return success response
    return res.status(200).json({
      status: 'succeeded',
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error member joining moderation:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

/**
 * Retrieves the list of users who are banned in a community.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the function is complete.
 */
export async function getUsersIsbannedIncommunityHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const user = res.locals.user;
    const commName = req.params.subreddit;
    if (!commName) {
      return res.status(400).json({
        status: 'failed',
        message: 'Community not found',
      });
    }

    // Check if user is missing or invalid
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    const usersResult = await getUsersAsBannedInCommunity(commName);
    if (usersResult.status === true) {
      return res.status(200).json({ status: 'success', users: usersResult.users });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'error in get banned users',
      });
    }
  } catch (error) {
    console.error('Error in getUsersIsbannedIncommunityHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/**
 * Retrieves the list of users who are banned in a community.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the function is complete.
 */
export async function getBannedMemberHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const user = res.locals.user;
    const subreddit = req.params.subreddit;
    const username = req.params.username;
    const banned = await findUserByUsername(username);

    if (!subreddit) {
      return res.status(400).json({
        status: 'failed',
        message: 'Community not found',
      });
    }

    // Check if user is missing or invalid
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    // Check if user is missing or invalid
    if (!banned) {
      return res.status(400).json({
        status: 'failed',
        message: 'user not found',
      });
    }
    const bannedID = banned._id.toString();
    const userResult = await getBannedUserInCommunity(bannedID, subreddit);
    if (userResult.status === true) {
      const user = userResult.userr;
      return res.status(200).json({ user });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'error in get banned users',
      });
    }
  } catch (error) {
    console.error('Error in getBannedUserInCommunity:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/**
 * Retrieves the list of users who are banned in a community.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the function is complete.
 */
export async function getUsersIsmutedIncommunityHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const user = res.locals.user;
    const commName = req.params.subreddit;
    if (!commName) {
      return res.status(400).json({
        status: 'failed',
        message: 'Community not found',
      });
    }

    // Check if user is missing or invalid
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    const usersResult = await getUsersAsMutedInCommunity(commName);
    if (usersResult.status === true) {
      return res.status(200).json({ status: 'success', users: usersResult.users });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'error in get muted users',
      });
    }
  } catch (error) {
    console.error('Error in getUsersIsmutedIncommunityHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/**
 * Retrieves the list of users who are banned in a community.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the function is complete.
 */
export async function getMutedMemberHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const user = res.locals.user;
    const subreddit = req.params.subreddit;
    const username = req.params.username;
    const banned = await findUserByUsername(username);

    if (!subreddit) {
      return res.status(400).json({
        status: 'failed',
        message: 'Community not found',
      });
    }

    // Check if user is missing or invalid
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    // Check if user is missing or invalid
    if (!banned) {
      return res.status(400).json({
        status: 'failed',
        message: 'user not found',
      });
    }
    const bannedID = banned._id.toString();
    const userResult = await getMutedUserInCommunity(bannedID, subreddit);
    if (userResult.status === true) {
      const user = userResult.userr;
      return res.status(200).json({ user });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'error in get Muted user',
      });
    }
  } catch (error) {
    console.error('Error in getMutedUserInCommunity:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/**
 * Retrieves the list of moderators for a given community.
 *
 * @param {Request} req - The request object containing the user's access token.
 * @param {Response} res - The response object used to send the list of moderators.
 * @return {Promise<void>} A promise that resolves when the list of moderators is sent.
 *                         If the access token is missing or invalid, a 400 error is returned.
 *                         If the community is not found, a 400 error is returned.
 *                         If there is an error retrieving the moderators, a 500 error is returned.
 */
export async function getModeratorsHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const user = res.locals.user;
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }
    const commName = req.params.subreddit;
    if (!commName) {
      return res.status(401).json({
        status: 'failed',
        message: 'Community not found',
      });
    }
    const Moderators = await getCommunityModerators(commName);
    if (Moderators.status === true) {
      return res.status(200).json({ status: 'success', Moderators });
    } else {
      return res.status(404).json({ status: 'error', message: 'error in get Moderators' });
    }
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}

/**
 * Handles the request to get the members of a community.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise that resolves when the function is complete.
 */
export async function getMembersHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const user = res.locals.user;
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }
    const commName = req.params.subreddit;
    const community = await findCommunityByName(commName);

    if (!community) {
      return res.status(404).json({
        status: 'failed',
        message: 'Community not found',
      });
    }
    const users = await getCommunityMembers(commName);
    const membersCount = community.membersCnt;
    if (users.status === true) {
      const members = users.users;
      return res.status(200).json({ status: 'success', membersCount: membersCount, members });
    } else {
      return res.status(404).json({ status: 'error', message: 'error in get Members' });
    }
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}

/**
 * Handles the request to edit the rules of a community.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise that resolves when the function is complete.
 */
export async function editCommunityRulesHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const user = res.locals.user;
    const rules = req.body.rules;
    const commName = req.params.subreddit;

    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    const community = await findCommunityByName(commName);

    if (!community) {
      return res.status(404).json({
        status: 'failed',
        message: 'Community not found',
      });
    }

    let isMod = false;

    if (community.moderators) {
      community.moderators.forEach((el) => {
        // Check if userID is defined and equal to commModerator
        if (el.userID?.toString() === user._id?.toString()) isMod = true;
      });
    }
    if (isMod === false) {
      return res.status(404).json({ status: 'error', message: 'Members can not change rules' });
    }

    const result = await editCommunityRules(commName, rules);

    if (result.status === true) {
      return res.status(200).json({ status: 'succeeded' });
    } else {
      return res.status(404).json({ status: 'error', message: 'Error in changing rules' });
    }
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}

/**
 * Handles the request to edit the removal rules of a community.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise that resolves when the function is complete.
 */
export async function editCommunityRemovalResonsHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const user = res.locals.user;
    const reasons = req.body.reasons;
    const commName = req.params.subreddit;

    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    const community = await findCommunityByName(commName);

    if (!community) {
      return res.status(404).json({
        status: 'failed',
        message: 'Community not found',
      });
    }

    let isMod = false;

    if (community.moderators) {
      community.moderators.forEach((el) => {
        // Check if userID is defined and equal to commModerator
        if (el.userID?.toString() === user._id?.toString()) isMod = true;
      });
    }
    if (isMod === false) {
      return res.status(404).json({ status: 'error', message: 'Members can not change removal reasons' });
    }

    const result = await editCommunityRemovalReasons(commName, reasons);

    if (result.status === true) {
      return res.status(200).json({ status: 'succeeded' });
    } else {
      return res.status(404).json({ status: 'error', message: 'Error in changing removal reasons' });
    }
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}

/**
 * Handles the request to edit the categories of a community.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise that resolves when the function is complete.
 */
export async function editCommunityCategoriesHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const user = res.locals.user;
    const categories = req.body.categories;
    const commName = req.params.subreddit;

    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    const community = await findCommunityByName(commName);

    if (!community) {
      return res.status(404).json({
        status: 'failed',
        message: 'Community not found',
      });
    }

    let isMod = false;

    if (community.moderators) {
      community.moderators.forEach((el) => {
        // Check if userID is defined and equal to commModerator
        if (el.userID?.toString() === user._id?.toString()) isMod = true;
      });
    }
    if (isMod === false) {
      return res.status(404).json({ status: 'error', message: 'Members can not change rules' });
    }

    const result = await editCommunityCategories(commName, categories);

    if (result.status === true) {
      return res.status(200).json({ status: 'succeeded' });
    } else {
      return res.status(404).json({ status: 'error', message: 'Error in changing categories' });
    }
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}

/**
 * favorite subreddit handler.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise of a void.
 */
export async function favoriteCommunityHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  // Get user ID from request
  const userID = res.locals.user._id;
  const user = res.locals.user;
  const subreddit = req.params.subreddit;
  const community = await findCommunityByName(subreddit);

  // Check if subreddit is missing or invalid
  if (!community) {
    return res.status(402).json({
      error: 'Community not found',
    });
  }

  // Check if user is missing or invalid
  if (!user) {
    return res.status(401).json({
      error: 'Access token is missing or invalid',
    });
  }
  try {
    const updateUser = await addFavoriteToUser(userID, subreddit);

    // Handle user addition failure
    if (updateUser.status === false) {
      return res.status(402).json({
        error: updateUser.error,
      });
    }
    // Return success response
    return res.status(200).json({
      status: 'succeeded',
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error adding subreddit to favorite:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

/**
 * unfavorite subreddit handler.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise of a void.
 */
export async function unfavoriteCommunityHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  // Get user ID from request
  const userID = res.locals.user._id;
  const user = res.locals.user;
  const subreddit = req.params.subreddit;
  const community = await findCommunityByName(subreddit);

  // Check if subreddit is missing or invalid
  if (!community) {
    return res.status(402).json({
      error: 'Community not found',
    });
  }

  // Check if user is missing or invalid
  if (!user) {
    return res.status(401).json({
      error: 'Access token is missing or invalid',
    });
  }
  try {
    const updateUser = await removeFavoriteFromUser(userID, subreddit);

    // Handle user addition failure
    if (updateUser.status === false) {
      return res.status(402).json({
        error: updateUser.error,
      });
    }
    // Return success response
    return res.status(200).json({
      status: 'succeeded',
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error adding subreddit to favorite:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

/**
 * Handles the request to get the favorite communities of a user.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise that resolves when the function is complete.
 */
export async function getFavoriteCommunitiesOfUserHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const userID = res.locals.user._id;
    const user = await findUserById(userID);
    // Check if user is missing or invalid
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }
    const communties = await getFavoriteCommunitiesOfUser(user.username);

    res.status(200).json({ communties });
  } catch (error) {
    console.error('Error in getCommunityOfUserHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/**
 * Handles the request to get spam posts of a community.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise that resolves when the function is complete.
 */
export async function getSpamPostsHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const user = res.locals.user;
    const subreddit = req.params.subreddit;
    const community = await findCommunityByName(subreddit);

    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    if (!community) {
      return res.status(401).json({
        status: 'failed',
        message: 'Community not found',
      });
    }

    let isMod = false;
    if (community.moderators) {
      community.moderators.forEach((el) => {
        if (el.userID?.toString() === user._id?.toString()) isMod = true;
      });
    }
    if (isMod === false) {
      return res.status(404).json({ status: 'error', message: 'Members can not check spam' });
    }

    const posts = community.spamPosts;
    return res.status(200).json({ status: 'success', posts });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}

/**
 * Handles the request to get spam comments of a community.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise that resolves when the function is complete.
 */
export async function getSpamCommentsHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const user = res.locals.user;
    const subreddit = req.params.subreddit;
    const community = await findCommunityByName(subreddit);

    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    if (!community) {
      return res.status(401).json({
        status: 'failed',
        message: 'Community not found',
      });
    }

    let isMod = false;
    if (community.moderators) {
      community.moderators.forEach((el) => {
        if (el.userID?.toString() === user._id?.toString()) isMod = true;
      });
    }
    if (isMod === false) {
      return res.status(404).json({ status: 'error', message: 'Members can not check spam' });
    }

    const comments = community.spamComments;
    return res.status(200).json({ status: 'success', comments });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}

/**
 * mark Spam Post Handler.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise of a void.
 */
export async function markSpamPostHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  // Get user ID from request
  const userID = res.locals.user._id;
  const user = res.locals.user;
  const subreddit = req.params.subreddit;
  const community = await findCommunityByName(subreddit);
  const postID = req.body.postID;
  const post = await findPostById(postID);
  const type = req.body.spamType;

  // Check if user is missing or invalid
  if (!user) {
    return res.status(401).json({
      error: 'Access token is missing or invalid',
    });
  }

  // Check if subreddit is missing or invalid
  if (!community) {
    return res.status(402).json({
      error: 'Community not found',
    });
  }

  // Check if post is missing or invalid
  if (!post) {
    return res.status(402).json({
      error: 'post not found',
    });
  }

  try {
    const result = await markSpamPost(userID, subreddit, postID, type);
    await PostModel.findByIdAndUpdate(post._id, { isHidden: true }, { upsert: true, new: true });

    // Handle user addition failure
    if (result.status === false) {
      return res.status(500).json({
        error: result.error,
      });
    }
    // Return success response
    return res.status(200).json({
      status: 'succeeded',
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error adding spam post to subreddit:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

/**
 * mark Spam Comment Handler.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise of a void.
 */
export async function markSpamCommentHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  // Get user ID from request
  const userID = res.locals.user._id;
  const user = res.locals.user;
  const subreddit = req.params.subreddit;
  const community = await findCommunityByName(subreddit);
  const commentID = req.body.commentID;
  const comment = await findCommentById(commentID);
  const type = req.body.spamType;

  // Check if user is missing or invalid
  if (!user) {
    return res.status(401).json({
      error: 'Access token is missing or invalid',
    });
  }

  // Check if subreddit is missing or invalid
  if (!community) {
    return res.status(402).json({
      error: 'Community not found',
    });
  }

  // Check if comment is missing or invalid
  if (!comment) {
    return res.status(402).json({
      error: 'Comment not found',
    });
  }

  try {
    const result = await markSpamComment(userID, subreddit, commentID, type);
    await CommentModel.findByIdAndUpdate(comment._id, { isHidden: true }, { upsert: true, new: true });

    // Handle user addition failure
    if (result.status === false) {
      return res.status(500).json({
        error: result.error,
      });
    }
    // Return success response
    return res.status(200).json({
      status: 'succeeded',
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error adding spam comment to subreddit:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

/**
 *  approve Spam Post Handler.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise of a void.
 */
export async function approveSpamPostHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  // Get user ID from request
  const userID = res.locals.user._id;
  const user = res.locals.user;
  const subreddit = req.params.subreddit;
  const postID = req.body.postID;
  const community = await findCommunityByName(subreddit);
  const post = await findPostById(postID);

  // Check if user is missing or invalid
  if (!user) {
    return res.status(401).json({
      error: 'Access token is missing or invalid',
    });
  }

  // Check if subreddit is missing or invalid
  if (!community) {
    return res.status(402).json({
      error: 'Community not found',
    });
  }

  // Check if post is missing or invalid
  if (!post) {
    return res.status(403).json({
      error: 'post not found',
    });
  }

  let isMod = false;
  if (community.moderators) {
    community.moderators.forEach((el) => {
      if (el.userID?.toString() === user._id?.toString()) isMod = true;
    });
  }
  if (isMod === false) {
    return res.status(404).json({ status: 'error', message: 'Members can not approve spam posts' });
  }

  try {
    const updateUser = await approveSpamPost(postID, subreddit);
    await PostModel.findByIdAndUpdate(post._id, { isHidden: false }, { upsert: true, new: true });

    // Handle user addition failure
    if (updateUser.status === false) {
      return res.status(500).json({
        error: updateUser.error,
      });
    }
    // Return success response
    return res.status(200).json({
      status: 'succeeded',
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error approving spam post:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

/**
 *  approve Spam Comment Handler.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise of a void.
 */
export async function approveSpamCommentHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  // Get user ID from request
  const userID = res.locals.user._id;
  const user = res.locals.user;
  const subreddit = req.params.subreddit;
  const commentID = req.body.commentID;
  const community = await findCommunityByName(subreddit);
  const comment = await findCommentById(commentID);

  // Check if user is missing or invalid
  if (!user) {
    return res.status(401).json({
      error: 'Access token is missing or invalid',
    });
  }

  // Check if subreddit is missing or invalid
  if (!community) {
    return res.status(402).json({
      error: 'Community not found',
    });
  }

  // Check if post is missing or invalid
  if (!comment) {
    return res.status(402).json({
      error: 'Comment not found',
    });
  }

  let isMod = false;
  if (community.moderators) {
    community.moderators.forEach((el) => {
      if (el.userID?.toString() === user._id?.toString()) isMod = true;
    });
  }
  if (isMod === false) {
    return res.status(404).json({ status: 'error', message: 'Members can not approve spam posts' });
  }

  try {
    const updateUser = await approveSpamComment(commentID, subreddit);
    await CommentModel.findByIdAndUpdate(comment._id, { isHidden: false }, { upsert: true, new: true });

    // Handle user addition failure
    if (updateUser.status === false) {
      return res.status(500).json({
        error: updateUser.error,
      });
    }
    // Return success response
    return res.status(200).json({
      status: 'succeeded',
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error approving spam comment:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

/**
 *  remove Spam Post Handler.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise of a void.
 */
export async function removeSpamPostHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  // Get user ID from request
  const userID = res.locals.user._id;
  const user = res.locals.user;
  const subreddit = req.params.subreddit;
  const postID = req.body.postID;
  const community = await findCommunityByName(subreddit);
  const post = await findPostById(postID);

  // Check if user is missing or invalid
  if (!user) {
    return res.status(401).json({
      error: 'Access token is missing or invalid',
    });
  }

  // Check if subreddit is missing or invalid
  if (!community) {
    return res.status(402).json({
      error: 'Community not found',
    });
  }

  // Check if post is missing or invalid
  if (!post) {
    return res.status(402).json({
      error: 'Post not found',
    });
  }

  let isMod = false;
  if (community.moderators) {
    community.moderators.forEach((el) => {
      if (el.userID?.toString() === user._id?.toString()) isMod = true;
    });
  }
  if (isMod === false) {
    return res.status(404).json({ status: 'error', message: 'Members can not remove spam posts' });
  }

  try {
    const updateUser = await approveSpamPost(postID, subreddit);
    await PostModel.findByIdAndUpdate(post._id, { isDeleted: true }, { upsert: true, new: true });

    // Handle user addition failure
    if (updateUser.status === false) {
      return res.status(500).json({
        error: updateUser.error,
      });
    }
    // Return success response
    return res.status(200).json({
      status: 'succeeded',
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error removing spam post:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

/**
 *  approve Spam Comment Handler.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise of a void.
 */
export async function removeSpamCommentHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  // Get user ID from request
  const userID = res.locals.user._id;
  const user = res.locals.user;
  const subreddit = req.params.subreddit;
  const commentID = req.body.commentID;
  const community = await findCommunityByName(subreddit);
  const comment = await findCommentById(commentID);

  // Check if user is missing or invalid
  if (!user) {
    return res.status(401).json({
      error: 'Access token is missing or invalid',
    });
  }

  // Check if subreddit is missing or invalid
  if (!community) {
    return res.status(402).json({
      error: 'Community not found',
    });
  }

  // Check if post is missing or invalid
  if (!comment) {
    return res.status(402).json({
      error: 'Comment not found',
    });
  }

  let isMod = false;
  if (community.moderators) {
    community.moderators.forEach((el) => {
      if (el.userID?.toString() === user._id?.toString()) isMod = true;
    });
  }
  if (isMod === false) {
    return res.status(404).json({ status: 'error', message: 'Members can not remove spam posts' });
  }

  try {
    const updateUser = await approveSpamComment(commentID, subreddit);
    await CommentModel.findByIdAndUpdate(comment._id, { isDeleted: true }, { upsert: true, new: true });

    // Handle user addition failure
    if (updateUser.status === false) {
      return res.status(500).json({
        error: updateUser.error,
      });
    }
    // Return success response
    return res.status(200).json({
      status: 'succeeded',
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error removing spam comment:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

/**
 * lock Comment Handler.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise of a void.
 */
export async function lockCommentHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  // Get user ID from request
  const userID = res.locals.user._id;
  const user = res.locals.user;
  const subreddit = req.params.subreddit;
  const community = await findCommunityByName(subreddit);
  const commentID = req.body.commentID;
  const comment = await findCommentById(commentID);

  // Check if user is missing or invalid
  if (!user) {
    return res.status(401).json({
      error: 'Access token is missing or invalid',
    });
  }

  // Check if subreddit is missing or invalid
  if (!community) {
    return res.status(402).json({
      error: 'Community not found',
    });
  }

  // Check if comment is missing or invalid
  if (!comment) {
    return res.status(402).json({
      error: 'Comment not found',
    });
  }

  try {
    await CommentModel.findByIdAndUpdate(comment._id, { isLocked: true }, { upsert: true, new: true });

    // Return success response
    return res.status(200).json({
      status: 'succeeded',
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error locking a comment in a subreddit:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

/**
 * unlock Comment Handler.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise of a void.
 */
export async function unlockCommentHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  // Get user ID from request
  const userID = res.locals.user._id;
  const user = res.locals.user;
  const subreddit = req.params.subreddit;
  const community = await findCommunityByName(subreddit);
  const commentID = req.body.commentID;
  const comment = await findCommentById(commentID);

  // Check if user is missing or invalid
  if (!user) {
    return res.status(401).json({
      error: 'Access token is missing or invalid',
    });
  }

  // Check if subreddit is missing or invalid
  if (!community) {
    return res.status(402).json({
      error: 'Community not found',
    });
  }

  // Check if comment is missing or invalid
  if (!comment) {
    return res.status(402).json({
      error: 'Comment not found',
    });
  }

  try {
    await CommentModel.findByIdAndUpdate(comment._id, { isLocked: false }, { upsert: true, new: true });

    // Return success response
    return res.status(200).json({
      status: 'succeeded',
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error unlocking a comment in a subreddit:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

/**
 * lock Post Handler.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise of a void.
 */
export async function lockPostHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  // Get user ID from request
  const userID = res.locals.user._id;
  const user = res.locals.user;
  const subreddit = req.params.subreddit;
  const community = await findCommunityByName(subreddit);
  const postID = req.body.postID;
  const post = await findPostById(postID);

  // Check if user is missing or invalid
  if (!user) {
    return res.status(401).json({
      error: 'Access token is missing or invalid',
    });
  }

  // Check if subreddit is missing or invalid
  if (!community) {
    return res.status(402).json({
      error: 'Community not found',
    });
  }

  // Check if post is missing or invalid
  if (!post) {
    return res.status(402).json({
      error: 'post not found',
    });
  }

  try {
    await PostModel.findByIdAndUpdate(post._id, { isLocked: true }, { upsert: true, new: true });

    // Return success response
    return res.status(200).json({
      status: 'succeeded',
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error locking a post in a subreddit:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

/**
 * unlock Post Handler.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise of a void.
 */
export async function unlockPostHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  // Get user ID from request
  const userID = res.locals.user._id;
  const user = res.locals.user;
  const subreddit = req.params.subreddit;
  const community = await findCommunityByName(subreddit);
  const postID = req.body.postID;
  const post = await findPostById(postID);

  // Check if user is missing or invalid
  if (!user) {
    return res.status(401).json({
      error: 'Access token is missing or invalid',
    });
  }

  // Check if subreddit is missing or invalid
  if (!community) {
    return res.status(402).json({
      error: 'Community not found',
    });
  }

  // Check if post is missing or invalid
  if (!post) {
    return res.status(402).json({
      error: 'post not found',
    });
  }

  try {
    await PostModel.findByIdAndUpdate(post._id, { isLocked: false }, { upsert: true, new: true });

    // Return success response
    return res.status(200).json({
      status: 'succeeded',
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error unlocking a post in a subreddit:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

export async function uploadCommunityIcon(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    if (!req.file || Object.keys(req.file).length === 0) {
      throw new Error('No file uploaded');
    }

    const user = res.locals.user;
    const image = res.locals.image;

    const community = await findCommunityByName(req.params.subreddit);

    if (!user) {
      return res.status(401).json({
        error: 'Access token is missing or invalid',
      });
    }

    if (!community) {
      return res.status(404).json({
        error: 'Community not found',
      });
    }

    const communityId = community._id;
    let isMod = false;
    if (community.moderators) {
      community.moderators.forEach((el) => {
        if (el.userID?.toString() === user._id?.toString()) {
          isMod = true;
        }
      });
    }
    if (isMod === false) {
      return res.status(404).json({ status: 'error', message: 'Only moderators can upload community icons' });
    }
    await CommunityModel.findByIdAndUpdate(communityId, { icon: image }, { runValidators: true });

    res.status(200).json({
      msg: 'Icon uploaded successfully',
      Icon: image,
    });
  } catch (error) {
    if (error instanceof appError) {
      return res.status(error.statusCode).json({
        msg: error.message,
      });
    }
    return res.status(500).json({
      msg: 'Internal server error in image upload',
    });
  }
}

export async function uploadCommunityBanner(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    if (!req.file || Object.keys(req.file).length === 0) {
      throw new Error('No file uploaded');
    }

    const image = res.locals.image;
    const user = res.locals.user;
    const userId = user._id;
    const community = await findCommunityByName(req.params.subreddit);
    if (!community) {
      return res.status(402).json({
        error: 'Community not found',
      });
    }

    const communityId = community._id;
    let isMod = false;
    if (community.moderators) {
      community.moderators.forEach((el) => {
        if (el.userID?.toString() === user._id?.toString()) {
          isMod = true;
        }
      });
    }
    if (isMod === false) {
      return res.status(404).json({ status: 'error', message: 'Only moderators can upload community icons' });
    }

    await CommunityModel.findByIdAndUpdate(communityId, { banner: image }, { runValidators: true });

    res.status(200).json({
      msg: 'Banner uploaded successfully',
      Icon: image,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

export async function getCommunityRulesHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const userID = res.locals.user._id;
    const user = res.locals.user;
    const subreddit = req.params.subreddit;
    const community = await findCommunityByName(subreddit);

    // Check if user is missing or invalid
    if (!user) {
      return res.status(401).json({
        error: 'Access token is missing or invalid',
      });
    }
    if (!community) {
      return res.status(402).json({
        error: 'Community not found',
      });
    }
    const rules = community.communityRules;
    return res.status(200).json({
      rules,
    });
  } catch (error) {
    console.error('Error in getCommunityRulesHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

export async function getCommunityRemovalResonsHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const userID = res.locals.user._id;
    const user = res.locals.user;
    const subreddit = req.params.subreddit;
    const community = await findCommunityByName(subreddit);

    // Check if user is missing or invalid
    if (!user) {
      return res.status(401).json({
        error: 'Access token is missing or invalid',
      });
    }
    if (!community) {
      return res.status(402).json({
        error: 'Community not found',
      });
    }
    const rules = community.removalReasons;
    return res.status(200).json({
      rules,
    });
  } catch (error) {
    console.error('Error in getCommunityRemovalResonsHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

export async function getCommunityCategoriesHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const userID = res.locals.user._id;
    const user = res.locals.user;
    const subreddit = req.params.subreddit;
    const community = await findCommunityByName(subreddit);

    // Check if user is missing or invalid
    if (!user) {
      return res.status(401).json({
        error: 'Access token is missing or invalid',
      });
    }
    if (!community) {
      return res.status(402).json({
        error: 'Community not found',
      });
    }
    const categories = community.categories;
    return res.status(200).json({
      categories,
    });
  } catch (error) {
    console.error('Error in getCommunityCategoriesHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/**
 * Handles the request to get pending members of a community.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise that resolves when the function is complete.
 */
export async function getPendingMembersHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const user = res.locals.user;
    const subreddit = req.params.subreddit;
    const community = await findCommunityByName(subreddit);

    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    if (!community) {
      return res.status(401).json({
        status: 'failed',
        message: 'Community not found',
      });
    }

    let isMod = false;
    if (community.moderators) {
      community.moderators.forEach((el) => {
        if (el.userID?.toString() === user._id?.toString()) isMod = true;
      });
    }
    if (isMod === false) {
      return res.status(404).json({ status: 'error', message: 'Members can not check pending members' });
    }

    const users = community.pendingMembers;
    return res.status(200).json({ status: 'success', users });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}

export async function deleteCommunityIcon(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const user = res.locals.user;
    const userId = user._id;
    const community = await findCommunityByName(req.params.subreddit);
    if (!community) {
      return res.status(402).json({
        error: 'Community not found',
      });
    }
    const communityId = community._id;
    let isMod = false;
    if (community.moderators) {
      community.moderators.forEach((el) => {
        if (el.userID?.toString() === user._id?.toString()) {
          isMod = true;
        }
      });
    }
    if (isMod === false) {
      return res.status(404).json({ status: 'error', message: 'Only moderators can upload community icons' });
    }

    await CommunityModel.findByIdAndUpdate(
      community._id,
      { icon: 'https://res.cloudinary.com/dvnf8yvsg/image/upload/v1714594934/vjhqqv4imw26krszm7hr.png' },
      { runValidators: true }
    );
    res.status(200).json({
      msg: 'Icon deletd  successfully',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

export async function deleteCommunityBanner(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const user = res.locals.user;
    const userId = user._id;
    const community = await findCommunityByName(req.params.subreddit);
    if (!community) {
      return res.status(402).json({
        error: 'Community not found',
      });
    }
    const communityId = community._id;
    let isMod = false;
    if (community.moderators) {
      community.moderators.forEach((el) => {
        if (el.userID?.toString() === user._id?.toString()) {
          isMod = true;
        }
      });
    }
    if (isMod === false) {
      return res.status(404).json({ status: 'error', message: 'Only moderators can upload community icons' });
    }

    await CommunityModel.findByIdAndUpdate(
      community._id,
      { banner: 'https://res.cloudinary.com/dvnf8yvsg/image/upload/v1714595299/gcnool3ibj3zfyoa1emq.jpg' },
      { runValidators: true }
    );
    res.status(200).json({
      msg: 'Banner deletd  successfully',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

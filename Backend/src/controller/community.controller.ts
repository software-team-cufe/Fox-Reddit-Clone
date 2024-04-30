import {
  findCommunityByName,
  findCommunityByID,
  getUserCommunities,
  createSubreddit,
  addMemberToCom,
  addModeratorToCom,
  removeMemberFromCom,
  removeModeratorFromCom,
  getUsersAsBannedInCommunity,
  getCommunityModerators,
  getCommunityMembers,
  editCommunityRules,
  markSpamPost,
  markSpamComment,
  approveSpamPost,
  approveSpamComment,
} from '../service/community.service';
import {
  getCommunitiesIdOfUserAsMemeber,
  getCommunitiesIdOfUserAsModerator,
  getFavoriteCommunitiesOfUser,
  addMemberToUser,
  addCreatorToUser,
  addModeratorToUser,
  addFavoriteToUser,
  removeMemberFromUser,
  removeModeratorFromUser,
  removeFavoriteFromUser,
  findUserById,
} from '../service/user.service';

import { CommunityModel } from '../model/community.model';
import { Moderator, UserModel } from '../model/user.model';
import { NextFunction, Request, Response } from 'express';
import { findPostById } from '../service/post.service';
import { findCommentById } from '../service/comment.service';
import PostModel from '../model/posts.model';
import CommentModel from '../model/comments.model';
import { Types } from 'mongoose';

/**
 * Retrieves the communities that a user is a member of.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the communities are retrieved and sent in the response.
 */
export async function getCommunityOfUserAsMemeberHandler(req: Request, res: Response) {
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
 * Create subreddit handler.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise of a void.
 */
export async function createSubredditHandler(req: Request, res: Response) {
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

  // Check if community is public
  if (community.privacyType === 'private') {
    // const updateUser = await addUserToPending(userID, subreddit);
    // if (updateUser.status === false) {
    //   return res.status(500).json({
    //     error: updateUser.error,
    //   });
    // }
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

/**
 * Bans or unban a user in a community.
 *
 * @param {Request} req - The request object containing the subreddit ID, user ID, and operation.
 * @param {Response} res - The response object used to send the result of the operation.
 * @return {Promise<void>} - A promise that resolves when the operation is completed.
 */
export async function banOrUnbanHandler(req: Request, res: Response) {
  const subredditId: string = req.body.subreddit;
  const memberId: string = req.body.userID;
  const commModerator: string = res.locals.user._id.toString();
  const operation: string = req.body.action;

  try {
    // Find the community by ID
    const community = await findCommunityByID(subredditId);

    if (!community) {
      return res.status(404).json({
        status: 'failed',
        message: 'Community not found',
      });
    }

    if (!commModerator) {
      return res.status(401).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    let performerFound = false;
    let toBeAffectedFound = false;
    if (community.moderators) {
      community.moderators.forEach((el) => {
        // Check if userID is defined and equal to commModerator or memberId
        if (el.userID?.toString() === commModerator) performerFound = true;
        if (el.userID?.toString() === memberId) toBeAffectedFound = true;
      });
    }

    if (!performerFound || toBeAffectedFound) {
      //if (!performerFound || toBeAffectedFound) {
      // If toBeAffectedFound, it means that you are going to ban or mute a moderator, which is not valid behavior
      return res.status(402).json({
        status: 'failed',
        message: 'You cannot perform this operation on this user in this subreddit!',
      });
    }

    if (!community.members) {
      return res.status(404).json({
        status: 'failed',
        message: 'Community members not found',
      });
    }

    // Update the community members based on the operation
    community.members.forEach((el) => {
      // Check if el.userID, el.isBanned, and el.isMuted are defined before accessing their properties
      if (el.userID?.toString() === memberId) {
        if (!el.isBanned) {
          // If isBanned is undefined, create a new IsBannedOrMuted object
          el.isBanned = { value: false }; // Set default value
        }
        if (operation === 'ban') {
          el.isBanned.value = true;
          el.isBanned.date = new Date();
        } else if (operation === 'unban') {
          el.isBanned.value = false;
          el.isBanned.date = new Date(); // Clear the date if needed
        }
      }
    });

    // Save the updated community
    await community.save();

    // Find the user to be affected by ID
    const toBeAffected = await findUserById(memberId);
    console.log(toBeAffected);

    if (!toBeAffected || !toBeAffected.member) {
      // Add null check for toBeAffected.member
      return res.status(404).json({
        status: 'failed',
        message: 'User to be affected not found',
      });
    }

    // Update the user based on the operation
    toBeAffected.member.forEach((el) => {
      if (el.communityId === community._id) {
        if (!el.isBanned) {
          // If isBanned is undefined, create a new IsBannedOrMuted object
          el.isBanned = { value: false }; // Set default value
        }
        if (operation === 'ban') {
          el.isBanned.value = true;
          el.isBanned.date = new Date();
        } else if (operation === 'unban') {
          el.isBanned.value = false;
          el.isBanned.date = undefined; // Clear the date if needed
        }
      }
    });

    // Save the updated user
    await toBeAffected.save();
    await community.save();

    // Return success response
    res.status(200).json({
      status: 'success',
      message: 'Operation is done successfully',
    });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
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
    const members = await getCommunityMembers(commName);
    if (members.status === true) {
      return res.status(200).json({ status: 'success', members });
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
 * favorite subreddit handler.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise of a void.
 */
export async function favoriteCommunityHandler(req: Request, res: Response) {
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

export async function uploadCommunityPhoto(req: Request, res: Response) {
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

    //check if user is a moderator in this community
    //get user with id and then check if community id matches any of the community ids the user is a moderator in
    const isModerator = user.moderators
      ? user.moderators.some((moderators: Moderator) => moderators.communityId === communityId)
      : false;
    if (!isModerator) {
      return res.status(403).json({
        error: 'User is not a moderator of this community',
      });
    }

    await CommunityModel.findByIdAndUpdate(community._id, { icon: image[0] }, { runValidators: true });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

export async function getCommunityRulesHandler(req: Request, res: Response) {
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
    console.error('Error in getCommunityInfoHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

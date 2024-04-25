import { createCommunity, subscribeCommunity, getCommunity } from '../schema/community.schema';
import {
  findCommunityByName,
  findCommunityByID,
  getUserCommunities,
  createSubreddit,
  addMemberToCom,
  removeMemberFromCom,
} from '../service/community.service';
import {
  getCommunitiesIdOfUserAsMemeber,
  getCommunitiesIdOfUserAsModerator,
  addMemberToUser,
  addCreatorToUser,
  addModeratorToUser,
  removeMemberFromUser,
  findUserById,
  findUserByUsername,
} from '../service/user.service';

import { NextFunction, Request, Response } from 'express';

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
    const updateUser = await addMemberToUser(user, result.createdCommunity._id.toString());
    const updateUser1 = await addCreatorToUser(user, result.createdCommunity._id.toString());

    // Handle user addition failure
    if (updateUser.status === false || updateUser1.status === false) {
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
  if (community.privacyType === 'private' || community.privacyType === 'restricted') {
    return res.status(403).json({
      error: 'Community is private or restricted',
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
 * Subscribe subreddit handler.
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
 * Bans or mutes a user in a community.
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
  console.log(subredditId, memberId, commModerator, operation);

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
    console.log(performerFound, toBeAffectedFound);
    console.log(community.moderators);
    if (!performerFound || toBeAffectedFound) {
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

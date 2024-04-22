import { getUserCommunities, createSubreddit, creationValidation } from '../service/community.service';
import {
  getCommunitiesIdOfUserAsMemeber,
  getCommunitiesIdOfUserAsModerator,
  addUserToComm,
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
    console.log('here');
    const page: number = parseInt(req.query.page as string, 10) || 1; // Default to page 1 if not provided
    const count: number = parseInt(req.query.count as string, 10) || 10; // Default to 10 if not provided
    const limit: number = parseInt(req.query.limit as string, 10) || 10; // Default to 10 if not provided
    const t: string = req.query.t as string; // Assuming you're using this parameter for something else

    if (isNaN(page) || isNaN(count) || isNaN(limit)) {
      return res.status(400).json({ error: 'Invalid request parameters.' });
    }
    // Extract params
    const user = res.locals.user;
    // Check if user is missing or invalid
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }
    const communities = await getCommunitiesIdOfUserAsMemeber(user.username, page, count);

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
    const page: number = parseInt(req.query.page as string, 10) || 1; // Default to page 1 if not provided
    const count: number = parseInt(req.query.count as string, 10) || 10; // Default to 10 if not provided
    const limit: number = parseInt(req.query.limit as string, 10) || 10; // Default to 10 if not provided
    const t: string = req.query.t as string; // Assuming you're using this parameter for something else

    if (isNaN(page) || isNaN(count) || isNaN(limit)) {
      return res.status(400).json({ error: 'Invalid request parameters.' });
    }
    // Extract params
    const user = res.locals.user;
    // Check if user is missing or invalid
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }
    const communities = await getCommunitiesIdOfUserAsModerator(user.username, page, count);

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

  // Validate incoming parameters
  const check = await creationValidation(req.body.name, req.body.type, req.body.over18);
  if (!check) {
    return res.status(400).json({
      error: 'Invalid subreddit parameters',
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
    const updateUser = await addUserToComm(user, result.createdCommunity._id.toString());

    // Handle user addition failure
    if (updateUser.status === false) {
      return res.status(500).json({
        error: updateUser.error,
      });
    }

    // Return success response
    return res.status(200).json({
      result,
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error creating subreddit:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

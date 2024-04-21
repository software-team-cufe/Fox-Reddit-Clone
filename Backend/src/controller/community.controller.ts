import { getUserCommunities } from '../service/community.service';
import { getCommunitiesIdOfUserAsMemeber, getCommunitiesIdOfUserAsModerator } from '../service/user.service';
import { NextFunction, Request, Response } from 'express';

export async function getCommunityOfUserAsMemeberHandler(req: Request, res: Response, next: NextFunction) {
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
    const communityIDS = await getCommunitiesIdOfUserAsMemeber(user.username, page, count);
    const communities = await getUserCommunities(communityIDS);

    res.status(200).json({ communities });
  } catch (error) {
    console.error('Error in getCommunityOfUserHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
export async function getCommunityOfUserAsModeratorHandler(req: Request, res: Response, next: NextFunction) {
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
    const communityIDS = await getCommunitiesIdOfUserAsModerator(user.username, page, count);
    const communities = await getUserCommunities(communityIDS);

    res.status(200).json({ communities });
  } catch (error) {
    console.error('Error in getCommunityOfUserHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

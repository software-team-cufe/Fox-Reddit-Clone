import { Request, Response } from 'express';
import { createSubreddit, creationValidation } from '../service/community.service';
import { addUserToComm } from '../service/user.service';
import CommunityModel from '../model/community.model';
/**
 * Create subreddit
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @return {object} res
 */
export async function createSubredditHandler(req: Request, res: Response) {
  const check = await creationValidation(req.body.name, req.body.type, req.body.over18);
  if (!check) {
    return res.status(500).json({
      error: 'invalid parameters',
    });
  }

  const userID = res.locals.user._id;
  const user = res.locals.user;
  if (!user) {
    return res.status(500).json({
      status: 'access token is missing or invalid',
    });
  }
  const communityName = req.body.name;
  const privacyType = req.body.type;
  const over18 = req.body.over18;

  const result = await createSubreddit(communityName, privacyType, over18, userID);
  if (!result.status) {
    return res.status(200).json({
      status: result.error,
    });
  }
  const updateUser = await addUserToComm(user, req.body.name);
  if (!updateUser.status) {
    return res.status(500).json({
      status: result.error,
    });
  }
  return res.status(200).json({
    status: result.response,
  });
}

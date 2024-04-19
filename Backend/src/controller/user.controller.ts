/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { getEnvVariable } from '../utils/GetEnvVariables';
import {
  CreateUserInput,
  ForgotPasswordInput,
  VerifyUserInput,
  ResetPasswordInput,
  friendRequest,
  unFriendRequest,
  blockUserInput,
  followUserInput,
  unfollowUserInput,
  reportUser,
} from '../schema/user.schema';
import { NextFunction, Request, Response } from 'express';
import {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByUsername,
  userSubmittedPosts,
  userCommentsIds,
  userRepliesIds,
} from '../service/user.service';
import { sendEmail, generateVerificationLinkToken, generatePasswordResetLinkToken } from '../utils/mailer';
import { signJwt, verifyJwt } from '../utils/jwt';
import log from '../utils/logger';
import { nanoid } from 'nanoid';
import { UserModel, privateFields } from '../model/user.model';
import { omit } from 'lodash';
import { get } from 'config';
import PostModel from '../model/posts.model';
import { userComments } from '../service/comment.service';
import { userPosts } from '../service/post.service';
import mergeTwo from '../middleware/user.control.midel';
import appError from '../utils/appError';
/**
 * Handles the creation of a user.
 *
 * @param req - The request object containing the user data.
 * @param res - The response object to send the result.
 * @returns A response indicating the success or failure of the user creation.
 */
export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
  const body = req.body;

  try {
    const user = await createUser(body);

    const { verify_link, verify_token } = generateVerificationLinkToken(String(user._id), user.verificationCode);
    await sendEmail({
      to: user.email,
      from: {
        name: 'Fox ',
        email: getEnvVariable('FROM_EMAIL'),
      },
      subject: 'please verify your account',
      text: ` click here to verify your account: ${verify_link}`,
    });

    return res.status(200).json({
      token: verify_token,
      username: user.username,
    });
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).json({
        msg: 'Invalid username or email',
      });
    }

    return res.status(500).json({
      msg: 'Something went wrong',
    });
  }
}

export async function deleteUserHandler(req: Request, res: Response) {
  const user = await findUserByUsername(res.locals.user.username);

  try {
    if (!user || !res.locals.user.username) {
      return res.status(401).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    } else {
      const deletedUser = await UserModel.findByIdAndDelete(user._id);
      return res.status(200).json({
        status: 'success',
        message: 'User deleted successfully',
      });
    }
  } catch (error) {
    console.error('Error in deleteUserHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/**
 * Handles the verification of a user based on the provided token.
 *
 * @param {Request<VerifyUserInput>} req - The request object containing the verification token.
 * @param {Response} res - The response object to send the verification status.
 * @returns {Promise<void>} - A promise that resolves once the verification process is complete.
 * @throws {appError} - If the user is not found or the verification code is incorrect.
 */
export async function verifyUserHandler(req: Request<VerifyUserInput>, res: Response) {
  //extract token from params
  const token = req.params.verify_token;
  try {
    const decoded = verifyJwt<{ userId: string; verificationCode: string }>(token);
    if (decoded) {
      const { userId, verificationCode } = decoded;
      const user = await findUserById(userId);
      if (!user) {
        throw new appError('User not found', 404);
      }
      if (user.verified) {
        return res.status(200).json({
          msg: 'User already verified',
        });
      }
      if (user && user.verificationCode === verificationCode) {
        user.verified = true;
        await user.save();
        return res.status(200).json({
          msg: 'Email verified successfully',
        });
      }
    }
  } catch (err) {
    if (err instanceof appError) {
      return res.status(err.statusCode).json({
        msg: err.message,
      });
    }
    console.log(err);
    return res.status(500).json({ msg: 'could not verify user' });
  }
}

/**
 * Handles the forgot password functionality.
 *
 * @param req - The request object containing the email of the user.
 * @param res - The response object to send the result.
 * @returns A message indicating if the email exists and a password reset code has been sent.
 */
export async function forgotPasswordHandler(req: Request<{}, {}, ForgotPasswordInput>, res: Response) {
  const message = 'If the email exists, a password reset code will be sent to it'; //vague message
  const { email } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      throw new appError(message, 404);
    }

    if (!user.verified) {
      throw new appError(message, 401);
    }

    //Generate password reset token
    const passwordResetCode = nanoid();
    user.passwordResetCode = passwordResetCode;
    const { reset_link } = generatePasswordResetLinkToken(String(user._id), user.passwordResetCode);
    await user.save();

    await sendEmail({
      to: user.email,
      from: {
        name: 'Fox ',
        email: getEnvVariable('FROM_EMAIL'),
      },
      subject: 'Fox password reset',
      text: ` click here to reset your password: ${reset_link}`,
    });

    //log.debug(`Password reset code is sent for user with email ${email} `);
    return res.status(200).json({ message });
  } catch (err) {
    if (err instanceof appError) {
      return res.status(err.statusCode).json({
        msg: err.message,
      });
    }
    return res.status(500).json({ msg: 'Something went wrong' });
  }
}
/**
 * Handles the reset password request.
 *
 * @param {Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>} req - The request object containing the reset password parameters and body.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the password is reset successfully.
 */
export async function resetPasswordHandler(
  req: Request<{}, {}, ResetPasswordInput['body'], ResetPasswordInput['query']>,
  res: Response
) {
  const message = ' Expired or invalid link';
  try {
    const { token } = req.query;
    if (!token) {
      throw new appError('reset failed', 400);
    }
    console.log(token);

    const decodedToken = verifyJwt<{ userId: string; passwordResetCode: string }>(token);
    if (!decodedToken) {
      return res.status(400).json({
        msg: message,
      });
    }
    const { userId, passwordResetCode } = decodedToken;
    const { password } = req.body;

    const user = await findUserById(userId);

    if (!user || !user.passwordResetCode || user.passwordResetCode !== passwordResetCode) {
      return res.status(400).json({
        msg: message,
      });
    }
    // user validated for password reset
    user.passwordResetCode = null;
    // update password
    user.password = password;
    await user.save();
    return res.status(200).json({
      msg: 'Password reset successfully',
    });
  } catch (error) {
    if (error instanceof appError) {
      return res.status(error.statusCode).json({
        msg: error.message,
      });
    }
    return res.status(500).json({
      msg: 'Something went wrong',
    });
  }
}
/**
 * Handles the request to get the current user.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Response} The current user information.
 */
export async function getCurrentUserHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      msg: 'Unauthorized',
    });
  }
  return res.status(200).json({
    user: res.locals.user,
  });
}
/**
 * Handles the request to get the current user preferences.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Response} The user preferences.
 */
export async function getCurrentUserPrefs(req: Request, res: Response) {
  let user = res.locals.user;
  if (!user) {
    return res.status(401).json({
      msg: 'User doesnt exist',
    });
  }
  user = await findUserById(user._id);
  if (user.prefs) {
    return res.status(200).json({
      userPrefs: user.prefs,
    });
  } else {
    return res.status(404).json({
      userPrefs: null,
    });
  }
}

export async function editCurrentUserPrefs(req: Request, res: Response) {
  let user = res.locals.user;

  if (!user) {
    return res.status(401).send('No user logged in');
  }

  // Get specific prefs to update from request body
  const prefsToUpdate = req.body;
  // Update only those prefs on the user document
  user = await findUserById(user._id);
  Object.assign(user.prefs, prefsToUpdate);

  await user.save();

  return res.status(200).send(user.prefs);
}

export async function getUpvotedPostsByUsername(req: Request, res: Response) {
  try {
    // Extract username from req.params
    const { username } = req.params;
    // Find the user by username
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Retrieve the upvoted post IDs from the user document
    const upvotedPostIds = user.upvotedPosts;
    // Query the Post model to retrieve the upvoted posts
    const upvotedPosts = await PostModel.find({ _id: { $in: upvotedPostIds } });
    return res.json(upvotedPosts);
  } catch (error) {
    console.error('Error fetching upvoted posts:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getDownvotedPostsByUsername(req: Request, res: Response) {
  try {
    // Extract username from req.params
    const { username } = req.params;

    // Find the user by username
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Retrieve the upvoted post IDs from the user document
    const downvotedPostIds = user.downvotedPosts;

    // Query the Post model to retrieve the upvoted posts
    const downvotedPosts = await PostModel.find({ _id: { $in: downvotedPostIds } });

    return res.json(downvotedPosts);
  } catch (error) {
    console.error('Error fetching upvoted posts:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
/**
 * Handles username_available request.
 *
 * @param req - The request object containing the user data.
 * @param res - The response object to send the result.
 * @returns A response indicating the availability of the username.
 */
export async function username_availableHandler(req: Request<VerifyUserInput>, res: Response) {
  try {
    // Extract params
    const username: string = req.query.username as string;

    const user = await findUserByUsername(username);

    if (user !== null) {
      return res.status(404).json('Not Available');
    } else {
      return res.status(200).json('Available');
    }
  } catch (error) {
    console.error('Error handling username availability request:', error);
    return res.status(500).send('Internal server error');
  }
}

/**
 * Handles user "about" request.
 *
 * @param req - The request object containing the user data.
 * @param res - The response object to send the result.
 * @returns A response for user "about" by username.
 */
export async function aboutHandler(req: Request, res: Response) {
  try {
    // Extract params
    const username: string = req.params.username as string;
    const user = await findUserByUsername(username);

    if (!user) {
      return res.status(404).send("This user doesn't exist!");
    }

    const obj = {
      prefShowTrending: user?.prefs?.prefShowTrending,
      isBlocked: user?.aboutReturn?.isBlocked,
      isBanned: user?.commMember?.isBanned,
      isMuted: user?.commMember?.isMuted,
      canCreateSubreddit: user?.canCreateSubreddit,
      isMod: user?.aboutReturn?.isModerator,
      over18: user?.prefs?.over18,
      hasVerifiedEmail: user?.verified,
      createdAt: user?.createdAt,
      inboxCount: user?.inboxCount,
      totalKarma: user?.karma,
      linkKarma: user?.postKarma,
      acceptFollowers: user?.aboutReturn?.acceptFollowers,
      commentKarma: user?.commentKarma,
      passwordSet: user?.passwordResetCode,
      email: user?.email,
      about: user?.about,
      gender: user?.gender,
      avatar: user?.avatar,
      userID: user?._id,
      showActiveCommunities: user?.showActiveCommunities,
    };

    return res.status(200).json(obj);
  } catch (error) {
    console.error('Error handling user request:', error);
    return res.status(500).send('Internal server error');
  }
}
/**
 * Get user posts with pagination support.
 * @param {function} (req, res)
 * @returns {object} res
 */
export async function getUserSubmittedHandler(req: Request, res: Response, next: NextFunction) {
  try {
    // Extract params
    const user = await findUserByUsername(req.params.username as string);

    if (!user) {
      return res.status(404).send("This user doesn't exist!");
    }
    const username: string = req.params.username as string;
    const page: number = parseInt(req.query.page as string, 10) || 1; // Default to page 1 if not provided
    const count: number = parseInt(req.query.count as string, 10) || 10; // Default to 10 if not provided
    const limit: number = parseInt(req.query.limit as string, 10) || 10; // Default to 10 if not provided
    const t: string = req.query.t as string; // Assuming you're using this parameter for something else

    if (!username || isNaN(page) || isNaN(count) || isNaN(limit)) {
      return res.status(400).json({ error: 'Invalid request parameters.' });
    }

    const postIDS = await userSubmittedPosts(username, page, count);
    const posts = await userPosts(postIDS, limit);

    res.status(200).json({ posts });
  } catch (err) {
    return next(err);
  }
}
/**
 * Get user posts
 * @param {function} (req, res)
 * @returns {object} res
 */
export async function getUserCommentsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const username: string = req.params.username as string;
    const page: number = parseInt(req.query.page as string, 10) || 1; // Default to page 1 if not provided
    const count: number = parseInt(req.query.count as string, 10) || 10; // Default to 10 if not provided
    const limit: number = parseInt(req.query.limit as string, 10) || 10; // Default to 10 if not provided
    const t: string = req.query.t as string; // Assuming you're using this parameter for something else

    if (!username || isNaN(page) || isNaN(count) || isNaN(limit)) {
      return res.status(400).json({ error: 'Invalid request parameters.' });
    }
    const commmentsIDS = await userCommentsIds(username, page, count);
    const comments = await userComments(commmentsIDS, limit);

    res.status(200).json({ comments });
  } catch (err) {
    return next(err);
  }
}

/**
 * Get user overview
 * @param {function} (req, res)
 * @returns {object} res
 */
export async function getUserOverviewHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const username: string = req.params.username as string;
    const page: number = parseInt(req.query.page as string, 10) || 1; // Default to page 1 if not provided
    const count: number = parseInt(req.query.count as string, 10) || 10; // Default to 10 if not provided
    const limit: number = parseInt(req.query.limit as string, 10) || 10; // Default to 10 if not provided
    const t: string = req.query.t as string; // Assuming you're using this parameter for something else

    if (!username || isNaN(page) || isNaN(count) || isNaN(limit)) {
      return res.status(400).json({ error: 'Invalid request parameters.' });
    }
    // get user posts by username
    const postIDS = await userSubmittedPosts(username, page, count);
    const posts = await userPosts(postIDS, limit);

    // get user comments by username
    const commmentsIDS = await userCommentsIds(username, page, count);
    const comments = await userComments(commmentsIDS, limit);

    // get user replies by username
    const replyIds = await userRepliesIds(username, page, count);
    const replies = await userComments(replyIds, limit);

    // // Assuming mergeTwo returns an array of Post objects
    // const merged = await mergeTwo(posts, comments);
    // const overviewReturn = (await mergeTwo(merged, replies)).reverse();

    res.status(200).json({
      //overview: overviewReturn,
      posts,
      comments,
      replies,
    });
  } catch (err) {
    next(err);
  }
}

/****************************** BOUDY ***********************************/

export async function getUserHandler(req: Request, res: Response) {
  try {
    const username: string = req.params.username as string;
    const friend = await findUserByUsername(username);
    const user = await findUserByUsername(res.locals.user.username);

    if (!user || !res.locals.user.username) {
      return res.status(401).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    } else if (!friend) {
      return res.status(404).json({
        status: 'failed',
        message: 'User is not found',
      });
    } else {
      res.status(200).json({
        id: friend._id,
        avatar: friend.avatar,
        about: friend.about,
      });
    }
  } catch (error) {
    console.error('Error in friendRequestUserHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

export async function blockUserHandler(req: Request<blockUserInput['body']>, res: Response) {
  try {
    const { username, type } = req.body;
    const blocked = await findUserByUsername(username);
    const blocker = await findUserByUsername(res.locals.user.username);

    if (!blocked && !res.locals.user.username) {
      return res.status(405).json({
        status: 'failed',
        message: 'Account is not found and Access token is missing or invalid',
      });
    } else if (!blocked) {
      return res.status(404).json({
        status: 'failed',
        message: 'Account is not found',
      });
    } else if (!blocker || !res.locals.user.username) {
      return res.status(401).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }
    if (type === 'block') {
      await UserModel.findByIdAndUpdate(
        blocker._id,
        { $addToSet: { blocksFromMe: blocked._id } },
        { upsert: true, new: true }
      );
      await UserModel.findByIdAndUpdate(
        blocked._id,
        { $addToSet: { blocksToMe: blocker._id } },
        { upsert: true, new: true }
      );
    } else if (type === 'unblock') {
      await UserModel.findByIdAndUpdate(blocker._id, { $pull: { blocksFromMe: blocked._id } }, { new: true });
      await UserModel.findByIdAndUpdate(blocked._id, { $pull: { blocksToMe: blocker._id } }, { new: true });
    } else {
      return res.status(400).json({
        status: 'failed',
        message: 'invalid type',
      });
    }
    return res.status(200).json({
      status: 'succeeded',
    });
  } catch (error) {
    console.error('Error in blockUserHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

export async function getALLBlockedHandler(req: Request, res: Response) {
  const user = await findUserByUsername(res.locals.user.username);

  try {
    if (!user || !res.locals.user.username) {
      return res.status(401).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    } else if (!user.blocksFromMe || user.blocksFromMe.length === 0) {
      return res.status(402).json({
        status: 'failed',
        message: 'User does not have blocked users',
      });
    } else {
      const blockedIDs = user.blocksFromMe ? user.blocksFromMe.map((blockedID) => blockedID.toString()) : [];
      const blockeds = await UserModel.find({ _id: { $in: blockedIDs } });
      const blockedsData = blockeds.map((block) => ({
        username: block.username,
        about: block.about,
        avatar: block.avatar,
      }));
      res.status(200).json({
        blockedsData,
      });
    }
  } catch (error) {
    console.error('Error in getALLBlockedHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

export async function followRequestHandler(req: Request<followUserInput['body']>, res: Response) {
  try {
    const { username } = req.body;
    const followed = await findUserByUsername(username);
    const follows = await findUserByUsername(res.locals.user.username);

    if (!followed && !res.locals.user.username) {
      return res.status(405).json({
        status: 'failed',
        message: 'Account is not found and Access token is missing or invalid',
      });
    } else if (!followed) {
      return res.status(404).json({
        status: 'failed',
        message: 'Account is not found',
      });
    } else if (!res.locals.user.username || !follows) {
      return res.status(401).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }
    await UserModel.findByIdAndUpdate(
      follows._id,
      { $addToSet: { userFollows: followed._id } },
      { upsert: true, new: true }
    );
    await UserModel.findByIdAndUpdate(
      followed._id,
      { $addToSet: { followers: follows._id } },
      { upsert: true, new: true }
    );
    return res.status(200).json({
      status: 'succeeded',
    });
  } catch (error) {
    console.error('Error in followRequestHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

export async function unfollowRequestHandler(req: Request<unfollowUserInput['body']>, res: Response) {
  try {
    const { username } = req.body;
    const followed = await findUserByUsername(username);
    const follows = await findUserByUsername(res.locals.user.username);

    if (!followed && !res.locals.user.username) {
      return res.status(405).json({
        status: 'failed',
        message: 'Account is not found and Access token is missing or invalid',
      });
    } else if (!followed) {
      return res.status(404).json({
        status: 'failed',
        message: 'Account is not found',
      });
    } else if (!res.locals.user.username || !follows) {
      return res.status(401).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }
    await UserModel.findByIdAndUpdate(follows._id, { $pull: { userFollows: followed._id } }, { new: true });
    await UserModel.findByIdAndUpdate(followed._id, { $pull: { followers: follows._id } }, { new: true });
    return res.status(200).json({
      status: 'succeeded',
    });
  } catch (error) {
    console.error('Error in unfollowRequestHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

export async function getALLFollowersHandler(req: Request, res: Response) {
  const user = await findUserByUsername(res.locals.user.username);

  try {
    if (!user || !res.locals.user.username) {
      return res.status(401).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    } else if (!user.userFollows || user.userFollows.length === 0) {
      return res.status(402).json({
        status: 'failed',
        message: 'User does not have followers',
      });
    } else {
      const followersIDs = user.userFollows ? user.userFollows.map((followerID) => followerID.toString()) : [];
      const followers = await UserModel.find({ _id: { $in: followersIDs } });
      const followersData = followers.map((follower) => ({
        username: follower.username,
        about: follower.about,
        avatar: follower.avatar,
      }));
      res.status(200).json({
        followersData,
      });
    }
  } catch (error) {
    console.error('Error in getALLFollowersHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

export async function getALLFollowingHandler(req: Request, res: Response) {
  const user = await findUserByUsername(res.locals.user.username);

  try {
    if (!user || !res.locals.user.username) {
      return res.status(401).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    } else if (!user.followers || user.followers.length === 0) {
      return res.status(402).json({
        status: 'failed',
        message: 'User does not have followings',
      });
    } else {
      const followedIDs = user.followers ? user.followers.map((followedID) => followedID.toString()) : [];
      const followeds = await UserModel.find({ _id: { $in: followedIDs } });
      const followedData = followeds.map((followed) => ({
        username: followed.username,
        about: followed.about,
        avatar: followed.avatar,
      }));
      res.status(200).json({
        followedData,
      });
    }
  } catch (error) {
    console.error('Error in getALLFollowedHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/****************************** BOUDY ***********************************/
/**
 * Retrieves the user ID from the access token in the request.
 *
 * @param {Request} req - The request object containing the access token.
 * @param {Response} res - The response object to send the user ID in.
 * @return {Promise<void>} A promise that resolves when the user ID is retrieved and sent in the response.
 * @throws {Error} If the access token is missing or invalid, or an internal server error occurs.
 */
export async function getUserIDfromTokenHandler(req: Request, res: Response) {
  try {
    const user = res.locals.user;
    // Check if user is missing or invalid
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }
    // Return the user ID in the response
    res.status(200).json({
      userId: user._id, // Corrected property name
    });
  } catch (error) {
    console.error('Error in getUserIDfromToken:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

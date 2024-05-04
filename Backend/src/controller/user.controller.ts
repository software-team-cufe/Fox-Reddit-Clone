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
  ChangePasswordInput,
  ChangeEmailInput,
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
  findUserIdByUsername,
  userHistoryPosts,
} from '../service/user.service';
import { sendEmail, generateVerificationLinkToken, generatePasswordResetLinkToken } from '../utils/mailer';
import { signJwt, verifyJwt } from '../utils/jwt';
import log from '../utils/logger';
import { nanoid } from 'nanoid';
import { UserModel, VotePost } from '../model/user.model';
import { omit, shuffle } from 'lodash';
import { get } from 'config';
import PostModel from '../model/posts.model';
import { userComments } from '../service/comment.service';
import { findPostById, userPosts } from '../service/post.service';
import mergeTwo from '../middleware/user.control.midel';
import appError from '../utils/appError';
import { createNotification } from '../service/notification.service';

/**
 * Handles the creation of a user.
 *
 * @param req - The request object containing the user data.
 * @param res - The response object to send the result.
 * @returns A response indicating the success or failure of the user creation.
 */
/**
 * Handles the creation of a new user account and sends a verification email.
 *
 * @param {Request<{}, {}, CreateUserInput>} req - The request object containing the user data.
 * @param {Response} res - The response object to send the verification status.
 * @returns {Promise<void>} - A promise that resolves once the user creation and verification email sending process is complete.
 * @throws {Error} - If there is an error creating the user or sending the verification email.
 */
export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
  const body = req.body;

  try {
    const user = await createUser(body);

    const { verify_link } = generateVerificationLinkToken(String(user._id), user.verificationCode);
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
      status: 'success',
      msg: 'Verification Email Sent. Please verify your account',
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

/**
 * Handles the deletion of a user account.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves once the user deletion process is complete.
 * @throws {Error} - If there is an error deleting the user.
 */
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
          msg: 'Success! Thanks for verifying your email',
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
 * Handles the change password functionality.
 *
 * @param req - The request object containing the parameters and body.
 * @param res - The response object.
 * @returns A JSON response indicating the success or failure of the password change.
 * @throws {appError} If there is an error during the password change process.
 */
export async function changePasswrodHandler(req: Request<{}, {}, ChangePasswordInput['body']>, res: Response) {
  try {
    const message = 'change password failed';

    const user = await findUserByUsername(res.locals.user.username);
    if (!user) {
      throw new appError(message, 404);
    }
    const { currentpassword, newpassword, newpasswordConfirmation } = req.body;

    const isValid = await user.validatePassword(currentpassword);
    if (!isValid) {
      throw new appError(message, 401);
    }
    if (newpassword !== newpasswordConfirmation) {
      //already done in schema validation
      throw new appError(message, 400);
    }
    if (currentpassword === newpassword) {
      throw new appError('New password cannot be the same as the current password', 400);
    }
    //user validated
    //update password
    user.password = newpassword; //hashing handled in model
    await user.save();
    await sendEmail({
      to: user.email,
      from: {
        name: 'Fox ',
        email: getEnvVariable('FROM_EMAIL'),
      },
      subject: 'Your Fox password is updated',
      text: ` click here to login: ${getEnvVariable('FrontURL')}/login`, //replace with html, update if didnt update pass?
    });
    return res.status(200).json({
      msg: 'Password changed successfully',
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
export async function changeEmailHandler(req: Request<{}, {}, ChangeEmailInput['body']>, res: Response) {
  try {
    const user = await findUserByUsername(res.locals.user.username);
    if (!user) {
      throw new appError('not found', 404);
    }

    const oldEmail = user.email;
    const { newemail, currentpassword } = req.body;
    if (!newemail || !currentpassword) {
      throw new appError('Email and password are required', 400);
    }

    if (newemail === oldEmail) {
      throw new appError('New email cannot be the same as the old email', 400);
    }
    const isValid = await user.validatePassword(currentpassword);
    if (!isValid) {
      throw new appError('Invalid password', 401);
    }
    //user validated
    //update email
    user.email = newemail;
    user.verified = false;
    await user.save();
    const { verify_link } = generateVerificationLinkToken(String(user._id), user.verificationCode);
    await sendEmail({
      to: user.email,
      from: {
        name: 'Fox ',
        email: getEnvVariable('FROM_EMAIL'),
      },
      subject: 'Your Fox email is updated',
      text: ` Click the verify link in the email to secure your Fox account: ${verify_link}`,
    });
    await sendEmail({
      to: oldEmail,
      from: {
        name: 'Fox ',
        email: getEnvVariable('FROM_EMAIL'),
      },
      subject: 'Your Fox email is updated',
      text: ` Your email has been changed `,
    });
    return res.status(200).json({
      msg: ' Email changed successfully, please check your email for verification',
    });
  } catch (err: any) {
    if (err instanceof appError) {
      return res.status(err.statusCode).json({
        msg: err.message,
      });
    }
    if (err.code === 11000) {
      return res.status(409).json({
        msg: 'Invalid email',
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
      status: 'failed',
      message: 'Access token is missing',
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
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
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

export async function getCurrentUserNotificationPrefs(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  let user = res.locals.user;
  if (!user) {
    return res.status(401).json({
      msg: 'User doesnt exist',
    });
  }
  user = await findUserById(user._id);
  if (user.notificationPrefs) {
    return res.status(200).json({
      userPrefs: user.notificationPrefs,
    });
  } else {
    return res.status(404).json({
      userPrefs: null,
    });
  }
}
/**
 * Edit the current user's preferences.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Response} The updated user preferences.
 */
export async function editCurrentUserPrefs(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
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
export async function editCurrentUserNotificationPrefs(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  let user = res.locals.user;

  if (!user) {
    return res.status(401).send('No user logged in');
  }

  // Get specific prefs to update from request body
  const prefsToUpdate = req.body;
  // Update only those prefs on the user document
  user = await findUserById(user._id);
  Object.assign(user.notificationPrefs, prefsToUpdate);

  await user.save();

  return res.status(200).send(user.notificationPrefs);
}

export async function getUpvotedPosts(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    let user = res.locals.user;
    const sort = req.params.sort.toLowerCase();
    if (!user) {
      return res.status(401).send('No user logged in');
    }
    user = await findUserById(user._id);

    let upvotedPostIds: any[] = [];

    if (user.postVotes) {
      upvotedPostIds = user.postVotes
        .filter((vote: VotePost) => vote.type === 1) // Filter for type 1 and postID exists
        .map((vote: VotePost) => vote.postID); // Map to get only the postID
    }

    const limit = parseInt(req.query.limit as string, 10) || 10;
    const page = parseInt(req.query.page as string, 10) || 1;
    const count = parseInt(req.query.count as string, 10) || 0;

    const skip = (page - 1) * limit + count;

    const totalUpvotedPosts = upvotedPostIds.length;
    const totalPages = Math.ceil(totalUpvotedPosts / limit);

    const paginatedUpvotedPostIds = upvotedPostIds.slice(skip, skip + limit);

    let upvotedPosts;

    if (sort) {
      if (sort == 'best')
        upvotedPosts = await PostModel.find({ _id: { $in: paginatedUpvotedPostIds } }).sort({ bestFactor: -1 });
      if (sort == 'hot')
        upvotedPosts = await PostModel.find({ _id: { $in: paginatedUpvotedPostIds } }).sort({ hotnessFactor: -1 });
      if (sort == 'top')
        upvotedPosts = await PostModel.find({ _id: { $in: paginatedUpvotedPostIds } }).sort({ votesCount: -1 });
      if (sort == 'new')
        upvotedPosts = await PostModel.find({ _id: { $in: paginatedUpvotedPostIds } }).sort({ createdAt: -1 });
      if (sort == 'random') upvotedPosts = shuffle(await PostModel.find({ _id: { $in: paginatedUpvotedPostIds } }));
      if (sort != 'best' && sort != 'hot' && sort != 'top' && sort != 'new' && sort != 'random')
        upvotedPosts = shuffle(await PostModel.find({ _id: { $in: paginatedUpvotedPostIds } }));
    } else {
      upvotedPosts = shuffle(await PostModel.find({ _id: { $in: paginatedUpvotedPostIds } }));
    }

    return res.json({
      upvotedPosts,
      page,
      limit,
      totalPages,
      totalUpvotedPosts,
      sort,
    });
  } catch (error) {
    console.error('Error fetching upvoted posts:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getDownvotedPosts(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    let user = res.locals.user;
    const sort = req.params.sort.toLowerCase();
    if (!user) {
      return res.status(401).send('No user logged in');
    }
    user = await findUserById(user._id);

    let downvotedPostIds: any[] = [];

    if (user.postVotes) {
      downvotedPostIds = user.postVotes
        .filter((vote: VotePost) => vote.type === -1) // Filter for type 1 and postID exists
        .map((vote: VotePost) => vote.postID); // Map to get only the postID
    }

    const limit = parseInt(req.query.limit as string, 10) || 10;
    const page = parseInt(req.query.page as string, 10) || 1;
    const count = parseInt(req.query.count as string, 10) || 0;

    const skip = (page - 1) * limit + count;

    const totalDownvotedPosts = downvotedPostIds.length;
    const totalPages = Math.ceil(totalDownvotedPosts / limit);

    const paginatedDownvotedPostIds = downvotedPostIds.slice(skip, skip + limit);

    let downvotedPosts;

    if (sort) {
      if (sort == 'best')
        downvotedPosts = await PostModel.find({ _id: { $in: paginatedDownvotedPostIds } }).sort({ bestFactor: -1 });
      if (sort == 'hot')
        downvotedPosts = await PostModel.find({ _id: { $in: paginatedDownvotedPostIds } }).sort({ hotnessFactor: -1 });
      if (sort == 'top')
        downvotedPosts = await PostModel.find({ _id: { $in: paginatedDownvotedPostIds } }).sort({ votesCount: -1 });
      if (sort == 'new')
        downvotedPosts = await PostModel.find({ _id: { $in: paginatedDownvotedPostIds } }).sort({ createdAt: -1 });
      if (sort == 'random') downvotedPosts = shuffle(await PostModel.find({ _id: { $in: paginatedDownvotedPostIds } }));
      if (sort != 'best' && sort != 'hot' && sort != 'top' && sort != 'new' && sort != 'random')
        downvotedPosts = shuffle(await PostModel.find({ _id: { $in: paginatedDownvotedPostIds } }));
    } else {
      downvotedPosts = shuffle(await PostModel.find({ _id: { $in: paginatedDownvotedPostIds } }));
    }

    return res.json({
      downvotedPosts,
      page,
      limit,
      totalPages,
      totalDownvotedPosts,
      sort,
    });
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
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
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
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
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
      // isBanned: user?.commMember?.isBanned,
      // isMuted: user?.commMember?.isMuted,
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
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
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
 * Retrieves an overview of a user's comments.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>} A promise that resolves when the user's comments are sent in the response.
 * @throws {Error} If the user is not found or if there is an internal server error.
 */
export async function getUserCommentsHandler(req: Request, res: Response, next: NextFunction) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
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
    const commmentsIDS = await userCommentsIds(username, page, count);
    const comments = await userComments(commmentsIDS, limit);

    res.status(200).json({ comments });
  } catch (err) {
    return next(err);
  }
}

/**
 * Retrieves an overview of a user's posts, comments, and replies.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>} A promise that resolves when the user overview is sent in the response.
 * @throws {Error} If the user is not found or if there is an internal server error.
 */
export async function getUserOverviewHandler(req: Request, res: Response, next: NextFunction) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
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

/**
 * Retrieves the details of a user by their username.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {Promise<void>} A promise that resolves when the user details are sent in the response.
 * @throws {Error} If the access token is missing or invalid, or if the user is not found.
 */
export async function getUserHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    // Extract username from request parameters
    const username: string = req.params.username as string;

    // Check if res.locals.user is defined and contains the expected properties
    if (!res.locals.user || !res.locals.user.username) {
      return res.status(401).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    // Find the friend user by username
    const friend = await findUserByUsername(username);

    // Find the user by username from res.locals.user
    const user = await findUserByUsername(res.locals.user.username);

    // Check if friend user exists
    if (!friend) {
      return res.status(404).json({
        status: 'failed',
        message: 'User is not found',
      });
    }

    // Respond with friend user's details
    return res.status(200).json({
      username: friend.username,
      avatar: friend.avatar,
      about: friend.about,
    });
  } catch (error) {
    console.error('Error in getUserHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/**
 * Blocks or unblocks a user by updating the blocker's and blocked user's block lists.
 *
 * @param {Request<blockUserInput['body']>} req - The request object containing the username of the user to block/unblock and the operation type ('block' or 'unblock').
 * @param {Response} res - The response object to send the result of the block/unblock operation.
 * @returns {Promise<void>} A promise that resolves when the block/unblock operation is complete.
 * @throws {Error} If the access token is missing or invalid, the account is not found, or the operation type is invalid.
 */
export async function blockUserHandler(req: Request<blockUserInput['body']>, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
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
        {
          $addToSet: { blocksFromMe: blocked._id },
          $pull: { userFollows: blocked._id, followers: blocked._id },
        },
        { upsert: true, new: true }
      );

      await UserModel.findByIdAndUpdate(
        blocked._id,
        {
          $addToSet: { blocksToMe: blocker._id },
          $pull: { userFollows: blocker._id, followers: blocker._id },
        },
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

/**
 * Retrieves a list of all users that the current user has blocked.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the list of blocked users is sent in the response.
 * @throws {Error} If the access token is missing or invalid, or if the user does not have any blocked users.
 */
export async function getALLBlockedHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  const user = await findUserByUsername(res.locals.user.username);

  try {
    if (!user || !res.locals.user.username) {
      return res.status(401).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    } else if (!user.blocksFromMe || user.blocksFromMe.length === 0) {
      return res.status(200).json([]);
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

/**
 * Follows a user by adding the current user to the followed user's followers list and adding the followed user to the current user's userFollows list.
 *
 * @param {Request<followUserInput['body']>} req - The request object containing the username of the user to follow.
 * @param {Response} res - The response object to send the result of the follow operation.
 * @returns {Promise<void>} A promise that resolves when the follow operation is completed.
 * @throws {Error} If the account of the user to follow is not found, the access token is missing or invalid, or an internal server error occurs.
 */
export async function followRequestHandler(req: Request<followUserInput['body']>, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
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
    await createNotification(
      followed._id,
      follows.avatar ?? 'defaultIcon.jpg',
      'New Follower!',
      'newFollower',
      `${follows.username} followed you!`,
      follows._id
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

/**
 * Unfollows a user by removing the current user from the followed user's followers list and removing the followed user from the current user's userFollows list.
 *
 * @param {Request<unfollowUserInput['body']>} req - The request object containing the username of the user to unfollow.
 * @param {Response} res - The response object to send the result of the unfollow operation.
 * @returns {Promise<void>} A promise that resolves when the unfollow operation is completed.
 * @throws {Error} If the account of the user to unfollow is not found, the access token is missing or invalid, or an internal server error occurs.
 */
export async function unfollowRequestHandler(req: Request<unfollowUserInput['body']>, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
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

/**
 * Retrieves all the users that the current user is following.
 *
 * @param {Request} req - The request object containing the access token.
 * @param {Response} res - The response object to send the list of users the current user is following.
 * @return {Promise<void>} A promise that resolves when the list of following users is retrieved and sent in the response.
 * @throws {Error} If the access token is missing or invalid, the user does not have any followings, or an internal server error occurs.
 */
export async function getALLFollowersHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  const user = await findUserByUsername(res.locals.user.username);

  try {
    if (!user || !res.locals.user.username) {
      return res.status(401).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    } else if (!user.followers || user.followers.length === 0) {
      return res.status(200).json([]);
    } else {
      const followedIDs = user.followers ? user.followers.map((followedID) => followedID.toString()) : [];
      const followeds = await UserModel.find({ _id: { $in: followedIDs } });
      const followersData = followeds.map((followed) => ({
        username: followed.username,
        about: followed.about,
        avatar: followed.avatar,
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

/**
 * Retrieves all the users that the current user is following.
 *
 * @param {Request} req - The request object containing the access token.
 * @param {Response} res - The response object to send the list of users the current user is following.
 * @return {Promise<void>} A promise that resolves when the list of following users is retrieved and sent in the response.
 * @throws {Error} If the access token is missing or invalid, the user does not have any followings, or an internal server error occurs.
 */
export async function getALLFollowingHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  const user = await findUserByUsername(res.locals.user.username);

  try {
    if (!user || !res.locals.user.username) {
      return res.status(401).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    } else if (!user.userFollows || user.userFollows.length === 0) {
      return res.status(200).json([]);
    } else {
      const followersIDs = user.userFollows ? user.userFollows.map((followerID) => followerID.toString()) : [];
      const followers = await UserModel.find({ _id: { $in: followersIDs } });
      const followingsData = followers.map((follower) => ({
        username: follower.username,
        about: follower.about,
        avatar: follower.avatar,
      }));
      res.status(200).json({
        followingsData,
      });
    }
  } catch (error) {
    console.error('Error in getALLFollowingHandler:', error);
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

/**
 * Uploads a user's photo, updates the user's avatar with a new link from cloudinary, and returns a success message.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @return {Promise<void>} A promise that resolves after uploading the user's photo
 */
export async function uploadUserPhoto(req: Request, res: Response) {
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
    const userId = user._id;
    const image = res.locals.image;

    //update user avatar by new link from cloudinary
    await UserModel.findByIdAndUpdate(userId, { avatar: image }, { runValidators: true });
    res.status(200).json({
      msg: 'Avatar uploaded successfully',
      avatar: image,
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

export async function getNumberPostsCommentsMe(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  const user = await findUserByUsername(res.locals.user.username);

  try {
    if (!user || !res.locals.user.username) {
      return res.status(401).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }
    const postCount = user.hasPost?.length;
    const commentCount = user?.hasComment?.length;
    res.status(200).json({
      post: postCount,
      comment: commentCount,
    });
  } catch (error) {
    console.error('Error in getNumberPostsCommentsMe:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

export async function getNumberPostsCommentsUser(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }

  const user = await findUserByUsername(res.locals.user.username);
  const user2 = await findUserByUsername(req.params.username);

  try {
    if (!user) {
      return res.status(401).json({
        status: 'failed',
        message: 'Access token is invalid',
      });
    }

    if (!user2 || !req.params.username) {
      return res.status(401).json({
        status: 'failed',
        message: 'User not found',
      });
    }

    const postCount = user2.hasPost?.length;
    const commentCount = user2?.hasComment?.length;
    res.status(200).json({
      post: postCount,
      comment: commentCount,
    });
  } catch (error) {
    console.error('Error in getNumberPostsCommentsUser:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/**
 * Handles the request of viewing a post.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise that resolves when the function is complete.
 */
export async function viewPostHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const user = res.locals.user;
    const postID = req.body.postID;

    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }
    const post = await findPostById(req.body.postID);

    // Check if post is not found
    if (!post) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post not found',
      });
    }

    await UserModel.findByIdAndUpdate(user._id, { $addToSet: { historyPosts: postID } }, { upsert: true, new: true });

    res.status(200).json({
      msg: 'Post viewed successfully',
    });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}

/**
 * Handles the request of getting user's history posts.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} The promise that resolves when the function is complete.
 */
export async function getHistoryPostHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    // Extract params
    const user = await findUserByUsername(req.params.username as string);

    if (!user) {
      return res.status(401).json({
        status: 'failed',
        message: 'Access token is invalid',
      });
    }
    const username: string = req.params.username as string;
    const page: number = parseInt(req.query.page as string, 10) || 1; // Default to page 1 if not provided
    const count: number = parseInt(req.query.count as string, 10) || 10; // Default to 10 if not provided
    const limit: number = parseInt(req.query.limit as string, 10) || 10; // Default to 10 if not provided
    const t: string = req.query.t as string; // Assuming you're using this parameter for something else

    if (!username || isNaN(page) || isNaN(count) || isNaN(limit)) {
      return res.status(400).json({ error: 'Invalid request parameters.' });
    }

    const postIDS = await userHistoryPosts(username, page, count);
    const posts = await userPosts(postIDS, limit);

    res.status(200).json({ posts });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}

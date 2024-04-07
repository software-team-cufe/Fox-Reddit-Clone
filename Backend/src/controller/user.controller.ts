/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { getEnvVariable } from '../utils/GetEnvVariables';
import { CreateUserInput, ForgotPasswordInput, VerifyUserInput, ResetPasswordInput } from '../schema/user.schema';
import { NextFunction, Request, Response } from 'express';
import {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByUsername,
  findUserIdByUsername,
  //findUserPosts,
  userSubmittedPosts,
  userCommentsIds,
  userRepliesIds,
} from '../service/user.service';
import { sendEmail, generateVerificationLink } from '../utils/mailer';
import log from '../utils/logger';
import { nanoid } from 'nanoid';
import { UserModel, privateFields } from '../model/user.model';
import { omit } from 'lodash';
import { get } from 'config';
import userCommets, { findUserComments } from '../service/comment.service';
import userPosts from '../service/post.service';
import mergeTwo from '../middleware/user.control.midware';

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

    const verificationLink = generateVerificationLink(String(user._id), user.verificationCode);
    try {
      await sendEmail({
        to: user.email,
        from: {
          name: 'Fox ',
          email: getEnvVariable('FROM_EMAIL'),
        },
        subject: 'please verify your account',
        text: `click here to verify your account: ${verificationLink}`,
      });
    } catch (e) {
      log.error(e);
    }
    return res.send('user created successfully and verification email sent!');
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send('Email already exists');
    }

    return res.status(500).send(e);
  }
}

/**
 * Handles the verification of a user.
 *
 * @param req - The request object containing the user verification parameters.
 * @param res - The response object to send the verification result.
 *
 * @returns A promise that resolves to the verification result.
 */
export async function verifyUserHandler(req: Request<VerifyUserInput>, res: Response) {
  //extract params
  const id = req.params.id;
  const verificationCode = req.params.verificationCode;
  //find the user with the id and verification code
  const user = await findUserById(id);

  if (!user) {
    return res.send('could not verify user');
  }
  //check to see if they are already verified

  if (user.verified) {
    return res.send('user already verified');
  }

  //check to see if the verification code is correct
  if (user.verificationCode === verificationCode) {
    user.verified = true;
    await user.save();
    return res.send('user verified');
  }

  return res.send('could not verify user');
}

/**
 * Handles the forgot password functionality.
 *
 * @param req - The request object containing the email of the user.
 * @param res - The response object to send the result.
 * @returns A message indicating if the email exists and a password reset code has been sent.
 */
export async function forgotPasswordHandler(req: Request<{}, {}, ForgotPasswordInput>, res: Response) {
  const message = 'If the email exists, a password reset code will be sent to it';
  const { email } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    log.debug(`User with email ${email} does not exist`);
    return res.send(message);
  }

  if (!user.verified) {
    log.debug(`User with email ${email} is not verified`);
    return res.send("User hasn't been verified");
  }

  const passwordResetCode = nanoid();
  user.passwordResetCode = passwordResetCode;
  await user.save();

  await sendEmail({
    to: user.email,
    from: 'test@example.com',
    subject: 'Reset your password',
    text: `Password reset code: ${passwordResetCode}. Id ${user._id}`,
  });

  log.debug(`Password reset code is sent for user with email ${email} `);
  return res.send(message);
}
/**
 * Handles the reset password request.
 *
 * @param {Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>} req - The request object containing the reset password parameters and body.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the password is reset successfully.
 */
export async function resetPasswordHandler(
  req: Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>,
  res: Response
) {
  const { id, passwordResetCode } = req.params;

  const { password } = req.body;

  const user = await findUserById(id);

  if (!user || !user.passwordResetCode || user.passwordResetCode !== passwordResetCode) {
    return res.status(400).send('Could not reset password');
  }

  user.passwordResetCode = null;

  user.password = password;

  await user.save();

  return res.send('Password reset successfully');
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  return res.send(res.locals.user);
}

export async function getCurrentUserPrefs(req: Request, res: Response) {
  const user = res.locals.user;

  if (!user) {
    return res.status(401).send('No user logged in');
  }

  return res.send(user.prefs);
}

export async function editCurrentUserPrefs(req: Request, res: Response) {
  const user = res.locals.user;

  if (!user) {
    return res.status(401).send('No user logged in');
  }

  // Get specific prefs to update from request body
  const prefsToUpdate = req.body.prefs;

  // Update only those prefs on the user document
  Object.assign(user.prefs, prefsToUpdate);

  await user.save();

  return res.status(200).send(user.prefs);
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
      return res.status(200).json('Not Available');
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
 * Get user posts
 * @param {function} (req, res)
 * @returns {object} res
 */
export async function getUserSubmittedHandler(req: Request, res: Response, next: NextFunction) {
  let posts;
  try {
    const username: string = req.params.username as string;
    if (!req.query || !username) {
      return res.status(400).send('Invalid request');
    }
    const postIDS = await userSubmittedPosts(username);
    posts = await userPosts(postIDS, req.query);
  } catch (err) {
    return next(err);
  }
  res.status(200).json({
    posts,
  });
}
/**
 * Get user posts
 * @param {function} (req, res)
 * @returns {object} res
 */
export async function getUserCommentsHandler(req: Request, res: Response, next: NextFunction) {
  let comments;
  try {
    const username: string = req.params.username as string;
    if (!req.query || !username) {
      return res.status(400).send('Invalid request');
    }
    const commmentsIDS = await userCommentsIds(username);
    comments = await userCommets(commmentsIDS, req.query);
  } catch (err) {
    return next(err);
  }
  res.status(200).json({
    comments,
  });
}
/**
//  * Get user overview
//  * @param {function} (req, res)
//  * @returns {object} res
//  */
// export async function getUserOverview(req: Request, res: Response, next: NextFunction) {
//   try {
//     const postIds = await userSubmittedPosts(req.params.username);
//     const posts = await userPosts(postIds, req.query);
//     const commentIds = await userCommentsIds(req.params.username);
//     const comments = await userCommets(commentIds, req.query);
//     const replyIds = await userRepliesIds(req.params.username);
//     const replies = await userCommets(replyIds, req.query);

//     // Assuming mergeTwo returns an array of Post objects
//     const merged = await mergeTwo(posts, comments);
//     const overviewReturn = (await mergeTwo(merged, replies)).reverse();

//     res.status(200).json({
//       overview: overviewReturn,
//     });
//   } catch (err) {
//     next(err);
//   }
//}

// /**
//  * Handles user submitted (posts) by username request.
//  *
//  * @param req - The request object containing the user data.
//  * @param res - The response object to send the result.
//  * @returns A response for user posts by username.
//  */
// export async function submittedPostByUsrnameHandler(req: Request, res: Response) {
//   try {
//     // Extract params
//     const username: string = req.params.username as string;
//     const sortBy: string = req.query.sortBy as string;

//     if (!sortBy || !username) {
//       res.status(400).send('Invalid request');
//     }

//     const userId = await findUserIdByUsername(username);

//     if (!userId) {
//       return res.status(404).send('User not found');
//     }

//     const retrievedPosts = await findUserPosts(userId, sortBy);

//     if (!retrievedPosts) {
//       return res.status(404).send('No posts found for this user');
//     }

//     if (retrievedPosts.length === 0) {
//       return res.status(404).send('No posts found for this user');
//     }

//     return res.status(200).json(retrievedPosts);
//   } catch (error) {
//     console.error('Error handling user request:', error);
//     return res.status(500).send('Internal server error');
//   }
// }

// /**
//  * Handles user overview (posts, comments, replies) by username request.
//  *
//  * @param req - The request object containing the user data.
//  * @param res - The response object to send the result.
//  * @returns A response for user posts, comments and replies by username.
//  */
// export async function userOverviewHandler(req: Request, res: Response) {
//   try {
//     // Extract params
//     const username: string = req.params.username as string;
//     const sortBy: string = req.query.sortBy as string;

//     if (!sortBy || !username) {
//       return res.status(400).send('Invalid request');
//     }

//     const userId = await findUserIdByUsername(username);

//     if (!userId) {
//       return res.status(404).send('User not found');
//     }

//     const retrievedPosts = await findUserPosts(userId, sortBy);
//     const retrievedComments = await findUserComments(userId, sortBy);
//     //const retrievedReplies = await findUserReplies(userId, sortBy);

//     if (!retrievedPosts || !retrievedComments) {
//       return res.status(404).send('No posts or comments found for this user');
//     }

//     if (retrievedPosts.length === 0 && retrievedComments.length === 0) {
//       return res.status(404).send('No posts or comments found for this user');
//     }

//     return res.status(200).json({ retrievedPosts, retrievedComments });
//   } catch (error) {
//     console.error('Error handling user request:', error);
//     return res.status(500).send('Internal server error');
//   }
// }

/****************************** BOUDY ***********************************/

// export async function getFriendHandler(req: Request, res: Response) {
//   const username: string = req.params.username as string;
//   const user = await findUserByUsername(username);

//   if (!user) {
//     return res.status(404).send('could not find friend');
//   } else {
//     res.status(200).json({
//       id: user._id,
//       avatar: user.avatar,
//       about: user.about,
//     });
//   }
// }

// export async function getALLFriendsHandler(req: Request, res: Response) {
//   const { id } = req.body.username; //create auth, token middle ware and add the username to request body

//   const user = await findUserById(id);

//   if (!user) {
//     return res.status(404).send('could not find friend');
//   } else {
//     res.status(200).json({
//       //friends: user.friends
//     });
//   }
// }

// export async function friendRequestHandler(req: Request<friendRequest['body']>, res: Response) {
//   const { username, type } = req.body;

//   const reciever = await findUserByUsername(username);
//   const sender = reciever;
//   //const sender = res.local.user;

//   if (!reciever && !sender) {
//     return res.status(405).json({
//       status: 'failed',
//       message: 'Account is not found and Access token is missing or invalid',
//     });
//   } else if (!reciever) {
//     return res.status(404).json({
//       status: 'failed',
//       message: 'Account is not found',
//     });
//   } else if (!sender) {
//     return res.status(401).json({
//       status: 'failed',
//       message: 'Access token is missing or invalid',
//     });
//   } else if (type == 'frindRequest') {
//     await friendUser(reciever, sender);
//   } else if (type == 'moderatorInvite') {
//     // moderator invite
//   } else {
//     return res.status(400).json({
//       status: 'failed',
//       message: 'Invalid type',
//     });
//   }
//   return res.status(200).json({
//     status: 'succeeded',
//   });
// }

// export async function unFriendRequestHandler(req: Request<unFriendRequest['body']>, res: Response) {
//   const { usernameid, type } = req.body;

//   const user = await findUserByUsername(usernameid);

//   if (type == 'unFrindRequest') {
//     //remove friend from database
//   } else if (type == 'moderatorInvite') {
//     // moderator invite
//   } else {
//     return res.status(400).json({
//       status: 'failed',
//       message: 'invalid type',
//     });
//   }
//   return res.status(200).json({
//     status: 'succeeded',
//   });
// }

// export async function reportUserHandler(req: Request<reportUser['body']>, res: Response) {
//   const { usernameid } = req.body;

//   const user = await findUserByUsername(usernameid);
// }

// export async function blockUserHandler(req: Request<blockUserInput['body']>, res: Response) {
//   const { username, type } = req.body; //type block or unblock
//   const blocked = await findUserByUsername(username);
//   const blocker = blocked;
//   //const blocker = res.local.user;

//   if (!blocked && !blocker) {
//     return res.status(405).json({
//       status: 'failed',
//       message: 'Account is not found and Access token is missing or invalid',
//     });
//   } else if (!blocked) {
//     return res.status(404).json({
//       status: 'failed',
//       message: 'Account is not found',
//     });
//   } else if (!blocker) {
//     return res.status(401).json({
//       status: 'failed',
//       message: 'Access token is missing or invalid',
//     });
//   }
//   let updatedBlocked: User;
//   let updatedBlocker: User;
//   if (type === 'block') {
//     updatedBlocked = await blockUser1(blocked, blocker);
//     updatedBlocker = await blockUser2(blocked, blocker);
//     const savedBlocked = await UserModel.updateOne({ _id: username }, updatedBlocked);
//     console.log(savedBlocked);
//   } else if (type === 'unblock') {
//     //await unblockUser(blocked, blocker);
//   } else {
//     return res.status(400).json({
//       status: 'failed',
//       message: 'invalid type',
//     });
//   }
//   return res.status(200).json({
//     status: 'succeeded',
//   });
// }
/****************************** BOUDY ***********************************/

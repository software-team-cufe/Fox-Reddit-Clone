/* eslint-disable @typescript-eslint/ban-types */
//  Manage all authentification routes
import { Request, Response } from 'express';
import { CreateSessionInput } from '../schema/auth.schema';
import { findUserByUsername, findUserById } from '../service/user.service';
import { signAccessToken, signRefreshToken, findSessionById } from '../service/auth.service';
import { verifyJwt } from '../utils/jwt';
import { get } from 'lodash';
import appError from '../utils/appError';
/**
 * Handles creating a new user session by signing JWT access and refresh tokens.
 *
 * Validates the provided username and password, then generates and returns
 * an access token and refresh token if valid.
 *
 * @param req - The request object containing the username and password in the body.
 * @param res - The response object to send the access token and refresh token.
 * @returns A response containing the access token and refresh token if the username and password are valid.
 */
export async function createSessionHandeler(req: Request<{}, {}, CreateSessionInput>, res: Response) {
  const message = 'Invalid username or password';
  const { username, password } = req.body;

  const user = await findUserByUsername(username);

  try {
    if (!user) {
      throw new appError(message, 401);
    }

    //skip verified
    // if (!user.verified) {
    //  return res.send('Please verify your email');
    // }

    const isValid = await user.validatePassword(password);
    if (!isValid) {
      throw new appError(message, 401);
    }
  } catch (err) {
    if (err instanceof appError) {
      return res.status(err.statusCode).json({
        msg: err.message,
      });
    }
    return res.status(500).json({
      msg: 'Something went wrong',
    });
  }

  // sign a access token
  const accessToken = signAccessToken(user);
  //sign a refresh token
  const refreshToken = await signRefreshToken({ userId: user._id.toString() });
  // send the access token and refresh token to the client(store in client)
  return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, user: user });
}

/**
 * Handles refreshing an access token using a refresh token.
 *
 * Validates the provided refresh token and session and generates
 * a new access token if valid.
 *
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @returns A Promise that resolves to the new access token.
 *
 * @throws 401 - If the refresh token is missing or invalid.
 *
 * @example
 * /Request
 * POST /refresh-token
 * Headers:
 *   x-refresh: <refresh_token>
 *
 * /Response
 * Status: 200 OK
 * Body:
 * {
 *   "accessToken": "<new_access_token>"
 * }
 */
export async function refreshAccessTokenHandler(req: Request, res: Response) {
  const refreshToken = get(req, 'headers.x-refresh') as string;

  const message = 'Could not refresh access token';
  if (!refreshToken) {
    throw new appError(message, 401);
  }

  const decoded = verifyJwt<{ session: string }>(refreshToken);

  if (!decoded) {
    throw new appError(message, 401);
  }
  const session = await findSessionById(decoded.session);
  if (!session || !session.valid) {
    throw new appError(message, 401);
  }
  const user = await findUserById(String(session.user));

  if (!user) {
    throw new appError(message, 401);
  }
  const accessToken = signAccessToken(user);
  return res.status(200).json({ accessToken });
}

export async function getFCMToken(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  let user = res.locals.user;
  user = await findUserById(user._id);
  user.fcmtoken = req.body.fcmtoken;
  await user.save();
  return res.status(200).json('Token acquired.');
}

//  Manage all authentification routes
import { Request, Response } from 'express';
import { CreateSessionInput } from '../schema/auth.schema';
import { findUserByUsername, findUserById } from '../service/user.service';
import { signAccessToken, signRefreshToken, findSessionById } from '../service/auth.service';
import { verifyJwt } from '../utils/jwt';
import { get } from 'lodash';
// eslint-disable-next-line @typescript-eslint/ban-types
export async function createSessionHandeler(req: Request<{}, {}, CreateSessionInput>, res: Response) {
  const message = 'Invalid email or password';
  const { username, password } = req.body;

  const user = await findUserByUsername(username);

  if (!user) {
    return res.send(message);
  }

  if (!user.verified) {
    return res.send('Please verify your email');
  }

  const isValid = await user.validatePassword(password);
  if (!isValid) {
    return res.send(message);
  }

  // sign a access token
  const accessToken = signAccessToken(user);
  //sign a refresh token
  const refreshToken = await signRefreshToken({ userId: user._id.toString() });
  // send the access token and refresh token to the client(store in client)
  return res.send({ accessToken, refreshToken });
}

export async function refreshAccessTokenHandler(req: Request, res: Response) {
  const refreshToken = get(req, 'headers.x-refresh') as string;

  const message = 'Could not refresh access token';
  if (!refreshToken) {
    return res.status(401).send('Refresh token is missing');
  }

  const decoded = verifyJwt<{ session: string }>(refreshToken);

  if (!decoded) {
    return res.status(401).send(message);
  }
  const session = await findSessionById(decoded.session);
  if (!session || !session.valid) {
    return res.status(401).send(message);
  }
  const user = await findUserById(String(session.user));

  if (!user) {
    return res.status(401).send(message);
  }
  const accessToken = signAccessToken(user);
  return res.send({ accessToken });
}

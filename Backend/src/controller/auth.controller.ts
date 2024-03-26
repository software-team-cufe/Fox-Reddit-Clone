//  Manage all authentification routes
import { Request, Response } from 'express';
import { CreateSessionInput } from '../schema/auth.schema';
import { findUserByUsername } from '../service/user.service';
import { signAccessToken, signRefreshToken } from '../service/auth.service';
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

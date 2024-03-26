import { signJwt } from '../utils/jwt';
import { User, privateFields } from '../model/user.model';
import { DocumentType } from '@typegoose/typegoose';
import { omit } from 'lodash';
import SessionModel from '../model/session.model';

export async function createSession({ userId }: { userId: string }) {
  return SessionModel.create({ user: userId });
}

export async function signRefreshToken({ userId }: { userId: string }) {
  const session = await createSession({ userId });
  const refreshToken = signJwt({ session: session._id }, 'refreshTokenPrivateKey', {
    expiresIn: '1y',
  });
  return refreshToken;
}

/**
 * Generates a JSON Web Token (JWT) access token for the given user.
 *
 * @param user - The user object for which to generate the access token.
 * @returns The generated access token as a string.
 */
export function signAccessToken(user: DocumentType<User>) {
  const payload = omit(user.toJSON(), privateFields);

  const accessToken = signJwt(payload, 'accessTokenPrivateKey', {
    expiresIn: '15m',
  });

  return accessToken;
}

export async function findSessionById(id: string) {
  return SessionModel.findById(id);
}

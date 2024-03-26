import { signJwt } from '../utils/jwt';
import { User } from '../model/user.model';
import { DocumentType } from '@typegoose/typegoose';
import SessionModel from '../model/session.model';
import { getEnvVariable } from '../utils/envVariables';
export async function createSession({ userId }: { userId: string }) {
  return SessionModel.create({ user: userId });
}

export async function signRefreshToken({ userId }: { userId: string }) {
  const session = await createSession({ userId });
  const refreshToken = signJwt({ session: session._id }, 'REFRESH_TOKEN_PRIVATE_KEY', {
    expiresIn: `${getEnvVariable('REFRESH_TOKEN_EXPIRES_IN')}m`,
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
  const payload = user.toJSON();

  const accessToken = signJwt(payload, 'ACCESS_TOKEN_PRIVATE_KEY', {
    expiresIn: `${getEnvVariable('ACCESS_TOKEN_EXPIRES_IN')}m`,
  });

  return accessToken;
}

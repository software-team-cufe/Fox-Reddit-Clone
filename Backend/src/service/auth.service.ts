import { signJwt } from '../utils/jwt';
import { User, privateFields } from '../model/user.model';
import { DocumentType } from '@typegoose/typegoose';
import { omit } from 'lodash';
import SessionModel from '../model/session.model';

/**
 * Creates a new session for the given user ID.
 *
 * @param {string} userId - The ID of the user to create the session for.
 * @returns {Promise<DocumentType<Session>>} The newly created session document.
 */
export async function createSession({ userId }: { userId: string }) {
  return SessionModel.create({ user: userId });
}

/**
 * Generates a refresh token for the given user ID.
 *
 * @param {string} userId - The ID of the user.
 * @returns {string} The generated refresh token.
 */
export async function signRefreshToken({ userId }: { userId: string }) {
  const session = await createSession({ userId });
  const refreshToken = signJwt(
    { session: session._id },
    {
      expiresIn: '1y',
    }
  );
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

  const accessToken = signJwt(payload, {
    expiresIn: '15m',
  });

  return accessToken;
}
/**
 * Finds a session by its ID.
 *
 * @param {string} id - The ID of the session to find.
 * @returns {Promise<DocumentType<Session> | null>} - A promise that resolves to the found session document, or null if not found.
 */
export async function findSessionById(id: string) {
  return SessionModel.findById(id);
}

/* eslint-disable import/default */
import jwt from 'jsonwebtoken';
import config from 'config';
import { getEnvVariable } from './envVariables';
/**
 * Signs a JSON Web Token (JWT) using the specified object, key name, and options.
 *
 * @param object - The object to be encoded in the JWT.
 * @param keyName - The name of the private key to be used for signing the JWT. Must be either 'accessTokenPrivateKey' or 'refreshTokenPrivateKey'.
 * @param options - Optional. Additional options for signing the JWT.
 * @returns The signed JWT.
 */
export function signJwt(
  object: object,
  keyName: 'ACCESS_TOKEN_PRIVATE_KEY' | 'REFRESH_TOKEN_PRIVATE_KEY',
  options?: jwt.SignOptions | undefined
) {
  const signinKey = Buffer.from(getEnvVariable(keyName), 'base64').toString('ascii');
  return jwt.sign(object, signinKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export function verifyJwt<T>(token: string, keyName: 'ACCESS_TOKEN_PUBLIC_KEY' | 'REFRESH_TOKEN_PUBLIC_KEY'): T | null {
  const publicKey = Buffer.from(getEnvVariable(keyName), 'base64').toString('ascii');
  try {
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (err) {
    console.error(err);
    return null;
  }
}

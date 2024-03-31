/* eslint-disable import/default */
import jwt from 'jsonwebtoken';
import config from 'config';
import { getEnvVariable } from './GetEnvVariables';
/**
 * Signs a JSON Web Token (JWT) using the specified object, key name, and options.
 *
 * @param object - The object to be encoded in the JWT.
 * @param keyName - The name of the private key to be used for signing the JWT. Must be either 'accessTokenPrivateKey' or 'refreshTokenPrivateKey'.
 * @param options - Optional. Additional options for signing the JWT.
 * @returns The signed JWT.
 */
export function signJwt(object: object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, getEnvVariable('JWT_SECRET_KEY'), {
    ...(options && options),
    algorithm: 'HS256',
  });
}

export function verifyJwt<T>(token: string): T | null {
  try {
    const decoded = jwt.verify(token, getEnvVariable('JWT_SECRET_KEY')) as T;
    return decoded;
  } catch (err) {
    return null;
  }
}

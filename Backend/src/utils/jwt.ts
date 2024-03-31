import jwt from 'jsonwebtoken';
import config from 'config';

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
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options?: jwt.SignOptions | undefined
) {
  const signinKey = Buffer.from(config.get<string>(keyName), 'base64').toString('ascii');
  return jwt.sign(object, signinKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export function verifyJwt<T>(token: string, keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'): T | null {
  const publicKey = Buffer.from(config.get<string>(keyName), 'base64').toString('ascii');
  try {
    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as T;
    return decoded;
  } catch (err) {
    return null;
  }
}

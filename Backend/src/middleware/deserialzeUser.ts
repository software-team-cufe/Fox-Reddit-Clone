import { verifyJwt } from '../utils/jwt';
import { Request, Response, NextFunction } from 'express';
/**
 * Verifies the JWT token from the request header and returns
 * the decoded user object.
 *
 * @param req - The request object
 * @param res - The response object
 * @param next - The next middleware function
 * @returns {Promise<void>} - Returns a Promise that resolves to void
 */
const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = (req.headers.authorization || '').replace(/^Bearer\s/, '');
  if (!accessToken) {
    return next();
  }
  const decoded = verifyJwt(accessToken);
  if (decoded) {
    res.locals.user = decoded;
  }
  return next();
};

export default deserializeUser;

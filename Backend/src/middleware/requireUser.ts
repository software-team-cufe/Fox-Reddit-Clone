import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to require a user is authenticated.
 * Checks res.locals for a user and returns 403 if not found.
 * Otherwise calls next().
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next middleware function
 * @return {void}
 */
const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  if (!user) {
    return res.sendStatus(403);
  }
  return next();
};

export default requireUser;

import { verifyJwt } from '../utils/jwt';
import { Request, Response, NextFunction } from 'express';

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = (req.headers.authorization || '').replace(/^bearer\s/, '');
  if (!accessToken) {
    console.log('No token present.');
    return next();
  }
  console.log('Token found!');
  const decoded = verifyJwt(accessToken, 'accessTokenPublicKey');
  if (decoded) {
    res.locals.user = decoded;
  }
};

export default deserializeUser;

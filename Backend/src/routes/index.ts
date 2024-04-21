import express from 'express';
import user from './user.routes';
import auth from './auth.routes';
import listing from './listing.routes';
//import communityy from './community.routes'
const router = express.Router();

router.get('/healthcheck', (_, res) => res.sendStatus(200));

router.use(auth);
router.use(user);
router.use(listing);
//router.use(communityy);

export default router;

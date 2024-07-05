import express from 'express';
import user from './user.routes';
import auth from './auth.routes';
import listing from './listing.routes';
import communityy from './community.routes';
import messsage from './message.routes';
import search from './search.routes';
import notification from './notification.routes';

const router = express.Router();

router.get('/healthcheck', (_, res) => res.sendStatus(200));

router.use(auth);
router.use(user);
router.use(listing);
router.use(communityy);
router.use(messsage);
router.use(search);
router.use(notification);
export default router;

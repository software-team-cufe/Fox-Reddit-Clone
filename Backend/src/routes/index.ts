import express from 'express';
import user from './user.routes';
import auth from './auth.routes';
import listing from './listing.routes';
const router = express.Router();

router.get('/healthcheck', (_, res) => res.sendStatus(200));

router.use(auth);
router.use(user);
router.use(listing);

export default router;

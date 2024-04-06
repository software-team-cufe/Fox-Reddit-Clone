import express from 'express';
import user from './user.routes';
import auth from './auth.routes';
import comment from './comment.routes';
const router = express.Router();

router.get('/healthcheck', (_, res) => res.sendStatus(200));

router.use(auth);
router.use(user);
router.use(comment);

export default router;

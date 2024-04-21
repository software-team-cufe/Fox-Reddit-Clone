import express from 'express';
import {
  getCommunityOfUserAsModeratorHandler,
  getCommunityOfUserAsMemeberHandler,
} from '../controller/community.controller';

const router = express.Router();

router.get('/user/:username/members', getCommunityOfUserAsMemeberHandler);
router.get('/user/:username/moderators', getCommunityOfUserAsModeratorHandler);

export default router;

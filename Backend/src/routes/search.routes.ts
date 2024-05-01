import express from 'express';
import validateResource from '../middleware/validateResource';
import { searchSubredditSchema, searchNormalSchema } from '../schema/search.schema';

const router = express.Router();

router.route('/r/:subreddit/search').get(validateResource(searchSubredditSchema));

router.route('/r/search').get(validateResource(searchNormalSchema));

export default router;

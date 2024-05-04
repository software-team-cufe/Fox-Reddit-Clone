import express from 'express';
import validateResource from '../middleware/validateResource';
import { searchSubredditSchema, searchNormalSchema } from '../schema/search.schema';
import { searchHomeHandler } from '../controller/search.controller';
const router = express.Router();

router.route('/r/:subreddit/search').get(validateResource(searchSubredditSchema));

router.route('/r/search').get(validateResource(searchNormalSchema), searchHomeHandler);

export default router;
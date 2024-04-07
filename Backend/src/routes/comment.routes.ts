import express from 'express';
import validateResource from '../middleware/validateResource';
import { commentsByUsrnameHandler } from '../controller/comment.controller';

const router = express.Router();

//router.get('/user/:username/comments', commentsByUsrnameHandler);

export default router;

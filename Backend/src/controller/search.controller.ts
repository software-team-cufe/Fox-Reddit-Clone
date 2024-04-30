/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { SearchSubredditInput, SearchNormalInput } from '../schema/search.schema';
import PostModel from '../model/posts.model';
import CommunityModel from '../model/community.model';
import UserModel from '../model/user.model';
import CommentModel from '../model/comments.model';

export async function searchHomeHandler(
  req: Request<{}, {}, {}, SearchNormalInput['query']>,
  res: Response,
  next: NextFunction
) {
  try {
    const query = req.query;
    const searchkey = query.searchkey as string;
    const type = query.type as 'link' | 'sr' | 'comment' | 'user';
    const sort = query.sort as string;
    //search type can be link/posts, sr/subreddits,comments, users
    const searchType =
      type === 'link' ? 'posts' : type === 'sr' ? 'subreddits' : type === 'comment' ? 'comments' : 'users';
    //search logic here
    //switch case
    switch (searchType) {
      case 'posts': {
        const posts = await PostModel.find({
          $or: [{ title: { $regex: searchkey, $options: 'i' } }, { textHTML: { $regex: searchkey, $options: 'i' } }],
        })
          .sort({ [sort]: -1 })
          .exec();
        return res.status(200).json({ posts });
      }

      case 'subreddits': {
        const subreddits = await CommunityModel.find({
          $or: [{ name: { $regex: searchkey, $options: 'i' } }, { description: { $regex: searchkey, $options: 'i' } }],
        })
          .sort({ [sort]: -1 })
          .exec();
        return res.status(200).json({ subreddits });
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

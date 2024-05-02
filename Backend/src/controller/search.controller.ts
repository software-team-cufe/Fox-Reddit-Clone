/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { SearchSubredditInput, SearchNormalInput } from '../schema/search.schema';
import PostModel from '../model/posts.model';
import CommunityModel from '../model/community.model';
import UserModel from '../model/user.model';
import CommentModel from '../model/comments.model';
import { getSrSearchResult } from '../service/community.service';
import { getUserSearchResult } from '../service/user.service';
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
    //page and limit
    // Convert strings to numbers
    const pageString = req.query.page;
    const limitString = req.query.limit;
    const page = pageString ? parseInt(pageString, 10) : 1; // Convert page string to number, default to 1 if not provided
    const limit = limitString ? parseInt(limitString, 10) : 10; // Convert limit string to number, default to 10 if not provided
    //search type can be link/posts, sr/subreddits,comments, users
    const searchType =
      type === 'link' ? 'posts' : type === 'sr' ? 'subreddits' : type === 'comment' ? 'comments' : 'users';
    //check if user is authenticated
    let userAuthenticated;
    if (res.locals.user) {
      userAuthenticated = true;
      const userId = res.locals.user._id;
    } else {
      userAuthenticated = false;
    }

    //search logic here
    //switch case
    switch (searchType) {
      // case 'posts':
      //   {
      //     const posts = await PostModel.find({
      //       $or: [{ title: { $regex: searchkey, $options: 'i' } }, { textHTML: { $regex: searchkey, $options: 'i' } }],
      //     });
      //     return res.status(200).json({ posts });
      //   }
      //   break;

      case 'subreddits':
        {
          const subreddits = await getSrSearchResult(searchkey, page, limit, userAuthenticated);
          return res.status(200).json({ subreddits });
        }
        break;

      case 'users':
        {
          const users = await getUserSearchResult(searchkey, page, limit);
          return res.status(200).json({ users });
        }
        break;
    }
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

// create search sugesstions function so as user enters in the search bar it will show sugesstions

/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { SearchSubredditInput, SearchNormalInput } from '../schema/search.schema';
import PostModel from '../model/posts.model';
import CommunityModel from '../model/community.model';
import UserModel from '../model/user.model';
import CommentModel from '../model/comments.model';
import {
  getSrSearchResultNotAuth,
  getSrSearchResultAuth,
  getPostsSearchResultsNotAuth,
  getPostsSearchResultsAuth,
} from '../service/community.service';
import { getUserSearchResult } from '../service/user.service';
export async function searchHomeHandler(
  req: Request<{}, {}, {}, SearchNormalInput['query']>,
  res: Response,
  next: NextFunction
) {
  try {
    const query = req.query;
    const searchkey = query.q as string;
    const type = query.type as 'link' | 'sr' | 'comment' | 'user';
    const sort = query.sort as string;
    const topBy = query.topBy as string;
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
    } else {
      userAuthenticated = false;
    }

    //search logic here
    //switch case
    switch (searchType) {
      case 'posts':
        if (!userAuthenticated) {
          const postsSearchResultNotAuth = await getPostsSearchResultsNotAuth(page, limit, searchkey, sort, topBy);
          return res.status(200).json({ postsSearchResultNotAuth });
        } else if (userAuthenticated) {
          const postsSearchResultAuth = await getPostsSearchResultsAuth(
            page,
            limit,
            res.locals.user._id,
            searchkey,
            sort,
            topBy
          );
          return res.status(200).json({ postsSearchResultAuth });
        }
        break;

      case 'subreddits':
        {
          if (!userAuthenticated) {
            const communitySearchResultNotAuth = await getSrSearchResultNotAuth(searchkey, page, limit);
            return res.status(200).json({ communitySearchResultNotAuth });
          } else if (userAuthenticated) {
            const communitySearchResultAuth = await getSrSearchResultAuth(searchkey, page, limit, res.locals.user._id);
            return res.status(200).json({ communitySearchResultAuth });
          }
        }
        break;

      case 'users':
        {
          const users = await getUserSearchResult(searchkey, page, limit);
          return res.status(200).json({ users });
        }
        break;
      case 'comments': {
        //pass sort option
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

// create search sugesstions function so as user enters in the search bar it will show sugesstions

/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { SearchSubredditInput, SearchNormalInput } from '../schema/search.schema';
import PostModel from '../model/posts.model';
import CommunityModel from '../model/community.model';
import UserModel from '../model/user.model';
import CommentModel from '../model/comments.model';
import {
  findCommunityByName,
  getSrSearchResultNotAuth, //home page search by subreddit
  getSrSearchResultAuth, //home page search by subreddit
  getPostsSearchResultsNotAuth, //home page search by posts
  getPostsSearchResultsAuth, //home page search by posts
  getSubredditSearchPosts, //search in subreddit by posts
  getTrendingSearches,
} from '../service/community.service';
import {
  getCommentSearchResultsNotAuth,
  getCommentSearchResultsAuth,
  getSubredditCommentsSearch,
} from '../service/comment.service';
import { getUserSearchResult, getHiddenPosts } from '../service/user.service';

/**
 * Handles the search functionality for the home page.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 * @returns The search results based on the search type.
 * @throws {Error} If there is an internal server error.
 */
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
    let hiddenPosts;
    if (res.locals.user) {
      userAuthenticated = true;
      hiddenPosts = await getHiddenPosts(res.locals.user._id);
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
            topBy,
            hiddenPosts
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
      case 'comments':
        {
          if (!userAuthenticated) {
            const commentsSearchResultNotAuth = await getCommentSearchResultsNotAuth(page, limit, searchkey, sort);
            return res.status(200).json({ commentsSearchResultNotAuth });
          } else if (userAuthenticated) {
            const commentsSearchResultAuth = await getCommentSearchResultsAuth(
              res.locals.user._id,
              page,
              limit,
              searchkey,
              sort,
              hiddenPosts
            );
            return res.status(200).json({ commentsSearchResultAuth });
          }
        }
        break;
      default:
        //default to posts
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
            topBy,
            hiddenPosts
          );
          return res.status(200).json({ postsSearchResultAuth });
        }
    }
  } catch (error) {
    return res.status(500).json({
      msg: 'Internal server error in search',
    });
  }
}

/**
 * Handles the search for subreddits.
 *
 * @param req - The request object containing the subreddit name and search parameters.
 * @param res - The response object to send the search results.
 * @param next - The next function to call in the middleware chain.
 * @returns A JSON response with the search results.
 * @throws 404 error if the subreddit is not found.
 * @throws 401 error if the subreddit is private and the user is not a member or moderator.
 * @throws 500 error if there is an internal server error.
 */
export async function searchSubredditHandler(
  req: Request<SearchSubredditInput['params'], {}, {}, SearchSubredditInput['query']>,
  res: Response,
  next: NextFunction
) {
  try {
    const subredditName = req.params.subreddit;
    const Subreddit = await findCommunityByName(subredditName);
    if (!Subreddit) {
      return res.status(404).json({
        msg: 'Subreddit not found',
      });
    }
    const user = res.locals.user;
    //check if subreddit is private that user is a member or a moderator in it
    //two checks if subreddit private and user not logged in, and if subreddit private and user logged in has to be member or moderator
    if (Subreddit.privacyType === 'Private') {
      if (!user) {
        return res.status(401).json({
          msg: 'Unauthorized, Subreddit is private',
        });
      }
      // Check if the user is a member
      const isMember = user.member.some(
        (member: { communityId: string }) => member.communityId.toString() === Subreddit._id.toString()
      );

      // Check if the user is a moderator
      const isModerator = user.moderators.some(
        (moderators: { communityId: string }) => moderators.communityId.toString() === Subreddit._id.toString()
      );
      if (!isMember && !isModerator) {
        return res.status(401).json({
          msg: 'Unauthorized, Subreddit is private',
        });
      }
    }
    const query = req.query;
    const searchkey = query.q as string;
    const type = query.type as 'link' | 'comment';
    const sort = query.sort as string;
    const topBy = query.topBy as string;
    //page and limit
    // Convert strings to numbers
    const pageString = req.query.page;
    const limitString = req.query.limit;
    const page = pageString ? parseInt(pageString, 10) : 1; // Convert page string to number, default to 1 if not provided
    const limit = limitString ? parseInt(limitString, 10) : 10; // Convert limit string to number, default to 10 if not provided
    //search type can be link/posts, sr/subreddits,comments, users
    const searchType = type === 'link' ? 'posts' : type === 'comment' ? 'comments' : 'posts';
    //check if user is authenticated
    let hiddenPosts;
    if (res.locals.user) {
      hiddenPosts = await getHiddenPosts(res.locals.user._id);
    }
    //check the moderator and hidden part
    //search logic here
    //switch case
    switch (searchType) {
      case 'posts':
        {
          const subredditSearchPosts = await getSubredditSearchPosts(
            subredditName,
            page,
            limit,
            searchkey,
            sort,
            topBy,
            hiddenPosts
          );
          return res.status(200).json({ subredditSearchPosts });
        }
        break;
      case 'comments':
        {
          const subredditSearchComments = await getSubredditCommentsSearch(
            subredditName,
            page,
            limit,
            searchkey,
            sort,
            hiddenPosts
          );
          return res.status(200).json({ subredditSearchComments });
        }
        break;
      default:
        break;
    }
  } catch (error) {
    return res.status(500).json({
      msg: 'Internal server error in search',
    });
  }
}
/**
 * Handles the request to get trending searches.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @returns {Promise<Response>} The response containing the trending searches.
 * @throws {Error} If there is an error in getting the trending searches.
 */
export async function getTrendingSearchesHandller(req: Request, res: Response, next: NextFunction) {
  try {
    //define the page and limit for the trending search results
    const page = 1;
    const limit = 6;
    const trendingSearches = await getTrendingSearches(page, limit);
    return res.status(200).json({ trendingSearches });
  } catch (error) {
    return res.status(500).json({
      msg: 'Internal server error in trending searches',
    });
  }
}

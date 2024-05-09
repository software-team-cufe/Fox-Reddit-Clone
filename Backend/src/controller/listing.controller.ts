import { NextFunction, Request, Response } from 'express';
import {
  deleteCommentOrPost,
  addComment,
  savePost,
  hidePost,
  editUserText,
  insightsCount,
  spoilerPost,
  nsfwPost,
  lockPost,
  submitPost,
  PostByIdInput,
} from '../schema/listing.schema';
import {
  createPost,
  findPostById,
  getBestPostsFromSubreddit,
  getHotPostsFromSubreddit,
  getNewPostsFromSubreddit,
  getTopPostsFromSubreddit,
  getBestPostsFromRandom,
  getHotPostsFromRandom,
  getNewPostsFromRandom,
  getTopPostsFromRandom,
  getRandomPostsFromSubreddit,
  getRandomPostsFromRandom,
  userPosts,
  addVoteToPost,
  getPostById,
} from '../service/post.service';
import {
  findCommentById,
  createComment,
  addVoteToComment,
  createReplay,
  findRepliesIdByCommentId,
  findReplies,
  extractUsernamesFromTextJSON,
} from '../service/comment.service';
import {
  findUserByUsername,
  userHiddenPosts,
  userSavedPosts,
  userSubmittedPosts,
  addPostVoteToUser,
  addCommentVoteToUser,
  findUserById,
  findUsersThatFollowUser,
  findUsersThatFollowCommunity,
} from '../service/user.service';
import CommentModel, { Comment } from '../model/comments.model';
import { findCommunityByName, getCommunityByID } from '../service/community.service';
import UserModel, { User } from '../model/user.model';
import PostModel, { Post } from '../model/posts.model';
import CommunityModel from '../model/community.model';
import { date } from 'zod';
import { post } from '@typegoose/typegoose';
import mongoose, { ObjectId } from 'mongoose';
import { createNotification } from '../service/notification.service';

/**
 * Delete handler function that handles deletion of comments and posts based on the given id.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 * @return {Promise<void>} Promise representing the completion of the delete operation
 */
export async function deleteHandler(req: Request<deleteCommentOrPost['body']>, res: Response, next: NextFunction) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const id = req.body.linkID;
    const desiredID = id.split('_')[1];
    const user = res.locals.user;

    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    // Delete comment by user
    if (id[1] === '1') {
      const comment = await findCommentById(desiredID);

      if (!comment) {
        return res.status(400).json({
          status: 'failed',
          message: 'Comment not found',
        });
      }

      // Check if the Comment is already marked as deleted
      if (comment.isDeleted) {
        return res.status(400).json({
          status: 'failed',
          message: 'Comment is already deleted',
        });
      }

      await CommentModel.findByIdAndUpdate(comment._id, { isDeleted: true }, { upsert: true, new: true });
      res.status(200).json({
        status: 'success',
        message: 'Comment is deleted successfully',
      });
    }

    if (id[1] === '3') {
      // Delete post by user
      const post = await findPostById(desiredID);

      if (!post) {
        return res.status(400).json({
          status: 'failed',
          message: 'Post not found',
        });
      }

      // Check if the Post is already marked as deleted
      if (post.isDeleted) {
        return res.status(400).json({
          status: 'failed',
          message: 'Post is already deleted',
        });
      }

      await PostModel.findByIdAndUpdate(post._id, { isDeleted: true }, { upsert: true, new: true });
      res.status(200).json({
        status: 'success',
        message: 'Post is deleted successfully',
      });
    }
  } catch (error) {
    console.error('Error in deleteHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/**
 * Hide a post based on the given ID for the current user.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 * @return {Promise<void>} Promise that resolves when the post is successfully hidden
 */
export async function hidePostHandler(req: Request<hidePost['body']>, res: Response, next: NextFunction) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const id = req.body.linkID;
    const desiredID = id.split('_')[1];
    const post = await findPostById(desiredID);

    if (!post) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post not found',
      });
    }

    const user = await findUserByUsername(res.locals.user.username as string);
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    // Use type assertion to treat user.hiddenPosts as an array even if it might be undefined
    const hiddenPosts = user.hiddenPosts ?? [];

    // Check if the post is already in the user's hidden posts array
    const isPostHidden = hiddenPosts.some((hiddenPost) => hiddenPost.toString() === post._id.toString());
    if (isPostHidden) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post is already hidden',
      });
    }

    // Add the post to the user's hidden posts array
    hiddenPosts.push(post._id);
    await UserModel.findByIdAndUpdate(user._id, { hiddenPosts }, { upsert: true, new: true });

    res.status(200).json({
      status: 'success',
      message: 'Post is hidden successfully',
    });
  } catch (error) {
    console.error('Error in hidePostHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/**
 * Handle un-hiding a post based on user input.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next function in the middleware chain
 * @return {Promise<void>} a Promise that resolves when the post is successfully unhidden
 */
export async function unhidePostHandler(req: Request<hidePost['body']>, res: Response, next: NextFunction) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const id = req.body.linkID;
    const desiredID = id.split('_')[1];
    const post = await findPostById(desiredID);

    if (!post) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post not found',
      });
    }

    const user = await findUserByUsername(res.locals.user.username as string);
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }
    // Use type assertion to treat user.hiddenPosts as an array even if it might be undefined
    const hiddenPosts = user.hiddenPosts ?? [];

    // Check if the post is already in the user's hidden posts array
    const isPostHidden = hiddenPosts.some((hiddenPost) => hiddenPost.toString() === post._id.toString());
    if (!isPostHidden) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post is not hidden',
      });
    }

    // Pull the post from the user's hidden posts array
    await UserModel.findByIdAndUpdate(user._id, { $pull: { hiddenPosts: post._id } }, { new: true });

    res.status(200).json({
      status: 'success',
      message: 'Post is unhidden successfully',
    });
  } catch (error) {
    console.error('Error in unhidePostHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/**
 * Add a new comment to a post based on the user input.
 *
 * @param {Request} req - The request object containing user input.
 * @param {Response} res - The response object to send back the result.
 * @return {Promise<void>} A promise representing the completion of adding the comment.
 */
export async function addCommentHandler(req: Request<addComment['body']>, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const { linkID, textHTML, textJSON } = req.body;

    // Extract user and post
    const user = await findUserByUsername(res.locals.user.username as string);
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    const postID = linkID?.split('_')[1];
    if (!postID) {
      return res.status(400).json({
        status: 'failed',
        message: 'Invalid post ID',
      });
    }

    const post = await findPostById(postID);
    if (!post) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post not found',
      });
    }

    // Create the new comment
    const newComment = new CommentModel({
      authorId: user._id,
      postID,
      textHTML,
      textJSON,
    });
    const createdComment = await createComment(newComment);

    // Save the new comment
    if (!createdComment) {
      return res.status(400).json({ message: 'Failed to create the comment' });
    }

    // Update user and post with the new comment
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { $addToSet: { hasComment: createdComment._id } }, // Using $addToSet to avoid adding duplicate comments
      { new: true, upsert: true }
    );

    const updatedPost = await PostModel.findByIdAndUpdate(
      post._id,
      { $addToSet: { postComments: createdComment._id } },
      { new: true, upsert: true }
    );
    const commentsNum = post.commentsNum;
    const updatedPost1 = await PostModel.findByIdAndUpdate(post._id, { $inc: { commentsNum: 1 } });
    // Send the response
    const postAuthor = await findUserById(updatedPost.userID.toString());
    if (!postAuthor) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post author not found',
      });
    }
    if (postAuthor.notificationPrefs?.commentsOnYourPosts) {
      await createNotification(
        postAuthor._id,
        updatedUser.avatar ?? 'https://res.cloudinary.com/dtl7z245k/image/upload/v1715007017/fkegcflroptfznuinqgn.png',
        'New Comment!',
        'comment',
        `${updatedUser.username} has commented on your post.`,
        createdComment._id,
        postAuthor.fcmtoken
      );
    }
    res.status(201).json(createdComment); // 201: Created
  } catch (error) {
    console.error('Error in addCommentHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/**
 * Save a post to a user's saved posts.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next middleware function
 * @return {Promise<void>} a Promise that resolves when the operation is complete
 */
export async function saveHandler(req: Request<savePost['body']>, res: Response, next: NextFunction) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const id = req.body.linkID;
    const desiredID = id.split('_')[1];
    const post = await findPostById(desiredID);

    if (!post) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post not found',
      });
    }

    const user = await findUserByUsername(res.locals.user.username as string);
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    // Use type assertion to treat user.savedPosts as an array even if it might be undefined
    const savedPosts = user.savedPosts ?? [];

    // Check if the post is already in the user's saved posts array
    const isSaved = savedPosts.some((savedPost) => savedPost.toString() === post._id.toString());
    if (isSaved) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post is already saved',
      });
    }

    // Add the post to the user's saved posts array
    savedPosts.push(post._id);
    await UserModel.findByIdAndUpdate(user._id, { savedPosts }, { upsert: true, new: true });

    res.status(200).json({
      status: 'success',
      message: 'Post is saved successfully',
    });
  } catch (error) {
    console.error('Error in saveHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
/**
 * Handles the unsave operation for a post, removing it from the user's saved posts.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next function
 * @return {Promise<void>} Promise that resolves once the post is successfully unsaved
 */
export async function unsaveHandler(req: Request<savePost['body']>, res: Response, next: NextFunction) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const id = req.body.linkID;
    const desiredID = id.split('_')[1];
    const post = await findPostById(desiredID);

    if (!post) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post not found',
      });
    }

    const user = await findUserByUsername(res.locals.user.username as string);
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }
    // Use type assertion to treat user.savedPosts as an array even if it might be undefined
    const savedPosts = user.savedPosts ?? [];

    // Check if the post is already in the user's saved posts array
    const isSaved = savedPosts.some((savedPost) => savedPost.toString() === post._id.toString());
    if (!isSaved) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post is not saved',
      });
    }

    // Pull the post from the user's hidden posts array
    await UserModel.findByIdAndUpdate(user._id, { $pull: { savedPosts: post._id } }, { new: true });

    res.status(200).json({
      status: 'success',
      message: 'Post is unsaved successfully',
    });
  } catch (error) {
    console.error('Error in unsaveHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
/**
 * Function for handling user text editing based on the linkID provided.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next function
 * @return {Promise<void>} Promise representing the completion of the function
 */
export async function editUserTextHandler(req: Request<editUserText['body']>, res: Response, next: NextFunction) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const user = await findUserByUsername(res.locals.user.username as string);
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    const linkID = req.body.linkID;
    if (!linkID) {
      return res.status(400).json({
        response: 'invaild parameters',
      });
    }

    delete req.body.linkID;
    req.body.editedAt = Date.now();

    if (linkID[1] === '3') {
      const post = await PostModel.findById(linkID.slice(3));
      if (!post || !post.userID) {
        return res.status(400).json({
          status: 'failed',
          message: 'Post not found',
        });
      }

      if (post.userID.toString() !== user._id.toString()) {
        return res.status(400).json({
          status: 'failed',
          message: 'You are not the author of this post!',
        });
      }

      const results = await PostModel.findByIdAndUpdate(
        post._id,
        { textJSON: req.body.textJSON, textHTML: req.body.textHTML },
        { upsert: true, new: true }
      );

      if (!results) {
        return res.status(400).json({
          response: 'error',
        });
      }

      return res.status(200).json({
        response: results,
      });
    } else if (linkID[1] === '1') {
      const comment = await CommentModel.findById(linkID.slice(3));
      if (!comment || !comment.authorId) {
        return res.status(400).json({
          status: 'failed',
          message: 'Comment not found',
        });
      }

      if (comment.authorId.toString() !== user._id.toString()) {
        return res.status(400).json({
          status: 'failed',
          message: 'You are not the author of this post!',
        });
      }

      const results = await CommentModel.findByIdAndUpdate(
        comment._id,
        { textJSON: req.body.textJSON, textHTML: req.body.textHTML },
        { upsert: true, new: true }
      );

      if (!results) {
        return res.status(400).json({
          response: 'error',
        });
      }

      return res.status(200).json({
        response: results,
      });
    }
  } catch (error) {
    console.error('Error in editUserTextHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/**
 * Handles the request for insights counts.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next function
 * @return {Promise<void>} a promise that resolves with the response value
 */
export async function insightsCountsHandler(req: Request, res: Response, next: NextFunction) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const linkID = req.params.post;
    if (!linkID) {
      return res.status(400).json({
        response: 'invalid parameters',
      });
    }

    const post = await PostModel.findById(linkID.slice(3));
    if (!post) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post not found',
      });
    }

    // Check if post is undefined before accessing its properties
    if (post) {
      const postInsightsCnt = post.insightCnt;
      return res.status(200).json({
        status: 'succeeded',
        postInsightsCnt,
      });
    } else {
      return res.status(400).json({
        status: 'failed',
        message: 'Post not found',
      });
    }
  } catch (error) {
    console.error('Error in insightsCountsHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/**
 * Handles spoiling a post.
 * @param {Request<spoilerPost['body']>} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 */
export async function spoilerPostHandler(req: Request<spoilerPost['body']>, res: Response, next: NextFunction) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const id = req.body.linkID;
    const desiredID = id.split('_')[1];
    const post = await findPostById(desiredID);
    const user = await findUserByUsername(res.locals.user.username as string);

    // Check if post is not found
    if (!post) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post not found',
      });
    }

    // Check if user is missing or invalid
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    // Check if the post is already spoilered
    if (post.spoiler) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post is already spoilered',
      });
    }

    await PostModel.findByIdAndUpdate(post._id, { spoiler: true }, { upsert: true, new: true });
  } catch (err) {
    return next(err);
  }
  res.status(200).json({
    status: 'success',
    message: 'Post is spoilered successfully',
  });
}

/**
 * Handles unspoiling a post.
 * @param {Request<spoilerPost['body']>} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 */
export async function unspoilerPostHandler(req: Request<spoilerPost['body']>, res: Response, next: NextFunction) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const id = req.body.linkID;
    const desiredID = id.split('_')[1];
    const post = await findPostById(desiredID);
    const user = await findUserByUsername(res.locals.user.username as string);

    // Check if post is not found
    if (!post) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post not found',
      });
    }

    // Check if user is missing or invalid
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    // Check if the post is already unspoilered
    if (!post.spoiler) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post is already unspoilered',
      });
    }

    await PostModel.findByIdAndUpdate(post._id, { spoiler: false }, { upsert: true, new: true });
  } catch (err) {
    return next(err);
  }
  res.status(200).json({
    status: 'success',
    message: 'Post is unspoilered successfully',
  });
}

/**
 * Handles marking a post as NSFW.
 * @param {Request<nsfwPost['body']>} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 */
export async function marknsfwPostHandler(req: Request<nsfwPost['body']>, res: Response, next: NextFunction) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const id = req.body.linkID;
    const desiredID = id.split('_')[1];
    const post = await findPostById(desiredID);
    const user = await findUserByUsername(res.locals.user.username as string);

    // Check if post is not found
    if (!post) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post not found',
      });
    }

    // Check if user is missing or invalid
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    // Check if the post is already marked as NSFW
    if (post.nsfw) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post is already marked as NSFW',
      });
    }

    await PostModel.findByIdAndUpdate(post._id, { nsfw: true }, { upsert: true, new: true });
  } catch (err) {
    return next(err);
  }
  res.status(200).json({
    status: 'success',
    message: 'Post is marked NSFW successfully',
  });
}

/**
 * Handles unmarking a post as NSFW.
 * @param {Request<nsfwPost['body']>} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 */
export async function unmarknsfwPostHandler(req: Request<nsfwPost['body']>, res: Response, next: NextFunction) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const id = req.body.linkID;
    const desiredID = id.split('_')[1];
    const post = await findPostById(desiredID);
    const user = await findUserByUsername(res.locals.user.username as string);

    // Check if post is not found
    if (!post) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post not found',
      });
    }

    // Check if user is missing or invalid
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    // Check if the post is already unmarked as NSFW
    if (!post.nsfw) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post is already unmarked as NSFW',
      });
    }

    await PostModel.findByIdAndUpdate(post._id, { nsfw: false }, { upsert: true, new: true });
  } catch (err) {
    return next(err);
  }
  res.status(200).json({
    status: 'success',
    message: 'Post is unmarked NSFW successfully',
  });
}

/**
 * Handles locking a post.
 * @param {Request<lockPost['body']>} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 */
export async function lockPostHandler(req: Request<lockPost['body']>, res: Response, next: NextFunction) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const id = req.body.linkID;
    const desiredID = id.split('_')[1];
    const post = await findPostById(desiredID);
    const user = await findUserByUsername(res.locals.user.username as string);

    // Check if post is not found
    if (!post) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post not found',
      });
    }

    // Check if user is missing or invalid
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    // Check if the post is already locked
    if (post.isLocked) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post is already locked',
      });
    }

    await PostModel.findByIdAndUpdate(post._id, { isLocked: true }, { upsert: true, new: true });
  } catch (err) {
    return next(err);
  }
  res.status(200).json({
    status: 'success',
    message: 'Post is locked successfully',
  });
}

/**
 * Handles unlocking a post.
 * @param {Request<lockPost['body']>} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 */
export async function unlockPostHandler(req: Request<lockPost['body']>, res: Response, next: NextFunction) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const id = req.body.linkID;
    const desiredID = id.split('_')[1];
    const post = await findPostById(desiredID);
    const user = await findUserByUsername(res.locals.user.username as string);

    // Check if post is not found
    if (!post) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post not found',
      });
    }

    // Check if user is missing or invalid
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    // Check if the post is already unlocked
    if (!post.isLocked) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post is already unlocked',
      });
    }

    await PostModel.findByIdAndUpdate(post._id, { isLocked: false }, { upsert: true, new: true });
  } catch (err) {
    return next(err);
  }
  res.status(200).json({
    status: 'success',
    message: 'Post is unlocked successfully',
  });
}

/**
 * Handles voting a post.
 * @param {Request<votePost['body']>} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 */
export async function votePostHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const type = req.body.type;
    const post = await findPostById(req.body.postID);
    const user = await findUserByUsername(res.locals.user.username as string);

    // Check if post is not found
    if (!post) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post not found',
      });
    }
    const author = await findUserById(post.userID.toString());
    // Check if user is missing or invalid
    if (!user) {
      return res.status(401).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    if (type == 1) {
      const postResult = await addVoteToPost(user._id.toString(), post._id.toString(), 1);
      const userResult = await addPostVoteToUser(user._id.toString(), post._id.toString(), 1);
      //create upvote notification
      if (author) {
        if (author?.notificationPrefs?.upvotesOnYourPosts) {
          createNotification(
            author._id,
            author.avatar ?? 'https://res.cloudinary.com/dtl7z245k/image/upload/v1715007017/fkegcflroptfznuinqgn.png',
            'New Upvote!',
            'Upvote',
            `${user.username} upvoted your post!`,
            post._id,
            author.fcmtoken
          );
        }
      }
      res.status(200).json({
        status: 'success',
        message: 'Post is upvoted successfully',
        value: post.votesCount,
      });
    } else if (type == -1) {
      const postResult = await addVoteToPost(user._id.toString(), post._id.toString(), -1);
      const userResult = await addPostVoteToUser(user._id.toString(), post._id.toString(), -1);

      res.status(200).json({
        status: 'success',
        message: 'Post is downvoted successfully',
        value: post.votesCount,
      });
    } else {
      return res.status(402).json({
        status: 'failed',
        message: 'Type is missing or invalid',
      });
    }
  } catch (error) {
    console.error('Error in votePostHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/**
 * Handles voting a comment.
 * @param {Request<voteComment['body']>} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 */
export async function voteCommentHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const type = req.body.type;
    const comment = await findCommentById(req.body.commentID);
    const user = await findUserByUsername(res.locals.user.username as string);

    // Check if post is not found
    if (!comment) {
      return res.status(400).json({
        status: 'failed',
        message: 'Comment not found',
      });
    }

    // Check if user is missing or invalid
    if (!user) {
      return res.status(401).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    if (type == 1) {
      const postResult = await addVoteToComment(user._id.toString(), comment._id.toString(), 1);
      const userResult = await addCommentVoteToUser(user._id.toString(), comment._id.toString(), 1);

      res.status(200).json({
        status: 'success',
        message: 'Comment is upvoted successfully',
        value: comment.votesCount,
      });
    } else if (type == -1) {
      const postResult = await addVoteToComment(user._id.toString(), comment._id.toString(), -1);
      const userResult = await addCommentVoteToUser(user._id.toString(), comment._id.toString(), -1);

      res.status(200).json({
        status: 'success',
        message: 'Comment is downvoted successfully',
        value: comment.votesCount,
      });
    } else {
      return res.status(402).json({
        status: 'failed',
        message: 'Type is missing or invalid',
      });
    }
  } catch (error) {
    console.error('Error in voteCommentHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

export async function submitPostHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const user = res.locals.user;
    // Check if user is missing or invalid
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    const data = req.body;

    const { title, text, nsfw, spoiler, Communityname, poll, attachments, createdAt } = data;

    const pollOptions = Array.isArray(poll) ? poll.map((option: string) => ({ title: option, votes: 0 })) : undefined;

    const postInfo = {
      title,
      textHTML: text,
      attachments,
      nsfw,
      spoiler,
      createdAt,
      userID: user._id,
      username: user.username,
      poll: pollOptions,
    };

    // If community exists, add community ID to postInfo
    if (req.body.Communityname) {
      const community = await findCommunityByName(Communityname);
      if (!community) {
        return res.status(402).json({
          error: 'Community not found',
        });
      }
      const postInfoUpdated = {
        ...postInfo,
        CommunityID: community._id,
        coummunityName: community.name,
      };
      const createdPost = await createPost(postInfoUpdated);

      if (!createdPost) {
        return res.status(400).json({ message: 'Failed to create the post' });
      }
      await CommunityModel.findByIdAndUpdate(
        community._id,
        { $addToSet: { communityPosts: createdPost._id } },
        { new: true, upsert: true }
      );
      const updatedUser = await UserModel.findByIdAndUpdate(
        user._id,
        { $addToSet: { hasPost: createdPost._id } },
        { new: true, upsert: true }
      );
      const followers = await findUsersThatFollowCommunity(community._id.toString());
      for (let i = 0; i < followers.length; i++) {
        await createNotification(
          followers[i]._id,
          community.icon ?? 'https://res.cloudinary.com/dtl7z245k/image/upload/v1715007017/fkegcflroptfznuinqgn.png',
          'New Post!',
          'newPost',
          `${community.name} has posted a new post!`,
          createdPost._id,
          followers[i].fcmtoken
        );
      }
      res.status(201).json(createdPost);
    } else {
      const createdPost = await createPost(postInfo);
      if (!createdPost) {
        return res.status(400).json({ message: 'Failed to create the post' });
      }
      const updatedUser = await UserModel.findByIdAndUpdate(
        user._id,
        { $addToSet: { hasPost: createdPost._id } },
        { new: true, upsert: true }
      );
      const followers = await findUsersThatFollowUser(user._id);
      for (let i = 0; i < followers.length; i++) {
        await createNotification(
          followers[i]._id,
          user.avatar ?? 'https://res.cloudinary.com/dtl7z245k/image/upload/v1715007017/fkegcflroptfznuinqgn.png',
          'New Post!',
          'newPost',
          `${user.username} has posted a new post!`,
          createdPost._id,
          followers[i].fcmtoken
        );
      }
      res.status(201).json(createdPost);
    }
  } catch (error) {
    console.error('Error in submitPostHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/*YOUSEF PHASE 3 WORK */

export async function getSortedPosts(req: Request, res: Response) {
  try {
    const sub = req.params.subreddit || ' ';
    const subreddit = await findCommunityByName(sub);
    let sort = req.params.sort || ' ';
    if (sort) sort = sort.toLowerCase();
    // Access query parameters and parse them into numbers
    const limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit, 10) : 10;
    const count = typeof req.query.count === 'string' ? parseInt(req.query.count, 10) : 0;
    const page = typeof req.query.page === 'string' ? parseInt(req.query.page, 10) : 1;
    // Parse startDate and endDate from query parameters, defaulting to all time if not provided
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : new Date('1970-01-01T00:00:00Z'); // Start of Unix epoch
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : new Date('2099-12-31T23:59:59Z'); // Far into the future

    if (isNaN(page) || isNaN(count) || isNaN(limit)) {
      return res.status(400).json({ error: 'Invalid request parameters.' });
    }
    let Posts;
    if (subreddit) {
      if (sort != ' ') {
        if (sort == 'best') Posts = await getBestPostsFromSubreddit(sub, limit, page, count);
        if (sort == 'hot') Posts = await getHotPostsFromSubreddit(sub, limit, page, count);
        if (sort == 'top') Posts = await getTopPostsFromSubreddit(sub, limit, page, count, startDate, endDate);
        if (sort == 'new') Posts = await getNewPostsFromSubreddit(sub, limit, page, count);
        if (sort == 'random') Posts = await getRandomPostsFromSubreddit(sub, limit, page, count);
        if (sort != 'random' && sort != 'best' && sort != 'hot' && sort != 'top' && sort != 'new')
          Posts = await getRandomPostsFromSubreddit(sub, limit, page, count);
      } else {
        Posts = await getRandomPostsFromSubreddit(sub, limit, page, count);
      }
    } else {
      if (sort != ' ') {
        if (sort == 'best') Posts = await getBestPostsFromRandom(limit, page, count);
        if (sort == 'hot') Posts = await getHotPostsFromRandom(limit, page, count);
        if (sort == 'top') Posts = await getTopPostsFromRandom(limit, page, count, startDate, endDate);
        if (sort == 'new') Posts = await getNewPostsFromRandom(limit, page, count);
        if (sort == 'random') Posts = await getRandomPostsFromRandom(limit, page, count);
        if (sort != 'random' && sort != 'best' && sort != 'hot' && sort != 'top' && sort != 'new')
          Posts = await getRandomPostsFromRandom(limit, page, count);
      } else {
        Posts = await getRandomPostsFromRandom(limit, page, count);
      }
    }
    res.json(Posts);
  } catch (error) {
    console.error('Error getting sorted posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getSortedSubredditPosts() {}
/**
 * Get user saved posts with pagination support.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next middleware function
 * @return {Promise<void>} a Promise that resolves when the operation is complete
 */
export async function getUserSavedPostsHandler(req: Request, res: Response, next: NextFunction) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const userAuth = res.locals.user;
    // Check if user is missing or invalid
    if (!userAuth) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }
    // Extract params
    const user = await findUserByUsername(req.params.username as string);

    if (!user) {
      return res.status(404).send("This user doesn't exist!");
    }
    const username: string = req.params.username as string;
    const page: number = parseInt(req.query.page as string, 10) || 1; // Default to page 1 if not provided
    const count: number = parseInt(req.query.count as string, 10) || 10; // Default to 10 if not provided
    const limit: number = parseInt(req.query.limit as string, 10) || 10; // Default to 10 if not provided
    const t: string = req.query.t as string; // Assuming you're using this parameter for something else

    if (!username || isNaN(page) || isNaN(count) || isNaN(limit)) {
      return res.status(400).json({ error: 'Invalid request parameters.' });
    }

    const postIDS = await userSavedPosts(username, page, count);
    const posts = await userPosts(postIDS, limit);

    res.status(200).json({ posts });
  } catch (err) {
    return next(err);
  }
}
/**
 * Get user hidden posts with pagination support.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next middleware function
 * @return {Promise<void>} a Promise that resolves when the operation is complete
 */
export async function getUserHiddenPostsHandler(req: Request, res: Response, next: NextFunction) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const userAuth = res.locals.user;
    // Check if user is missing or invalid
    if (!userAuth) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }
    // Extract params
    const user = await findUserByUsername(req.params.username as string);

    if (!user) {
      return res.status(404).send("This user doesn't exist!");
    }
    const username: string = req.params.username as string;
    const page: number = parseInt(req.query.page as string, 10) || 1; // Default to page 1 if not provided
    const count: number = parseInt(req.query.count as string, 10) || 10; // Default to 10 if not provided
    const limit: number = parseInt(req.query.limit as string, 10) || 10; // Default to 10 if not provided
    const t: string = req.query.t as string; // Assuming you're using this parameter for something else

    if (!username || isNaN(page) || isNaN(count) || isNaN(limit)) {
      return res.status(400).json({ error: 'Invalid request parameters.' });
    }

    const postIDS = await userHiddenPosts(username, page, count);
    const posts = await userPosts(postIDS, limit);

    res.status(200).json({ posts });
  } catch (err) {
    return next(err);
  }
}
/**
 * Handles the request to add a reply to a comment.
 *
 * @param {Request} req - The request object containing the reply data.
 * @param {Response} res - The response object to send the result.
 * @return {Promise<void>} A promise that resolves when the reply is added and the response is sent.
 */
export async function addReplyHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const { linkID, textHTML, textJSON } = req.body;

    // Extract user and post
    const user = await findUserByUsername(res.locals.user.username as string);
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    const commentID = linkID.toString();

    const comment = await findCommentById(commentID);
    if (!comment) {
      return res.status(400).json({
        status: 'failed',
        message: 'Comment not found',
      });
    }
    const post = await findPostById(comment.postID.toString());

    if (!post) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post not found',
      });
    }

    // Create the new comment
    const newReply = new CommentModel({
      textHTML: textHTML,
      textJSON: textJSON,
      isRoot: false,
      authorId: user._id,
      replyingTo: commentID,
      postID: comment.postID,
      communityID: post.CommunityID,
      voters: [{ userID: user._id, voteType: 1 }],
    });
    const createdReply = await createReplay(newReply);

    // Save the new comment
    if (!createdReply) {
      return res.status(400).json({ message: 'Failed to create the reply' });
    }

    // Update user and post with the new comment
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { $addToSet: { hasReply: createdReply._id } }, // Using $addToSet to avoid adding duplicate comments
      { new: true, upsert: true }
    );

    const updatedComment = await CommentModel.findByIdAndUpdate(
      comment._id,
      { $addToSet: { replies: createdReply._id } },
      { new: true, upsert: true }
    );
    const commentAuthor = await findUserById(updatedComment.authorId.toString());
    if (!commentAuthor) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post author not found',
      });
    }
    if (commentAuthor.notificationPrefs?.repliesToYourComments) {
      await createNotification(
        commentAuthor?._id,
        user.avatar ?? 'https://res.cloudinary.com/dtl7z245k/image/upload/v1715007017/fkegcflroptfznuinqgn.png',
        'New comment reply!',
        'reply',
        `${user.username} replied to your comment.`,
        updatedComment._id,
        commentAuthor.fcmtoken
      );
    }
    res.status(201).json(createdReply); // 201: Created
  } catch (error) {
    console.error('Error in addReplyHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
/**
 * Handles the request to get the replies for a specific comment.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @return {Promise<void>} A promise that resolves when the replies are retrieved and sent in the response.
 */
export async function getCommentRepliesHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access token is missing',
    });
  }
  try {
    const commentId = req.params.commentId;
    if (!commentId) {
      return res.status(401).json({
        status: 'failed',
        message: 'Invalid request parameters',
      });
    }

    // Extract user and post
    const user = await findUserByUsername(res.locals.user.username as string);
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    const commentID = commentId.toString();

    const comment = await findCommentById(commentID);
    if (!comment) {
      return res.status(400).json({
        status: 'failed',
        message: 'Comment not found',
      });
    }
    const repliesId: string[] = (await findRepliesIdByCommentId(comment._id.toString())).map((reply) =>
      reply._id.toString()
    );
    const replies = await findReplies(repliesId);
    res.status(200).json(replies);
  } catch (error) {
    console.error('Error in getCommentRepliesHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

export async function getPostByIdHandler(req: Request<PostByIdInput['params']>, res: Response) {
  try {
    const postId = req.params.id;
    console.log(postId);
    const post = await getPostById(postId);
    if (!post) {
      return res.status(400).json({ msg: 'Post not found' });
    }
    console.log(post);
    const user = res.locals.user;
    if (post.CommunityID) {
      const community = await getCommunityByID(post.CommunityID as unknown as string);
      if (community?.privacyType === 'Private') {
        if (!user) return res.status(401).json({ msg: 'not authorized' });
        // Check if the user is a member
        const isMember = user.member.some(
          (member: { communityId: string }) => member.communityId.toString() === community._id.toString()
        );

        // Check if the user is a moderator
        const isModerator = user.moderators.some(
          (moderators: { communityId: string }) => moderators.communityId.toString() === community._id.toString()
        );
        console.log(isMember, isModerator);
        if (!isMember && !isModerator) {
          return res.status(401).json({ msg: 'not authorized' });
        }
      }
    }
    console.log(post.postComments);
    const commentsOfPost = await CommentModel.find({ _id: { $in: post.postComments } });

    console.log('commentPosts in get post by id', commentsOfPost);
    post.postComments = commentsOfPost;
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ msg: 'Internal server error' });
  }
}

export async function voteOnPostPoll(req: Request, res: Response) {
  const postId = req.params.id;
  const post = await findPostById(postId);
  if (!post) {
    return res.status(400).json({ msg: 'Post not found' });
  }

  const poll = post.poll;
  if (!poll) {
    return res.status(400).json({ msg: 'Post has no poll' });
  }
  const choice = req.body.choice;

  for (let i = 0; i < poll?.length; i++) {
    if (poll[i].title == choice) {
      poll[i].votes += 1;
      await post.save();
      res.status(200).json(poll);
    }
  }
  res.status(404).json({ msg: 'not found' });
}

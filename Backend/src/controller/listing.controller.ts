import { NextFunction, Request, Response } from 'express';
import {
  deleteCommentOrPost,
  addComment,
  savePost,
  hidePost,
  editUserText,
  insightsCount,
} from '../schema/listing.schema';
import { findPostById } from '../service/post.service';
import { add_comment, findCommentById, createComment } from '../service/comment.service';
import { findUserByUsername } from '../service/user.service';
import CommentModel, { Comment } from '../model/comments.model';
import UserModel from '../model/user.model';
import PostModel from '../model/posts.model';
import { date } from 'zod';

/**
 * Delete handler function that handles deletion of comments and posts based on the given id.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 * @return {Promise<void>} Promise representing the completion of the delete operation
 */
export async function deleteHandler(req: Request<deleteCommentOrPost>, res: Response, next: NextFunction) {
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
  } catch (err) {
    return next(err);
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
export async function hidePostHandler(req: Request<hidePost>, res: Response, next: NextFunction) {
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
  } catch (err) {
    return next(err);
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
export async function unhidePostHandler(req: Request<hidePost>, res: Response, next: NextFunction) {
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
  } catch (err) {
    return next(err);
  }
}

/**
 * Add a new comment to a post based on the user input.
 *
 * @param {Request} req - The request object containing user input.
 * @param {Response} res - The response object to send back the result.
 * @return {Promise<void>} A promise representing the completion of adding the comment.
 */
export async function addCommentHandler(req: Request<addComment>, res: Response) {
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

    res.status(201).json(createdComment); // 201: Created
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' }); // Handle internal server errors
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
export async function saveHandler(req: Request<savePost>, res: Response, next: NextFunction) {
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
  } catch (err) {
    return next(err);
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
export async function unsaveHandler(req: Request<savePost>, res: Response, next: NextFunction) {
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
  } catch (err) {
    return next(err);
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
export async function editUserTextHandler(req: Request<editUserText>, res: Response, next: NextFunction) {
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
        { textJSON: req.body.text },
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
        { textJSON: req.body.text },
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
  } catch (err) {
    return next(err);
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
  } catch (err) {
    return next(err);
  }
}

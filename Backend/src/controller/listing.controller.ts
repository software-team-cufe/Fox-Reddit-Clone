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
  votePost,
  submitPost,
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
} from '../service/post.service';
import { add_comment, findCommentById, createComment } from '../service/comment.service';
import { findUserByUsername } from '../service/user.service';
import CommentModel, { Comment } from '../model/comments.model';
import { findCommunityByName } from '../service/community.service';
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
export async function deleteHandler(req: Request<deleteCommentOrPost['body']>, res: Response, next: NextFunction) {
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
  try {
    const id = req.body.linkID;
    const desiredID = id.split('_')[1];
    const post = await findPostById(desiredID);
    const user = res.locals.user;

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
  try {
    const id = req.body.linkID;
    const desiredID = id.split('_')[1];
    const post = await findPostById(desiredID);
    const user = res.locals.user;

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
  try {
    const id = req.body.linkID;
    const desiredID = id.split('_')[1];
    const post = await findPostById(desiredID);
    const user = res.locals.user;

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
  try {
    const id = req.body.linkID;
    const desiredID = id.split('_')[1];
    const post = await findPostById(desiredID);
    const user = res.locals.user;

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
  try {
    const id = req.body.linkID;
    const desiredID = id.split('_')[1];
    const post = await findPostById(desiredID);
    const user = res.locals.user;

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
    if (post.locked) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post is already locked',
      });
    }

    await PostModel.findByIdAndUpdate(post._id, { locked: true }, { upsert: true, new: true });
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
  try {
    const id = req.body.linkID;
    const desiredID = id.split('_')[1];
    const post = await findPostById(desiredID);
    const user = res.locals.user;

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
    if (!post.locked) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post is already unlocked',
      });
    }

    await PostModel.findByIdAndUpdate(post._id, { locked: false }, { upsert: true, new: true });
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
export async function votePostHandler(req: Request<votePost['body']>, res: Response, next: NextFunction) {
  try {
    const id = req.body.linkID;
    const type = req.body.type;
    const desiredID = id.split('_')[1];
    const post = await findPostById(desiredID);
    const user = res.locals.user;

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
    if (!post.locked) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post is already unlocked',
      });
    }

    await PostModel.findByIdAndUpdate(post._id, { locked: false }, { upsert: true, new: true });
  } catch (err) {
    return next(err);
  }
  res.status(200).json({
    status: 'success',
    message: 'Post is unlocked successfully',
  });
}

/**
 * Handles submit a post.
 * @param {Request<submitPost['body']>} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 */
export async function submitPostHandler(req: Request<submitPost['body']>, res: Response, next: NextFunction) {
  let post;
  try {
    const user = res.locals.user;
    console.log(user);
    const creator = user.username;

    const info = {
      title: req.body.title,
      textHTML: req.body.text,
      attachments: req.body.attachments,
      nsfw: req.body.nsfw,
      spoiler: req.body.spoiler,
      userID: creator,
    };

    // Check if user is missing or invalid
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    // Create the post
    post = await createPost(info);

    // Update user's hasPost array
    await UserModel.findByIdAndUpdate(user._id, { $addToSet: { hasPost: post._id } }, { upsert: true, new: true });
  } catch (err) {
    return next(err);
  }

  // Respond with success message and the created post
  res.status(200).json({
    status: 'success',
    message: 'Post is unlocked successfully',
    post,
  });
}

export async function getBestPosts(req: Request, res: Response) {
  try {
    const sub = req.params.subreddit;
    const subreddit = await findCommunityByName(sub);
    let bestPosts;
    if (subreddit) {
      bestPosts = await getBestPostsFromSubreddit(sub);
    } else {
      bestPosts = await getBestPostsFromRandom();
    }
    res.json(bestPosts);
  } catch (error) {
    console.error('Error getting best posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getHotPosts(req: Request, res: Response) {
  try {
    const sub = req.params.subreddit;
    const subreddit = await findCommunityByName(sub);
    let hotPosts;
    if (subreddit) {
      hotPosts = await getHotPostsFromSubreddit(sub);
    } else {
      hotPosts = await getHotPostsFromRandom();
    }
    res.json(hotPosts);
  } catch (error) {
    console.error('Error getting hot posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getNewPosts(req: Request, res: Response) {
  try {
    const sub = req.params.subreddit;
    const subreddit = await findCommunityByName(sub);
    let newPosts;
    if (subreddit) {
      newPosts = await getNewPostsFromSubreddit(sub);
    } else {
      newPosts = await getNewPostsFromRandom();
    }
    res.json(newPosts);
  } catch (error) {
    console.error('Error getting new posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getTopPosts(req: Request, res: Response) {
  try {
    const sub = req.params.subreddit;
    const subreddit = await findCommunityByName(sub);
    let topPosts;
    if (subreddit) {
      topPosts = await getTopPostsFromSubreddit(sub);
    } else {
      topPosts = await getTopPostsFromRandom();
    }
    res.json(topPosts);
  } catch (error) {
    console.error('Error getting top posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
export async function getRandomPosts(req: Request, res: Response) {
  try {
    const sub = req.params.subreddit;
    const subreddit = await findCommunityByName(sub);
    let randomPosts;
    if (subreddit) {
      randomPosts = await getRandomPostsFromSubreddit(sub);
    } else {
      randomPosts = await getRandomPostsFromRandom();
    }
    res.json(randomPosts);
  } catch (error) {
    console.error('Error getting best posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getBestPosts(req: Request, res: Response) {
  try {
    const sub = req.params.subreddit;
    const subreddit = await findCommunityByName(sub);
    let bestPosts;
    if (subreddit) {
      bestPosts = await getBestPostsFromSubreddit(sub);
    } else {
      bestPosts = await getBestPostsFromRandom();
    }
    res.json(bestPosts);
  } catch (error) {
    console.error('Error getting best posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getHotPosts(req: Request, res: Response) {
  try {
    const sub = req.params.subreddit;
    const subreddit = await findCommunityByName(sub);
    let hotPosts;
    if (subreddit) {
      hotPosts = await getHotPostsFromSubreddit(sub);
    } else {
      hotPosts = await getHotPostsFromRandom();
    }
    res.json(hotPosts);
  } catch (error) {
    console.error('Error getting hot posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getNewPosts(req: Request, res: Response) {
  try {
    const sub = req.params.subreddit;
    const subreddit = await findCommunityByName(sub);
    let newPosts;
    if (subreddit) {
      newPosts = await getNewPostsFromSubreddit(sub);
    } else {
      newPosts = await getNewPostsFromRandom();
    }
    res.json(newPosts);
  } catch (error) {
    console.error('Error getting new posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getTopPosts(req: Request, res: Response) {
  try {
    const sub = req.params.subreddit;
    const subreddit = await findCommunityByName(sub);
    let topPosts;
    if (subreddit) {
      topPosts = await getTopPostsFromSubreddit(sub);
    } else {
      topPosts = await getTopPostsFromRandom();
    }
    res.json(topPosts);
  } catch (error) {
    console.error('Error getting top posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
export async function getRandomPosts(req: Request, res: Response) {
  try {
    const sub = req.params.subreddit;
    const subreddit = await findCommunityByName(sub);
    let randomPosts;
    if (subreddit) {
      randomPosts = await getRandomPostsFromSubreddit(sub);
    } else {
      randomPosts = await getRandomPostsFromRandom();
    }
    res.json(randomPosts);
  } catch (error) {
    console.error('Error getting best posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

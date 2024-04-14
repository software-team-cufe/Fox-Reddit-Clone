import { NextFunction, Request, Response } from 'express';
import {
  addComment,
  deleteCommentOrPost,
  hidePost,
  spoilerPost,
  nsfwPost,
  lockPost,
  votePost,
  submitPost,
} from '../schema/listing.schema';
import { createPost, findPostById, deletePost, hide, unhide } from '../service/post.service';
import { add_comment, deleteComment } from '../service/comment.service';
import { findUserByUsername } from '../service/user.service';
import { Comment } from '../model/comments.model';
import { UserModel } from '../model/user.model';
import PostModel from '../model/posts.model';
// export async function addCommentHandler(req: Request<addComment['body']>, res: Response) {
//     try{
//         let comment=await addComment(req.body, req.username);
//     }
// }
/**
 * User delete a link
 * @param {function} (req, res, next)
 * @returns {object} res
 */

export async function deleteHandler(req: Request<deleteCommentOrPost['body']>, res: Response) {
  try {
    const id = req.body.id;
    const desiredID = id.split('_')[1];

    // Determine whether to delete a comment or a post
    if (id[1] === '1') {
      // Delete comment by user
      await deleteComment(desiredID);
      res.status(200).json({
        status: 'success',
        message: 'Comment is deleted successfully',
      });
    } else if (id[1] === '3') {
      // Delete post by user
      await deletePost(desiredID);
      res.status(200).json({
        status: 'success',
        message: 'Post is deleted successfully',
      });
    } else {
      // Invalid ID format
      res.status(400).json({
        status: 'failed',
        message: 'Invalid ID format',
      });
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error',
    });
  }
}

export async function hidePostHandler(req: Request<hidePost['body']>, res: Response, next: NextFunction) {
  try {
    const id = req.body.linkID;
    console.log(id);
    const desiredID = id.split('_')[1];
    console.log(desiredID);
    if (!desiredID) {
      return res.status(400).json({
        status: 'failed',
        message: 'Invalid ID format',
      });
    } else {
      //const user = res.locals.user;
      const user = await findUserByUsername(req.body.username as string);
      console.log(req.body.username as string);
      if (!user) {
        return res.status(404).json({
          status: 'failed',
          message: 'User not found',
        });
      } else {
        console.log(user.hiddenPosts);
        await hide(desiredID, user);
        console.log(user.hiddenPosts);
      }
    }
  } catch (err) {
    return next(err);
  }
  res.status(200).json({
    status: 'success',
    message: 'Post is hidden successfully',
  });
}

export async function unhidePostHandler(req: Request<hidePost['body']>, res: Response, next: NextFunction) {
  try {
    const id = req.body.linkID;
    console.log(id);
    const desiredID = id.split('_')[1];
    console.log(desiredID);
    if (!desiredID) {
      return res.status(400).json({
        status: 'failed',
        message: 'Invalid ID format',
      });
    } else {
      const user = await findUserByUsername(req.body.username as string);
      //const user = res.locals.user;
      if (!user) {
        return res.status(404).json({
          status: 'failed',
          message: 'User not found',
        });
      } else {
        console.log(user.hiddenPosts);
        await unhide(desiredID, user);
        console.log(user.hiddenPosts);
      }
    }
  } catch (err) {
    return next(err);
  }
  res.status(200).json({
    status: 'success',
    message: 'Post is unhidden successfully',
  });
}

// export async function addCommentHandler(req: Request<addComment['body']>, res: Response, next: NextFunction) {
export async function addCommentHandler(req: Request, res: Response, next: NextFunction) {
  console.log('here');
  let newComment: Comment = {} as Comment;
  try {
    newComment = await add_comment(req.body, '660e55a8ee6a9d0206dcf794');
  } catch (err) {
    return next(err);
  }
  res.status(200).json(newComment);
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

import { NextFunction, Request, Response } from 'express';
import { addComment, deleteCommentOrPost, hidePost } from '../schema/listing.schema';
import { deletePost, findPostById, hide, unhide } from '../service/post.service';
import { add_comment, deleteComment, findCommentById } from '../service/comment.service';
import { findUserByUsername } from '../service/user.service';
import CommentModel, { Comment } from '../model/comments.model';
import UserModel from '../model/user.model';
import PostModel from '../model/posts.model';
// export async function addCommentHandler(req: Request<addComment['body']>, res: Response) {
//     try{
//         let comment=await addComment(req.body, req.username);
//     }
// }

/**
 * User delete a link
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 */
export async function deleteHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.body.id;
    const desiredID = id.split('_')[1];
    const user = await findUserByUsername(req.body.username as string);

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
 * Handles hiding a post for a user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 */
export async function hidePostHandler(req: Request, res: Response, next: NextFunction) {
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

    const user = await findUserByUsername(req.body.username as string);
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
 * Handles unhiding a post for a user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 */
export async function unhidePostHandler(req: Request, res: Response, next: NextFunction) {
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

    const user = await findUserByUsername(req.body.username as string);
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
 * Handles saving a post for a user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 */
export async function saveHandler(req: Request, res: Response, next: NextFunction) {
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

    const user = await findUserByUsername(req.body.username as string);
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
 * Handles unsaving a post for a user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 */
export async function unsaveHandler(req: Request, res: Response, next: NextFunction) {
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

    const user = await findUserByUsername(req.body.username as string);
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

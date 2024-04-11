import { NextFunction, Request, Response } from 'express';
import { addComment, deleteCommentOrPost, hidePost } from '../schema/listing.schema';
import { deletePost, hide, unhide } from '../service/post.service';
import { add_comment, deleteComment } from '../service/comment.service';
import { findUserByUsername } from '../service/user.service';
import { Comment } from '../model/comments.model';
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

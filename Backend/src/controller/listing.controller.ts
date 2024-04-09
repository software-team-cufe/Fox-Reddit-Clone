import { Request, Response } from 'express';
import { addComment, deleteCommentOrPost } from '../schema/listing.schema';
import { deletePost } from '../service/post.service';
import { deleteComment } from '../service/comment.service';
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
  const id = req.body.id;
  // deleting comment by user
  if (id[1] === '1') {
    try {
      await deleteComment(id);
    } catch {
      return res.status(401).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'comment is deleted successfully',
    });
  }
  // deleting post by user
  else if (id[1] === '3') {
    try {
      await deletePost(id);
    } catch {
      return res.status(401).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Post is deleted successfully',
    });
  }
}

import CommentModel from '../model/comments.model';
import { User, UserModel } from '../model/user.model';
import appError from '../utils/appError';

async function userCommets(commentsIDS: string[], limit: number | undefined) {
  // If the request didn't contain a limit in its query, set it to 10 by default
  limit = limit || 10;

  // Fetch comments based on the provided postIDs
  const comments = await CommentModel.find({ _id: { $in: commentsIDS } });

  // Limit the number of fetched posts to the provided limit
  const limitedComments = comments.slice(0, limit);

  // Populate user and community information
  //comments = await CommentModel.populate(comments, { path: 'userID', select: '_id avatar' });
  //posts = await PostModel.populate(posts, { path: 'communityID', select: '_id icon' });

  // Return the populated posts
  return limitedComments;
}

async function deleteComment(id: string) {
  const comment = await CommentModel.findById(id);
  if (!comment) {
    throw new appError('Comment not found', 404);
  }
  comment.deleteOne();
}

export { userCommets, deleteComment };

import { Post } from '../model/posts.model';
import CommentModel, { Comment } from '../model/comments.model';
import { User, UserModel } from '../model/user.model';
import appError from '../utils/appError';
import { findPostById } from './post.service';
import { findUserById, findUserByUsername } from './user.service';
import _ from 'lodash';
/**
 * Finds a comment by their ID.
 *
 * @param id - The ID of the post to find.
 * @returns A promise that resolves to the user object if found, or null if not found.
 */
export function findCommentById(id: string) {
  return CommentModel.findById(id);
}

/**
 * Retrieves comments based on their IDs with pagination support.
 *
 * @param commentsIDS - Array of comment IDs.
 * @param limit - Maximum number of comments to retrieve.
 * @returns An array of comment objects.
 */
export async function userComments(commentsIDS: string[], limit: number) {
  // Fetch comments based on the provided commentIDs
  const comments = await CommentModel.find({
    _id: { $in: commentsIDS },
  }).limit(limit);

  // Return the fetched comments
  return comments;
}

/**
 * Creates a new user.
 *
 * @param input - The user data to create.
 * @returns A promise that resolves to the created user.
 */
export function createComment(input: Partial<Comment>) {
  return CommentModel.create(input);
}

/**
 * addMemberToCom
 * @param {string} body
 * @param {string} user user information
 * @return {Object} state
 * @function
 */
export async function addVoteToComment(userID: string, commentID: string, type: number) {
  const comment = await findCommentById(commentID);
  const user = await findUserById(userID);

  if (!comment) {
    return {
      status: false,
      error: 'Comment not found',
    };
  }

  if (!user) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  const vote = {
    userID: userID,
    type: type,
  };
  const temp = comment.votes;
  try {
    const updatedComment = await CommentModel.findByIdAndUpdate(
      comment._id,
      {
        $addToSet: { votes: vote },
        $inc: { votesCount: type },
      },
      { upsert: true, new: true }
    );
    const temp2 = updatedComment.votes;
    const isSame = _.isEqual(temp, temp2);

    if (isSame) {
      type = type * -2;
      const updated = await CommentModel.findByIdAndUpdate(
        comment._id,
        {
          $pull: { votes: vote },
          $inc: { votesCount: type },
        },
        { upsert: true, new: true }
      );
    }
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}
/**
 * Creates a new comment replay.
 *
 * @param {Partial<Comment>} input - The partial comment data to create.
 * @return {Promise<Comment>} A promise that resolves to the created comment replay.
 */
export function createReplay(input: Partial<Comment>) {
  return CommentModel.create(input);
}
/**
 * Retrieves an array of comments that are replies to the comment with the given ID.
 *
 * @param {string} commentID - The ID of the comment to find replies for.
 * @return {Promise<Comment[]>} A promise that resolves to an array of comments that are replies to the given comment ID.
 */
export function findRepliesIdByCommentId(commentID: string) {
  return CommentModel.find({ replyingTo: commentID });
}
/**
 * Finds replies based on the provided array of reply IDs.
 *
 * @param {string[]} repliesIds - An array of reply IDs.
 * @return {Promise<Comment[]>} A promise that resolves to an array of comments.
 */
export function findReplies(repliesIds: string[]) {
  return CommentModel.find({
    _id: { $in: repliesIds },
  });
}

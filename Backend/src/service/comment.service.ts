import { Post } from '../model/posts.model';
import CommentModel, { Comment } from '../model/comments.model';
import { User, UserModel } from '../model/user.model';
import appError from '../utils/appError';
import { findPostById } from './post.service';
import { findUserById, findUserByUsername } from './user.service';

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
  const comments = await CommentModel.find({ _id: { $in: commentsIDS } }).limit(limit);

  // Return the fetched comments
  return comments;
}

interface CommentData {
  textHTML: string;
  textJSON: string;
  isRoot: boolean;
  authorId: string;
  replyingTo: string;
  postID: string;
  communityID: string;
  voters: { userID: string; voteType: number }[];
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

async function add_comment(data: CommentData, userId: string) {
  console.log(data);
  console.log(userId);
  const user = await findUserById(userId);
  console.log(user);
  if (!user) {
    throw new appError("This user doesn't exist!", 404);
  }

  let post;
  try {
    post = await findPostById(data.postID);
    console.log(post);
  } catch {
    throw new appError('Invalid postID!', 400);
  }

  if (!post) {
    throw new appError("This post doesn't exist!", 404);
  }
  console.log('checking comment');
  const newComment = new CommentModel({
    textHTML: data.textHTML,
    textJSON: data.textJSON,
    isRoot: true,
    authorId: data.authorId,
    replyingTo: data.replyingTo,
    postID: data.postID,
    //communityID: data.communityID,
    //voters: data.voters,
  });
  console.log(newComment);
  const result = await newComment.save();
  if (!result) {
    throw new appError("This comment wasn't created!", 400);
  }

  if (user?.hasComment) {
    user.hasComment.push(result._id);
  } else {
    throw new appError("User's hasComment property is undefined!", 500); // Or handle the error appropriately
  }

  if (post?.postComments) {
    console.log('before push');
    console.log(post.postComments);
    post.postComments.push(result._id);
    console.log('after push');
    console.log(post.postComments);
  } else {
    throw new appError("Post's postComments property is undefined!", 500); // Or handle the error appropriately
  }
  await Promise.all([user.save(), post.save()]);

  return result;
}
export { add_comment };

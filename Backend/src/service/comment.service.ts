import { Comment, CommentModel } from '../model/comments.model';
import { User, UserModel } from '../model/user.model';
//import { appError } from '../utils/appError';

/**
 * Finds a user ID by username.
 *
 * @param username - The username of the user to find.
 * @returns A promise that resolves to the user object if found, or null if not found.
 */
// export function findUserByUsername(username: string) {
//   return UserModel.findOne({ username });
// }

export async function findUserIdByUsername(username: string) {
  try {
    // Search for the user by username and select only the _id field
    const user = await UserModel.findOne({ username }).select('_id');

    if (user) {
      // If user is found, return the user ID
      return user._id.toString(); // Convert ObjectId to string
    } else {
      // If user is not found, return null
      return null;
    }
  } catch (error) {
    console.error('Error in findUserIdByUsername:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
}
/**
 * Finds user comments by username.
 *
 * @param username- The username of the user to find and method of sorting comments.
 * @returns A promise that resolves to the comment object if found, or null if not found.
 */
export async function findUserComments(userId: string, sortBy: string) {
  try {
    const comments: Comment[] = await CommentModel.find({ authorId: userId });
    if (sortBy === 'New') {
      // Sort comments by createdAt timestamp in descending order
      comments.sort((a, b) => {
        // Check if both a and b have the createdAt property defined
        if (a.createdAt && b.createdAt) {
          return b.createdAt.getTime() - a.createdAt.getTime();
        }
        // If createdAt is not defined for either a or b, return 0 to maintain current order
        return 0;
      });
      return comments;
    }
    // } else if (sortBy === 'Top') {
    //   const retrivedComments = comments.map((comment) => {
    //     const engagementScore = (comment?.voters?.length ?? 0) + (comment?.replies?.length ?? 0);
    //     return { ...comment.toObject(), engagementScore };
    //   });
    //   retrivedComments.sort((a, b) => b.engagementScore - a.engagementScore);
    // }
  } catch (error) {
    console.error('Error in findUserComments:', error);
    throw error; // Re-throw the error to be caught by thecaller
  }
}

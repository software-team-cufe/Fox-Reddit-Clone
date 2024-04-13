import UserModel, { User } from '../model/user.model';
import PostModel, { Post } from '../model/posts.model';
import appError from '../utils/appError';
/**
 * Creates a new user.
 *
 * @param input - The user data to create.
 * @returns A promise that resolves to the created user.
 */
export function createUser(input: Partial<User>) {
  return UserModel.create(input);
}

/**
 * Finds a user by their ID.
 *
 * @param id - The ID of the user to find.
 * @returns A promise that resolves to the user object if found, or null if not found.
 */
export function findUserById(id: string) {
  return UserModel.findById(id);
}

/**
 * Finds a user by their email address.
 *
 * @param email - The email address of the user to find.
 * @returns A promise that resolves to the user object if found, or null if not found.
 */
export function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}
/**
 * Finds a user by their username.
 *
 * @param username - The username of the user to find.
 * @returns A promise that resolves to the user object if found, or null if not found.
 */
// export function findUserByUsername(username: string) {
//   return UserModel.findOne({ username });
// }

export async function findUserByUsername(username: string) {
  try {
    return await UserModel.findOne({ username });
  } catch (error) {
    throw new appError('User not found ', 404); //vague error Re-throw the error to be caught by thecaller
  }
}
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
 * Finds user posts by username.
 *
 * @param username - The username of the user to find posts for.
 * @returns posts ids of the user  by username.
 */
export async function userSubmittedPosts(username: string) {
  // Find the user by username and retrieve their user submitted posts
  const user = await UserModel.findOne({ username: username }, 'hasPost');
  // If user is not found, throw an error
  if (!user) {
    throw new appError("This user doesn't exist!", 404);
  }
  // Extract the post IDs from the user's submitted posts if it exists
  const postsIDS = user.hasPost ? user.hasPost.map((post) => post.toString()) : [];
  // Return the post IDs
  return postsIDS;
}
/**
 * Finds user comments by username.
 *
 * @param username - The username of the user to find posts for.
 * @returns comments ids of the user  by username.
 */
export async function userCommentsIds(username: string) {
  // Find the user by username and retrieve their user comments
  const user = await UserModel.findOne({ username: username }, 'hasComment');
  // If user is not found, throw an error
  if (!user) {
    throw new appError("This user doesn't exist!", 404);
  }
  // Extract the post IDs from the user's comments if it exists
  const commentsIDS = user.hasComment ? user.hasComment.map((comment) => comment.toString()) : [];
  // Return the comments IDs
  return commentsIDS;
}
/**
 * Finds user replies by username.
 *
 * @param username - The username of the user to find posts for.
 * @returns replies ids of the user  by username.
 */
export async function userRepliesIds(username: string) {
  // Find the user by username and retrieve their user comments
  const user = await UserModel.findOne({ username: username }, 'hasReply');
  //console.log('inside user service');
  //console.log(user);
  // If user is not found, throw an error
  if (!user) {
    throw new appError("This user doesn't exist!", 404);
  }

  // Extract the post IDs from the user's comments if it exists
  const repliesIDS = user.hasReply ? user.hasReply.map((comment) => comment.toString()) : [];
  //console.log('insside user service');
  //console.log(commentsIDS);
  // Return the comments IDs
  return repliesIDS;
}

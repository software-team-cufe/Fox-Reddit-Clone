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
    console.error('Error in findUserByUsername:', error);
    throw error; // Re-throw the error to be caught by the caller
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
// /**
//  * Finds user posts by username.
//  *
//  * @param userId - The ID of the user to find posts for.
//  * @param sortBy - The method of sorting posts ('New' or 'Top').
//  * @returns A promise that resolves to the post objects if found, or null if not found.
//  */
// export async function findUserPosts(userId: string, sortBy: string): Promise<Post[] | null> {
//   try {
//     const posts: Post[] = await PostModel.find({ authorId: userId });

//     if (sortBy === 'New') {
//       // Sort posts by createdAt timestamp in descending order
//       posts.sort((a, b) => {
//         if (a.createdAt && b.createdAt) {
//           return b.createdAt.getTime() - a.createdAt.getTime();
//         }
//         return 0;
//       });
//     } else if (sortBy === 'Top') {
//       // Perform sorting based on engagement score
//       posts.sort((a, b) => {
//         const engagementScoreA = (a.commentsNum ?? 0) + (a.votesCount ?? 0);
//         const engagementScoreB = (b.commentsNum ?? 0) + (b.votesCount ?? 0);
//         return engagementScoreB - engagementScoreA;
//       });
//     } else {
//       throw new Error('Invalid sortBy parameter');
//     }

//     return posts;
//   } catch (error) {
//     console.error('Error in findUserPosts:', error);
//     throw error;
//   }
// }
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

// /**
//  * Get comments which is written by the user from database
//  * @param {String} (username)
//  * @returns {Array} posts
//  * @function
//  */
// export async function userSubmittedComments(username: string) {
//   const user = await UserModel.findById(username, 'hasComment');
//   if (!user) throw new AppError("This user doesn't exist!", 404);
//   const comments: Comment[] = [];
//   user.hasComment.forEach((el) => {
//     comments.push(el);
//   });
//   return comments;
// }

/*************************Boudy ***************************
// export async function blockUser1(blocked: User, blocker: User) {
//   try {
//     if (blocker.blocksFromMe !== undefined) {
//       blocker.blocksFromMe.push(blocked._id);
//     }
//     return blocker;
//   } catch (error) {
//     console.error('Error in blocking a user:', error);
//     throw error;
//   }
// }
// export async function blockUser2(blocked: User, blocker: User) {
//   try {
//     if (blocked.blocksToMe !== undefined) {
//       blocked.blocksToMe.push(blocker._id);
//     }
//     return blocked;
//   } catch (error) {
//     console.error('Error in blocking a user:', error);
//     throw error;
//   }
// }

// export async function friendUser(reciever: User, sender: User) {
//   try {
//     const recieverid = reciever._id;
//     const senderid = sender._id;

//     if (recieverid && senderid) {
//       console.log(recieverid);
//       await UserModel.updateOne(
//         { _id: recieverid },
//         {
//           $addToSet: {
//             friendRequestToMe: senderid,
//           },
//         }
//       );
//       await UserModel.updateOne(
//         { _id: senderid },
//         {
//           $addToSet: {
//             friendRequestFromMe: recieverid,
//           },
//         }
//       );
//       console.log(sender);
//     } else {
//       console.error('User not found.');
//     }
//   } catch (error) {
//     console.error('Error in friending a user:', error);
//     throw error;
//   }
// }
*/
/********************************* */

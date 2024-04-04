import UserModel, { User } from '../model/user.model';
import { Post, PostModel } from '../model/posts.model';

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

/**
 * Finds user posts by username.
 *
 * @param username- The username of the user to find and method of sorting comments.
 * @returns A promise that resolves to the post object if found, or null if not found.
 */
export async function findUserPosts(userId: string, sortBy: string) {
  try {
    const posts: Post[] = await PostModel.find({ authorId: userId });
    if (sortBy === 'New') {
      // Sort posts by createdAt timestamp in descending order
      posts.sort((a, b) => {
        // Check if both a and b have the createdAt property defined
        if (a.createdAt && b.createdAt) {
          return b.createdAt.getTime() - a.createdAt.getTime();
        }
        // If createdAt is not defined for either a or b, return 0 to maintain current order
        return 0;
      });
      return posts;
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

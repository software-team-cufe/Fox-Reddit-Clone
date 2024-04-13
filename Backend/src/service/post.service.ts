import appError from '../utils/appError';
import PostModel, { Post } from '../model/posts.model';
import UserModel, { User } from '../model/user.model';
import { DocumentType, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
/**
 * Finds a post by their ID.
 *
 * @param id - The ID of the post to find.
 * @returns A promise that resolves to the user object if found, or null if not found.
 */
export function findPostById(id: string) {
  return PostModel.findById(id);
}

async function userPosts(postIDs: string[], limit: number | undefined) {
  // If the request didn't contain a limit in its query, set it to 10 by default
  limit = limit || 10;

  // Fetch comments based on the provided postIDs
  const posts = await PostModel.find({ _id: { $in: postIDs } }).limit(limit);

  // Populate user and community information
  //posts = await PostModel.populate(posts, { path: 'userID', select: '_id avatar' });
  //posts = await PostModel.populate(posts, { path: 'communityID', select: '_id icon' });

  // Return the populated posts
  return posts;
}
/**
 * deletes a post for the given user.
 * @param {string} id - The ID of the post to hide.
 * @param {User} user - The user object.
 */
async function deletePost(id: string) {
  const post = await PostModel.findById(id);
  if (!post) {
    throw new appError('Post not found', 404);
  }
  await post.deleteOne();
  // comment.isDeleted = true;
  // await comment.save();
}
/**
 * Hides a post for the given user.
 * @param {string} id - The ID of the post to hide.
 * @param {User} user - The user object.
 */
async function hide(id: string, user: User) {
  const post = await PostModel.findById(id);
  if (!post) {
    throw new appError('Post not found', 404);
  }

  const hiddenPosts = user.hiddenPosts ?? [];
  // Check if the post is already hidden by the user
  if (hiddenPosts.find((el) => el.id === id)) {
    return; // Exit the function if post is already hidden
  }
  // Hide the post for the user
  hiddenPosts.push(post._id);
  // await user.save();
}
/**
 * Hides a post for the given user.
 * @param {string} id - The ID of the post to hide.
 * @param {User} user - The user object.
 */
async function unhide(id: string, user: User) {
  const post = await PostModel.findById(id);
  if (!post) {
    throw new appError('Post not found', 404);
  }
  const hiddenPosts = user.hiddenPosts ?? [];
  // unhide the post for the user
  hiddenPosts.splice(
    hiddenPosts.findIndex((el) => el.id === id),
    1
  );
  //await user.save();
}

// /**
//  * User saves a post
//  * @param {string} linkID - The ID of the post to save.
//  * @param {User} user - The user object.
//  */
// async function save(linkID: string, user: DocumentType<User>): Promise<void> {
//   if (!linkID) {
//     throw new Error('No linkID is provided!');
//   }
//   if (!user) {
//     throw new Error("This user doesn't exist!");
//   }

//   // Assert that savedPosts is an array of Ref<Post>
//   const savedPosts: Ref<Post>[] = user.savedPosts || [];

//   // Extract the post ID from linkID (assuming it's prefixed with 'link')
//   const postID: Ref<Post> = new ObjectId(linkID.slice(4));

//   // Check if the post is already saved by the user
//   if (savedPosts.find((ref: Ref<Post>) => ref.equals(postID))) {
//     return;
//   }

//   // Save the post for the user
//   savedPosts.push(postID);
//   user.savedPosts = savedPosts; // Update savedPosts array
//   await user.save();
// }

// /**
//  * User unsaves a post
//  * @param {string} linkID - The ID of the post to unsave.
//  * @param {User} user - The user object.
//  */
// async function unsave(linkID: string, user: DocumentType<User>): Promise<void> {
//   if (!linkID) {
//     throw new Error('No linkID is provided!');
//   }
//   if (!user) {
//     throw new Error("This user doesn't exist!");
//   }

//   // Assert that savedPosts is an array of Ref<Post>
//   const savedPosts: Ref<Post>[] = user.savedPosts || [];

//   // Extract the post ID from linkID (assuming it's prefixed with 'link')
//   const postID = new ObjectId(linkID.slice(4));

//   // Find the index of the post to unsave
//   const index = savedPosts.findIndex((id) => id.equals(postID));
//   if (index === -1) {
//     // Post not found in savedPosts
//     return;
//   }

//   // Remove the post from the savedPosts array
//   savedPosts.splice(index, 1);

//   // Update the savedPosts array in the user object
//   user.savedPosts = savedPosts;

//   // Save the updated user object
//   await user.save();
// }
export { userPosts, deletePost, hide, unhide };

//post.service.ts
// import PostModel, { Post } from '../model/posts.model';

// async function userPosts(postIDs: string[], limit: number) {
//   // If the request didn't contain a limit in its query, set it to 10 by default
//   limit = limit || 10;

//   // Fetch posts based on the provided postIDs
//   const posts = await PostModel.find({ _id: { $in: postIDs } });

//   // Limit the number of fetched posts to the provided limit
//   const limitedPosts = posts.slice(0, limit);

//   // Return the fetched and limited posts
//   return limitedPosts;
// }

// export default userPosts;

import appError from '../utils/appError';
import PostModel, { Post } from '../model/posts.model';
import { User } from '../model/user.model';
import { findCommunityByName } from './community.service';
/**
 * Finds a post by their ID.
 *
 * @param id - The ID of the post to find.
 * @returns A promise that resolves to the user object if found, or null if not found.
 */
export function findPostById(id: string) {
  return PostModel.findById(id);
}

// export async function findPostsByCommunity(community: string): Promise<Post[]> {
//   try {
//     const communityObject = await findCommunityByName(community);

//     const posts = await PostModel.aggregate([
//       // Match documents by the community ID
//       { $match: { communities: communityObject?.id } },
//       // Sample documents randomly
//       { $sample: { size: 10 } }, // Adjust the size as needed
//     ]).exec();

//     return posts;
//   } catch (error) {
//     throw new Error('Error finding posts by community');
//   }
// }

export async function findBestPostsByCommunity(community: string): Promise<Post[]> {
  try {
    const communityObject = await findCommunityByName(community);

    const posts = await PostModel.find({ communities: communityObject?.id }).sort({ bestFactor: -1 }).exec();
    return posts;
  } catch (error) {
    throw new Error('Error finding posts by community');
  }
}

export async function findBestPostsByRandom(): Promise<Post[]> {
  try {
    const posts = await PostModel.find().sort({ bestFactor: -1 }).exec();
    return posts;
  } catch (error) {
    throw new Error('Error finding posts by community');
  }
}

export async function findHotPostsByCommunity(community: string): Promise<Post[]> {
  try {
    const communityObject = await findCommunityByName(community);
    const posts = await PostModel.find({ communities: communityObject?.id }).sort({ hotnessFactor: -1 }).exec();
    return posts;
  } catch (error) {
    throw new Error('Error finding posts by community');
  }
}

export async function findHotPostsByRandom(): Promise<Post[]> {
  try {
    const posts = await PostModel.find().sort({ hotnessFactor: -1 }).exec();
    return posts;
  } catch (error) {
    throw new Error('Error finding posts by community');
  }
}

export async function findNewPostsByCommunity(community: string): Promise<Post[]> {
  try {
    const communityObject = await findCommunityByName(community);

    const posts = await PostModel.find({ communities: communityObject?.id }).sort({ createdAt: -1 }).exec();
    return posts;
  } catch (error) {
    throw new Error('Error finding posts by community');
  }
}

export async function findNewPostsByRandom(): Promise<Post[]> {
  try {
    const posts = await PostModel.find().sort({ createdAt: -1 }).exec();
    return posts;
  } catch (error) {
    throw new Error('Error finding posts by community');
  }
}

export async function findTopPostsByCommunity(community: string): Promise<Post[]> {
  try {
    const communityObject = await findCommunityByName(community);

    const posts = await PostModel.find({ communities: communityObject?.id }).sort({ votesCount: -1 }).exec();
    return posts;
  } catch (error) {
    throw new Error('Error finding posts by community');
  }
}
export async function findTopPostsByRandom(): Promise<Post[]> {
  try {
    const posts = await PostModel.find().sort({ votesCount: -1 }).exec();
    return posts;
  } catch (error) {
    throw new Error('Error finding posts by community');
  }
}

export async function findRandomPostsByCommunity(community: string): Promise<Post[]> {
  try {
    const communityObject = await findCommunityByName(community);

    const posts = await PostModel.find({ communities: communityObject?.id }).exec();
    return posts;
  } catch (error) {
    throw new Error('Error finding posts by community');
  }
}
export async function findRandomPostsByRandom(): Promise<Post[]> {
  try {
    const posts = await PostModel.find().exec();
    return posts;
  } catch (error) {
    throw new Error('Error finding posts by community');
  }
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
  if (hiddenPosts.find((el) => el.toString() === id)) {
    return; // Exit the function if post is already hidden
  }
  // Hide the post for the user
  hiddenPosts.push(post._id);
  //await user.save();
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

//Function to get the best posts from a specific subreddit
export async function getBestPostsFromSubreddit(subreddit: string): Promise<Post[]> {
  const bestPosts = await findBestPostsByCommunity(subreddit);
  return bestPosts;
}
export async function getBestPostsFromRandom(): Promise<Post[]> {
  const bestPosts = await findBestPostsByRandom();
  return bestPosts;
}

export async function getHotPostsFromSubreddit(subreddit: string): Promise<Post[]> {
  const bestPosts = await findHotPostsByCommunity(subreddit);
  return bestPosts;
}

export async function getHotPostsFromRandom(): Promise<Post[]> {
  const bestPosts = await findHotPostsByRandom();
  return bestPosts;
}

export async function getNewPostsFromSubreddit(subreddit: string): Promise<Post[]> {
  const bestPosts = await findNewPostsByCommunity(subreddit);
  return bestPosts;
}

export async function getNewPostsFromRandom(): Promise<Post[]> {
  const bestPosts = await findNewPostsByRandom();
  return bestPosts;
}

export async function getTopPostsFromSubreddit(subreddit: string): Promise<Post[]> {
  const bestPosts = await findTopPostsByCommunity(subreddit);
  return bestPosts;
}

export async function getTopPostsFromRandom(): Promise<Post[]> {
  const bestPosts = await findTopPostsByRandom();
  return bestPosts;
}

export async function getRandomPostsFromSubreddit(subreddit: string): Promise<Post[]> {
  const bestPosts = await findRandomPostsByCommunity(subreddit);
  return bestPosts;
}

export async function getRandomPostsFromRandom(): Promise<Post[]> {
  const bestPosts = await findRandomPostsByRandom();
  return bestPosts;
}

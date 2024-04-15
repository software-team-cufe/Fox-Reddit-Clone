import appError from '../utils/appError';
import PostModel, { Post } from '../model/posts.model';
import  UserModel, { User } from '../model/user.model';
import { DocumentType, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';

/**
 * Creates a new post.
 *
 * @param input - The post data to create.
 * @returns A promise that resolves to the created user.
 */
export function createPost(input: Partial<Post>) {
  return PostModel.create(input);
}
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
export { userPosts };

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

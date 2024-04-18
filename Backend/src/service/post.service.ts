import appError from '../utils/appError';
import PostModel, { Post } from '../model/posts.model';
import UserModel, { User } from '../model/user.model';
import { DocumentType, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { findCommunityByName } from './community.service';
import { QueryOptions } from 'mongoose';
import { shuffle } from 'lodash';
/**
 * Creates a new post.
 *
 * @param input - The post data to create.
 * @returns A promise that resolves to the created user.
 */
export function createPost(input: Partial<Post>) {
  return PostModel.create(input);
}
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

export async function findBestPostsByCommunity(
  community: string,
  limit: number = 10,
  page: number = 1,
  count: number = 0
): Promise<Post[]> {
  try {
    const communityObject = await findCommunityByName(community);

    const queryOptions: QueryOptions = { sort: { bestFactor: -1 } };

    // Apply count as skip (offset)
    if (count > 0) {
      queryOptions.skip = count;
    }

    // Apply limit if provided
    if (limit > 0) {
      queryOptions.limit = limit;
    }

    const posts = await PostModel.find({ communities: communityObject?.id }, null, queryOptions).exec();
    const startIndex = (page - 1) * limit;
    // Check if the start index exceeds the total number of records
    if (startIndex >= posts.length) {
      return []; // Return an empty array if there are no more records
    }

    // Return a slice of the posts array with the specified limit and start index
    return posts.slice(startIndex, startIndex + limit);
  } catch (error) {
    throw new Error('Error finding posts by community');
  }
}

export async function findBestPostsByRandom(limit: number = 10, page: number = 1, count: number = 0): Promise<Post[]> {
  try {
    const queryOptions: QueryOptions = { sort: { bestFactor: -1 } };

    // Apply count as skip (offset)
    if (count > 0) {
      queryOptions.skip = count;
    }

    // Apply limit if provided
    if (limit > 0) {
      queryOptions.limit = limit;
    }

    const posts = await PostModel.find({}, null, queryOptions).exec();
    const startIndex = (page - 1) * limit;
    // Check if the start index exceeds the total number of records
    if (startIndex >= posts.length) {
      return []; // Return an empty array if there are no more records
    }

    // Return a slice of the posts array with the specified limit and start index
    return posts.slice(startIndex, startIndex + limit);
  } catch (error) {
    throw new Error('Error finding posts by community');
  }
}

export async function findHotPostsByCommunity(
  community: string,
  limit: number = 10,
  page: number = 1,
  count: number = 0
): Promise<Post[]> {
  try {
    const communityObject = await findCommunityByName(community);

    const queryOptions: QueryOptions = { sort: { hotnessFactor: -1 } };

    // Apply count as skip (offset)
    if (count > 0) {
      queryOptions.skip = count;
    }

    // Apply limit if provided
    if (limit > 0) {
      queryOptions.limit = limit;
    }

    const posts = await PostModel.find({ communities: communityObject?.id }, null, queryOptions).exec();
    const startIndex = (page - 1) * limit;
    // Check if the start index exceeds the total number of records
    if (startIndex >= posts.length) {
      return []; // Return an empty array if there are no more records
    }

    // Return a slice of the posts array with the specified limit and start index
    return posts.slice(startIndex, startIndex + limit);
  } catch (error) {
    throw new Error('Error finding hot posts by community');
  }
}

export async function findHotPostsByRandom(limit: number = 10, page: number = 1, count: number = 0): Promise<Post[]> {
  try {
    const queryOptions: QueryOptions = { sort: { hotnessFactor: -1 } };

    // Apply count as skip (offset)
    if (count > 0) {
      queryOptions.skip = count;
    }

    // Apply limit if provided
    if (limit > 0) {
      queryOptions.limit = limit;
    }

    const posts = await PostModel.find({}, null, queryOptions).exec();
    const startIndex = (page - 1) * limit;
    // Check if the start index exceeds the total number of records
    if (startIndex >= posts.length) {
      return []; // Return an empty array if there are no more records
    }

    // Return a slice of the posts array with the specified limit and start index
    return posts.slice(startIndex, startIndex + limit);
  } catch (error) {
    throw new Error('Error finding hot posts randomly');
  }
}

export async function findNewPostsByCommunity(
  community: string,
  limit: number = 10,
  page: number = 1,
  count: number = 0
): Promise<Post[]> {
  try {
    const communityObject = await findCommunityByName(community);

    const queryOptions: QueryOptions = { sort: { createdAt: -1 } };

    // Apply count as skip (offset)
    if (count > 0) {
      queryOptions.skip = count;
    }

    // Apply limit if provided
    if (limit > 0) {
      queryOptions.limit = limit;
    }

    const posts = await PostModel.find({ communities: communityObject?.id }, null, queryOptions).exec();
    const startIndex = (page - 1) * limit;
    // Check if the start index exceeds the total number of records
    if (startIndex >= posts.length) {
      return []; // Return an empty array if there are no more records
    }

    // Return a slice of the posts array with the specified limit and start index
    return posts.slice(startIndex, startIndex + limit);
  } catch (error) {
    throw new Error('Error finding new posts by community');
  }
}

export async function findNewPostsByRandom(limit: number = 10, page: number = 1, count: number = 0): Promise<Post[]> {
  try {
    const queryOptions: QueryOptions = { sort: { createdAt: -1 } };

    // Apply count as skip (offset)
    if (count > 0) {
      queryOptions.skip = count;
    }

    // Apply limit if provided
    if (limit > 0) {
      queryOptions.limit = limit;
    }

    const posts = await PostModel.find({}, null, queryOptions).exec();
    const startIndex = (page - 1) * limit;
    // Check if the start index exceeds the total number of records
    if (startIndex >= posts.length) {
      return []; // Return an empty array if there are no more records
    }

    // Return a slice of the posts array with the specified limit and start index
    return posts.slice(startIndex, startIndex + limit);
  } catch (error) {
    throw new Error('Error finding new posts randomly');
  }
}

export async function findTopPostsByCommunity(
  community: string,
  limit: number = 10,
  page: number = 1,
  count: number = 0
): Promise<Post[]> {
  try {
    const communityObject = await findCommunityByName(community);

    const queryOptions: QueryOptions = { sort: { votesCount: -1 } };

    // Apply count as skip (offset)
    if (count > 0) {
      queryOptions.skip = count;
    }

    // Apply limit if provided
    if (limit > 0) {
      queryOptions.limit = limit;
    }

    const posts = await PostModel.find({ communities: communityObject?.id }, null, queryOptions).exec();
    const startIndex = (page - 1) * limit;
    // Check if the start index exceeds the total number of records
    if (startIndex >= posts.length) {
      return []; // Return an empty array if there are no more records
    }

    // Return a slice of the posts array with the specified limit and start index
    return posts.slice(startIndex, startIndex + limit);
  } catch (error) {
    throw new Error('Error finding top posts by community');
  }
}

export async function findTopPostsByRandom(limit: number = 10, page: number = 1, count: number = 0): Promise<Post[]> {
  try {
    const queryOptions: QueryOptions = { sort: { votesCount: -1 } };

    // Apply count as skip (offset)
    if (count > 0) {
      queryOptions.skip = count;
    }

    // Apply limit if provided
    if (limit > 0) {
      queryOptions.limit = limit;
    }

    const posts = await PostModel.find({}, null, queryOptions).exec();
    const startIndex = (page - 1) * limit;
    // Check if the start index exceeds the total number of records
    if (startIndex >= posts.length) {
      return []; // Return an empty array if there are no more records
    }

    // Return a slice of the posts array with the specified limit and start index
    return posts.slice(startIndex, startIndex + limit);
  } catch (error) {
    throw new Error('Error finding top posts randomly');
  }
}

export async function findRandomPostsByCommunity(
  community: string,
  limit: number = 10,
  page: number = 1,
  count: number = 0
): Promise<Post[]> {
  try {
    const communityObject = await findCommunityByName(community);

    if (!communityObject) {
      throw new Error('Community not found');
    }

    // Find posts that belong to the specified community
    const posts = await PostModel.find({ communities: communityObject.id });

    // Shuffle the array of posts
    let shuffledPosts = shuffle(posts);

    // Apply count as skip (offset)
    if (count > 0) {
      shuffledPosts = shuffledPosts.slice(count);
    }

    // Calculate the start index based on the page number and limit
    const startIndex = (page - 1) * limit;

    // Check if the start index exceeds the total number of records
    if (startIndex >= shuffledPosts.length) {
      return []; // Return an empty array if there are no more records
    }

    // Return a slice of the shuffled array with the specified limit and start index
    return shuffledPosts.slice(startIndex, startIndex + limit);
  } catch (error) {
    throw new Error('Error finding random posts by community');
  }
}

export async function findRandomPostsByRandom(
  limit: number = 10,
  page: number = 1,
  count: number = 0
): Promise<Post[]> {
  try {
    const queryOptions: QueryOptions = {};

    // Apply count as skip (offset)
    if (count > 0) {
      queryOptions.skip = count;
    }

    // Calculate the start index based on the page number and limit
    const startIndex = (page - 1) * limit;

    // Apply limit if provided
    if (limit > 0) {
      queryOptions.limit = limit;
    }

    // Randomly sample the posts
    const posts = await PostModel.aggregate([
      { $sample: { size: limit } }, // Randomly sample 'limit' number of documents
    ]).exec();

    // Check if the start index exceeds the total number of records
    if (startIndex >= posts.length) {
      return []; // Return an empty array if there are no more records
    }

    // Return a slice of the posts array with the specified limit and start index
    return posts.slice(startIndex, startIndex + limit);
  } catch (error) {
    throw new Error('Error finding random posts randomly');
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
export async function getBestPostsFromSubreddit(
  subreddit: string,
  limit: number = 10,
  page: number = 1,
  count: number = 0
): Promise<Post[]> {
  const bestPosts = await findBestPostsByCommunity(subreddit, limit, page, count);
  return bestPosts;
}

export async function getBestPostsFromRandom(limit: number = 10, page: number = 1, count: number = 0): Promise<Post[]> {
  const bestPosts = await findBestPostsByRandom(limit, page, count);
  return bestPosts;
}

export async function getHotPostsFromSubreddit(
  subreddit: string,
  limit: number = 10,
  page: number = 1,
  count: number = 0
): Promise<Post[]> {
  const hotPosts = await findHotPostsByCommunity(subreddit, limit, page, count);
  return hotPosts;
}

export async function getHotPostsFromRandom(limit: number = 10, page: number = 1, count: number = 0): Promise<Post[]> {
  const hotPosts = await findHotPostsByRandom(limit, page, count);
  return hotPosts;
}

export async function getNewPostsFromSubreddit(
  subreddit: string,
  limit: number = 10,
  page: number = 1,
  count: number = 0
): Promise<Post[]> {
  const newPosts = await findNewPostsByCommunity(subreddit, limit, page, count);
  return newPosts;
}

export async function getNewPostsFromRandom(limit: number = 10, page: number = 1, count: number = 0): Promise<Post[]> {
  const newPosts = await findNewPostsByRandom(limit, page, count);
  return newPosts;
}

export async function getTopPostsFromSubreddit(
  subreddit: string,
  limit: number = 10,
  page: number = 1,
  count: number = 0
): Promise<Post[]> {
  const topPosts = await findTopPostsByCommunity(subreddit, limit, page, count);
  return topPosts;
}

export async function getTopPostsFromRandom(limit: number = 10, page: number = 1, count: number = 0): Promise<Post[]> {
  const topPosts = await findTopPostsByRandom(limit, page, count);
  return topPosts;
}

export async function getRandomPostsFromSubreddit(
  subreddit: string,
  limit: number = 10,
  page: number = 1,
  count: number = 0
): Promise<Post[]> {
  const randomPosts = await findRandomPostsByCommunity(subreddit, limit, page, count);
  return randomPosts;
}

export async function getRandomPostsFromRandom(
  limit: number = 10,
  page: number = 1,
  count: number = 0
): Promise<Post[]> {
  const randomPosts = await findRandomPostsByRandom(limit, page, count);
  return randomPosts;
}

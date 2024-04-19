import appError from '../utils/appError';
import CommunityModel from '../model/community.model';
import { Post } from '../model/posts.model';
/**
 * Finds a community by its subreddit name.
 *
 * @param subreddit - The name of the subreddit to search for.
 * @returns A Promise that resolves to the found community, or null if not found.
 * @throws {Error} If an error occurs while searching for the community.
 */
export async function findCommunityByName(subreddit: string) {
  try {
    return await CommunityModel.findOne({ subreddit });
  } catch (error) {
    console.error('Error in findCommunityByName:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

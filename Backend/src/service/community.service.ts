import appError from '../utils/appError';
import CommunityModel from '../model/community.model';
import { Post } from '../model/posts.model';
/**
 * Finds a community by its subreddit name.
 *
 * @param {string} subreddit - The subreddit name to search for.
 * @return {Promise<any>} The community object found based on the subreddit name.
 */
export async function findCommunityByName(subreddit: string) {
  try {
    return await CommunityModel.findOne({ subreddit });
  } catch (error) {
    console.error('Error in findCommunityByName:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
}
/**
 * Fetches communities based on the provided array of community IDs.
 *
 * @param {string[]} commIDs - An array of community IDs.
 * @return {Promise<any[]>} A promise that resolves to an array of populated communities.
 */
async function getUserCommunities(commIDs: string[]) {
  // Fetch communities based on the provided commIDs
  const communities = await CommunityModel.find({ _id: { $in: commIDs } });

  // Return the populated communities
  return communities;
}
export { getUserCommunities };

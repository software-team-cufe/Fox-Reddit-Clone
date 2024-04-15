import appError from '../utils/appError';
import CommunityModel from '../model/community.model';
import { Post } from '../model/posts.model';
export async function findCommunityByName(subreddit: string) {
  try {
    return await CommunityModel.findOne({ subreddit });
  } catch (error) {
    console.error('Error in findCommunityByName:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

import PostModel from '../model/posts.model';
interface Query {
  limit?: number;
}

async function userPosts(postIDs: string[], query: Query) {
  // If the request didn't contain a limit in its query, set it to 10 by default
  query.limit = query.limit || 10;

  // Fetch comments based on the provided postIDs
  let posts = await PostModel.find({ _id: { $in: postIDs } });
  console.log(posts);
  // Populate user and community information
  posts = await PostModel.populate(posts, { path: 'userID', select: '_id avatar' });
  //posts = await PostModel.populate(posts, { path: 'communityID', select: '_id icon' });

  // Return the populated posts
  return posts;
}

export default userPosts;

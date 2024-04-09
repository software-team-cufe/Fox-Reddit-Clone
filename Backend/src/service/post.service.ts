import appError from '../utils/appError';
import PostModel from '../model/posts.model';

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

async function deletePost(id: string) {
  const post = await PostModel.findById(id);
  if (!post) {
    throw new appError('Post not found', 404);
  }
  await post.deleteOne();
  // comment.isDeleted = true;
  // await comment.save();
}
export { userPosts, deletePost };

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

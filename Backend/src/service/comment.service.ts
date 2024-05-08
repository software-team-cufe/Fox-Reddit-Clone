import { Post } from '../model/posts.model';
import CommentModel, { Comment } from '../model/comments.model';
import { User, UserModel } from '../model/user.model';
import appError from '../utils/appError';
import { findPostById } from './post.service';
import { findUserById, findUserByUsername } from './user.service';
import _ from 'lodash';
/**
 * Finds a comment by their ID.
 *
 * @param id - The ID of the post to find.
 * @returns A promise that resolves to the user object if found, or null if not found.
 */
export function findCommentById(id: string) {
  return CommentModel.findById(id);
}

/**
 * Retrieves comments based on their IDs with pagination support.
 *
 * @param commentsIDS - Array of comment IDs.
 * @param limit - Maximum number of comments to retrieve.
 * @returns An array of comment objects.
 */
export async function userComments(commentsIDS: string[], limit: number) {
  // Fetch comments based on the provided commentIDs
  const comments = await CommentModel.find({
    _id: { $in: commentsIDS },
    isDeleted: false,
  }).limit(limit);

  // comments = await CommentModel.populate(comments, { path: 'authorId', select: '_id avatar' });

  // Return the fetched comments
  return comments;
}

/**
 * Retrieves comments based on their IDs with pagination support.
 *
 * @param commentsIDS - Array of comment IDs.
 * @param limit - Maximum number of comments to retrieve.
 * @returns An array of comment objects.
 */
export async function userCommentss(commentsIDS: string[], limit: number) {
  // Fetch comments based on the provided commentIDs
  let comments = await CommentModel.find({
    _id: { $in: commentsIDS },
    isDeleted: false,
  }).limit(limit);

  comments = await CommentModel.populate(comments, { path: 'authorId', select: '_id avatar' });

  // Return the fetched comments
  return comments;
}

/**
 * Creates a new user.
 *
 * @param input - The user data to create.
 * @returns A promise that resolves to the created user.
 */
export function createComment(input: Partial<Comment>) {
  return CommentModel.create(input);
}

/**
 * addMemberToCom
 * @param {string} body
 * @param {string} user user information
 * @return {Object} state
 * @function
 */
export async function addVoteToComment(userID: string, commentID: string, type: number) {
  const comment = await findCommentById(commentID);
  const user = await findUserById(userID);

  if (!comment) {
    return {
      status: false,
      error: 'Comment not found',
    };
  }

  if (!user) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  const vote = {
    userID: userID,
    type: type,
  };
  const temp = comment.votes;
  try {
    const updatedComment = await CommentModel.findByIdAndUpdate(
      comment._id,
      {
        $addToSet: { votes: vote },
        $inc: { votesCount: type },
      },
      { upsert: true, new: true }
    );
    const temp2 = updatedComment.votes;
    const isSame = _.isEqual(temp, temp2);

    if (isSame) {
      type = type * -2;
      const updated = await CommentModel.findByIdAndUpdate(
        comment._id,
        {
          $pull: { votes: vote },
          $inc: { votesCount: type },
        },
        { upsert: true, new: true }
      );
    }
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}
/**
 * Creates a new comment replay.
 *
 * @param {Partial<Comment>} input - The partial comment data to create.
 * @return {Promise<Comment>} A promise that resolves to the created comment replay.
 */
export function createReplay(input: Partial<Comment>) {
  return CommentModel.create(input);
}
/**
 * Retrieves an array of comments that are replies to the comment with the given ID.
 *
 * @param {string} commentID - The ID of the comment to find replies for.
 * @return {Promise<Comment[]>} A promise that resolves to an array of comments that are replies to the given comment ID.
 */
export function findRepliesIdByCommentId(commentID: string) {
  return CommentModel.find({ replyingTo: commentID });
}
/**
 * Finds replies based on the provided array of reply IDs.
 *
 * @param {string[]} repliesIds - An array of reply IDs.
 * @return {Promise<Comment[]>} A promise that resolves to an array of comments.
 */
export function findReplies(repliesIds: string[]) {
  return CommentModel.find({
    _id: { $in: repliesIds },
  });
}
/**
 * Extracts usernames from a given textJSON string that are preceded by "/".
 *
 * @param {string} textJSON - The textJSON string to extract usernames from.
 * @return {string[]} An array of usernames extracted from the textJSON string.
 */
export function extractUsernamesFromTextJSON(textJSON: string): string[] {
  // Example regex to extract usernames from textJSON preceded by "/"
  const regex = /\/([a-zA-Z0-9_]+)/g;
  const matches = textJSON.match(regex);

  if (!matches) return [];

  // Extract usernames from the matched strings
  const usernames = matches.map((match) => match.slice(1));

  return usernames;
}

export async function getCommentSearchResultsNotAuth(
  page: number,
  limit: number,
  query: string,
  sort: string | undefined
) {
  try {
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    let sortCriteria: Record<string, 1 | -1>;
    switch (sort) {
      case 'top':
        sortCriteria = { votesCount: -1 };
        break;
      case 'new':
        sortCriteria = { createdAt: -1 };
        break;
      default:
        sortCriteria = { createdAt: -1 };
        break;
    }

    const commentsResultsNotAuth = CommentModel.aggregate([
      {
        $match: {
          $or: [
            { textHTML: { $regex: query, $options: 'i' } }, // Match comments by HTML text
            { textJSON: { $regex: query, $options: 'i' } }, // Match comments by JSON text
          ],
          isDeleted: { $ne: true }, // Exclude posts with isDeleted set to true
        },
      },
      {
        $lookup: {
          from: 'posts', // Users collection
          localField: 'postID', // Field containing user IDs in the comments
          foreignField: '_id', // Field in the users model
          as: 'posts', // Name of the field to store user details in the result
        },
      },
      {
        $match: {
          'posts.title': { $exists: true }, // Filter out posts without title
          'posts.isHidden': { $ne: true }, // Exclude posts with isHidden set to true
          'posts.isDeleted': { $ne: true }, // Exclude posts with isDeleted set to true
          'posts.createdAt': { $lte: new Date() },
        },
      },
      {
        $lookup: {
          from: 'communities', // Users collection
          localField: 'posts.CommunityID', // Field containing user IDs in the comments
          foreignField: '_id', // Field in the users model
          as: 'communities', // Name of the field to store user details in the result
        },
      },
      {
        $match: {
          'communities.privacyType': 'Public', // Filter out posts without title
        },
      },
      {
        $lookup: {
          from: 'users', // Users collection
          localField: 'authorId', // Field containing user IDs in the comments
          foreignField: '_id', // Field in the users model
          as: 'users', // Name of the field to store user details in the result
        },
      },
      { $sort: sortCriteria }, // Apply sorting criteria
      { $skip: skip }, // Skip documents based on page and limit
      { $limit: limit }, // Limit the number of documents returned
      {
        $project: {
          communityID: '$communities._id', // Project comment communityID
          communityIcon: '$communities.icon', // Project community icon
          communityName: '$communities.name', // Project community name
          communityDescription: '$communities.description', // Project community description
          memberCount: '$communities.membersCnt', // Project member count
          postId: '$postID', // Project post ID
          title: '$posts.title', // Project post title
          userId: '$authorId', // Project user ID
          username: '$users.username', // Project username
          useravatar: '$users.avatar', // Project useravatar
          textHTML: '$textHTML', // Project comment textHTML
          textJSON: '$textJSON', // Project comment textJSON
          commentvotesCount: '$votesCount', // Project comment votesCount
          postvotesCount: '$posts.votesCount', // Project post votesCount
          commentcreatedAt: '$createdAt', // Project comment createdAt
          postcreatedAt: '$posts.createdAt', // Project post createdAt
          postcommentsNum: '$posts.commentsNum', // Project post commentsNum
          editedAt: '$editedAt', // Project comment editedAt
        },
      },
    ]);
    return commentsResultsNotAuth;
  } catch (error) {
    console.log(error);
    throw new appError('Failed to get search results comments', 400);
  }
}

export async function getCommentSearchResultsAuth(
  userID: string,
  page: number,
  limit: number,
  query: string,
  sort: string | undefined
) {
  try {
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    let sortCriteria: Record<string, 1 | -1>;
    switch (sort) {
      case 'top':
        sortCriteria = { votesCount: -1 };
        break;
      case 'new':
        sortCriteria = { createdAt: -1 };
        break;
      default:
        sortCriteria = { createdAt: -1 };
        break;
    }

    const commentsResultsAuth = CommentModel.aggregate([
      {
        $match: {
          $or: [
            { textHTML: { $regex: query, $options: 'i' } }, // Match comments by HTML text
            { textJSON: { $regex: query, $options: 'i' } }, // Match comments by JSON text
          ],
          isDeleted: { $ne: true }, // Exclude posts with isDeleted set to true
        },
      },
      {
        $lookup: {
          from: 'posts', // Users collection
          localField: 'postID', // Field containing user IDs in the comments
          foreignField: '_id', // Field in the users model
          as: 'posts', // Name of the field to store user details in the result
        },
      },
      {
        $match: {
          'posts.title': { $exists: true }, // Filter out posts without title
          'posts.isHidden': { $ne: true }, // Exclude posts with isHidden set to true
          'posts.isDeleted': { $ne: true }, // Exclude posts with isDeleted set to true
          'posts.createdAt': { $lte: new Date() },
        },
      },
      {
        $lookup: {
          from: 'communities', // Users collection
          localField: 'posts.CommunityID', // Field containing user IDs in the comments
          foreignField: '_id', // Field in the users model
          as: 'communities', // Name of the field to store user details in the result
        },
      },
      {
        $match: {
          $or: [
            { 'communities.privacyType': 'Public' }, // Match public communities
            { 'communities.members.userID': userID }, // Match communities where the user is a member
            { 'communities.moderators.userID': userID }, // Match communities where the user is a moderator
          ],
        },
      },
      {
        $lookup: {
          from: 'users', // Users collection
          localField: 'authorId', // Field containing user IDs in the comments
          foreignField: '_id', // Field in the users model
          as: 'users', // Name of the field to store user details in the result
        },
      },
      { $sort: sortCriteria }, // Apply sorting criteria
      { $skip: skip }, // Skip documents based on page and limit
      { $limit: limit }, // Limit the number of documents returned
      {
        $project: {
          communityID: '$communities._id', // Project comment communityID
          communityIcon: '$communities.icon', // Project community icon
          communityName: '$communities.name', // Project community name
          communityDescription: '$communities.description', // Project community description
          memberCount: '$communities.membersCnt', // Project member count
          postId: '$postID', // Project post ID
          title: '$posts.title', // Project post title
          userId: '$authorId', // Project user ID
          username: '$users.username', // Project username
          useravatar: '$users.avatar', // Project useravatar
          textHTML: '$textHTML', // Project comment textHTML
          textJSON: '$textJSON', // Project comment textJSON
          commentvotesCount: '$votesCount', // Project comment votesCount
          postvotesCount: '$posts.votesCount', // Project post votesCount
          commentcreatedAt: '$createdAt', // Project comment createdAt
          postcreatedAt: '$posts.createdAt', // Project post createdAt
          postcommentsNum: '$posts.commentsNum', // Project post commentsNum
          editedAt: '$editedAt', // Project comment editedAt
        },
      },
    ]);
    return commentsResultsAuth;
  } catch (error) {
    console.log(error);
    throw new appError('Failed to get search results comments', 400);
  }
}

export async function getSubredditCommentsSearch(
  communityName: string,
  page: number,
  limit: number,
  query: string,
  sort: string | undefined
) {
  try {
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    let sortCriteria: Record<string, 1 | -1>;
    switch (sort) {
      case 'top':
        sortCriteria = { votesCount: -1 };
        break;
      case 'new':
        sortCriteria = { createdAt: -1 };
        break;
      default:
        sortCriteria = { createdAt: -1 };
        break;
    }

    const subredditCommentsSearchResults = CommentModel.aggregate([
      {
        $match: {
          $or: [
            { textHTML: { $regex: query, $options: 'i' } }, // Match comments by HTML text
            { textJSON: { $regex: query, $options: 'i' } }, // Match comments by JSON text
          ],
          isDeleted: { $ne: true }, // Exclude posts with isDeleted set to true
        },
      },
      {
        $lookup: {
          from: 'posts', // Users collection
          localField: 'postID', // Field containing user IDs in the comments
          foreignField: '_id', // Field in the users model
          as: 'posts', // Name of the field to store user details in the result
        },
      },
      {
        $match: {
          'posts.title': { $exists: true }, // Filter out posts without title
          'posts.isHidden': { $ne: true }, // Exclude posts with isHidden set to true
          'posts.isDeleted': { $ne: true }, // Exclude posts with isDeleted set to true
          'posts.createdAt': { $lte: new Date() }, // Exclude posts created after the current date
        },
      },
      {
        $lookup: {
          from: 'communities', // Users collection
          localField: 'posts.CommunityID', // Field containing user IDs in the comments
          foreignField: '_id', // Field in the users model
          as: 'communities', // Name of the field to store user details in the result
        },
      },
      {
        $match: {
          'communities.name': communityName, // Filter comments by community name
        },
      },
      {
        $lookup: {
          from: 'users', // Users collection
          localField: 'authorId', // Field containing user IDs in the comments
          foreignField: '_id', // Field in the users model
          as: 'users', // Name of the field to store user details in the result
        },
      },
      { $sort: sortCriteria }, // Apply sorting criteria
      { $skip: skip }, // Skip documents based on page and limit
      { $limit: limit }, // Limit the number of documents returned
      {
        $project: {
          communityID: '$communities._id', // Project comment communityID
          communityIcon: '$communities.icon', // Project community icon
          communityName: '$communities.name', // Project community name
          communityDescription: '$communities.description', // Project community description
          memberCount: '$communities.membersCnt', // Project member count
          postId: '$postID', // Project post ID
          title: '$posts.title', // Project post title
          userId: '$authorId', // Project user ID
          username: '$users.username', // Project username
          useravatar: '$users.avatar', // Project useravatar
          textHTML: '$textHTML', // Project comment textHTML
          textJSON: '$textJSON', // Project comment textJSON
          commentvotesCount: '$votesCount', // Project comment votesCount
          postvotesCount: '$posts.votesCount', // Project post votesCount
          commentcreatedAt: '$createdAt', // Project comment createdAt
          postcreatedAt: '$posts.createdAt', // Project post createdAt
          postcommentsNum: '$posts.commentsNum', // Project post commentsNum
          commentEditedAt: '$editedAt', // Project comment editedAt
        },
      },
    ]);
    return subredditCommentsSearchResults;
  } catch (error) {
    console.log(error);
    throw new appError('Failed to get search results comments in subreddit', 400);
  }
}

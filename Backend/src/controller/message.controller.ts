import { ComposeMessageInput, DeleteMessageInput } from '../schema/message.schema';
import MessageModel, { Message } from '../model/message.model';

import { createMessage, deleteMessage, findMessageById } from '../service/message.service';
import { findUserById, findUserByUsername } from '../service/user.service';
import { Request, Response } from 'express';
import UserModel from '../model/user.model';

import CommunityModel from '../model/community.model';
import PostModel from '../model/posts.model';
import { findPostById } from '../service/post.service';
import CommentModel from '../model/comments.model';
import { findCommentById } from '../service/comment.service';
import { createNotification } from '../service/notification.service';
/**
 * Handles composing a message, checking user validity, creating the message, and returning the result.
 *
 * @param {Request<ComposeMessageInput['body']> req - The request object containing the message details.
 * @param {Response} res - The response object to send the result.
 * @return {Promise<void>} - Returns a Promise that resolves to void.
 */
export async function composeMessageHandler(req: Request<ComposeMessageInput['body']>, res: Response) {
  try {
    const user = res.locals.user;
    // Check if user is missing or invalid
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }
    const checkReceiver = await findUserByUsername(req.body.toUsername);
    if (!checkReceiver) {
      return res.status(500).json({
        response: 'invalid receiver username',
      });
    }

    const message = new MessageModel({
      text: req.body.text,
      subject: req.body.subject,
      fromID: user._id,
      toID: checkReceiver._id,
    });
    const createdMessage = await createMessage(message);

    // Save the new comment
    if (!createdMessage) {
      return res.status(400).json({ message: 'Failed to create the comment' });
    }
    await createNotification(
      checkReceiver._id,
      user.avatar ?? 'https://res.cloudinary.com/dvnf8yvsg/image/upload/v1714594934/vjhqqv4imw26krszm7hr.png',
      `${user.username} sent a message`,
      'message',
      req.body.text,
      createdMessage._id,
      checkReceiver.fcmtoken
    );
    res.status(200).json(createdMessage); // 201: Created
  } catch (error) {
    console.error('Error in composeMessageHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
/**
 * Handles the deletion of a message.
 *
 * @param {Request<DeleteMessageInput['body']>} req - The request object containing the message ID to be deleted.
 * @param {Response} res - The response object to send the result.
 * @return {Promise<void>} - Returns a Promise that resolves to void.
 */
export async function deleteMessageHandler(req: Request<DeleteMessageInput['body']>, res: Response) {
  try {
    // Check if user is missing or invalid
    if (!res.locals.user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }
    const message = await findMessageById(req.body.msgId);
    if (!message) {
      return res.status(404).json({
        status: 'error',
        message: 'Message not found',
      });
    }
    if (message.isDeleted == true) {
      return res.status(401).json({
        status: 'error',
        message: 'Message already deleted',
      });
    }
    const result = await deleteMessage(message._id.toString());
    if (result.status) {
      return res.status(200).json({
        response: 'deleted',
        id: result.id,
      });
    } else {
      return res.status(500).json({
        response: 'operation failed',
        error: result.error,
      });
    }
  } catch (error) {
    console.error('Error in deleteMessageHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
/**
 * Handles the request to retrieve the sent messages of a user.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<Response>} The response object containing the sent messages or an error message.
 */
export async function sentMessagesHandler(req: Request, res: Response) {
  // Check if user is missing or invalid
  if (!res.locals.user) {
    return res.status(400).json({
      status: 'failed',
      message: 'Access token is missing or invalid',
    });
  }

  const userId = res.locals.user._id;

  try {
    const messages = await MessageModel.find({ fromID: userId, isDeleted: false }).populate({
      path: 'toID',
      select: 'username avatar', // Select the fields to populate
    });
    return res.status(200).json({
      response: 'success',
      messages: messages,
    });
  } catch (error) {
    console.error('Error in sentMessagesHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
/**
 * Handles the request to retrieve the inbox messages of a user.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<Response>} The response object containing the inbox messages or an error message.
 */
export async function inboxMessagesHandler(req: Request, res: Response) {
  // Check if user is missing or invalid
  if (!res.locals.user) {
    return res.status(400).json({
      status: 'failed',
      message: 'Access token is missing or invalid',
    });
  }

  const userId = res.locals.user._id;

  try {
    const messages = await MessageModel.find({ toID: userId, isDeleted: false }).populate({
      path: 'toID',
      select: 'username avatar', // Select the fields to populate
    });
    return res.status(200).json({
      response: 'success',
      messages: messages,
    });
  } catch (error) {
    console.error('Error in inboxMessagesHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
/**
 * Get all messages
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - The response object containing the messages or an error message.
 */
export async function allMessagesHandler(req: Request, res: Response) {
  //this function retrieves all messages where the current user is either the sender or the recipient, excluding messages sent to themselves

  // Check if user is missing or invalid
  if (!res.locals.user) {
    return res.status(400).json({
      status: 'failed',
      message: 'Access token is missing or invalid',
    });
  }

  const userId = res.locals.user._id;

  try {
    const messages = await MessageModel.find(
      {
        $or: [
          { toID: userId, fromID: { $ne: userId } },
          { fromID: userId, toID: { $ne: userId } },
        ],
      },
      { isDeleted: false }
    )
      .populate({
        path: 'toID',
        select: 'username avatar', // Select the fields to populate
      })
      .populate({
        path: 'fromID',
        select: 'username avatar', // Select the fields to populate
      });
    return res.status(200).json({
      response: 'success',
      messages: messages,
    });
  } catch (error) {
    console.error('Error in allMessagesHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
/**
 * Handles the request to mark all messages as read for a user.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} - Returns a Promise that resolves to void.
 */
export async function markReadAllMessagesHandler(req: Request, res: Response) {
  // Check if user is missing or invalid
  if (!res.locals.user) {
    return res.status(400).json({
      status: 'failed',
      message: 'Access token is missing or invalid',
    });
  }

  const userId = res.locals.user._id.toString();

  try {
    // Update all messages where toID equals userId and unread_status is true
    await MessageModel.updateMany({ toID: userId, unread_status: true }, { $set: { unread_status: false } });

    // Return success response
    return res.status(200).json({
      status: 'success',
      message: 'All messages marked as read successfully',
    });
  } catch (error) {
    console.error('markReadAllMessagesHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
/**
 * Handles the request to mark a specific message as read for a user.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} - Returns a Promise that resolves to void.
 */
export async function markReadMessageHandler(req: Request, res: Response) {
  // Check if user is missing or invalid
  if (!res.locals.user) {
    return res.status(400).json({
      status: 'failed',
      message: 'Access token is missing or invalid',
    });
  }

  const userId = res.locals.user._id.toString();
  const messageId = req.body.messageId; // Get messageId from request parameters

  if (!messageId) {
    return res.status(401).json({
      status: 'failed',
      message: 'Message ID is missing',
    });
  }

  try {
    // Update the specified message to mark it as read
    const updatedMessage = await MessageModel.findOneAndUpdate(
      { _id: messageId, toID: userId },
      { $set: { unread_status: false } },
      { new: true } // Return the updated message
    );

    // If the message is not found or doesn't belong to the user, return error
    if (!updatedMessage) {
      return res.status(404).json({
        status: 'failed',
        message: 'Message not found or not accessible',
      });
    }

    // Return success response with the updated message
    return res.status(200).json({
      status: 'success',
      message: 'Message marked as read successfully',
      updatedMessage: updatedMessage,
    });
  } catch (error) {
    console.error('markReadMessageHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
/**
 * Handles the request to mark a specific message as unread for a user.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} - Returns a Promise that resolves to void.
 */
export async function markUnreadMessageHandler(req: Request, res: Response) {
  // Check if user is missing or invalid
  if (!res.locals.user) {
    return res.status(400).json({
      status: 'failed',
      message: 'Access token is missing or invalid',
    });
  }

  const userId = res.locals.user._id.toString();
  const messageId = req.body.messageId; // Get messageId from request parameters

  if (!messageId) {
    return res.status(401).json({
      status: 'failed',
      message: 'Message ID is missing',
    });
  }

  try {
    // Update the specified message to mark it as read
    const updatedMessage = await MessageModel.findOneAndUpdate(
      { _id: messageId, toID: userId },
      { $set: { unread_status: true } },
      { new: true } // Return the updated message
    );

    // If the message is not found or doesn't belong to the user, return error
    if (!updatedMessage) {
      return res.status(404).json({
        status: 'failed',
        message: 'Message not found or not accessible',
      });
    }

    // Return success response with the updated message
    return res.status(200).json({
      status: 'success',
      message: 'Message marked as read successfully',
      updatedMessage: updatedMessage,
    });
  } catch (error) {
    console.error('markReadMessageHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/**
 * Handles the request to retrieve the unread messages for a user.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<Response>} The response object containing the unread messages or an error message.
 */
export async function getUnreadMessagesHandler(req: Request, res: Response): Promise<Response> {
  // Check if user is missing or invalid
  if (!res.locals.user) {
    return res.status(400).json({
      status: 'failed',
      message: 'Access token is missing or invalid',
    });
  }

  const userId = res.locals.user._id;

  try {
    const messages = await MessageModel.find({ toID: userId, unread_status: true, isDeleted: false })
      .populate({
        path: 'toID',
        select: 'username avatar',
      })
      .populate({
        path: 'fromID',
        select: 'username avatar',
      });
    return res.status(200).json({
      response: 'success',
      messages: messages,
    });
  } catch (error) {
    console.error('Error in getUnreadMessagesHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
/**
 * Handles the request to retrieve all messages between a sender and receiver of certain subject.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<Response>} The response object containing the messages or an error message.
 */
export async function chatMessagesHandler(req: Request, res: Response) {
  const receiverId = res.locals.user._id;
  // Check if user is missing or invalid
  if (!receiverId) {
    return res.status(400).json({
      status: 'failed',
      message: 'Access token is missing or invalid',
    });
  }

  const senderUsername = req.query.senderUsername?.toString();
  const subject = req.query.subject?.toString();

  // Check if subject is provided
  if (!subject) {
    return res.status(400).json({
      status: 'failed',
      message: 'Subject is missing',
    });
  }

  // Check if sender username is provided
  if (!senderUsername) {
    return res.status(400).json({
      status: 'failed',
      message: 'Sender username is missing',
    });
  }

  try {
    // Find the sender user by username
    const sender = await findUserByUsername(senderUsername);
    if (!sender) {
      return res.status(404).json({
        status: 'failed',
        message: 'Sender not found',
      });
    }

    // Retrieve all messages between sender and receiver with the provided subject
    const messages = await MessageModel.find({
      $or: [
        { fromID: sender._id, toID: receiverId, subject: subject },
        { fromID: receiverId, toID: sender._id, subject: subject },
      ],
      isDeleted: false,
    })
      .sort({ createdAt: 1 })
      .populate('fromID', 'username') // Populate sender's username
      .populate('toID', 'username'); // Populate receiver's username; // Order by createdAt

    return res.status(200).json({
      response: 'success',
      messages: messages,
    });
  } catch (error) {
    console.error('Error in chatMessagesHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/**
 * Retrieves usernames and subjects of all messages sent or received by the logged-in user.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @return {Promise<Response>} A promise that resolves to the HTTP response object.
 */
export async function getAllMessagesUsernamesAndSubjectsHandler(req: Request, res: Response): Promise<Response> {
  // Check if user is missing or invalid
  if (!res.locals.user) {
    return res.status(400).json({
      status: 'failed',
      message: 'Access token is missing or invalid',
    });
  }

  const userId: string = res.locals.user._id as string; // Assuming _id is a string

  try {
    // Retrieve messages where the current user is either the sender or the recipient, and isDeleted is false
    const messages = await MessageModel.find({
      $and: [
        {
          $or: [{ fromID: userId }, { toID: userId }],
        },
        { isDeleted: false },
      ],
    });

    // Fetch usernames associated with sender and recipient IDs
    const userMessages = await Promise.all(
      messages.map(async (message) => {
        const sender =
          message.fromID.toString() === userId
            ? res.locals.user.username
            : (await UserModel.findById(message.fromID, 'username'))?.username;
        const recipient =
          message.toID.toString() === userId
            ? res.locals.user.username
            : (await UserModel.findById(message.toID, 'username'))?.username;

        return {
          fromUsername: sender,
          toUsername: recipient,
          subject: message.subject,
        };
      })
    );
    // Remove duplicates from the userMessages array
    const uniqueMessages = Array.from(new Set(userMessages.map((msg) => JSON.stringify(msg)))).map((str) =>
      JSON.parse(str)
    );

    return res.status(200).json({
      response: 'success',
      messages: uniqueMessages,
    });
  } catch (error) {
    console.error('Error in getAllMessagesUsernamesAndSubjectsHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
/**
 * Handles the request to mention a user in a comment.
 *
 * @param {Request} req - The HTTP request object containing the comment ID and the mentioned username in the request body.
 * @param {Response} res - The HTTP response object.
 * @return {Promise<void>} - A promise that resolves when the response is sent. The response contains the status of the operation.
 */
export async function mentionUserHandler(req: Request, res: Response) {
  try {
    const commentId = req.body.commentId.toString();

    // Extract user and post
    const user = await findUserByUsername(res.locals.user.username as string);
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    const mentionedUser = await UserModel.findOne({ username: req.body.mentionedUsername });
    if (!mentionedUser) {
      return res.status(400).json({
        status: 'failed',
        message: 'Mentioned user not found',
      });
    }

    const comment = await findCommentById(commentId);
    if (!comment) {
      return res.status(400).json({
        status: 'failed',
        message: 'Comment not found',
      });
    }

    const post = await findPostById(comment.postID.toString());
    if (!post) {
      return res.status(400).json({
        status: 'failed',
        message: 'Post not found',
      });
    }

    const mentionedIn = {
      mentionerID: user._id,
      commentID: comment._id,
      postID: post._id,
      createdAt: new Date(),
    };

    // Update mentionedInUsers in post model
    await PostModel.findByIdAndUpdate(
      post._id,
      { $addToSet: { mentionedIn: mentionedIn } },
      { new: true, upsert: true }
    );

    // Update mentionedInPosts in user model
    await UserModel.findByIdAndUpdate(
      mentionedUser._id,
      { $addToSet: { mentionedIn: mentionedIn } },
      { new: true, upsert: true }
    );

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('Error in mentionUserHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
/**
 * Handles the request to get the posts and comments that a user has been mentioned in.
 *
 * @param {Request} req - The HTTP request object containing the mentioned username in the request body.
 * @param {Response} res - The HTTP response object.
 * @return {Promise<void>} - A promise that resolves when the response is sent. The response contains an array of mentioned posts, each containing the post title, the username of the mentioner, the ID of the mentioned user, and additional data including the creation date, post title, community name, number of comments, the post object, and the comment object.
 */
export async function getPostAndCommentUserMentionedHandler(req: Request, res: Response) {
  try {
    const user = await UserModel.findOne({ username: req.body.mentionedUsername });
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'User not found',
      });
    }
    const mentionedPosts = [];
    if (user.mentionedIn) {
      for (const mention of user.mentionedIn) {
        const mentionerName = await UserModel.findById(mention.mentionerID).select('username');
        const post = await PostModel.findById(mention.postID).select('title').select('_id').select('commentsNum');

        const comment = await CommentModel.findById(mention.commentID);
        const communitName = await CommunityModel.findById(post?.CommunityID).select('name');
        if (post && comment) {
          mentionedPosts.push({
            postTitle: post.title,
            from: mentionerName,
            toId: user._id,
            postID: post._id,
            commentID: comment._id,
            createdAt: mention.createdAt,
            communityName: communitName,
            commentNum: post.commentsNum,
            comment: comment,
          });
        }
      }
    }
    res.status(200).json(mentionedPosts);
  } catch (error) {
    console.error('Error in getPostAndCommentUserMentionedHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
/**
 * Handles the request to add a reply to a post.
 *
 * @param {Request} req - The request object containing the post ID and username of the user being replied to.
 * @param {Response} res - The response object to send the result.
 * @return {Promise<void>} A promise that resolves when the reply is added and the response is sent.
 */
export async function addPostReplyHandler(req: Request, res: Response) {
  try {
    const { postID, replyToUsername, commentID } = req.body;

    // Extract user and post
    const user = await findUserByUsername(res.locals.user.username as string);
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }

    const post = await findPostById(postID.toString());
    if (!post) {
      return res.status(401).json({
        status: 'failed',
        message: 'Post not found',
      });
    }
    const comment = await findCommentById(commentID.toString());
    if (!comment) {
      return res.status(401).json({
        status: 'failed',
        message: 'Comment not found',
      });
    }
    // Extract user and post
    const replyToUser = await findUserByUsername(replyToUsername as string);
    if (!replyToUser) {
      return res.status(402).json({
        status: 'failed',
        message: 'User repllied not found',
      });
    }

    const mentionedIn = {
      replierID: user._id,
      postID: post._id,
      commentID: comment._id,
      createdAt: new Date(),
    };

    // Update mentionedInUsers in post model
    await PostModel.findByIdAndUpdate(
      post._id,
      { $addToSet: { repliedInPost: mentionedIn } },
      { new: true, upsert: true }
    );

    // Update mentionedInPosts in user model
    await UserModel.findByIdAndUpdate(
      replyToUser._id,
      { $addToSet: { repliedInPost: mentionedIn } },
      { new: true, upsert: true }
    );
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('Error in addReplyHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
/**
 * Handles the request to get the posts that a user has been mentioned in.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @return {Promise<void>} - A promise that resolves when the response is sent.
 */
export async function getuserPostreplisHandler(req: Request, res: Response) {
  try {
    const user = await UserModel.findOne({ username: res.locals.user.username });
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'User not found',
      });
    }
    const repliededPosts = [];
    if (user.repliedInPost) {
      for (const reply of user.repliedInPost) {
        const replierName = await UserModel.findById(reply.replierID).select('username');
        const post = await PostModel.findById(reply.postID).select('title').select('_id').select('commentsNum');
        const communitName = await CommunityModel.findById(post?.CommunityID).select('name');
        const comment = await CommentModel.findById(reply.commentID);
        if (post) {
          repliededPosts.push({
            postTitle: post.title,
            from: replierName,
            toId: user._id,
            postID: post._id,
            commentID: reply.commentID,
            createdAt: reply.createdAt,
            communityName: communitName,
            commentNum: post.commentsNum,
            Comment: comment,
          });
        }
      }
    }

    res.status(200).json(repliededPosts);
  } catch (error) {
    console.error('Error in getPostUserMentionedHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
/**
 * Handles the request to get all user-related data including mentioned posts, replied posts, and messages.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @return {Promise<void>} - A promise that resolves when the response is sent.
 */
export async function getuserAllHandler(req: Request, res: Response) {
  try {
    const user = await UserModel.findOne({ username: res.locals.user.username });
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'User not found',
      });
    }

    const mentionedPosts = [];
    if (user.mentionedIn) {
      for (const mention of user.mentionedIn) {
        const mentionerName = await UserModel.findById(mention.mentionerID).select('username');
        const post = await PostModel.findById(mention.postID).select('title').select('_id').select('commentsNum');
        const comment = await CommentModel.findById(mention.commentID);
        const communitName = await CommunityModel.findById(post?.CommunityID).select('name');
        if (post && comment) {
          mentionedPosts.push({
            postTitle: post.title,
            from: mentionerName,
            toId: user._id,
            postID: post._id,
            commentID: comment._id,
            createdAt: mention.createdAt,
            communityName: communitName,
            commentNum: post.commentsNum,
            comment: comment,
          });
        }
      }
    }

    const repliededPosts = [];
    if (user.repliedInPost) {
      for (const reply of user.repliedInPost) {
        const replierName = await UserModel.findById(reply.replierID).select('username');
        const post = await PostModel.findById(reply.postID).select('title').select('_id').select('commentsNum');
        const communitName = await CommunityModel.findById(post?.CommunityID).select('name');
        const comment = await CommentModel.findById(reply.commentID);
        if (post) {
          repliededPosts.push({
            postTitle: post.title,
            from: replierName,
            toId: user._id,
            postID: post._id,
            commentID: reply.commentID,
            createdAt: reply.createdAt,
            communityName: communitName,
            commentNum: post.commentsNum,
            Comment: comment,
          });
        }
      }
    }

    const messages = await MessageModel.find({
      $and: [
        {
          $or: [
            { toID: user._id, fromID: { $ne: user._id } },
            { fromID: user._id, toID: { $ne: user._id } },
          ],
        },
        { isDeleted: false },
      ],
    })
      .populate({
        path: 'toID',
        select: 'username avatar',
      })
      .populate({
        path: 'fromID',
        select: 'username avatar',
      });

    // Merge all arrays into one
    const allData = [...mentionedPosts, ...repliededPosts, ...messages];

    // Sort the merged array by createdAt field
    allData.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateA - dateB;
    });

    // Send the sorted merged array as the response
    res.status(200).json(allData);
  } catch (error) {
    console.error('Error in getuserAllHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
/**
 * Handles adding a reply to a message.
 *
 * @param {Request} req - The request object containing the reply details.
 * @param {Response} res - The response object to send the result.
 * @return {Promise<void>} - Returns a Promise that resolves to void.
 */
export async function addReplyOnMessageHandler(req: Request, res: Response) {
  try {
    const user = res.locals.user;
    // Check if user is missing or invalid
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Access token is missing or invalid',
      });
    }
    const checkReceiver = await findUserByUsername(req.body.toUsername);
    if (!checkReceiver) {
      return res.status(500).json({
        response: 'invalid receiver username',
      });
    }
    const parentMessage = await MessageModel.findById(req.body.parentID);
    if (!parentMessage) {
      return res.status(404).json({ message: 'Parent message not found' });
    }

    const message = new MessageModel({
      text: req.body.text,
      subject: parentMessage.subject,
      fromID: user._id,
      toID: checkReceiver._id,
      isReply: true,
    });
    const createdMessage = await createMessage(message);

    // Save the new comment
    if (!createdMessage) {
      return res.status(400).json({ message: 'Failed to create the comment' });
    }
    // Update the parent message with the reply
    parentMessage.Replies.push(createdMessage); // Push the new reply to the Replies array
    await parentMessage.save();

    await createNotification(
      checkReceiver._id,
      user.avatar ?? 'default.jpg',
      `${user.username} sent a message`,
      'message',
      req.body.text,
      createdMessage._id,
      checkReceiver.fcmtoken
    );
    res.status(200).json(createdMessage); // 201: Created
  } catch (error) {
    console.error('Error in addReplyOnMessageHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
/**
 * Handles the request to retrieve all messages between a sender and receiver of certain subject.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<Response>} The response object containing the messages, all reply IDs, or an error message.
 */
export async function allMessagesFRONTHandler(req: Request, res: Response) {
  const user = await findUserById(res.locals.user._id);
  if (!user) {
    return res.status(400).json({
      status: 'failed',
      message: 'Access token is missing or invalid',
    });
  }
  const userId = user._id;

  try {
    // Retrieve all messages between sender and receiver with the provided subject
    let messages = await MessageModel.find({
      $or: [{ fromID: userId }, { toID: userId }],
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .populate('fromID', 'username') // Populate sender's username
      .populate('toID', 'username') // Populate receiver's username; // Order by createdAt
      .populate({
        path: 'Replies',
        populate: { path: 'fromID toID', select: 'username' }, // Populate all attributes of Replies including fromID and toID
      });
    // Extract all reply IDs from the messages array
    const allReplyIds: string[] = [];
    for (const message of messages) {
      // Concatenate _id of each reply to allReplyIds
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      allReplyIds.push(...message.Replies.map((reply: any) => reply._id.toString()));
    }
    // Filter out messages with IDs present in allReplyIds
    messages = messages.filter((message) => !allReplyIds.includes(message._id.toString()));

    return res.status(200).json({
      response: 'success',
      messages: messages,
    });
  } catch (error) {
    console.error('Error in chatMessagesFRONTHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

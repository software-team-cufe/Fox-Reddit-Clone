import { ComposeMessageInput, DeleteMessageInput } from '../schema/message.schema';
import MessageModel from '../model/message.model';
import { createMessage, deleteMessage, findMessageById } from '../service/message.service';
import { findUserById } from '../service/user.service';
import { Request, Response } from 'express';
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
    const checkReceiver = await findUserById(req.body.toID);
    console.log(checkReceiver);
    if (!checkReceiver) {
      return res.status(500).json({
        response: 'invalid receiver username',
      });
    }

    const message = new MessageModel({
      text: req.body.text,
      subject: req.body.subject,
      fromID: user._id,
      toID: req.body.toID,
    });
    const createdMessage = await createMessage(message);

    // Save the new comment
    if (!createdMessage) {
      return res.status(400).json({ message: 'Failed to create the comment' });
    }

    res.status(200).json(createdMessage); // 201: Created
  } catch (error) {
    console.error('Error in addCommentHandler:', error);
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
    const messages = await MessageModel.find({
      $or: [
        { toID: userId, fromID: { $ne: userId } },
        { fromID: userId, toID: { $ne: userId } },
      ],
    }).populate({
      path: 'toID',
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
    const messages = await MessageModel.find({ toID: userId, unread_status: true });
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

import { ComposeMessageInput, DeleteMessageInput } from '../schema/message.schema';
import MessageModel from '../model/message.model';
import { createMessage, deleteMessage, findMessageById } from '../service/message.service';
import { findUserById } from '../service/user.service';
import { NextFunction, Request, Response } from 'express';
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

    // // Update user and post with the new comment
    // const updatedUser = await UserModel.findByIdAndUpdate(
    //   user._id,
    //   { $addToSet: { hasComment: createdComment._id } }, // Using $addToSet to avoid adding duplicate comments
    //   { new: true, upsert: true }
    // );

    // const updatedPost = await PostModel.findByIdAndUpdate(
    //   post._id,
    //   { $addToSet: { postComments: createdComment._id } },
    //   { new: true, upsert: true }
    // );

    res.status(200).json(createdMessage); // 201: Created
  } catch (error) {
    console.error('Error in addCommentHandler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
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

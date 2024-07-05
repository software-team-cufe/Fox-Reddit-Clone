import MessageModel, { Message } from '../model/message.model';
/**
 * Creates a new message.
 *
 * @param {Partial<Message>} input - The partial message data to create.
 * @return {type} A promise that resolves to the created message.
 */
export function createMessage(input: Partial<Message>) {
  return MessageModel.create(input);
}

/**
 * Retrieves a message from the database by its ID.
 *
 * @param {string} id - The ID of the message to retrieve.
 * @return {Promise<Message | null>} A Promise that resolves to the retrieved message, or null if no message is found.
 */
export function findMessageById(id: string) {
  return MessageModel.findById(id);
}
/**
 * Deletes a message by its ID.
 *
 * @param {string} msgID - The ID of the message to delete.
 * @return {object} An object indicating the status of the deletion operation. If successful, the object will have a `status` property set to `true` and an `id` property set to the ID of the deleted message. If the message ID is invalid or the deletion operation fails, the object will have a `status` property set to `false` and an `error` property describing the error.
 */
export async function deleteMessage(msgID: string) {
  try {
    await MessageModel.findByIdAndUpdate(msgID, { isDeleted: true }, { upsert: true, new: true });
  } catch (error) {
    // If an error occurs during the update, return error
    return {
      status: false,
      error: 'operation failed',
    };
  }
  return {
    status: true,
    id: msgID.toString(),
  };
}

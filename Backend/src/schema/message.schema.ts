import { query } from 'express';
import path from 'path';
import { any, object, string, boolean, array, TypeOf } from 'zod';

export const composeMessageSchema = object({
  body: object({
    text: string({
      required_error: 'text is required',
    }),
    subject: string({
      required_error: 'subject is required',
    }),
    toUsername: string({
      required_error: 'toUsername is required',
    }),
  }),
});
export const deleteMessageSchema = object({
  body: object({
    msgId: string({
      required_error: 'Id is required',
    }),
  }),
});
export const chatMessagesSchema = object({
  query: object({
    senderUsername: string({
      required_error: 'senderUsername is required',
    }),
  }),
});
export type ComposeMessageInput = TypeOf<typeof composeMessageSchema>;
export type DeleteMessageInput = TypeOf<typeof deleteMessageSchema>;
export type ChatMessagesInput = TypeOf<typeof chatMessagesSchema>;

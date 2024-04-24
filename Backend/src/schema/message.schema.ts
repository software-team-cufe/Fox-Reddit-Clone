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
    toID: string({
      required_error: 'toID is required',
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
export type ComposeMessageInput = TypeOf<typeof composeMessageSchema>;
export type DeleteMessageInput = TypeOf<typeof deleteMessageSchema>;

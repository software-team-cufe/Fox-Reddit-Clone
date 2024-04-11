import { object, string, TypeOf } from 'zod';

export const addCommentSchema = object({
  body: object({
    linkId: string({
      required_error: 'Link is required',
    }),
    text: string({
      required_error: 'Text is required',
    }),
  }),
});
export const deleteCommentOrPostSchema = object({
  body: object({
    id: string({
      required_error: 'id is required',
    }),
  }),
});

export const hidePostSchema = object({
  body: object({
    id: string({
      required_error: 'id is required',
    }),
    username: string({
      required_error: 'username is required',
    }),
  }),
});

export type addComment = TypeOf<typeof addCommentSchema>;
export type deleteCommentOrPost = TypeOf<typeof deleteCommentOrPostSchema>;
export type hidePost = TypeOf<typeof hidePostSchema>;
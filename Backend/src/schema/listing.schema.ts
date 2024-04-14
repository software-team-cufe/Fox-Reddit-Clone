import path from 'path';
import { any, object, string, TypeOf } from 'zod';

export const addCommentSchema = object({
  body: object({
    linkID: string({
      required_error: 'Link is required',
    }),
    textHTML: string({
      required_error: 'textHTML is required',
    }),

    textJSON: string({
      required_error: 'textJSON is required',
    }),
  }),
});

export const deleteCommentOrPostSchema = object({
  body: object({
    linkID: string({
      required_error: 'id is required',
    }),
  }),
});

export const hideAndUnhidePostSchema = object({
  body: object({
    linkID: string({
      required_error: 'id is required',
    }),
  }),
});

export const saveAndUnsaveSchema = object({
  body: object({
    linkID: string({
      required_error: 'id is required',
    }),
  }),
});

export const editUserTextSchema = object({
  body: object({
    linkID: string({
      required_error: 'id is required',
    }),
    text: string({
      required_error: 'Text is required',
    }),
  }),
});

export const insightsCountSchema = object({
  path: object({
    post: string({
      required_error: 'Post ID is required',
    }),
  }),
});

export type addComment = TypeOf<typeof addCommentSchema>;
export type deleteCommentOrPost = TypeOf<typeof deleteCommentOrPostSchema>;
export type hidePost = TypeOf<typeof hideAndUnhidePostSchema>;
export type savePost = TypeOf<typeof saveAndUnsaveSchema>;
export type editUserText = TypeOf<typeof editUserTextSchema>;
export type insightsCount = TypeOf<typeof insightsCountSchema>;

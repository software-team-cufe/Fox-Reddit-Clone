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
    linkID: string({
      required_error: 'id is required',
    }),
    username: string({
      required_error: 'type is required',
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
  params: object({
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

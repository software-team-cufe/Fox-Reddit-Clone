import path from 'path';
import { any, object, string, boolean, array, TypeOf } from 'zod';

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

export const spoilerPostSchema = object({
  body: object({
    linkID: string({
      required_error: 'linkID is required',
    }),
  }),
});

export const nsfwPostSchema = object({
  body: object({
    linkID: string({
      required_error: 'linkID is required',
    }),
  }),
});

export const lockPostSchema = object({
  body: object({
    linkID: string({
      required_error: 'linkID is required',
    }),
  }),
});

export const votePostSchema = object({
  body: object({
    linkID: string({
      required_error: 'linkID is required',
    }),
    type: string({
      required_error: 'Vote type is required',
    }),
  }),
});

export const submitPostSchema = object({
  body: object({
    title: string({
      required_error: 'title is required',
    }),
    text: string({
      required_error: 'text is required',
    }),
    attachments: array(string()).optional(),
    poll: array(string()).optional(),
    nsfw: boolean({
      required_error: 'nsfw is required',
    }),
    spoiler: boolean({
      required_error: 'spoiler is required',
    }),
    CommunityID: string().optional(),
  }),
});

export type addComment = TypeOf<typeof addCommentSchema>;
export type deleteCommentOrPost = TypeOf<typeof deleteCommentOrPostSchema>;
export type hidePost = TypeOf<typeof hideAndUnhidePostSchema>;
export type savePost = TypeOf<typeof saveAndUnsaveSchema>;
export type editUserText = TypeOf<typeof editUserTextSchema>;
export type insightsCount = TypeOf<typeof insightsCountSchema>;
export type spoilerPost = TypeOf<typeof spoilerPostSchema>;
export type nsfwPost = TypeOf<typeof nsfwPostSchema>;
export type lockPost = TypeOf<typeof lockPostSchema>;
export type votePost = TypeOf<typeof votePostSchema>;
export type submitPost = TypeOf<typeof submitPostSchema>;

import { object, string, TypeOf, array, boolean } from 'zod';

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
    attachments: array(string()),
    nsfw: boolean({
      required_error: 'nsfw is required',
    }),
    spoiler: boolean({
      required_error: 'spoiler is required',
    }),
  }),
});

export type addComment = TypeOf<typeof addCommentSchema>;
export type deleteCommentOrPost = TypeOf<typeof deleteCommentOrPostSchema>;
export type hidePost = TypeOf<typeof hidePostSchema>;
export type spoilerPost = TypeOf<typeof spoilerPostSchema>;
export type nsfwPost = TypeOf<typeof nsfwPostSchema>;
export type lockPost = TypeOf<typeof lockPostSchema>;
export type votePost = TypeOf<typeof votePostSchema>;
export type submitPost = TypeOf<typeof submitPostSchema>;

import { object, string, number, array, boolean, TypeOf } from 'zod';

const communityType = string().refine((val) => /^(Public|Private|Restricted)$/.test(val), {
  message: 'Type must be Public, Private, or Restricted',
});

export const createCommunitySchema = object({
  body: object({
    name: string({
      required_error: 'Community name name is required',
    }),
    type: communityType,
    over18: boolean({
      required_error: 'over18 is required',
    }),
  }),
});

export const subscribeCommunitySchema = object({
  params: object({
    subreddit: string({
      required_error: 'subreddit is required',
    }),
  }),
});

export const CommunityNameSchema = object({
  body: object({
    communityID: string({
      required_error: 'subreddit id is required',
    }),
  }),
});

export const getCommunitySchema = object({
  params: object({
    subreddit: string({
      required_error: 'subreddit is required',
    }),
  }),
});

export const banSchema = object({
  params: object({
    subreddit: string({
      required_error: 'Subreddit Id is required',
    }),
    username: string({
      required_error: 'username is required',
    }),
  }),
  body: object({
    reason: string({
      required_error: 'reason is required',
    }),
    note: string({
      required_error: 'note is required',
    }),
    period: number({
      required_error: 'period is required',
    }),
  }),
});

export const unbanSchema = object({
  params: object({
    subreddit: string({
      required_error: 'Subreddit Id is required',
    }),
    username: string({
      required_error: 'username is required',
    }),
  }),
});

export const muteSchema = object({
  params: object({
    subreddit: string({
      required_error: 'Subreddit Id is required',
    }),
    username: string({
      required_error: 'username is required',
    }),
  }),
  body: object({
    reason: string({
      required_error: 'reason is required',
    }),
  }),
});

export const unmuteSchema = object({
  params: object({
    subreddit: string({
      required_error: 'Subreddit Id is required',
    }),
    username: string({
      required_error: 'username is required',
    }),
  }),
});

export const editCommunityRulesSchema = object({
  params: object({
    subreddit: string({
      required_error: 'subreddit is required',
    }),
  }),
  body: object({
    rules: array(
      object({
        title: string({
          required_error: 'title is required',
        }),
        description: string().optional(),
        reason: string().optional(),
      })
    ),
  }),
});

export const editCommunityRemovalResonsSchema = object({
  params: object({
    subreddit: string({
      required_error: 'subreddit is required',
    }),
  }),
  body: object({
    reasons: array(
      object({
        title: string({
          required_error: 'title is required',
        }),
        description: string().optional(),
      })
    ),
  }),
});

export const editCommunityCategoriesSchema = object({
  params: object({
    subreddit: string({
      required_error: 'subreddit is required',
    }),
  }),
  body: object({
    categories: array(string({ required_error: 'categories are required' })),
  }),
});

export const spamPostSchema = object({
  params: object({
    subreddit: string({
      required_error: 'subreddit is required',
    }),
  }),
  body: object({
    postID: string({
      required_error: 'Post Id is required',
    }),
    spamType: string({
      required_error: 'spam type is required',
    }),
  }),
});

export const spamCommentSchema = object({
  params: object({
    subreddit: string({
      required_error: 'subreddit is required',
    }),
  }),
  body: object({
    commentID: string({
      required_error: 'comment Id is required',
    }),
    spamType: string({
      required_error: 'spam type is required',
    }),
  }),
});

export const approveSpamCommentSchema = object({
  params: object({
    subreddit: string({
      required_error: 'subreddit is required',
    }),
  }),
  body: object({
    commentID: string({
      required_error: 'comment Id is required',
    }),
  }),
});

export const approveSpamPostSchema = object({
  params: object({
    subreddit: string({
      required_error: 'subreddit is required',
    }),
  }),
  body: object({
    postID: string({
      required_error: 'Post Id is required',
    }),
  }),
});

export const lockPostSchema = object({
  params: object({
    subreddit: string({
      required_error: 'subreddit is required',
    }),
  }),
  body: object({
    postID: string({
      required_error: 'comment Id is required',
    }),
  }),
});

export const lockCommentSchema = object({
  params: object({
    subreddit: string({
      required_error: 'subreddit is required',
    }),
  }),
  body: object({
    commentID: string({
      required_error: 'comment Id is required',
    }),
  }),
});

export type ban = TypeOf<typeof banSchema>;
export type unban = TypeOf<typeof unbanSchema>;
export type mute = TypeOf<typeof muteSchema>;
export type unmute = TypeOf<typeof unmuteSchema>;
export type createCommunity = TypeOf<typeof createCommunitySchema>;
export type subscribeCommunity = TypeOf<typeof subscribeCommunitySchema>;
export type communityName = TypeOf<typeof CommunityNameSchema>;
export type getCommunity = TypeOf<typeof getCommunitySchema>;
export type editCommunityRules = TypeOf<typeof editCommunityRulesSchema>;
export type editCommunityCategories = TypeOf<typeof editCommunityCategoriesSchema>;

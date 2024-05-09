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
      required_error: 'Subreddit is required',
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

export const editCommunityDetailsSchema = object({
  params: object({
    subreddit: string({
      required_error: 'subreddit is required',
    }),
  }),
  body: object({
    nickname: string({
      required_error: 'nickname is required',
    }),
    currentNickname: string({
      required_error: 'nickname is required',
    }),
    communityDescription: string({
      required_error: 'description is required',
    }),
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

export const EditTextWidgetArraySchema = object({
  params: object({
    subreddit: string({
      required_error: 'subreddit is required',
    }),
  }),
  body: object({
    widgets: array(
      object({
        title: string({
          required_error: 'title is required',
        }),
        description: string({
          required_error: 'description is required',
        }),
      })
    ),
  }),
});

export const EditImageWidgetArraySchema = object({
  params: object({
    subreddit: string({
      required_error: 'subreddit is required',
    }),
  }),
  body: object({
    widgets: array(
      object({
        imageTitle: string({
          required_error: 'title is required',
        }),
        image: string({
          required_error: 'image is required',
        }),
      })
    ),
  }),
});

export const EditButtonWidgetArraySchema = object({
  params: object({
    subreddit: string({
      required_error: 'subreddit is required',
    }),
  }),
  body: object({
    widgets: array(
      object({
        buttonTitle: string({
          required_error: 'title is required',
        }),
        link: string({
          required_error: 'link is required',
        }),
      })
    ),
  }),
});

export const EditPostSettingsSchema = object({
  params: object({
    subreddit: string({
      required_error: 'subreddit is required',
    }),
  }),
  body: object({
    postType: string({
      required_error: 'postType is required',
    }),
    activePosts: boolean({
      required_error: 'activePosts is required',
    }),
    spoilerTag: boolean({
      required_error: 'spoilerTag is required',
    }),
    allowImageUpload: boolean({
      required_error: 'allowImageUpload is required',
    }),
    multiplePosts: boolean({
      required_error: 'multiplePosts is required',
    }),
    allowPolls: boolean({
      required_error: 'allowPolls is required',
    }),
    posts: string({
      required_error: 'posts is required',
    }).optional(),
    links: string({
      required_error: 'links is required',
    }).optional(),
    comments: string({
      required_error: 'comments is required',
    }).optional(),
    suggestedSort: string({
      required_error: 'suggestedSort is required',
    }).optional(),
    collapseAndDeleteRemovedComments: boolean({
      required_error: 'collapseAndDeleteRemovedComments is required',
    }),
    minsToHideComment: number({
      required_error: 'minsToHideComment is required',
    }),
    allowCommentsWithGifs: boolean({
      required_error: 'allowCommentsWithGifs is required',
    }),
    allowCommentsWithCollectibleExpressions: boolean({
      required_error: 'allowCommentsWithCollectibleExpressions is required',
    }),
    allowCommentsWithUploadedImages: boolean({
      required_error: 'allowCommentsWithUploadedImages is required',
    }),
    allowCommentsWithUploadedGIFs: boolean({
      required_error: 'allowCommentsWithUploadedGIFs is required',
    }),
  }),
});

export const EditContentControlsSchema = object({
  params: object({
    subreddit: string({
      required_error: 'subreddit is required',
    }),
  }),
  body: object({
    membersWithGuidelines: boolean({
      required_error: 'membersWithGuidelines is required',
    }),
    requirePostTitles: boolean({
      required_error: 'requirePostTitles is required',
    }),
    banWordsFromPostTitle: boolean({
      required_error: 'banWordsFromPostTitle is required',
    }),
    requirePostsInPostBody: boolean({
      required_error: 'requirePostsInPostBody is required',
    }),
    banWordsFromPostBody: boolean({
      required_error: 'banWordsFromPostBody is required',
    }),
    banLinksFromDomains: boolean({
      required_error: 'banLinksFromDomains is required',
    }),
    restrictTheSameLinkPosted: boolean({
      required_error: 'restrictTheSameLinkPosted is required',
    }),
    textBody: string({
      required_error: 'textBody is required',
    }),
    postFlair: boolean({
      required_error: 'postFlair is required',
    }),
    useRegExInTitles: boolean({
      required_error: 'useRegExInTitles is required',
    }),
    useBodyTextReg: boolean({
      required_error: 'useBodyTextReg is required',
    }),
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
export type EditContentControls = TypeOf<typeof EditContentControlsSchema>;
export type EditPostSettings = TypeOf<typeof EditPostSettingsSchema>;
export type EditButtonWidgetArray = TypeOf<typeof EditButtonWidgetArraySchema>;
export type EditTextWidgetArray = TypeOf<typeof EditTextWidgetArraySchema>;
export type EditImageWidgetArray = TypeOf<typeof EditImageWidgetArraySchema>;

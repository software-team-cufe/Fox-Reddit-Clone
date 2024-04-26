import { object, string, array, boolean, TypeOf } from 'zod';

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

export const getCommunitySchema = object({
  params: object({
    subreddit: string({
      required_error: 'subreddit is required',
    }),
  }),
});

export const banOrUnbanSchema = object({
  body: object({
    subreddit: string({
      required_error: 'Subreddit Id is required',
    }),
    userID: string({
      required_error: 'userID is required',
    }),
    action: string({
      required_error: 'action is required',
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

export type banOrMute = TypeOf<typeof banOrUnbanSchema>;
export type createCommunity = TypeOf<typeof createCommunitySchema>;
export type subscribeCommunity = TypeOf<typeof subscribeCommunitySchema>;
export type getCommunity = TypeOf<typeof getCommunitySchema>;
export type editCommunityRules = TypeOf<typeof editCommunityRulesSchema>;

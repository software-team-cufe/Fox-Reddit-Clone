import { object, string, TypeOf } from 'zod';

const validSubredditSearchTypes = ['link', 'comment'] as const;
const validNormalSearchTypes = ['link', 'sr', 'comment', 'user'] as const;
export const searchSubredditSchema = object({
  params: object({
    subreddit: string({
      required_error: 'subreddit is required',
    }),
  }),
  query: object({
    q: string({
      required_error: 'searchkey is required',
    }),
    type: string({
      required_error: 'type is required',
    }).refine((data) => validSubredditSearchTypes.includes(data as 'link' | 'comment'), {
      message: 'Invalid search type',
    }),
    sort: string().optional(), // Make sort optional
    topBy: string().optional(), // Make topBy optional
    page: string().optional(), // Make page optional
    limit: string().optional(), // Make limit optional
  }),
});

export const searchNormalSchema = object({
  query: object({
    q: string({
      required_error: 'searchkey is required',
    }),
    type: string({
      required_error: 'type is required',
    }).refine((data) => validNormalSearchTypes.includes(data as 'link' | 'sr' | 'comment' | 'user'), {
      message: 'Invalid search type',
    }),
    sort: string().optional(), // Make sort optional
    topBy: string().optional(), // Make topBy optional
    page: string().optional(), // Make page optional
    limit: string().optional(), // Make limit optional
  }),
});

export type SearchSubredditInput = TypeOf<typeof searchSubredditSchema>;
export type SearchNormalInput = TypeOf<typeof searchNormalSchema>;

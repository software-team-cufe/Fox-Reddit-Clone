import { object, string, boolean, TypeOf } from 'zod';

const communityType = string().refine((val) => /^(Public|Private|Restricted)$/.test(val), {
  message: 'Type must be Public, Private, or Restricted',
});

export const createCommunitySchema = object({
  body: object({
    name: string({
      required_error: 'name is required',
    }),
    type: communityType,
    over18: boolean({
      required_error: 'over18 is required',
    }),
  }),
});

export type createComm = TypeOf<typeof createCommunitySchema>;

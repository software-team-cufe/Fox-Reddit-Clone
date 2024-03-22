import { object, string, TypeOf } from 'zod';

export const createSessionSchema = object({
  body: object({
    username: string({
      required_error: 'Username is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Invalid email or password'),
  }),
});

export type CreateSessionInput = TypeOf<typeof createSessionSchema>['body'];

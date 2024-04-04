import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    username: string({
      required_error: 'Username is required',
    }),
    password: string({
      required_error: 'Password is required',
    })
      .min(8, 'Password too short - should be 8 chars minimum')
      .max(200, 'Password too long - should be 200 chars maximum'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
});

export const verifyUserSchema = object({
  params: object({
    id: string(),
    verificationCode: string(),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }),
});

export const resetPasswordSchema = object({
  params: object({
    id: string(),
    passwordResetCode: string(),
  }),
  body: object({
    password: string({
      required_error: 'Password is required',
    })
      .min(8, 'Password too short - should be 8 chars minimum')
      .max(200, 'Password too long - should be 200 chars maximum'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
});

export const friendRequestSchema = object({
  body: object({
    type: string({
      required_error: 'type is required',
    }),
    username: string({
      required_error: 'Username is required',
    }),
  }),
});

export const unFriendRequestSchema = object({
  body: object({
    type: string({
      required_error: 'type is required',
    }),
    username: string({
      required_error: 'Username is required',
    }),
  }),
});

export const reportUserSchema = object({
  body: object({
    type: string({
      required_error: 'type is required',
    }),
    username: string({
      required_error: 'Username is required',
    }),
  }),
});

export const blockUserSchema = object({
  body: object({
    type: string({
      required_error: 'type is required',
    }),
    username: string({
      required_error: 'Username is required',
    }),
  }),
});

export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params'];

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];

export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;

export type friendRequest = TypeOf<typeof friendRequestSchema>;
export type unFriendRequest = TypeOf<typeof unFriendRequestSchema>;
export type reportUser = TypeOf<typeof reportUserSchema>;
export type blockUserInput = TypeOf<typeof blockUserSchema>;
export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];

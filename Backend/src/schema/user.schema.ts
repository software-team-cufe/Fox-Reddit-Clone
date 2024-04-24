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

// replace with token verification
export const verifyUserSchema = object({
  params: object({
    verify_token: string({
      required_error: 'Verify token is required',
    }),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }),
});

export const changeEmailSchema = object({
  body: object({
    newemail: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    currentpassword: string({
      required_error: 'Password is required',
    }),
  }),
});

export const changePasswordSchema = object({
  body: object({
    currentpassword: string({
      required_error: 'Password is required',
    }),
    newpassword: string({
      required_error: 'Password is required',
    })
      .min(8, 'Password too short - should be 8 chars minimum')
      .max(200, 'Password too long - should be 200 chars maximum'),
    newpasswordConfirmation: string({
      required_error: 'Password confirmation is required',
    }),
  }).refine((data) => data.newpassword === data.newpasswordConfirmation, {
    message: 'Passwords do not match',
    path: ['newpasswordConfirmation'],
  }),
});

export const resetPasswordSchema = object({
  query: object({
    token: string({
      required_error: 'Reset password token is required',
    }),
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

/****************************boudie******************************************/

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

// export const blockUserSchema = object({
//   body: object({
//     type: string({
//       required_error: 'type is required',
//     }),
//     username: string({
//       required_error: 'Username is required',
//     }),
//   }),
// });
// export const followUserSchema = object({
//   body: object({
//     username: string({
//       required_error: 'Username is required',
//     }),
//   }),
// });
// export const unfollowUserSchema = object({
//   body: object({
//     username: string({
//       required_error: 'Username is required',
//     }),
//   }),
// });

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

export const followUserSchema = object({
  body: object({
    username: string({
      required_error: 'Username is required',
    }),
  }),
});

export const unfollowUserSchema = object({
  body: object({
    username: string({
      required_error: 'Username is required',
    }),
  }),
});

/****************************************************************************/
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params'];

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];

export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;

export type ChangeEmailInput = TypeOf<typeof changeEmailSchema>;

export type ChangePasswordInput = TypeOf<typeof changePasswordSchema>;

export type friendRequest = TypeOf<typeof friendRequestSchema>;
export type unFriendRequest = TypeOf<typeof unFriendRequestSchema>;
export type reportUser = TypeOf<typeof reportUserSchema>;
export type blockUserInput = TypeOf<typeof blockUserSchema>;
export type followUserInput = TypeOf<typeof followUserSchema>;
export type unfollowUserInput = TypeOf<typeof unfollowUserSchema>;
export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];

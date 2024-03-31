/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { CreateUserInput, ForgotPasswordInput, VerifyUserInput, ResetPasswordInput } from '../schema/user.schema';
import { Request, Response } from 'express';
import { createUser, findUserByEmail, findUserById } from '../service/user.service';
import sendEmail from '../utils/mailer';
import log from '../utils/logger';
import { nanoid } from 'nanoid';
import { UserModel, privateFields } from '../model/user.model';
import { omit } from 'lodash';

/**
 * Handles the creation of a user.
 *
 * @param req - The request object containing the user data.
 * @param res - The response object to send the result.
 * @returns A response indicating the success or failure of the user creation.
 */
export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
  const body = req.body;

  try {
    const user = await createUser(body);

    await sendEmail({
      from: 'test@example.com',
      to: user.email,
      subject: 'please verify your account',
      text: `Verification code: ${user.verificationCode}. Id: ${user._id}`,
    });
    return res.send('user created successfully!');
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send('Email already exists');
    }

    return res.status(500).send(e);
  }
}

/**
 * Handles the verification of a user.
 *
 * @param req - The request object containing the user verification parameters.
 * @param res - The response object to send the verification result.
 *
 * @returns A promise that resolves to the verification result.
 */
export async function verifyUserHandler(req: Request<VerifyUserInput>, res: Response) {
  //extract params
  const id = req.params.id;
  const verificationCode = req.params.verificationCode;
  //find the user with the id and verification code
  const user = await findUserById(id);

  if (!user) {
    return res.send('could not verify user');
  }
  //check to see if they are already verified

  if (user.verified) {
    return res.send('user already verified');
  }

  //check to see if the verification code is correct
  if (user.verificationCode === verificationCode) {
    user.verified = true;
    await user.save();
    return res.send('user verified');
  }

  return res.send('could not verify user');
}

/**
 * Handles the forgot password functionality.
 *
 * @param req - The request object containing the email of the user.
 * @param res - The response object to send the result.
 * @returns A message indicating if the email exists and a password reset code has been sent.
 */
export async function forgotPasswordHandler(req: Request<{}, {}, ForgotPasswordInput>, res: Response) {
  const message = 'If the email exists, a password reset code will be sent to it';
  const { email } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    log.debug(`User with email ${email} does not exist`);
    return res.send(message);
  }

  if (!user.verified) {
    log.debug(`User with email ${email} is not verified`);
    return res.send("User hasn't been verified");
  }

  const passwordResetCode = nanoid();
  user.passwordResetCode = passwordResetCode;
  await user.save();

  await sendEmail({
    to: user.email,
    from: 'test@example.com',
    subject: 'Reset your password',
    text: `Password reset code: ${passwordResetCode}. Id ${user._id}`,
  });

  log.debug(`Password reset code is sent for user with email ${email} `);
  return res.send(message);
}
/**
 * Handles the reset password request.
 *
 * @param {Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>} req - The request object containing the reset password parameters and body.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the password is reset successfully.
 */
export async function resetPasswordHandler(
  req: Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>,
  res: Response
) {
  const { id, passwordResetCode } = req.params;

  const { password } = req.body;

  const user = await findUserById(id);

  if (!user || !user.passwordResetCode || user.passwordResetCode !== passwordResetCode) {
    return res.status(400).send('Could not reset password');
  }

  user.passwordResetCode = null;

  user.password = password;

  await user.save();

  return res.send('Password reset successfully');
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  const user_id = req.params.id;
  const user = await UserModel.findById(user_id);
  if (!user) {
    res.sendStatus(404);
  } else {
    const payload = omit(user.toJSON(), privateFields);
    return res.send(payload);
  }
  //return res.send(res.locals.user);
}

export async function getCurrentUserPrefs(req: Request, res: Response) {
  const user_id = req.params.id;
  const user = await UserModel.findById(user_id).populate('prefs');
  if (!user) {
    res.sendStatus(404);
  } else {
    const user_prefs = JSON.stringify(user.prefs);
    return res.send(user_prefs);
  }
  // return res.send(res.locals.user.prefs);
}

export async function editCurrentUserPrefs(req: Request, res: Response) {
  const user_id = req.params.id;
  const prefsToUpdate = req.body.prefs;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(user_id, { $set: { prefs: prefsToUpdate } }, { new: true });

    if (!updatedUser) {
      return res.sendStatus(404);
    }

    const updatedPrefs = JSON.stringify(updatedUser.prefs);
    return res.send(updatedPrefs);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

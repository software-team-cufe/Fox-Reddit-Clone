/* eslint-disable import/default */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
import config from 'config';
import nodemailer, { SendMailOptions, createTransport, getTestMessageUrl } from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import log from './logger';
import { getEnvVariable } from './GetEnvVariables';
import sgMail from '@sendgrid/mail';
import { signJwt, verifyJwt } from './jwt';
sgMail.setApiKey(getEnvVariable('SENDGRID_API_KEY'));

export async function sendEmail(payload: sgMail.MailDataRequired) {
  try {
    await sgMail.send(payload);
    console.log('Email sent');
  } catch (error) {
    console.error(error);
  }
}

export function generateVerificationLinkToken(
  userId: string,
  verificationCode: string
): {
  verify_link: string;
  verify_token: string;
} {
  // Assuming your frontend URL is stored in an environment variable
  const frontendURL = 'http://localhost:3000';

  // Construct payload for JWT verification
  const payload = { userId, verificationCode };

  // Generate JWT verification token
  const verificationToken = signJwt(payload, { expiresIn: '1d' });

  // Construct the verification link using the frontend URL and include the token as a query parameter
  const verificationLink = `${frontendURL}/api/users/signup/verify/${verificationToken}`;

  // Return an object containing both the verification link and the verification token
  return { verify_link: verificationLink, verify_token: verificationToken };
}

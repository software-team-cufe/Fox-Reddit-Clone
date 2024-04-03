/* eslint-disable import/default */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
import config from 'config';
import nodemailer, { SendMailOptions, createTransport, getTestMessageUrl } from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import log from './logger';
import { getEnvVariable } from './GetEnvVariables';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(getEnvVariable('SENDGRID_API_KEY'));

export async function sendEmail(payload: sgMail.MailDataRequired) {
  try {
    await sgMail.send(payload);
    console.log('Email sent');
  } catch (error) {
    console.error(error);
  }
}

export function generateVerificationLink(userId: string, verificationCode: string): string {
  // Assuming your frontend URL is stored in an environment variable
  const frontendURL = 'http://localhost:3000';

  // Construct the verification link using the frontend URL and API endpoint
  return `${frontendURL}/api/users/signup/verify/${userId}/${verificationCode}`;
}

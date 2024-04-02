/* eslint-disable import/default */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
import config from 'config';
import nodemailer, { SendMailOptions, createTransport, getTestMessageUrl } from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import log from './logger';
import { getEnvVariable } from './GetEnvVariables';

const transporter = createTransport(
  nodemailerSendgrid({
    apiKey: getEnvVariable('FOX_EMAILVERIFICATION_API'),
  })
);

export async function sendEmail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      log.error(err, 'Error occurred while sending email');
      return;
    }

    log.info(`Preview URL: ${getTestMessageUrl(info)}`);
  });
}

export function generateVerificationLink(userId: string, verificationCode: string): string {
  // Assuming your frontend URL is stored in an environment variable
  const frontendURL = 'http://localhost:3000';

  // Construct the verification link using the frontend URL and API endpoint
  return `${frontendURL}/api/users/signup/verify/${userId}/${verificationCode}`;
}

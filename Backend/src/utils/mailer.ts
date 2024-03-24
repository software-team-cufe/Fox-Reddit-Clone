/* eslint-disable import/default */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
import config from 'config';
import nodemailer, { SendMailOptions, getTestMessageUrl } from 'nodemailer';
import log from './logger';
import Mail from 'nodemailer/lib/mailer';
/* 
async function createTestCreds() {
  const creds = await nodemailer.createTestAccount();
  console.log({ creds });
}

createTestCreds(); */
const smtp = config.get<{
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
}>('smtp');

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: {
    user: smtp.user,
    pass: smtp.pass,
  },
});

async function sendEmail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      log.error(err, 'Error occurred while sending email');
      return;
    }

    log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  });
}

export default sendEmail;

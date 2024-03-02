const nodeMailer = require('nodemailer');
const email = process.env.EMAIL;
const password = process.env.EMAIL_PASSWORD;

const { htmlEmailPage } = require('./getHtmlTemplate');
const { updateUserVerificationMail } = require('./updateUserVerificationMail')
exports.sendEmail = async (emailTo, html) => {
    return new Promise(async (res, rej) => {
        const transporter = nodeMailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: email,
                pass: password,
            }
        });

        transporter.sendMail({
            from: email,
            to: emailTo,
            subject: "Fox, Verify your account",
            text: html,
        }, (err, info) => {
            if (err) return rej(err);
            return res(info.accepted);
        });
    });
}


exports.sendVerificationEmail = async (emailTo, userName, code, hashedCode, userId, insertSkip) => {
    return new Promise(async (res, rej) => {
        const transporter = nodeMailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: email,
                pass: password,
            }
        });
        transporter.sendMail({
            from: email,
            to: emailTo,
            subject: "Fox, Verify your account",
            html: htmlEmailPage(userName, code),
        }, async (err, info) => {
            if (err) return rej(err);
            if (!insertSkip) {
                const emailSent = await updateUserVerificationMail(userId, hashedCode);
                return res({
                    "emailSend": info.accepted.length != 0,
                    'emailInserted': emailSent,
                });
            }
            return res({
                "emailSend": info.accepted.length != 0,
            });
        });
    });
}
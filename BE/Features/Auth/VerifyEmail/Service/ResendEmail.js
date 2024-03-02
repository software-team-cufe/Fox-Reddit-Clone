const EmailVerification = require('../../../../Models/VerificationEmail');
const User = require('../../../../Models/User');
const configs = require("../../../../ServerConfigs/ServerConfigs.json");

const { sendVerificationEmail } = require('../../../../services/MailServices/mailServices');
const bcrypt = require('bcrypt');

async function sendEmail(user) {
    return new Promise(async (res, rej) => {
        const code = generateRandomNumber();
        const codeSalt = await bcrypt.genSalt();
        const hashedCode = await bcrypt.hash(`${code}`, codeSalt);
        await sendVerificationEmail(
            user.email,
            user.name,
            code,
            hashedCode,
            user._id,
            true,
        );
        return res(hashedCode);
    });
}
exports.resendEmail = async (req, res, next) => {

    const user = res.locals.userModel;
    if (user.verifiedEmail) {
        return res.status(406).json({ msg: "الحساب مفعل بالفعل" });
    }
    const email = await EmailVerification.findOne({ userTo: user._id });
    if (email == null) {
        const code = await sendEmail(user)
        const mail = await EmailVerification.create({
            userTo: user._id,
            code: code,
            resendTrails: configs.defaultSendTrails,
        }).catch(err => null);
        return res.sendStatus(200);
    }
    if (email.resendTrails - 1 < 0) {
        return res.status(401).json({
            msg: "You have exceeded the allowed number of attempts. Please contact the website owner.",
        });
    }
    const updatedAt = new Date(email.updatedAt);
    const now = Date.now();
    const diff = (now - updatedAt) / (1000);
    if (diff < configs.waitingBetweenSends) {
        return res.status(405).json({
            msg: `Please wait ${(60 - diff).toFixed(0)} seconds before resending.`,
        });
    }
    const code = await sendEmail(user);
    email.code = code;
    email.resendTrails--;
    await email.save();
    return res.status(200).json({
        message: "Sent successfully."
    });
} 
function generateRandomNumber() {
    const val = Math.floor(100000 + Math.random() * 900000);
    return val;
}
const asyncHandeler = require("express-async-handler");
const User = require('../../../../Models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail } = require('../../../../services/MailServices/mailServices');
exports.signup = asyncHandeler(async (req, res, next) => {
    const salt = await bcrypt.genSalt();
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const user = await User.create(req.body).catch((err) => {
        if (err.code === 11000) {
            res.status(409).json({ msg: "This email is already taken, please try to login." });
            return null;
        }
        res.status(420).send({ msg: err.message });
        return null;
    });
    if (user == null) return;
    user.password = null;
    const code = generateRandomNumber();
    const codeSalt = await bcrypt.genSalt();
    const hashedCode = await bcrypt.hash(`${code}`, codeSalt);
    if(!user.verifiedEmail){
        const emailSent = await sendVerificationEmail(
            user.email,
            `${user.firstName} ${user.lastName}`,
            code,
            hashedCode,
            user._id,
            false,
        );
    }
    const userModel = {
        'id': user._id,
        "verifiedEmail": user.verifiedEmail,
    };
    const token = jwt.sign(userModel, process.env.ACCESS_TOKEN_KEY);
    return res.status(200).json({
        token,
        user,
    });
})


function generateRandomNumber() {
    const val = Math.floor(100000 + Math.random() * 900000);
    return val;
}
const Email = require('../../models/Email');
const ApiError = require('../../error_handelers/ApiError');
const User = require('../../Models/User');

exports.verifyEmail = async (req, res, next) => {
    const sentCode = req.body.code;
    const userId = req.params.id;
    const mail = await Email.findOne({
        userTo: userId,
    });
    if (mail == null) {
        return next(new ApiError('The user is not rejistered or the email is already verified.', 404));
    }
    if (mail.code == sentCode) {
        await mail.deleteOne();
        await User.findByIdAndUpdate(mail.userTo, { verified: true, });
        return res.status(200).json({
            "status": "The Email is verified."
        });
    }
    mail.trails -= 1;
    if (mail.trails == 0) {
        await mail.deleteOne();    
        await User.findByIdAndDelete(mail.userTo);
        return next(new ApiError(`You have exhausted the number of attempts you have.`, 400));
    }
    await mail.save();
    return res.status(400).json({
        "message": `The verification code is not correct, you have ${mail.trails} last trails`,
        trails: mail.trails,
    });
}
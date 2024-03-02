const EmailVerification = require('../../Models/VerificationEmail');
const configs = require('../../ServerConfigs/ServerConfigs.json');

exports.updateUserVerificationMail = (userId, code) => {
    return new Promise(
        async (res, rej) => {
            const mail = await EmailVerification.findOneAndUpdate({}, {
                userTo: userId,
                code: code,
                resendTrails: configs.defaultSendTrails,
            }, { upsert: true, new: true, setDefaultsOnInsert: true })
                .catch(err => null);
            return res({ email: mail });
        }
    );
}
const appRoute = require('express').Router({ mergeParams: true, });
const { verifyEmailValidator } = require('./Validator/verifyEmailValidator');
const { verifyEmail } = require('./Service/VerifyEmail');
const { resendEmail } = require('./Service/ResendEmail');
appRoute.route('/')
    .post(verifyEmailValidator, verifyEmail);

appRoute.route('/resend').get(resendEmail);

module.exports = appRoute;
const appRoute = require('express').Router();
const { signupValidator } = require('./Service/Validator');
const { signup } = require('./Service/Signup');
appRoute.route('/').post(signupValidator, signup);
module.exports = appRoute;
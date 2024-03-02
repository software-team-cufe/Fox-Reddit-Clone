const jwt = require('jsonwebtoken');
const { check } = require('express-validator');
const validator = require('../../../../middlewares/validatorMiddleware');
module.exports.verifyEmailValidator = [
    check('code').isLength(6).trim().withMessage("Please Enter Verification Code with 6 digits!"),
    validator,
]
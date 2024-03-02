const validator = require('../../../../middlewares/validatorMiddleware');
const { check } = require('express-validator');

module.exports.loginValidator = [
    check('email').isEmail().trim().withMessage("Please enter a valid email!"),
    check('password').isLength({ min: 8, max: 200 }).trim().withMessage("Password must be between 8 and 200 characters"),
    validator,
];
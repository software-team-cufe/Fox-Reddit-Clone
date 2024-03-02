const appRouter = require('express').Router();
const { loginUser } = require('./Services/Login');
const { loginTokenUser } = require('./Services/LoginToken');
const { loginValidator } = require('./Services/Validator');
const { tokenValidator } = require('./Services/tokenValidator');


appRouter.route('/').post(loginValidator, loginUser);

appRouter.route('/token').post(tokenValidator, loginTokenUser);

module.exports = appRouter;
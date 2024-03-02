const appRouter = require('express').Router();
const loginRoutes = require('./Login/LoginRoute');
const signupRoutes = require('./Signup/SignupRoute');
const verifyEmail = require('./VerifyEmail/VerifyEmailRoutes');


appRouter.use('/login', loginRoutes);
appRouter.use('/signup', signupRoutes);
appRouter.use('/verify-account', verifyEmail);

module.exports = appRouter;
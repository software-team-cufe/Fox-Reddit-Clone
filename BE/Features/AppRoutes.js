const appRoute = require('express').Router();
const authRoutes = require('./Auth/AuthRoutes');
const { userValidatorMiddleware } = require('../middlewares/UserValidatorMiddleware');


appRoute.use("/", userValidatorMiddleware, authRoutes);


module.exports = appRoute;
const asyncHandeler = require('express-async-handler');

exports.loginTokenUser = asyncHandeler(async (req, res, next) => {
    const userModel = res.locals.userModel;
    userModel.password = null;
    
    return res.status(200).json({
        user: userModel,
    });
});


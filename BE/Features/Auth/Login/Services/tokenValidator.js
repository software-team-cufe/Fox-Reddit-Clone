const asyncHandeler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../../../../Models/User');

exports.tokenValidator = asyncHandeler(async (req, res, next) => {
    try {
        const token = req.headers.token.split(' ')[1];
        const userModel = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        const user = await User.findById(userModel.id);
        if(user == null){
            throw "";
        }
        res.locals.userModel = user;
        return next();
    } catch (err) {

        return res.status(401).json({ "message": "Unauthorized !" });
    }
})
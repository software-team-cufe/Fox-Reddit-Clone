const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const unProtectedRoutes = [
    '/login',
    '/login/token',
    '/signup',
    '/services/most-visited',
    '/configs',
];

function matchRoute(incomingRoute) {
    for (const route of unProtectedRoutes) {
        const regexRoute = new RegExp('^' + route.replace(/:[a-zA-Z0-9]+/g, '([a-zA-Z0-9]+)') + '$');
        if (regexRoute.test(incomingRoute)) {
            return true;
        }
    }
    return false;
}



exports.userValidatorMiddleware = async (req, res, next) => {

    try {
        const token = (req.headers.token).split(' ')[1].trim();

        const userModel = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

        const user = await User.findById(userModel.id);
        const emailVer = (!matchRoute(req.originalUrl) && !user.verifiedEmail && req.originalUrl != '/verify-account' && req.originalUrl != '/verify-account/resend');
        if (user == null || user.banned || emailVer) {
            return res.status(403).json({ msg: user.banned ? "Your account has been banned. Please contact technical support." : emailVer ?  "Please activate your account first in order to perform this operation." : null });
        } else {
            res.locals.userModel = user;
            if (!userModel.admin) {
                user.lastActive = Date.now();
                await user.save();
            }
            return next();
        }
    } catch (err) {
        if (matchRoute(req.originalUrl)) {
            return next();
        }
        return res.status(455).json({ "msg": "Unauthorized access" });
    }
}


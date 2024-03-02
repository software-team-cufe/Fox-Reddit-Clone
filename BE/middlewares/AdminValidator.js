const jwt = require('jsonwebtoken');
const Admin = require('../Models/Admin');
const unProtectedRoutes = [
    '/admin/login',
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

exports.adminValidatorMiddleware = async (req, res, next) => {
    try {
        const token = (req.headers.a_token).split(' ')[1];
        
        const adminModel = jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_KEY);
        if (adminModel.key != process.env.ADMINKEY || (req.cookies.a_token || req.headers.a_token).split(' ')[0] != "Bearer") {
            throw "";
        }
        
        const admin = await Admin.findById(adminModel.id);
       
        if (admin == null || admin.suspended) {
            throw "";
        }
        res.locals.adminModel = admin;
        admin.lastActive = Date.now()
        await admin.save();
        return next();
    } catch (err) {
        if (matchRoute(req.originalUrl)) {
            return next();
        }
        return res.status(455).json({ "message": "Unauthorized !!" });
    }
}
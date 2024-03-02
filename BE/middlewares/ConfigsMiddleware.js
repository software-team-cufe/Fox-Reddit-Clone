const Config = require('../Models/Configs');





const configsValidator = async (req, res, next) => {
    const configs = await Config.findOne();
    if (configs == null) return next();
    if (!configs.available) return res.status(503).json({ message: configs.closedMessage });
    next();
}
exports.configsValidator = configsValidator;

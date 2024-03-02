const Transaction = require('../Models/Transaction');

exports.transactionsMiddleware = async (req, res, next) => {
    if (res.locals.transaction != null) {
        await Transaction.create(res.locals.transaction);
    } else {
        throw Error("Transaction must be passed");
    }
}
module.exports = function errorHandeler(err, req, res, next) {
    const MODE = process.env.MODE || "dev";
    err.status = err.status || "error";
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "";
    err.expected = err.expected || false;
    if (MODE === "development_mode") {
        return sendErrorForDev(err, res);
    } else {
        return sendErrorForProduction(err, res);
    }
}
function sendErrorForDev(err, res) {
    console.log({
        error: err,
        msg: err.message,
        stack: err.stack
    });
    res.status(err.statusCode || 500).json({
        status: err.status,
        statusCode: err.statusCode,
        msg: err.message,
        expected: err.expected,
        error: err,
    });
}
function sendErrorForProduction(err, res) {

    res.status(err.statusCode || 500).json({
        statusCode: err.statusCode,
        msg: err.message,
        stack:err.stack
    });
}
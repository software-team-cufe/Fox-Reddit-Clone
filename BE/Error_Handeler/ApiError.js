class ApiError extends Error {
    constructor(msg, statusCode) {
        super(msg);
        this.statusCode = statusCode;
        this.msg = msg;
        this.status = `${this.statusCode}`.startsWith(4) ? "failed" : "error";
        this.expected = true;
    }
}
module.exports = ApiError;
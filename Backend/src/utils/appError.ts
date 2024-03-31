class appError extends Error {
  statusCode;
  status;
  isOperational;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Operational means conceptual errors like a typo from user input

    // Error.captureStackTrace(this, this.constructor); // Don't pollute the stack trace with this function
    // TypeScript doesn't support Error.captureStackTrace
    // However, you can comment this line as it's optional and not critical
  }
}

export default appError;

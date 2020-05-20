const grpc = require('grpc');

class InvalidArgumentError extends Error {
  constructor(message) {
    super(message);
    this.code = grpc.status.INVALID_ARGUMENT;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  InvalidArgumentError
}

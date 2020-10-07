const grpc = require('grpc');
const {rollbar} = require('./rollbar');

class ProxyBaseError extends Error {
  constructor(message) {
    super(message);
    this.code = grpc.status.UNKNOWN;
    Error.captureStackTrace(this, this.constructor);
    rollbar.error("msg: " + this.message + " stacktrace: " + this.stack)
  }
}

class InvalidArgumentError extends ProxyBaseError {
  constructor(message) {
    super(message);
    this.code = grpc.status.INVALID_ARGUMENT;
  }
}

class UnavailableError extends ProxyBaseError {
  constructor(message) {
    super(message);
    this.code = grpc.status.UNAVAILABLE;
  }
}

module.exports = {
  InvalidArgumentError,
  UnavailableError,
}

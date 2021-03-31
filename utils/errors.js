const grpc = require('grpc');

class ProxyBaseError extends Error {
  constructor(message) {
    super(message);
    this.code = grpc.status.UNKNOWN;
    Error.captureStackTrace(this, this.constructor);
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

class InternalServerError extends ProxyBaseError {
  constructor(message) {
    super(message);
    this.code = grpc.status.INTERNAL;
  }
}

module.exports = {
  InvalidArgumentError,
  UnavailableError,
  InternalServerError,
};

const grpc = require('grpc');

const unknownError = (err) => {
  let message;
  if (err instanceof Error) {
    message = err.message;
  } else if (typeof err === 'string') {
    message = err;
  }
  return {
    message: message || 'Unknown error',
    code: grpc.status.UNKNOWN
  }
};

module.exports = {
  unknownError,
};

var Rollbar = require("rollbar");

var rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'
});

module.exports = {
  rollbar
}

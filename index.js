const {ApiPromise, WsProvider} = require('@polkadot/api');
const grpc = require('grpc');

const {rollbar} = require('./utils/rollbar');
const upgradeAlert = require('./utils/upgrade_alert');

const {
  heightProto,
  chainProto,
  blockProto,
  transactionProto,
  eventProto,
  stakingProto,
  accountProto,
  validatorProto,
  validatorPerformanceProto,
} = require('./grpc/init');

const heightHandlers = require('./handlers/height_handlers');
const chainHandlers = require('./handlers/chain_handlers');
const blockHandlers = require('./handlers/block_handlers');
const transactionHandlers = require('./handlers/transaction_handlers');
const eventHandlers = require('./handlers/event_handlers');
const stakingHandlers = require('./handlers/staking_handlers');
const accountHandlers = require('./handlers/account_handlers');
const validatorHandlers = require('./handlers/validator_handlers');
const validatorPerformanceHandlers = require('./handlers/validator_performance_handlers');

const HOST = process.env.HOST || "0.0.0.0"
const PORT = process.env.PORT || 50051
const NODE_URL = process.env.NODE_URL || 'ws://localhost:9944';

// Wrap a handler with a method that passes api to it
// and then calls an appropriate callback with or without error
const wrapHandler = (fn, api) => {
  return (call, callback) => {
    let context = {};

    fn(api, call, context)
      .then(result => {
        callback(null, result)
      })
      .catch(e => {
        rollbar.error(e, {call})
        callback({
          code: e.code || grpc.status.UNKNOWN,
          message: e.message
        })
      })
  }
}

/**
 * Starts an RPC server
 */
async function init() {
  upgradeAlert.runCheckForUpdates();
  
  const wsProvider = new WsProvider(NODE_URL);
  const api = await ApiPromise.create({provider: wsProvider});

  const server = new grpc.Server();
  server.addService(heightProto.HeightService.service, {
    getAll: wrapHandler(heightHandlers.getAll, api),
  });
  server.addService(chainProto.ChainService.service, {
    getHead: wrapHandler(chainHandlers.getHead, api),
    getStatus: wrapHandler(chainHandlers.getStatus, api),
    getMetaByHeight: wrapHandler(chainHandlers.getMetaByHeight, api),
  });
  server.addService(blockProto.BlockService.service, {
    getByHeight: wrapHandler(blockHandlers.getByHeight, api),
  });
  server.addService(transactionProto.TransactionService.service, {
    getByHeight: wrapHandler(transactionHandlers.getByHeight, api),
    getAnnotatedByHeight: wrapHandler(transactionHandlers.getAnnotatedByHeight, api),

  });
  server.addService(eventProto.EventService.service, {
    getByHeight: wrapHandler(eventHandlers.getByHeight, api),
  });
  server.addService(stakingProto.StakingService.service, {
    getByHeight: wrapHandler(stakingHandlers.getByHeight, api),
  });
  server.addService(accountProto.AccountService.service, {
    getIdentity: wrapHandler(accountHandlers.getIdentity, api),
    getByHeight: wrapHandler(accountHandlers.getByHeight, api),
  });
  server.addService(validatorProto.ValidatorService.service, {
    getAllByHeight: wrapHandler(validatorHandlers.getAllByHeight, api),
  });
  server.addService(validatorPerformanceProto.ValidatorPerformanceService.service, {
    getByHeight: wrapHandler(validatorPerformanceHandlers.getByHeight, api),
  });
  server.bind(`${HOST}:${PORT}`, grpc.ServerCredentials.createInsecure());
  server.start();
}

init().then(resp => {
  console.log(`Server started at ${HOST}:${PORT}`);
}).catch(err => {
  console.log('ERR:', err);
});

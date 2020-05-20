const {ApiPromise, WsProvider} = require('@polkadot/api');
const grpc = require('grpc');

const {
  blockProto,
  transactionProto,
  eventProto,
  stakingProto,
  accountProto,
  validatorPerformanceProto,
} = require('./grpc/init');

const blockHandlers = require('./handlers/block_handlers');
const transactionHandlers = require('./handlers/transaction_handlers');
const eventHandlers = require('./handlers/event_handlers');
const stakingHandlers = require('./handlers/staking_handlers');
const accountHandlers = require('./handlers/account_handlers');
const validatorPerformanceHandlers = require('./handlers/validator_performance_handlers');

const NODE_URL = process.env.NODE_URL || 'ws://localhost:9944';
const PORT = process.env.PORT || 50051

// Wrap a handler with a method that passes api to it
// and then calls an appropriate callback with or without error
const wrapHandler = (fn, api) => {
  return (call, callback) => {
    fn(api)(call)
      .then(result => {
        callback(null, result)
      })
      .catch(e => {
        // TODO: add reporting with `error` and `call` here
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
  const wsProvider = new WsProvider(NODE_URL);
  const api = await ApiPromise.create({provider: wsProvider});

  const server = new grpc.Server();
  server.addService(blockProto.BlockService.service, {
    getHead: wrapHandler(blockHandlers.getHead, api),
    getMetaByHeight: wrapHandler(blockHandlers.getMetaByHeight, api),
    getByHeight: wrapHandler(blockHandlers.getByHeight, api),
  });
  server.addService(transactionProto.TransactionService.service, {
    getByHeight: transactionHandlers.getByHeight(api),
  });
  server.addService(eventProto.EventService.service, {
    getByHeight: eventHandlers.getByHeight(api),
  });
  server.addService(stakingProto.StakingService.service, {
    getByHeight: stakingHandlers.getByHeight(api),
  });
  server.addService(accountProto.AccountService.service, {
    getIdentity: accountHandlers.getIdentity(api),
    getByHeight: accountHandlers.getByHeight(api),
  });
  server.addService(validatorPerformanceProto.ValidatorPerformanceService.service, {
    getByHeight: validatorPerformanceHandlers.getByHeight(api),
  });
  server.bind(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure());
  server.start();
}

init().then(resp => {
  console.log('Server started');
}).catch(err => {
  console.log('ERR:', err);
});
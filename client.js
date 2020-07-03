const grpc = require('grpc');

const {
  chainProto,
  blockProto,
  transactionProto,
  eventProto,
  stakingProto,
  accountProto,
  validatorPerformanceProto,
} = require('./grpc/init');

function main() {
  const height = 2003930;
  const address = 'DSpbbk6HKKyS78c4KDLSxCetqbwnsemv2iocVXwNe2FAvWC';
  let client;

  // Chain
  // client = new chainProto.ChainService('localhost:50051', grpc.credentials.createInsecure());
  // client.getHead({}, function(err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('head: ', response);
  //   }
  // });

  // client.getMetaByHeight({height: 176}, function (err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('block meta: ', response);
  //   }
  // });

  // client.getMetaByHeight({height: 174}, function (err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('block meta: ', response);
  //   }
  // });

  // Block
  // client = new blockProto.BlockService('localhost:50051', grpc.credentials.createInsecure());
  // client.getByHeight({height: height}, function(err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('block: ', response);
  //   }
  // });

  // Transactions
  // client = new transactionProto.TransactionService('localhost:50051', grpc.credentials.createInsecure());
  // client.getByHeight({height: height}, function(err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('transactions: ', response);
  //   }
  // });

  // Events
  // client = new eventProto.EventService('localhost:50051', grpc.credentials.createInsecure());
  // client.getByHeight({height: height}, function(err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('events: ', response.events);
  //   }
  // });

  // Staking
  // client = new stakingProto.StakingService('localhost:50051', grpc.credentials.createInsecure());
  // client.getByHeight({height: height}, function (err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('staking: ', JSON.stringify(response.staking));
  //   }
  // });

  // Account Identity
  // client = new accountProto.AccountService('localhost:50051', grpc.credentials.createInsecure());
  // client.getIdentity({address}, function(err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('account identity: ', response.identity);
  //   }
  // });

  // Account
  // client.getByHeight({height, address}, function(err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('account: ', response.account);
  //   }
  // });

  // Validator Performance
  // client = new validatorPerformanceProto.ValidatorPerformanceService('localhost:50051', grpc.credentials.createInsecure());
  // client.getByHeight({height: height}, function(err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('validator performance: ', response);
  //   }
  // });
}

main();

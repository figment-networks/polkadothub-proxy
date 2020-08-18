const grpc = require('grpc');

const {
  heightProto,
  chainProto,
  blockProto,
  transactionProto,
  eventProto,
  stakingProto,
  accountProto,
  validatorPerformanceProto,
} = require('./grpc/init');

function main() {
  const nodeUrl = process.env.NODE_URL || 'localhost:50051';
  const height = 2278812;
  const address = 'DSpbbk6HKKyS78c4KDLSxCetqbwnsemv2iocVXwNe2FAvWC';
  let client;

  // Height
  // client = new heightProto.HeightService(nodeUrl, grpc.credentials.createInsecure());
  // client.getAll({height: height}, function(err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('response: ', response);
  //   }
  // });

  // Block
  // client = new blockProto.BlockService(nodeUrl, grpc.credentials.createInsecure());
  // client.getByHeight({height: height}, function(err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('block: ', response);
  //   }
  // });

  // Chain
  // client = new chainProto.ChainService(nodeUrl, grpc.credentials.createInsecure());
  // client.getHead({}, function(err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('head: ', response);
  //   }
  // });

  // client.getMetaByHeight({height: height}, function (err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('block meta: ', response);
  //   }
  // })

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
  // client = new blockProto.BlockService(nodeUrl, grpc.credentials.createInsecure());
  // client.getByHeight({height: height}, function(err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('block: ', response);
  //   }
  // });

  // Transactions
  // client = new transactionProto.TransactionService(nodeUrl, grpc.credentials.createInsecure());
  // client.getByHeight({height: height}, function(err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('transactions: ', response);
  //   }
  // });

  // Events
  // client = new eventProto.EventService(nodeUrl, grpc.credentials.createInsecure());
  // client.getByHeight({height: height}, function(err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('events: ', response.events);
  //   }
  // });

  // Staking
  // client = new stakingProto.StakingService(nodeUrl, grpc.credentials.createInsecure());
  // client.getByHeight({height: height}, function (err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('staking: ', JSON.stringify(response.staking));
  //   }
  // });

  // Account Identity
  // client = new accountProto.AccountService(nodeUrl, grpc.credentials.createInsecure());
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
  // client = new validatorPerformanceProto.ValidatorPerformanceService(nodeUrl, grpc.credentials.createInsecure());
  // client.getByHeight({height: height}, function(err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('validator performance: ', response);
  //   }
  // });
}

main();

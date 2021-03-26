const grpc = require('grpc');

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

function main() {
  const proxyUrl = process.env.PROXY_URL || 'localhost:50051';
  const height = 4355552;
  const address = 'DSpbbk6HKKyS78c4KDLSxCetqbwnsemv2iocVXwNe2FAvWC';
  let client;

  // Height
  // client = new heightProto.HeightService(proxyUrl, grpc.credentials.createInsecure());
  // client.getAll({height: height}, function(err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('response: ', response);
  //   }
  // });

  // Chain
  // client = new chainProto.ChainService(proxyUrl, grpc.credentials.createInsecure());
  // client.getHead({}, function(err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('head: ', response);
  //   }
  // });

  // client.getStatus({}, function(err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('status: ', response);
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
  client = new blockProto.BlockService(proxyUrl, grpc.credentials.createInsecure());
  client.getByHeight({height: height}, function(err, response) {
    if (err) {
      console.error(err)
    } else {
      console.log('block: ', response);
    }
  });

  // Transactions
  client = new transactionProto.TransactionService(proxyUrl, grpc.credentials.createInsecure());
  client.getByHeight({height: height}, function(err, response) {
    if (err) {
      console.error(err)
    } else {
      console.log('transactions: ', response);
    }
  });

  // Events
  // client = new eventProto.EventService(proxyUrl, grpc.credentials.createInsecure());
  // client.getByHeight({height: height}, function(err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('events: ', response.events);
  //   }
  // });

  // Staking
  // client = new stakingProto.StakingService(proxyUrl, grpc.credentials.createInsecure());
  // client.getByHeight({height: height}, function (err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('staking: ', JSON.stringify(response.staking));
  //   }
  // });

  // Account Identity
  // client = new accountProto.AccountService(proxyUrl, grpc.credentials.createInsecure());
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
  // client = new validatorPerformanceProto.ValidatorPerformanceService(proxyUrl, grpc.credentials.createInsecure());
  // client.getByHeight({height: height}, function(err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('validator performance: ', response);
  //   }
  // });

  // Validator
  // client = new validatorProto.ValidatorService(proxyUrl, grpc.credentials.createInsecure());
  // client.getAllByHeight({height}, function(err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('validators: ', JSON.stringify(response.validators));
  //   }
  // });

}

main();

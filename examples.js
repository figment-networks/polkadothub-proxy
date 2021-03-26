const grpc = require('grpc');

const {
  heightProto,
  chainProto,
  blockProto,
  decodeProto,
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
  // client = new blockProto.BlockService(proxyUrl, grpc.credentials.createInsecure());
  // client.getByHeight({height: height}, function(err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('block: ', response);
  //   }
  // });

  let rawBlock = `{"block":{"extrinsics":["0x280403000b500a8e617801","0x050384001cf326c5aaa5af9f0e2791e66310fe8f044faadaf12567eaa0976959d1f7731f011e8ca506a4389d309b7eed51200cc3b216cf97727a8d9f1358fd09200b089b462b329750d49a07dc899b72d3c1c7b9627c2b57e09787108b5198c6fefaa7378a350036700600001a00080500003ef8b45d937722f959fa95da0093580f5631b6c01bde90a320d8383817a5332f0b608665e8af0205000075b6f28574559b5f32f867e72f13cf19d65fe8d4972ffc5a5c5fbcfcd900c6050b001761f69b04"],"header":{"digest":{"logs":["0x0642414245b50103e5000000c3150f1000000000bc609e2cc2e3de8275e4bc4606671d7b96795f2c5af9ace6a237c37e8280323409158f7201799a7938d304e7ce751a8db2a2a1ffeb1ea69e0a7e82e2f90e040e89a150dc6cfe9b0ae75a5caec92d45a889965609b1c21a5c14060aff12681201","0x05424142450101ae500bec546d03ca5e9afd5fe4002d3d1466caafb338a280bf87764c0aacec1f58398b6f6b7ec5bbd18e33eea8627efea725bfda3051703ba1dc236e7ad0d08d"]},"extrinsicsRoot":"0x020b36f06e8cc9fdeadd5438332b06a405d61e0710f5c6b7bc8149f60eb15327","number":"0x41ebc6","parentHash":"0x8036e20c9452ddfb8c9c615cc1cdced79408fab6dff3346818f0fefae1bfda15","stateRoot":"0x36d47ebae27081e885621b74f22db4c3beea73f9002e465f44be1feebb2c5b9e"}},"justification":null}`;
  client = new decodeProto.DecodeService(proxyUrl, grpc.credentials.createInsecure());
  client.decode({block: [...Buffer.from(rawBlock)], events: null, systemStorage: null}, function(err, response) {
    if (err) {
      console.error(err)
    } else {
      console.log('block: ', response);
    }
  });

  // Transactions
  // client = new transactionProto.TransactionService(proxyUrl, grpc.credentials.createInsecure());
  // client.getByHeight({height: height}, function(err, response) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('transactions: ', response);
  //   }
  // });

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

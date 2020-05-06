const grpc = require('grpc');

const {
  blockProto,
  transactionProto,
  eventProto,
  stakingProto,
  accountProto,
} = require('./grpc/init');

function main() {
  const height = 2003930;
  const address = 'DSpbbk6HKKyS78c4KDLSxCetqbwnsemv2iocVXwNe2FAvWC';

  // Block
  let client = new blockProto.BlockService('localhost:50051', grpc.credentials.createInsecure());
  // client.getByHeight({height: height}, function(err, response) {
  //   console.log('block: ', response.block);
  // });

  // // Transactions
  // client = new transactionProto.TransactionService('localhost:50051', grpc.credentials.createInsecure());
  // client.getByHeight({height: height}, function(err, response) {
  //   console.log('transactions: ', response);
  // });

  // // Events
  client = new eventProto.EventService('localhost:50051', grpc.credentials.createInsecure());
  client.getByHeight({height: height}, function(err, response) {
    console.log('events: ', response.events);
  });

  // Staking
  // client = new stakingProto.StakingService('localhost:50051', grpc.credentials.createInsecure());
  // client.getByHeight({height: height}, function(err, response) {
  //   console.log('staking: ', response);
  // });

  // Account Identity
  // client = new accountProto.AccountService('localhost:50051', grpc.credentials.createInsecure());
  // client.getIdentity({address}, function(err, response) {
  //   console.log('account identity: ', response.identity);
  // });

  // Account
  // client.getByHeight({height, address}, function(err, response) {
  //   console.log('account: ', response.account);
  // });
}

main();

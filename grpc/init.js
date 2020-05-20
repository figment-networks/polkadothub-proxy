const fs = require('fs');
const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const defaultOptions = {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};

// Block
let packageDefinition = protoLoader.loadSync('./grpc/block/blockpb/block.proto', defaultOptions);
const blockProto = grpc.loadPackageDefinition(packageDefinition).block;

// Transactions
packageDefinition = protoLoader.loadSync('./grpc/transaction/transactionpb/transaction.proto', defaultOptions);
const transactionProto = grpc.loadPackageDefinition(packageDefinition).transaction;

// Events
packageDefinition = protoLoader.loadSync('./grpc/event/eventpb/event.proto', defaultOptions);
const eventProto = grpc.loadPackageDefinition(packageDefinition).event;

// Staking
packageDefinition = protoLoader.loadSync('./grpc/staking/stakingpb/staking.proto', defaultOptions);
const stakingProto = grpc.loadPackageDefinition(packageDefinition).staking;

// Account
packageDefinition = protoLoader.loadSync('./grpc/account/accountpb/account.proto', defaultOptions);
const accountProto = grpc.loadPackageDefinition(packageDefinition).account;

// Validator Performance
packageDefinition = protoLoader.loadSync('./grpc/validatorperformance/validatorperformancepb/validator_performance.proto', defaultOptions);
const validatorPerformanceProto = grpc.loadPackageDefinition(packageDefinition).validatorPerformance;

module.exports = {
  blockProto,
  transactionProto,
  eventProto,
  stakingProto,
  accountProto,
  validatorPerformanceProto,
}
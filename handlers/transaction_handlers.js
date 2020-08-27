const {fetchMetadataAtHeight, injectMetadata} = require('../utils/setup');
const {createCalcFee} = require("../utils/calc");
const transactionMappers = require('../mappers/transaction/transaction_mappers');

/**
 * Get signed transactions by height
 */
const getByHeight = async (api, call, context = {}) => {
  const height = call.request.height;

  const currHeightMetadata = context.currHeightMetadata ? context.currHeightMetadata : await fetchMetadataAtHeight(api, height);
  injectMetadata(api, currHeightMetadata);

  const {blockHash} = currHeightMetadata;

  const resp = await api.rpc.chain.getBlock(blockHash);
  const rawBlockAt = resp.block;

  const [rawTimestampAt, rawEventsAt, calcFee] = await Promise.all([
    api.query.timestamp.now.at(blockHash),
    api.query.system.events.at(blockHash),
    createCalcFee(api, rawBlockAt.header.parentHash),
  ]);

  const transactions = [];

  rawBlockAt.extrinsics.forEach(async (rawExtrinsic, index) => {
    if (rawExtrinsic.toHuman().isSigned) {
      const rawEventsForExtrinsic = rawEventsAt.filter((ev) => ev.phase.isApplyExtrinsic && ev.phase.asApplyExtrinsic.toNumber() === index);
      transactions.push(transactionMappers.toPb(index, rawExtrinsic, rawTimestampAt, rawEventsForExtrinsic, calcFee));
    }
  });

  return {transactions};
};

module.exports = {
  getByHeight,
};
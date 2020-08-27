const {fetchMetadataAtHeight, injectMetadata} = require('../utils/setup');
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

  const rawTimestampAt = await api.query.timestamp.now.at(blockHash);
  const rawEventsAt = await api.query.system.events.at(blockHash);

  const transactions = [];
  rawBlockAt.extrinsics.forEach((rawExtrinsic, index) => {
    if (rawExtrinsic.toHuman().isSigned) {
      transactions.push(transactionMappers.toPb(index, rawExtrinsic, rawTimestampAt, rawEventsAt));
    }
  });

  return {transactions};
};

module.exports = {
  getByHeight,
};

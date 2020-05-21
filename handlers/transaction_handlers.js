const {setupApiAtHeight} = require('../utils/setup');
const transactionMappers = require('../mappers/transaction/transaction_mappers');

/**
 * Get signed transactions by height
 */
const getByHeight = async (api, call) => {
  const height = call.request.height;

  const blockHash = await setupApiAtHeight(api, height);

  const resp = await api.rpc.chain.getBlock(blockHash);
  const rawBlockAt = resp.block;

  const transactions = [];
  rawBlockAt.extrinsics.forEach((rawExtrinsic, index) => {
    if (rawExtrinsic.toHuman().isSigned) {
      transactions.push({
        extrinsicIndex: index,
        ...transactionMappers.toPb(rawExtrinsic),
      });
    }
  });

  return {transactions};
};

module.exports = {
  getByHeight,
};
